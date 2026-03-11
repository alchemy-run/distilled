import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetCustomersCustomerTaxIdsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    customer: Schema.String.pipe(T.PathParam()),
    ending_before: Schema.optional(Schema.String),
    expand: Schema.optional(Schema.String),
    limit: Schema.optional(Schema.Number),
    starting_after: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/customers/{customer}/tax_ids",
      contentType: "form-urlencoded",
    }),
  );
export type GetCustomersCustomerTaxIdsInput =
  typeof GetCustomersCustomerTaxIdsInput.Type;

// Output Schema
export const GetCustomersCustomerTaxIdsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    data: Schema.Array(
      Schema.Struct({
        country: Schema.NullOr(Schema.String),
        created: Schema.Number,
        customer: Schema.Unknown,
        customer_account: Schema.NullOr(Schema.String),
        id: Schema.String,
        livemode: Schema.Boolean,
        object: Schema.Literals(["tax_id"]),
        owner: Schema.Unknown,
        type: Schema.Literals([
          "ad_nrt",
          "ae_trn",
          "al_tin",
          "am_tin",
          "ao_tin",
          "ar_cuit",
          "au_abn",
          "au_arn",
          "aw_tin",
          "az_tin",
          "ba_tin",
          "bb_tin",
          "bd_bin",
          "bf_ifu",
          "bg_uic",
          "bh_vat",
          "bj_ifu",
          "bo_tin",
          "br_cnpj",
          "br_cpf",
          "bs_tin",
          "by_tin",
          "ca_bn",
          "ca_gst_hst",
          "ca_pst_bc",
          "ca_pst_mb",
          "ca_pst_sk",
          "ca_qst",
          "cd_nif",
          "ch_uid",
          "ch_vat",
          "cl_tin",
          "cm_niu",
          "cn_tin",
          "co_nit",
          "cr_tin",
          "cv_nif",
          "de_stn",
          "do_rcn",
          "ec_ruc",
          "eg_tin",
          "es_cif",
          "et_tin",
          "eu_oss_vat",
          "eu_vat",
          "gb_vat",
          "ge_vat",
          "gn_nif",
          "hk_br",
          "hr_oib",
          "hu_tin",
          "id_npwp",
          "il_vat",
          "in_gst",
          "is_vat",
          "jp_cn",
          "jp_rn",
          "jp_trn",
          "ke_pin",
          "kg_tin",
          "kh_tin",
          "kr_brn",
          "kz_bin",
          "la_tin",
          "li_uid",
          "li_vat",
          "lk_vat",
          "ma_vat",
          "md_vat",
          "me_pib",
          "mk_vat",
          "mr_nif",
          "mx_rfc",
          "my_frp",
          "my_itn",
          "my_sst",
          "ng_tin",
          "no_vat",
          "no_voec",
          "np_pan",
          "nz_gst",
          "om_vat",
          "pe_ruc",
          "ph_tin",
          "pl_nip",
          "ro_tin",
          "rs_pib",
          "ru_inn",
          "ru_kpp",
          "sa_vat",
          "sg_gst",
          "sg_uen",
          "si_tin",
          "sn_ninea",
          "sr_fin",
          "sv_nit",
          "th_vat",
          "tj_tin",
          "tr_tin",
          "tw_vat",
          "tz_vat",
          "ua_vat",
          "ug_tin",
          "unknown",
          "us_ein",
          "uy_ruc",
          "uz_tin",
          "uz_vat",
          "ve_rif",
          "vn_tin",
          "za_vat",
          "zm_tin",
          "zw_tin",
        ]),
        value: Schema.String,
        verification: Schema.Unknown,
      }),
    ),
    has_more: Schema.Boolean,
    object: Schema.Literals(["list"]),
    url: Schema.String,
  });
export type GetCustomersCustomerTaxIdsOutput =
  typeof GetCustomersCustomerTaxIdsOutput.Type;

// The operation
/**
 * List all Customer tax IDs
 *
 * <p>Returns a list of tax IDs for a customer.</p>
 *
 * @param ending_before - A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.
 * @param expand - Specifies which fields in the response should be expanded.
 * @param limit - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 * @param starting_after - A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.
 */
export const GetCustomersCustomerTaxIds = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetCustomersCustomerTaxIdsInput,
    outputSchema: GetCustomersCustomerTaxIdsOutput,
  }),
);
