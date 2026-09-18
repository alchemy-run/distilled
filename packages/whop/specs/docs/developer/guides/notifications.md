> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Push notifications

> Send push notifications to users in your app, scoped by experience or account.

Send push notifications to users in your app. Notifications appear in the Whop mobile app and web interface.

## Pick your notification type

|                              | Experience notification                        | Account notification                            |
| ---------------------------- | ---------------------------------------------- | ----------------------------------------------- |
| **Audience**                 | Users with access to an experience             | Team members of an account                      |
| **Best for**                 | Customer-facing apps (alerts, social, fitness) | Dashboard apps (admin actions, reports, alerts) |
| **Required keying field**    | `experience_id`                                | `account_id`                                    |
| **Filter to specific users** | `user_ids` (must have experience access)       | `user_ids` (must be team members)               |

<Info>
  Sending notifications requires the `notification:create` permission. Add it from the [Permissions guide](/developer/guides/permissions). The experience must belong to your app, or the account must have your app installed.
</Info>

## Send to everyone in an experience

Send notifications to all users with access to an experience:

<CodeGroup>
  ```typescript TypeScript theme={null}
  const result = await client.notifications.create({
    experience_id: 'exp_xxxxxxxxxxxxxx',
    title: 'New Feature Available',
    subtitle: 'Check it out now',
    content: 'We just released a new feature that helps you track your progress better.',
  });

  console.log(result.success); // true

  ```

  ```python Python theme={null}
  result = client.notifications.create(
      experience_id="exp_xxxxxxxxxxxxxx",
      title="New Feature Available",
      subtitle="Check it out now",
      content="We just released a new feature that helps you track your progress better.",
  )

  print(result.success)  # True
  ```

  ```ruby Ruby theme={null}
  result = client.notifications.create(
    experience_id: "exp_xxxxxxxxxxxxxx",
    title: "New Feature Available",
    subtitle: "Check it out now",
    content: "We just released a new feature that helps you track your progress better."
  )

  puts result.success  # true
  ```
</CodeGroup>

<Note>
  **Example use case:** If you're building a fitness tracking app, you could
  send a notification to everyone when a new workout program is released. You
  could also send targeted notifications to users who completed a 7-day streak
  to celebrate their achievement.
</Note>

## Send to specific users

Use the `user_ids` parameter to send notifications only to specific users. These users must also have access to the experience.

<CodeGroup>
  ```typescript TypeScript theme={null}
  const result = await client.notifications.create({
    experience_id: 'exp_xxxxxxxxxxxxxx',
    title: 'Complete your daily workout',
    content: 'You\'re 50% of the way to your goal. Finish strong!',
    user_ids: ['user_abc123', 'user_def456'],
  });
  ```

  ```python Python theme={null}
  result = client.notifications.create(
      experience_id="exp_xxxxxxxxxxxxxx",
      title="Complete your daily workout",
      content="You're 50% of the way to your goal. Finish strong!",
      user_ids=["user_abc123", "user_def456"],
  )
  ```

  ```ruby Ruby theme={null}
  result = client.notifications.create(
    experience_id: "exp_xxxxxxxxxxxxxx",
    title: "Complete your daily workout",
    content: "You're 50% of the way to your goal. Finish strong!",
    user_ids: ["user_abc123", "user_def456"]
  )
  ```
</CodeGroup>

## Send to account team members

Send notifications to all team members of an account (dashboard app users):

<CodeGroup>
  ```typescript TypeScript theme={null}
  const result = await client.notifications.create({
    account_id: 'biz_xxxxxxxxxxxxxx',
    title: 'Monthly Report Ready',
    subtitle: 'October 2024',
    content: 'Your monthly analytics report has been generated and is ready to view.',
  });
  ```

  ```python Python theme={null}
  result = client.notifications.create(
      account_id="biz_xxxxxxxxxxxxxx",
      title="Monthly Report Ready",
      subtitle="October 2024",
      content="Your monthly analytics report has been generated and is ready to view.",
  )
  ```

  ```ruby Ruby theme={null}
  result = client.notifications.create(
    account_id: "biz_xxxxxxxxxxxxxx",
    title: "Monthly Report Ready",
    subtitle: "October 2024",
    content: "Your monthly analytics report has been generated and is ready to view."
  )
  ```
</CodeGroup>

<Note>
  **Example use case:** If you're building a tax filing dashboard, you could
  send notifications to all team members when a filing deadline is approaching.
  You could also send targeted reminders to specific users who still need to
  complete steps in the filing process.
</Note>

## Send to specific team members

Use the `user_ids` parameter to send notifications only to specific team members. These users must also be team members of the account.

<CodeGroup>
  ```typescript TypeScript theme={null}
  const result = await client.notifications.create({
    account_id: 'biz_xxxxxxxxxxxxxx',
    title: 'Action Required',
    content: 'Please review and approve the pending invoices.',
    user_ids: ['user_manager1', 'user_manager2'],
  });
  ```

  ```python Python theme={null}
  result = client.notifications.create(
      account_id="biz_xxxxxxxxxxxxxx",
      title="Action Required",
      content="Please review and approve the pending invoices.",
      user_ids=["user_manager1", "user_manager2"],
  )
  ```

  ```ruby Ruby theme={null}
  result = client.notifications.create(
    account_id: "biz_xxxxxxxxxxxxxx",
    title: "Action Required",
    content: "Please review and approve the pending invoices.",
    user_ids: ["user_manager1", "user_manager2"]
  )
  ```
</CodeGroup>

## Deep link with rest\_path

Direct users to specific pages in your app when they tap a notification using the `rest_path` parameter.

## Setting up your app path

First, configure your app path in the dashboard to handle the dynamic route parameter:

1. Go to your app settings in the [developer dashboard](https://whop.com/dashboard/developer)
2. In the hosting section, update your "App path" to include `[restPath]`

**For experience apps:**

```
/experiences/[experienceId]/[restPath]
```

**For dashboard apps:**

```
/companies/[companyId]/[restPath]
```

## Sending notifications with deep links

Add the `rest_path` parameter to your notification. Whop appends it to your app's base URL.

<CodeGroup>
  ```typescript TypeScript theme={null}
  // Experience app: Direct to a specific workout
  await client.notifications.create({
    experience_id: 'exp_xxxxxxxxxxxxxx',
    title: 'Today\'s Recommended Workout',
    content: 'Based on your progress, we recommend this HIIT session.',
    rest_path: '/workouts/hiit-advanced-1',
  });

  // Dashboard app: Direct to a specific report
  await client.notifications.create({
    account_id: 'biz_xxxxxxxxxxxxxx',
    title: 'Unusual Activity Detected',
    content: 'Review the flagged transactions in your dashboard.',
    rest_path: '/reports/flagged-transactions',
  });

  ```

  ```python Python theme={null}
  # Experience app: Direct to a specific workout
  client.notifications.create(
      experience_id="exp_xxxxxxxxxxxxxx",
      title="Today's Recommended Workout",
      content="Based on your progress, we recommend this HIIT session.",
      rest_path="/workouts/hiit-advanced-1",
  )

  # Dashboard app: Direct to a specific report
  client.notifications.create(
      account_id="biz_xxxxxxxxxxxxxx",
      title="Unusual Activity Detected",
      content="Review the flagged transactions in your dashboard.",
      rest_path="/reports/flagged-transactions",
  )
  ```

  ```ruby Ruby theme={null}
  # Experience app: Direct to a specific workout
  client.notifications.create(
    experience_id: "exp_xxxxxxxxxxxxxx",
    title: "Today's Recommended Workout",
    content: "Based on your progress, we recommend this HIIT session.",
    rest_path: "/workouts/hiit-advanced-1"
  )

  # Dashboard app: Direct to a specific report
  client.notifications.create(
    account_id: "biz_xxxxxxxxxxxxxx",
    title: "Unusual Activity Detected",
    content: "Review the flagged transactions in your dashboard.",
    rest_path: "/reports/flagged-transactions"
  )
  ```
</CodeGroup>

## Handling the route in your app

When a user taps the notification, Whop directs them to the full URL constructed from your app path and the `rest_path`.

**Example for experience app:**

If you host your app at `https://your-app.com` and send:

```typescript theme={null}
rest_path: "/posts/post_123";
```

The user will open:

```
https://your-app.com/experiences/exp_xxxxxxxxxxxxxx/posts/post_123
```

**In Next.js**, create a file at:

```
app/experiences/[experienceId]/posts/[postId]/page.tsx
```

**In Express**, handle the route:

```typescript theme={null}
app.get("/experiences/:experienceId/posts/:postId", (req, res) => {
	// Handle the notification deep link
});
```

You can also use query parameters:

```typescript theme={null}
rest_path: "?action=review&id=123";
```

## Custom notification icons

By default, notifications display your experience avatar, account avatar, or both. Customize the icon by providing the Whop user ID of the profile picture you want to use.

<CodeGroup>
  ```typescript TypeScript theme={null}
  await client.notifications.create({
    experience_id: 'exp_xxxxxxxxxxxxxx',
    title: 'New Comment',
    content: 'Sarah replied to your post: "Great progress!"',
    icon_user_id: 'user_sarah123',
    rest_path: '/posts/my-post-123',
  });
  ```

  ```python Python theme={null}
  client.notifications.create(
      experience_id="exp_xxxxxxxxxxxxxx",
      title="New Comment",
      content='Sarah replied to your post: "Great progress!"',
      icon_user_id="user_sarah123",
      rest_path="/posts/my-post-123",
  )
  ```

  ```ruby Ruby theme={null}
  client.notifications.create(
    experience_id: "exp_xxxxxxxxxxxxxx",
    title: "New Comment",
    content: 'Sarah replied to your post: "Great progress!"',
    icon_user_id: "user_sarah123",
    rest_path: "/posts/my-post-123"
  )
  ```
</CodeGroup>

This is useful for social features where you want to show who performed an action (commented, liked, followed, etc).

## Next steps

<CardGroup cols={2}>
  <Card title="Build a chatbot" href="/developer/guides/chat">
    Pair notifications with in-app messages so users get pinged regardless of where they are.
  </Card>

  <Card title="Listen to webhooks" href="/developer/guides/webhooks">
    Trigger notifications off `payment.succeeded`, `membership.activated`, and other server events.
  </Card>

  <Card title="Forums" href="/developer/guides/forums">
    Notify users when new posts or comments land in your forum experience.
  </Card>

  <Card title="Request permissions" href="/developer/guides/permissions">
    Confirm your app's permission setup so notifications send successfully.
  </Card>
</CardGroup>
