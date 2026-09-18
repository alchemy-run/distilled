> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# AutomaticWithdrawElement

> A UI element that allows users to configure automatic withdrawals for their account.

## Overview

A UI element that allows users to configure automatic withdrawals for their account.

This element handles the complete flow for setting up automatic withdrawals, including:

* Configuring withdrawal frequency and thresholds
* Selecting the destination payout method
* Enabling or disabling automatic withdrawals

## Usage

### Basic usage

```typescript theme={null}
// Create the element
const element = session.createElement("automatic-withdraw-element", {
  onComplete: () => {
    console.log("Automatic withdraw settings saved!");
  },
});

// Mount it to a container
element.mount("#automatic-withdraw-container");
```

### Using as a modal

```typescript theme={null}
// Show the element in a modal overlay
const modal = session.showAutomaticWithdrawModal({
  onComplete: (ev) => {
    ev.preventDefault(); // Prevent auto-close
    showSuccessMessage();
    setTimeout(() => modal.close(), 2000);
  },
});
```

### Listening to events

```typescript theme={null}
const element = session.createElement("automatic-withdraw-element", {});

element.on("ready", () => {
  console.log("Element loaded");
});

element.on("complete", (ev) => {
  console.log("Settings saved!");
});

element.on("close", (ev) => {
  // Prevent unmount and show confirmation dialog
  ev.preventDefault();
  if (confirm("Are you sure you want to cancel?")) {
    element.unmount();
  }
});

element.mount("#container");
```

```typescript theme={null}
const element = session.createElement("automatic-withdraw-element", {
  onReady: (element) => {
    console.log("Element is ready");
  },
  onComplete: (ev) => {
    console.log("Automatic withdraw settings saved!");
    // Optionally prevent auto-unmount to show a success message
    // ev.preventDefault();
  },
  onClose: (ev) => {
    console.log("User closed the form");
  },
});
```

## Events

Events emitted by the AutomaticWithdrawElement.

Listen to these events using the `on()` method or by passing callback functions in the options.

### `error`

Emitted when an error occurs during element initialization or operation.

**Callback signature:** (error: `unknown`) => void

### `ready`

Emitted when the element has finished loading and is ready for user interaction.

**Callback signature:** (element: `AutomaticWithdrawElement`) => void

### `optionsUpdated`

Emitted when the element's options are updated via `updateOptions()`.

**Callback signature:** (options: [`AutomaticWithdrawElementOptions`](#automaticwithdrawelementoptions)) => void

### `snapshot`

Emitted when the element's internal state changes.

**Callback signature:** (snapshot: [`AutomaticWithdrawElementSnapshot`](#automaticwithdrawelementsnapshot)) => void

### `close`

Emitted when the user closes the automatic withdraw configuration without saving.
Call `ev.preventDefault()` to prevent the element from automatically unmounting.

**Callback signature:** (ev: `CustomEvent`\<`any`>) => void

### `complete`

Emitted when the user successfully saves their automatic withdraw settings.
Call `ev.preventDefault()` to prevent the element from automatically unmounting.

**Callback signature:** (ev: `CustomEvent`\<`AutomaticWithdrawElement`>) => void

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

| Parameter | Type                                                                              | Description                                      |
| --------- | --------------------------------------------------------------------------------- | ------------------------------------------------ |
| `options` | `Partial`\<[`AutomaticWithdrawElementOptions`](#automaticwithdrawelementoptions)> | Partial options object with the values to update |

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

**Returns:** [`AutomaticWithdrawElementSnapshot`](#automaticwithdrawelementsnapshot)

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

### AutomaticWithdrawElementOptions

Configuration options for the AutomaticWithdrawElement.

| Property     | Type                                                                 | Required | Default | Description                                                                                                                                                                              |
| ------------ | -------------------------------------------------------------------- | -------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `onReady`    | `((element: AutomaticWithdrawElement) => void) \| undefined`         | No       | -       | Callback fired when the element has finished loading and is ready for interaction. This is equivalent to listening to the 'ready' event.                                                 |
| `onClose`    | `((ev: CustomEvent) => void) \| undefined`                           | No       | -       | Callback fired when the user closes the form without saving changes. By default, the element will unmount when closed. Call 'ev.preventDefault()' to keep it mounted.                    |
| `onComplete` | `((ev: CustomEvent<AutomaticWithdrawElement>) => void) \| undefined` | No       | -       | Callback fired when the user successfully saves their automatic withdraw settings. By default, the element will unmount after completion. Call 'ev.preventDefault()' to keep it mounted. |

### AutomaticWithdrawElementSnapshot

Represents the current state of the AutomaticWithdrawElement.

Use `element.getSnapshot()` to get the current state, or listen to the `snapshot` event for changes.

| Property | Type                   | Required | Default | Description                                                                                                                                     |
| -------- | ---------------------- | -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `state`  | `"ready" \| "loading"` | Yes      | -       | The current loading state of the element. - '"loading"' - The element is initializing - '"ready"' - The element is fully loaded and interactive |
