> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Upload files

> Upload images and files for use across the Whop platform

Upload files to Whop for use in courses, forums, profiles, and more.

<Warning>
  The `files.upload` helper shown on this page isn't available in any current SDK. `@whop/sdk`, `whop-sdk`, and the `whop_sdk` gem all expose only `files.create` and `files.retrieve`, so the snippets below are kept for reference and won't run as written. `files.create` returns a presigned `upload_url` (plus `upload_headers`) that you send the bytes to yourself.
</Warning>

<CodeGroup>
  ```typescript TypeScript theme={null}
  import fs from 'fs';

  const file = await client.files.upload({
    file: fs.readFileSync('./photo.jpg'),
    filename: 'photo.jpg',
  });

  console.log(file.id); // file_xxxxxxxxxxxxx
  console.log(file.url); // URL to access the file
  ```

  ```python Python theme={null}
  file = client.files.upload(
      file=open("./photo.jpg", "rb").read(),
      filename="photo.jpg",
  )

  print(file.id)  # file_xxxxxxxxxxxxx
  print(file.url)  # URL to access the file
  ```

  ```ruby Ruby theme={null}
  file = client.files.upload(
    file: File.binread("./photo.jpg"),
    filename: "photo.jpg",
  )

  puts file.id  # file_xxxxxxxxxxxxx
  puts file.url  # URL to access the file
  ```
</CodeGroup>

The `upload` helper:

1. Creates a file record with a presigned URL
2. Uploads your file to storage
3. Polls until processing is complete
4. Returns the ready file with its final URL

# Public and private files

Every file you upload has a **visibility** that controls access. You choose visibility at upload time and can't change it later.

| Visibility          | URL type                                         | Who can access             | Use for                                                                             |
| ------------------- | ------------------------------------------------ | -------------------------- | ----------------------------------------------------------------------------------- |
| `private` (default) | Signed URL that expires                          | Only your app, via the API | Message attachments, user-uploaded documents, sensitive content, AI-generated files |
| `public`            | Permanent, unsigned content delivery network URL | Anyone with the link       | Product images, thumbnails, branding, marketing assets                              |

<Warning>
  **Set the visibility before uploading.** Public files are cached on Whop's CDN and accessible to anyone with the URL — there is no way to revoke access. If the content is user-specific or sensitive, keep the default `private`.
</Warning>

## Uploading a public file

Pass `visibility: "public"` when creating the file:

<CodeGroup>
  ```typescript TypeScript theme={null}
  const file = await client.files.upload({
    file: fs.readFileSync('./product-cover.jpg'),
    filename: 'product-cover.jpg',
    visibility: 'public',
  });

  // file.url is a permanent CDN URL that anyone with the link can access
  ```

  ```python Python theme={null}
  file = client.files.upload(
      file=open("./product-cover.jpg", "rb").read(),
      filename="product-cover.jpg",
      visibility="public",
  )
  ```

  ```ruby Ruby theme={null}
  file = client.files.upload(
    file: File.binread("./product-cover.jpg"),
    filename: "product-cover.jpg",
    visibility: "public",
  )
  ```
</CodeGroup>

Attaching a file to a resource moves it to the storage that matches that resource's own visibility. An explicit `visibility` mainly matters for files you link to directly without attaching.

## Accessing private files

Private file URLs expire. To get a fresh URL, retrieve the file by ID:

```typescript theme={null}
const file = await client.files.retrieve({ id: fileId });
console.log(file.url); // fresh signed URL
```

# Using uploaded files

Once uploaded, use the file ID in any API call that accepts file attachments:

```typescript theme={null}
await client.courses.update({
	id: "course_xxx",
	thumbnail: { id: file.id },
});
```

# File properties

| Property        | Description                                                    |
| --------------- | -------------------------------------------------------------- |
| `id`            | Unique identifier (e.g., `file_xxxxxxxxxxxxx`)                 |
| `filename`      | Original filename                                              |
| `content_type`  | Media type (e.g., `image/jpeg`)                                |
| `byte_size`     | File size in bytes                                             |
| `url`           | URL to access the file (signed and expiring for private files) |
| `upload_status` | Status: `pending`, `processing`, `ready`, or `failed`          |
| `visibility`    | `public` or `private`                                          |
