> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# EventsElement

> Every event the account measured — page views, leads, purchases, and custom pixel events — as a raw, filterable stream. The rows behind any metric: filter by event, source, geography, or device over the handle’s window, or search one person’s identifier to read their whole journey. A person cell follows `links.person` when the handle configures it, and otherwise comes back to you as `personOpened`.

<Info>This page documents `@whop/elements@1.0.0-beta.2` and `@whop/elements-react@1.0.0-beta.2`.</Info>

*Pre-release, not yet part of a stable release.*

Mounts inside [`Tracking`](/elements/beta/tracking/overview). `accountId` and `accessToken` come from there. Pass props and callbacks through the create options or React props.

<div data-whop-split style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start", flexWrap: "wrap" }}>
  <div style={{ flex: "1 1 26rem", minWidth: 0 }}>
    <div data-whop-usage="tracking/events">
      <CodeGroup>
        ```tsx React theme={null}
        import { WhopElements, Tracking, EventsElement } from "@whop/elements-react";
        import { loadWhop } from "@whop/elements";

        function Example() {
          return (
            <WhopElements elements={loadWhop()}>
              <Tracking /* options */>
                <EventsElement onPeriodChanged={(e) => console.log(e)} onAttributionModelChanged={(e) => console.log(e)} onFiltersChanged={(e) => console.log(e)} onPersonOpened={(e) => console.log(e)} />
              </Tracking>
            </WhopElements>
          );
        }
        ```

        ```html JavaScript theme={null}
        <script src="https://js.whop.cloud/elements/amber/elements.js" data-whop-elements></script>
        <script type="module">
          const tracking = window.WhopElements().tracking.create({ /* options */ });
          tracking.create('events', {
            onPeriodChanged: (e) => console.log(e),
            onAttributionModelChanged: (e) => console.log(e),
            onFiltersChanged: (e) => console.log(e),
            onPersonOpened: (e) => console.log(e)
          }).mount('#tracking-events');
        </script>
        ```
      </CodeGroup>
    </div>
  </div>

  <div style={{ flex: "1 1 20rem", minWidth: 0 }}>
    <div data-whop-demo-shell style={{ position: "relative", minHeight: "320px", transition: "min-height 200ms ease" }}>
      <div data-whop-demo-skeleton style={{ position: "absolute", inset: "0", borderRadius: "12px", background: "rgba(140, 140, 140, 0.12)", pointerEvents: "none", transition: "opacity 200ms ease" }} />

      <div data-whop-demo-native="element:tracking/events" data-whop-elements-version="1.0.0-beta.2" style={{ position: "relative" }} />
    </div>

    <p style={{ fontSize: "0.8125rem", opacity: 0.7 }}>Example data. [Open the Playground](/elements/beta/tracking/overview#playground).</p>
  </div>
</div>

## Props

<ResponseField name="from" type="string">
  Pin the window to an exact ISO 8601 instant instead of the handle’s `period` — how a deep link reproduces the precise rows behind a metric. Set both `from` and `to` or neither. Defaults to `""`.
</ResponseField>

<ResponseField name="to" type="string">
  The pinned window’s end, as an ISO 8601 instant. Defaults to `""`.
</ResponseField>

<ResponseField name="source" type="string">
  Narrow to events attributed to a traffic source, as a source path — `whop:adcamp_…:*` for one of the account’s campaigns, `ext:*`, `referrer:*`, `direct`. Defaults to `""`.
</ResponseField>

<ResponseField name="utmSource" type="string">
  Narrow by the `utm_source` the traffic carried. Defaults to `""`.
</ResponseField>

<ResponseField name="country" type="string">
  Narrow by ISO 3166-1 alpha-2 country code, such as `US` or `GB`. Defaults to `""`.
</ResponseField>

<ResponseField name="device" type="string">
  Narrow by device class — `desktop`, `mobile`, `tablet`, `bot`. Defaults to `""`.
</ResponseField>

<ResponseField name="browser" type="string">
  Narrow by browser name. Defaults to `""`.
</ResponseField>

<ResponseField name="os" type="string">
  Narrow by operating system name. Defaults to `""`.
</ResponseField>

<ResponseField name="identifier" type="string">
  Narrow to one person’s journey — a person ID, an email, or a visitor cookie. Set, the list ignores the window and shows their whole history. The search box moves this. Defaults to `""`.
</ResponseField>

<ResponseField name="event" type="string">
  Narrow by event name — `payment.completed`, `pixel.lead`, `pixel.page`, or `pixel.custom:<name>` for a custom event. The same value the ads table’s result counts link with. Defaults to `""`.
</ResponseField>

## Events

Pass callbacks in the create options or React props.

### `onPeriodChanged`

The viewer moved the window from the period selector. Every surface under the same handle has already followed it; persist it and pass it back as `period`/`customRange` on the handle, or the window resets on the next mount.

**Signature:** `((payload: { period: "today" | "yesterday" | "last_7_days" | "last_14_days" | "last_30_days" | "last_90_days" | "all_time" | "custom"; customRange: { from: string; to: string; } | null; }) => void)`

### `onAttributionModelChanged`

The viewer changed which touch gets the credit, from the filter row’s Attribution menu. Every surface under the same handle has already re-credited; persist it and pass it back as `attributionModel` on the handle, or it reverts on the next mount.

**Signature:** `((payload: { attributionModel: "last_touch" | "first_touch"; }) => void)`

### `onFiltersChanged`

The viewer moved a filter or the identifier search. Carries the entire filter state whichever moved — mirror it into your own URL and pass it back as props to make the view reproducible.

**Signature:** `((payload: EventsFilterBag) => void)`

### `onPersonOpened`

The viewer clicked a person cell and the handle has no `links.person` to follow — open your own person view with it (`personId` is the stable per-person key; `identifier` is the most human-meaningful one the surface has), or pass `links.person` on the handle to turn the cells into real anchors instead.

**Signature:** `((payload: { identifier: string; personId: string; }) => void)`

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

**Signature:** `(options: Partial<EventsElementProps>) => void`

## Styling

This element doesn't expose class names for styling. Use `appearance` (theme, accent color, variables) to restyle it.
