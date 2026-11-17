/**
 * The body of a 451 (Unavailable For Legal Reasons), shared by convert (the
 * Smithy shape the `VerificationRequired` error's `body` member targets) and
 * generate (that member's TS type).
 *
 * The members are those of the spec's five 451 schemas
 * (`VerificationRequiredResponse`, `WithdrawerVerificationRequiredResponse`,
 * `PayoutFromDelegatedSettlementWalletRequestUnavailableForLegalReasonsError`,
 * ...). They differ per operation, so every member is optional.
 */
export const VERIFICATION_REQUIRED_BODY = "VerificationRequiredBody";

export const VERIFICATION_REQUIRED_DOC =
  "The body of a 451 (Unavailable For Legal Reasons): the user must complete additional verification at `verificationLink` first.";

export const VERIFICATION_REQUIRED_MEMBERS: ReadonlyArray<{
  readonly name: string;
  readonly type: "string" | "unknown";
  readonly doc?: string;
}> = [
  {
    name: "verificationLink",
    type: "string",
    doc: "Link which can be hosted in an iframe or redirect the user to complete verification.",
  },
  {
    name: "redirectLink",
    type: "string",
    doc: "Link where the user will be redirected to upon successful verification.",
  },
  {
    name: "additionalVerificationLinks",
    type: "unknown",
    doc: "Additional links which can be hosted in an iframe or redirect the user to complete verification.",
  },
  {
    name: "rejectionReasons",
    type: "unknown",
    doc: "List of reasons as to why the verification was rejected.",
  },
  { name: "verification", type: "unknown" },
  { name: "withdrawer", type: "unknown" },
  { name: "message", type: "string" },
];
