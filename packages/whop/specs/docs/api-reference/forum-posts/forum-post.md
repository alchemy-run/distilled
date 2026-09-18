> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Forum Post

> A post or comment in a forum feed, supporting rich text, attachments, polls, and reactions.

<ResponseExample>
  ```json Example theme={null}
  {
  	"attachments": [
  		{
  			"content_type": "image/jpeg",
  			"filename": "document.pdf",
  			"id": "<string>",
  			"url": "https://media.whop.com/abc123/optimized.jpg"
  		}
  	],
  	"comment_count": 42,
  	"content": "## My Strategy\n\nHere are the key steps...",
  	"created_at": "2023-12-01T05:00:00.401Z",
  	"id": "<string>",
  	"is_edited": true,
  	"is_pinned": true,
  	"is_poster_admin": true,
  	"like_count": 42,
  	"parent_id": "<string>",
  	"title": "Weekly Market Analysis - February 2025",
  	"updated_at": "2023-12-01T05:00:00.401Z",
  	"user": {
  		"id": "user_xxxxxxxxxxxxx",
  		"name": "John Doe",
  		"username": "johndoe42"
  	},
  	"view_count": 42
  }
  ```
</ResponseExample>

<ResponseField name="attachments" type="array<object>" required>
  All file attachments on this post, such as images, documents, and videos.

  <Expandable title="child attributes">
    <ResponseField name="content_type" type="string | null" required>
      Uploaded file MIME type, such as image/jpeg, video/mp4, or audio/mpeg.

      Example: `image/jpeg`
    </ResponseField>

    <ResponseField name="filename" type="string | null" required>
      The original filename of the uploaded attachment, including its file extension.

      Example: `document.pdf`
    </ResponseField>

    <ResponseField name="id" type="string" required />

    <ResponseField name="url" type="string | null" required>
      A pre-optimized URL for rendering this attachment on the client. This should be used for displaying attachments in apps.

      Example: `https://media.whop.com/abc123/optimized.jpg`
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="comment_count" type="integer" required>
  The total number of direct comments on this post.

  Example: `42`
</ResponseField>

<ResponseField name="content" type="string | null" required>
  The body of the forum post in Markdown format. Null if the post is paywalled and the current user does not have access.

  Example: `## My Strategy Here are the key steps...`
</ResponseField>

<ResponseField name="created_at" type="string<date-time>" required>
  The time this post was created, as a Unix timestamp.

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="id" type="string" required />

<ResponseField name="is_edited" type="boolean" required>
  Whether this post has been edited after its initial creation.
</ResponseField>

<ResponseField name="is_pinned" type="boolean" required>
  Whether this post is pinned to the top of the forum feed.
</ResponseField>

<ResponseField name="is_poster_admin" type="boolean" required>
  Whether the author of this post is an admin of the company that owns the
  forum.
</ResponseField>

<ResponseField name="like_count" type="integer | null" required>
  The total number of like reactions this post has received.

  Example: `42`
</ResponseField>

<ResponseField name="parent_id" type="string | null" required>
  The unique identifier of the parent post. Null if this is a top-level post.
</ResponseField>

<ResponseField name="title" type="string | null" required>
  The headline of the forum post. Null if the post has no title.

  Example: `Weekly Market Analysis - February 2025`
</ResponseField>

<ResponseField name="updated_at" type="string<date-time>" required>
  The time this post was last updated, as a Unix timestamp.

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="user" type="object" required>
  The user who authored this forum post.

  <Expandable title="child attributes">
    <ResponseField name="id" type="string" required>
      The unique identifier for the user.

      Example: `user_xxxxxxxxxxxxx`
    </ResponseField>

    <ResponseField name="name" type="string | null" required>
      The user's display name shown on their public profile.

      Example: `John Doe`
    </ResponseField>

    <ResponseField name="username" type="string" required>
      The user's unique username shown on their public profile.

      Example: `johndoe42`
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="view_count" type="integer | null" required>
  The total number of times this post has been viewed by users.

  Example: `42`
</ResponseField>
