> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Ad Report

> An ads performance report. Always returns a summary. The `granularity` field contains a per-bucket time series when the `granularity` arg is set; the `breakdown` field contains per-entity rows when the `breakdown` arg is set.

<ResponseExample>
  ```json Example theme={null}
  {
  	"breakdown": [
  		{
  			"granularity": [
  				{
  					"bucket_start": "2023-12-01T05:00:00.401Z",
  					"clicks": 42,
  					"granularity": "hourly",
  					"impressions": 42,
  					"reach": 42,
  					"result_count": 42,
  					"result_label_key": null,
  					"result_label_override": "<string>",
  					"spend": 6.9,
  					"spend_currency": "usd",
  					"stat_date": "2023-12-01T05:00:00.401Z",
  					"stat_hour": 42
  				}
  			],
  			"id": "<string>",
  			"level": "campaign",
  			"name": "<string>",
  			"summary": {
  				"click_through_rate": 6.9,
  				"clicks": 42,
  				"cost_per_click": 6.9,
  				"cost_per_mille": 6.9,
  				"cost_per_result": 6.9,
  				"frequency": 6.9,
  				"impressions": 42,
  				"reach": 42,
  				"result_count": 42,
  				"result_label_key": "app_installs",
  				"result_label_override": "<string>",
  				"return_on_ad_spend": 6.9,
  				"spend": 6.9,
  				"spend_currency": "usd"
  			}
  		}
  	],
  	"granularity": [
  		{
  			"bucket_start": "2023-12-01T05:00:00.401Z",
  			"clicks": 42,
  			"granularity": "hourly",
  			"impressions": 42,
  			"reach": 42,
  			"result_count": 42,
  			"result_label_key": "app_installs",
  			"result_label_override": "<string>",
  			"spend": 6.9,
  			"spend_currency": "usd",
  			"stat_date": "2023-12-01T05:00:00.401Z",
  			"stat_hour": 42
  		}
  	],
  	"summary": {
  		"click_through_rate": 6.9,
  		"clicks": 42,
  		"cost_per_click": 6.9,
  		"cost_per_mille": 6.9,
  		"cost_per_result": 6.9,
  		"frequency": 6.9,
  		"impressions": 42,
  		"reach": 42,
  		"result_count": 42,
  		"result_label_key": "app_installs",
  		"result_label_override": "<string>",
  		"return_on_ad_spend": 6.9,
  		"spend": 6.9,
  		"spend_currency": "usd"
  	}
  }
  ```
</ResponseExample>

<ResponseField name="breakdown" type="array<object> | null" required>
  Per-entity rows over the date range. `null` when the `breakdown` arg on `adReport` is omitted; otherwise contains one row per ad campaign, ad group, or ad inside the requested scope at the requested level.

  <Expandable title="child attributes">
    <ResponseField name="granularity" type="array<object> | null" required>
      Per-bucket time series for this entity over the date range, ordered ascending by `bucketStart`. `null` when the `granularity` arg on `adReport` is omitted; otherwise contains rows at the requested grain (`daily` or `hourly`).

      <Expandable title="child attributes">
        <ResponseField name="bucket_start" type="string<date-time>" required>
          The bucket's start time as a real UTC instant. `(statDate, statHour)` resolved in the ad account's reporting timezone — render this in the viewer's local timezone.

          Example: `2023-12-01T05:00:00.401Z`
        </ResponseField>

        <ResponseField name="clicks" type="integer" required>
          Clicks in this bucket.

          Example: `42`
        </ResponseField>

        <ResponseField name="granularity" type="Granularities" required>
          The bucket size of this row (`hourly`, `daily`, `weekly`, or `monthly`).

          Available options: `hourly`, `daily`, `weekly`, `monthly`
        </ResponseField>

        <ResponseField name="impressions" type="integer" required>
          Impressions in this bucket.

          Example: `42`
        </ResponseField>

        <ResponseField name="reach" type="integer" required>
          Unique users reached in this bucket. Always `0` for hourly rows (Meta does not return reach at hourly grain).

          Example: `42`
        </ResponseField>

        <ResponseField name="result_count" type="integer | null" required>
          Count of the primary optimization result in this bucket.

          Example: `42`
        </ResponseField>

        <ResponseField name="result_label_key" type="ResultLabelKeys | null" required>
          The type of optimization result represented by `resultCount`.

          Available options: `app_installs`, `messaging_conversations_started`, `post_engagement`, `event_responses`, `impressions`, `website_purchases`, `landing_page_views`, `leads`, `link_clicks`, `quality_calls`, `appointments_booked`, `messaging_purchases`, `page_likes`, `instagram_profile_visits`, `reach`, `reminders_set`, `new_subscribers`, `video_views`, `registrations`, `content_views`, `searches`, `adds_to_cart`, `adds_to_wishlist`, `adds_of_payment_info`, `checkouts_initiated`, `website_schedules`, `website_submit_applications`, `website_trials_started`, `website_subscriptions`, `website_contacts`, `website_donations`, `website_find_locations`, `website_product_customizations`, `custom`
        </ResponseField>

        <ResponseField name="result_label_override" type="string | null" required>
          Advertiser-defined label for the result when `resultLabelKey` is `custom`.
        </ResponseField>

        <ResponseField name="spend" type="number" required>
          Charged spend in this bucket in the requested reporting currency — the amount billed including platform fees, not the platform-side net spend.

          Example: `6.9`
        </ResponseField>

        <ResponseField name="spend_currency" type="Currencies" required>
          Currency of the `spend` value.

          Available options: `usd`, `sgd`, `inr`, `aud`, `brl`, `cad`, `dkk`, `eur`, `nok`, `gbp`, `sek`, `chf`, `hkd`, `huf`, `jpy`, `mxn`, `myr`, `pln`, `czk`, `nzd`, `aed`, `eth`, `ape`, `cop`, `ron`, `thb`, `bgn`, `idr`, `dop`, `php`, `try`, `krw`, `twd`, `vnd`, `pkr`, `clp`, `uyu`, `ars`, `zar`, `dzd`, `tnd`, `mad`, `kes`, `kwd`, `jod`, `all`, `xcd`, `amd`, `bsd`, `bhd`, `bob`, `bam`, `khr`, `crc`, `xof`, `egp`, `etb`, `gmd`, `ghs`, `gtq`, `gyd`, `ils`, `jmd`, `mop`, `mga`, `mur`, `mdl`, `mnt`, `nad`, `ngn`, `mkd`, `omr`, `pyg`, `pen`, `qar`, `rwf`, `sar`, `rsd`, `lkr`, `tzs`, `ttd`, `uzs`, `rub`, `btc`, `cny`, `usdt`, `kzt`, `awg`, `whop_usd`, `xau`
        </ResponseField>

        <ResponseField name="stat_date" type="string<date-time>" required>
          The date these stats cover (midnight UTC). For hourly rows, see `statHour` and `bucketStart`.

          Example: `2023-12-01T05:00:00.401Z`
        </ResponseField>

        <ResponseField name="stat_hour" type="integer | null" required>
          Hour of the day in the ad account's reporting timezone (0-23). `null` for daily rows.

          Example: `42`
        </ResponseField>
      </Expandable>
    </ResponseField>

    <ResponseField name="id" type="string" required>
      Tag of the entity (ad campaign, ad group, or ad).
    </ResponseField>

    <ResponseField name="level" type="AdReportBreakdownLevels" required>
      The entity level of this row — matches the `breakdown` arg.

      Available options: `campaign`, `ad_group`, `ad`
    </ResponseField>

    <ResponseField name="name" type="string | null" required>
      Display name of the entity, when available.
    </ResponseField>

    <ResponseField name="summary" type="object" required>
      Aggregate totals and rates for this entity over the date range.

      <Expandable title="child attributes">
        <ResponseField name="click_through_rate" type="number" required>
          Click-through rate (clicks / impressions).

          Example: `6.9`
        </ResponseField>

        <ResponseField name="clicks" type="integer" required>
          Total clicks over the date range.

          Example: `42`
        </ResponseField>

        <ResponseField name="cost_per_click" type="number" required>
          Cost per click in the requested reporting currency.

          Example: `6.9`
        </ResponseField>

        <ResponseField name="cost_per_mille" type="number | null" required>
          Cost per thousand impressions in the requested reporting currency.

          Example: `6.9`
        </ResponseField>

        <ResponseField name="cost_per_result" type="number | null" required>
          Spend divided by `resultCount`. Null when there are no results.

          Example: `6.9`
        </ResponseField>

        <ResponseField name="frequency" type="number | null" required>
          Average number of times each reached user saw an ad.

          Example: `6.9`
        </ResponseField>

        <ResponseField name="impressions" type="integer" required>
          Total impressions over the date range.

          Example: `42`
        </ResponseField>

        <ResponseField name="reach" type="integer" required>
          Unique users reached, deduplicated by the external ad platform.

          Example: `42`
        </ResponseField>

        <ResponseField name="result_count" type="integer | null" required>
          Count of the campaign's primary optimization result (purchases, clicks, etc.) — see `resultLabelKey`.

          Example: `42`
        </ResponseField>

        <ResponseField name="result_label_key" type="ResultLabelKeys | null" required>
          The type of optimization result represented by `resultCount`.

          Available options: `app_installs`, `messaging_conversations_started`, `post_engagement`, `event_responses`, `impressions`, `website_purchases`, `landing_page_views`, `leads`, `link_clicks`, `quality_calls`, `appointments_booked`, `messaging_purchases`, `page_likes`, `instagram_profile_visits`, `reach`, `reminders_set`, `new_subscribers`, `video_views`, `registrations`, `content_views`, `searches`, `adds_to_cart`, `adds_to_wishlist`, `adds_of_payment_info`, `checkouts_initiated`, `website_schedules`, `website_submit_applications`, `website_trials_started`, `website_subscriptions`, `website_contacts`, `website_donations`, `website_find_locations`, `website_product_customizations`, `custom`
        </ResponseField>

        <ResponseField name="result_label_override" type="string | null" required>
          Advertiser-defined label for the result when `resultLabelKey` is `custom`.
        </ResponseField>

        <ResponseField name="return_on_ad_spend" type="number | null" required>
          Alias for `purchaseReturnOnAdSpend` — return on ad spend for purchases, as reported by the external ad platform.

          Example: `6.9`
        </ResponseField>

        <ResponseField name="spend" type="number" required>
          Total spend over the date range in the requested reporting currency.

          Example: `6.9`
        </ResponseField>

        <ResponseField name="spend_currency" type="Currencies | null" required>
          Currency of the `spend` value. Matches the requested `currency` when set.

          Available options: `usd`, `sgd`, `inr`, `aud`, `brl`, `cad`, `dkk`, `eur`, `nok`, `gbp`, `sek`, `chf`, `hkd`, `huf`, `jpy`, `mxn`, `myr`, `pln`, `czk`, `nzd`, `aed`, `eth`, `ape`, `cop`, `ron`, `thb`, `bgn`, `idr`, `dop`, `php`, `try`, `krw`, `twd`, `vnd`, `pkr`, `clp`, `uyu`, `ars`, `zar`, `dzd`, `tnd`, `mad`, `kes`, `kwd`, `jod`, `all`, `xcd`, `amd`, `bsd`, `bhd`, `bob`, `bam`, `khr`, `crc`, `xof`, `egp`, `etb`, `gmd`, `ghs`, `gtq`, `gyd`, `ils`, `jmd`, `mop`, `mga`, `mur`, `mdl`, `mnt`, `nad`, `ngn`, `mkd`, `omr`, `pyg`, `pen`, `qar`, `rwf`, `sar`, `rsd`, `lkr`, `tzs`, `ttd`, `uzs`, `rub`, `btc`, `cny`, `usdt`, `kzt`, `awg`, `whop_usd`, `xau`
        </ResponseField>
      </Expandable>
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="granularity" type="array<object> | null" required>
  Per-bucket time series over the date range, ordered ascending by `bucketStart`. `null` when the `granularity` arg on `adReport` is omitted; otherwise contains rows at the requested grain (`daily` or `hourly`).

  <Expandable title="child attributes">
    <ResponseField name="bucket_start" type="string<date-time>" required>
      The bucket's start time as a real UTC instant. `(statDate, statHour)` resolved in the ad account's reporting timezone — render this in the viewer's local timezone.

      Example: `2023-12-01T05:00:00.401Z`
    </ResponseField>

    <ResponseField name="clicks" type="integer" required>
      Clicks in this bucket.

      Example: `42`
    </ResponseField>

    <ResponseField name="granularity" type="Granularities" required>
      The bucket size of this row (`hourly`, `daily`, `weekly`, or `monthly`).

      Available options: `hourly`, `daily`, `weekly`, `monthly`
    </ResponseField>

    <ResponseField name="impressions" type="integer" required>
      Impressions in this bucket.

      Example: `42`
    </ResponseField>

    <ResponseField name="reach" type="integer" required>
      Unique users reached in this bucket. Always `0` for hourly rows (Meta does not return reach at hourly grain).

      Example: `42`
    </ResponseField>

    <ResponseField name="result_count" type="integer | null" required>
      Count of the primary optimization result in this bucket.

      Example: `42`
    </ResponseField>

    <ResponseField name="result_label_key" type="ResultLabelKeys | null" required>
      The type of optimization result represented by `resultCount`.

      Available options: `app_installs`, `messaging_conversations_started`, `post_engagement`, `event_responses`, `impressions`, `website_purchases`, `landing_page_views`, `leads`, `link_clicks`, `quality_calls`, `appointments_booked`, `messaging_purchases`, `page_likes`, `instagram_profile_visits`, `reach`, `reminders_set`, `new_subscribers`, `video_views`, `registrations`, `content_views`, `searches`, `adds_to_cart`, `adds_to_wishlist`, `adds_of_payment_info`, `checkouts_initiated`, `website_schedules`, `website_submit_applications`, `website_trials_started`, `website_subscriptions`, `website_contacts`, `website_donations`, `website_find_locations`, `website_product_customizations`, `custom`
    </ResponseField>

    <ResponseField name="result_label_override" type="string | null" required>
      Advertiser-defined label for the result when `resultLabelKey` is `custom`.
    </ResponseField>

    <ResponseField name="spend" type="number" required>
      Charged spend in this bucket in the requested reporting currency — the amount billed including platform fees, not the platform-side net spend.

      Example: `6.9`
    </ResponseField>

    <ResponseField name="spend_currency" type="Currencies" required>
      Currency of the `spend` value.

      Available options: `usd`, `sgd`, `inr`, `aud`, `brl`, `cad`, `dkk`, `eur`, `nok`, `gbp`, `sek`, `chf`, `hkd`, `huf`, `jpy`, `mxn`, `myr`, `pln`, `czk`, `nzd`, `aed`, `eth`, `ape`, `cop`, `ron`, `thb`, `bgn`, `idr`, `dop`, `php`, `try`, `krw`, `twd`, `vnd`, `pkr`, `clp`, `uyu`, `ars`, `zar`, `dzd`, `tnd`, `mad`, `kes`, `kwd`, `jod`, `all`, `xcd`, `amd`, `bsd`, `bhd`, `bob`, `bam`, `khr`, `crc`, `xof`, `egp`, `etb`, `gmd`, `ghs`, `gtq`, `gyd`, `ils`, `jmd`, `mop`, `mga`, `mur`, `mdl`, `mnt`, `nad`, `ngn`, `mkd`, `omr`, `pyg`, `pen`, `qar`, `rwf`, `sar`, `rsd`, `lkr`, `tzs`, `ttd`, `uzs`, `rub`, `btc`, `cny`, `usdt`, `kzt`, `awg`, `whop_usd`, `xau`
    </ResponseField>

    <ResponseField name="stat_date" type="string<date-time>" required>
      The date these stats cover (midnight UTC). For hourly rows, see `statHour` and `bucketStart`.

      Example: `2023-12-01T05:00:00.401Z`
    </ResponseField>

    <ResponseField name="stat_hour" type="integer | null" required>
      Hour of the day in the ad account's reporting timezone (0-23). `null` for daily rows.

      Example: `42`
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="summary" type="object" required>
  Aggregate totals and rates over the date range.

  <Expandable title="child attributes">
    <ResponseField name="click_through_rate" type="number" required>
      Click-through rate (clicks / impressions).

      Example: `6.9`
    </ResponseField>

    <ResponseField name="clicks" type="integer" required>
      Total clicks over the date range.

      Example: `42`
    </ResponseField>

    <ResponseField name="cost_per_click" type="number" required>
      Cost per click in the requested reporting currency.

      Example: `6.9`
    </ResponseField>

    <ResponseField name="cost_per_mille" type="number | null" required>
      Cost per thousand impressions in the requested reporting currency.

      Example: `6.9`
    </ResponseField>

    <ResponseField name="cost_per_result" type="number | null" required>
      Spend divided by `resultCount`. Null when there are no results.

      Example: `6.9`
    </ResponseField>

    <ResponseField name="frequency" type="number | null" required>
      Average number of times each reached user saw an ad.

      Example: `6.9`
    </ResponseField>

    <ResponseField name="impressions" type="integer" required>
      Total impressions over the date range.

      Example: `42`
    </ResponseField>

    <ResponseField name="reach" type="integer" required>
      Unique users reached, deduplicated by the external ad platform.

      Example: `42`
    </ResponseField>

    <ResponseField name="result_count" type="integer | null" required>
      Count of the campaign's primary optimization result (purchases, clicks, etc.) — see `resultLabelKey`.

      Example: `42`
    </ResponseField>

    <ResponseField name="result_label_key" type="ResultLabelKeys | null" required>
      The type of optimization result represented by `resultCount`.

      Available options: `app_installs`, `messaging_conversations_started`, `post_engagement`, `event_responses`, `impressions`, `website_purchases`, `landing_page_views`, `leads`, `link_clicks`, `quality_calls`, `appointments_booked`, `messaging_purchases`, `page_likes`, `instagram_profile_visits`, `reach`, `reminders_set`, `new_subscribers`, `video_views`, `registrations`, `content_views`, `searches`, `adds_to_cart`, `adds_to_wishlist`, `adds_of_payment_info`, `checkouts_initiated`, `website_schedules`, `website_submit_applications`, `website_trials_started`, `website_subscriptions`, `website_contacts`, `website_donations`, `website_find_locations`, `website_product_customizations`, `custom`
    </ResponseField>

    <ResponseField name="result_label_override" type="string | null" required>
      Advertiser-defined label for the result when `resultLabelKey` is `custom`.
    </ResponseField>

    <ResponseField name="return_on_ad_spend" type="number | null" required>
      Alias for `purchaseReturnOnAdSpend` — return on ad spend for purchases, as reported by the external ad platform.

      Example: `6.9`
    </ResponseField>

    <ResponseField name="spend" type="number" required>
      Total spend over the date range in the requested reporting currency.

      Example: `6.9`
    </ResponseField>

    <ResponseField name="spend_currency" type="Currencies | null" required>
      Currency of the `spend` value. Matches the requested `currency` when set.

      Available options: `usd`, `sgd`, `inr`, `aud`, `brl`, `cad`, `dkk`, `eur`, `nok`, `gbp`, `sek`, `chf`, `hkd`, `huf`, `jpy`, `mxn`, `myr`, `pln`, `czk`, `nzd`, `aed`, `eth`, `ape`, `cop`, `ron`, `thb`, `bgn`, `idr`, `dop`, `php`, `try`, `krw`, `twd`, `vnd`, `pkr`, `clp`, `uyu`, `ars`, `zar`, `dzd`, `tnd`, `mad`, `kes`, `kwd`, `jod`, `all`, `xcd`, `amd`, `bsd`, `bhd`, `bob`, `bam`, `khr`, `crc`, `xof`, `egp`, `etb`, `gmd`, `ghs`, `gtq`, `gyd`, `ils`, `jmd`, `mop`, `mga`, `mur`, `mdl`, `mnt`, `nad`, `ngn`, `mkd`, `omr`, `pyg`, `pen`, `qar`, `rwf`, `sar`, `rsd`, `lkr`, `tzs`, `ttd`, `uzs`, `rub`, `btc`, `cny`, `usdt`, `kzt`, `awg`, `whop_usd`, `xau`
    </ResponseField>
  </Expandable>
</ResponseField>
