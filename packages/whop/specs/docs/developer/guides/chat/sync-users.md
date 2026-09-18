> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Sync your users

> Create or map Whop users with your own platform users.

Sync users before you mint account-scoped user tokens for embedded chat. The user you pass as `user_id` must exist on Whop, and you can provide an account-specific name and profile picture that appears for that user in chat.

<Note>
  This **isn't needed for OAuth**. If you use OAuth, the user signs in to Whop and the OAuth token identifies their Whop account.
</Note>

## 1. Enroll users as connected accounts

Create a connected account for each user on your platform. This is the same flow used by the [payouts SDK](/developer/platforms/render-payout-portal) — see the [Enroll connected accounts](/developer/platforms/enroll-connected-accounts) guide for the full walkthrough.

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

Save the resulting user ID on your side — you'll pass it when minting account-scoped chat tokens.

## 2. Set an account-specific name and profile picture

Call the [Update user](/api-reference/beta/users/update-user) endpoint with your account ID to define overrides shown for that user in the context of your account. Without an account ID, the fields update the user's global profile instead.

Upload avatars through the [Create file](/api-reference/files/create-file) endpoint, then pass the returned file ID as the profile picture.

Call this whenever a user's profile changes on your platform so Whop stays in sync.

<Note>
  The Update user endpoint requires the `user:profile:update` permission on the API key making the request. Use an account API key with **owner-level** access, or a key that includes the `user:profile:update` scope.
</Note>

## Next steps

<CardGroup cols={2}>
  <Card title="Authentication" icon="key" href="/developer/guides/chat/authentication">
    Mint account-scoped user tokens for embedded chat.
  </Card>

  <Card title="OAuth" icon="user-lock" href="/developer/guides/chat/oauth">
    Use Whop sign-in instead of syncing users yourself.
  </Card>

  <Card title="Chat element" icon="message" href="/developer/guides/chat/chat-element">
    Render a live chat UI once your users are authenticated.
  </Card>

  <Card title="Enroll connected accounts" icon="user-plus" href="/developer/platforms/enroll-connected-accounts">
    Learn the full connected-account enrollment flow.
  </Card>
</CardGroup>
