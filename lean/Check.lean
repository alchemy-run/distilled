import Distilled
open Distilled

def check (what : String) (ok : Bool) : IO Bool := do
  IO.println s!"{if ok then "ok  " else "FAIL"} {what}"
  return ok

def bodyText (r : HttpRequest) : String := (String.fromUTF8? r.body).getD ""

def reply (status : Nat) (body : String) (headers : List (String × String) := []) : HttpResponse :=
  { status, headers, body := body.toUTF8 }

/-- List a bucket's first keys, through the generated S3 SDK. -/
def firstKeys (bucket : String) : Eff AWS.S3.api String (List String) := do
  match ← AWS.S3.listObjectsV2 { bucket, maxKeys := some 3 } with
  | .ok result => return (result.contents.getD []).filterMap (·.key)
  | .error (.noSuchBucket _) => throw "no such bucket"

/-- List the account's queues, through the generated SQS SDK. -/
def listQueues : Eff AWS.SQS.api String (List String) := do
  match ← AWS.SQS.listQueues {} with
  | .ok result => return result.queueUrls.getD []
  | .error (.requestThrottled _) => throw "throttled"
  | .error (.invalidAddress _) | .error (.invalidSecurity _) | .error (.unsupportedOperation _) =>
    throw "refused"

def main : IO UInt32 := do
  let mut all := true
  IO.println "-- hashes, signing, HTTP"
  all := (← check "sha256 of \"abc\""
    (hex (sha256 "abc".toUTF8) == "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad")) && all
  all := (← check "hmac-sha256, RFC 4231 case 2"
    (hex (hmacSha256 "Jefe".toUTF8 "what do ya want for nothing?".toUTF8)
      == "5bdcc146bf60754e6a042426089575c75a003f089d2739839dec58b964ec3843")) && all
  all := (← check "sigv4 signing key, AWS documentation example"
    (hex (AWS.signingKey "wJalrXUtnFEMI/K7MDENG+bPxRfiCYEXAMPLEKEY"
        { region := "us-east-1", service := "iam", time := "20120215T000000Z" })
      == "f4780e2d9f65fa895f9c67b32ce1baf0b0d8a43505a000a1a9e090d414db404d")) && all
  let listUsers : HttpRequest := {
    method := "GET", path := "/"
    query := [("Action", "ListUsers"), ("Version", "2010-05-08")]
    headers := [("Content-Type", "application/x-www-form-urlencoded; charset=utf-8"),
      ("Host", "iam.amazonaws.com"), ("X-Amz-Date", "20150830T123600Z")] }
  all := (← check "sigv4 signature, AWS documentation example"
    (AWS.signature listUsers ⟨"AKIDEXAMPLE", "wJalrXUtnFEMI/K7MDENG+bPxRfiCYEXAMPLEKEY", none⟩
        { region := "us-east-1", service := "iam", time := "20150830T123600Z" }
      == "5d672d79c15b13162d9279b0855cfba6789a8edb4c82c400e06b5924a6f2b5d7")) && all
  all := (← check "chunked response decoding"
    (match HttpResponse.decode
        "HTTP/1.1 200 OK\r\nTransfer-Encoding: chunked\r\n\r\n4\r\nWiki\r\n5\r\npedia\r\n0\r\n\r\n".toUTF8 with
      | .ok r => r.status == 200 && r.text == "Wikipedia"
      | .error _ => false)) && all
  all := (← check "base64 and the three time formats round-trip"
    (base64Encode "any carnal pleas".toUTF8 == "YW55IGNhcm5hbCBwbGVhcw=="
      && (base64Decode "YW55IGNhcm5hbCBwbGVhcw==").map (String.fromUTF8! ·) == some "any carnal pleas"
      && isoTime 1398796238 == "2014-04-29T18:30:38Z"
      && httpTime 1398796238 == "Tue, 29 Apr 2014 18:30:38 GMT"
      && parseIsoTime "2014-04-29T18:30:38Z" == some 1398796238
      && parseHttpTime "Tue, 29 Apr 2014 18:30:38 GMT" == some 1398796238)) && all

  IO.println "-- awsJson1_0 (SQS)"
  let r := AWS.SQS.wire.encode .createQueue
    { queueName := "jobs", attributes := some ⟨[(.visibilityTimeout, "30")]⟩ }
  all := (← check "request: target header and JSON body"
    (r.header "X-Amz-Target" == some "AmazonSQS.CreateQueue"
      && bodyText r == "{\"Attributes\":{\"VisibilityTimeout\":\"30\"},\"QueueName\":\"jobs\"}")) && all
  all := (← check "response: output"
    (match AWS.SQS.wire.decode .createQueue (reply 200 "{\"QueueUrl\":\"https://sqs/jobs\"}") with
      | some (.ok out) => out.queueUrl == some "https://sqs/jobs"
      | _ => false)) && all
  all := (← check "response: a typed error"
    (match AWS.SQS.wire.decode .getQueueUrl
        (reply 400 "{\"__type\":\"com.amazonaws.sqs#QueueDoesNotExist\",\"message\":\"gone\"}") with
      | some (.error (.queueDoesNotExist e)) => e.message == some "gone"
      | _ => false)) && all

  IO.println "-- awsQuery (SNS)"
  let r := AWS.SNS.wire.encode .createTopic
    { name := "alerts", tags := some [{ key := "team", value := "ops" }],
      attributes := some ⟨[("DisplayName", "Alerts")]⟩ }
  all := (← check "request: form body with a list and a map"
    (bodyText r == "Action=CreateTopic&Version=2010-03-31&Attributes.entry.1.key=DisplayName"
      ++ "&Attributes.entry.1.value=Alerts&Name=alerts&Tags.member.1.Key=team&Tags.member.1.Value=ops")) && all
  all := (← check "response: output inside the Result element"
    (match AWS.SNS.wire.decode .createTopic (reply 200
        "<CreateTopicResponse xmlns=\"http://sns.amazonaws.com/doc/2010-03-31/\"><CreateTopicResult><TopicArn>arn:aws:sns:us-east-1:1:alerts</TopicArn></CreateTopicResult><ResponseMetadata><RequestId>r</RequestId></ResponseMetadata></CreateTopicResponse>") with
      | some (.ok out) => out.topicArn == some "arn:aws:sns:us-east-1:1:alerts"
      | _ => false)) && all
  all := (← check "response: a typed error, found by its wire code"
    (match AWS.SNS.wire.decode .createTopic (reply 400
        "<ErrorResponse><Error><Type>Sender</Type><Code>InvalidParameter</Code><Message>bad name</Message></Error><RequestId>r</RequestId></ErrorResponse>") with
      | some (.error (.invalidParameterException _)) => true
      | _ => false)) && all

  IO.println "-- restJson1 (Lambda)"
  let r := AWS.Lambda.wire.encode .getFunction { functionName := "my fn", qualifier := some "live" }
  all := (← check "request: label in the path, member in the query, no body"
    (r.method == "GET" && r.path == "/2015-03-31/functions/my%20fn"
      && r.query == [("Qualifier", "live")] && r.body.isEmpty)) && all
  all := (← check "response: a typed error, named by a header"
    (match AWS.Lambda.wire.decode .getFunction (reply 404
        "{\"Message\":\"Function not found\",\"Type\":\"User\"}"
        [("x-amzn-ErrorType", "ResourceNotFoundException:http://internal.amazon.com/coral/")]) with
      | some (.error (.resourceNotFoundException e)) => e.message == some "Function not found"
      | _ => false)) && all

  IO.println "-- restXml (S3)"
  let r := AWS.S3.wire.encode .putBucketVersioning
    { bucket := "my-bucket", versioningConfiguration := { status := some .enabled },
      expectedBucketOwner := some "123456789012" }
  all := (← check "request: path, fixed query, header and XML payload"
    (r.method == "PUT" && r.path == "/my-bucket" && r.query == [("versioning", "")]
      && r.header "x-amz-expected-bucket-owner" == some "123456789012"
      && bodyText r == "<VersioningConfiguration xmlns=\"http://s3.amazonaws.com/doc/2006-03-01/\"><Status>Enabled</Status></VersioningConfiguration>")) && all
  all := (← check "response: a flattened list and a timestamp"
    (match AWS.S3.wire.decode .listObjectsV2 (reply 200
        "<?xml version=\"1.0\"?><ListBucketResult><Name>b</Name><KeyCount>2</KeyCount><IsTruncated>false</IsTruncated><Contents><Key>a.txt</Key><Size>3</Size><LastModified>2014-04-29T18:30:38.000Z</LastModified></Contents><Contents><Key>b &amp; c.txt</Key><Size>5</Size></Contents></ListBucketResult>") with
      | some (.ok out) =>
        (out.contents.getD []).map (·.key) == [some "a.txt", some "b & c.txt"]
          && ((out.contents.getD []).head?.bind (·.lastModified)) == some ⟨1398796238⟩
          && out.keyCount == some 2 && out.isTruncated == some false
      | _ => false)) && all
  all := (← check "response: a typed error"
    (match AWS.S3.wire.decode .listObjectsV2 (reply 404
        "<Error><Code>NoSuchBucket</Code><Message>The specified bucket does not exist</Message></Error>") with
      | some (.error (.noSuchBucket _)) => true
      | _ => false)) && all

  IO.println "-- ec2Query (EC2)"
  let r := AWS.EC2.wire.encode .describeVpcs { vpcIds := some ["vpc-1", "vpc-2"], maxResults := some 5 }
  all := (← check "request: capitalized names and flat lists"
    (bodyText r == "Action=DescribeVpcs&Version=2016-11-15&MaxResults=5&VpcId.1=vpc-1&VpcId.2=vpc-2")) && all
  all := (← check "response: a list of items"
    (match AWS.EC2.wire.decode .describeVpcs (reply 200
        "<DescribeVpcsResponse xmlns=\"http://ec2.amazonaws.com/doc/2016-11-15/\"><requestId>r</requestId><vpcSet><item><vpcId>vpc-1</vpcId><cidrBlock>10.0.0.0/16</cidrBlock><isDefault>false</isDefault></item></vpcSet></DescribeVpcsResponse>") with
      | some (.ok out) => (out.vpcs.getD []).map (·.cidrBlock) == [some "10.0.0.0/16"]
      | _ => false)) && all

  IO.println "-- live"
  -- a public bucket answers without credentials: a real typed call end to end
  let keys ← ((firstKeys "noaa-goes16").io AWS.S3.wire
    ({ host := "s3.amazonaws.com" } : Endpoint).send).toBaseIO
  let ok ← match keys with
    | .ok (.ok (.ok keys)) => do IO.println s!"     {keys}"; pure (keys.length == 3)
    | .ok (.ok (.error why)) => do IO.println s!"     {why}"; pure false
    | .ok (.error u) => do IO.println s!"     undescribed {u.response.status}: {u.response.text.take 200}"; pure false
    | .error e => do IO.println s!"     {e}"; pure false
  all := (← check "S3 ListObjectsV2 on a public bucket, over TLS, decoded to typed output" ok) && all
  let missing ← ((firstKeys "distilled-lean-no-such-bucket-7c1f").io AWS.S3.wire
    ({ host := "s3.amazonaws.com" } : Endpoint).send).toBaseIO
  all := (← check "S3 ListObjectsV2 on a missing bucket gives the typed NoSuchBucket"
    (match missing with
      | .ok (.ok (.error "no such bucket")) => true
      | _ => false)) && all
  let refused ← (do
    let _ ← ({ host := "wrong.host.badssl.com" } : Endpoint).send { method := "GET", path := "/" }
    pure false).toBaseIO.map (fun (r : Except IO.Error Bool) => match r with | .ok b => b | .error _ => true)
  all := (← check "a certificate for another name is refused" refused) && all
  let unsigned ← (listQueues.io AWS.SQS.wire ({ host := "sqs.us-east-1.amazonaws.com" } : Endpoint).send).toBaseIO
  all := (← check "SQS unsigned: a refusal its model does not list is reported as undescribed"
    (match unsigned with
      | .ok (.error u) => u.response.status == 403
      | _ => false)) && all
  match ← AWS.Credentials.fromEnv with
  | none => IO.println "skip signed calls: no AWS credentials in the environment"
  | some credentials =>
    let region := (← IO.getEnv "AWS_REGION").getD "us-east-1"
    let client := AWS.Client.make credentials region AWS.SQS.signingName
    let signed ← (listQueues.io AWS.SQS.wire client.send).toBaseIO
    let ok ← match signed with
      | .ok (.ok (.ok urls)) => do IO.println s!"     {urls.length} queues in {region}"; pure true
      | .ok (.ok (.error why)) => do IO.println s!"     {why}"; pure false
      | .ok (.error u) => do IO.println s!"     undescribed {u.response.status}: {u.response.text.take 160}"; pure false
      | .error e => do IO.println s!"     {e}"; pure false
    all := (← check "SQS signed: ListQueues answers" ok) && all
  return if all then 0 else 1
