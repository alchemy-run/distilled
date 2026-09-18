> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# BalancesElement

> A UI element that displays a multi-currency balance overview with expandable currency rows showing available, pending, and reserve breakdowns per currency.

## Overview

A UI element that displays a multi-currency balance overview with expandable currency rows showing available, pending, and reserve breakdowns per currency.

This element provides a comprehensive multi-currency balance view, including:

* Aggregated total balance across all currencies
* Expandable rows for each currency with available, pending, and reserve breakdowns
* Primary currency pinned at the top of the list
* Treasury (crypto portfolio) section when enabled

## Usage

### Basic usage

```typescript theme={null}
// Create the element
const element = session.createElement("balances-element", {
  primaryCurrency: "usd",
  onReady: (element) => {
    console.log("Balances loaded");
  },
});

// Mount it to a container
element.mount("#balances-container");
```

### Listening to events

```typescript theme={null}
const element = session.createElement("balances-element", {});

element.on("ready", () => {
  console.log("Element loaded");
});

element.on("snapshot", (snapshot) => {
  console.log("Currencies:", snapshot.currencies);
  console.log("Treasury enabled:", snapshot.treasuryEnabled);
});

element.mount("#container");
```

```typescript theme={null}
const element = session.createElement("balances-element", {
  primaryCurrency: "usd",
  onReady: (element) => {
    console.log("Balances element is ready");
  },
});
```

## Events

Events emitted by the BalancesElement.

Listen to these events using the `on()` method or by passing callback functions in the options.

### `error`

Emitted when an error occurs during element initialization or operation.

**Callback signature:** (error: `unknown`) => void

### `ready`

Emitted when the element has finished loading and is ready for user interaction.

**Callback signature:** (element: `BalancesElement`) => void

### `optionsUpdated`

Emitted when the element's options are updated via `updateOptions()`.

**Callback signature:** (options: [`BalancesElementOptions`](#balanceselementoptions)) => void

### `snapshot`

Emitted when the element's internal state changes.

**Callback signature:** (snapshot: [`BalancesElementSnapshot`](#balanceselementsnapshot)) => void

## Methods

### `mount(container)`

Mount the element to a DOM container.

The container must be an empty element. The element will be appended as a child.
If the element is already mounted, this method will log a warning and return.

| Parameter   | Type                              | Description                                               |
| ----------- | --------------------------------- | --------------------------------------------------------- |
| `container` | `HTMLElement` \| `#$\{`string`\}` | The container element or a CSS selector starting with '#' |

```typescript theme={null}
// Using a selector
element.mount("#my-container");

// Using an element reference
const container = document.getElementById("my-container");
element.mount(container);
```

### `unmount()`

Remove the element from the DOM and clean up all event listeners.

After unmounting, the element instance should not be reused.
Create a new element instance if you need to mount again.

```typescript theme={null}
// Unmount when done
element.unmount();

// Commonly used in event handlers
element.on("complete", () => {
  element.unmount();
});
```

### `updateOptions(options)`

Update the element's configuration options after creation.

Only the provided options will be updated; other options remain unchanged.
The element will re-render with the new options.

| Parameter | Type                                                            | Description                                      |
| --------- | --------------------------------------------------------------- | ------------------------------------------------ |
| `options` | `Partial`\<[`BalancesElementOptions`](#balanceselementoptions)> | Partial options object with the values to update |

```typescript theme={null}
// Update a single option
element.updateOptions({
  onComplete: (ev) => {
    console.log("New handler!");
  },
});
```

### `getSnapshot()`

Get the current state snapshot of the element.

The snapshot contains the element's current internal state, such as
loading status, form values, or other element-specific data.

**Returns:** [`BalancesElementSnapshot`](#balanceselementsnapshot)

```typescript theme={null}
const snapshot = element.getSnapshot();
console.log("Current state:", snapshot.state);

// Or listen for changes
element.on("snapshot", (snapshot) => {
  console.log("State changed:", snapshot);
});
```

## Styling

Customize this element with `appearance.classes`. See the [styling reference](/sdk/elements/styling-reference) for the full list of stable class names and example snippets.

## Types

### BalancesElementOptions

Configuration options for the BalancesElement.

| Property          | Type                                                | Required | Default | Description                                                                                                                              |
| ----------------- | --------------------------------------------------- | -------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `primaryCurrency` | `string \| undefined`                               | No       | -       | The ISO currency code to display as the primary (top-level) currency. Other currencies with balances will appear below it.               |
| `onReady`         | `((element: BalancesElement) => void) \| undefined` | No       | -       | Callback fired when the element has finished loading and is ready for interaction. This is equivalent to listening to the 'ready' event. |

### BalancesElementSnapshot

Represents the current state of the BalancesElement.

Use `element.getSnapshot()` to get the current state, or listen to the `snapshot` event for changes.

| Property          | Type                              | Required | Default | Description                                                                                                                                                                                                          |
| ----------------- | --------------------------------- | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `state`           | `"error" \| "ready" \| "loading"` | Yes      | -       | The current loading state of the element. - '"loading"' - The element is initializing - '"ready"' - The element is fully loaded and interactive - '"error"' - The element encountered an error during initialization |
| `currencies`      | `string[]`                        | Yes      | -       | The list of ISO currency codes that have balances.                                                                                                                                                                   |
| `treasuryEnabled` | `boolean`                         | Yes      | -       | Whether the treasury (crypto portfolio) feature is enabled for this account.                                                                                                                                         |
