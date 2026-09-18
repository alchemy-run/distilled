> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Memberships

> Manage subscription lifecycle. Pause, resume, cancel, restore, and add free days.

A Membership is the active relationship between a user and a product. It tracks access, billing status, and renewal schedule. You don't create memberships directly because checkout does that for you. Once a membership exists, you can read it, pause or cancel billing, comp time, or update metadata.

<Tip>
  Most apps don't need to manage memberships at all. Reach for these methods when you're building admin tools, customer support flows, or self-serve dashboards that let users pause or cancel.
</Tip>

## Lifecycle at a glance

| Action               | Method                                                                                     | What it does                                                |
| -------------------- | ------------------------------------------------------------------------------------------ | ----------------------------------------------------------- |
| Pause billing        | [`memberships.pause`](/api-reference/memberships/pause-membership)                         | Stops future renewals until resumed. Existing access stays. |
| Resume billing       | [`memberships.resume`](/api-reference/memberships/resume-membership)                       | Reverses a pause.                                           |
| Cancel               | [`memberships.cancel`](/api-reference/memberships/cancel-membership)                       | At period end, or immediate (default).                      |
| Restore cancellation | [`memberships.uncancelMembership`](/api-reference/memberships/uncancel-membership)         | Reverses a pending `cancel_at_period_end`.                  |
| Comp time            | [`memberships.addFreeDaysMembership`](/api-reference/memberships/add-free-days-membership) | Extends the next renewal date by N days.                    |
| Update metadata      | [`memberships.update`](/api-reference/memberships/update-membership)                       | Patch metadata or other writable fields.                    |

## Retrieve and list

<CodeGroup>
  ```typescript TypeScript theme={null}
  const membership = await client.memberships.retrieve({ id: "mem_xxxxxxxxxxxxx" });

  // List with auto-pagination
  const memberships = await client.memberships.list({
    account_id: "biz_xxxxxxxxxxxxx",
  });

  for await (const item of memberships) {
    console.log(item);
  }
  ```

  ```python Python theme={null}
  membership = client.memberships.retrieve("mem_xxxxxxxxxxxxx")

  for item in client.memberships.list(account_id="biz_xxxxxxxxxxxxx"):
      print(item)
  ```

  ```ruby Ruby theme={null}
  membership = client.memberships.retrieve(id: "mem_xxxxxxxxxxxxx")

  # list returns an Enumerable that pages for you and yields one membership at a time
  client.memberships.list(account_id: "biz_xxxxxxxxxxxxx").each do |item|
    puts item
  end
  ```
</CodeGroup>

## Pause and resume

Pausing stops the next billing cycle. The user keeps their existing access until the current period ends, but the renewal won't fire. Pass `until` to schedule an automatic resume.

<CodeGroup>
  ```typescript TypeScript theme={null}
  await client.memberships.pause({
    id: "mem_xxxxxxxxxxxxx",
    until: "2026-09-01T00:00:00Z", // optional, resumes automatically
  });

  // Later
  await client.memberships.resume({ id: "mem_xxxxxxxxxxxxx" });
  ```

  ```python Python theme={null}
  client.memberships.pause(
      "mem_xxxxxxxxxxxxx",
      until="2026-09-01T00:00:00Z",  # optional, resumes automatically
  )

  client.memberships.resume("mem_xxxxxxxxxxxxx")
  ```

  ```ruby Ruby theme={null}
  client.memberships.pause(
    id: "mem_xxxxxxxxxxxxx",
    until: "2026-09-01T00:00:00Z", # optional, resumes automatically
  )

  # Later
  client.memberships.resume(id: "mem_xxxxxxxxxxxxx")
  ```
</CodeGroup>

## Cancel

Two cancellation modes. `cancel_at_period_end: true` keeps access until the current renewal date and then deactivates. Omit it (or pass `false`) to revoke access immediately.

<CodeGroup>
  ```typescript TypeScript theme={null}
  // Cancel at the end of the current billing period
  await client.memberships.cancel({
    id: "mem_xxxxxxxxxxxxx",
    cancel_at_period_end: true,
  });

  // Cancel immediately. Access ends now.
  await client.memberships.cancel({
    id: "mem_xxxxxxxxxxxxx",
    cancel_at_period_end: false,
    reason: "Requested by customer",
  });
  ```

  ```python Python theme={null}
  # Cancel at the end of the current billing period
  client.memberships.cancel(
      "mem_xxxxxxxxxxxxx",
      cancel_at_period_end=True,
  )

  # Cancel immediately. Access ends now.
  client.memberships.cancel(
      "mem_xxxxxxxxxxxxx",
      cancel_at_period_end=False,
      reason="Requested by customer",
  )
  ```

  ```ruby Ruby theme={null}
  # Cancel at the end of the current billing period
  client.memberships.cancel(
    id: "mem_xxxxxxxxxxxxx",
    cancel_at_period_end: true,
  )

  # Cancel immediately. Access ends now.
  client.memberships.cancel(
    id: "mem_xxxxxxxxxxxxx",
    cancel_at_period_end: false,
    reason: "Requested by customer",
  )
  ```
</CodeGroup>

<Note>
  `cancel_at_period_end: true` flips `cancel_at_period_end` to `true` on the membership. The user keeps access until renewal, then the membership deactivates and `membership.deactivated` fires. Omitting the field revokes access immediately, so send it explicitly whenever you mean to cancel at period end.
</Note>

## Restore a cancellation

If the user changes their mind before the period ends, undo a pending period-end cancellation. Has no effect if the membership wasn't scheduled to cancel.

<CodeGroup>
  ```typescript TypeScript theme={null}
  await client.memberships.uncancelMembership({ id: "mem_xxxxxxxxxxxxx" });
  ```

  ```python Python theme={null}
  client.memberships.uncancel_membership("mem_xxxxxxxxxxxxx")
  ```

  ```ruby Ruby theme={null}
  client.memberships.uncancel_membership(id: "mem_xxxxxxxxxxxxx")
  ```
</CodeGroup>

## Add free days

Comp the user with extra time on their current period. The next renewal date moves forward by `free_days`. Useful for service interruptions, support gestures, or referral rewards.

<CodeGroup>
  ```typescript TypeScript theme={null}
  await client.memberships.addFreeDaysMembership({
    id: "mem_xxxxxxxxxxxxx",
    free_days: 7,
  });
  ```

  ```python Python theme={null}
  client.memberships.add_free_days_membership("mem_xxxxxxxxxxxxx", free_days=7)
  ```

  ```ruby Ruby theme={null}
  client.memberships.add_free_days_membership(id: "mem_xxxxxxxxxxxxx", free_days: 7)
  ```
</CodeGroup>

`free_days` accepts 1 through 1095 (3 years).

## Update metadata

Patch arbitrary metadata or other writable fields on the membership.

<CodeGroup>
  ```typescript TypeScript theme={null}
  await client.memberships.update({
    id: "mem_xxxxxxxxxxxxx",
    metadata: { internal_user_id: "user_12345", tier: "gold" },
  });
  ```

  ```python Python theme={null}
  client.memberships.update(
      "mem_xxxxxxxxxxxxx",
      metadata={"internal_user_id": "user_12345", "tier": "gold"},
  )
  ```

  ```ruby Ruby theme={null}
  client.memberships.update(
    id: "mem_xxxxxxxxxxxxx",
    metadata: { internal_user_id: "user_12345", tier: "gold" },
  )
  ```
</CodeGroup>

## Listen for lifecycle events

Subscribe via [webhooks](/developer/guides/webhooks). These are the events that fire across the lifecycle:

| Event                                                                                                           | When it fires                                                                                          |
| --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| [`membership.activated`](/api-reference/memberships/membership-activated)                                       | Membership becomes valid (initial purchase or renewal payment succeeds).                               |
| [`membership.deactivated`](/api-reference/memberships/membership-deactivated)                                   | Membership goes invalid (failed payment, immediate cancel, period-end cancel landing, or user leaves). |
| [`membership.cancel_at_period_end_changed`](/api-reference/memberships/membership-cancel-at-period-end-changed) | The user toggled cancellation on or off (pairs with `cancel` and `uncancel`).                          |

For `pause` / `resume` / `add_free_days`, the membership status doesn't flip, so no activation/deactivation event fires. If you need to confirm the mutation succeeded, retrieve the membership after the call or poll on your own schedule.

## Next steps

<CardGroup cols={2}>
  <Card title="Accept payments" href="/developer/guides/accept-payments">
    Where memberships come from. One-time and recurring checkouts.
  </Card>

  <Card title="Save payment methods" href="/developer/guides/save-payment-methods">
    On-file cards for future renewals and off-session billing.
  </Card>

  <Card title="Listen to webhooks" href="/developer/guides/webhooks">
    React to activation, deactivation, and cancellation toggles.
  </Card>

  <Card title="Memberships API reference" href="/api-reference/memberships/membership">
    Full resource: fields, statuses, and every endpoint.
  </Card>
</CardGroup>
