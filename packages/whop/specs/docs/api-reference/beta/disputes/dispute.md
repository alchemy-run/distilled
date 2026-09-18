> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Disputes

A Dispute is a chargeback a customer files against a payment through their bank, or an inquiry that may become one. It carries the disputed payment, a deadline to respond, your evidence, and the outcome once the processor rules.

Use the Disputes API to list disputes, edit the evidence packet while a dispute is still contestable, and submit it for review.

## Endpoints

| Endpoint                                                                          | Request                                                                             |
| --------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| [List Disputes](/api-reference/beta/disputes/list-disputes)                       | <Badge color="blue" size="sm" stroke>GET</Badge> `/disputes`                        |
| [Retrieve Dispute](/api-reference/beta/disputes/retrieve-dispute)                 | <Badge color="blue" size="sm" stroke>GET</Badge> `/disputes/{id}`                   |
| [Update Dispute](/api-reference/beta/disputes/update-dispute)                     | <Badge color="orange" size="sm" stroke>PATCH</Badge> `/disputes/{id}`               |
| [Submit Dispute](/api-reference/beta/disputes/submit-dispute)                     | <Badge color="green" size="sm" stroke>POST</Badge> `/disputes/{id}/submit`          |
| [Upload Dispute Evidence](/api-reference/beta/disputes/upload-dispute-evidence)   | <Badge color="green" size="sm" stroke>POST</Badge> `/disputes/{id}/upload_evidence` |
| [Retrieve Dispute Summary](/api-reference/beta/disputes/retrieve-dispute-summary) | <Badge color="blue" size="sm" stroke>GET</Badge> `/disputes/summary`                |

## Attributes

<Columns cols={2}>
  <Column>
    <ResponseField name="id" type="string" required>
      Dispute ID, prefixed `dspt_`.
    </ResponseField>

    <ResponseField name="account_id" type="string | null" required>
      The account the dispute was filed against, prefixed `biz_`.
    </ResponseField>

    <ResponseField name="amount" type="number" required>
      The disputed amount, in whole units of `currency`.
    </ResponseField>

    <ResponseField name="buyer" type="object | null" required>
      The customer who filed the dispute.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="email" type="string | null" required>
          The customer's email address. Requires the `member:email:read` scope; `null`
          without it.
        </ResponseField>

        <ResponseField name="member_id" type="string | null" required>
          The customer's member row on the account, prefixed `mem_`.
        </ResponseField>

        <ResponseField name="name" type="string | null" required>
          The customer's display name.
        </ResponseField>

        <ResponseField name="user_id" type="string | null" required>
          The customer's user ID, prefixed `user_`. `null` for a guest checkout.
        </ResponseField>

        <ResponseField name="username" type="string | null" required>
          The customer's Whop username.
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="created_at" type="string" required>
      When the dispute was opened, as an ISO 8601 timestamp.
    </ResponseField>

    <ResponseField name="currency" type="string" required>
      Three-letter ISO currency code of the disputed amount.
    </ResponseField>

    <ResponseField name="evidence" type="object" required>
      The evidence packet sent to the processor to contest the dispute.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="access_activity_log" type="string | null" required>
          Log of the customer's access to the product, such as sign-in or download
          activity.
        </ResponseField>

        <ResponseField name="billing_address" type="string | null" required>
          The billing address the customer provided at checkout.
        </ResponseField>

        <ResponseField name="cancellation_policy_attachment" type="object | null" required>
          The cancellation policy document. Falls back to Whop's platform policy when the seller has not uploaded their own.

          <Accordion title="Properties" defaultOpen={true}>
            <ResponseField name="id" type="string | null" required>
              The attachment's ID. `null` for a Whop-hosted policy, which is not an uploaded
              file.
            </ResponseField>

            <ResponseField name="content_type" type="string | null" required>
              The uploaded file's MIME type.
            </ResponseField>

            <ResponseField name="filename" type="string | null" required>
              The uploaded file's name.
            </ResponseField>

            <ResponseField name="platform" type="boolean" required>
              Whether this is Whop's own hosted policy, standing in because the seller
              uploaded none. Sending it back on a PATCH changes nothing.
            </ResponseField>

            <ResponseField name="url" type="string | null" required>
              A URL to download the attachment.
            </ResponseField>
          </Accordion>
        </ResponseField>

        <ResponseField name="cancellation_policy_disclosure" type="string | null" required>
          How the cancellation policy was shown to the customer before purchase.
        </ResponseField>

        <ResponseField name="customer_communication_attachment" type="object | null" required>
          Correspondence with the customer, or proof they used the product.

          <Accordion title="Properties" defaultOpen={true}>
            <ResponseField name="id" type="string | null" required>
              The attachment's ID. `null` for a Whop-hosted policy, which is not an uploaded
              file.
            </ResponseField>

            <ResponseField name="content_type" type="string | null" required>
              The uploaded file's MIME type.
            </ResponseField>

            <ResponseField name="filename" type="string | null" required>
              The uploaded file's name.
            </ResponseField>

            <ResponseField name="platform" type="boolean" required>
              Whether this is Whop's own hosted policy, standing in because the seller
              uploaded none. Sending it back on a PATCH changes nothing.
            </ResponseField>

            <ResponseField name="url" type="string | null" required>
              A URL to download the attachment.
            </ResponseField>
          </Accordion>
        </ResponseField>

        <ResponseField name="customer_email_address" type="string | null" required>
          The email address the customer used at checkout.
        </ResponseField>

        <ResponseField name="customer_name" type="string | null" required>
          The customer's name as given at checkout.
        </ResponseField>

        <ResponseField name="documents" type="object[]" required>
          Additional evidence documents uploaded through `POST /disputes/\{id}/upload_evidence`, beyond the four fixed slots. Each rides into the submitted packet under its `document_type`.

          <Accordion title="Properties" defaultOpen={true}>
            <ResponseField name="id" type="string" required>
              The file's ID, prefixed `file_`.
            </ResponseField>

            <ResponseField name="content_type" type="string | null" required>
              The uploaded file's MIME type. Uploads are restricted to the types the processor accepts.

              Available options: `application/pdf`, `application/json`, `image/jpeg`, `image/png`, `image/webp`
            </ResponseField>

            <ResponseField name="created_at" type="string" required>
              When the file was created, as an ISO 8601 timestamp.
            </ResponseField>

            <ResponseField name="document_type" type="string" required>
              What kind of evidence the document is.

              Available options: `return_policy`, `shipping_policy`, `physical_fulfillment`, `customer_order_history`, `product_image`, `prior_transactions`, `customer_session`, `digital_fulfillment`, `subscription`
            </ResponseField>

            <ResponseField name="filename" type="string | null" required>
              The original filename, including its extension.
            </ResponseField>

            <ResponseField name="multipart_chunk_size" type="integer | null">
              The byte size each part (except the last) must be. Present only on create, and
              only for multipart uploads.
            </ResponseField>

            <ResponseField name="multipart_upload_id" type="string | null">
              The ID of the multipart upload, passed back to `complete`. Present only on
              create, and only for multipart uploads.
            </ResponseField>

            <ResponseField name="multipart_upload_urls" type="object[] | null">
              The presigned URL for each part. Present only on create, and only for multipart uploads.

              <Accordion title="Properties" defaultOpen={true}>
                <ResponseField name="part_number" type="integer" required>
                  The 1-based index of this part within the multipart upload.
                </ResponseField>

                <ResponseField name="url" type="string" required>
                  The presigned URL to PUT this part's bytes to.
                </ResponseField>
              </Accordion>
            </ResponseField>

            <ResponseField name="object" type="string" required>
              The type of this object, always `file`.
            </ResponseField>

            <ResponseField name="size" type="integer | null" required>
              The file size in bytes. `null` until the upload has finished.
            </ResponseField>

            <ResponseField name="upload_headers" type="object">
              Headers to send with the upload PUT. Present only on create.
            </ResponseField>

            <ResponseField name="upload_status" type="string" required>
              Where the file is in its upload lifecycle.

              Available options: `pending`, `processing`, `ready`, `failed`
            </ResponseField>

            <ResponseField name="upload_url" type="string | null">
              Presigned URL to PUT the file's bytes to. Present only on create, and only for
              single-part uploads.
            </ResponseField>

            <ResponseField name="url" type="string | null" required>
              A URL to download the file: a permanent CDN URL for public files, a signed
              expiring URL for private ones. `null` until the upload has finished.
            </ResponseField>

            <ResponseField name="visibility" type="string" required>
              `public` files are served via an unsigned CDN URL; `private` files via a signed, expiring URL.

              Available options: `public`, `private`
            </ResponseField>
          </Accordion>
        </ResponseField>

        <ResponseField name="notes" type="string | null" required>
          Any additional context for the processor reviewing the dispute.
        </ResponseField>

        <ResponseField name="product_description" type="string | null" required>
          What the customer purchased, in the seller's own words.
        </ResponseField>

        <ResponseField name="refund_policy_attachment" type="object | null" required>
          The refund policy document. Falls back to Whop's platform policy when the seller has not uploaded their own.

          <Accordion title="Properties" defaultOpen={true}>
            <ResponseField name="id" type="string | null" required>
              The attachment's ID. `null` for a Whop-hosted policy, which is not an uploaded
              file.
            </ResponseField>

            <ResponseField name="content_type" type="string | null" required>
              The uploaded file's MIME type.
            </ResponseField>

            <ResponseField name="filename" type="string | null" required>
              The uploaded file's name.
            </ResponseField>

            <ResponseField name="platform" type="boolean" required>
              Whether this is Whop's own hosted policy, standing in because the seller
              uploaded none. Sending it back on a PATCH changes nothing.
            </ResponseField>

            <ResponseField name="url" type="string | null" required>
              A URL to download the attachment.
            </ResponseField>
          </Accordion>
        </ResponseField>

        <ResponseField name="refund_policy_disclosure" type="string | null" required>
          How the refund policy was shown to the customer before purchase.
        </ResponseField>

        <ResponseField name="refund_refusal_explanation" type="string | null" required>
          Why a refund was refused, when one was requested and denied.
        </ResponseField>

        <ResponseField name="service_date" type="string | null" required>
          When the product or service was delivered.
        </ResponseField>

        <ResponseField name="uncategorized_attachment" type="object | null" required>
          Supporting evidence that does not fit the other categories.

          <Accordion title="Properties" defaultOpen={true}>
            <ResponseField name="id" type="string | null" required>
              The attachment's ID. `null` for a Whop-hosted policy, which is not an uploaded
              file.
            </ResponseField>

            <ResponseField name="content_type" type="string | null" required>
              The uploaded file's MIME type.
            </ResponseField>

            <ResponseField name="filename" type="string | null" required>
              The uploaded file's name.
            </ResponseField>

            <ResponseField name="platform" type="boolean" required>
              Whether this is Whop's own hosted policy, standing in because the seller
              uploaded none. Sending it back on a PATCH changes nothing.
            </ResponseField>

            <ResponseField name="url" type="string | null" required>
              A URL to download the attachment.
            </ResponseField>
          </Accordion>
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="evidence_due_at" type="string | null" required>
      The deadline to submit evidence, as an ISO 8601 timestamp. Whop reserves the
      last 24 hours before the processor's own cutoff to forward the submission.
    </ResponseField>

    <ResponseField name="evidence_editable" type="boolean" required>
      Whether `evidence` can still be changed and submitted.
    </ResponseField>

    <ResponseField name="evidence_locked_reason" type="string | null" required>
      Why evidence can no longer be edited. `null` while `evidence_editable` is true.

      Available options: `submitted`, `response_window_closed`, `not_contestable`
    </ResponseField>

    <ResponseField name="evidence_submitted_at" type="string | null" required>
      When the evidence was submitted to the processor, as an ISO 8601 timestamp.
    </ResponseField>

    <ResponseField name="generated_response_attachment" type="object | null" required>
      The AI-generated representment document filed with the processor on the seller's behalf, once ready. Null until generation completes, and for disputes not using Whop Dispute Fighter.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="id" type="string | null" required>
          The attachment's ID. `null` for a Whop-hosted policy, which is not an uploaded
          file.
        </ResponseField>

        <ResponseField name="content_type" type="string | null" required>
          The uploaded file's MIME type.
        </ResponseField>

        <ResponseField name="filename" type="string | null" required>
          The uploaded file's name.
        </ResponseField>

        <ResponseField name="platform" type="boolean" required>
          Whether this is Whop's own hosted policy, standing in because the seller
          uploaded none. Sending it back on a PATCH changes nothing.
        </ResponseField>

        <ResponseField name="url" type="string | null" required>
          A URL to download the attachment.
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="inquiry" type="boolean" required>
      Whether this is a pre-dispute inquiry rather than a formal chargeback.
      Inquiries follow the same lifecycle but move no funds unless one escalates.
    </ResponseField>

    <ResponseField name="issuer_comments" type="object[]" required>
      What the card issuer said when filing the dispute. Only populated when the issuer provides them, and listed in the order they were received.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="received_at" type="string | null" required>
          When the comment was received, as an ISO 8601 timestamp.
        </ResponseField>

        <ResponseField name="text" type="string" required>
          What the issuer wrote, as received.
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="payment" type="object | null" required>
      The payment being disputed.

      <Accordion title="Properties" defaultOpen={true}>
        <ResponseField name="id" type="string" required>
          Payment ID, prefixed `pay_`.
        </ResponseField>

        <ResponseField name="amount" type="number | null" required>
          What the customer was charged, in whole units of the payment's currency.
        </ResponseField>

        <ResponseField name="card_brand" type="string | null" required>
          Card brand, when the customer paid by card.
        </ResponseField>

        <ResponseField name="card_last4" type="string | null" required>
          Last four digits of the card, when the customer paid by card.
        </ResponseField>

        <ResponseField name="created_at" type="string" required>
          When the payment was made, as an ISO 8601 timestamp.
        </ResponseField>

        <ResponseField name="currency" type="string | null" required>
          Three-letter ISO currency code of the payment. Can differ from the dispute's
          currency when the processor settles in another currency.
        </ResponseField>

        <ResponseField name="payment_instrument" type="object | null" required>
          The instrument this payment was made with, shaped for display: the method type, a buyer-facing name, the standard icon set, and the card facts when it was a card. Null when the payment names no method.

          <Accordion title="Properties" defaultOpen={true}>
            <ResponseField name="card" type="object | null" required>
              Card payments only: the card's network and last four.

              <Accordion title="Properties" defaultOpen={true}>
                <ResponseField name="brand" type="string" required>
                  The network identifier (`visa`, `amex`, …), matching `card.networks` entries
                  and saved card payment methods.
                </ResponseField>

                <ResponseField name="last4" type="string | null" required>
                  The card's last four digits, when captured.
                </ResponseField>
              </Accordion>
            </ResponseField>

            <ResponseField name="display_name" type="string" required>
              Buyer-facing instrument name — "Visa •••• 4242" when the card surfaced, else
              the method's own name ("Klarna").
            </ResponseField>

            <ResponseField name="icons" type="object" required>
              The standard icon set: square and card shapes, each in light and dark colorways.

              <Accordion title="Properties" defaultOpen={true}>
                <ResponseField name="card" type="object" required>
                  The credit-card-proportioned tile (48x30).

                  <Accordion title="Properties" defaultOpen={true}>
                    <ResponseField name="dark" type="object" required>
                      The colorway for dark surfaces.

                      <Accordion title="Properties" defaultOpen={true}>
                        <ResponseField name="png_1x" type="string" required>
                          Raster fallback at the shape's native size.
                        </ResponseField>

                        <ResponseField name="png_2x" type="string" required>
                          Raster fallback at double density.
                        </ResponseField>

                        <ResponseField name="png_4x" type="string" required>
                          Raster fallback at quadruple density.
                        </ResponseField>

                        <ResponseField name="svg" type="string" required>
                          The vector file. Prefer this everywhere SVG renders.
                        </ResponseField>
                      </Accordion>
                    </ResponseField>

                    <ResponseField name="light" type="object" required>
                      The colorway for light surfaces.

                      <Accordion title="Properties" defaultOpen={true}>
                        <ResponseField name="png_1x" type="string" required>
                          Raster fallback at the shape's native size.
                        </ResponseField>

                        <ResponseField name="png_2x" type="string" required>
                          Raster fallback at double density.
                        </ResponseField>

                        <ResponseField name="png_4x" type="string" required>
                          Raster fallback at quadruple density.
                        </ResponseField>

                        <ResponseField name="svg" type="string" required>
                          The vector file. Prefer this everywhere SVG renders.
                        </ResponseField>
                      </Accordion>
                    </ResponseField>
                  </Accordion>
                </ResponseField>

                <ResponseField name="square" type="object" required>
                  The square tile (32x32).

                  <Accordion title="Properties" defaultOpen={true}>
                    <ResponseField name="dark" type="object" required>
                      The colorway for dark surfaces.

                      <Accordion title="Properties" defaultOpen={true}>
                        <ResponseField name="png_1x" type="string" required>
                          Raster fallback at the shape's native size.
                        </ResponseField>

                        <ResponseField name="png_2x" type="string" required>
                          Raster fallback at double density.
                        </ResponseField>

                        <ResponseField name="png_4x" type="string" required>
                          Raster fallback at quadruple density.
                        </ResponseField>

                        <ResponseField name="svg" type="string" required>
                          The vector file. Prefer this everywhere SVG renders.
                        </ResponseField>
                      </Accordion>
                    </ResponseField>

                    <ResponseField name="light" type="object" required>
                      The colorway for light surfaces.

                      <Accordion title="Properties" defaultOpen={true}>
                        <ResponseField name="png_1x" type="string" required>
                          Raster fallback at the shape's native size.
                        </ResponseField>

                        <ResponseField name="png_2x" type="string" required>
                          Raster fallback at double density.
                        </ResponseField>

                        <ResponseField name="png_4x" type="string" required>
                          Raster fallback at quadruple density.
                        </ResponseField>

                        <ResponseField name="svg" type="string" required>
                          The vector file. Prefer this everywhere SVG renders.
                        </ResponseField>
                      </Accordion>
                    </ResponseField>
                  </Accordion>
                </ResponseField>
              </Accordion>
            </ResponseField>

            <ResponseField name="installment_count" type="number | null" required>
              Installment methods only: how many payments the charge splits into. Data, not
              copy — compose and translate the label client-side.
            </ResponseField>

            <ResponseField name="payment_method_type" type="string" required>
              The payment method type identifier, e.g. `card`, `klarna`, `apple_pay`.
            </ResponseField>
          </Accordion>
        </ResponseField>

        <ResponseField name="payment_method_type" type="string | null" required>
          How the customer paid, such as `card` or `paypal`.
        </ResponseField>

        <ResponseField name="payment_processor" type="string | null" required>
          The processor that handled the payment, such as `stripe`.
        </ResponseField>
      </Accordion>
    </ResponseField>

    <ResponseField name="plan_id" type="string | null" required>
      The plan the disputed payment was made on, prefixed `plan_`.
    </ResponseField>

    <ResponseField name="product_id" type="string | null" required>
      The product the disputed payment was for, prefixed `prod_`.
    </ResponseField>

    <ResponseField name="rapid_dispute_resolution" type="boolean" required>
      Whether Visa Rapid Dispute Resolution settled this automatically. These refund
      the customer without an evidence round.
    </ResponseField>

    <ResponseField name="reason" type="string" required>
      Why the customer says they are disputing, normalized across card networks. `other` covers a code Whop has not categorized yet — read `reason_code` for the raw value.

      Available options: `fraudulent`, `unrecognized`, `declined_authorization`, `product_not_received`, `product_unacceptable`, `subscription_canceled`, `credit_not_processed`, `duplicate`, `processing_error`, `documentation_request`, `bank_cannot_process`, `other`
    </ResponseField>

    <ResponseField name="reason_code" type="string | null" required>
      The raw card-network or processor reason code, such as `10.4`.
    </ResponseField>

    <ResponseField name="status" type="string" required>
      Where the dispute stands. `needs_response` is awaiting evidence, `under_review` is with the processor, `won` returned the funds to the seller, `lost` returned them to the customer, and `closed` ended without a ruling. A dispute past its `evidence_due_at` reports `under_review` — the window to respond has closed.

      Available options: `needs_response`, `under_review`, `won`, `lost`, `closed`
    </ResponseField>

    <ResponseField name="updated_at" type="string" required>
      When the dispute was last changed, as an ISO 8601 timestamp.
    </ResponseField>
  </Column>

  <Column>
    <div className="api-resource-sticky-example">
      ```json Dispute theme={null}
      {
      	"id": "dspt_xxxxxxxxxxxxx",
      	"account_id": "biz_xxxxxxxxxxxxxx",
      	"amount": 49.99,
      	"buyer": {
      		"email": "alex@example.com",
      		"member_id": "mem_xxxxxxxxxxxxx",
      		"name": "Alex Rivera",
      		"user_id": "user_xxxxxxxxxxxxx",
      		"username": "alex"
      	},
      	"created_at": "2026-06-01T12:00:00Z",
      	"currency": "usd",
      	"evidence": {
      		"access_activity_log": "2026-05-02 14:11 UTC signed in and opened the course; 2026-05-04 09:32 UTC downloaded lesson materials",
      		"billing_address": "123 Main St, Austin, TX 78701, US",
      		"cancellation_policy_attachment": null,
      		"cancellation_policy_disclosure": "Shown on the checkout page beneath the pay button.",
      		"customer_communication_attachment": {
      			"id": "att_xxxxxxxxxxxxx",
      			"content_type": "application/pdf",
      			"filename": "support-thread.pdf",
      			"platform": false,
      			"url": "https://assets.whop.com/uploads/att_xxxxxxxxxxxxx/support-thread.pdf"
      		},
      		"customer_email_address": "alex@example.com",
      		"customer_name": "Alex Rivera",
      		"notes": "Customer accessed the product for four weeks before disputing.",
      		"product_description": "Monthly membership to the Pickaxe trading community, including the full course library.",
      		"refund_policy_attachment": {
      			"id": null,
      			"content_type": "application/pdf",
      			"filename": "refund-policy.pdf",
      			"platform": true,
      			"url": "https://whop.com/policies/refund-policy.pdf"
      		},
      		"refund_policy_disclosure": "Linked in the order confirmation email and on the checkout page.",
      		"refund_refusal_explanation": "Refund was refused because the membership had been used past the 7-day refund window.",
      		"service_date": "2026-05-01",
      		"uncategorized_attachment": null,
      		"documents": [
      			{
      				"id": "file_xxxxxxxxxxxxxx",
      				"object": "file",
      				"document_type": "product_image",
      				"filename": "before-and-after-coating.png",
      				"content_type": "image/png",
      				"size": 48213,
      				"url": "https://cdn.whop.com/attachments/before-and-after-coating.png",
      				"upload_status": "ready",
      				"visibility": "private",
      				"created_at": "2026-06-01T12:00:00Z"
      			}
      		]
      	},
      	"evidence_due_at": "2026-06-15T00:00:00Z",
      	"evidence_editable": true,
      	"evidence_locked_reason": null,
      	"evidence_submitted_at": null,
      	"generated_response_attachment": null,
      	"inquiry": false,
      	"issuer_comments": [
      		{
      			"received_at": "2026-06-01T12:00:00Z",
      			"text": "Cardholder states they did not authorize this transaction."
      		}
      	],
      	"payment": {
      		"id": "pay_xxxxxxxxxxxxx",
      		"amount": 49.99,
      		"card_brand": "visa",
      		"card_last4": "4242",
      		"created_at": "2026-05-01T09:30:00Z",
      		"currency": "usd",
      		"payment_method_type": "card",
      		"payment_processor": "stripe",
      		"payment_instrument": {
      			"payment_method_type": "card",
      			"display_name": "Visa •••• 4242",
      			"icons": {
      				"square": {
      					"light": {
      						"svg": "https://content.whop.com/payment_methods/visa/square_light.svg",
      						"png_1x": "https://content.whop.com/payment_methods/visa/square_light_32.png",
      						"png_2x": "https://content.whop.com/payment_methods/visa/square_light_64.png",
      						"png_4x": "https://content.whop.com/payment_methods/visa/square_light_128.png"
      					},
      					"dark": {
      						"svg": "https://content.whop.com/payment_methods/visa/square_dark.svg",
      						"png_1x": "https://content.whop.com/payment_methods/visa/square_dark_32.png",
      						"png_2x": "https://content.whop.com/payment_methods/visa/square_dark_64.png",
      						"png_4x": "https://content.whop.com/payment_methods/visa/square_dark_128.png"
      					}
      				},
      				"card": {
      					"light": {
      						"svg": "https://content.whop.com/payment_methods/visa/card_light.svg",
      						"png_1x": "https://content.whop.com/payment_methods/visa/card_light_30.png",
      						"png_2x": "https://content.whop.com/payment_methods/visa/card_light_60.png",
      						"png_4x": "https://content.whop.com/payment_methods/visa/card_light_120.png"
      					},
      					"dark": {
      						"svg": "https://content.whop.com/payment_methods/visa/card_dark.svg",
      						"png_1x": "https://content.whop.com/payment_methods/visa/card_dark_30.png",
      						"png_2x": "https://content.whop.com/payment_methods/visa/card_dark_60.png",
      						"png_4x": "https://content.whop.com/payment_methods/visa/card_dark_120.png"
      					}
      				}
      			},
      			"card": {
      				"brand": "visa",
      				"last4": "4242"
      			},
      			"installment_count": null
      		}
      	},
      	"plan_id": "plan_xxxxxxxxxxxxx",
      	"product_id": "prod_xxxxxxxxxxxxx",
      	"rapid_dispute_resolution": false,
      	"reason": "fraudulent",
      	"reason_code": "10.4",
      	"status": "needs_response",
      	"updated_at": "2026-06-01T12:00:00Z"
      }
      ```
    </div>
  </Column>
</Columns>
