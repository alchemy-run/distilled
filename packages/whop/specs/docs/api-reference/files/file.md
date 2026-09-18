> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# File

> A file that has been uploaded or is pending upload.

<ResponseExample>
  ```json Example theme={null}
  {
  	"content_type": "image/jpeg",
  	"filename": "document.pdf",
  	"id": "file_xxxxxxxxxxxxx",
  	"size": "123.45",
  	"upload_status": "pending",
  	"url": "<string>",
  	"visibility": "public"
  }
  ```
</ResponseExample>

<ResponseField name="content_type" type="string | null" required>
  The MIME type of the uploaded file (e.g., image/jpeg, video/mp4, audio/mpeg).

  Example: `image/jpeg`
</ResponseField>

<ResponseField name="filename" type="string | null" required>
  The original filename of the uploaded file, including its file extension.

  Example: `document.pdf`
</ResponseField>

<ResponseField name="id" type="string" required>
  The unique identifier for the file.

  Example: `file_xxxxxxxxxxxxx`
</ResponseField>

<ResponseField name="size" type="string | null" required>
  The file size in bytes. Null if the file has not finished uploading.

  Example: `123.45`
</ResponseField>

<ResponseField name="upload_status" type="UploadStatuses" required>
  The current upload status of the file (e.g., pending, ready).

  Available options: `pending`, `processing`, `ready`, `failed`
</ResponseField>

<ResponseField name="url" type="string | null" required>
  The URL for accessing the file. For public files, this is a permanent CDN URL.
  For private files, this is a signed URL that expires. Null if the file has not
  finished uploading.
</ResponseField>

<ResponseField name="visibility" type="FileVisibility" required>
  Whether the file is publicly accessible or requires authentication.

  Available options: `public`, `private`
</ResponseField>
