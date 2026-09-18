> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Channels

> Use channels for shared chat rooms connected to products and memberships

Channels provide shared chat rooms for many users. Use them for communities, cohorts, event rooms, member-only announcements, or any conversation where access should follow a product membership.

A Chat experience powers each channel. Customers can access the channel when they have access to a product that contains that experience.

## When to use channels

Use a channel when you want a room that belongs to a product or community, not a private conversation between a few users.

Examples:

* A paid community's main chat room
* A course cohort discussion room
* An announcements channel where only admins can post
* A premium room attached to a higher-tier product
* A live event chat for members who bought access

### What makes channels different

Channels are the chat type for product-backed rooms and communities.

* Chat experiences power them, and you can attach them to products.
* Access follows product membership, so everyone with access to the product can participate.
* They support large rooms and communities without the 50-member cap that applies to DMs.
* They include moderation controls for media, links, reactions, blocked words, posting permissions, and posting cooldowns.
* You can make them read-only or announcement-style by limiting posting to admins.

### Constraints

* Users need access to the product that contains the Chat experience before they can participate.
* Channels don't appear in the DMs list. Render them directly with the [Chat element](/developer/guides/chat/chat-element).
* Channels aren't for private user-to-user or small group conversations. Use [direct messages](/developer/guides/chat/direct-messages) for that.
* Channels don't include a support inbox or open/resolved workflow. Use [support chats](/developer/guides/chat/support-chats) for customer support.

## Access model

Channels are usually membership-gated:

1. Create a Chat experience.
2. Attach the experience to a product.
3. Give users access to the product through checkout or a free membership.
4. Render the channel with the `ChatElement` using the channel ID.

<Note>
  Channel IDs start with `chat_feed_`. You can also retrieve a channel by the Chat experience ID, which starts with `exp_`.
</Note>

## Set up a channel

<Steps>
  <Step title="Create or choose a product">
    Create the product that should grant access to the channel. Users get access to channel experiences through products and memberships.
  </Step>

  <Step title="Create a Chat experience">
    Create an experience for the Chat app. In the dashboard, this is the Chat app you add to a product. Through the API, use [Create Experience](/api-reference/experiences/create-experience).
  </Step>

  <Step title="Attach the experience to the product">
    Attach the experience with [Attach Experience](/api-reference/experiences/attach-experience). This makes the channel available to customers with access to that product.
  </Step>

  <Step title="Grant users access">
    Let users buy the product through checkout, or [invite them to a membership](/api-reference/beta/memberships/invite-to-a-membership) if you are giving access through a free plan.
  </Step>

  <Step title="Render the channel">
    Pass the channel ID to the [Chat element](/developer/guides/chat/chat-element). If you only have the experience ID, retrieve the channel with [Retrieve Chat Channel](/api-reference/chat-channels/retrieve-chat-channel).
  </Step>
</Steps>

<Tabs>
  <Tab title="React">
    ```tsx theme={null}
    <ChatElement
      options={{ channelId: "chat_feed_XXXXXXXXXXXXXX" }}
      style={{ height: "100dvh", width: "100%" }}
    />
    ```
  </Tab>

  <Tab title="Vanilla JS">
    ```typescript theme={null}
    const chatElement = session.createElement("chat-element", {
      channelId: "chat_feed_XXXXXXXXXXXXXX",
    });

    chatElement.mount("#chat-container");
    ```
  </Tab>

  <Tab title="Swift">
    ```swift theme={null}
    WhopChatView(
        channelId: "chat_feed_XXXXXXXXXXXXXX",
        style: .imessage
    )
    ```
  </Tab>
</Tabs>

## Manage channels

Channels support moderation tools for controlling who can participate and what members can post. For example, you can make an announcements channel where only admins can send messages, limit media or links, block words, or slow down noisy conversations with posting cooldowns.

Use [Update Chat Channel](/api-reference/chat-channels/update-chat-channel) for the full list of moderation options.

## Next steps

<CardGroup cols={2}>
  <Card title="Chat element" icon="message" href="/developer/guides/chat/chat-element">
    Render a channel, DM, or support chat in your app.
  </Card>

  <Card title="Authentication" icon="key" href="/developer/guides/chat/authentication">
    Mint tokens with the scopes needed to read and send channel messages.
  </Card>
</CardGroup>
