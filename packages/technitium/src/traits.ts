/**
 * Technitium SDK trait surface -- hand-written.
 *
 * Re-exports the protocol traits from core so generated operations import everything from one
 * place. Technitium needs no traits of its own: every call is a form-encoded POST
 * (`Http({ contentType: "form-urlencoded" })`), and secrets use `SensitiveValue`.
 */
export { Http, type HttpTrait } from "@distilled.cloud/core/trait";
export { SensitiveValue } from "@distilled.cloud/core/protocol-rest";
