import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetTaxTransactionsTransactionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    transaction: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/tax/transactions/{transaction}",
      contentType: "form-urlencoded",
    }),
  );
export type GetTaxTransactionsTransactionInput =
  typeof GetTaxTransactionsTransactionInput.Type;

// Output Schema
export const GetTaxTransactionsTransactionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    created: Schema.Number,
    currency: Schema.String,
    customer: Schema.NullOr(Schema.String),
    customer_details: Schema.Struct({
      address: Schema.Unknown,
      address_source: Schema.NullOr(Schema.Literals(["billing", "shipping"])),
      ip_address: Schema.NullOr(Schema.String),
      tax_ids: Schema.Array(
        Schema.Struct({
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
        }),
      ),
      taxability_override: Schema.Literals([
        "customer_exempt",
        "none",
        "reverse_charge",
      ]),
    }),
    id: Schema.String,
    line_items: Schema.optional(
      Schema.NullOr(
        Schema.Struct({
          data: Schema.Array(
            Schema.Struct({
              amount: Schema.Number,
              amount_tax: Schema.Number,
              id: Schema.String,
              livemode: Schema.Boolean,
              metadata: Schema.NullOr(
                Schema.Record(Schema.String, Schema.String),
              ),
              object: Schema.Literals(["tax.transaction_line_item"]),
              product: Schema.NullOr(Schema.String),
              quantity: Schema.Number,
              reference: Schema.String,
              reversal: Schema.Unknown,
              tax_behavior: Schema.Literals(["exclusive", "inclusive"]),
              tax_code: Schema.String,
              type: Schema.Literals(["reversal", "transaction"]),
            }),
          ),
          has_more: Schema.Boolean,
          object: Schema.Literals(["list"]),
          url: Schema.String,
        }),
      ),
    ),
    livemode: Schema.Boolean,
    metadata: Schema.NullOr(Schema.Record(Schema.String, Schema.String)),
    object: Schema.Literals(["tax.transaction"]),
    posted_at: Schema.Number,
    reference: Schema.String,
    reversal: Schema.Unknown,
    ship_from_details: Schema.Unknown,
    shipping_cost: Schema.Unknown,
    tax_date: Schema.Number,
    type: Schema.Literals(["reversal", "transaction"]),
  });
export type GetTaxTransactionsTransactionOutput =
  typeof GetTaxTransactionsTransactionOutput.Type;

// The operation
/**
 * Retrieve a transaction
 *
 * <p>Retrieves a Tax <code>Transaction</code> object.</p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 */
export const GetTaxTransactionsTransaction =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetTaxTransactionsTransactionInput,
    outputSchema: GetTaxTransactionsTransactionOutput,
  }));
