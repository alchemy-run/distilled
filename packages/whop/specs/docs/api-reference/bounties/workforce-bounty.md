> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Workforce Bounty

> A privately accessible bounty.

<Note>
  This resource has a successor in the [Whop
  API](/api-reference/beta/bounties/list-bounties), the versioned API that new
  integrations should build on. This page stays fully supported.
</Note>

<ResponseExample>
  ```json Example theme={null}
  {
  	"bounty_type": "classic",
  	"created_at": "2023-12-01T05:00:00.401Z",
  	"currency": "usd",
  	"description": "<string>",
  	"id": "bnty_xxxxxxxxxxxxx",
  	"status": "published",
  	"title": "<string>",
  	"total_available": 6.9,
  	"total_paid": 6.9,
  	"updated_at": "2023-12-01T05:00:00.401Z",
  	"vote_threshold": 42
  }
  ```
</ResponseExample>

<ResponseField name="bounty_type" type="BountyTypes" required>
  The underlying bounty implementation type.

  Available options: `classic`, `user_funded`, `workforce`
</ResponseField>

<ResponseField name="created_at" type="string<date-time>" required>
  The datetime the bounty was created.

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="currency" type="Currencies" required>
  The currency used for the bounty funds.

  Available options: `usd`, `sgd`, `inr`, `aud`, `brl`, `cad`, `dkk`, `eur`, `nok`, `gbp`, `sek`, `chf`, `hkd`, `huf`, `jpy`, `mxn`, `myr`, `pln`, `czk`, `nzd`, `aed`, `eth`, `ape`, `cop`, `ron`, `thb`, `bgn`, `idr`, `dop`, `php`, `try`, `krw`, `twd`, `vnd`, `pkr`, `clp`, `uyu`, `ars`, `zar`, `dzd`, `tnd`, `mad`, `kes`, `kwd`, `jod`, `all`, `xcd`, `amd`, `bsd`, `bhd`, `bob`, `bam`, `khr`, `crc`, `xof`, `egp`, `etb`, `gmd`, `ghs`, `gtq`, `gyd`, `ils`, `jmd`, `mop`, `mga`, `mur`, `mdl`, `mnt`, `nad`, `ngn`, `mkd`, `omr`, `pyg`, `pen`, `qar`, `rwf`, `sar`, `rsd`, `lkr`, `tzs`, `ttd`, `uzs`, `rub`, `btc`, `cny`, `usdt`, `kzt`, `awg`, `whop_usd`, `xau`
</ResponseField>

<ResponseField name="description" type="string" required>
  The description of the bounty.
</ResponseField>

<ResponseField name="id" type="string" required>
  The unique identifier for the bounty.

  Example: `bnty_xxxxxxxxxxxxx`
</ResponseField>

<ResponseField name="status" type="Statuses" required>
  The current lifecycle status of the bounty.

  Available options: `published`, `archived`, `scheduled`
</ResponseField>

<ResponseField name="title" type="string" required>
  The title of the bounty.
</ResponseField>

<ResponseField name="total_available" type="number" required>
  The total amount currently funded in the bounty pool for payout.

  Example: `6.9`
</ResponseField>

<ResponseField name="total_paid" type="number" required>
  The total amount paid out for this bounty.

  Example: `6.9`
</ResponseField>

<ResponseField name="updated_at" type="string<date-time>" required>
  The datetime the bounty was last updated.

  Example: `2023-12-01T05:00:00.401Z`
</ResponseField>

<ResponseField name="vote_threshold" type="integer" required>
  The number of watcher votes required before the submission can resolve.

  Example: `42`
</ResponseField>
