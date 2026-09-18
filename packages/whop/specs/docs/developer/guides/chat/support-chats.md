> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Support chats

> Use support chats for one-on-one customer support conversations with your account

Support chats are one-on-one conversations between a customer and your account. Use them when the conversation is official support, needs to be visible to team members, or should have an open/resolved workflow.

Unlike direct messages, support chats organize conversations around a customer support relationship with your account. They're best for customer service, not peer-to-peer messaging.

## When to use support chats

Use support chats when your team needs to respond to customers as the account.

Examples:

* A help inbox for paid members
* A billing or account support conversation
* A buyer support thread after checkout
* A creator-to-customer support line
* An escalation path from your app into Whop-hosted chat UI

### What makes support chats different

Support chats are the chat type for official customer-to-account conversations.

* Each support chat connects one customer with your account.
* For the customer, the conversation behaves like a normal DM-style chat and can appear in their DMs list.
* Team members manage support chats through an inbox with open and resolved states.
* Team members can list, sort, and filter support chats by customer, status, and admin/team view.
* Moderators can help respond to support chats without getting full account admin access.

### Constraints

* Support chats aren't for group user-to-user conversations. Use [direct messages](/developer/guides/chat/direct-messages) for that.
* Support chats don't appear in the DMs list component for admins. Build a support inbox with the support channels API instead.
* Support chats don't grant product or membership room access. Use [channels](/developer/guides/chat/channels) for member-only rooms.
* Support chats aren't peer-to-peer DMs. Use [direct messages](/developer/guides/chat/direct-messages) when users should message each other directly.

## Access model

A support chat belongs to an account and a customer. Team members with support access can list and respond to support chats for the account. The customer can render and participate in their own support chat when authenticated with the required support scopes.

If someone on your team should help manage support chats without getting full admin access, add them as a team member with the moderator role. Moderators can help handle customer conversations while restricting access to broader account settings.

<Note>
  Support chat IDs start with `feed_`.
</Note>

## Set up a support chat

<Steps>
  <Step title="Sync or identify the customer">
    You need the customer's Whop user ID or username. If your app has its own user system, map users first with [Sync your users](/developer/guides/chat/sync-users).
  </Step>

  <Step title="Create the support channel">
    Use [Create Support Channel](/api-reference/support-channels/create-support-channel). Whop returns the existing support chat if one already exists for that customer.
  </Step>

  <Step title="Render the conversation">
    Pass the returned support channel ID to the [Chat element](/developer/guides/chat/chat-element).
  </Step>

  <Step title="List support chats for your team">
    Use [List Support Channels](/api-reference/support-channels/list-support-channels) to build an inbox for your team.
  </Step>
</Steps>

Then render the support chat with the returned channel ID:

<Tabs>
  <Tab title="React">
    ```tsx theme={null}
    <ChatElement
      options={{ channelId: "feed_XXXXXXXXXXXXXX" }}
      style={{ height: "100dvh", width: "100%" }}
    />
    ```
  </Tab>

  <Tab title="Vanilla JS">
    ```typescript theme={null}
    const chatElement = session.createElement("chat-element", {
      channelId: "feed_XXXXXXXXXXXXXX",
    });

    chatElement.mount("#chat-container");
    ```
  </Tab>

  <Tab title="Swift">
    ```swift theme={null}
    WhopChatView(
        channelId: "feed_XXXXXXXXXXXXXX",
        style: .imessage
    )
    ```
  </Tab>
</Tabs>

## Manage support chats

Use [Create Support Channel](/api-reference/support-channels/create-support-channel), [List Support Channels](/api-reference/support-channels/list-support-channels), and [Retrieve Support Channel](/api-reference/support-channels/retrieve-support-channel) to manage support chats.

Support chats also support inbox-style workflows. You can build views for open conversations, resolved conversations, customer-visible conversations, and team/admin views. See [List Support Channels](/api-reference/support-channels/list-support-channels) for the available filters.

## Next steps

<CardGroup cols={2}>
  <Card title="Chat element" icon="message" href="/developer/guides/chat/chat-element">
    Render a support chat after you create or retrieve it.
  </Card>

  <Card title="Authentication" icon="key" href="/developer/guides/chat/authentication">
    Add support chat scopes to your token endpoint.
  </Card>
</CardGroup>
