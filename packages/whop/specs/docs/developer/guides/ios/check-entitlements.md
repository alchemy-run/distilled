> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Check Entitlements

> Verify subscription status and gate premium content in your iOS app

This guide shows you how to check if a user has an active subscription and gate premium content accordingly. You'll also learn how to handle user login/logout to sync subscriptions across devices.

## What you'll learn

* Check if a user has access to a product
* Gate content based on subscription status
* Sync subscriptions across devices with user login

## Prerequisites

* [Install the SDK](/developer/guides/ios/installation)
* [Configure the SDK](/developer/guides/ios/build-a-paywall#step-1-configure-the-sdk)

## Check subscription status

Use `hasAccess(to:)` to check if the user has access to a specific product:

```swift theme={null}
struct ContentView: View {
    @Environment(Checkout.self) var checkout

    var body: some View {
        VStack {
            // Basic features always available
            BasicFeaturesView()

            // Premium features for subscribers
            if checkout.hasAccess(to: "prod_xxxxxxxxxxxxxx") {
                PremiumFeaturesView()
            }

            // If you have multiple tiers, check each product separately
            if checkout.hasAccess(to: "prod_yyyyyyyyyyyyyy") {
                EnterpriseFeaturesView()
            }
        }
    }
}
```

Or use `isSubscribed` to check if the user has any active subscription:

```swift theme={null}
if checkout.isSubscribed {
    // User has at least one active membership
}
```

## View active memberships

Access the `memberships` array to show subscription details:

```swift theme={null}
struct SubscriptionStatusView: View {
    @Environment(Checkout.self) var checkout

    var body: some View {
        List {
            if checkout.memberships.isEmpty {
                Text("No active subscriptions")
                    .foregroundStyle(.secondary)
            } else {
                ForEach(checkout.memberships) { membership in
                    MembershipRow(membership: membership)
                }
            }
        }
    }
}

struct MembershipRow: View {
    let membership: CheckoutMembership

    var body: some View {
        VStack(alignment: .leading) {
            Text("Subscription")
                .font(.headline)

            if let expiresAt = membership.expiresAt {
                Text("Renews \(expiresAt, style: .date)")
                    .foregroundStyle(.secondary)
            }

            Text("Status: \(membership.status.rawValue)")
                .font(.caption)
                .foregroundStyle(.secondary)
        }
    }
}
```

## User login and logout

User IDs let subscriptions sync across devices. When a user logs in, the SDK automatically claims any unclaimed memberships from the current device and loads their existing memberships.

### Log in a user

```swift theme={null}
func handleLogin(userId: String) async {
    do {
        try await checkout.logIn(appUserId: userId)
        // Memberships are now synced for this user
    } catch {
        print("Login failed: \(error)")
    }
}
```

### Log out a user

```swift theme={null}
func handleLogout() {
    checkout.logOut()
    // User is now logged out, memberships cleared
}
```

### Check the current user

```swift theme={null}
if let userId = checkout.appUserId {
    Text("Logged in as \(userId)")
} else {
    Text("Not logged in")
}
```

## Guest purchases

Users can purchase subscriptions even without logging in. The SDK tracks these purchases by device ID and automatically claims them when the user logs in.

```swift theme={null}
struct PurchaseFlow: View {
    @Environment(Checkout.self) var checkout
    @State private var showingLogin = false

    var body: some View {
        VStack {
            if checkout.appUserId == nil {
                // User not logged in - they can still purchase
                Text("Purchase as guest or log in to sync across devices")

                Button("Continue as Guest") {
                    // Purchase will be tied to device
                    Task { try? await checkout.purchase("plan_xxx") }
                }

                Button("Log In") {
                    showingLogin = true
                }
            } else {
                // User logged in - purchase tied to their account
                Button("Subscribe") {
                    Task { try? await checkout.purchase("plan_xxx") }
                }
            }
        }
        .sheet(isPresented: $showingLogin) {
            // Your login view here
        }
    }
}
```

## Complete example

Here's a complete example showing entitlement checking with user auth:

```swift theme={null}
struct MainView: View {
    @Environment(Checkout.self) var checkout
    @State private var showingPaywall = false
    @State private var showingLogin = false

    var body: some View {
        NavigationStack {
            Group {
                if !checkout.isInitialized {
                    ProgressView("Loading...")
                } else if checkout.hasAccess(to: "prod_xxxxxxxxxxxxxx") {
                    PremiumContentView()
                } else {
                    FreeContentView(onUpgrade: { showingPaywall = true })
                }
            }
            .toolbar {
                ToolbarItem(placement: .topBarTrailing) {
                    Menu {
                        if let userId = checkout.appUserId {
                            Text("Signed in as \(userId)")
                            Button("Sign Out", action: signOut)
                        } else {
                            Button("Sign In") { showingLogin = true }
                        }

                        Divider()

                        if checkout.hasAccess(to: "prod_xxxxxxxxxxxxxx") {
                            Button("Manage Subscription") {
                                // Show subscription management
                            }
                        }
                    } label: {
                        Image(systemName: "person.circle")
                    }
                }
            }
            .sheet(isPresented: $showingPaywall) {
                PaywallView()
            }
            .sheet(isPresented: $showingLogin) {
                LoginView { userId in
                    Task {
                        try? await checkout.logIn(appUserId: userId)
                        showingLogin = false
                    }
                }
            }
        }
    }

    func signOut() {
        checkout.logOut()
    }
}

struct FreeContentView: View {
    let onUpgrade: () -> Void

    var body: some View {
        VStack(spacing: 20) {
            Text("Free Content")
                .font(.title)

            Text("Upgrade to access premium features")
                .foregroundStyle(.secondary)

            Button("Upgrade Now", action: onUpgrade)
                .buttonStyle(.borderedProminent)
        }
    }
}

struct PremiumContentView: View {
    var body: some View {
        VStack {
            Image(systemName: "crown.fill")
                .font(.largeTitle)
                .foregroundStyle(.yellow)

            Text("Premium Content")
                .font(.title)

            Text("Thanks for subscribing!")
        }
    }
}
```

## Reactive updates

The SDK automatically updates views when subscription status changes. Since `Checkout` is `@Observable`, any view using `@Environment(Checkout.self)` will re-render when:

* A purchase completes
* A user logs in or out
* The SDK loads or updates memberships

You don't need to refresh manually.

## Next steps

<CardGroup cols={2}>
  <Card title="Build a Paywall" icon="credit-card" href="/developer/guides/ios/build-a-paywall">
    Display plans and handle purchases
  </Card>

  <Card title="API Reference" icon="book" href="/developer/guides/ios/checkout-reference">
    Explore all available methods and properties
  </Card>
</CardGroup>
