> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# TableElement

> An advertising account's campaigns, ad groups, and ads in one table, with the tabs that move between them: pick rows to narrow the level below, search, sort, break the numbers down, choose your columns, and pause, resume, duplicate, or delete straight from a row. The window it reports on and the rows it is filtered to live on the handle, so a chart mounted beside it reports on exactly the same thing.

<Info>This page documents `@whop/elements@1.0.0-beta.2` and `@whop/elements-react@1.0.0-beta.2`.</Info>

*Pre-release, not yet part of a stable release.*

Mounts inside [`Reporting`](/elements/beta/ads/reporting), in [`Ads`](/elements/beta/ads/overview). `accountId` and `accessToken` come from `Ads`. Pass props and callbacks through the create options or React props.

<div data-whop-split style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start", flexWrap: "wrap" }}>
  <div style={{ flex: "1 1 26rem", minWidth: 0 }}>
    <div data-whop-usage="ads/reporting-table">
      <CodeGroup>
        ```tsx React theme={null}
        import { WhopElements, Ads, Reporting, TableElement } from "@whop/elements-react";
        import { loadWhop } from "@whop/elements";

        function Example() {
          return (
            <WhopElements elements={loadWhop()}>
              <Ads /* options */>
                <Reporting>
                  <TableElement onTabChanged={(e) => console.log(e)} onFilterChanged={(e) => console.log(e)} onColumnsChanged={(e) => console.log(e)} onCustomMetricsChanged={(e) => console.log(e)} onViewChanged={(e) => console.log(e)} onSourcesChanged={(e) => console.log(e)} onAttributionModelChanged={(e) => console.log(e)} />
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
          reporting.create('table', {
            onTabChanged: (e) => console.log(e),
            onFilterChanged: (e) => console.log(e),
            onColumnsChanged: (e) => console.log(e),
            onCustomMetricsChanged: (e) => console.log(e),
            onViewChanged: (e) => console.log(e),
            onSourcesChanged: (e) => console.log(e),
            onAttributionModelChanged: (e) => console.log(e)
          }).mount('#ads-reporting-table');
        </script>
        ```
      </CodeGroup>
    </div>
  </div>

  <div style={{ flex: "1 1 20rem", minWidth: 0 }}>
    <div data-whop-demo-shell style={{ position: "relative", minHeight: "320px", transition: "min-height 200ms ease" }}>
      <div data-whop-demo-skeleton style={{ position: "absolute", inset: "0", borderRadius: "12px", background: "rgba(140, 140, 140, 0.12)", pointerEvents: "none", transition: "opacity 200ms ease" }} />

      <div data-whop-demo-native="element:reporting/table" data-whop-elements-version="1.0.0-beta.2" style={{ position: "relative" }} />
    </div>

    <p style={{ fontSize: "0.8125rem", opacity: 0.7 }}>Example data. [Open the Playground](/elements/beta/ads/overview#playground).</p>
  </div>
</div>

## Props

<ResponseField name="useCampaignCreator" type="boolean">
  What happens when a viewer asks to edit — from a row menu, a draft row, or Edit ad in the details overlay. On by default: the campaign builder opens over the page, on the campaign and step they asked for, so editing works with nothing wired up. Turn it off to handle campaign editing yourself — nothing opens, and the request comes back on `editRequested`. Defaults to `true`.
</ResponseField>

<ResponseField name="breakdown" type="&#x22;age&#x22; | &#x22;gender&#x22; | &#x22;age_gender&#x22; | &#x22;placement&#x22; | &#x22;publisher_platform&#x22; | &#x22;device_platform&#x22; | &#x22;impression_device&#x22; | &#x22;country&#x22; | &#x22;region&#x22; | &#x22;hour&#x22; | null">
  How rows are broken down — by country, platform, placement — or `null` for whole rows. Defaults to `null`.
</ResponseField>

<ResponseField name="columns" type="string[] | null">
  The columns on show, by name — standard ones like `impressions` and `roas`, and any pixel events the viewer added. Unset, the table opens on its own defaults. Comes back whole on `columnsChanged`; store the list and pass it here to have the layout stick. Defaults to `null`.
</ResponseField>

<ResponseField name="customMetrics" type="CustomMetricDefinition[]">
  Columns computed from the figures already in the table — a formula that you name and format. The table can edit them, and every change comes back on `customMetricsChanged` as the whole new list; persist it and pass it here to have it stick. Defaults to `[]`.
</ResponseField>

<ResponseField name="sourcesDrill" type="string | null">
  What the All tab is drilled into, as a source path: `null` for the roots, `ext:*` for a platform list, `ext:<platform>:*` for that platform’s campaigns. Comes back on `viewChanged`. Defaults to `null`.
</ResponseField>

<ResponseField name="query" type="string">
  What the Ads tab’s search box is filtered to. Defaults to `""`.
</ResponseField>

<ResponseField name="showPausedCampaigns" type="boolean">
  Whether paused campaigns are listed. Defaults to `true`.
</ResponseField>

## Events

Pass callbacks in the create options or React props.

### `onTabChanged`

The open tab changed. Mirror it into your own URL if you want it to survive a reload.

**Signature:** `((payload: { tab: "ads" | "all" | "campaigns" | "ad-groups"; }) => void)`

### `onFilterChanged`

The viewer narrowed the view — by ticking rows, or by clicking through a campaign to its ad groups. Every surface under the same handle has already followed it.

**Signature:** `((payload: { campaignIds: string[]; adGroupIds: string[]; adIds: string[]; }) => void)`

### `onColumnsChanged`

The viewer showed or hid a column. Carries every column now on show, standard and pixel-event alike — store the list and pass it straight back as `columns`, or the layout resets on the next mount.

**Signature:** `((payload: { columns: string[]; }) => void)`

### `onCustomMetricsChanged`

The viewer added, edited, or removed a computed column. Carries the entire list either way — store it as given and pass it back as `customMetrics`, or they are gone on the next mount.

**Signature:** `((payload: { customMetrics: CustomMetricDefinition[]; }) => void)`

### `onViewChanged`

The viewer moved one of the table’s own controls — the All tab’s drill, the breakdown, the search box, the paused toggle. Carries all four whichever moved; store them and pass them back as props, or they reset on the next mount.

**Signature:** `((payload: { sourcesDrill: string | null; breakdown: "age" | "gender" | "age_gender" | "placement" | "publisher_platform" | "device_platform" | "impression_device" | "country" | "region" | "hour" | null; query: string; showPausedCampaigns: boolean; }) => void)`

### `onSourcesChanged`

What the All tab is now looking at, as source paths ready to hand to a chart: `null` off the All tab (Whop advertising alone), `[]` for every source, otherwise the ticked rows or the drilled-into group. Every surface under the same handle has already followed it.

**Signature:** `((payload: { sources: string[] | null; }) => void)`

### `onAttributionModelChanged`

The viewer changed which touch gets the credit, from the picker on the All tab. Every surface under the same handle has already re-credited; persist it and pass it back as `attributionModel`, or it reverts to last touch on the next mount.

**Signature:** `((payload: { attributionModel: "last_touch" | "first_touch"; }) => void)`

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

**Signature:** `(options: Partial<TableElementProps>) => void`

## Styling

This element doesn't expose class names for styling. Use `appearance` (theme, accent color, variables) to restyle it.
