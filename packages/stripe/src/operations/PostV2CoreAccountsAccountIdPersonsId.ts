import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostV2CoreAccountsAccountIdPersonsIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    account_id: Schema.String.pipe(T.PathParam()),
    id: Schema.String.pipe(T.PathParam()),
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
    additional_terms_of_service: Schema.optional(
      Schema.Struct({
        account: Schema.optional(
          Schema.Struct({
            date: Schema.optional(Schema.String),
            ip: Schema.optional(Schema.String),
            user_agent: Schema.optional(Schema.String),
          }),
        ),
      }),
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
    person_token: Schema.optional(Schema.String),
    phone: Schema.optional(Schema.String),
    political_exposure: Schema.optional(Schema.Literals(["existing", "none"])),
    relationship: Schema.optional(
      Schema.Struct({
        authorizer: Schema.optional(Schema.Boolean),
        director: Schema.optional(Schema.Boolean),
        executive: Schema.optional(Schema.Boolean),
        legal_guardian: Schema.optional(Schema.Boolean),
        owner: Schema.optional(Schema.Boolean),
        percent_ownership: Schema.optional(Schema.String),
        representative: Schema.optional(Schema.Boolean),
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
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v2/core/accounts/{account_id}/persons/{id}",
    }),
  );
export type PostV2CoreAccountsAccountIdPersonsIdInput =
  typeof PostV2CoreAccountsAccountIdPersonsIdInput.Type;

// Output Schema
export const PostV2CoreAccountsAccountIdPersonsIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    account: Schema.String,
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
    additional_terms_of_service: Schema.optional(
      Schema.Struct({
        account: Schema.optional(
          Schema.Struct({
            date: Schema.optional(Schema.String),
            ip: Schema.optional(Schema.String),
            user_agent: Schema.optional(Schema.String),
          }),
        ),
      }),
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
    created: Schema.String,
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
              front: Schema.String,
            }),
            type: Schema.Literals(["front_back"]),
          }),
        ),
        secondary_verification: Schema.optional(
          Schema.Struct({
            front_back: Schema.Struct({
              back: Schema.optional(Schema.String),
              front: Schema.String,
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
    id: Schema.String,
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
        }),
      ),
    ),
    legal_gender: Schema.optional(Schema.Literals(["female", "male"])),
    livemode: Schema.Boolean,
    metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    nationalities: Schema.optional(Schema.Array(Schema.String)),
    object: Schema.Literals(["v2.core.account_person"]),
    phone: Schema.optional(Schema.String),
    political_exposure: Schema.optional(Schema.Literals(["existing", "none"])),
    relationship: Schema.optional(
      Schema.Struct({
        authorizer: Schema.optional(Schema.Boolean),
        director: Schema.optional(Schema.Boolean),
        executive: Schema.optional(Schema.Boolean),
        legal_guardian: Schema.optional(Schema.Boolean),
        owner: Schema.optional(Schema.Boolean),
        percent_ownership: Schema.optional(Schema.String),
        representative: Schema.optional(Schema.Boolean),
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
    updated: Schema.String,
  });
export type PostV2CoreAccountsAccountIdPersonsIdOutput =
  typeof PostV2CoreAccountsAccountIdPersonsIdOutput.Type;

// The operation
/**
 * Update a person
 *
 * Updates a Person associated with an Account.
 *
 * @param account_id - The Account the Person is associated with.
 * @param id - The ID of the Person to update.
 */
export const PostV2CoreAccountsAccountIdPersonsId =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PostV2CoreAccountsAccountIdPersonsIdInput,
    outputSchema: PostV2CoreAccountsAccountIdPersonsIdOutput,
  }));
