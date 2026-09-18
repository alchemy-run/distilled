> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Quickstart

> Give your users a real-time messaging chat on web and native iOS. Support many types of conversations. Whop handles the messages, real-time updates, media uploads, and UI.

<iframe src="https://www.youtube.com/embed/MqgyFg9YyCw?rel=0" title="Embed Whop chat in your app" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen style={{ aspectRatio: "16 / 9", width: "100%", border: 0 }} />

<div className="qs-step-header">
  <span className="qs-step-indicator">1</span>
  <h2>Create an API key</h2>
</div>

Create an API key in the [Whop Developer Dashboard](https://whop.com/dashboard/developer) and save it on your server as `WHOP_API_KEY`.

This key lets you perform actions within the context of your account. Keep it on the server. Never put it in browser, mobile, or client-side code.

<div className="qs-step-header">
  <span className="qs-step-indicator">2</span>
  <h2>Install packages</h2>
</div>

Install the SDK in your backend:

<Tabs>
  <Tab title="Next.js">
    ```bash theme={null}
    pnpm add @whop/sdk
    ```
  </Tab>

  <Tab title="Express">
    ```bash theme={null}
    pnpm add @whop/sdk
    ```
  </Tab>

  <Tab title="cURL">
    You can also check [the API reference](/developer/api/quickstart) if you prefer to make the requests yourself.
  </Tab>
</Tabs>

Install the elements packages in your frontend:

<Tabs>
  <Tab title="React">
    ```bash theme={null}
    pnpm add @whop/embedded-components-react-js @whop/embedded-components-vanilla-js
    ```
  </Tab>

  <Tab title="HTML">
    ```html theme={null}
    <script src="https://apollo.elements.whop.com/release/elements.js"></script>
    ```
  </Tab>

  <Tab title="iOS">
    Add this Swift package in Xcode:

    ```text theme={null}
    https://github.com/whopio/whopsdk-elements-swift
    ```

    Chat supports photos, videos, and voice messages, so add these permissions to your app's `Info.plist`:

    ```xml Info.plist theme={null}
    <key>NSCameraUsageDescription</key>
    <string>Allow camera access to take photos and videos in chat</string>
    <key>NSMicrophoneUsageDescription</key>
    <string>Allow microphone access to record voice messages in chat</string>
    <key>NSPhotoLibraryUsageDescription</key>
    <string>Allow photo library access to share photos and videos in chat</string>
    ```
  </Tab>
</Tabs>

<div className="qs-step-header">
  <span className="qs-step-indicator">3</span>
  <h2>Get a user ID for your users</h2>
</div>

Enroll your own users as connected accounts before minting chat tokens. This creates a Whop account you can map back to your platform user.

<Tabs>
  <Tab title="Next.js">
    ```typescript theme={null}
    import { WhopClient } from "@whop/sdk";

    const client = new WhopClient({ token: process.env.WHOP_API_KEY });

    const account = await client.companies.create({
      email: "user@example.com",
      parent_company_id: "biz_XXXXXXXXXXXXX", // your platform's account ID
      title: "Jane Doe",
      metadata: {
        internal_user_id: "user_12345", // your platform's user ID
      },
    });
    ```
  </Tab>

  <Tab title="Express">
    ```typescript theme={null}
    import { WhopClient } from "@whop/sdk";

    const client = new WhopClient({ token: process.env.WHOP_API_KEY });

    const account = await client.companies.create({
      email: "user@example.com",
      parent_company_id: "biz_XXXXXXXXXXXXX", // your platform's account ID
      title: "Jane Doe",
      metadata: {
        internal_user_id: "user_12345", // your platform's user ID
      },
    });
    ```
  </Tab>

  <Tab title="cURL">
    ```bash theme={null}
    curl -X POST https://api.whop.com/api/v1/companies \
      -H "Authorization: Bearer $WHOP_API_KEY" \
      -H "Content-Type: application/json" \
      -d '{
        "email": "user@example.com",
        "parent_company_id": "biz_XXXXXXXXXXXXX",
        "title": "Jane Doe",
        "metadata": {
          "internal_user_id": "user_12345"
        }
      }'
    ```
  </Tab>
</Tabs>

Save the resulting Whop user ID (`owner_user.id` in the response) on your side and pass it as `user_id` when you create chat access tokens.

See [account-specific profiles](/developer/guides/chat/sync-users#2-set-an-account-specific-name-and-profile-picture) for more details on how to update users avatars and display names.

<div className="qs-step-header">
  <span className="qs-step-indicator">4</span>
  <h2>Create a token endpoint on your server</h2>
</div>

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

<div className="qs-step-header">
  <span className="qs-step-indicator">5</span>
  <h2>Create or fetch a channel, DM, or support chat</h2>
</div>

All chat types use real-time messaging and can render in the Chat element. Pick the type based on your needs:

<CardGroup cols={1}>
  <Card title="Channels" icon="messages" href="/developer/guides/chat/channels">
    A shared chat for public or large group conversations. Rooms with moderation, read-only options, and no fixed member cap.
  </Card>

  <Card title="Direct messages" icon="inbox" href="/developer/guides/chat/direct-messages">
    A private conversation between users. They show in the DMs list and can include up to 50 members.
  </Card>

  <Card title="Support chat" icon="headset" href="/developer/guides/chat/support-chats">
    A one-on-one support conversation between a user and your account. Customers see them like DMs. Admins manage them through a support inbox instead of the DMs list.
  </Card>
</CardGroup>

Before rendering chat, get the channel ID you want to open.

* [**Channels**](/developer/guides/chat/channels) IDs start with `chat_feed_`.
* [**DMs**](/developer/guides/chat/direct-messages) and [**support chats**](/developer/guides/chat/support-chats) IDs start with `feed_`.

<div className="qs-step-header">
  <span className="qs-step-indicator">6</span>
  <h2>Render chat in your app</h2>
</div>

This will use the token endpoint you created to fetch a token and render the chat element. The SDK is responsible of managing the token and refreshing it when necessary.

<Tabs>
  <Tab title="React">
    ```tsx theme={null}
    "use client";

    import {
      ChatElement,
      ChatSession,
      Elements,
    } from "@whop/embedded-components-react-js";
    import { loadWhopElements } from "@whop/embedded-components-vanilla-js";

    const elements = loadWhopElements();

    async function getToken() {
      const res = await fetch("https://your-server.com/api/chat/token", { method: "POST" });
      const data = await res.json();
      return data.token;
    }

    export function Chat() {
      return (
        <Elements elements={elements}>
          <ChatSession token={getToken}>
            <ChatElement
              options={{ channelId: "chat_feed_XXXXXXXXXXXXXX" }}
              style={{ height: "100dvh", width: "100%" }}
            />
          </ChatSession>
        </Elements>
      );
    }
    ```
  </Tab>

  <Tab title="HTML">
    ```html theme={null}
    <div id="chat" style="height: 100vh"></div>

    <script>
      const elements = new WhopElements();

      async function getToken() {
        const res = await fetch("https://your-server.com/api/chat/token", { method: "POST" });
        const data = await res.json();
        return data.token;
      }

      const session = elements.createChatSession({ token: getToken });
      const chat = session.createElement("chat-element", {
        channelId: "chat_feed_XXXXXXXXXXXXXX",
      });

      chat.mount("#chat");
    </script>
    ```
  </Tab>

  <Tab title="iOS">
    ```swift theme={null}
    import SwiftUI
    import WhopElements

    struct ContentView: View {
      var body: some View {
        WhopChatView(
          channelId: "chat_feed_XXXXXXXXXXXXXX",
          style: .imessage
        )
        // This should be done as soon as you know your user is authenticated so its
        // prepared and ready to use without delays.
        .task {
          await WhopSDK.configure(tokenProvider: WhopAPITokenProvider())
        }
      }
    }

    class WhopAPITokenProvider: WhopTokenProvider {
      func getToken() async -> WhopTokenResponse {
        let url = URL(string: "https://your-server.com/api/chat/token")!
        var request = URLRequest(url: url)
        request.httpMethod = "POST"

        do {
          let (data, _) = try await URLSession.shared.data(for: request)
          let json = try JSONSerialization.jsonObject(with: data) as! [String: Any]
          return WhopTokenResponse(accessToken: json["token"] as? String ?? "")
        } catch {
          return WhopTokenResponse(accessToken: "")
        }
      }
    }
    ```
  </Tab>
</Tabs>

## Next steps

<CardGroup cols={2}>
  <Card title="Authentication" icon="key" href="/developer/guides/chat/authentication">
    Choose between account-scoped tokens and OAuth for embedded chat.
  </Card>

  <Card title="Sync your users" icon="user-plus" href="/developer/guides/chat/sync-users">
    Create or map Whop users before minting account-scoped chat tokens.
  </Card>

  <Card title="Chat element" icon="message" href="/developer/guides/chat/chat-element">
    Learn the props, events, styles, and deeplinking options for the chat UI.
  </Card>

  <Card title="DMs list element" icon="inbox" href="/developer/guides/chat/dms-list-element">
    Show a list of a user's direct message conversations.
  </Card>
</CardGroup>
