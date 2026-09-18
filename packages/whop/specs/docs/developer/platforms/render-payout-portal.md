> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Enable connected account payouts

> Let your connected accounts manage their own payouts through an embedded or hosted portal

Let your connected accounts complete Know Your Customer (KYC) verification, add payout methods, and withdraw their funds on their own. You can embed the payout portal directly in your app or redirect users to a Whop-hosted portal.

## Embedded payout portal

### Server side implementation

To use the embedded component, you need to generate an access token for the connected account. This token grants temporary access to the payout portal for that specific account.

<CodeGroup>
  ```tsx Next.JS theme={null}
  // app/api/token/route.ts
  import { WhopClient } from "@whop/sdk";
  import type { NextRequest } from "next/server";

  const whop = new WhopClient({
  	token: process.env.WHOP_API_KEY,
  });

  export async function GET(request: NextRequest) {
  	// Authenticate your user here
  	const accountId = request.nextUrl.searchParams.get("accountId");

  	if (!accountId) {
  		return new Response(null, { status: 400 });
  	}
  	const tokenResponse = await whop.accessTokens
  		.create({
  			company_id: accountId,
  		})
  		.catch(() => {
  			return null;
  		});
  	if (!tokenResponse) {
  		return new Response(null, { status: 500 });
  	}
  	const token = tokenResponse.token;
  	return Response.json({
  		token,
  	});
  }
  ```

  ```typescript Express.js theme={null}
  import express from "express";
  import { WhopClient } from "@whop/sdk";

  const app = express();
  const client = new WhopClient({ token: "Account API Key" });

  app.use(express.json());

  app.post("/api/access-token", async (req, res) => {
  	// Authenticate your user here
  	const { accountId } = req.body;

  	const { token } = await client.accessTokens.create({
  		company_id: accountId,
  	});

  	res.json({ token });
  });

  app.listen(3000, () => {
  	console.log("Server running on port 3000");
  });
  ```

  ```python Python theme={null}
  from whop_sdk import Whop
  from flask import Flask, request, jsonify

  app = Flask(__name__)
  client = Whop(token="Account API Key")

  @app.route('/api/access-token', methods=['POST'])
  def create_access_token():
      data = request.get_json()
      # Authenticate your user here
      account_id = data.get('accountId')

      access_token = client.access_tokens.create(
          company_id=account_id
      )

      return jsonify({'token': access_token.token})
  ```
</CodeGroup>

<Card title="Create Access Token API" icon="code" href="/api-reference/access-tokens/create-access-token">
  See the full API reference for generating access tokens and all available
  parameters
</Card>

## Client side setup

<CodeGroup>
  ```bash npm theme={null}
  npm install @whop/embedded-components-react-js @whop/embedded-components-vanilla-js
  ```

  ```bash pnpm theme={null}
  pnpm add @whop/embedded-components-react-js @whop/embedded-components-vanilla-js
  ```

  ```html HTML theme={null}
  <script src="https://latest.elements.whop.com/release/elements.js"></script>
  ```

  ```swift Swift theme={null}
  // Add to your Package.swift dependencies

  dependencies: [
      .package(url: "https://github.com/whopio/whopsdk-payments-swift.git", exact: "0.0.6")
  ]


  // Info.plist - Add these usage descriptions to Info.plist for KYC functionality

  <key>NSCameraUsageDescription</key>
  <string>We use your camera to let you take photos, record videos, and ID verification.</string>

  <key>NSMicrophoneUsageDescription</key>
  <string>We use your microphone so you can record and share audio, and ID verification.</string>

  <key>NSPhotoLibraryUsageDescription</key>
  <string>We use your photo library so you can select and share photos or videos from your library.</string>
  ```
</CodeGroup>

## Client side implementation

<CodeGroup>
  ```tsx React theme={null}
  import type { WhopElementsOptions } from "@whop/embedded-components-vanilla-js/types";

  import {
  	BalanceElement,
  	Elements,
  	PayoutsSession,
  	WithdrawButtonElement,
  	WithdrawalsElement,
  } from "@whop/embedded-components-react-js";
  import { loadWhopElements } from "@whop/embedded-components-vanilla-js";

  const elements = loadWhopElements();

  const appearance: WhopElementsOptions["appearance"] = {
  	classes: {
  		".Button": { height: "40px", "border-radius": "8px" },
  		".Button:disabled": { "background-color": "gray" },
  		".Container": { "border-radius": "12px" },
  	},
  };

  export function BalancePage({ accountId }: { accountId: string }) {
  	return (
  		<Elements appearance={appearance} elements={elements}>
  			<PayoutsSession
  				token={() =>
  					fetch(`/api/token?accountId=${accountId}`)
  						.then((res) => res.json())
  						.then((data) => data.token)
  				}
  				companyId={accountId}
  				redirectUrl="https://yourapp.com/verification-complete"
  			>
  				<section
  					style={{ display: "flex", flexDirection: "column", gap: "8px" }}
  				>
  					<div
  						style={{ height: "95.5px", width: "100%", position: "relative" }}
  					>
  						<BalanceElement fallback={<div>Loading...</div>} />
  					</div>
  					<div style={{ height: "40px", width: "100%", position: "relative" }}>
  						<WithdrawButtonElement fallback={<div>Loading...</div>} />
  					</div>
  					<WithdrawalsElement fallback={<div>Loading...</div>} />
  				</section>
  			</PayoutsSession>
  		</Elements>
  	);
  }
  ```

  ```swift Swift theme={null}
  import SwiftUI
  import WhopPayments

  class MyTokenProvider: WhopTokenProvider {
      /// return an access token fetched from your
      /// backend.
      ///
      /// called when `WhopPayoutsView` appears and
      /// before expiration (within 60 seconds).
      func getToken() async -> WhopTokenResponse {
          let token = await fetchAccessToken()
          return WhopTokenResponse(accessToken: token)
      }
  }

  @main
  struct MyApp: App {
      let tokenProvider = MyTokenProvider()

      var body: some Scene {
          WindowGroup {
              WhopPayoutsView(
                  tokenProvider,
                  companyId: "account_id",
                  ledgerAccountId: "ledger_account_id"
              )
          }
      }
  }
  ```
</CodeGroup>

## `PayoutsSession` Props

The `PayoutsSession` component requires the following props:

| Prop          | Type                            | Required | Description                                                                                                                         |
| ------------- | ------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `token`       | `string \| Promise \| Function` | Yes      | Access token for the session. Can be a string, promise, or function that returns a token.                                           |
| `companyId`   | `string`                        | Yes      | The account ID for the connected account.                                                                                           |
| `redirectUrl` | `string`                        | Yes      | Absolute URL (e.g., `https://yourapp.com/verification-complete`) to redirect the user to after they complete identity verification. |
| `currency`    | `string`                        | No       | Currency code, such as `USD`. Defaults to `USD`.                                                                                    |

<Note>
  The `redirectUrl` must be a publicly accessible URL. Localhost URLs (e.g.,
  `http://localhost:3000`) won't work. For local development, use a tunneling
  service like [ngrok](https://ngrok.com) to expose your local server.
</Note>

## Modal methods

You can programmatically open modals using the `usePayoutsSessionRef` hook:

```tsx theme={null}
import { usePayoutsSessionRef } from "@whop/embedded-components-react-js";

const sessionRef = usePayoutsSessionRef();

<button
	onClick={() =>
		sessionRef.current?.payoutsSession?.showChangeAccountCountryModal(
			(modal) => ({
				onClose: (ev) => {
					ev.preventDefault();
					modal.close();
				},
			}),
		)
	}
>
	Change Account Country
</button>;
```

### Available modals

| Method                          | Description                                   |
| ------------------------------- | --------------------------------------------- |
| `showChangeAccountCountryModal` | Let users change their payout account country |
| `showResetAccountModal`         | Let users reset their payout account          |

## Hosted payout portal

Instead of embedding the payout portal in your app, you can redirect users to a Whop-hosted payout portal. This is useful when you don't want to build a custom UI or need a quick integration.

Create an account link and redirect the user to the returned URL:

<CodeGroup>
  ```typescript TypeScript theme={null}
  import { WhopClient } from "@whop/sdk";

  const client = new WhopClient({
  	token: "Account API Key",
  });

  const accountLink = await client.accountLinks.create({
  	company_id: "biz_xxxxxxxxxxxxx",
  	use_case: "payouts_portal",
  	return_url: "https://yourapp.com/payouts/complete",
  	refresh_url: "https://yourapp.com/payouts/refresh",
  });

  // Redirect the user to the hosted portal
  console.log(accountLink.url);
  ```

  ```python Python theme={null}
  from whop_sdk import Whop

  client = Whop(
      token="Account API Key",
  )

  account_link = client.account_links.create(
      company_id="biz_xxxxxxxxxxxxx",
      use_case="payouts_portal",
      return_url="https://yourapp.com/payouts/complete",
      refresh_url="https://yourapp.com/payouts/refresh",
  )

  # Redirect the user to the hosted portal
  print(account_link.url)
  ```
</CodeGroup>

In this example:

* `company_id` is the platform or connected account
* `use_case` specifies the portal type
* `return_url` is where Whop redirects the user when they want to return to your site
* `refresh_url` is where Whop redirects the user if the session expires

### Available use cases

| Use case             | Description                                             |
| -------------------- | ------------------------------------------------------- |
| `account_onboarding` | KYC and identity verification                           |
| `payouts_portal`     | Payouts, payout methods, KYC, and identity verification |

After creating the account link, redirect the user to the `url` returned in the response. The user completes the payout flow on the Whop-hosted portal, then Whop redirects them to your `return_url`.

## Related resources

<CardGroup cols={2}>
  <Card title="Pay connected accounts" icon="arrow-right-arrow-left" href="/developer/platforms/collect-payments-for-connected-accounts">
    Transfer funds to connected accounts
  </Card>
</CardGroup>
