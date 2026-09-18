> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Verification

A Verification represents a legal identity for a person or business. Accounts and users complete verification when Whop needs to confirm who they are before enabling payouts or compliance-sensitive workflows.

Use the Verifications API to start or resume a hosted verification session, check review status, and submit requested details or documents. If `requested_information` contains items, submit answers with [Update Verification](/api-reference/beta/verifications/update-verification).

<Note>
  Replaces the Legacy [Verifications](/api-reference/verifications/verification)
  resource. Existing Legacy integrations keep working; see [API
  versions](/developer/api/versioning) for the stability contract.
</Note>

## Endpoints

| Endpoint                                                                         | Request                                                                    |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| [List Verifications](/api-reference/beta/verifications/list-verifications)       | <Badge color="blue" size="sm" stroke>GET</Badge> `/verifications`          |
| [Create Verification](/api-reference/beta/verifications/create-verification)     | <Badge color="green" size="sm" stroke>POST</Badge> `/verifications`        |
| [Retrieve Verification](/api-reference/beta/verifications/retrieve-verification) | <Badge color="blue" size="sm" stroke>GET</Badge> `/verifications/{id}`     |
| [Update Verification](/api-reference/beta/verifications/update-verification)     | <Badge color="orange" size="sm" stroke>PATCH</Badge> `/verifications/{id}` |

## Attributes

<Columns cols={2}>
  <Column>
    <ResponseField name="id" type="string">
      Verification profile ID, prefixed `idpf_`.
    </ResponseField>

    <ResponseField name="address" type="object | null">
      Address on the verification profile. `null` when no address is set.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="city" type="string | null" />

        <ResponseField name="country" type="string | null">
          Two-letter ISO 3166-1 country code, for example `US`, `DE`, or `GB`.
        </ResponseField>

        <ResponseField name="line1" type="string">
          First line of the street address.
        </ResponseField>

        <ResponseField name="line2" type="string | null">
          Second line of the street address.
        </ResponseField>

        <ResponseField name="postal_code" type="string | null">
          Postal or ZIP code.
        </ResponseField>

        <ResponseField name="state" type="string | null">
          State, province, or region code, for example `CA`.
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="business_name" type="string | null">
      Legal business name.
    </ResponseField>

    <ResponseField name="business_structure" type="string | null">
      Legal entity structure of the business, such as `private_corporation` or
      `sole_proprietorship`. Supported values vary by country of incorporation — see
      [Business structures](/developer/verification/business-structures).
    </ResponseField>

    <ResponseField name="country" type="string | null">
      Two-letter ISO 3166-1 country code, for example `US`, `DE`, or `GB`.
    </ResponseField>

    <ResponseField name="created_at" type="string">
      When the verification profile was created, as an ISO 8601 timestamp.
    </ResponseField>

    <ResponseField name="date_of_birth" type="string | null">
      Formatted as `YYYY-MM-DD`.
    </ResponseField>

    <ResponseField name="email" type="string | null">
      Email address on the verification profile.
    </ResponseField>

    <ResponseField name="first_name" type="string | null" />

    <ResponseField name="kind" type="string">
      Available options: `individual`, `business`
    </ResponseField>

    <ResponseField name="last_name" type="string | null" />

    <ResponseField name="phone" type="string | null">
      Phone number on the verification profile.
    </ResponseField>

    <ResponseField name="requested_information" type="object[]">
      What Whop still needs before review can continue — one requirement per entry. Answer with Update Verification; nothing from the response is echoed back. Keys that don't apply are omitted.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="id" type="string" required>
          Requested information item ID, prefixed `inrqi_`.
        </ResponseField>

        <ResponseField name="errors" type="object[]">
          Present after a rejected submission.

          <Accordion title="Properties" defaultOpen={true}>
            <ResponseField name="code" type="string">
              Stable error code.
            </ResponseField>

            <ResponseField name="reason" type="string">
              Why it was rejected.
            </ResponseField>
          </Accordion>
        </ResponseField>

        <ResponseField name="label" type="string" required>
          Instruction to show the user. Carries the reviewer's note verbatim when there
          is one.
        </ResponseField>

        <ResponseField name="optional" type="boolean">
          `true` when the item can be skipped.
        </ResponseField>

        <ResponseField name="options" type="string[]">
          The values `value` may take on a `select` item. On an `id_document` item these
          are the ID types accepted, and the chosen one decides which `documents` slots
          to send. Absent when the item has no choice to make.
        </ResponseField>

        <ResponseField name="requirement" type="string" required>
          What is needed: a document name such as `bank_statement`, or a field key such
          as `ssn` or `identity_document`. Handle unrecognized values by `type`.
        </ResponseField>

        <ResponseField name="type" type="string" required>
          What to send as the answer, so you never have to infer it: `files` (a document, as a list of its pages), `id_document` (send `documents` with the slot keys for the ID you are uploading), `text`, `date`, `phone` or `select` (send `value`), or `address` (send `address`).
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="required_documents" type="object[]">
      Documents for a document-upload verification and their progress. Present only on verifications created by sending `documents`. `pending_upload` documents were not accepted yet — send the full set again with another Create Verification call.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="document" type="string">
          Document slot key, such as `id_card_front`, `id_card_back`, or `selfie`.
        </ResponseField>

        <ResponseField name="rejection_reason" type="string | null">
          Why the previous submission was rejected, when the provider requested new
          documents or declined the verification.
        </ResponseField>

        <ResponseField name="status" type="string">
          `pending_upload` until the document has been relayed for review; `submitted` afterwards.

          Available options: `pending_upload`, `submitted`
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="session_url" type="string | null">
      Hosted verification session URL for the user to complete identity checks.
      Expires 7 days after creation.
    </ResponseField>

    <ResponseField name="status" type="string">
      Current verification state. `not_started` before any session exists; `pending` while a session needs the user's input; `processing` while the provider's automated checks run on a fresh submission; `action_required` when `requested_information` needs answers; `manual_review` while information already sent is under review — an audit answer, or a document the payout provider holds — nothing to submit, usually done within 3 business days; `approved` on success; `rejected` on failure. Call Create Verification again to start a new session.

      Available options: `not_started`, `pending`, `processing`, `manual_review`, `approved`, `rejected`, `action_required`
    </ResponseField>

    <ResponseField name="updated_at" type="string">
      When the verification profile was last updated, as an ISO 8601 timestamp.
    </ResponseField>
  </Column>

  <Column>
    <div className="api-resource-sticky-example">
      ```json Verification theme={null}
      {
      	"id": "idpf_xxxxxxxxxxxx",
      	"address": {
      		"city": "New York",
      		"country": "US",
      		"line1": "123 Spring Street",
      		"line2": "Apt 4B",
      		"postal_code": "10012",
      		"state": "NY"
      	},
      	"business_name": null,
      	"business_structure": null,
      	"country": "US",
      	"created_at": "2026-06-01T12:00:00Z",
      	"date_of_birth": "1990-01-01",
      	"email": "alex@example.com",
      	"first_name": "Alex",
      	"kind": "individual",
      	"last_name": "Rivera",
      	"phone": "+15551234567",
      	"requested_information": [
      		{
      			"id": "inrqi_xxxxxxxxxxx",
      			"label": "Identity document",
      			"options": ["PASSPORT", "ID_CARD", "DRIVERS", "RESIDENCE_PERMIT"],
      			"requirement": "identity_document",
      			"type": "id_document"
      		},
      		{
      			"id": "inrqi_yyyyyyyyyyy",
      			"label": "Bank Statement or a check for account ending in 4242",
      			"requirement": "bank_statement",
      			"type": "files"
      		}
      	],
      	"required_documents": [
      		{
      			"document": "id_card_front",
      			"rejection_reason": null,
      			"status": "submitted"
      		},
      		{
      			"document": "id_card_back",
      			"rejection_reason": null,
      			"status": "submitted"
      		},
      		{
      			"document": "selfie",
      			"rejection_reason": null,
      			"status": "submitted"
      		}
      	],
      	"session_url": "https://verify.whop.com/session/idpf_xxxxxxxxxxxx",
      	"status": "action_required",
      	"updated_at": "2026-06-02T12:00:00Z"
      }
      ```
    </div>
  </Column>
</Columns>
