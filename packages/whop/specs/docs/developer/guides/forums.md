> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Forums

> Create forum posts, fetch threads, and add comments or reactions inside any Whop community.

Use the Forums API to publish posts, comment on existing threads, and react to posts inside a Whop community's forum experience. The `experience_id` scopes forum content, so each forum tile in a community sidebar is a separate experience.

## Initialize the SDK

<CodeGroup>
  ```typescript TypeScript theme={null}
  import { WhopClient } from "@whop/sdk";

  const client = new WhopClient({
    token: process.env.WHOP_API_KEY,
  });
  ```

  ```python Python theme={null}
  import os
  from whop_sdk import Whop

  client = Whop(
      token=os.environ["WHOP_API_KEY"],
  )
  ```
</CodeGroup>

## Create a post

Posts support Markdown. Optional fields let you pin the post, paywall it, or mark it as a mention.

<CodeGroup>
  ```typescript TypeScript theme={null}
  const post = await client.forumPosts.create({
    experience_id: "exp_xxxxxxxxxxxxx",
    content: "This is the post body in **Markdown**.",
    title: "Optional title for paywalled posts",
    pinned: false,
    is_mention: false,
    paywall_amount: 0, // cents; 500 = $5.00
  });
  ```

  ```python Python theme={null}
  post = client.forum_posts.create(
      experience_id="exp_xxxxxxxxxxxxx",
      content="This is the post body in **Markdown**.",
      title="Optional title for paywalled posts",
      pinned=False,
      is_mention=False,
      paywall_amount=0,
  )
  ```
</CodeGroup>

## Read posts

List operations paginate automatically.

<CodeGroup>
  ```typescript TypeScript theme={null}
  const posts = await client.forumPosts.list({
    experience_id: "exp_xxxxxxxxxxxxx",
    first: 10,
  });

  for await (const item of posts) {
    console.log(item);
  }

  const post = await client.forumPosts.retrieve({ id: "post_xxxxxxxxxxxxx" });
  ```

  ```python Python theme={null}
  for item in client.forum_posts.list(
      experience_id="exp_xxxxxxxxxxxxx",
      first=10,
  ):
      print(item)

  post = client.forum_posts.retrieve("post_xxxxxxxxxxxxx")
  ```
</CodeGroup>

## Comment on a post

Comments are posts with a `parent_id`. Fetch them by passing the parent's ID to `list`.

<CodeGroup>
  ```typescript TypeScript theme={null}
  const comment = await client.forumPosts.create({
    experience_id: "exp_xxxxxxxxxxxxx",
    content: "Great post!",
    parent_id: "post_xxxxxxxxxxxxx",
  });

  const comments = await client.forumPosts.list({
    experience_id: "exp_xxxxxxxxxxxxx",
    parent_id: "post_xxxxxxxxxxxxx",
    first: 10,
  });

  for await (const item of comments) {
    console.log(item);
  }
  ```

  ```python Python theme={null}
  comment = client.forum_posts.create(
      experience_id="exp_xxxxxxxxxxxxx",
      content="Great post!",
      parent_id="post_xxxxxxxxxxxxx",
  )

  for item in client.forum_posts.list(
      experience_id="exp_xxxxxxxxxxxxx",
      parent_id="post_xxxxxxxxxxxxx",
      first=10,
  ):
      print(item)
  ```
</CodeGroup>

## Like a post

<Note>
  Forum reactions are always `:heart:`. Chat messages accept any emoji, but forum reactions ignore other values.
</Note>

<CodeGroup>
  ```typescript TypeScript theme={null}
  await client.reactions.create({
    resource_id: "post_xxxxxxxxxxxxx",
    emoji: ":heart:",
  });
  ```

  ```python Python theme={null}
  client.reactions.create(
      resource_id="post_xxxxxxxxxxxxx",
      emoji=":heart:",
  )
  ```
</CodeGroup>

## Advanced features

### Pinned posts

Pinned posts appear at the top of the feed. Use `pinned: true` when creating a post.

<CodeGroup>
  ```typescript TypeScript theme={null}
  await client.forumPosts.create({
    experience_id: "exp_xxxxxxxxxxxxx",
    content: "Important announcement!",
    pinned: true,
  });
  ```

  ```python Python theme={null}
  client.forum_posts.create(
      experience_id="exp_xxxxxxxxxxxxx",
      content="Important announcement!",
      pinned=True,
  )
  ```
</CodeGroup>

### Mention users

Use `<@username>` inline. Mentioned users get notified.

<CodeGroup>
  ```typescript TypeScript theme={null}
  await client.forumPosts.create({
    experience_id: "exp_xxxxxxxxxxxxx",
    content: "Hey <@username> check this out!",
  });
  ```

  ```python Python theme={null}
  client.forum_posts.create(
      experience_id="exp_xxxxxxxxxxxxx",
      content="Hey <@username> check this out!",
  )
  ```
</CodeGroup>

### Paywalled posts

`paywall_amount` is in cents. Readers must pay to see the full content.

<CodeGroup>
  ```typescript TypeScript theme={null}
  await client.forumPosts.create({
    experience_id: "exp_xxxxxxxxxxxxx",
    title: "Premium post",
    content: "Exclusive content here",
    paywall_amount: 500, // $5.00
  });
  ```

  ```python Python theme={null}
  client.forum_posts.create(
      experience_id="exp_xxxxxxxxxxxxx",
      title="Premium post",
      content="Exclusive content here",
      paywall_amount=500,
  )
  ```
</CodeGroup>

### Pagination with cursors

Beyond automatic pagination, you can step through pages manually using the `end_cursor` on the response's `page_info`.

<CodeGroup>
  ```typescript TypeScript theme={null}
  const firstPage = await client.forumPosts.list({
    experience_id: "exp_xxxxxxxxxxxxx",
    first: 10,
  });

  const next = await client.forumPosts.list({
    experience_id: "exp_xxxxxxxxxxxxx",
    first: 10,
    after: firstPage.response.page_info.end_cursor ?? undefined,
  });
  ```

  ```python Python theme={null}
  first = client.forum_posts.list(
      experience_id="exp_xxxxxxxxxxxxx",
      first=10,
  )

  next_page = client.forum_posts.list(
      experience_id="exp_xxxxxxxxxxxxx",
      first=10,
      after=first.response.page_info.end_cursor,
  )
  ```
</CodeGroup>

## Required permissions

Add these to your app's permission list from the [Permissions guide](/developer/guides/permissions) before publishing.

| Permission          | Needed for                     |
| ------------------- | ------------------------------ |
| `forum:read`        | Reading posts and comments     |
| `forum:post:create` | Creating posts and comments    |
| `chat:read`         | Creating and reading reactions |

<Accordion title="Post object shape">
  ```typescript theme={null}
  {
    id: string;
    comment_count: number;
    content: string | null;
    is_edited: boolean;
    is_pinned: boolean;
    is_poster_admin: boolean;
    like_count: number | null;
    parent_id: string | null; // null = top-level, set = comment
    title: string | null;
    view_count: number | null;
    user: { id: string; name: string | null; username: string };
  }
  ```

  Full schema: see the [Forum posts API reference](/api-reference/forum-posts/forum-post).
</Accordion>

## Next steps

<CardGroup cols={2}>
  <Card title="Build a chatbot" href="/developer/guides/chat">
    Pair forum posts with live chat messages in the same community.
  </Card>

  <Card title="Listen to events with webhooks" href="/developer/guides/webhooks">
    React to forum posts and comments in realtime on your server.
  </Card>

  <Card title="Send notifications" href="/developer/guides/notifications">
    Push users back to your forum when there's something new.
  </Card>

  <Card title="Upload files" href="/developer/guides/upload-files">
    Attach images and videos to posts.
  </Card>
</CardGroup>
