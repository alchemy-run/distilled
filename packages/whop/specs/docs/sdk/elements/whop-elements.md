> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Getting Started

> The main entry point for Whop embedded components.

## Overview

The main entry point for Whop embedded components.

WhopElements is the root object that manages configuration and creates sessions
for different element types. Initialize it once and use it to create sessions
for payouts, payments, and other embedded experiences.

## Installation

<CodeGroup>
  ```bash React theme={null}
  npm install @whop/embedded-components-vanilla-js @whop/embedded-components-react-js
  ```

  ```bash Vanilla JS theme={null}
  npm install @whop/embedded-components-vanilla-js
  ```
</CodeGroup>

## Examples

### Basic initialization

```typescript theme={null}
import WhopElements from "@whop/embeddable-components";

const whopElements = new WhopElements({
  appearance: {
    theme: { appearance: "light" },
  },
  locale: "en",
});
```

### Creating a payouts session

```typescript theme={null}
const session = whopElements.createPayoutsSession({
  token: async () => {
    // Fetch token from your backend
    const response = await fetch("/api/payouts-token");
    const data = await response.json();
    return data.token;
  },
  companyId: "your-company-id",
  redirectUrl: "https://yourapp.com/callback",
});

// Create and mount an element
const element = session.createElement("balance-element", {});
element.mount("#balance-container");
```

### Updating options after initialization

```typescript theme={null}
// Switch to dark mode
whopElements.updateOptions({
  appearance: {
    theme: { appearance: "dark" },
  },
});
```

### Listening to option changes

```typescript theme={null}
whopElements.on("optionsUpdated", (options) => {
  console.log("Options changed:", options);
});
```

## Options

| Property      | Type                                                                                                | Required | Default      | Description                                                                                                             |
| ------------- | --------------------------------------------------------------------------------------------------- | -------- | ------------ | ----------------------------------------------------------------------------------------------------------------------- |
| `appearance`  | [`Appearance`](/sdk/elements/types#appearance) \| undefined                                         | No       | -            | Customize the appearance of the Whop embedded Elements. Includes theme settings like light/dark mode and accent colors. |
| `locale`      | `"en" \| "es" \| "zh" \| "nl" \| "pt" \| "de" \| "it" \| "fr" \| "ja" \| "pl" \| "tr" \| undefined` | No       | "en"         | The locale to use for all Elements. Controls the language and formatting of text, dates, and numbers.                   |
| `environment` | [`WhopElementsEnvironment`](/sdk/elements/types#whopelementsenvironment) \| undefined               | No       | "production" | The environment to use for API calls. Use '"sandbox"' for testing without affecting production data.                    |

## Events

Events emitted by WhopElements.

Listen to these events using the `on()` method.

### `optionsUpdated`

Emitted when the WhopElements options are updated via `updateOptions()`.

**Callback signature:** (options: [`WhopElementsOptions`](/sdk/elements/types#whopelementsoptions)) => void

## Methods

### `createPayoutsSession(options)`

Create a new payouts session for managing payout elements.

The session handles authentication and provides methods to create
payout-related elements like balance displays, withdrawal forms, and more.

| Parameter | Type                    | Description                                   |
| --------- | ----------------------- | --------------------------------------------- |
| `options` | `PayoutsSessionOptions` | Configuration options for the payouts session |

**Returns:** [`PayoutsSession`](/sdk/elements/payouts-session)

### `createChatSession(options)`

Create a new chat session for managing chat elements.

| Parameter | Type                 | Description                                |
| --------- | -------------------- | ------------------------------------------ |
| `options` | `ChatSessionOptions` | Configuration options for the chat session |

**Returns:** [`ChatSession`](/sdk/elements/chat-session)

### `createWalletSession(options)`

Create a new wallet session for managing wallet elements.

The session handles authentication and provides methods to create
wallet-related elements like balance displays, send/receive flows, and conversions.

| Parameter | Type                   | Description                                  |
| --------- | ---------------------- | -------------------------------------------- |
| `options` | `WalletSessionOptions` | Configuration options for the wallet session |

**Returns:** [`WalletSession`](/sdk/elements/wallet-session)

### `updateOptions(options)`

Update the WhopElements configuration after initialization.

Changes will be propagated to all active sessions and elements.
Only the provided options will be updated; others remain unchanged.

| Parameter | Type                                                                       | Description                                      |
| --------- | -------------------------------------------------------------------------- | ------------------------------------------------ |
| `options` | Partial\<[`WhopElementsOptions`](/sdk/elements/types#whopelementsoptions)> | Partial options object with the values to update |

## Related Types

* [WhopElementsOptions](/sdk/elements/types#whopelementsoptions)
* [WhopElementsEnvironment](/sdk/elements/types#whopelementsenvironment)
* [Appearance](/sdk/elements/types#appearance)
* [Theme](/sdk/elements/types#theme)
* [AccentColor](/sdk/elements/types#accentcolor)
