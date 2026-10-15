import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import { SensitiveString } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Payment Cryptography Data",
  serviceShapeName: "PaymentCryptographyDataPlane",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "payment-cryptography" });
const ver = /*@__PURE__*/ T.ServiceVersion("2022-02-03");
const proto = /*@__PURE__*/ T.AwsProtocolsRestJson1();
const rules = /*@__PURE__*/ T.EndpointResolver((p, _) => {
  const { Region, UseDualStack = false, UseFIPS = false, Endpoint } = p;
  const e = (u: unknown, p = {}, h = {}): T.EndpointResolverResult => ({
    type: "endpoint" as const,
    endpoint: { url: u as string, properties: p, headers: h },
  });
  const err = (m: unknown): T.EndpointResolverResult => ({
    type: "error" as const,
    message: m as string,
  });
  if (Endpoint != null) {
    if (UseFIPS === true) {
      return err("Invalid Configuration: FIPS and custom endpoint are not supported");
    }
    if (UseDualStack === true) {
      return err("Invalid Configuration: Dualstack and custom endpoint are not supported");
    }
    return e(Endpoint);
  }
  if (Region != null) {
    {
      const PartitionResult = _.partition(Region);
      if (PartitionResult != null && PartitionResult !== false) {
        if (UseFIPS === true && UseDualStack === true) {
          if (
            true === _.getAttr(PartitionResult, "supportsFIPS") &&
            true === _.getAttr(PartitionResult, "supportsDualStack")
          ) {
            return e(
              `https://dataplane.payment-cryptography-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://dataplane.payment-cryptography-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://dataplane.payment-cryptography.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(
          `https://dataplane.payment-cryptography.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://dataplane.payment-cryptography.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      ResourceId: /*@__PURE__*/ S.optional(S.String),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()("ValidationException", {
    message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
    fieldList: /*@__PURE__*/ S.optional(
      /*@__PURE__*/ S.suspend(() => __S(241, __c15, 1)).annotate({
        identifier: "ValidationExceptionFieldList",
      }),
    ),
  }) {}
export class VerificationFailedException
  extends /*@__PURE__*/ S.TaggedError<VerificationFailedException>()(
    "VerificationFailedException",
    { Reason: S.String, message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type KeyArnOrKeyAliasType = string;
export type CipherTextType = string | redacted.Redacted<string>;
export type EncryptionMode =
  | "ECB"
  | "CBC"
  | "CFB"
  | "CFB1"
  | "CFB8"
  | "CFB64"
  | "CFB128"
  | "OFB"
  | (string & {});
export type InitializationVectorType = string | redacted.Redacted<string>;
export type PaddingType = "PKCS1" | "OAEP_SHA1" | "OAEP_SHA256" | "OAEP_SHA512" | (string & {});
export interface SymmetricEncryptionAttributes {
  Mode: EncryptionMode;
  InitializationVector?: string | redacted.Redacted<string>;
  PaddingType?: PaddingType;
}
export interface AsymmetricEncryptionAttributes {
  PaddingType?: PaddingType;
}
export type HexLength16Or20Or24 = string;
export type DukptEncryptionMode = "ECB" | "CBC" | (string & {});
export type DukptDerivationType =
  | "TDES_2KEY"
  | "TDES_3KEY"
  | "AES_128"
  | "AES_192"
  | "AES_256"
  | (string & {});
export type DukptKeyVariant = "BIDIRECTIONAL" | "REQUEST" | "RESPONSE" | (string & {});
export interface DukptEncryptionAttributes {
  KeySerialNumber: string;
  Mode?: DukptEncryptionMode;
  DukptKeyDerivationType?: DukptDerivationType;
  DukptKeyVariant?: DukptKeyVariant;
  InitializationVector?: string | redacted.Redacted<string>;
}
export type EmvMajorKeyDerivationMode = "EMV_OPTION_A" | "EMV_OPTION_B" | (string & {});
export type PrimaryAccountNumberType = string | redacted.Redacted<string>;
export type NumberLengthEquals2 = string;
export type SessionDerivationDataType = string | redacted.Redacted<string>;
export type EmvEncryptionMode = "ECB" | "CBC" | (string & {});
export interface EmvEncryptionAttributes {
  MajorKeyDerivationMode: EmvMajorKeyDerivationMode;
  PrimaryAccountNumber: string | redacted.Redacted<string>;
  PanSequenceNumber: string;
  SessionDerivationData: string | redacted.Redacted<string>;
  Mode?: EmvEncryptionMode;
  InitializationVector?: string | redacted.Redacted<string>;
}
export type EncryptionDecryptionAttributes =
  | { Symmetric: SymmetricEncryptionAttributes; Asymmetric?: never; Dukpt?: never; Emv?: never }
  | { Symmetric?: never; Asymmetric: AsymmetricEncryptionAttributes; Dukpt?: never; Emv?: never }
  | { Symmetric?: never; Asymmetric?: never; Dukpt: DukptEncryptionAttributes; Emv?: never }
  | { Symmetric?: never; Asymmetric?: never; Dukpt?: never; Emv: EmvEncryptionAttributes };
export type Tr31WrappedKeyBlock = string | redacted.Redacted<string>;
export type CertificateType = string;
export type SymmetricKeyAlgorithm =
  | "TDES_2KEY"
  | "TDES_3KEY"
  | "AES_128"
  | "AES_192"
  | "AES_256"
  | "HMAC_SHA256"
  | "HMAC_SHA384"
  | "HMAC_SHA512"
  | "HMAC_SHA224"
  | (string & {});
export type KeyDerivationFunction = "NIST_SP800" | "ANSI_X963" | (string & {});
export type KeyDerivationHashAlgorithm = "SHA_256" | "SHA_384" | "SHA_512" | (string & {});
export type SharedInformation = string;
export interface EcdhDerivationAttributes {
  CertificateAuthorityPublicKeyIdentifier: string;
  PublicKeyCertificate: string;
  KeyAlgorithm: SymmetricKeyAlgorithm;
  KeyDerivationFunction: KeyDerivationFunction;
  KeyDerivationHashAlgorithm: KeyDerivationHashAlgorithm;
  SharedInformation: string;
}
export type WrappedKeyMaterial =
  | { Tr31KeyBlock: string | redacted.Redacted<string>; DiffieHellmanSymmetricKey?: never }
  | { Tr31KeyBlock?: never; DiffieHellmanSymmetricKey: EcdhDerivationAttributes };
export type KeyCheckValueAlgorithm = string;
export interface WrappedKey {
  WrappedKeyMaterial: WrappedKeyMaterial;
  KeyCheckValueAlgorithm?: string;
}
export interface DecryptDataInput {
  KeyIdentifier: string;
  CipherText: string | redacted.Redacted<string>;
  DecryptionAttributes: EncryptionDecryptionAttributes;
  WrappedKey?: WrappedKey;
}
export type KeyArn = string;
export type KeyCheckValue = string;
export type PlainTextOutputType = string | redacted.Redacted<string>;
export interface DecryptDataOutput {
  KeyArn: string;
  KeyCheckValue: string;
  PlainText: string | redacted.Redacted<string>;
}
export type PlainTextType = string | redacted.Redacted<string>;
export interface EncryptDataInput {
  KeyIdentifier: string;
  PlainText: string | redacted.Redacted<string>;
  EncryptionAttributes: EncryptionDecryptionAttributes;
  WrappedKey?: WrappedKey;
}
export interface EncryptDataOutput {
  KeyArn: string;
  KeyCheckValue?: string;
  CipherText: string | redacted.Redacted<string>;
}
export type RandomKeyMaxLength = "BYTES_8" | "BYTES_16" | "BYTES_24" | (string & {});
export interface KekValidationRequest {
  DeriveKeyAlgorithm: SymmetricKeyAlgorithm;
  RandomKeyMaxLength?: RandomKeyMaxLength;
}
export type As2805RandomKeyMaterial = string | redacted.Redacted<string>;
export interface KekValidationResponse {
  RandomKeySend: string | redacted.Redacted<string>;
}
export type As2805KekValidationType =
  | { KekValidationRequest: KekValidationRequest; KekValidationResponse?: never }
  | { KekValidationRequest?: never; KekValidationResponse: KekValidationResponse };
export type RandomKeySendVariantMask = "VARIANT_MASK_82C0" | "VARIANT_MASK_82" | (string & {});
export interface GenerateAs2805KekValidationInput {
  KeyIdentifier: string;
  KekValidationType: As2805KekValidationType;
  RandomKeySendVariantMask: RandomKeySendVariantMask;
}
export interface GenerateAs2805KekValidationOutput {
  KeyArn: string;
  KeyCheckValue: string;
  RandomKeySend: string | redacted.Redacted<string>;
  RandomKeyReceive: string | redacted.Redacted<string>;
}
export type TransactionDataType = string | redacted.Redacted<string>;
export type MajorKeyDerivationMode = "EMV_OPTION_A" | "EMV_OPTION_B" | (string & {});
export type HexLengthEquals4 = string;
export interface SessionKeyEmvCommon {
  PrimaryAccountNumber: string | redacted.Redacted<string>;
  PanSequenceNumber: string;
  ApplicationTransactionCounter: string;
}
export type HexLengthEquals8 = string;
export interface SessionKeyMastercard {
  PrimaryAccountNumber: string | redacted.Redacted<string>;
  PanSequenceNumber: string;
  ApplicationTransactionCounter: string;
  UnpredictableNumber: string;
}
export interface SessionKeyEmv2000 {
  PrimaryAccountNumber: string | redacted.Redacted<string>;
  PanSequenceNumber: string;
  ApplicationTransactionCounter: string;
}
export interface SessionKeyAmex {
  PrimaryAccountNumber: string | redacted.Redacted<string>;
  PanSequenceNumber: string;
}
export interface SessionKeyVisa {
  PrimaryAccountNumber: string | redacted.Redacted<string>;
  PanSequenceNumber: string;
}
export interface SessionKeyUnionPay {
  PrimaryAccountNumber: string | redacted.Redacted<string>;
  PanSequenceNumber: string;
  ApplicationTransactionCounter: string;
}
export type SessionKeyDerivation =
  | {
      EmvCommon: SessionKeyEmvCommon;
      Mastercard?: never;
      Emv2000?: never;
      Amex?: never;
      Visa?: never;
      UnionPay?: never;
    }
  | {
      EmvCommon?: never;
      Mastercard: SessionKeyMastercard;
      Emv2000?: never;
      Amex?: never;
      Visa?: never;
      UnionPay?: never;
    }
  | {
      EmvCommon?: never;
      Mastercard?: never;
      Emv2000: SessionKeyEmv2000;
      Amex?: never;
      Visa?: never;
      UnionPay?: never;
    }
  | {
      EmvCommon?: never;
      Mastercard?: never;
      Emv2000?: never;
      Amex: SessionKeyAmex;
      Visa?: never;
      UnionPay?: never;
    }
  | {
      EmvCommon?: never;
      Mastercard?: never;
      Emv2000?: never;
      Amex?: never;
      Visa: SessionKeyVisa;
      UnionPay?: never;
    }
  | {
      EmvCommon?: never;
      Mastercard?: never;
      Emv2000?: never;
      Amex?: never;
      Visa?: never;
      UnionPay: SessionKeyUnionPay;
    };
export interface GenerateAuthRequestCryptogramInput {
  KeyIdentifier: string;
  TransactionData: string | redacted.Redacted<string>;
  MajorKeyDerivationMode: MajorKeyDerivationMode;
  SessionKeyDerivationAttributes: SessionKeyDerivation;
}
export type AuthRequestCryptogramType = string | redacted.Redacted<string>;
export interface GenerateAuthRequestCryptogramOutput {
  KeyArn: string;
  KeyCheckValue: string;
  AuthRequestCryptogram: string | redacted.Redacted<string>;
}
export type CardExpiryDateType = string | redacted.Redacted<string>;
export interface AmexCardSecurityCodeVersion1 {
  CardExpiryDate: string | redacted.Redacted<string>;
}
export type ServiceCodeType = string | redacted.Redacted<string>;
export interface AmexCardSecurityCodeVersion2 {
  CardExpiryDate: string | redacted.Redacted<string>;
  ServiceCode: string | redacted.Redacted<string>;
}
export interface CardVerificationValue1 {
  CardExpiryDate: string | redacted.Redacted<string>;
  ServiceCode: string | redacted.Redacted<string>;
}
export interface CardVerificationValue2 {
  CardExpiryDate: string | redacted.Redacted<string>;
}
export type HexLengthBetween2And8 = string;
export type HexLengthBetween2And4 = string;
export interface CardHolderVerificationValue {
  UnpredictableNumber: string;
  PanSequenceNumber: string;
  ApplicationTransactionCounter: string;
}
export type TrackDataType = string | redacted.Redacted<string>;
export interface DynamicCardVerificationCode {
  UnpredictableNumber: string;
  PanSequenceNumber: string;
  ApplicationTransactionCounter: string;
  TrackData: string | redacted.Redacted<string>;
}
export interface DynamicCardVerificationValue {
  PanSequenceNumber: string;
  CardExpiryDate: string | redacted.Redacted<string>;
  ServiceCode: string | redacted.Redacted<string>;
  ApplicationTransactionCounter: string;
}
export type CardGenerationAttributes =
  | {
      AmexCardSecurityCodeVersion1: AmexCardSecurityCodeVersion1;
      AmexCardSecurityCodeVersion2?: never;
      CardVerificationValue1?: never;
      CardVerificationValue2?: never;
      CardHolderVerificationValue?: never;
      DynamicCardVerificationCode?: never;
      DynamicCardVerificationValue?: never;
    }
  | {
      AmexCardSecurityCodeVersion1?: never;
      AmexCardSecurityCodeVersion2: AmexCardSecurityCodeVersion2;
      CardVerificationValue1?: never;
      CardVerificationValue2?: never;
      CardHolderVerificationValue?: never;
      DynamicCardVerificationCode?: never;
      DynamicCardVerificationValue?: never;
    }
  | {
      AmexCardSecurityCodeVersion1?: never;
      AmexCardSecurityCodeVersion2?: never;
      CardVerificationValue1: CardVerificationValue1;
      CardVerificationValue2?: never;
      CardHolderVerificationValue?: never;
      DynamicCardVerificationCode?: never;
      DynamicCardVerificationValue?: never;
    }
  | {
      AmexCardSecurityCodeVersion1?: never;
      AmexCardSecurityCodeVersion2?: never;
      CardVerificationValue1?: never;
      CardVerificationValue2: CardVerificationValue2;
      CardHolderVerificationValue?: never;
      DynamicCardVerificationCode?: never;
      DynamicCardVerificationValue?: never;
    }
  | {
      AmexCardSecurityCodeVersion1?: never;
      AmexCardSecurityCodeVersion2?: never;
      CardVerificationValue1?: never;
      CardVerificationValue2?: never;
      CardHolderVerificationValue: CardHolderVerificationValue;
      DynamicCardVerificationCode?: never;
      DynamicCardVerificationValue?: never;
    }
  | {
      AmexCardSecurityCodeVersion1?: never;
      AmexCardSecurityCodeVersion2?: never;
      CardVerificationValue1?: never;
      CardVerificationValue2?: never;
      CardHolderVerificationValue?: never;
      DynamicCardVerificationCode: DynamicCardVerificationCode;
      DynamicCardVerificationValue?: never;
    }
  | {
      AmexCardSecurityCodeVersion1?: never;
      AmexCardSecurityCodeVersion2?: never;
      CardVerificationValue1?: never;
      CardVerificationValue2?: never;
      CardHolderVerificationValue?: never;
      DynamicCardVerificationCode?: never;
      DynamicCardVerificationValue: DynamicCardVerificationValue;
    };
export type IntegerRangeBetween3And5Type = number;
export interface GenerateCardValidationDataInput {
  KeyIdentifier: string;
  PrimaryAccountNumber: string | redacted.Redacted<string>;
  GenerationAttributes: CardGenerationAttributes;
  ValidationDataLength?: number;
}
export type ValidationDataType = string | redacted.Redacted<string>;
export interface GenerateCardValidationDataOutput {
  KeyArn: string;
  KeyCheckValue: string;
  ValidationData: string | redacted.Redacted<string>;
}
export type MessageDataType = string | redacted.Redacted<string>;
export type MacAlgorithm =
  | "ISO9797_ALGORITHM1"
  | "ISO9797_ALGORITHM3"
  | "CMAC"
  | "HMAC"
  | "HMAC_SHA224"
  | "HMAC_SHA256"
  | "HMAC_SHA384"
  | "HMAC_SHA512"
  | "AS2805_4_1"
  | (string & {});
export type SessionKeyDerivationMode =
  | "EMV_COMMON_SESSION_KEY"
  | "EMV2000"
  | "AMEX"
  | "MASTERCARD_SESSION_KEY"
  | "VISA"
  | "UNION_PAY"
  | (string & {});
export type ApplicationCryptogramType = string | redacted.Redacted<string>;
export type SessionKeyDerivationValue =
  | {
      ApplicationCryptogram: string | redacted.Redacted<string>;
      ApplicationTransactionCounter?: never;
    }
  | { ApplicationCryptogram?: never; ApplicationTransactionCounter: string };
export interface MacAlgorithmEmv {
  MajorKeyDerivationMode: MajorKeyDerivationMode;
  PrimaryAccountNumber: string | redacted.Redacted<string>;
  PanSequenceNumber: string;
  SessionKeyDerivationMode: SessionKeyDerivationMode;
  SessionKeyDerivationValue: SessionKeyDerivationValue;
}
export interface MacAlgorithmDukpt {
  KeySerialNumber: string;
  DukptKeyVariant: DukptKeyVariant;
  DukptDerivationType?: DukptDerivationType;
}
export type MacAttributes =
  | {
      Algorithm: MacAlgorithm;
      EmvMac?: never;
      DukptIso9797Algorithm1?: never;
      DukptIso9797Algorithm3?: never;
      DukptCmac?: never;
    }
  | {
      Algorithm?: never;
      EmvMac: MacAlgorithmEmv;
      DukptIso9797Algorithm1?: never;
      DukptIso9797Algorithm3?: never;
      DukptCmac?: never;
    }
  | {
      Algorithm?: never;
      EmvMac?: never;
      DukptIso9797Algorithm1: MacAlgorithmDukpt;
      DukptIso9797Algorithm3?: never;
      DukptCmac?: never;
    }
  | {
      Algorithm?: never;
      EmvMac?: never;
      DukptIso9797Algorithm1?: never;
      DukptIso9797Algorithm3: MacAlgorithmDukpt;
      DukptCmac?: never;
    }
  | {
      Algorithm?: never;
      EmvMac?: never;
      DukptIso9797Algorithm1?: never;
      DukptIso9797Algorithm3?: never;
      DukptCmac: MacAlgorithmDukpt;
    };
export type IntegerRangeBetween4And32 = number;
export interface GenerateMacInput {
  KeyIdentifier: string;
  MessageData: string | redacted.Redacted<string>;
  GenerationAttributes: MacAttributes;
  MacLength?: number;
}
export type MacOutputType = string | redacted.Redacted<string>;
export interface GenerateMacOutput {
  KeyArn: string;
  KeyCheckValue: string;
  Mac: string | redacted.Redacted<string>;
}
export type PinBlockLengthEquals16 = string | redacted.Redacted<string>;
export type PinBlockFormatForEmvPinChange =
  | "ISO_FORMAT_0"
  | "ISO_FORMAT_1"
  | "ISO_FORMAT_3"
  | (string & {});
export type CommandMessageDataType = string | redacted.Redacted<string>;
export type PinBlockPaddingType = "NO_PADDING" | "ISO_IEC_7816_4" | (string & {});
export type PinBlockLengthPosition = "NONE" | "FRONT_OF_PIN_BLOCK" | (string & {});
export interface EmvCommonAttributes {
  MajorKeyDerivationMode: MajorKeyDerivationMode;
  PrimaryAccountNumber: string | redacted.Redacted<string>;
  PanSequenceNumber: string;
  ApplicationCryptogram: string | redacted.Redacted<string>;
  Mode: EmvEncryptionMode;
  PinBlockPaddingType: PinBlockPaddingType;
  PinBlockLengthPosition: PinBlockLengthPosition;
}
export interface CurrentPinAttributes {
  CurrentPinPekIdentifier: string;
  CurrentEncryptedPinBlock: string | redacted.Redacted<string>;
}
export interface AmexAttributes {
  MajorKeyDerivationMode: MajorKeyDerivationMode;
  PrimaryAccountNumber: string | redacted.Redacted<string>;
  PanSequenceNumber: string;
  ApplicationTransactionCounter: string;
  AuthorizationRequestKeyIdentifier: string;
  CurrentPinAttributes?: CurrentPinAttributes;
}
export interface VisaAttributes {
  MajorKeyDerivationMode: MajorKeyDerivationMode;
  PrimaryAccountNumber: string | redacted.Redacted<string>;
  PanSequenceNumber: string;
  ApplicationTransactionCounter: string;
  AuthorizationRequestKeyIdentifier: string;
  CurrentPinAttributes?: CurrentPinAttributes;
}
export interface Emv2000Attributes {
  MajorKeyDerivationMode: MajorKeyDerivationMode;
  PrimaryAccountNumber: string | redacted.Redacted<string>;
  PanSequenceNumber: string;
  ApplicationTransactionCounter: string;
}
export interface MasterCardAttributes {
  MajorKeyDerivationMode: MajorKeyDerivationMode;
  PrimaryAccountNumber: string | redacted.Redacted<string>;
  PanSequenceNumber: string;
  ApplicationCryptogram: string | redacted.Redacted<string>;
}
export type DerivationMethodAttributes =
  | {
      EmvCommon: EmvCommonAttributes;
      Amex?: never;
      Visa?: never;
      Emv2000?: never;
      Mastercard?: never;
    }
  | { EmvCommon?: never; Amex: AmexAttributes; Visa?: never; Emv2000?: never; Mastercard?: never }
  | { EmvCommon?: never; Amex?: never; Visa: VisaAttributes; Emv2000?: never; Mastercard?: never }
  | {
      EmvCommon?: never;
      Amex?: never;
      Visa?: never;
      Emv2000: Emv2000Attributes;
      Mastercard?: never;
    }
  | {
      EmvCommon?: never;
      Amex?: never;
      Visa?: never;
      Emv2000?: never;
      Mastercard: MasterCardAttributes;
    };
export interface GenerateMacEmvPinChangeInput {
  NewPinPekIdentifier: string;
  NewEncryptedPinBlock: string | redacted.Redacted<string>;
  PinBlockFormat: PinBlockFormatForEmvPinChange;
  SecureMessagingIntegrityKeyIdentifier: string;
  SecureMessagingConfidentialityKeyIdentifier: string;
  MessageData: string | redacted.Redacted<string>;
  DerivationMethodAttributes: DerivationMethodAttributes;
}
export type PinChangeMacOutputType = string | redacted.Redacted<string>;
export type EncryptedPinBlockType = string | redacted.Redacted<string>;
export interface VisaAmexDerivationOutputs {
  AuthorizationRequestKeyArn: string;
  AuthorizationRequestKeyCheckValue: string;
  CurrentPinPekArn?: string;
  CurrentPinPekKeyCheckValue?: string;
}
export interface GenerateMacEmvPinChangeOutput {
  NewPinPekArn: string;
  SecureMessagingIntegrityKeyArn: string;
  SecureMessagingConfidentialityKeyArn: string;
  Mac: string | redacted.Redacted<string>;
  EncryptedPinBlock: string | redacted.Redacted<string>;
  NewPinPekKeyCheckValue: string;
  SecureMessagingIntegrityKeyCheckValue: string;
  SecureMessagingConfidentialityKeyCheckValue: string;
  VisaAmexDerivationOutputs?: VisaAmexDerivationOutputs;
}
export type IntegerRangeBetween0And6 = number;
export interface VisaPin {
  PinVerificationKeyIndex: number;
}
export interface VisaPinVerificationValue {
  EncryptedPinBlock: string | redacted.Redacted<string>;
  PinVerificationKeyIndex: number;
}
export type DecimalizationTableType = string | redacted.Redacted<string>;
export type HexLengthEquals1 = string;
export type PinValidationDataType = string | redacted.Redacted<string>;
export interface Ibm3624PinOffset {
  EncryptedPinBlock: string | redacted.Redacted<string>;
  DecimalizationTable: string | redacted.Redacted<string>;
  PinValidationDataPadCharacter: string;
  PinValidationData: string | redacted.Redacted<string>;
}
export interface Ibm3624NaturalPin {
  DecimalizationTable: string | redacted.Redacted<string>;
  PinValidationDataPadCharacter: string;
  PinValidationData: string | redacted.Redacted<string>;
}
export interface Ibm3624RandomPin {
  DecimalizationTable: string | redacted.Redacted<string>;
  PinValidationDataPadCharacter: string;
  PinValidationData: string | redacted.Redacted<string>;
}
export type PinOffsetType = string | redacted.Redacted<string>;
export interface Ibm3624PinFromOffset {
  DecimalizationTable: string | redacted.Redacted<string>;
  PinValidationDataPadCharacter: string;
  PinValidationData: string | redacted.Redacted<string>;
  PinOffset: string | redacted.Redacted<string>;
}
export type PinGenerationAttributes =
  | {
      VisaPin: VisaPin;
      VisaPinVerificationValue?: never;
      Ibm3624PinOffset?: never;
      Ibm3624NaturalPin?: never;
      Ibm3624RandomPin?: never;
      Ibm3624PinFromOffset?: never;
    }
  | {
      VisaPin?: never;
      VisaPinVerificationValue: VisaPinVerificationValue;
      Ibm3624PinOffset?: never;
      Ibm3624NaturalPin?: never;
      Ibm3624RandomPin?: never;
      Ibm3624PinFromOffset?: never;
    }
  | {
      VisaPin?: never;
      VisaPinVerificationValue?: never;
      Ibm3624PinOffset: Ibm3624PinOffset;
      Ibm3624NaturalPin?: never;
      Ibm3624RandomPin?: never;
      Ibm3624PinFromOffset?: never;
    }
  | {
      VisaPin?: never;
      VisaPinVerificationValue?: never;
      Ibm3624PinOffset?: never;
      Ibm3624NaturalPin: Ibm3624NaturalPin;
      Ibm3624RandomPin?: never;
      Ibm3624PinFromOffset?: never;
    }
  | {
      VisaPin?: never;
      VisaPinVerificationValue?: never;
      Ibm3624PinOffset?: never;
      Ibm3624NaturalPin?: never;
      Ibm3624RandomPin: Ibm3624RandomPin;
      Ibm3624PinFromOffset?: never;
    }
  | {
      VisaPin?: never;
      VisaPinVerificationValue?: never;
      Ibm3624PinOffset?: never;
      Ibm3624NaturalPin?: never;
      Ibm3624RandomPin?: never;
      Ibm3624PinFromOffset: Ibm3624PinFromOffset;
    };
export type IntegerRangeBetween4And12 = number;
export type PinBlockFormatForPinData =
  | "ISO_FORMAT_0"
  | "ISO_FORMAT_1"
  | "ISO_FORMAT_3"
  | "ISO_FORMAT_4"
  | (string & {});
export interface GeneratePinDataInput {
  GenerationKeyIdentifier: string;
  EncryptionKeyIdentifier: string;
  GenerationAttributes: PinGenerationAttributes;
  PinDataLength?: number;
  PrimaryAccountNumber?: string | redacted.Redacted<string>;
  PinBlockFormat: PinBlockFormatForPinData;
  EncryptionWrappedKey?: WrappedKey;
}
export type VerificationValueType = string | redacted.Redacted<string>;
export type PinData =
  | { PinOffset: string | redacted.Redacted<string>; VerificationValue?: never }
  | { PinOffset?: never; VerificationValue: string | redacted.Redacted<string> };
export interface GeneratePinDataOutput {
  GenerationKeyArn: string;
  GenerationKeyCheckValue: string;
  EncryptionKeyArn: string;
  EncryptionKeyCheckValue: string;
  EncryptedPinBlock: string | redacted.Redacted<string>;
  PinData: PinData;
}
export type ReEncryptionAttributes =
  | { Symmetric: SymmetricEncryptionAttributes; Asymmetric?: never; Dukpt?: never }
  | { Symmetric?: never; Asymmetric: AsymmetricEncryptionAttributes; Dukpt?: never }
  | { Symmetric?: never; Asymmetric?: never; Dukpt: DukptEncryptionAttributes };
export interface ReEncryptDataInput {
  IncomingKeyIdentifier: string;
  OutgoingKeyIdentifier: string;
  CipherText: string | redacted.Redacted<string>;
  IncomingEncryptionAttributes: ReEncryptionAttributes;
  OutgoingEncryptionAttributes: ReEncryptionAttributes;
  IncomingWrappedKey?: WrappedKey;
  OutgoingWrappedKey?: WrappedKey;
}
export interface ReEncryptDataOutput {
  KeyArn: string;
  KeyCheckValue: string;
  CipherText: string | redacted.Redacted<string>;
}
export type DiffieHellmanDerivationData = { SharedInformation: string };
export interface IncomingDiffieHellmanTr31KeyBlock {
  PrivateKeyIdentifier: string;
  CertificateAuthorityPublicKeyIdentifier: string;
  PublicKeyCertificate: string;
  DeriveKeyAlgorithm: SymmetricKeyAlgorithm;
  KeyDerivationFunction: KeyDerivationFunction;
  KeyDerivationHashAlgorithm: KeyDerivationHashAlgorithm;
  DerivationData: DiffieHellmanDerivationData;
  WrappedKeyBlock: string | redacted.Redacted<string>;
}
export type IncomingKeyMaterial = { DiffieHellmanTr31KeyBlock: IncomingDiffieHellmanTr31KeyBlock };
export interface OutgoingTr31KeyBlock {
  WrappingKeyIdentifier: string;
}
export type OutgoingKeyMaterial = { Tr31KeyBlock: OutgoingTr31KeyBlock };
export interface TranslateKeyMaterialInput {
  IncomingKeyMaterial: IncomingKeyMaterial;
  OutgoingKeyMaterial: OutgoingKeyMaterial;
  KeyCheckValueAlgorithm?: string;
}
export type KeyMaterial = string | redacted.Redacted<string>;
export type WrappedKeyMaterialFormat = string;
export interface WrappedWorkingKey {
  WrappedKeyMaterial: string | redacted.Redacted<string>;
  KeyCheckValue: string;
  WrappedKeyMaterialFormat: string;
}
export interface TranslateKeyMaterialOutput {
  WrappedKey: WrappedWorkingKey;
}
export interface TranslationPinDataIsoFormat034 {
  PrimaryAccountNumber: string | redacted.Redacted<string>;
}
export interface TranslationPinDataIsoFormat1 {}
export interface TranslationPinDataAs2805Format0 {
  PrimaryAccountNumber: string | redacted.Redacted<string>;
}
export type TranslationIsoFormats =
  | {
      IsoFormat0: TranslationPinDataIsoFormat034;
      IsoFormat1?: never;
      IsoFormat3?: never;
      IsoFormat4?: never;
      As2805Format0?: never;
    }
  | {
      IsoFormat0?: never;
      IsoFormat1: TranslationPinDataIsoFormat1;
      IsoFormat3?: never;
      IsoFormat4?: never;
      As2805Format0?: never;
    }
  | {
      IsoFormat0?: never;
      IsoFormat1?: never;
      IsoFormat3: TranslationPinDataIsoFormat034;
      IsoFormat4?: never;
      As2805Format0?: never;
    }
  | {
      IsoFormat0?: never;
      IsoFormat1?: never;
      IsoFormat3?: never;
      IsoFormat4: TranslationPinDataIsoFormat034;
      As2805Format0?: never;
    }
  | {
      IsoFormat0?: never;
      IsoFormat1?: never;
      IsoFormat3?: never;
      IsoFormat4?: never;
      As2805Format0: TranslationPinDataAs2805Format0;
    };
export type HexEvenLengthBetween16And32 = string | redacted.Redacted<string>;
export interface DukptDerivationAttributes {
  KeySerialNumber: string;
  DukptKeyDerivationType?: DukptDerivationType;
  DukptKeyVariant?: DukptKeyVariant;
}
export type SystemTraceAuditNumberType = string;
export type TransactionAmountType = string;
export interface As2805PekDerivationAttributes {
  SystemTraceAuditNumber: string;
  TransactionAmount: string;
}
export interface TranslatePinDataInput {
  IncomingKeyIdentifier: string;
  OutgoingKeyIdentifier: string;
  IncomingTranslationAttributes: TranslationIsoFormats;
  OutgoingTranslationAttributes: TranslationIsoFormats;
  EncryptedPinBlock: string | redacted.Redacted<string>;
  IncomingDukptAttributes?: DukptDerivationAttributes;
  OutgoingDukptAttributes?: DukptDerivationAttributes;
  IncomingWrappedKey?: WrappedKey;
  OutgoingWrappedKey?: WrappedKey;
  IncomingAs2805Attributes?: As2805PekDerivationAttributes;
}
export interface TranslatePinDataOutput {
  PinBlock: string | redacted.Redacted<string>;
  KeyArn: string;
  KeyCheckValue: string;
}
export interface CryptogramVerificationArpcMethod1 {
  AuthResponseCode: string;
}
export type ProprietaryAuthenticationDataType = string | redacted.Redacted<string>;
export interface CryptogramVerificationArpcMethod2 {
  CardStatusUpdate: string;
  ProprietaryAuthenticationData?: string | redacted.Redacted<string>;
}
export type CryptogramAuthResponse =
  | { ArpcMethod1: CryptogramVerificationArpcMethod1; ArpcMethod2?: never }
  | { ArpcMethod1?: never; ArpcMethod2: CryptogramVerificationArpcMethod2 };
export interface VerifyAuthRequestCryptogramInput {
  KeyIdentifier: string;
  TransactionData: string | redacted.Redacted<string>;
  AuthRequestCryptogram: string | redacted.Redacted<string>;
  MajorKeyDerivationMode: MajorKeyDerivationMode;
  SessionKeyDerivationAttributes: SessionKeyDerivation;
  AuthResponseAttributes?: CryptogramAuthResponse;
}
export type AuthResponseValueType = string | redacted.Redacted<string>;
export interface VerifyAuthRequestCryptogramOutput {
  KeyArn: string;
  KeyCheckValue: string;
  AuthResponseValue?: string | redacted.Redacted<string>;
}
export interface DiscoverDynamicCardVerificationCode {
  CardExpiryDate: string | redacted.Redacted<string>;
  UnpredictableNumber: string;
  ApplicationTransactionCounter: string;
}
export type CardVerificationAttributes =
  | {
      AmexCardSecurityCodeVersion1: AmexCardSecurityCodeVersion1;
      AmexCardSecurityCodeVersion2?: never;
      CardVerificationValue1?: never;
      CardVerificationValue2?: never;
      CardHolderVerificationValue?: never;
      DynamicCardVerificationCode?: never;
      DynamicCardVerificationValue?: never;
      DiscoverDynamicCardVerificationCode?: never;
    }
  | {
      AmexCardSecurityCodeVersion1?: never;
      AmexCardSecurityCodeVersion2: AmexCardSecurityCodeVersion2;
      CardVerificationValue1?: never;
      CardVerificationValue2?: never;
      CardHolderVerificationValue?: never;
      DynamicCardVerificationCode?: never;
      DynamicCardVerificationValue?: never;
      DiscoverDynamicCardVerificationCode?: never;
    }
  | {
      AmexCardSecurityCodeVersion1?: never;
      AmexCardSecurityCodeVersion2?: never;
      CardVerificationValue1: CardVerificationValue1;
      CardVerificationValue2?: never;
      CardHolderVerificationValue?: never;
      DynamicCardVerificationCode?: never;
      DynamicCardVerificationValue?: never;
      DiscoverDynamicCardVerificationCode?: never;
    }
  | {
      AmexCardSecurityCodeVersion1?: never;
      AmexCardSecurityCodeVersion2?: never;
      CardVerificationValue1?: never;
      CardVerificationValue2: CardVerificationValue2;
      CardHolderVerificationValue?: never;
      DynamicCardVerificationCode?: never;
      DynamicCardVerificationValue?: never;
      DiscoverDynamicCardVerificationCode?: never;
    }
  | {
      AmexCardSecurityCodeVersion1?: never;
      AmexCardSecurityCodeVersion2?: never;
      CardVerificationValue1?: never;
      CardVerificationValue2?: never;
      CardHolderVerificationValue: CardHolderVerificationValue;
      DynamicCardVerificationCode?: never;
      DynamicCardVerificationValue?: never;
      DiscoverDynamicCardVerificationCode?: never;
    }
  | {
      AmexCardSecurityCodeVersion1?: never;
      AmexCardSecurityCodeVersion2?: never;
      CardVerificationValue1?: never;
      CardVerificationValue2?: never;
      CardHolderVerificationValue?: never;
      DynamicCardVerificationCode: DynamicCardVerificationCode;
      DynamicCardVerificationValue?: never;
      DiscoverDynamicCardVerificationCode?: never;
    }
  | {
      AmexCardSecurityCodeVersion1?: never;
      AmexCardSecurityCodeVersion2?: never;
      CardVerificationValue1?: never;
      CardVerificationValue2?: never;
      CardHolderVerificationValue?: never;
      DynamicCardVerificationCode?: never;
      DynamicCardVerificationValue: DynamicCardVerificationValue;
      DiscoverDynamicCardVerificationCode?: never;
    }
  | {
      AmexCardSecurityCodeVersion1?: never;
      AmexCardSecurityCodeVersion2?: never;
      CardVerificationValue1?: never;
      CardVerificationValue2?: never;
      CardHolderVerificationValue?: never;
      DynamicCardVerificationCode?: never;
      DynamicCardVerificationValue?: never;
      DiscoverDynamicCardVerificationCode: DiscoverDynamicCardVerificationCode;
    };
export interface VerifyCardValidationDataInput {
  KeyIdentifier: string;
  PrimaryAccountNumber: string | redacted.Redacted<string>;
  VerificationAttributes: CardVerificationAttributes;
  ValidationData: string | redacted.Redacted<string>;
}
export interface VerifyCardValidationDataOutput {
  KeyArn: string;
  KeyCheckValue: string;
}
export type MacType = string | redacted.Redacted<string>;
export interface VerifyMacInput {
  KeyIdentifier: string;
  MessageData: string | redacted.Redacted<string>;
  Mac: string | redacted.Redacted<string>;
  VerificationAttributes: MacAttributes;
  MacLength?: number;
}
export interface VerifyMacOutput {
  KeyArn: string;
  KeyCheckValue: string;
}
export interface VisaPinVerification {
  PinVerificationKeyIndex: number;
  VerificationValue: string | redacted.Redacted<string>;
}
export interface Ibm3624PinVerification {
  DecimalizationTable: string | redacted.Redacted<string>;
  PinValidationDataPadCharacter: string;
  PinValidationData: string | redacted.Redacted<string>;
  PinOffset: string | redacted.Redacted<string>;
}
export type PinVerificationAttributes =
  | { VisaPin: VisaPinVerification; Ibm3624Pin?: never }
  | { VisaPin?: never; Ibm3624Pin: Ibm3624PinVerification };
export interface DukptAttributes {
  KeySerialNumber: string;
  DukptDerivationType: DukptDerivationType;
}
export interface VerifyPinDataInput {
  VerificationKeyIdentifier: string;
  EncryptionKeyIdentifier: string;
  VerificationAttributes: PinVerificationAttributes;
  EncryptedPinBlock: string | redacted.Redacted<string>;
  PrimaryAccountNumber?: string | redacted.Redacted<string>;
  PinBlockFormat: PinBlockFormatForPinData;
  PinDataLength?: number;
  DukptAttributes?: DukptAttributes;
  EncryptionWrappedKey?: WrappedKey;
}
export interface VerifyPinDataOutput {
  VerificationKeyArn: string;
  VerificationKeyCheckValue: string;
  EncryptionKeyArn: string;
  EncryptionKeyCheckValue: string;
}
export interface ValidationExceptionField {
  path: string;
  message: string;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
export type VerificationFailedReason = string;
export type DecryptDataError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Decrypts ciphertext data to plaintext using a symmetric (TDES, AES), asymmetric (RSA), or derived (DUKPT or EMV) encryption key scheme. For more information, see Decrypt data in the *Amazon Web Services Payment Cryptography User Guide*.
 *
 * You can use an decryption key generated within Amazon Web Services Payment Cryptography, or you can import your own decryption key by calling ImportKey. For this operation, the key must have `KeyModesOfUse` set to `Decrypt`. In asymmetric decryption, Amazon Web Services Payment Cryptography decrypts the ciphertext using the private component of the asymmetric encryption key pair. For data encryption outside of Amazon Web Services Payment Cryptography, you can export the public component of the asymmetric key pair by calling GetPublicCertificate.
 *
 * This operation also supports dynamic keys, allowing you to pass a dynamic decryption key as a TR-31 WrappedKeyBlock. This can be used when key material is frequently rotated, such as during every card transaction, and there is need to avoid importing short-lived keys into Amazon Web Services Payment Cryptography. To decrypt using dynamic keys, the `keyARN` is the Key Encryption Key (KEK) of the TR-31 wrapped decryption key material. The incoming wrapped key shall have a key purpose of D0 with a mode of use of B or D. For more information, see Using Dynamic Keys in the *Amazon Web Services Payment Cryptography User Guide*.
 *
 * For symmetric and DUKPT decryption, Amazon Web Services Payment Cryptography supports `TDES` and `AES` algorithms. For EMV decryption, Amazon Web Services Payment Cryptography supports `TDES` algorithms. For asymmetric decryption, Amazon Web Services Payment Cryptography supports `RSA`.
 *
 * When you use TDES or TDES DUKPT, the ciphertext data length must be a multiple of 8 bytes. For AES or AES DUKPT, the ciphertext data length must be a multiple of 16 bytes. For RSA, it sould be equal to the key size unless padding is enabled.
 *
 * For information about valid keys for this operation, see Understanding key attributes and Key types for specific data operations in the *Amazon Web Services Payment Cryptography User Guide*.
 *
 * **Cross-account use**: This operation supports cross-account use when the key has a resource-based policy that grants access. For more information, see Resource-based policies.
 *
 * **Related operations:**
 *
 * - EncryptData
 *
 * - GetPublicCertificate
 *
 * - ImportKey
 */
export const decryptData: API.OperationMethod<
  DecryptDataInput,
  DecryptDataOutput,
  DecryptDataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c16, 0) as any as S.Schema<DecryptDataInput>,
  output: __S(257, __c16, 1) as any as S.Schema<DecryptDataOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DecryptData",
}));

export type EncryptDataError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Encrypts plaintext data to ciphertext using a symmetric (TDES, AES), asymmetric (RSA), or derived (DUKPT or EMV) encryption key scheme. For more information, see Encrypt data in the *Amazon Web Services Payment Cryptography User Guide*.
 *
 * You can generate an encryption key within Amazon Web Services Payment Cryptography by calling CreateKey. You can import your own encryption key by calling ImportKey.
 *
 * For this operation, the key must have `KeyModesOfUse` set to `Encrypt`. In asymmetric encryption, plaintext is encrypted using public component. You can import the public component of an asymmetric key pair created outside Amazon Web Services Payment Cryptography by calling ImportKey.
 *
 * This operation also supports dynamic keys, allowing you to pass a dynamic encryption key as a TR-31 WrappedKeyBlock. This can be used when key material is frequently rotated, such as during every card transaction, and there is need to avoid importing short-lived keys into Amazon Web Services Payment Cryptography. To encrypt using dynamic keys, the `keyARN` is the Key Encryption Key (KEK) of the TR-31 wrapped encryption key material. The incoming wrapped key shall have a key purpose of D0 with a mode of use of B or D. For more information, see Using Dynamic Keys in the *Amazon Web Services Payment Cryptography User Guide*.
 *
 * For symmetric and DUKPT encryption, Amazon Web Services Payment Cryptography supports `TDES` and `AES` algorithms. For EMV encryption, Amazon Web Services Payment Cryptography supports `TDES` algorithms.For asymmetric encryption, Amazon Web Services Payment Cryptography supports `RSA`.
 *
 * When you use TDES or TDES DUKPT, the plaintext data length must be a multiple of 8 bytes. For AES or AES DUKPT, the plaintext data length must be a multiple of 16 bytes. For RSA, it sould be equal to the key size unless padding is enabled.
 *
 * To encrypt using DUKPT, you must already have a BDK (Base Derivation Key) key in your account with `KeyModesOfUse` set to `DeriveKey`, or you can generate a new DUKPT key by calling CreateKey. To encrypt using EMV, you must already have an IMK (Issuer Master Key) key in your account with `KeyModesOfUse` set to `DeriveKey`.
 *
 * For information about valid keys for this operation, see Understanding key attributes and Key types for specific data operations in the *Amazon Web Services Payment Cryptography User Guide*.
 *
 * **Cross-account use**: This operation supports cross-account use when the key has a resource-based policy that grants access. For more information, see Resource-based policies.
 *
 * **Related operations:**
 *
 * - DecryptData
 *
 * - GetPublicCertificate
 *
 * - ImportKey
 *
 * - ReEncryptData
 */
export const encryptData: API.OperationMethod<
  EncryptDataInput,
  EncryptDataOutput,
  EncryptDataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c20, 0) as any as S.Schema<EncryptDataInput>,
  output: __S(321, __c20, 1) as any as S.Schema<EncryptDataOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EncryptData",
}));

export type GenerateAs2805KekValidationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Generates a `KekValidationRequest` or a `KekValidationResponse` for node-to-node initialization between payment processing nodes using Australian Standard 2805 (AS2805).
 *
 * During node-to-node initialization, both communicating nodes must validate that they possess the correct Key Encrypting Keys (KEKs) before proceeding with session key exchange. In AS2805, the sending KEK (KEKs) of one node corresponds to the receiving KEK (KEKr) of its partner node. Each node uses its KEK to encrypt and decrypt session keys exchanged between the nodes. A KEK can be created or imported into Amazon Web Services Payment Cryptography using either the CreateKey or ImportKey operations.
 *
 * To use `GenerateAs2805KekValidation` to generate a KEK validation request, set `KekValidationType` to `KekValidationRequest`. This operation returns both `RandomKeySend` (KRs) and `RandomKeyReceive` (KRr) as response values. The partnering node receives the KRs, uses its KEKr to decrypt it, and generates a KRr which is an inverted value of KRs. The node receiving the KRr validates it against its own KRr generated during KEK validation request outside of Amazon Web Services Payment Cryptography.
 *
 * You can also use this operation to generate a KEK validation response, by setting `KekValidationType` to `KekValidationResponse` and providing the incoming KRs. This operation then calculates a KRr. To learn more about more about node-to-node initialization, see Validation of KEK in the *Amazon Web Services Payment Cryptography User Guide*.
 *
 * For information about valid keys for this operation, see Understanding key attributes and Key types for specific data operations in the *Amazon Web Services Payment Cryptography User Guide*.
 *
 * **Cross-account use**: This operation supports cross-account use when the key has a resource-based policy that grants access. For more information, see Resource-based policies.
 */
export const generateAs2805KekValidation: API.OperationMethod<
  GenerateAs2805KekValidationInput,
  GenerateAs2805KekValidationOutput,
  GenerateAs2805KekValidationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(339, __c21, 3) as any as S.Schema<GenerateAs2805KekValidationInput>,
  output: __S(340, __c21, 4) as any as S.Schema<GenerateAs2805KekValidationOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GenerateAs2805KekValidation",
}));

export type GenerateAuthRequestCryptogramError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Generates an Authorization Request Cryptogram (ARQC) for an EMV chip payment card authorization. For more information, see Generate auth request cryptogram in the *Amazon Web Services Payment Cryptography User Guide*.
 *
 * ARQC generation uses an Issuer Master Key (IMK) for application cryptograms (TR31_E0_EMV_MKEY_APP_CRYPTOGRAMS) to derive a session key, which is then used to generate the cryptogram from the provided transaction data (when applicable). To use this operation, you must first create or import an IMK-AC key by calling CreateKey or ImportKey. The `KeyModesOfUse` should be set to `DeriveKey` for the IMK-AC encryption key.
 *
 * This operation is intended for development and testing scenarios only. It is not recommended to use this operation as a substitute for card-based cryptogram generation in production payment flows.
 *
 * For information about valid keys for this operation, see Understanding key attributes and Key types for specific data operations in the *Amazon Web Services Payment Cryptography User Guide*.
 *
 * **Cross-account use**: This operation supports cross-account use when the key has a resource-based policy that grants access. For more information, see Resource-based policies.
 *
 * **Related operations:**
 *
 * - VerifyAuthRequestCryptogram
 */
export const generateAuthRequestCryptogram: API.OperationMethod<
  GenerateAuthRequestCryptogramInput,
  GenerateAuthRequestCryptogramOutput,
  GenerateAuthRequestCryptogramError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c22, 0) as any as S.Schema<GenerateAuthRequestCryptogramInput>,
  output: __S(353, __c22, 1) as any as S.Schema<GenerateAuthRequestCryptogramOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GenerateAuthRequestCryptogram",
}));

export type GenerateCardValidationDataError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Generates card-related validation data using algorithms such as Card Verification Values (CVV/CVV2), Dynamic Card Verification Values (dCVV/dCVV2), or Card Security Codes (CSC). For more information, see Generate card data in the *Amazon Web Services Payment Cryptography User Guide*.
 *
 * This operation generates a CVV or CSC value that is printed on a payment credit or debit card during card production. The CVV or CSC, PAN (Primary Account Number) and expiration date of the card are required to check its validity during transaction processing. To begin this operation, a CVK (Card Verification Key) encryption key is required. You can use CreateKey or ImportKey to establish a CVK within Amazon Web Services Payment Cryptography. The `KeyModesOfUse` should be set to `Generate` and `Verify` for a CVK encryption key.
 *
 * For information about valid keys for this operation, see Understanding key attributes and Key types for specific data operations in the *Amazon Web Services Payment Cryptography User Guide*.
 *
 * **Cross-account use**: This operation supports cross-account use when the key has a resource-based policy that grants access. For more information, see Resource-based policies.
 *
 * **Related operations:**
 *
 * - ImportKey
 *
 * - VerifyCardValidationData
 */
export const generateCardValidationData: API.OperationMethod<
  GenerateCardValidationDataInput,
  GenerateCardValidationDataOutput,
  GenerateCardValidationDataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1, __c0, 1) as any as S.Schema<GenerateCardValidationDataInput>,
  output: __S(2, __c0, 2) as any as S.Schema<GenerateCardValidationDataOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GenerateCardValidationData",
}));

export type GenerateMacError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Generates a Message Authentication Code (MAC) cryptogram within Amazon Web Services Payment Cryptography.
 *
 * You can use this operation to authenticate card-related data by using known data values to generate MAC for data validation between the sending and receiving parties. This operation uses message data, a secret encryption key and MAC algorithm to generate a unique MAC value for transmission. The receiving party of the MAC must use the same message data, secret encryption key and MAC algorithm to reproduce another MAC value for comparision.
 *
 * You can use this operation to generate a DUPKT, CMAC, HMAC or EMV MAC by setting generation attributes and algorithm to the associated values. The MAC generation encryption key must have valid values for `KeyUsage` such as `TR31_M7_HMAC_KEY` for HMAC generation, and the key must have `KeyModesOfUse` set to `Generate`.
 *
 * For information about valid keys for this operation, see Understanding key attributes and Key types for specific data operations in the *Amazon Web Services Payment Cryptography User Guide*.
 *
 * **Cross-account use**: This operation supports cross-account use when the key has a resource-based policy that grants access. For more information, see Resource-based policies.
 *
 * **Related operations:**
 *
 * - VerifyMac
 */
export const generateMac: API.OperationMethod<
  GenerateMacInput,
  GenerateMacOutput,
  GenerateMacError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c2, 0) as any as S.Schema<GenerateMacInput>,
  output: __S(33, __c2, 1) as any as S.Schema<GenerateMacOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GenerateMac",
}));

export type GenerateMacEmvPinChangeError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Generates an issuer script mac for EMV payment cards that use offline PINs as the cardholder verification method (CVM).
 *
 * This operation generates an authenticated issuer script response by appending the incoming message data (APDU command) with the target encrypted PIN block in ISO2 format. The command structure and method to send the issuer script update to the card is not defined by this operation and is typically determined by the applicable payment card scheme.
 *
 * The primary inputs to this operation include the incoming new encrypted pinblock, PIN encryption key (PEK), issuer master key (IMK), primary account number (PAN), and the payment card derivation method.
 *
 * The operation uses two issuer master keys - secure messaging for confidentiality (IMK-SMC) and secure messaging for integrity (IMK-SMI). The SMC key is used to internally derive a key to secure the pin, while SMI key is used to internally derive a key to authenticate the script reponse as per the EMV 4.4 - Book 2 - Security and Key Management specification.
 *
 * This operation supports Amex, EMV2000, EMVCommon, Mastercard and Visa derivation methods, each requiring specific input parameters. Users must follow the specific derivation method and input parameters defined by the respective payment card scheme.
 *
 * Use GenerateMac operation when sending a script update to an EMV card that does not involve PIN change. When assigning IAM permissions, it is important to understand that EncryptData using EMV keys and GenerateMac perform similar functions to this command.
 *
 * **Cross-account use**: This operation supports cross-account use when the key has a resource-based policy that grants access. For more information, see Resource-based policies.
 *
 * **Related operations:**
 *
 * - EncryptData
 *
 * - GenerateMac
 */
export const generateMacEmvPinChange: API.OperationMethod<
  GenerateMacEmvPinChangeInput,
  GenerateMacEmvPinChangeOutput,
  GenerateMacEmvPinChangeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(70, __c4, 6) as any as S.Schema<GenerateMacEmvPinChangeInput>,
  output: __S(72, __c4, 8) as any as S.Schema<GenerateMacEmvPinChangeOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GenerateMacEmvPinChange",
}));

export type GeneratePinDataError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Generates pin-related data such as PIN, PIN Verification Value (PVV), PIN Block, and PIN Offset during new card issuance or reissuance. For more information, see Generate PIN data in the *Amazon Web Services Payment Cryptography User Guide*.
 *
 * PIN data is never transmitted in clear to or from Amazon Web Services Payment Cryptography. This operation generates PIN, PVV, or PIN Offset and then encrypts it using Pin Encryption Key (PEK) to create an `EncryptedPinBlock` for transmission from Amazon Web Services Payment Cryptography. This operation uses a separate Pin Verification Key (PVK) for VISA PVV generation.
 *
 * Using ECDH key exchange, you can receive cardholder selectable PINs into Amazon Web Services Payment Cryptography. The ECDH derived key protects the incoming PIN block. You can also use it for reveal PIN, wherein the generated PIN block is protected by the ECDH derived key before transmission from Amazon Web Services Payment Cryptography. For more information on establishing ECDH derived keys, see the Generating keys in the *Amazon Web Services Payment Cryptography User Guide*.
 *
 * For information about valid keys for this operation, see Understanding key attributes and Key types for specific data operations in the *Amazon Web Services Payment Cryptography User Guide*.
 *
 * **Cross-account use**: This operation supports cross-account use when the key has a resource-based policy that grants access. For more information, see Resource-based policies.
 *
 * **Related operations:**
 *
 * - GenerateCardValidationData
 *
 * - TranslatePinData
 *
 * - VerifyPinData
 */
export const generatePinData: API.OperationMethod<
  GeneratePinDataInput,
  GeneratePinDataOutput,
  GeneratePinDataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(85, __c5, 5) as any as S.Schema<GeneratePinDataInput>,
  output: __S(87, __c5, 7) as any as S.Schema<GeneratePinDataOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GeneratePinData",
}));

export type ReEncryptDataError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Re-encrypts ciphertext using DUKPT, symmetric, or asymmetric data encryption keys.
 *
 * You can either generate an encryption key within Amazon Web Services Payment Cryptography by calling CreateKey or import your own encryption key by calling ImportKey. The `KeyArn` for use with this operation must be in a compatible key state with `KeyModesOfUse` set to `Encrypt`.
 *
 * This operation also supports dynamic keys, allowing you to pass a dynamic encryption key as a TR-31 WrappedKeyBlock. This can be used when key material is frequently rotated, such as during every card transaction, and there is need to avoid importing short-lived keys into Amazon Web Services Payment Cryptography. To re-encrypt using dynamic keys, the `keyARN` is the Key Encryption Key (KEK) of the TR-31 wrapped encryption key material. The incoming wrapped key shall have a key purpose of D0 with a mode of use of B or D. For more information, see Using Dynamic Keys in the *Amazon Web Services Payment Cryptography User Guide*.
 *
 * Amazon Web Services Payment Cryptography supports the following encryption key schemes:
 *
 * - **DUKPT**: `TDES` and `AES` algorithms. To encrypt using DUKPT, a DUKPT key must already exist within your account with `KeyModesOfUse` set to `DeriveKey` or a new DUKPT can be generated by calling CreateKey.
 *
 * - **Symmetric**: `TDES` and `AES` algorithms.
 *
 * - **Asymmetric**: `RSA`. You can use an `RSA` key on either the incoming or the outgoing side, paired with a symmetric key on the other side.
 *
 * For information about valid keys for this operation, see Understanding key attributes and Key types for specific data operations in the *Amazon Web Services Payment Cryptography User Guide*.
 *
 * **Cross-account use**: This operation supports cross-account use when the key has a resource-based policy that grants access. For more information, see Resource-based policies.
 *
 * **Related operations:**
 *
 * - DecryptData
 *
 * - EncryptData
 *
 * - GetPublicCertificate
 *
 * - ImportKey
 */
export const reEncryptData: API.OperationMethod<
  ReEncryptDataInput,
  ReEncryptDataOutput,
  ReEncryptDataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(113, __c7, 1) as any as S.Schema<ReEncryptDataInput>,
  output: __S(114, __c7, 2) as any as S.Schema<ReEncryptDataOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ReEncryptData",
}));

export type TranslateKeyMaterialError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Translates an cryptographic key between different wrapping keys without importing the key into Amazon Web Services Payment Cryptography.
 *
 * This operation can be used when key material is frequently rotated, such as during every card transaction, and there is a need to avoid importing short-lived keys into Amazon Web Services Payment Cryptography. It translates short-lived transaction keys such as PEK generated for each transaction and wrapped with an ECDH derived wrapping key to another KEK wrapping key.
 *
 * Before using this operation, you must first request the public key certificate of the ECC key pair generated within Amazon Web Services Payment Cryptography to establish an ECDH key agreement. In `TranslateKeyData`, the service uses its own ECC key pair, public certificate of receiving ECC key pair, and the key derivation parameters to generate a derived key. The service uses this derived key to unwrap the incoming transaction key received as a TR31WrappedKeyBlock and re-wrap using a user provided KEK to generate an outgoing Tr31WrappedKeyBlock.
 *
 * For information about valid keys for this operation, see Understanding key attributes and Key types for specific data operations in the *Amazon Web Services Payment Cryptography User Guide*.
 *
 * **Cross-account use**: This operation supports cross-account use when the key has a resource-based policy that grants access. For more information, see Resource-based policies.
 *
 * **Related operations:**
 *
 * - CreateKey
 *
 * - GetPublicCertificate
 *
 * - ImportKey
 */
export const translateKeyMaterial: API.OperationMethod<
  TranslateKeyMaterialInput,
  TranslateKeyMaterialOutput,
  TranslateKeyMaterialError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(133, __c8, 5) as any as S.Schema<TranslateKeyMaterialInput>,
  output: __S(135, __c8, 7) as any as S.Schema<TranslateKeyMaterialOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TranslateKeyMaterial",
}));

export type TranslatePinDataError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Translates encrypted PIN block from and to ISO 9564 formats 0,1,3,4. For more information, see Translate PIN data in the *Amazon Web Services Payment Cryptography User Guide*.
 *
 * PIN block translation involves changing a PIN block from one encryption key to another and optionally change its format. PIN block translation occurs entirely within the HSM boundary and PIN data never enters or leaves Amazon Web Services Payment Cryptography in clear text. The encryption key transformation can be from PEK (Pin Encryption Key) to BDK (Base Derivation Key) for DUKPT or from BDK for DUKPT to PEK.
 *
 * Amazon Web Services Payment Cryptography also supports use of dynamic keys and ECDH (Elliptic Curve Diffie-Hellman) based key exchange for this operation.
 *
 * Dynamic keys allow you to pass a PEK as a TR-31 WrappedKeyBlock. They can be used when key material is frequently rotated, such as during every card transaction, and there is need to avoid importing short-lived keys into Amazon Web Services Payment Cryptography. To translate PIN block using dynamic keys, the `keyARN` is the Key Encryption Key (KEK) of the TR-31 wrapped PEK. The incoming wrapped key shall have a key purpose of P0 with a mode of use of B or D. For more information, see Using Dynamic Keys in the *Amazon Web Services Payment Cryptography User Guide*.
 *
 * Using ECDH key exchange, you can receive cardholder selectable PINs into Amazon Web Services Payment Cryptography. The ECDH derived key protects the incoming PIN block, which is translated to a PEK encrypted PIN block for use within the service. You can also use ECDH for reveal PIN, wherein the service translates the PIN block from PEK to a ECDH derived encryption key. For more information on establishing ECDH derived keys, see the Creating keys in the *Amazon Web Services Payment Cryptography User Guide*.
 *
 * The allowed combinations of PIN block format translations are guided by PCI. It is important to note that not all encrypted PIN block formats (example, format 1) require PAN (Primary Account Number) as input. And as such, PIN block format that requires PAN (example, formats 0,3,4) cannot be translated to a format (format 1) that does not require a PAN for generation.
 *
 * For information about valid keys for this operation, see Understanding key attributes and Key types for specific data operations in the *Amazon Web Services Payment Cryptography User Guide*.
 *
 * Amazon Web Services Payment Cryptography currently supports ISO PIN block 4 translation for PIN block built using legacy PAN length. That is, PAN is the right most 12 digits excluding the check digits.
 *
 * **Cross-account use**: This operation supports cross-account use when the key has a resource-based policy that grants access. For more information, see Resource-based policies.
 *
 * **Related operations:**
 *
 * - GeneratePinData
 *
 * - VerifyPinData
 */
export const translatePinData: API.OperationMethod<
  TranslatePinDataInput,
  TranslatePinDataOutput,
  TranslatePinDataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(149, __c9, 5) as any as S.Schema<TranslatePinDataInput>,
  output: __S(150, __c9, 6) as any as S.Schema<TranslatePinDataOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TranslatePinData",
}));

export type VerifyAuthRequestCryptogramError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | VerificationFailedException
  | CommonErrors;
/**
 * Verifies Authorization Request Cryptogram (ARQC) for a EMV chip payment card authorization. For more information, see Verify auth request cryptogram in the *Amazon Web Services Payment Cryptography User Guide*.
 *
 * ARQC generation is done outside of Amazon Web Services Payment Cryptography and is typically generated on a point of sale terminal for an EMV chip card to obtain payment authorization during transaction time. For ARQC verification, you must first import the ARQC generated outside of Amazon Web Services Payment Cryptography by calling ImportKey. This operation uses the imported ARQC and an major encryption key (DUKPT) created by calling CreateKey to either provide a boolean ARQC verification result or provide an APRC (Authorization Response Cryptogram) response using Method 1 or Method 2. The `ARPC_METHOD_1` uses `AuthResponseCode` to generate ARPC and `ARPC_METHOD_2` uses `CardStatusUpdate` to generate ARPC.
 *
 * For information about valid keys for this operation, see Understanding key attributes and Key types for specific data operations in the *Amazon Web Services Payment Cryptography User Guide*.
 *
 * **Cross-account use**: This operation supports cross-account use when the key has a resource-based policy that grants access. For more information, see Resource-based policies.
 *
 * **Related operations:**
 *
 * - VerifyCardValidationData
 *
 * - VerifyPinData
 */
export const verifyAuthRequestCryptogram: API.OperationMethod<
  VerifyAuthRequestCryptogramInput,
  VerifyAuthRequestCryptogramOutput,
  VerifyAuthRequestCryptogramError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(163, __c10, 3) as any as S.Schema<VerifyAuthRequestCryptogramInput>,
  output: __S(164, __c10, 4) as any as S.Schema<VerifyAuthRequestCryptogramOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    VerificationFailedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "VerifyAuthRequestCryptogram",
}));

export type VerifyCardValidationDataError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | VerificationFailedException
  | CommonErrors;
/**
 * Verifies card-related validation data using algorithms such as Card Verification Values (CVV/CVV2), Dynamic Card Verification Values (dCVV/dCVV2) and Card Security Codes (CSC). For more information, see Verify card data in the *Amazon Web Services Payment Cryptography User Guide*.
 *
 * This operation validates the CVV or CSC codes that is printed on a payment credit or debit card during card payment transaction. The input values are typically provided as part of an inbound transaction to an issuer or supporting platform partner. Amazon Web Services Payment Cryptography uses CVV or CSC, PAN (Primary Account Number) and expiration date of the card to check its validity during transaction processing. In this operation, the CVK (Card Verification Key) encryption key for use with card data verification is same as the one in used for GenerateCardValidationData.
 *
 * For information about valid keys for this operation, see Understanding key attributes and Key types for specific data operations in the *Amazon Web Services Payment Cryptography User Guide*.
 *
 * **Cross-account use**: This operation supports cross-account use when the key has a resource-based policy that grants access. For more information, see Resource-based policies.
 *
 * **Related operations:**
 *
 * - GenerateCardValidationData
 *
 * - VerifyAuthRequestCryptogram
 *
 * - VerifyPinData
 */
export const verifyCardValidationData: API.OperationMethod<
  VerifyCardValidationDataInput,
  VerifyCardValidationDataOutput,
  VerifyCardValidationDataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(178, __c11, 2) as any as S.Schema<VerifyCardValidationDataInput>,
  output: __S(192, __c12, 0) as any as S.Schema<VerifyCardValidationDataOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    VerificationFailedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "VerifyCardValidationData",
}));

export type VerifyMacError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | VerificationFailedException
  | CommonErrors;
/**
 * Verifies a Message Authentication Code (MAC).
 *
 * You can use this operation to verify MAC for message data authentication such as . In this operation, you must use the same message data, secret encryption key and MAC algorithm that was used to generate MAC. You can use this operation to verify a DUPKT, CMAC, HMAC or EMV MAC by setting generation attributes and algorithm to the associated values.
 *
 * For information about valid keys for this operation, see Understanding key attributes and Key types for specific data operations in the *Amazon Web Services Payment Cryptography User Guide*.
 *
 * **Cross-account use**: This operation supports cross-account use when the key has a resource-based policy that grants access. For more information, see Resource-based policies.
 *
 * **Related operations:**
 *
 * - GenerateMac
 */
export const verifyMac: API.OperationMethod<
  VerifyMacInput,
  VerifyMacOutput,
  VerifyMacError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(208, __c13, 0) as any as S.Schema<VerifyMacInput>,
  output: __S(192, __c12, 0) as any as S.Schema<VerifyMacOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    VerificationFailedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "VerifyMac",
}));

export type VerifyPinDataError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | VerificationFailedException
  | CommonErrors;
/**
 * Verifies pin-related data such as PIN and PIN Offset using algorithms including VISA PVV and IBM3624. For more information, see Verify PIN data in the *Amazon Web Services Payment Cryptography User Guide*.
 *
 * This operation verifies PIN data for user payment card. A card holder PIN data is never transmitted in clear to or from Amazon Web Services Payment Cryptography. This operation uses PIN Verification Key (PVK) for PIN or PIN Offset generation and then encrypts it using PIN Encryption Key (PEK) to create an `EncryptedPinBlock` for transmission from Amazon Web Services Payment Cryptography.
 *
 * For information about valid keys for this operation, see Understanding key attributes and Key types for specific data operations in the *Amazon Web Services Payment Cryptography User Guide*.
 *
 * **Cross-account use**: This operation supports cross-account use when the key has a resource-based policy that grants access. For more information, see Resource-based policies.
 *
 * **Related operations:**
 *
 * - GeneratePinData
 *
 * - TranslatePinData
 */
export const verifyPinData: API.OperationMethod<
  VerifyPinDataInput,
  VerifyPinDataOutput,
  VerifyPinDataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(227, __c14, 3) as any as S.Schema<VerifyPinDataInput>,
  output: __S(228, __c14, 4) as any as S.Schema<VerifyPinDataOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    VerificationFailedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "VerifyPinData",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.Union([
        /*@__PURE__*/ S.Struct({ AmexCardSecurityCodeVersion1: __S(16, __c1, 0) }),
        /*@__PURE__*/ S.Struct({ AmexCardSecurityCodeVersion2: __S(17, __c1, 1) }),
        /*@__PURE__*/ S.Struct({ CardVerificationValue1: __S(17, __c1, 1) }),
        /*@__PURE__*/ S.Struct({ CardVerificationValue2: __S(16, __c1, 0) }),
        /*@__PURE__*/ S.Struct({ CardHolderVerificationValue: __S(18, __c1, 2) }),
        /*@__PURE__*/ S.Struct({ DynamicCardVerificationCode: __S(19, __c1, 3) }),
        /*@__PURE__*/ S.Struct({ DynamicCardVerificationValue: __S(20, __c1, 4) }),
      ]);
    case 1:
      return S.suspend(() =>
        S.Struct({
          KeyIdentifier: S.String,
          PrimaryAccountNumber: SensitiveString,
          GenerationAttributes: __S(0, __c0, 0),
          ValidationDataLength: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/cardvalidationdata/generate" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GenerateCardValidationDataInput" });
    case 2:
      return S.suspend(() =>
        S.Struct({ KeyArn: S.String, KeyCheckValue: S.String, ValidationData: SensitiveString }),
      ).annotate({ identifier: "GenerateCardValidationDataOutput" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ CardExpiryDate: SensitiveString })).annotate({
        identifier: "AmexCardSecurityCodeVersion1",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ CardExpiryDate: SensitiveString, ServiceCode: SensitiveString }),
      ).annotate({ identifier: "AmexCardSecurityCodeVersion2" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          UnpredictableNumber: S.String,
          PanSequenceNumber: S.String,
          ApplicationTransactionCounter: S.String,
        }),
      ).annotate({ identifier: "CardHolderVerificationValue" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          UnpredictableNumber: S.String,
          PanSequenceNumber: S.String,
          ApplicationTransactionCounter: S.String,
          TrackData: SensitiveString,
        }),
      ).annotate({ identifier: "DynamicCardVerificationCode" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          PanSequenceNumber: S.String,
          CardExpiryDate: SensitiveString,
          ServiceCode: SensitiveString,
          ApplicationTransactionCounter: S.String,
        }),
      ).annotate({ identifier: "DynamicCardVerificationValue" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          KeyIdentifier: S.String,
          MessageData: SensitiveString,
          GenerationAttributes: __S(51, __c3, 3),
          MacLength: S.optional(S.Number),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/mac/generate" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GenerateMacInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ KeyArn: S.String, KeyCheckValue: S.String, Mac: SensitiveString }),
      ).annotate({ identifier: "GenerateMacOutput" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.Union([
        /*@__PURE__*/ S.Struct({ ApplicationCryptogram: SensitiveString }),
        /*@__PURE__*/ S.Struct({ ApplicationTransactionCounter: S.String }),
      ]);
    case 1:
      return S.suspend(() =>
        S.Struct({
          MajorKeyDerivationMode: S.String,
          PrimaryAccountNumber: SensitiveString,
          PanSequenceNumber: S.String,
          SessionKeyDerivationMode: S.String,
          SessionKeyDerivationValue: __S(48, __c3, 0),
        }),
      ).annotate({ identifier: "MacAlgorithmEmv" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          KeySerialNumber: S.String,
          DukptKeyVariant: S.String,
          DukptDerivationType: S.optional(S.String),
        }),
      ).annotate({ identifier: "MacAlgorithmDukpt" });
    case 3:
      return S.Union([
        /*@__PURE__*/ S.Struct({ Algorithm: S.String }),
        /*@__PURE__*/ S.Struct({ EmvMac: __S(49, __c3, 1) }),
        /*@__PURE__*/ S.Struct({ DukptIso9797Algorithm1: __S(50, __c3, 2) }),
        /*@__PURE__*/ S.Struct({ DukptIso9797Algorithm3: __S(50, __c3, 2) }),
        /*@__PURE__*/ S.Struct({ DukptCmac: __S(50, __c3, 2) }),
      ]);
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MajorKeyDerivationMode: S.String,
          PrimaryAccountNumber: SensitiveString,
          PanSequenceNumber: S.String,
          ApplicationCryptogram: SensitiveString,
          Mode: S.String,
          PinBlockPaddingType: S.String,
          PinBlockLengthPosition: S.String,
        }),
      ).annotate({ identifier: "EmvCommonAttributes" });
    case 1:
      return S.suspend(() =>
        S.Struct({ CurrentPinPekIdentifier: S.String, CurrentEncryptedPinBlock: SensitiveString }),
      ).annotate({ identifier: "CurrentPinAttributes" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          MajorKeyDerivationMode: S.String,
          PrimaryAccountNumber: SensitiveString,
          PanSequenceNumber: S.String,
          ApplicationTransactionCounter: S.String,
          AuthorizationRequestKeyIdentifier: S.String,
          CurrentPinAttributes: S.optional(__S(65, __c4, 1)),
        }),
      ).annotate({ identifier: "AmexAttributes" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          MajorKeyDerivationMode: S.String,
          PrimaryAccountNumber: SensitiveString,
          PanSequenceNumber: S.String,
          ApplicationTransactionCounter: S.String,
        }),
      ).annotate({ identifier: "Emv2000Attributes" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          MajorKeyDerivationMode: S.String,
          PrimaryAccountNumber: SensitiveString,
          PanSequenceNumber: S.String,
          ApplicationCryptogram: SensitiveString,
        }),
      ).annotate({ identifier: "MasterCardAttributes" });
    case 5:
      return S.Union([
        /*@__PURE__*/ S.Struct({ EmvCommon: __S(64, __c4, 0) }),
        /*@__PURE__*/ S.Struct({ Amex: __S(66, __c4, 2) }),
        /*@__PURE__*/ S.Struct({ Visa: __S(66, __c4, 2) }),
        /*@__PURE__*/ S.Struct({ Emv2000: __S(67, __c4, 3) }),
        /*@__PURE__*/ S.Struct({ Mastercard: __S(68, __c4, 4) }),
      ]);
    case 6:
      return S.suspend(() =>
        S.Struct({
          NewPinPekIdentifier: S.String,
          NewEncryptedPinBlock: SensitiveString,
          PinBlockFormat: S.String,
          SecureMessagingIntegrityKeyIdentifier: S.String,
          SecureMessagingConfidentialityKeyIdentifier: S.String,
          MessageData: SensitiveString,
          DerivationMethodAttributes: __S(69, __c4, 5),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/macemvpinchange/generate" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GenerateMacEmvPinChangeInput" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          AuthorizationRequestKeyArn: S.String,
          AuthorizationRequestKeyCheckValue: S.String,
          CurrentPinPekArn: S.optional(S.String),
          CurrentPinPekKeyCheckValue: S.optional(S.String),
        }),
      ).annotate({ identifier: "VisaAmexDerivationOutputs" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          NewPinPekArn: S.String,
          SecureMessagingIntegrityKeyArn: S.String,
          SecureMessagingConfidentialityKeyArn: S.String,
          Mac: SensitiveString,
          EncryptedPinBlock: SensitiveString,
          NewPinPekKeyCheckValue: S.String,
          SecureMessagingIntegrityKeyCheckValue: S.String,
          SecureMessagingConfidentialityKeyCheckValue: S.String,
          VisaAmexDerivationOutputs: S.optional(__S(71, __c4, 7)),
        }),
      ).annotate({ identifier: "GenerateMacEmvPinChangeOutput" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ PinVerificationKeyIndex: S.Number })).annotate({
        identifier: "VisaPin",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ EncryptedPinBlock: SensitiveString, PinVerificationKeyIndex: S.Number }),
      ).annotate({ identifier: "VisaPinVerificationValue" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          EncryptedPinBlock: SensitiveString,
          DecimalizationTable: SensitiveString,
          PinValidationDataPadCharacter: S.String,
          PinValidationData: SensitiveString,
        }),
      ).annotate({ identifier: "Ibm3624PinOffset" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          DecimalizationTable: SensitiveString,
          PinValidationDataPadCharacter: S.String,
          PinValidationData: SensitiveString,
        }),
      ).annotate({ identifier: "Ibm3624NaturalPin" });
    case 4:
      return S.Union([
        /*@__PURE__*/ S.Struct({ VisaPin: __S(80, __c5, 0) }),
        /*@__PURE__*/ S.Struct({ VisaPinVerificationValue: __S(81, __c5, 1) }),
        /*@__PURE__*/ S.Struct({ Ibm3624PinOffset: __S(82, __c5, 2) }),
        /*@__PURE__*/ S.Struct({ Ibm3624NaturalPin: __S(83, __c5, 3) }),
        /*@__PURE__*/ S.Struct({ Ibm3624RandomPin: __S(83, __c5, 3) }),
        /*@__PURE__*/ S.Struct({ Ibm3624PinFromOffset: __S(96, __c6, 0) }),
      ]);
    case 5:
      return S.suspend(() =>
        S.Struct({
          GenerationKeyIdentifier: S.String,
          EncryptionKeyIdentifier: S.String,
          GenerationAttributes: __S(84, __c5, 4),
          PinDataLength: S.optional(S.Number),
          PrimaryAccountNumber: S.optional(SensitiveString),
          PinBlockFormat: S.String,
          EncryptionWrappedKey: S.optional(__S(290, __c18, 2)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/pindata/generate" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GeneratePinDataInput" });
    case 6:
      return S.Union([
        /*@__PURE__*/ S.Struct({ PinOffset: SensitiveString }),
        /*@__PURE__*/ S.Struct({ VerificationValue: SensitiveString }),
      ]);
    case 7:
      return S.suspend(() =>
        S.Struct({
          GenerationKeyArn: S.String,
          GenerationKeyCheckValue: S.String,
          EncryptionKeyArn: S.String,
          EncryptionKeyCheckValue: S.String,
          EncryptedPinBlock: SensitiveString,
          PinData: __S(86, __c5, 6),
        }),
      ).annotate({ identifier: "GeneratePinDataOutput" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DecimalizationTable: SensitiveString,
          PinValidationDataPadCharacter: S.String,
          PinValidationData: SensitiveString,
          PinOffset: SensitiveString,
        }),
      ).annotate({ identifier: "Ibm3624PinFromOffset" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.Union([
        /*@__PURE__*/ S.Struct({ Symmetric: __S(304, __c19, 0) }),
        /*@__PURE__*/ S.Struct({ Asymmetric: __S(305, __c19, 1) }),
        /*@__PURE__*/ S.Struct({ Dukpt: __S(306, __c19, 2) }),
      ]);
    case 1:
      return S.suspend(() =>
        S.Struct({
          IncomingKeyIdentifier: S.String.pipe(T.HttpLabel("IncomingKeyIdentifier")),
          OutgoingKeyIdentifier: S.String,
          CipherText: SensitiveString,
          IncomingEncryptionAttributes: __S(112, __c7, 0),
          OutgoingEncryptionAttributes: __S(112, __c7, 0),
          IncomingWrappedKey: S.optional(__S(290, __c18, 2)),
          OutgoingWrappedKey: S.optional(__S(290, __c18, 2)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/keys/{IncomingKeyIdentifier}/reencrypt" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ReEncryptDataInput" });
    case 2:
      return S.suspend(() =>
        S.Struct({ KeyArn: S.String, KeyCheckValue: S.String, CipherText: SensitiveString }),
      ).annotate({ identifier: "ReEncryptDataOutput" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.Union([/*@__PURE__*/ S.Struct({ SharedInformation: S.String })]);
    case 1:
      return S.suspend(() =>
        S.Struct({
          PrivateKeyIdentifier: S.String,
          CertificateAuthorityPublicKeyIdentifier: S.String,
          PublicKeyCertificate: S.String,
          DeriveKeyAlgorithm: S.String,
          KeyDerivationFunction: S.String,
          KeyDerivationHashAlgorithm: S.String,
          DerivationData: __S(128, __c8, 0),
          WrappedKeyBlock: SensitiveString,
        }),
      ).annotate({ identifier: "IncomingDiffieHellmanTr31KeyBlock" });
    case 2:
      return S.Union([/*@__PURE__*/ S.Struct({ DiffieHellmanTr31KeyBlock: __S(129, __c8, 1) })]);
    case 3:
      return S.suspend(() => S.Struct({ WrappingKeyIdentifier: S.String })).annotate({
        identifier: "OutgoingTr31KeyBlock",
      });
    case 4:
      return S.Union([/*@__PURE__*/ S.Struct({ Tr31KeyBlock: __S(131, __c8, 3) })]);
    case 5:
      return S.suspend(() =>
        S.Struct({
          IncomingKeyMaterial: __S(130, __c8, 2),
          OutgoingKeyMaterial: __S(132, __c8, 4),
          KeyCheckValueAlgorithm: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/keymaterial/translate" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "TranslateKeyMaterialInput" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          WrappedKeyMaterial: SensitiveString,
          KeyCheckValue: S.String,
          WrappedKeyMaterialFormat: S.String,
        }),
      ).annotate({ identifier: "WrappedWorkingKey" });
    case 7:
      return S.suspend(() => S.Struct({ WrappedKey: __S(134, __c8, 6) })).annotate({
        identifier: "TranslateKeyMaterialOutput",
      });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ PrimaryAccountNumber: SensitiveString })).annotate({
        identifier: "TranslationPinDataIsoFormat034",
      });
    case 1:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "TranslationPinDataIsoFormat1" });
    case 2:
      return S.Union([
        /*@__PURE__*/ S.Struct({ IsoFormat0: __S(144, __c9, 0) }),
        /*@__PURE__*/ S.Struct({ IsoFormat1: __S(145, __c9, 1) }),
        /*@__PURE__*/ S.Struct({ IsoFormat3: __S(144, __c9, 0) }),
        /*@__PURE__*/ S.Struct({ IsoFormat4: __S(144, __c9, 0) }),
        /*@__PURE__*/ S.Struct({ As2805Format0: __S(144, __c9, 0) }),
      ]);
    case 3:
      return S.suspend(() =>
        S.Struct({
          KeySerialNumber: S.String,
          DukptKeyDerivationType: S.optional(S.String),
          DukptKeyVariant: S.optional(S.String),
        }),
      ).annotate({ identifier: "DukptDerivationAttributes" });
    case 4:
      return S.suspend(() =>
        S.Struct({ SystemTraceAuditNumber: S.String, TransactionAmount: S.String }),
      ).annotate({ identifier: "As2805PekDerivationAttributes" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          IncomingKeyIdentifier: S.String,
          OutgoingKeyIdentifier: S.String,
          IncomingTranslationAttributes: __S(146, __c9, 2),
          OutgoingTranslationAttributes: __S(146, __c9, 2),
          EncryptedPinBlock: SensitiveString,
          IncomingDukptAttributes: S.optional(__S(147, __c9, 3)),
          OutgoingDukptAttributes: S.optional(__S(147, __c9, 3)),
          IncomingWrappedKey: S.optional(__S(290, __c18, 2)),
          OutgoingWrappedKey: S.optional(__S(290, __c18, 2)),
          IncomingAs2805Attributes: S.optional(__S(148, __c9, 4)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/pindata/translate" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "TranslatePinDataInput" });
    case 6:
      return S.suspend(() =>
        S.Struct({ PinBlock: SensitiveString, KeyArn: S.String, KeyCheckValue: S.String }),
      ).annotate({ identifier: "TranslatePinDataOutput" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ AuthResponseCode: S.String })).annotate({
        identifier: "CryptogramVerificationArpcMethod1",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CardStatusUpdate: S.String,
          ProprietaryAuthenticationData: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "CryptogramVerificationArpcMethod2" });
    case 2:
      return S.Union([
        /*@__PURE__*/ S.Struct({ ArpcMethod1: __S(160, __c10, 0) }),
        /*@__PURE__*/ S.Struct({ ArpcMethod2: __S(161, __c10, 1) }),
      ]);
    case 3:
      return S.suspend(() =>
        S.Struct({
          KeyIdentifier: S.String,
          TransactionData: SensitiveString,
          AuthRequestCryptogram: SensitiveString,
          MajorKeyDerivationMode: S.String,
          SessionKeyDerivationAttributes: __S(371, __c23, 3),
          AuthResponseAttributes: S.optional(__S(162, __c10, 2)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/cryptogram/verify" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "VerifyAuthRequestCryptogramInput" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          KeyArn: S.String,
          KeyCheckValue: S.String,
          AuthResponseValue: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "VerifyAuthRequestCryptogramOutput" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CardExpiryDate: SensitiveString,
          UnpredictableNumber: S.String,
          ApplicationTransactionCounter: S.String,
        }),
      ).annotate({ identifier: "DiscoverDynamicCardVerificationCode" });
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ AmexCardSecurityCodeVersion1: __S(16, __c1, 0) }),
        /*@__PURE__*/ S.Struct({ AmexCardSecurityCodeVersion2: __S(17, __c1, 1) }),
        /*@__PURE__*/ S.Struct({ CardVerificationValue1: __S(17, __c1, 1) }),
        /*@__PURE__*/ S.Struct({ CardVerificationValue2: __S(16, __c1, 0) }),
        /*@__PURE__*/ S.Struct({ CardHolderVerificationValue: __S(18, __c1, 2) }),
        /*@__PURE__*/ S.Struct({ DynamicCardVerificationCode: __S(19, __c1, 3) }),
        /*@__PURE__*/ S.Struct({ DynamicCardVerificationValue: __S(20, __c1, 4) }),
        /*@__PURE__*/ S.Struct({ DiscoverDynamicCardVerificationCode: __S(176, __c11, 0) }),
      ]);
    case 2:
      return S.suspend(() =>
        S.Struct({
          KeyIdentifier: S.String,
          PrimaryAccountNumber: SensitiveString,
          VerificationAttributes: __S(177, __c11, 1),
          ValidationData: SensitiveString,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/cardvalidationdata/verify" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "VerifyCardValidationDataInput" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ KeyArn: S.String, KeyCheckValue: S.String })).annotate({
        identifier: "VerifyCardValidationDataOutput",
      });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          KeyIdentifier: S.String,
          MessageData: SensitiveString,
          Mac: SensitiveString,
          VerificationAttributes: __S(51, __c3, 3),
          MacLength: S.optional(S.Number),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/mac/verify" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "VerifyMacInput" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ PinVerificationKeyIndex: S.Number, VerificationValue: SensitiveString }),
      ).annotate({ identifier: "VisaPinVerification" });
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ VisaPin: __S(224, __c14, 0) }),
        /*@__PURE__*/ S.Struct({ Ibm3624Pin: __S(96, __c6, 0) }),
      ]);
    case 2:
      return S.suspend(() =>
        S.Struct({ KeySerialNumber: S.String, DukptDerivationType: S.String }),
      ).annotate({ identifier: "DukptAttributes" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          VerificationKeyIdentifier: S.String,
          EncryptionKeyIdentifier: S.String,
          VerificationAttributes: __S(225, __c14, 1),
          EncryptedPinBlock: SensitiveString,
          PrimaryAccountNumber: S.optional(SensitiveString),
          PinBlockFormat: S.String,
          PinDataLength: S.optional(S.Number),
          DukptAttributes: S.optional(__S(226, __c14, 2)),
          EncryptionWrappedKey: S.optional(__S(290, __c18, 2)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/pindata/verify" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "VerifyPinDataInput" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          VerificationKeyArn: S.String,
          VerificationKeyCheckValue: S.String,
          EncryptionKeyArn: S.String,
          EncryptionKeyCheckValue: S.String,
        }),
      ).annotate({ identifier: "VerifyPinDataOutput" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ path: S.String, message: S.String })).annotate({
        identifier: "ValidationExceptionField",
      });
    case 1:
      return S.Array(__S(240, __c15, 0));
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          KeyIdentifier: S.String.pipe(T.HttpLabel("KeyIdentifier")),
          CipherText: SensitiveString,
          DecryptionAttributes: __S(273, __c17, 1),
          WrappedKey: S.optional(__S(290, __c18, 2)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/keys/{KeyIdentifier}/decrypt" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DecryptDataInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ KeyArn: S.String, KeyCheckValue: S.String, PlainText: SensitiveString }),
      ).annotate({ identifier: "DecryptDataOutput" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MajorKeyDerivationMode: S.String,
          PrimaryAccountNumber: SensitiveString,
          PanSequenceNumber: S.String,
          SessionDerivationData: SensitiveString,
          Mode: S.optional(S.String),
          InitializationVector: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "EmvEncryptionAttributes" });
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ Symmetric: __S(304, __c19, 0) }),
        /*@__PURE__*/ S.Struct({ Asymmetric: __S(305, __c19, 1) }),
        /*@__PURE__*/ S.Struct({ Dukpt: __S(306, __c19, 2) }),
        /*@__PURE__*/ S.Struct({ Emv: __S(272, __c17, 0) }),
      ]);
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CertificateAuthorityPublicKeyIdentifier: S.String,
          PublicKeyCertificate: S.String,
          KeyAlgorithm: S.String,
          KeyDerivationFunction: S.String,
          KeyDerivationHashAlgorithm: S.String,
          SharedInformation: S.String,
        }),
      ).annotate({ identifier: "EcdhDerivationAttributes" });
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ Tr31KeyBlock: SensitiveString }),
        /*@__PURE__*/ S.Struct({ DiffieHellmanSymmetricKey: __S(288, __c18, 0) }),
      ]);
    case 2:
      return S.suspend(() =>
        S.Struct({
          WrappedKeyMaterial: __S(289, __c18, 1),
          KeyCheckValueAlgorithm: S.optional(S.String),
        }),
      ).annotate({ identifier: "WrappedKey" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Mode: S.String,
          InitializationVector: S.optional(SensitiveString),
          PaddingType: S.optional(S.String),
        }),
      ).annotate({ identifier: "SymmetricEncryptionAttributes" });
    case 1:
      return S.suspend(() => S.Struct({ PaddingType: S.optional(S.String) })).annotate({
        identifier: "AsymmetricEncryptionAttributes",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          KeySerialNumber: S.String,
          Mode: S.optional(S.String),
          DukptKeyDerivationType: S.optional(S.String),
          DukptKeyVariant: S.optional(S.String),
          InitializationVector: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "DukptEncryptionAttributes" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          KeyIdentifier: S.String.pipe(T.HttpLabel("KeyIdentifier")),
          PlainText: SensitiveString,
          EncryptionAttributes: __S(273, __c17, 1),
          WrappedKey: S.optional(__S(290, __c18, 2)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/keys/{KeyIdentifier}/encrypt" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "EncryptDataInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          KeyArn: S.String,
          KeyCheckValue: S.optional(S.String),
          CipherText: SensitiveString,
        }),
      ).annotate({ identifier: "EncryptDataOutput" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DeriveKeyAlgorithm: S.String, RandomKeyMaxLength: S.optional(S.String) }),
      ).annotate({ identifier: "KekValidationRequest" });
    case 1:
      return S.suspend(() => S.Struct({ RandomKeySend: SensitiveString })).annotate({
        identifier: "KekValidationResponse",
      });
    case 2:
      return S.Union([
        /*@__PURE__*/ S.Struct({ KekValidationRequest: __S(336, __c21, 0) }),
        /*@__PURE__*/ S.Struct({ KekValidationResponse: __S(337, __c21, 1) }),
      ]);
    case 3:
      return S.suspend(() =>
        S.Struct({
          KeyIdentifier: S.String,
          KekValidationType: __S(338, __c21, 2),
          RandomKeySendVariantMask: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/as2805kekvalidation/generate" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GenerateAs2805KekValidationInput" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          KeyArn: S.String,
          KeyCheckValue: S.String,
          RandomKeySend: SensitiveString,
          RandomKeyReceive: SensitiveString,
        }),
      ).annotate({ identifier: "GenerateAs2805KekValidationOutput" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          KeyIdentifier: S.String,
          TransactionData: SensitiveString,
          MajorKeyDerivationMode: S.String,
          SessionKeyDerivationAttributes: __S(371, __c23, 3),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/cryptogram/generate" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GenerateAuthRequestCryptogramInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          KeyArn: S.String,
          KeyCheckValue: S.String,
          AuthRequestCryptogram: SensitiveString,
        }),
      ).annotate({ identifier: "GenerateAuthRequestCryptogramOutput" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PrimaryAccountNumber: SensitiveString,
          PanSequenceNumber: S.String,
          ApplicationTransactionCounter: S.String,
        }),
      ).annotate({ identifier: "SessionKeyEmvCommon" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          PrimaryAccountNumber: SensitiveString,
          PanSequenceNumber: S.String,
          ApplicationTransactionCounter: S.String,
          UnpredictableNumber: S.String,
        }),
      ).annotate({ identifier: "SessionKeyMastercard" });
    case 2:
      return S.suspend(() =>
        S.Struct({ PrimaryAccountNumber: SensitiveString, PanSequenceNumber: S.String }),
      ).annotate({ identifier: "SessionKeyAmex" });
    case 3:
      return S.Union([
        /*@__PURE__*/ S.Struct({ EmvCommon: __S(368, __c23, 0) }),
        /*@__PURE__*/ S.Struct({ Mastercard: __S(369, __c23, 1) }),
        /*@__PURE__*/ S.Struct({ Emv2000: __S(368, __c23, 0) }),
        /*@__PURE__*/ S.Struct({ Amex: __S(370, __c23, 2) }),
        /*@__PURE__*/ S.Struct({ Visa: __S(370, __c23, 2) }),
        /*@__PURE__*/ S.Struct({ UnionPay: __S(368, __c23, 0) }),
      ]);
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
