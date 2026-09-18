> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Social Account

A Social Account represents an external profile connected to a Whop account or user, such as a Facebook page or Instagram account. Connecting a social account lets Whop run [ads](/api-reference/beta/ads/ad) under that profile's identity and promote its existing posts.

Use the Social Accounts API to list connected accounts, create a Whop-managed Facebook page, start an OAuth connection, disconnect a social account, and list a connected profile's posts or a Facebook page's lead forms.

## Endpoints

| Endpoint                                                                                             | Request                                                                             |
| ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| [List Social Accounts](/api-reference/beta/social-accounts/list-social-accounts)                     | <Badge color="blue" size="sm" stroke>GET</Badge> `/social_accounts`                 |
| [Create a Social Account](/api-reference/beta/social-accounts/create-a-social-account)               | <Badge color="green" size="sm" stroke>POST</Badge> `/social_accounts`               |
| [Delete a Social Account](/api-reference/beta/social-accounts/delete-a-social-account)               | <Badge color="red" size="sm" stroke>DELETE</Badge> `/social_accounts/{id}`          |
| [List Social Account Lead Forms](/api-reference/beta/social-accounts/list-social-account-lead-forms) | <Badge color="blue" size="sm" stroke>GET</Badge> `/social_accounts/{id}/lead_forms` |
| [List Social Account Posts](/api-reference/beta/social-accounts/list-social-account-posts)           | <Badge color="blue" size="sm" stroke>GET</Badge> `/social_accounts/{id}/posts`      |
| [Connect a Social Account](/api-reference/beta/social-accounts/connect-a-social-account)             | <Badge color="green" size="sm" stroke>POST</Badge> `/social_accounts/connect`       |

## Attributes

<Columns cols={2}>
  <Column>
    <ResponseField name="id" type="string" required>
      Unique identifier for the social account.
    </ResponseField>

    <ResponseField name="error" type="string | null" required>
      Why this social account currently can't be used for advertising — a failed
      share or a Meta-side restriction. Null when the account is healthy.
    </ResponseField>

    <ResponseField name="external_id" type="string | null" required>
      The platform-specific ID for this social account.
    </ResponseField>

    <ResponseField name="name" type="string | null" required>
      The display name of the social account on the platform.
    </ResponseField>

    <ResponseField name="parent_social_account" type="object | null" required>
      The social account this one belongs to on the platform, such as the Facebook page that owns an Instagram account. Null when the social account stands on its own.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="id" type="string" required>
          Social account ID, prefixed `sacc_`.
        </ResponseField>

        <ResponseField name="external_id" type="string | null" required>
          The platform-specific ID for the parent social account.
        </ResponseField>

        <ResponseField name="name" type="string | null" required>
          The display name of the parent social account on the platform.
        </ResponseField>

        <ResponseField name="platform" type="string" required>
          The platform the parent social account exists on.

          Available options: `x`, `instagram`, `youtube`, `tiktok`, `facebook`, `discord`, `telegram`
        </ResponseField>

        <ResponseField name="profile_picture_url" type="string | null" required>
          The URL where the profile picture of the parent social account can be
          accessed.
        </ResponseField>

        <ResponseField name="username" type="string | null" required>
          The username of the parent social account on the platform.
        </ResponseField>

        <ResponseField name="verified" type="boolean" required>
          Whether the parent social account is verified on the platform.
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="platform" type="string" required>
      The platform the social account exists on.

      Available options: `x`, `instagram`, `youtube`, `tiktok`, `facebook`, `discord`, `telegram`
    </ResponseField>

    <ResponseField name="profile_picture_url" type="string | null" required>
      The URL where the profile picture of the social account can be accessed.
    </ResponseField>

    <ResponseField name="scopes" type="string[]" required>
      Capabilities Whop retains specific to this social account. For example, Whop
      may request the ability to run advertisements that use this social account's
      identity, reflected by the presence of `advertise` in this value.
    </ResponseField>

    <ResponseField name="url" type="string | null" required>
      The URL where the social account can be accessed on the platform. Null while a
      Whop-owned page is still being provisioned.
    </ResponseField>

    <ResponseField name="username" type="string | null" required>
      The username of the social account on the platform. Null while a Whop-owned
      page is still being provisioned.
    </ResponseField>

    <ResponseField name="verified" type="boolean" required>
      Whether the social account is verified on the platform.
    </ResponseField>
  </Column>

  <Column>
    <div className="api-resource-sticky-example">
      ```json SocialAccount theme={null}
      {
      	"id": "sacc_xxxxxxxxxxxx",
      	"external_id": "17841400000000000",
      	"name": "Pickaxe Pro",
      	"parent_social_account": {
      		"id": "sacc_yyyyyyyyyyyy",
      		"platform": "facebook",
      		"username": "pickaxepro",
      		"name": "Pickaxe Pro",
      		"profile_picture_url": "https://img.whop.com/sacc_yyyyyyyyyyyy.png",
      		"verified": true,
      		"external_id": "112233445566778"
      	},
      	"platform": "instagram",
      	"profile_picture_url": "https://img.whop.com/sacc_xxxxxxxxxxxx.png",
      	"scopes": ["advertise"],
      	"error": null,
      	"url": "https://instagram.com/pickaxepro",
      	"username": "pickaxepro",
      	"verified": true
      }
      ```
    </div>
  </Column>
</Columns>
