> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# CardElement

> Prearranged fields for card number, expiration, and security code. Create with `payments.create("card")`, enable your payment button from `onChange`, and confirm with `payments.createConfirmationToken()`. Card numbers remain in PCI-isolated hosted fields. `layout` supports `stacked` (default) and `compact`.

Mounts inside [`Payments`](/elements/upcoming/payments/overview). Pass props and callbacks through the create options or React props.

<Note>**Exclusive.** `CardElement` is an alternative to `PaymentElement` or `CardFields` in this Payments handle. Mount one at a time. Destroy it before mounting another.</Note>

<div data-whop-split style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start", flexWrap: "wrap" }}>
  <div style={{ flex: "1 1 26rem", minWidth: 0 }}>
    <div data-whop-usage="payments/card">
      <CodeGroup>
        ```tsx React theme={null}
        import { WhopElements, Payments, CardElement } from "@whop/elements-react";
        import { loadWhop } from "@whop/elements";

        function Example() {
          return (
            <WhopElements elements={loadWhop()}>
              <Payments /* options */>
                <CardElement onChange={(e) => console.log(e)} />
              </Payments>
            </WhopElements>
          );
        }
        ```

        ```html JavaScript theme={null}
        <script src="https://js.whop.cloud/elements/amber/elements.js" data-whop-elements></script>
        <script type="module">
          const payments = window.WhopElements().payments.create({ /* options */ });
          payments.create('card', { onChange: (e) => console.log(e) }).mount('#payments-card');
        </script>
        ```
      </CodeGroup>
    </div>
  </div>

  <div style={{ flex: "1 1 20rem", minWidth: 0 }}>
    <div data-whop-demo-shell style={{ position: "relative", minHeight: "320px", transition: "min-height 200ms ease" }}>
      <div data-whop-demo-skeleton style={{ position: "absolute", inset: "0", borderRadius: "12px", background: "rgba(140, 140, 140, 0.12)", pointerEvents: "none", transition: "opacity 200ms ease" }} />

      <div data-whop-demo-native="element:payments/card" data-whop-elements-version="" style={{ position: "relative" }} />
    </div>

    <p style={{ fontSize: "0.8125rem", opacity: 0.7 }}>Example data. [Open the Playground](/elements/upcoming/payments/overview#playground).</p>
  </div>
</div>

## Props

<ResponseField name="layout" type="&#x22;compact&#x22; | &#x22;stacked&#x22;">
  `stacked` (default) places the card number above expiration and security code. `compact` places all three in one row. Defaults to `"stacked"`.
</ResponseField>

## Events

Pass callbacks in the create options or React props.

### `onChange`

Fires when card fields change. `complete` becomes true after the buyer fills all three. Use it to enable confirmation. `brand` is the detected card network. `funding` is the detected funding type (`credit`, `debit`, or `prepaid`), `null` until the number identifies one. `issuingCountry` is the lowercase two-letter code of the country the card was issued in, `null` until the number identifies one.

**Signature:** `((payload: { complete: boolean; brand: string; funding: string | null; issuingCountry: string | null; }) => void)`

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

**Signature:** `(options: Partial<CardElementProps>) => void`

## Styling

Style these parts through `appearance.classes`. Use camel case or kebab case for property names and include units. Page stylesheets can't reach the element's frame. The framework validates each declaration before injecting it.

| Class                         | Targets                                                   |
| ----------------------------- | --------------------------------------------------------- |
| `.whop-Card`                  | Card element root                                         |
| `.whop-CardError`             | Card configuration error pane                             |
| `.whop-CardField`             | Card number, expiration, or security code field           |
| `.whop-CardFieldError`        | Card validation message                                   |
| `.whop-CardFieldGroup`        | Stacked card number, expiration, and security code fields |
| `.whop-CardFieldInput`        | Bordered PCI input container                              |
| `.whop-CardFieldInputFocused` | Focused PCI input container                               |
| `.whop-CardFieldInputInvalid` | Invalid or incomplete PCI input container                 |
| `.whop-CardFieldRow`          | Compact card number, expiration, and security code row    |
| `.whop-CardSaveNotice`        | Payment method saving consent                             |

```ts theme={null}
const payments = whop.payments.create({
  appearance: {
    classes: {
      'whop-Card': { borderRadius: '8px', fontWeight: '600' },
      'whop-CardError': { borderRadius: '8px', fontWeight: '600' },
      'whop-CardField': { borderRadius: '8px', fontWeight: '600' }
    }
  }
});

// 10 classes use this shape
payments.update({
  appearance: { classes: { 'whop-Card': { fontWeight: '700' } } }
});
```

In React, pass `appearance` to `<Payments>`. Set it globally with `WhopElements({ appearance })`.
