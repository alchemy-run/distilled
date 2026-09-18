> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Test in sandbox

> Test your integration in a safe environment before going live

Whop provides a sandbox environment for testing your integration without affecting production data or making real payments.

# Sandbox URLs

| Environment | URL                                   |
| ----------- | ------------------------------------- |
| Frontend    | `https://sandbox.whop.com`            |
| API         | `https://sandbox-api.whop.com/api/v1` |

Create your sandbox account and API keys at [sandbox.whop.com](https://sandbox.whop.com).

# Software development kit configuration

To use the sandbox environment with the Whop SDK, configure the `baseUrl` parameter:

<CodeGroup>
  ```typescript Typescript theme={null}
  import { WhopClient } from "@whop/sdk";

  const client = new WhopClient({
  	token: process.env["WHOP_API_KEY"],
  	baseUrl: "https://sandbox-api.whop.com/api/v1",
  });
  ```

  ```python Python theme={null}
  import os
  from whop_sdk import Whop

  client = Whop(
      token=os.environ.get("WHOP_API_KEY"),
      base_url="https://sandbox-api.whop.com/api/v1",
  )
  ```

  ```ruby Ruby theme={null}
  require "whop_sdk"

  client = Whop_sdk::Client.new(
    token: ENV.fetch("WHOP_API_KEY"),
    base_url: "https://sandbox-api.whop.com/api/v1",
  )
  ```
</CodeGroup>

# Embedded components

<Info>
  The `environment` option requires `@whop/embedded-components-vanilla-js`
  version `0.0.6` or later.
</Info>

To use embedded components (like payout elements) in sandbox mode, configure the `environment` option when loading the SDK:

```typescript theme={null}
import { loadWhopElements } from "@whop/embedded-components-vanilla-js";

const elements = loadWhopElements({
	environment: "sandbox", // Use "production" for live environment (default)
});

// Create a payouts session as usual
const session = elements.createPayoutsSession({
	token: yourAccessToken,
	companyId: "your-account-id",
	redirectUrl: "https://yourapp.com/callback",
});
```

With React:

```tsx theme={null}
import { loadWhopElements } from "@whop/embedded-components-vanilla-js";
import { Elements, PayoutsSession } from "@whop/embedded-components-react-js";

const elements = loadWhopElements({
	environment: "sandbox",
});

function App() {
	return (
		<Elements elements={elements}>
			<PayoutsSession
				token={yourAccessToken}
				companyId="your-account-id"
				redirectUrl="https://yourapp.com/callback"
			>
				{/* Your payout components */}
			</PayoutsSession>
		</Elements>
	);
}
```

# Application programming interface keys and webhooks

API keys and webhooks work the same in sandbox as they do in production:

* Create API keys at [sandbox.whop.com/dashboard/developer](https://sandbox.whop.com/dashboard/developer)
* Configure webhooks to receive events from sandbox
* Use the same authentication headers (`Authorization: Bearer YOUR_API_KEY`)

# Test cards

Use the following test card numbers to simulate payments in sandbox:

| Card Number           | Description                                                   |
| --------------------- | ------------------------------------------------------------- |
| `4242 4242 4242 4242` | Successful payment                                            |
| `4000 0000 0000 0002` | Declined payment                                              |
| `4000 0000 0000 0341` | Card setup succeeds, but the processor declines later charges |
| `5385 3083 6013 5181` | Requires 3D Secure (enter `Checkout1!` on the 3DS screen)     |

For all test cards:

* Use any future expiration date (e.g., 12/34)
* Use any 3-digit card verification code (e.g., 123)
* Use any billing address

Use `4000 0000 0000 0341` to test recovery flows where you save a card
successfully, but a future charge for that saved card fails.

# Known limitations

The sandbox environment has some limitations compared to production:

<Warning>
  The following features aren't available or may not work as expected in
  sandbox:
</Warning>

* **Payouts** - Payout functionality isn't available yet
* **Apps & Messaging** - Don't use apps or messaging features in sandbox
* **Alternative payment methods** - The sandbox supports only card payments (no Apple Pay, Google Pay, etc.)
