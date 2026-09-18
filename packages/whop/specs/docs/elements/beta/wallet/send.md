> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# SendElement

> Sends money from an account to a recipient — a user, another account, or a public claim link anyone can redeem. Renders its own recipient search resolved from the account ID with no credentials beyond the account's own token. Needs an `accessToken` scoped to `payout:withdraw_funds`; account recipient search additionally needs `company:authorized_user:read` and `member:basic:read`, and account claim links need `airdrop_link:manage` — a host without one of those scopes should turn off the matching prop rather than leave a row that will 403.

<Info>This page documents `@whop/elements@1.0.0-beta.2` and `@whop/elements-react@1.0.0-beta.2`.</Info>

*Pre-release, not yet part of a stable release.*

Mounts inside [`Wallet`](/elements/beta/wallet/overview). Pass props and callbacks through the create options or React props. Keep the created handle, or React `ref`, to call `refresh()`.

<Note>You can mount this element **inline** (`create`) or open it as a **modal** overlay (`createOverlay`).</Note>

<div data-whop-split style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start", flexWrap: "wrap" }}>
  <div style={{ flex: "1 1 26rem", minWidth: 0 }}>
    <div data-whop-usage="wallet/send">
      <CodeGroup>
        ```tsx React theme={null}
        import { WhopElements, Wallet, SendElement } from "@whop/elements-react";
        import { loadWhop } from "@whop/elements";

        function Example() {
          return (
            <WhopElements elements={loadWhop()}>
              <Wallet /* options */>
                <SendElement onStepChanged={(e) => console.log(e)} onSendCompleted={(e) => console.log(e)} onLinkCreated={(e) => console.log(e)} onDone={(e) => console.log(e)} />
              </Wallet>
            </WhopElements>
          );
        }
        ```

        ```html JavaScript theme={null}
        <script src="https://js.whop.cloud/elements/amber/elements.js" data-whop-elements></script>
        <script type="module">
          const wallet = window.WhopElements().wallet.create({ /* options */ });
          wallet.create('send', {
            onStepChanged: (e) => console.log(e),
            onSendCompleted: (e) => console.log(e),
            onLinkCreated: (e) => console.log(e),
            onDone: (e) => console.log(e)
          }).mount('#wallet-send');
        </script>
        ```
      </CodeGroup>
    </div>
  </div>

  <div style={{ flex: "1 1 20rem", minWidth: 0 }}>
    <div data-whop-demo-shell style={{ position: "relative", minHeight: "320px", transition: "min-height 200ms ease" }}>
      <div data-whop-demo-skeleton style={{ position: "absolute", inset: "0", borderRadius: "12px", background: "rgba(140, 140, 140, 0.12)", pointerEvents: "none", transition: "opacity 200ms ease" }} />

      <div data-whop-demo-native="element:wallet/send" data-whop-elements-version="1.0.0-beta.2" style={{ position: "relative" }} />
    </div>

    <p style={{ fontSize: "0.8125rem", opacity: 0.7 }}>Example data. [Open the Playground](/elements/beta/wallet/overview#playground).</p>
  </div>
</div>

## Props

<ResponseField name="accessToken" type="string">
  A scoped token for the privileged read/write — needs `payout:withdraw_funds` (plus `company:authorized_user:read` and `member:basic:read` for recipient search, `airdrop_link:manage` for claim links). Omitted, the read carries the viewer's own session, which only answers same-origin.
</ResponseField>

<ResponseField name="canSearchRecipients" type="boolean">
  Off, only the team/other-account list shows — no search box. For a host that knows the viewer lacks `member:basic:read`. Defaults to `true`.
</ResponseField>

<ResponseField name="canCreateLink" type="boolean">
  Off, the "Send via link" row is hidden. For a host that knows the viewer lacks `airdrop_link:manage`. Defaults to `true`.
</ResponseField>

<ResponseField name="initialRecipient" type="SendRecipient | null">
  Skip the picker and open straight onto this recipient's amount screen — for a "pay this person" action row. No back button is shown in that case, matching there being no picker behind it. Defaults to `null`.
</ResponseField>

<ResponseField name="initialCurrency" type="string">
  Preselect a currency in the amount screen's picker. Falls back to `currency`, then USD. Defaults to `""`.
</ResponseField>

## Events

Pass callbacks in the create options or React props.

### `onStepChanged`

The visible screen changed.

**Signature:** `((payload: { step: "success" | "enter_amount" | "select_recipient" | "create_link" | "link_success"; }) => void)`

### `onSendCompleted`

A transfer succeeded. Refresh anything on your side reading the account's balance or activity.

**Signature:** `((payload: { recipient: SendRecipient; amount: number; currency: string; }) => void)`

### `onLinkCreated`

A claim link was created. Refresh anything on your side reading the account's balance.

**Signature:** `((payload: { claimUrl: string; amount: number; redeemableCount: number; }) => void)`

### `onDone`

The viewer clicked "Done" on a success screen — close the surface holding it.

**Signature:** `((payload: Record<string, never>) => void)`

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

### `refresh`

Re-fetch the account's balances and recipient list. Call it after anything on your side changes what it can offer.

**Signature:** `() => Promise<void>`

### `mount`

Mounts the element in `target` and starts loading. React components mount themselves.

**Signature:** `(target: string | HTMLElement) => void`

### `destroy`

Removes the element and releases its frame and subscriptions. You can call it more than once. React removes the element automatically.

**Signature:** `() => void`

### `update`

Merges new props into the mounted element. In React, change the component props instead.

**Signature:** `(options: Partial<SendElementProps>) => void`

## Styling

Style these parts through `appearance.classes`. Use camel case or kebab case for property names and include units. Page stylesheets can't reach the element's frame. The framework validates each declaration before injecting it.

| Class               | Targets                                      |
| ------------------- | -------------------------------------------- |
| `.whop-SendSurface` | The send element root — one screen at a time |

```ts theme={null}
const wallet = whop.wallet.create({
  appearance: {
    classes: {
      'whop-SendSurface': { borderRadius: '8px', fontWeight: '600' }
    }
  }
});

wallet.update({
  appearance: { classes: { 'whop-SendSurface': { fontWeight: '700' } } }
});
```

In React, pass `appearance` to `<Wallet>`. Set it globally with `WhopElements({ appearance })`.
