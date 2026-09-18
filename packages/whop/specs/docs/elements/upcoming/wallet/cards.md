> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# CardsElement

> Lists the account's active issued cards, most recently issued first. Needs an `accessToken`. The title and rows are click targets that emit events instead of navigating — a host wires up its own routing and card-detail UI.

Mounts inside [`Wallet`](/elements/upcoming/wallet/overview). `accountId` comes from there. Pass props and callbacks through the create options or React props. Keep the created handle, or React `ref`, to call `refresh()`.

<div data-whop-split style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start", flexWrap: "wrap" }}>
  <div style={{ flex: "1 1 26rem", minWidth: 0 }}>
    <div data-whop-usage="wallet/cards">
      <CodeGroup>
        ```tsx React theme={null}
        import { WhopElements, Wallet, CardsElement } from "@whop/elements-react";
        import { loadWhop } from "@whop/elements";

        function Example() {
          return (
            <WhopElements elements={loadWhop()}>
              <Wallet /* options */>
                <CardsElement onCardSelected={(e) => console.log(e)} onViewAllSelected={(e) => console.log(e)} onAddCardRequested={(e) => console.log(e)} onVerificationRequested={(e) => console.log(e)} />
              </Wallet>
            </WhopElements>
          );
        }
        ```

        ```html JavaScript theme={null}
        <script src="https://js.whop.cloud/elements/amber/elements.js" data-whop-elements></script>
        <script type="module">
          const wallet = window.WhopElements().wallet.create({ /* options */ });
          wallet.create('cards', {
            onCardSelected: (e) => console.log(e),
            onViewAllSelected: (e) => console.log(e),
            onAddCardRequested: (e) => console.log(e),
            onVerificationRequested: (e) => console.log(e)
          }).mount('#wallet-cards');
        </script>
        ```
      </CodeGroup>
    </div>
  </div>

  <div style={{ flex: "1 1 20rem", minWidth: 0 }}>
    <div data-whop-demo-shell style={{ position: "relative", minHeight: "320px", transition: "min-height 200ms ease" }}>
      <div data-whop-demo-skeleton style={{ position: "absolute", inset: "0", borderRadius: "12px", background: "rgba(140, 140, 140, 0.12)", pointerEvents: "none", transition: "opacity 200ms ease" }} />

      <div data-whop-demo-native="element:wallet/cards" data-whop-elements-version="" style={{ position: "relative" }} />
    </div>

    <p style={{ fontSize: "0.8125rem", opacity: 0.7 }}>Example data. [Open the Playground](/elements/upcoming/wallet/overview#playground).</p>
  </div>
</div>

## Props

<ResponseField name="accessToken" type="string">
  A scoped token for the privileged read and verification start — needs `payout:account:read` and `identity:write`. Mint it on your server with `POST /api/v1/access_tokens`. Omitted, the calls carry the viewer's own session, which only answers same-origin.
</ResponseField>

<ResponseField name="enabled" type="boolean">
  Off, the element fetches nothing and keeps the title and "+" button visible with an empty body — for a host that only wants to fetch once some precondition (card issuing being active for this account, say) is true. Defaults to `true`.
</ResponseField>

<ResponseField name="limit" type="number | null">
  Cap the rows shown, most recently issued first. `null` shows every active card. Defaults to `null`.
</ResponseField>

<ResponseField name="disableRedirect" type="boolean">
  Render the title as plain, unclickable text instead of a click target. Off by default, in which case clicking the title emits `viewAllSelected` for you to route to the full cards list — the element never navigates. Defaults to `false`.
</ResponseField>

<ResponseField name="hideAddButton" type="boolean">
  Hide the "+" button. Off by default, in which case clicking it emits `addCardRequested`. Defaults to `false`.
</ResponseField>

## Events

Pass callbacks in the create options or React props.

### `onCardSelected`

A card row was clicked. Open your own card details for it — the element never navigates.

**Signature:** `((payload: { cardId: string; }) => void)`

### `onViewAllSelected`

The title was clicked. Only fires when `disableRedirect` is false.

**Signature:** `((payload: Record<string, never>) => void)`

### `onAddCardRequested`

The "+" button was clicked. Only fires when `hideAddButton` is false.

**Signature:** `((payload: Record<string, never>) => void)`

### `onVerificationRequested`

The viewer pressed the verify button on an account with no card program. The element starts the hosted session and leaves for it itself — this fires alongside, so a host can record the trip or show its own state.

**Signature:** `((payload: { accountId: string; }) => void)`

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

Re-fetch the account's cards. Call it after a mutation made elsewhere (rename, freeze, cancel, a new card) so the list reflects it without waiting for the cache to expire.

**Signature:** `() => Promise<void>`

### `mount`

Mounts the element in `target` and starts loading. React components mount themselves.

**Signature:** `(target: string | HTMLElement) => void`

### `destroy`

Removes the element and releases its frame and subscriptions. You can call it more than once. React removes the element automatically.

**Signature:** `() => void`

### `update`

Merges new props into the mounted element. In React, change the component props instead.

**Signature:** `(options: Partial<CardsElementProps>) => void`

## Styling

Style these parts through `appearance.classes`. Use camel case or kebab case for property names and include units. Page stylesheets can't reach the element's frame. The framework validates each declaration before injecting it.

| Class                | Targets                                                           |
| -------------------- | ----------------------------------------------------------------- |
| `.whop-CardRow`      | One issued card — its icon, nickname, and last4                   |
| `.whop-CardsSurface` | The issued-cards list — title, add button, and up to 'limit' rows |

```ts theme={null}
const wallet = whop.wallet.create({
  appearance: {
    classes: {
      'whop-CardRow': { borderRadius: '8px', fontWeight: '600' },
      'whop-CardsSurface': { borderRadius: '8px', fontWeight: '600' }
    }
  }
});

wallet.update({
  appearance: { classes: { 'whop-CardRow': { fontWeight: '700' } } }
});
```

In React, pass `appearance` to `<Wallet>`. Set it globally with `WhopElements({ appearance })`.
