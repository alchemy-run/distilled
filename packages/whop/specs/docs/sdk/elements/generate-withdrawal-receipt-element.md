> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# GenerateWithdrawalReceiptElement

> A UI element that allows users to generate and request a receipt for a specific withdrawal.

## Overview

A UI element that allows users to generate and request a receipt for a specific withdrawal.

This element handles the receipt generation flow, including:

* Displaying withdrawal details
* Allowing the user to request a receipt
* Sending the receipt to the user's email

## Usage

### Basic usage

```typescript theme={null}
// Create the element with a specific withdrawal ID
const element = session.createElement("generate-withdrawal-receipt-element", {
  withdrawalId: "withdrawal_abc123",
  onReceiptRequested: () => {
    console.log("Receipt sent to email!");
  },
});

// Mount it to a container
element.mount("#receipt-container");
```

### Using as a modal

```typescript theme={null}
// Show the element in a modal overlay
const modal = session.showGenerateWithdrawalReceiptModal({
  withdrawalId: "withdrawal_abc123",
  onReceiptRequested: (ev) => {
    console.log("Receipt requested!");
    // Element auto-unmounts by default
  },
  onClose: (ev) => {
    ev.preventDefault();
    modal.close();
  },
});
```

### Listening to events

```typescript theme={null}
const element = session.createElement("generate-withdrawal-receipt-element", {
  withdrawalId: "withdrawal_abc123",
});

element.on("ready", () => {
  console.log("Element loaded");
});

element.on("receiptRequested", (ev) => {
  console.log("Receipt requested!");
  ev.preventDefault(); // Keep element mounted
  showSuccessMessage();
});

element.mount("#container");
```

```typescript theme={null}
const element = session.createElement("generate-withdrawal-receipt-element", {
  withdrawalId: "withdrawal_abc123",
  onReady: (element) => {
    console.log("Receipt generator is ready");
  },
  onReceiptRequested: (ev) => {
    console.log("Receipt requested!");
  },
});
```

## Events

Events emitted by the GenerateWithdrawalReceiptElement.

Listen to these events using the `on()` method or by passing callback functions in the options.

### `error`

Emitted when an error occurs during element initialization or operation.

**Callback signature:** (error: `unknown`) => void

### `ready`

Emitted when the element has finished loading and is ready for user interaction.

**Callback signature:** (element: `GenerateWithdrawalReceiptElement`) => void

### `optionsUpdated`

Emitted when the element's options are updated via `updateOptions()`.

**Callback signature:** (options: [`GenerateWithdrawalReceiptElementOptions`](#generatewithdrawalreceiptelementoptions)) => void

### `snapshot`

Emitted when the element's internal state changes.

**Callback signature:** (snapshot: [`GenerateWithdrawalReceiptElementSnapshot`](#generatewithdrawalreceiptelementsnapshot)) => void

### `close`

Emitted when the user closes the receipt generator without requesting a receipt.
Call `ev.preventDefault()` to prevent the element from automatically unmounting.

**Callback signature:** (ev: `CustomEvent`\<`any`>) => void

### `receiptRequested`

Emitted when the user successfully requests a receipt for the withdrawal.
The receipt will be sent to the user's email address.
Call `ev.preventDefault()` to prevent the element from automatically unmounting.

**Callback signature:** (ev: `CustomEvent`\<`any`>) => void

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

| Parameter | Type                                                                                              | Description                                      |
| --------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| `options` | `Partial`\<[`GenerateWithdrawalReceiptElementOptions`](#generatewithdrawalreceiptelementoptions)> | Partial options object with the values to update |

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

**Returns:** [`GenerateWithdrawalReceiptElementSnapshot`](#generatewithdrawalreceiptelementsnapshot)

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

### GenerateWithdrawalReceiptElementOptions

Configuration options for the GenerateWithdrawalReceiptElement.

| Property             | Type                                                                 | Required | Default | Description                                                                                                                                                                                                                |
| -------------------- | -------------------------------------------------------------------- | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `withdrawalId`       | `string`                                                             | Yes      | -       | The ID of the withdrawal to generate a receipt for. This is required to identify which withdrawal the receipt should be generated for.                                                                                     |
| `onReady`            | `((element: GenerateWithdrawalReceiptElement) => void) \| undefined` | No       | -       | Callback fired when the element has finished loading and is ready for interaction. This is equivalent to listening to the 'ready' event.                                                                                   |
| `onClose`            | `((ev: CustomEvent) => void) \| undefined`                           | No       | -       | Callback fired when the user closes the element without requesting a receipt. By default, the element will unmount when closed. Call 'ev.preventDefault()' to keep it mounted.                                             |
| `onReceiptRequested` | `((ev: CustomEvent) => void) \| undefined`                           | No       | -       | Callback fired when the user successfully requests a receipt. The receipt will be sent to the user's email address. By default, the element will unmount after the request. Call 'ev.preventDefault()' to keep it mounted. |

### GenerateWithdrawalReceiptElementSnapshot

Represents the current state of the GenerateWithdrawalReceiptElement.

Use `element.getSnapshot()` to get the current state, or listen to the `snapshot` event for changes.

| Property | Type                   | Required | Default | Description                                                                                                                                     |
| -------- | ---------------------- | -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `state`  | `"ready" \| "loading"` | Yes      | -       | The current loading state of the element. - '"loading"' - The element is initializing - '"ready"' - The element is fully loaded and interactive |
