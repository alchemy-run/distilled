> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# DmsListElement

> A UI element that displays a dms list.

## Overview

A UI element that displays a dms list.

## Usage

### Basic usage

```typescript theme={null}
// Create the element
const element = session.createElement("dms-list-element", {
  onReady: (element) => {
    console.log("Dms list element is ready");
  },
});

// Mount it to a container
element.mount("#dms-list-container");
```

### Listening to events

```typescript theme={null}
const element = session.createElement("dms-list-element", {});

element.on("ready", () => {
  console.log("Dms list element is ready");
});

element.on("channelSelected", (ev) => {
  console.log("Channel selected:", ev.detail.id);
});

element.mount("#dms-list-container");
```

```typescript theme={null}
const element = session.createElement("dms-list-element", {
  onReady: (element) => {
    console.log("Dms list element is ready");
  },
});
```

## Events

Events emitted by the DmListElement.

Listen to these events using the `on()` method or by passing callback functions in the options.

### `error`

Emitted when an error occurs during element initialization or operation.

**Callback signature:** (error: `unknown`) => void

### `ready`

Emitted when the element has finished loading and is ready for user interaction.

**Callback signature:** (element: `DmsListElement`) => void

### `optionsUpdated`

Emitted when the element's options are updated via `updateOptions()`.

**Callback signature:** (options: [`DmsListElementOptions`](#dmslistelementoptions)) => void

### `snapshot`

Emitted when the element's internal state changes.

**Callback signature:** (snapshot: [`DmsListElementSnapshot`](#dmslistelementsnapshot)) => void

### `channelSelected`

Emitted when the user clicks a channel.

**Callback signature:** (ev: `CustomEvent`\<\{ id: `string`; }>) => void

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

| Parameter | Type                                                          | Description                                      |
| --------- | ------------------------------------------------------------- | ------------------------------------------------ |
| `options` | `Partial`\<[`DmsListElementOptions`](#dmslistelementoptions)> | Partial options object with the values to update |

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

**Returns:** [`DmsListElementSnapshot`](#dmslistelementsnapshot)

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

### DmsListElementOptions

Configuration options for the DmsListElement.

| Property          | Type                                                  | Required | Default | Description                                                                                                                              |
| ----------------- | ----------------------------------------------------- | -------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `companyId`       | `string \| undefined`                                 | No       | -       | The company ID to filter the channels by.                                                                                                |
| `selectedChannel` | `string \| undefined`                                 | No       | -       | The ID of the currently selected channel.                                                                                                |
| `emptyState`      | `EmptyStateOptions \| undefined`                      | No       | -       | Custom empty state displayed when there are no channels.                                                                                 |
| `onReady`         | `((element: DmsListElement) => void) \| undefined`    | No       | -       | Callback fired when the element has finished loading and is ready for interaction. This is equivalent to listening to the 'ready' event. |
| `onEvent`         | `((event: DmsListElementEvent) => void) \| undefined` | No       | -       | Callback fired when a dms list element event is emitted.                                                                                 |

### DmsListElementSnapshot

Represents the current state of the DmsListElement.

Use `element.getSnapshot()` to get the current state, or listen to the `snapshot` event for changes.

| Property | Type                   | Required | Default | Description                                                                                                                                     |
| -------- | ---------------------- | -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `state`  | `"ready" \| "loading"` | Yes      | -       | The current loading state of the element. - '"loading"' - The element is initializing - '"ready"' - The element is fully loaded and interactive |
