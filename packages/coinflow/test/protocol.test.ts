import * as Coinflow from "@distilled.cloud/coinflow";
import * as Effect from "effect/Effect";
import * as HttpClient from "effect/http/HttpClient";
import * as HttpClientResponse from "effect/http/HttpClientResponse";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import { expect, test } from "vitest";

interface Recorded {
  readonly method: string;
  readonly url: string;
  readonly headers: Record<string, string>;
}

const run = <A, E>(
  effect: Effect.Effect<A, E, Coinflow.CoinflowOpContext>,
  respond: (request: Recorded) => Response,
) => {
  const requests: Recorded[] = [];
  const client = HttpClient.make((request) =>
    Effect.sync(() => {
      const recorded = {
        method: request.method,
        url: request.url,
        headers: { ...request.headers },
      };
      requests.push(recorded);
      return HttpClientResponse.fromWeb(request, respond(recorded));
    }),
  );
  return Effect.runPromise(
    effect.pipe(
      Coinflow.Retry.none,
      Effect.provide(
        Layer.mergeAll(
          Layer.succeed(HttpClient.HttpClient, client),
          Coinflow.credentials({ apiKey: Redacted.make("merchant-key") }),
        ),
      ),
      Effect.result,
    ),
  ).then((result) => ({ result, requests }));
};

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });

test("sends the merchant key as the raw Authorization header and the wallet headers", async () => {
  const { result, requests } = await run(
    Coinflow.withdraw.getWithdrawer({ authWallet: "0xabc", authBlockchain: "base" }),
    () => json(200, { withdrawer: {} }),
  );
  expect(result._tag).toBe("Success");
  expect(requests[0]!.method).toBe("GET");
  expect(requests[0]!.url).toBe("https://api-sandbox.coinflow.cash/api/withdraw");
  expect(requests[0]!.headers["authorization"]).toBe("merchant-key");
  expect(requests[0]!.headers["x-coinflow-auth-wallet"]).toBe("0xabc");
  expect(requests[0]!.headers["x-coinflow-auth-blockchain"]).toBe("base");
});

test("a 451 is VerificationRequired with the verification link", async () => {
  const { result } = await run(
    Coinflow.withdraw.getWithdrawer({ authWallet: "0xabc", authBlockchain: "base" }),
    () =>
      json(451, {
        verificationLink: "https://sandbox-merchant.coinflow.cash/verify/abc",
        verification: { status: "pending" },
        withdrawer: {},
      }),
  );
  expect(result._tag).toBe("Failure");
  if (result._tag !== "Failure") return;
  expect(result.failure._tag).toBe("VerificationRequired");
  if (result.failure._tag !== "VerificationRequired") return;
  expect(result.failure.body?.verificationLink).toBe(
    "https://sandbox-merchant.coinflow.cash/verify/abc",
  );
});

test("a 412 is PreconditionFailed with the `msg` as message", async () => {
  const { result } = await run(
    Coinflow.redeem.getEvmCreditsAuthMsg({
      authWallet: "0xabc",
      authBlockchain: "base",
    } as Coinflow.redeem.GetEvmCreditsAuthMsgRequest),
    () => json(412, { msg: "Wallet does not have enough credits" }),
  );
  expect(result._tag).toBe("Failure");
  if (result._tag !== "Failure") return;
  expect(result.failure._tag).toBe("PreconditionFailed");
  expect((result.failure as { message?: string }).message).toBe(
    "Wallet does not have enough credits",
  );
});

test("an undeclared status falls back to UnknownCoinflowError", async () => {
  const { result } = await run(Coinflow.merchant.getWithdrawal({ withdrawalId: "w1" }), () =>
    json(418, { msg: "teapot" }),
  );
  expect(result._tag).toBe("Failure");
  if (result._tag !== "Failure") return;
  expect(result.failure._tag).toBe("UnknownCoinflowError");
});

test("getSessionKey sends the user id and returns the key redacted", async () => {
  const { result, requests } = await run(
    Coinflow.authentication.getSessionKey({ authUserId: "user-1" }),
    () => json(200, { key: "session-secret" }),
  );
  expect(requests[0]!.headers["x-coinflow-auth-user-id"]).toBe("user-1");
  expect(result._tag).toBe("Success");
  if (result._tag !== "Success") return;
  expect(Redacted.isRedacted(result.success.key)).toBe(true);
  expect(Redacted.value(result.success.key as Redacted.Redacted<string>)).toBe("session-secret");
});

test("a session key input is sent unwrapped", async () => {
  const { requests } = await run(
    Coinflow.customers.getCheckoutBalances({
      merchantIdOrCreditSeed: "my-merchant",
      authSessionKey: Redacted.make("session-secret"),
    }),
    () => json(200, {}),
  );
  expect(requests[0]!.url).toBe(
    "https://api-sandbox.coinflow.cash/api/customer/balances/my-merchant",
  );
  expect(requests[0]!.headers["x-coinflow-auth-session-key"]).toBe("session-secret");
});
