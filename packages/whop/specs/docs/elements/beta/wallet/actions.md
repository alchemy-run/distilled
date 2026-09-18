> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# ActionsElement

> The account action row from Whop's balance dashboard. Deposit and Send open the Wallet controller's built-in overlays. Accept opens Whop's checkout-link creator for a business account or company creation for a personal account. Each button also emits its requested event so the embedding page can observe the action.

<Info>This page documents `@whop/elements@1.0.0-beta.2` and `@whop/elements-react@1.0.0-beta.2`.</Info>

*Pre-release, not yet part of a stable release.*

Mounts inside [`Wallet`](/elements/beta/wallet/overview). Pass props and callbacks through the create options or React props.

<div data-whop-split style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start", flexWrap: "wrap" }}>
  <div style={{ flex: "1 1 26rem", minWidth: 0 }}>
    <div data-whop-usage="wallet/actions">
      <CodeGroup>
        ```tsx React theme={null}
        import { WhopElements, Wallet, ActionsElement } from "@whop/elements-react";
        import { loadWhop } from "@whop/elements";

        function Example() {
          return (
            <WhopElements elements={loadWhop()}>
              <Wallet /* options */>
                <ActionsElement onDepositRequested={(e) => console.log(e)} onAcceptRequested={(e) => console.log(e)} onSendRequested={(e) => console.log(e)} />
              </Wallet>
            </WhopElements>
          );
        }
        ```

        ```html JavaScript theme={null}
        <script src="https://js.whop.cloud/elements/amber/elements.js" data-whop-elements></script>
        <script type="module">
          const wallet = window.WhopElements().wallet.create({ /* options */ });
          wallet.create('actions', {
            onDepositRequested: (e) => console.log(e),
            onAcceptRequested: (e) => console.log(e),
            onSendRequested: (e) => console.log(e)
          }).mount('#wallet-actions');
        </script>
        ```
      </CodeGroup>
    </div>
  </div>

  <div style={{ flex: "1 1 20rem", minWidth: 0 }}>
    <div data-whop-demo-shell style={{ position: "relative", minHeight: "320px", transition: "min-height 200ms ease" }}>
      <div data-whop-demo-skeleton style={{ position: "absolute", inset: "0", borderRadius: "12px", background: "rgba(140, 140, 140, 0.12)", pointerEvents: "none", transition: "opacity 200ms ease" }} />

      <div data-whop-demo-native="element:wallet/actions" data-whop-elements-version="1.0.0-beta.2" style={{ position: "relative" }} />
    </div>

    <p style={{ fontSize: "0.8125rem", opacity: 0.7 }}>Example data. [Open the Playground](/elements/beta/wallet/overview#playground).</p>
  </div>
</div>

## Props

<ResponseField name="showDeposit" type="boolean">
  Show the Deposit button. Defaults to `true`.
</ResponseField>

<ResponseField name="showAccept" type="boolean">
  Show the Accept button. Defaults to `true`.
</ResponseField>

<ResponseField name="showSend" type="boolean">
  Show the Send button. Defaults to `true`.
</ResponseField>

<ResponseField name="depositDisabled" type="boolean">
  Disable the Deposit button while keeping it visible. Defaults to `false`.
</ResponseField>

<ResponseField name="acceptDisabled" type="boolean">
  Disable the Accept button while keeping it visible. Defaults to `false`.
</ResponseField>

<ResponseField name="sendDisabled" type="boolean">
  Disable the Send button while keeping it visible. Defaults to `false`.
</ResponseField>

## Events

Pass callbacks in the create options or React props.

### `onDepositRequested`

The Deposit button was pressed and the Wallet controller opened its deposit overlay.

**Signature:** `((payload: Record<string, never>) => void)`

### `onAcceptRequested`

The Accept button was pressed and the Wallet controller opened the corresponding Whop setup page.

**Signature:** `((payload: Record<string, never>) => void)`

### `onSendRequested`

The Send button was pressed and the Wallet controller opened its send overlay.

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

### `mount`

Mounts the element in `target` and starts loading. React components mount themselves.

**Signature:** `(target: string | HTMLElement) => void`

### `destroy`

Removes the element and releases its frame and subscriptions. You can call it more than once. React removes the element automatically.

**Signature:** `() => void`

### `update`

Merges new props into the mounted element. In React, change the component props instead.

**Signature:** `(options: Partial<ActionsElementProps>) => void`

## Styling

Style these parts through `appearance.classes`. Use camel case or kebab case for property names and include units. Page stylesheets can't reach the element's frame. The framework validates each declaration before injecting it.

| Class           | Targets                                                   |
| --------------- | --------------------------------------------------------- |
| `.whop-Actions` | The row containing the Deposit, Accept, and Send buttons. |

```ts theme={null}
const wallet = whop.wallet.create({
  appearance: {
    classes: {
      'whop-Actions': { borderRadius: '8px', fontWeight: '600' }
    }
  }
});

wallet.update({
  appearance: { classes: { 'whop-Actions': { fontWeight: '700' } } }
});
```

In React, pass `appearance` to `<Wallet>`. Set it globally with `WhopElements({ appearance })`.
