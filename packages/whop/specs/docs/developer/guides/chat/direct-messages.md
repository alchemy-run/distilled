> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Direct messages

> Use DMs for private and group conversations between users

Direct messages are private conversations between two or more users. Use them when your app already has users and you want private messaging inside your product.

For embedded chat, DMs belong to your account context by default. That means users only see conversations created for your app, not unrelated Whop messages.

## When to use direct messages

Use direct messages when only specific members should join the conversation.

Examples:

* Buyer-to-seller messaging inside your app
* A private coaching thread between a coach and client
* A small group conversation for a project, cohort, or team
* A marketplace conversation between two matched users
* User-to-user messaging inside your app

### What makes direct messages different

DMs are the chat type for private conversations between specific users.

* They can be one-on-one or group conversations with up to 50 members.
* Only the users added as members can see and participate in the conversation.
* They appear in the [DMs list element](/developer/guides/chat/dms-list-element), so users can browse and open their recent conversations.
* You can scope them to your account, giving your embedded app its own inbox separate from unrelated Whop messages.
* They support custom conversation names and member management.

### Constraints

* DMs don't grant access based on product membership. Add or remove members directly when access changes.
* DMs don't have admin-only, read-only, or room-level moderation controls. Use [channels](/developer/guides/chat/channels) for moderated rooms.
* DMs don't include a support inbox or open/resolved workflow. Use [support chats](/developer/guides/chat/support-chats) for customer support.
* DMs aren't designed for large communities, announcements, or member-wide rooms. Use [channels](/developer/guides/chat/channels) for that.

## Access model

Each DM has members. Those members are the only users who can see and participate in the conversation.

When you create DMs for embedded chat, keep them tied to your account. This gives your app its own inbox and keeps conversations separate from the rest of Whop.

<Note>
  DM channel IDs start with `feed_`.
</Note>

## Set up a direct message

<Steps>
  <Step title="Sync or create users">
    Make sure every participant has a Whop user ID. If your app has its own users, map them to Whop users first. See [Sync your users](/developer/guides/chat/sync-users).
  </Step>

  <Step title="Create the DM channel">
    Use [Create DM Channel](/api-reference/dm-channels/create-dm-channel) to create the conversation with its initial members.
  </Step>

  <Step title="Add more members when needed">
    Use [Create DM Member](/api-reference/dm-members/create-dm-member) to add a user to an existing DM. Use [Delete DM Member](/api-reference/dm-members/delete-dm-member) to remove one.
  </Step>

  <Step title="Render the conversation or list">
    Use the [Chat element](/developer/guides/chat/chat-element) for a single DM, or the [DMs list element](/developer/guides/chat/dms-list-element) to let users pick from their conversations.
  </Step>
</Steps>

Then render the DM with the returned channel ID:

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

## Manage direct messages

Use [List DM Channels](/api-reference/dm-channels/list-dm-channels), [Update DM Channel](/api-reference/dm-channels/update-dm-channel), and [Delete DM Channel](/api-reference/dm-channels/delete-dm-channel) to manage conversations.

Use [List DM Members](/api-reference/dm-members/list-dm-members), [Create DM Member](/api-reference/dm-members/create-dm-member), and [Delete DM Member](/api-reference/dm-members/delete-dm-member) to manage participants.

<Tip>
  If you use the DMs list element, keep it tied to your account so users only see conversations for your embedded chat experience.
</Tip>

## Next steps

<CardGroup cols={2}>
  <Card title="DMs list element" icon="inbox" href="/developer/guides/chat/dms-list-element">
    Show DM conversations and handle channel selection.
  </Card>

  <Card title="Sync your users" icon="user-plus" href="/developer/guides/chat/sync-users">
    Create or map Whop users before creating DM channels.
  </Card>
</CardGroup>
