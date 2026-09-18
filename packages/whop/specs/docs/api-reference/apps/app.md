> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# App

> An app is an integration built on Whop. Apps can serve consumers as experiences within products, or serve companies as business tools.

<Note>
  This resource has a successor in the [Whop API](/api-reference/beta/apps/app),
  the versioned API that new integrations should build on. This page stays fully
  supported.
</Note>

<ResponseExample>
  ```json Example theme={null}
  {
  	"api_key": {
  		"created_at": "2023-12-01T05:00:00.401Z",
  		"id": "<string>",
  		"token": "<string>"
  	},
  	"app_type": "b2b_app",
  	"base_url": "https://myapp.example.com",
  	"company": {
  		"id": "biz_xxxxxxxxxxxxxx",
  		"title": "Pickaxe"
  	},
  	"creator": {
  		"id": "user_xxxxxxxxxxxxx",
  		"name": "John Doe",
  		"username": "johndoe42"
  	},
  	"dashboard_path": "/experiences/[experienceId]",
  	"default_api_key": {
  		"id": "<string>",
  		"name": "<string>",
  		"obfuscated_secret_key": "<string>",
  		"secret_key": "<string>"
  	},
  	"description": "A comprehensive analytics dashboard for tracking revenue, members, and growth metrics.",
  	"discover_path": "/experiences/[experienceId]",
  	"domain_id": "ab1c2d3e4f5g6h7i8j9k",
  	"experience_path": "/experiences/[experienceId]",
  	"hosted_url": "https://myapp.whop.app",
  	"icon": {
  		"url": "https://media.whop.com/abc123/optimized.jpg"
  	},
  	"id": "app_xxxxxxxxxxxxxx",
  	"marketplace_status": "not_available",
  	"name": "Courses",
  	"oauth_client_type": "public",
  	"openapi_path": "/experiences/[experienceId]",
  	"origin": "<string>",
  	"product_id": "<string>",
  	"production_web_build": {
  		"checksum": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  		"file_url": "https://cdn.whop.com/builds/abc123.zip",
  		"id": "apbu_xxxxxxxxxxxxx",
  		"source_url": "https://cdn.whop.com/builds/abc123-source.zip",
  		"status": "draft"
  	},
  	"redirect_uris": ["<string>"],
  	"requested_permissions": [
  		{
  			"is_required": true,
  			"justification": "<string>",
  			"permission_action": {
  				"action": "<string>",
  				"name": "<string>"
  			}
  		}
  	],
  	"route": "myapp",
  	"secrets": {},
  	"skills_path": "/experiences/[experienceId]",
  	"stats": {
  		"dau": 42,
  		"mau": 42,
  		"time_spent_last24_hours": 42,
  		"wau": 42
  	},
  	"status": "live",
  	"verified": true
  }
  ```
</ResponseExample>

<ResponseField name="api_key" type="object | null" required>
  The API key used to authenticate requests on behalf of this app. Null if no API key has been generated. Requires the 'developer:manage\_api\_key' permission.

  <Expandable title="child attributes">
    <ResponseField name="created_at" type="string<date-time>" required>
      The datetime the private api key was created.

      Example: `2023-12-01T05:00:00.401Z`
    </ResponseField>

    <ResponseField name="id" type="string" required>
      The unique identifier for the private api key.
    </ResponseField>

    <ResponseField name="token" type="string" required>
      This is the API key used to authenticate requests
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="app_type" type="AppTypes" required>
  The target audience classification for this app (e.g., 'b2b\_app', 'b2c\_app', 'company\_app', 'component').

  Available options: `b2b_app`, `b2c_app`, `company_app`, `component`, `website`
</ResponseField>

<ResponseField name="base_url" type="string | null" required>
  The production base URL where the app is hosted. `null` if no base URL is configured, or if the caller lacks the `developer:basic:read` permission on the app's account.

  Example: `https://myapp.example.com`
</ResponseField>

<ResponseField name="company" type="object" required>
  The company that owns and publishes this app.

  <Expandable title="child attributes">
    <ResponseField name="id" type="string" required>
      The unique identifier for the company.

      Example: `biz_xxxxxxxxxxxxxx`
    </ResponseField>

    <ResponseField name="title" type="string" required>
      The display name of the company shown to customers.

      Example: `Pickaxe`
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="creator" type="object" required>
  The user who created and owns the company that published this app.

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

<ResponseField name="dashboard_path" type="string | null" required>
  The URL path template for a specific view of this app, appended to the base domain (e.g., '/experiences/\[experienceId]'). Null if the specified view type is not configured.

  Example: `/experiences/[experienceId]`
</ResponseField>

<ResponseField name="default_api_key" type="object | null" required>
  The app's default API key, used to authenticate requests on behalf of this app. Null if the app has no default key. Requires the 'developer:manage\_api\_key' permission.

  <Expandable title="child attributes">
    <ResponseField name="id" type="string" required>
      The unique identifier for the authorized api key.
    </ResponseField>

    <ResponseField name="name" type="string | null" required>
      A user set name to identify an API key
    </ResponseField>

    <ResponseField name="obfuscated_secret_key" type="string" required>
      A masked version of the secret key used to authenticate requests. This is so
      that the owner can easily identify which key it is without being shown the
      full secret.
    </ResponseField>

    <ResponseField name="secret_key" type="string | null" required>
      The secret key used to authenticate requests. This is only available if the current actor would have been able to create this api key.
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="description" type="string | null" required>
  A written description of what this app does, displayed on the app store listing page. Null if no description has been set.

  Example: `A comprehensive analytics dashboard for tracking revenue,…`
</ResponseField>

<ResponseField name="discover_path" type="string | null" required>
  The URL path template for a specific view of this app, appended to the base domain (e.g., '/experiences/\[experienceId]'). Null if the specified view type is not configured.

  Example: `/experiences/[experienceId]`
</ResponseField>

<ResponseField name="domain_id" type="string" required>
  The unique subdomain identifier for this app's proxied URL on the Whop platform. Forms the URL pattern https\://\{domain\_id}.apps.whop.com.

  Example: `ab1c2d3e4f5g6h7i8j9k`
</ResponseField>

<ResponseField name="experience_path" type="string | null" required>
  The URL path template for a specific view of this app, appended to the base domain (e.g., '/experiences/\[experienceId]'). Null if the specified view type is not configured.

  Example: `/experiences/[experienceId]`
</ResponseField>

<ResponseField name="hosted_url" type="string | null" required>
  The full canonical URL where this app's hosted web build is served. Null if the app has not claimed a route.

  Example: `https://myapp.whop.app`
</ResponseField>

<ResponseField name="icon" type="object | null" required>
  The icon image for this app, displayed on the app store, product pages, checkout, and as the default icon for experiences using this app.

  <Expandable title="child attributes">
    <ResponseField name="url" type="string | null" required>
      A pre-optimized URL for rendering this attachment on the client. This should be used for displaying attachments in apps.

      Example: `https://media.whop.com/abc123/optimized.jpg`
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="id" type="string" required>
  The unique identifier for the app.

  Example: `app_xxxxxxxxxxxxxx`
</ResponseField>

<ResponseField name="marketplace_status" type="MarketplaceStatuses | null" required>
  The approval status of this app's product listing on the Whop app store. Null if the app has no associated product.

  Available options: `not_available`, `pending_review`, `live_marketplace`
</ResponseField>

<ResponseField name="name" type="string" required>
  The display name of this app shown on the app store and in experience navigation. Maximum 30 characters.

  Example: `Courses`
</ResponseField>

<ResponseField name="oauth_client_type" type="AppOauthClientTypes" required>
  How this app authenticates when exchanging OAuth authorization and refresh grants.

  Available options: `public`, `confidential`
</ResponseField>

<ResponseField name="openapi_path" type="string | null" required>
  The URL path template for a specific view of this app, appended to the base domain (e.g., '/experiences/\[experienceId]'). Null if the specified view type is not configured.

  Example: `/experiences/[experienceId]`
</ResponseField>

<ResponseField name="origin" type="string | null" required>
  The full origin URL for this app's proxied domain (e.g.,
  '[https://myapp.apps.whop.com](https://myapp.apps.whop.com)'). Null if no proxy domain is configured.
</ResponseField>

<ResponseField name="product_id" type="string | null" required />

<ResponseField name="production_web_build" type="object | null" required>
  The approved app build currently served to users on web. Null if no production build is deployed for web.

  <Expandable title="child attributes">
    <ResponseField name="checksum" type="string" required>
      A SHA-256 hash of the uploaded build file, generated by the client and used to verify file integrity.

      Example: `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7…`
    </ResponseField>

    <ResponseField name="file_url" type="string" required>
      A URL to download the app build as a .zip archive.

      Example: `https://cdn.whop.com/builds/abc123.zip`
    </ResponseField>

    <ResponseField name="id" type="string" required>
      The unique identifier for the app build.

      Example: `apbu_xxxxxxxxxxxxx`
    </ResponseField>

    <ResponseField name="source_url" type="string | null" required>
      A URL to download the compressed source code archive that produced this build. Null if the build was uploaded without a source archive.

      Example: `https://cdn.whop.com/builds/abc123-source.zip`
    </ResponseField>

    <ResponseField name="status" type="AppBuildStatuses" required>
      The current review status of this build.

      Available options: `draft`, `pending`, `approved`, `rejected`
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="redirect_uris" type="array<string>" required>
  The whitelisted OAuth callback URLs that users are redirected to after
  authorizing the app.
</ResponseField>

<ResponseField name="requested_permissions" type="array<object>" required>
  The list of permissions this app requests when installed, including both required and optional permissions with justifications.

  <Expandable title="child attributes">
    <ResponseField name="is_required" type="boolean" required>
      Whether the action is required for the app to function.
    </ResponseField>

    <ResponseField name="justification" type="string" required>
      The reason for requesting the action.
    </ResponseField>

    <ResponseField name="permission_action" type="object" required>
      The action that the app will request off of users when a user installs the app.

      <Expandable title="child attributes">
        <ResponseField name="action" type="string" required>
          The identifier of the action.
        </ResponseField>

        <ResponseField name="name" type="string" required>
          The human readable name of the action.
        </ResponseField>
      </Expandable>
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="route" type="string | null" required>
  The unique subdomain route where this app's hosted web builds are served, such as 'myapp' for myapp.whop.app. Null if the app has not claimed a route.

  Example: `myapp`
</ResponseField>

<ResponseField name="secrets" type="object | null" required>
  The app's secrets as an object of string values. Encrypted at rest and
  injected into the app's hosted server runtime as environment bindings.
  Requires the 'developer:update\_app' permission.
</ResponseField>

<ResponseField name="skills_path" type="string | null" required>
  The URL path template for a specific view of this app, appended to the base domain (e.g., '/experiences/\[experienceId]'). Null if the specified view type is not configured.

  Example: `/experiences/[experienceId]`
</ResponseField>

<ResponseField name="stats" type="object | null" required>
  Aggregate usage statistics for this app, including daily, weekly, and monthly active user counts.

  <Expandable title="child attributes">
    <ResponseField name="dau" type="integer" required>
      The number of unique users who have spent time in this app in the last 24 hours. Returns 0 if no usage data is available.

      Example: `42`
    </ResponseField>

    <ResponseField name="mau" type="integer" required>
      The number of unique users who have spent time in this app in the last 28 days. Returns 0 if no usage data is available.

      Example: `42`
    </ResponseField>

    <ResponseField name="time_spent_last24_hours" type="integer" required>
      The total time, in seconds, that all users have spent in this app over the last 24 hours. Returns 0 if no usage data is available.

      Example: `42`
    </ResponseField>

    <ResponseField name="wau" type="integer" required>
      The number of unique users who have spent time in this app in the last 7 days. Returns 0 if no usage data is available.

      Example: `42`
    </ResponseField>
  </Expandable>
</ResponseField>

<ResponseField name="status" type="AppStatuses" required>
  The current visibility status of this app on the Whop app store. 'live' means publicly discoverable, 'unlisted' means accessible only via direct link, and 'hidden' means not visible anywhere.

  Available options: `live`, `unlisted`, `hidden`
</ResponseField>

<ResponseField name="verified" type="boolean" required>
  Whether this app has been verified by Whop. Verified apps are endorsed by Whop
  and displayed in the featured apps section of the app store.
</ResponseField>
