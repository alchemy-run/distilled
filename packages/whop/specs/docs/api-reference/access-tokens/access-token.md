> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Access Token

> A short-lived access token used to authenticate API requests on behalf of a user.

<ResponseExample>
  ```json Example theme={null}
  {
  	"expires_at": "2023-12-01T05:00:00.401Z",
  	"token": "<string>"
  }
  ```
</ResponseExample>

<ResponseField name="expires_at" type="string<date-time>" required>
  The timestamp after which this access token is no longer valid and must be refreshed.

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="token" type="string" required>
  The signed JWT access token string to include in API request Authorization
  headers.
</ResponseField>
