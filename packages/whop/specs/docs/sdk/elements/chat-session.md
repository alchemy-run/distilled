> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Create a chat session

> Manages authentication and creates chat elements.

## Overview

Manages authentication and creates chat elements.

## Examples

### Basic usage

```typescript theme={null}
const session = whopElements.createChatSession({
  token: async () => {
    const response = await fetch("/api/token");
    const data = await response.json();
    return data.token;
  },
});

session.on("ready", () => {
  console.log("Session is ready");
});
```

### Creating elements

```typescript theme={null}
const chatElement = session.createElement("chat-element", {
  channelId: "feed_XXXXXXXXXXXXXX",
});
chatElement.mount("#chat-container");
```

## Options

| Property | Type                | Required | Default | Description                                                                                                                                                                                                                                                                                                                                                                             |
| -------- | ------------------- | -------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `token`  | `Token \| GetToken` | Yes      | -       | The token to use for the session. If a function is provided, it will be called and awaited to get the token. When a function is provided, the token will be refreshed automatically before it expires.  if a string is provided, it will be used as the token and not refreshed automatically. However you can update the token at runtime by calling 'updateOptions' with a new token. |

## Events

Events emitted by the ChatSession.

Listen to these events using the `on()` method.

### `optionsUpdated`

Emitted when the session options are updated via `updateOptions()`.

**Callback signature:** (options: `ExpandedChatSessionOptions`) => void

### `tokenRefreshed`

Emitted when the authentication token is refreshed.

**Callback signature:** (token: `string`) => void

### `tokenRefreshError`

Emitted when token refresh fails.

**Callback signature:** (error: `unknown`) => void

### `error`

Emitted when an error occurs during session operation.

**Callback signature:** (error: `unknown`) => void

### `ready`

Emitted when the session is ready and authenticated.

**Callback signature:** (`void`) => void

## Methods

### `createElement(type, options)`

Create a new element instance.

| Parameter | Type                        | Description                             |
| --------- | --------------------------- | --------------------------------------- |
| `type`    | T \| \{ type: T; }          | The element type (e.g., "chat-element") |
| `options` | ChatSessionElements\[T]\[0] | Element-specific configuration options  |

**Returns:** `ChatSessionElements[T][1]`

```typescript theme={null}
const element = session.createElement("chat-element", {
  channelId: "feed_XXXXXXXXXXXXXX",
  onReady: () => console.log("Element ready"),
});
element.mount("#chat-container");
```

### `updateOptions(options)`

Update the session options after initialization.

Changes will be propagated to all active elements.

| Parameter | Type                         | Description                                      |
| --------- | ---------------------------- | ------------------------------------------------ |
| `options` | Partial\<ChatSessionOptions> | Partial options object with the values to update |

### `destroy()`

Destroy the session and clean up all mounted elements.

Call this when you no longer need the session to free up resources.

### Modal Methods

#### `showSearchModal(options, force)`

Show the search element in a modal overlay.

By default, the modal auto-closes on completion (`onResultClick`) or dismiss (`onClose`).
Call `ev.preventDefault()` in a callback to prevent auto-close.

| Parameter | Type                                                                                                                                                                                    | Description                                                     |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `options` | [`SearchElementOptions`](/sdk/elements/search-element#searchelementoptions) \| ((modal: ModalContainer) => [`SearchElementOptions`](/sdk/elements/search-element#searchelementoptions)) | Element options or a callback that receives the modal container |
| `force`   | Force \| undefined                                                                                                                                                                      | -                                                               |

**Returns:** `Force extends true ? ModalContainer : ModalContainer | undefined`
