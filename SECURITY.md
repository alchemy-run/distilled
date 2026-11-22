# Security policy

distilled SDKs hold cloud credentials, so we treat a security bug in them as
urgent.

## Report a vulnerability

Do not open a public issue, pull request or discussion for a vulnerability.

Report it privately through GitHub:
[Report a vulnerability](https://github.com/alchemy-run/distilled/security/advisories/new).
Only the maintainers can read the report. Include:

- the package and version, for example `@distilled.cloud/aws@1.0.0-rc.20`
- the operation or code path, and what an attacker gains
- the steps or a small program that shows the problem

We answer in the advisory, agree on a fix and a release with you, and credit
you in the advisory unless you ask us not to.

## What counts

Examples of what we want to hear about:

- a secret that reaches a log, an error message or a trace in plain text,
  for example a token that the caller wrapped in `Redacted`
- a request signed or sent to a host the caller did not choose
- a response that makes the SDK run code, read a local file or crash the
  caller's program
- a problem in a published `@distilled.cloud/*` package or in the release
  workflow that builds it

A bug in a cloud provider's own API belongs with that provider.

## Supported versions

We fix security bugs in the newest release on npm, the `latest` dist-tag.
distilled is in release candidates (`1.0.0-rc.*`), so a fix ships as a new
release candidate. We do not patch older ones.
