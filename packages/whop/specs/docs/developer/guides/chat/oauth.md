> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# OAuth

> Authenticate embedded chat users with Whop OAuth and SDK-managed sign-in.

With OAuth, users sign in to Whop themselves through a sign-in page or an iOS webview. Your app receives Whop user tokens that can authenticate embedded chat and act on behalf of the signed-in user.

Use OAuth when your app needs access to the user's Whop account, or when you don't want to mint account-scoped user tokens from your own backend.

<Card title="Full OAuth guide" icon="key" href="/developer/guides/oauth">
  See the general OAuth guide for the complete OAuth 2.1 + PKCE flow, token exchange, refresh, and revocation details.
</Card>

## Setup

<Warning>
  The `App` object returned by `apps.create` in the current `@whop/sdk` does not expose a `client_secret` field. Copy the client secret from the Dashboard tab instead.
</Warning>

<Tabs>
  <Tab title="API">
    Use the [Create App](/api-reference/apps/create-app) endpoint to create an OAuth app programmatically:

    ```typescript theme={null}
    import { WhopClient } from "@whop/sdk";

    const client = new WhopClient({ token: process.env.WHOP_API_KEY });

    const app = await client.apps.create({
      name: "My App",
      redirect_uris: [
        "http://localhost:3000/api/auth/callback/whop",
        "https://myapp.com/api/auth/callback/whop"
      ],
    });

    console.log(app.id);            // App ID
    console.log(app.client_secret); // Client Secret
    ```

    Update redirect URIs later with the [Update App](/api-reference/apps/update-app) endpoint.
  </Tab>

  <Tab title="Dashboard">
    <Steps>
      <Step title="Create or select your app">
        Register your app in the [Whop Dashboard](https://whop.com/dashboard/) > Developer to get an app ID.
      </Step>

      <Step title="Add a redirect URL">
        In the app you created, open OAuth, and add a redirect URL.

        * For React or vanilla JavaScript apps, use your app's callback URL, such as `https://yourapp.com/oauth/callback`.
        * For Swift apps, use your bundle ID, such as `com.yourapp.bundle://oauth/callback`, or configure a custom redirect URI.
      </Step>

      <Step title="Select scopes">
        On the same page, copy the required scopes from **View available scopes**.
      </Step>
    </Steps>
  </Tab>
</Tabs>

## Required scopes

Your OAuth configuration should include these scopes:

| Scope                                                  | Purpose            |
| ------------------------------------------------------ | ------------------ |
| `openid`, `profile`, `email`                           | Basic profile info |
| `chat:message:create`, `chat:read`                     | Channels           |
| `dms:read`, `dms:message:manage`, `dms:channel:manage` | Direct messages    |
| `support_chat:read`, `support_chat:message:create`     | Support chats      |

## Web token endpoint

Your server needs to provide a token endpoint that returns a valid OAuth token with the required scopes. The React and vanilla JavaScript chat elements call this function whenever they need to authenticate.

```typescript theme={null}
async function getToken() {
  const response = await fetch("/api/token");
  const data = await response.json();
  return data.token;
}
```

See the [OAuth guide](/developer/guides/oauth) for implementing the server-side token exchange.

## Software development kit-managed OAuth on iOS

Call `configureWithOAuth` on app launch. The SDK handles the entire flow: showing a sign-in webview, obtaining tokens, and refreshing them automatically.

```swift theme={null}
.task {
    await WhopSDK.configureWithOAuth(
        appId: "app_XXXXXXXXXXXXXX",
        scopes: [
            "openid", "profile", "email",
            "chat:message:create", "chat:read",
            "dms:read", "dms:message:manage", "dms:channel:manage",
            "support_chat:read", "support_chat:message:create",
        ]
    )
}
```

By default, the SDK uses your bundle identifier for the redirect URI (`com.yourapp.bundle://oauth/callback`). You can customize this:

```swift theme={null}
await WhopSDK.configureWithOAuth(
    appId: "app_XXXXXXXXXXXXXX",
    redirectUri: "myapp://auth/callback",
    scopes: [
        "openid", "profile", "email",
        "chat:message:create", "chat:read",
        "dms:read", "dms:message:manage", "dms:channel:manage",
        "support_chat:read", "support_chat:message:create",
    ]
)
```

Make sure the redirect URI matches what you configured in the [Whop Dashboard](https://whop.com/dashboard/) > Developer > App > OAuth.

When a user navigates to a chat view, the SDK automatically triggers the OAuth flow if they're not already authenticated. You can also trigger sign-in and sign-out manually:

```swift theme={null}
// Sign in
try await WhopSDK.signIn()

// Sign out
WhopSDK.signOut()
```

### Tracking authentication state

Use the `.whopAuthState` modifier to reactively track whether the user has signed in:

```swift theme={null}
struct ChatView: View {
    @State private var isAuthenticated = false

    var body: some View {
        VStack {
            if isAuthenticated {
                Text("Signed In")
            } else {
                Text("Not Signed In")
            }
        }
        .whopAuthState($isAuthenticated)
    }
}
```

### Pre-filling tokens

If you already have the user's Whop tokens from another source, you can pre-fill them to skip the sign-in webview on first launch. Sources include a web OAuth flow or tokens synced from your backend. This is optional and only relevant if your users have already authenticated with Whop elsewhere.

```swift theme={null}
let tokens = await myBackend.getWhopTokens(for: currentUser)

try await WhopSDK.preSignIn(
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken
)
```

The SDK extracts the token expiration from the JSON Web Token (JWT) and handles refresh automatically. If the SDK can't refresh expired pre-filled tokens, the normal OAuth flow starts.

## Next steps

<CardGroup cols={2}>
  <Card title="Authentication" icon="key" href="/developer/guides/chat/authentication">
    Compare OAuth with account-scoped tokens for embedded chat.
  </Card>

  <Card title="General OAuth guide" icon="user-lock" href="/developer/guides/oauth">
    Implement the full OAuth flow, token exchange, refresh, and revocation.
  </Card>

  <Card title="Chat element" icon="message" href="/developer/guides/chat/chat-element">
    Learn the props, events, styles, and deeplinking options for the chat UI.
  </Card>

  <Card title="Embedded chat quickstart" icon="bolt" href="/developer/guides/chat/quickstart">
    Render your first embedded chat experience.
  </Card>
</CardGroup>
