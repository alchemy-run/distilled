> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Team Member

A Team Member is a member of an account's team: the link between a user and an account, carrying the role that controls what they can do. Roles are either system roles (like `admin` or `moderator`) or `custom` roles managed from the dashboard.

Use the Team Members API to list an account's team, add a user to the team with a system role, change a member's role, and remove members. Adding a user who has not yet accepted sends an invitation instead.

## Endpoints

| Endpoint                                                                      | Request                                                                   |
| ----------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| [List Team Members](/api-reference/beta/team-members/list-team-members)       | <Badge color="blue" size="sm" stroke>GET</Badge> `/team_members`          |
| [Create Team Member](/api-reference/beta/team-members/create-team-member)     | <Badge color="green" size="sm" stroke>POST</Badge> `/team_members`        |
| [Retrieve Team Member](/api-reference/beta/team-members/retrieve-team-member) | <Badge color="blue" size="sm" stroke>GET</Badge> `/team_members/{id}`     |
| [Update Team Member](/api-reference/beta/team-members/update-team-member)     | <Badge color="orange" size="sm" stroke>PATCH</Badge> `/team_members/{id}` |
| [Delete Team Member](/api-reference/beta/team-members/delete-team-member)     | <Badge color="red" size="sm" stroke>DELETE</Badge> `/team_members/{id}`   |

## Attributes

<Columns cols={2}>
  <Column>
    <ResponseField name="id" type="string" required>
      Team member ID — `ausr_` for accepted members, `ausri_` for pending invites.
    </ResponseField>

    <ResponseField name="account_id" type="string" required>
      The account this membership belongs to, prefixed `biz_`.
    </ResponseField>

    <ResponseField name="authorized_role" type="object | null" required>
      Custom role assigned to this member, or `null` when the member has a system role.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="id" type="string" required>
          Custom role ID, prefixed `aurl_`.
        </ResponseField>

        <ResponseField name="name" type="string" required>
          Custom role name.
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="created_at" type="string" required>
      When the member joined or the invite was sent, as an ISO 8601 timestamp.
    </ResponseField>

    <ResponseField name="email" type="string | null" required>
      The member's email address. For accepted members, `null` unless the caller
      holds the email read scope; for invites, the invited address.
    </ResponseField>

    <ResponseField name="is_agent" type="boolean" required>
      Whether this member is an agent (app-controlled account) rather than a human
      team member. Always `false` for invites.
    </ResponseField>

    <ResponseField name="role" type="string" required>
      The member's role on the account. `custom` means a bespoke dashboard-managed role; the API can read but not grant it.

      Available options: `owner`, `admin`, `sales_manager`, `moderator`, `advertiser`, `app_manager`, `support`, `manager`, `workforce`, `custom`
    </ResponseField>

    <ResponseField name="status" type="string" required>
      `joined` for accepted members, `pending` while the invite is pending.

      Available options: `joined`, `pending`
    </ResponseField>

    <ResponseField name="updated_at" type="string" required>
      When the membership was last updated, as an ISO 8601 timestamp.
    </ResponseField>

    <ResponseField name="user" type="object | null" required>
      The user behind this team membership. `null` for an invite sent to an email with no Whop account yet.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="id" type="string" required>
          User ID, prefixed `user_`.
        </ResponseField>

        <ResponseField name="name" type="string | null" required>
          Display name.
        </ResponseField>

        <ResponseField name="profile_picture" type="object" required>
          Avatar wrapper; its `url` is always present, using a generated placeholder when the user set no picture.

          <Accordion title="Properties" defaultOpen={true}>
            <ResponseField name="url" type="string" required>
              Avatar image URL. Always present — a generated placeholder when the user set no picture.
            </ResponseField>
          </Accordion>
        </ResponseField>

        <ResponseField name="username" type="string" required>
          Public username.
        </ResponseField>
      </Accordion>
    </ResponseField>
  </Column>

  <Column>
    <div className="api-resource-sticky-example">
      ```json TeamMember theme={null}
      {
      	"id": "ausr_xxxxxxxxxxxxx",
      	"status": "joined",
      	"role": "admin",
      	"authorized_role": null,
      	"is_agent": false,
      	"account_id": "biz_xxxxxxxxxxxxx",
      	"email": "jane@example.com",
      	"created_at": "2026-07-01T00:00:00.000Z",
      	"updated_at": "2026-07-01T00:00:00.000Z",
      	"user": {
      		"id": "user_xxxxxxxxxxxx",
      		"name": "Jane Doe",
      		"profile_picture": {
      			"url": "https://cdn.whop.com/user.png"
      		},
      		"username": "janedoe"
      	}
      }
      ```
    </div>
  </Column>
</Columns>
