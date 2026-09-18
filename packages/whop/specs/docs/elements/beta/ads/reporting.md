> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Reporting

> An advertising account's reporting: what it spent and what came back, over a window, at whatever level you narrow to. Mount `chart`, `table`, or both — they read the same window, the same credit rule, and the same selection, so two surfaces side by side can never disagree about what they are showing. The `ads` handle's `links` configuration wires the table's click and result counts to your own pages — the ones where you mounted the `tracking` namespace's `people` and `events`.

<Info>This page documents `@whop/elements@1.0.0-beta.2` and `@whop/elements-react@1.0.0-beta.2`.</Info>

*Pre-release, not yet part of a stable release.*

Mounts inside [`Ads`](/elements/beta/ads/overview). Create it to get a handle, then mount its elements on that handle. Call `destroy()` to remove the sub-controller. Create it again to get a fresh handle.

## Preview

A live, interactive demo of this sub-controller's default arrangement with example data:

<div data-whop-demo-shell style={{ position: "relative", minHeight: "480px", transition: "min-height 200ms ease" }}>
  <div data-whop-demo-skeleton style={{ position: "absolute", inset: "0", borderRadius: "12px", background: "rgba(140, 140, 140, 0.12)", pointerEvents: "none", transition: "opacity 200ms ease" }} />

  <div data-whop-demo-native="unit:reporting" data-whop-elements-version="1.0.0-beta.2" style={{ position: "relative" }} />
</div>

<div data-whop-usage="ads/reporting">
  <CodeGroup>
    ```tsx React theme={null}
    import { WhopElements, Ads, Reporting, ChartElement, TableElement } from "@whop/elements-react";
    import { loadWhop } from "@whop/elements";

    function Example() {
      return (
        <WhopElements elements={loadWhop()}>
          <Ads /* options */>
            <Reporting>
              <ChartElement />
              <TableElement />
            </Reporting>
          </Ads>
        </WhopElements>
      );
    }
    ```

    ```html JavaScript theme={null}
    <script src="https://js.whop.cloud/elements/amber/elements.js" data-whop-elements></script>
    <script type="module">
      const ads = window.WhopElements().ads.create({ /* options */ });
      const reporting = ads.create('reporting', { /* options */ });
      reporting.create('chart').mount('#ads-reporting-chart');
      reporting.create('table').mount('#ads-reporting-table');
    </script>
    ```
  </CodeGroup>
</div>

## Options

Pass these to `ads.create('reporting', { … })`, or as props on `<Reporting>` in React. Parent-injected props never appear here.

<ResponseField name="period" type="&#x22;today&#x22; | &#x22;yesterday&#x22; | &#x22;last_7_days&#x22; | &#x22;last_14_days&#x22; | &#x22;last_30_days&#x22; | &#x22;last_90_days&#x22; | &#x22;all_time&#x22; | &#x22;custom&#x22;">
  The window every surface reports on: `today`, `yesterday`, `last_7_days`, `last_14_days`, `last_30_days`, `last_90_days`, `all_time`, or `custom` (pair it with `customRange`). The chart carries the picker, and it moves this — so a host can drive the window and read it back off `periodChanged`. Defaults to `"last_14_days"`.
</ResponseField>

<ResponseField name="customRange" type="{ from: string; to: string; } | null">
  The explicit window, as ISO 8601 instants, used when `period` is `custom`. Ignored otherwise. Defaults to `null`.
</ResponseField>

<ResponseField name="timezone" type="&#x22;account&#x22; | &#x22;local&#x22;">
  Timezone choice for every reported figure. Use `account` for the account's `preferences.ads_scheduling_timezone` or `local` for the viewer's browser timezone. These are the only choices the chart offers. A free-form IANA timezone could make the picker label data incorrectly and would be lost when the viewer changes the selection. To report in another timezone, change the account setting. `account` falls back to the viewer's timezone when the account has no setting. Defaults to `"account"`.
</ResponseField>

<ResponseField name="currency" type="string">
  Lowercase three-letter ISO 4217 currency code for converted amounts, such as `usd` or `eur`. Unset, it defaults to the account's `preferences.ads_reporting_currency`. Defaults to `""`.
</ResponseField>

<ResponseField name="attributionModel" type="&#x22;last_touch&#x22; | &#x22;first_touch&#x22;">
  Which touch in a buyer’s journey gets the credit: `last_touch`, the default, or `first_touch`. Under both, a Whop touch anywhere in the journey wins the Whop bucket — the model only picks the endpoints. The table carries the picker and moves this, so a host can drive it and read it back off `attributionModelChanged`. Defaults to `"last_touch"`.
</ResponseField>

<ResponseField name="campaignIds" type="string[]">
  Narrow reporting to these ad campaigns (`adcamp_…`). Empty reports on the whole account. Overridden by `adGroupIds` or `adIds` when either is set. **Pass one ID for an exact figure:** the reporting API scopes by a single source path, so where more than one is given the chart reports on the first alone. Defaults to `[]`.
</ResponseField>

<ResponseField name="adGroupIds" type="string[]">
  Narrow reporting to these ad groups (`adgrp_…`). Takes precedence over `campaignIds`. Same single-ID caveat. Defaults to `[]`.
</ResponseField>

<ResponseField name="adIds" type="string[]">
  Narrow reporting to these ads (`ad_…`). The narrowest filter — takes precedence over both others. Same single-ID caveat. Defaults to `[]`.
</ResponseField>

<ResponseField name="tab" type="&#x22;ads&#x22; | &#x22;all&#x22; | &#x22;campaigns&#x22; | &#x22;ad-groups&#x22;">
  Which table the `table` element opens on: `campaigns`, `ad-groups`, `ads`, or `all` for the traffic-source view. `all` always reports account-wide — the source series exists only at that level — so a filter set alongside it narrows the table but not the chart. Defaults to `"campaigns"`.
</ResponseField>

<ResponseField name="sources" type="string[] | null">
  Which traffic the chart reports on, as source paths — `whop:*` for advertising bought through Whop, `ext:*` and `ext:<platform>:*` for ads run elsewhere, `referrer:*` for organic, `direct`, `other`. `null`, the default, reports on Whop advertising alone; `[]` reports on every source; a non-empty array reports on those. A DIFFERENT axis to `campaignIds` and friends, which narrow within Whop advertising — spend-derived ratios stay Whop-attributed whatever this is set to, because spend only ever bought Whop ads. The `table` element’s All tab moves it. Defaults to `null`.
</ResponseField>

## Events

Pass callbacks in the create options or React props.

### `onEditRequested`

The viewer asked to edit something — a row menu, a draft row, or Edit ad in the details overlay. `campaignId` is always there; `adGroupId` and `adId` narrow it to what they clicked. Only raised when `useCampaignCreator` is off; on, the builder opens over the page instead and this stays quiet.

**Signature:** `((payload: AdsEditTarget) => void)`

## Methods

Call these on the sub handle from `ads.create('reporting', { … })`.

### `update`

Merges new props and callbacks into the sub-controller.

**Signature:** `(options: Partial<ReportingSubOptions>) => void`

### `destroy`

Destroys the sub-controller and its elements, then frees its exclusive slot. A later `create("reporting")` starts fresh.

**Signature:** `() => void`

## Elements

The elements this sub-controller mounts. Each has its own page:

<CardGroup cols={2}>
  <Card title="ChartElement" href="/elements/beta/ads/reporting-chart">
    An account’s performance over a window, with a picker for what to plot — spend, impressions, clicks, or any conversion the account records. Read-only.
  </Card>

  <Card title="TableElement" href="/elements/beta/ads/reporting-table">
    An advertising account's campaigns, ad groups, and ads in one table, with the tabs that move between them: pick rows to narrow the level below, search, sort, break the numbers down, choose your columns, and pause, resume, duplicate, or delete straight from a row. The window it reports on and the rows it is filtered to live on the handle, so a chart mounted beside it reports on exactly the same thing.
  </Card>
</CardGroup>

## Flow surfaces

These internal elements open automatically during guided flows. They aren't part of the consumer API, so you don't mount or configure them.

* **AdDetailsElement** (`adDetails`): A single ad in detail: its creative, its copy, the accounts it runs under, and where it sends people. Opened from a row in the `table` element — it is not mounted directly, and appears over the page rather than inside either frame.
