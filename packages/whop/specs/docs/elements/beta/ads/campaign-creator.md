> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# CampaignCreatorElement

> The advertising campaign builder: objective and budget, ad groups with their targeting and schedule, and the ads themselves with their creative — the whole flow through to launch. Opens empty to build a new campaign, or on an existing one when you pass `campaignId`. It runs the pixel checker too: a launch is gated on the ad group’s conversion event being live on the destination URL, and the `pixel-setup` wizard opens inside this element to fix an install that is missing. The one token you set on the `ads` handle must carry the pixel scopes alongside the campaign scopes — `ad_campaign:create` and `company:basic:read` — rather than using a separate token per element.

<Info>This page documents `@whop/elements@1.0.0-beta.2` and `@whop/elements-react@1.0.0-beta.2`.</Info>

*Pre-release, not yet part of a stable release.*

Opens as a modal from [`Ads`](/elements/beta/ads/overview): `ads.createOverlay('campaign-creator')`. Pass props and callbacks in the create options.

<Note>This element is **modal-only**. Open it with `createOverlay`; it has no inline mount.</Note>

<div data-whop-split style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start", flexWrap: "wrap" }}>
  <div style={{ flex: "1 1 26rem", minWidth: 0 }}>
    <div data-whop-usage="ads/campaign-creator">
      <CodeGroup>
        ```tsx React theme={null}
        import { WhopElements, Ads, CampaignCreatorElement } from "@whop/elements-react";
        import { loadWhop } from "@whop/elements";

        function Example() {
          return (
            <WhopElements elements={loadWhop()}>
              <Ads /* options */>
                <CampaignCreatorElement onExited={(e) => console.log(e)} onLaunched={(e) => console.log(e)} />
              </Ads>
            </WhopElements>
          );
        }
        ```

        ```html JavaScript theme={null}
        <script src="https://js.whop.cloud/elements/amber/elements.js" data-whop-elements></script>
        <script type="module">
          const ads = window.WhopElements().ads.create({ /* options */ });
          ads.createOverlay('campaign-creator', {
            onExited: (e) => console.log(e),
            onLaunched: (e) => console.log(e)
          }).open();
        </script>
        ```
      </CodeGroup>
    </div>
  </div>

  <div style={{ flex: "1 1 20rem", minWidth: 0 }}>
    <div data-whop-demo-shell style={{ position: "relative", minHeight: "320px", transition: "min-height 200ms ease" }}>
      <div data-whop-demo-skeleton style={{ position: "absolute", inset: "0", borderRadius: "12px", background: "rgba(140, 140, 140, 0.12)", pointerEvents: "none", transition: "opacity 200ms ease" }} />

      <div data-whop-demo-native="element:ads/campaign-creator" data-whop-elements-version="1.0.0-beta.2" style={{ position: "relative" }} />
    </div>

    <p style={{ fontSize: "0.8125rem", opacity: 0.7 }}>Example data. [Open the Playground](/elements/beta/ads/overview#playground).</p>
  </div>
</div>

## Props

<ResponseField name="campaignId" type="string">
  The campaign (`adcamp_…`) to open. Empty builds a new one. A draft opens where it was left off; a launched campaign opens in edit mode. Defaults to `""`.
</ResponseField>

<ResponseField name="adGroupId" type="string">
  The ad group (`adgrp_…`) to open in focus, within `campaignId`. Ignored when the campaign has no such group, and when `campaignId` is empty. Defaults to `""`.
</ResponseField>

<ResponseField name="adId" type="string">
  The ad (`ad_…`) to open in focus, within `adGroupId`. Ignored when that group has no such ad, and when `adGroupId` is empty. Defaults to `""`.
</ResponseField>

<ResponseField name="initialStep" type="&#x22;ads&#x22; | &#x22;ad-groups&#x22; | &#x22;campaign-settings&#x22;">
  Which step to open on: `campaign-settings`, `ad-groups`, or `ads`. The dashboard deep-links this off its own URL; pass it to drop an account owner straight onto the part they came to change. Read once at mount — moving it later will not walk them between steps. Defaults to `"campaign-settings"`.
</ResponseField>

## Events

Pass callbacks in the create options or React props.

### `onExited`

The account owner backed out of the builder without launching. Nothing has been discarded — a draft campaign, if one was started, is already saved. An overlay has already closed itself by the time this fires; react to it if your page needs to.

**Signature:** `((payload: Record<string, never>) => void)`

### `onLaunched`

A campaign went live. `firstLaunch` marks the account’s first ever launched campaign, which is what the dashboard uses to show its welcome state. An overlay has already closed itself; this is where you route onward.

**Signature:** `((payload: { campaignId: string; firstLaunch: boolean; }) => void)`

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

**Signature:** `(options: Partial<CampaignCreatorElementProps>) => void`

## Styling

Style these parts through `appearance.classes`. Use camel case or kebab case for property names and include units. Page stylesheets can't reach the element's frame. The framework validates each declaration before injecting it.

| Class                     | Targets                                          |
| ------------------------- | ------------------------------------------------ |
| `.whop-PixelSetupSurface` | The pixel setup wizard root — one step at a time |

```ts theme={null}
const ads = whop.ads.create({
  appearance: {
    classes: {
      'whop-PixelSetupSurface': { borderRadius: '8px', fontWeight: '600' }
    }
  }
});

ads.update({
  appearance: {
    classes: { 'whop-PixelSetupSurface': { fontWeight: '700' } }
  }
});
```

In React, pass `appearance` to `<Ads>`. Set it globally with `WhopElements({ appearance })`.
