> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# iOS Checkout SDK

> Sell in-app purchases and subscriptions natively on iOS (2.7% + $0.30 vs Apple's 15-30%)

The Whop iOS Checkout SDK lets you sell in-app purchases and subscriptions in your native iOS app. In the United States, it automatically uses Whop's payment processing (2.7% + \$0.30 versus Apple's 15-30%). Elsewhere, it falls back to Apple's StoreKit for global coverage.

<Tip>
  The SDK is configured with a scoped `iap:read` API key that's safe to ship in your app bundle. See [Create an API key](/developer/guides/ios/installation#step-3-create-an-api-key) for setup.
</Tip>

## What you can build

<CardGroup cols={2}>
  <Card title="Build a Paywall" icon="credit-card" href="/developer/guides/ios/build-a-paywall">
    Display subscription plans and handle purchases in your app
  </Card>

  <Card title="Check Entitlements" icon="shield-check" href="/developer/guides/ios/check-entitlements">
    Verify subscription status and gate premium content
  </Card>
</CardGroup>

## Related iOS SDKs

Whop also ships separate SDKs for embedded experiences:

<CardGroup cols={2}>
  <Card title="Embedded Chat" icon="message" href="/developer/guides/chat/quickstart">
    Add Whop chat channels directly in your app
  </Card>

  <Card title="Embedded Payouts" icon="money-bill-transfer" href="/developer/platforms/render-payout-portal">
    Render the connected-account payout portal
  </Card>
</CardGroup>

## Quick example

Here's a complete example showing the SDK in action:

```swift theme={null}
import SwiftUI
import WhopCheckout

@main
struct MyApp: App {
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

struct ContentView: View {
    @Environment(Checkout.self) var checkout

    var body: some View {
        if checkout.isSubscribed {
            Text("Welcome, premium user!")
        } else {
            Button("Upgrade to Premium") {
                Task {
                    try? await checkout.purchase("plan_xxxxx")
                }
            }
        }
    }
}
```

## Getting started

<Steps>
  <Step title="Install the SDK">
    Add the WhopCheckout package to your Xcode project via Swift Package Manager.

    [Installation guide →](/developer/guides/ios/installation)
  </Step>

  <Step title="Get your API key">
    Create an API key with the `iap:read` permission in your [Developer Settings](https://whop.com/dashboard/developer). [Why this is safe to embed →](/developer/guides/ios/installation#step-3-create-an-api-key)
  </Step>

  <Step title="Configure the SDK">
    Initialize the SDK with your account ID, API key, and plan mappings via `Checkout.shared.configure()`.
  </Step>

  <Step title="Build your paywall">
    Display plans and handle purchases. The SDK automatically uses Whop checkout in the US and StoreKit elsewhere.

    [Build a paywall →](/developer/guides/ios/build-a-paywall)
  </Step>
</Steps>

## Reference

<Card title="API Reference" icon="book" href="/developer/guides/ios/checkout-reference">
  Complete API documentation for all Checkout classes, methods, and types
</Card>

## Requirements

* iOS 17.0+
* Xcode 15.0+
* Swift 5.10+
