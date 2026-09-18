> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Audience

An Audience represents a customer list uploaded to Whop for ad targeting. Audiences belong to an account and sync to supported ad platforms as custom audiences.

Use the Audiences API to create audiences from CSV uploads, monitor processing status, and list or delete audiences for an account. Created audiences are usable for targeting after processing reaches `ready` or `partial`.

## Endpoints

| Endpoint                                                         | Request                                                                         |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| [List Audiences](/api-reference/beta/audiences/list-audiences)   | <Badge color="blue" size="sm" stroke>GET</Badge> `/audiences`                   |
| [Create Audience](/api-reference/beta/audiences/create-audience) | <Badge color="green" size="sm" stroke>POST</Badge> `/audiences`                 |
| [Update Audience](/api-reference/beta/audiences/update-audience) | <Badge color="orange" size="sm" stroke>PATCH</Badge> `/audiences/{id}`          |
| [Delete Audience](/api-reference/beta/audiences/delete-audience) | <Badge color="red" size="sm" stroke>DELETE</Badge> `/audiences/{id}`            |
| [Add People](/api-reference/beta/audiences/add-people)           | <Badge color="green" size="sm" stroke>POST</Badge> `/audiences/{id}/add_people` |

## Attributes

<Columns cols={2}>
  <Column>
    <ResponseField name="id" type="string" required>
      Audience ID, prefixed `adaud_`.
    </ResponseField>

    <ResponseField name="audience_type" type="string" required>
      `custom` = a customer list (uploaded, or built from saved People filters); `lookalike` = Meta lookalike built from a custom audience.

      Available options: `custom`, `lookalike`
    </ResponseField>

    <ResponseField name="auto_refresh" type="boolean" required>
      Whether membership keeps updating. `true` rebuilds it from the saved filters
      twice a day, so people join and leave as they start and stop matching. `false`
      keeps whoever matched when it was built and never rebuilds. Always `false` for
      uploaded lists and lookalikes.
    </ResponseField>

    <ResponseField name="created_at" type="string" required>
      When the audience was created, as an ISO 8601 timestamp.
    </ResponseField>

    <ResponseField name="error_message" type="string | null" required>
      Processing error message. `null` unless processing is partial or failed.
    </ResponseField>

    <ResponseField name="filters" type="object | null" required>
      For audiences built from People filters: the filters that define membership, keyed exactly as `GET /people` accepts them — for example `\{"os": "iOS", "country": "US"}`. `null` for uploaded lists and lookalikes.
    </ResponseField>

    <ResponseField name="last_refreshed_at" type="string | null" required>
      When the audience membership was last rebuilt, as an ISO 8601 timestamp.
      `null` until the first build completes.
    </ResponseField>

    <ResponseField name="lookalike_ratio" type="number | null" required>
      For lookalikes: the upper bound of the similarity band as a fraction (0.02 =
      top 2%). `null` for custom audiences.
    </ResponseField>

    <ResponseField name="lookalike_starting_ratio" type="number | null" required>
      For lookalikes: the lower bound of the similarity band as a fraction. `null`
      for custom audiences and first-tier lookalikes.
    </ResponseField>

    <ResponseField name="match_rates" type="object[]" required>
      Estimated match rates by ad platform. Empty when the audience was not sent to a supported platform.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="lower_bound" type="number | null" required>
          Lower bound of the estimated match rate percentage. `null` until available.
        </ResponseField>

        <ResponseField name="platform" type="string" required>
          The ad platform that provided the match-rate estimate.

          Available options: `meta`
        </ResponseField>

        <ResponseField name="status" type="string | null" required>
          Availability of the estimated match rate.

          Available options: `calculating`, `available`, `unavailable`
        </ResponseField>

        <ResponseField name="upper_bound" type="number | null" required>
          Upper bound of the estimated match rate percentage. `null` until available.
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="matched_rows" type="number" required>
      Members successfully uploaded to connected ad accounts. Always 0 for
      lookalikes.
    </ResponseField>

    <ResponseField name="name" type="string" required>
      Audience display name.
    </ResponseField>

    <ResponseField name="platform_audience_ids" type="string[]" required>
      External audience IDs created on connected ad platforms, such as Meta.
    </ResponseField>

    <ResponseField name="processed_rows" type="number" required>
      Members processed from the source so far. Always 0 for lookalikes.
    </ResponseField>

    <ResponseField name="progress_percent" type="number" required>
      Processing progress from 0 to 100.
    </ResponseField>

    <ResponseField name="source_audience_id" type="string | null" required>
      For lookalikes: the audience this lookalike was built from. `null` for custom
      audiences.
    </ResponseField>

    <ResponseField name="source_type" type="string" required>
      Where members come from. `csv_upload` = an uploaded customer list; `people_filter` = built from saved People filters. See `auto_refresh` for whether a `people_filter` audience keeps updating.

      Available options: `csv_upload`, `people_filter`
    </ResponseField>

    <ResponseField name="status" type="string" required>
      Current state of the audience import. `syncing` means Whop is sending matched rows to connected ad accounts. When status is `partial` or `failed`, `error_message` explains what went wrong.

      Available options: `pending`, `processing`, `syncing`, `ready`, `partial`, `failed`
    </ResponseField>

    <ResponseField name="total_rows" type="number" required>
      Total members detected in the source — CSV rows for uploaded lists, matching
      people for automatic audiences. Always 0 for lookalikes.
    </ResponseField>

    <ResponseField name="updated_at" type="string" required>
      When the audience was last updated, as an ISO 8601 timestamp.
    </ResponseField>
  </Column>

  <Column>
    <div className="api-resource-sticky-example">
      ```json Audience theme={null}
      {
      	"id": "adaud_PastPurchasers123",
      	"name": "Past purchasers",
      	"status": "ready",
      	"audience_type": "custom",
      	"source_type": "people_filter",
      	"source_audience_id": null,
      	"lookalike_ratio": null,
      	"lookalike_starting_ratio": null,
      	"total_rows": 2500,
      	"processed_rows": 2500,
      	"matched_rows": 1830,
      	"progress_percent": 100,
      	"error_message": null,
      	"platform_audience_ids": ["120246230799130686"],
      	"filters": {
      		"has_purchased": true,
      		"country": "US"
      	},
      	"auto_refresh": true,
      	"last_refreshed_at": "2025-12-01T01:00:00Z",
      	"match_rates": [
      		{
      			"platform": "meta",
      			"status": "available",
      			"lower_bound": 68.2,
      			"upper_bound": 74.5
      		}
      	],
      	"created_at": "2025-12-01T00:00:00Z",
      	"updated_at": "2025-12-01T01:00:00Z"
      }
      ```
    </div>
  </Column>
</Columns>
