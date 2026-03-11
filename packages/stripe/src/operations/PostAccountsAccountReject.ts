import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostAccountsAccountRejectInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    account: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.Array(Schema.String)),
    reason: Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/accounts/{account}/reject",
      contentType: "form-urlencoded",
    }),
  );
export type PostAccountsAccountRejectInput =
  typeof PostAccountsAccountRejectInput.Type;

// Output Schema
export const PostAccountsAccountRejectOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    business_profile: Schema.optional(Schema.Unknown),
    business_type: Schema.optional(
      Schema.NullOr(
        Schema.Literals([
          "company",
          "government_entity",
          "individual",
          "non_profit",
        ]),
      ),
    ),
    capabilities: Schema.optional(
      Schema.Struct({
        acss_debit_payments: Schema.optional(
          Schema.Literals(["active", "inactive", "pending"]),
        ),
        affirm_payments: Schema.optional(
          Schema.Literals(["active", "inactive", "pending"]),
        ),
        afterpay_clearpay_payments: Schema.optional(
          Schema.Literals(["active", "inactive", "pending"]),
        ),
        alma_payments: Schema.optional(
          Schema.Literals(["active", "inactive", "pending"]),
        ),
        amazon_pay_payments: Schema.optional(
          Schema.Literals(["active", "inactive", "pending"]),
        ),
        au_becs_debit_payments: Schema.optional(
          Schema.Literals(["active", "inactive", "pending"]),
        ),
        bacs_debit_payments: Schema.optional(
          Schema.Literals(["active", "inactive", "pending"]),
        ),
        bancontact_payments: Schema.optional(
          Schema.Literals(["active", "inactive", "pending"]),
        ),
        bank_transfer_payments: Schema.optional(
          Schema.Literals(["active", "inactive", "pending"]),
        ),
        billie_payments: Schema.optional(
          Schema.Literals(["active", "inactive", "pending"]),
        ),
        blik_payments: Schema.optional(
          Schema.Literals(["active", "inactive", "pending"]),
        ),
        boleto_payments: Schema.optional(
          Schema.Literals(["active", "inactive", "pending"]),
        ),
        card_issuing: Schema.optional(
          Schema.Literals(["active", "inactive", "pending"]),
        ),
        card_payments: Schema.optional(
          Schema.Literals(["active", "inactive", "pending"]),
        ),
        cartes_bancaires_payments: Schema.optional(
          Schema.Literals(["active", "inactive", "pending"]),
        ),
        cashapp_payments: Schema.optional(
          Schema.Literals(["active", "inactive", "pending"]),
        ),
        crypto_payments: Schema.optional(
          Schema.Literals(["active", "inactive", "pending"]),
        ),
        eps_payments: Schema.optional(
          Schema.Literals(["active", "inactive", "pending"]),
        ),
        fpx_payments: Schema.optional(
          Schema.Literals(["active", "inactive", "pending"]),
        ),
        gb_bank_transfer_payments: Schema.optional(
          Schema.Literals(["active", "inactive", "pending"]),
        ),
        giropay_payments: Schema.optional(
          Schema.Literals(["active", "inactive", "pending"]),
        ),
        grabpay_payments: Schema.optional(
          Schema.Literals(["active", "inactive", "pending"]),
        ),
        ideal_payments: Schema.optional(
          Schema.Literals(["active", "inactive", "pending"]),
        ),
        india_international_payments: Schema.optional(
          Schema.Literals(["active", "inactive", "pending"]),
        ),
        jcb_payments: Schema.optional(
          Schema.Literals(["active", "inactive", "pending"]),
        ),
        jp_bank_transfer_payments: Schema.optional(
          Schema.Literals(["active", "inactive", "pending"]),
        ),
        kakao_pay_payments: Schema.optional(
          Schema.Literals(["active", "inactive", "pending"]),
        ),
        klarna_payments: Schema.optional(
          Schema.Literals(["active", "inactive", "pending"]),
        ),
        konbini_payments: Schema.optional(
          Schema.Literals(["active", "inactive", "pending"]),
        ),
        kr_card_payments: Schema.optional(
          Schema.Literals(["active", "inactive", "pending"]),
        ),
        legacy_payments: Schema.optional(
          Schema.Literals(["active", "inactive", "pending"]),
        ),
        link_payments: Schema.optional(
          Schema.Literals(["active", "inactive", "pending"]),
        ),
        mb_way_payments: Schema.optional(
          Schema.Literals(["active", "inactive", "pending"]),
        ),
        mobilepay_payments: Schema.optional(
          Schema.Literals(["active", "inactive", "pending"]),
        ),
        multibanco_payments: Schema.optional(
          Schema.Literals(["active", "inactive", "pending"]),
        ),
        mx_bank_transfer_payments: Schema.optional(
          Schema.Literals(["active", "inactive", "pending"]),
        ),
        naver_pay_payments: Schema.optional(
          Schema.Literals(["active", "inactive", "pending"]),
        ),
        nz_bank_account_becs_debit_payments: Schema.optional(
          Schema.Literals(["active", "inactive", "pending"]),
        ),
        oxxo_payments: Schema.optional(
          Schema.Literals(["active", "inactive", "pending"]),
        ),
        p24_payments: Schema.optional(
          Schema.Literals(["active", "inactive", "pending"]),
        ),
        pay_by_bank_payments: Schema.optional(
          Schema.Literals(["active", "inactive", "pending"]),
        ),
        payco_payments: Schema.optional(
          Schema.Literals(["active", "inactive", "pending"]),
        ),
        paynow_payments: Schema.optional(
          Schema.Literals(["active", "inactive", "pending"]),
        ),
        payto_payments: Schema.optional(
          Schema.Literals(["active", "inactive", "pending"]),
        ),
        pix_payments: Schema.optional(
          Schema.Literals(["active", "inactive", "pending"]),
        ),
        promptpay_payments: Schema.optional(
          Schema.Literals(["active", "inactive", "pending"]),
        ),
        revolut_pay_payments: Schema.optional(
          Schema.Literals(["active", "inactive", "pending"]),
        ),
        samsung_pay_payments: Schema.optional(
          Schema.Literals(["active", "inactive", "pending"]),
        ),
        satispay_payments: Schema.optional(
          Schema.Literals(["active", "inactive", "pending"]),
        ),
        sepa_bank_transfer_payments: Schema.optional(
          Schema.Literals(["active", "inactive", "pending"]),
        ),
        sepa_debit_payments: Schema.optional(
          Schema.Literals(["active", "inactive", "pending"]),
        ),
        sofort_payments: Schema.optional(
          Schema.Literals(["active", "inactive", "pending"]),
        ),
        swish_payments: Schema.optional(
          Schema.Literals(["active", "inactive", "pending"]),
        ),
        tax_reporting_us_1099_k: Schema.optional(
          Schema.Literals(["active", "inactive", "pending"]),
        ),
        tax_reporting_us_1099_misc: Schema.optional(
          Schema.Literals(["active", "inactive", "pending"]),
        ),
        transfers: Schema.optional(
          Schema.Literals(["active", "inactive", "pending"]),
        ),
        treasury: Schema.optional(
          Schema.Literals(["active", "inactive", "pending"]),
        ),
        twint_payments: Schema.optional(
          Schema.Literals(["active", "inactive", "pending"]),
        ),
        us_bank_account_ach_payments: Schema.optional(
          Schema.Literals(["active", "inactive", "pending"]),
        ),
        us_bank_transfer_payments: Schema.optional(
          Schema.Literals(["active", "inactive", "pending"]),
        ),
        zip_payments: Schema.optional(
          Schema.Literals(["active", "inactive", "pending"]),
        ),
      }),
    ),
    charges_enabled: Schema.optional(Schema.Boolean),
    company: Schema.optional(
      Schema.Struct({
        address: Schema.optional(
          Schema.Struct({
            city: Schema.NullOr(Schema.String),
            country: Schema.NullOr(Schema.String),
            line1: Schema.NullOr(Schema.String),
            line2: Schema.NullOr(Schema.String),
            postal_code: Schema.NullOr(Schema.String),
            state: Schema.NullOr(Schema.String),
          }),
        ),
        address_kana: Schema.optional(Schema.Unknown),
        address_kanji: Schema.optional(Schema.Unknown),
        directors_provided: Schema.optional(Schema.Boolean),
        directorship_declaration: Schema.optional(Schema.Unknown),
        executives_provided: Schema.optional(Schema.Boolean),
        export_license_id: Schema.optional(Schema.String),
        export_purpose_code: Schema.optional(Schema.String),
        name: Schema.optional(Schema.NullOr(Schema.String)),
        name_kana: Schema.optional(Schema.NullOr(Schema.String)),
        name_kanji: Schema.optional(Schema.NullOr(Schema.String)),
        owners_provided: Schema.optional(Schema.Boolean),
        ownership_declaration: Schema.optional(Schema.Unknown),
        ownership_exemption_reason: Schema.optional(
          Schema.Literals([
            "qualified_entity_exceeds_ownership_threshold",
            "qualifies_as_financial_institution",
          ]),
        ),
        phone: Schema.optional(Schema.NullOr(Schema.String)),
        registration_date: Schema.optional(
          Schema.Struct({
            day: Schema.NullOr(Schema.Number),
            month: Schema.NullOr(Schema.Number),
            year: Schema.NullOr(Schema.Number),
          }),
        ),
        representative_declaration: Schema.optional(Schema.Unknown),
        structure: Schema.optional(
          Schema.Literals([
            "free_zone_establishment",
            "free_zone_llc",
            "government_instrumentality",
            "governmental_unit",
            "incorporated_non_profit",
            "incorporated_partnership",
            "limited_liability_partnership",
            "llc",
            "multi_member_llc",
            "private_company",
            "private_corporation",
            "private_partnership",
            "public_company",
            "public_corporation",
            "public_partnership",
            "registered_charity",
            "single_member_llc",
            "sole_establishment",
            "sole_proprietorship",
            "tax_exempt_government_instrumentality",
            "unincorporated_association",
            "unincorporated_non_profit",
            "unincorporated_partnership",
          ]),
        ),
        tax_id_provided: Schema.optional(Schema.Boolean),
        tax_id_registrar: Schema.optional(Schema.String),
        vat_id_provided: Schema.optional(Schema.Boolean),
        verification: Schema.optional(Schema.Unknown),
      }),
    ),
    controller: Schema.optional(
      Schema.Struct({
        fees: Schema.optional(
          Schema.Struct({
            payer: Schema.Literals([
              "account",
              "application",
              "application_custom",
              "application_express",
            ]),
          }),
        ),
        is_controller: Schema.optional(Schema.Boolean),
        losses: Schema.optional(
          Schema.Struct({
            payments: Schema.Literals(["application", "stripe"]),
          }),
        ),
        requirement_collection: Schema.optional(
          Schema.Literals(["application", "stripe"]),
        ),
        stripe_dashboard: Schema.optional(
          Schema.Struct({
            type: Schema.Literals(["express", "full", "none"]),
          }),
        ),
        type: Schema.Literals(["account", "application"]),
      }),
    ),
    country: Schema.optional(Schema.String),
    created: Schema.optional(Schema.Number),
    default_currency: Schema.optional(Schema.String),
    details_submitted: Schema.optional(Schema.Boolean),
    email: Schema.optional(Schema.NullOr(Schema.String)),
    external_accounts: Schema.optional(
      Schema.Struct({
        data: Schema.Array(Schema.Unknown),
        has_more: Schema.Boolean,
        object: Schema.Literals(["list"]),
        url: Schema.String,
      }),
    ),
    future_requirements: Schema.optional(
      Schema.Struct({
        alternatives: Schema.NullOr(
          Schema.Array(
            Schema.Struct({
              alternative_fields_due: Schema.Array(Schema.String),
              original_fields_due: Schema.Array(Schema.String),
            }),
          ),
        ),
        current_deadline: Schema.NullOr(Schema.Number),
        currently_due: Schema.NullOr(Schema.Array(Schema.String)),
        disabled_reason: Schema.NullOr(
          Schema.Literals([
            "action_required.requested_capabilities",
            "listed",
            "other",
            "platform_paused",
            "rejected.fraud",
            "rejected.incomplete_verification",
            "rejected.listed",
            "rejected.other",
            "rejected.platform_fraud",
            "rejected.platform_other",
            "rejected.platform_terms_of_service",
            "rejected.terms_of_service",
            "requirements.past_due",
            "requirements.pending_verification",
            "under_review",
          ]),
        ),
        errors: Schema.NullOr(
          Schema.Array(
            Schema.Struct({
              code: Schema.Literals([
                "external_request",
                "information_missing",
                "invalid_address_city_state_postal_code",
                "invalid_address_highway_contract_box",
                "invalid_address_private_mailbox",
                "invalid_business_profile_name",
                "invalid_business_profile_name_denylisted",
                "invalid_company_name_denylisted",
                "invalid_dob_age_over_maximum",
                "invalid_dob_age_under_18",
                "invalid_dob_age_under_minimum",
                "invalid_product_description_length",
                "invalid_product_description_url_match",
                "invalid_representative_country",
                "invalid_signator",
                "invalid_statement_descriptor_business_mismatch",
                "invalid_statement_descriptor_denylisted",
                "invalid_statement_descriptor_length",
                "invalid_statement_descriptor_prefix_denylisted",
                "invalid_statement_descriptor_prefix_mismatch",
                "invalid_street_address",
                "invalid_tax_id",
                "invalid_tax_id_format",
                "invalid_tos_acceptance",
                "invalid_url_denylisted",
                "invalid_url_format",
                "invalid_url_length",
                "invalid_url_web_presence_detected",
                "invalid_url_website_business_information_mismatch",
                "invalid_url_website_empty",
                "invalid_url_website_inaccessible",
                "invalid_url_website_inaccessible_geoblocked",
                "invalid_url_website_inaccessible_password_protected",
                "invalid_url_website_incomplete",
                "invalid_url_website_incomplete_cancellation_policy",
                "invalid_url_website_incomplete_customer_service_details",
                "invalid_url_website_incomplete_legal_restrictions",
                "invalid_url_website_incomplete_refund_policy",
                "invalid_url_website_incomplete_return_policy",
                "invalid_url_website_incomplete_terms_and_conditions",
                "invalid_url_website_incomplete_under_construction",
                "invalid_url_website_other",
                "invalid_value_other",
                "unsupported_business_type",
                "verification_directors_mismatch",
                "verification_document_address_mismatch",
                "verification_document_address_missing",
                "verification_document_corrupt",
                "verification_document_country_not_supported",
                "verification_document_directors_mismatch",
                "verification_document_dob_mismatch",
                "verification_document_duplicate_type",
                "verification_document_expired",
                "verification_document_failed_copy",
                "verification_document_failed_greyscale",
                "verification_document_failed_other",
                "verification_document_failed_test_mode",
                "verification_document_fraudulent",
                "verification_document_id_number_mismatch",
                "verification_document_id_number_missing",
                "verification_document_incomplete",
                "verification_document_invalid",
                "verification_document_issue_or_expiry_date_missing",
                "verification_document_manipulated",
                "verification_document_missing_back",
                "verification_document_missing_front",
                "verification_document_name_mismatch",
                "verification_document_name_missing",
                "verification_document_nationality_mismatch",
                "verification_document_not_readable",
                "verification_document_not_signed",
                "verification_document_not_uploaded",
                "verification_document_photo_mismatch",
                "verification_document_too_large",
                "verification_document_type_not_supported",
                "verification_extraneous_directors",
                "verification_failed_address_match",
                "verification_failed_authorizer_authority",
                "verification_failed_business_iec_number",
                "verification_failed_document_match",
                "verification_failed_id_number_match",
                "verification_failed_keyed_identity",
                "verification_failed_keyed_match",
                "verification_failed_name_match",
                "verification_failed_other",
                "verification_failed_representative_authority",
                "verification_failed_residential_address",
                "verification_failed_tax_id_match",
                "verification_failed_tax_id_not_issued",
                "verification_legal_entity_structure_mismatch",
                "verification_missing_directors",
                "verification_missing_executives",
                "verification_missing_owners",
                "verification_rejected_ownership_exemption_reason",
                "verification_requires_additional_memorandum_of_associations",
                "verification_requires_additional_proof_of_registration",
                "verification_supportability",
              ]),
              reason: Schema.String,
              requirement: Schema.String,
            }),
          ),
        ),
        eventually_due: Schema.NullOr(Schema.Array(Schema.String)),
        past_due: Schema.NullOr(Schema.Array(Schema.String)),
        pending_verification: Schema.NullOr(Schema.Array(Schema.String)),
      }),
    ),
    groups: Schema.optional(Schema.Unknown),
    id: Schema.String,
    individual: Schema.optional(
      Schema.Struct({
        account: Schema.optional(Schema.String),
        additional_tos_acceptances: Schema.optional(
          Schema.Struct({
            account: Schema.Unknown,
          }),
        ),
        address: Schema.optional(
          Schema.Struct({
            city: Schema.NullOr(Schema.String),
            country: Schema.NullOr(Schema.String),
            line1: Schema.NullOr(Schema.String),
            line2: Schema.NullOr(Schema.String),
            postal_code: Schema.NullOr(Schema.String),
            state: Schema.NullOr(Schema.String),
          }),
        ),
        address_kana: Schema.optional(Schema.Unknown),
        address_kanji: Schema.optional(Schema.Unknown),
        created: Schema.Number,
        dob: Schema.optional(
          Schema.Struct({
            day: Schema.NullOr(Schema.Number),
            month: Schema.NullOr(Schema.Number),
            year: Schema.NullOr(Schema.Number),
          }),
        ),
        email: Schema.optional(Schema.NullOr(Schema.String)),
        first_name: Schema.optional(Schema.NullOr(Schema.String)),
        first_name_kana: Schema.optional(Schema.NullOr(Schema.String)),
        first_name_kanji: Schema.optional(Schema.NullOr(Schema.String)),
        full_name_aliases: Schema.optional(Schema.Array(Schema.String)),
        future_requirements: Schema.optional(Schema.Unknown),
        gender: Schema.optional(Schema.NullOr(Schema.String)),
        id: Schema.String,
        id_number_provided: Schema.optional(Schema.Boolean),
        id_number_secondary_provided: Schema.optional(Schema.Boolean),
        last_name: Schema.optional(Schema.NullOr(Schema.String)),
        last_name_kana: Schema.optional(Schema.NullOr(Schema.String)),
        last_name_kanji: Schema.optional(Schema.NullOr(Schema.String)),
        maiden_name: Schema.optional(Schema.NullOr(Schema.String)),
        metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        nationality: Schema.optional(Schema.NullOr(Schema.String)),
        object: Schema.Literals(["person"]),
        phone: Schema.optional(Schema.NullOr(Schema.String)),
        political_exposure: Schema.optional(
          Schema.Literals(["existing", "none"]),
        ),
        registered_address: Schema.optional(
          Schema.Struct({
            city: Schema.NullOr(Schema.String),
            country: Schema.NullOr(Schema.String),
            line1: Schema.NullOr(Schema.String),
            line2: Schema.NullOr(Schema.String),
            postal_code: Schema.NullOr(Schema.String),
            state: Schema.NullOr(Schema.String),
          }),
        ),
        relationship: Schema.optional(
          Schema.Struct({
            authorizer: Schema.NullOr(Schema.Boolean),
            director: Schema.NullOr(Schema.Boolean),
            executive: Schema.NullOr(Schema.Boolean),
            legal_guardian: Schema.NullOr(Schema.Boolean),
            owner: Schema.NullOr(Schema.Boolean),
            percent_ownership: Schema.NullOr(Schema.Number),
            representative: Schema.NullOr(Schema.Boolean),
            title: Schema.NullOr(Schema.String),
          }),
        ),
        requirements: Schema.optional(Schema.Unknown),
        ssn_last_4_provided: Schema.optional(Schema.Boolean),
        us_cfpb_data: Schema.optional(Schema.Unknown),
        verification: Schema.optional(
          Schema.Struct({
            additional_document: Schema.optional(Schema.Unknown),
            details: Schema.optional(Schema.NullOr(Schema.String)),
            details_code: Schema.optional(Schema.NullOr(Schema.String)),
            document: Schema.optional(
              Schema.Struct({
                back: Schema.Unknown,
                details: Schema.NullOr(Schema.String),
                details_code: Schema.NullOr(Schema.String),
                front: Schema.Unknown,
              }),
            ),
            status: Schema.String,
          }),
        ),
      }),
    ),
    metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    object: Schema.Literals(["account"]),
    payouts_enabled: Schema.optional(Schema.Boolean),
    requirements: Schema.optional(
      Schema.Struct({
        alternatives: Schema.NullOr(
          Schema.Array(
            Schema.Struct({
              alternative_fields_due: Schema.Array(Schema.String),
              original_fields_due: Schema.Array(Schema.String),
            }),
          ),
        ),
        current_deadline: Schema.NullOr(Schema.Number),
        currently_due: Schema.NullOr(Schema.Array(Schema.String)),
        disabled_reason: Schema.NullOr(
          Schema.Literals([
            "action_required.requested_capabilities",
            "listed",
            "other",
            "platform_paused",
            "rejected.fraud",
            "rejected.incomplete_verification",
            "rejected.listed",
            "rejected.other",
            "rejected.platform_fraud",
            "rejected.platform_other",
            "rejected.platform_terms_of_service",
            "rejected.terms_of_service",
            "requirements.past_due",
            "requirements.pending_verification",
            "under_review",
          ]),
        ),
        errors: Schema.NullOr(
          Schema.Array(
            Schema.Struct({
              code: Schema.Literals([
                "external_request",
                "information_missing",
                "invalid_address_city_state_postal_code",
                "invalid_address_highway_contract_box",
                "invalid_address_private_mailbox",
                "invalid_business_profile_name",
                "invalid_business_profile_name_denylisted",
                "invalid_company_name_denylisted",
                "invalid_dob_age_over_maximum",
                "invalid_dob_age_under_18",
                "invalid_dob_age_under_minimum",
                "invalid_product_description_length",
                "invalid_product_description_url_match",
                "invalid_representative_country",
                "invalid_signator",
                "invalid_statement_descriptor_business_mismatch",
                "invalid_statement_descriptor_denylisted",
                "invalid_statement_descriptor_length",
                "invalid_statement_descriptor_prefix_denylisted",
                "invalid_statement_descriptor_prefix_mismatch",
                "invalid_street_address",
                "invalid_tax_id",
                "invalid_tax_id_format",
                "invalid_tos_acceptance",
                "invalid_url_denylisted",
                "invalid_url_format",
                "invalid_url_length",
                "invalid_url_web_presence_detected",
                "invalid_url_website_business_information_mismatch",
                "invalid_url_website_empty",
                "invalid_url_website_inaccessible",
                "invalid_url_website_inaccessible_geoblocked",
                "invalid_url_website_inaccessible_password_protected",
                "invalid_url_website_incomplete",
                "invalid_url_website_incomplete_cancellation_policy",
                "invalid_url_website_incomplete_customer_service_details",
                "invalid_url_website_incomplete_legal_restrictions",
                "invalid_url_website_incomplete_refund_policy",
                "invalid_url_website_incomplete_return_policy",
                "invalid_url_website_incomplete_terms_and_conditions",
                "invalid_url_website_incomplete_under_construction",
                "invalid_url_website_other",
                "invalid_value_other",
                "unsupported_business_type",
                "verification_directors_mismatch",
                "verification_document_address_mismatch",
                "verification_document_address_missing",
                "verification_document_corrupt",
                "verification_document_country_not_supported",
                "verification_document_directors_mismatch",
                "verification_document_dob_mismatch",
                "verification_document_duplicate_type",
                "verification_document_expired",
                "verification_document_failed_copy",
                "verification_document_failed_greyscale",
                "verification_document_failed_other",
                "verification_document_failed_test_mode",
                "verification_document_fraudulent",
                "verification_document_id_number_mismatch",
                "verification_document_id_number_missing",
                "verification_document_incomplete",
                "verification_document_invalid",
                "verification_document_issue_or_expiry_date_missing",
                "verification_document_manipulated",
                "verification_document_missing_back",
                "verification_document_missing_front",
                "verification_document_name_mismatch",
                "verification_document_name_missing",
                "verification_document_nationality_mismatch",
                "verification_document_not_readable",
                "verification_document_not_signed",
                "verification_document_not_uploaded",
                "verification_document_photo_mismatch",
                "verification_document_too_large",
                "verification_document_type_not_supported",
                "verification_extraneous_directors",
                "verification_failed_address_match",
                "verification_failed_authorizer_authority",
                "verification_failed_business_iec_number",
                "verification_failed_document_match",
                "verification_failed_id_number_match",
                "verification_failed_keyed_identity",
                "verification_failed_keyed_match",
                "verification_failed_name_match",
                "verification_failed_other",
                "verification_failed_representative_authority",
                "verification_failed_residential_address",
                "verification_failed_tax_id_match",
                "verification_failed_tax_id_not_issued",
                "verification_legal_entity_structure_mismatch",
                "verification_missing_directors",
                "verification_missing_executives",
                "verification_missing_owners",
                "verification_rejected_ownership_exemption_reason",
                "verification_requires_additional_memorandum_of_associations",
                "verification_requires_additional_proof_of_registration",
                "verification_supportability",
              ]),
              reason: Schema.String,
              requirement: Schema.String,
            }),
          ),
        ),
        eventually_due: Schema.NullOr(Schema.Array(Schema.String)),
        past_due: Schema.NullOr(Schema.Array(Schema.String)),
        pending_verification: Schema.NullOr(Schema.Array(Schema.String)),
      }),
    ),
    settings: Schema.optional(Schema.Unknown),
    tos_acceptance: Schema.optional(
      Schema.Struct({
        date: Schema.optional(Schema.NullOr(Schema.Number)),
        ip: Schema.optional(Schema.NullOr(Schema.String)),
        service_agreement: Schema.optional(Schema.String),
        user_agent: Schema.optional(Schema.NullOr(Schema.String)),
      }),
    ),
    type: Schema.optional(
      Schema.Literals(["custom", "express", "none", "standard"]),
    ),
  });
export type PostAccountsAccountRejectOutput =
  typeof PostAccountsAccountRejectOutput.Type;

// The operation
/**
 * Reject an account
 *
 * <p>With <a href="/connect">Connect</a>, you can reject accounts that you have flagged as suspicious.</p>
 * <p>Only accounts where your platform is liable for negative account balances, which includes Custom and Express accounts, can be rejected. Test-mode accounts can be rejected at any time. Live-mode accounts can only be rejected after all balances are zero.</p>
 */
export const PostAccountsAccountReject = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PostAccountsAccountRejectInput,
    outputSchema: PostAccountsAccountRejectOutput,
  }),
);
