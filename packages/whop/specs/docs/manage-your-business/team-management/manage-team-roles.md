> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Team management

> Add team members and manage who has access to your whop

Your Team tab is where you decide who gets access to your whop and what permissions they have.

## How to add team members to your whop

<Steps>
  <Step title="Go to Team">
    Go to **Dashboard** > **All tools** > **More** > **[Team](https://whop.com/dashboard/team/)**
  </Step>

  <Step title="Enable 2FA (recommended)">
    Toggle on **Require 2FA** to make sure all team members use secure login
  </Step>

  <Step title="Invite a team member">
    Select **Invite team member** in the top right corner
  </Step>

  <Step title="Enter their email">
    Enter the person's email address in the **Email** field
  </Step>

  <Step title="Assign a role">
    Select their role from the **Role** dropdown menu
  </Step>

  <Step title="Send the invite">
    Select **Invite**
  </Step>
</Steps>

Whop automatically sends your team member an invitation email. When they accept, they'll show up in your team table with their new permissions.

You can see all your pending invites on the **Invites** tab next to **Members**.

<Warning>
  Start small. For security, grant someone the
  lowest-permissioned role that lets them do their job. You can always expand
  their access with a higher role later if needed.
</Warning>

## Roles and permissions overview

There are five pre-set roles you can assign to your team members, plus the ability to create your own custom roles:

| Role           | Permissions                                                                                                                                                                                                                                   |
| :------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Owner**      | Full access to everything                                                                                                                                                                                                                     |
| **Operations** | Manage products, members, payments, invoices, team, chat, forums, support tickets, courses, affiliates, promo codes, tracking links, checkout, and more — everything except payouts, developer tools, analytics, and account profile settings |
| **Sales**      | View members, plans, payments, and promo codes. Create plans. Read and send in chat and forums. View tracking links and waitlists                                                                                                             |
| **Support**    | Moderate chat and livestreams. Manage support tickets, courses, and experiences. Mute and ban members. Read and post in chat and forums                                                                                                       |
| **Advertiser** | Create and manage ad campaigns. View analytics and account balance                                                                                                                                                                            |

### **Owner**

Full access to every feature, setting, and tool on the platform.

* Manage payouts, withdrawals, and connected accounts
* View and manage API keys, OAuth, and Webhooks
* Edit account profile and legal settings
* View analytics and stats
* Invite and manage all team members, including other Owners
* Transfer ownership
* Manage crypto wallets

<Tip>
  The Owner role is best for founders, co-founders, technical leaders, or finance/legal leads
  who need complete control.
</Tip>

### **Operations**

Everything an Owner can do, except:

* **No access to Payouts** — can't create or manage payout accounts, initiate withdrawals, or transfer funds
* **No access to Developer tools** — can't create apps, manage API keys, OAuth, or webhooks
* **No access to Analytics** — can't view stats on the dashboard home page
* **Can't edit account profile** — can't update account name, branding, or general settings (but can view them and manage legal info)
* **No access to crypto wallets**

<Tip>
  The Operations role is best for operations managers, team leads, or anyone who
  needs broad dashboard access without control over payouts or developer
  settings.
</Tip>

### **Sales**

A focused role with read and create access to sales-related features:

* View the Members table and member emails
* View member and plan analytics
* View Payments (read only — can't charge, refund, or manage disputes)
* View and create Plans
* View Promo codes and Tracking links
* View `Waitlists`
* Read and send messages in Chat and Forums
* View basic account info

<Tip>
  The Sales role is best for marketing team members, affiliate managers, or
  sales reps who need to see members, payments, and checkout links.
</Tip>

### **Support**

A focused role for community management and customer support:

* Moderate Chat — delete messages, mute and ban members, and manage chat webhooks
* Moderate Livestreams — moderate livestream chat
* Manage Support tickets — view, create, and reply to support tickets
* Manage Courses — view and edit course content
* Manage Experiences — create, edit, and delete experiences
* Moderate content reward submissions
* Read and post in Chat and Forums
* View members, member emails, plans, products, tracking links, and waitlists

<Tip>
  The Support role is best for community managers, support agents, or anyone
  helping manage your community and answer customer questions.
</Tip>

### **Advertiser**

A narrow role specifically for running ad campaigns:

* Create, view, and manage ad campaigns
* Log conversions and add credits
* View analytics and stats
* View account balance (required for ad spend)

<Tip>
  The Advertiser role is best for marketing specialists or agencies who only
  need to manage your ad campaigns.
</Tip>

### **Custom roles**

You can also create fully custom roles with any combination of permissions. Go to **[Team](https://whop.com/dashboard/team/)** and select **Manage roles** to create a new custom role and toggle individual permission groups on or off.

### **Complete permissions breakdown**

| Permission group                                           | Support         | Sales        | Advertiser | Operations   | Owner |
| :--------------------------------------------------------- | :-------------- | :----------- | :--------- | :----------- | :---- |
| **Products** — manage products, apps, and experiences      | View only       | View only    | ❌          | ✔️           | ✔️    |
| **Members** — view, manage, moderate, and export members   | Moderate + view | View + stats | ❌          | ✔️           | ✔️    |
| **Payments** — charge, refund, disputes, Resolution Center | ❌               | View only    | ❌          | ✔️           | ✔️    |
| **Invoices** — view, create, edit, and export invoices     | ❌               | ❌            | ❌          | ✔️           | ✔️    |
| **Payouts** — withdraw funds, manage payout accounts       | ❌               | ❌            | ❌          | ❌            | ✔️    |
| **Chat** — read, send, delete messages, manage DMs         | Full + moderate | Read + send  | ❌          | ✔️           | ✔️    |
| **Forums** — read, create, and moderate forum posts        | Read + post     | Read + post  | ❌          | ✔️           | ✔️    |
| **Support tickets** — view, create, and reply              | ✔️              | ❌            | ❌          | ✔️           | ✔️    |
| **Courses** — view and edit course content                 | ✔️              | ❌            | ❌          | ✔️           | ✔️    |
| **Content rewards** — manage campaigns and submissions     | Moderate only   | ❌            | ❌          | ✔️           | ✔️    |
| **Affiliates** — view and manage affiliates                | ❌               | ❌            | ❌          | ✔️           | ✔️    |
| **Promo codes** — create, edit, and delete promo codes     | ❌               | View only    | ❌          | ✔️           | ✔️    |
| **Tracking links** — create and manage tracking links      | View only       | View only    | ❌          | ✔️           | ✔️    |
| **Ads** — create and manage ad campaigns                   | ❌               | ❌            | ✔️         | ✔️           | ✔️    |
| **Livestreaming** — create and moderate livestreams        | Moderate only   | ❌            | ❌          | ✔️           | ✔️    |
| **Notifications** — send email and push notifications      | ❌               | ❌            | ❌          | ✔️           | ✔️    |
| **Team** — invite/remove members, manage roles             | ❌               | ❌            | ❌          | ✔️           | ✔️    |
| **Account settings** — edit profile, legal, billing        | ❌               | ❌            | ❌          | View + legal | ✔️    |
| **Developer tools** — API keys, OAuth, webhooks, apps      | ❌               | ❌            | ❌          | ❌            | ✔️    |
| **Checkout** — checkout configurations and settings        | ❌               | ❌            | ❌          | ✔️           | ✔️    |
| **Analytics** — view dashboard stats                       | ❌               | ❌            | ✔️         | ❌            | ✔️    |

<Warning>
  Some actions your team can perform (like deleting messages or removing
  checkout links) can't be undone. Start with the lowest-permissioned role that
  lets someone do their job.
</Warning>

## How to change team member roles

You can update anyone's role at any time to give them more or less access.

<Steps>
  <Step title="Go to Team">
    Go to **Dashboard** > **All tools** > **More** > **[Team](https://whop.com/dashboard/team/)**
  </Step>

  <Step title="Find the team member">
    Find the team member in the members table
  </Step>

  <Step title="Change their role">
    Select the dropdown menu in their **Role** column
  </Step>

  <Step title="Select the new role">
    Select their new role
  </Step>

  <Step title="Save">
    Select **Save**
  </Step>
</Steps>

The change happens right away, and they'll have their new permissions immediately.

## How to remove team members

<Steps>
  <Step title="Go to Team">
    Go to **Dashboard** > **All tools** > **More** > **[Team](https://whop.com/dashboard/team/)**
  </Step>

  <Step title="Find the team member">
    Find the team member you want to remove
  </Step>

  <Step title="Open the menu">
    Select the three dots (︙) on the right side of their row
  </Step>

  <Step title="Remove them">
    Select **Remove user**
  </Step>

  <Step title="Confirm">
    Select the red **Remove user** button in the confirmation pop-up
  </Step>
</Steps>

They'll immediately lose access to your whop. To add them back to the team, send a new invitation.
