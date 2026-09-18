> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Member

A Member is one buyer's relationship with an account — one record per customer regardless of how many memberships they hold. It carries relationship-level state: whether they have joined or left, their access level (`customer`, `admin`, or `no_access`), when they joined, and when they last opened the account's content.

Use the Members API to list an account's members with filtering by access level, status, join date, and name or username search, and to retrieve a single member. Member rows are created and maintained by the membership lifecycle; to grant or revoke access, work with memberships instead.

<Note>
  Replaces the Legacy [Members](/api-reference/members/member) resource.
  Existing Legacy integrations keep working; see [API
  versions](/developer/api/versioning) for the stability contract.
</Note>

## Endpoints

| Endpoint                                                         | Request                                                               |
| ---------------------------------------------------------------- | --------------------------------------------------------------------- |
| [List Members](/api-reference/beta/members/list-members)         | <Badge color="blue" size="sm" stroke>GET</Badge> `/members`           |
| [Retrieve Member](/api-reference/beta/members/retrieve-member)   | <Badge color="blue" size="sm" stroke>GET</Badge> `/members/{id}`      |
| [List Member Logs](/api-reference/beta/members/list-member-logs) | <Badge color="blue" size="sm" stroke>GET</Badge> `/members/{id}/logs` |

## Attributes

<Columns cols={2}>
  <Column>
    <ResponseField name="id" type="string" required>
      Member ID, prefixed `mber_`.
    </ResponseField>

    <ResponseField name="access_level" type="string" required>
      What the member can reach on the account: `customer` for paying members, `admin` for team members, `no_access` once every grant has lapsed.

      Available options: `no_access`, `admin`, `customer`
    </ResponseField>

    <ResponseField name="account_id" type="string" required>
      The account this member belongs to, prefixed `biz_`.
    </ResponseField>

    <ResponseField name="created_at" type="string" required>
      When the member record was created, as an ISO 8601 timestamp.
    </ResponseField>

    <ResponseField name="joined_at" type="string" required>
      When the member first joined the account, as an ISO 8601 timestamp.
    </ResponseField>

    <ResponseField name="last_accessed_at" type="string | null" required>
      When the member last opened the account's content, as an ISO 8601 timestamp.
      `null` if they never have.
    </ResponseField>

    <ResponseField name="status" type="string" required>
      `joined` while the member is part of the account, `left` after they leave.

      Available options: `joined`, `left`
    </ResponseField>

    <ResponseField name="user" type="object | null" required>
      The user behind this member. `null` when the buyer is another business rather than a person.

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
      ```json Member theme={null}
      {
      	"id": "mber_xxxxxxxxxxxxx",
      	"account_id": "biz_xxxxxxxxxxxxxx",
      	"access_level": "customer",
      	"status": "joined",
      	"joined_at": "2026-07-01T00:00:00.000Z",
      	"last_accessed_at": "2026-07-20T15:30:00.000Z",
      	"created_at": "2026-07-01T00:00:00.000Z",
      	"user": {
      		"id": "user_xxxxxxxxxxxxx",
      		"username": "janedoe",
      		"name": "Jane Doe",
      		"profile_picture": {
      			"url": "https://cdn.whop.com/user.png"
      		}
      	}
      }
      ```
    </div>
  </Column>
</Columns>
