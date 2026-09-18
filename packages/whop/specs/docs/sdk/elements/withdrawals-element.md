> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# WithdrawalsElement

> A UI element that displays a list of the user's past withdrawals.

## Overview

A UI element that displays a list of the user's past withdrawals.

This element provides a comprehensive view of withdrawal history, including:

* List of all withdrawals with status, amount, and date
* Ability to view detailed breakdown for each withdrawal
* Option to generate receipts for completed withdrawals
* Pagination for large withdrawal histories

## Usage

### Basic usage

```typescript theme={null}
// Create the element
const element = session.createElement("withdrawals-element", {
  onReady: () => {
    console.log("Withdrawals list loaded");
  },
});

// Mount it to a container
element.mount("#withdrawals-container");
```

### Custom breakdown handling

```typescript theme={null}
const element = session.createElement("withdrawals-element", {});

element.on("showWithdrawalBreakdown", (ev) => {
  // Prevent default modal
  ev.preventDefault();
  // Show your own breakdown UI
  showCustomBreakdown(ev.detail.withdrawalId);
});

element.on("showGenerateWithdrawalReceipt", (ev) => {
  // Prevent default modal
  ev.preventDefault();
  // Handle receipt generation yourself
  generateReceipt(ev.detail.withdrawalId);
});

element.mount("#withdrawals-container");
```

### Listening to events

```typescript theme={null}
const element = session.createElement("withdrawals-element", {});

element.on("ready", () => {
  console.log("Withdrawals list loaded");
});

element.on("showWithdrawalBreakdown", (ev) => {
  console.log("User viewing withdrawal:", ev.detail.withdrawalId);
  // Let default modal open
});

element.mount("#container");
```

```typescript theme={null}
const element = session.createElement("withdrawals-element", {
  onReady: (element) => {
    console.log("Withdrawals list is ready");
  },
});
```

## Events

Events emitted by the WithdrawalsElement.

Listen to these events using the `on()` method or by passing callback functions in the options.

### `error`

Emitted when an error occurs during element initialization or operation.

**Callback signature:** (error: `unknown`) => void

### `ready`

Emitted when the element has finished loading and is ready for user interaction.

**Callback signature:** (element: `WithdrawalsElement`) => void

### `optionsUpdated`

Emitted when the element's options are updated via `updateOptions()`.

**Callback signature:** (options: [`WithdrawalsElementOptions`](#withdrawalselementoptions)) => void

### `snapshot`

Emitted when the element's internal state changes.

**Callback signature:** (snapshot: [`WithdrawalsElementSnapshot`](#withdrawalselementsnapshot)) => void

### `showWithdrawalBreakdown`

Emitted when the user clicks to view a withdrawal breakdown.
By default, opens the WithdrawalBreakdown modal. Call `ev.preventDefault()` to handle this yourself.

**Callback signature:** (ev: `CustomEvent`\<\{ withdrawalId: `string`; }>) => void

### `showGenerateWithdrawalReceipt`

Emitted when the user clicks to generate a receipt for a withdrawal.
By default, opens the GenerateWithdrawalReceipt modal. Call `ev.preventDefault()` to handle this yourself.

**Callback signature:** (ev: `CustomEvent`\<\{ withdrawalId: `string`; }>) => void

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

| Parameter | Type                                                                  | Description                                      |
| --------- | --------------------------------------------------------------------- | ------------------------------------------------ |
| `options` | `Partial`\<[`WithdrawalsElementOptions`](#withdrawalselementoptions)> | Partial options object with the values to update |

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

**Returns:** [`WithdrawalsElementSnapshot`](#withdrawalselementsnapshot)

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

### WithdrawalsElementOptions

Configuration options for the WithdrawalsElement.

| Property  | Type                                                   | Required | Default | Description                                                                                                                              |
| --------- | ------------------------------------------------------ | -------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `onReady` | `((element: WithdrawalsElement) => void) \| undefined` | No       | -       | Callback fired when the element has finished loading and is ready for interaction. This is equivalent to listening to the 'ready' event. |

### WithdrawalsElementSnapshot

Represents the current state of the WithdrawalsElement.

Use `element.getSnapshot()` to get the current state, or listen to the `snapshot` event for changes.

| Property | Type                   | Required | Default | Description                                                                                                                                     |
| -------- | ---------------------- | -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `state`  | `"ready" \| "loading"` | Yes      | -       | The current loading state of the element. - '"loading"' - The element is initializing - '"ready"' - The element is fully loaded and interactive |
