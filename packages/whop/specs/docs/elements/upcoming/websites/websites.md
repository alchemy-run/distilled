> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# WebsitesElement

> An account's websites in one table: every site built on whop.app — listed from the moment it exists, zeros until traffic arrives — merged by hostname with every domain the Whop Pixel reports. Rows for the whop.app sites carry a Whop mark, so the two sources stay apart even when both have traffic. Each row shows a page-view trend, unique visitors, page views, attributed sales, USD revenue, and the last day an event arrived. Expanding a domain loads its most-viewed pages, and each page-view figure opens the breakdown of which events made it up. Set `showVerify` to add a per-row button that asks the page hosting this element to open the site and confirm the pixel is firing; set `showSettings` to add a settings button on whop.app rows that reports the click through `onSettingsRequested`, and `showEdit` to add a primary edit button reporting through `onEditRequested` — your page owns the actual editing.

Mounts inside [`Websites`](/elements/upcoming/websites/overview). `accountId` and `windowDays` come from there. Pass props and callbacks through the create options or React props.

<div data-whop-split style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start", flexWrap: "wrap" }}>
  <div style={{ flex: "1 1 26rem", minWidth: 0 }}>
    <div data-whop-usage="websites/websites">
      <CodeGroup>
        ```tsx React theme={null}
        import { WhopElements, Websites, WebsitesElement } from "@whop/elements-react";
        import { loadWhop } from "@whop/elements";

        function Example() {
          return (
            <WhopElements elements={loadWhop()}>
              <Websites /* options */>
                <WebsitesElement onWebsiteToggled={(e) => console.log(e)} onWebsitesLoaded={(e) => console.log(e)} onVerifyRequested={(e) => console.log(e)} onSettingsRequested={(e) => console.log(e)} onEditRequested={(e) => console.log(e)} />
              </Websites>
            </WhopElements>
          );
        }
        ```

        ```html JavaScript theme={null}
        <script src="https://js.whop.cloud/elements/amber/elements.js" data-whop-elements></script>
        <script type="module">
          const websites = window.WhopElements().websites.create({ /* options */ });
          websites.create('websites', {
            onWebsiteToggled: (e) => console.log(e),
            onWebsitesLoaded: (e) => console.log(e),
            onVerifyRequested: (e) => console.log(e),
            onSettingsRequested: (e) => console.log(e),
            onEditRequested: (e) => console.log(e)
          }).mount('#websites-websites');
        </script>
        ```
      </CodeGroup>
    </div>
  </div>

  <div style={{ flex: "1 1 20rem", minWidth: 0 }}>
    <div data-whop-demo-shell style={{ position: "relative", minHeight: "320px", transition: "min-height 200ms ease" }}>
      <div data-whop-demo-skeleton style={{ position: "absolute", inset: "0", borderRadius: "12px", background: "rgba(140, 140, 140, 0.12)", pointerEvents: "none", transition: "opacity 200ms ease" }} />

      <div data-whop-demo-native="element:websites/websites" data-whop-elements-version="" style={{ position: "relative" }} />
    </div>

    <p style={{ fontSize: "0.8125rem", opacity: 0.7 }}>Example data. [Open the Playground](/elements/upcoming/websites/overview#playground).</p>
  </div>
</div>

## Props

*This element takes no consumer props.*

## Events

Pass callbacks in the create options or React props.

### `onWebsiteToggled`

A domain row was expanded or collapsed to show or hide its pages.

**Signature:** `((payload: { domain: string; expanded: boolean; }) => void)`

### `onWebsitesLoaded`

The table settled on a list of domains. Fires on every load, not only when the list changes, so a poll that comes back the same still reports — use it to drop any `pendingWebsites` that are now live.

**Signature:** `((payload: { domains: string[]; }) => void)`

### `onVerifyRequested`

The pixel-check button was pressed. Open `url` and watch for pixel events on your side, then push the outcome back through the handle’s `verifyStatus` so the button reflects it.

**Signature:** `((payload: { target: string; url: string; }) => void)`

### `onSettingsRequested`

The settings button on a whop.app row was pressed. The element only reports the click — open your own editing surface for the app.

**Signature:** `((payload: { appId: string; route: string; domain: string; }) => void)`

### `onEditRequested`

The edit button on a whop.app row was pressed. The element only reports the click — open your own editing surface for the app.

**Signature:** `((payload: { appId: string; route: string; domain: string; }) => void)`

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

**Signature:** `(options: Partial<WebsitesElementProps>) => void`

## Styling

Style these parts through `appearance.classes`. Use camel case or kebab case for property names and include units. Page stylesheets can't reach the element's frame. The framework validates each declaration before injecting it.

| Class                 | Targets                                          |
| --------------------- | ------------------------------------------------ |
| `.whop-WebsitesTable` | The websites element root — the table of domains |

```ts theme={null}
const websites = whop.websites.create({
  appearance: {
    classes: {
      'whop-WebsitesTable': { borderRadius: '8px', fontWeight: '600' }
    }
  }
});

websites.update({
  appearance: { classes: { 'whop-WebsitesTable': { fontWeight: '700' } } }
});
```

In React, pass `appearance` to `<Websites>`. Set it globally with `WhopElements({ appearance })`.
