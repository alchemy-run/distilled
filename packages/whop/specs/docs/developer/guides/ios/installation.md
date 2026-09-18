> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Installation

> Install the WhopCheckout SDK and configure it with an iap:read API key

Whop distributes its iOS SDKs as separate Swift packages — **WhopCheckout** for payments and **WhopElements** for embedded chat and payouts. Install only what you need.

## WhopCheckout (in-app purchases)

The WhopCheckout package handles subscriptions and payments in your app.

### Step 1: Add package dependency

In Xcode, go to **File** → **Add Package Dependencies...**.

Enter the package URL:

```
https://github.com/whopio/whopsdk-checkout-swift
```

### Step 2: Select version

Choose the latest version or a version range:

* **Up to Next Major**: Recommended for production
* **Exact Version**: For stability

### Step 3: Create an API key

The SDK requires an API key with only the `iap:read` permission. Whop designed this permission for client-side use, so you can embed the key in your app bundle.

<Steps>
  <Step title="Open Developer Settings">
    Go to [Whop Developer Settings](https://whop.com/dashboard/developer) and select your app.
  </Step>

  <Step title="Create the API key">
    Select **Create API Key** and then select **only** the `iap:read` permission.
  </Step>

  <Step title="Copy the key">
    Copy the generated key — you'll pass it to `Checkout.shared.configure()` in the next step.
  </Step>
</Steps>

<Warning>
  Only grant the `iap:read` permission. It's the only permission designed for client-side use and limits the key to in-app purchase operations. Never ship a key with broader permissions inside your app.
</Warning>

### Step 4: Import and configure

```swift theme={null}
import SwiftUI
import WhopCheckout

@main
struct YourApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
                .environment(Checkout.shared)
                .task {
                    try? await Checkout.shared.configure(
                        // companyId: find in Dashboard URL (starts with biz_)
                        companyId: "biz_xxxxxxxxxxxxxx",
                        // apiKey: create in Dashboard > Developer with iap:read permission
                        apiKey: "your_api_key_here",
                        planMappings: [
                            .init(whopId: "plan_xxxxx", appleId: "monthly_sub")
                        ]
                    )
                }
        }
    }
}
```

<Card title="Build a Paywall" icon="credit-card" href="/developer/guides/ios/build-a-paywall">
  Continue with the full setup guide
</Card>

***

## WhopElements (embedded chat and payouts)

Use WhopElements to embed Whop chat channels in your app.

### Step 1: Add package dependency

In Xcode, go to **File** → **Add Package Dependencies...**.

Enter the package URL:

```
https://github.com/whopio/whopsdk-elements-swift
```

### Step 2: Select version

Choose the latest version or a version range.

### Step 3: Import and Configure the specific element

```swift theme={null}
import SwiftUI
import WhopElements

@main
struct YourApp: App {
    var body: some Scene {
        WindowGroup {
            NavigationStack {
                WhopChatView(channelId: "chat_feed_XXXXXXXXXXXXXX")
            }
            .task {
                await WhopSDK.configureWithOAuth(appId: "app_XXXXXXXXXXXXXX")
            }
        }
    }
}
```

<Card title="Embedded Chat" icon="message" href="/developer/guides/chat/quickstart">
  Continue with the chat integration guide
</Card>

<Card title="Embedded Payouts" icon="money-bill-transfer" href="/developer/platforms/render-payout-portal">
  Continue with the chat integration guide
</Card>

***

## Requirements

* iOS 17.0+
* Xcode 15.0+
* Swift 5.10+

## Next steps

<CardGroup cols={2}>
  <Card title="Build a Paywall" icon="credit-card" href="/developer/guides/ios/build-a-paywall">
    Add subscriptions and payments
  </Card>

  <Card title="Check Entitlements" icon="shield-check" href="/developer/guides/ios/check-entitlements">
    Gate content based on subscription status
  </Card>

  <Card title="Embedded Chat" icon="message" href="/developer/guides/chat/quickstart">
    Add Whop chat to your app
  </Card>

  <Card title="Embedded Payouts" icon="money-bill-transfer" href="/developer/platforms/render-payout-portal">
    Enable connected account payouts
  </Card>

  <Card title="API Reference" icon="book" href="/developer/guides/ios/checkout-reference">
    Full SDK documentation
  </Card>
</CardGroup>
