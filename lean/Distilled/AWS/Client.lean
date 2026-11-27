import Distilled.Core
import Distilled.SigV4
import Std.Time
import Distilled.Bytes

/-!
# Calling AWS

Sends signed requests to a service in a region.
-/

namespace Distilled.AWS

structure Client where
  credentials : Credentials
  region : String
  /-- The name requests are signed for, such as `sqs`. -/
  service : String
  endpoint : Endpoint

def Client.make (credentials : Credentials) (region service : String) : Client :=
  { credentials, region, service, endpoint := { host := s!"{service}.{region}.amazonaws.com" } }

/-- Sign a request for now and send it. -/
def Client.send (client : Client) (request : HttpRequest) : IO HttpResponse := do
  let now ← Std.Time.Timestamp.now
  let epoch := now.toSecondsSinceUnixEpoch.val.toNat
  let scope : Scope := { region := client.region, service := client.service, time := amzTime epoch }
  client.endpoint.send (sign request client.endpoint.host client.credentials scope)

/-- Credentials from `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` and `AWS_SESSION_TOKEN`. -/
def Credentials.fromEnv : IO (Option Credentials) := do
  let some accessKeyId ← IO.getEnv "AWS_ACCESS_KEY_ID" | return none
  let some secretAccessKey ← IO.getEnv "AWS_SECRET_ACCESS_KEY" | return none
  return some { accessKeyId, secretAccessKey, sessionToken := ← IO.getEnv "AWS_SESSION_TOKEN" }

end Distilled.AWS
