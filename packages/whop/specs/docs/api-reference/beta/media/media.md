> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Media

A Media Asset is an AI-generated image or video created from a prompt and billed from an account balance. When generation finishes, the asset includes a file that can be attached anywhere Whop accepts files.

Use the Media API to start a generation job and retrieve the asset while it processes or after it is ready.

## Endpoints

| Endpoint                                                               | Request                                                              |
| ---------------------------------------------------------------------- | -------------------------------------------------------------------- |
| [Retrieve Media Asset](/api-reference/beta/media/retrieve-media-asset) | <Badge color="blue" size="sm" stroke>GET</Badge> `/media/{id}`       |
| [Generate Media Asset](/api-reference/beta/media/generate-media-asset) | <Badge color="green" size="sm" stroke>POST</Badge> `/media/generate` |

## Attributes

<Columns cols={2}>
  <Column>
    <ResponseField name="id" type="string" required>
      Media asset ID, prefixed `media_`.
    </ResponseField>

    <ResponseField name="amount_charged" type="number | null" required>
      USD amount charged to the account's balance for this generation. `null` if the
      generation wasn't billed.
    </ResponseField>

    <ResponseField name="completed_at" type="string | null" required>
      ISO 8601 timestamp when the asset reached a terminal state. `null` while
      `processing`.
    </ResponseField>

    <ResponseField name="created_at" type="string" required>
      ISO 8601 timestamp when the generation was requested.
    </ResponseField>

    <ResponseField name="currency" type="string" required>
      Currency of `amount_charged`. Always `usd`.
    </ResponseField>

    <ResponseField name="error_message" type="string | null" required>
      Why generation failed. `null` unless status is `failed`.
    </ResponseField>

    <ResponseField name="file" type="object | null" required>
      The produced file, usable anywhere attachments are accepted. `null` until the asset is `ready`.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="id" type="string" required>
          File ID, prefixed `file_`.
        </ResponseField>

        <ResponseField name="url" type="string" required>
          CDN URL for downloading the file.
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="generation" type="object" required>
      The inputs the asset was generated from.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="duration_seconds" type="number | null" required>
          Requested video length in seconds. `null` for images.
        </ResponseField>

        <ResponseField name="prompt" type="string" required>
          What the asset was generated from.
        </ResponseField>

        <ResponseField name="reference_media" type="string[]" required>
          Reference image file IDs (`file_` prefixed) supplied at generation time.
        </ResponseField>

        <ResponseField name="resolution" type="string | null" required>
          Requested video resolution. `null` for images. `1080p` is not supported by Seedance 2.0 Fast or Mini; `4k` is only supported by Seedance 2.0.

          Available options: `480p`, `720p`, `1080p`, `4k`
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="media_type" type="string" required>
      The kind of media this asset holds.

      Available options: `video`, `image`
    </ResponseField>

    <ResponseField name="source" type="string" required>
      How the asset was created. Always `generated`.

      Available options: `generated`
    </ResponseField>

    <ResponseField name="status" type="string" required>
      Lifecycle state: `processing` while generation runs, `ready` when the file is available, `failed` when generation failed and the charge was refunded.

      Available options: `processing`, `ready`, `failed`
    </ResponseField>
  </Column>

  <Column>
    <div className="api-resource-sticky-example">
      ```json MediaAsset theme={null}
      {
      	"id": "media_xxxxxxxxxxx",
      	"amount_charged": 0.25,
      	"completed_at": "2026-06-01T12:01:30Z",
      	"created_at": "2026-06-01T12:00:00Z",
      	"currency": "usd",
      	"error_message": null,
      	"file": {
      		"id": "file_xxxxxxxxxxxx",
      		"url": "https://img.whop.com/file_xxxxxxxxxxxx.png"
      	},
      	"generation": {
      		"duration_seconds": null,
      		"prompt": "A clean product mockup on a white background",
      		"reference_media": [],
      		"resolution": null
      	},
      	"media_type": "image",
      	"source": "generated",
      	"status": "ready"
      }
      ```
    </div>
  </Column>
</Columns>
