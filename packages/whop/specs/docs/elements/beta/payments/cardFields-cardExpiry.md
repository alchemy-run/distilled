> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# CardExpiryElement

> PCI-isolated hosted card expiration field.

<Info>This page documents `@whop/elements@1.0.0-beta.2` and `@whop/elements-react@1.0.0-beta.2`.</Info>

*Pre-release, not yet part of a stable release.*

Mounts inside [`CardFields`](/elements/beta/payments/cardFields), in [`Payments`](/elements/beta/payments/overview). Pass props and callbacks through the create options or React props.

<div data-whop-split style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start", flexWrap: "wrap" }}>
  <div style={{ flex: "1 1 26rem", minWidth: 0 }}>
    <div data-whop-usage="payments/cardFields-cardExpiry">
      <CodeGroup>
        ```tsx React theme={null}
        import { WhopElements, Payments, CardFields, CardExpiryElement } from "@whop/elements-react";
        import { loadWhop } from "@whop/elements";

        function Example() {
          return (
            <WhopElements elements={loadWhop()}>
              <Payments /* options */>
                <CardFields>
                  <CardExpiryElement />
                </CardFields>
              </Payments>
            </WhopElements>
          );
        }
        ```

        ```html JavaScript theme={null}
        <script src="https://js.whop.cloud/elements/amber/elements.js" data-whop-elements></script>
        <script type="module">
          const payments = window.WhopElements().payments.create({ /* options */ });
          const cardFields = payments.create('cardFields', { /* options */ });
          cardFields.create('cardExpiry').mount('#payments-cardFields-cardExpiry');
        </script>
        ```
      </CodeGroup>
    </div>
  </div>

  <div style={{ flex: "1 1 20rem", minWidth: 0 }}>
    <div data-whop-demo-shell style={{ position: "relative", minHeight: "320px", transition: "min-height 200ms ease" }}>
      <div data-whop-demo-skeleton style={{ position: "absolute", inset: "0", borderRadius: "12px", background: "rgba(140, 140, 140, 0.12)", pointerEvents: "none", transition: "opacity 200ms ease" }} />

      <div data-whop-demo-native="element:card-fields/cardExpiry" data-whop-elements-version="1.0.0-beta.2" style={{ position: "relative" }} />
    </div>

    <p style={{ fontSize: "0.8125rem", opacity: 0.7 }}>Example data. [Open the Playground](/elements/beta/payments/overview#playground).</p>
  </div>
</div>

## Props

*This element takes no consumer props.*

## Events

Pass callbacks in the create options or React props.

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

**Signature:** `(options: Partial<CardExpiryElementProps>) => void`

## Styling

Style these parts through `appearance.classes`. Use camel case or kebab case for property names and include units. Page stylesheets can't reach the element's frame. The framework validates each declaration before injecting it.

| Class                         | Targets                                         |
| ----------------------------- | ----------------------------------------------- |
| `.whop-CardField`             | Card number, expiration, or security code field |
| `.whop-CardFieldError`        | Card validation message                         |
| `.whop-CardFieldInput`        | Bordered PCI input container                    |
| `.whop-CardFieldInputFocused` | Focused PCI input container                     |
| `.whop-CardFieldInputInvalid` | Invalid or incomplete PCI input container       |

```ts theme={null}
const payments = whop.payments.create({
  appearance: {
    classes: {
      'whop-CardField': { borderRadius: '8px', fontWeight: '600' },
      'whop-CardFieldError': { borderRadius: '8px', fontWeight: '600' },
      'whop-CardFieldInput': { borderRadius: '8px', fontWeight: '600' }
    }
  }
});

// 5 classes use this shape
payments.update({
  appearance: { classes: { 'whop-CardField': { fontWeight: '700' } } }
});
```

In React, pass `appearance` to `<Payments>`. Set it globally with `WhopElements({ appearance })`.
