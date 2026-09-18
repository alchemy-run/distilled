> ## Documentation Index
> Fetch the complete documentation index at: https://docs.whop.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Idempotent requests

> Retry POST requests with an idempotency key, so a request is never executed twice.

Every authenticated `POST` on the Whop API accepts an `Idempotency-Key` header. When a request with a key succeeds, its response is stored for 24 hours. Retrying with the same key replays the stored response instead of executing the request again. This makes it safe to retry a request that timed out or errored on your side without risking a duplicate charge, transfer, or resource.

Any unique string up to 255 bytes works as a key — a UUID is a good default. Generate a fresh key for every distinct operation, and reuse that exact key only to retry that operation.

```bash theme={null}
curl -X POST https://api.whop.com/api/v1/transfers \
  -H "Authorization: Bearer $WHOP_API_KEY" \
  -H "Idempotency-Key: d9105228-4a08-46b1-8b91-42fed586d383" \
  -H "Content-Type: application/json" \
  -d '{"amount": "10.00", "currency": "usd", "destination_id": "user_XXXXXXXX"}'
```

| Your retry                                         | You get                                                  |
| -------------------------------------------------- | -------------------------------------------------------- |
| Same key, same request                             | The original response, replayed — not a second execution |
| Same key, different request                        | A `400` error                                            |
| Same key, while the first request is still running | A `409` error — retry after the first request finishes   |
| Same key, more than 24 hours later                 | A fresh execution, as if the key were new                |

Replayed responses are byte-for-byte identical to the original — including the status code — and carry an `Idempotent-Replayed: true` header so you can tell a replay apart from a fresh execution.

<Note>
  **Error responses are replayed too.** If the original request failed with a `4xx`, retrying with the same key returns that same error. That failure was the real outcome of the request — send a new key with the corrected request instead.
</Note>

A few details worth knowing:

* "Same request" means the method, path, query string, body, and `Api-Version-Date` all match the original exactly. Any difference is treated as a key reuse and rejected with a `400`.
* Keys are scoped to the authenticated caller. Two different API keys or users can use the same key value without colliding.
* The header is ignored on unauthenticated requests and on non-`POST` methods — `GET`, `PATCH`, and `DELETE` requests are safe to retry.
* If a request fails in a way where the outcome is unknown (for example, a server crash mid-request), retries return a `409` until the key expires. The API never risks executing a request twice.
