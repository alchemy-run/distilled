import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostV2CoreAccountTokensInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    contact_email: Schema.optional(Schema.String),
    contact_phone: Schema.optional(Schema.String),
    display_name: Schema.optional(Schema.String),
    identity: Schema.optional(
      Schema.Struct({
        attestations: Schema.optional(
          Schema.Struct({
            directorship_declaration: Schema.optional(
              Schema.Struct({
                attested: Schema.optional(Schema.Boolean),
              }),
            ),
            ownership_declaration: Schema.optional(
              Schema.Struct({
                attested: Schema.optional(Schema.Boolean),
              }),
            ),
            persons_provided: Schema.optional(
              Schema.Struct({
                directors: Schema.optional(Schema.Boolean),
                executives: Schema.optional(Schema.Boolean),
                owners: Schema.optional(Schema.Boolean),
                ownership_exemption_reason: Schema.optional(
                  Schema.Literals([
                    "qualified_entity_exceeds_ownership_threshold",
                    "qualifies_as_financial_institution",
                  ]),
                ),
              }),
            ),
            representative_declaration: Schema.optional(
              Schema.Struct({
                attested: Schema.optional(Schema.Boolean),
              }),
            ),
            terms_of_service: Schema.optional(
              Schema.Struct({
                account: Schema.optional(
                  Schema.Struct({
                    shown_and_accepted: Schema.optional(Schema.Boolean),
                  }),
                ),
              }),
            ),
          }),
        ),
        business_details: Schema.optional(
          Schema.Struct({
            address: Schema.optional(
              Schema.Struct({
                city: Schema.optional(Schema.String),
                country: Schema.optional(Schema.String),
                line1: Schema.optional(Schema.String),
                line2: Schema.optional(Schema.String),
                postal_code: Schema.optional(Schema.String),
                state: Schema.optional(Schema.String),
                town: Schema.optional(Schema.String),
              }),
            ),
            annual_revenue: Schema.optional(
              Schema.Struct({
                amount: Schema.optional(
                  Schema.Struct({
                    currency: Schema.String,
                    value: Schema.Number,
                  }),
                ),
                fiscal_year_end: Schema.optional(Schema.String),
              }),
            ),
            documents: Schema.optional(
              Schema.Struct({
                bank_account_ownership_verification: Schema.optional(
                  Schema.Struct({
                    files: Schema.Array(Schema.String),
                    type: Schema.Literals(["files"]),
                  }),
                ),
                company_license: Schema.optional(
                  Schema.Struct({
                    files: Schema.Array(Schema.String),
                    type: Schema.Literals(["files"]),
                  }),
                ),
                company_memorandum_of_association: Schema.optional(
                  Schema.Struct({
                    files: Schema.Array(Schema.String),
                    type: Schema.Literals(["files"]),
                  }),
                ),
                company_ministerial_decree: Schema.optional(
                  Schema.Struct({
                    files: Schema.Array(Schema.String),
                    type: Schema.Literals(["files"]),
                  }),
                ),
                company_registration_verification: Schema.optional(
                  Schema.Struct({
                    files: Schema.Array(Schema.String),
                    type: Schema.Literals(["files"]),
                  }),
                ),
                company_tax_id_verification: Schema.optional(
                  Schema.Struct({
                    files: Schema.Array(Schema.String),
                    type: Schema.Literals(["files"]),
                  }),
                ),
                primary_verification: Schema.optional(
                  Schema.Struct({
                    front_back: Schema.Struct({
                      back: Schema.optional(Schema.String),
                      front: Schema.optional(Schema.String),
                    }),
                    type: Schema.Literals(["front_back"]),
                  }),
                ),
                proof_of_address: Schema.optional(
                  Schema.Struct({
                    files: Schema.Array(Schema.String),
                    type: Schema.Literals(["files"]),
                  }),
                ),
                proof_of_registration: Schema.optional(
                  Schema.Struct({
                    files: Schema.Array(Schema.String),
                    type: Schema.Literals(["files"]),
                  }),
                ),
                proof_of_ultimate_beneficial_ownership: Schema.optional(
                  Schema.Struct({
                    files: Schema.Array(Schema.String),
                    type: Schema.Literals(["files"]),
                  }),
                ),
              }),
            ),
            estimated_worker_count: Schema.optional(Schema.Number),
            id_numbers: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  registrar: Schema.optional(Schema.String),
                  type: Schema.Literals([
                    "ae_crn",
                    "ae_vat",
                    "ao_nif",
                    "ar_cuit",
                    "at_fn",
                    "at_stn",
                    "at_vat",
                    "au_abn",
                    "au_acn",
                    "au_in",
                    "az_tin",
                    "bd_etin",
                    "be_cbe",
                    "be_vat",
                    "bg_uic",
                    "bg_vat",
                    "br_cnpj",
                    "ca_cn",
                    "ca_crarr",
                    "ca_gst_hst",
                    "ca_neq",
                    "ca_rid",
                    "ch_chid",
                    "ch_uid",
                    "cr_cpj",
                    "cr_nite",
                    "cy_he",
                    "cy_tic",
                    "cy_vat",
                    "cz_ico",
                    "cz_vat",
                    "de_hrn",
                    "de_stn",
                    "de_vat",
                    "dk_cvr",
                    "dk_vat",
                    "do_rcn",
                    "ee_rk",
                    "ee_vat",
                    "es_cif",
                    "es_vat",
                    "fi_vat",
                    "fi_yt",
                    "fr_rna",
                    "fr_siren",
                    "fr_vat",
                    "gb_crn",
                    "gb_vat",
                    "gi_crn",
                    "gr_afm",
                    "gr_gemi",
                    "gr_vat",
                    "gt_nit",
                    "hk_br",
                    "hk_cr",
                    "hr_mbs",
                    "hr_oib",
                    "hr_vat",
                    "hu_cjs",
                    "hu_tin",
                    "hu_vat",
                    "ie_crn",
                    "ie_trn",
                    "ie_vat",
                    "it_rea",
                    "it_vat",
                    "jp_cn",
                    "kz_bin",
                    "li_uid",
                    "lt_ccrn",
                    "lt_vat",
                    "lu_nif",
                    "lu_rcs",
                    "lu_vat",
                    "lv_urn",
                    "lv_vat",
                    "mt_crn",
                    "mt_tin",
                    "mt_vat",
                    "mx_rfc",
                    "my_brn",
                    "my_coid",
                    "my_itn",
                    "my_sst",
                    "mz_nuit",
                    "nl_kvk",
                    "nl_rsin",
                    "nl_vat",
                    "no_orgnr",
                    "nz_bn",
                    "nz_ird",
                    "pe_ruc",
                    "pk_ntn",
                    "pl_nip",
                    "pl_regon",
                    "pl_vat",
                    "pt_vat",
                    "ro_cui",
                    "ro_orc",
                    "ro_vat",
                    "sa_crn",
                    "sa_tin",
                    "se_orgnr",
                    "se_vat",
                    "sg_uen",
                    "si_msp",
                    "si_tin",
                    "si_vat",
                    "sk_dic",
                    "sk_ico",
                    "sk_vat",
                    "th_crn",
                    "th_prn",
                    "th_tin",
                    "us_ein",
                  ]),
                  value: Schema.String,
                }),
              ),
            ),
            monthly_estimated_revenue: Schema.optional(
              Schema.Struct({
                amount: Schema.optional(
                  Schema.Struct({
                    currency: Schema.String,
                    value: Schema.Number,
                  }),
                ),
              }),
            ),
            phone: Schema.optional(Schema.String),
            registered_name: Schema.optional(Schema.String),
            registration_date: Schema.optional(
              Schema.Struct({
                day: Schema.Number,
                month: Schema.Number,
                year: Schema.Number,
              }),
            ),
            script_addresses: Schema.optional(
              Schema.Struct({
                kana: Schema.optional(
                  Schema.Struct({
                    city: Schema.optional(Schema.String),
                    country: Schema.optional(Schema.String),
                    line1: Schema.optional(Schema.String),
                    line2: Schema.optional(Schema.String),
                    postal_code: Schema.optional(Schema.String),
                    state: Schema.optional(Schema.String),
                    town: Schema.optional(Schema.String),
                  }),
                ),
                kanji: Schema.optional(
                  Schema.Struct({
                    city: Schema.optional(Schema.String),
                    country: Schema.optional(Schema.String),
                    line1: Schema.optional(Schema.String),
                    line2: Schema.optional(Schema.String),
                    postal_code: Schema.optional(Schema.String),
                    state: Schema.optional(Schema.String),
                    town: Schema.optional(Schema.String),
                  }),
                ),
              }),
            ),
            script_names: Schema.optional(
              Schema.Struct({
                kana: Schema.optional(
                  Schema.Struct({
                    registered_name: Schema.optional(Schema.String),
                  }),
                ),
                kanji: Schema.optional(
                  Schema.Struct({
                    registered_name: Schema.optional(Schema.String),
                  }),
                ),
              }),
            ),
            structure: Schema.optional(
              Schema.Literals([
                "cooperative",
                "free_zone_establishment",
                "free_zone_llc",
                "governmental_unit",
                "government_instrumentality",
                "incorporated_association",
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
                "public_listed_corporation",
                "public_partnership",
                "registered_charity",
                "single_member_llc",
                "sole_establishment",
                "sole_proprietorship",
                "tax_exempt_government_instrumentality",
                "trust",
                "unincorporated_association",
                "unincorporated_non_profit",
                "unincorporated_partnership",
              ]),
            ),
          }),
        ),
        entity_type: Schema.optional(
          Schema.Literals([
            "company",
            "government_entity",
            "individual",
            "non_profit",
          ]),
        ),
        individual: Schema.optional(
          Schema.Struct({
            additional_addresses: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  city: Schema.optional(Schema.String),
                  country: Schema.optional(Schema.String),
                  line1: Schema.optional(Schema.String),
                  line2: Schema.optional(Schema.String),
                  postal_code: Schema.optional(Schema.String),
                  purpose: Schema.Literals(["registered"]),
                  state: Schema.optional(Schema.String),
                  town: Schema.optional(Schema.String),
                }),
              ),
            ),
            additional_names: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  full_name: Schema.optional(Schema.String),
                  given_name: Schema.optional(Schema.String),
                  purpose: Schema.Literals(["alias", "maiden"]),
                  surname: Schema.optional(Schema.String),
                }),
              ),
            ),
            address: Schema.optional(
              Schema.Struct({
                city: Schema.optional(Schema.String),
                country: Schema.optional(Schema.String),
                line1: Schema.optional(Schema.String),
                line2: Schema.optional(Schema.String),
                postal_code: Schema.optional(Schema.String),
                state: Schema.optional(Schema.String),
                town: Schema.optional(Schema.String),
              }),
            ),
            date_of_birth: Schema.optional(
              Schema.Struct({
                day: Schema.Number,
                month: Schema.Number,
                year: Schema.Number,
              }),
            ),
            documents: Schema.optional(
              Schema.Struct({
                company_authorization: Schema.optional(
                  Schema.Struct({
                    files: Schema.Array(Schema.String),
                    type: Schema.Literals(["files"]),
                  }),
                ),
                passport: Schema.optional(
                  Schema.Struct({
                    files: Schema.Array(Schema.String),
                    type: Schema.Literals(["files"]),
                  }),
                ),
                primary_verification: Schema.optional(
                  Schema.Struct({
                    front_back: Schema.Struct({
                      back: Schema.optional(Schema.String),
                      front: Schema.optional(Schema.String),
                    }),
                    type: Schema.Literals(["front_back"]),
                  }),
                ),
                secondary_verification: Schema.optional(
                  Schema.Struct({
                    front_back: Schema.Struct({
                      back: Schema.optional(Schema.String),
                      front: Schema.optional(Schema.String),
                    }),
                    type: Schema.Literals(["front_back"]),
                  }),
                ),
                visa: Schema.optional(
                  Schema.Struct({
                    files: Schema.Array(Schema.String),
                    type: Schema.Literals(["files"]),
                  }),
                ),
              }),
            ),
            email: Schema.optional(Schema.String),
            given_name: Schema.optional(Schema.String),
            id_numbers: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  type: Schema.Literals([
                    "ae_eid",
                    "ao_nif",
                    "ar_cuil",
                    "ar_dni",
                    "at_stn",
                    "az_tin",
                    "bd_brc",
                    "bd_etin",
                    "bd_nid",
                    "be_nrn",
                    "bg_ucn",
                    "bn_nric",
                    "br_cpf",
                    "ca_sin",
                    "ch_oasi",
                    "cl_rut",
                    "cn_pp",
                    "co_nuip",
                    "cr_ci",
                    "cr_cpf",
                    "cr_dimex",
                    "cr_nite",
                    "cy_tic",
                    "cz_rc",
                    "de_stn",
                    "dk_cpr",
                    "do_cie",
                    "do_rcn",
                    "ec_ci",
                    "ee_ik",
                    "es_nif",
                    "fi_hetu",
                    "fr_nir",
                    "gb_nino",
                    "gr_afm",
                    "gt_nit",
                    "hk_id",
                    "hr_oib",
                    "hu_ad",
                    "id_nik",
                    "ie_ppsn",
                    "is_kt",
                    "it_cf",
                    "jp_inc",
                    "ke_pin",
                    "kz_iin",
                    "li_peid",
                    "lt_ak",
                    "lu_nif",
                    "lv_pk",
                    "mx_rfc",
                    "my_nric",
                    "mz_nuit",
                    "ng_nin",
                    "nl_bsn",
                    "no_nin",
                    "nz_ird",
                    "pe_dni",
                    "pk_cnic",
                    "pk_snic",
                    "pl_pesel",
                    "pt_nif",
                    "ro_cnp",
                    "sa_tin",
                    "se_pin",
                    "sg_fin",
                    "sg_nric",
                    "sk_dic",
                    "th_lc",
                    "th_pin",
                    "tr_tin",
                    "us_itin",
                    "us_itin_last_4",
                    "us_ssn",
                    "us_ssn_last_4",
                    "uy_dni",
                    "za_id",
                  ]),
                  value: Schema.String,
                }),
              ),
            ),
            legal_gender: Schema.optional(Schema.Literals(["female", "male"])),
            metadata: Schema.optional(
              Schema.Record(Schema.String, Schema.NullOr(Schema.String)),
            ),
            nationalities: Schema.optional(Schema.Array(Schema.String)),
            phone: Schema.optional(Schema.String),
            political_exposure: Schema.optional(
              Schema.Literals(["existing", "none"]),
            ),
            relationship: Schema.optional(
              Schema.Struct({
                director: Schema.optional(Schema.Boolean),
                executive: Schema.optional(Schema.Boolean),
                owner: Schema.optional(Schema.Boolean),
                percent_ownership: Schema.optional(Schema.String),
                title: Schema.optional(Schema.String),
              }),
            ),
            script_addresses: Schema.optional(
              Schema.Struct({
                kana: Schema.optional(
                  Schema.Struct({
                    city: Schema.optional(Schema.String),
                    country: Schema.optional(Schema.String),
                    line1: Schema.optional(Schema.String),
                    line2: Schema.optional(Schema.String),
                    postal_code: Schema.optional(Schema.String),
                    state: Schema.optional(Schema.String),
                    town: Schema.optional(Schema.String),
                  }),
                ),
                kanji: Schema.optional(
                  Schema.Struct({
                    city: Schema.optional(Schema.String),
                    country: Schema.optional(Schema.String),
                    line1: Schema.optional(Schema.String),
                    line2: Schema.optional(Schema.String),
                    postal_code: Schema.optional(Schema.String),
                    state: Schema.optional(Schema.String),
                    town: Schema.optional(Schema.String),
                  }),
                ),
              }),
            ),
            script_names: Schema.optional(
              Schema.Struct({
                kana: Schema.optional(
                  Schema.Struct({
                    given_name: Schema.optional(Schema.String),
                    surname: Schema.optional(Schema.String),
                  }),
                ),
                kanji: Schema.optional(
                  Schema.Struct({
                    given_name: Schema.optional(Schema.String),
                    surname: Schema.optional(Schema.String),
                  }),
                ),
              }),
            ),
            surname: Schema.optional(Schema.String),
          }),
        ),
      }),
    ),
  }).pipe(T.Http({ method: "POST", path: "/v2/core/account_tokens" }));
export type PostV2CoreAccountTokensInput =
  typeof PostV2CoreAccountTokensInput.Type;

// Output Schema
export const PostV2CoreAccountTokensOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    created: Schema.String,
    expires_at: Schema.String,
    id: Schema.String,
    livemode: Schema.Boolean,
    object: Schema.Literals(["v2.core.account_token"]),
    used: Schema.Boolean,
  });
export type PostV2CoreAccountTokensOutput =
  typeof PostV2CoreAccountTokensOutput.Type;

// The operation
/**
 * Create an Account Token
 *
 * Creates an Account Token.
 */
export const PostV2CoreAccountTokens = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PostV2CoreAccountTokensInput,
    outputSchema: PostV2CoreAccountTokensOutput,
  }),
);
