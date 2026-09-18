> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# VerifyElement

> A UI element that guides users through identity verification (KYC) and compliance requirements.

## Overview

A UI element that guides users through identity verification (KYC) and compliance requirements.

This element handles the complete verification flow, including:

* Collecting personal information
* Document upload and verification
* Identity verification checks
* Compliance questionnaires

The verification process is required before users can withdraw funds.

## Usage

### Basic usage

```typescript theme={null}
// Create the element
const element = session.createElement("verify-element", {
  onVerificationSubmitted: () => {
    console.log("Verification submitted!");
  },
});

// Mount it to a container
element.mount("#verify-container");
```

### Using as a modal

```typescript theme={null}
// Show the element in a modal overlay
const modal = session.showVerifyModal({
  onVerificationSubmitted: (ev) => {
    console.log("Verification complete!");
    // Element auto-unmounts by default
  },
  onClose: (ev) => {
    ev.preventDefault();
    modal.close();
  },
});
```

### Inline with controls

```typescript theme={null}
// Embed the element with its own navigation controls
const element = session.createElement("verify-element", {
  includeControls: true,
  onVerificationSubmitted: (ev) => {
    ev.preventDefault(); // Keep mounted
    showSuccessMessage();
  },
});

element.mount("#verification-section");
```

### Listening to events

```typescript theme={null}
const element = session.createElement("verify-element", {});

element.on("ready", () => {
  console.log("Verification form loaded");
});

element.on("verificationSubmitted", (ev) => {
  console.log("Verification submitted!");
});

element.on("close", (ev) => {
  console.log("User closed the form");
});

element.mount("#container");
```

```typescript theme={null}
const element = session.createElement("verify-element", {
  includeControls: true,
  onReady: (element) => {
    console.log("Verification form is ready");
  },
  onVerificationSubmitted: (ev) => {
    console.log("Verification submitted!");
  },
  onClose: (ev) => {
    console.log("User closed the form");
  },
});
```

## Events

Events emitted by the VerifyElement.

Listen to these events using the `on()` method or by passing callback functions in the options.

### `error`

Emitted when an error occurs during element initialization or operation.

**Callback signature:** (error: `unknown`) => void

### `ready`

Emitted when the element has finished loading and is ready for user interaction.

**Callback signature:** (element: `VerifyElement`) => void

### `optionsUpdated`

Emitted when the element's options are updated via `updateOptions()`.

**Callback signature:** (options: [`VerifyElementOptions`](#verifyelementoptions)) => void

### `close`

Emitted when the user closes the verification form without completing it.
Call `ev.preventDefault()` to prevent the element from automatically unmounting.

**Callback signature:** (ev: `CustomEvent`\<`any`>) => void

### `snapshot`

Emitted when the element's internal state changes.

**Callback signature:** (snapshot: [`VerifyElementSnapshot`](#verifyelementsnapshot)) => void

### `verificationSubmitted`

Emitted when the user successfully submits their verification information.
Call `ev.preventDefault()` to prevent the element from automatically unmounting.

**Callback signature:** (ev: `CustomEvent`\<`VerifyElement`>) => void

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

| Parameter | Type                                                        | Description                                      |
| --------- | ----------------------------------------------------------- | ------------------------------------------------ |
| `options` | `Partial`\<[`VerifyElementOptions`](#verifyelementoptions)> | Partial options object with the values to update |

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

**Returns:** [`VerifyElementSnapshot`](#verifyelementsnapshot)

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

### VerifyElementOptions

Configuration options for the VerifyElement.

| Property                  | Type                                                      | Required | Default | Description                                                                                                                                                                                   |
| ------------------------- | --------------------------------------------------------- | -------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `includeControls`         | `boolean \| undefined`                                    | No       | false   | Whether to include navigation controls (back/close buttons) in the element. Set to 'true' when embedding the element inline, or 'false' when using in a modal that provides its own controls. |
| `onReady`                 | `((element: VerifyElement) => void) \| undefined`         | No       | -       | Callback fired when the element has finished loading and is ready for interaction. This is equivalent to listening to the 'ready' event.                                                      |
| `onVerificationSubmitted` | `((ev: CustomEvent<VerifyElement>) => void) \| undefined` | No       | -       | Callback fired when the user successfully submits their verification information. By default, the element will unmount after submission. Call 'ev.preventDefault()' to keep it mounted.       |
| `onClose`                 | `((ev: CustomEvent) => void) \| undefined`                | No       | -       | Callback fired when the user closes the verification form without completing it. By default, the element will unmount when closed. Call 'ev.preventDefault()' to keep it mounted.             |

### VerifyElementSnapshot

Represents the current state of the VerifyElement.

Use `element.getSnapshot()` to get the current state, or listen to the `snapshot` event for changes.

| Property | Type                   | Required | Default | Description                                                                                                                                     |
| -------- | ---------------------- | -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `state`  | `"ready" \| "loading"` | Yes      | -       | The current loading state of the element. - '"loading"' - The element is initializing - '"ready"' - The element is fully loaded and interactive |
