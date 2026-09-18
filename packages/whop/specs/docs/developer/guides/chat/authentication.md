> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Authentication

> Authenticate users for embedded chat with account-scoped tokens or OAuth

Before using the chat SDK, you need to authenticate users. Pick one of two approaches:

| Approach                                                      | Best for                                                                                            |
| ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| **[Account-scoped user tokens](#account-scoped-user-tokens)** | Apps that already have their own users. Your server mints Whop tokens for them — no sign-in needed. |
| **[OAuth](/developer/guides/chat/oauth)**                     | Apps that want users to sign in to Whop themselves via a sign-in page or webview.                   |

## Account-scoped user tokens

Use this approach if **your app already has its own users** (via your own auth / session system). You keep your existing login flow and mint a Whop token for whichever user is currently signed in — no extra sign-in step.

Your server exchanges your Whop API key for a short-lived user token on demand and returns it to the client. You decide which user the token is for.

### 1. Gather your credentials

You'll need three things:

1. **API key** — create one at the [Whop Developer Dashboard](https://whop.com/dashboard/developer). Treat it like a password and keep it on your server only.
2. **Account ID** — find it in your dashboard URL: `whop.com/dashboard/biz_XXXXXXXXX/`.
3. **User ID** — the user you want to authenticate. In production, derive this from your own auth / session system.

<Note>
  For embedded chat, both `company_id` and `user_id` are required together when minting a token.
</Note>

### 2. Create a token endpoint on your server

Add an endpoint that calls `POST https://api.whop.com/api/v1/access_tokens` with your API key and returns the resulting token to the client.

<Tabs>
  <Tab title="Next.js">
    ```typescript app/api/chat/token/route.ts theme={null}
    import { NextResponse } from "next/server";
    import { WhopClient } from "@whop/sdk";

    const client = new WhopClient({ token: process.env.WHOP_API_KEY });

    export async function POST() {
      // Derive these from your own auth / session in production.
      const user_id = "user_XXXXXXXXXXXX";
      const company_id = "biz_XXXXXXXXXXXXX";

      const { token } = await client.accessTokens.create({
        company_id,
        user_id,
        scoped_actions: [
          "chat:message:create",
          "chat:read",
          "dms:read",
          "dms:message:manage",
          "dms:channel:manage",
          "support_chat:read",
          "support_chat:message:create",
        ],
      });

      return NextResponse.json({ token });
    }
    ```
  </Tab>

  <Tab title="Express">
    ```typescript server.ts theme={null}
    import express from "express";
    import { WhopClient } from "@whop/sdk";

    const app = express();
    app.use(express.json());

    const client = new WhopClient({ token: process.env.WHOP_API_KEY });

    app.post("/api/chat/token", async (_req, res) => {
      // Derive these from your own auth / session in production.
      const user_id = "user_XXXXXXXXXXXX";
      const company_id = "biz_XXXXXXXXXXXXX";

      const { token } = await client.accessTokens.create({
        company_id,
        user_id,
        scoped_actions: [
          "chat:message:create",
          "chat:read",
          "dms:read",
          "dms:message:manage",
          "dms:channel:manage",
          "support_chat:read",
          "support_chat:message:create",
        ],
      });

      res.json({ token });
    });

    app.listen(3000);
    ```
  </Tab>

  <Tab title="cURL">
    ```bash theme={null}
    curl -X POST https://api.whop.com/api/v1/access_tokens \
      -H "Authorization: Bearer $WHOP_API_KEY" \
      -H "Content-Type: application/json" \
      -d '{
        "company_id": "biz_XXXXXXXXXXXXX",
        "user_id": "user_XXXXXXXXXXXX",
        "scoped_actions": [
          "chat:message:create",
          "chat:read",
          "dms:read",
          "dms:message:manage",
          "dms:channel:manage",
          "support_chat:read",
          "support_chat:message:create"
        ]
      }'
    ```
  </Tab>
</Tabs>

### 3. Fetch the token from your app

Provide the SDK with a token callback that fetches from your endpoint. The chat elements call this whenever they need to authenticate, and again automatically when the token expires.

<Tabs>
  <Tab title="React">
    ```typescript theme={null}
    async function getToken() {
      const response = await fetch("/api/chat/token", { method: "POST" });
      const data = await response.json();
      return data.token;
    }
    ```
  </Tab>

  <Tab title="Vanilla JS">
    ```typescript theme={null}
    async function getToken() {
      const response = await fetch("/api/chat/token", { method: "POST" });
      const data = await response.json();
      return data.token;
    }
    ```
  </Tab>

  <Tab title="Swift">
    ```swift theme={null}
    import WhopElements

    class WhopAPITokenProvider: WhopTokenProvider {
        private let serverURL = URL(string: "https://your-server.com")!

        func getToken() async -> WhopTokenResponse {
            do {
                var req = URLRequest(url: serverURL.appendingPathComponent("api/chat/token"))
                req.httpMethod = "POST"

                let (data, _) = try await URLSession.shared.data(for: req)
                let json = try JSONSerialization.jsonObject(with: data) as! [String: Any]
                return WhopTokenResponse(accessToken: json["token"] as? String ?? "")
            } catch {
                return WhopTokenResponse(accessToken: "")
            }
        }
    }
    ```

    Pass the token provider to the SDK on app launch:

    ```swift theme={null}
    .task {
        await WhopSDK.configure(tokenProvider: WhopAPITokenProvider())
    }
    ```
  </Tab>
</Tabs>

### Required scopes

Request these scopes when creating the token:

| Scope                                                  | Purpose         |
| ------------------------------------------------------ | --------------- |
| `chat:message:create`, `chat:read`                     | Channels        |
| `dms:read`, `dms:message:manage`, `dms:channel:manage` | Direct messages |
| `support_chat:read`, `support_chat:message:create`     | Support chats   |

<Note>
  If your app owns the user accounts and mints account-scoped chat tokens, sync those users before passing their `user_id` here. User syncing isn't part of OAuth.
</Note>

<Card title="Sync your users" icon="user-plus" href="/developer/guides/chat/sync-users">
  Create or map Whop users before minting account-scoped chat tokens.
</Card>

## OAuth

OAuth lives on its own page so this guide can stay focused on account-scoped user tokens.

Use OAuth when your app wants users to sign in to Whop themselves through a sign-in page or iOS webview. This is the right choice when your app needs access to a user-owned Whop account, or when you don't want your backend to mint Whop user tokens.

<Card title="OAuth" icon="user-lock" href="/developer/guides/chat/oauth">
  Set up OAuth scopes, redirect URIs, web token endpoints, and SDK-managed OAuth on iOS.
</Card>
