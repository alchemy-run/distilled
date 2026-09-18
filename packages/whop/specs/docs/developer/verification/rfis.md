> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Handle RFIs

> Respond when Whop needs more information — a document, tax ID, or business detail.

Whop raises a **Request for Information (RFI)** when it needs something extra from a user — a document, tax ID, or business detail. Each open RFI appears in the verification's `requested_information` array. The verification's `status` remains `action_required` until the user answers every item.

Every item represents one thing to collect, which you answer with one write. A `requirement` names what's needed, an input `type` tells you how to collect it, and a `label` provides user-facing text. The response omits keys that don't apply to an item. See [every requirement](#every-requirement) for the full catalog.

## How RFIs work

<Steps>
  <Step title="Information is requested">
    Whop flags that something is needed. The verification status changes to `action_required` and an `identity_profile.updated` webhook fires. (`identity_profile.needs_action` fires for this transition too, but `identity_profile.updated` is the catch-all that covers every state change — subscribe to it and re-fetch the verification to see what's outstanding.)
  </Step>

  <Step title="You read the items">
    Call `GET /api/v1/verifications?account_id={biz_ tag}`. The `requested_information` array on each verification lists what's needed and what type of answer to collect.
  </Step>

  <Step title="You collect and submit">
    Get the info from your user and send it back via `PATCH /api/v1/verifications/{id}` with a `requested_information` array. Whop routes each answer to the right place.
  </Step>

  <Step title="Review continues">
    Answered items leave the array. Once it's empty the verification moves to `processing` while the answers are reviewed — there is nothing to submit in that state. It settles on `approved`, or on `manual_review` if a compliance review opens. If an answer is rejected the item returns to `action_required` with `errors` explaining why. Resubmit it.
  </Step>
</Steps>

## Reading RFIs

```bash cURL theme={null}
curl "https://api.whop.com/api/v1/verifications?account_id=biz_xxxxxxxxxxxxx" \
  -H "Authorization: Bearer $WHOP_API_KEY"
```

When RFIs are outstanding, the verification looks like:

```json theme={null}
{
  "id": "idpf_xxxxxxxxxxxxx",
  "kind": "individual",
  "status": "action_required",
  "requested_information": [
    {
      "id": "inrqi_xxxxxxxxxxxxx",
      "requirement": "date_of_birth",
      "type": "date",
      "label": "Date of Birth"
    },
    {
      "id": "inrqi_yyyyyyyyyyyyy",
      "requirement": "business_structure",
      "type": "select",
      "label": "Business Structure",
      "options": ["single_member_llc", "multi_member_llc", "sole_proprietorship", "private_corporation"]
    },
    {
      "id": "inrqi_zzzzzzzzzzzzz",
      "requirement": "bank_statement",
      "type": "files",
      "label": "Bank Statement for account ending in 4242"
    }
  ]
}
```

### Item fields

| Field         | Description                                                                                      |
| ------------- | ------------------------------------------------------------------------------------------------ |
| `id`          | The item identifier, prefixed `inrqi_` — include it when submitting an answer                    |
| `requirement` | What Whop needs, such as `ssn` or `bank_statement` — see [every requirement](#every-requirement) |
| `type`        | What to send back: `files`, `id_document`, `text`, `date`, `phone`, `select`, or `address`       |
| `label`       | What to show your user. Carries the reviewer's own note when there is one                        |
| `options`     | Allowed values for a `select` item, or the accepted ID types on an `id_document` item            |
| `optional`    | Appears as `true` when the user can skip the item                                                |
| `errors`      | Present after a rejected answer, each with a stable `code` and a human-readable `reason`         |

The response returns only the keys that apply to an item, so an item never carries an empty array or a `null` you have to check for.

The response returns only open items — answered items leave the array, so the user still owes anything present. The verification stays `action_required` until the array is empty.

## Answering RFIs

Send a `PATCH` to the verification's `idpf_` tag with a `requested_information` array. Each entry needs the item `id` and exactly one answer payload matching the item's `type`:

| Item `type`                       | Answer payload                                           |
| --------------------------------- | -------------------------------------------------------- |
| `files`                           | `files` — one document, as a list of its pages           |
| `id_document`                     | `documents` — the slot keys for the ID you are uploading |
| `text`, `date`, `phone`, `select` | `value`                                                  |
| `address`                         | `address` object                                         |

The response echoes nothing else from the item — no categories or document types. The item `id` tells Whop where the answer belongs.

You can answer several items in one request:

```bash cURL theme={null}
curl -X PATCH https://api.whop.com/api/v1/verifications/idpf_xxxxxxxxxxxxx \
  -H "Authorization: Bearer $WHOP_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "requested_information": [
      { "id": "inrqi_xxxxxxxxxxxxx", "value": "1990-01-15" },
      { "id": "inrqi_yyyyyyyyyyyyy", "value": "single_member_llc" }
    ]
  }'
```

### Text, date, phone, and select values

Pass the answer as `value`. Dates use `YYYY-MM-DD`, phone numbers use E.164 format (`+12125550123`), and select values must be one of the item's `options`.

### Addresses

Pass an `address` object:

```bash cURL theme={null}
curl -X PATCH https://api.whop.com/api/v1/verifications/idpf_xxxxxxxxxxxxx \
  -H "Authorization: Bearer $WHOP_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "requested_information": [
      {
        "id": "inrqi_xxxxxxxxxxxxx",
        "address": {
          "line1": "123 Spring Street",
          "city": "New York",
          "state": "NY",
          "postal_code": "10012",
          "country": "US"
        }
      }
    ]
  }'
```

PO boxes aren't accepted for personal or business addresses.

### Documents

[Upload the file first](/developer/guides/upload-files), then pass its ID in `files`:

```bash cURL theme={null}
curl -X PATCH https://api.whop.com/api/v1/verifications/idpf_xxxxxxxxxxxxx \
  -H "Authorization: Bearer $WHOP_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "requested_information": [
      { "id": "inrqi_zzzzzzzzzzzzz", "files": ["file_xxxxxxxxxxxxx"] }
    ]
  }'
```

Each entry takes either a `file_` ID from the [upload flow](/developer/guides/upload-files) or a `direct_upload_id` from a direct upload. Documents must be Joint Photographic Experts Group (JPEG), Portable Network Graphics (PNG), or PDF files up to 32 MB. A one-page document is a list of one — there is no separate single-file field.

The `requirement` names the document Whop needs, and Whop handles the rest — you never state what kind of document you uploaded.

#### Documents with several pages

A document with several pages goes in the same `files` list, in page order:

```json theme={null}
{ "id": "inrqi_aaa", "requirement": "business_verification_document", "type": "files",
  "label": "Company Verification Document" }
```

```json theme={null}
{ "id": "inrqi_aaa", "files": ["file_page1xxxxxx", "file_page2xxxxxx"] }
```

#### Identity documents

An `id_document` item asks which ID it is. It carries `options` listing the ID types the review accepts, and the answer names each slot with the same keys [Create Verification](/api-reference/beta/verifications/create-verification) takes:

```json theme={null}
{
  "id": "inrqi_bbb",
  "requirement": "identity_document",
  "type": "id_document",
  "label": "Identity Document",
  "options": ["ID_CARD", "DRIVERS", "RESIDENCE_PERMIT", "PASSPORT"]
}
```

```bash cURL theme={null}
curl -X PATCH https://api.whop.com/api/v1/verifications/idpf_xxxxxxxxxxxxx \
  -H "Authorization: Bearer $WHOP_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "requested_information": [
      {
        "id": "inrqi_bbb",
        "documents": {
          "drivers_front": "file_frontxxxxxxx",
          "drivers_back": "file_backxxxxxxxx"
        }
      }
    ]
  }'
```

The key names the document and the side at once, so there is no separate field for which ID the document represents — Whop derives it from the keys. Send every slot for the one you're uploading:

| ID type            | Slots                                             |
| ------------------ | ------------------------------------------------- |
| `PASSPORT`         | `passport_front`                                  |
| `ID_CARD`          | `id_card_front`, `id_card_back`                   |
| `DRIVERS`          | `drivers_front`, `drivers_back`                   |
| `RESIDENCE_PERMIT` | `residence_permit_front`, `residence_permit_back` |

Whop rejects mixed slots from two documents or an incomplete document before storing anything. The `options` on the item say which ID types that review accepts.

If a file item has no `options`, it needs no `value`.

### Sensitive values

Submit tax and government ID numbers (`ssn`, `ein`, `company_tax_id`, `personal_id_number`) like any other value. Whop replaces them with secure tokens in transit and stores only the secure reference:

```bash cURL theme={null}
curl -X PATCH https://api.whop.com/api/v1/verifications/idpf_xxxxxxxxxxxxx \
  -H "Authorization: Bearer $WHOP_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "requested_information": [
      { "id": "inrqi_xxxxxxxxxxxxx", "value": "123-45-6789" }
    ]
  }'
```

If you already tokenize values yourself (Basis Theory), pass the token ID with `value_type: "vault_token"` instead.

## Rejected answers

If Whop rejects a submitted answer, the item returns to `requested_information` with `errors` set:

```json theme={null}
{
  "id": "inrqi_xxxxxxxxxxxxx",
  "requirement": "business_website",
  "type": "text",
  "label": "Business website or social profile",
  "errors": [
    {
      "code": "invalid_url_website_inaccessible",
      "reason": "The website provided could not be reached."
    }
  ]
}
```

Show `reason` to your user and branch on `code` if you need to. Treat unrecognized codes as a generic rejection.

Fix the underlying issue and resubmit with the same item `id`. The verification stays `action_required` until Whop accepts the corrected answer.

### Document rejection codes

When Whop rejects an uploaded document, `code` names what was wrong with it. These are the codes you can receive:

| Code                           | Meaning                                                                          |
| ------------------------------ | -------------------------------------------------------------------------------- |
| `bad_proof_of_identity`        | Whop doesn't accept the proof of identity — provide a government-issued photo ID |
| `expiration_date`              | The document has expired                                                         |
| `unsatisfactory_photos`        | Too unclear to read                                                              |
| `problematic_applicant_data`   | Submitted details don't match the document                                       |
| `screenshots`                  | The user uploaded a screenshot instead of a photo of the document                |
| `graphic_editor`               | The document appears edited                                                      |
| `digital_document`             | The user uploaded a digital copy. Provide a photo of the physical document       |
| `document_damaged`             | Damaged or partly unreadable                                                     |
| `document_page_missing`        | A page is missing                                                                |
| `document_missing`             | The document wasn't received                                                     |
| `not_document`                 | The file isn't a document                                                        |
| `id_invalid`                   | The identity document isn't valid                                                |
| `incompatible_language`        | Unsupported language. Provide a certified translation                            |
| `bad_selfie`                   | The selfie was unclear                                                           |
| `bad_face_matching`            | The selfie didn't match the photo on the document                                |
| `bad_proof_of_address`         | Not an accepted proof of address                                                 |
| `wrong_address`                | The address doesn't match the document                                           |
| `incorrect_social_number`      | The tax identification number doesn't match the document                         |
| `company_incorrect_data`       | Company details don't match the registration document                            |
| `company_data_mismatch`        | Company details don't match Whop's records                                       |
| `company_inactive_entity`      | The company isn't listed as active in the registry                               |
| `additional_document_required` | Whop needs another document                                                      |
| `more_documents_required`      | Whop needs more documents                                                        |
| `db_data_mismatch`             | Submitted details don't match official records                                   |
| `spam`                         | Whop couldn't process the submission                                             |

Every code here describes a fixable problem with the upload. A rejection that Whop can't attribute to one of them returns no `errors` rather than an unusable code. Always handle an item with no `errors`, and prefer `reason` for user-facing text.

## Every requirement

Each item's `requirement` is one of the values below.

### Personal details

| Requirement             | Type      | What to submit                                                                                                  |
| ----------------------- | --------- | --------------------------------------------------------------------------------------------------------------- |
| `first_name`            | `text`    | Legal first name, capitalized (`Jane`)                                                                          |
| `last_name`             | `text`    | Legal last name, capitalized (`Doe`)                                                                            |
| `creator_legal_name`    | `text`    | Full legal name as it appears on official documents                                                             |
| `date_of_birth`         | `date`    | `YYYY-MM-DD`                                                                                                    |
| `email`                 | `text`    | Email address                                                                                                   |
| `creator_email_address` | `text`    | An email address where Whop can reach the user                                                                  |
| `phone_number`          | `phone`   | E.164 format with country code (`+12125550123`)                                                                 |
| `personal_address`      | `address` | Current residential address — no PO boxes                                                                       |
| `occupation`            | `text`    | Standard Occupational Classification code (`15-1132`), or `SELFEMP`, `STUDENT`, `RETIRED`, `UNEMPLO`, `OTHERXX` |
| `annual_salary`         | `text`    | Approximate yearly income in United States dollars, digits only                                                 |

### Tax and government identification numbers

Whop replaces these values with secure tokens in transit — see [sensitive values](#sensitive-values).

| Requirement                  | Type     | What to submit                                                                 |
| ---------------------------- | -------- | ------------------------------------------------------------------------------ |
| `ssn`                        | `text`   | United States Social Security Number, `XXX-XX-XXXX`                            |
| `ein`                        | `text`   | United States Employer Identification Number, `XX-XXXXXXX`                     |
| `company_tax_id`             | `text`   | Company tax ID in the issuing country's format                                 |
| `personal_id_number`         | `text`   | Government-issued personal ID number (passport, driver's license, national ID) |
| `personal_id_number_country` | `select` | Country that issued the ID number — pick from `options`                        |
| `country_of_issue`           | `text`   | Two-letter country code of the issuing country (`US`)                          |

### Identity documents

| Requirement         | Type          | What to submit                                                                              |
| ------------------- | ------------- | ------------------------------------------------------------------------------------------- |
| `identity_document` | `id_document` | Government-issued photo ID. Send `documents` with the slot keys for the ID the user uploads |
| `selfie`            | `files`       | Photo of the user holding their ID                                                          |

### Business details

| Requirement                     | Type      | What to submit                                                                                             |
| ------------------------------- | --------- | ---------------------------------------------------------------------------------------------------------- |
| `business_name`                 | `text`    | The business's registered legal name                                                                       |
| `trade_name`                    | `text`    | Public-facing name if different from the legal name (doing business as)                                    |
| `company_title`                 | `text`    | The company's name                                                                                         |
| `business_structure`            | `select`  | Legal structure — one of `options`, e.g. `single_member_llc`, `sole_proprietorship`, `private_corporation` |
| `account_type`                  | `select`  | `individual`, `company`, or `non_profit`                                                                   |
| `business_representative_title` | `select`  | Representative's title — one of `options`, e.g. `CEO`, `Owner`, `Manager`                                  |
| `industry_type`                 | `text`    | Industry the business operates in                                                                          |
| `business_description`          | `text`    | 100–1000 characters: what's sold, what customers receive after payment, and where they access it           |
| `product_description`           | `text`    | The product or service sold                                                                                |
| `business_phone_number`         | `phone`   | E.164 format with country code                                                                             |
| `business_address`              | `address` | Registered business address — no PO boxes                                                                  |
| `business_website`              | `text`    | Business website URL                                                                                       |
| `social_media_or_website`       | `text`    | Website, or a public social profile that represents what's sold                                            |
| `store_page_url`                | `text`    | Link to the store or product page                                                                          |
| `expected_monthly_volume`       | `text`    | Expected monthly processing volume in United States dollars, digits only                                   |
| `account_purpose`               | `text`    | What the account is primarily used for                                                                     |

### Business documents

| Requirement                      | Type              | What to submit                                                                                                                                                 |
| -------------------------------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `business_verification_document` | `files`           | Document confirming the company's legal identity — Internal Revenue Service (IRS) Letter 147C, SS-4, or Employer Identification Number (EIN) Assistance Letter |
| `business_incorporation_papers`  | `files`           | Official incorporation documents                                                                                                                               |
| `ownership_structure`            | `files`           | Documents showing who owns the business                                                                                                                        |
| `processing_statements`          | `files`           | Statements from a previous payment processor showing processing history — not bank statements                                                                  |
| `proof_of_fulfillment`           | `files`           | Screenshot, recording, or file showing what customers receive after purchase                                                                                   |
| `proof_of_funnel`                | `text` or `files` | Where customers come from — a social account, website, or landing page                                                                                         |

### Payout account documents

A document requested to verify a payout destination names the document itself. Upload one file — the `label` tells your user which account it's for.

| Requirement         | Type    | What to submit                                   |
| ------------------- | ------- | ------------------------------------------------ |
| `bank_statement`    | `files` | Recent bank statement for the payout account     |
| `paper_check`       | `files` | Voided paper check                               |
| `wallet_screenshot` | `files` | Screenshot of a wallet or account balance        |
| `government_id`     | `files` | Government-issued ID                             |
| `proof_of_address`  | `files` | Proof of address issued within the last 3 months |
| `utility_bill`      | `files` | Utility bill issued within the last 3 months     |
| `insurance_card`    | `files` | Insurance card issued within the last 3 months   |
| `company_documents` | `files` | Company or entity documents                      |

### Review questions

| Requirement     | Type              | What to submit                                          |
| --------------- | ----------------- | ------------------------------------------------------- |
| `anything_else` | `text` or `files` | Anything else the review team should know               |
| `accept_tos`    | `text`            | Confirmation that the user accepts the terms of service |
| `signature`     | `files`           | Signature image for an agreement                        |
