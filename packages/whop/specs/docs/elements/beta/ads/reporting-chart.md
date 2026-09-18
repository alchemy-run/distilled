> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# ChartElement

> An account’s performance over a window, with a picker for what to plot — spend, impressions, clicks, or any conversion the account records. Read-only.

<Info>This page documents `@whop/elements@1.0.0-beta.2` and `@whop/elements-react@1.0.0-beta.2`.</Info>

*Pre-release, not yet part of a stable release.*

Mounts inside [`Reporting`](/elements/beta/ads/reporting), in [`Ads`](/elements/beta/ads/overview). Pass props and callbacks through the create options or React props.

<div data-whop-split style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start", flexWrap: "wrap" }}>
  <div style={{ flex: "1 1 26rem", minWidth: 0 }}>
    <div data-whop-usage="ads/reporting-chart">
      <CodeGroup>
        ```tsx React theme={null}
        import { WhopElements, Ads, Reporting, ChartElement } from "@whop/elements-react";
        import { loadWhop } from "@whop/elements";

        function Example() {
          return (
            <WhopElements elements={loadWhop()}>
              <Ads /* options */>
                <Reporting>
                  <ChartElement onMetricChanged={(e) => console.log(e)} onTimezoneChanged={(e) => console.log(e)} onPeriodChanged={(e) => console.log(e)} />
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
          reporting.create('chart', {
            onMetricChanged: (e) => console.log(e),
            onTimezoneChanged: (e) => console.log(e),
            onPeriodChanged: (e) => console.log(e)
          }).mount('#ads-reporting-chart');
        </script>
        ```
      </CodeGroup>
    </div>
  </div>

  <div style={{ flex: "1 1 20rem", minWidth: 0 }}>
    <div data-whop-demo-shell style={{ position: "relative", minHeight: "320px", transition: "min-height 200ms ease" }}>
      <div data-whop-demo-skeleton style={{ position: "absolute", inset: "0", borderRadius: "12px", background: "rgba(140, 140, 140, 0.12)", pointerEvents: "none", transition: "opacity 200ms ease" }} />

      <div data-whop-demo-native="element:reporting/chart" data-whop-elements-version="1.0.0-beta.2" style={{ position: "relative" }} />
    </div>

    <p style={{ fontSize: "0.8125rem", opacity: 0.7 }}>Example data. [Open the Playground](/elements/beta/ads/overview#playground).</p>
  </div>
</div>

## Props

<ResponseField name="metric" type="&#x22;funnel&#x22; | &#x22;spend&#x22; | &#x22;impressions&#x22; | &#x22;clicks&#x22; | &#x22;cost_per_1k_impressions&#x22; | &#x22;cost_per_click&#x22; | &#x22;conversions&#x22; | &#x22;conversion_value&#x22; | &#x22;cost_per_conversion&#x22;">
  What the chart plots — `spend`, `impressions`, `clicks`, or a conversion. The picker moves it; set it to open on something else. For `conversions`, `conversion_value` and `cost_per_conversion`, name the conversion in `metricEvent`. Defaults to `"spend"`.
</ResponseField>

<ResponseField name="metricEvent" type="string">
  The conversion `metric` refers to when it is a per-conversion one — `payment.completed`, `pixel.lead`, or a custom event the account names itself. Ignored by every other metric. Defaults to `""`.
</ResponseField>

## Events

Pass callbacks in the create options or React props.

### `onMetricChanged`

The viewer picked a different result to plot. `metric` is what is being plotted; `event` names the conversion it refers to, and is present only for `conversions`, `conversion_value` and `cost_per_conversion` — the account decides what those are called, so it is a string rather than a member. Mirror it into your own URL and hand it back as `metric`/`metricEvent` if you want the choice to survive a reload; the element holds it for the life of the mount either way.

**Signature:** `((payload: { metric: "funnel" | "spend" | "impressions" | "clicks" | "cost_per_1k_impressions" | "cost_per_click" | "conversions" | "conversion_value" | "cost_per_conversion"; event?: string | undefined; }) => void)`

### `onTimezoneChanged`

The viewer switched which zone the figures are reported in: the choice they made AND the IANA zone it resolves to. The choice is the half that survives a reload — persist it and pass it back as `timezone`, which is what the Whop dashboard does with its own copy; the element holds it for the life of the mount either way. `resolved` comes along so a host can label its own figures without repeating the account-preference lookup, and is the viewer's own zone whenever the account has set none.

**Signature:** `((payload: { timezone: "account" | "local"; resolved: string; }) => void)`

### `onPeriodChanged`

The viewer moved the reporting window: the period they picked AND the window it resolves to, as ISO 8601 instants. The dates come resolved because a period name alone would leave you redoing the day-boundary and account-timezone arithmetic to act on it; the period comes too because only it survives a reload as a ROLLING window — stored dates would pin it. Every surface under the same handle has already followed the move.

**Signature:** `((payload: { period: "today" | "yesterday" | "last_7_days" | "last_14_days" | "last_30_days" | "last_90_days" | "all_time" | "custom"; from: string; to: string; }) => void)`

### `onLoaderStart`

Runs after the loading skeleton first paints and before `onReady`.

**Signature:** `(() => void)`

### `onReady`

Runs after the element's first complete paint.

**Signature:** `(() => void)`

### `onError`

Runs when the element fails to load or crashes. The fallback remains visible. Use `code` for programmatic handling. `sourceKey` identifies a failed host-state source.

**Signature:** `((e: { message: string; code?: string | undefined; sourceKey?: string | undefined; }) => void)`

## Methods

Call these on the handle returned by `create`, or through a React `ref`.

### `mount`

Mounts the element in `target` and starts loading. React components mount themselves.

**Signature:** `(target: string | HTMLElement) => void`

### `destroy`

Removes the element and releases its frame and subscriptions. You can call it more than once. React removes the element automatically.

**Signature:** `() => void`

### `update`

Merges new props into the mounted element. In React, change the component props instead.

**Signature:** `(options: Partial<ChartElementProps>) => void`

## Styling

This element doesn't expose class names for styling. Use `appearance` (theme, accent color, variables) to restyle it.
