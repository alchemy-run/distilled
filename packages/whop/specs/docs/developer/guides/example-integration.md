> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Example integration

> Build a marketplace on top of Whop's global payment and payout rails.

This guide shows how to recreate the core of the Mercor Clone demo using Whop Rails. You'll build the key pages, wire up payments through embedded Whop checkout, and pay connected accounts at scale.

To see the example repository, visit the [Mercor clone repository](https://github.com/whopio/mercor-clone). Otherwise, follow the tutorial below to get started:

```bash theme={null}
npx create-next-app@latest mercor-clone
```

Set environment variables

```bash theme={null}
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/mercorclone?schema=public"

# Whop
WHOP_API_KEY="whop_XXXXXXXXXXXXXXXX"
PLATFORM_ACCOUNT_ID="biz_XXXXXXXXXXXX"
WHOP_WEBHOOK_SECRET="whsec_XXXXXXXXXXX"  # recommended for webhook signature verification

# Auth (example if using NextAuth)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="$(openssl rand -base64 32)"
```

Install dependencies

```bash theme={null}
pnpm add @whop/checkout @whop/checkout-react
# plus your web framework deps (e.g., Next.js, Prisma, etc.)
```

## 1) Project structure and pages

Create an App Router structure (Next.js) that mirrors the marketplace flows. Add recruiter pages for funding and managing gigs, earner pages for payouts and submissions, and an admin surface if needed.

Folder structure

```txt theme={null}
app/
  layout.tsx
  page.tsx
  recruiter/
    balance/page.tsx            # Add funds UI (opens checkout embed)
    my-listings/page.tsx
    submissions/page.tsx        # Approve/Complete gigs
	 layout.tsx
  earner/
    payouts/page.tsx            # Setup payouts + payout portal
    listings/page.tsx
    my-submissions/page.tsx
	 layout.tsx
  api/
    checkout/
      create-session/route.ts   # Create Whop checkout configuration (payins)
    whop/
      events/route.ts           # Webhook for payment events
    payouts/
      setup/route.ts            # Create connected account
    submissions/
      [id]/complete/route.ts    # Create transfer payout on completion
```

Example minimal recruiter balance page

```tsx theme={null}
"use client";

import { useState } from "react";
import AddFundsModal from "@/components/AddFundsModal";

export default function RecruiterBalancePage() {
	const [open, setOpen] = useState(false);

	return (
		<main className="p-6">
			<h1 className="text-2xl font-semibold">Balance</h1>
			<p className="mt-2 text-gray-600">Add funds to pay for completed gigs.</p>
			<button
				className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded"
				onClick={() => setOpen(true)}
			>
				Add Funds
			</button>
			<AddFundsModal
				isOpen={open}
				onClose={() => setOpen(false)}
				onSuccess={() => {
					/* refetch balance */
				}}
			/>
		</main>
	);
}
```

Example minimal earner payouts page

```tsx theme={null}
"use client";

import { useState } from "react";

export default function EarnerPayoutsPage() {
	const [loading, setLoading] = useState(false);
	const [hasAccount, setHasAccount] = useState(false);
	const [whopAccountId, setWhopAccountId] = useState<string | null>(null);

	async function setupPayouts() {
		setLoading(true);
		try {
			const res = await fetch("/api/payouts/setup", { method: "POST" });
			if (res.ok) {
				const data = await res.json();
				setHasAccount(true);
				setWhopAccountId(data?.account?.whopId ?? null);
			}
		} finally {
			setLoading(false);
		}
	}

	return (
		<main className="p-6">
			<h1 className="text-2xl font-semibold">Payouts</h1>
			{!hasAccount ? (
				<button
					className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded"
					onClick={setupPayouts}
					disabled={loading}
				>
					{loading ? "Setting up..." : "Setup Payouts"}
				</button>
			) : (
				<div className="mt-6">
					{/* See section 3 for the payout portal embed pseudo-code */}
					<p className="text-gray-600">Your payout account is ready.</p>
				</div>
			)}
		</main>
	);
}
```

## 2) Payment flow with `Whop Checkout Embed`

Server: create a Whop checkout configuration (one-time plan) that includes your own metadata to link payments back to the recruiter account.

```ts theme={null}
// app/api/checkout/create-session/route.ts
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function POST(request: Request) {
	const session = await auth();
	if (!session?.user)
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

	const { amount, currency = "USD" } = await request.json();
	if (!amount || amount <= 0)
		return NextResponse.json({ error: "Invalid amount" }, { status: 400 });

	const res = await fetch(
		"https://api.whop.com/api/v1/checkout_configurations",
		{
			method: "POST",
			headers: {
				Authorization: `Bearer ${process.env.WHOP_API_KEY!}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				plan: {
					account_id: process.env.PLATFORM_ACCOUNT_ID,
					visibility: "visible",
					plan_type: "one_time",
					release_method: "buy_now",
					currency: currency.toLowerCase(),
					initial_price: amount,
				},
				metadata: {
					recruiterId: session.user.id,
					amount: String(amount),
					currency,
					type: "add_funds",
				},
			}),
		},
	);

	if (!res.ok)
		return NextResponse.json(
			{ error: "Failed to create checkout configuration" },
			{ status: res.status },
		);
	const cfg = await res.json();
	return NextResponse.json({
		purchaseUrl: cfg.purchase_url,
		checkoutConfigId: cfg.id,
		planId: cfg.plan.id,
	});
}
```

Client: open an "Add Funds" modal and embed the Whop checkout with `@whop/checkout-react`.

```tsx theme={null}
"use client";

import { useState } from "react";
import { WhopCheckoutEmbed } from "@whop/checkout/react";

export default function AddFundsModal({
	isOpen,
	onClose,
	onSuccess,
}: {
	isOpen: boolean;
	onClose: () => void;
	onSuccess: () => void;
}) {
	const [amount, setAmount] = useState("");
	const [isCreating, setIsCreating] = useState(false);
	const [planId, setPlanId] = useState<string | null>(null);
	const [checkoutConfigId, setCheckoutConfigId] = useState<string | null>(null);
	const [error, setError] = useState("");

	async function startCheckout() {
		setIsCreating(true);
		try {
			const res = await fetch("/api/checkout/create-session", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ amount: Number(amount), currency: "USD" }),
			});
			const data = await res.json();
			if (!res.ok) {
				setError(data?.error ?? "Failed to create checkout");
				return;
			}
			setPlanId(data.planId);
			setCheckoutConfigId(data.checkoutConfigId);
		} finally {
			setIsCreating(false);
		}
	}

	if (!isOpen) return null;

	return (
		<div
			className="fixed inset-0 flex items-center justify-center p-6 bg-black/30"
			onClick={onClose}
		>
			<div
				className="bg-white rounded-lg p-6 w-full max-w-xl"
				onClick={(e) => e.stopPropagation()}
			>
				{!planId || !checkoutConfigId ? (
					<div>
						<h2 className="text-xl font-semibold">Add Funds</h2>
						<input
							className="mt-4 w-full border rounded px-3 py-2"
							type="number"
							min="1"
							step="0.01"
							placeholder="100.00"
							value={amount}
							onChange={(e) => setAmount(e.target.value)}
						/>
						{error && <p className="mt-2 text-sm text-red-600">{error}</p>}
						<div className="mt-4 flex gap-2">
							<button className="px-3 py-2 border rounded" onClick={onClose}>
								Cancel
							</button>
							<button
								className="px-3 py-2 bg-indigo-600 text-white rounded"
								onClick={startCheckout}
								disabled={isCreating}
							>
								{isCreating ? "Creating..." : "Proceed to Checkout"}
							</button>
						</div>
					</div>
				) : (
					<WhopCheckoutEmbed
						planId={planId}
						sessionId={checkoutConfigId}
						returnUrl="https://yoursite.com/checkout/complete"
						onComplete={() => {
							onSuccess();
							onClose();
						}}
						theme="system"
					/>
				)}
			</div>
		</div>
	);
}
```

Webhook: receive Whop payment events and credit recruiter balance on `payment.succeeded`.

```ts theme={null}
// app/api/whop/events/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
	// TODO: verify signature using WHOP_WEBHOOK_SECRET
	const body = await request.json();
	const { type: eventType, data } = body;

	if (eventType?.startsWith("payment.")) {
		const paymentId = data.id;
		const recruiterId = data.metadata?.recruiterId;
		const total = data.total ?? Number(data.metadata?.amount ?? 0);
		const currency = (data.currency ?? "usd").toUpperCase();
		if (!recruiterId) return NextResponse.json({ received: true });

		const status =
			eventType === "payment.succeeded"
				? "succeeded"
				: eventType === "payment.failed"
					? "failed"
					: "pending";

		await prisma.payment.upsert({
			where: { id: paymentId },
			create: {
				id: paymentId,
				amount: total,
				currency,
				status,
				metadata: data as any,
				recruiterId,
			},
			update: { status, metadata: data as any },
		});

		if (
			eventType === "payment.succeeded" &&
			total > 0 &&
			data.metadata?.type === "add_funds"
		) {
			const key = `payment_${paymentId}`;
			const existing = await prisma.ledgerEntry.findUnique({
				where: { idempotencyKey: key },
			});
			if (!existing) {
				await prisma.ledgerEntry.create({
					data: {
						amount: total,
						currency,
						transactionType: "credit",
						description: `Funds added via payment (${currency} ${total})`,
						idempotencyKey: key,
						recruiterId,
						paymentId,
					},
				});
			}
		}
	}
	return NextResponse.json({ received: true });
}
```

## 3) Connected account payouts (account setup + payout portal)

Create a Whop sub-account (earner account) under your platform account. Store the returned `whopId` to route transfers.

```ts theme={null}
// app/api/payouts/setup/route.ts
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST() {
	const session = await auth();
	if (!session?.user)
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

	const existing = await prisma.whopAccount.findUnique({
		where: { userId: session.user.id },
	});
	if (existing)
		return NextResponse.json(
			{ error: "Payout account already exists" },
			{ status: 400 },
		);

	const user = await prisma.user.findUnique({
		where: { id: session.user.id },
		select: { email: true, name: true },
	});
	const res = await fetch("https://api.whop.com/api/v1/companies", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${process.env.WHOP_API_KEY!}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email: user!.email,
			parent_company_id: process.env.PLATFORM_ACCOUNT_ID,
			title: user!.name || user!.email.split("@")[0],
		}),
	});
	if (!res.ok)
		return NextResponse.json(
			{ error: "Failed to create payout account" },
			{ status: res.status },
		);

	const account = await res.json();
	const record = await prisma.whopAccount.create({
		data: {
			title: account.title,
			whopId: account.id,
			metadata: account as any,
			userId: session.user.id,
		},
	});
	return NextResponse.json({
		success: true,
		account: { id: record.id, whopId: record.whopId, title: record.title },
	});
}
```

Embed a payout portal (pseudo-code)

* This shows the intended composition. Wire your real UI or SDK accordingly.

```tsx theme={null}
// Pseudo-code: conceptual payout portal composition
function EarnerPayoutPortal({ whopAccountId }: { whopAccountId: string }) {
	return (
		<PayoutSession companyId={whopAccountId}>
			<PayoutPortal
				onClose={() => {
					/* close modal */
				}}
			/>
		</PayoutSession>
	);
}
```

Gig completion: transfer funds from platform to earner sub-account using the earner's `whopAccountId` and an idempotency key per submission.

```ts theme={null}
// app/api/submissions/[id]/complete/route.ts
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createLedgerEntry, getRecruiterBalance } from "@/lib/ledger";

const PLATFORM_FEE_PERCENTAGE = 0.05;

export async function POST(
	_req: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	const session = await auth();
	if (!session?.user?.id)
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	const { id } = await params;

	const submission = await prisma.submission.findUnique({
		where: { id },
		include: {
			listing: { include: { recruiter: true } },
			earner: { include: { whopAccount: true } },
		},
	});
	if (!submission)
		return NextResponse.json(
			{ error: "Submission not found" },
			{ status: 404 },
		);
	if (submission.listing.recruiterId !== session.user.id)
		return NextResponse.json({ error: "Forbidden" }, { status: 403 });
	if (submission.status !== "Pending Delivery Review")
		return NextResponse.json({ error: "Bad status" }, { status: 400 });
	if (submission.transferId)
		return NextResponse.json({ error: "Already paid" }, { status: 400 });
	if (!submission.earner.whopAccount)
		return NextResponse.json(
			{ error: "Earner not set up for payouts" },
			{ status: 400 },
		);

	const balance = await getRecruiterBalance(session.user.id);
	const listingAmount = Number(submission.listing.amount);
	if (balance < listingAmount)
		return NextResponse.json(
			{ error: "Insufficient balance" },
			{ status: 400 },
		);

	const platformFee = listingAmount * PLATFORM_FEE_PERCENTAGE;
	const earnerAmount = listingAmount - platformFee;
	const idempotencyKey = `submission_${submission.id}_payout`;

	const transfer = await fetch("https://api.whop.com/api/v1/transfers", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${process.env.WHOP_API_KEY!}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			amount: earnerAmount,
			currency: submission.listing.currency.toLowerCase(),
			origin_id: process.env.PLATFORM_ACCOUNT_ID,
			destination_id: submission.earner.whopAccount.whopId,
			idempotence_key: idempotencyKey,
			notes: `Gig payment: ${submission.listing.title}`,
			metadata: {
				submissionId: submission.id,
				listingId: submission.listing.id,
			},
		}),
	});
	if (!transfer.ok)
		return NextResponse.json(
			{ error: "Failed to create transfer" },
			{ status: transfer.status },
		);
	const t = await transfer.json();

	const updated = await prisma.$transaction(async (tx) => {
		await createLedgerEntry(
			{
				amount: listingAmount,
				currency: submission.listing.currency,
				transactionType: "debit",
				description: `Payment for gig: ${submission.listing.title}`,
				idempotencyKey: `${idempotencyKey}_debit`,
				recruiterId: session.user!.id,
			},
			tx,
		);
		return tx.submission.update({
			where: { id: submission.id },
			data: { status: "Completed", transferId: t.id },
		});
	});

	return NextResponse.json({
		message: "Paid",
		submission: updated,
		transfer: { id: t.id, amount: earnerAmount },
	});
}
```

That's the core of the Mercor-style marketplace. Recruiters fund balances through payments, earners set up payout accounts (sub-accounts), and completed gigs transfer money to earners minus your platform fee.

Reference repository: [Mercor clone](https://github.com/whopio/mercor-clone)
