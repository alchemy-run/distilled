> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# PixelSetupElement

> Installs the Whop Pixel and wires conversion events: copy the snippet, check a page for it, confirm the events fire. Mount it inline, or inside your own overlay.

Mounts inside [`Websites`](/elements/upcoming/websites/overview). Pass props and callbacks through the create options or React props.

<Note>You can mount this element **inline** (`create`) or open it as a **modal** overlay (`createOverlay`).</Note>

<div data-whop-split style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start", flexWrap: "wrap" }}>
  <div style={{ flex: "1 1 26rem", minWidth: 0 }}>
    <div data-whop-usage="websites/pixel-setup">
      <CodeGroup>
        ```tsx React theme={null}
        import { WhopElements, Websites, PixelSetupElement } from "@whop/elements-react";
        import { loadWhop } from "@whop/elements";

        function Example() {
          return (
            <WhopElements elements={loadWhop()}>
              <Websites /* options */>
                <PixelSetupElement onRedirectUrlChanged={(e) => console.log(e)} onScanned={(e) => console.log(e)} onFinished={(e) => console.log(e)} onEventVerified={(e) => console.log(e)} />
              </Websites>
            </WhopElements>
          );
        }
        ```

        ```html JavaScript theme={null}
        <script src="https://js.whop.cloud/elements/amber/elements.js" data-whop-elements></script>
        <script type="module">
          const websites = window.WhopElements().websites.create({ /* options */ });
          websites.create('pixel-setup', {
            onRedirectUrlChanged: (e) => console.log(e),
            onScanned: (e) => console.log(e),
            onFinished: (e) => console.log(e),
            onEventVerified: (e) => console.log(e)
          }).mount('#websites-pixel-setup');
        </script>
        ```
      </CodeGroup>
    </div>
  </div>

  <div style={{ flex: "1 1 20rem", minWidth: 0 }}>
    <div data-whop-demo-shell style={{ position: "relative", minHeight: "320px", transition: "min-height 200ms ease" }}>
      <div data-whop-demo-skeleton style={{ position: "absolute", inset: "0", borderRadius: "12px", background: "rgba(140, 140, 140, 0.12)", pointerEvents: "none", transition: "opacity 200ms ease" }} />

      <div data-whop-demo-native="element:websites/pixel-setup" data-whop-elements-version="" style={{ position: "relative" }} />
    </div>

    <p style={{ fontSize: "0.8125rem", opacity: 0.7 }}>Example data. [Open the Playground](/elements/upcoming/websites/overview#playground).</p>
  </div>
</div>

## Props

<ResponseField name="accountId" type="string">
  Account ID, prefixed `biz_`, whose pixel this is. Required; the snippet, scans, and invites all run against it. Defaults to `""`.
</ResponseField>

<ResponseField name="accessToken" type="string">
  A scoped token for the scans and the developer invite. The scans need `company:basic:read`; “Invite a developer” additionally needs `authorized_user:create`, and the event presets read the account with `company:balance:read` (without it the wizard still works, on a generic preset list). Mint it on your server with `POST /api/v1/access_tokens` and set a fresh one before it expires. Another element that opens this wizard inside itself — the ads `campaign-creator` does — runs these calls on its own token, so add these scopes to that one token rather than minting a second: this element has no way to read a credential you set elsewhere. Omitted, the calls carry the viewer’s own session, which only answers same-origin.
</ResponseField>

<ResponseField name="destinationUrl" type="string">
  The page to check, scanned on mount. Leave it blank and the wizard asks for one. Also what gates "Verify live" on the events step — that button walks the account owner through their own funnel to catch events a server-side scan cannot see, so it only appears once a destination is known, from here or named in the wizard. Read once at boot, so `update()` will not retarget mid-flow — mint a fresh mount for a different page. Defaults to `""`.
</ResponseField>

<ResponseField name="eventName" type="string">
  Optional. An event that must fire on that page (`lead`, `schedule`, `view_content`, …); the events step blocks until it is detected. Unset, every event is offered and none is required. Events Whop records server-side (`purchase`, `subscribe`, trials, checkout steps) are ignored. Read once at boot. Defaults to `""`.
</ResponseField>

<ResponseField name="redirectUrl" type="string">
  A URL the destination redirects to, when the event fires there instead. The account owner can also set one in the wizard — listen for `redirectUrlChanged` and pass it back next time. Defaults to `""`.
</ResponseField>

<ResponseField name="initialStep" type="&#x22;events&#x22; | &#x22;install&#x22;">
  Where the wizard opens: the install step, or straight onto `events` when the pixel is already there and only the conversion event is missing. Defaults to `"install"`.
</ResponseField>

<ResponseField name="showIntro" type="boolean">
  Open on the "why a pixel" splash. Turn it off where the account owner already knows why they are here — a campaign flow that sends them in mid-launch — and the wizard opens straight on the install step. Defaults to `true`.
</ResponseField>

<ResponseField name="showInviteDeveloper" type="boolean">
  Offer the "Invite a developer to install it" path. Hide it where the people using your embed should not be inviting members onto the Whop team behind it. Defaults to `true`.
</ResponseField>

<ResponseField name="showOptimizePrompt" type="boolean">
  Show the "your pixel is live" screen after a page checks out, which offers conversion events as the next thing to do. Turn it off where the account owner came for the events themselves — a passing check then goes straight to them instead of pausing on a screen they would click through. Defaults to `true`.
</ResponseField>

## Events

Pass callbacks in the create options or React props.

### `onRedirectUrlChanged`

The account owner set or cleared a redirect URL in the wizard. Persist it and pass it back as `redirectUrl` next time.

**Signature:** `((payload: { url: string; }) => void)`

### `onScanned`

A pixel scan settled. Fires for every URL the wizard checks, so your own install badge can follow it. `primary` marks the page being set up: the funnel checker scans whatever else the account owner lists, other hostnames included, so gate on it before you treat a result as being about their site. You do not need this to keep a `websites` table honest — mounted under that handle, a site proven live already gets its waiting row.

**Signature:** `((payload: { url: string; status: "installed" | "missing" | "unreachable"; installed: boolean; primary: boolean; }) => void)`

### `onFinished`

Done was pressed. Re-check the page yourself — this says the wizard finished, not that your requirements are met.

**Signature:** `((payload: Record<string, never>) => void)`

### `onEventVerified`

The account owner walked their funnel with "Verify live" and this event fired — proof it is wired where a server-side scan cannot reach.

**Signature:** `((payload: { url: string; event: string; }) => void)`

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

**Signature:** `(options: Partial<PixelSetupElementProps>) => void`

## Styling

Style these parts through `appearance.classes`. Use camel case or kebab case for property names and include units. Page stylesheets can't reach the element's frame. The framework validates each declaration before injecting it.

| Class                     | Targets                                          |
| ------------------------- | ------------------------------------------------ |
| `.whop-PixelSetupSurface` | The pixel setup wizard root — one step at a time |

```ts theme={null}
const websites = whop.websites.create({
  appearance: {
    classes: {
      'whop-PixelSetupSurface': { borderRadius: '8px', fontWeight: '600' }
    }
  }
});

websites.update({
  appearance: {
    classes: { 'whop-PixelSetupSurface': { fontWeight: '700' } }
  }
});
```

In React, pass `appearance` to `<Websites>`. Set it globally with `WhopElements({ appearance })`.
