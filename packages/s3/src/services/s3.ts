import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import * as TxHost from "@distilled.cloud/core/telemetry-host-rules";
import * as TxXray from "@distilled.cloud/core/telemetry-xray";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import type * as stream from "effect/Stream";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import { SensitiveString } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const ns = /*@__PURE__*/ T.XmlNamespace("http://s3.amazonaws.com/doc/2006-03-01/");
const svc = /*@__PURE__*/ T.AwsApiService({ sdkId: "S3", serviceShapeName: "AmazonS3" });
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "s3" });
const ver = /*@__PURE__*/ T.ServiceVersion("2006-03-01");
const proto = /*@__PURE__*/ T.AwsProtocolsRestXml();
const rules = /*@__PURE__*/ T.EndpointResolver(
  (p, _) => {
    const {
      Bucket,
      Region,
      UseFIPS = false,
      UseDualStack = false,
      Endpoint,
      ForcePathStyle = false,
      Accelerate = false,
      UseGlobalEndpoint = false,
      UseObjectLambdaEndpoint,
      _Key,
      _Prefix,
      _CopySource,
      DisableAccessPoints,
      DisableMultiRegionAccessPoints = false,
      UseArnRegion,
      UseS3ExpressControlEndpoint,
      DisableS3ExpressSessionAuth,
    } = p;
    const e = (u: unknown, p = {}, h = {}): T.EndpointResolverResult => ({
      type: "endpoint" as const,
      endpoint: { url: u as string, properties: p, headers: h },
    });
    const err = (m: unknown): T.EndpointResolverResult => ({
      type: "error" as const,
      message: m as string,
    });
    const _p0 = (_0: unknown) => ({
      backend: "S3Express",
      authSchemes: [
        {
          disableDoubleEncoding: true,
          name: "sigv4",
          signingName: "s3express",
          signingRegion: `${_0}`,
        },
      ],
    });
    const _p1 = (_0: unknown) => ({
      backend: "S3Express",
      authSchemes: [
        {
          disableDoubleEncoding: true,
          name: "sigv4-s3express",
          signingName: "s3express",
          signingRegion: `${_0}`,
        },
      ],
    });
    const _p2 = (_0: unknown) => ({
      authSchemes: [
        {
          disableDoubleEncoding: true,
          name: "sigv4a",
          signingName: "s3-outposts",
          signingRegionSet: ["*"],
        },
        {
          disableDoubleEncoding: true,
          name: "sigv4",
          signingName: "s3-outposts",
          signingRegion: `${_0}`,
        },
      ],
    });
    const _p3 = () => ({
      authSchemes: [
        {
          disableDoubleEncoding: true,
          name: "sigv4",
          signingName: "s3",
          signingRegion: "us-east-1",
        },
      ],
    });
    const _p4 = (_0: unknown) => ({
      authSchemes: [
        { disableDoubleEncoding: true, name: "sigv4", signingName: "s3", signingRegion: `${_0}` },
      ],
    });
    const _p5 = (_0: unknown) => ({
      authSchemes: [
        {
          disableDoubleEncoding: true,
          name: "sigv4",
          signingName: "s3-object-lambda",
          signingRegion: `${_.getAttr(_0, "region")}`,
        },
      ],
    });
    const _p6 = (_0: unknown) => ({
      authSchemes: [
        {
          disableDoubleEncoding: true,
          name: "sigv4",
          signingName: "s3",
          signingRegion: `${_.getAttr(_0, "region")}`,
        },
      ],
    });
    const _p7 = (_0: unknown) => ({
      authSchemes: [
        {
          disableDoubleEncoding: true,
          name: "sigv4a",
          signingName: "s3-outposts",
          signingRegionSet: ["*"],
        },
        {
          disableDoubleEncoding: true,
          name: "sigv4",
          signingName: "s3-outposts",
          signingRegion: `${_.getAttr(_0, "region")}`,
        },
      ],
    });
    const _p8 = (_0: unknown) => ({
      authSchemes: [
        {
          disableDoubleEncoding: true,
          name: "sigv4",
          signingName: "s3-object-lambda",
          signingRegion: `${_0}`,
        },
      ],
    });
    if (Region != null) {
      if (Accelerate === true && UseFIPS === true) {
        return err("Accelerate cannot be used with FIPS");
      }
      if (UseDualStack === true && Endpoint != null) {
        return err("Cannot set dual-stack in combination with a custom endpoint.");
      }
      if (Endpoint != null && UseFIPS === true) {
        return err("A custom endpoint cannot be combined with FIPS");
      }
      if (Endpoint != null && Accelerate === true) {
        return err("A custom endpoint cannot be combined with S3 Accelerate");
      }
      {
        const partitionResult = _.partition(Region);
        if (
          UseFIPS === true &&
          partitionResult != null &&
          partitionResult !== false &&
          _.getAttr(partitionResult, "name") === "aws-cn"
        ) {
          return err("Partition does not support FIPS");
        }
      }
      {
        const bucketSuffix = _.substring(Bucket, 0, 6, true);
        if (
          Bucket != null &&
          bucketSuffix != null &&
          bucketSuffix !== false &&
          bucketSuffix === "--x-s3"
        ) {
          if (Accelerate === true) {
            return err("S3Express does not support S3 Accelerate.");
          }
          {
            const url = _.parseURL(Endpoint);
            if (Endpoint != null && url != null && url !== false) {
              if (DisableS3ExpressSessionAuth != null && DisableS3ExpressSessionAuth === true) {
                if (_.getAttr(url, "isIp") === true) {
                  {
                    const uri_encoded_bucket = _.uriEncode(Bucket);
                    if (uri_encoded_bucket != null && uri_encoded_bucket !== false) {
                      return e(
                        `${_.getAttr(url, "scheme")}://${_.getAttr(url, "authority")}/${uri_encoded_bucket}${_.getAttr(url, "path")}`,
                        _p0(Region),
                        {},
                      );
                    }
                  }
                }
                if (_.isVirtualHostableS3Bucket(Bucket, false)) {
                  return e(
                    `${_.getAttr(url, "scheme")}://${Bucket}.${_.getAttr(url, "authority")}${_.getAttr(url, "path")}`,
                    _p0(Region),
                    {},
                  );
                }
                return err("S3Express bucket name is not a valid virtual hostable name.");
              }
              if (_.getAttr(url, "isIp") === true) {
                {
                  const uri_encoded_bucket = _.uriEncode(Bucket);
                  if (uri_encoded_bucket != null && uri_encoded_bucket !== false) {
                    return e(
                      `${_.getAttr(url, "scheme")}://${_.getAttr(url, "authority")}/${uri_encoded_bucket}${_.getAttr(url, "path")}`,
                      _p1(Region),
                      {},
                    );
                  }
                }
              }
              if (_.isVirtualHostableS3Bucket(Bucket, false)) {
                return e(
                  `${_.getAttr(url, "scheme")}://${Bucket}.${_.getAttr(url, "authority")}${_.getAttr(url, "path")}`,
                  _p1(Region),
                  {},
                );
              }
              return err("S3Express bucket name is not a valid virtual hostable name.");
            }
          }
          if (UseS3ExpressControlEndpoint != null && UseS3ExpressControlEndpoint === true) {
            {
              const partitionResult = _.partition(Region);
              if (partitionResult != null && partitionResult !== false) {
                {
                  const uri_encoded_bucket = _.uriEncode(Bucket);
                  if (
                    uri_encoded_bucket != null &&
                    uri_encoded_bucket !== false &&
                    !(Endpoint != null)
                  ) {
                    if (UseFIPS === true && UseDualStack === true) {
                      return e(
                        `https://s3express-control-fips.dualstack.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}/${uri_encoded_bucket}`,
                        _p0(Region),
                        {},
                      );
                    }
                    if (UseFIPS === true && UseDualStack === false) {
                      return e(
                        `https://s3express-control-fips.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}/${uri_encoded_bucket}`,
                        _p0(Region),
                        {},
                      );
                    }
                    if (UseFIPS === false && UseDualStack === true) {
                      return e(
                        `https://s3express-control.dualstack.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}/${uri_encoded_bucket}`,
                        _p0(Region),
                        {},
                      );
                    }
                    if (UseFIPS === false && UseDualStack === false) {
                      return e(
                        `https://s3express-control.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}/${uri_encoded_bucket}`,
                        _p0(Region),
                        {},
                      );
                    }
                  }
                }
              }
            }
          }
          if (_.isVirtualHostableS3Bucket(Bucket, false)) {
            {
              const partitionResult = _.partition(Region);
              if (partitionResult != null && partitionResult !== false) {
                if (DisableS3ExpressSessionAuth != null && DisableS3ExpressSessionAuth === true) {
                  {
                    const s3expressAvailabilityZoneId = _.substring(Bucket, 6, 14, true);
                    const s3expressAvailabilityZoneDelim = _.substring(Bucket, 14, 16, true);
                    if (
                      s3expressAvailabilityZoneId != null &&
                      s3expressAvailabilityZoneId !== false &&
                      s3expressAvailabilityZoneDelim != null &&
                      s3expressAvailabilityZoneDelim !== false &&
                      s3expressAvailabilityZoneDelim === "--"
                    ) {
                      if (UseFIPS === true && UseDualStack === true) {
                        return e(
                          `https://${Bucket}.s3express-fips-${s3expressAvailabilityZoneId}.dualstack.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                          _p0(Region),
                          {},
                        );
                      }
                      if (UseFIPS === true && UseDualStack === false) {
                        return e(
                          `https://${Bucket}.s3express-fips-${s3expressAvailabilityZoneId}.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                          _p0(Region),
                          {},
                        );
                      }
                      if (UseFIPS === false && UseDualStack === true) {
                        return e(
                          `https://${Bucket}.s3express-${s3expressAvailabilityZoneId}.dualstack.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                          _p0(Region),
                          {},
                        );
                      }
                      if (UseFIPS === false && UseDualStack === false) {
                        return e(
                          `https://${Bucket}.s3express-${s3expressAvailabilityZoneId}.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                          _p0(Region),
                          {},
                        );
                      }
                    }
                  }
                  {
                    const s3expressAvailabilityZoneId = _.substring(Bucket, 6, 15, true);
                    const s3expressAvailabilityZoneDelim = _.substring(Bucket, 15, 17, true);
                    if (
                      s3expressAvailabilityZoneId != null &&
                      s3expressAvailabilityZoneId !== false &&
                      s3expressAvailabilityZoneDelim != null &&
                      s3expressAvailabilityZoneDelim !== false &&
                      s3expressAvailabilityZoneDelim === "--"
                    ) {
                      if (UseFIPS === true && UseDualStack === true) {
                        return e(
                          `https://${Bucket}.s3express-fips-${s3expressAvailabilityZoneId}.dualstack.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                          _p0(Region),
                          {},
                        );
                      }
                      if (UseFIPS === true && UseDualStack === false) {
                        return e(
                          `https://${Bucket}.s3express-fips-${s3expressAvailabilityZoneId}.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                          _p0(Region),
                          {},
                        );
                      }
                      if (UseFIPS === false && UseDualStack === true) {
                        return e(
                          `https://${Bucket}.s3express-${s3expressAvailabilityZoneId}.dualstack.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                          _p0(Region),
                          {},
                        );
                      }
                      if (UseFIPS === false && UseDualStack === false) {
                        return e(
                          `https://${Bucket}.s3express-${s3expressAvailabilityZoneId}.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                          _p0(Region),
                          {},
                        );
                      }
                    }
                  }
                  {
                    const s3expressAvailabilityZoneId = _.substring(Bucket, 6, 19, true);
                    const s3expressAvailabilityZoneDelim = _.substring(Bucket, 19, 21, true);
                    if (
                      s3expressAvailabilityZoneId != null &&
                      s3expressAvailabilityZoneId !== false &&
                      s3expressAvailabilityZoneDelim != null &&
                      s3expressAvailabilityZoneDelim !== false &&
                      s3expressAvailabilityZoneDelim === "--"
                    ) {
                      if (UseFIPS === true && UseDualStack === true) {
                        return e(
                          `https://${Bucket}.s3express-fips-${s3expressAvailabilityZoneId}.dualstack.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                          _p0(Region),
                          {},
                        );
                      }
                      if (UseFIPS === true && UseDualStack === false) {
                        return e(
                          `https://${Bucket}.s3express-fips-${s3expressAvailabilityZoneId}.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                          _p0(Region),
                          {},
                        );
                      }
                      if (UseFIPS === false && UseDualStack === true) {
                        return e(
                          `https://${Bucket}.s3express-${s3expressAvailabilityZoneId}.dualstack.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                          _p0(Region),
                          {},
                        );
                      }
                      if (UseFIPS === false && UseDualStack === false) {
                        return e(
                          `https://${Bucket}.s3express-${s3expressAvailabilityZoneId}.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                          _p0(Region),
                          {},
                        );
                      }
                    }
                  }
                  {
                    const s3expressAvailabilityZoneId = _.substring(Bucket, 6, 20, true);
                    const s3expressAvailabilityZoneDelim = _.substring(Bucket, 20, 22, true);
                    if (
                      s3expressAvailabilityZoneId != null &&
                      s3expressAvailabilityZoneId !== false &&
                      s3expressAvailabilityZoneDelim != null &&
                      s3expressAvailabilityZoneDelim !== false &&
                      s3expressAvailabilityZoneDelim === "--"
                    ) {
                      if (UseFIPS === true && UseDualStack === true) {
                        return e(
                          `https://${Bucket}.s3express-fips-${s3expressAvailabilityZoneId}.dualstack.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                          _p0(Region),
                          {},
                        );
                      }
                      if (UseFIPS === true && UseDualStack === false) {
                        return e(
                          `https://${Bucket}.s3express-fips-${s3expressAvailabilityZoneId}.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                          _p0(Region),
                          {},
                        );
                      }
                      if (UseFIPS === false && UseDualStack === true) {
                        return e(
                          `https://${Bucket}.s3express-${s3expressAvailabilityZoneId}.dualstack.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                          _p0(Region),
                          {},
                        );
                      }
                      if (UseFIPS === false && UseDualStack === false) {
                        return e(
                          `https://${Bucket}.s3express-${s3expressAvailabilityZoneId}.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                          _p0(Region),
                          {},
                        );
                      }
                    }
                  }
                  {
                    const s3expressAvailabilityZoneId = _.substring(Bucket, 6, 26, true);
                    const s3expressAvailabilityZoneDelim = _.substring(Bucket, 26, 28, true);
                    if (
                      s3expressAvailabilityZoneId != null &&
                      s3expressAvailabilityZoneId !== false &&
                      s3expressAvailabilityZoneDelim != null &&
                      s3expressAvailabilityZoneDelim !== false &&
                      s3expressAvailabilityZoneDelim === "--"
                    ) {
                      if (UseFIPS === true && UseDualStack === true) {
                        return e(
                          `https://${Bucket}.s3express-fips-${s3expressAvailabilityZoneId}.dualstack.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                          _p0(Region),
                          {},
                        );
                      }
                      if (UseFIPS === true && UseDualStack === false) {
                        return e(
                          `https://${Bucket}.s3express-fips-${s3expressAvailabilityZoneId}.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                          _p0(Region),
                          {},
                        );
                      }
                      if (UseFIPS === false && UseDualStack === true) {
                        return e(
                          `https://${Bucket}.s3express-${s3expressAvailabilityZoneId}.dualstack.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                          _p0(Region),
                          {},
                        );
                      }
                      if (UseFIPS === false && UseDualStack === false) {
                        return e(
                          `https://${Bucket}.s3express-${s3expressAvailabilityZoneId}.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                          _p0(Region),
                          {},
                        );
                      }
                    }
                  }
                  return err("Unrecognized S3Express bucket name format.");
                }
                {
                  const s3expressAvailabilityZoneId = _.substring(Bucket, 6, 14, true);
                  const s3expressAvailabilityZoneDelim = _.substring(Bucket, 14, 16, true);
                  if (
                    s3expressAvailabilityZoneId != null &&
                    s3expressAvailabilityZoneId !== false &&
                    s3expressAvailabilityZoneDelim != null &&
                    s3expressAvailabilityZoneDelim !== false &&
                    s3expressAvailabilityZoneDelim === "--"
                  ) {
                    if (UseFIPS === true && UseDualStack === true) {
                      return e(
                        `https://${Bucket}.s3express-fips-${s3expressAvailabilityZoneId}.dualstack.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                        _p1(Region),
                        {},
                      );
                    }
                    if (UseFIPS === true && UseDualStack === false) {
                      return e(
                        `https://${Bucket}.s3express-fips-${s3expressAvailabilityZoneId}.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                        _p1(Region),
                        {},
                      );
                    }
                    if (UseFIPS === false && UseDualStack === true) {
                      return e(
                        `https://${Bucket}.s3express-${s3expressAvailabilityZoneId}.dualstack.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                        _p1(Region),
                        {},
                      );
                    }
                    if (UseFIPS === false && UseDualStack === false) {
                      return e(
                        `https://${Bucket}.s3express-${s3expressAvailabilityZoneId}.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                        _p1(Region),
                        {},
                      );
                    }
                  }
                }
                {
                  const s3expressAvailabilityZoneId = _.substring(Bucket, 6, 15, true);
                  const s3expressAvailabilityZoneDelim = _.substring(Bucket, 15, 17, true);
                  if (
                    s3expressAvailabilityZoneId != null &&
                    s3expressAvailabilityZoneId !== false &&
                    s3expressAvailabilityZoneDelim != null &&
                    s3expressAvailabilityZoneDelim !== false &&
                    s3expressAvailabilityZoneDelim === "--"
                  ) {
                    if (UseFIPS === true && UseDualStack === true) {
                      return e(
                        `https://${Bucket}.s3express-fips-${s3expressAvailabilityZoneId}.dualstack.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                        _p1(Region),
                        {},
                      );
                    }
                    if (UseFIPS === true && UseDualStack === false) {
                      return e(
                        `https://${Bucket}.s3express-fips-${s3expressAvailabilityZoneId}.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                        _p1(Region),
                        {},
                      );
                    }
                    if (UseFIPS === false && UseDualStack === true) {
                      return e(
                        `https://${Bucket}.s3express-${s3expressAvailabilityZoneId}.dualstack.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                        _p1(Region),
                        {},
                      );
                    }
                    if (UseFIPS === false && UseDualStack === false) {
                      return e(
                        `https://${Bucket}.s3express-${s3expressAvailabilityZoneId}.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                        _p1(Region),
                        {},
                      );
                    }
                  }
                }
                {
                  const s3expressAvailabilityZoneId = _.substring(Bucket, 6, 19, true);
                  const s3expressAvailabilityZoneDelim = _.substring(Bucket, 19, 21, true);
                  if (
                    s3expressAvailabilityZoneId != null &&
                    s3expressAvailabilityZoneId !== false &&
                    s3expressAvailabilityZoneDelim != null &&
                    s3expressAvailabilityZoneDelim !== false &&
                    s3expressAvailabilityZoneDelim === "--"
                  ) {
                    if (UseFIPS === true && UseDualStack === true) {
                      return e(
                        `https://${Bucket}.s3express-fips-${s3expressAvailabilityZoneId}.dualstack.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                        _p1(Region),
                        {},
                      );
                    }
                    if (UseFIPS === true && UseDualStack === false) {
                      return e(
                        `https://${Bucket}.s3express-fips-${s3expressAvailabilityZoneId}.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                        _p1(Region),
                        {},
                      );
                    }
                    if (UseFIPS === false && UseDualStack === true) {
                      return e(
                        `https://${Bucket}.s3express-${s3expressAvailabilityZoneId}.dualstack.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                        _p1(Region),
                        {},
                      );
                    }
                    if (UseFIPS === false && UseDualStack === false) {
                      return e(
                        `https://${Bucket}.s3express-${s3expressAvailabilityZoneId}.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                        _p1(Region),
                        {},
                      );
                    }
                  }
                }
                {
                  const s3expressAvailabilityZoneId = _.substring(Bucket, 6, 20, true);
                  const s3expressAvailabilityZoneDelim = _.substring(Bucket, 20, 22, true);
                  if (
                    s3expressAvailabilityZoneId != null &&
                    s3expressAvailabilityZoneId !== false &&
                    s3expressAvailabilityZoneDelim != null &&
                    s3expressAvailabilityZoneDelim !== false &&
                    s3expressAvailabilityZoneDelim === "--"
                  ) {
                    if (UseFIPS === true && UseDualStack === true) {
                      return e(
                        `https://${Bucket}.s3express-fips-${s3expressAvailabilityZoneId}.dualstack.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                        _p1(Region),
                        {},
                      );
                    }
                    if (UseFIPS === true && UseDualStack === false) {
                      return e(
                        `https://${Bucket}.s3express-fips-${s3expressAvailabilityZoneId}.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                        _p1(Region),
                        {},
                      );
                    }
                    if (UseFIPS === false && UseDualStack === true) {
                      return e(
                        `https://${Bucket}.s3express-${s3expressAvailabilityZoneId}.dualstack.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                        _p1(Region),
                        {},
                      );
                    }
                    if (UseFIPS === false && UseDualStack === false) {
                      return e(
                        `https://${Bucket}.s3express-${s3expressAvailabilityZoneId}.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                        _p1(Region),
                        {},
                      );
                    }
                  }
                }
                {
                  const s3expressAvailabilityZoneId = _.substring(Bucket, 6, 26, true);
                  const s3expressAvailabilityZoneDelim = _.substring(Bucket, 26, 28, true);
                  if (
                    s3expressAvailabilityZoneId != null &&
                    s3expressAvailabilityZoneId !== false &&
                    s3expressAvailabilityZoneDelim != null &&
                    s3expressAvailabilityZoneDelim !== false &&
                    s3expressAvailabilityZoneDelim === "--"
                  ) {
                    if (UseFIPS === true && UseDualStack === true) {
                      return e(
                        `https://${Bucket}.s3express-fips-${s3expressAvailabilityZoneId}.dualstack.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                        _p1(Region),
                        {},
                      );
                    }
                    if (UseFIPS === true && UseDualStack === false) {
                      return e(
                        `https://${Bucket}.s3express-fips-${s3expressAvailabilityZoneId}.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                        _p1(Region),
                        {},
                      );
                    }
                    if (UseFIPS === false && UseDualStack === true) {
                      return e(
                        `https://${Bucket}.s3express-${s3expressAvailabilityZoneId}.dualstack.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                        _p1(Region),
                        {},
                      );
                    }
                    if (UseFIPS === false && UseDualStack === false) {
                      return e(
                        `https://${Bucket}.s3express-${s3expressAvailabilityZoneId}.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                        _p1(Region),
                        {},
                      );
                    }
                  }
                }
                return err("Unrecognized S3Express bucket name format.");
              }
            }
          }
          return err("S3Express bucket name is not a valid virtual hostable name.");
        }
      }
      {
        const accessPointSuffix = _.substring(Bucket, 0, 7, true);
        if (
          Bucket != null &&
          accessPointSuffix != null &&
          accessPointSuffix !== false &&
          accessPointSuffix === "--xa-s3"
        ) {
          if (Accelerate === true) {
            return err("S3Express does not support S3 Accelerate.");
          }
          {
            const url = _.parseURL(Endpoint);
            if (Endpoint != null && url != null && url !== false) {
              if (DisableS3ExpressSessionAuth != null && DisableS3ExpressSessionAuth === true) {
                if (_.getAttr(url, "isIp") === true) {
                  {
                    const uri_encoded_bucket = _.uriEncode(Bucket);
                    if (uri_encoded_bucket != null && uri_encoded_bucket !== false) {
                      return e(
                        `${_.getAttr(url, "scheme")}://${_.getAttr(url, "authority")}/${uri_encoded_bucket}${_.getAttr(url, "path")}`,
                        _p0(Region),
                        {},
                      );
                    }
                  }
                }
                if (_.isVirtualHostableS3Bucket(Bucket, false)) {
                  return e(
                    `${_.getAttr(url, "scheme")}://${Bucket}.${_.getAttr(url, "authority")}${_.getAttr(url, "path")}`,
                    _p0(Region),
                    {},
                  );
                }
                return err("S3Express bucket name is not a valid virtual hostable name.");
              }
              if (_.getAttr(url, "isIp") === true) {
                {
                  const uri_encoded_bucket = _.uriEncode(Bucket);
                  if (uri_encoded_bucket != null && uri_encoded_bucket !== false) {
                    return e(
                      `${_.getAttr(url, "scheme")}://${_.getAttr(url, "authority")}/${uri_encoded_bucket}${_.getAttr(url, "path")}`,
                      _p1(Region),
                      {},
                    );
                  }
                }
              }
              if (_.isVirtualHostableS3Bucket(Bucket, false)) {
                return e(
                  `${_.getAttr(url, "scheme")}://${Bucket}.${_.getAttr(url, "authority")}${_.getAttr(url, "path")}`,
                  _p1(Region),
                  {},
                );
              }
              return err("S3Express bucket name is not a valid virtual hostable name.");
            }
          }
          if (_.isVirtualHostableS3Bucket(Bucket, false)) {
            {
              const partitionResult = _.partition(Region);
              if (partitionResult != null && partitionResult !== false) {
                if (DisableS3ExpressSessionAuth != null && DisableS3ExpressSessionAuth === true) {
                  {
                    const s3expressAvailabilityZoneId = _.substring(Bucket, 7, 15, true);
                    const s3expressAvailabilityZoneDelim = _.substring(Bucket, 15, 17, true);
                    if (
                      s3expressAvailabilityZoneId != null &&
                      s3expressAvailabilityZoneId !== false &&
                      s3expressAvailabilityZoneDelim != null &&
                      s3expressAvailabilityZoneDelim !== false &&
                      s3expressAvailabilityZoneDelim === "--"
                    ) {
                      if (UseFIPS === true && UseDualStack === true) {
                        return e(
                          `https://${Bucket}.s3express-fips-${s3expressAvailabilityZoneId}.dualstack.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                          _p0(Region),
                          {},
                        );
                      }
                      if (UseFIPS === true && UseDualStack === false) {
                        return e(
                          `https://${Bucket}.s3express-fips-${s3expressAvailabilityZoneId}.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                          _p0(Region),
                          {},
                        );
                      }
                      if (UseFIPS === false && UseDualStack === true) {
                        return e(
                          `https://${Bucket}.s3express-${s3expressAvailabilityZoneId}.dualstack.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                          _p0(Region),
                          {},
                        );
                      }
                      if (UseFIPS === false && UseDualStack === false) {
                        return e(
                          `https://${Bucket}.s3express-${s3expressAvailabilityZoneId}.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                          _p0(Region),
                          {},
                        );
                      }
                    }
                  }
                  {
                    const s3expressAvailabilityZoneId = _.substring(Bucket, 7, 16, true);
                    const s3expressAvailabilityZoneDelim = _.substring(Bucket, 16, 18, true);
                    if (
                      s3expressAvailabilityZoneId != null &&
                      s3expressAvailabilityZoneId !== false &&
                      s3expressAvailabilityZoneDelim != null &&
                      s3expressAvailabilityZoneDelim !== false &&
                      s3expressAvailabilityZoneDelim === "--"
                    ) {
                      if (UseFIPS === true && UseDualStack === true) {
                        return e(
                          `https://${Bucket}.s3express-fips-${s3expressAvailabilityZoneId}.dualstack.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                          _p0(Region),
                          {},
                        );
                      }
                      if (UseFIPS === true && UseDualStack === false) {
                        return e(
                          `https://${Bucket}.s3express-fips-${s3expressAvailabilityZoneId}.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                          _p0(Region),
                          {},
                        );
                      }
                      if (UseFIPS === false && UseDualStack === true) {
                        return e(
                          `https://${Bucket}.s3express-${s3expressAvailabilityZoneId}.dualstack.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                          _p0(Region),
                          {},
                        );
                      }
                      if (UseFIPS === false && UseDualStack === false) {
                        return e(
                          `https://${Bucket}.s3express-${s3expressAvailabilityZoneId}.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                          _p0(Region),
                          {},
                        );
                      }
                    }
                  }
                  {
                    const s3expressAvailabilityZoneId = _.substring(Bucket, 7, 20, true);
                    const s3expressAvailabilityZoneDelim = _.substring(Bucket, 20, 22, true);
                    if (
                      s3expressAvailabilityZoneId != null &&
                      s3expressAvailabilityZoneId !== false &&
                      s3expressAvailabilityZoneDelim != null &&
                      s3expressAvailabilityZoneDelim !== false &&
                      s3expressAvailabilityZoneDelim === "--"
                    ) {
                      if (UseFIPS === true && UseDualStack === true) {
                        return e(
                          `https://${Bucket}.s3express-fips-${s3expressAvailabilityZoneId}.dualstack.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                          _p0(Region),
                          {},
                        );
                      }
                      if (UseFIPS === true && UseDualStack === false) {
                        return e(
                          `https://${Bucket}.s3express-fips-${s3expressAvailabilityZoneId}.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                          _p0(Region),
                          {},
                        );
                      }
                      if (UseFIPS === false && UseDualStack === true) {
                        return e(
                          `https://${Bucket}.s3express-${s3expressAvailabilityZoneId}.dualstack.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                          _p0(Region),
                          {},
                        );
                      }
                      if (UseFIPS === false && UseDualStack === false) {
                        return e(
                          `https://${Bucket}.s3express-${s3expressAvailabilityZoneId}.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                          _p0(Region),
                          {},
                        );
                      }
                    }
                  }
                  {
                    const s3expressAvailabilityZoneId = _.substring(Bucket, 7, 21, true);
                    const s3expressAvailabilityZoneDelim = _.substring(Bucket, 21, 23, true);
                    if (
                      s3expressAvailabilityZoneId != null &&
                      s3expressAvailabilityZoneId !== false &&
                      s3expressAvailabilityZoneDelim != null &&
                      s3expressAvailabilityZoneDelim !== false &&
                      s3expressAvailabilityZoneDelim === "--"
                    ) {
                      if (UseFIPS === true && UseDualStack === true) {
                        return e(
                          `https://${Bucket}.s3express-fips-${s3expressAvailabilityZoneId}.dualstack.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                          _p0(Region),
                          {},
                        );
                      }
                      if (UseFIPS === true && UseDualStack === false) {
                        return e(
                          `https://${Bucket}.s3express-fips-${s3expressAvailabilityZoneId}.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                          _p0(Region),
                          {},
                        );
                      }
                      if (UseFIPS === false && UseDualStack === true) {
                        return e(
                          `https://${Bucket}.s3express-${s3expressAvailabilityZoneId}.dualstack.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                          _p0(Region),
                          {},
                        );
                      }
                      if (UseFIPS === false && UseDualStack === false) {
                        return e(
                          `https://${Bucket}.s3express-${s3expressAvailabilityZoneId}.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                          _p0(Region),
                          {},
                        );
                      }
                    }
                  }
                  {
                    const s3expressAvailabilityZoneId = _.substring(Bucket, 7, 27, true);
                    const s3expressAvailabilityZoneDelim = _.substring(Bucket, 27, 29, true);
                    if (
                      s3expressAvailabilityZoneId != null &&
                      s3expressAvailabilityZoneId !== false &&
                      s3expressAvailabilityZoneDelim != null &&
                      s3expressAvailabilityZoneDelim !== false &&
                      s3expressAvailabilityZoneDelim === "--"
                    ) {
                      if (UseFIPS === true && UseDualStack === true) {
                        return e(
                          `https://${Bucket}.s3express-fips-${s3expressAvailabilityZoneId}.dualstack.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                          _p0(Region),
                          {},
                        );
                      }
                      if (UseFIPS === true && UseDualStack === false) {
                        return e(
                          `https://${Bucket}.s3express-fips-${s3expressAvailabilityZoneId}.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                          _p0(Region),
                          {},
                        );
                      }
                      if (UseFIPS === false && UseDualStack === true) {
                        return e(
                          `https://${Bucket}.s3express-${s3expressAvailabilityZoneId}.dualstack.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                          _p0(Region),
                          {},
                        );
                      }
                      if (UseFIPS === false && UseDualStack === false) {
                        return e(
                          `https://${Bucket}.s3express-${s3expressAvailabilityZoneId}.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                          _p0(Region),
                          {},
                        );
                      }
                    }
                  }
                  return err("Unrecognized S3Express bucket name format.");
                }
                {
                  const s3expressAvailabilityZoneId = _.substring(Bucket, 7, 15, true);
                  const s3expressAvailabilityZoneDelim = _.substring(Bucket, 15, 17, true);
                  if (
                    s3expressAvailabilityZoneId != null &&
                    s3expressAvailabilityZoneId !== false &&
                    s3expressAvailabilityZoneDelim != null &&
                    s3expressAvailabilityZoneDelim !== false &&
                    s3expressAvailabilityZoneDelim === "--"
                  ) {
                    if (UseFIPS === true && UseDualStack === true) {
                      return e(
                        `https://${Bucket}.s3express-fips-${s3expressAvailabilityZoneId}.dualstack.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                        _p1(Region),
                        {},
                      );
                    }
                    if (UseFIPS === true && UseDualStack === false) {
                      return e(
                        `https://${Bucket}.s3express-fips-${s3expressAvailabilityZoneId}.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                        _p1(Region),
                        {},
                      );
                    }
                    if (UseFIPS === false && UseDualStack === true) {
                      return e(
                        `https://${Bucket}.s3express-${s3expressAvailabilityZoneId}.dualstack.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                        _p1(Region),
                        {},
                      );
                    }
                    if (UseFIPS === false && UseDualStack === false) {
                      return e(
                        `https://${Bucket}.s3express-${s3expressAvailabilityZoneId}.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                        _p1(Region),
                        {},
                      );
                    }
                  }
                }
                {
                  const s3expressAvailabilityZoneId = _.substring(Bucket, 7, 16, true);
                  const s3expressAvailabilityZoneDelim = _.substring(Bucket, 16, 18, true);
                  if (
                    s3expressAvailabilityZoneId != null &&
                    s3expressAvailabilityZoneId !== false &&
                    s3expressAvailabilityZoneDelim != null &&
                    s3expressAvailabilityZoneDelim !== false &&
                    s3expressAvailabilityZoneDelim === "--"
                  ) {
                    if (UseFIPS === true && UseDualStack === true) {
                      return e(
                        `https://${Bucket}.s3express-fips-${s3expressAvailabilityZoneId}.dualstack.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                        _p1(Region),
                        {},
                      );
                    }
                    if (UseFIPS === true && UseDualStack === false) {
                      return e(
                        `https://${Bucket}.s3express-fips-${s3expressAvailabilityZoneId}.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                        _p1(Region),
                        {},
                      );
                    }
                    if (UseFIPS === false && UseDualStack === true) {
                      return e(
                        `https://${Bucket}.s3express-${s3expressAvailabilityZoneId}.dualstack.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                        _p1(Region),
                        {},
                      );
                    }
                    if (UseFIPS === false && UseDualStack === false) {
                      return e(
                        `https://${Bucket}.s3express-${s3expressAvailabilityZoneId}.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                        _p1(Region),
                        {},
                      );
                    }
                  }
                }
                {
                  const s3expressAvailabilityZoneId = _.substring(Bucket, 7, 20, true);
                  const s3expressAvailabilityZoneDelim = _.substring(Bucket, 20, 22, true);
                  if (
                    s3expressAvailabilityZoneId != null &&
                    s3expressAvailabilityZoneId !== false &&
                    s3expressAvailabilityZoneDelim != null &&
                    s3expressAvailabilityZoneDelim !== false &&
                    s3expressAvailabilityZoneDelim === "--"
                  ) {
                    if (UseFIPS === true && UseDualStack === true) {
                      return e(
                        `https://${Bucket}.s3express-fips-${s3expressAvailabilityZoneId}.dualstack.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                        _p1(Region),
                        {},
                      );
                    }
                    if (UseFIPS === true && UseDualStack === false) {
                      return e(
                        `https://${Bucket}.s3express-fips-${s3expressAvailabilityZoneId}.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                        _p1(Region),
                        {},
                      );
                    }
                    if (UseFIPS === false && UseDualStack === true) {
                      return e(
                        `https://${Bucket}.s3express-${s3expressAvailabilityZoneId}.dualstack.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                        _p1(Region),
                        {},
                      );
                    }
                    if (UseFIPS === false && UseDualStack === false) {
                      return e(
                        `https://${Bucket}.s3express-${s3expressAvailabilityZoneId}.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                        _p1(Region),
                        {},
                      );
                    }
                  }
                }
                {
                  const s3expressAvailabilityZoneId = _.substring(Bucket, 7, 21, true);
                  const s3expressAvailabilityZoneDelim = _.substring(Bucket, 21, 23, true);
                  if (
                    s3expressAvailabilityZoneId != null &&
                    s3expressAvailabilityZoneId !== false &&
                    s3expressAvailabilityZoneDelim != null &&
                    s3expressAvailabilityZoneDelim !== false &&
                    s3expressAvailabilityZoneDelim === "--"
                  ) {
                    if (UseFIPS === true && UseDualStack === true) {
                      return e(
                        `https://${Bucket}.s3express-fips-${s3expressAvailabilityZoneId}.dualstack.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                        _p1(Region),
                        {},
                      );
                    }
                    if (UseFIPS === true && UseDualStack === false) {
                      return e(
                        `https://${Bucket}.s3express-fips-${s3expressAvailabilityZoneId}.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                        _p1(Region),
                        {},
                      );
                    }
                    if (UseFIPS === false && UseDualStack === true) {
                      return e(
                        `https://${Bucket}.s3express-${s3expressAvailabilityZoneId}.dualstack.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                        _p1(Region),
                        {},
                      );
                    }
                    if (UseFIPS === false && UseDualStack === false) {
                      return e(
                        `https://${Bucket}.s3express-${s3expressAvailabilityZoneId}.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                        _p1(Region),
                        {},
                      );
                    }
                  }
                }
                {
                  const s3expressAvailabilityZoneId = _.substring(Bucket, 7, 27, true);
                  const s3expressAvailabilityZoneDelim = _.substring(Bucket, 27, 29, true);
                  if (
                    s3expressAvailabilityZoneId != null &&
                    s3expressAvailabilityZoneId !== false &&
                    s3expressAvailabilityZoneDelim != null &&
                    s3expressAvailabilityZoneDelim !== false &&
                    s3expressAvailabilityZoneDelim === "--"
                  ) {
                    if (UseFIPS === true && UseDualStack === true) {
                      return e(
                        `https://${Bucket}.s3express-fips-${s3expressAvailabilityZoneId}.dualstack.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                        _p1(Region),
                        {},
                      );
                    }
                    if (UseFIPS === true && UseDualStack === false) {
                      return e(
                        `https://${Bucket}.s3express-fips-${s3expressAvailabilityZoneId}.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                        _p1(Region),
                        {},
                      );
                    }
                    if (UseFIPS === false && UseDualStack === true) {
                      return e(
                        `https://${Bucket}.s3express-${s3expressAvailabilityZoneId}.dualstack.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                        _p1(Region),
                        {},
                      );
                    }
                    if (UseFIPS === false && UseDualStack === false) {
                      return e(
                        `https://${Bucket}.s3express-${s3expressAvailabilityZoneId}.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                        _p1(Region),
                        {},
                      );
                    }
                  }
                }
                return err("Unrecognized S3Express bucket name format.");
              }
            }
          }
          return err("S3Express bucket name is not a valid virtual hostable name.");
        }
      }
      if (
        !(Bucket != null) &&
        UseS3ExpressControlEndpoint != null &&
        UseS3ExpressControlEndpoint === true
      ) {
        {
          const partitionResult = _.partition(Region);
          if (partitionResult != null && partitionResult !== false) {
            {
              const url = _.parseURL(Endpoint);
              if (Endpoint != null && url != null && url !== false) {
                return e(
                  `${_.getAttr(url, "scheme")}://${_.getAttr(url, "authority")}${_.getAttr(url, "path")}`,
                  _p0(Region),
                  {},
                );
              }
            }
            if (UseFIPS === true && UseDualStack === true) {
              return e(
                `https://s3express-control-fips.dualstack.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                _p0(Region),
                {},
              );
            }
            if (UseFIPS === true && UseDualStack === false) {
              return e(
                `https://s3express-control-fips.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                _p0(Region),
                {},
              );
            }
            if (UseFIPS === false && UseDualStack === true) {
              return e(
                `https://s3express-control.dualstack.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                _p0(Region),
                {},
              );
            }
            if (UseFIPS === false && UseDualStack === false) {
              return e(
                `https://s3express-control.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                _p0(Region),
                {},
              );
            }
          }
        }
      }
      {
        const hardwareType = _.substring(Bucket, 49, 50, true);
        const regionPrefix = _.substring(Bucket, 8, 12, true);
        const bucketAliasSuffix = _.substring(Bucket, 0, 7, true);
        const outpostId = _.substring(Bucket, 32, 49, true);
        const regionPartition = _.partition(Region);
        if (
          Bucket != null &&
          hardwareType != null &&
          hardwareType !== false &&
          regionPrefix != null &&
          regionPrefix !== false &&
          bucketAliasSuffix != null &&
          bucketAliasSuffix !== false &&
          outpostId != null &&
          outpostId !== false &&
          regionPartition != null &&
          regionPartition !== false &&
          bucketAliasSuffix === "--op-s3"
        ) {
          if (_.isValidHostLabel(outpostId, false)) {
            if (_.isVirtualHostableS3Bucket(Bucket, false)) {
              if (hardwareType === "e") {
                if (regionPrefix === "beta") {
                  if (!(Endpoint != null)) {
                    return err("Expected a endpoint to be specified but no endpoint was found");
                  }
                  {
                    const url = _.parseURL(Endpoint);
                    if (Endpoint != null && url != null && url !== false) {
                      return e(
                        `https://${Bucket}.ec2.${_.getAttr(url, "authority")}`,
                        _p2(Region),
                        {},
                      );
                    }
                  }
                }
                return e(
                  `https://${Bucket}.ec2.s3-outposts.${Region}.${_.getAttr(regionPartition, "dnsSuffix")}`,
                  _p2(Region),
                  {},
                );
              }
              if (hardwareType === "o") {
                if (regionPrefix === "beta") {
                  if (!(Endpoint != null)) {
                    return err("Expected a endpoint to be specified but no endpoint was found");
                  }
                  {
                    const url = _.parseURL(Endpoint);
                    if (Endpoint != null && url != null && url !== false) {
                      return e(
                        `https://${Bucket}.op-${outpostId}.${_.getAttr(url, "authority")}`,
                        _p2(Region),
                        {},
                      );
                    }
                  }
                }
                return e(
                  `https://${Bucket}.op-${outpostId}.s3-outposts.${Region}.${_.getAttr(regionPartition, "dnsSuffix")}`,
                  _p2(Region),
                  {},
                );
              }
              return err(
                `Unrecognized hardware type: "Expected hardware type o or e but got ${hardwareType}"`,
              );
            }
            return err("Invalid Outposts Bucket alias - it must be a valid bucket name.");
          }
          return err("Invalid ARN: The outpost Id must only contain a-z, A-Z, 0-9 and `-`.");
        }
      }
      if (Bucket != null) {
        if (Endpoint != null && !(_.parseURL(Endpoint) != null)) {
          return err(`Custom endpoint \`${Endpoint}\` was not a valid URI`);
        }
        if (ForcePathStyle === false && _.isVirtualHostableS3Bucket(Bucket, false)) {
          {
            const partitionResult = _.partition(Region);
            if (partitionResult != null && partitionResult !== false) {
              if (_.isValidHostLabel(Region, false)) {
                if (Accelerate === true && _.getAttr(partitionResult, "name") === "aws-cn") {
                  return err("S3 Accelerate cannot be used in this region");
                }
                if (
                  UseDualStack === true &&
                  UseFIPS === true &&
                  Accelerate === false &&
                  !(Endpoint != null) &&
                  Region === "aws-global"
                ) {
                  return e(
                    `https://${Bucket}.s3-fips.dualstack.us-east-1.${_.getAttr(partitionResult, "dnsSuffix")}`,
                    _p3(),
                    {},
                  );
                }
                if (
                  UseDualStack === true &&
                  UseFIPS === true &&
                  Accelerate === false &&
                  !(Endpoint != null) &&
                  !(Region === "aws-global") &&
                  UseGlobalEndpoint === true
                ) {
                  return e(
                    `https://${Bucket}.s3-fips.dualstack.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                    _p4(Region),
                    {},
                  );
                }
                if (
                  UseDualStack === true &&
                  UseFIPS === true &&
                  Accelerate === false &&
                  !(Endpoint != null) &&
                  !(Region === "aws-global") &&
                  UseGlobalEndpoint === false
                ) {
                  return e(
                    `https://${Bucket}.s3-fips.dualstack.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                    _p4(Region),
                    {},
                  );
                }
                if (
                  UseDualStack === false &&
                  UseFIPS === true &&
                  Accelerate === false &&
                  !(Endpoint != null) &&
                  Region === "aws-global"
                ) {
                  return e(
                    `https://${Bucket}.s3-fips.us-east-1.${_.getAttr(partitionResult, "dnsSuffix")}`,
                    _p3(),
                    {},
                  );
                }
                if (
                  UseDualStack === false &&
                  UseFIPS === true &&
                  Accelerate === false &&
                  !(Endpoint != null) &&
                  !(Region === "aws-global") &&
                  UseGlobalEndpoint === true
                ) {
                  return e(
                    `https://${Bucket}.s3-fips.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                    _p4(Region),
                    {},
                  );
                }
                if (
                  UseDualStack === false &&
                  UseFIPS === true &&
                  Accelerate === false &&
                  !(Endpoint != null) &&
                  !(Region === "aws-global") &&
                  UseGlobalEndpoint === false
                ) {
                  return e(
                    `https://${Bucket}.s3-fips.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                    _p4(Region),
                    {},
                  );
                }
                if (
                  UseDualStack === true &&
                  UseFIPS === false &&
                  Accelerate === true &&
                  !(Endpoint != null) &&
                  Region === "aws-global"
                ) {
                  return e(
                    `https://${Bucket}.s3-accelerate.dualstack.us-east-1.${_.getAttr(partitionResult, "dnsSuffix")}`,
                    _p3(),
                    {},
                  );
                }
                if (
                  UseDualStack === true &&
                  UseFIPS === false &&
                  Accelerate === true &&
                  !(Endpoint != null) &&
                  !(Region === "aws-global") &&
                  UseGlobalEndpoint === true
                ) {
                  return e(
                    `https://${Bucket}.s3-accelerate.dualstack.${_.getAttr(partitionResult, "dnsSuffix")}`,
                    _p4(Region),
                    {},
                  );
                }
                if (
                  UseDualStack === true &&
                  UseFIPS === false &&
                  Accelerate === true &&
                  !(Endpoint != null) &&
                  !(Region === "aws-global") &&
                  UseGlobalEndpoint === false
                ) {
                  return e(
                    `https://${Bucket}.s3-accelerate.dualstack.${_.getAttr(partitionResult, "dnsSuffix")}`,
                    _p4(Region),
                    {},
                  );
                }
                if (
                  UseDualStack === true &&
                  UseFIPS === false &&
                  Accelerate === false &&
                  !(Endpoint != null) &&
                  Region === "aws-global"
                ) {
                  return e(
                    `https://${Bucket}.s3.dualstack.us-east-1.${_.getAttr(partitionResult, "dnsSuffix")}`,
                    _p3(),
                    {},
                  );
                }
                if (
                  UseDualStack === true &&
                  UseFIPS === false &&
                  Accelerate === false &&
                  !(Endpoint != null) &&
                  !(Region === "aws-global") &&
                  UseGlobalEndpoint === true
                ) {
                  return e(
                    `https://${Bucket}.s3.dualstack.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                    _p4(Region),
                    {},
                  );
                }
                if (
                  UseDualStack === true &&
                  UseFIPS === false &&
                  Accelerate === false &&
                  !(Endpoint != null) &&
                  !(Region === "aws-global") &&
                  UseGlobalEndpoint === false
                ) {
                  return e(
                    `https://${Bucket}.s3.dualstack.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                    _p4(Region),
                    {},
                  );
                }
                {
                  const url = _.parseURL(Endpoint);
                  if (
                    UseDualStack === false &&
                    UseFIPS === false &&
                    Accelerate === false &&
                    Endpoint != null &&
                    url != null &&
                    url !== false &&
                    _.getAttr(url, "isIp") === true &&
                    Region === "aws-global"
                  ) {
                    return e(
                      `${_.getAttr(url, "scheme")}://${_.getAttr(url, "authority")}${_.getAttr(url, "normalizedPath")}${Bucket}`,
                      _p3(),
                      {},
                    );
                  }
                }
                {
                  const url = _.parseURL(Endpoint);
                  if (
                    UseDualStack === false &&
                    UseFIPS === false &&
                    Accelerate === false &&
                    Endpoint != null &&
                    url != null &&
                    url !== false &&
                    _.getAttr(url, "isIp") === false &&
                    Region === "aws-global"
                  ) {
                    return e(
                      `${_.getAttr(url, "scheme")}://${Bucket}.${_.getAttr(url, "authority")}${_.getAttr(url, "path")}`,
                      _p3(),
                      {},
                    );
                  }
                }
                {
                  const url = _.parseURL(Endpoint);
                  if (
                    UseDualStack === false &&
                    UseFIPS === false &&
                    Accelerate === false &&
                    Endpoint != null &&
                    url != null &&
                    url !== false &&
                    _.getAttr(url, "isIp") === true &&
                    !(Region === "aws-global") &&
                    UseGlobalEndpoint === true
                  ) {
                    if (Region === "us-east-1") {
                      return e(
                        `${_.getAttr(url, "scheme")}://${_.getAttr(url, "authority")}${_.getAttr(url, "normalizedPath")}${Bucket}`,
                        _p4(Region),
                        {},
                      );
                    }
                    return e(
                      `${_.getAttr(url, "scheme")}://${_.getAttr(url, "authority")}${_.getAttr(url, "normalizedPath")}${Bucket}`,
                      _p4(Region),
                      {},
                    );
                  }
                }
                {
                  const url = _.parseURL(Endpoint);
                  if (
                    UseDualStack === false &&
                    UseFIPS === false &&
                    Accelerate === false &&
                    Endpoint != null &&
                    url != null &&
                    url !== false &&
                    _.getAttr(url, "isIp") === false &&
                    !(Region === "aws-global") &&
                    UseGlobalEndpoint === true
                  ) {
                    if (Region === "us-east-1") {
                      return e(
                        `${_.getAttr(url, "scheme")}://${Bucket}.${_.getAttr(url, "authority")}${_.getAttr(url, "path")}`,
                        _p4(Region),
                        {},
                      );
                    }
                    return e(
                      `${_.getAttr(url, "scheme")}://${Bucket}.${_.getAttr(url, "authority")}${_.getAttr(url, "path")}`,
                      _p4(Region),
                      {},
                    );
                  }
                }
                {
                  const url = _.parseURL(Endpoint);
                  if (
                    UseDualStack === false &&
                    UseFIPS === false &&
                    Accelerate === false &&
                    Endpoint != null &&
                    url != null &&
                    url !== false &&
                    _.getAttr(url, "isIp") === true &&
                    !(Region === "aws-global") &&
                    UseGlobalEndpoint === false
                  ) {
                    return e(
                      `${_.getAttr(url, "scheme")}://${_.getAttr(url, "authority")}${_.getAttr(url, "normalizedPath")}${Bucket}`,
                      _p4(Region),
                      {},
                    );
                  }
                }
                {
                  const url = _.parseURL(Endpoint);
                  if (
                    UseDualStack === false &&
                    UseFIPS === false &&
                    Accelerate === false &&
                    Endpoint != null &&
                    url != null &&
                    url !== false &&
                    _.getAttr(url, "isIp") === false &&
                    !(Region === "aws-global") &&
                    UseGlobalEndpoint === false
                  ) {
                    return e(
                      `${_.getAttr(url, "scheme")}://${Bucket}.${_.getAttr(url, "authority")}${_.getAttr(url, "path")}`,
                      _p4(Region),
                      {},
                    );
                  }
                }
                if (
                  UseDualStack === false &&
                  UseFIPS === false &&
                  Accelerate === true &&
                  !(Endpoint != null) &&
                  Region === "aws-global"
                ) {
                  return e(
                    `https://${Bucket}.s3-accelerate.${_.getAttr(partitionResult, "dnsSuffix")}`,
                    _p3(),
                    {},
                  );
                }
                if (
                  UseDualStack === false &&
                  UseFIPS === false &&
                  Accelerate === true &&
                  !(Endpoint != null) &&
                  !(Region === "aws-global") &&
                  UseGlobalEndpoint === true
                ) {
                  if (Region === "us-east-1") {
                    return e(
                      `https://${Bucket}.s3-accelerate.${_.getAttr(partitionResult, "dnsSuffix")}`,
                      _p4(Region),
                      {},
                    );
                  }
                  return e(
                    `https://${Bucket}.s3-accelerate.${_.getAttr(partitionResult, "dnsSuffix")}`,
                    _p4(Region),
                    {},
                  );
                }
                if (
                  UseDualStack === false &&
                  UseFIPS === false &&
                  Accelerate === true &&
                  !(Endpoint != null) &&
                  !(Region === "aws-global") &&
                  UseGlobalEndpoint === false
                ) {
                  return e(
                    `https://${Bucket}.s3-accelerate.${_.getAttr(partitionResult, "dnsSuffix")}`,
                    _p4(Region),
                    {},
                  );
                }
                if (
                  UseDualStack === false &&
                  UseFIPS === false &&
                  Accelerate === false &&
                  !(Endpoint != null) &&
                  Region === "aws-global"
                ) {
                  return e(
                    `https://${Bucket}.s3.${_.getAttr(partitionResult, "dnsSuffix")}`,
                    _p3(),
                    {},
                  );
                }
                if (
                  UseDualStack === false &&
                  UseFIPS === false &&
                  Accelerate === false &&
                  !(Endpoint != null) &&
                  !(Region === "aws-global") &&
                  UseGlobalEndpoint === true
                ) {
                  if (Region === "us-east-1") {
                    return e(
                      `https://${Bucket}.s3.${_.getAttr(partitionResult, "dnsSuffix")}`,
                      _p4(Region),
                      {},
                    );
                  }
                  return e(
                    `https://${Bucket}.s3.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                    _p4(Region),
                    {},
                  );
                }
                if (
                  UseDualStack === false &&
                  UseFIPS === false &&
                  Accelerate === false &&
                  !(Endpoint != null) &&
                  !(Region === "aws-global") &&
                  UseGlobalEndpoint === false
                ) {
                  return e(
                    `https://${Bucket}.s3.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                    _p4(Region),
                    {},
                  );
                }
              }
              return err("Invalid region: region was not a valid DNS name.");
            }
          }
        }
        {
          const url = _.parseURL(Endpoint);
          if (
            Endpoint != null &&
            url != null &&
            url !== false &&
            _.getAttr(url, "scheme") === "http" &&
            _.isVirtualHostableS3Bucket(Bucket, true) &&
            ForcePathStyle === false &&
            UseFIPS === false &&
            UseDualStack === false &&
            Accelerate === false
          ) {
            {
              const partitionResult = _.partition(Region);
              if (partitionResult != null && partitionResult !== false) {
                if (_.isValidHostLabel(Region, false)) {
                  return e(
                    `${_.getAttr(url, "scheme")}://${Bucket}.${_.getAttr(url, "authority")}${_.getAttr(url, "path")}`,
                    _p4(Region),
                    {},
                  );
                }
                return err("Invalid region: region was not a valid DNS name.");
              }
            }
          }
        }
        {
          const bucketArn = _.parseArn(Bucket);
          if (ForcePathStyle === false && bucketArn != null && bucketArn !== false) {
            {
              const arnType = _.getAttr(bucketArn, "resourceId[0]");
              if (arnType != null && arnType !== false && !(arnType === "")) {
                if (_.getAttr(bucketArn, "service") === "s3-object-lambda") {
                  if (arnType === "accesspoint") {
                    {
                      const accessPointName = _.getAttr(bucketArn, "resourceId[1]");
                      if (
                        accessPointName != null &&
                        accessPointName !== false &&
                        !(accessPointName === "")
                      ) {
                        if (UseDualStack === true) {
                          return err("S3 Object Lambda does not support Dual-stack");
                        }
                        if (Accelerate === true) {
                          return err("S3 Object Lambda does not support S3 Accelerate");
                        }
                        if (!(_.getAttr(bucketArn, "region") === "")) {
                          if (DisableAccessPoints != null && DisableAccessPoints === true) {
                            return err("Access points are not supported for this operation");
                          }
                          if (!(_.getAttr(bucketArn, "resourceId[2]") != null)) {
                            if (
                              UseArnRegion != null &&
                              UseArnRegion === false &&
                              !(_.getAttr(bucketArn, "region") === `${Region}`)
                            ) {
                              return err(
                                `Invalid configuration: region from ARN \`${_.getAttr(bucketArn, "region")}\` does not match client region \`${Region}\` and UseArnRegion is \`false\``,
                              );
                            }
                            {
                              const bucketPartition = _.partition(_.getAttr(bucketArn, "region"));
                              if (bucketPartition != null && bucketPartition !== false) {
                                {
                                  const partitionResult = _.partition(Region);
                                  if (partitionResult != null && partitionResult !== false) {
                                    if (
                                      _.getAttr(bucketPartition, "name") ===
                                      _.getAttr(partitionResult, "name")
                                    ) {
                                      if (
                                        _.isValidHostLabel(_.getAttr(bucketArn, "region"), true)
                                      ) {
                                        if (_.getAttr(bucketArn, "accountId") === "") {
                                          return err("Invalid ARN: Missing account id");
                                        }
                                        if (
                                          _.isValidHostLabel(
                                            _.getAttr(bucketArn, "accountId"),
                                            false,
                                          )
                                        ) {
                                          if (_.isValidHostLabel(accessPointName, false)) {
                                            {
                                              const url = _.parseURL(Endpoint);
                                              if (
                                                Endpoint != null &&
                                                url != null &&
                                                url !== false
                                              ) {
                                                return e(
                                                  `${_.getAttr(url, "scheme")}://${accessPointName}-${_.getAttr(bucketArn, "accountId")}.${_.getAttr(url, "authority")}${_.getAttr(url, "path")}`,
                                                  _p5(bucketArn),
                                                  {},
                                                );
                                              }
                                            }
                                            if (UseFIPS === true) {
                                              return e(
                                                `https://${accessPointName}-${_.getAttr(bucketArn, "accountId")}.s3-object-lambda-fips.${_.getAttr(bucketArn, "region")}.${_.getAttr(bucketPartition, "dnsSuffix")}`,
                                                _p5(bucketArn),
                                                {},
                                              );
                                            }
                                            return e(
                                              `https://${accessPointName}-${_.getAttr(bucketArn, "accountId")}.s3-object-lambda.${_.getAttr(bucketArn, "region")}.${_.getAttr(bucketPartition, "dnsSuffix")}`,
                                              _p5(bucketArn),
                                              {},
                                            );
                                          }
                                          return err(
                                            `Invalid ARN: The access point name may only contain a-z, A-Z, 0-9 and \`-\`. Found: \`${accessPointName}\``,
                                          );
                                        }
                                        return err(
                                          `Invalid ARN: The account id may only contain a-z, A-Z, 0-9 and \`-\`. Found: \`${_.getAttr(bucketArn, "accountId")}\``,
                                        );
                                      }
                                      return err(
                                        `Invalid region in ARN: \`${_.getAttr(bucketArn, "region")}\` (invalid DNS name)`,
                                      );
                                    }
                                    return err(
                                      `Client was configured for partition \`${_.getAttr(partitionResult, "name")}\` but ARN (\`${Bucket}\`) has \`${_.getAttr(bucketPartition, "name")}\``,
                                    );
                                  }
                                }
                              }
                            }
                          }
                          return err(
                            "Invalid ARN: The ARN may only contain a single resource component after `accesspoint`.",
                          );
                        }
                        return err("Invalid ARN: bucket ARN is missing a region");
                      }
                    }
                    return err(
                      "Invalid ARN: Expected a resource of the format `accesspoint:<accesspoint name>` but no name was provided",
                    );
                  }
                  return err(
                    `Invalid ARN: Object Lambda ARNs only support \`accesspoint\` arn types, but found: \`${arnType}\``,
                  );
                }
                if (arnType === "accesspoint") {
                  {
                    const accessPointName = _.getAttr(bucketArn, "resourceId[1]");
                    if (
                      accessPointName != null &&
                      accessPointName !== false &&
                      !(accessPointName === "")
                    ) {
                      if (!(_.getAttr(bucketArn, "region") === "")) {
                        if (arnType === "accesspoint") {
                          if (!(_.getAttr(bucketArn, "region") === "")) {
                            if (DisableAccessPoints != null && DisableAccessPoints === true) {
                              return err("Access points are not supported for this operation");
                            }
                            if (!(_.getAttr(bucketArn, "resourceId[2]") != null)) {
                              if (
                                UseArnRegion != null &&
                                UseArnRegion === false &&
                                !(_.getAttr(bucketArn, "region") === `${Region}`)
                              ) {
                                return err(
                                  `Invalid configuration: region from ARN \`${_.getAttr(bucketArn, "region")}\` does not match client region \`${Region}\` and UseArnRegion is \`false\``,
                                );
                              }
                              {
                                const bucketPartition = _.partition(_.getAttr(bucketArn, "region"));
                                if (bucketPartition != null && bucketPartition !== false) {
                                  {
                                    const partitionResult = _.partition(Region);
                                    if (partitionResult != null && partitionResult !== false) {
                                      if (
                                        _.getAttr(bucketPartition, "name") ===
                                        `${_.getAttr(partitionResult, "name")}`
                                      ) {
                                        if (
                                          _.isValidHostLabel(_.getAttr(bucketArn, "region"), true)
                                        ) {
                                          if (_.getAttr(bucketArn, "service") === "s3") {
                                            if (
                                              _.isValidHostLabel(
                                                _.getAttr(bucketArn, "accountId"),
                                                false,
                                              )
                                            ) {
                                              if (_.isValidHostLabel(accessPointName, false)) {
                                                if (Accelerate === true) {
                                                  return err(
                                                    "Access Points do not support S3 Accelerate",
                                                  );
                                                }
                                                if (UseFIPS === true && UseDualStack === true) {
                                                  return e(
                                                    `https://${accessPointName}-${_.getAttr(bucketArn, "accountId")}.s3-accesspoint-fips.dualstack.${_.getAttr(bucketArn, "region")}.${_.getAttr(bucketPartition, "dnsSuffix")}`,
                                                    _p6(bucketArn),
                                                    {},
                                                  );
                                                }
                                                if (UseFIPS === true && UseDualStack === false) {
                                                  return e(
                                                    `https://${accessPointName}-${_.getAttr(bucketArn, "accountId")}.s3-accesspoint-fips.${_.getAttr(bucketArn, "region")}.${_.getAttr(bucketPartition, "dnsSuffix")}`,
                                                    _p6(bucketArn),
                                                    {},
                                                  );
                                                }
                                                if (UseFIPS === false && UseDualStack === true) {
                                                  return e(
                                                    `https://${accessPointName}-${_.getAttr(bucketArn, "accountId")}.s3-accesspoint.dualstack.${_.getAttr(bucketArn, "region")}.${_.getAttr(bucketPartition, "dnsSuffix")}`,
                                                    _p6(bucketArn),
                                                    {},
                                                  );
                                                }
                                                {
                                                  const url = _.parseURL(Endpoint);
                                                  if (
                                                    UseFIPS === false &&
                                                    UseDualStack === false &&
                                                    Endpoint != null &&
                                                    url != null &&
                                                    url !== false
                                                  ) {
                                                    return e(
                                                      `${_.getAttr(url, "scheme")}://${accessPointName}-${_.getAttr(bucketArn, "accountId")}.${_.getAttr(url, "authority")}${_.getAttr(url, "path")}`,
                                                      _p6(bucketArn),
                                                      {},
                                                    );
                                                  }
                                                }
                                                if (UseFIPS === false && UseDualStack === false) {
                                                  return e(
                                                    `https://${accessPointName}-${_.getAttr(bucketArn, "accountId")}.s3-accesspoint.${_.getAttr(bucketArn, "region")}.${_.getAttr(bucketPartition, "dnsSuffix")}`,
                                                    _p6(bucketArn),
                                                    {},
                                                  );
                                                }
                                              }
                                              return err(
                                                `Invalid ARN: The access point name may only contain a-z, A-Z, 0-9 and \`-\`. Found: \`${accessPointName}\``,
                                              );
                                            }
                                            return err(
                                              `Invalid ARN: The account id may only contain a-z, A-Z, 0-9 and \`-\`. Found: \`${_.getAttr(bucketArn, "accountId")}\``,
                                            );
                                          }
                                          return err(
                                            `Invalid ARN: The ARN was not for the S3 service, found: ${_.getAttr(bucketArn, "service")}`,
                                          );
                                        }
                                        return err(
                                          `Invalid region in ARN: \`${_.getAttr(bucketArn, "region")}\` (invalid DNS name)`,
                                        );
                                      }
                                      return err(
                                        `Client was configured for partition \`${_.getAttr(partitionResult, "name")}\` but ARN (\`${Bucket}\`) has \`${_.getAttr(bucketPartition, "name")}\``,
                                      );
                                    }
                                  }
                                }
                              }
                            }
                            return err(
                              "Invalid ARN: The ARN may only contain a single resource component after `accesspoint`.",
                            );
                          }
                        }
                      }
                      if (_.isValidHostLabel(accessPointName, true)) {
                        if (UseDualStack === true) {
                          return err("S3 MRAP does not support dual-stack");
                        }
                        if (UseFIPS === true) {
                          return err("S3 MRAP does not support FIPS");
                        }
                        if (Accelerate === true) {
                          return err("S3 MRAP does not support S3 Accelerate");
                        }
                        if (DisableMultiRegionAccessPoints === true) {
                          return err(
                            "Invalid configuration: Multi-Region Access Point ARNs are disabled.",
                          );
                        }
                        {
                          const mrapPartition = _.partition(Region);
                          if (mrapPartition != null && mrapPartition !== false) {
                            if (
                              _.getAttr(mrapPartition, "name") === _.getAttr(bucketArn, "partition")
                            ) {
                              return e(
                                `https://${accessPointName}.accesspoint.s3-global.${_.getAttr(mrapPartition, "dnsSuffix")}`,
                                {
                                  authSchemes: [
                                    {
                                      disableDoubleEncoding: true,
                                      name: "sigv4a",
                                      signingName: "s3",
                                      signingRegionSet: ["*"],
                                    },
                                  ],
                                },
                                {},
                              );
                            }
                            return err(
                              `Client was configured for partition \`${_.getAttr(mrapPartition, "name")}\` but bucket referred to partition \`${_.getAttr(bucketArn, "partition")}\``,
                            );
                          }
                        }
                      }
                      return err("Invalid Access Point Name");
                    }
                  }
                  return err(
                    "Invalid ARN: Expected a resource of the format `accesspoint:<accesspoint name>` but no name was provided",
                  );
                }
                if (_.getAttr(bucketArn, "service") === "s3-outposts") {
                  if (UseDualStack === true) {
                    return err("S3 Outposts does not support Dual-stack");
                  }
                  if (UseFIPS === true) {
                    return err("S3 Outposts does not support FIPS");
                  }
                  if (Accelerate === true) {
                    return err("S3 Outposts does not support S3 Accelerate");
                  }
                  if (_.getAttr(bucketArn, "resourceId[4]") != null) {
                    return err("Invalid Arn: Outpost Access Point ARN contains sub resources");
                  }
                  {
                    const outpostId = _.getAttr(bucketArn, "resourceId[1]");
                    if (outpostId != null && outpostId !== false) {
                      if (_.isValidHostLabel(outpostId, false)) {
                        if (
                          UseArnRegion != null &&
                          UseArnRegion === false &&
                          !(_.getAttr(bucketArn, "region") === `${Region}`)
                        ) {
                          return err(
                            `Invalid configuration: region from ARN \`${_.getAttr(bucketArn, "region")}\` does not match client region \`${Region}\` and UseArnRegion is \`false\``,
                          );
                        }
                        {
                          const bucketPartition = _.partition(_.getAttr(bucketArn, "region"));
                          if (bucketPartition != null && bucketPartition !== false) {
                            {
                              const partitionResult = _.partition(Region);
                              if (partitionResult != null && partitionResult !== false) {
                                if (
                                  _.getAttr(bucketPartition, "name") ===
                                  _.getAttr(partitionResult, "name")
                                ) {
                                  if (_.isValidHostLabel(_.getAttr(bucketArn, "region"), true)) {
                                    if (
                                      _.isValidHostLabel(_.getAttr(bucketArn, "accountId"), false)
                                    ) {
                                      {
                                        const outpostType = _.getAttr(bucketArn, "resourceId[2]");
                                        if (outpostType != null && outpostType !== false) {
                                          {
                                            const accessPointName = _.getAttr(
                                              bucketArn,
                                              "resourceId[3]",
                                            );
                                            if (
                                              accessPointName != null &&
                                              accessPointName !== false
                                            ) {
                                              if (outpostType === "accesspoint") {
                                                if (_.isValidHostLabel(accessPointName, false)) {
                                                  {
                                                    const url = _.parseURL(Endpoint);
                                                    if (
                                                      Endpoint != null &&
                                                      url != null &&
                                                      url !== false
                                                    ) {
                                                      return e(
                                                        `https://${accessPointName}-${_.getAttr(bucketArn, "accountId")}.${outpostId}.${_.getAttr(url, "authority")}`,
                                                        _p7(bucketArn),
                                                        {},
                                                      );
                                                    }
                                                  }
                                                  return e(
                                                    `https://${accessPointName}-${_.getAttr(bucketArn, "accountId")}.${outpostId}.s3-outposts.${_.getAttr(bucketArn, "region")}.${_.getAttr(bucketPartition, "dnsSuffix")}`,
                                                    _p7(bucketArn),
                                                    {},
                                                  );
                                                }
                                                return err(
                                                  `Invalid ARN: The access point name may only contain a-z, A-Z, 0-9 and \`-\`. Found: \`${accessPointName}\``,
                                                );
                                              }
                                              return err(
                                                `Expected an outpost type \`accesspoint\`, found ${outpostType}`,
                                              );
                                            }
                                          }
                                          return err("Invalid ARN: expected an access point name");
                                        }
                                      }
                                      return err("Invalid ARN: Expected a 4-component resource");
                                    }
                                    return err(
                                      `Invalid ARN: The account id may only contain a-z, A-Z, 0-9 and \`-\`. Found: \`${_.getAttr(bucketArn, "accountId")}\``,
                                    );
                                  }
                                  return err(
                                    `Invalid region in ARN: \`${_.getAttr(bucketArn, "region")}\` (invalid DNS name)`,
                                  );
                                }
                                return err(
                                  `Client was configured for partition \`${_.getAttr(partitionResult, "name")}\` but ARN (\`${Bucket}\`) has \`${_.getAttr(bucketPartition, "name")}\``,
                                );
                              }
                            }
                          }
                        }
                      }
                      return err(
                        `Invalid ARN: The outpost Id may only contain a-z, A-Z, 0-9 and \`-\`. Found: \`${outpostId}\``,
                      );
                    }
                  }
                  return err("Invalid ARN: The Outpost Id was not set");
                }
                return err(`Invalid ARN: Unrecognized format: ${Bucket} (type: ${arnType})`);
              }
            }
            return err("Invalid ARN: No ARN type specified");
          }
        }
        {
          const arnPrefix = _.substring(Bucket, 0, 4, false);
          if (
            arnPrefix != null &&
            arnPrefix !== false &&
            arnPrefix === "arn:" &&
            !(_.parseArn(Bucket) != null)
          ) {
            return err(`Invalid ARN: \`${Bucket}\` was not a valid ARN`);
          }
        }
        if (ForcePathStyle === true && _.parseArn(Bucket)) {
          return err("Path-style addressing cannot be used with ARN buckets");
        }
        {
          const uri_encoded_bucket = _.uriEncode(Bucket);
          if (uri_encoded_bucket != null && uri_encoded_bucket !== false) {
            {
              const partitionResult = _.partition(Region);
              if (partitionResult != null && partitionResult !== false) {
                if (Accelerate === false) {
                  if (
                    UseDualStack === true &&
                    !(Endpoint != null) &&
                    UseFIPS === true &&
                    Region === "aws-global"
                  ) {
                    return e(
                      `https://s3-fips.dualstack.us-east-1.${_.getAttr(partitionResult, "dnsSuffix")}/${uri_encoded_bucket}`,
                      _p3(),
                      {},
                    );
                  }
                  if (
                    UseDualStack === true &&
                    !(Endpoint != null) &&
                    UseFIPS === true &&
                    !(Region === "aws-global") &&
                    UseGlobalEndpoint === true
                  ) {
                    return e(
                      `https://s3-fips.dualstack.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}/${uri_encoded_bucket}`,
                      _p4(Region),
                      {},
                    );
                  }
                  if (
                    UseDualStack === true &&
                    !(Endpoint != null) &&
                    UseFIPS === true &&
                    !(Region === "aws-global") &&
                    UseGlobalEndpoint === false
                  ) {
                    return e(
                      `https://s3-fips.dualstack.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}/${uri_encoded_bucket}`,
                      _p4(Region),
                      {},
                    );
                  }
                  if (
                    UseDualStack === false &&
                    !(Endpoint != null) &&
                    UseFIPS === true &&
                    Region === "aws-global"
                  ) {
                    return e(
                      `https://s3-fips.us-east-1.${_.getAttr(partitionResult, "dnsSuffix")}/${uri_encoded_bucket}`,
                      _p3(),
                      {},
                    );
                  }
                  if (
                    UseDualStack === false &&
                    !(Endpoint != null) &&
                    UseFIPS === true &&
                    !(Region === "aws-global") &&
                    UseGlobalEndpoint === true
                  ) {
                    return e(
                      `https://s3-fips.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}/${uri_encoded_bucket}`,
                      _p4(Region),
                      {},
                    );
                  }
                  if (
                    UseDualStack === false &&
                    !(Endpoint != null) &&
                    UseFIPS === true &&
                    !(Region === "aws-global") &&
                    UseGlobalEndpoint === false
                  ) {
                    return e(
                      `https://s3-fips.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}/${uri_encoded_bucket}`,
                      _p4(Region),
                      {},
                    );
                  }
                  if (
                    UseDualStack === true &&
                    !(Endpoint != null) &&
                    UseFIPS === false &&
                    Region === "aws-global"
                  ) {
                    return e(
                      `https://s3.dualstack.us-east-1.${_.getAttr(partitionResult, "dnsSuffix")}/${uri_encoded_bucket}`,
                      _p3(),
                      {},
                    );
                  }
                  if (
                    UseDualStack === true &&
                    !(Endpoint != null) &&
                    UseFIPS === false &&
                    !(Region === "aws-global") &&
                    UseGlobalEndpoint === true
                  ) {
                    return e(
                      `https://s3.dualstack.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}/${uri_encoded_bucket}`,
                      _p4(Region),
                      {},
                    );
                  }
                  if (
                    UseDualStack === true &&
                    !(Endpoint != null) &&
                    UseFIPS === false &&
                    !(Region === "aws-global") &&
                    UseGlobalEndpoint === false
                  ) {
                    return e(
                      `https://s3.dualstack.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}/${uri_encoded_bucket}`,
                      _p4(Region),
                      {},
                    );
                  }
                  {
                    const url = _.parseURL(Endpoint);
                    if (
                      UseDualStack === false &&
                      Endpoint != null &&
                      url != null &&
                      url !== false &&
                      UseFIPS === false &&
                      Region === "aws-global"
                    ) {
                      return e(
                        `${_.getAttr(url, "scheme")}://${_.getAttr(url, "authority")}${_.getAttr(url, "normalizedPath")}${uri_encoded_bucket}`,
                        _p3(),
                        {},
                      );
                    }
                  }
                  {
                    const url = _.parseURL(Endpoint);
                    if (
                      UseDualStack === false &&
                      Endpoint != null &&
                      url != null &&
                      url !== false &&
                      UseFIPS === false &&
                      !(Region === "aws-global") &&
                      UseGlobalEndpoint === true
                    ) {
                      if (Region === "us-east-1") {
                        return e(
                          `${_.getAttr(url, "scheme")}://${_.getAttr(url, "authority")}${_.getAttr(url, "normalizedPath")}${uri_encoded_bucket}`,
                          _p4(Region),
                          {},
                        );
                      }
                      return e(
                        `${_.getAttr(url, "scheme")}://${_.getAttr(url, "authority")}${_.getAttr(url, "normalizedPath")}${uri_encoded_bucket}`,
                        _p4(Region),
                        {},
                      );
                    }
                  }
                  {
                    const url = _.parseURL(Endpoint);
                    if (
                      UseDualStack === false &&
                      Endpoint != null &&
                      url != null &&
                      url !== false &&
                      UseFIPS === false &&
                      !(Region === "aws-global") &&
                      UseGlobalEndpoint === false
                    ) {
                      return e(
                        `${_.getAttr(url, "scheme")}://${_.getAttr(url, "authority")}${_.getAttr(url, "normalizedPath")}${uri_encoded_bucket}`,
                        _p4(Region),
                        {},
                      );
                    }
                  }
                  if (
                    UseDualStack === false &&
                    !(Endpoint != null) &&
                    UseFIPS === false &&
                    Region === "aws-global"
                  ) {
                    return e(
                      `https://s3.${_.getAttr(partitionResult, "dnsSuffix")}/${uri_encoded_bucket}`,
                      _p3(),
                      {},
                    );
                  }
                  if (
                    UseDualStack === false &&
                    !(Endpoint != null) &&
                    UseFIPS === false &&
                    !(Region === "aws-global") &&
                    UseGlobalEndpoint === true
                  ) {
                    if (Region === "us-east-1") {
                      return e(
                        `https://s3.${_.getAttr(partitionResult, "dnsSuffix")}/${uri_encoded_bucket}`,
                        _p4(Region),
                        {},
                      );
                    }
                    return e(
                      `https://s3.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}/${uri_encoded_bucket}`,
                      _p4(Region),
                      {},
                    );
                  }
                  if (
                    UseDualStack === false &&
                    !(Endpoint != null) &&
                    UseFIPS === false &&
                    !(Region === "aws-global") &&
                    UseGlobalEndpoint === false
                  ) {
                    return e(
                      `https://s3.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}/${uri_encoded_bucket}`,
                      _p4(Region),
                      {},
                    );
                  }
                }
                return err("Path-style addressing cannot be used with S3 Accelerate");
              }
            }
          }
        }
      }
      if (UseObjectLambdaEndpoint != null && UseObjectLambdaEndpoint === true) {
        {
          const partitionResult = _.partition(Region);
          if (partitionResult != null && partitionResult !== false) {
            if (_.isValidHostLabel(Region, true)) {
              if (UseDualStack === true) {
                return err("S3 Object Lambda does not support Dual-stack");
              }
              if (Accelerate === true) {
                return err("S3 Object Lambda does not support S3 Accelerate");
              }
              {
                const url = _.parseURL(Endpoint);
                if (Endpoint != null && url != null && url !== false) {
                  return e(
                    `${_.getAttr(url, "scheme")}://${_.getAttr(url, "authority")}${_.getAttr(url, "path")}`,
                    _p8(Region),
                    {},
                  );
                }
              }
              if (UseFIPS === true) {
                return e(
                  `https://s3-object-lambda-fips.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                  _p8(Region),
                  {},
                );
              }
              return e(
                `https://s3-object-lambda.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                _p8(Region),
                {},
              );
            }
            return err("Invalid region: region was not a valid DNS name.");
          }
        }
      }
      if (!(Bucket != null)) {
        {
          const partitionResult = _.partition(Region);
          if (partitionResult != null && partitionResult !== false) {
            if (_.isValidHostLabel(Region, true)) {
              if (
                UseFIPS === true &&
                UseDualStack === true &&
                !(Endpoint != null) &&
                Region === "aws-global"
              ) {
                return e(
                  `https://s3-fips.dualstack.us-east-1.${_.getAttr(partitionResult, "dnsSuffix")}`,
                  _p3(),
                  {},
                );
              }
              if (
                UseFIPS === true &&
                UseDualStack === true &&
                !(Endpoint != null) &&
                !(Region === "aws-global") &&
                UseGlobalEndpoint === true
              ) {
                return e(
                  `https://s3-fips.dualstack.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                  _p4(Region),
                  {},
                );
              }
              if (
                UseFIPS === true &&
                UseDualStack === true &&
                !(Endpoint != null) &&
                !(Region === "aws-global") &&
                UseGlobalEndpoint === false
              ) {
                return e(
                  `https://s3-fips.dualstack.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                  _p4(Region),
                  {},
                );
              }
              if (
                UseFIPS === true &&
                UseDualStack === false &&
                !(Endpoint != null) &&
                Region === "aws-global"
              ) {
                return e(
                  `https://s3-fips.us-east-1.${_.getAttr(partitionResult, "dnsSuffix")}`,
                  _p3(),
                  {},
                );
              }
              if (
                UseFIPS === true &&
                UseDualStack === false &&
                !(Endpoint != null) &&
                !(Region === "aws-global") &&
                UseGlobalEndpoint === true
              ) {
                return e(
                  `https://s3-fips.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                  _p4(Region),
                  {},
                );
              }
              if (
                UseFIPS === true &&
                UseDualStack === false &&
                !(Endpoint != null) &&
                !(Region === "aws-global") &&
                UseGlobalEndpoint === false
              ) {
                return e(
                  `https://s3-fips.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                  _p4(Region),
                  {},
                );
              }
              if (
                UseFIPS === false &&
                UseDualStack === true &&
                !(Endpoint != null) &&
                Region === "aws-global"
              ) {
                return e(
                  `https://s3.dualstack.us-east-1.${_.getAttr(partitionResult, "dnsSuffix")}`,
                  _p3(),
                  {},
                );
              }
              if (
                UseFIPS === false &&
                UseDualStack === true &&
                !(Endpoint != null) &&
                !(Region === "aws-global") &&
                UseGlobalEndpoint === true
              ) {
                return e(
                  `https://s3.dualstack.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                  _p4(Region),
                  {},
                );
              }
              if (
                UseFIPS === false &&
                UseDualStack === true &&
                !(Endpoint != null) &&
                !(Region === "aws-global") &&
                UseGlobalEndpoint === false
              ) {
                return e(
                  `https://s3.dualstack.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                  _p4(Region),
                  {},
                );
              }
              {
                const url = _.parseURL(Endpoint);
                if (
                  UseFIPS === false &&
                  UseDualStack === false &&
                  Endpoint != null &&
                  url != null &&
                  url !== false &&
                  Region === "aws-global"
                ) {
                  return e(
                    `${_.getAttr(url, "scheme")}://${_.getAttr(url, "authority")}${_.getAttr(url, "path")}`,
                    _p3(),
                    {},
                  );
                }
              }
              {
                const url = _.parseURL(Endpoint);
                if (
                  UseFIPS === false &&
                  UseDualStack === false &&
                  Endpoint != null &&
                  url != null &&
                  url !== false &&
                  !(Region === "aws-global") &&
                  UseGlobalEndpoint === true
                ) {
                  if (Region === "us-east-1") {
                    return e(
                      `${_.getAttr(url, "scheme")}://${_.getAttr(url, "authority")}${_.getAttr(url, "path")}`,
                      _p4(Region),
                      {},
                    );
                  }
                  return e(
                    `${_.getAttr(url, "scheme")}://${_.getAttr(url, "authority")}${_.getAttr(url, "path")}`,
                    _p4(Region),
                    {},
                  );
                }
              }
              {
                const url = _.parseURL(Endpoint);
                if (
                  UseFIPS === false &&
                  UseDualStack === false &&
                  Endpoint != null &&
                  url != null &&
                  url !== false &&
                  !(Region === "aws-global") &&
                  UseGlobalEndpoint === false
                ) {
                  return e(
                    `${_.getAttr(url, "scheme")}://${_.getAttr(url, "authority")}${_.getAttr(url, "path")}`,
                    _p4(Region),
                    {},
                  );
                }
              }
              if (
                UseFIPS === false &&
                UseDualStack === false &&
                !(Endpoint != null) &&
                Region === "aws-global"
              ) {
                return e(`https://s3.${_.getAttr(partitionResult, "dnsSuffix")}`, _p3(), {});
              }
              if (
                UseFIPS === false &&
                UseDualStack === false &&
                !(Endpoint != null) &&
                !(Region === "aws-global") &&
                UseGlobalEndpoint === true
              ) {
                if (Region === "us-east-1") {
                  return e(
                    `https://s3.${_.getAttr(partitionResult, "dnsSuffix")}`,
                    _p4(Region),
                    {},
                  );
                }
                return e(
                  `https://s3.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                  _p4(Region),
                  {},
                );
              }
              if (
                UseFIPS === false &&
                UseDualStack === false &&
                !(Endpoint != null) &&
                !(Region === "aws-global") &&
                UseGlobalEndpoint === false
              ) {
                return e(
                  `https://s3.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                  _p4(Region),
                  {},
                );
              }
            }
            return err("Invalid region: region was not a valid DNS name.");
          }
        }
      }
    }
    return err("A region must be set when sending requests to S3.");
  },
  '{"url":"https://s3.{R}.{D}","properties":{"authSchemes":[{"disableDoubleEncoding":true,"name":"sigv4","signingName":"s3","signingRegion":"{R}"}]},"headers":{}}',
  ["aws-global"],
);

/** Span facts shared by every operation (com.distilled.telemetry#service). */
const TELEMETRY = {
  system: "aws-api",
  responseHeaders: [
    { header: "x-amzn-requestid", name: "aws.request_id" },
    { header: "x-amz-request-id", name: "aws.request_id" },
    { header: "x-amzn-request-id", name: "aws.request_id" },
    { header: "x-amz-id-2", name: "aws.extended_request_id" },
    { header: "cf-ray", name: "http.response.header.cf-ray", transform: "list" },
  ],
  prefix: "S3",
  service: "S3",
  labels: "aws.s3",
  onRequest: /*@__PURE__*/ TxHost.hostRules([
    {
      suffix: ".r2.cloudflarestorage.com",
      hostLabel: "cloudflare.account_id",
      copy: { "aws.s3.bucket": "cloudflare.r2.bucket", "aws.s3.key": "cloudflare.r2.object_key" },
    },
  ]),
  propagate: TxXray.propagate,
} as const;

export class AccessDenied
  extends /*@__PURE__*/ S.TaggedError<AccessDenied>()(
    "AccessDenied",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class AnnotationLimitExceeded
  extends /*@__PURE__*/ S.TaggedError<AnnotationLimitExceeded>()(
    "AnnotationLimitExceeded",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError, C.withThrottlingError) {}
export class AnnotationNameTooLong
  extends /*@__PURE__*/ S.TaggedError<AnnotationNameTooLong>()(
    "AnnotationNameTooLong",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class BucketAlreadyExists
  extends /*@__PURE__*/ S.TaggedError<BucketAlreadyExists>()(
    "BucketAlreadyExists",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError, C.withAlreadyExistsError) {}
export class BucketAlreadyOwnedByYou
  extends /*@__PURE__*/ S.TaggedError<BucketAlreadyOwnedByYou>()(
    "BucketAlreadyOwnedByYou",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError, C.withAlreadyExistsError) {}
export class BucketHasAccessPointsAttached
  extends /*@__PURE__*/ S.TaggedError<BucketHasAccessPointsAttached>()(
    "BucketHasAccessPointsAttached",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ).pipe(C.withConflictError) {}
export class BucketNotEmpty
  extends /*@__PURE__*/ S.TaggedError<BucketNotEmpty>()("BucketNotEmpty", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withConflictError) {}
export class ConditionalRequestConflict
  extends /*@__PURE__*/ S.TaggedError<ConditionalRequestConflict>()("ConditionalRequestConflict", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withConflictError, C.withRetryableError) {}
export class EncryptionTypeMismatch
  extends /*@__PURE__*/ S.TaggedError<EncryptionTypeMismatch>()(
    "EncryptionTypeMismatch",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class IdempotencyParameterMismatch
  extends /*@__PURE__*/ S.TaggedError<IdempotencyParameterMismatch>()(
    "IdempotencyParameterMismatch",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class IllegalLocationConstraintException
  extends /*@__PURE__*/ S.TaggedError<IllegalLocationConstraintException>()(
    "IllegalLocationConstraintException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ).pipe(C.withBadRequestError) {}
export class InvalidAccessKeyId
  extends /*@__PURE__*/ S.TaggedError<InvalidAccessKeyId>()("InvalidAccessKeyId", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withAuthError) {}
export class InvalidAnnotationName
  extends /*@__PURE__*/ S.TaggedError<InvalidAnnotationName>()(
    "InvalidAnnotationName",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidArgument
  extends /*@__PURE__*/ S.TaggedError<InvalidArgument>()("InvalidArgument", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withBadRequestError) {}
export class InvalidBucketName
  extends /*@__PURE__*/ S.TaggedError<InvalidBucketName>()("InvalidBucketName", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withBadRequestError) {}
export class InvalidBucketState
  extends /*@__PURE__*/ S.TaggedError<InvalidBucketState>()("InvalidBucketState", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withConflictError) {}
export class InvalidDigest
  extends /*@__PURE__*/ S.TaggedError<InvalidDigest>()("InvalidDigest", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withBadRequestError) {}
export class InvalidLocationConstraint
  extends /*@__PURE__*/ S.TaggedError<InvalidLocationConstraint>()("InvalidLocationConstraint", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withBadRequestError) {}
export class InvalidObjectState
  extends /*@__PURE__*/ S.TaggedError<InvalidObjectState>()(
    "InvalidObjectState",
    {
      StorageClass: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "StorageClass" }),
      ),
      AccessTier: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({
          identifier: "IntelligentTieringAccessTier",
        }),
      ),
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class InvalidPrefix
  extends /*@__PURE__*/ S.TaggedError<InvalidPrefix>()(
    "InvalidPrefix",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidRequest
  extends /*@__PURE__*/ S.TaggedError<InvalidRequest>()(
    "InvalidRequest",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidWriteOffset
  extends /*@__PURE__*/ S.TaggedError<InvalidWriteOffset>()(
    "InvalidWriteOffset",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class MalformedPolicy
  extends /*@__PURE__*/ S.TaggedError<MalformedPolicy>()("MalformedPolicy", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withBadRequestError) {}
export class MalformedXML
  extends /*@__PURE__*/ S.TaggedError<MalformedXML>()("MalformedXML", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withBadRequestError) {}
export class MethodNotAllowed
  extends /*@__PURE__*/ S.TaggedError<MethodNotAllowed>()("MethodNotAllowed", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    Method: /*@__PURE__*/ S.optional(S.String),
    ResourceType: /*@__PURE__*/ S.optional(S.String),
    DeleteMarker: /*@__PURE__*/ S.optional(S.Boolean).pipe(
      /*@__PURE__*/ T.HttpHeader("x-amz-delete-marker"),
    ),
    LastModified: /*@__PURE__*/ S.optional(S.String).pipe(
      /*@__PURE__*/ T.HttpHeader("last-modified"),
    ),
  }) {}
export class NoSuchAnnotation
  extends /*@__PURE__*/ S.TaggedError<NoSuchAnnotation>()(
    "NoSuchAnnotation",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class NoSuchBucket
  extends /*@__PURE__*/ S.TaggedError<NoSuchBucket>()(
    "NoSuchBucket",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      BucketName: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class NoSuchBucketPolicy
  extends /*@__PURE__*/ S.TaggedError<NoSuchBucketPolicy>()("NoSuchBucketPolicy", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class NoSuchConfiguration
  extends /*@__PURE__*/ S.TaggedError<NoSuchConfiguration>()("NoSuchConfiguration", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class NoSuchCORSConfiguration
  extends /*@__PURE__*/ S.TaggedError<NoSuchCORSConfiguration>()("NoSuchCORSConfiguration", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class NoSuchKey
  extends /*@__PURE__*/ S.TaggedError<NoSuchKey>()(
    "NoSuchKey",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class NoSuchLifecycleConfiguration
  extends /*@__PURE__*/ S.TaggedError<NoSuchLifecycleConfiguration>()(
    "NoSuchLifecycleConfiguration",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class NoSuchPublicAccessBlockConfiguration
  extends /*@__PURE__*/ S.TaggedError<NoSuchPublicAccessBlockConfiguration>()(
    "NoSuchPublicAccessBlockConfiguration",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class NoSuchTagSet
  extends /*@__PURE__*/ S.TaggedError<NoSuchTagSet>()("NoSuchTagSet", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class NoSuchUpload
  extends /*@__PURE__*/ S.TaggedError<NoSuchUpload>()(
    "NoSuchUpload",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class NoSuchVersion
  extends /*@__PURE__*/ S.TaggedError<NoSuchVersion>()("NoSuchVersion", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    Key: /*@__PURE__*/ S.optional(S.String),
    VersionId: /*@__PURE__*/ S.optional(S.String),
  }) {}
export class NoSuchWebsiteConfiguration
  extends /*@__PURE__*/ S.TaggedError<NoSuchWebsiteConfiguration>()("NoSuchWebsiteConfiguration", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class NotFound
  extends /*@__PURE__*/ S.TaggedError<NotFound>()("NotFound", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class ObjectAlreadyInActiveTierError
  extends /*@__PURE__*/ S.TaggedError<ObjectAlreadyInActiveTierError>()(
    "ObjectAlreadyInActiveTierError",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ObjectLockConfigurationNotFoundError
  extends /*@__PURE__*/ S.TaggedError<ObjectLockConfigurationNotFoundError>()(
    "ObjectLockConfigurationNotFoundError",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class ObjectNotInActiveTierError
  extends /*@__PURE__*/ S.TaggedError<ObjectNotInActiveTierError>()(
    "ObjectNotInActiveTierError",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class OwnershipControlsNotFoundError
  extends /*@__PURE__*/ S.TaggedError<OwnershipControlsNotFoundError>()(
    "OwnershipControlsNotFoundError",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class ParseError
  extends /*@__PURE__*/ S.TaggedError<ParseError>()("ParseError", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class PermanentRedirect
  extends /*@__PURE__*/ S.TaggedError<PermanentRedirect>()("PermanentRedirect", {
    BucketRegion: /*@__PURE__*/ S.optional(S.String).pipe(
      /*@__PURE__*/ T.HttpHeader("x-amz-bucket-region"),
    ),
    Endpoint: /*@__PURE__*/ S.optional(S.String),
    Bucket: /*@__PURE__*/ S.optional(S.String),
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class PreconditionFailed
  extends /*@__PURE__*/ S.TaggedError<PreconditionFailed>()("PreconditionFailed", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withConflictError) {}
export class ReplicationConfigurationNotFoundError
  extends /*@__PURE__*/ S.TaggedError<ReplicationConfigurationNotFoundError>()(
    "ReplicationConfigurationNotFoundError",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class RequestError
  extends /*@__PURE__*/ S.TaggedError<RequestError>()("RequestError", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class RequestLimitExceeded
  extends /*@__PURE__*/ S.TaggedError<RequestLimitExceeded>()("RequestLimitExceeded", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withThrottlingError) {}
export class SignatureDoesNotMatch
  extends /*@__PURE__*/ S.TaggedError<SignatureDoesNotMatch>()("SignatureDoesNotMatch", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withAuthError) {}
export class SlowDown
  extends /*@__PURE__*/ S.TaggedError<SlowDown>()("SlowDown", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withThrottlingError, C.withRetryableError) {}
export class TooManyParts
  extends /*@__PURE__*/ S.TaggedError<TooManyParts>()(
    "TooManyParts",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class UnsupportedMediaType
  extends /*@__PURE__*/ S.TaggedError<UnsupportedMediaType>()(
    "UnsupportedMediaType",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(415),
  ).pipe(C.withBadRequestError) {}
export type BucketName = string;
export type ObjectKey = string;
export type MultipartUploadId = string;
export type RequestPayer = "requester" | (string & {});
export type AccountId = string;
export type IfMatchInitiatedTime = Date;
export interface AbortMultipartUploadRequest {
  Bucket: string;
  Key: string;
  UploadId: string;
  RequestPayer?: RequestPayer;
  ExpectedBucketOwner?: string;
  IfMatchInitiatedTime?: Date;
}
export type RequestCharged = "requester" | (string & {});
export interface AbortMultipartUploadOutput {
  RequestCharged?: RequestCharged;
}
export type ETag = string;
export type ChecksumCRC32 = string;
export type ChecksumCRC32C = string;
export type ChecksumCRC64NVME = string;
export type ChecksumSHA1 = string;
export type ChecksumSHA256 = string;
export type ChecksumSHA512 = string;
export type ChecksumMD5 = string;
export type ChecksumXXHASH64 = string;
export type ChecksumXXHASH3 = string;
export type ChecksumXXHASH128 = string;
export type PartNumber = number;
export interface CompletedPart {
  ETag?: string;
  ChecksumCRC32?: string;
  ChecksumCRC32C?: string;
  ChecksumCRC64NVME?: string;
  ChecksumSHA1?: string;
  ChecksumSHA256?: string;
  ChecksumSHA512?: string;
  ChecksumMD5?: string;
  ChecksumXXHASH64?: string;
  ChecksumXXHASH3?: string;
  ChecksumXXHASH128?: string;
  PartNumber?: number;
}
export type CompletedPartList = CompletedPart[];
export interface CompletedMultipartUpload {
  Parts?: CompletedPart[];
}
export type ChecksumType = "COMPOSITE" | "FULL_OBJECT" | (string & {});
export type MpuObjectSize = number;
export type IfMatch = string;
export type IfNoneMatch = string;
export type SSECustomerAlgorithm = string;
export type SSECustomerKey = string | redacted.Redacted<string>;
export type SSECustomerKeyMD5 = string;
export interface CompleteMultipartUploadRequest {
  Bucket: string;
  Key: string;
  MultipartUpload?: CompletedMultipartUpload;
  UploadId: string;
  ChecksumCRC32?: string;
  ChecksumCRC32C?: string;
  ChecksumCRC64NVME?: string;
  ChecksumSHA1?: string;
  ChecksumSHA256?: string;
  ChecksumSHA512?: string;
  ChecksumMD5?: string;
  ChecksumXXHASH64?: string;
  ChecksumXXHASH3?: string;
  ChecksumXXHASH128?: string;
  ChecksumType?: ChecksumType;
  MpuObjectSize?: number;
  RequestPayer?: RequestPayer;
  ExpectedBucketOwner?: string;
  IfMatch?: string;
  IfNoneMatch?: string;
  SSECustomerAlgorithm?: string;
  SSECustomerKey?: string | redacted.Redacted<string>;
  SSECustomerKeyMD5?: string;
}
export type Location = string;
export type Expiration = string;
export type ServerSideEncryption =
  | "AES256"
  | "aws:fsx"
  | "aws:backup"
  | "aws:kms"
  | "aws:kms:dsse"
  | (string & {});
export type ObjectVersionId = string;
export type SSEKMSKeyId = string | redacted.Redacted<string>;
export type BucketKeyEnabled = boolean;
export interface CompleteMultipartUploadOutput {
  Location?: string;
  Bucket?: string;
  Key?: string;
  Expiration?: string;
  ETag?: string;
  ChecksumCRC32?: string;
  ChecksumCRC32C?: string;
  ChecksumCRC64NVME?: string;
  ChecksumSHA1?: string;
  ChecksumSHA256?: string;
  ChecksumSHA512?: string;
  ChecksumMD5?: string;
  ChecksumXXHASH64?: string;
  ChecksumXXHASH3?: string;
  ChecksumXXHASH128?: string;
  ChecksumType?: ChecksumType;
  ServerSideEncryption?: ServerSideEncryption;
  VersionId?: string;
  SSEKMSKeyId?: string | redacted.Redacted<string>;
  BucketKeyEnabled?: boolean;
  RequestCharged?: RequestCharged;
}
export type ObjectCannedACL =
  | "private"
  | "public-read"
  | "public-read-write"
  | "authenticated-read"
  | "aws-exec-read"
  | "bucket-owner-read"
  | "bucket-owner-full-control"
  | (string & {});
export type CacheControl = string;
export type ChecksumAlgorithm =
  | "CRC32"
  | "CRC32C"
  | "SHA1"
  | "SHA256"
  | "CRC64NVME"
  | "SHA512"
  | "MD5"
  | "XXHASH64"
  | "XXHASH3"
  | "XXHASH128"
  | (string & {});
export type ContentDisposition = string;
export type ContentEncoding = string;
export type ContentLanguage = string;
export type ContentType = string;
export type CopySource = string;
export type CopySourceIfMatch = string;
export type CopySourceIfModifiedSince = Date;
export type CopySourceIfNoneMatch = string;
export type CopySourceIfUnmodifiedSince = Date;
export type Expires = string;
export type GrantFullControl = string;
export type GrantRead = string;
export type GrantReadACP = string;
export type GrantWriteACP = string;
export type MetadataKey = string;
export type MetadataValue = string;
export type Metadata = { [key: string]: string | undefined };
export type MetadataDirective = "COPY" | "REPLACE" | (string & {});
export type TaggingDirective = "COPY" | "REPLACE" | (string & {});
export type AnnotationDirective = "COPY" | "EXCLUDE" | (string & {});
export type StorageClass =
  | "STANDARD"
  | "REDUCED_REDUNDANCY"
  | "STANDARD_IA"
  | "ONEZONE_IA"
  | "INTELLIGENT_TIERING"
  | "GLACIER"
  | "DEEP_ARCHIVE"
  | "OUTPOSTS"
  | "GLACIER_IR"
  | "SNOW"
  | "EXPRESS_ONEZONE"
  | "FSX_OPENZFS"
  | "FSX_ONTAP"
  | "AWS_BACKUP_WARM"
  | "AWS_BACKUP_LOW_COST_WARM"
  | (string & {});
export type WebsiteRedirectLocation = string;
export type SSEKMSEncryptionContext = string | redacted.Redacted<string>;
export type CopySourceSSECustomerAlgorithm = string;
export type CopySourceSSECustomerKey = string | redacted.Redacted<string>;
export type CopySourceSSECustomerKeyMD5 = string;
export type TaggingHeader = string;
export type ObjectLockMode = "GOVERNANCE" | "COMPLIANCE" | (string & {});
export type ObjectLockRetainUntilDate = Date;
export type ObjectLockLegalHoldStatus = "ON" | "OFF" | (string & {});
export type ObjectLockEventHold = "ON" | "OFF" | (string & {});
export type ObjectLockEventHoldDurationDays = number;
export type ObjectLockEventHoldDurationYears = number;
export interface CopyObjectRequest {
  ACL?: ObjectCannedACL;
  Bucket: string;
  CacheControl?: string;
  ChecksumAlgorithm?: ChecksumAlgorithm;
  ContentDisposition?: string;
  ContentEncoding?: string;
  ContentLanguage?: string;
  ContentType?: string;
  CopySource: string;
  CopySourceIfMatch?: string;
  CopySourceIfModifiedSince?: Date;
  CopySourceIfNoneMatch?: string;
  CopySourceIfUnmodifiedSince?: Date;
  Expires?: string;
  GrantFullControl?: string;
  GrantRead?: string;
  GrantReadACP?: string;
  GrantWriteACP?: string;
  IfMatch?: string;
  IfNoneMatch?: string;
  Key: string;
  Metadata?: { [key: string]: string | undefined };
  MetadataDirective?: MetadataDirective;
  TaggingDirective?: TaggingDirective;
  AnnotationDirective?: AnnotationDirective;
  ServerSideEncryption?: ServerSideEncryption;
  StorageClass?: StorageClass;
  WebsiteRedirectLocation?: string;
  SSECustomerAlgorithm?: string;
  SSECustomerKey?: string | redacted.Redacted<string>;
  SSECustomerKeyMD5?: string;
  SSEKMSKeyId?: string | redacted.Redacted<string>;
  SSEKMSEncryptionContext?: string | redacted.Redacted<string>;
  BucketKeyEnabled?: boolean;
  CopySourceSSECustomerAlgorithm?: string;
  CopySourceSSECustomerKey?: string | redacted.Redacted<string>;
  CopySourceSSECustomerKeyMD5?: string;
  RequestPayer?: RequestPayer;
  Tagging?: string;
  ObjectLockMode?: ObjectLockMode;
  ObjectLockRetainUntilDate?: Date;
  ObjectLockLegalHoldStatus?: ObjectLockLegalHoldStatus;
  ObjectLockEventHold?: ObjectLockEventHold;
  ObjectLockEventHoldDurationDays?: number;
  ObjectLockEventHoldDurationYears?: number;
  ExpectedBucketOwner?: string;
  ExpectedSourceBucketOwner?: string;
}
export type LastModified = Date;
export interface CopyObjectResult {
  ETag?: string;
  LastModified?: Date;
  ChecksumType?: ChecksumType;
  ChecksumCRC32?: string;
  ChecksumCRC32C?: string;
  ChecksumCRC64NVME?: string;
  ChecksumSHA1?: string;
  ChecksumSHA256?: string;
  ChecksumSHA512?: string;
  ChecksumMD5?: string;
  ChecksumXXHASH64?: string;
  ChecksumXXHASH3?: string;
  ChecksumXXHASH128?: string;
}
export type CopySourceVersionId = string;
export interface CopyObjectOutput {
  CopyObjectResult?: CopyObjectResult;
  Expiration?: string;
  CopySourceVersionId?: string;
  VersionId?: string;
  ServerSideEncryption?: ServerSideEncryption;
  SSECustomerAlgorithm?: string;
  SSECustomerKeyMD5?: string;
  SSEKMSKeyId?: string | redacted.Redacted<string>;
  SSEKMSEncryptionContext?: string | redacted.Redacted<string>;
  BucketKeyEnabled?: boolean;
  RequestCharged?: RequestCharged;
}
export type BucketCannedACL =
  | "private"
  | "public-read"
  | "public-read-write"
  | "authenticated-read"
  | (string & {});
export type BucketLocationConstraint =
  | "af-south-1"
  | "ap-east-1"
  | "ap-east-2"
  | "ap-northeast-1"
  | "ap-northeast-2"
  | "ap-northeast-3"
  | "ap-south-1"
  | "ap-south-2"
  | "ap-southeast-1"
  | "ap-southeast-2"
  | "ap-southeast-3"
  | "ap-southeast-4"
  | "ap-southeast-5"
  | "ap-southeast-6"
  | "ap-southeast-7"
  | "ca-central-1"
  | "ca-west-1"
  | "cn-north-1"
  | "cn-northwest-1"
  | "EU"
  | "eu-central-1"
  | "eu-central-2"
  | "eu-north-1"
  | "eu-south-1"
  | "eu-south-2"
  | "eu-west-1"
  | "eu-west-2"
  | "eu-west-3"
  | "il-central-1"
  | "me-central-1"
  | "me-south-1"
  | "mx-central-1"
  | "sa-east-1"
  | "us-east-2"
  | "us-gov-east-1"
  | "us-gov-west-1"
  | "us-west-1"
  | "us-west-2"
  | (string & {});
export type LocationType = "AvailabilityZone" | "LocalZone" | (string & {});
export type LocationNameAsString = string;
export interface LocationInfo {
  Type?: LocationType;
  Name?: string;
}
export type DataRedundancy = "SingleAvailabilityZone" | "SingleLocalZone" | (string & {});
export type BucketType = "Directory" | (string & {});
export interface BucketInfo {
  DataRedundancy?: DataRedundancy;
  Type?: BucketType;
}
export type Value = string;
export interface Tag {
  Key: string;
  Value: string;
}
export type TagSet = Tag[];
export interface CreateBucketConfiguration {
  LocationConstraint?: BucketLocationConstraint;
  Location?: LocationInfo;
  Bucket?: BucketInfo;
  Tags?: Tag[];
}
export type GrantWrite = string;
export type ObjectLockEnabledForBucket = boolean;
export type ObjectOwnership =
  | "BucketOwnerPreferred"
  | "ObjectWriter"
  | "BucketOwnerEnforced"
  | (string & {});
export type BucketNamespace = "account-regional" | "global" | (string & {});
export interface CreateBucketRequest {
  ACL?: BucketCannedACL;
  Bucket: string;
  CreateBucketConfiguration?: CreateBucketConfiguration;
  GrantFullControl?: string;
  GrantRead?: string;
  GrantReadACP?: string;
  GrantWrite?: string;
  GrantWriteACP?: string;
  ObjectLockEnabledForBucket?: boolean;
  ObjectOwnership?: ObjectOwnership;
  BucketNamespace?: BucketNamespace;
}
export type S3RegionalOrS3ExpressBucketArnString = string;
export interface CreateBucketOutput {
  Location?: string;
  BucketArn?: string;
}
export type ContentMD5 = string;
export type ExpirationState = "ENABLED" | "DISABLED" | (string & {});
export type RecordExpirationDays = number;
export interface RecordExpiration {
  Expiration: ExpirationState;
  Days?: number;
}
export type TableSseAlgorithm = "aws:kms" | "AES256" | (string & {});
export type KmsKeyArn = string;
export interface MetadataTableEncryptionConfiguration {
  SseAlgorithm: TableSseAlgorithm;
  KmsKeyArn?: string;
}
export interface JournalTableConfiguration {
  RecordExpiration: RecordExpiration;
  EncryptionConfiguration?: MetadataTableEncryptionConfiguration;
}
export type InventoryConfigurationState = "ENABLED" | "DISABLED" | (string & {});
export interface InventoryTableConfiguration {
  ConfigurationState: InventoryConfigurationState;
  EncryptionConfiguration?: MetadataTableEncryptionConfiguration;
}
export type AnnotationConfigurationState = "ENABLED" | "DISABLED" | (string & {});
export type Role = string;
export interface AnnotationTableConfiguration {
  ConfigurationState: AnnotationConfigurationState;
  EncryptionConfiguration?: MetadataTableEncryptionConfiguration;
  Role?: string;
}
export interface MetadataConfiguration {
  JournalTableConfiguration: JournalTableConfiguration;
  InventoryTableConfiguration?: InventoryTableConfiguration;
  AnnotationTableConfiguration?: AnnotationTableConfiguration;
}
export interface CreateBucketMetadataConfigurationRequest {
  Bucket: string;
  ContentMD5?: string;
  ChecksumAlgorithm?: ChecksumAlgorithm;
  MetadataConfiguration: MetadataConfiguration;
  ExpectedBucketOwner?: string;
}
export interface CreateBucketMetadataConfigurationResponse {}
export type S3TablesBucketArn = string;
export type S3TablesName = string;
export interface S3TablesDestination {
  TableBucketArn: string;
  TableName: string;
}
export interface MetadataTableConfiguration {
  S3TablesDestination: S3TablesDestination;
}
export interface CreateBucketMetadataTableConfigurationRequest {
  Bucket: string;
  ContentMD5?: string;
  ChecksumAlgorithm?: ChecksumAlgorithm;
  MetadataTableConfiguration: MetadataTableConfiguration;
  ExpectedBucketOwner?: string;
}
export interface CreateBucketMetadataTableConfigurationResponse {}
export interface CreateMultipartUploadRequest {
  ACL?: ObjectCannedACL;
  Bucket: string;
  CacheControl?: string;
  ContentDisposition?: string;
  ContentEncoding?: string;
  ContentLanguage?: string;
  ContentType?: string;
  Expires?: string;
  GrantFullControl?: string;
  GrantRead?: string;
  GrantReadACP?: string;
  GrantWriteACP?: string;
  Key: string;
  Metadata?: { [key: string]: string | undefined };
  ServerSideEncryption?: ServerSideEncryption;
  StorageClass?: StorageClass;
  WebsiteRedirectLocation?: string;
  SSECustomerAlgorithm?: string;
  SSECustomerKey?: string | redacted.Redacted<string>;
  SSECustomerKeyMD5?: string;
  SSEKMSKeyId?: string | redacted.Redacted<string>;
  SSEKMSEncryptionContext?: string | redacted.Redacted<string>;
  BucketKeyEnabled?: boolean;
  RequestPayer?: RequestPayer;
  Tagging?: string;
  ObjectLockMode?: ObjectLockMode;
  ObjectLockRetainUntilDate?: Date;
  ObjectLockLegalHoldStatus?: ObjectLockLegalHoldStatus;
  ObjectLockEventHold?: ObjectLockEventHold;
  ObjectLockEventHoldDurationDays?: number;
  ObjectLockEventHoldDurationYears?: number;
  ExpectedBucketOwner?: string;
  ChecksumAlgorithm?: ChecksumAlgorithm;
  ChecksumType?: ChecksumType;
}
export type AbortDate = Date;
export type AbortRuleId = string;
export interface CreateMultipartUploadOutput {
  AbortDate?: Date;
  AbortRuleId?: string;
  Bucket?: string;
  Key?: string;
  UploadId?: string;
  ServerSideEncryption?: ServerSideEncryption;
  SSECustomerAlgorithm?: string;
  SSECustomerKeyMD5?: string;
  SSEKMSKeyId?: string | redacted.Redacted<string>;
  SSEKMSEncryptionContext?: string | redacted.Redacted<string>;
  BucketKeyEnabled?: boolean;
  RequestCharged?: RequestCharged;
  ChecksumAlgorithm?: ChecksumAlgorithm;
  ChecksumType?: ChecksumType;
}
export type SessionMode = "ReadOnly" | "ReadWrite" | (string & {});
export interface CreateSessionRequest {
  SessionMode?: SessionMode;
  Bucket: string;
  ServerSideEncryption?: ServerSideEncryption;
  SSEKMSKeyId?: string | redacted.Redacted<string>;
  SSEKMSEncryptionContext?: string | redacted.Redacted<string>;
  BucketKeyEnabled?: boolean;
}
export type AccessKeyIdValue = string;
export type SessionCredentialValue = string | redacted.Redacted<string>;
export type SessionExpiration = Date;
export interface SessionCredentials {
  AccessKeyId: string;
  SecretAccessKey: string | redacted.Redacted<string>;
  SessionToken: string | redacted.Redacted<string>;
  Expiration: Date;
}
export interface CreateSessionOutput {
  ServerSideEncryption?: ServerSideEncryption;
  SSEKMSKeyId?: string | redacted.Redacted<string>;
  SSEKMSEncryptionContext?: string | redacted.Redacted<string>;
  BucketKeyEnabled?: boolean;
  Credentials: SessionCredentials;
}
export interface DeleteBucketRequest {
  Bucket: string;
  ExpectedBucketOwner?: string;
}
export interface DeleteBucketResponse {}
export type AnalyticsId = string;
export interface DeleteBucketAnalyticsConfigurationRequest {
  Bucket: string;
  Id: string;
  ExpectedBucketOwner?: string;
}
export interface DeleteBucketAnalyticsConfigurationResponse {}
export interface DeleteBucketCorsRequest {
  Bucket: string;
  ExpectedBucketOwner?: string;
}
export interface DeleteBucketCorsResponse {}
export interface DeleteBucketEncryptionRequest {
  Bucket: string;
  ExpectedBucketOwner?: string;
}
export interface DeleteBucketEncryptionResponse {}
export type IntelligentTieringId = string;
export interface DeleteBucketIntelligentTieringConfigurationRequest {
  Bucket: string;
  Id: string;
  ExpectedBucketOwner?: string;
}
export interface DeleteBucketIntelligentTieringConfigurationResponse {}
export type InventoryId = string;
export interface DeleteBucketInventoryConfigurationRequest {
  Bucket: string;
  Id: string;
  ExpectedBucketOwner?: string;
}
export interface DeleteBucketInventoryConfigurationResponse {}
export interface DeleteBucketLifecycleRequest {
  Bucket: string;
  ExpectedBucketOwner?: string;
}
export interface DeleteBucketLifecycleResponse {}
export interface DeleteBucketMetadataConfigurationRequest {
  Bucket: string;
  ExpectedBucketOwner?: string;
}
export interface DeleteBucketMetadataConfigurationResponse {}
export interface DeleteBucketMetadataTableConfigurationRequest {
  Bucket: string;
  ExpectedBucketOwner?: string;
}
export interface DeleteBucketMetadataTableConfigurationResponse {}
export type MetricsId = string;
export interface DeleteBucketMetricsConfigurationRequest {
  Bucket: string;
  Id: string;
  ExpectedBucketOwner?: string;
}
export interface DeleteBucketMetricsConfigurationResponse {}
export interface DeleteBucketOwnershipControlsRequest {
  Bucket: string;
  ExpectedBucketOwner?: string;
}
export interface DeleteBucketOwnershipControlsResponse {}
export interface DeleteBucketPolicyRequest {
  Bucket: string;
  ExpectedBucketOwner?: string;
}
export interface DeleteBucketPolicyResponse {}
export interface DeleteBucketReplicationRequest {
  Bucket: string;
  ExpectedBucketOwner?: string;
}
export interface DeleteBucketReplicationResponse {}
export interface DeleteBucketTaggingRequest {
  Bucket: string;
  ExpectedBucketOwner?: string;
}
export interface DeleteBucketTaggingResponse {}
export interface DeleteBucketWebsiteRequest {
  Bucket: string;
  ExpectedBucketOwner?: string;
}
export interface DeleteBucketWebsiteResponse {}
export type MFA = string;
export type BypassGovernanceRetention = boolean;
export type IfMatchLastModifiedTime = Date;
export type IfMatchSize = number;
export interface DeleteObjectRequest {
  Bucket: string;
  Key: string;
  MFA?: string;
  VersionId?: string;
  RequestPayer?: RequestPayer;
  BypassGovernanceRetention?: boolean;
  ExpectedBucketOwner?: string;
  IfMatch?: string;
  IfMatchLastModifiedTime?: Date;
  IfMatchSize?: number;
}
export type DeleteMarker = boolean;
export interface DeleteObjectOutput {
  DeleteMarker?: boolean;
  VersionId?: string;
  RequestCharged?: RequestCharged;
}
export type AnnotationName = string;
export type ObjectIfMatch = string;
export interface DeleteObjectAnnotationRequest {
  Bucket: string;
  Key: string;
  AnnotationName: string;
  VersionId?: string;
  RequestPayer?: RequestPayer;
  ExpectedBucketOwner?: string;
  ObjectIfMatch?: string;
}
export interface DeleteObjectAnnotationOutput {
  ObjectVersionId?: string;
  RequestCharged?: RequestCharged;
}
export type LastModifiedTime = Date;
export type Size = number;
export interface ObjectIdentifier {
  Key: string;
  VersionId?: string;
  ETag?: string;
  LastModifiedTime?: Date;
  Size?: number;
}
export type ObjectIdentifierList = ObjectIdentifier[];
export type Quiet = boolean;
export interface Delete {
  Objects: ObjectIdentifier[];
  Quiet?: boolean;
}
export interface DeleteObjectsRequest {
  Bucket: string;
  Delete: Delete;
  MFA?: string;
  RequestPayer?: RequestPayer;
  BypassGovernanceRetention?: boolean;
  ExpectedBucketOwner?: string;
  ChecksumAlgorithm?: ChecksumAlgorithm;
}
export type DeleteMarkerVersionId = string;
export interface DeletedObject {
  Key?: string;
  VersionId?: string;
  DeleteMarker?: boolean;
  DeleteMarkerVersionId?: string;
}
export type DeletedObjects = DeletedObject[];
export type Code = string;
export type Message = string;
export interface Error {
  Key?: string;
  VersionId?: string;
  Code?: string;
  Message?: string;
}
export type Errors = Error[];
export interface DeleteObjectsOutput {
  Deleted?: DeletedObject[];
  RequestCharged?: RequestCharged;
  Errors?: Error[];
}
export interface DeleteObjectTaggingRequest {
  Bucket: string;
  Key: string;
  VersionId?: string;
  ExpectedBucketOwner?: string;
}
export interface DeleteObjectTaggingOutput {
  VersionId?: string;
}
export interface DeletePublicAccessBlockRequest {
  Bucket: string;
  ExpectedBucketOwner?: string;
}
export interface DeletePublicAccessBlockResponse {}
export interface GetBucketAbacRequest {
  Bucket: string;
  ExpectedBucketOwner?: string;
}
export type BucketAbacStatus = "Enabled" | "Disabled" | (string & {});
export interface AbacStatus {
  Status?: BucketAbacStatus;
}
export interface GetBucketAbacOutput {
  AbacStatus?: AbacStatus;
}
export interface GetBucketAccelerateConfigurationRequest {
  Bucket: string;
  ExpectedBucketOwner?: string;
  RequestPayer?: RequestPayer;
}
export type BucketAccelerateStatus = "Enabled" | "Suspended" | (string & {});
export interface GetBucketAccelerateConfigurationOutput {
  Status?: BucketAccelerateStatus;
  RequestCharged?: RequestCharged;
}
export interface GetBucketAclRequest {
  Bucket: string;
  ExpectedBucketOwner?: string;
}
export type DisplayName = string;
export type ID = string;
export interface Owner {
  DisplayName?: string;
  ID?: string;
}
export type EmailAddress = string;
export type URI = string;
export type Type = "CanonicalUser" | "AmazonCustomerByEmail" | "Group" | (string & {});
export interface Grantee {
  DisplayName?: string;
  EmailAddress?: string;
  ID?: string;
  URI?: string;
  Type: Type;
}
export type Permission =
  | "FULL_CONTROL"
  | "WRITE"
  | "WRITE_ACP"
  | "READ"
  | "READ_ACP"
  | (string & {});
export interface Grant {
  Grantee?: Grantee;
  Permission?: Permission;
}
export type Grants = Grant[];
export interface GetBucketAclOutput {
  Owner?: Owner;
  Grants?: Grant[];
}
export interface GetBucketAnalyticsConfigurationRequest {
  Bucket: string;
  Id: string;
  ExpectedBucketOwner?: string;
}
export type Prefix = string;
export interface AnalyticsAndOperator {
  Prefix?: string;
  Tags?: Tag[];
}
export type AnalyticsFilter =
  | { Prefix: string; Tag?: never; And?: never }
  | { Prefix?: never; Tag: Tag; And?: never }
  | { Prefix?: never; Tag?: never; And: AnalyticsAndOperator };
export type StorageClassAnalysisSchemaVersion = "V_1" | (string & {});
export type AnalyticsS3ExportFileFormat = "CSV" | (string & {});
export interface AnalyticsS3BucketDestination {
  Format: AnalyticsS3ExportFileFormat;
  BucketAccountId?: string;
  Bucket: string;
  Prefix?: string;
}
export interface AnalyticsExportDestination {
  S3BucketDestination: AnalyticsS3BucketDestination;
}
export interface StorageClassAnalysisDataExport {
  OutputSchemaVersion: StorageClassAnalysisSchemaVersion;
  Destination: AnalyticsExportDestination;
}
export interface StorageClassAnalysis {
  DataExport?: StorageClassAnalysisDataExport;
}
export interface AnalyticsConfiguration {
  Id: string;
  Filter?: AnalyticsFilter;
  StorageClassAnalysis: StorageClassAnalysis;
}
export interface GetBucketAnalyticsConfigurationOutput {
  AnalyticsConfiguration?: AnalyticsConfiguration;
}
export interface GetBucketCorsRequest {
  Bucket: string;
  ExpectedBucketOwner?: string;
}
export type AllowedHeader = string;
export type AllowedHeaders = string[];
export type AllowedMethod = string;
export type AllowedMethods = string[];
export type AllowedOrigin = string;
export type AllowedOrigins = string[];
export type ExposeHeader = string;
export type ExposeHeaders = string[];
export type MaxAgeSeconds = number;
export interface CORSRule {
  ID?: string;
  AllowedHeaders?: string[];
  AllowedMethods: string[];
  AllowedOrigins: string[];
  ExposeHeaders?: string[];
  MaxAgeSeconds?: number;
}
export type CORSRules = CORSRule[];
export interface GetBucketCorsOutput {
  CORSRules?: CORSRule[];
}
export interface GetBucketEncryptionRequest {
  Bucket: string;
  ExpectedBucketOwner?: string;
}
export interface ServerSideEncryptionByDefault {
  SSEAlgorithm: ServerSideEncryption;
  KMSMasterKeyID?: string | redacted.Redacted<string>;
}
export type EncryptionType = "NONE" | "SSE-C" | (string & {});
export type EncryptionTypeList = EncryptionType[];
export interface BlockedEncryptionTypes {
  EncryptionType?: EncryptionType[];
}
export interface ServerSideEncryptionRule {
  ApplyServerSideEncryptionByDefault?: ServerSideEncryptionByDefault;
  BucketKeyEnabled?: boolean;
  BlockedEncryptionTypes?: BlockedEncryptionTypes;
}
export type ServerSideEncryptionRules = ServerSideEncryptionRule[];
export interface ServerSideEncryptionConfiguration {
  Rules: ServerSideEncryptionRule[];
}
export interface GetBucketEncryptionOutput {
  ServerSideEncryptionConfiguration?: ServerSideEncryptionConfiguration;
}
export interface GetBucketIntelligentTieringConfigurationRequest {
  Bucket: string;
  Id: string;
  ExpectedBucketOwner?: string;
}
export interface IntelligentTieringAndOperator {
  Prefix?: string;
  Tags?: Tag[];
}
export interface IntelligentTieringFilter {
  Prefix?: string;
  Tag?: Tag;
  And?: IntelligentTieringAndOperator;
}
export type IntelligentTieringStatus = "Enabled" | "Disabled" | (string & {});
export type IntelligentTieringDays = number;
export type IntelligentTieringAccessTier = "ARCHIVE_ACCESS" | "DEEP_ARCHIVE_ACCESS" | (string & {});
export interface Tiering {
  Days: number;
  AccessTier: IntelligentTieringAccessTier;
}
export type TieringList = Tiering[];
export interface IntelligentTieringConfiguration {
  Id: string;
  Filter?: IntelligentTieringFilter;
  Status: IntelligentTieringStatus;
  Tierings: Tiering[];
}
export interface GetBucketIntelligentTieringConfigurationOutput {
  IntelligentTieringConfiguration?: IntelligentTieringConfiguration;
}
export interface GetBucketInventoryConfigurationRequest {
  Bucket: string;
  Id: string;
  ExpectedBucketOwner?: string;
}
export type InventoryFormat = "CSV" | "ORC" | "Parquet" | (string & {});
export interface SSES3 {}
export interface SSEKMS {
  KeyId: string | redacted.Redacted<string>;
}
export interface InventoryEncryption {
  SSES3?: SSES3;
  SSEKMS?: SSEKMS;
}
export interface InventoryS3BucketDestination {
  AccountId?: string;
  Bucket: string;
  Format: InventoryFormat;
  Prefix?: string;
  Encryption?: InventoryEncryption;
}
export interface InventoryDestination {
  S3BucketDestination: InventoryS3BucketDestination;
}
export type IsEnabled = boolean;
export interface InventoryFilter {
  Prefix: string;
}
export type InventoryIncludedObjectVersions = "All" | "Current" | (string & {});
export type InventoryOptionalField =
  | "Size"
  | "LastModifiedDate"
  | "StorageClass"
  | "ETag"
  | "IsMultipartUploaded"
  | "ReplicationStatus"
  | "EncryptionStatus"
  | "ObjectLockRetainUntilDate"
  | "ObjectLockMode"
  | "ObjectLockLegalHoldStatus"
  | "ObjectLockEventHoldStatus"
  | "ObjectLockEventHoldDuration"
  | "IntelligentTieringAccessTier"
  | "BucketKeyStatus"
  | "ChecksumAlgorithm"
  | "ObjectAccessControlList"
  | "ObjectOwner"
  | "LifecycleExpirationDate"
  | "IntelligentTieringReferenceDate"
  | (string & {});
export type InventoryOptionalFields = InventoryOptionalField[];
export type InventoryFrequency = "Daily" | "Weekly" | (string & {});
export interface InventorySchedule {
  Frequency: InventoryFrequency;
}
export interface InventoryConfiguration {
  Destination: InventoryDestination;
  IsEnabled: boolean;
  Filter?: InventoryFilter;
  Id: string;
  IncludedObjectVersions: InventoryIncludedObjectVersions;
  OptionalFields?: InventoryOptionalField[];
  Schedule: InventorySchedule;
}
export interface GetBucketInventoryConfigurationOutput {
  InventoryConfiguration?: InventoryConfiguration;
}
export interface GetBucketLifecycleConfigurationRequest {
  Bucket: string;
  ExpectedBucketOwner?: string;
}
export type Days = number;
export type ExpiredObjectDeleteMarker = boolean;
export interface LifecycleExpiration {
  Date?: Date;
  Days?: number;
  ExpiredObjectDeleteMarker?: boolean;
}
export type ObjectSizeGreaterThanBytes = number;
export type ObjectSizeLessThanBytes = number;
export interface LifecycleRuleAndOperator {
  Prefix?: string;
  Tags?: Tag[];
  ObjectSizeGreaterThan?: number;
  ObjectSizeLessThan?: number;
}
export interface LifecycleRuleFilter {
  Prefix?: string;
  Tag?: Tag;
  ObjectSizeGreaterThan?: number;
  ObjectSizeLessThan?: number;
  And?: LifecycleRuleAndOperator;
}
export type ExpirationStatus = "Enabled" | "Disabled" | (string & {});
export type TransitionStorageClass =
  | "GLACIER"
  | "STANDARD_IA"
  | "ONEZONE_IA"
  | "INTELLIGENT_TIERING"
  | "DEEP_ARCHIVE"
  | "GLACIER_IR"
  | (string & {});
export interface Transition {
  Date?: Date;
  Days?: number;
  StorageClass?: TransitionStorageClass;
}
export type TransitionList = Transition[];
export type VersionCount = number;
export interface NoncurrentVersionTransition {
  NoncurrentDays?: number;
  StorageClass?: TransitionStorageClass;
  NewerNoncurrentVersions?: number;
}
export type NoncurrentVersionTransitionList = NoncurrentVersionTransition[];
export interface NoncurrentVersionExpiration {
  NoncurrentDays?: number;
  NewerNoncurrentVersions?: number;
}
export type DaysAfterInitiation = number;
export interface AbortIncompleteMultipartUpload {
  DaysAfterInitiation?: number;
}
export interface LifecycleRule {
  Expiration?: LifecycleExpiration;
  ID?: string;
  Prefix?: string;
  Filter?: LifecycleRuleFilter;
  Status: ExpirationStatus;
  Transitions?: Transition[];
  NoncurrentVersionTransitions?: NoncurrentVersionTransition[];
  NoncurrentVersionExpiration?: NoncurrentVersionExpiration;
  AbortIncompleteMultipartUpload?: AbortIncompleteMultipartUpload;
}
export type LifecycleRules = LifecycleRule[];
export type TransitionDefaultMinimumObjectSize =
  | "varies_by_storage_class"
  | "all_storage_classes_128K"
  | (string & {});
export interface GetBucketLifecycleConfigurationOutput {
  Rules?: LifecycleRule[];
  TransitionDefaultMinimumObjectSize?: TransitionDefaultMinimumObjectSize;
}
export interface GetBucketLocationRequest {
  Bucket: string;
  ExpectedBucketOwner?: string;
}
export interface GetBucketLocationOutput {
  LocationConstraint?: BucketLocationConstraint;
}
export interface GetBucketLoggingRequest {
  Bucket: string;
  ExpectedBucketOwner?: string;
}
export type TargetBucket = string;
export type BucketLogsPermission = "FULL_CONTROL" | "READ" | "WRITE" | (string & {});
export interface TargetGrant {
  Grantee?: Grantee;
  Permission?: BucketLogsPermission;
}
export type TargetGrants = TargetGrant[];
export type TargetPrefix = string;
export interface SimplePrefix {}
export type PartitionDateSource = "EventTime" | "DeliveryTime" | (string & {});
export interface PartitionedPrefix {
  PartitionDateSource?: PartitionDateSource;
}
export interface TargetObjectKeyFormat {
  SimplePrefix?: SimplePrefix;
  PartitionedPrefix?: PartitionedPrefix;
}
export interface LoggingEnabled {
  TargetBucket: string;
  TargetGrants?: TargetGrant[];
  TargetPrefix: string;
  TargetObjectKeyFormat?: TargetObjectKeyFormat;
}
export interface GetBucketLoggingOutput {
  LoggingEnabled?: LoggingEnabled;
}
export interface GetBucketMetadataConfigurationRequest {
  Bucket: string;
  ExpectedBucketOwner?: string;
}
export type S3TablesBucketType = "aws" | "customer" | (string & {});
export type S3TablesNamespace = string;
export interface DestinationResult {
  TableBucketType?: S3TablesBucketType;
  TableBucketArn?: string;
  TableNamespace?: string;
}
export type MetadataTableStatus = string;
export type ErrorCode = string;
export type ErrorMessage = string;
export interface ErrorDetails {
  ErrorCode?: string;
  ErrorMessage?: string;
}
export type S3TablesArn = string;
export interface JournalTableConfigurationResult {
  TableStatus: string;
  Error?: ErrorDetails;
  TableName: string;
  TableArn?: string;
  RecordExpiration: RecordExpiration;
}
export interface InventoryTableConfigurationResult {
  ConfigurationState: InventoryConfigurationState;
  TableStatus?: string;
  Error?: ErrorDetails;
  TableName?: string;
  TableArn?: string;
}
export interface AnnotationTableConfigurationResult {
  ConfigurationState: AnnotationConfigurationState;
  TableStatus?: string;
  Error?: ErrorDetails;
  TableName?: string;
  TableArn?: string;
  Role?: string;
}
export interface MetadataConfigurationResult {
  DestinationResult: DestinationResult;
  JournalTableConfigurationResult?: JournalTableConfigurationResult;
  InventoryTableConfigurationResult?: InventoryTableConfigurationResult;
  AnnotationTableConfigurationResult?: AnnotationTableConfigurationResult;
}
export interface GetBucketMetadataConfigurationResult {
  MetadataConfigurationResult: MetadataConfigurationResult;
}
export interface GetBucketMetadataConfigurationOutput {
  GetBucketMetadataConfigurationResult?: GetBucketMetadataConfigurationResult;
}
export interface GetBucketMetadataTableConfigurationRequest {
  Bucket: string;
  ExpectedBucketOwner?: string;
}
export interface S3TablesDestinationResult {
  TableBucketArn: string;
  TableName: string;
  TableArn: string;
  TableNamespace: string;
}
export interface MetadataTableConfigurationResult {
  S3TablesDestinationResult: S3TablesDestinationResult;
}
export interface GetBucketMetadataTableConfigurationResult {
  MetadataTableConfigurationResult: MetadataTableConfigurationResult;
  Status: string;
  Error?: ErrorDetails;
}
export interface GetBucketMetadataTableConfigurationOutput {
  GetBucketMetadataTableConfigurationResult?: GetBucketMetadataTableConfigurationResult;
}
export interface GetBucketMetricsConfigurationRequest {
  Bucket: string;
  Id: string;
  ExpectedBucketOwner?: string;
}
export type AccessPointArn = string;
export interface MetricsAndOperator {
  Prefix?: string;
  Tags?: Tag[];
  AccessPointArn?: string;
}
export type MetricsFilter =
  | { Prefix: string; Tag?: never; AccessPointArn?: never; And?: never }
  | { Prefix?: never; Tag: Tag; AccessPointArn?: never; And?: never }
  | { Prefix?: never; Tag?: never; AccessPointArn: string; And?: never }
  | { Prefix?: never; Tag?: never; AccessPointArn?: never; And: MetricsAndOperator };
export interface MetricsConfiguration {
  Id: string;
  Filter?: MetricsFilter;
}
export interface GetBucketMetricsConfigurationOutput {
  MetricsConfiguration?: MetricsConfiguration;
}
export interface GetBucketNotificationConfigurationRequest {
  Bucket: string;
  ExpectedBucketOwner?: string;
}
export type NotificationId = string;
export type TopicArn = string;
export type Event =
  | "s3:ReducedRedundancyLostObject"
  | "s3:ObjectCreated:*"
  | "s3:ObjectCreated:Put"
  | "s3:ObjectCreated:Post"
  | "s3:ObjectCreated:Copy"
  | "s3:ObjectCreated:CompleteMultipartUpload"
  | "s3:ObjectRemoved:*"
  | "s3:ObjectRemoved:Delete"
  | "s3:ObjectRemoved:DeleteMarkerCreated"
  | "s3:ObjectRestore:*"
  | "s3:ObjectRestore:Post"
  | "s3:ObjectRestore:Completed"
  | "s3:Replication:*"
  | "s3:Replication:OperationFailedReplication"
  | "s3:Replication:OperationNotTracked"
  | "s3:Replication:OperationMissedThreshold"
  | "s3:Replication:OperationReplicatedAfterThreshold"
  | "s3:ObjectRestore:Delete"
  | "s3:LifecycleTransition"
  | "s3:IntelligentTiering"
  | "s3:ObjectAcl:Put"
  | "s3:LifecycleExpiration:*"
  | "s3:LifecycleExpiration:Delete"
  | "s3:LifecycleExpiration:DeleteMarkerCreated"
  | "s3:ObjectTagging:*"
  | "s3:ObjectTagging:Put"
  | "s3:ObjectTagging:Delete"
  | "s3:ObjectAnnotation:*"
  | "s3:ObjectAnnotation:Put"
  | "s3:ObjectAnnotation:Delete"
  | "s3:ObjectRetention:Put"
  | (string & {});
export type EventList = Event[];
export type FilterRuleName = "prefix" | "suffix" | (string & {});
export type FilterRuleValue = string;
export interface FilterRule {
  Name?: FilterRuleName;
  Value?: string;
}
export type FilterRuleList = FilterRule[];
export interface S3KeyFilter {
  FilterRules?: FilterRule[];
}
export interface NotificationConfigurationFilter {
  Key?: S3KeyFilter;
}
export interface TopicConfiguration {
  Id?: string;
  TopicArn: string;
  Events: Event[];
  Filter?: NotificationConfigurationFilter;
}
export type TopicConfigurationList = TopicConfiguration[];
export type QueueArn = string;
export interface QueueConfiguration {
  Id?: string;
  QueueArn: string;
  Events: Event[];
  Filter?: NotificationConfigurationFilter;
}
export type QueueConfigurationList = QueueConfiguration[];
export type LambdaFunctionArn = string;
export interface LambdaFunctionConfiguration {
  Id?: string;
  LambdaFunctionArn: string;
  Events: Event[];
  Filter?: NotificationConfigurationFilter;
}
export type LambdaFunctionConfigurationList = LambdaFunctionConfiguration[];
export interface EventBridgeConfiguration {}
export interface NotificationConfiguration {
  TopicConfigurations?: TopicConfiguration[];
  QueueConfigurations?: QueueConfiguration[];
  LambdaFunctionConfigurations?: LambdaFunctionConfiguration[];
  EventBridgeConfiguration?: EventBridgeConfiguration;
}
export interface GetBucketOwnershipControlsRequest {
  Bucket: string;
  ExpectedBucketOwner?: string;
}
export interface OwnershipControlsRule {
  ObjectOwnership: ObjectOwnership;
}
export type OwnershipControlsRules = OwnershipControlsRule[];
export interface OwnershipControls {
  Rules: OwnershipControlsRule[];
}
export interface GetBucketOwnershipControlsOutput {
  OwnershipControls?: OwnershipControls;
}
export interface GetBucketPolicyRequest {
  Bucket: string;
  ExpectedBucketOwner?: string;
}
export type Policy = string;
export interface GetBucketPolicyOutput {
  Policy?: string;
}
export interface GetBucketPolicyStatusRequest {
  Bucket: string;
  ExpectedBucketOwner?: string;
}
export type IsPublic = boolean;
export interface PolicyStatus {
  IsPublic?: boolean;
}
export interface GetBucketPolicyStatusOutput {
  PolicyStatus?: PolicyStatus;
}
export interface GetBucketReplicationRequest {
  Bucket: string;
  ExpectedBucketOwner?: string;
}
export type Priority = number;
export interface ReplicationRuleAndOperator {
  Prefix?: string;
  Tags?: Tag[];
}
export interface ReplicationRuleFilter {
  Prefix?: string;
  Tag?: Tag;
  And?: ReplicationRuleAndOperator;
}
export type ReplicationRuleStatus = "Enabled" | "Disabled" | (string & {});
export type SseKmsEncryptedObjectsStatus = "Enabled" | "Disabled" | (string & {});
export interface SseKmsEncryptedObjects {
  Status: SseKmsEncryptedObjectsStatus;
}
export type ReplicaModificationsStatus = "Enabled" | "Disabled" | (string & {});
export interface ReplicaModifications {
  Status: ReplicaModificationsStatus;
}
export interface SourceSelectionCriteria {
  SseKmsEncryptedObjects?: SseKmsEncryptedObjects;
  ReplicaModifications?: ReplicaModifications;
}
export type ExistingObjectReplicationStatus = "Enabled" | "Disabled" | (string & {});
export interface ExistingObjectReplication {
  Status: ExistingObjectReplicationStatus;
}
export type OwnerOverride = "Destination" | (string & {});
export interface AccessControlTranslation {
  Owner: OwnerOverride;
}
export type ReplicaKmsKeyID = string;
export interface EncryptionConfiguration {
  ReplicaKmsKeyID?: string;
}
export type ReplicationTimeStatus = "Enabled" | "Disabled" | (string & {});
export type Minutes = number;
export interface ReplicationTimeValue {
  Minutes?: number;
}
export interface ReplicationTime {
  Status: ReplicationTimeStatus;
  Time: ReplicationTimeValue;
}
export type MetricsStatus = "Enabled" | "Disabled" | (string & {});
export interface Metrics {
  Status: MetricsStatus;
  EventThreshold?: ReplicationTimeValue;
}
export interface Destination {
  Bucket: string;
  Account?: string;
  StorageClass?: StorageClass;
  AccessControlTranslation?: AccessControlTranslation;
  EncryptionConfiguration?: EncryptionConfiguration;
  ReplicationTime?: ReplicationTime;
  Metrics?: Metrics;
}
export type DeleteMarkerReplicationStatus = "Enabled" | "Disabled" | (string & {});
export interface DeleteMarkerReplication {
  Status?: DeleteMarkerReplicationStatus;
}
export interface ReplicationRule {
  ID?: string;
  Priority?: number;
  Prefix?: string;
  Filter?: ReplicationRuleFilter;
  Status: ReplicationRuleStatus;
  SourceSelectionCriteria?: SourceSelectionCriteria;
  ExistingObjectReplication?: ExistingObjectReplication;
  Destination: Destination;
  DeleteMarkerReplication?: DeleteMarkerReplication;
}
export type ReplicationRules = ReplicationRule[];
export interface ReplicationConfiguration {
  Role: string;
  Rules: ReplicationRule[];
}
export interface GetBucketReplicationOutput {
  ReplicationConfiguration?: ReplicationConfiguration;
}
export interface GetBucketRequestPaymentRequest {
  Bucket: string;
  ExpectedBucketOwner?: string;
}
export type Payer = "Requester" | "BucketOwner" | (string & {});
export interface GetBucketRequestPaymentOutput {
  Payer?: Payer;
}
export interface GetBucketTaggingRequest {
  Bucket: string;
  ExpectedBucketOwner?: string;
}
export interface GetBucketTaggingOutput {
  TagSet: Tag[];
}
export interface GetBucketVersioningRequest {
  Bucket: string;
  ExpectedBucketOwner?: string;
}
export type BucketVersioningStatus = "Enabled" | "Suspended" | (string & {});
export type MFADeleteStatus = "Enabled" | "Disabled" | (string & {});
export interface GetBucketVersioningOutput {
  Status?: BucketVersioningStatus;
  MFADelete?: MFADeleteStatus;
}
export interface GetBucketWebsiteRequest {
  Bucket: string;
  ExpectedBucketOwner?: string;
}
export type HostName = string;
export type Protocol = "http" | "https" | (string & {});
export interface RedirectAllRequestsTo {
  HostName: string;
  Protocol?: Protocol;
}
export type Suffix = string;
export interface IndexDocument {
  Suffix: string;
}
export interface ErrorDocument {
  Key: string;
}
export type HttpErrorCodeReturnedEquals = string;
export type KeyPrefixEquals = string;
export interface Condition {
  HttpErrorCodeReturnedEquals?: string;
  KeyPrefixEquals?: string;
}
export type HttpRedirectCode = string;
export type ReplaceKeyPrefixWith = string;
export type ReplaceKeyWith = string;
export interface Redirect {
  HostName?: string;
  HttpRedirectCode?: string;
  Protocol?: Protocol;
  ReplaceKeyPrefixWith?: string;
  ReplaceKeyWith?: string;
}
export interface RoutingRule {
  Condition?: Condition;
  Redirect: Redirect;
}
export type RoutingRules = RoutingRule[];
export interface GetBucketWebsiteOutput {
  RedirectAllRequestsTo?: RedirectAllRequestsTo;
  IndexDocument?: IndexDocument;
  ErrorDocument?: ErrorDocument;
  RoutingRules?: RoutingRule[];
}
export type IfModifiedSince = Date;
export type IfUnmodifiedSince = Date;
export type Range = string;
export type ResponseCacheControl = string;
export type ResponseContentDisposition = string;
export type ResponseContentEncoding = string;
export type ResponseContentLanguage = string;
export type ResponseContentType = string;
export type ResponseExpires = Date;
export type ChecksumMode = "ENABLED" | (string & {});
export interface GetObjectRequest {
  Bucket: string;
  IfMatch?: string;
  IfModifiedSince?: Date;
  IfNoneMatch?: string;
  IfUnmodifiedSince?: Date;
  Key: string;
  Range?: string;
  ResponseCacheControl?: string;
  ResponseContentDisposition?: string;
  ResponseContentEncoding?: string;
  ResponseContentLanguage?: string;
  ResponseContentType?: string;
  ResponseExpires?: Date;
  VersionId?: string;
  SSECustomerAlgorithm?: string;
  SSECustomerKey?: string | redacted.Redacted<string>;
  SSECustomerKeyMD5?: string;
  RequestPayer?: RequestPayer;
  PartNumber?: number;
  ExpectedBucketOwner?: string;
  ChecksumMode?: ChecksumMode;
}
export type AcceptRanges = string;
export type Restore = string;
export type ContentLength = number;
export type MissingMeta = number;
export type ContentRange = string;
export type ReplicationStatus =
  | "COMPLETE"
  | "PENDING"
  | "FAILED"
  | "REPLICA"
  | "COMPLETED"
  | (string & {});
export type PartsCount = number;
export type TagCount = number;
export interface GetObjectOutput {
  Body?: T.StreamingOutputBody;
  DeleteMarker?: boolean;
  AcceptRanges?: string;
  Expiration?: string;
  Restore?: string;
  LastModified?: Date;
  ContentLength?: number;
  ETag?: string;
  ChecksumCRC32?: string;
  ChecksumCRC32C?: string;
  ChecksumCRC64NVME?: string;
  ChecksumSHA1?: string;
  ChecksumSHA256?: string;
  ChecksumSHA512?: string;
  ChecksumMD5?: string;
  ChecksumXXHASH64?: string;
  ChecksumXXHASH3?: string;
  ChecksumXXHASH128?: string;
  ChecksumType?: ChecksumType;
  MissingMeta?: number;
  VersionId?: string;
  CacheControl?: string;
  ContentDisposition?: string;
  ContentEncoding?: string;
  ContentLanguage?: string;
  ContentRange?: string;
  ContentType?: string;
  Expires?: string;
  WebsiteRedirectLocation?: string;
  ServerSideEncryption?: ServerSideEncryption;
  Metadata?: { [key: string]: string | undefined };
  SSECustomerAlgorithm?: string;
  SSECustomerKeyMD5?: string;
  SSEKMSKeyId?: string | redacted.Redacted<string>;
  BucketKeyEnabled?: boolean;
  StorageClass?: StorageClass;
  RequestCharged?: RequestCharged;
  ReplicationStatus?: ReplicationStatus;
  PartsCount?: number;
  TagCount?: number;
  ObjectLockMode?: ObjectLockMode;
  ObjectLockRetainUntilDate?: Date;
  ObjectLockLegalHoldStatus?: ObjectLockLegalHoldStatus;
  ObjectLockEventHold?: ObjectLockEventHold;
  ObjectLockEventHoldDurationDays?: number;
  ObjectLockEventHoldDurationYears?: number;
}
export interface GetObjectAclRequest {
  Bucket: string;
  Key: string;
  VersionId?: string;
  RequestPayer?: RequestPayer;
  ExpectedBucketOwner?: string;
}
export interface GetObjectAclOutput {
  Owner?: Owner;
  Grants?: Grant[];
  RequestCharged?: RequestCharged;
}
export interface GetObjectAnnotationRequest {
  Bucket: string;
  Key: string;
  AnnotationName: string;
  VersionId?: string;
  RequestPayer?: RequestPayer;
  ExpectedBucketOwner?: string;
  ChecksumMode?: ChecksumMode;
}
export interface GetObjectAnnotationOutput {
  AnnotationPayload?: T.StreamingOutputBody;
  ObjectVersionId?: string;
  LastModified?: Date;
  ContentLength?: number;
  ETag?: string;
  ChecksumCRC32?: string;
  ChecksumCRC32C?: string;
  ChecksumCRC64NVME?: string;
  ChecksumSHA1?: string;
  ChecksumSHA256?: string;
  ChecksumSHA512?: string;
  ChecksumMD5?: string;
  ChecksumXXHASH64?: string;
  ChecksumXXHASH3?: string;
  ChecksumXXHASH128?: string;
  ChecksumType?: ChecksumType;
  ServerSideEncryption?: ServerSideEncryption;
  RequestCharged?: RequestCharged;
  ReplicationStatus?: ReplicationStatus;
}
export type MaxParts = number;
export type PartNumberMarker = string;
export type ObjectAttributes =
  | "ETag"
  | "Checksum"
  | "ObjectParts"
  | "StorageClass"
  | "ObjectSize"
  | (string & {});
export type ObjectAttributesList = ObjectAttributes[];
export interface GetObjectAttributesRequest {
  Bucket: string;
  Key: string;
  VersionId?: string;
  MaxParts?: number;
  PartNumberMarker?: string;
  SSECustomerAlgorithm?: string;
  SSECustomerKey?: string | redacted.Redacted<string>;
  SSECustomerKeyMD5?: string;
  RequestPayer?: RequestPayer;
  ExpectedBucketOwner?: string;
  ObjectAttributes: ObjectAttributes[];
}
export interface Checksum {
  ChecksumCRC32?: string;
  ChecksumCRC32C?: string;
  ChecksumCRC64NVME?: string;
  ChecksumSHA1?: string;
  ChecksumSHA256?: string;
  ChecksumSHA512?: string;
  ChecksumMD5?: string;
  ChecksumXXHASH64?: string;
  ChecksumXXHASH3?: string;
  ChecksumXXHASH128?: string;
  ChecksumType?: ChecksumType;
}
export type NextPartNumberMarker = string;
export type IsTruncated = boolean;
export interface ObjectPart {
  PartNumber?: number;
  Size?: number;
  ChecksumCRC32?: string;
  ChecksumCRC32C?: string;
  ChecksumCRC64NVME?: string;
  ChecksumSHA1?: string;
  ChecksumSHA256?: string;
  ChecksumSHA512?: string;
  ChecksumMD5?: string;
  ChecksumXXHASH64?: string;
  ChecksumXXHASH3?: string;
  ChecksumXXHASH128?: string;
}
export type PartsList = ObjectPart[];
export interface GetObjectAttributesParts {
  TotalPartsCount?: number;
  PartNumberMarker?: string;
  NextPartNumberMarker?: string;
  MaxParts?: number;
  IsTruncated?: boolean;
  Parts?: ObjectPart[];
}
export type ObjectSize = number;
export interface GetObjectAttributesOutput {
  DeleteMarker?: boolean;
  LastModified?: Date;
  VersionId?: string;
  RequestCharged?: RequestCharged;
  ETag?: string;
  Checksum?: Checksum;
  ObjectParts?: GetObjectAttributesParts;
  StorageClass?: StorageClass;
  ObjectSize?: number;
}
export interface GetObjectLegalHoldRequest {
  Bucket: string;
  Key: string;
  VersionId?: string;
  RequestPayer?: RequestPayer;
  ExpectedBucketOwner?: string;
}
export interface ObjectLockLegalHold {
  Status?: ObjectLockLegalHoldStatus;
}
export interface GetObjectLegalHoldOutput {
  LegalHold?: ObjectLockLegalHold;
}
export interface GetObjectLockConfigurationRequest {
  Bucket: string;
  ExpectedBucketOwner?: string;
}
export type ObjectLockEnabled = "Enabled" | (string & {});
export type ObjectLockRetentionMode = "GOVERNANCE" | "COMPLIANCE" | (string & {});
export type Years = number;
export interface EventHoldDuration {
  Days?: number;
  Years?: number;
}
export interface DefaultRetention {
  Mode?: ObjectLockRetentionMode;
  Days?: number;
  Years?: number;
  DefaultEventHold?: EventHoldDuration;
}
export interface ObjectLockRule {
  DefaultRetention?: DefaultRetention;
}
export interface ObjectLockConfiguration {
  ObjectLockEnabled?: ObjectLockEnabled;
  Rule?: ObjectLockRule;
}
export interface GetObjectLockConfigurationOutput {
  ObjectLockConfiguration?: ObjectLockConfiguration;
}
export interface GetObjectRetentionRequest {
  Bucket: string;
  Key: string;
  VersionId?: string;
  RequestPayer?: RequestPayer;
  ExpectedBucketOwner?: string;
}
export interface ObjectLockRetention {
  Mode?: ObjectLockRetentionMode;
  RetainUntilDate?: Date;
  EventHold?: ObjectLockEventHold;
  EventHoldDuration?: EventHoldDuration;
}
export interface GetObjectRetentionOutput {
  Retention?: ObjectLockRetention;
}
export interface GetObjectTaggingRequest {
  Bucket: string;
  Key: string;
  VersionId?: string;
  ExpectedBucketOwner?: string;
  RequestPayer?: RequestPayer;
}
export interface GetObjectTaggingOutput {
  VersionId?: string;
  TagSet?: Tag[];
}
export interface GetObjectTorrentRequest {
  Bucket: string;
  Key: string;
  RequestPayer?: RequestPayer;
  ExpectedBucketOwner?: string;
}
export interface GetObjectTorrentOutput {
  Body?: T.StreamingOutputBody;
  RequestCharged?: RequestCharged;
}
export interface GetPublicAccessBlockRequest {
  Bucket: string;
  ExpectedBucketOwner?: string;
}
export type Setting = boolean;
export interface PublicAccessBlockConfiguration {
  BlockPublicAcls?: boolean;
  IgnorePublicAcls?: boolean;
  BlockPublicPolicy?: boolean;
  RestrictPublicBuckets?: boolean;
}
export interface GetPublicAccessBlockOutput {
  PublicAccessBlockConfiguration?: PublicAccessBlockConfiguration;
}
export interface HeadBucketRequest {
  Bucket: string;
  ExpectedBucketOwner?: string;
}
export type BucketLocationName = string;
export type Region = string;
export type AccessPointAlias = boolean;
export interface HeadBucketOutput {
  BucketArn?: string;
  BucketLocationType?: LocationType;
  BucketLocationName?: string;
  BucketRegion?: string;
  AccessPointAlias?: boolean;
}
export interface HeadObjectRequest {
  Bucket: string;
  IfMatch?: string;
  IfModifiedSince?: Date;
  IfNoneMatch?: string;
  IfUnmodifiedSince?: Date;
  Key: string;
  Range?: string;
  ResponseCacheControl?: string;
  ResponseContentDisposition?: string;
  ResponseContentEncoding?: string;
  ResponseContentLanguage?: string;
  ResponseContentType?: string;
  ResponseExpires?: Date;
  VersionId?: string;
  SSECustomerAlgorithm?: string;
  SSECustomerKey?: string | redacted.Redacted<string>;
  SSECustomerKeyMD5?: string;
  RequestPayer?: RequestPayer;
  PartNumber?: number;
  ExpectedBucketOwner?: string;
  ChecksumMode?: ChecksumMode;
}
export type ArchiveStatus = "ARCHIVE_ACCESS" | "DEEP_ARCHIVE_ACCESS" | (string & {});
export interface HeadObjectOutput {
  DeleteMarker?: boolean;
  AcceptRanges?: string;
  Expiration?: string;
  Restore?: string;
  ArchiveStatus?: ArchiveStatus;
  LastModified?: Date;
  ContentLength?: number;
  ChecksumCRC32?: string;
  ChecksumCRC32C?: string;
  ChecksumCRC64NVME?: string;
  ChecksumSHA1?: string;
  ChecksumSHA256?: string;
  ChecksumSHA512?: string;
  ChecksumMD5?: string;
  ChecksumXXHASH64?: string;
  ChecksumXXHASH3?: string;
  ChecksumXXHASH128?: string;
  ChecksumType?: ChecksumType;
  ETag?: string;
  MissingMeta?: number;
  VersionId?: string;
  CacheControl?: string;
  ContentDisposition?: string;
  ContentEncoding?: string;
  ContentLanguage?: string;
  ContentType?: string;
  ContentRange?: string;
  Expires?: string;
  WebsiteRedirectLocation?: string;
  ServerSideEncryption?: ServerSideEncryption;
  Metadata?: { [key: string]: string | undefined };
  SSECustomerAlgorithm?: string;
  SSECustomerKeyMD5?: string;
  SSEKMSKeyId?: string | redacted.Redacted<string>;
  BucketKeyEnabled?: boolean;
  StorageClass?: StorageClass;
  RequestCharged?: RequestCharged;
  ReplicationStatus?: ReplicationStatus;
  PartsCount?: number;
  TagCount?: number;
  ObjectLockMode?: ObjectLockMode;
  ObjectLockRetainUntilDate?: Date;
  ObjectLockLegalHoldStatus?: ObjectLockLegalHoldStatus;
  ObjectLockEventHold?: ObjectLockEventHold;
  ObjectLockEventHoldDurationDays?: number;
  ObjectLockEventHoldDurationYears?: number;
}
export type Token = string;
export interface ListBucketAnalyticsConfigurationsRequest {
  Bucket: string;
  ContinuationToken?: string;
  ExpectedBucketOwner?: string;
}
export type NextToken = string;
export type AnalyticsConfigurationList = AnalyticsConfiguration[];
export interface ListBucketAnalyticsConfigurationsOutput {
  IsTruncated?: boolean;
  ContinuationToken?: string;
  NextContinuationToken?: string;
  AnalyticsConfigurationList?: AnalyticsConfiguration[];
}
export interface ListBucketIntelligentTieringConfigurationsRequest {
  Bucket: string;
  ContinuationToken?: string;
  ExpectedBucketOwner?: string;
}
export type IntelligentTieringConfigurationList = IntelligentTieringConfiguration[];
export interface ListBucketIntelligentTieringConfigurationsOutput {
  IsTruncated?: boolean;
  ContinuationToken?: string;
  NextContinuationToken?: string;
  IntelligentTieringConfigurationList?: IntelligentTieringConfiguration[];
}
export interface ListBucketInventoryConfigurationsRequest {
  Bucket: string;
  ContinuationToken?: string;
  ExpectedBucketOwner?: string;
}
export type InventoryConfigurationList = InventoryConfiguration[];
export interface ListBucketInventoryConfigurationsOutput {
  ContinuationToken?: string;
  InventoryConfigurationList?: InventoryConfiguration[];
  IsTruncated?: boolean;
  NextContinuationToken?: string;
}
export interface ListBucketMetricsConfigurationsRequest {
  Bucket: string;
  ContinuationToken?: string;
  ExpectedBucketOwner?: string;
}
export type MetricsConfigurationList = MetricsConfiguration[];
export interface ListBucketMetricsConfigurationsOutput {
  IsTruncated?: boolean;
  ContinuationToken?: string;
  NextContinuationToken?: string;
  MetricsConfigurationList?: MetricsConfiguration[];
}
export type MaxBuckets = number;
export type BucketRegion = string;
export interface ListBucketsRequest {
  MaxBuckets?: number;
  ContinuationToken?: string;
  Prefix?: string;
  BucketRegion?: string;
}
export type CreationDate = Date;
export interface Bucket {
  Name?: string;
  CreationDate?: Date;
  BucketRegion?: string;
  BucketArn?: string;
}
const Bucket = /*@__PURE__*/ __L.at(__c80, 0) as any as S.Schema<Bucket>;
export type Buckets = Bucket[];
export interface ListBucketsOutput {
  Buckets?: Bucket[];
  Owner?: Owner;
  ContinuationToken?: string;
  Prefix?: string;
}
export type DirectoryBucketToken = string;
export type MaxDirectoryBuckets = number;
export interface ListDirectoryBucketsRequest {
  ContinuationToken?: string;
  MaxDirectoryBuckets?: number;
}
export interface ListDirectoryBucketsOutput {
  Buckets?: Bucket[];
  ContinuationToken?: string;
}
export type Delimiter = string;
export type EncodingType = "url" | (string & {});
export type KeyMarker = string;
export type MaxUploads = number;
export type UploadIdMarker = string;
export interface ListMultipartUploadsRequest {
  Bucket: string;
  Delimiter?: string;
  EncodingType?: EncodingType;
  KeyMarker?: string;
  MaxUploads?: number;
  Prefix?: string;
  UploadIdMarker?: string;
  ExpectedBucketOwner?: string;
  RequestPayer?: RequestPayer;
}
export type NextKeyMarker = string;
export type NextUploadIdMarker = string;
export type Initiated = Date;
export interface Initiator {
  ID?: string;
  DisplayName?: string;
}
export interface MultipartUpload {
  UploadId?: string;
  Key?: string;
  Initiated?: Date;
  StorageClass?: StorageClass;
  Owner?: Owner;
  Initiator?: Initiator;
  ChecksumAlgorithm?: ChecksumAlgorithm;
  ChecksumType?: ChecksumType;
}
export type MultipartUploadList = MultipartUpload[];
export interface CommonPrefix {
  Prefix?: string;
}
export type CommonPrefixList = CommonPrefix[];
export interface ListMultipartUploadsOutput {
  Bucket?: string;
  KeyMarker?: string;
  UploadIdMarker?: string;
  NextKeyMarker?: string;
  Prefix?: string;
  Delimiter?: string;
  NextUploadIdMarker?: string;
  MaxUploads?: number;
  IsTruncated?: boolean;
  Uploads?: MultipartUpload[];
  CommonPrefixes?: CommonPrefix[];
  EncodingType?: EncodingType;
  RequestCharged?: RequestCharged;
}
export type MaxAnnotationResults = number;
export type AnnotationPrefix = string;
export interface ListObjectAnnotationsRequest {
  Bucket: string;
  Key: string;
  VersionId?: string;
  MaxAnnotationResults?: number;
  AnnotationPrefix?: string;
  ContinuationToken?: string;
  RequestPayer?: RequestPayer;
  ExpectedBucketOwner?: string;
}
export type ChecksumAlgorithmList = ChecksumAlgorithm[];
export interface AnnotationEntry {
  AnnotationName: string;
  LastModified: Date;
  ETag?: string;
  ChecksumAlgorithm?: ChecksumAlgorithm[];
  Size: number;
  ReplicationStatus?: ReplicationStatus;
}
export type AnnotationList = AnnotationEntry[];
export type AnnotationCount = number;
export interface ListObjectAnnotationsOutput {
  Annotations?: AnnotationEntry[];
  Bucket?: string;
  Key?: string;
  ObjectVersionId?: string;
  AnnotationPrefix?: string;
  MaxAnnotationResults?: number;
  AnnotationCount?: number;
  ContinuationToken?: string;
  NextContinuationToken?: string;
  RequestCharged?: RequestCharged;
}
export type Marker = string;
export type MaxKeys = number;
export type OptionalObjectAttributes = "RestoreStatus" | (string & {});
export type OptionalObjectAttributesList = OptionalObjectAttributes[];
export interface ListObjectsRequest {
  Bucket: string;
  Delimiter?: string;
  EncodingType?: EncodingType;
  Marker?: string;
  MaxKeys?: number;
  Prefix?: string;
  RequestPayer?: RequestPayer;
  ExpectedBucketOwner?: string;
  OptionalObjectAttributes?: OptionalObjectAttributes[];
}
export type NextMarker = string;
export type ObjectStorageClass =
  | "STANDARD"
  | "REDUCED_REDUNDANCY"
  | "GLACIER"
  | "STANDARD_IA"
  | "ONEZONE_IA"
  | "INTELLIGENT_TIERING"
  | "DEEP_ARCHIVE"
  | "OUTPOSTS"
  | "GLACIER_IR"
  | "SNOW"
  | "EXPRESS_ONEZONE"
  | "FSX_OPENZFS"
  | "FSX_ONTAP"
  | "AWS_BACKUP_WARM"
  | "AWS_BACKUP_LOW_COST_WARM"
  | (string & {});
export type IsRestoreInProgress = boolean;
export type RestoreExpiryDate = Date;
export interface RestoreStatus {
  IsRestoreInProgress?: boolean;
  RestoreExpiryDate?: Date;
}
export interface Object {
  Key?: string;
  LastModified?: Date;
  ETag?: string;
  ChecksumAlgorithm?: ChecksumAlgorithm[];
  ChecksumType?: ChecksumType;
  Size?: number;
  StorageClass?: ObjectStorageClass;
  Owner?: Owner;
  RestoreStatus?: RestoreStatus;
}
export type ObjectList = Object[];
export interface ListObjectsOutput {
  IsTruncated?: boolean;
  Marker?: string;
  NextMarker?: string;
  Contents?: Object[];
  Name?: string;
  Prefix?: string;
  Delimiter?: string;
  MaxKeys?: number;
  CommonPrefixes?: CommonPrefix[];
  EncodingType?: EncodingType;
  RequestCharged?: RequestCharged;
}
export type FetchOwner = boolean;
export type StartAfter = string;
export interface ListObjectsV2Request {
  Bucket: string;
  Delimiter?: string;
  EncodingType?: EncodingType;
  MaxKeys?: number;
  Prefix?: string;
  ContinuationToken?: string;
  FetchOwner?: boolean;
  StartAfter?: string;
  RequestPayer?: RequestPayer;
  ExpectedBucketOwner?: string;
  OptionalObjectAttributes?: OptionalObjectAttributes[];
}
export type KeyCount = number;
export interface ListObjectsV2Output {
  IsTruncated?: boolean;
  Contents?: Object[];
  Name?: string;
  Prefix?: string;
  Delimiter?: string;
  MaxKeys?: number;
  CommonPrefixes?: CommonPrefix[];
  EncodingType?: EncodingType;
  KeyCount?: number;
  ContinuationToken?: string;
  NextContinuationToken?: string;
  StartAfter?: string;
  RequestCharged?: RequestCharged;
}
export type VersionIdMarker = string;
export interface ListObjectVersionsRequest {
  Bucket: string;
  Delimiter?: string;
  EncodingType?: EncodingType;
  KeyMarker?: string;
  MaxKeys?: number;
  Prefix?: string;
  VersionIdMarker?: string;
  ExpectedBucketOwner?: string;
  RequestPayer?: RequestPayer;
  OptionalObjectAttributes?: OptionalObjectAttributes[];
}
export type NextVersionIdMarker = string;
export type ObjectVersionStorageClass = "STANDARD" | (string & {});
export type IsLatest = boolean;
export interface ObjectVersion {
  ETag?: string;
  ChecksumAlgorithm?: ChecksumAlgorithm[];
  ChecksumType?: ChecksumType;
  Size?: number;
  StorageClass?: ObjectVersionStorageClass;
  Key?: string;
  VersionId?: string;
  IsLatest?: boolean;
  LastModified?: Date;
  Owner?: Owner;
  RestoreStatus?: RestoreStatus;
}
export type ObjectVersionList = ObjectVersion[];
export interface DeleteMarkerEntry {
  Owner?: Owner;
  Key?: string;
  VersionId?: string;
  IsLatest?: boolean;
  LastModified?: Date;
}
export type DeleteMarkers = DeleteMarkerEntry[];
export interface ListObjectVersionsOutput {
  IsTruncated?: boolean;
  KeyMarker?: string;
  VersionIdMarker?: string;
  NextKeyMarker?: string;
  NextVersionIdMarker?: string;
  Versions?: ObjectVersion[];
  DeleteMarkers?: DeleteMarkerEntry[];
  Name?: string;
  Prefix?: string;
  Delimiter?: string;
  MaxKeys?: number;
  CommonPrefixes?: CommonPrefix[];
  EncodingType?: EncodingType;
  RequestCharged?: RequestCharged;
}
export interface ListPartsRequest {
  Bucket: string;
  Key: string;
  MaxParts?: number;
  PartNumberMarker?: string;
  UploadId: string;
  RequestPayer?: RequestPayer;
  ExpectedBucketOwner?: string;
  SSECustomerAlgorithm?: string;
  SSECustomerKey?: string | redacted.Redacted<string>;
  SSECustomerKeyMD5?: string;
}
export interface Part {
  PartNumber?: number;
  LastModified?: Date;
  ETag?: string;
  Size?: number;
  ChecksumCRC32?: string;
  ChecksumCRC32C?: string;
  ChecksumCRC64NVME?: string;
  ChecksumSHA1?: string;
  ChecksumSHA256?: string;
  ChecksumSHA512?: string;
  ChecksumMD5?: string;
  ChecksumXXHASH64?: string;
  ChecksumXXHASH3?: string;
  ChecksumXXHASH128?: string;
}
export type Parts = Part[];
export interface ListPartsOutput {
  AbortDate?: Date;
  AbortRuleId?: string;
  Bucket?: string;
  Key?: string;
  UploadId?: string;
  PartNumberMarker?: string;
  NextPartNumberMarker?: string;
  MaxParts?: number;
  IsTruncated?: boolean;
  Parts?: Part[];
  Initiator?: Initiator;
  Owner?: Owner;
  StorageClass?: StorageClass;
  RequestCharged?: RequestCharged;
  ChecksumAlgorithm?: ChecksumAlgorithm;
  ChecksumType?: ChecksumType;
}
export interface PutBucketAbacRequest {
  Bucket: string;
  ContentMD5?: string;
  ChecksumAlgorithm?: ChecksumAlgorithm;
  ExpectedBucketOwner?: string;
  AbacStatus: AbacStatus;
}
export interface PutBucketAbacResponse {}
export interface AccelerateConfiguration {
  Status?: BucketAccelerateStatus;
}
export interface PutBucketAccelerateConfigurationRequest {
  Bucket: string;
  AccelerateConfiguration: AccelerateConfiguration;
  ExpectedBucketOwner?: string;
  ChecksumAlgorithm?: ChecksumAlgorithm;
}
export interface PutBucketAccelerateConfigurationResponse {}
export interface AccessControlPolicy {
  Grants?: Grant[];
  Owner?: Owner;
}
export interface PutBucketAclRequest {
  ACL?: BucketCannedACL;
  AccessControlPolicy?: AccessControlPolicy;
  Bucket: string;
  ContentMD5?: string;
  ChecksumAlgorithm?: ChecksumAlgorithm;
  GrantFullControl?: string;
  GrantRead?: string;
  GrantReadACP?: string;
  GrantWrite?: string;
  GrantWriteACP?: string;
  ExpectedBucketOwner?: string;
}
export interface PutBucketAclResponse {}
export interface PutBucketAnalyticsConfigurationRequest {
  Bucket: string;
  Id: string;
  AnalyticsConfiguration: AnalyticsConfiguration;
  ExpectedBucketOwner?: string;
}
export interface PutBucketAnalyticsConfigurationResponse {}
export interface CORSConfiguration {
  CORSRules: CORSRule[];
}
export interface PutBucketCorsRequest {
  Bucket: string;
  CORSConfiguration: CORSConfiguration;
  ContentMD5?: string;
  ChecksumAlgorithm?: ChecksumAlgorithm;
  ExpectedBucketOwner?: string;
}
export interface PutBucketCorsResponse {}
export interface PutBucketEncryptionRequest {
  Bucket: string;
  ContentMD5?: string;
  ChecksumAlgorithm?: ChecksumAlgorithm;
  ServerSideEncryptionConfiguration: ServerSideEncryptionConfiguration;
  ExpectedBucketOwner?: string;
}
export interface PutBucketEncryptionResponse {}
export interface PutBucketIntelligentTieringConfigurationRequest {
  Bucket: string;
  Id: string;
  ExpectedBucketOwner?: string;
  IntelligentTieringConfiguration: IntelligentTieringConfiguration;
}
export interface PutBucketIntelligentTieringConfigurationResponse {}
export interface PutBucketInventoryConfigurationRequest {
  Bucket: string;
  Id: string;
  InventoryConfiguration: InventoryConfiguration;
  ExpectedBucketOwner?: string;
}
export interface PutBucketInventoryConfigurationResponse {}
export interface BucketLifecycleConfiguration {
  Rules: LifecycleRule[];
}
export interface PutBucketLifecycleConfigurationRequest {
  Bucket: string;
  ChecksumAlgorithm?: ChecksumAlgorithm;
  LifecycleConfiguration?: BucketLifecycleConfiguration;
  ExpectedBucketOwner?: string;
  TransitionDefaultMinimumObjectSize?: TransitionDefaultMinimumObjectSize;
}
export interface PutBucketLifecycleConfigurationOutput {
  TransitionDefaultMinimumObjectSize?: TransitionDefaultMinimumObjectSize;
}
export interface BucketLoggingStatus {
  LoggingEnabled?: LoggingEnabled;
}
export interface PutBucketLoggingRequest {
  Bucket: string;
  BucketLoggingStatus: BucketLoggingStatus;
  ContentMD5?: string;
  ChecksumAlgorithm?: ChecksumAlgorithm;
  ExpectedBucketOwner?: string;
}
export interface PutBucketLoggingResponse {}
export interface PutBucketMetricsConfigurationRequest {
  Bucket: string;
  Id: string;
  MetricsConfiguration: MetricsConfiguration;
  ExpectedBucketOwner?: string;
}
export interface PutBucketMetricsConfigurationResponse {}
export type SkipValidation = boolean;
export interface PutBucketNotificationConfigurationRequest {
  Bucket: string;
  NotificationConfiguration: NotificationConfiguration;
  ExpectedBucketOwner?: string;
  SkipDestinationValidation?: boolean;
}
export interface PutBucketNotificationConfigurationResponse {}
export interface PutBucketOwnershipControlsRequest {
  Bucket: string;
  ContentMD5?: string;
  ExpectedBucketOwner?: string;
  OwnershipControls: OwnershipControls;
  ChecksumAlgorithm?: ChecksumAlgorithm;
}
export interface PutBucketOwnershipControlsResponse {}
export type ConfirmRemoveSelfBucketAccess = boolean;
export interface PutBucketPolicyRequest {
  Bucket: string;
  ContentMD5?: string;
  ChecksumAlgorithm?: ChecksumAlgorithm;
  ConfirmRemoveSelfBucketAccess?: boolean;
  Policy: string;
  ExpectedBucketOwner?: string;
}
export interface PutBucketPolicyResponse {}
export type ObjectLockToken = string;
export interface PutBucketReplicationRequest {
  Bucket: string;
  ContentMD5?: string;
  ChecksumAlgorithm?: ChecksumAlgorithm;
  ReplicationConfiguration: ReplicationConfiguration;
  Token?: string;
  ExpectedBucketOwner?: string;
}
export interface PutBucketReplicationResponse {}
export interface RequestPaymentConfiguration {
  Payer: Payer;
}
export interface PutBucketRequestPaymentRequest {
  Bucket: string;
  ContentMD5?: string;
  ChecksumAlgorithm?: ChecksumAlgorithm;
  RequestPaymentConfiguration: RequestPaymentConfiguration;
  ExpectedBucketOwner?: string;
}
export interface PutBucketRequestPaymentResponse {}
export interface Tagging {
  TagSet: Tag[];
}
export interface PutBucketTaggingRequest {
  Bucket: string;
  ContentMD5?: string;
  ChecksumAlgorithm?: ChecksumAlgorithm;
  Tagging: Tagging;
  ExpectedBucketOwner?: string;
}
export interface PutBucketTaggingResponse {}
export type MFADelete = "Enabled" | "Disabled" | (string & {});
export interface VersioningConfiguration {
  MFADelete?: MFADelete;
  Status?: BucketVersioningStatus;
}
export interface PutBucketVersioningRequest {
  Bucket: string;
  ContentMD5?: string;
  ChecksumAlgorithm?: ChecksumAlgorithm;
  MFA?: string;
  VersioningConfiguration: VersioningConfiguration;
  ExpectedBucketOwner?: string;
}
export interface PutBucketVersioningResponse {}
export interface WebsiteConfiguration {
  ErrorDocument?: ErrorDocument;
  IndexDocument?: IndexDocument;
  RedirectAllRequestsTo?: RedirectAllRequestsTo;
  RoutingRules?: RoutingRule[];
}
export interface PutBucketWebsiteRequest {
  Bucket: string;
  ContentMD5?: string;
  ChecksumAlgorithm?: ChecksumAlgorithm;
  WebsiteConfiguration: WebsiteConfiguration;
  ExpectedBucketOwner?: string;
}
export interface PutBucketWebsiteResponse {}
export type WriteOffsetBytes = number;
export interface PutObjectRequest {
  ACL?: ObjectCannedACL;
  Body?: T.StreamingInputBody;
  Bucket: string;
  CacheControl?: string;
  ContentDisposition?: string;
  ContentEncoding?: string;
  ContentLanguage?: string;
  ContentLength?: number;
  ContentMD5?: string;
  ContentType?: string;
  ChecksumAlgorithm?: ChecksumAlgorithm;
  ChecksumCRC32?: string;
  ChecksumCRC32C?: string;
  ChecksumCRC64NVME?: string;
  ChecksumSHA1?: string;
  ChecksumSHA256?: string;
  ChecksumSHA512?: string;
  ChecksumMD5?: string;
  ChecksumXXHASH64?: string;
  ChecksumXXHASH3?: string;
  ChecksumXXHASH128?: string;
  Expires?: string;
  IfMatch?: string;
  IfNoneMatch?: string;
  GrantFullControl?: string;
  GrantRead?: string;
  GrantReadACP?: string;
  GrantWriteACP?: string;
  Key: string;
  WriteOffsetBytes?: number;
  Metadata?: { [key: string]: string | undefined };
  ServerSideEncryption?: ServerSideEncryption;
  StorageClass?: StorageClass;
  WebsiteRedirectLocation?: string;
  SSECustomerAlgorithm?: string;
  SSECustomerKey?: string | redacted.Redacted<string>;
  SSECustomerKeyMD5?: string;
  SSEKMSKeyId?: string | redacted.Redacted<string>;
  SSEKMSEncryptionContext?: string | redacted.Redacted<string>;
  BucketKeyEnabled?: boolean;
  RequestPayer?: RequestPayer;
  Tagging?: string;
  ObjectLockMode?: ObjectLockMode;
  ObjectLockRetainUntilDate?: Date;
  ObjectLockLegalHoldStatus?: ObjectLockLegalHoldStatus;
  ObjectLockEventHold?: ObjectLockEventHold;
  ObjectLockEventHoldDurationDays?: number;
  ObjectLockEventHoldDurationYears?: number;
  ExpectedBucketOwner?: string;
}
export interface PutObjectOutput {
  Expiration?: string;
  ETag?: string;
  ChecksumCRC32?: string;
  ChecksumCRC32C?: string;
  ChecksumCRC64NVME?: string;
  ChecksumSHA1?: string;
  ChecksumSHA256?: string;
  ChecksumSHA512?: string;
  ChecksumMD5?: string;
  ChecksumXXHASH64?: string;
  ChecksumXXHASH3?: string;
  ChecksumXXHASH128?: string;
  ChecksumType?: ChecksumType;
  ServerSideEncryption?: ServerSideEncryption;
  VersionId?: string;
  SSECustomerAlgorithm?: string;
  SSECustomerKeyMD5?: string;
  SSEKMSKeyId?: string | redacted.Redacted<string>;
  SSEKMSEncryptionContext?: string | redacted.Redacted<string>;
  BucketKeyEnabled?: boolean;
  Size?: number;
  RequestCharged?: RequestCharged;
}
export interface PutObjectAclRequest {
  ACL?: ObjectCannedACL;
  AccessControlPolicy?: AccessControlPolicy;
  Bucket: string;
  ContentMD5?: string;
  ChecksumAlgorithm?: ChecksumAlgorithm;
  GrantFullControl?: string;
  GrantRead?: string;
  GrantReadACP?: string;
  GrantWrite?: string;
  GrantWriteACP?: string;
  Key: string;
  RequestPayer?: RequestPayer;
  VersionId?: string;
  ExpectedBucketOwner?: string;
}
export interface PutObjectAclOutput {
  RequestCharged?: RequestCharged;
}
export interface PutObjectAnnotationRequest {
  Bucket: string;
  Key: string;
  VersionId?: string;
  AnnotationName: string;
  AnnotationPayload: T.StreamingInputBody;
  ObjectIfMatch?: string;
  ChecksumAlgorithm?: ChecksumAlgorithm;
  ChecksumCRC32?: string;
  ChecksumCRC32C?: string;
  ChecksumCRC64NVME?: string;
  ChecksumSHA1?: string;
  ChecksumSHA256?: string;
  ChecksumSHA512?: string;
  ChecksumMD5?: string;
  ChecksumXXHASH64?: string;
  ChecksumXXHASH3?: string;
  ChecksumXXHASH128?: string;
  ContentMD5?: string;
  RequestPayer?: RequestPayer;
  ExpectedBucketOwner?: string;
}
export interface PutObjectAnnotationOutput {
  Key?: string;
  AnnotationName?: string;
  ObjectVersionId?: string;
  ETag?: string;
  ChecksumCRC32?: string;
  ChecksumCRC32C?: string;
  ChecksumCRC64NVME?: string;
  ChecksumSHA1?: string;
  ChecksumSHA256?: string;
  ChecksumSHA512?: string;
  ChecksumMD5?: string;
  ChecksumXXHASH64?: string;
  ChecksumXXHASH3?: string;
  ChecksumXXHASH128?: string;
  ChecksumType?: ChecksumType;
  ServerSideEncryption?: ServerSideEncryption;
  RequestCharged?: RequestCharged;
}
export interface PutObjectLegalHoldRequest {
  Bucket: string;
  Key: string;
  LegalHold?: ObjectLockLegalHold;
  RequestPayer?: RequestPayer;
  VersionId?: string;
  ContentMD5?: string;
  ChecksumAlgorithm?: ChecksumAlgorithm;
  ExpectedBucketOwner?: string;
}
export interface PutObjectLegalHoldOutput {
  RequestCharged?: RequestCharged;
}
export interface PutObjectLockConfigurationRequest {
  Bucket: string;
  ObjectLockConfiguration?: ObjectLockConfiguration;
  RequestPayer?: RequestPayer;
  Token?: string;
  ContentMD5?: string;
  ChecksumAlgorithm?: ChecksumAlgorithm;
  ExpectedBucketOwner?: string;
}
export interface PutObjectLockConfigurationOutput {
  RequestCharged?: RequestCharged;
}
export interface PutObjectRetentionRequest {
  Bucket: string;
  Key: string;
  Retention?: ObjectLockRetention;
  RequestPayer?: RequestPayer;
  VersionId?: string;
  BypassGovernanceRetention?: boolean;
  ContentMD5?: string;
  ChecksumAlgorithm?: ChecksumAlgorithm;
  ExpectedBucketOwner?: string;
}
export interface PutObjectRetentionOutput {
  RequestCharged?: RequestCharged;
}
export interface PutObjectTaggingRequest {
  Bucket: string;
  Key: string;
  VersionId?: string;
  ContentMD5?: string;
  ChecksumAlgorithm?: ChecksumAlgorithm;
  Tagging: Tagging;
  ExpectedBucketOwner?: string;
  RequestPayer?: RequestPayer;
}
export interface PutObjectTaggingOutput {
  VersionId?: string;
}
export interface PutPublicAccessBlockRequest {
  Bucket: string;
  ContentMD5?: string;
  ChecksumAlgorithm?: ChecksumAlgorithm;
  PublicAccessBlockConfiguration: PublicAccessBlockConfiguration;
  ExpectedBucketOwner?: string;
}
export interface PutPublicAccessBlockResponse {}
export type RenameSource = string;
export type RenameSourceIfMatch = string;
export type RenameSourceIfNoneMatch = string;
export type RenameSourceIfModifiedSince = Date;
export type RenameSourceIfUnmodifiedSince = Date;
export type ClientToken = string;
export interface RenameObjectRequest {
  Bucket: string;
  Key: string;
  RenameSource: string;
  DestinationIfMatch?: string;
  DestinationIfNoneMatch?: string;
  DestinationIfModifiedSince?: Date;
  DestinationIfUnmodifiedSince?: Date;
  SourceIfMatch?: string;
  SourceIfNoneMatch?: string;
  SourceIfModifiedSince?: Date;
  SourceIfUnmodifiedSince?: Date;
  ClientToken?: string;
}
export interface RenameObjectOutput {}
export type Tier = "Standard" | "Bulk" | "Expedited" | (string & {});
export interface GlacierJobParameters {
  Tier: Tier;
}
export type RestoreRequestType = "SELECT" | (string & {});
export type Description = string;
export type FileHeaderInfo = "USE" | "IGNORE" | "NONE" | (string & {});
export type Comments = string;
export type QuoteEscapeCharacter = string;
export type RecordDelimiter = string;
export type FieldDelimiter = string;
export type QuoteCharacter = string;
export type AllowQuotedRecordDelimiter = boolean;
export interface CSVInput {
  FileHeaderInfo?: FileHeaderInfo;
  Comments?: string;
  QuoteEscapeCharacter?: string;
  RecordDelimiter?: string;
  FieldDelimiter?: string;
  QuoteCharacter?: string;
  AllowQuotedRecordDelimiter?: boolean;
}
export type CompressionType = "NONE" | "GZIP" | "BZIP2" | (string & {});
export type JSONType = "DOCUMENT" | "LINES" | (string & {});
export interface JSONInput {
  Type?: JSONType;
}
export interface ParquetInput {}
export interface InputSerialization {
  CSV?: CSVInput;
  CompressionType?: CompressionType;
  JSON?: JSONInput;
  Parquet?: ParquetInput;
}
export type ExpressionType = "SQL" | (string & {});
export type Expression = string;
export type QuoteFields = "ALWAYS" | "ASNEEDED" | (string & {});
export interface CSVOutput {
  QuoteFields?: QuoteFields;
  QuoteEscapeCharacter?: string;
  RecordDelimiter?: string;
  FieldDelimiter?: string;
  QuoteCharacter?: string;
}
export interface JSONOutput {
  RecordDelimiter?: string;
}
export interface OutputSerialization {
  CSV?: CSVOutput;
  JSON?: JSONOutput;
}
export interface SelectParameters {
  InputSerialization: InputSerialization;
  ExpressionType: ExpressionType;
  Expression: string;
  OutputSerialization: OutputSerialization;
}
export type LocationPrefix = string;
export type KMSContext = string;
export interface Encryption {
  EncryptionType: ServerSideEncryption;
  KMSKeyId?: string | redacted.Redacted<string>;
  KMSContext?: string;
}
export interface MetadataEntry {
  Name?: string;
  Value?: string;
}
export type UserMetadata = MetadataEntry[];
export interface S3Location {
  BucketName: string;
  Prefix: string;
  Encryption?: Encryption;
  CannedACL?: ObjectCannedACL;
  AccessControlList?: Grant[];
  Tagging?: Tagging;
  UserMetadata?: MetadataEntry[];
  StorageClass?: StorageClass;
}
export interface OutputLocation {
  S3?: S3Location;
}
export interface RestoreRequest {
  Days?: number;
  GlacierJobParameters?: GlacierJobParameters;
  Type?: RestoreRequestType;
  Tier?: Tier;
  Description?: string;
  SelectParameters?: SelectParameters;
  OutputLocation?: OutputLocation;
}
export interface RestoreObjectRequest {
  Bucket: string;
  Key: string;
  VersionId?: string;
  RestoreRequest?: RestoreRequest;
  RequestPayer?: RequestPayer;
  ChecksumAlgorithm?: ChecksumAlgorithm;
  ExpectedBucketOwner?: string;
}
export type RestoreOutputPath = string;
export interface RestoreObjectOutput {
  RequestCharged?: RequestCharged;
  RestoreOutputPath?: string;
}
export type EnableRequestProgress = boolean;
export interface RequestProgress {
  Enabled?: boolean;
}
export type Start = number;
export type End = number;
export interface ScanRange {
  Start?: number;
  End?: number;
}
export interface SelectObjectContentRequest {
  Bucket: string;
  Key: string;
  SSECustomerAlgorithm?: string;
  SSECustomerKey?: string | redacted.Redacted<string>;
  SSECustomerKeyMD5?: string;
  Expression: string;
  ExpressionType: ExpressionType;
  RequestProgress?: RequestProgress;
  InputSerialization: InputSerialization;
  OutputSerialization: OutputSerialization;
  ScanRange?: ScanRange;
  ExpectedBucketOwner?: string;
}
export type Body = Uint8Array;
export interface RecordsEvent {
  Payload?: Uint8Array;
}
export type BytesScanned = number;
export type BytesProcessed = number;
export type BytesReturned = number;
export interface Stats {
  BytesScanned?: number;
  BytesProcessed?: number;
  BytesReturned?: number;
}
export interface StatsEvent {
  Details?: Stats;
}
export interface Progress {
  BytesScanned?: number;
  BytesProcessed?: number;
  BytesReturned?: number;
}
export interface ProgressEvent {
  Details?: Progress;
}
export interface ContinuationEvent {}
export interface EndEvent {}
export type SelectObjectContentEventStream =
  | { Records: RecordsEvent; Stats?: never; Progress?: never; Cont?: never; End?: never }
  | { Records?: never; Stats: StatsEvent; Progress?: never; Cont?: never; End?: never }
  | { Records?: never; Stats?: never; Progress: ProgressEvent; Cont?: never; End?: never }
  | { Records?: never; Stats?: never; Progress?: never; Cont: ContinuationEvent; End?: never }
  | { Records?: never; Stats?: never; Progress?: never; Cont?: never; End: EndEvent };
export interface SelectObjectContentOutput {
  Payload?: stream.Stream<SelectObjectContentEventStream, Error, never>;
}
export interface AnnotationTableConfigurationUpdates {
  ConfigurationState: AnnotationConfigurationState;
  EncryptionConfiguration?: MetadataTableEncryptionConfiguration;
  Role?: string;
}
export interface UpdateBucketMetadataAnnotationTableConfigurationRequest {
  Bucket: string;
  ContentMD5?: string;
  ChecksumAlgorithm?: ChecksumAlgorithm;
  AnnotationTableConfiguration: AnnotationTableConfigurationUpdates;
  ExpectedBucketOwner?: string;
}
export interface UpdateBucketMetadataAnnotationTableConfigurationResponse {}
export interface InventoryTableConfigurationUpdates {
  ConfigurationState: InventoryConfigurationState;
  EncryptionConfiguration?: MetadataTableEncryptionConfiguration;
}
export interface UpdateBucketMetadataInventoryTableConfigurationRequest {
  Bucket: string;
  ContentMD5?: string;
  ChecksumAlgorithm?: ChecksumAlgorithm;
  InventoryTableConfiguration: InventoryTableConfigurationUpdates;
  ExpectedBucketOwner?: string;
}
export interface UpdateBucketMetadataInventoryTableConfigurationResponse {}
export interface JournalTableConfigurationUpdates {
  RecordExpiration: RecordExpiration;
}
export interface UpdateBucketMetadataJournalTableConfigurationRequest {
  Bucket: string;
  ContentMD5?: string;
  ChecksumAlgorithm?: ChecksumAlgorithm;
  JournalTableConfiguration: JournalTableConfigurationUpdates;
  ExpectedBucketOwner?: string;
}
export interface UpdateBucketMetadataJournalTableConfigurationResponse {}
export type NonEmptyKmsKeyArnString = string | redacted.Redacted<string>;
export interface SSEKMSEncryption {
  KMSKeyArn: string | redacted.Redacted<string>;
  BucketKeyEnabled?: boolean;
}
export type ObjectEncryption = { SSEKMS: SSEKMSEncryption };
export interface UpdateObjectEncryptionRequest {
  Bucket: string;
  Key: string;
  VersionId?: string;
  ObjectEncryption: ObjectEncryption;
  RequestPayer?: RequestPayer;
  ExpectedBucketOwner?: string;
  ContentMD5?: string;
  ChecksumAlgorithm?: ChecksumAlgorithm;
}
export interface UpdateObjectEncryptionResponse {
  RequestCharged?: RequestCharged;
}
export interface UploadPartRequest {
  Body?: T.StreamingInputBody;
  Bucket: string;
  ContentLength?: number;
  ContentMD5?: string;
  ChecksumAlgorithm?: ChecksumAlgorithm;
  ChecksumCRC32?: string;
  ChecksumCRC32C?: string;
  ChecksumCRC64NVME?: string;
  ChecksumSHA1?: string;
  ChecksumSHA256?: string;
  ChecksumSHA512?: string;
  ChecksumMD5?: string;
  ChecksumXXHASH64?: string;
  ChecksumXXHASH3?: string;
  ChecksumXXHASH128?: string;
  Key: string;
  PartNumber: number;
  UploadId: string;
  SSECustomerAlgorithm?: string;
  SSECustomerKey?: string | redacted.Redacted<string>;
  SSECustomerKeyMD5?: string;
  RequestPayer?: RequestPayer;
  ExpectedBucketOwner?: string;
}
export interface UploadPartOutput {
  ServerSideEncryption?: ServerSideEncryption;
  ETag?: string;
  ChecksumCRC32?: string;
  ChecksumCRC32C?: string;
  ChecksumCRC64NVME?: string;
  ChecksumSHA1?: string;
  ChecksumSHA256?: string;
  ChecksumSHA512?: string;
  ChecksumMD5?: string;
  ChecksumXXHASH64?: string;
  ChecksumXXHASH3?: string;
  ChecksumXXHASH128?: string;
  SSECustomerAlgorithm?: string;
  SSECustomerKeyMD5?: string;
  SSEKMSKeyId?: string | redacted.Redacted<string>;
  BucketKeyEnabled?: boolean;
  RequestCharged?: RequestCharged;
}
export type CopySourceRange = string;
export interface UploadPartCopyRequest {
  Bucket: string;
  CopySource: string;
  CopySourceIfMatch?: string;
  CopySourceIfModifiedSince?: Date;
  CopySourceIfNoneMatch?: string;
  CopySourceIfUnmodifiedSince?: Date;
  CopySourceRange?: string;
  Key: string;
  PartNumber: number;
  UploadId: string;
  SSECustomerAlgorithm?: string;
  SSECustomerKey?: string | redacted.Redacted<string>;
  SSECustomerKeyMD5?: string;
  CopySourceSSECustomerAlgorithm?: string;
  CopySourceSSECustomerKey?: string | redacted.Redacted<string>;
  CopySourceSSECustomerKeyMD5?: string;
  RequestPayer?: RequestPayer;
  ExpectedBucketOwner?: string;
  ExpectedSourceBucketOwner?: string;
}
export interface CopyPartResult {
  ETag?: string;
  LastModified?: Date;
  ChecksumCRC32?: string;
  ChecksumCRC32C?: string;
  ChecksumCRC64NVME?: string;
  ChecksumSHA1?: string;
  ChecksumSHA256?: string;
  ChecksumSHA512?: string;
  ChecksumMD5?: string;
  ChecksumXXHASH64?: string;
  ChecksumXXHASH3?: string;
  ChecksumXXHASH128?: string;
}
export interface UploadPartCopyOutput {
  CopySourceVersionId?: string;
  CopyPartResult?: CopyPartResult;
  ServerSideEncryption?: ServerSideEncryption;
  SSECustomerAlgorithm?: string;
  SSECustomerKeyMD5?: string;
  SSEKMSKeyId?: string | redacted.Redacted<string>;
  BucketKeyEnabled?: boolean;
  RequestCharged?: RequestCharged;
}
export type RequestRoute = string;
export type RequestToken = string;
export type GetObjectResponseStatusCode = number;
export interface WriteGetObjectResponseRequest {
  RequestRoute: string;
  RequestToken: string;
  Body?: T.StreamingInputBody;
  StatusCode?: number;
  ErrorCode?: string;
  ErrorMessage?: string;
  AcceptRanges?: string;
  CacheControl?: string;
  ContentDisposition?: string;
  ContentEncoding?: string;
  ContentLanguage?: string;
  ContentLength?: number;
  ContentRange?: string;
  ContentType?: string;
  ChecksumCRC32?: string;
  ChecksumCRC32C?: string;
  ChecksumCRC64NVME?: string;
  ChecksumSHA1?: string;
  ChecksumSHA256?: string;
  ChecksumSHA512?: string;
  ChecksumMD5?: string;
  ChecksumXXHASH64?: string;
  ChecksumXXHASH3?: string;
  ChecksumXXHASH128?: string;
  DeleteMarker?: boolean;
  ETag?: string;
  Expires?: string;
  Expiration?: string;
  LastModified?: Date;
  MissingMeta?: number;
  Metadata?: { [key: string]: string | undefined };
  ObjectLockMode?: ObjectLockMode;
  ObjectLockLegalHoldStatus?: ObjectLockLegalHoldStatus;
  ObjectLockRetainUntilDate?: Date;
  PartsCount?: number;
  ReplicationStatus?: ReplicationStatus;
  RequestCharged?: RequestCharged;
  Restore?: string;
  ServerSideEncryption?: ServerSideEncryption;
  SSECustomerAlgorithm?: string;
  SSEKMSKeyId?: string | redacted.Redacted<string>;
  SSECustomerKeyMD5?: string;
  StorageClass?: StorageClass;
  TagCount?: number;
  VersionId?: string;
  BucketKeyEnabled?: boolean;
}
export interface WriteGetObjectResponseResponse {}
export type AbortMultipartUploadError =
  | NoSuchUpload
  | RequestLimitExceeded
  | SlowDown
  | NoSuchBucket
  | NotFound
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * This operation aborts a multipart upload. After a multipart upload is aborted, no additional parts
 * can be uploaded using that upload ID. The storage consumed by any previously uploaded parts will be
 * freed. However, if any part uploads are currently in progress, those part uploads might or might not
 * succeed. As a result, it might be necessary to abort a given multipart upload multiple times in order to
 * completely free all storage consumed by all parts.
 *
 * To verify that all parts have been removed and prevent getting charged for the part storage, you
 * should call the ListParts API operation and ensure that the parts list is empty.
 *
 * - **Directory buckets** - If multipart uploads in a
 * directory bucket are in progress, you can't delete the bucket until all the in-progress multipart
 * uploads are aborted or completed. To delete these in-progress multipart uploads, use the
 * `ListMultipartUploads` operation to list the in-progress multipart uploads in the
 * bucket and use the `AbortMultipartUpload` operation to abort all the in-progress
 * multipart uploads.
 *
 * - **Directory buckets** - For directory buckets, you must make requests for this API operation to the Zonal endpoint. These endpoints support virtual-hosted-style requests in the format https://*amzn-s3-demo-bucket*.s3express-*zone-id*.*region-code*.amazonaws.com/*key-name*
 * . Path-style requests are not supported. For more information about endpoints in Availability Zones, see Regional and Zonal endpoints for directory buckets in Availability Zones in the
 * *Amazon S3 User Guide*. For more information about endpoints in Local Zones, see Concepts for directory buckets in Local Zones in the
 * *Amazon S3 User Guide*.
 *
 * ### Permissions
 *
 * - **General purpose bucket permissions** - For information
 * about permissions required to use the multipart upload, see Multipart Upload and Permissions in
 * the *Amazon S3 User Guide*.
 *
 * - **Directory bucket permissions** - To grant access to this API operation on a directory bucket, we recommend that you use the
 * `CreateSession`
 * API operation for session-based authorization. Specifically, you grant the `s3express:CreateSession` permission to the directory bucket in a bucket policy or an IAM identity-based policy. Then, you make the `CreateSession` API call on the bucket to obtain a session token. With the session token in your request header, you can make API requests to this operation. After the session token expires, you make another `CreateSession` API call to generate a new session token for use.
 * Amazon Web Services CLI or SDKs create session and refresh the session token automatically to avoid service interruptions when a session expires. For more information about authorization, see
 * `CreateSession`
 * .
 *
 * ### HTTP Host header syntax
 *
 * **Directory buckets ** - The HTTP Host header syntax is
 * *Bucket-name*.s3express-*zone-id*.*region-code*.amazonaws.com.
 *
 * The following operations are related to `AbortMultipartUpload`:
 *
 * - CreateMultipartUpload
 *
 * - UploadPart
 *
 * - CompleteMultipartUpload
 *
 * - ListParts
 *
 * - ListMultipartUploads
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const abortMultipartUpload: API.OperationMethod<
  AbortMultipartUploadRequest,
  AbortMultipartUploadOutput,
  AbortMultipartUploadError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1264, __c79, 0) as any as S.Schema<AbortMultipartUploadRequest>,
  output: __S(1265, __c79, 1) as any as S.Schema<AbortMultipartUploadOutput>,
  errors: [
    NoSuchUpload,
    RequestLimitExceeded,
    SlowDown,
    NoSuchBucket,
    NotFound,
    InvalidAccessKeyId,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AbortMultipartUpload",
  telemetry: TELEMETRY,
  span: { op: "AbortMultipartUpload", input: { UploadId: [{ name: "aws.s3.upload_id" }] } },
}));

export type CompleteMultipartUploadError = NoSuchUpload | InvalidAccessKeyId | CommonErrors;
/**
 * Completes a multipart upload by assembling previously uploaded parts.
 *
 * You first initiate the multipart upload and then upload all parts using the UploadPart operation or the
 * UploadPartCopy
 * operation. After successfully uploading all relevant parts of an upload, you call this
 * `CompleteMultipartUpload` operation to complete the upload. Upon receiving this request,
 * Amazon S3 concatenates all the parts in ascending order by part number to create a new object. In the
 * CompleteMultipartUpload request, you must provide the parts list and ensure that the parts list is
 * complete. The CompleteMultipartUpload API operation concatenates the parts that you provide in the list.
 * For each part in the list, you must provide the `PartNumber` value and the `ETag`
 * value that are returned after that part was uploaded.
 *
 * The processing of a CompleteMultipartUpload request could take several minutes to finalize. After
 * Amazon S3 begins processing the request, it sends an HTTP response header that specifies a 200
 * OK response. While processing is in progress, Amazon S3 periodically sends white space characters to
 * keep the connection from timing out. A request could fail after the initial `200 OK` response
 * has been sent. This means that a `200 OK` response can contain either a success or an error.
 * The error response might be embedded in the `200 OK` response. If you call this API operation
 * directly, make sure to design your application to parse the contents of the response and handle it
 * appropriately. If you use Amazon Web Services SDKs, SDKs handle this condition. The SDKs detect the embedded error and
 * apply error handling per your configuration settings (including automatically retrying the request as
 * appropriate). If the condition persists, the SDKs throw an exception (or, for the SDKs that don't use
 * exceptions, they return an error).
 *
 * Note that if `CompleteMultipartUpload` fails, applications should be prepared to retry
 * any failed requests (including 500 error responses). For more information, see Amazon S3 Error Best
 * Practices.
 *
 * You can't use `Content-Type: application/x-www-form-urlencoded` for the
 * CompleteMultipartUpload requests. Also, if you don't provide a `Content-Type` header,
 * `CompleteMultipartUpload` can still return a `200 OK` response.
 *
 * For more information about multipart uploads, see Uploading Objects Using Multipart Upload in
 * the *Amazon S3 User Guide*.
 *
 * **Directory buckets** - For directory buckets, you must make requests for this API operation to the Zonal endpoint. These endpoints support virtual-hosted-style requests in the format https://*amzn-s3-demo-bucket*.s3express-*zone-id*.*region-code*.amazonaws.com/*key-name*
 * . Path-style requests are not supported. For more information about endpoints in Availability Zones, see Regional and Zonal endpoints for directory buckets in Availability Zones in the
 * *Amazon S3 User Guide*. For more information about endpoints in Local Zones, see Concepts for directory buckets in Local Zones in the
 * *Amazon S3 User Guide*.
 *
 * ### Permissions
 *
 * - **General purpose bucket permissions** - For information
 * about permissions required to use the multipart upload API, see Multipart Upload and Permissions in
 * the *Amazon S3 User Guide*.
 *
 * If you provide an additional checksum value in your `MultipartUpload` requests and the
 * object is encrypted with Key Management Service, you must have permission to use the
 * `kms:Decrypt` action for the `CompleteMultipartUpload` request to
 * succeed.
 *
 * - **Directory bucket permissions** - To grant access to this API operation on a directory bucket, we recommend that you use the
 * `CreateSession`
 * API operation for session-based authorization. Specifically, you grant the `s3express:CreateSession` permission to the directory bucket in a bucket policy or an IAM identity-based policy. Then, you make the `CreateSession` API call on the bucket to obtain a session token. With the session token in your request header, you can make API requests to this operation. After the session token expires, you make another `CreateSession` API call to generate a new session token for use.
 * Amazon Web Services CLI or SDKs create session and refresh the session token automatically to avoid service interruptions when a session expires. For more information about authorization, see
 * `CreateSession`
 * .
 *
 * If the object is encrypted with SSE-KMS, you must also have the
 * `kms:GenerateDataKey` and `kms:Decrypt` permissions in IAM
 * identity-based policies and KMS key policies for the KMS key.
 *
 * ### Special errors
 *
 * - Error Code: `EntityTooSmall`
 *
 * - Description: Your proposed upload is smaller than the minimum allowed object size.
 * Each part must be at least 5 MB in size, except the last part.
 *
 * - HTTP Status Code: 400 Bad Request
 *
 * - Error Code: `InvalidPart`
 *
 * - Description: One or more of the specified parts could not be found. The part might not
 * have been uploaded, or the specified ETag might not have matched the uploaded part's
 * ETag.
 *
 * - HTTP Status Code: 400 Bad Request
 *
 * - Error Code: `InvalidPartOrder`
 *
 * - Description: The list of parts was not in ascending order. The parts list must be
 * specified in order by part number.
 *
 * - HTTP Status Code: 400 Bad Request
 *
 * - Error Code: `NoSuchUpload`
 *
 * - Description: The specified multipart upload does not exist. The upload ID might be
 * invalid, or the multipart upload might have been aborted or completed.
 *
 * - HTTP Status Code: 404 Not Found
 *
 * ### HTTP Host header syntax
 *
 * **Directory buckets ** - The HTTP Host header syntax is
 * *Bucket-name*.s3express-*zone-id*.*region-code*.amazonaws.com.
 *
 * The following operations are related to `CompleteMultipartUpload`:
 *
 * - CreateMultipartUpload
 *
 * - UploadPart
 *
 * - AbortMultipartUpload
 *
 * - ListParts
 *
 * - ListMultipartUploads
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const completeMultipartUpload: API.OperationMethod<
  CompleteMultipartUploadRequest,
  CompleteMultipartUploadOutput,
  CompleteMultipartUploadError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1299, __c81, 3) as any as S.Schema<CompleteMultipartUploadRequest>,
  output: __S(1300, __c81, 4) as any as S.Schema<CompleteMultipartUploadOutput>,
  errors: [NoSuchUpload, InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CompleteMultipartUpload",
  telemetry: TELEMETRY,
  span: { op: "CompleteMultipartUpload", input: { UploadId: [{ name: "aws.s3.upload_id" }] } },
}));

export type CopyObjectError =
  | ObjectNotInActiveTierError
  | RequestLimitExceeded
  | SlowDown
  | NoSuchBucket
  | PermanentRedirect
  | NoSuchKey
  | NoSuchVersion
  | InvalidRequest
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * Creates a copy of an object that is already stored in Amazon S3.
 *
 * End of support notice: As of October 1, 2025, Amazon S3 has discontinued support for Email Grantee Access Control Lists (ACLs). If you attempt to use an Email Grantee ACL in a request after October 1, 2025,
 * the request will receive an `HTTP 405` (Method Not Allowed) error.
 *
 * This change affects the following Amazon Web Services Regions: US East (N. Virginia), US West (N. California), US West (Oregon), Asia Pacific (Singapore), Asia Pacific (Sydney), Asia Pacific (Tokyo), Europe (Ireland), and South America (São Paulo).
 *
 * You can store individual objects of up to 50 TB in Amazon S3. You create a copy of your
 * object up to 5 GB in size in a single atomic action using this API. However, to copy an
 * object greater than 5 GB, you must use the multipart upload Upload Part - Copy
 * (UploadPartCopy) API. For more information, see Copy Object Using the REST
 * Multipart Upload API.
 *
 * You can copy individual objects between general purpose buckets, between directory buckets, and between
 * general purpose buckets and directory buckets.
 *
 * - Amazon S3 supports copy operations using Multi-Region Access Points only as a destination when
 * using the Multi-Region Access Point ARN.
 *
 * - **Directory buckets ** - For directory buckets, you must make requests for this API operation to the Zonal endpoint. These endpoints support virtual-hosted-style requests in the format https://*amzn-s3-demo-bucket*.s3express-*zone-id*.*region-code*.amazonaws.com/*key-name*
 * . Path-style requests are not supported. For more information about endpoints in Availability Zones, see Regional and Zonal endpoints for directory buckets in Availability Zones in the
 * *Amazon S3 User Guide*. For more information about endpoints in Local Zones, see Concepts for directory buckets in Local Zones in the
 * *Amazon S3 User Guide*.
 *
 * - VPC endpoints don't support cross-Region requests (including copies). If you're using VPC
 * endpoints, your source and destination buckets should be in the same Amazon Web Services Region as your VPC
 * endpoint.
 *
 * Both the Region that you want to copy the object from and the Region that you want to copy the
 * object to must be enabled for your account. For more information about how to enable a Region for your
 * account, see Enable
 * or disable a Region for standalone accounts in the Amazon Web Services Account Management
 * Guide.
 *
 * Amazon S3 transfer acceleration does not support cross-Region copies. If you request a cross-Region
 * copy using a transfer acceleration endpoint, you get a `400 Bad Request` error. For more
 * information, see Transfer Acceleration.
 *
 * ### Authentication and authorization
 *
 * All `CopyObject` requests must be authenticated and signed by using IAM
 * credentials (access key ID and secret access key for the IAM identities). All headers with the
 * `x-amz-` prefix, including `x-amz-copy-source`, must be signed. For more
 * information, see REST Authentication.
 *
 * **Directory buckets** - You must use the IAM
 * credentials to authenticate and authorize your access to the `CopyObject` API
 * operation, instead of using the temporary security credentials through the
 * `CreateSession` API operation.
 *
 * Amazon Web Services CLI or SDKs handles authentication and authorization on your behalf.
 *
 * ### Permissions
 *
 * You must have *read* access to the source object and
 * *write* access to the destination bucket.
 *
 * - **General purpose bucket permissions** - You must have
 * permissions in an IAM policy based on the source and destination bucket types in a
 * `CopyObject` operation.
 *
 * - If the source object is in a general purpose bucket, you must have
 * `s3:GetObject`
 * permission to read the source object that is
 * being copied.
 *
 * - If the destination bucket is a general purpose bucket, you must have
 * `s3:PutObject`
 * permission to write the object copy to the
 * destination bucket.
 *
 * - **Directory bucket permissions** - You must have
 * permissions in a bucket policy or an IAM identity-based policy based on the source and destination bucket types
 * in a `CopyObject` operation.
 *
 * - If the source object that you want to copy is in a directory bucket, you must have
 * the
 * `s3express:CreateSession`
 * permission in
 * the `Action` element of a policy to read the object. If no session mode is specified,
 * the session will be created with the maximum allowable privilege, attempting `ReadWrite`
 * first, then `ReadOnly` if `ReadWrite` is not permitted. If you want to explicitly
 * restrict the access to be read-only, you can set the `s3express:SessionMode` condition key to
 * `ReadOnly` on the copy source bucket.
 *
 * - If the copy destination is a directory bucket, you must have the
 * `s3express:CreateSession`
 * permission in the
 * `Action` element of a policy to write the object to the destination. The
 * `s3express:SessionMode` condition key can't be set to `ReadOnly`
 * on the copy destination bucket.
 *
 * If the object is encrypted with SSE-KMS, you must also have the
 * `kms:GenerateDataKey` and `kms:Decrypt` permissions in IAM
 * identity-based policies and KMS key policies for the KMS key.
 *
 * For example policies, see Example
 * bucket policies for S3 Express One Zone and Amazon Web Services
 * Identity and Access Management (IAM) identity-based policies for S3 Express One Zone in the
 * *Amazon S3 User Guide*.
 *
 * ### Response and special errors
 *
 * When the request is an HTTP 1.1 request, the response is chunk encoded. When the request is
 * not an HTTP 1.1 request, the response would not contain the `Content-Length`. You
 * always need to read the entire response body to check if the copy succeeds.
 *
 * - If the copy is successful, you receive a response with information about the copied
 * object.
 *
 * - A copy request might return an error when Amazon S3 receives the copy request or while Amazon S3 is
 * copying the files. A `200 OK` response can contain either a success or an
 * error.
 *
 * - If the error occurs before the copy action starts, you receive a standard Amazon S3
 * error.
 *
 * - If the error occurs during the copy operation, the error response is embedded in the
 * `200 OK` response. For example, in a cross-region copy, you may encounter
 * throttling and receive a `200 OK` response. For more information, see Resolve the Error
 * 200 response when copying objects to Amazon S3. The `200 OK` status code
 * means the copy was accepted, but it doesn't mean the copy is complete. Another example is
 * when you disconnect from Amazon S3 before the copy is complete, Amazon S3 might cancel the copy and
 * you may receive a `200 OK` response. You must stay connected to Amazon S3 until the
 * entire response is successfully received and processed.
 *
 * If you call this API operation directly, make sure to design your application to parse
 * the content of the response and handle it appropriately. If you use Amazon Web Services SDKs, SDKs
 * handle this condition. The SDKs detect the embedded error and apply error handling per
 * your configuration settings (including automatically retrying the request as appropriate).
 * If the condition persists, the SDKs throw an exception (or, for the SDKs that don't use
 * exceptions, they return an error).
 *
 * ### Charge
 *
 * The copy request charge is based on the storage class and Region that you specify for the
 * destination object. The request can also result in a data retrieval charge for the source if the
 * source storage class bills for data retrieval. If the copy source is in a different region, the
 * data transfer is billed to the copy source account. For pricing information, see Amazon S3 pricing.
 *
 * ### HTTP Host header syntax
 *
 * - **Directory buckets ** - The HTTP Host header syntax is
 * *Bucket-name*.s3express-*zone-id*.*region-code*.amazonaws.com.
 *
 * - **Amazon S3 on Outposts** - When you use this action with
 * S3 on Outposts through the REST API, you must direct requests to the S3 on Outposts hostname. The
 * S3 on Outposts hostname takes the form
 *
 * *AccessPointName*-*AccountId*.*outpostID*.s3-outposts.*Region*.amazonaws.com.
 * The hostname isn't required when you use the Amazon Web Services CLI or SDKs.
 *
 * The following operations are related to `CopyObject`:
 *
 * - PutObject
 *
 * - GetObject
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const copyObject: API.OperationMethod<
  CopyObjectRequest,
  CopyObjectOutput,
  CopyObjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1312, __c82, 0) as any as S.Schema<CopyObjectRequest>,
  output: __S(1314, __c82, 2) as any as S.Schema<CopyObjectOutput>,
  errors: [
    ObjectNotInActiveTierError,
    RequestLimitExceeded,
    SlowDown,
    NoSuchBucket,
    PermanentRedirect,
    NoSuchKey,
    NoSuchVersion,
    InvalidRequest,
    InvalidAccessKeyId,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CopyObject",
  telemetry: TELEMETRY,
  span: { op: "CopyObject", input: { CopySource: [{ name: "aws.s3.copy_source" }] } },
}));

export type CreateBucketError =
  | BucketAlreadyExists
  | BucketAlreadyOwnedByYou
  | RequestLimitExceeded
  | SlowDown
  | IllegalLocationConstraintException
  | InvalidArgument
  | InvalidBucketName
  | InvalidLocationConstraint
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * This action creates an Amazon S3 bucket. To create an Amazon S3 on Outposts bucket, see
 * `CreateBucket`
 * .
 *
 * Creates a new S3 bucket. To create a bucket, you must set up Amazon S3 and have a valid Amazon Web Services Access Key
 * ID to authenticate requests. Anonymous requests are never allowed to create buckets. By creating the
 * bucket, you become the bucket owner.
 *
 * There are two types of buckets: general purpose buckets and directory buckets. For more information about
 * these bucket types, see Creating, configuring, and working with Amazon S3
 * buckets in the *Amazon S3 User Guide*.
 *
 * General purpose buckets exist in a global namespace, which means that each bucket name must be unique
 * across all Amazon Web Services accounts in all the Amazon Web Services Regions within a partition. A partition is a grouping of
 * Regions. Amazon Web Services currently has four partitions: `aws` (Standard Regions), `aws-cn`
 * (China Regions), `aws-us-gov` (Amazon Web Services GovCloud (US)), and `aws-eusc`
 * (European Sovereign Cloud). When you create a general purpose bucket, you can choose to create a bucket in
 * the shared global namespace or you can choose to create a bucket in your account regional namespace.
 * Your account regional namespace is a subdivision of the global namespace that only your account can
 * create buckets in. For more information on account regional namespaces, see Namespaces for general purpose buckets.
 *
 * - **General purpose buckets** - If you send your
 * `CreateBucket` request to the `s3.amazonaws.com` global endpoint, the
 * request goes to the `us-east-1` Region. So the signature calculations in Signature
 * Version 4 must use `us-east-1` as the Region, even if the location constraint in the
 * request specifies another Region where the bucket is to be created. If you create a bucket in a
 * Region other than US East (N. Virginia), your application must be able to handle 307 redirect. For
 * more information, see Virtual hosting of buckets in the *Amazon S3 User Guide*.
 *
 * - **Directory buckets ** - For directory buckets, you must make requests for this API operation to the Regional endpoint. These endpoints support path-style requests in the format https://s3express-control.*region-code*.amazonaws.com/*bucket-name*
 * . Virtual-hosted-style requests aren't supported.
 * For more information about endpoints in Availability Zones, see Regional and Zonal endpoints for directory buckets in Availability Zones in the
 * *Amazon S3 User Guide*. For more information about endpoints in Local Zones, see Concepts for directory buckets in Local Zones in the
 * *Amazon S3 User Guide*.
 *
 * ### Permissions
 *
 * - **General purpose bucket permissions** - In addition to the
 * `s3:CreateBucket` permission, the following permissions are required in a policy
 * when your `CreateBucket` request includes specific headers:
 *
 * - **Access control lists (ACLs)** - In your
 * `CreateBucket` request, if you specify an access control list (ACL) and set
 * it to `public-read`, `public-read-write`,
 * `authenticated-read`, or if you explicitly specify any other custom ACLs,
 * both `s3:CreateBucket` and `s3:PutBucketAcl` permissions are
 * required. In your `CreateBucket` request, if you set the ACL to
 * `private`, or if you don't specify any ACLs, only the
 * `s3:CreateBucket` permission is required.
 *
 * - **Object Lock** - In your
 * `CreateBucket` request, if you set
 * `x-amz-bucket-object-lock-enabled` to true, the
 * `s3:PutBucketObjectLockConfiguration` and `s3:PutBucketVersioning`
 * permissions are required.
 *
 * - **S3 Object Ownership** - If your
 * `CreateBucket` request includes the `x-amz-object-ownership`
 * header, then the `s3:PutBucketOwnershipControls` permission is required.
 *
 * To set an ACL on a bucket as part of a `CreateBucket` request, you must
 * explicitly set S3 Object Ownership for the bucket to a different value than the default,
 * `BucketOwnerEnforced`. Additionally, if your desired bucket ACL grants
 * public access, you must first create the bucket (without the bucket ACL) and then
 * explicitly disable Block Public Access on the bucket before using
 * `PutBucketAcl` to set the ACL. If you try to create a bucket with a public
 * ACL, the request will fail.
 *
 * For the majority of modern use cases in S3, we recommend that you keep all Block
 * Public Access settings enabled and keep ACLs disabled. If you would like to share data
 * with users outside of your account, you can use bucket policies as needed. For more
 * information, see Controlling ownership of
 * objects and disabling ACLs for your bucket and Blocking
 * public access to your Amazon S3 storage in the
 * *Amazon S3 User Guide*.
 *
 * - **S3 Block Public Access** - If your specific use
 * case requires granting public access to your S3 resources, you can disable Block Public
 * Access. Specifically, you can create a new bucket with Block Public Access enabled, then
 * separately call the
 * `DeletePublicAccessBlock`
 * API. To use this operation, you must have the
 * `s3:PutBucketPublicAccessBlock` permission. For more information about S3
 * Block Public Access, see Blocking public
 * access to your Amazon S3 storage in the *Amazon S3 User Guide*.
 *
 * - **Directory bucket permissions** - You must have the
 * `s3express:CreateBucket` permission in an IAM identity-based policy instead of a bucket policy.
 * Cross-account access to this API operation isn't supported. This operation can only be performed by the Amazon Web Services account that owns the resource. For more information about directory bucket policies and permissions, see Amazon Web Services Identity and Access Management (IAM) for S3 Express One Zone in the *Amazon S3 User Guide*.
 *
 * The permissions for ACLs, Object Lock, S3 Object Ownership, and S3 Block Public Access
 * are not supported for directory buckets. For directory buckets, all Block Public Access
 * settings are enabled at the bucket level and S3 Object Ownership is set to Bucket owner
 * enforced (ACLs disabled). These settings can't be modified.
 *
 * For more information about permissions for creating and working with directory buckets,
 * see Directory buckets
 * in the *Amazon S3 User Guide*. For more information about supported S3
 * features for directory buckets, see Features of
 * S3 Express One Zone in the *Amazon S3 User Guide*.
 *
 * ### HTTP Host header syntax
 *
 * **Directory buckets ** - The HTTP Host header syntax is `s3express-control.*region-code*.amazonaws.com`.
 *
 * The following operations are related to `CreateBucket`:
 *
 * - PutObject
 *
 * - DeleteBucket
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const createBucket: API.OperationMethod<
  CreateBucketRequest,
  CreateBucketOutput,
  CreateBucketError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1347, __c84, 3) as any as S.Schema<CreateBucketRequest>,
  output: __S(1348, __c84, 4) as any as S.Schema<CreateBucketOutput>,
  errors: [
    BucketAlreadyExists,
    BucketAlreadyOwnedByYou,
    RequestLimitExceeded,
    SlowDown,
    IllegalLocationConstraintException,
    InvalidArgument,
    InvalidBucketName,
    InvalidLocationConstraint,
    InvalidAccessKeyId,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBucket",
  telemetry: TELEMETRY,
  span: "CreateBucket",
}));

export type CreateBucketMetadataConfigurationError = InvalidAccessKeyId | CommonErrors;
/**
 * Creates an S3 Metadata V2 metadata configuration for a general purpose bucket. For more information, see
 * Accelerating
 * data discovery with S3 Metadata in the *Amazon S3 User Guide*.
 *
 * ### Permissions
 *
 * To use this operation, you must have the following permissions. For more information, see
 * Setting up permissions for configuring metadata tables in the
 * *Amazon S3 User Guide*.
 *
 * If you want to encrypt your metadata tables with server-side encryption with Key Management Service
 * (KMS) keys (SSE-KMS), you need additional permissions in your KMS key policy. For more
 * information, see
 * Setting up permissions for configuring metadata tables in the
 * *Amazon S3 User Guide*.
 *
 * If you also want to integrate your table bucket with Amazon Web Services analytics services so that you can
 * query your metadata table, you need additional permissions. For more information, see Integrating
 * Amazon S3 Tables with Amazon Web Services analytics services in the
 * *Amazon S3 User Guide*.
 *
 * To query your metadata tables, you need additional permissions. For more information, see
 *
 * Permissions for querying metadata tables in the *Amazon S3 User Guide*.
 *
 * - `s3:CreateBucketMetadataTableConfiguration`
 *
 * The IAM policy action name is the same for the V1 and V2 API operations.
 *
 * - `s3tables:CreateTableBucket`
 *
 * - `s3tables:CreateNamespace`
 *
 * - `s3tables:GetTable`
 *
 * - `s3tables:CreateTable`
 *
 * - `s3tables:PutTablePolicy`
 *
 * - `s3tables:PutTableBucketPolicy`
 *
 * - `s3tables:PutTableEncryption`
 *
 * - `kms:DescribeKey`
 *
 * - `iam:PassRole` - required if you include an
 * `AnnotationTableConfiguration` with an IAM role.
 *
 * The following operations are related to `CreateBucketMetadataConfiguration`:
 *
 * - DeleteBucketMetadataConfiguration
 *
 * - GetBucketMetadataConfiguration
 *
 * - UpdateBucketMetadataInventoryTableConfiguration
 *
 * - UpdateBucketMetadataJournalTableConfiguration
 *
 * - UpdateBucketMetadataAnnotationTableConfiguration
 *
 * If you include an `AnnotationTableConfiguration` with an IAM role, the role must
 * have a trust policy that allows the Amazon S3 metadata service to assume it, and a permissions policy
 * that grants the actions needed to read annotations from your bucket. The following examples show
 * a trust policy and a permissions policy that you can adapt for your bucket and account.
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const createBucketMetadataConfiguration: API.OperationMethod<
  CreateBucketMetadataConfigurationRequest,
  CreateBucketMetadataConfigurationResponse,
  CreateBucketMetadataConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1380, __c86, 4) as any as S.Schema<CreateBucketMetadataConfigurationRequest>,
  output: __S(1381, __c86, 5) as any as S.Schema<CreateBucketMetadataConfigurationResponse>,
  errors: [InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBucketMetadataConfiguration",
  telemetry: TELEMETRY,
  span: "CreateBucketMetadataConfiguration",
}));

export type CreateBucketMetadataTableConfigurationError = InvalidAccessKeyId | CommonErrors;
/**
 * We recommend that you create your S3 Metadata configurations by using the V2
 * CreateBucketMetadataConfiguration API operation. We no longer recommend using the V1
 * `CreateBucketMetadataTableConfiguration` API operation.
 *
 * If you created your S3 Metadata configuration before July 15, 2025, we recommend that you delete
 * and re-create your configuration by using CreateBucketMetadataConfiguration so that you can expire journal table records and create
 * a live inventory table.
 *
 * Creates a V1 S3 Metadata configuration for a general purpose bucket. For more information, see
 * Accelerating
 * data discovery with S3 Metadata in the *Amazon S3 User Guide*.
 *
 * ### Permissions
 *
 * To use this operation, you must have the following permissions. For more information, see
 * Setting up permissions for configuring metadata tables in the
 * *Amazon S3 User Guide*.
 *
 * If you want to encrypt your metadata tables with server-side encryption with Key Management Service
 * (KMS) keys (SSE-KMS), you need additional permissions. For more
 * information, see
 * Setting up permissions for configuring metadata tables in the
 * *Amazon S3 User Guide*.
 *
 * If you also want to integrate your table bucket with Amazon Web Services analytics services so that you can
 * query your metadata table, you need additional permissions. For more information, see Integrating
 * Amazon S3 Tables with Amazon Web Services analytics services in the
 * *Amazon S3 User Guide*.
 *
 * - `s3:CreateBucketMetadataTableConfiguration`
 *
 * - `s3tables:CreateNamespace`
 *
 * - `s3tables:GetTable`
 *
 * - `s3tables:CreateTable`
 *
 * - `s3tables:PutTablePolicy`
 *
 * The following operations are related to `CreateBucketMetadataTableConfiguration`:
 *
 * - DeleteBucketMetadataTableConfiguration
 *
 * - GetBucketMetadataTableConfiguration
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const createBucketMetadataTableConfiguration: API.OperationMethod<
  CreateBucketMetadataTableConfigurationRequest,
  CreateBucketMetadataTableConfigurationResponse,
  CreateBucketMetadataTableConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1426, __c89, 2) as any as S.Schema<CreateBucketMetadataTableConfigurationRequest>,
  output: __S(1427, __c89, 3) as any as S.Schema<CreateBucketMetadataTableConfigurationResponse>,
  errors: [InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBucketMetadataTableConfiguration",
  telemetry: TELEMETRY,
  span: "CreateBucketMetadataTableConfiguration",
}));

export type CreateMultipartUploadError =
  | RequestLimitExceeded
  | SlowDown
  | NoSuchBucket
  | PermanentRedirect
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * End of support notice: As of October 1, 2025, Amazon S3 has discontinued support for Email Grantee Access Control Lists (ACLs). If you attempt to use an Email Grantee ACL in a request after October 1, 2025,
 * the request will receive an `HTTP 405` (Method Not Allowed) error.
 *
 * This change affects the following Amazon Web Services Regions: US East (N. Virginia), US West (N. California), US West (Oregon), Asia Pacific (Singapore), Asia Pacific (Sydney), Asia Pacific (Tokyo), Europe (Ireland), and South America (São Paulo).
 *
 * This action initiates a multipart upload and returns an upload ID. This upload ID is used to
 * associate all of the parts in the specific multipart upload. You specify this upload ID in each of your
 * subsequent upload part requests (see UploadPart). You also include this upload ID in
 * the final request to either complete or abort the multipart upload request. For more information about
 * multipart uploads, see Multipart
 * Upload Overview in the *Amazon S3 User Guide*.
 *
 * After you initiate a multipart upload and upload one or more parts, to stop being charged for
 * storing the uploaded parts, you must either complete or abort the multipart upload. Amazon S3 frees up the
 * space used to store the parts and stops charging you for storing them only after you either complete
 * or abort a multipart upload.
 *
 * If you have configured a lifecycle rule to abort incomplete multipart uploads, the created multipart
 * upload must be completed within the number of days specified in the bucket lifecycle configuration.
 * Otherwise, the incomplete multipart upload becomes eligible for an abort action and Amazon S3 aborts the
 * multipart upload. For more information, see Aborting
 * Incomplete Multipart Uploads Using a Bucket Lifecycle Configuration.
 *
 * - **Directory buckets ** -
 * S3 Lifecycle is not supported by directory buckets.
 *
 * - **Directory buckets ** - For directory buckets, you must make requests for this API operation to the Zonal endpoint. These endpoints support virtual-hosted-style requests in the format https://*amzn-s3-demo-bucket*.s3express-*zone-id*.*region-code*.amazonaws.com/*key-name*
 * . Path-style requests are not supported. For more information about endpoints in Availability Zones, see Regional and Zonal endpoints for directory buckets in Availability Zones in the
 * *Amazon S3 User Guide*. For more information about endpoints in Local Zones, see Concepts for directory buckets in Local Zones in the
 * *Amazon S3 User Guide*.
 *
 * ### Request signing
 *
 * For request signing, multipart upload is just a series of regular requests. You initiate a
 * multipart upload, send one or more requests to upload parts, and then complete the multipart
 * upload process. You sign each request individually. There is nothing special about signing
 * multipart upload requests. For more information about signing, see Authenticating Requests (Amazon Web Services
 * Signature Version 4) in the *Amazon S3 User Guide*.
 *
 * ### Permissions
 *
 * - **General purpose bucket permissions** - To perform a
 * multipart upload with encryption using an Key Management Service (KMS) KMS key, the requester must have
 * permission to the `kms:Decrypt` and `kms:GenerateDataKey` actions on the
 * key. The requester must also have permissions for the `kms:GenerateDataKey` action
 * for the `CreateMultipartUpload` API. Then, the requester needs permissions for the
 * `kms:Decrypt` action on the `UploadPart` and
 * `UploadPartCopy` APIs. These permissions are required because Amazon S3 must decrypt
 * and read data from the encrypted file parts before it completes the multipart upload. For more
 * information, see Multipart upload API and
 * permissions and Protecting data using server-side
 * encryption with Amazon Web Services KMS in the *Amazon S3 User Guide*.
 *
 * - **Directory bucket permissions** - To grant access to this API operation on a directory bucket, we recommend that you use the
 * `CreateSession`
 * API operation for session-based authorization. Specifically, you grant the `s3express:CreateSession` permission to the directory bucket in a bucket policy or an IAM identity-based policy. Then, you make the `CreateSession` API call on the bucket to obtain a session token. With the session token in your request header, you can make API requests to this operation. After the session token expires, you make another `CreateSession` API call to generate a new session token for use.
 * Amazon Web Services CLI or SDKs create session and refresh the session token automatically to avoid service interruptions when a session expires. For more information about authorization, see
 * `CreateSession`
 * .
 *
 * ### Encryption
 *
 * - **General purpose buckets** - Server-side encryption is for
 * data encryption at rest. Amazon S3 encrypts your data as it writes it to disks in its data centers
 * and decrypts it when you access it. Amazon S3 automatically encrypts all new objects that are
 * uploaded to an S3 bucket. When doing a multipart upload, if you don't specify encryption
 * information in your request, the encryption setting of the uploaded parts is set to the
 * default encryption configuration of the destination bucket. By default, all buckets have a
 * base level of encryption configuration that uses server-side encryption with Amazon S3 managed keys
 * (SSE-S3). If the destination bucket has a default encryption configuration that uses
 * server-side encryption with an Key Management Service (KMS) key (SSE-KMS), or a customer-provided
 * encryption key (SSE-C), Amazon S3 uses the corresponding KMS key, or a customer-provided key to
 * encrypt the uploaded parts. When you perform a CreateMultipartUpload operation, if you want to
 * use a different type of encryption setting for the uploaded parts, you can request that Amazon S3
 * encrypts the object with a different encryption key (such as an Amazon S3 managed key, a KMS key,
 * or a customer-provided key). When the encryption setting in your request is different from the
 * default encryption configuration of the destination bucket, the encryption setting in your
 * request takes precedence. If you choose to provide your own encryption key, the request
 * headers you provide in UploadPart and UploadPartCopy requests must match the headers you used in the
 * `CreateMultipartUpload` request.
 *
 * - Use KMS keys (SSE-KMS) that include the Amazon Web Services managed key (`aws/s3`) and
 * KMS customer managed keys stored in Key Management Service (KMS) - If you want Amazon Web Services to manage the keys used
 * to encrypt data, specify the following headers in the request.
 *
 * - `x-amz-server-side-encryption`
 *
 * - `x-amz-server-side-encryption-aws-kms-key-id`
 *
 * - `x-amz-server-side-encryption-context`
 *
 * - If you specify `x-amz-server-side-encryption:aws:kms`, but don't
 * provide `x-amz-server-side-encryption-aws-kms-key-id`, Amazon S3 uses the
 * Amazon Web Services managed key (`aws/s3` key) in KMS to protect the data.
 *
 * - To perform a multipart upload with encryption by using an Amazon Web Services KMS key, the
 * requester must have permission to the `kms:Decrypt` and
 * `kms:GenerateDataKey*` actions on the key. These permissions are
 * required because Amazon S3 must decrypt and read data from the encrypted file parts
 * before it completes the multipart upload. For more information, see Multipart
 * upload API and permissions and Protecting data using
 * server-side encryption with Amazon Web Services KMS in the
 * *Amazon S3 User Guide*.
 *
 * - If your Identity and Access Management (IAM) user or role is in the same Amazon Web Services account as the
 * KMS key, then you must have these permissions on the key policy. If your IAM
 * user or role is in a different account from the key, then you must have the
 * permissions on both the key policy and your IAM user or role.
 *
 * - All `GET` and `PUT` requests for an object protected by
 * KMS fail if you don't make them by using Secure Sockets Layer (SSL), Transport
 * Layer Security (TLS), or Signature Version 4. For information about configuring any
 * of the officially supported Amazon Web Services SDKs and Amazon Web Services CLI, see Specifying the Signature Version in Request
 * Authentication in the *Amazon S3 User Guide*.
 *
 * For more information about server-side encryption with KMS keys (SSE-KMS), see
 * Protecting Data Using Server-Side Encryption with KMS keys in the
 * *Amazon S3 User Guide*.
 *
 * - Use customer-provided encryption keys (SSE-C) - If you want to manage your own
 * encryption keys, provide all the following headers in the request.
 *
 * - `x-amz-server-side-encryption-customer-algorithm`
 *
 * - `x-amz-server-side-encryption-customer-key`
 *
 * - `x-amz-server-side-encryption-customer-key-MD5`
 *
 * For more information about server-side encryption with customer-provided encryption
 * keys (SSE-C), see Protecting data
 * using server-side encryption with customer-provided encryption keys (SSE-C) in
 * the *Amazon S3 User Guide*.
 *
 * - **Directory buckets** -
 * For directory buckets, there are only two supported options for server-side encryption: server-side encryption with Amazon S3 managed keys (SSE-S3) (`AES256`) and server-side encryption with KMS keys (SSE-KMS) (`aws:kms`). We recommend that the bucket's default encryption uses the desired encryption configuration and you don't override the bucket default encryption in your
 * `CreateSession` requests or `PUT` object requests. Then, new objects
 * are automatically encrypted with the desired encryption settings. For more
 * information, see Protecting data with server-side encryption in the *Amazon S3 User Guide*. For more information about the encryption overriding behaviors in directory buckets, see Specifying server-side encryption with KMS for new object uploads.
 *
 * In the Zonal endpoint API calls (except CopyObject and UploadPartCopy) using the REST API, the encryption request headers must match the encryption settings that are specified in the `CreateSession` request.
 * You can't override the values of the encryption settings (`x-amz-server-side-encryption`, `x-amz-server-side-encryption-aws-kms-key-id`, `x-amz-server-side-encryption-context`, and `x-amz-server-side-encryption-bucket-key-enabled`) that are specified in the `CreateSession` request.
 * You don't need to explicitly specify these encryption settings values in Zonal endpoint API calls, and
 * Amazon S3 will use the encryption settings values from the `CreateSession` request to protect new objects in the directory bucket.
 *
 * When you use the CLI or the Amazon Web Services SDKs, for `CreateSession`, the session token refreshes automatically to avoid service interruptions when a session expires. The CLI or the Amazon Web Services SDKs use the bucket's default encryption configuration for the
 * `CreateSession` request. It's not supported to override the encryption settings values in the `CreateSession` request.
 * So in the Zonal endpoint API calls (except CopyObject and UploadPartCopy),
 * the encryption request headers must match the default encryption configuration of the directory bucket.
 *
 * For directory buckets, when you perform a `CreateMultipartUpload` operation
 * and an `UploadPartCopy` operation, the request headers you provide in the
 * `CreateMultipartUpload` request must match the default encryption configuration
 * of the destination bucket.
 *
 * ### HTTP Host header syntax
 *
 * **Directory buckets ** - The HTTP Host header syntax is
 * *Bucket-name*.s3express-*zone-id*.*region-code*.amazonaws.com.
 *
 * The following operations are related to `CreateMultipartUpload`:
 *
 * - UploadPart
 *
 * - CompleteMultipartUpload
 *
 * - AbortMultipartUpload
 *
 * - ListParts
 *
 * - ListMultipartUploads
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const createMultipartUpload: API.OperationMethod<
  CreateMultipartUploadRequest,
  CreateMultipartUploadOutput,
  CreateMultipartUploadError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1440, __c90, 0) as any as S.Schema<CreateMultipartUploadRequest>,
  output: __S(1441, __c90, 1) as any as S.Schema<CreateMultipartUploadOutput>,
  errors: [RequestLimitExceeded, SlowDown, NoSuchBucket, PermanentRedirect, InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMultipartUpload",
  telemetry: TELEMETRY,
  span: "CreateMultipartUpload",
}));

export type CreateSessionError = NoSuchBucket | InvalidAccessKeyId | CommonErrors;
/**
 * Creates a session that establishes temporary security credentials to support fast authentication and
 * authorization for the Zonal endpoint API operations on directory buckets. For more information about Zonal endpoint API operations that
 * include the Availability Zone in the request endpoint, see S3 Express One Zone APIs in the
 * *Amazon S3 User Guide*.
 *
 * To make Zonal endpoint API requests on a directory bucket, use the `CreateSession` API
 * operation. Specifically, you grant `s3express:CreateSession` permission to a bucket in
 * a bucket policy or an IAM identity-based policy. Then, you use IAM credentials to make the `CreateSession`
 * API request on the bucket, which returns temporary security credentials that include the access key ID,
 * secret access key, session token, and expiration. These credentials have associated permissions to
 * access the Zonal endpoint API operations. After the session is created, you don't need to use other policies to grant
 * permissions to each Zonal endpoint API individually. Instead, in your Zonal endpoint API requests, you sign your
 * requests by applying the temporary security credentials of the session to the request headers and
 * following the SigV4 protocol for authentication. You also apply the session token to the
 * `x-amz-s3session-token` request header for authorization. Temporary security credentials
 * are scoped to the bucket and expire after 5 minutes. After the expiration time, any calls that you make
 * with those credentials will fail. You must use IAM credentials again to make a
 * `CreateSession` API request that generates a new set of temporary credentials for use.
 * Temporary credentials cannot be extended or refreshed beyond the original specified interval.
 *
 * If you use Amazon Web Services SDKs, SDKs handle the session token refreshes automatically to avoid service
 * interruptions when a session expires. We recommend that you use the Amazon Web Services SDKs to initiate and manage
 * requests to the CreateSession API. For more information, see Performance guidelines and design patterns in the
 * *Amazon S3 User Guide*.
 *
 * - You must make requests for this API operation to the Zonal endpoint. These endpoints support virtual-hosted-style requests in the format `https://*bucket-name*.s3express-*zone-id*.*region-code*.amazonaws.com`. Path-style requests are not supported. For more information about endpoints in Availability Zones, see Regional and Zonal endpoints for directory buckets in Availability Zones in the
 * *Amazon S3 User Guide*. For more information about endpoints in Local Zones, see Concepts for directory buckets in Local Zones in the
 * *Amazon S3 User Guide*.
 *
 * -
 * `CopyObject` API operation - Unlike other
 * Zonal endpoint API operations, the `CopyObject` API operation doesn't use the temporary security
 * credentials returned from the `CreateSession` API operation for authentication and
 * authorization. For information about authentication and authorization of the
 * `CopyObject` API operation on directory buckets, see CopyObject.
 *
 * -
 * `HeadBucket` API operation - Unlike other
 * Zonal endpoint API operations, the `HeadBucket` API operation doesn't use the temporary security
 * credentials returned from the `CreateSession` API operation for authentication and
 * authorization. For information about authentication and authorization of the
 * `HeadBucket` API operation on directory buckets, see HeadBucket.
 *
 * ### Permissions
 *
 * To obtain temporary security credentials, you must create a bucket policy or an IAM identity-based policy that
 * grants `s3express:CreateSession` permission to the bucket. In a policy, you can have
 * the `s3express:SessionMode` condition key to control who can create a
 * `ReadWrite` or `ReadOnly` session. For more information about
 * `ReadWrite` or `ReadOnly` sessions, see
 * `x-amz-create-session-mode`
 * . For example policies, see Example
 * bucket policies for S3 Express One Zone and Amazon Web Services Identity
 * and Access Management (IAM) identity-based policies for S3 Express One Zone in the
 * *Amazon S3 User Guide*.
 *
 * To grant cross-account access to Zonal endpoint API operations, the bucket policy should also grant both
 * accounts the `s3express:CreateSession` permission.
 *
 * If you want to encrypt objects with SSE-KMS, you must also have the
 * `kms:GenerateDataKey` and the `kms:Decrypt` permissions in IAM
 * identity-based policies and KMS key policies for the target KMS key.
 *
 * ### Encryption
 *
 * For directory buckets, there are only two supported options for server-side encryption: server-side encryption with Amazon S3 managed keys (SSE-S3) (`AES256`) and server-side encryption with KMS keys (SSE-KMS) (`aws:kms`). We recommend that the bucket's default encryption uses the desired encryption configuration and you don't override the bucket default encryption in your
 * `CreateSession` requests or `PUT` object requests. Then, new objects
 * are automatically encrypted with the desired encryption settings. For more
 * information, see Protecting data with server-side encryption in the *Amazon S3 User Guide*. For more information about the encryption overriding behaviors in directory buckets, see Specifying server-side encryption with KMS for new object uploads.
 *
 * For Zonal endpoint (object-level) API operations except CopyObject and UploadPartCopy,
 * you authenticate and authorize requests through CreateSession for low latency.
 * To encrypt new objects in a directory bucket with SSE-KMS, you must specify SSE-KMS as the directory bucket's default encryption configuration with a KMS key (specifically, a customer managed key). Then, when a session is created for Zonal endpoint API operations, new objects are automatically encrypted and decrypted with SSE-KMS and S3 Bucket Keys during the session.
 *
 * Only 1 customer managed key is supported per directory bucket for the lifetime of the bucket. The Amazon Web Services managed key (`aws/s3`) isn't supported.
 * After you specify SSE-KMS as your bucket's default encryption configuration with a customer managed key, you can't change the customer managed key for the bucket's SSE-KMS configuration.
 *
 * In the Zonal endpoint API calls (except CopyObject and UploadPartCopy) using the REST API,
 * you can't override the values of the encryption settings (`x-amz-server-side-encryption`, `x-amz-server-side-encryption-aws-kms-key-id`, `x-amz-server-side-encryption-context`, and `x-amz-server-side-encryption-bucket-key-enabled`) from the `CreateSession` request.
 * You don't need to explicitly specify these encryption settings values in Zonal endpoint API calls, and
 * Amazon S3 will use the encryption settings values from the `CreateSession` request to protect new objects in the directory bucket.
 *
 * When you use the CLI or the Amazon Web Services SDKs, for `CreateSession`, the session token refreshes automatically to avoid service interruptions when a session expires. The CLI or the Amazon Web Services SDKs use the bucket's default encryption configuration for the
 * `CreateSession` request. It's not supported to override the encryption settings values in the `CreateSession` request.
 * Also, in the Zonal endpoint API calls (except CopyObject and UploadPartCopy),
 * it's not supported to override the values of the encryption settings from the `CreateSession` request.
 *
 * ### HTTP Host header syntax
 *
 * **Directory buckets ** - The HTTP Host header syntax is
 * *Bucket-name*.s3express-*zone-id*.*region-code*.amazonaws.com.
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const createSession: API.OperationMethod<
  CreateSessionRequest,
  CreateSessionOutput,
  CreateSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1456, __c91, 0) as any as S.Schema<CreateSessionRequest>,
  output: __S(1458, __c91, 2) as any as S.Schema<CreateSessionOutput>,
  errors: [NoSuchBucket, InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSession",
  telemetry: TELEMETRY,
  span: "CreateSession",
}));

export type DeleteBucketError =
  | RequestLimitExceeded
  | SlowDown
  | BucketNotEmpty
  | BucketHasAccessPointsAttached
  | NoSuchBucket
  | PermanentRedirect
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * Deletes the S3 bucket. All objects (including all object versions and delete markers) in the bucket
 * must be deleted before the bucket itself can be deleted.
 *
 * - **Directory buckets** - If multipart uploads in a
 * directory bucket are in progress, you can't delete the bucket until all the in-progress multipart
 * uploads are aborted or completed.
 *
 * - **Directory buckets ** - For directory buckets, you must make requests for this API operation to the Regional endpoint. These endpoints support path-style requests in the format https://s3express-control.*region-code*.amazonaws.com/*bucket-name*
 * . Virtual-hosted-style requests aren't supported.
 * For more information about endpoints in Availability Zones, see Regional and Zonal endpoints for directory buckets in Availability Zones in the
 * *Amazon S3 User Guide*. For more information about endpoints in Local Zones, see Concepts for directory buckets in Local Zones in the
 * *Amazon S3 User Guide*.
 *
 * ### Permissions
 *
 * - **General purpose bucket permissions** - You must have the
 * `s3:DeleteBucket` permission on the specified bucket in a policy.
 *
 * - **Directory bucket permissions** - You must have the
 * `s3express:DeleteBucket` permission in an IAM identity-based policy instead of a bucket policy.
 * Cross-account access to this API operation isn't supported. This operation can only be performed by the Amazon Web Services account that owns the resource. For more information about directory bucket policies and permissions, see Amazon Web Services Identity and Access Management (IAM) for S3 Express One Zone in the *Amazon S3 User Guide*.
 *
 * ### HTTP Host header syntax
 *
 * **Directory buckets ** - The HTTP Host header syntax is `s3express-control.*region-code*.amazonaws.com`.
 *
 * The following operations are related to `DeleteBucket`:
 *
 * - CreateBucket
 *
 * - DeleteObject
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const deleteBucket: API.OperationMethod<
  DeleteBucketRequest,
  DeleteBucketResponse,
  DeleteBucketError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1472, __c92, 0) as any as S.Schema<DeleteBucketRequest>,
  output: __S(1473, __c92, 1) as any as S.Schema<DeleteBucketResponse>,
  errors: [
    RequestLimitExceeded,
    SlowDown,
    BucketNotEmpty,
    BucketHasAccessPointsAttached,
    NoSuchBucket,
    PermanentRedirect,
    InvalidAccessKeyId,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBucket",
  telemetry: TELEMETRY,
  span: "DeleteBucket",
}));

export type DeleteBucketAnalyticsConfigurationError =
  | RequestLimitExceeded
  | SlowDown
  | NoSuchBucket
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * This operation is not supported for directory buckets.
 *
 * Deletes an analytics configuration for the bucket (specified by the analytics configuration
 * ID).
 *
 * To use this operation, you must have permissions to perform the
 * `s3:PutAnalyticsConfiguration` action. The bucket owner has this permission by default. The
 * bucket owner can grant this permission to others. For more information about permissions, see Permissions Related to Bucket Subresource Operations and Managing Access Permissions to Your Amazon S3
 * Resources.
 *
 * For information about the Amazon S3 analytics feature, see Amazon S3 Analytics - Storage Class
 * Analysis.
 *
 * The following operations are related to `DeleteBucketAnalyticsConfiguration`:
 *
 * - GetBucketAnalyticsConfiguration
 *
 * - ListBucketAnalyticsConfigurations
 *
 * - PutBucketAnalyticsConfiguration
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const deleteBucketAnalyticsConfiguration: API.OperationMethod<
  DeleteBucketAnalyticsConfigurationRequest,
  DeleteBucketAnalyticsConfigurationResponse,
  DeleteBucketAnalyticsConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1488, __c93, 0) as any as S.Schema<DeleteBucketAnalyticsConfigurationRequest>,
  output: __S(1489, __c93, 1) as any as S.Schema<DeleteBucketAnalyticsConfigurationResponse>,
  errors: [RequestLimitExceeded, SlowDown, NoSuchBucket, InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBucketAnalyticsConfiguration",
  telemetry: TELEMETRY,
  span: "DeleteBucketAnalyticsConfiguration",
}));

export type DeleteBucketCorsError =
  | RequestLimitExceeded
  | SlowDown
  | NoSuchBucket
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * This operation is not supported for directory buckets.
 *
 * Deletes the `cors` configuration information set for the bucket.
 *
 * To use this operation, you must have permission to perform the `s3:PutBucketCORS` action.
 * The bucket owner has this permission by default and can grant this permission to others.
 *
 * For information about `cors`, see Enabling Cross-Origin Resource Sharing in the
 * *Amazon S3 User Guide*.
 *
 * **Related Resources**
 *
 * - PutBucketCors
 *
 * - RESTOPTIONSobject
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const deleteBucketCors: API.OperationMethod<
  DeleteBucketCorsRequest,
  DeleteBucketCorsResponse,
  DeleteBucketCorsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1504, __c94, 0) as any as S.Schema<DeleteBucketCorsRequest>,
  output: __S(1505, __c94, 1) as any as S.Schema<DeleteBucketCorsResponse>,
  errors: [RequestLimitExceeded, SlowDown, NoSuchBucket, InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBucketCors",
  telemetry: TELEMETRY,
  span: "DeleteBucketCors",
}));

export type DeleteBucketEncryptionError =
  | RequestLimitExceeded
  | SlowDown
  | NoSuchBucket
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * This implementation of the DELETE action resets the default encryption for the bucket as server-side
 * encryption with Amazon S3 managed keys (SSE-S3).
 *
 * - **General purpose buckets** - For information about the bucket
 * default encryption feature, see Amazon S3 Bucket Default Encryption in the
 * *Amazon S3 User Guide*.
 *
 * - **Directory buckets** -
 * For directory buckets, there are only two supported options for server-side encryption: SSE-S3 and SSE-KMS. For information about the default encryption configuration in
 * directory buckets, see Setting default server-side
 * encryption behavior for directory buckets.
 *
 * ### Permissions
 *
 * - **General purpose bucket permissions** - The
 * `s3:PutEncryptionConfiguration` permission is required in a policy. The bucket
 * owner has this permission by default. The bucket owner can grant this permission to others.
 * For more information about permissions, see Permissions Related to Bucket Operations and Managing Access Permissions to Your
 * Amazon S3 Resources.
 *
 * - **Directory bucket permissions** - To grant access to
 * this API operation, you must have the `s3express:PutEncryptionConfiguration`
 * permission in an IAM identity-based policy instead of a bucket policy. Cross-account access to this API operation isn't supported. This operation can only be performed by the Amazon Web Services account that owns the resource.
 * For more information about directory bucket policies and permissions, see Amazon Web Services Identity and Access Management (IAM) for S3 Express One Zone in the *Amazon S3 User Guide*.
 *
 * ### HTTP Host header syntax
 *
 * **Directory buckets ** - The HTTP Host header syntax is `s3express-control.*region-code*.amazonaws.com`.
 *
 * The following operations are related to `DeleteBucketEncryption`:
 *
 * - PutBucketEncryption
 *
 * - GetBucketEncryption
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const deleteBucketEncryption: API.OperationMethod<
  DeleteBucketEncryptionRequest,
  DeleteBucketEncryptionResponse,
  DeleteBucketEncryptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1520, __c95, 0) as any as S.Schema<DeleteBucketEncryptionRequest>,
  output: __S(1521, __c95, 1) as any as S.Schema<DeleteBucketEncryptionResponse>,
  errors: [RequestLimitExceeded, SlowDown, NoSuchBucket, InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBucketEncryption",
  telemetry: TELEMETRY,
  span: "DeleteBucketEncryption",
}));

export type DeleteBucketIntelligentTieringConfigurationError =
  | RequestLimitExceeded
  | SlowDown
  | NoSuchBucket
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * This operation is not supported for directory buckets.
 *
 * Deletes the S3 Intelligent-Tiering configuration from the specified bucket.
 *
 * The S3 Intelligent-Tiering storage class is designed to optimize storage costs by automatically moving data to the most cost-effective storage access tier, without performance impact or operational overhead. S3 Intelligent-Tiering delivers automatic cost savings in three low latency and high throughput access tiers. To get the lowest storage cost on data that can be accessed in minutes to hours, you can choose to activate additional archiving capabilities.
 *
 * The S3 Intelligent-Tiering storage class is the ideal storage class for data with unknown, changing, or unpredictable access patterns, independent of object size or retention period. If the size of an object is less than 128 KB, it is not monitored and not eligible for auto-tiering. Smaller objects can be stored, but they are always charged at the Frequent Access tier rates in the S3 Intelligent-Tiering storage class.
 *
 * For more information, see Storage class for automatically optimizing frequently and infrequently accessed objects.
 *
 * Operations related to `DeleteBucketIntelligentTieringConfiguration` include:
 *
 * - GetBucketIntelligentTieringConfiguration
 *
 * - PutBucketIntelligentTieringConfiguration
 *
 * - ListBucketIntelligentTieringConfigurations
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const deleteBucketIntelligentTieringConfiguration: API.OperationMethod<
  DeleteBucketIntelligentTieringConfigurationRequest,
  DeleteBucketIntelligentTieringConfigurationResponse,
  DeleteBucketIntelligentTieringConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1536, __c96, 0) as any as S.Schema<DeleteBucketIntelligentTieringConfigurationRequest>,
  output: __S(
    1537,
    __c96,
    1,
  ) as any as S.Schema<DeleteBucketIntelligentTieringConfigurationResponse>,
  errors: [RequestLimitExceeded, SlowDown, NoSuchBucket, InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBucketIntelligentTieringConfiguration",
  telemetry: TELEMETRY,
  span: "DeleteBucketIntelligentTieringConfiguration",
}));

export type DeleteBucketInventoryConfigurationError =
  | RequestLimitExceeded
  | SlowDown
  | NoSuchBucket
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * Deletes an S3 Inventory configuration (identified by the inventory ID) from the bucket.
 *
 * **Directory buckets ** - For directory buckets, you must make requests for this API operation to the Regional endpoint. These endpoints support path-style requests in the format https://s3express-control.*region-code*.amazonaws.com/*bucket-name*
 * . Virtual-hosted-style requests aren't supported.
 * For more information about endpoints in Availability Zones, see Regional and Zonal endpoints for directory buckets in Availability Zones in the
 * *Amazon S3 User Guide*. For more information about endpoints in Local Zones, see Concepts for directory buckets in Local Zones in the
 * *Amazon S3 User Guide*.
 *
 * ### Permissions
 *
 * To use this operation, you must have permissions to perform the
 * `s3:PutInventoryConfiguration` action. The bucket owner has this permission by default. The
 * bucket owner can grant this permission to others. For more information about permissions, see Permissions Related to Bucket Subresource Operations and Managing Access Permissions to Your Amazon S3
 * Resources.
 *
 * - **General purpose bucket permissions** - The
 * `s3:PutInventoryConfiguration` permission is required in a policy. For more information
 * about general purpose buckets permissions, see Using Bucket Policies and User
 * Policies in the *Amazon S3 User Guide*.
 *
 * - **Directory bucket permissions** - To grant access to
 * this API operation, you must have the `s3express:PutInventoryConfiguration` permission in
 * an IAM identity-based policy instead of a bucket policy.
 * For more information about directory bucket policies and permissions, see Amazon Web Services Identity and Access Management (IAM) for S3 Express One Zone in the *Amazon S3 User Guide*.
 *
 * ### HTTP Host header syntax
 *
 * **Directory buckets ** - The HTTP Host header syntax is `s3express-control.*region-code*.amazonaws.com`.
 *
 * For information about the Amazon S3 inventory feature, see Amazon S3 Inventory.
 *
 * After deleting a configuration, Amazon S3 might still deliver one additional inventory
 * report during a brief transition period while the system processes the deletion.
 *
 * Operations related to `DeleteBucketInventoryConfiguration` include:
 *
 * - GetBucketInventoryConfiguration
 *
 * - PutBucketInventoryConfiguration
 *
 * - ListBucketInventoryConfigurations
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const deleteBucketInventoryConfiguration: API.OperationMethod<
  DeleteBucketInventoryConfigurationRequest,
  DeleteBucketInventoryConfigurationResponse,
  DeleteBucketInventoryConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1552, __c97, 0) as any as S.Schema<DeleteBucketInventoryConfigurationRequest>,
  output: __S(1553, __c97, 1) as any as S.Schema<DeleteBucketInventoryConfigurationResponse>,
  errors: [RequestLimitExceeded, SlowDown, NoSuchBucket, InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBucketInventoryConfiguration",
  telemetry: TELEMETRY,
  span: "DeleteBucketInventoryConfiguration",
}));

export type DeleteBucketLifecycleError =
  | RequestLimitExceeded
  | SlowDown
  | NoSuchBucket
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * Deletes the lifecycle configuration from the specified bucket. Amazon S3 removes all the lifecycle
 * configuration rules in the lifecycle subresource associated with the bucket. Your objects never expire,
 * and Amazon S3 no longer automatically deletes any objects on the basis of rules contained in the deleted
 * lifecycle configuration.
 *
 * ### Permissions
 *
 * - **General purpose bucket permissions** - By default, all Amazon S3
 * resources are private, including buckets, objects, and related subresources (for example,
 * lifecycle configuration and website configuration). Only the resource owner (that is, the
 * Amazon Web Services account that created it) can access the resource. The resource owner can optionally
 * grant access permissions to others by writing an access policy. For this operation, a user
 * must have the `s3:PutLifecycleConfiguration` permission.
 *
 * For more information about permissions, see Managing Access Permissions to Your
 * Amazon S3 Resources.
 *
 * - **Directory bucket permissions** - You must have the
 * `s3express:PutLifecycleConfiguration` permission in an IAM identity-based policy
 * to use this operation. Cross-account access to this API operation isn't supported. The
 * resource owner can optionally grant access permissions to others by creating a role or user
 * for them as long as they are within the same account as the owner and resource.
 *
 * For more information about directory bucket policies and permissions, see Authorizing Regional endpoint APIs with IAM in the Amazon S3 User
 * Guide.
 *
 * **Directory buckets ** - For directory buckets, you must make requests for this API operation to the Regional endpoint. These endpoints support path-style requests in the format https://s3express-control.*region-code*.amazonaws.com/*bucket-name*
 * . Virtual-hosted-style requests aren't supported.
 * For more information about endpoints in Availability Zones, see Regional and Zonal endpoints for directory buckets in Availability Zones in the
 * *Amazon S3 User Guide*. For more information about endpoints in Local Zones, see Concepts for directory buckets in Local Zones in the
 * *Amazon S3 User Guide*.
 *
 * ### HTTP Host header syntax
 *
 * **Directory buckets ** - The HTTP Host header syntax is
 * `s3express-control.*region*.amazonaws.com`.
 *
 * For more information about the object expiration, see Elements to
 * Describe Lifecycle Actions.
 *
 * Related actions include:
 *
 * - PutBucketLifecycleConfiguration
 *
 * - GetBucketLifecycleConfiguration
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const deleteBucketLifecycle: API.OperationMethod<
  DeleteBucketLifecycleRequest,
  DeleteBucketLifecycleResponse,
  DeleteBucketLifecycleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1568, __c98, 0) as any as S.Schema<DeleteBucketLifecycleRequest>,
  output: __S(1569, __c98, 1) as any as S.Schema<DeleteBucketLifecycleResponse>,
  errors: [RequestLimitExceeded, SlowDown, NoSuchBucket, InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBucketLifecycle",
  telemetry: TELEMETRY,
  span: "DeleteBucketLifecycle",
}));

export type DeleteBucketMetadataConfigurationError =
  | RequestLimitExceeded
  | SlowDown
  | NoSuchBucket
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * Deletes an S3 Metadata configuration from a general purpose bucket. For more information, see
 * Accelerating
 * data discovery with S3 Metadata in the *Amazon S3 User Guide*.
 *
 * You can use the V2 `DeleteBucketMetadataConfiguration` API operation with V1 or V2
 * metadata configurations. However, if you try to use the V1
 * `DeleteBucketMetadataTableConfiguration` API operation with V2 configurations, you
 * will receive an HTTP `405 Method Not Allowed` error.
 *
 * ### Permissions
 *
 * To use this operation, you must have the
 * `s3:DeleteBucketMetadataTableConfiguration` permission. For more information, see
 * Setting up permissions for configuring metadata tables in the
 * *Amazon S3 User Guide*.
 *
 * The IAM policy action name is the same for the V1 and V2 API operations.
 *
 * The following operations are related to `DeleteBucketMetadataConfiguration`:
 *
 * - CreateBucketMetadataConfiguration
 *
 * - GetBucketMetadataConfiguration
 *
 * - UpdateBucketMetadataInventoryTableConfiguration
 *
 * - UpdateBucketMetadataJournalTableConfiguration
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const deleteBucketMetadataConfiguration: API.OperationMethod<
  DeleteBucketMetadataConfigurationRequest,
  DeleteBucketMetadataConfigurationResponse,
  DeleteBucketMetadataConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1584, __c99, 0) as any as S.Schema<DeleteBucketMetadataConfigurationRequest>,
  output: __S(1585, __c99, 1) as any as S.Schema<DeleteBucketMetadataConfigurationResponse>,
  errors: [RequestLimitExceeded, SlowDown, NoSuchBucket, InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBucketMetadataConfiguration",
  telemetry: TELEMETRY,
  span: "DeleteBucketMetadataConfiguration",
}));

export type DeleteBucketMetadataTableConfigurationError =
  | RequestLimitExceeded
  | SlowDown
  | NoSuchBucket
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * We recommend that you delete your S3 Metadata configurations by using the V2
 * DeleteBucketMetadataTableConfiguration API operation. We no longer recommend using
 * the V1 `DeleteBucketMetadataTableConfiguration` API operation.
 *
 * If you created your S3 Metadata configuration before July 15, 2025, we recommend that you delete
 * and re-create your configuration by using CreateBucketMetadataConfiguration so that you can expire journal table records and create
 * a live inventory table.
 *
 * Deletes a V1 S3 Metadata configuration from a general purpose bucket. For more information, see
 * Accelerating
 * data discovery with S3 Metadata in the *Amazon S3 User Guide*.
 *
 * You can use the V2 `DeleteBucketMetadataConfiguration` API operation with V1 or V2
 * metadata table configurations. However, if you try to use the V1
 * `DeleteBucketMetadataTableConfiguration` API operation with V2 configurations, you
 * will receive an HTTP `405 Method Not Allowed` error.
 *
 * Make sure that you update your processes to use the new V2 API operations
 * (`CreateBucketMetadataConfiguration`, `GetBucketMetadataConfiguration`, and
 * `DeleteBucketMetadataConfiguration`) instead of the V1 API operations.
 *
 * ### Permissions
 *
 * To use this operation, you must have the
 * `s3:DeleteBucketMetadataTableConfiguration` permission. For more information, see
 * Setting up permissions for configuring metadata tables in the
 * *Amazon S3 User Guide*.
 *
 * The following operations are related to `DeleteBucketMetadataTableConfiguration`:
 *
 * - CreateBucketMetadataTableConfiguration
 *
 * - GetBucketMetadataTableConfiguration
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const deleteBucketMetadataTableConfiguration: API.OperationMethod<
  DeleteBucketMetadataTableConfigurationRequest,
  DeleteBucketMetadataTableConfigurationResponse,
  DeleteBucketMetadataTableConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1600, __c100, 0) as any as S.Schema<DeleteBucketMetadataTableConfigurationRequest>,
  output: __S(1601, __c100, 1) as any as S.Schema<DeleteBucketMetadataTableConfigurationResponse>,
  errors: [RequestLimitExceeded, SlowDown, NoSuchBucket, InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBucketMetadataTableConfiguration",
  telemetry: TELEMETRY,
  span: "DeleteBucketMetadataTableConfiguration",
}));

export type DeleteBucketMetricsConfigurationError =
  | RequestLimitExceeded
  | SlowDown
  | NoSuchBucket
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * Deletes a metrics configuration for the Amazon CloudWatch request metrics (specified by the metrics
 * configuration ID) from the bucket. Note that this doesn't include the daily storage metrics.
 *
 * **Directory buckets ** - For directory buckets, you must make requests for this API operation to the Regional endpoint. These endpoints support path-style requests in the format https://s3express-control.*region-code*.amazonaws.com/*bucket-name*
 * . Virtual-hosted-style requests aren't supported.
 * For more information about endpoints in Availability Zones, see Regional and Zonal endpoints for directory buckets in Availability Zones in the
 * *Amazon S3 User Guide*. For more information about endpoints in Local Zones, see Concepts for directory buckets in Local Zones in the
 * *Amazon S3 User Guide*.
 *
 * ### Permissions
 *
 * To use this operation, you must have permissions to perform the
 * `s3:PutMetricsConfiguration` action. The bucket owner has this permission by default. The
 * bucket owner can grant this permission to others. For more information about permissions, see Permissions Related to Bucket Subresource Operations and Managing Access Permissions to Your Amazon S3
 * Resources.
 *
 * - **General purpose bucket permissions** - The
 * `s3:PutMetricsConfiguration` permission is required in a policy. For more information
 * about general purpose buckets permissions, see Using Bucket Policies and User
 * Policies in the *Amazon S3 User Guide*.
 *
 * - **Directory bucket permissions** - To grant access to
 * this API operation, you must have the `s3express:PutMetricsConfiguration` permission in
 * an IAM identity-based policy instead of a bucket policy. Cross-account access to this API operation isn't supported. This operation can only be performed by the Amazon Web Services account that owns the resource.
 * For more information about directory bucket policies and permissions, see Amazon Web Services Identity and Access Management (IAM) for S3 Express One Zone in the *Amazon S3 User Guide*.
 *
 * ### HTTP Host header syntax
 *
 * **Directory buckets ** - The HTTP Host header syntax is `s3express-control.*region-code*.amazonaws.com`.
 *
 * For information about CloudWatch request metrics for Amazon S3, see Monitoring Metrics with Amazon CloudWatch.
 *
 * The following operations are related to `DeleteBucketMetricsConfiguration`:
 *
 * - GetBucketMetricsConfiguration
 *
 * - PutBucketMetricsConfiguration
 *
 * - ListBucketMetricsConfigurations
 *
 * - Monitoring
 * Metrics with Amazon CloudWatch
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const deleteBucketMetricsConfiguration: API.OperationMethod<
  DeleteBucketMetricsConfigurationRequest,
  DeleteBucketMetricsConfigurationResponse,
  DeleteBucketMetricsConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1616, __c101, 0) as any as S.Schema<DeleteBucketMetricsConfigurationRequest>,
  output: __S(1617, __c101, 1) as any as S.Schema<DeleteBucketMetricsConfigurationResponse>,
  errors: [RequestLimitExceeded, SlowDown, NoSuchBucket, InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBucketMetricsConfiguration",
  telemetry: TELEMETRY,
  span: "DeleteBucketMetricsConfiguration",
}));

export type DeleteBucketOwnershipControlsError =
  | RequestLimitExceeded
  | SlowDown
  | NoSuchBucket
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * This operation is not supported for directory buckets.
 *
 * Removes `OwnershipControls` for an Amazon S3 bucket. To use this operation, you must have the
 * `s3:PutBucketOwnershipControls` permission. For more information about Amazon S3 permissions,
 * see Specifying
 * Permissions in a Policy.
 *
 * For information about Amazon S3 Object Ownership, see Using Object Ownership.
 *
 * The following operations are related to `DeleteBucketOwnershipControls`:
 *
 * - GetBucketOwnershipControls
 *
 * - PutBucketOwnershipControls
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const deleteBucketOwnershipControls: API.OperationMethod<
  DeleteBucketOwnershipControlsRequest,
  DeleteBucketOwnershipControlsResponse,
  DeleteBucketOwnershipControlsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1632, __c102, 0) as any as S.Schema<DeleteBucketOwnershipControlsRequest>,
  output: __S(1633, __c102, 1) as any as S.Schema<DeleteBucketOwnershipControlsResponse>,
  errors: [RequestLimitExceeded, SlowDown, NoSuchBucket, InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBucketOwnershipControls",
  telemetry: TELEMETRY,
  span: "DeleteBucketOwnershipControls",
}));

export type DeleteBucketPolicyError =
  | RequestLimitExceeded
  | SlowDown
  | NoSuchBucket
  | PermanentRedirect
  | SignatureDoesNotMatch
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * Deletes the policy of a specified bucket.
 *
 * **Directory buckets ** - For directory buckets, you must make requests for this API operation to the Regional endpoint. These endpoints support path-style requests in the format https://s3express-control.*region-code*.amazonaws.com/*bucket-name*
 * . Virtual-hosted-style requests aren't supported.
 * For more information about endpoints in Availability Zones, see Regional and Zonal endpoints for directory buckets in Availability Zones in the
 * *Amazon S3 User Guide*. For more information about endpoints in Local Zones, see Concepts for directory buckets in Local Zones in the
 * *Amazon S3 User Guide*.
 *
 * ### Permissions
 *
 * If you are using an identity other than the root user of the Amazon Web Services account that owns the
 * bucket, the calling identity must both have the `DeleteBucketPolicy` permissions on the
 * specified bucket and belong to the bucket owner's account in order to use this operation.
 *
 * If you don't have `DeleteBucketPolicy` permissions, Amazon S3 returns a 403 Access
 * Denied error. If you have the correct permissions, but you're not using an identity that
 * belongs to the bucket owner's account, Amazon S3 returns a `405 Method Not Allowed`
 * error.
 *
 * To ensure that bucket owners don't inadvertently lock themselves out of their own buckets,
 * the root principal in a bucket owner's Amazon Web Services account can perform the
 * `GetBucketPolicy`, `PutBucketPolicy`, and
 * `DeleteBucketPolicy` API actions, even if their bucket policy explicitly denies the
 * root principal's access. Bucket owner root principals can only be blocked from performing these
 * API actions by VPC endpoint policies and Amazon Web Services Organizations policies.
 *
 * - **General purpose bucket permissions** - The
 * `s3:DeleteBucketPolicy` permission is required in a policy. For more information
 * about general purpose buckets bucket policies, see Using Bucket Policies and User
 * Policies in the *Amazon S3 User Guide*.
 *
 * - **Directory bucket permissions** - To grant access to
 * this API operation, you must have the `s3express:DeleteBucketPolicy` permission in
 * an IAM identity-based policy instead of a bucket policy. Cross-account access to this API operation isn't supported. This operation can only be performed by the Amazon Web Services account that owns the resource.
 * For more information about directory bucket policies and permissions, see Amazon Web Services Identity and Access Management (IAM) for S3 Express One Zone in the *Amazon S3 User Guide*.
 *
 * ### HTTP Host header syntax
 *
 * **Directory buckets ** - The HTTP Host header syntax is `s3express-control.*region-code*.amazonaws.com`.
 *
 * The following operations are related to `DeleteBucketPolicy`
 *
 * - CreateBucket
 *
 * - DeleteObject
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const deleteBucketPolicy: API.OperationMethod<
  DeleteBucketPolicyRequest,
  DeleteBucketPolicyResponse,
  DeleteBucketPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1648, __c103, 0) as any as S.Schema<DeleteBucketPolicyRequest>,
  output: __S(1649, __c103, 1) as any as S.Schema<DeleteBucketPolicyResponse>,
  errors: [
    RequestLimitExceeded,
    SlowDown,
    NoSuchBucket,
    PermanentRedirect,
    SignatureDoesNotMatch,
    InvalidAccessKeyId,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBucketPolicy",
  telemetry: TELEMETRY,
  span: "DeleteBucketPolicy",
}));

export type DeleteBucketReplicationError =
  | RequestLimitExceeded
  | SlowDown
  | NoSuchBucket
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * This operation is not supported for directory buckets.
 *
 * Deletes the replication configuration from the bucket.
 *
 * To use this operation, you must have permissions to perform the
 * `s3:PutReplicationConfiguration` action. The bucket owner has these permissions by default
 * and can grant it to others. For more information about permissions, see Permissions Related to Bucket Subresource Operations and Managing Access Permissions to Your Amazon S3
 * Resources.
 *
 * It can take a while for the deletion of a replication configuration to fully propagate.
 *
 * For information about replication configuration, see Replication in the
 * *Amazon S3 User Guide*.
 *
 * The following operations are related to `DeleteBucketReplication`:
 *
 * - PutBucketReplication
 *
 * - GetBucketReplication
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const deleteBucketReplication: API.OperationMethod<
  DeleteBucketReplicationRequest,
  DeleteBucketReplicationResponse,
  DeleteBucketReplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1664, __c104, 0) as any as S.Schema<DeleteBucketReplicationRequest>,
  output: __S(1665, __c104, 1) as any as S.Schema<DeleteBucketReplicationResponse>,
  errors: [RequestLimitExceeded, SlowDown, NoSuchBucket, InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBucketReplication",
  telemetry: TELEMETRY,
  span: "DeleteBucketReplication",
}));

export type DeleteBucketTaggingError =
  | RequestLimitExceeded
  | SlowDown
  | NoSuchBucket
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * This operation is not supported for directory buckets.
 *
 * Deletes tags from the general purpose bucket if attribute based access control (ABAC) is not enabled for the bucket. When you enable ABAC for a general purpose bucket, you can no longer use this operation for that bucket and must use UntagResource instead.
 *
 * To use this operation, you must have permission to perform the `s3:PutBucketTagging`
 * action. By default, the bucket owner has this permission and can grant this permission to others.
 *
 * The following operations are related to `DeleteBucketTagging`:
 *
 * - GetBucketTagging
 *
 * - PutBucketTagging
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const deleteBucketTagging: API.OperationMethod<
  DeleteBucketTaggingRequest,
  DeleteBucketTaggingResponse,
  DeleteBucketTaggingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1680, __c105, 0) as any as S.Schema<DeleteBucketTaggingRequest>,
  output: __S(1681, __c105, 1) as any as S.Schema<DeleteBucketTaggingResponse>,
  errors: [RequestLimitExceeded, SlowDown, NoSuchBucket, InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBucketTagging",
  telemetry: TELEMETRY,
  span: "DeleteBucketTagging",
}));

export type DeleteBucketWebsiteError =
  | RequestLimitExceeded
  | SlowDown
  | NoSuchBucket
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * This operation is not supported for directory buckets.
 *
 * This action removes the website configuration for a bucket. Amazon S3 returns a `200 OK`
 * response upon successfully deleting a website configuration on the specified bucket. You will get a
 * `200 OK` response if the website configuration you are trying to delete does not exist on
 * the bucket. Amazon S3 returns a `404` response if the bucket specified in the request does not
 * exist.
 *
 * This DELETE action requires the `S3:DeleteBucketWebsite` permission. By default, only the
 * bucket owner can delete the website configuration attached to a bucket. However, bucket owners can grant
 * other users permission to delete the website configuration by writing a bucket policy granting them the
 * `S3:DeleteBucketWebsite` permission.
 *
 * For more information about hosting websites, see Hosting Websites on Amazon S3.
 *
 * The following operations are related to `DeleteBucketWebsite`:
 *
 * - GetBucketWebsite
 *
 * - PutBucketWebsite
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const deleteBucketWebsite: API.OperationMethod<
  DeleteBucketWebsiteRequest,
  DeleteBucketWebsiteResponse,
  DeleteBucketWebsiteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1696, __c106, 0) as any as S.Schema<DeleteBucketWebsiteRequest>,
  output: __S(1697, __c106, 1) as any as S.Schema<DeleteBucketWebsiteResponse>,
  errors: [RequestLimitExceeded, SlowDown, NoSuchBucket, InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBucketWebsite",
  telemetry: TELEMETRY,
  span: "DeleteBucketWebsite",
}));

export type DeleteObjectError =
  | RequestLimitExceeded
  | SlowDown
  | NoSuchBucket
  | NoSuchKey
  | PermanentRedirect
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * Removes an object from a bucket. The behavior depends on the bucket's versioning state:
 *
 * - If bucket versioning is not enabled, the operation permanently deletes the object.
 *
 * - If bucket versioning is enabled, the operation inserts a delete marker, which becomes the
 * current version of the object. To permanently delete an object in a versioned bucket, you must
 * include the object's `versionId` in the request. For more information about
 * versioning-enabled buckets, see Deleting object versions from a
 * versioning-enabled bucket.
 *
 * - If bucket versioning is suspended, the operation removes the object that has a null
 * `versionId`, if there is one, and inserts a delete marker that becomes the current
 * version of the object. If there isn't an object with a null `versionId`, and all versions
 * of the object have a `versionId`, Amazon S3 does not remove the object and only inserts a
 * delete marker. To permanently delete an object that has a `versionId`, you must include
 * the object's `versionId` in the request. For more information about versioning-suspended
 * buckets, see Deleting
 * objects from versioning-suspended buckets.
 *
 * - **Directory buckets** - S3 Versioning isn't enabled and supported for directory buckets. For this API operation, only the `null` value of the version ID is supported by directory buckets.
 * You can only specify `null` to the `versionId` query parameter in the
 * request.
 *
 * - **Directory buckets** - For directory buckets, you must make requests for this API operation to the Zonal endpoint. These endpoints support virtual-hosted-style requests in the format https://*amzn-s3-demo-bucket*.s3express-*zone-id*.*region-code*.amazonaws.com/*key-name*
 * . Path-style requests are not supported. For more information about endpoints in Availability Zones, see Regional and Zonal endpoints for directory buckets in Availability Zones in the
 * *Amazon S3 User Guide*. For more information about endpoints in Local Zones, see Concepts for directory buckets in Local Zones in the
 * *Amazon S3 User Guide*.
 *
 * To remove a specific version, you must use the `versionId` query parameter. Using this
 * query parameter permanently deletes the version. If the object deleted is a delete marker, Amazon S3 sets the
 * response header `x-amz-delete-marker` to true.
 *
 * If the object you want to delete is in a bucket where the bucket versioning configuration is MFA
 * Delete enabled, you must include the `x-amz-mfa` request header in the DELETE
 * `versionId` request. Requests that include `x-amz-mfa` must use HTTPS. For more
 * information about MFA Delete, see Using MFA Delete in the Amazon S3 User
 * Guide. To see sample requests that use versioning, see Sample Request.
 *
 * **Directory buckets** - MFA delete is not supported by directory buckets.
 *
 * You can delete objects by explicitly calling DELETE Object or calling (PutBucketLifecycle) to enable Amazon S3 to
 * remove them for you. If you want to block users or accounts from removing or deleting objects from your
 * bucket, you must deny them the `s3:DeleteObject`, `s3:DeleteObjectVersion`, and
 * `s3:PutLifeCycleConfiguration` actions.
 *
 * **Directory buckets** -
 * S3 Lifecycle is not supported by directory buckets.
 *
 * ### Permissions
 *
 * - **General purpose bucket permissions** - The following
 * permissions are required in your policies when your `DeleteObjects` request
 * includes specific headers.
 *
 * -
 * `s3:DeleteObject`
 * - To
 * delete an object from a bucket, you must always have the
 * `s3:DeleteObject` permission.
 *
 * -
 * `s3:DeleteObjectVersion`
 * - To delete a specific version of an object from a versioning-enabled
 * bucket, you must have the `s3:DeleteObjectVersion` permission.
 *
 * If the `s3:DeleteObject` or `s3:DeleteObjectVersion` permissions are explicitly
 * denied in your bucket policy, attempts to delete any unversioned objects
 * result in a `403 Access Denied` error.
 *
 * - **Directory bucket permissions** - To grant access to this API operation on a directory bucket, we recommend that you use the
 * `CreateSession`
 * API operation for session-based authorization. Specifically, you grant the `s3express:CreateSession` permission to the directory bucket in a bucket policy or an IAM identity-based policy. Then, you make the `CreateSession` API call on the bucket to obtain a session token. With the session token in your request header, you can make API requests to this operation. After the session token expires, you make another `CreateSession` API call to generate a new session token for use.
 * Amazon Web Services CLI or SDKs create session and refresh the session token automatically to avoid service interruptions when a session expires. For more information about authorization, see
 * `CreateSession`
 * .
 *
 * ### HTTP Host header syntax
 *
 * **Directory buckets ** - The HTTP Host header syntax is
 * *Bucket-name*.s3express-*zone-id*.*region-code*.amazonaws.com.
 *
 * The following action is related to `DeleteObject`:
 *
 * - PutObject
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 *
 * The `If-Match` header is supported for both general purpose and directory buckets. `IfMatchLastModifiedTime` and `IfMatchSize` is only supported for directory buckets.
 */
export const deleteObject: API.OperationMethod<
  DeleteObjectRequest,
  DeleteObjectOutput,
  DeleteObjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1712, __c107, 0) as any as S.Schema<DeleteObjectRequest>,
  output: __S(1713, __c107, 1) as any as S.Schema<DeleteObjectOutput>,
  errors: [
    RequestLimitExceeded,
    SlowDown,
    NoSuchBucket,
    NoSuchKey,
    PermanentRedirect,
    InvalidAccessKeyId,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteObject",
  telemetry: TELEMETRY,
  span: "DeleteObject",
}));

export type DeleteObjectAnnotationError =
  | NoSuchBucket
  | NoSuchKey
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * Deletes a specific annotation from an Amazon S3 object. Use the `x-amz-object-if-match`
 * header to perform a conditional delete that only succeeds if the object's ETag matches the
 * provided value, preventing race conditions during concurrent updates.
 *
 * Deleting an annotation is permanent. Annotations are not independently versioned, so there is no
 * delete marker or way to recover a deleted annotation.
 *
 * To use this operation, you must have the `s3:DeleteObjectAnnotation` permission. If
 * the object is protected by Object Lock in governance mode, you must also include the
 * `x-amz-bypass-governance-retention` header.
 *
 * Annotations are not supported by the following features: S3 Inventory Reports,
 * API Gateway, S3 Storage Lens, Amazon S3 File Gateway, Amazon FSx, S3 on Outposts, and
 * S3 Express One Zone (directory buckets).
 *
 * The following operations are related to `DeleteObjectAnnotation`:
 *
 * - PutObjectAnnotation
 *
 * - GetObjectAnnotation
 *
 * - ListObjectAnnotations
 */
export const deleteObjectAnnotation: API.OperationMethod<
  DeleteObjectAnnotationRequest,
  DeleteObjectAnnotationOutput,
  DeleteObjectAnnotationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1728, __c108, 0) as any as S.Schema<DeleteObjectAnnotationRequest>,
  output: __S(1729, __c108, 1) as any as S.Schema<DeleteObjectAnnotationOutput>,
  errors: [NoSuchBucket, NoSuchKey, InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteObjectAnnotation",
  telemetry: TELEMETRY,
  span: "DeleteObjectAnnotation",
}));

export type DeleteObjectsError =
  | RequestLimitExceeded
  | SlowDown
  | NoSuchBucket
  | PermanentRedirect
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * This operation enables you to delete multiple objects from a bucket using a single HTTP request. If
 * you know the object keys that you want to delete, then this operation provides a suitable alternative to
 * sending individual delete requests, reducing per-request overhead.
 *
 * The request can contain a list of up to 1,000 keys that you want to delete. In the XML, you provide
 * the object key names, and optionally, version IDs if you want to delete a specific version of the object
 * from a versioning-enabled bucket. For each key, Amazon S3 performs a delete operation and returns the result
 * of that delete, success or failure, in the response. If the object specified in the request isn't found,
 * Amazon S3 confirms the deletion by returning the result as deleted.
 *
 * - **Directory buckets** -
 * S3 Versioning isn't enabled and supported for directory buckets.
 *
 * - **Directory buckets** - For directory buckets, you must make requests for this API operation to the Zonal endpoint. These endpoints support virtual-hosted-style requests in the format https://*amzn-s3-demo-bucket*.s3express-*zone-id*.*region-code*.amazonaws.com/*key-name*
 * . Path-style requests are not supported. For more information about endpoints in Availability Zones, see Regional and Zonal endpoints for directory buckets in Availability Zones in the
 * *Amazon S3 User Guide*. For more information about endpoints in Local Zones, see Concepts for directory buckets in Local Zones in the
 * *Amazon S3 User Guide*.
 *
 * The operation supports two modes for the response: verbose and quiet. By default, the operation uses
 * verbose mode in which the response includes the result of deletion of each key in your request. In quiet
 * mode the response includes only keys where the delete operation encountered an error. For a successful
 * deletion in a quiet mode, the operation does not return any information about the delete in the response
 * body.
 *
 * When performing this action on an MFA Delete enabled bucket, that attempts to delete any versioned
 * objects, you must include an MFA token. If you do not provide one, the entire request will fail, even if
 * there are non-versioned objects you are trying to delete. If you provide an invalid token, whether there
 * are versioned keys in the request or not, the entire Multi-Object Delete request will fail. For
 * information about MFA Delete, see MFA Delete in the
 * *Amazon S3 User Guide*.
 *
 * **Directory buckets** - MFA delete is not supported by directory buckets.
 *
 * ### Permissions
 *
 * - **General purpose bucket permissions** - The following
 * permissions are required in your policies when your `DeleteObjects` request
 * includes specific headers.
 *
 * -
 * `s3:DeleteObject`
 * - To delete an
 * object from a bucket, you must always specify the `s3:DeleteObject`
 * permission.
 *
 * -
 * `s3:DeleteObjectVersion`
 * - To delete a specific version of an object from a versioning-enabled
 * bucket, you must specify the `s3:DeleteObjectVersion` permission.
 *
 * If the `s3:DeleteObject` or `s3:DeleteObjectVersion` permissions are explicitly
 * denied in your bucket policy, attempts to delete any unversioned objects
 * result in a `403 Access Denied` error.
 *
 * - **Directory bucket permissions** - To grant access to this API operation on a directory bucket, we recommend that you use the
 * `CreateSession`
 * API operation for session-based authorization. Specifically, you grant the `s3express:CreateSession` permission to the directory bucket in a bucket policy or an IAM identity-based policy. Then, you make the `CreateSession` API call on the bucket to obtain a session token. With the session token in your request header, you can make API requests to this operation. After the session token expires, you make another `CreateSession` API call to generate a new session token for use.
 * Amazon Web Services CLI or SDKs create session and refresh the session token automatically to avoid service interruptions when a session expires. For more information about authorization, see
 * `CreateSession`
 * .
 *
 * ### Content-MD5 request header
 *
 * - **General purpose bucket** - The Content-MD5 request header
 * is required for all Multi-Object Delete requests. Amazon S3 uses the header value to ensure that
 * your request body has not been altered in transit.
 *
 * - **Directory bucket** - The Content-MD5 request header
 * or a additional checksum request header (including `x-amz-checksum-crc32`,
 * `x-amz-checksum-crc32c`, `x-amz-checksum-sha1`, or
 * `x-amz-checksum-sha256`) is required for all Multi-Object Delete requests.
 *
 * ### HTTP Host header syntax
 *
 * **Directory buckets ** - The HTTP Host header syntax is
 * *Bucket-name*.s3express-*zone-id*.*region-code*.amazonaws.com.
 *
 * The following operations are related to `DeleteObjects`:
 *
 * - CreateMultipartUpload
 *
 * - UploadPart
 *
 * - CompleteMultipartUpload
 *
 * - ListParts
 *
 * - AbortMultipartUpload
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const deleteObjects: API.OperationMethod<
  DeleteObjectsRequest,
  DeleteObjectsOutput,
  DeleteObjectsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1747, __c109, 3) as any as S.Schema<DeleteObjectsRequest>,
  output: __S(1752, __c109, 8) as any as S.Schema<DeleteObjectsOutput>,
  errors: [RequestLimitExceeded, SlowDown, NoSuchBucket, PermanentRedirect, InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteObjects",
  telemetry: TELEMETRY,
  span: "DeleteObjects",
}));

export type DeleteObjectTaggingError =
  | RequestLimitExceeded
  | SlowDown
  | NoSuchKey
  | PermanentRedirect
  | NoSuchVersion
  | MethodNotAllowed
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * This operation is not supported for directory buckets.
 *
 * Removes the entire tag set from the specified object. For more information about managing object
 * tags, see Object
 * Tagging.
 *
 * To use this operation, you must have permission to perform the `s3:DeleteObjectTagging`
 * action.
 *
 * To delete tags of a specific object version, add the `versionId` query parameter in the
 * request. You will need permission for the `s3:DeleteObjectVersionTagging` action.
 *
 * The following operations are related to `DeleteObjectTagging`:
 *
 * - PutObjectTagging
 *
 * - GetObjectTagging
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const deleteObjectTagging: API.OperationMethod<
  DeleteObjectTaggingRequest,
  DeleteObjectTaggingOutput,
  DeleteObjectTaggingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1760, __c110, 0) as any as S.Schema<DeleteObjectTaggingRequest>,
  output: __S(1761, __c110, 1) as any as S.Schema<DeleteObjectTaggingOutput>,
  errors: [
    RequestLimitExceeded,
    SlowDown,
    NoSuchKey,
    PermanentRedirect,
    NoSuchVersion,
    MethodNotAllowed,
    InvalidAccessKeyId,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteObjectTagging",
  telemetry: TELEMETRY,
  span: "DeleteObjectTagging",
}));

export type DeletePublicAccessBlockError =
  | RequestLimitExceeded
  | SlowDown
  | NoSuchBucket
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * This operation is not supported for directory buckets.
 *
 * Removes the `PublicAccessBlock` configuration for an Amazon S3 bucket. This
 * operation removes the bucket-level configuration only. The effective public access behavior
 * will still be governed by account-level settings (which may inherit from organization-level
 * policies). To use this operation, you must have the `s3:PutBucketPublicAccessBlock`
 * permission. For more information about permissions, see Permissions Related to Bucket Subresource Operations and Managing Access
 * Permissions to Your Amazon S3 Resources.
 *
 * The following operations are related to `DeletePublicAccessBlock`:
 *
 * - Using
 * Amazon S3 Block Public Access
 *
 * - GetPublicAccessBlock
 *
 * - PutPublicAccessBlock
 *
 * - GetBucketPolicyStatus
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const deletePublicAccessBlock: API.OperationMethod<
  DeletePublicAccessBlockRequest,
  DeletePublicAccessBlockResponse,
  DeletePublicAccessBlockError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1776, __c111, 0) as any as S.Schema<DeletePublicAccessBlockRequest>,
  output: __S(1777, __c111, 1) as any as S.Schema<DeletePublicAccessBlockResponse>,
  errors: [RequestLimitExceeded, SlowDown, NoSuchBucket, InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePublicAccessBlock",
  telemetry: TELEMETRY,
  span: "DeletePublicAccessBlock",
}));

export type GetBucketAbacError =
  | RequestLimitExceeded
  | SlowDown
  | NoSuchBucket
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * Returns the attribute-based access control (ABAC) property of the general purpose bucket. If ABAC is enabled on your bucket, you can use tags on the bucket for access control. For more information, see Enabling ABAC in general purpose buckets.
 */
export const getBucketAbac: API.OperationMethod<
  GetBucketAbacRequest,
  GetBucketAbacOutput,
  GetBucketAbacError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1792, __c112, 0) as any as S.Schema<GetBucketAbacRequest>,
  output: __S(1793, __c112, 1) as any as S.Schema<GetBucketAbacOutput>,
  errors: [RequestLimitExceeded, SlowDown, NoSuchBucket, InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBucketAbac",
  telemetry: TELEMETRY,
  span: "GetBucketAbac",
}));

export type GetBucketAccelerateConfigurationError =
  | RequestLimitExceeded
  | SlowDown
  | NoSuchBucket
  | PermanentRedirect
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * This operation is not supported for directory buckets.
 *
 * This implementation of the GET action uses the `accelerate` subresource to return the
 * Transfer Acceleration state of a bucket, which is either `Enabled` or `Suspended`.
 * Amazon S3 Transfer Acceleration is a bucket-level feature that enables you to perform faster data transfers
 * to and from Amazon S3.
 *
 * To use this operation, you must have permission to perform the
 * `s3:GetAccelerateConfiguration` action. The bucket owner has this permission by default.
 * The bucket owner can grant this permission to others. For more information about permissions, see Permissions Related to Bucket Subresource Operations and Managing Access Permissions to your Amazon S3
 * Resources in the *Amazon S3 User Guide*.
 *
 * You set the Transfer Acceleration state of an existing bucket to `Enabled` or
 * `Suspended` by using the PutBucketAccelerateConfiguration operation.
 *
 * A GET `accelerate` request does not return a state value for a bucket that has no
 * transfer acceleration state. A bucket has no Transfer Acceleration state if a state has never been set
 * on the bucket.
 *
 * For more information about transfer acceleration, see Transfer Acceleration in the
 * Amazon S3 User Guide.
 *
 * The following operations are related to `GetBucketAccelerateConfiguration`:
 *
 * - PutBucketAccelerateConfiguration
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const getBucketAccelerateConfiguration: API.OperationMethod<
  GetBucketAccelerateConfigurationRequest,
  GetBucketAccelerateConfigurationOutput,
  GetBucketAccelerateConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1824, __c114, 0) as any as S.Schema<GetBucketAccelerateConfigurationRequest>,
  output: __S(1825, __c114, 1) as any as S.Schema<GetBucketAccelerateConfigurationOutput>,
  errors: [RequestLimitExceeded, SlowDown, NoSuchBucket, PermanentRedirect, InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBucketAccelerateConfiguration",
  telemetry: TELEMETRY,
  span: "GetBucketAccelerateConfiguration",
}));

export type GetBucketAclError =
  | RequestLimitExceeded
  | SlowDown
  | NoSuchBucket
  | PermanentRedirect
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * This operation is not supported for directory buckets.
 *
 * This implementation of the `GET` action uses the `acl` subresource to return
 * the access control list (ACL) of a bucket. To use `GET` to return the ACL of the bucket, you
 * must have the `READ_ACP` access to the bucket. If `READ_ACP` permission is granted
 * to the anonymous user, you can return the ACL of the bucket without using an authorization
 * header.
 *
 * When you use this API operation with an access point, provide the alias of the access point in place of the bucket name.
 *
 * When you use this API operation with an Object Lambda access point, provide the alias of the Object Lambda access point in place of the bucket name.
 * If the Object Lambda access point alias in a request is not valid, the error code `InvalidAccessPointAliasError` is returned.
 * For more information about `InvalidAccessPointAliasError`, see List of
 * Error Codes.
 *
 * If your bucket uses the bucket owner enforced setting for S3 Object Ownership, requests to read
 * ACLs are still supported and return the `bucket-owner-full-control` ACL with the owner
 * being the account that created the bucket. For more information, see Controlling object ownership and
 * disabling ACLs in the *Amazon S3 User Guide*.
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 *
 * The following operations are related to `GetBucketAcl`:
 *
 * - ListObjects
 */
export const getBucketAcl: API.OperationMethod<
  GetBucketAclRequest,
  GetBucketAclOutput,
  GetBucketAclError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1840, __c115, 0) as any as S.Schema<GetBucketAclRequest>,
  output: __S(1841, __c115, 1) as any as S.Schema<GetBucketAclOutput>,
  errors: [RequestLimitExceeded, SlowDown, NoSuchBucket, PermanentRedirect, InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBucketAcl",
  telemetry: TELEMETRY,
  span: "GetBucketAcl",
}));

export type GetBucketAnalyticsConfigurationError =
  | RequestLimitExceeded
  | SlowDown
  | NoSuchBucket
  | NoSuchConfiguration
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * This operation is not supported for directory buckets.
 *
 * This implementation of the GET action returns an analytics configuration (identified by the
 * analytics configuration ID) from the bucket.
 *
 * To use this operation, you must have permissions to perform the
 * `s3:GetAnalyticsConfiguration` action. The bucket owner has this permission by default. The
 * bucket owner can grant this permission to others. For more information about permissions, see Permissions Related to Bucket Subresource Operations and Managing Access Permissions to Your Amazon S3
 * Resources in the *Amazon S3 User Guide*.
 *
 * For information about Amazon S3 analytics feature, see Amazon S3 Analytics - Storage Class Analysis
 * in the *Amazon S3 User Guide*.
 *
 * The following operations are related to `GetBucketAnalyticsConfiguration`:
 *
 * - DeleteBucketAnalyticsConfiguration
 *
 * - ListBucketAnalyticsConfigurations
 *
 * - PutBucketAnalyticsConfiguration
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const getBucketAnalyticsConfiguration: API.OperationMethod<
  GetBucketAnalyticsConfigurationRequest,
  GetBucketAnalyticsConfigurationOutput,
  GetBucketAnalyticsConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1904, __c119, 0) as any as S.Schema<GetBucketAnalyticsConfigurationRequest>,
  output: __S(1905, __c119, 1) as any as S.Schema<GetBucketAnalyticsConfigurationOutput>,
  errors: [RequestLimitExceeded, SlowDown, NoSuchBucket, NoSuchConfiguration, InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBucketAnalyticsConfiguration",
  telemetry: TELEMETRY,
  span: "GetBucketAnalyticsConfiguration",
}));

export type GetBucketCorsError =
  | RequestLimitExceeded
  | SlowDown
  | NoSuchBucket
  | NoSuchCORSConfiguration
  | PermanentRedirect
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * This operation is not supported for directory buckets.
 *
 * Returns the Cross-Origin Resource Sharing (CORS) configuration information set for the
 * bucket.
 *
 * To use this operation, you must have permission to perform the `s3:GetBucketCORS`
 * action. By default, the bucket owner has this permission and can grant it to others.
 *
 * When you use this API operation with an access point, provide the alias of the access point in place of the bucket name.
 *
 * When you use this API operation with an Object Lambda access point, provide the alias of the Object Lambda access point in place of the bucket name.
 * If the Object Lambda access point alias in a request is not valid, the error code `InvalidAccessPointAliasError` is returned.
 * For more information about `InvalidAccessPointAliasError`, see List of
 * Error Codes.
 *
 * For more information about CORS, see Enabling Cross-Origin Resource Sharing.
 *
 * The following operations are related to `GetBucketCors`:
 *
 * - PutBucketCors
 *
 * - DeleteBucketCors
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const getBucketCors: API.OperationMethod<
  GetBucketCorsRequest,
  GetBucketCorsOutput,
  GetBucketCorsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1936, __c121, 0) as any as S.Schema<GetBucketCorsRequest>,
  output: __S(1937, __c121, 1) as any as S.Schema<GetBucketCorsOutput>,
  errors: [
    RequestLimitExceeded,
    SlowDown,
    NoSuchBucket,
    NoSuchCORSConfiguration,
    PermanentRedirect,
    InvalidAccessKeyId,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBucketCors",
  telemetry: TELEMETRY,
  span: "GetBucketCors",
}));

export type GetBucketEncryptionError =
  | RequestLimitExceeded
  | SlowDown
  | NoSuchBucket
  | ParseError
  | PermanentRedirect
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * Returns the default encryption configuration for an Amazon S3 bucket. By default, all buckets have a
 * default encryption configuration that uses server-side encryption with Amazon S3 managed keys (SSE-S3). This operation also returns the BucketKeyEnabled and BlockedEncryptionTypes statuses.
 *
 * - **General purpose buckets** - For information about the bucket
 * default encryption feature, see Amazon S3 Bucket Default Encryption in the
 * *Amazon S3 User Guide*.
 *
 * - **Directory buckets** -
 * For directory buckets, there are only two supported options for server-side encryption: SSE-S3 and SSE-KMS. For information about the default encryption configuration in
 * directory buckets, see Setting default server-side
 * encryption behavior for directory buckets.
 *
 * ### Permissions
 *
 * - **General purpose bucket permissions** - The
 * `s3:GetEncryptionConfiguration` permission is required in a policy. The bucket
 * owner has this permission by default. The bucket owner can grant this permission to others.
 * For more information about permissions, see Permissions Related to Bucket Operations and Managing Access Permissions to Your
 * Amazon S3 Resources.
 *
 * - **Directory bucket permissions** - To grant access to
 * this API operation, you must have the `s3express:GetEncryptionConfiguration`
 * permission in an IAM identity-based policy instead of a bucket policy. Cross-account access to this API operation isn't supported. This operation can only be performed by the Amazon Web Services account that owns the resource.
 * For more information about directory bucket policies and permissions, see Amazon Web Services Identity and Access Management (IAM) for S3 Express One Zone in the *Amazon S3 User Guide*.
 *
 * ### HTTP Host header syntax
 *
 * **Directory buckets ** - The HTTP Host header syntax is `s3express-control.*region-code*.amazonaws.com`.
 *
 * The following operations are related to `GetBucketEncryption`:
 *
 * - PutBucketEncryption
 *
 * - DeleteBucketEncryption
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const getBucketEncryption: API.OperationMethod<
  GetBucketEncryptionRequest,
  GetBucketEncryptionOutput,
  GetBucketEncryptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1968, __c123, 0) as any as S.Schema<GetBucketEncryptionRequest>,
  output: __S(1969, __c123, 1) as any as S.Schema<GetBucketEncryptionOutput>,
  errors: [
    RequestLimitExceeded,
    SlowDown,
    NoSuchBucket,
    ParseError,
    PermanentRedirect,
    InvalidAccessKeyId,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBucketEncryption",
  telemetry: TELEMETRY,
  span: "GetBucketEncryption",
}));

export type GetBucketIntelligentTieringConfigurationError =
  | RequestLimitExceeded
  | SlowDown
  | NoSuchBucket
  | NoSuchConfiguration
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * This operation is not supported for directory buckets.
 *
 * Gets the S3 Intelligent-Tiering configuration from the specified bucket.
 *
 * The S3 Intelligent-Tiering storage class is designed to optimize storage costs by automatically moving data to the most cost-effective storage access tier, without performance impact or operational overhead. S3 Intelligent-Tiering delivers automatic cost savings in three low latency and high throughput access tiers. To get the lowest storage cost on data that can be accessed in minutes to hours, you can choose to activate additional archiving capabilities.
 *
 * The S3 Intelligent-Tiering storage class is the ideal storage class for data with unknown, changing, or unpredictable access patterns, independent of object size or retention period. If the size of an object is less than 128 KB, it is not monitored and not eligible for auto-tiering. Smaller objects can be stored, but they are always charged at the Frequent Access tier rates in the S3 Intelligent-Tiering storage class.
 *
 * For more information, see Storage class for automatically optimizing frequently and infrequently accessed objects.
 *
 * Operations related to `GetBucketIntelligentTieringConfiguration` include:
 *
 * - DeleteBucketIntelligentTieringConfiguration
 *
 * - PutBucketIntelligentTieringConfiguration
 *
 * - ListBucketIntelligentTieringConfigurations
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const getBucketIntelligentTieringConfiguration: API.OperationMethod<
  GetBucketIntelligentTieringConfigurationRequest,
  GetBucketIntelligentTieringConfigurationOutput,
  GetBucketIntelligentTieringConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2000, __c125, 0) as any as S.Schema<GetBucketIntelligentTieringConfigurationRequest>,
  output: __S(2001, __c125, 1) as any as S.Schema<GetBucketIntelligentTieringConfigurationOutput>,
  errors: [RequestLimitExceeded, SlowDown, NoSuchBucket, NoSuchConfiguration, InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBucketIntelligentTieringConfiguration",
  telemetry: TELEMETRY,
  span: "GetBucketIntelligentTieringConfiguration",
}));

export type GetBucketInventoryConfigurationError =
  | RequestLimitExceeded
  | SlowDown
  | NoSuchBucket
  | NoSuchConfiguration
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * Returns an S3 Inventory configuration (identified by the inventory configuration ID) from the
 * bucket.
 *
 * **Directory buckets ** - For directory buckets, you must make requests for this API operation to the Regional endpoint. These endpoints support path-style requests in the format https://s3express-control.*region-code*.amazonaws.com/*bucket-name*
 * . Virtual-hosted-style requests aren't supported.
 * For more information about endpoints in Availability Zones, see Regional and Zonal endpoints for directory buckets in Availability Zones in the
 * *Amazon S3 User Guide*. For more information about endpoints in Local Zones, see Concepts for directory buckets in Local Zones in the
 * *Amazon S3 User Guide*.
 *
 * ### Permissions
 *
 * To use this operation, you must have permissions to perform the
 * `s3:GetInventoryConfiguration` action. The bucket owner has this permission by default. The
 * bucket owner can grant this permission to others. For more information about permissions, see Permissions Related to Bucket Subresource Operations and Managing Access Permissions to Your Amazon S3
 * Resources.
 *
 * - **General purpose bucket permissions** - The
 * `s3:GetInventoryConfiguration` permission is required in a policy. For more information
 * about general purpose buckets permissions, see Using Bucket Policies and User
 * Policies in the *Amazon S3 User Guide*.
 *
 * - **Directory bucket permissions** - To grant access to
 * this API operation, you must have the `s3express:GetInventoryConfiguration` permission in
 * an IAM identity-based policy instead of a bucket policy.
 * For more information about directory bucket policies and permissions, see Amazon Web Services Identity and Access Management (IAM) for S3 Express One Zone in the *Amazon S3 User Guide*.
 *
 * ### HTTP Host header syntax
 *
 * **Directory buckets ** - The HTTP Host header syntax is `s3express-control.*region-code*.amazonaws.com`.
 *
 * For information about the Amazon S3 inventory feature, see Amazon S3 Inventory.
 *
 * The following operations are related to `GetBucketInventoryConfiguration`:
 *
 * - DeleteBucketInventoryConfiguration
 *
 * - ListBucketInventoryConfigurations
 *
 * - PutBucketInventoryConfiguration
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const getBucketInventoryConfiguration: API.OperationMethod<
  GetBucketInventoryConfigurationRequest,
  GetBucketInventoryConfigurationOutput,
  GetBucketInventoryConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2032, __c127, 0) as any as S.Schema<GetBucketInventoryConfigurationRequest>,
  output: __S(2033, __c127, 1) as any as S.Schema<GetBucketInventoryConfigurationOutput>,
  errors: [RequestLimitExceeded, SlowDown, NoSuchBucket, NoSuchConfiguration, InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBucketInventoryConfiguration",
  telemetry: TELEMETRY,
  span: "GetBucketInventoryConfiguration",
}));

export type GetBucketLifecycleConfigurationError =
  | RequestLimitExceeded
  | SlowDown
  | NoSuchBucket
  | NoSuchLifecycleConfiguration
  | PermanentRedirect
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * Returns the lifecycle configuration information set on the bucket. For information about lifecycle
 * configuration, see Object Lifecycle Management.
 *
 * Bucket lifecycle configuration now supports specifying a lifecycle rule using an object key name
 * prefix, one or more object tags, object size, or any combination of these. Accordingly, this section
 * describes the latest API, which is compatible with the new functionality. The previous version of the
 * API supported filtering based only on an object key name prefix, which is supported for general purpose
 * buckets for backward compatibility. For the related API description, see GetBucketLifecycle.
 *
 * Lifecyle configurations for directory buckets only support expiring objects and cancelling
 * multipart uploads. Expiring of versioned objects, transitions and tag filters are not
 * supported.
 *
 * ### Permissions
 *
 * - **General purpose bucket permissions** - By default, all Amazon S3
 * resources are private, including buckets, objects, and related subresources (for example,
 * lifecycle configuration and website configuration). Only the resource owner (that is, the
 * Amazon Web Services account that created it) can access the resource. The resource owner can optionally
 * grant access permissions to others by writing an access policy. For this operation, a user
 * must have the `s3:GetLifecycleConfiguration` permission.
 *
 * For more information about permissions, see Managing Access Permissions to Your
 * Amazon S3 Resources.
 *
 * - **Directory bucket permissions** - You must have the
 * `s3express:GetLifecycleConfiguration` permission in an IAM identity-based policy
 * to use this operation. Cross-account access to this API operation isn't supported. The
 * resource owner can optionally grant access permissions to others by creating a role or user
 * for them as long as they are within the same account as the owner and resource.
 *
 * For more information about directory bucket policies and permissions, see Authorizing Regional endpoint APIs with IAM in the Amazon S3 User
 * Guide.
 *
 * **Directory buckets ** - For directory buckets, you must make requests for this API operation to the Regional endpoint. These endpoints support path-style requests in the format https://s3express-control.*region-code*.amazonaws.com/*bucket-name*
 * . Virtual-hosted-style requests aren't supported.
 * For more information about endpoints in Availability Zones, see Regional and Zonal endpoints for directory buckets in Availability Zones in the
 * *Amazon S3 User Guide*. For more information about endpoints in Local Zones, see Concepts for directory buckets in Local Zones in the
 * *Amazon S3 User Guide*.
 *
 * ### HTTP Host header syntax
 *
 * **Directory buckets ** - The HTTP Host header syntax is
 * `s3express-control.*region*.amazonaws.com`.
 *
 * `GetBucketLifecycleConfiguration` has the following special error:
 *
 * - Error code: `NoSuchLifecycleConfiguration`
 *
 * - Description: The lifecycle configuration does not exist.
 *
 * - HTTP Status Code: 404 Not Found
 *
 * - SOAP Fault Code Prefix: Client
 *
 * The following operations are related to `GetBucketLifecycleConfiguration`:
 *
 * - GetBucketLifecycle
 *
 * - PutBucketLifecycle
 *
 * - DeleteBucketLifecycle
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const getBucketLifecycleConfiguration: API.OperationMethod<
  GetBucketLifecycleConfigurationRequest,
  GetBucketLifecycleConfigurationOutput,
  GetBucketLifecycleConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2064, __c129, 0) as any as S.Schema<GetBucketLifecycleConfigurationRequest>,
  output: __S(2065, __c129, 1) as any as S.Schema<GetBucketLifecycleConfigurationOutput>,
  errors: [
    RequestLimitExceeded,
    SlowDown,
    NoSuchBucket,
    NoSuchLifecycleConfiguration,
    PermanentRedirect,
    InvalidAccessKeyId,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBucketLifecycleConfiguration",
  telemetry: TELEMETRY,
  span: "GetBucketLifecycleConfiguration",
}));

export type GetBucketLocationError =
  | RequestLimitExceeded
  | SlowDown
  | NoSuchBucket
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * Using the `GetBucketLocation` operation is no longer a best practice. To return the
 * Region that a bucket resides in, we recommend that you use the
 * HeadBucket
 * operation instead. For backward compatibility, Amazon S3 continues to support the
 * `GetBucketLocation` operation.
 *
 * Returns the Region the bucket resides in. You set the bucket's Region using the
 * `LocationConstraint` request parameter in a `CreateBucket` request. For more
 * information, see CreateBucket.
 *
 * In a bucket's home Region, calls to the `GetBucketLocation` operation are governed
 * by the bucket's policy. In other Regions, the bucket policy doesn't apply, which means that
 * cross-account access won't be authorized. However, calls to the `HeadBucket` operation
 * always return the bucket's location through an HTTP response header, whether access to the bucket
 * is authorized or not. Therefore, we recommend using the `HeadBucket` operation for
 * bucket Region discovery and to avoid using the `GetBucketLocation` operation.
 *
 * When you use this API operation with an access point, provide the alias of the access point in place of the bucket name.
 *
 * When you use this API operation with an Object Lambda access point, provide the alias of the Object Lambda access point in place of the bucket name.
 * If the Object Lambda access point alias in a request is not valid, the error code `InvalidAccessPointAliasError` is returned.
 * For more information about `InvalidAccessPointAliasError`, see List of
 * Error Codes.
 *
 * This operation is not supported for directory buckets.
 *
 * The following operations are related to `GetBucketLocation`:
 *
 * - GetObject
 *
 * - CreateBucket
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const getBucketLocation: API.OperationMethod<
  GetBucketLocationRequest,
  GetBucketLocationOutput,
  GetBucketLocationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2096, __c131, 0) as any as S.Schema<GetBucketLocationRequest>,
  output: __S(2097, __c131, 1) as any as S.Schema<GetBucketLocationOutput>,
  errors: [RequestLimitExceeded, SlowDown, NoSuchBucket, InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBucketLocation",
  telemetry: TELEMETRY,
  span: "GetBucketLocation",
}));

export type GetBucketLoggingError =
  | RequestLimitExceeded
  | SlowDown
  | NoSuchBucket
  | PermanentRedirect
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * This operation is not supported for directory buckets.
 *
 * Returns the logging status of a bucket and the permissions users have to view and modify that
 * status.
 *
 * The following operations are related to `GetBucketLogging`:
 *
 * - CreateBucket
 *
 * - PutBucketLogging
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const getBucketLogging: API.OperationMethod<
  GetBucketLoggingRequest,
  GetBucketLoggingOutput,
  GetBucketLoggingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2112, __c132, 0) as any as S.Schema<GetBucketLoggingRequest>,
  output: __S(2113, __c132, 1) as any as S.Schema<GetBucketLoggingOutput>,
  errors: [RequestLimitExceeded, SlowDown, NoSuchBucket, PermanentRedirect, InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBucketLogging",
  telemetry: TELEMETRY,
  span: "GetBucketLogging",
}));

export type GetBucketMetadataConfigurationError =
  | RequestLimitExceeded
  | SlowDown
  | NoSuchBucket
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * Retrieves the S3 Metadata configuration for a general purpose bucket. For more information, see
 * Accelerating
 * data discovery with S3 Metadata in the *Amazon S3 User Guide*.
 *
 * You can use the V2 `GetBucketMetadataConfiguration` API operation with V1 or V2
 * metadata configurations. However, if you try to use the V1
 * `GetBucketMetadataTableConfiguration` API operation with V2 configurations, you
 * will receive an HTTP `405 Method Not Allowed` error.
 *
 * ### Permissions
 *
 * To use this operation, you must have the `s3:GetBucketMetadataTableConfiguration`
 * permission. For more information, see Setting up permissions for
 * configuring metadata tables in the *Amazon S3 User Guide*.
 *
 * The IAM policy action name is the same for the V1 and V2 API operations.
 *
 * The following operations are related to `GetBucketMetadataConfiguration`:
 *
 * - CreateBucketMetadataConfiguration
 *
 * - DeleteBucketMetadataConfiguration
 *
 * - UpdateBucketMetadataInventoryTableConfiguration
 *
 * - UpdateBucketMetadataJournalTableConfiguration
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const getBucketMetadataConfiguration: API.OperationMethod<
  GetBucketMetadataConfigurationRequest,
  GetBucketMetadataConfigurationOutput,
  GetBucketMetadataConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2144, __c134, 0) as any as S.Schema<GetBucketMetadataConfigurationRequest>,
  output: __S(2151, __c134, 7) as any as S.Schema<GetBucketMetadataConfigurationOutput>,
  errors: [RequestLimitExceeded, SlowDown, NoSuchBucket, InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBucketMetadataConfiguration",
  telemetry: TELEMETRY,
  span: "GetBucketMetadataConfiguration",
}));

export type GetBucketMetadataTableConfigurationError =
  | RequestLimitExceeded
  | SlowDown
  | NoSuchBucket
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * We recommend that you retrieve your S3 Metadata configurations by using the V2
 * GetBucketMetadataTableConfiguration API operation. We no longer recommend using the V1
 * `GetBucketMetadataTableConfiguration` API operation.
 *
 * If you created your S3 Metadata configuration before July 15, 2025, we recommend that you delete
 * and re-create your configuration by using CreateBucketMetadataConfiguration so that you can expire journal table records and create
 * a live inventory table.
 *
 * Retrieves the V1 S3 Metadata configuration for a general purpose bucket. For more information, see
 * Accelerating
 * data discovery with S3 Metadata in the *Amazon S3 User Guide*.
 *
 * You can use the V2 `GetBucketMetadataConfiguration` API operation with V1 or V2
 * metadata table configurations. However, if you try to use the V1
 * `GetBucketMetadataTableConfiguration` API operation with V2 configurations, you
 * will receive an HTTP `405 Method Not Allowed` error.
 *
 * Make sure that you update your processes to use the new V2 API operations
 * (`CreateBucketMetadataConfiguration`, `GetBucketMetadataConfiguration`, and
 * `DeleteBucketMetadataConfiguration`) instead of the V1 API operations.
 *
 * ### Permissions
 *
 * To use this operation, you must have the `s3:GetBucketMetadataTableConfiguration`
 * permission. For more information, see Setting up permissions for
 * configuring metadata tables in the *Amazon S3 User Guide*.
 *
 * The following operations are related to `GetBucketMetadataTableConfiguration`:
 *
 * - CreateBucketMetadataTableConfiguration
 *
 * - DeleteBucketMetadataTableConfiguration
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const getBucketMetadataTableConfiguration: API.OperationMethod<
  GetBucketMetadataTableConfigurationRequest,
  GetBucketMetadataTableConfigurationOutput,
  GetBucketMetadataTableConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2176, __c136, 0) as any as S.Schema<GetBucketMetadataTableConfigurationRequest>,
  output: __S(2180, __c136, 4) as any as S.Schema<GetBucketMetadataTableConfigurationOutput>,
  errors: [RequestLimitExceeded, SlowDown, NoSuchBucket, InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBucketMetadataTableConfiguration",
  telemetry: TELEMETRY,
  span: "GetBucketMetadataTableConfiguration",
}));

export type GetBucketMetricsConfigurationError =
  | RequestLimitExceeded
  | SlowDown
  | NoSuchBucket
  | NoSuchConfiguration
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * Gets a metrics configuration (specified by the metrics configuration ID) from the bucket. Note that
 * this doesn't include the daily storage metrics.
 *
 * **Directory buckets ** - For directory buckets, you must make requests for this API operation to the Regional endpoint. These endpoints support path-style requests in the format https://s3express-control.*region-code*.amazonaws.com/*bucket-name*
 * . Virtual-hosted-style requests aren't supported.
 * For more information about endpoints in Availability Zones, see Regional and Zonal endpoints for directory buckets in Availability Zones in the
 * *Amazon S3 User Guide*. For more information about endpoints in Local Zones, see Concepts for directory buckets in Local Zones in the
 * *Amazon S3 User Guide*.
 *
 * ### Permissions
 *
 * To use this operation, you must have permissions to perform the
 * `s3:GetMetricsConfiguration` action. The bucket owner has this permission by default. The
 * bucket owner can grant this permission to others. For more information about permissions, see Permissions Related to Bucket Subresource Operations and Managing Access Permissions to Your Amazon S3
 * Resources.
 *
 * - **General purpose bucket permissions** - The
 * `s3:GetMetricsConfiguration` permission is required in a policy. For more information
 * about general purpose buckets permissions, see Using Bucket Policies and User
 * Policies in the *Amazon S3 User Guide*.
 *
 * - **Directory bucket permissions** - To grant access to
 * this API operation, you must have the `s3express:GetMetricsConfiguration` permission in
 * an IAM identity-based policy instead of a bucket policy. Cross-account access to this API operation isn't supported. This operation can only be performed by the Amazon Web Services account that owns the resource.
 * For more information about directory bucket policies and permissions, see Amazon Web Services Identity and Access Management (IAM) for S3 Express One Zone in the *Amazon S3 User Guide*.
 *
 * ### HTTP Host header syntax
 *
 * **Directory buckets ** - The HTTP Host header syntax is `s3express-control.*region-code*.amazonaws.com`.
 *
 * For information about CloudWatch request metrics for Amazon S3, see Monitoring Metrics with Amazon
 * CloudWatch.
 *
 * The following operations are related to `GetBucketMetricsConfiguration`:
 *
 * - PutBucketMetricsConfiguration
 *
 * - DeleteBucketMetricsConfiguration
 *
 * - ListBucketMetricsConfigurations
 *
 * - Monitoring
 * Metrics with Amazon CloudWatch
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const getBucketMetricsConfiguration: API.OperationMethod<
  GetBucketMetricsConfigurationRequest,
  GetBucketMetricsConfigurationOutput,
  GetBucketMetricsConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2192, __c137, 0) as any as S.Schema<GetBucketMetricsConfigurationRequest>,
  output: __S(2193, __c137, 1) as any as S.Schema<GetBucketMetricsConfigurationOutput>,
  errors: [RequestLimitExceeded, SlowDown, NoSuchBucket, NoSuchConfiguration, InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBucketMetricsConfiguration",
  telemetry: TELEMETRY,
  span: "GetBucketMetricsConfiguration",
}));

export type GetBucketNotificationConfigurationError =
  | RequestLimitExceeded
  | SlowDown
  | NoSuchBucket
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * This operation is not supported for directory buckets.
 *
 * Returns the notification configuration of a bucket.
 *
 * If notifications are not enabled on the bucket, the action returns an empty
 * `NotificationConfiguration` element.
 *
 * By default, you must be the bucket owner to read the notification configuration of a bucket.
 * However, the bucket owner can use a bucket policy to grant permission to other users to read this
 * configuration with the `s3:GetBucketNotification` permission.
 *
 * When you use this API operation with an access point, provide the alias of the access point in place of the bucket name.
 *
 * When you use this API operation with an Object Lambda access point, provide the alias of the Object Lambda access point in place of the bucket name.
 * If the Object Lambda access point alias in a request is not valid, the error code `InvalidAccessPointAliasError` is returned.
 * For more information about `InvalidAccessPointAliasError`, see List of
 * Error Codes.
 *
 * For more information about setting and reading the notification configuration on a bucket, see
 * Setting Up Notification
 * of Bucket Events. For more information about bucket policies, see Using Bucket Policies.
 *
 * The following action is related to `GetBucketNotification`:
 *
 * - PutBucketNotification
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const getBucketNotificationConfiguration: API.OperationMethod<
  GetBucketNotificationConfigurationRequest,
  NotificationConfiguration,
  GetBucketNotificationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2224, __c139, 0) as any as S.Schema<GetBucketNotificationConfigurationRequest>,
  output: __S(2252, __c140, 12) as any as S.Schema<NotificationConfiguration>,
  errors: [RequestLimitExceeded, SlowDown, NoSuchBucket, InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBucketNotificationConfiguration",
  telemetry: TELEMETRY,
  span: "GetBucketNotificationConfiguration",
}));

export type GetBucketOwnershipControlsError =
  | RequestLimitExceeded
  | SlowDown
  | NoSuchBucket
  | OwnershipControlsNotFoundError
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * This operation is not supported for directory buckets.
 *
 * Retrieves `OwnershipControls` for an Amazon S3 bucket. To use this operation, you must have
 * the `s3:GetBucketOwnershipControls` permission. For more information about Amazon S3 permissions,
 * see Specifying
 * permissions in a policy.
 *
 * A bucket doesn't have `OwnershipControls` settings in the following cases:
 *
 * - The bucket was created before the `BucketOwnerEnforced` ownership setting was
 * introduced and you've never explicitly applied this value
 *
 * - You've manually deleted the bucket ownership control value using the
 * `DeleteBucketOwnershipControls` API operation.
 *
 * By default, Amazon S3 sets `OwnershipControls` for all newly created buckets.
 *
 * For information about Amazon S3 Object Ownership, see Using Object Ownership.
 *
 * The following operations are related to `GetBucketOwnershipControls`:
 *
 * - PutBucketOwnershipControls
 *
 * - DeleteBucketOwnershipControls
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const getBucketOwnershipControls: API.OperationMethod<
  GetBucketOwnershipControlsRequest,
  GetBucketOwnershipControlsOutput,
  GetBucketOwnershipControlsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2256, __c141, 0) as any as S.Schema<GetBucketOwnershipControlsRequest>,
  output: __S(2257, __c141, 1) as any as S.Schema<GetBucketOwnershipControlsOutput>,
  errors: [
    RequestLimitExceeded,
    SlowDown,
    NoSuchBucket,
    OwnershipControlsNotFoundError,
    InvalidAccessKeyId,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBucketOwnershipControls",
  telemetry: TELEMETRY,
  span: "GetBucketOwnershipControls",
}));

export type GetBucketPolicyError =
  | RequestLimitExceeded
  | SlowDown
  | NoSuchBucket
  | NoSuchBucketPolicy
  | PermanentRedirect
  | SignatureDoesNotMatch
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * Returns the policy of a specified bucket.
 *
 * **Directory buckets ** - For directory buckets, you must make requests for this API operation to the Regional endpoint. These endpoints support path-style requests in the format https://s3express-control.*region-code*.amazonaws.com/*bucket-name*
 * . Virtual-hosted-style requests aren't supported.
 * For more information about endpoints in Availability Zones, see Regional and Zonal endpoints for directory buckets in Availability Zones in the
 * *Amazon S3 User Guide*. For more information about endpoints in Local Zones, see Concepts for directory buckets in Local Zones in the
 * *Amazon S3 User Guide*.
 *
 * ### Permissions
 *
 * If you are using an identity other than the root user of the Amazon Web Services account that owns the
 * bucket, the calling identity must both have the `GetBucketPolicy` permissions on the
 * specified bucket and belong to the bucket owner's account in order to use this operation.
 *
 * If you don't have `GetBucketPolicy` permissions, Amazon S3 returns a 403 Access
 * Denied error. If you have the correct permissions, but you're not using an identity that
 * belongs to the bucket owner's account, Amazon S3 returns a `405 Method Not Allowed`
 * error.
 *
 * To ensure that bucket owners don't inadvertently lock themselves out of their own buckets,
 * the root principal in a bucket owner's Amazon Web Services account can perform the
 * `GetBucketPolicy`, `PutBucketPolicy`, and
 * `DeleteBucketPolicy` API actions, even if their bucket policy explicitly denies the
 * root principal's access. Bucket owner root principals can only be blocked from performing these
 * API actions by VPC endpoint policies and Amazon Web Services Organizations policies.
 *
 * - **General purpose bucket permissions** - The
 * `s3:GetBucketPolicy` permission is required in a policy. For more information
 * about general purpose buckets bucket policies, see Using Bucket Policies and User
 * Policies in the *Amazon S3 User Guide*.
 *
 * - **Directory bucket permissions** - To grant access to
 * this API operation, you must have the `s3express:GetBucketPolicy` permission in
 * an IAM identity-based policy instead of a bucket policy. Cross-account access to this API operation isn't supported. This operation can only be performed by the Amazon Web Services account that owns the resource.
 * For more information about directory bucket policies and permissions, see Amazon Web Services Identity and Access Management (IAM) for S3 Express One Zone in the *Amazon S3 User Guide*.
 *
 * ### Example bucket policies
 *
 * **General purpose buckets example bucket policies** - See Bucket policy
 * examples in the *Amazon S3 User Guide*.
 *
 * **Directory bucket example bucket policies** - See Example
 * bucket policies for S3 Express One Zone in the *Amazon S3 User Guide*.
 *
 * ### HTTP Host header syntax
 *
 * **Directory buckets ** - The HTTP Host header syntax is `s3express-control.*region-code*.amazonaws.com`.
 *
 * The following action is related to `GetBucketPolicy`:
 *
 * - GetObject
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const getBucketPolicy: API.OperationMethod<
  GetBucketPolicyRequest,
  GetBucketPolicyOutput,
  GetBucketPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2288, __c143, 0) as any as S.Schema<GetBucketPolicyRequest>,
  output: __S(2289, __c143, 1) as any as S.Schema<GetBucketPolicyOutput>,
  errors: [
    RequestLimitExceeded,
    SlowDown,
    NoSuchBucket,
    NoSuchBucketPolicy,
    PermanentRedirect,
    SignatureDoesNotMatch,
    InvalidAccessKeyId,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBucketPolicy",
  telemetry: TELEMETRY,
  span: "GetBucketPolicy",
}));

export type GetBucketPolicyStatusError =
  | RequestLimitExceeded
  | SlowDown
  | NoSuchBucket
  | PermanentRedirect
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * This operation is not supported for directory buckets.
 *
 * Retrieves the policy status for an Amazon S3 bucket, indicating whether the bucket is public. In order to
 * use this operation, you must have the `s3:GetBucketPolicyStatus` permission. For more
 * information about Amazon S3 permissions, see Specifying Permissions in a
 * Policy.
 *
 * For more information about when Amazon S3 considers a bucket public, see The Meaning of "Public".
 *
 * The following operations are related to `GetBucketPolicyStatus`:
 *
 * - Using Amazon S3 Block Public Access
 *
 * - GetPublicAccessBlock
 *
 * - PutPublicAccessBlock
 *
 * - DeletePublicAccessBlock
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const getBucketPolicyStatus: API.OperationMethod<
  GetBucketPolicyStatusRequest,
  GetBucketPolicyStatusOutput,
  GetBucketPolicyStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2304, __c144, 0) as any as S.Schema<GetBucketPolicyStatusRequest>,
  output: __S(2306, __c144, 2) as any as S.Schema<GetBucketPolicyStatusOutput>,
  errors: [RequestLimitExceeded, SlowDown, NoSuchBucket, PermanentRedirect, InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBucketPolicyStatus",
  telemetry: TELEMETRY,
  span: "GetBucketPolicyStatus",
}));

export type GetBucketReplicationError =
  | RequestLimitExceeded
  | SlowDown
  | NoSuchBucket
  | ReplicationConfigurationNotFoundError
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * This operation is not supported for directory buckets.
 *
 * Returns the replication configuration of a bucket.
 *
 * It can take a while to propagate the put or delete a replication configuration to all Amazon S3
 * systems. Therefore, a get request soon after put or delete can return a wrong result.
 *
 * For information about replication configuration, see Replication in the
 * *Amazon S3 User Guide*.
 *
 * This action requires permissions for the `s3:GetReplicationConfiguration` action. For
 * more information about permissions, see Using Bucket Policies and User
 * Policies.
 *
 * If you include the `Filter` element in a replication configuration, you must also include
 * the `DeleteMarkerReplication` and `Priority` elements. The response also returns
 * those elements.
 *
 * For information about `GetBucketReplication` errors, see List of replication-related
 * error codes
 *
 * The following operations are related to `GetBucketReplication`:
 *
 * - PutBucketReplication
 *
 * - DeleteBucketReplication
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const getBucketReplication: API.OperationMethod<
  GetBucketReplicationRequest,
  GetBucketReplicationOutput,
  GetBucketReplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2320, __c145, 0) as any as S.Schema<GetBucketReplicationRequest>,
  output: __S(2321, __c145, 1) as any as S.Schema<GetBucketReplicationOutput>,
  errors: [
    RequestLimitExceeded,
    SlowDown,
    NoSuchBucket,
    ReplicationConfigurationNotFoundError,
    InvalidAccessKeyId,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBucketReplication",
  telemetry: TELEMETRY,
  span: "GetBucketReplication",
}));

export type GetBucketRequestPaymentError =
  | RequestLimitExceeded
  | SlowDown
  | NoSuchBucket
  | PermanentRedirect
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * This operation is not supported for directory buckets.
 *
 * Returns the request payment configuration of a bucket. To use this version of the operation, you
 * must be the bucket owner. For more information, see Requester Pays Buckets.
 *
 * The following operations are related to `GetBucketRequestPayment`:
 *
 * - ListObjects
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const getBucketRequestPayment: API.OperationMethod<
  GetBucketRequestPaymentRequest,
  GetBucketRequestPaymentOutput,
  GetBucketRequestPaymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2352, __c147, 0) as any as S.Schema<GetBucketRequestPaymentRequest>,
  output: __S(2353, __c147, 1) as any as S.Schema<GetBucketRequestPaymentOutput>,
  errors: [RequestLimitExceeded, SlowDown, NoSuchBucket, PermanentRedirect, InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBucketRequestPayment",
  telemetry: TELEMETRY,
  span: "GetBucketRequestPayment",
}));

export type GetBucketTaggingError =
  | RequestLimitExceeded
  | SlowDown
  | NoSuchBucket
  | NoSuchTagSet
  | PermanentRedirect
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * This operation is not supported for directory buckets.
 *
 * Returns the tag set associated with the general purpose bucket.
 *
 * To use this operation, you must have permission to perform the `s3:GetBucketTagging`
 * action. By default, the bucket owner has this permission and can grant this permission to others.
 *
 * `GetBucketTagging` has the following special error:
 *
 * - Error code: `NoSuchTagSet`
 *
 * - Description: There is no tag set associated with the bucket.
 *
 * The following operations are related to `GetBucketTagging`:
 *
 * - PutBucketTagging
 *
 * - DeleteBucketTagging
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const getBucketTagging: API.OperationMethod<
  GetBucketTaggingRequest,
  GetBucketTaggingOutput,
  GetBucketTaggingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<GetBucketTaggingRequest>,
  output: __S(1, __c0, 1) as any as S.Schema<GetBucketTaggingOutput>,
  errors: [
    RequestLimitExceeded,
    SlowDown,
    NoSuchBucket,
    NoSuchTagSet,
    PermanentRedirect,
    InvalidAccessKeyId,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBucketTagging",
  telemetry: TELEMETRY,
  span: "GetBucketTagging",
}));

export type GetBucketVersioningError =
  | RequestLimitExceeded
  | SlowDown
  | NoSuchBucket
  | PermanentRedirect
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * This operation is not supported for directory buckets.
 *
 * Returns the versioning state of a bucket.
 *
 * To retrieve the versioning state of a bucket, you must be the bucket owner.
 *
 * This implementation also returns the MFA Delete status of the versioning state. If the MFA Delete
 * status is `enabled`, the bucket owner must use an authentication device to change the
 * versioning state of the bucket.
 *
 * The following operations are related to `GetBucketVersioning`:
 *
 * - GetObject
 *
 * - PutObject
 *
 * - DeleteObject
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const getBucketVersioning: API.OperationMethod<
  GetBucketVersioningRequest,
  GetBucketVersioningOutput,
  GetBucketVersioningError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(16, __c1, 0) as any as S.Schema<GetBucketVersioningRequest>,
  output: __S(17, __c1, 1) as any as S.Schema<GetBucketVersioningOutput>,
  errors: [RequestLimitExceeded, SlowDown, NoSuchBucket, PermanentRedirect, InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBucketVersioning",
  telemetry: TELEMETRY,
  span: "GetBucketVersioning",
}));

export type GetBucketWebsiteError =
  | RequestLimitExceeded
  | SlowDown
  | NoSuchBucket
  | NoSuchWebsiteConfiguration
  | PermanentRedirect
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * This operation is not supported for directory buckets.
 *
 * Returns the website configuration for a bucket. To host website on Amazon S3, you can configure a bucket
 * as website by adding a website configuration. For more information about hosting websites, see Hosting Websites on Amazon S3.
 *
 * This GET action requires the `S3:GetBucketWebsite` permission. By default, only the
 * bucket owner can read the bucket website configuration. However, bucket owners can allow other users to
 * read the website configuration by writing a bucket policy granting them the
 * `S3:GetBucketWebsite` permission.
 *
 * The following operations are related to `GetBucketWebsite`:
 *
 * - DeleteBucketWebsite
 *
 * - PutBucketWebsite
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const getBucketWebsite: API.OperationMethod<
  GetBucketWebsiteRequest,
  GetBucketWebsiteOutput,
  GetBucketWebsiteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c2, 0) as any as S.Schema<GetBucketWebsiteRequest>,
  output: __S(33, __c2, 1) as any as S.Schema<GetBucketWebsiteOutput>,
  errors: [
    RequestLimitExceeded,
    SlowDown,
    NoSuchBucket,
    NoSuchWebsiteConfiguration,
    PermanentRedirect,
    InvalidAccessKeyId,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBucketWebsite",
  telemetry: TELEMETRY,
  span: "GetBucketWebsite",
}));

export type GetObjectError =
  | InvalidObjectState
  | NoSuchKey
  | RequestLimitExceeded
  | SlowDown
  | NoSuchBucket
  | PermanentRedirect
  | NoSuchVersion
  | MethodNotAllowed
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * Retrieves an object from Amazon S3.
 *
 * In the `GetObject` request, specify the full key name for the object.
 *
 * **General purpose buckets** - Both the virtual-hosted-style requests
 * and the path-style requests are supported. For a virtual hosted-style request example, if you have the
 * object `photos/2006/February/sample.jpg`, specify the object key name as
 * `/photos/2006/February/sample.jpg`. For a path-style request example, if you have the
 * object `photos/2006/February/sample.jpg` in the bucket named `examplebucket`,
 * specify the object key name as `/examplebucket/photos/2006/February/sample.jpg`. For more
 * information about request types, see HTTP Host Header Bucket
 * Specification in the *Amazon S3 User Guide*.
 *
 * **Directory buckets** -
 * Only virtual-hosted-style requests are supported. For a virtual hosted-style request example, if you have the object `photos/2006/February/sample.jpg` in the bucket named `amzn-s3-demo-bucket--usw2-az1--x-s3`, specify the object key name as `/photos/2006/February/sample.jpg`. Also, when you make requests to this API operation, your requests are sent to the Zonal endpoint. These endpoints support virtual-hosted-style requests in the format https://*bucket-name*.s3express-*zone-id*.*region-code*.amazonaws.com/*key-name*
 * . Path-style requests are not supported. For more information about endpoints in Availability Zones, see Regional and Zonal endpoints for directory buckets in Availability Zones in the
 * *Amazon S3 User Guide*. For more information about endpoints in Local Zones, see Concepts for directory buckets in Local Zones in the
 * *Amazon S3 User Guide*.
 *
 * ### Permissions
 *
 * - **General purpose bucket permissions** - You must have the
 * required permissions in a policy. To use `GetObject`, you must have the
 * `READ` access to the object (or version). If you grant `READ` access
 * to the anonymous user, the `GetObject` operation returns the object without using
 * an authorization header. For more information, see Specifying permissions in a
 * policy in the *Amazon S3 User Guide*.
 *
 * If you include a `versionId` in your request header, you must have the
 * `s3:GetObjectVersion` permission to access a specific version of an object. The
 * `s3:GetObject` permission is not required in this scenario.
 *
 * If you request the current version of an object without a specific `versionId`
 * in the request header, only the `s3:GetObject` permission is required. The
 * `s3:GetObjectVersion` permission is not required in this scenario.
 *
 * If the object that you request doesn't exist, the error that Amazon S3 returns depends on
 * whether you also have the `s3:ListBucket` permission.
 *
 * - If you have the `s3:ListBucket` permission on the bucket, Amazon S3 returns an
 * HTTP status code `404 Not Found` error.
 *
 * - If you don't have the `s3:ListBucket` permission, Amazon S3 returns an HTTP
 * status code `403 Access Denied` error.
 *
 * - **Directory bucket permissions** - To grant access to this API operation on a directory bucket, we recommend that you use the
 * `CreateSession`
 * API operation for session-based authorization. Specifically, you grant the `s3express:CreateSession` permission to the directory bucket in a bucket policy or an IAM identity-based policy. Then, you make the `CreateSession` API call on the bucket to obtain a session token. With the session token in your request header, you can make API requests to this operation. After the session token expires, you make another `CreateSession` API call to generate a new session token for use.
 * Amazon Web Services CLI or SDKs create session and refresh the session token automatically to avoid service interruptions when a session expires. For more information about authorization, see
 * `CreateSession`
 * .
 *
 * If the object is
 * encrypted using SSE-KMS, you must also have the `kms:GenerateDataKey` and
 * `kms:Decrypt` permissions in IAM identity-based policies and KMS key policies
 * for the KMS key.
 *
 * ### Storage classes
 *
 * If the object you are retrieving is stored in the S3 Glacier Flexible Retrieval storage class,
 * the S3 Glacier Deep Archive storage class, the S3 Intelligent-Tiering Archive Access tier, or the
 * S3 Intelligent-Tiering Deep Archive Access tier, before you can retrieve the object you must first restore a
 * copy using RestoreObject. Otherwise, this operation returns an `InvalidObjectState`
 * error. For information about restoring archived objects, see Restoring Archived Objects in the
 * *Amazon S3 User Guide*.
 *
 * **Directory buckets ** -
 * Directory buckets only support `EXPRESS_ONEZONE` (the S3 Express One Zone storage class) in Availability Zones and `ONEZONE_IA` (the S3 One Zone-Infrequent Access storage class) in Dedicated Local Zones.
 * Unsupported storage class values won't write a destination object and will respond with the HTTP status code `400 Bad Request`.
 *
 * ### Encryption
 *
 * Encryption request headers, like `x-amz-server-side-encryption`, should not be sent
 * for the `GetObject` requests, if your object uses server-side encryption with Amazon S3
 * managed encryption keys (SSE-S3), server-side encryption with Key Management Service (KMS) keys (SSE-KMS), or
 * dual-layer server-side encryption with Amazon Web Services KMS keys (DSSE-KMS). If you include the header in
 * your `GetObject` requests for the object that uses these types of keys, you'll get an
 * HTTP `400 Bad Request` error.
 *
 * **Directory buckets** -
 * For directory buckets, there are only two supported options for server-side encryption: SSE-S3 and SSE-KMS. SSE-C isn't supported. For more
 * information, see Protecting data with server-side encryption in the *Amazon S3 User Guide*.
 *
 * ### Overriding response header values through the request
 *
 * There are times when you want to override certain response header values of a
 * `GetObject` response. For example, you might override the
 * `Content-Disposition` response header value through your `GetObject`
 * request.
 *
 * You can override values for a set of response headers. These modified response header values
 * are included only in a successful response, that is, when the HTTP status code `200 OK`
 * is returned. The headers you can override using the following query parameters in the request are
 * a subset of the headers that Amazon S3 accepts when you create an object.
 *
 * The response headers that you can override for the `GetObject` response are
 * `Cache-Control`, `Content-Disposition`, `Content-Encoding`,
 * `Content-Language`, `Content-Type`, and `Expires`.
 *
 * To override values for a set of response headers in the `GetObject` response, you
 * can use the following query parameters in the request.
 *
 * - `response-cache-control`
 *
 * - `response-content-disposition`
 *
 * - `response-content-encoding`
 *
 * - `response-content-language`
 *
 * - `response-content-type`
 *
 * - `response-expires`
 *
 * When you use these parameters, you must sign the request by using either an Authorization
 * header or a presigned URL. These parameters cannot be used with an unsigned (anonymous)
 * request.
 *
 * ### HTTP Host header syntax
 *
 * **Directory buckets ** - The HTTP Host header syntax is
 * *Bucket-name*.s3express-*zone-id*.*region-code*.amazonaws.com.
 *
 * The following operations are related to `GetObject`:
 *
 * - ListBuckets
 *
 * - GetObjectAcl
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const getObject: API.OperationMethod<
  GetObjectRequest,
  GetObjectOutput,
  GetObjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c4, 0) as any as S.Schema<GetObjectRequest>,
  output: __S(65, __c4, 1) as any as S.Schema<GetObjectOutput>,
  errors: [
    InvalidObjectState,
    NoSuchKey,
    RequestLimitExceeded,
    SlowDown,
    NoSuchBucket,
    PermanentRedirect,
    NoSuchVersion,
    MethodNotAllowed,
    InvalidAccessKeyId,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetObject",
  telemetry: TELEMETRY,
  span: { op: "GetObject", input: { PartNumber: [{ name: "aws.s3.part_number" }] } },
}));

export type GetObjectAclError =
  | NoSuchKey
  | RequestLimitExceeded
  | SlowDown
  | NoSuchBucket
  | PermanentRedirect
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * This operation is not supported for directory buckets.
 *
 * Returns the access control list (ACL) of an object. To use this operation, you must have
 * `s3:GetObjectAcl` permissions or `READ_ACP` access to the object. For more
 * information, see Mapping of ACL
 * permissions and access policy permissions in the *Amazon S3 User Guide*
 *
 * This functionality is not supported for Amazon S3 on Outposts.
 *
 * By default, GET returns ACL information about the current version of an object. To return ACL
 * information about a different version, use the versionId subresource.
 *
 * If your bucket uses the bucket owner enforced setting for S3 Object Ownership, requests to read
 * ACLs are still supported and return the `bucket-owner-full-control` ACL with the owner
 * being the account that created the bucket. For more information, see Controlling object ownership and
 * disabling ACLs in the *Amazon S3 User Guide*.
 *
 * The following operations are related to `GetObjectAcl`:
 *
 * - GetObject
 *
 * - GetObjectAttributes
 *
 * - DeleteObject
 *
 * - PutObject
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const getObjectAcl: API.OperationMethod<
  GetObjectAclRequest,
  GetObjectAclOutput,
  GetObjectAclError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(80, __c5, 0) as any as S.Schema<GetObjectAclRequest>,
  output: __S(81, __c5, 1) as any as S.Schema<GetObjectAclOutput>,
  errors: [
    NoSuchKey,
    RequestLimitExceeded,
    SlowDown,
    NoSuchBucket,
    PermanentRedirect,
    InvalidAccessKeyId,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetObjectAcl",
  telemetry: TELEMETRY,
  span: "GetObjectAcl",
}));

export type GetObjectAnnotationError =
  | NoSuchAnnotation
  | NoSuchBucket
  | NoSuchKey
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * Retrieves an annotation from an Amazon S3 object. To use this operation, you must have the
 * `s3:GetObjectAnnotation` permission.
 *
 * If checksum mode is enabled via the `x-amz-checksum-mode` header, Amazon S3
 * returns the stored checksum in the response headers for client-side validation.
 *
 * Annotations are not supported by the following features: S3 Inventory Reports,
 * API Gateway, S3 Storage Lens, Amazon S3 File Gateway, Amazon FSx, S3 on Outposts, and
 * S3 Express One Zone (directory buckets).
 *
 * The following operations are related to `GetObjectAnnotation`:
 *
 * - PutObjectAnnotation
 *
 * - ListObjectAnnotations
 *
 * - DeleteObjectAnnotation
 */
export const getObjectAnnotation: API.OperationMethod<
  GetObjectAnnotationRequest,
  GetObjectAnnotationOutput,
  GetObjectAnnotationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c6, 0) as any as S.Schema<GetObjectAnnotationRequest>,
  output: __S(97, __c6, 1) as any as S.Schema<GetObjectAnnotationOutput>,
  errors: [NoSuchAnnotation, NoSuchBucket, NoSuchKey, InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetObjectAnnotation",
  telemetry: TELEMETRY,
  span: "GetObjectAnnotation",
}));

export type GetObjectAttributesError =
  | NoSuchKey
  | NoSuchVersion
  | MethodNotAllowed
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * Retrieves all of the metadata from an object without returning the object itself. This operation is
 * useful if you're interested only in an object's metadata.
 *
 * `GetObjectAttributes` combines the functionality of `HeadObject` and
 * `ListParts`. All of the data returned with both of those individual calls can be returned
 * with a single call to `GetObjectAttributes`.
 *
 * **Directory buckets** - For directory buckets, you must make requests for this API operation to the Zonal endpoint. These endpoints support virtual-hosted-style requests in the format https://*amzn-s3-demo-bucket*.s3express-*zone-id*.*region-code*.amazonaws.com/*key-name*
 * . Path-style requests are not supported. For more information about endpoints in Availability Zones, see Regional and Zonal endpoints for directory buckets in Availability Zones in the
 * *Amazon S3 User Guide*. For more information about endpoints in Local Zones, see Concepts for directory buckets in Local Zones in the
 * *Amazon S3 User Guide*.
 *
 * ### Permissions
 *
 * - **General purpose bucket permissions** - To use
 * `GetObjectAttributes`, you must have READ access to the object.
 *
 * The other permissions that you need to use this operation depend on whether the bucket is
 * versioned and if a version ID is passed in the `GetObjectAttributes` request.
 *
 * - If you pass a version ID in your request, you need both the
 * `s3:GetObjectVersion` and `s3:GetObjectVersionAttributes`
 * permissions.
 *
 * - If you do not pass a version ID in your request, you need the
 * `s3:GetObject` and `s3:GetObjectAttributes` permissions.
 *
 * For more information, see Specifying Permissions in a
 * Policy in the *Amazon S3 User Guide*.
 *
 * If the object that you request does not exist, the error Amazon S3 returns depends on whether
 * you also have the `s3:ListBucket` permission.
 *
 * - If you have the `s3:ListBucket` permission on the bucket, Amazon S3 returns an
 * HTTP status code `404 Not Found` ("no such key") error.
 *
 * - If you don't have the `s3:ListBucket` permission, Amazon S3 returns an HTTP
 * status code `403 Forbidden` ("access denied") error.
 *
 * - **Directory bucket permissions** - To grant access to this API operation on a directory bucket, we recommend that you use the
 * `CreateSession`
 * API operation for session-based authorization. Specifically, you grant the `s3express:CreateSession` permission to the directory bucket in a bucket policy or an IAM identity-based policy. Then, you make the `CreateSession` API call on the bucket to obtain a session token. With the session token in your request header, you can make API requests to this operation. After the session token expires, you make another `CreateSession` API call to generate a new session token for use.
 * Amazon Web Services CLI or SDKs create session and refresh the session token automatically to avoid service interruptions when a session expires. For more information about authorization, see
 * `CreateSession`
 * .
 *
 * If
 * the
 * object is encrypted with SSE-KMS, you must also have the `kms:GenerateDataKey` and
 * `kms:Decrypt` permissions in IAM identity-based policies and KMS key policies
 * for the KMS key.
 *
 * ### Encryption
 *
 * Encryption request headers, like `x-amz-server-side-encryption`, should not be
 * sent for `HEAD` requests if your object uses server-side encryption with Key Management Service
 * (KMS) keys (SSE-KMS), dual-layer server-side encryption with Amazon Web Services KMS keys (DSSE-KMS), or
 * server-side encryption with Amazon S3 managed encryption keys (SSE-S3). The
 * `x-amz-server-side-encryption` header is used when you `PUT` an object
 * to S3 and want to specify the encryption method. If you include this header in a
 * `GET` request for an object that uses these types of keys, you'll get an HTTP
 * `400 Bad Request` error. It's because the encryption method can't be changed when
 * you retrieve the object.
 *
 * If you encrypted an object when you stored the object in Amazon S3 by using server-side encryption
 * with customer-provided encryption keys (SSE-C), then when you retrieve the metadata from the
 * object, you must use the following headers. These headers provide the server with the encryption
 * key required to retrieve the object's metadata. The headers are:
 *
 * - `x-amz-server-side-encryption-customer-algorithm`
 *
 * - `x-amz-server-side-encryption-customer-key`
 *
 * - `x-amz-server-side-encryption-customer-key-MD5`
 *
 * For more information about SSE-C, see Server-Side Encryption (Using
 * Customer-Provided Encryption Keys) in the *Amazon S3 User Guide*.
 *
 * **Directory bucket permissions** -
 * For directory buckets, there are only two supported options for server-side encryption: server-side encryption with Amazon S3 managed keys (SSE-S3) (`AES256`) and server-side encryption with KMS keys (SSE-KMS) (`aws:kms`). We recommend that the bucket's default encryption uses the desired encryption configuration and you don't override the bucket default encryption in your
 * `CreateSession` requests or `PUT` object requests. Then, new objects
 * are automatically encrypted with the desired encryption settings. For more
 * information, see Protecting data with server-side encryption in the *Amazon S3 User Guide*. For more information about the encryption overriding behaviors in directory buckets, see Specifying server-side encryption with KMS for new object uploads.
 *
 * ### Versioning
 *
 * **Directory buckets** - S3 Versioning isn't enabled and supported for directory buckets. For this API operation, only the `null` value of the version ID is supported by directory buckets.
 * You can only specify `null` to the `versionId` query parameter in the
 * request.
 *
 * ### Conditional request headers
 *
 * Consider the following when using request headers:
 *
 * - If both of the `If-Match` and `If-Unmodified-Since` headers are
 * present in the request as follows, then Amazon S3 returns the HTTP status code `200 OK`
 * and the data requested:
 *
 * - `If-Match` condition evaluates to `true`.
 *
 * - `If-Unmodified-Since` condition evaluates to `false`.
 *
 * For more information about conditional requests, see RFC 7232.
 *
 * - If both of the `If-None-Match` and `If-Modified-Since` headers are
 * present in the request as follows, then Amazon S3 returns the HTTP status code 304 Not
 * Modified:
 *
 * - `If-None-Match` condition evaluates to `false`.
 *
 * - `If-Modified-Since` condition evaluates to `true`.
 *
 * For more information about conditional requests, see RFC 7232.
 *
 * ### HTTP Host header syntax
 *
 * **Directory buckets ** - The HTTP Host header syntax is
 * *Bucket-name*.s3express-*zone-id*.*region-code*.amazonaws.com.
 *
 * The following actions are related to `GetObjectAttributes`:
 *
 * - GetObject
 *
 * - GetObjectAcl
 *
 * - GetObjectLegalHold
 *
 * - GetObjectLockConfiguration
 *
 * - GetObjectRetention
 *
 * - GetObjectTagging
 *
 * - HeadObject
 *
 * - ListParts
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const getObjectAttributes: API.OperationMethod<
  GetObjectAttributesRequest,
  GetObjectAttributesOutput,
  GetObjectAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(113, __c7, 1) as any as S.Schema<GetObjectAttributesRequest>,
  output: __S(118, __c7, 6) as any as S.Schema<GetObjectAttributesOutput>,
  errors: [NoSuchKey, NoSuchVersion, MethodNotAllowed, InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetObjectAttributes",
  telemetry: TELEMETRY,
  span: "GetObjectAttributes",
}));

export type GetObjectLegalHoldError =
  | RequestLimitExceeded
  | SlowDown
  | InvalidRequest
  | NoSuchKey
  | NoSuchVersion
  | MethodNotAllowed
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * This operation is not supported for directory buckets.
 *
 * Gets an object's current legal hold status. For more information, see Locking Objects.
 *
 * This functionality is not supported for Amazon S3 on Outposts.
 *
 * The following action is related to `GetObjectLegalHold`:
 *
 * - GetObjectAttributes
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const getObjectLegalHold: API.OperationMethod<
  GetObjectLegalHoldRequest,
  GetObjectLegalHoldOutput,
  GetObjectLegalHoldError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c8, 0) as any as S.Schema<GetObjectLegalHoldRequest>,
  output: __S(129, __c8, 1) as any as S.Schema<GetObjectLegalHoldOutput>,
  errors: [
    RequestLimitExceeded,
    SlowDown,
    InvalidRequest,
    NoSuchKey,
    NoSuchVersion,
    MethodNotAllowed,
    InvalidAccessKeyId,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetObjectLegalHold",
  telemetry: TELEMETRY,
  span: "GetObjectLegalHold",
}));

export type GetObjectLockConfigurationError =
  | RequestLimitExceeded
  | SlowDown
  | NoSuchBucket
  | ObjectLockConfigurationNotFoundError
  | PermanentRedirect
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * This operation is not supported for directory buckets.
 *
 * Gets the Object Lock configuration for a bucket. The rule specified in the Object Lock configuration
 * will be applied by default to every new object placed in the specified bucket. For more information, see
 * Locking Objects.
 *
 * The following action is related to `GetObjectLockConfiguration`:
 *
 * - GetObjectAttributes
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const getObjectLockConfiguration: API.OperationMethod<
  GetObjectLockConfigurationRequest,
  GetObjectLockConfigurationOutput,
  GetObjectLockConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c10, 0) as any as S.Schema<GetObjectLockConfigurationRequest>,
  output: __S(161, __c10, 1) as any as S.Schema<GetObjectLockConfigurationOutput>,
  errors: [
    RequestLimitExceeded,
    SlowDown,
    NoSuchBucket,
    ObjectLockConfigurationNotFoundError,
    PermanentRedirect,
    InvalidAccessKeyId,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetObjectLockConfiguration",
  telemetry: TELEMETRY,
  span: "GetObjectLockConfiguration",
}));

export type GetObjectRetentionError =
  | RequestLimitExceeded
  | SlowDown
  | InvalidRequest
  | NoSuchKey
  | NoSuchVersion
  | MethodNotAllowed
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * This operation is not supported for directory buckets.
 *
 * Retrieves an object's retention settings. For more information, see Locking Objects.
 *
 * This functionality is not supported for Amazon S3 on Outposts.
 *
 * The following action is related to `GetObjectRetention`:
 *
 * - GetObjectAttributes
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const getObjectRetention: API.OperationMethod<
  GetObjectRetentionRequest,
  GetObjectRetentionOutput,
  GetObjectRetentionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(208, __c13, 0) as any as S.Schema<GetObjectRetentionRequest>,
  output: __S(209, __c13, 1) as any as S.Schema<GetObjectRetentionOutput>,
  errors: [
    RequestLimitExceeded,
    SlowDown,
    InvalidRequest,
    NoSuchKey,
    NoSuchVersion,
    MethodNotAllowed,
    InvalidAccessKeyId,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetObjectRetention",
  telemetry: TELEMETRY,
  span: "GetObjectRetention",
}));

export type GetObjectTaggingError =
  | RequestLimitExceeded
  | SlowDown
  | NoSuchBucket
  | NoSuchKey
  | PermanentRedirect
  | NoSuchVersion
  | MethodNotAllowed
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * This operation is not supported for directory buckets.
 *
 * Returns the tag-set of an object. You send the GET request against the tagging subresource
 * associated with the object.
 *
 * To use this operation, you must have permission to perform the `s3:GetObjectTagging`
 * action. By default, the GET action returns information about current version of an object. For a
 * versioned bucket, you can have multiple versions of an object in your bucket. To retrieve tags of any
 * other version, use the versionId query parameter. You also need permission for the
 * `s3:GetObjectVersionTagging` action.
 *
 * By default, the bucket owner has this permission and can grant this permission to others.
 *
 * For information about the Amazon S3 object tagging feature, see Object Tagging.
 *
 * The following actions are related to `GetObjectTagging`:
 *
 * - DeleteObjectTagging
 *
 * - GetObjectAttributes
 *
 * - PutObjectTagging
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const getObjectTagging: API.OperationMethod<
  GetObjectTaggingRequest,
  GetObjectTaggingOutput,
  GetObjectTaggingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(240, __c15, 0) as any as S.Schema<GetObjectTaggingRequest>,
  output: __S(241, __c15, 1) as any as S.Schema<GetObjectTaggingOutput>,
  errors: [
    RequestLimitExceeded,
    SlowDown,
    NoSuchBucket,
    NoSuchKey,
    PermanentRedirect,
    NoSuchVersion,
    MethodNotAllowed,
    InvalidAccessKeyId,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetObjectTagging",
  telemetry: TELEMETRY,
  span: "GetObjectTagging",
}));

export type GetObjectTorrentError = InvalidAccessKeyId | CommonErrors;
/**
 * This operation is not supported for directory buckets.
 *
 * Returns torrent files from a bucket. BitTorrent can save you bandwidth when you're distributing
 * large files.
 *
 * You can get torrent only for objects that are less than 5 GB in size, and that are not encrypted
 * using server-side encryption with a customer-provided encryption key.
 *
 * To use GET, you must have READ access to the object.
 *
 * This functionality is not supported for Amazon S3 on Outposts.
 *
 * The following action is related to `GetObjectTorrent`:
 *
 * - GetObject
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const getObjectTorrent: API.OperationMethod<
  GetObjectTorrentRequest,
  GetObjectTorrentOutput,
  GetObjectTorrentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c16, 0) as any as S.Schema<GetObjectTorrentRequest>,
  output: __S(257, __c16, 1) as any as S.Schema<GetObjectTorrentOutput>,
  errors: [InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetObjectTorrent",
  telemetry: TELEMETRY,
  span: "GetObjectTorrent",
}));

export type GetPublicAccessBlockError =
  | RequestLimitExceeded
  | SlowDown
  | NoSuchBucket
  | NoSuchPublicAccessBlockConfiguration
  | PermanentRedirect
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * This operation is not supported for directory buckets.
 *
 * Retrieves the `PublicAccessBlock` configuration for an Amazon S3 bucket. This
 * operation returns the bucket-level configuration only. To understand the effective public
 * access behavior, you must also consider account-level settings (which may inherit from
 * organization-level policies). To use this operation, you must have the
 * `s3:GetBucketPublicAccessBlock` permission. For more information about Amazon S3
 * permissions, see Specifying Permissions in a
 * Policy.
 *
 * When Amazon S3 evaluates the `PublicAccessBlock` configuration for a bucket or an
 * object, it checks the `PublicAccessBlock` configuration for both the bucket (or
 * the bucket that contains the object) and the bucket owner's account. Account-level settings
 * automatically inherit from organization-level policies when present. If the
 * `PublicAccessBlock` settings are different between the bucket and the account,
 * Amazon S3 uses the most restrictive combination of the bucket-level and account-level
 * settings.
 *
 * For more information about when Amazon S3 considers a bucket or an object public, see The Meaning of "Public".
 *
 * The following operations are related to `GetPublicAccessBlock`:
 *
 * - Using Amazon S3 Block Public Access
 *
 * - PutPublicAccessBlock
 *
 * - GetPublicAccessBlock
 *
 * - DeletePublicAccessBlock
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const getPublicAccessBlock: API.OperationMethod<
  GetPublicAccessBlockRequest,
  GetPublicAccessBlockOutput,
  GetPublicAccessBlockError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(272, __c17, 0) as any as S.Schema<GetPublicAccessBlockRequest>,
  output: __S(273, __c17, 1) as any as S.Schema<GetPublicAccessBlockOutput>,
  errors: [
    RequestLimitExceeded,
    SlowDown,
    NoSuchBucket,
    NoSuchPublicAccessBlockConfiguration,
    PermanentRedirect,
    InvalidAccessKeyId,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPublicAccessBlock",
  telemetry: TELEMETRY,
  span: "GetPublicAccessBlock",
}));

export type HeadBucketError =
  | NotFound
  | RequestLimitExceeded
  | SlowDown
  | ParseError
  | NoSuchBucket
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * You can use this operation to determine if a bucket exists and if you have permission to access it.
 * The action returns a `200 OK` HTTP status code if the bucket exists and you have
 * permission to access it. You can make a `HeadBucket` call on any bucket name to any
 * Region in the partition, and regardless of the permissions on the bucket, you will receive a
 * response header with the correct bucket location so that you can then make a proper, signed request
 * to the appropriate Regional endpoint.
 *
 * If the bucket doesn't exist or you don't have permission to access it, the `HEAD`
 * request returns a generic `400 Bad Request`, `403 Forbidden`, or
 * `404 Not Found` HTTP status code. A message body isn't included, so you can't determine
 * the exception beyond these HTTP response codes.
 *
 * ### Authentication and authorization
 *
 * **General purpose buckets** - Request to public buckets that
 * grant the s3:ListBucket permission publicly do not need to be signed. All other
 * `HeadBucket` requests must be authenticated and signed by using IAM credentials
 * (access key ID and secret access key for the IAM identities). All headers with the
 * `x-amz-` prefix, including `x-amz-copy-source`, must be signed. For more
 * information, see REST Authentication.
 *
 * **Directory buckets** - You must use IAM credentials to
 * authenticate and authorize your access to the `HeadBucket` API operation, instead of
 * using the temporary security credentials through the `CreateSession` API
 * operation.
 *
 * Amazon Web Services CLI or SDKs handles authentication and authorization on your behalf.
 *
 * ### Permissions
 *
 * - **General purpose bucket permissions** - To use this
 * operation, you must have permissions to perform the `s3:ListBucket` action. The
 * bucket owner has this permission by default and can grant this permission to others. For more
 * information about permissions, see Managing access permissions to your
 * Amazon S3 resources in the *Amazon S3 User Guide*.
 *
 * - **Directory bucket permissions** - You must have the
 *
 * `s3express:CreateSession`
 * permission in the
 * `Action` element of a policy. If no session mode is specified, the session will be
 * created with the maximum allowable privilege, attempting `ReadWrite` first,
 * then `ReadOnly` if `ReadWrite` is not permitted. If you want to explicitly
 * restrict the access to be read-only, you can set the `s3express:SessionMode` condition key to
 * `ReadOnly` on the bucket.
 *
 * For more information about example bucket policies, see Example
 * bucket policies for S3 Express One Zone and Amazon Web Services
 * Identity and Access Management (IAM) identity-based policies for S3 Express One Zone in the
 * *Amazon S3 User Guide*.
 *
 * ### HTTP Host header syntax
 *
 * **Directory buckets ** - The HTTP Host header syntax is
 * *Bucket-name*.s3express-*zone-id*.*region-code*.amazonaws.com.
 *
 * You must make requests for this API operation to the Zonal endpoint. These endpoints support virtual-hosted-style requests in the format `https://*bucket-name*.s3express-*zone-id*.*region-code*.amazonaws.com`. Path-style requests are not supported. For more information about endpoints in Availability Zones, see Regional and Zonal endpoints for directory buckets in Availability Zones in the
 * *Amazon S3 User Guide*. For more information about endpoints in Local Zones, see Concepts for directory buckets in Local Zones in the
 * *Amazon S3 User Guide*.
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const headBucket: API.OperationMethod<
  HeadBucketRequest,
  HeadBucketOutput,
  HeadBucketError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(304, __c19, 0) as any as S.Schema<HeadBucketRequest>,
  output: __S(305, __c19, 1) as any as S.Schema<HeadBucketOutput>,
  errors: [NotFound, RequestLimitExceeded, SlowDown, ParseError, NoSuchBucket, InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "HeadBucket",
  telemetry: TELEMETRY,
  span: "HeadBucket",
}));

export type HeadObjectError =
  | NotFound
  | RequestLimitExceeded
  | SlowDown
  | ParseError
  | NoSuchBucket
  | MethodNotAllowed
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * The `HEAD` operation retrieves metadata from an object without returning the object
 * itself. This operation is useful if you're interested only in an object's metadata.
 *
 * A `HEAD` request has the same options as a `GET` operation on an object. The
 * response is identical to the `GET` response except that there is no response body. Because
 * of this, if the `HEAD` request generates an error, it returns a generic code, such as
 * `400 Bad Request`, `403 Forbidden`, `404 Not Found`, 405
 * Method Not Allowed, `412 Precondition Failed`, or `304 Not Modified`.
 * It's not possible to retrieve the exact exception of these error codes.
 *
 * Request headers are limited to 8 KB in size. For more information, see Common Request Headers.
 *
 * ### Permissions
 *
 * - **General purpose bucket permissions** - To use
 * `HEAD`, you must have the `s3:GetObject` permission. You need the
 * relevant read object (or version) permission for this operation. For more information, see
 * Actions, resources,
 * and condition keys for Amazon S3 in the *Amazon S3 User Guide*. For more
 * information about the permissions to S3 API operations by S3 resource types, see Required permissions for
 * Amazon S3 API operations in the *Amazon S3 User Guide*.
 *
 * If the object you request doesn't exist, the error that Amazon S3 returns depends on whether
 * you also have the `s3:ListBucket` permission.
 *
 * - If you have the `s3:ListBucket` permission on the bucket, Amazon S3 returns an
 * HTTP status code `404 Not Found` error.
 *
 * - If you don't have the `s3:ListBucket` permission, Amazon S3 returns an HTTP
 * status code `403 Forbidden` error.
 *
 * - **Directory bucket permissions** - To grant access to this API operation on a directory bucket, we recommend that you use the
 * `CreateSession`
 * API operation for session-based authorization. Specifically, you grant the `s3express:CreateSession` permission to the directory bucket in a bucket policy or an IAM identity-based policy. Then, you make the `CreateSession` API call on the bucket to obtain a session token. With the session token in your request header, you can make API requests to this operation. After the session token expires, you make another `CreateSession` API call to generate a new session token for use.
 * Amazon Web Services CLI or SDKs create session and refresh the session token automatically to avoid service interruptions when a session expires. For more information about authorization, see
 * `CreateSession`
 * .
 *
 * If you enable `x-amz-checksum-mode` in the request and the object is encrypted
 * with Amazon Web Services Key Management Service (Amazon Web Services KMS), you must also have the
 * `kms:GenerateDataKey` and `kms:Decrypt` permissions in IAM
 * identity-based policies and KMS key policies for the KMS key to retrieve the checksum of
 * the object.
 *
 * ### Encryption
 *
 * Encryption request headers, like `x-amz-server-side-encryption`, should not be
 * sent for `HEAD` requests if your object uses server-side encryption with Key Management Service
 * (KMS) keys (SSE-KMS), dual-layer server-side encryption with Amazon Web Services KMS keys (DSSE-KMS), or
 * server-side encryption with Amazon S3 managed encryption keys (SSE-S3). The
 * `x-amz-server-side-encryption` header is used when you `PUT` an object
 * to S3 and want to specify the encryption method. If you include this header in a
 * `HEAD` request for an object that uses these types of keys, you'll get an HTTP
 * `400 Bad Request` error. It's because the encryption method can't be changed when
 * you retrieve the object.
 *
 * If you encrypt an object by using server-side encryption with customer-provided encryption
 * keys (SSE-C) when you store the object in Amazon S3, then when you retrieve the metadata from the
 * object, you must use the following headers to provide the encryption key for the server to be able
 * to retrieve the object's metadata. The headers are:
 *
 * - `x-amz-server-side-encryption-customer-algorithm`
 *
 * - `x-amz-server-side-encryption-customer-key`
 *
 * - `x-amz-server-side-encryption-customer-key-MD5`
 *
 * For more information about SSE-C, see Server-Side Encryption (Using
 * Customer-Provided Encryption Keys) in the *Amazon S3 User Guide*.
 *
 * **Directory bucket ** -
 * For directory buckets, there are only two supported options for server-side encryption: SSE-S3 and SSE-KMS. SSE-C isn't supported. For more
 * information, see Protecting data with server-side encryption in the *Amazon S3 User Guide*.
 *
 * ### Versioning
 *
 * - If the current version of the object is a delete marker, Amazon S3 behaves as if the object was
 * deleted and includes `x-amz-delete-marker: true` in the response.
 *
 * - If the specified version is a delete marker, the response returns a 405 Method Not
 * Allowed error and the `Last-Modified: timestamp` response header.
 *
 * - **Directory buckets** -
 * Delete marker is not supported for directory buckets.
 *
 * - **Directory buckets** -
 * S3 Versioning isn't enabled and supported for directory buckets. For this API operation, only the `null` value of the version ID is supported by directory buckets. You can only specify `null` to the
 * `versionId` query parameter in the request.
 *
 * ### HTTP Host header syntax
 *
 * **Directory buckets ** - The HTTP Host header syntax is
 * *Bucket-name*.s3express-*zone-id*.*region-code*.amazonaws.com.
 *
 * For directory buckets, you must make requests for this API operation to the Zonal endpoint. These endpoints support virtual-hosted-style requests in the format https://*amzn-s3-demo-bucket*.s3express-*zone-id*.*region-code*.amazonaws.com/*key-name*
 * . Path-style requests are not supported. For more information about endpoints in Availability Zones, see Regional and Zonal endpoints for directory buckets in Availability Zones in the
 * *Amazon S3 User Guide*. For more information about endpoints in Local Zones, see Concepts for directory buckets in Local Zones in the
 * *Amazon S3 User Guide*.
 *
 * The following actions are related to `HeadObject`:
 *
 * - GetObject
 *
 * - GetObjectAttributes
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const headObject: API.OperationMethod<
  HeadObjectRequest,
  HeadObjectOutput,
  HeadObjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c20, 0) as any as S.Schema<HeadObjectRequest>,
  output: __S(321, __c20, 1) as any as S.Schema<HeadObjectOutput>,
  errors: [
    NotFound,
    RequestLimitExceeded,
    SlowDown,
    ParseError,
    NoSuchBucket,
    MethodNotAllowed,
    InvalidAccessKeyId,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "HeadObject",
  telemetry: TELEMETRY,
  span: { op: "HeadObject", input: { PartNumber: [{ name: "aws.s3.part_number" }] } },
}));

export type ListBucketAnalyticsConfigurationsError =
  | RequestLimitExceeded
  | SlowDown
  | NoSuchBucket
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * This operation is not supported for directory buckets.
 *
 * Lists the analytics configurations for the bucket. You can have up to 1,000 analytics configurations
 * per bucket.
 *
 * This action supports list pagination and does not return more than 100 configurations at a time. You
 * should always check the `IsTruncated` element in the response. If there are no more
 * configurations to list, `IsTruncated` is set to false. If there are more configurations to
 * list, `IsTruncated` is set to true, and there will be a value in
 * `NextContinuationToken`. You use the `NextContinuationToken` value to continue
 * the pagination of the list by passing the value in continuation-token in the request to `GET`
 * the next page.
 *
 * To use this operation, you must have permissions to perform the
 * `s3:GetAnalyticsConfiguration` action. The bucket owner has this permission by default. The
 * bucket owner can grant this permission to others. For more information about permissions, see Permissions Related to Bucket Subresource Operations and Managing Access Permissions to Your Amazon S3
 * Resources.
 *
 * For information about Amazon S3 analytics feature, see Amazon S3 Analytics - Storage Class
 * Analysis.
 *
 * The following operations are related to `ListBucketAnalyticsConfigurations`:
 *
 * - GetBucketAnalyticsConfiguration
 *
 * - DeleteBucketAnalyticsConfiguration
 *
 * - PutBucketAnalyticsConfiguration
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const listBucketAnalyticsConfigurations: API.OperationMethod<
  ListBucketAnalyticsConfigurationsRequest,
  ListBucketAnalyticsConfigurationsOutput,
  ListBucketAnalyticsConfigurationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(336, __c21, 0) as any as S.Schema<ListBucketAnalyticsConfigurationsRequest>,
  output: __S(338, __c21, 2) as any as S.Schema<ListBucketAnalyticsConfigurationsOutput>,
  errors: [RequestLimitExceeded, SlowDown, NoSuchBucket, InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBucketAnalyticsConfigurations",
  telemetry: TELEMETRY,
  span: "ListBucketAnalyticsConfigurations",
}));

export type ListBucketIntelligentTieringConfigurationsError =
  | RequestLimitExceeded
  | SlowDown
  | NoSuchBucket
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * This operation is not supported for directory buckets.
 *
 * Lists the S3 Intelligent-Tiering configuration from the specified bucket.
 *
 * The S3 Intelligent-Tiering storage class is designed to optimize storage costs by automatically moving data to the most cost-effective storage access tier, without performance impact or operational overhead. S3 Intelligent-Tiering delivers automatic cost savings in three low latency and high throughput access tiers. To get the lowest storage cost on data that can be accessed in minutes to hours, you can choose to activate additional archiving capabilities.
 *
 * The S3 Intelligent-Tiering storage class is the ideal storage class for data with unknown, changing, or unpredictable access patterns, independent of object size or retention period. If the size of an object is less than 128 KB, it is not monitored and not eligible for auto-tiering. Smaller objects can be stored, but they are always charged at the Frequent Access tier rates in the S3 Intelligent-Tiering storage class.
 *
 * For more information, see Storage class for automatically optimizing frequently and infrequently accessed objects.
 *
 * Operations related to `ListBucketIntelligentTieringConfigurations` include:
 *
 * - DeleteBucketIntelligentTieringConfiguration
 *
 * - PutBucketIntelligentTieringConfiguration
 *
 * - GetBucketIntelligentTieringConfiguration
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const listBucketIntelligentTieringConfigurations: API.OperationMethod<
  ListBucketIntelligentTieringConfigurationsRequest,
  ListBucketIntelligentTieringConfigurationsOutput,
  ListBucketIntelligentTieringConfigurationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c22, 0) as any as S.Schema<ListBucketIntelligentTieringConfigurationsRequest>,
  output: __S(354, __c22, 2) as any as S.Schema<ListBucketIntelligentTieringConfigurationsOutput>,
  errors: [RequestLimitExceeded, SlowDown, NoSuchBucket, InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBucketIntelligentTieringConfigurations",
  telemetry: TELEMETRY,
  span: "ListBucketIntelligentTieringConfigurations",
}));

export type ListBucketInventoryConfigurationsError =
  | RequestLimitExceeded
  | SlowDown
  | NoSuchBucket
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * Returns a list of S3 Inventory configurations for the bucket. You can have up to 1,000 inventory
 * configurations per bucket.
 *
 * This action supports list pagination and does not return more than 100 configurations at a time.
 * Always check the `IsTruncated` element in the response. If there are no more configurations
 * to list, `IsTruncated` is set to false. If there are more configurations to list,
 * `IsTruncated` is set to true, and there is a value in `NextContinuationToken`.
 * You use the `NextContinuationToken` value to continue the pagination of the list by passing
 * the value in continuation-token in the request to `GET` the next page.
 *
 * **Directory buckets ** - For directory buckets, you must make requests for this API operation to the Regional endpoint. These endpoints support path-style requests in the format https://s3express-control.*region-code*.amazonaws.com/*bucket-name*
 * . Virtual-hosted-style requests aren't supported.
 * For more information about endpoints in Availability Zones, see Regional and Zonal endpoints for directory buckets in Availability Zones in the
 * *Amazon S3 User Guide*. For more information about endpoints in Local Zones, see Concepts for directory buckets in Local Zones in the
 * *Amazon S3 User Guide*.
 *
 * ### Permissions
 *
 * To use this operation, you must have permissions to perform the
 * `s3:GetInventoryConfiguration` action. The bucket owner has this permission by default. The
 * bucket owner can grant this permission to others. For more information about permissions, see Permissions Related to Bucket Subresource Operations and Managing Access Permissions to Your Amazon S3
 * Resources.
 *
 * - **General purpose bucket permissions** - The
 * `s3:GetInventoryConfiguration` permission is required in a policy. For more information
 * about general purpose buckets permissions, see Using Bucket Policies and User
 * Policies in the *Amazon S3 User Guide*.
 *
 * - **Directory bucket permissions** - To grant access to
 * this API operation, you must have the `s3express:GetInventoryConfiguration` permission in
 * an IAM identity-based policy instead of a bucket policy.
 * For more information about directory bucket policies and permissions, see Amazon Web Services Identity and Access Management (IAM) for S3 Express One Zone in the *Amazon S3 User Guide*.
 *
 * ### HTTP Host header syntax
 *
 * **Directory buckets ** - The HTTP Host header syntax is `s3express-control.*region-code*.amazonaws.com`.
 *
 * For information about the Amazon S3 inventory feature, see Amazon S3 Inventory
 *
 * The following operations are related to `ListBucketInventoryConfigurations`:
 *
 * - GetBucketInventoryConfiguration
 *
 * - DeleteBucketInventoryConfiguration
 *
 * - PutBucketInventoryConfiguration
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const listBucketInventoryConfigurations: API.OperationMethod<
  ListBucketInventoryConfigurationsRequest,
  ListBucketInventoryConfigurationsOutput,
  ListBucketInventoryConfigurationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(368, __c23, 0) as any as S.Schema<ListBucketInventoryConfigurationsRequest>,
  output: __S(370, __c23, 2) as any as S.Schema<ListBucketInventoryConfigurationsOutput>,
  errors: [RequestLimitExceeded, SlowDown, NoSuchBucket, InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBucketInventoryConfigurations",
  telemetry: TELEMETRY,
  span: "ListBucketInventoryConfigurations",
}));

export type ListBucketMetricsConfigurationsError =
  | RequestLimitExceeded
  | SlowDown
  | NoSuchBucket
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * Lists the metrics configurations for the bucket. The metrics configurations are only for the request
 * metrics of the bucket and do not provide information on daily storage metrics. You can have up to 1,000
 * configurations per bucket.
 *
 * **Directory buckets ** - For directory buckets, you must make requests for this API operation to the Regional endpoint. These endpoints support path-style requests in the format https://s3express-control.*region-code*.amazonaws.com/*bucket-name*
 * . Virtual-hosted-style requests aren't supported.
 * For more information about endpoints in Availability Zones, see Regional and Zonal endpoints for directory buckets in Availability Zones in the
 * *Amazon S3 User Guide*. For more information about endpoints in Local Zones, see Concepts for directory buckets in Local Zones in the
 * *Amazon S3 User Guide*.
 *
 * This action supports list pagination and does not return more than 100 configurations at a time.
 * Always check the `IsTruncated` element in the response. If there are no more configurations
 * to list, `IsTruncated` is set to false. If there are more configurations to list,
 * `IsTruncated` is set to true, and there is a value in `NextContinuationToken`.
 * You use the `NextContinuationToken` value to continue the pagination of the list by passing
 * the value in `continuation-token` in the request to `GET` the next page.
 *
 * ### Permissions
 *
 * To use this operation, you must have permissions to perform the
 * `s3:GetMetricsConfiguration` action. The bucket owner has this permission by default. The
 * bucket owner can grant this permission to others. For more information about permissions, see Permissions Related to Bucket Subresource Operations and Managing Access Permissions to Your Amazon S3
 * Resources.
 *
 * - **General purpose bucket permissions** - The
 * `s3:GetMetricsConfiguration` permission is required in a policy. For more information
 * about general purpose buckets permissions, see Using Bucket Policies and User
 * Policies in the *Amazon S3 User Guide*.
 *
 * - **Directory bucket permissions** - To grant access to
 * this API operation, you must have the `s3express:GetMetricsConfiguration` permission in
 * an IAM identity-based policy instead of a bucket policy. Cross-account access to this API operation isn't supported. This operation can only be performed by the Amazon Web Services account that owns the resource.
 * For more information about directory bucket policies and permissions, see Amazon Web Services Identity and Access Management (IAM) for S3 Express One Zone in the *Amazon S3 User Guide*.
 *
 * ### HTTP Host header syntax
 *
 * **Directory buckets ** - The HTTP Host header syntax is `s3express-control.*region-code*.amazonaws.com`.
 *
 * For more information about metrics configurations and CloudWatch request metrics, see Monitoring Metrics with
 * Amazon CloudWatch.
 *
 * The following operations are related to `ListBucketMetricsConfigurations`:
 *
 * - PutBucketMetricsConfiguration
 *
 * - GetBucketMetricsConfiguration
 *
 * - DeleteBucketMetricsConfiguration
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const listBucketMetricsConfigurations: API.OperationMethod<
  ListBucketMetricsConfigurationsRequest,
  ListBucketMetricsConfigurationsOutput,
  ListBucketMetricsConfigurationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(384, __c24, 0) as any as S.Schema<ListBucketMetricsConfigurationsRequest>,
  output: __S(386, __c24, 2) as any as S.Schema<ListBucketMetricsConfigurationsOutput>,
  errors: [RequestLimitExceeded, SlowDown, NoSuchBucket, InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBucketMetricsConfigurations",
  telemetry: TELEMETRY,
  span: "ListBucketMetricsConfigurations",
}));

export type ListBucketsError =
  | RequestLimitExceeded
  | SlowDown
  | RequestError
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * This operation is not supported for directory buckets.
 *
 * Returns a list of all buckets owned by the authenticated sender of the request. To grant IAM
 * permission to use this operation, you must add the `s3:ListAllMyBuckets` policy action.
 *
 * For information about Amazon S3 buckets, see Creating, configuring, and working with Amazon S3
 * buckets.
 *
 * We strongly recommend using only paginated `ListBuckets` requests. Unpaginated
 * `ListBuckets` requests are only supported for Amazon Web Services accounts set to the default general
 * purpose bucket quota of 10,000. If you have an approved general purpose bucket quota above 10,000, you
 * must send paginated `ListBuckets` requests to list your account's buckets. All unpaginated
 * `ListBuckets` requests will be rejected for Amazon Web Services accounts with a general purpose bucket
 * quota greater than 10,000.
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const listBuckets: API.PaginatedOperationMethod<
  ListBucketsRequest,
  ListBucketsOutput,
  ListBucketsError,
  Credentials | HttpClient.HttpClient,
  Bucket
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(400, __c25, 0) as any as S.Schema<ListBucketsRequest>,
  output: __S(401, __c25, 1) as any as S.Schema<ListBucketsOutput>,
  errors: [RequestLimitExceeded, SlowDown, RequestError, InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBuckets",
  pagination: {
    inputToken: "ContinuationToken",
    outputToken: "ContinuationToken",
    items: "Buckets",
    pageSize: "MaxBuckets",
  } as const,
  telemetry: TELEMETRY,
  span: "ListBuckets",
})) as any;

export type ListDirectoryBucketsError = InvalidAccessKeyId | CommonErrors;
/**
 * Returns a list of all Amazon S3 directory buckets owned by the authenticated sender of the request. For
 * more information about directory buckets, see Directory buckets in the
 * *Amazon S3 User Guide*.
 *
 * **Directory buckets ** - For directory buckets, you must make requests for this API operation to the Regional endpoint. These endpoints support path-style requests in the format https://s3express-control.*region-code*.amazonaws.com/*bucket-name*
 * . Virtual-hosted-style requests aren't supported.
 * For more information about endpoints in Availability Zones, see Regional and Zonal endpoints for directory buckets in Availability Zones in the
 * *Amazon S3 User Guide*. For more information about endpoints in Local Zones, see Concepts for directory buckets in Local Zones in the
 * *Amazon S3 User Guide*.
 *
 * ### Permissions
 *
 * You must have the `s3express:ListAllMyDirectoryBuckets` permission in
 * an IAM identity-based policy instead of a bucket policy. Cross-account access to this API operation isn't supported. This operation can only be performed by the Amazon Web Services account that owns the resource.
 * For more information about directory bucket policies and permissions, see Amazon Web Services Identity and Access Management (IAM) for S3 Express One Zone in the *Amazon S3 User Guide*.
 *
 * ### HTTP Host header syntax
 *
 * **Directory buckets ** - The HTTP Host header syntax is
 * `s3express-control.*region*.amazonaws.com`.
 *
 * The `BucketRegion` response element is not part of the
 * `ListDirectoryBuckets` Response Syntax.
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const listDirectoryBuckets: API.PaginatedOperationMethod<
  ListDirectoryBucketsRequest,
  ListDirectoryBucketsOutput,
  ListDirectoryBucketsError,
  Credentials | HttpClient.HttpClient,
  Bucket
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(432, __c27, 0) as any as S.Schema<ListDirectoryBucketsRequest>,
  output: __S(433, __c27, 1) as any as S.Schema<ListDirectoryBucketsOutput>,
  errors: [InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDirectoryBuckets",
  pagination: {
    inputToken: "ContinuationToken",
    outputToken: "ContinuationToken",
    items: "Buckets",
    pageSize: "MaxDirectoryBuckets",
  } as const,
  telemetry: TELEMETRY,
  span: "ListDirectoryBuckets",
})) as any;

export type ListMultipartUploadsError =
  | RequestLimitExceeded
  | SlowDown
  | NoSuchBucket
  | PermanentRedirect
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * This operation lists in-progress multipart uploads in a bucket. An in-progress multipart upload is a
 * multipart upload that has been initiated by the `CreateMultipartUpload` request, but has not
 * yet been completed or aborted.
 *
 * **Directory buckets** - If multipart uploads in a
 * directory bucket are in progress, you can't delete the bucket until all the in-progress multipart
 * uploads are aborted or completed. To delete these in-progress multipart uploads, use the
 * `ListMultipartUploads` operation to list the in-progress multipart uploads in the bucket
 * and use the `AbortMultipartUpload` operation to abort all the in-progress multipart
 * uploads.
 *
 * The `ListMultipartUploads` operation returns a maximum of 1,000 multipart uploads in the
 * response. The limit of 1,000 multipart uploads is also the default value. You can further limit the
 * number of uploads in a response by specifying the `max-uploads` request parameter. If there
 * are more than 1,000 multipart uploads that satisfy your `ListMultipartUploads` request, the
 * response returns an `IsTruncated` element with the value of `true`, a
 * `NextKeyMarker` element, and a `NextUploadIdMarker` element. To list the
 * remaining multipart uploads, you need to make subsequent `ListMultipartUploads` requests. In
 * these requests, include two query parameters: `key-marker` and `upload-id-marker`.
 * Set the value of `key-marker` to the `NextKeyMarker` value from the previous
 * response. Similarly, set the value of `upload-id-marker` to the
 * `NextUploadIdMarker` value from the previous response.
 *
 * **Directory buckets** - The `upload-id-marker`
 * element and the `NextUploadIdMarker` element aren't supported by directory buckets. To
 * list the additional multipart uploads, you only need to set the value of `key-marker` to
 * the `NextKeyMarker` value from the previous response.
 *
 * For more information about multipart uploads, see Uploading Objects Using Multipart Upload in
 * the *Amazon S3 User Guide*.
 *
 * **Directory buckets** - For directory buckets, you must make requests for this API operation to the Zonal endpoint. These endpoints support virtual-hosted-style requests in the format https://*amzn-s3-demo-bucket*.s3express-*zone-id*.*region-code*.amazonaws.com/*key-name*
 * . Path-style requests are not supported. For more information about endpoints in Availability Zones, see Regional and Zonal endpoints for directory buckets in Availability Zones in the
 * *Amazon S3 User Guide*. For more information about endpoints in Local Zones, see Concepts for directory buckets in Local Zones in the
 * *Amazon S3 User Guide*.
 *
 * ### Permissions
 *
 * - **General purpose bucket permissions** - For information
 * about permissions required to use the multipart upload API, see Multipart Upload and Permissions in
 * the *Amazon S3 User Guide*.
 *
 * - **Directory bucket permissions** - To grant access to this API operation on a directory bucket, we recommend that you use the
 * `CreateSession`
 * API operation for session-based authorization. Specifically, you grant the `s3express:CreateSession` permission to the directory bucket in a bucket policy or an IAM identity-based policy. Then, you make the `CreateSession` API call on the bucket to obtain a session token. With the session token in your request header, you can make API requests to this operation. After the session token expires, you make another `CreateSession` API call to generate a new session token for use.
 * Amazon Web Services CLI or SDKs create session and refresh the session token automatically to avoid service interruptions when a session expires. For more information about authorization, see
 * `CreateSession`
 * .
 *
 * ### Sorting of multipart uploads in response
 *
 * - **General purpose bucket** - In the
 * `ListMultipartUploads` response, the multipart uploads are sorted based on two
 * criteria:
 *
 * - Key-based sorting - Multipart uploads are initially sorted in ascending order
 * based on their object keys.
 *
 * - Time-based sorting - For uploads that share the same object key, they are
 * further sorted in ascending order based on the upload initiation time. Among uploads with
 * the same key, the one that was initiated first will appear before the ones that were
 * initiated later.
 *
 * - **Directory bucket** - In the
 * `ListMultipartUploads` response, the multipart uploads aren't sorted
 * lexicographically based on the object keys.
 *
 * ### HTTP Host header syntax
 *
 * **Directory buckets ** - The HTTP Host header syntax is
 * *Bucket-name*.s3express-*zone-id*.*region-code*.amazonaws.com.
 *
 * The following operations are related to `ListMultipartUploads`:
 *
 * - CreateMultipartUpload
 *
 * - UploadPart
 *
 * - CompleteMultipartUpload
 *
 * - ListParts
 *
 * - AbortMultipartUpload
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const listMultipartUploads: API.OperationMethod<
  ListMultipartUploadsRequest,
  ListMultipartUploadsOutput,
  ListMultipartUploadsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(448, __c28, 0) as any as S.Schema<ListMultipartUploadsRequest>,
  output: __S(451, __c28, 3) as any as S.Schema<ListMultipartUploadsOutput>,
  errors: [RequestLimitExceeded, SlowDown, NoSuchBucket, PermanentRedirect, InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMultipartUploads",
  telemetry: TELEMETRY,
  span: "ListMultipartUploads",
}));

export type ListObjectAnnotationsError =
  | InvalidPrefix
  | NoSuchBucket
  | NoSuchKey
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * Lists the annotations attached to an Amazon S3 object. Results are paginated, with a maximum of
 * 1,000 annotations per object. Use the `AnnotationPrefix` parameter to filter the
 * results by name prefix.
 *
 * To use this operation, you must have the `s3:ListObjectAnnotations` permission.
 *
 * Annotations are not supported by the following features: S3 Inventory Reports,
 * API Gateway, S3 Storage Lens, Amazon S3 File Gateway, Amazon FSx, S3 on Outposts, and
 * S3 Express One Zone (directory buckets).
 *
 * The following operations are related to `ListObjectAnnotations`:
 *
 * - PutObjectAnnotation
 *
 * - GetObjectAnnotation
 *
 * - DeleteObjectAnnotation
 */
export const listObjectAnnotations: API.PaginatedOperationMethod<
  ListObjectAnnotationsRequest,
  ListObjectAnnotationsOutput,
  ListObjectAnnotationsError,
  Credentials | HttpClient.HttpClient,
  AnnotationEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(496, __c31, 0) as any as S.Schema<ListObjectAnnotationsRequest>,
  output: __S(499, __c31, 3) as any as S.Schema<ListObjectAnnotationsOutput>,
  errors: [InvalidPrefix, NoSuchBucket, NoSuchKey, InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListObjectAnnotations",
  pagination: {
    inputToken: "ContinuationToken",
    outputToken: "NextContinuationToken",
    items: "Annotations",
    pageSize: "MaxAnnotationResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListObjectAnnotations",
})) as any;

export type ListObjectsError =
  | NoSuchBucket
  | RequestLimitExceeded
  | SlowDown
  | PermanentRedirect
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * This operation is not supported for directory buckets.
 *
 * Returns some or all (up to 1,000) of the objects in a bucket. You can use the request parameters as
 * selection criteria to return a subset of the objects in a bucket. A 200 OK response can contain valid or
 * invalid XML. Be sure to design your application to parse the contents of the response and handle it
 * appropriately.
 *
 * This action has been revised. We recommend that you use the newer version, ListObjectsV2, when
 * developing applications. For backward compatibility, Amazon S3 continues to support
 * `ListObjects`.
 *
 * The following operations are related to `ListObjects`:
 *
 * - ListObjectsV2
 *
 * - GetObject
 *
 * - PutObject
 *
 * - CreateBucket
 *
 * - ListBuckets
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const listObjects: API.OperationMethod<
  ListObjectsRequest,
  ListObjectsOutput,
  ListObjectsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(528, __c33, 0) as any as S.Schema<ListObjectsRequest>,
  output: __S(529, __c33, 1) as any as S.Schema<ListObjectsOutput>,
  errors: [NoSuchBucket, RequestLimitExceeded, SlowDown, PermanentRedirect, InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListObjects",
  telemetry: TELEMETRY,
  span: "ListObjects",
}));

export type ListObjectsV2Error =
  | NoSuchBucket
  | RequestLimitExceeded
  | SlowDown
  | PermanentRedirect
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * Returns some or all (up to 1,000) of the objects in a bucket with each request. You can use the
 * request parameters as selection criteria to return a subset of the objects in a bucket. A 200
 * OK response can contain valid or invalid XML. Make sure to design your application to parse the
 * contents of the response and handle it appropriately. For more information about listing objects, see
 * Listing object
 * keys programmatically in the *Amazon S3 User Guide*. To get a list of your
 * buckets, see ListBuckets.
 *
 * - **General purpose bucket** - For general purpose buckets,
 * `ListObjectsV2` doesn't return prefixes that are related only to in-progress
 * multipart uploads.
 *
 * - **Directory buckets** - For directory buckets,
 * `ListObjectsV2` response includes the prefixes that are related only to in-progress
 * multipart uploads.
 *
 * - **Directory buckets** - For directory buckets, you must make requests for this API operation to the Zonal endpoint. These endpoints support virtual-hosted-style requests in the format https://*amzn-s3-demo-bucket*.s3express-*zone-id*.*region-code*.amazonaws.com/*key-name*
 * . Path-style requests are not supported. For more information about endpoints in Availability Zones, see Regional and Zonal endpoints for directory buckets in Availability Zones in the
 * *Amazon S3 User Guide*. For more information about endpoints in Local Zones, see Concepts for directory buckets in Local Zones in the
 * *Amazon S3 User Guide*.
 *
 * ### Permissions
 *
 * - **General purpose bucket permissions** - To use this
 * operation, you must have READ access to the bucket. You must have permission to perform the
 * `s3:ListBucket` action. The bucket owner has this permission by default and can
 * grant this permission to others. For more information about permissions, see Permissions Related to Bucket Subresource Operations and Managing Access
 * Permissions to Your Amazon S3 Resources in the
 * *Amazon S3 User Guide*.
 *
 * - **Directory bucket permissions** - To grant access to this API operation on a directory bucket, we recommend that you use the
 * `CreateSession`
 * API operation for session-based authorization. Specifically, you grant the `s3express:CreateSession` permission to the directory bucket in a bucket policy or an IAM identity-based policy. Then, you make the `CreateSession` API call on the bucket to obtain a session token. With the session token in your request header, you can make API requests to this operation. After the session token expires, you make another `CreateSession` API call to generate a new session token for use.
 * Amazon Web Services CLI or SDKs create session and refresh the session token automatically to avoid service interruptions when a session expires. For more information about authorization, see
 * `CreateSession`
 * .
 *
 * ### Sorting order of returned objects
 *
 * - **General purpose bucket** - For general purpose buckets,
 * `ListObjectsV2` returns objects in lexicographical order based on their key
 * names.
 *
 * - **Directory bucket** - For directory buckets,
 * `ListObjectsV2` does not return objects in lexicographical order.
 *
 * ### HTTP Host header syntax
 *
 * **Directory buckets ** - The HTTP Host header syntax is
 * *Bucket-name*.s3express-*zone-id*.*region-code*.amazonaws.com.
 *
 * This section describes the latest revision of this action. We recommend that you use this revised
 * API operation for application development. For backward compatibility, Amazon S3 continues to support the
 * prior version of this API operation, ListObjects.
 *
 * The following operations are related to `ListObjectsV2`:
 *
 * - GetObject
 *
 * - PutObject
 *
 * - CreateBucket
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const listObjectsV2: API.PaginatedOperationMethod<
  ListObjectsV2Request,
  ListObjectsV2Output,
  ListObjectsV2Error,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(576, __c36, 0) as any as S.Schema<ListObjectsV2Request>,
  output: __S(577, __c36, 1) as any as S.Schema<ListObjectsV2Output>,
  errors: [NoSuchBucket, RequestLimitExceeded, SlowDown, PermanentRedirect, InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListObjectsV2",
  pagination: {
    inputToken: "ContinuationToken",
    outputToken: "NextContinuationToken",
    pageSize: "MaxKeys",
  } as const,
  telemetry: TELEMETRY,
  span: "ListObjectsV2",
})) as any;

export type ListObjectVersionsError =
  | RequestLimitExceeded
  | SlowDown
  | NoSuchBucket
  | PermanentRedirect
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * This operation is not supported for directory buckets.
 *
 * Returns metadata about all versions of the objects in a bucket. You can also use request parameters
 * as selection criteria to return metadata about a subset of all the object versions.
 *
 * To use this operation, you must have permission to perform the `s3:ListBucketVersions`
 * action. Be aware of the name difference.
 *
 * A `200 OK` response can contain valid or invalid XML. Make sure to design your
 * application to parse the contents of the response and handle it appropriately.
 *
 * To use this operation, you must have READ access to the bucket.
 *
 * The following operations are related to `ListObjectVersions`:
 *
 * - ListObjectsV2
 *
 * - GetObject
 *
 * - PutObject
 *
 * - DeleteObject
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const listObjectVersions: API.OperationMethod<
  ListObjectVersionsRequest,
  ListObjectVersionsOutput,
  ListObjectVersionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(592, __c37, 0) as any as S.Schema<ListObjectVersionsRequest>,
  output: __S(597, __c37, 5) as any as S.Schema<ListObjectVersionsOutput>,
  errors: [RequestLimitExceeded, SlowDown, NoSuchBucket, PermanentRedirect, InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListObjectVersions",
  telemetry: TELEMETRY,
  span: "ListObjectVersions",
}));

export type ListPartsError =
  | RequestLimitExceeded
  | SlowDown
  | NoSuchBucket
  | NoSuchUpload
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * Lists the parts that have been uploaded for a specific multipart upload.
 *
 * To use this operation, you must provide the `upload ID` in the request. You obtain this
 * uploadID by sending the initiate multipart upload request through CreateMultipartUpload.
 *
 * The `ListParts` request returns a maximum of 1,000 uploaded parts. The limit of 1,000
 * parts is also the default value. You can restrict the number of parts in a response by specifying the
 * `max-parts` request parameter. If your multipart upload consists of more than 1,000 parts,
 * the response returns an `IsTruncated` field with the value of `true`, and a
 * `NextPartNumberMarker` element. To list remaining uploaded parts, in subsequent
 * `ListParts` requests, include the `part-number-marker` query string parameter
 * and set its value to the `NextPartNumberMarker` field value from the previous
 * response.
 *
 * For more information on multipart uploads, see Uploading Objects Using Multipart Upload in
 * the *Amazon S3 User Guide*.
 *
 * **Directory buckets** - For directory buckets, you must make requests for this API operation to the Zonal endpoint. These endpoints support virtual-hosted-style requests in the format https://*amzn-s3-demo-bucket*.s3express-*zone-id*.*region-code*.amazonaws.com/*key-name*
 * . Path-style requests are not supported. For more information about endpoints in Availability Zones, see Regional and Zonal endpoints for directory buckets in Availability Zones in the
 * *Amazon S3 User Guide*. For more information about endpoints in Local Zones, see Concepts for directory buckets in Local Zones in the
 * *Amazon S3 User Guide*.
 *
 * ### Permissions
 *
 * - **General purpose bucket permissions** - For information
 * about permissions required to use the multipart upload API, see Multipart Upload and Permissions in
 * the *Amazon S3 User Guide*.
 *
 * If the upload was created using server-side encryption with Key Management Service (KMS) keys
 * (SSE-KMS) or dual-layer server-side encryption with Amazon Web Services KMS keys (DSSE-KMS), you must have
 * permission to the `kms:Decrypt` action for the `ListParts` request to
 * succeed.
 *
 * - **Directory bucket permissions** - To grant access to this API operation on a directory bucket, we recommend that you use the
 * `CreateSession`
 * API operation for session-based authorization. Specifically, you grant the `s3express:CreateSession` permission to the directory bucket in a bucket policy or an IAM identity-based policy. Then, you make the `CreateSession` API call on the bucket to obtain a session token. With the session token in your request header, you can make API requests to this operation. After the session token expires, you make another `CreateSession` API call to generate a new session token for use.
 * Amazon Web Services CLI or SDKs create session and refresh the session token automatically to avoid service interruptions when a session expires. For more information about authorization, see
 * `CreateSession`
 * .
 *
 * ### HTTP Host header syntax
 *
 * **Directory buckets ** - The HTTP Host header syntax is
 * *Bucket-name*.s3express-*zone-id*.*region-code*.amazonaws.com.
 *
 * The following operations are related to `ListParts`:
 *
 * - CreateMultipartUpload
 *
 * - UploadPart
 *
 * - CompleteMultipartUpload
 *
 * - AbortMultipartUpload
 *
 * - GetObjectAttributes
 *
 * - ListMultipartUploads
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const listParts: API.PaginatedOperationMethod<
  ListPartsRequest,
  ListPartsOutput,
  ListPartsError,
  Credentials | HttpClient.HttpClient,
  Part
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(608, __c38, 0) as any as S.Schema<ListPartsRequest>,
  output: __S(611, __c38, 3) as any as S.Schema<ListPartsOutput>,
  errors: [RequestLimitExceeded, SlowDown, NoSuchBucket, NoSuchUpload, InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListParts",
  pagination: {
    inputToken: "PartNumberMarker",
    outputToken: "NextPartNumberMarker",
    items: "Parts",
    pageSize: "MaxParts",
  } as const,
  telemetry: TELEMETRY,
  span: { op: "ListParts", input: { UploadId: [{ name: "aws.s3.upload_id" }] } },
})) as any;

export type PutBucketAbacError = InvalidAccessKeyId | CommonErrors;
/**
 * Sets the attribute-based access control (ABAC) property of the general purpose bucket. You must have `s3:PutBucketABAC` permission to perform this action. When you enable ABAC, you can use tags for access control on your buckets. Additionally, when ABAC is enabled, you must use the TagResource and UntagResource actions to manage tags on your buckets. You can nolonger use the PutBucketTagging and DeleteBucketTagging actions to tag your bucket. For more information, see Enabling ABAC in general purpose buckets.
 */
export const putBucketAbac: API.OperationMethod<
  PutBucketAbacRequest,
  PutBucketAbacResponse,
  PutBucketAbacError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(624, __c39, 0) as any as S.Schema<PutBucketAbacRequest>,
  output: __S(625, __c39, 1) as any as S.Schema<PutBucketAbacResponse>,
  errors: [InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutBucketAbac",
  telemetry: TELEMETRY,
  span: "PutBucketAbac",
}));

export type PutBucketAccelerateConfigurationError =
  | RequestLimitExceeded
  | SlowDown
  | NoSuchBucket
  | PermanentRedirect
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * This operation is not supported for directory buckets.
 *
 * Sets the accelerate configuration of an existing bucket. Amazon S3 Transfer Acceleration is a
 * bucket-level feature that enables you to perform faster data transfers to Amazon S3.
 *
 * To use this operation, you must have permission to perform the
 * `s3:PutAccelerateConfiguration` action. The bucket owner has this permission by default.
 * The bucket owner can grant this permission to others. For more information about permissions, see Permissions Related to Bucket Subresource Operations and Managing Access Permissions to Your Amazon S3
 * Resources.
 *
 * The Transfer Acceleration state of a bucket can be set to one of the following two values:
 *
 * - Enabled - Enables accelerated data transfers to the bucket.
 *
 * - Suspended - Disables accelerated data transfers to the bucket.
 *
 * The GetBucketAccelerateConfiguration action returns the transfer acceleration state of a
 * bucket.
 *
 * After setting the Transfer Acceleration state of a bucket to Enabled, it might take up to thirty
 * minutes before the data transfer rates to the bucket increase.
 *
 * The name of the bucket used for Transfer Acceleration must be DNS-compliant and must not contain
 * periods (".").
 *
 * For more information about transfer acceleration, see Transfer Acceleration.
 *
 * The following operations are related to `PutBucketAccelerateConfiguration`:
 *
 * - GetBucketAccelerateConfiguration
 *
 * - CreateBucket
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const putBucketAccelerateConfiguration: API.OperationMethod<
  PutBucketAccelerateConfigurationRequest,
  PutBucketAccelerateConfigurationResponse,
  PutBucketAccelerateConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(641, __c40, 1) as any as S.Schema<PutBucketAccelerateConfigurationRequest>,
  output: __S(642, __c40, 2) as any as S.Schema<PutBucketAccelerateConfigurationResponse>,
  errors: [RequestLimitExceeded, SlowDown, NoSuchBucket, PermanentRedirect, InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutBucketAccelerateConfiguration",
  telemetry: TELEMETRY,
  span: "PutBucketAccelerateConfiguration",
}));

export type PutBucketAclError =
  | RequestLimitExceeded
  | SlowDown
  | NoSuchBucket
  | PermanentRedirect
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * End of support notice: As of October 1, 2025, Amazon S3 has discontinued support for Email Grantee Access Control Lists (ACLs). If you attempt to use an Email Grantee ACL in a request after October 1, 2025,
 * the request will receive an `HTTP 405` (Method Not Allowed) error.
 *
 * This change affects the following Amazon Web Services Regions: US East (N. Virginia), US West (N. California), US West (Oregon), Asia Pacific (Singapore), Asia Pacific (Sydney), Asia Pacific (Tokyo), Europe (Ireland), and South America (São Paulo).
 *
 * This operation is not supported for directory buckets.
 *
 * Sets the permissions on an existing bucket using access control lists (ACL). For more information,
 * see Using ACLs. To
 * set the ACL of a bucket, you must have the `WRITE_ACP` permission.
 *
 * You can use one of the following two ways to set a bucket's permissions:
 *
 * - Specify the ACL in the request body
 *
 * - Specify permissions using request headers
 *
 * You cannot specify access permission using both the body and the request headers.
 *
 * Depending on your application needs, you may choose to set the ACL on a bucket using either the
 * request body or the headers. For example, if you have an existing application that updates a bucket ACL
 * using the request body, then you can continue to use that approach.
 *
 * If your bucket uses the bucket owner enforced setting for S3 Object Ownership, ACLs are disabled
 * and no longer affect permissions. You must use policies to grant access to your bucket and the objects
 * in it. Requests to set ACLs or update ACLs fail and return the
 * `AccessControlListNotSupported` error code. Requests to read ACLs are still supported.
 * For more information, see Controlling object ownership in
 * the *Amazon S3 User Guide*.
 *
 * ### Permissions
 *
 * You can set access permissions by using one of the following methods:
 *
 * - Specify a canned ACL with the `x-amz-acl` request header. Amazon S3 supports a set
 * of predefined ACLs, known as *canned ACLs*. Each canned ACL has a
 * predefined set of grantees and permissions. Specify the canned ACL name as the value of
 * `x-amz-acl`. If you use this header, you cannot use other access control-specific
 * headers in your request. For more information, see Canned ACL.
 *
 * - Specify access permissions explicitly with the `x-amz-grant-read`,
 * `x-amz-grant-read-acp`, `x-amz-grant-write-acp`, and
 * `x-amz-grant-full-control` headers. When using these headers, you specify
 * explicit access permissions and grantees (Amazon Web Services accounts or Amazon S3 groups) who will receive the
 * permission. If you use these ACL-specific headers, you cannot use the `x-amz-acl`
 * header to set a canned ACL. These parameters map to the set of permissions that Amazon S3 supports
 * in an ACL. For more information, see Access Control List (ACL)
 * Overview.
 *
 * You specify each grantee as a type=value pair, where the type is one of the
 * following:
 *
 * - `id` - if the value specified is the canonical user ID of an
 * Amazon Web Services account
 *
 * - `uri` - if you are granting permissions to a predefined group
 *
 * - `emailAddress` - if the value specified is the email address of an
 * Amazon Web Services account
 *
 * Using email addresses to specify a grantee is only supported in the following Amazon Web Services Regions:
 *
 * - US East (N. Virginia)
 *
 * - US West (N. California)
 *
 * - US West (Oregon)
 *
 * - Asia Pacific (Singapore)
 *
 * - Asia Pacific (Sydney)
 *
 * - Asia Pacific (Tokyo)
 *
 * - Europe (Ireland)
 *
 * - South America (São Paulo)
 *
 * For a list of all the Amazon S3 supported Regions and endpoints, see Regions and Endpoints in the Amazon Web Services General Reference.
 *
 * For example, the following `x-amz-grant-write` header grants create, overwrite,
 * and delete objects permission to LogDelivery group predefined by Amazon S3 and two Amazon Web Services accounts
 * identified by their email addresses.
 *
 * x-amz-grant-write: uri="http://acs.amazonaws.com/groups/s3/LogDelivery",
 * id="111122223333", id="555566667777"
 *
 * You can use either a canned ACL or specify access permissions explicitly. You cannot do
 * both.
 *
 * ### Grantee Values
 *
 * You can specify the person (grantee) to whom you're assigning access rights (using request
 * elements) in the following ways. For examples of how to specify these grantee values in JSON
 * format, see the Amazon Web Services CLI example in Enabling Amazon S3 server
 * access logging in the *Amazon S3 User Guide*.
 *
 * - By the person's ID:
 *
 * <>ID<><>GranteesEmail<>
 *
 * DisplayName is optional and ignored in the request
 *
 * - By URI:
 *
 * <>http://acs.amazonaws.com/groups/global/AuthenticatedUsers<>
 *
 * - By Email address:
 *
 * <>Grantees@email.com<>&
 *
 * The grantee is resolved to the CanonicalUser and, in a response to a GET Object acl
 * request, appears as the CanonicalUser.
 *
 * Using email addresses to specify a grantee is only supported in the following Amazon Web Services Regions:
 *
 * - US East (N. Virginia)
 *
 * - US West (N. California)
 *
 * - US West (Oregon)
 *
 * - Asia Pacific (Singapore)
 *
 * - Asia Pacific (Sydney)
 *
 * - Asia Pacific (Tokyo)
 *
 * - Europe (Ireland)
 *
 * - South America (São Paulo)
 *
 * For a list of all the Amazon S3 supported Regions and endpoints, see Regions and Endpoints in the Amazon Web Services General Reference.
 *
 * The following operations are related to `PutBucketAcl`:
 *
 * - CreateBucket
 *
 * - DeleteBucket
 *
 * - GetObjectAcl
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const putBucketAcl: API.OperationMethod<
  PutBucketAclRequest,
  PutBucketAclResponse,
  PutBucketAclError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(656, __c41, 0) as any as S.Schema<PutBucketAclRequest>,
  output: __S(657, __c41, 1) as any as S.Schema<PutBucketAclResponse>,
  errors: [RequestLimitExceeded, SlowDown, NoSuchBucket, PermanentRedirect, InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutBucketAcl",
  telemetry: TELEMETRY,
  span: "PutBucketAcl",
}));

export type PutBucketAnalyticsConfigurationError = InvalidAccessKeyId | CommonErrors;
/**
 * This operation is not supported for directory buckets.
 *
 * Sets an analytics configuration for the bucket (specified by the analytics configuration ID). You
 * can have up to 1,000 analytics configurations per bucket.
 *
 * You can choose to have storage class analysis export analysis reports sent to a comma-separated
 * values (CSV) flat file. See the `DataExport` request element. Reports are updated daily and
 * are based on the object filters that you configure. When selecting data export, you specify a
 * destination bucket and an optional destination prefix where the file is written. You can export the data
 * to a destination bucket in a different account. However, the destination bucket must be in the same
 * Region as the bucket that you are making the PUT analytics configuration to. For more information, see
 * Amazon S3 Analytics -
 * Storage Class Analysis.
 *
 * You must create a bucket policy on the destination bucket where the exported file is written to
 * grant permissions to Amazon S3 to write objects to the bucket. For an example policy, see Granting
 * Permissions for Amazon S3 Inventory and Storage Class Analysis.
 *
 * To use this operation, you must have permissions to perform the
 * `s3:PutAnalyticsConfiguration` action. The bucket owner has this permission by default. The
 * bucket owner can grant this permission to others. For more information about permissions, see Permissions Related to Bucket Subresource Operations and Managing Access Permissions to Your Amazon S3
 * Resources.
 *
 * `PutBucketAnalyticsConfiguration` has the following special errors:
 *
 * -
 *
 * - *HTTP Error: HTTP 400 Bad Request*
 *
 * - *Code: InvalidArgument*
 *
 * - *Cause: Invalid argument.*
 *
 * -
 *
 * - *HTTP Error: HTTP 400 Bad Request*
 *
 * - *Code: TooManyConfigurations*
 *
 * - Cause: You are attempting to create a new configuration but have already reached
 * the 1,000-configuration limit.
 *
 * -
 *
 * - *HTTP Error: HTTP 403 Forbidden*
 *
 * - *Code: AccessDenied*
 *
 * - Cause: You are not the owner of the specified bucket, or you do not have the
 * s3:PutAnalyticsConfiguration bucket permission to set the configuration on the
 * bucket.
 *
 * The following operations are related to `PutBucketAnalyticsConfiguration`:
 *
 * - GetBucketAnalyticsConfiguration
 *
 * - DeleteBucketAnalyticsConfiguration
 *
 * - ListBucketAnalyticsConfigurations
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const putBucketAnalyticsConfiguration: API.OperationMethod<
  PutBucketAnalyticsConfigurationRequest,
  PutBucketAnalyticsConfigurationResponse,
  PutBucketAnalyticsConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(688, __c43, 0) as any as S.Schema<PutBucketAnalyticsConfigurationRequest>,
  output: __S(689, __c43, 1) as any as S.Schema<PutBucketAnalyticsConfigurationResponse>,
  errors: [InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutBucketAnalyticsConfiguration",
  telemetry: TELEMETRY,
  span: "PutBucketAnalyticsConfiguration",
}));

export type PutBucketCorsError =
  | RequestLimitExceeded
  | SlowDown
  | NoSuchBucket
  | PermanentRedirect
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * This operation is not supported for directory buckets.
 *
 * Sets the `cors` configuration for your bucket. If the configuration exists, Amazon S3 replaces
 * it.
 *
 * To use this operation, you must be allowed to perform the `s3:PutBucketCORS` action. By
 * default, the bucket owner has this permission and can grant it to others.
 *
 * You set this configuration on a bucket so that the bucket can service cross-origin requests. For
 * example, you might want to enable a request whose origin is `http://www.example.com` to
 * access your Amazon S3 bucket at `my.example.bucket.com` by using the browser's
 * `XMLHttpRequest` capability.
 *
 * To enable cross-origin resource sharing (CORS) on a bucket, you add the `cors`
 * subresource to the bucket. The `cors` subresource is an XML document in which you configure
 * rules that identify origins and the HTTP methods that can be executed on your bucket. The document is
 * limited to 64 KB in size.
 *
 * When Amazon S3 receives a cross-origin request (or a pre-flight OPTIONS request) against a bucket, it
 * evaluates the `cors` configuration on the bucket and uses the first `CORSRule`
 * rule that matches the incoming browser request to enable a cross-origin request. For a rule to match,
 * the following conditions must be met:
 *
 * - The request's `Origin` header must match `AllowedOrigin` elements.
 *
 * - The request method (for example, GET, PUT, HEAD, and so on) or the
 * `Access-Control-Request-Method` header in case of a pre-flight `OPTIONS`
 * request must be one of the `AllowedMethod` elements.
 *
 * - Every header specified in the `Access-Control-Request-Headers` request header of a
 * pre-flight request must match an `AllowedHeader` element.
 *
 * For more information about CORS, go to Enabling Cross-Origin Resource Sharing in the
 * *Amazon S3 User Guide*.
 *
 * The following operations are related to `PutBucketCors`:
 *
 * - GetBucketCors
 *
 * - DeleteBucketCors
 *
 * - RESTOPTIONSobject
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const putBucketCors: API.OperationMethod<
  PutBucketCorsRequest,
  PutBucketCorsResponse,
  PutBucketCorsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(705, __c44, 1) as any as S.Schema<PutBucketCorsRequest>,
  output: __S(706, __c44, 2) as any as S.Schema<PutBucketCorsResponse>,
  errors: [RequestLimitExceeded, SlowDown, NoSuchBucket, PermanentRedirect, InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutBucketCors",
  telemetry: TELEMETRY,
  span: "PutBucketCors",
}));

export type PutBucketEncryptionError =
  | RequestLimitExceeded
  | SlowDown
  | NoSuchBucket
  | PermanentRedirect
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * This operation configures default encryption and Amazon S3 Bucket Keys for an existing bucket. You can also block encryption types using this operation.
 *
 * **Directory buckets ** - For directory buckets, you must make requests for this API operation to the Regional endpoint. These endpoints support path-style requests in the format https://s3express-control.*region-code*.amazonaws.com/*bucket-name*
 * . Virtual-hosted-style requests aren't supported.
 * For more information about endpoints in Availability Zones, see Regional and Zonal endpoints for directory buckets in Availability Zones in the
 * *Amazon S3 User Guide*. For more information about endpoints in Local Zones, see Concepts for directory buckets in Local Zones in the
 * *Amazon S3 User Guide*.
 *
 * By default, all buckets have a default encryption configuration that uses server-side encryption
 * with Amazon S3 managed keys (SSE-S3).
 *
 * - **General purpose buckets**
 *
 * - You can optionally configure default encryption for a bucket by using server-side
 * encryption with Key Management Service (KMS) keys (SSE-KMS) or dual-layer server-side encryption with
 * Amazon Web Services KMS keys (DSSE-KMS). If you specify default encryption by using SSE-KMS, you can also
 * configure Amazon S3 Bucket
 * Keys. For information about the bucket default encryption feature, see Amazon S3 Bucket Default
 * Encryption in the *Amazon S3 User Guide*.
 *
 * - If you use PutBucketEncryption to set your default bucket encryption to
 * SSE-KMS, you should verify that your KMS key ID is correct. Amazon S3 doesn't validate the
 * KMS key ID provided in PutBucketEncryption requests.
 *
 * - **Directory buckets ** - You can optionally configure
 * default encryption for a bucket by using server-side encryption with Key Management Service (KMS) keys
 * (SSE-KMS).
 *
 * - We recommend that the bucket's default encryption uses the desired encryption
 * configuration and you don't override the bucket default encryption in your
 * `CreateSession` requests or `PUT` object requests. Then, new objects
 * are automatically encrypted with the desired encryption settings.
 * For more information about the encryption overriding behaviors in directory buckets, see Specifying server-side encryption with KMS for new object uploads.
 *
 * - Your SSE-KMS configuration can only support 1 customer managed key per directory bucket's lifetime.
 * The Amazon Web Services managed key (`aws/s3`) isn't supported.
 *
 * - S3 Bucket Keys are always enabled for `GET` and `PUT` operations in a directory bucket and can't be disabled. S3 Bucket Keys aren't supported, when you copy SSE-KMS encrypted objects from general purpose buckets
 * to directory buckets, from directory buckets to general purpose buckets, or between directory buckets, through CopyObject, UploadPartCopy, the Copy operation in Batch Operations, or
 * the import jobs. In this case, Amazon S3 makes a call to KMS every time a copy request is made for a KMS-encrypted object.
 *
 * - When you specify an KMS customer managed key for encryption in your directory bucket, only use the key ID or key ARN. The key alias format of the KMS key isn't supported.
 *
 * - For directory buckets, if you use PutBucketEncryption to set your default bucket
 * encryption to SSE-KMS, Amazon S3 validates the KMS key ID provided in
 * PutBucketEncryption requests.
 *
 * If you're specifying a customer managed KMS key, we recommend using a fully qualified KMS key
 * ARN. If you use a KMS key alias instead, then KMS resolves the key within the requester's account.
 * This behavior can result in data that's encrypted with a KMS key that belongs to the requester, and
 * not the bucket owner.
 *
 * Also, this action requires Amazon Web Services Signature Version 4. For more information, see Authenticating
 * Requests (Amazon Web Services Signature Version 4).
 *
 * ### Permissions
 *
 * - **General purpose bucket permissions** - The
 * `s3:PutEncryptionConfiguration` permission is required in a policy. The bucket
 * owner has this permission by default. The bucket owner can grant this permission to others.
 * For more information about permissions, see Permissions Related to Bucket Operations and Managing Access Permissions to Your
 * Amazon S3 Resources in the *Amazon S3 User Guide*.
 *
 * - **Directory bucket permissions** - To grant access to
 * this API operation, you must have the `s3express:PutEncryptionConfiguration`
 * permission in an IAM identity-based policy instead of a bucket policy. Cross-account access to this API operation isn't supported. This operation can only be performed by the Amazon Web Services account that owns the resource.
 * For more information about directory bucket policies and permissions, see Amazon Web Services Identity and Access Management (IAM) for S3 Express One Zone in the *Amazon S3 User Guide*.
 *
 * To set a directory bucket default encryption with SSE-KMS, you must also have the
 * `kms:GenerateDataKey` and the `kms:Decrypt` permissions in IAM
 * identity-based policies and KMS key policies for the target KMS key.
 *
 * ### HTTP Host header syntax
 *
 * **Directory buckets ** - The HTTP Host header syntax is `s3express-control.*region-code*.amazonaws.com`.
 *
 * The following operations are related to `PutBucketEncryption`:
 *
 * - GetBucketEncryption
 *
 * - DeleteBucketEncryption
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const putBucketEncryption: API.OperationMethod<
  PutBucketEncryptionRequest,
  PutBucketEncryptionResponse,
  PutBucketEncryptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(720, __c45, 0) as any as S.Schema<PutBucketEncryptionRequest>,
  output: __S(721, __c45, 1) as any as S.Schema<PutBucketEncryptionResponse>,
  errors: [RequestLimitExceeded, SlowDown, NoSuchBucket, PermanentRedirect, InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutBucketEncryption",
  telemetry: TELEMETRY,
  span: "PutBucketEncryption",
}));

export type PutBucketIntelligentTieringConfigurationError =
  | RequestLimitExceeded
  | SlowDown
  | NoSuchBucket
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * This operation is not supported for directory buckets.
 *
 * Puts a S3 Intelligent-Tiering configuration to the specified bucket. You can have up to 1,000
 * S3 Intelligent-Tiering configurations per bucket.
 *
 * The S3 Intelligent-Tiering storage class is designed to optimize storage costs by automatically moving data to the most cost-effective storage access tier, without performance impact or operational overhead. S3 Intelligent-Tiering delivers automatic cost savings in three low latency and high throughput access tiers. To get the lowest storage cost on data that can be accessed in minutes to hours, you can choose to activate additional archiving capabilities.
 *
 * The S3 Intelligent-Tiering storage class is the ideal storage class for data with unknown, changing, or unpredictable access patterns, independent of object size or retention period. If the size of an object is less than 128 KB, it is not monitored and not eligible for auto-tiering. Smaller objects can be stored, but they are always charged at the Frequent Access tier rates in the S3 Intelligent-Tiering storage class.
 *
 * For more information, see Storage class for automatically optimizing frequently and infrequently accessed objects.
 *
 * Operations related to `PutBucketIntelligentTieringConfiguration` include:
 *
 * - DeleteBucketIntelligentTieringConfiguration
 *
 * - GetBucketIntelligentTieringConfiguration
 *
 * - ListBucketIntelligentTieringConfigurations
 *
 * You only need S3 Intelligent-Tiering enabled on a bucket if you want to automatically move objects
 * stored in the S3 Intelligent-Tiering storage class to the Archive Access or Deep Archive Access
 * tier.
 *
 * `PutBucketIntelligentTieringConfiguration` has the following special errors:
 *
 * ### HTTP 400 Bad Request Error
 *
 * *Code:* InvalidArgument
 *
 * *Cause:* Invalid Argument
 *
 * ### HTTP 400 Bad Request Error
 *
 * *Code:* TooManyConfigurations
 *
 * *Cause:* You are attempting to create a new configuration but have already
 * reached the 1,000-configuration limit.
 *
 * ### HTTP 403 Forbidden Error
 *
 * *Cause:* You are not the owner of the specified bucket, or you do not have
 * the `s3:PutIntelligentTieringConfiguration` bucket permission to set the configuration
 * on the bucket.
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const putBucketIntelligentTieringConfiguration: API.OperationMethod<
  PutBucketIntelligentTieringConfigurationRequest,
  PutBucketIntelligentTieringConfigurationResponse,
  PutBucketIntelligentTieringConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(736, __c46, 0) as any as S.Schema<PutBucketIntelligentTieringConfigurationRequest>,
  output: __S(737, __c46, 1) as any as S.Schema<PutBucketIntelligentTieringConfigurationResponse>,
  errors: [RequestLimitExceeded, SlowDown, NoSuchBucket, InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutBucketIntelligentTieringConfiguration",
  telemetry: TELEMETRY,
  span: "PutBucketIntelligentTieringConfiguration",
}));

export type PutBucketInventoryConfigurationError =
  | RequestLimitExceeded
  | SlowDown
  | NoSuchBucket
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * This implementation of the `PUT` action adds an S3 Inventory configuration (identified by
 * the inventory ID) to the bucket. You can have up to 1,000 inventory configurations per bucket.
 *
 * Amazon S3 inventory generates inventories of the objects in the bucket on a daily or weekly basis, and
 * the results are published to a flat file. The bucket that is inventoried is called the
 * *source* bucket, and the bucket where the inventory flat file is stored is called
 * the *destination* bucket. The *destination* bucket must be in the
 * same Amazon Web Services Region as the *source* bucket.
 *
 * When you configure an inventory for a *source* bucket, you specify the
 * *destination* bucket where you want the inventory to be stored, and whether to
 * generate the inventory daily or weekly. You can also configure what object metadata to include and
 * whether to inventory all object versions or only current versions. For more information, see Amazon S3 Inventory in the
 * Amazon S3 User Guide.
 *
 * You must create a bucket policy on the *destination* bucket to grant
 * permissions to Amazon S3 to write objects to the bucket in the defined location. For an example policy, see
 * Granting
 * Permissions for Amazon S3 Inventory and Storage Class Analysis.
 *
 * **Directory buckets ** - For directory buckets, you must make requests for this API operation to the Regional endpoint. These endpoints support path-style requests in the format https://s3express-control.*region-code*.amazonaws.com/*bucket-name*
 * . Virtual-hosted-style requests aren't supported.
 * For more information about endpoints in Availability Zones, see Regional and Zonal endpoints for directory buckets in Availability Zones in the
 * *Amazon S3 User Guide*. For more information about endpoints in Local Zones, see Concepts for directory buckets in Local Zones in the
 * *Amazon S3 User Guide*.
 *
 * ### Permissions
 *
 * To use this operation, you must have permission to perform the
 * `s3:PutInventoryConfiguration` action. The bucket owner has this permission by
 * default and can grant this permission to others.
 *
 * The `s3:PutInventoryConfiguration` permission allows a user to create an S3 Inventory
 * report that includes all object metadata fields available and to specify the destination bucket to
 * store the inventory. A user with read access to objects in the destination bucket can also access
 * all object metadata fields that are available in the inventory report.
 *
 * - **General purpose bucket permissions** - The
 * `s3:PutInventoryConfiguration` permission is required in a policy. For more information
 * about general purpose buckets permissions, see Using Bucket Policies and User
 * Policies in the *Amazon S3 User Guide*.
 *
 * - **Directory bucket permissions** - To grant access to
 * this API operation, you must have the `s3express:PutInventoryConfiguration` permission in
 * an IAM identity-based policy instead of a bucket policy.
 * For more information about directory bucket policies and permissions, see Amazon Web Services Identity and Access Management (IAM) for S3 Express One Zone in the *Amazon S3 User Guide*.
 *
 * To restrict access to an inventory report, see Restricting access to an Amazon S3 Inventory report in the
 * *Amazon S3 User Guide*. For more information about the metadata fields available
 * in S3 Inventory, see Amazon S3 Inventory
 * lists in the *Amazon S3 User Guide*. For more information about
 * permissions, see Permissions related to bucket subresource operations and Identity and access management in
 * Amazon S3 in the *Amazon S3 User Guide*.
 *
 * ### HTTP Host header syntax
 *
 * **Directory buckets ** - The HTTP Host header syntax is `s3express-control.*region-code*.amazonaws.com`.
 *
 * `PutBucketInventoryConfiguration` has the following special errors:
 *
 * ### HTTP 400 Bad Request Error
 *
 * *Code:* InvalidArgument
 *
 * *Cause:* Invalid Argument
 *
 * ### HTTP 400 Bad Request Error
 *
 * *Code:* TooManyConfigurations
 *
 * *Cause:* You are attempting to create a new configuration but have already
 * reached the 1,000-configuration limit.
 *
 * ### HTTP 403 Forbidden Error
 *
 * *Cause:* You are not the owner of the specified bucket, or you do not have
 * the `s3:PutInventoryConfiguration` bucket permission to set the configuration on the
 * bucket.
 *
 * The following operations are related to `PutBucketInventoryConfiguration`:
 *
 * - GetBucketInventoryConfiguration
 *
 * - DeleteBucketInventoryConfiguration
 *
 * - ListBucketInventoryConfigurations
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const putBucketInventoryConfiguration: API.OperationMethod<
  PutBucketInventoryConfigurationRequest,
  PutBucketInventoryConfigurationResponse,
  PutBucketInventoryConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(752, __c47, 0) as any as S.Schema<PutBucketInventoryConfigurationRequest>,
  output: __S(753, __c47, 1) as any as S.Schema<PutBucketInventoryConfigurationResponse>,
  errors: [RequestLimitExceeded, SlowDown, NoSuchBucket, InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutBucketInventoryConfiguration",
  telemetry: TELEMETRY,
  span: "PutBucketInventoryConfiguration",
}));

export type PutBucketLifecycleConfigurationError =
  | RequestLimitExceeded
  | SlowDown
  | InvalidRequest
  | MalformedXML
  | NoSuchBucket
  | PermanentRedirect
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * Creates a new lifecycle configuration for the bucket or replaces an existing lifecycle
 * configuration. Keep in mind that this will overwrite an existing lifecycle configuration, so if you want
 * to retain any configuration details, they must be included in the new lifecycle configuration. For
 * information about lifecycle configuration, see Managing your storage
 * lifecycle.
 *
 * Bucket lifecycle configuration now supports specifying a lifecycle rule using an object key name
 * prefix, one or more object tags, object size, or any combination of these. Accordingly, this section
 * describes the latest API. The previous version of the API supported filtering based only on an object
 * key name prefix, which is supported for backward compatibility. For the related API description, see
 * PutBucketLifecycle.
 *
 * ### Rules
 *
 * You specify the lifecycle configuration in your request body. The lifecycle configuration is
 * specified as XML consisting of one or more rules. An Amazon S3 Lifecycle configuration can have up to
 * 1,000 rules. This limit is not adjustable.
 *
 * Bucket lifecycle configuration supports specifying a lifecycle rule using an object key name
 * prefix, one or more object tags, object size, or any combination of these. Accordingly, this
 * section describes the latest API. The previous version of the API supported filtering based only
 * on an object key name prefix, which is supported for backward compatibility for general purpose
 * buckets. For the related API description, see PutBucketLifecycle.
 *
 * Lifecyle configurations for directory buckets only support expiring objects and cancelling
 * multipart uploads. Expiring of versioned objects,transitions and tag filters are not
 * supported.
 *
 * A lifecycle rule consists of the following:
 *
 * - A filter identifying a subset of objects to which the rule applies. The filter can be
 * based on a key name prefix, object tags, object size, or any combination of these.
 *
 * - A status indicating whether the rule is in effect.
 *
 * - One or more lifecycle transition and expiration actions that you want Amazon S3 to perform on
 * the objects identified by the filter. If the state of your bucket is versioning-enabled or
 * versioning-suspended, you can have many versions of the same object (one current version and
 * zero or more noncurrent versions). Amazon S3 provides predefined actions that you can specify for
 * current and noncurrent object versions.
 *
 * For more information, see Object Lifecycle Management and
 * Lifecycle
 * Configuration Elements.
 *
 * ### Permissions
 *
 * - **General purpose bucket permissions** - By default, all Amazon S3
 * resources are private, including buckets, objects, and related subresources (for example,
 * lifecycle configuration and website configuration). Only the resource owner (that is, the
 * Amazon Web Services account that created it) can access the resource. The resource owner can optionally
 * grant access permissions to others by writing an access policy. For this operation, a user
 * must have the `s3:PutLifecycleConfiguration` permission.
 *
 * You can also explicitly deny permissions. An explicit deny also supersedes any other
 * permissions. If you want to block users or accounts from removing or deleting objects from
 * your bucket, you must deny them permissions for the following actions:
 *
 * - `s3:DeleteObject`
 *
 * - `s3:DeleteObjectVersion`
 *
 * - `s3:PutLifecycleConfiguration`
 *
 * For more information about permissions, see Managing Access Permissions to
 * Your Amazon S3 Resources.
 *
 * - **Directory bucket permissions** - You must have the
 * `s3express:PutLifecycleConfiguration` permission in an IAM identity-based policy
 * to use this operation. Cross-account access to this API operation isn't supported. The
 * resource owner can optionally grant access permissions to others by creating a role or user
 * for them as long as they are within the same account as the owner and resource.
 *
 * For more information about directory bucket policies and permissions, see Authorizing Regional endpoint APIs with IAM in the Amazon S3 User
 * Guide.
 *
 * **Directory buckets ** - For directory buckets, you must make requests for this API operation to the Regional endpoint. These endpoints support path-style requests in the format https://s3express-control.*region-code*.amazonaws.com/*bucket-name*
 * . Virtual-hosted-style requests aren't supported.
 * For more information about endpoints in Availability Zones, see Regional and Zonal endpoints for directory buckets in Availability Zones in the
 * *Amazon S3 User Guide*. For more information about endpoints in Local Zones, see Concepts for directory buckets in Local Zones in the
 * *Amazon S3 User Guide*.
 *
 * ### HTTP Host header syntax
 *
 * **Directory buckets ** - The HTTP Host header syntax is
 * `s3express-control.*region*.amazonaws.com`.
 *
 * The following operations are related to `PutBucketLifecycleConfiguration`:
 *
 * - GetBucketLifecycleConfiguration
 *
 * - DeleteBucketLifecycle
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const putBucketLifecycleConfiguration: API.OperationMethod<
  PutBucketLifecycleConfigurationRequest,
  PutBucketLifecycleConfigurationOutput,
  PutBucketLifecycleConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(769, __c48, 1) as any as S.Schema<PutBucketLifecycleConfigurationRequest>,
  output: __S(770, __c48, 2) as any as S.Schema<PutBucketLifecycleConfigurationOutput>,
  errors: [
    RequestLimitExceeded,
    SlowDown,
    InvalidRequest,
    MalformedXML,
    NoSuchBucket,
    PermanentRedirect,
    InvalidAccessKeyId,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutBucketLifecycleConfiguration",
  telemetry: TELEMETRY,
  span: "PutBucketLifecycleConfiguration",
}));

export type PutBucketLoggingError =
  | RequestLimitExceeded
  | SlowDown
  | NoSuchBucket
  | PermanentRedirect
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * End of support notice: As of October 1, 2025, Amazon S3 has discontinued support for Email Grantee Access Control Lists (ACLs). If you attempt to use an Email Grantee ACL in a request after October 1, 2025,
 * the request will receive an `HTTP 405` (Method Not Allowed) error.
 *
 * This change affects the following Amazon Web Services Regions: US East (N. Virginia), US West (N. California), US West (Oregon), Asia Pacific (Singapore), Asia Pacific (Sydney), Asia Pacific (Tokyo), Europe (Ireland), and South America (São Paulo).
 *
 * This operation is not supported for directory buckets.
 *
 * Set the logging parameters for a bucket and to specify permissions for who can view and modify the
 * logging parameters. All logs are saved to buckets in the same Amazon Web Services Region as the source bucket. To set
 * the logging status of a bucket, you must be the bucket owner.
 *
 * The bucket owner is automatically granted FULL_CONTROL to all logs. You use the `Grantee`
 * request element to grant access to other people. The `Permissions` request element specifies
 * the kind of access the grantee has to the logs.
 *
 * If the target bucket for log delivery uses the bucket owner enforced setting for S3 Object
 * Ownership, you can't use the `Grantee` request element to grant access to others.
 * Permissions can only be granted using policies. For more information, see Permissions for server access log delivery in the
 * *Amazon S3 User Guide*.
 *
 * ### Grantee Values
 *
 * You can specify the person (grantee) to whom you're assigning access rights (by using request
 * elements) in the following ways. For examples of how to specify these grantee values in JSON
 * format, see the Amazon Web Services CLI example in Enabling Amazon S3 server
 * access logging in the *Amazon S3 User Guide*.
 *
 * - By the person's ID:
 *
 * <>ID<><>GranteesEmail<>
 *
 * `DisplayName` is optional and ignored in the request.
 *
 * - By Email address:
 *
 * <>Grantees@email.com<>
 *
 * The grantee is resolved to the `CanonicalUser` and, in a response to a
 * `GETObjectAcl` request, appears as the CanonicalUser.
 *
 * - By URI:
 *
 * <>http://acs.amazonaws.com/groups/global/AuthenticatedUsers<>
 *
 * To enable logging, you use `LoggingEnabled` and its children request elements. To disable
 * logging, you use an empty `BucketLoggingStatus` request element:
 *
 * ``
 *
 * For more information about server access logging, see Server Access Logging in the
 * *Amazon S3 User Guide*.
 *
 * For more information about creating a bucket, see CreateBucket. For more information about
 * returning the logging status of a bucket, see GetBucketLogging.
 *
 * The following operations are related to `PutBucketLogging`:
 *
 * - PutObject
 *
 * - DeleteBucket
 *
 * - CreateBucket
 *
 * - GetBucketLogging
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const putBucketLogging: API.OperationMethod<
  PutBucketLoggingRequest,
  PutBucketLoggingResponse,
  PutBucketLoggingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(785, __c49, 1) as any as S.Schema<PutBucketLoggingRequest>,
  output: __S(786, __c49, 2) as any as S.Schema<PutBucketLoggingResponse>,
  errors: [RequestLimitExceeded, SlowDown, NoSuchBucket, PermanentRedirect, InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutBucketLogging",
  telemetry: TELEMETRY,
  span: "PutBucketLogging",
}));

export type PutBucketMetricsConfigurationError =
  | RequestLimitExceeded
  | SlowDown
  | NoSuchBucket
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * Sets a metrics configuration (specified by the metrics configuration ID) for the bucket. You can
 * have up to 1,000 metrics configurations per bucket. If you're updating an existing metrics
 * configuration, note that this is a full replacement of the existing metrics configuration. If you don't
 * include the elements you want to keep, they are erased.
 *
 * **Directory buckets ** - For directory buckets, you must make requests for this API operation to the Regional endpoint. These endpoints support path-style requests in the format https://s3express-control.*region-code*.amazonaws.com/*bucket-name*
 * . Virtual-hosted-style requests aren't supported.
 * For more information about endpoints in Availability Zones, see Regional and Zonal endpoints for directory buckets in Availability Zones in the
 * *Amazon S3 User Guide*. For more information about endpoints in Local Zones, see Concepts for directory buckets in Local Zones in the
 * *Amazon S3 User Guide*.
 *
 * ### Permissions
 *
 * To use this operation, you must have permissions to perform the
 * `s3:PutMetricsConfiguration` action. The bucket owner has this permission by default. The
 * bucket owner can grant this permission to others. For more information about permissions, see Permissions Related to Bucket Subresource Operations and Managing Access Permissions to Your Amazon S3
 * Resources.
 *
 * - **General purpose bucket permissions** - The
 * `s3:PutMetricsConfiguration` permission is required in a policy. For more information
 * about general purpose buckets permissions, see Using Bucket Policies and User
 * Policies in the *Amazon S3 User Guide*.
 *
 * - **Directory bucket permissions** - To grant access to
 * this API operation, you must have the `s3express:PutMetricsConfiguration` permission in
 * an IAM identity-based policy instead of a bucket policy. Cross-account access to this API operation isn't supported. This operation can only be performed by the Amazon Web Services account that owns the resource.
 * For more information about directory bucket policies and permissions, see Amazon Web Services Identity and Access Management (IAM) for S3 Express One Zone in the *Amazon S3 User Guide*.
 *
 * ### HTTP Host header syntax
 *
 * **Directory buckets ** - The HTTP Host header syntax is `s3express-control.*region-code*.amazonaws.com`.
 *
 * For information about CloudWatch request metrics for Amazon S3, see Monitoring Metrics with Amazon
 * CloudWatch.
 *
 * The following operations are related to `PutBucketMetricsConfiguration`:
 *
 * - DeleteBucketMetricsConfiguration
 *
 * - GetBucketMetricsConfiguration
 *
 * - ListBucketMetricsConfigurations
 *
 * `PutBucketMetricsConfiguration` has the following special error:
 *
 * - Error code: `TooManyConfigurations`
 *
 * - Description: You are attempting to create a new configuration but have already reached the
 * 1,000-configuration limit.
 *
 * - HTTP Status Code: HTTP 400 Bad Request
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const putBucketMetricsConfiguration: API.OperationMethod<
  PutBucketMetricsConfigurationRequest,
  PutBucketMetricsConfigurationResponse,
  PutBucketMetricsConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(800, __c50, 0) as any as S.Schema<PutBucketMetricsConfigurationRequest>,
  output: __S(801, __c50, 1) as any as S.Schema<PutBucketMetricsConfigurationResponse>,
  errors: [RequestLimitExceeded, SlowDown, NoSuchBucket, InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutBucketMetricsConfiguration",
  telemetry: TELEMETRY,
  span: "PutBucketMetricsConfiguration",
}));

export type PutBucketNotificationConfigurationError =
  | RequestLimitExceeded
  | SlowDown
  | NoSuchBucket
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * This operation is not supported for directory buckets.
 *
 * Enables notifications of specified events for a bucket. For more information about event
 * notifications, see Configuring Event Notifications.
 *
 * Using this API, you can replace an existing notification configuration. The configuration is an XML
 * file that defines the event types that you want Amazon S3 to publish and the destination where you want Amazon S3
 * to publish an event notification when it detects an event of the specified type.
 *
 * By default, your bucket has no event notifications configured. That is, the notification
 * configuration will be an empty `NotificationConfiguration`.
 *
 * ``
 *
 * ``
 *
 * This action replaces the existing notification configuration with the configuration you include in
 * the request body.
 *
 * After Amazon S3 receives this request, it first verifies that any Amazon Simple Notification Service
 * (Amazon SNS) or Amazon Simple Queue Service (Amazon SQS) destination exists, and that the bucket owner
 * has permission to publish to it by sending a test notification. In the case of Lambda destinations,
 * Amazon S3 verifies that the Lambda function permissions grant Amazon S3 permission to invoke the function from the
 * Amazon S3 bucket. For more information, see Configuring Notifications for Amazon S3
 * Events.
 *
 * You can disable notifications by adding the empty NotificationConfiguration element.
 *
 * For more information about the number of event notification configurations that you can create per
 * bucket, see Amazon S3 service
 * quotas in *Amazon Web Services General Reference*.
 *
 * By default, only the bucket owner can configure notifications on a bucket. However, bucket owners
 * can use a bucket policy to grant permission to other users to set this configuration with the required
 * `s3:PutBucketNotification` permission.
 *
 * The PUT notification is an atomic operation. For example, suppose your notification configuration
 * includes SNS topic, SQS queue, and Lambda function configurations. When you send a PUT request with
 * this configuration, Amazon S3 sends test messages to your SNS topic. If the message fails, the entire PUT
 * action will fail, and Amazon S3 will not add the configuration to your bucket.
 *
 * If the configuration in the request body includes only one `TopicConfiguration`
 * specifying only the `s3:ReducedRedundancyLostObject` event type, the response will also
 * include the `x-amz-sns-test-message-id` header containing the message ID of the test
 * notification sent to the topic.
 *
 * The following action is related to `PutBucketNotificationConfiguration`:
 *
 * - GetBucketNotificationConfiguration
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const putBucketNotificationConfiguration: API.OperationMethod<
  PutBucketNotificationConfigurationRequest,
  PutBucketNotificationConfigurationResponse,
  PutBucketNotificationConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(816, __c51, 0) as any as S.Schema<PutBucketNotificationConfigurationRequest>,
  output: __S(817, __c51, 1) as any as S.Schema<PutBucketNotificationConfigurationResponse>,
  errors: [RequestLimitExceeded, SlowDown, NoSuchBucket, InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutBucketNotificationConfiguration",
  telemetry: TELEMETRY,
  span: "PutBucketNotificationConfiguration",
}));

export type PutBucketOwnershipControlsError =
  | RequestLimitExceeded
  | SlowDown
  | NoSuchBucket
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * This operation is not supported for directory buckets.
 *
 * Creates or modifies `OwnershipControls` for an Amazon S3 bucket. To use this operation, you
 * must have the `s3:PutBucketOwnershipControls` permission. For more information about Amazon S3
 * permissions, see Specifying permissions in a policy.
 *
 * For information about Amazon S3 Object Ownership, see Using object ownership.
 *
 * The following operations are related to `PutBucketOwnershipControls`:
 *
 * - GetBucketOwnershipControls
 *
 * - DeleteBucketOwnershipControls
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const putBucketOwnershipControls: API.OperationMethod<
  PutBucketOwnershipControlsRequest,
  PutBucketOwnershipControlsResponse,
  PutBucketOwnershipControlsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(832, __c52, 0) as any as S.Schema<PutBucketOwnershipControlsRequest>,
  output: __S(833, __c52, 1) as any as S.Schema<PutBucketOwnershipControlsResponse>,
  errors: [RequestLimitExceeded, SlowDown, NoSuchBucket, InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutBucketOwnershipControls",
  telemetry: TELEMETRY,
  span: "PutBucketOwnershipControls",
}));

export type PutBucketPolicyError =
  | RequestLimitExceeded
  | SlowDown
  | AccessDenied
  | InvalidBucketName
  | InvalidDigest
  | InvalidRequest
  | MalformedPolicy
  | NoSuchBucket
  | PermanentRedirect
  | SignatureDoesNotMatch
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * Applies an Amazon S3 bucket policy to an Amazon S3 bucket.
 *
 * **Directory buckets ** - For directory buckets, you must make requests for this API operation to the Regional endpoint. These endpoints support path-style requests in the format https://s3express-control.*region-code*.amazonaws.com/*bucket-name*
 * . Virtual-hosted-style requests aren't supported.
 * For more information about endpoints in Availability Zones, see Regional and Zonal endpoints for directory buckets in Availability Zones in the
 * *Amazon S3 User Guide*. For more information about endpoints in Local Zones, see Concepts for directory buckets in Local Zones in the
 * *Amazon S3 User Guide*.
 *
 * ### Permissions
 *
 * If you are using an identity other than the root user of the Amazon Web Services account that owns the
 * bucket, the calling identity must both have the `PutBucketPolicy` permissions on the
 * specified bucket and belong to the bucket owner's account in order to use this operation.
 *
 * If you don't have `PutBucketPolicy` permissions, Amazon S3 returns a 403 Access
 * Denied error. If you have the correct permissions, but you're not using an identity that
 * belongs to the bucket owner's account, Amazon S3 returns a `405 Method Not Allowed`
 * error.
 *
 * To ensure that bucket owners don't inadvertently lock themselves out of their own buckets,
 * the root principal in a bucket owner's Amazon Web Services account can perform the
 * `GetBucketPolicy`, `PutBucketPolicy`, and
 * `DeleteBucketPolicy` API actions, even if their bucket policy explicitly denies the
 * root principal's access. Bucket owner root principals can only be blocked from performing these
 * API actions by VPC endpoint policies and Amazon Web Services Organizations policies.
 *
 * - **General purpose bucket permissions** - The
 * `s3:PutBucketPolicy` permission is required in a policy. For more information
 * about general purpose buckets bucket policies, see Using Bucket Policies and User
 * Policies in the *Amazon S3 User Guide*.
 *
 * - **Directory bucket permissions** - To grant access to
 * this API operation, you must have the `s3express:PutBucketPolicy` permission in
 * an IAM identity-based policy instead of a bucket policy. Cross-account access to this API operation isn't supported. This operation can only be performed by the Amazon Web Services account that owns the resource.
 * For more information about directory bucket policies and permissions, see Amazon Web Services Identity and Access Management (IAM) for S3 Express One Zone in the *Amazon S3 User Guide*.
 *
 * ### Example bucket policies
 *
 * **General purpose buckets example bucket policies** - See Bucket policy
 * examples in the *Amazon S3 User Guide*.
 *
 * **Directory bucket example bucket policies** - See Example
 * bucket policies for S3 Express One Zone in the *Amazon S3 User Guide*.
 *
 * ### HTTP Host header syntax
 *
 * **Directory buckets ** - The HTTP Host header syntax is `s3express-control.*region-code*.amazonaws.com`.
 *
 * The following operations are related to `PutBucketPolicy`:
 *
 * - CreateBucket
 *
 * - DeleteBucket
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const putBucketPolicy: API.OperationMethod<
  PutBucketPolicyRequest,
  PutBucketPolicyResponse,
  PutBucketPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(848, __c53, 0) as any as S.Schema<PutBucketPolicyRequest>,
  output: __S(849, __c53, 1) as any as S.Schema<PutBucketPolicyResponse>,
  errors: [
    RequestLimitExceeded,
    SlowDown,
    AccessDenied,
    InvalidBucketName,
    InvalidDigest,
    InvalidRequest,
    MalformedPolicy,
    NoSuchBucket,
    PermanentRedirect,
    SignatureDoesNotMatch,
    InvalidAccessKeyId,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutBucketPolicy",
  telemetry: TELEMETRY,
  span: "PutBucketPolicy",
}));

export type PutBucketReplicationError =
  | RequestLimitExceeded
  | SlowDown
  | InvalidRequest
  | NoSuchBucket
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * This operation is not supported for directory buckets.
 *
 * Creates a replication configuration or replaces an existing one. For more information, see Replication in the
 * *Amazon S3 User Guide*.
 *
 * Specify the replication configuration in the request body. In the replication configuration, you
 * provide the name of the destination bucket or buckets where you want Amazon S3 to replicate objects, the
 * IAM role that Amazon S3 can assume to replicate objects on your behalf, and other relevant information. You
 * can invoke this request for a specific Amazon Web Services Region by using the
 * `aws:RequestedRegion`
 * condition key.
 *
 * A replication configuration must include at least one rule, and can contain a maximum of 1,000. Each
 * rule identifies a subset of objects to replicate by filtering the objects in the source bucket. To
 * choose additional subsets of objects to replicate, add a rule for each subset.
 *
 * To specify a subset of the objects in the source bucket to apply a replication rule to, add the
 * Filter element as a child of the Rule element. You can filter objects based on an object key prefix, one
 * or more object tags, or both. When you add the Filter element in the configuration, you must also add
 * the following elements: `DeleteMarkerReplication`, `Status`, and
 * `Priority`.
 *
 * If you are using an earlier version of the replication configuration, Amazon S3 handles replication of
 * delete markers differently. For more information, see Backward Compatibility.
 *
 * For information about enabling versioning on a bucket, see Using Versioning.
 *
 * ### Handling Replication of Encrypted Objects
 *
 * By default, Amazon S3 doesn't replicate objects that are stored at rest using server-side
 * encryption with KMS keys. To replicate Amazon Web Services KMS-encrypted objects, add the following:
 * `SourceSelectionCriteria`, `SseKmsEncryptedObjects`, `Status`,
 * `EncryptionConfiguration`, and `ReplicaKmsKeyID`. For information about
 * replication configuration, see Replicating Objects Created
 * with SSE Using KMS keys.
 *
 * For information on `PutBucketReplication` errors, see List of
 * replication-related error codes
 *
 * ### Permissions
 *
 * To create a `PutBucketReplication` request, you must have
 * `s3:PutReplicationConfiguration` permissions for the bucket.
 *
 * By default, a resource owner, in this case the Amazon Web Services account that created the bucket, can
 * perform this operation. The resource owner can also grant others permissions to perform the
 * operation. For more information about permissions, see Specifying Permissions in a Policy
 * and Managing
 * Access Permissions to Your Amazon S3 Resources.
 *
 * To perform this operation, the user or role performing the action must have the iam:PassRole permission.
 *
 * The following operations are related to `PutBucketReplication`:
 *
 * - GetBucketReplication
 *
 * - DeleteBucketReplication
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const putBucketReplication: API.OperationMethod<
  PutBucketReplicationRequest,
  PutBucketReplicationResponse,
  PutBucketReplicationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(864, __c54, 0) as any as S.Schema<PutBucketReplicationRequest>,
  output: __S(865, __c54, 1) as any as S.Schema<PutBucketReplicationResponse>,
  errors: [RequestLimitExceeded, SlowDown, InvalidRequest, NoSuchBucket, InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutBucketReplication",
  telemetry: TELEMETRY,
  span: "PutBucketReplication",
}));

export type PutBucketRequestPaymentError =
  | RequestLimitExceeded
  | SlowDown
  | NoSuchBucket
  | PermanentRedirect
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * This operation is not supported for directory buckets.
 *
 * Sets the request payment configuration for a bucket. By default, the bucket owner pays for downloads
 * from the bucket. This configuration parameter enables the bucket owner (only) to specify that the person
 * requesting the download will be charged for the download. For more information, see Requester Pays
 * Buckets.
 *
 * The following operations are related to `PutBucketRequestPayment`:
 *
 * - CreateBucket
 *
 * - GetBucketRequestPayment
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const putBucketRequestPayment: API.OperationMethod<
  PutBucketRequestPaymentRequest,
  PutBucketRequestPaymentResponse,
  PutBucketRequestPaymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(881, __c55, 1) as any as S.Schema<PutBucketRequestPaymentRequest>,
  output: __S(882, __c55, 2) as any as S.Schema<PutBucketRequestPaymentResponse>,
  errors: [RequestLimitExceeded, SlowDown, NoSuchBucket, PermanentRedirect, InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutBucketRequestPayment",
  telemetry: TELEMETRY,
  span: "PutBucketRequestPayment",
}));

export type PutBucketTaggingError =
  | RequestLimitExceeded
  | SlowDown
  | NoSuchBucket
  | PermanentRedirect
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * This operation is not supported for directory buckets.
 *
 * Sets the tags for a general purpose bucket if attribute based access control (ABAC) is not enabled for the bucket. When you enable ABAC for a general purpose bucket, you can no longer use this operation for that bucket and must use the TagResource or UntagResource operations instead.
 *
 * Use tags to organize your Amazon Web Services bill to reflect your own cost structure. To do this, sign up to get
 * your Amazon Web Services account bill with tag key values included. Then, to see the cost of combined resources,
 * organize your billing information according to resources with the same tag key values. For example, you
 * can tag several resources with a specific application name, and then organize your billing information
 * to see the total cost of that application across several services. For more information, see Cost Allocation and
 * Tagging and Using Cost Allocation in Amazon S3 Bucket Tags.
 *
 * When this operation sets the tags for a bucket, it will overwrite any current tags the bucket
 * already has. You cannot use this operation to add tags to an existing list of tags.
 *
 * To use this operation, you must have permissions to perform the `s3:PutBucketTagging`
 * action. The bucket owner has this permission by default and can grant this permission to others. For
 * more information about permissions, see Permissions Related to Bucket Subresource Operations and Managing Access Permissions to Your Amazon S3
 * Resources.
 *
 * `PutBucketTagging` has the following special errors. For more Amazon S3 errors see, Error Responses.
 *
 * - `InvalidTag` - The tag provided was not a valid tag. This error can occur if
 * the tag did not pass input validation. For more information, see Using Cost Allocation in Amazon S3 Bucket
 * Tags.
 *
 * - `MalformedXML` - The XML provided does not match the schema.
 *
 * - `OperationAborted` - A conflicting conditional action is currently in progress
 * against this resource. Please try again.
 *
 * - `InternalError` - The service was unable to apply the provided tag to the
 * bucket.
 *
 * The following operations are related to `PutBucketTagging`:
 *
 * - GetBucketTagging
 *
 * - DeleteBucketTagging
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const putBucketTagging: API.OperationMethod<
  PutBucketTaggingRequest,
  PutBucketTaggingResponse,
  PutBucketTaggingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(896, __c56, 0) as any as S.Schema<PutBucketTaggingRequest>,
  output: __S(897, __c56, 1) as any as S.Schema<PutBucketTaggingResponse>,
  errors: [RequestLimitExceeded, SlowDown, NoSuchBucket, PermanentRedirect, InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutBucketTagging",
  telemetry: TELEMETRY,
  span: "PutBucketTagging",
}));

export type PutBucketVersioningError =
  | RequestLimitExceeded
  | SlowDown
  | NoSuchBucket
  | PermanentRedirect
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * This operation is not supported for directory buckets.
 *
 * When you enable versioning on a bucket for the first time, it might take a short amount of time
 * for the change to be fully propagated. While this change is propagating, you might encounter
 * intermittent `HTTP 404 NoSuchKey` errors for requests to objects created or updated after
 * enabling versioning. We recommend that you wait for 15 minutes after enabling versioning before
 * issuing write operations (`PUT` or `DELETE`) on objects in the bucket.
 *
 * Sets the versioning state of an existing bucket.
 *
 * You can set the versioning state with one of the following values:
 *
 * **Enabled**--Enables versioning for the objects in the bucket. All
 * objects added to the bucket receive a unique version ID.
 *
 * **Suspended**--Disables versioning for the objects in the bucket. All
 * objects added to the bucket receive the version ID null.
 *
 * If the versioning state has never been set on a bucket, it has no versioning state; a GetBucketVersioning request does not return a versioning state value.
 *
 * In order to enable MFA Delete, you must be the bucket owner. If you are the bucket owner and want to
 * enable MFA Delete in the bucket versioning configuration, you must include the x-amz-mfa
 * request header and the `Status` and the `MfaDelete` request elements in a
 * request to set the versioning state of the bucket.
 *
 * If you have an object expiration lifecycle configuration in your non-versioned bucket and you want
 * to maintain the same permanent delete behavior when you enable versioning, you must add a noncurrent
 * expiration policy. The noncurrent expiration lifecycle configuration will manage the deletes of the
 * noncurrent object versions in the version-enabled bucket. (A version-enabled bucket maintains one
 * current and zero or more noncurrent object versions.) For more information, see Lifecycle and
 * Versioning.
 *
 * The following operations are related to `PutBucketVersioning`:
 *
 * - CreateBucket
 *
 * - DeleteBucket
 *
 * - GetBucketVersioning
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const putBucketVersioning: API.OperationMethod<
  PutBucketVersioningRequest,
  PutBucketVersioningResponse,
  PutBucketVersioningError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(929, __c58, 1) as any as S.Schema<PutBucketVersioningRequest>,
  output: __S(930, __c58, 2) as any as S.Schema<PutBucketVersioningResponse>,
  errors: [RequestLimitExceeded, SlowDown, NoSuchBucket, PermanentRedirect, InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutBucketVersioning",
  telemetry: TELEMETRY,
  span: "PutBucketVersioning",
}));

export type PutBucketWebsiteError =
  | RequestLimitExceeded
  | SlowDown
  | NoSuchBucket
  | PermanentRedirect
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * This operation is not supported for directory buckets.
 *
 * Sets the configuration of the website that is specified in the `website` subresource. To
 * configure a bucket as a website, you can add this subresource on the bucket with website configuration
 * information such as the file name of the index document and any redirect rules. For more information,
 * see Hosting Websites on
 * Amazon S3.
 *
 * This PUT action requires the `S3:PutBucketWebsite` permission. By default, only the
 * bucket owner can configure the website attached to a bucket; however, bucket owners can allow other
 * users to set the website configuration by writing a bucket policy that grants them the
 * `S3:PutBucketWebsite` permission.
 *
 * To redirect all website requests sent to the bucket's website endpoint, you add a website
 * configuration with the following elements. Because all requests are sent to another website, you don't
 * need to provide index document name for the bucket.
 *
 * - `WebsiteConfiguration`
 *
 * - `RedirectAllRequestsTo`
 *
 * - `HostName`
 *
 * - `Protocol`
 *
 * If you want granular control over redirects, you can use the following elements to add routing rules
 * that describe conditions for redirecting requests and information about the redirect destination. In
 * this case, the website configuration must provide an index document for the bucket, because some
 * requests might not be redirected.
 *
 * - `WebsiteConfiguration`
 *
 * - `IndexDocument`
 *
 * - `Suffix`
 *
 * - `ErrorDocument`
 *
 * - `Key`
 *
 * - `RoutingRules`
 *
 * - `RoutingRule`
 *
 * - `Condition`
 *
 * - `HttpErrorCodeReturnedEquals`
 *
 * - `KeyPrefixEquals`
 *
 * - `Redirect`
 *
 * - `Protocol`
 *
 * - `HostName`
 *
 * - `ReplaceKeyPrefixWith`
 *
 * - `ReplaceKeyWith`
 *
 * - `HttpRedirectCode`
 *
 * Amazon S3 has a limitation of 50 routing rules per website configuration. If you require more than 50
 * routing rules, you can use object redirect. For more information, see Configuring an Object Redirect in the
 * *Amazon S3 User Guide*.
 *
 * The maximum request length is limited to 128 KB.
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const putBucketWebsite: API.OperationMethod<
  PutBucketWebsiteRequest,
  PutBucketWebsiteResponse,
  PutBucketWebsiteError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(945, __c59, 1) as any as S.Schema<PutBucketWebsiteRequest>,
  output: __S(946, __c59, 2) as any as S.Schema<PutBucketWebsiteResponse>,
  errors: [RequestLimitExceeded, SlowDown, NoSuchBucket, PermanentRedirect, InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutBucketWebsite",
  telemetry: TELEMETRY,
  span: "PutBucketWebsite",
}));

export type PutObjectError =
  | EncryptionTypeMismatch
  | InvalidRequest
  | InvalidWriteOffset
  | TooManyParts
  | RequestLimitExceeded
  | SlowDown
  | NoSuchBucket
  | PermanentRedirect
  | PreconditionFailed
  | ConditionalRequestConflict
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * End of support notice: As of October 1, 2025, Amazon S3 has discontinued support for Email Grantee Access Control Lists (ACLs). If you attempt to use an Email Grantee ACL in a request after October 1, 2025,
 * the request will receive an `HTTP 405` (Method Not Allowed) error.
 *
 * This change affects the following Amazon Web Services Regions: US East (N. Virginia), US West (N. California), US West (Oregon), Asia Pacific (Singapore), Asia Pacific (Sydney), Asia Pacific (Tokyo), Europe (Ireland), and South America (São Paulo).
 *
 * Adds an object to a bucket.
 *
 * - Amazon S3 never adds partial objects; if you receive a success response, Amazon S3 added the entire
 * object to the bucket. You cannot use `PutObject` to only update a single piece of
 * metadata for an existing object. You must put the entire object with updated metadata if you want
 * to update some values.
 *
 * - If your bucket uses the bucket owner enforced setting for Object Ownership, ACLs are disabled
 * and no longer affect permissions. All objects written to the bucket by any account will be owned
 * by the bucket owner.
 *
 * - **Directory buckets** - For directory buckets, you must make requests for this API operation to the Zonal endpoint. These endpoints support virtual-hosted-style requests in the format https://*amzn-s3-demo-bucket*.s3express-*zone-id*.*region-code*.amazonaws.com/*key-name*
 * . Path-style requests are not supported. For more information about endpoints in Availability Zones, see Regional and Zonal endpoints for directory buckets in Availability Zones in the
 * *Amazon S3 User Guide*. For more information about endpoints in Local Zones, see Concepts for directory buckets in Local Zones in the
 * *Amazon S3 User Guide*.
 *
 * Amazon S3 is a distributed system. If it receives multiple write requests for the same object
 * simultaneously, it overwrites all but the last object written. However, Amazon S3 provides features that can
 * modify this behavior:
 *
 * - **S3 Object Lock** - To prevent objects from being deleted
 * or overwritten, you can use Amazon S3 Object Lock in the *Amazon S3 User Guide*.
 *
 * This functionality is not supported for directory buckets.
 *
 * - **If-None-Match** - Uploads the object only if the object
 * key name does not already exist in the specified bucket. Otherwise, Amazon S3 returns a 412
 * Precondition Failed error. If a conflicting operation occurs during the upload, S3 returns
 * a `409 ConditionalRequestConflict` response. On a 409 failure, retry the upload.
 *
 * Expects the * character (asterisk).
 *
 * For more information, see Add preconditions to S3 operations with
 * conditional requests in the *Amazon S3 User Guide* or RFC 7232.
 *
 * This functionality is not supported for S3 on Outposts.
 *
 * - **S3 Versioning** - When you enable versioning for a bucket,
 * if Amazon S3 receives multiple write requests for the same object simultaneously, it stores all versions
 * of the objects. For each write request that is made to the same object, Amazon S3 automatically generates
 * a unique version ID of that object being stored in Amazon S3. You can retrieve, replace, or delete any
 * version of the object. For more information about versioning, see Adding Objects to
 * Versioning-Enabled Buckets in the *Amazon S3 User Guide*. For information
 * about returning the versioning state of a bucket, see GetBucketVersioning.
 *
 * This functionality is not supported for directory buckets.
 *
 * ### Permissions
 *
 * - **General purpose bucket permissions** - The following
 * permissions are required in your policies when your `PutObject` request includes
 * specific headers.
 *
 * -
 * `s3:PutObject`
 * - To successfully
 * complete the `PutObject` request, you must always have the
 * `s3:PutObject` permission on a bucket to add an object to it.
 *
 * -
 * `s3:PutObjectAcl`
 * - To successfully change the objects ACL of your `PutObject`
 * request, you must have the `s3:PutObjectAcl`.
 *
 * -
 * `s3:PutObjectTagging`
 * - To successfully set the tag-set with your `PutObject`
 * request, you must have the `s3:PutObjectTagging`.
 *
 * - **Directory bucket permissions** - To grant access to this API operation on a directory bucket, we recommend that you use the
 * `CreateSession`
 * API operation for session-based authorization. Specifically, you grant the `s3express:CreateSession` permission to the directory bucket in a bucket policy or an IAM identity-based policy. Then, you make the `CreateSession` API call on the bucket to obtain a session token. With the session token in your request header, you can make API requests to this operation. After the session token expires, you make another `CreateSession` API call to generate a new session token for use.
 * Amazon Web Services CLI or SDKs create session and refresh the session token automatically to avoid service interruptions when a session expires. For more information about authorization, see
 * `CreateSession`
 * .
 *
 * If the object is encrypted with SSE-KMS, you must also have the
 * `kms:GenerateDataKey` and `kms:Decrypt` permissions in IAM
 * identity-based policies and KMS key policies for the KMS key.
 *
 * ### Data integrity with Content-MD5
 *
 * - **General purpose bucket** - To ensure that data is not
 * corrupted traversing the network, use the `Content-MD5` header. When you use this
 * header, Amazon S3 checks the object against the provided MD5 value and, if they do not match, Amazon S3
 * returns an error. Alternatively, when the object's ETag is its MD5 digest, you can calculate
 * the MD5 while putting the object to Amazon S3 and compare the returned ETag to the calculated MD5
 * value.
 *
 * - **Directory bucket** -
 * This functionality is not supported for directory buckets.
 *
 * ### HTTP Host header syntax
 *
 * **Directory buckets ** - The HTTP Host header syntax is
 * *Bucket-name*.s3express-*zone-id*.*region-code*.amazonaws.com.
 *
 * ### Errors
 *
 * - You might receive an `InvalidRequest` error for several reasons. Depending on the reason for the error, you might receive one of the following messages:
 *
 * - Cannot specify both a write offset value and user-defined object metadata for existing
 * objects.
 *
 * - Checksum Type mismatch occurred, expected checksum Type: sha1, actual checksum Type:
 * crc32c.
 *
 * - Request body cannot be empty when 'write offset' is specified.
 *
 * For more information about related Amazon S3 APIs, see the following:
 *
 * - CopyObject
 *
 * - DeleteObject
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const putObject: API.OperationMethod<
  PutObjectRequest,
  PutObjectOutput,
  PutObjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(960, __c60, 0) as any as S.Schema<PutObjectRequest>,
  output: __S(961, __c60, 1) as any as S.Schema<PutObjectOutput>,
  errors: [
    EncryptionTypeMismatch,
    InvalidRequest,
    InvalidWriteOffset,
    TooManyParts,
    RequestLimitExceeded,
    SlowDown,
    NoSuchBucket,
    PermanentRedirect,
    PreconditionFailed,
    ConditionalRequestConflict,
    InvalidAccessKeyId,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutObject",
  telemetry: TELEMETRY,
  span: "PutObject",
}));

export type PutObjectAclError =
  | NoSuchKey
  | RequestLimitExceeded
  | SlowDown
  | PermanentRedirect
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * End of support notice: As of October 1, 2025, Amazon S3 has discontinued support for Email Grantee Access Control Lists (ACLs). If you attempt to use an Email Grantee ACL in a request after October 1, 2025,
 * the request will receive an `HTTP 405` (Method Not Allowed) error.
 *
 * This change affects the following Amazon Web Services Regions: US East (N. Virginia), US West (N. California), US West (Oregon), Asia Pacific (Singapore), Asia Pacific (Sydney), Asia Pacific (Tokyo), Europe (Ireland), and South America (São Paulo).
 *
 * This operation is not supported for directory buckets.
 *
 * Uses the `acl` subresource to set the access control list (ACL) permissions for a new or
 * existing object in an S3 bucket. You must have the `WRITE_ACP` permission to set the ACL of
 * an object. For more information, see What permissions can I grant? in the
 * *Amazon S3 User Guide*.
 *
 * This functionality is not supported for Amazon S3 on Outposts.
 *
 * Depending on your application needs, you can choose to set the ACL on an object using either the
 * request body or the headers. For example, if you have an existing application that updates a bucket ACL
 * using the request body, you can continue to use that approach. For more information, see Access Control List (ACL)
 * Overview in the *Amazon S3 User Guide*.
 *
 * If your bucket uses the bucket owner enforced setting for S3 Object Ownership, ACLs are disabled
 * and no longer affect permissions. You must use policies to grant access to your bucket and the objects
 * in it. Requests to set ACLs or update ACLs fail and return the
 * `AccessControlListNotSupported` error code. Requests to read ACLs are still supported.
 * For more information, see Controlling object ownership in
 * the *Amazon S3 User Guide*.
 *
 * ### Permissions
 *
 * You can set access permissions using one of the following methods:
 *
 * - Specify a canned ACL with the `x-amz-acl` request header. Amazon S3 supports a set
 * of predefined ACLs, known as canned ACLs. Each canned ACL has a predefined set of grantees and
 * permissions. Specify the canned ACL name as the value of `x-amz-ac`l. If you use
 * this header, you cannot use other access control-specific headers in your request. For more
 * information, see Canned ACL.
 *
 * - Specify access permissions explicitly with the `x-amz-grant-read`,
 * `x-amz-grant-read-acp`, `x-amz-grant-write-acp`, and
 * `x-amz-grant-full-control` headers. When using these headers, you specify
 * explicit access permissions and grantees (Amazon Web Services accounts or Amazon S3 groups) who will receive the
 * permission. If you use these ACL-specific headers, you cannot use `x-amz-acl`
 * header to set a canned ACL. These parameters map to the set of permissions that Amazon S3 supports
 * in an ACL. For more information, see Access Control List (ACL)
 * Overview.
 *
 * You specify each grantee as a type=value pair, where the type is one of the
 * following:
 *
 * - `id` - if the value specified is the canonical user ID of an
 * Amazon Web Services account
 *
 * - `uri` - if you are granting permissions to a predefined group
 *
 * - `emailAddress` - if the value specified is the email address of an
 * Amazon Web Services account
 *
 * Using email addresses to specify a grantee is only supported in the following Amazon Web Services Regions:
 *
 * - US East (N. Virginia)
 *
 * - US West (N. California)
 *
 * - US West (Oregon)
 *
 * - Asia Pacific (Singapore)
 *
 * - Asia Pacific (Sydney)
 *
 * - Asia Pacific (Tokyo)
 *
 * - Europe (Ireland)
 *
 * - South America (São Paulo)
 *
 * For a list of all the Amazon S3 supported Regions and endpoints, see Regions and Endpoints in the Amazon Web Services General Reference.
 *
 * For example, the following `x-amz-grant-read` header grants list objects
 * permission to the two Amazon Web Services accounts identified by their email addresses.
 *
 * x-amz-grant-read: emailAddress="xyz@amazon.com", emailAddress="abc@amazon.com"
 *
 * You can use either a canned ACL or specify access permissions explicitly. You cannot do
 * both.
 *
 * ### Grantee Values
 *
 * You can specify the person (grantee) to whom you're assigning access rights (using request
 * elements) in the following ways. For examples of how to specify these grantee values in JSON
 * format, see the Amazon Web Services CLI example in Enabling Amazon S3 server
 * access logging in the *Amazon S3 User Guide*.
 *
 * - By the person's ID:
 *
 * <>ID<><>GranteesEmail<>
 *
 * DisplayName is optional and ignored in the request.
 *
 * - By URI:
 *
 * <>http://acs.amazonaws.com/groups/global/AuthenticatedUsers<>
 *
 * - By Email address:
 *
 * <>Grantees@email.com<>lt;/Grantee>
 *
 * The grantee is resolved to the CanonicalUser and, in a response to a GET Object acl
 * request, appears as the CanonicalUser.
 *
 * Using email addresses to specify a grantee is only supported in the following Amazon Web Services Regions:
 *
 * - US East (N. Virginia)
 *
 * - US West (N. California)
 *
 * - US West (Oregon)
 *
 * - Asia Pacific (Singapore)
 *
 * - Asia Pacific (Sydney)
 *
 * - Asia Pacific (Tokyo)
 *
 * - Europe (Ireland)
 *
 * - South America (São Paulo)
 *
 * For a list of all the Amazon S3 supported Regions and endpoints, see Regions and Endpoints in the Amazon Web Services General Reference.
 *
 * ### Versioning
 *
 * The ACL of an object is set at the object version level. By default, PUT sets the ACL of the
 * current version of an object. To set the ACL of a different version, use the
 * `versionId` subresource.
 *
 * The following operations are related to `PutObjectAcl`:
 *
 * - CopyObject
 *
 * - GetObject
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const putObjectAcl: API.OperationMethod<
  PutObjectAclRequest,
  PutObjectAclOutput,
  PutObjectAclError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(976, __c61, 0) as any as S.Schema<PutObjectAclRequest>,
  output: __S(977, __c61, 1) as any as S.Schema<PutObjectAclOutput>,
  errors: [NoSuchKey, RequestLimitExceeded, SlowDown, PermanentRedirect, InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutObjectAcl",
  telemetry: TELEMETRY,
  span: "PutObjectAcl",
}));

export type PutObjectAnnotationError =
  | AnnotationLimitExceeded
  | AnnotationNameTooLong
  | InvalidAnnotationName
  | InvalidRequest
  | NoSuchBucket
  | NoSuchKey
  | UnsupportedMediaType
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * Attaches an annotation to an Amazon S3 object. An annotation is a named payload of 1 byte to 1 MiB
 * that you can associate with a specific object or object version. Each object can have up to 1,000
 * annotations.
 *
 * For annotation naming rules and restrictions, see Annotation naming guidelines
 * in the *Amazon S3 User Guide*.
 *
 * Annotations inherit the encryption of their parent object. For objects without server-side
 * encryption, annotations are encrypted with SSE-S3 (the default for new objects). Objects
 * encrypted with SSE-C cannot have annotations.
 *
 * To use this operation, you must have the `s3:PutObjectAnnotation` permission. If the
 * bucket has Requester Pays enabled, you must include the `x-amz-request-payer` header.
 *
 * Annotations are not supported by the following features: S3 Inventory Reports,
 * API Gateway, S3 Storage Lens, Amazon S3 File Gateway, Amazon FSx, S3 on Outposts, and
 * S3 Express One Zone (directory buckets).
 *
 * The following operations are related to `PutObjectAnnotation`:
 *
 * - GetObjectAnnotation
 *
 * - ListObjectAnnotations
 *
 * - DeleteObjectAnnotation
 */
export const putObjectAnnotation: API.OperationMethod<
  PutObjectAnnotationRequest,
  PutObjectAnnotationOutput,
  PutObjectAnnotationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(992, __c62, 0) as any as S.Schema<PutObjectAnnotationRequest>,
  output: __S(993, __c62, 1) as any as S.Schema<PutObjectAnnotationOutput>,
  errors: [
    AnnotationLimitExceeded,
    AnnotationNameTooLong,
    InvalidAnnotationName,
    InvalidRequest,
    NoSuchBucket,
    NoSuchKey,
    UnsupportedMediaType,
    InvalidAccessKeyId,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutObjectAnnotation",
  telemetry: TELEMETRY,
  span: "PutObjectAnnotation",
}));

export type PutObjectLegalHoldError =
  | RequestLimitExceeded
  | SlowDown
  | MalformedXML
  | InvalidRequest
  | NoSuchKey
  | NoSuchVersion
  | MethodNotAllowed
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * This operation is not supported for directory buckets.
 *
 * Applies a legal hold configuration to the specified object. For more information, see Locking Objects.
 *
 * This functionality is not supported for Amazon S3 on Outposts.
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const putObjectLegalHold: API.OperationMethod<
  PutObjectLegalHoldRequest,
  PutObjectLegalHoldOutput,
  PutObjectLegalHoldError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1008, __c63, 0) as any as S.Schema<PutObjectLegalHoldRequest>,
  output: __S(1009, __c63, 1) as any as S.Schema<PutObjectLegalHoldOutput>,
  errors: [
    RequestLimitExceeded,
    SlowDown,
    MalformedXML,
    InvalidRequest,
    NoSuchKey,
    NoSuchVersion,
    MethodNotAllowed,
    InvalidAccessKeyId,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutObjectLegalHold",
  telemetry: TELEMETRY,
  span: "PutObjectLegalHold",
}));

export type PutObjectLockConfigurationError =
  | RequestLimitExceeded
  | SlowDown
  | InvalidBucketState
  | NoSuchBucket
  | PermanentRedirect
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * This operation is not supported for directory buckets.
 *
 * Places an Object Lock configuration on the specified bucket. The rule specified in the Object Lock
 * configuration will be applied by default to every new object placed in the specified bucket. For more
 * information, see Locking
 * Objects.
 *
 * - The `DefaultRetention` settings require both a mode and a period.
 *
 * - The `DefaultRetention` period can be either `Days` or `Years`
 * but you must select one. You cannot specify `Days` and `Years` at the same
 * time.
 *
 * - You can enable Object Lock for new or existing buckets. For more information, see Configuring
 * Object Lock.
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const putObjectLockConfiguration: API.OperationMethod<
  PutObjectLockConfigurationRequest,
  PutObjectLockConfigurationOutput,
  PutObjectLockConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1024, __c64, 0) as any as S.Schema<PutObjectLockConfigurationRequest>,
  output: __S(1025, __c64, 1) as any as S.Schema<PutObjectLockConfigurationOutput>,
  errors: [
    RequestLimitExceeded,
    SlowDown,
    InvalidBucketState,
    NoSuchBucket,
    PermanentRedirect,
    InvalidAccessKeyId,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutObjectLockConfiguration",
  telemetry: TELEMETRY,
  span: "PutObjectLockConfiguration",
}));

export type PutObjectRetentionError =
  | RequestLimitExceeded
  | SlowDown
  | InvalidRequest
  | NoSuchKey
  | NoSuchVersion
  | MethodNotAllowed
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * This operation is not supported for directory buckets.
 *
 * Places an Object Retention configuration on an object. For more information, see Locking Objects. Users or
 * accounts require the `s3:PutObjectRetention` permission in order to place an Object Retention
 * configuration on objects. Bypassing a Governance Retention configuration requires the
 * `s3:BypassGovernanceRetention` permission.
 *
 * This functionality is not supported for Amazon S3 on Outposts.
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const putObjectRetention: API.OperationMethod<
  PutObjectRetentionRequest,
  PutObjectRetentionOutput,
  PutObjectRetentionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1040, __c65, 0) as any as S.Schema<PutObjectRetentionRequest>,
  output: __S(1041, __c65, 1) as any as S.Schema<PutObjectRetentionOutput>,
  errors: [
    RequestLimitExceeded,
    SlowDown,
    InvalidRequest,
    NoSuchKey,
    NoSuchVersion,
    MethodNotAllowed,
    InvalidAccessKeyId,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutObjectRetention",
  telemetry: TELEMETRY,
  span: "PutObjectRetention",
}));

export type PutObjectTaggingError =
  | RequestLimitExceeded
  | SlowDown
  | NoSuchKey
  | PermanentRedirect
  | NoSuchVersion
  | MethodNotAllowed
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * This operation is not supported for directory buckets.
 *
 * Sets the supplied tag-set to an object that already exists in a bucket. A tag is a key-value pair.
 * For more information, see Object Tagging.
 *
 * You can associate tags with an object by sending a PUT request against the tagging subresource that
 * is associated with the object. You can retrieve tags by sending a GET request. For more information, see
 * GetObjectTagging.
 *
 * For tagging-related restrictions related to characters and encodings, see Tag
 * Restrictions. Note that Amazon S3 limits the maximum number of tags to 10 tags per object.
 *
 * To use this operation, you must have permission to perform the `s3:PutObjectTagging`
 * action. By default, the bucket owner has this permission and can grant this permission to others.
 *
 * To put tags of any other version, use the `versionId` query parameter. You also need
 * permission for the `s3:PutObjectVersionTagging` action.
 *
 * `PutObjectTagging` has the following special errors. For more Amazon S3 errors see, Error Responses.
 *
 * - `InvalidTag` - The tag provided was not a valid tag. This error can occur if
 * the tag did not pass input validation. For more information, see Object Tagging.
 *
 * - `MalformedXML` - The XML provided does not match the schema.
 *
 * - `OperationAborted` - A conflicting conditional action is currently in progress
 * against this resource. Please try again.
 *
 * - `InternalError` - The service was unable to apply the provided tag to the
 * object.
 *
 * The following operations are related to `PutObjectTagging`:
 *
 * - GetObjectTagging
 *
 * - DeleteObjectTagging
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const putObjectTagging: API.OperationMethod<
  PutObjectTaggingRequest,
  PutObjectTaggingOutput,
  PutObjectTaggingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1056, __c66, 0) as any as S.Schema<PutObjectTaggingRequest>,
  output: __S(1057, __c66, 1) as any as S.Schema<PutObjectTaggingOutput>,
  errors: [
    RequestLimitExceeded,
    SlowDown,
    NoSuchKey,
    PermanentRedirect,
    NoSuchVersion,
    MethodNotAllowed,
    InvalidAccessKeyId,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutObjectTagging",
  telemetry: TELEMETRY,
  span: "PutObjectTagging",
}));

export type PutPublicAccessBlockError =
  | RequestLimitExceeded
  | SlowDown
  | NoSuchBucket
  | PermanentRedirect
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * This operation is not supported for directory buckets.
 *
 * Creates or modifies the `PublicAccessBlock` configuration for an Amazon S3 bucket. To use this
 * operation, you must have the `s3:PutBucketPublicAccessBlock` permission. For more information
 * about Amazon S3 permissions, see Specifying Permissions in a
 * Policy.
 *
 * When Amazon S3 evaluates the `PublicAccessBlock` configuration for a bucket or an
 * object, it checks the `PublicAccessBlock` configuration for both the bucket (or
 * the bucket that contains the object) and the bucket owner's account. Account-level settings
 * automatically inherit from organization-level policies when present. If the
 * `PublicAccessBlock` configurations are different between the bucket and the
 * account, Amazon S3 uses the most restrictive combination of the bucket-level and account-level
 * settings.
 *
 * For more information about when Amazon S3 considers a bucket or an object public, see The Meaning of "Public".
 *
 * The following operations are related to `PutPublicAccessBlock`:
 *
 * - GetPublicAccessBlock
 *
 * - DeletePublicAccessBlock
 *
 * - GetBucketPolicyStatus
 *
 * - Using Amazon S3 Block Public Access
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const putPublicAccessBlock: API.OperationMethod<
  PutPublicAccessBlockRequest,
  PutPublicAccessBlockResponse,
  PutPublicAccessBlockError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1072, __c67, 0) as any as S.Schema<PutPublicAccessBlockRequest>,
  output: __S(1073, __c67, 1) as any as S.Schema<PutPublicAccessBlockResponse>,
  errors: [RequestLimitExceeded, SlowDown, NoSuchBucket, PermanentRedirect, InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutPublicAccessBlock",
  telemetry: TELEMETRY,
  span: "PutPublicAccessBlock",
}));

export type RenameObjectError = IdempotencyParameterMismatch | InvalidAccessKeyId | CommonErrors;
/**
 * Renames an existing object in a directory bucket that uses the S3 Express One Zone storage class.
 * You can use `RenameObject` by specifying an existing object's name as the source and the new
 * name of the object as the destination within the same directory bucket.
 *
 * `RenameObject` is only supported for objects stored in the S3 Express One Zone storage
 * class.
 *
 * To prevent overwriting an object, you can use the `If-None-Match` conditional
 * header.
 *
 * - **If-None-Match** - Renames the object only if an object
 * with the specified name does not already exist in the directory bucket. If you don't want to
 * overwrite an existing object, you can add the `If-None-Match` conditional header with the
 * value `'*'` in the `RenameObject` request. Amazon S3 then returns a 412
 * Precondition Failed error if the object with the specified name already exists. For more
 * information, see RFC 7232.
 *
 * ### Permissions
 *
 * To grant access to the `RenameObject` operation on a directory bucket, we
 * recommend that you use the `CreateSession` operation for session-based authorization.
 * Specifically, you grant the `s3express:CreateSession` permission to the directory
 * bucket in a bucket policy or an IAM identity-based policy. Then, you make the
 * `CreateSession` API call on the directory bucket to obtain a session token. With the
 * session token in your request header, you can make API requests to this operation. After the
 * session token expires, you make another `CreateSession` API call to generate a new
 * session token for use. The Amazon Web Services CLI and SDKs will create and manage your session including
 * refreshing the session token automatically to avoid service interruptions when a session expires.
 * In your bucket policy, you can specify the `s3express:SessionMode` condition key to
 * control who can create a `ReadWrite` or `ReadOnly` session. A
 * `ReadWrite` session is required for executing all the Zonal endpoint API operations,
 * including `RenameObject`. For more information about authorization, see
 * `CreateSession`
 * . To learn more about Zonal endpoint API operations, see
 * Authorizing Zonal endpoint API operations with CreateSession in the Amazon S3 User
 * Guide.
 *
 * ### HTTP Host header syntax
 *
 * **Directory buckets ** - The HTTP Host header syntax is
 * *Bucket-name*.s3express-*zone-id*.*region-code*.amazonaws.com.
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const renameObject: API.OperationMethod<
  RenameObjectRequest,
  RenameObjectOutput,
  RenameObjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1088, __c68, 0) as any as S.Schema<RenameObjectRequest>,
  output: __S(1089, __c68, 1) as any as S.Schema<RenameObjectOutput>,
  errors: [IdempotencyParameterMismatch, InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RenameObject",
  telemetry: TELEMETRY,
  span: "RenameObject",
}));

export type RestoreObjectError =
  | ObjectAlreadyInActiveTierError
  | RequestLimitExceeded
  | SlowDown
  | NoSuchKey
  | PermanentRedirect
  | InvalidObjectState
  | NoSuchVersion
  | MethodNotAllowed
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * This operation is not supported for directory buckets.
 *
 * Restores an archived copy of an object back into Amazon S3
 *
 * This functionality is not supported for Amazon S3 on Outposts.
 *
 * This action performs the following types of requests:
 *
 * - `restore an archive` - Restore an archived object
 *
 * For more information about the `S3` structure in the request body, see the
 * following:
 *
 * - PutObject
 *
 * - Managing Access
 * with ACLs in the *Amazon S3 User Guide*
 *
 * - Protecting Data
 * Using Server-Side Encryption in the *Amazon S3 User Guide*
 *
 * ### Permissions
 *
 * To use this operation, you must have permissions to perform the `s3:RestoreObject`
 * action. The bucket owner has this permission by default and can grant this permission to others.
 * For more information about permissions, see Permissions Related to Bucket Subresource Operations and Managing Access Permissions to Your Amazon S3
 * Resources in the *Amazon S3 User Guide*.
 *
 * ### Restoring objects
 *
 * Objects that you archive to the S3 Glacier Flexible Retrieval or S3 Glacier Deep Archive
 * storage class, and S3 Intelligent-Tiering Archive or S3 Intelligent-Tiering Deep Archive tiers, are not accessible in
 * real time. For objects in the S3 Glacier Flexible Retrieval or S3 Glacier Deep Archive
 * storage classes, you must first initiate a restore request, and then wait until a temporary copy
 * of the object is available. If you want a permanent copy of the object, create a copy of it in the
 * Amazon S3 Standard storage class in your S3 bucket. To access an archived object, you must restore the
 * object for the duration (number of days) that you specify. For objects in the Archive Access or
 * Deep Archive Access tiers of S3 Intelligent-Tiering, you must first initiate a restore request, and
 * then wait until the object is moved into the Frequent Access tier.
 *
 * To restore a specific object version, you can provide a version ID. If you don't provide a
 * version ID, Amazon S3 restores the current version.
 *
 * When restoring an archived object, you can specify one of the following data access tier
 * options in the `Tier` element of the request body:
 *
 * - `Expedited` - Expedited retrievals allow you to quickly access your data stored
 * in the S3 Glacier Flexible Retrieval storage class or S3 Intelligent-Tiering Archive tier when occasional
 * urgent requests for restoring archives are required. For all but the largest archived objects
 * (250 MB+), data accessed using Expedited retrievals is typically made available within 1-5
 * minutes. Provisioned capacity ensures that retrieval capacity for Expedited retrievals is
 * available when you need it. Expedited retrievals and provisioned capacity are not available
 * for objects stored in the S3 Glacier Deep Archive storage class or
 * S3 Intelligent-Tiering Deep Archive tier.
 *
 * - `Standard` - Standard retrievals allow you to access any of your archived
 * objects within several hours. This is the default option for retrieval requests that do not
 * specify the retrieval option. Standard retrievals typically finish within 3-5 hours for
 * objects stored in the S3 Glacier Flexible Retrieval storage class or S3 Intelligent-Tiering Archive tier.
 * They typically finish within 12 hours for objects stored in the
 * S3 Glacier Deep Archive storage class or S3 Intelligent-Tiering Deep Archive tier. Standard
 * retrievals are free for objects stored in S3 Intelligent-Tiering.
 *
 * - `Bulk` - Bulk retrievals free for objects stored in the S3 Glacier Flexible
 * Retrieval and S3 Intelligent-Tiering storage classes, enabling you to retrieve large amounts,
 * even petabytes, of data at no cost. Bulk retrievals typically finish within 5-12 hours for
 * objects stored in the S3 Glacier Flexible Retrieval storage class or S3 Intelligent-Tiering Archive tier.
 * Bulk retrievals are also the lowest-cost retrieval option when restoring objects from
 * S3 Glacier Deep Archive. They typically finish within 48 hours for objects stored in
 * the S3 Glacier Deep Archive storage class or S3 Intelligent-Tiering Deep Archive tier.
 *
 * For more information about archive retrieval options and provisioned capacity for
 * `Expedited` data access, see Restoring Archived Objects in the
 * *Amazon S3 User Guide*.
 *
 * You can use Amazon S3 restore speed upgrade to change the restore speed to a faster speed while it
 * is in progress. For more information, see
 * Upgrading the speed of an in-progress restore in the
 * *Amazon S3 User Guide*.
 *
 * To get the status of object restoration, you can send a `HEAD` request. Operations
 * return the `x-amz-restore` header, which provides information about the restoration
 * status, in the response. You can use Amazon S3 event notifications to notify you when a restore is
 * initiated or completed. For more information, see Configuring Amazon S3 Event Notifications in
 * the *Amazon S3 User Guide*.
 *
 * After restoring an archived object, you can update the restoration period by reissuing the
 * request with a new period. Amazon S3 updates the restoration period relative to the current time and
 * charges only for the request-there are no data transfer charges. You cannot update the
 * restoration period when Amazon S3 is actively processing your current restore request for the
 * object.
 *
 * If your bucket has a lifecycle configuration with a rule that includes an expiration action,
 * the object expiration overrides the life span that you specify in a restore request. For example,
 * if you restore an object copy for 10 days, but the object is scheduled to expire in 3 days, Amazon S3
 * deletes the object in 3 days. For more information about lifecycle configuration, see PutBucketLifecycleConfiguration and Object Lifecycle Management in
 * *Amazon S3 User Guide*.
 *
 * ### Responses
 *
 * A successful action returns either the `200 OK` or `202 Accepted` status
 * code.
 *
 * - If the object is not previously restored, then Amazon S3 returns `202 Accepted` in
 * the response.
 *
 * - If the object is previously restored, Amazon S3 returns `200 OK` in the response.
 *
 * - Special errors:
 *
 * - *Code: RestoreAlreadyInProgress*
 *
 * - *Cause: Object restore is already in progress.*
 *
 * - *HTTP Status Code: 409 Conflict*
 *
 * - *SOAP Fault Code Prefix: Client*
 *
 * -
 *
 * - *Code: GlacierExpeditedRetrievalNotAvailable*
 *
 * - Cause: expedited retrievals are currently not available. Try again later.
 * (Returned if there is insufficient capacity to process the Expedited request. This error
 * applies only to Expedited retrievals and not to S3 Standard or Bulk
 * retrievals.)
 *
 * - *HTTP Status Code: 503*
 *
 * - *SOAP Fault Code Prefix: N/A*
 *
 * The following operations are related to `RestoreObject`:
 *
 * - PutBucketLifecycleConfiguration
 *
 * - GetBucketNotificationConfiguration
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const restoreObject: API.OperationMethod<
  RestoreObjectRequest,
  RestoreObjectOutput,
  RestoreObjectError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1112, __c69, 8) as any as S.Schema<RestoreObjectRequest>,
  output: __S(1113, __c69, 9) as any as S.Schema<RestoreObjectOutput>,
  errors: [
    ObjectAlreadyInActiveTierError,
    RequestLimitExceeded,
    SlowDown,
    NoSuchKey,
    PermanentRedirect,
    InvalidObjectState,
    NoSuchVersion,
    MethodNotAllowed,
    InvalidAccessKeyId,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RestoreObject",
  telemetry: TELEMETRY,
  span: "RestoreObject",
}));

export type SelectObjectContentError =
  | RequestLimitExceeded
  | SlowDown
  | PermanentRedirect
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * This operation is not supported for directory buckets.
 *
 * This action filters the contents of an Amazon S3 object based on a simple structured query language (SQL)
 * statement. In the request, along with the SQL expression, you must also specify a data serialization
 * format (JSON, CSV, or Apache Parquet) of the object. Amazon S3 uses this format to parse object data into
 * records, and returns only records that match the specified SQL expression. You must also specify the
 * data serialization format for the response.
 *
 * This functionality is not supported for Amazon S3 on Outposts.
 *
 * For more information about Amazon S3 Select, see Selecting Content from Objects
 * and SELECT Command in
 * the *Amazon S3 User Guide*.
 *
 * ### Permissions
 *
 * You must have the `s3:GetObject` permission for this operation. Amazon S3 Select does
 * not support anonymous access. For more information about permissions, see Specifying Permissions
 * in a Policy in the *Amazon S3 User Guide*.
 *
 * ### Object Data Formats
 *
 * You can use Amazon S3 Select to query objects that have the following format properties:
 *
 * - *CSV, JSON, and Parquet* - Objects must be in CSV, JSON, or Parquet
 * format.
 *
 * - *UTF-8* - UTF-8 is the only encoding type Amazon S3 Select supports.
 *
 * - *GZIP or BZIP2* - CSV and JSON files can be compressed using GZIP or
 * BZIP2. GZIP and BZIP2 are the only compression formats that Amazon S3 Select supports for CSV and
 * JSON files. Amazon S3 Select supports columnar compression for Parquet using GZIP or Snappy. Amazon S3
 * Select does not support whole-object compression for Parquet objects.
 *
 * - *Server-side encryption* - Amazon S3 Select supports querying objects that
 * are protected with server-side encryption.
 *
 * For objects that are encrypted with customer-provided encryption keys (SSE-C), you must
 * use HTTPS, and you must use the headers that are documented in the GetObject. For more information about
 * SSE-C, see Server-Side Encryption
 * (Using Customer-Provided Encryption Keys) in the
 * *Amazon S3 User Guide*.
 *
 * For objects that are encrypted with Amazon S3 managed keys (SSE-S3) and Amazon Web Services KMS keys
 * (SSE-KMS), server-side encryption is handled transparently, so you don't need to specify
 * anything. For more information about server-side encryption, including SSE-S3 and SSE-KMS, see
 * Protecting
 * Data Using Server-Side Encryption in the
 * *Amazon S3 User Guide*.
 *
 * ### Working with the Response Body
 *
 * Given the response size is unknown, Amazon S3 Select streams the response as a series of messages
 * and includes a `Transfer-Encoding` header with `chunked` as its value in the
 * response. For more information, see Appendix: SelectObjectContent
 * Response.
 *
 * ### GetObject Support
 *
 * The `SelectObjectContent` action does not support the following
 * `GetObject` functionality. For more information, see GetObject.
 *
 * - `Range`: Although you can specify a scan range for an Amazon S3 Select request (see
 * SelectObjectContentRequest - ScanRange in the request parameters), you
 * cannot specify the range of bytes of an object to return.
 *
 * - The `GLACIER`, `DEEP_ARCHIVE`, and `REDUCED_REDUNDANCY`
 * storage classes, or the `ARCHIVE_ACCESS` and `DEEP_ARCHIVE_ACCESS`
 * access tiers of the `INTELLIGENT_TIERING` storage class: You cannot query objects
 * in the `GLACIER`, `DEEP_ARCHIVE`, or `REDUCED_REDUNDANCY`
 * storage classes, nor objects in the `ARCHIVE_ACCESS` or
 * `DEEP_ARCHIVE_ACCESS` access tiers of the `INTELLIGENT_TIERING`
 * storage class. For more information about storage classes, see Using Amazon S3 storage classes
 * in the *Amazon S3 User Guide*.
 *
 * ### Special Errors
 *
 * For a list of special errors for this operation, see List of SELECT
 * Object Content Error Codes
 *
 * The following operations are related to `SelectObjectContent`:
 *
 * - GetObject
 *
 * - GetBucketLifecycleConfiguration
 *
 * - PutBucketLifecycleConfiguration
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const selectObjectContent: API.OperationMethod<
  SelectObjectContentRequest,
  SelectObjectContentOutput,
  SelectObjectContentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1138, __c71, 2) as any as S.Schema<SelectObjectContentRequest>,
  output: __S(1147, __c71, 11) as any as S.Schema<SelectObjectContentOutput>,
  errors: [RequestLimitExceeded, SlowDown, PermanentRedirect, InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SelectObjectContent",
  telemetry: TELEMETRY,
  span: "SelectObjectContent",
}));

export type UpdateBucketMetadataAnnotationTableConfigurationError =
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * Updates the annotation table configuration for an Amazon S3 bucket's metadata configuration. Use this
 * operation to enable or disable the annotation table, or to update its associated IAM role.
 *
 * An annotation table is a queryable Iceberg table that contains records of all annotations
 * attached to objects in the bucket. To use this operation, the bucket must have an existing Amazon S3
 * Metadata configuration.
 *
 * To use this operation, you must have the
 * `s3:UpdateBucketMetadataAnnotationTableConfiguration` permission. If you are specifying
 * or changing the IAM role, you must also have `iam:PassRole` permission for the role.
 *
 * The IAM role must have a trust policy that allows the Amazon S3 metadata service to assume it, and a
 * permissions policy that grants the actions needed to read annotations from your bucket. The
 * following examples show a trust policy and a permissions policy that you can adapt for your bucket
 * and account.
 *
 * The following operations are related to
 * `UpdateBucketMetadataAnnotationTableConfiguration`:
 *
 * - CreateBucketMetadataConfiguration
 *
 * - GetBucketMetadataConfiguration
 */
export const updateBucketMetadataAnnotationTableConfiguration: API.OperationMethod<
  UpdateBucketMetadataAnnotationTableConfigurationRequest,
  UpdateBucketMetadataAnnotationTableConfigurationResponse,
  UpdateBucketMetadataAnnotationTableConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(
    1153,
    __c72,
    1,
  ) as any as S.Schema<UpdateBucketMetadataAnnotationTableConfigurationRequest>,
  output: __S(
    1154,
    __c72,
    2,
  ) as any as S.Schema<UpdateBucketMetadataAnnotationTableConfigurationResponse>,
  errors: [InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBucketMetadataAnnotationTableConfiguration",
  telemetry: TELEMETRY,
  span: "UpdateBucketMetadataAnnotationTableConfiguration",
}));

export type UpdateBucketMetadataInventoryTableConfigurationError =
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * Enables or disables a live inventory table for an S3 Metadata configuration on a general
 * purpose bucket. For more information, see
 * Accelerating
 * data discovery with S3 Metadata in the *Amazon S3 User Guide*.
 *
 * ### Permissions
 *
 * To use this operation, you must have the following permissions. For more information, see
 * Setting up permissions for configuring metadata tables in the
 * *Amazon S3 User Guide*.
 *
 * If you want to encrypt your inventory table with server-side encryption with Key Management Service
 * (KMS) keys (SSE-KMS), you need additional permissions in your KMS key policy. For more
 * information, see
 * Setting up permissions for configuring metadata tables in the
 * *Amazon S3 User Guide*.
 *
 * - `s3:UpdateBucketMetadataInventoryTableConfiguration`
 *
 * - `s3tables:CreateTableBucket`
 *
 * - `s3tables:CreateNamespace`
 *
 * - `s3tables:GetTable`
 *
 * - `s3tables:CreateTable`
 *
 * - `s3tables:PutTablePolicy`
 *
 * - `s3tables:PutTableEncryption`
 *
 * - `kms:DescribeKey`
 *
 * The following operations are related to `UpdateBucketMetadataInventoryTableConfiguration`:
 *
 * - CreateBucketMetadataConfiguration
 *
 * - DeleteBucketMetadataConfiguration
 *
 * - GetBucketMetadataConfiguration
 *
 * - UpdateBucketMetadataJournalTableConfiguration
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const updateBucketMetadataInventoryTableConfiguration: API.OperationMethod<
  UpdateBucketMetadataInventoryTableConfigurationRequest,
  UpdateBucketMetadataInventoryTableConfigurationResponse,
  UpdateBucketMetadataInventoryTableConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(
    1169,
    __c73,
    1,
  ) as any as S.Schema<UpdateBucketMetadataInventoryTableConfigurationRequest>,
  output: __S(
    1170,
    __c73,
    2,
  ) as any as S.Schema<UpdateBucketMetadataInventoryTableConfigurationResponse>,
  errors: [InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBucketMetadataInventoryTableConfiguration",
  telemetry: TELEMETRY,
  span: "UpdateBucketMetadataInventoryTableConfiguration",
}));

export type UpdateBucketMetadataJournalTableConfigurationError = InvalidAccessKeyId | CommonErrors;
/**
 * Enables or disables journal table record expiration for an S3 Metadata configuration on a general
 * purpose bucket. For more information, see
 * Accelerating
 * data discovery with S3 Metadata in the *Amazon S3 User Guide*.
 *
 * ### Permissions
 *
 * To use this operation, you must have the `s3:UpdateBucketMetadataJournalTableConfiguration`
 * permission. For more information, see Setting up permissions for
 * configuring metadata tables in the *Amazon S3 User Guide*.
 *
 * The following operations are related to `UpdateBucketMetadataJournalTableConfiguration`:
 *
 * - CreateBucketMetadataConfiguration
 *
 * - DeleteBucketMetadataConfiguration
 *
 * - GetBucketMetadataConfiguration
 *
 * - UpdateBucketMetadataInventoryTableConfiguration
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const updateBucketMetadataJournalTableConfiguration: API.OperationMethod<
  UpdateBucketMetadataJournalTableConfigurationRequest,
  UpdateBucketMetadataJournalTableConfigurationResponse,
  UpdateBucketMetadataJournalTableConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(
    1185,
    __c74,
    1,
  ) as any as S.Schema<UpdateBucketMetadataJournalTableConfigurationRequest>,
  output: __S(
    1186,
    __c74,
    2,
  ) as any as S.Schema<UpdateBucketMetadataJournalTableConfigurationResponse>,
  errors: [InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateBucketMetadataJournalTableConfiguration",
  telemetry: TELEMETRY,
  span: "UpdateBucketMetadataJournalTableConfiguration",
}));

export type UpdateObjectEncryptionError =
  | AccessDenied
  | InvalidRequest
  | NoSuchKey
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * This operation is not supported for directory buckets or Amazon S3 on Outposts buckets.
 *
 * Updates the server-side encryption type of an existing encrypted object in a general purpose bucket.
 * You can use the `UpdateObjectEncryption` operation to change encrypted objects from
 * server-side encryption with Amazon S3 managed keys (SSE-S3) to server-side encryption with Key Management Service (KMS)
 * keys (SSE-KMS), or to apply S3 Bucket Keys. You can also use the `UpdateObjectEncryption` operation
 * to change the customer-managed KMS key used to encrypt your data so that you can comply with custom
 * key-rotation standards.
 *
 * Using the `UpdateObjectEncryption` operation, you can atomically update the server-side
 * encryption type of an existing object in a general purpose bucket without any data movement. The
 * `UpdateObjectEncryption` operation uses envelope encryption to re-encrypt the data key used to
 * encrypt and decrypt your object with your newly specified server-side encryption type. In other words,
 * when you use the `UpdateObjectEncryption` operation, your data isn't copied, archived
 * objects in the S3 Glacier Flexible Retrieval and S3 Glacier Deep Archive storage classes aren't
 * restored, and objects in the S3 Intelligent-Tiering storage class aren't moved between tiers.
 * Additionally, the `UpdateObjectEncryption` operation preserves all object metadata
 * properties, including the storage class, creation date, last modified date, ETag, and checksum
 * properties. For more information, see
 *
 * Updating server-side encryption for existing objects in the
 * *Amazon S3 User Guide*.
 *
 * By default, all `UpdateObjectEncryption` requests that specify a customer-managed
 * KMS key are restricted to KMS keys that are owned by the bucket owner's Amazon Web Services account. If you're
 * using Organizations, you can request the ability to use KMS keys owned by other member
 * accounts within your organization by contacting Amazon Web Services Support.
 *
 * Source objects that are unencrypted, or encrypted with either dual-layer server-side encryption
 * with KMS keys (DSSE-KMS) or server-side encryption with customer-provided keys (SSE-C) aren't
 * supported by this operation. Additionally, you cannot specify SSE-S3 encryption as the requested
 * new encryption type `UpdateObjectEncryption` request.
 *
 * ### Permissions
 *
 * - To use the `UpdateObjectEncryption` operation, you must have the following
 * permissions:
 *
 * - `s3:UpdateObjectEncryption`
 *
 * - `kms:Encrypt`
 *
 * - `kms:Decrypt`
 *
 * - `kms:GenerateDataKey`
 *
 * - `kms:ReEncrypt*`
 *
 * - If you're using Organizations, to use this operation with customer-managed
 * KMS keys from other Amazon Web Services accounts within your organization, you must have the
 * `organizations:DescribeAccount` permission.
 *
 * ### Errors
 *
 * - You might receive an `InvalidRequest` error for several reasons. Depending
 * on the reason for the error, you might receive one of the following messages:
 *
 * - The `UpdateObjectEncryption` operation doesn't supported unencrypted
 * source objects. Only source objects encrypted with SSE-S3 or SSE-KMS are supported.
 *
 * - The `UpdateObjectEncryption` operation doesn't support source objects
 * with the encryption type DSSE-KMS or SSE-C. Only source objects encrypted with SSE-S3
 * or SSE-KMS are supported.
 *
 * - The `UpdateObjectEncryption` operation doesn't support updating the
 * encryption type to DSSE-KMS or SSE-C. Modify the request to specify SSE-KMS
 * for the updated encryption type, and then try again.
 *
 * - Requests that modify an object encryption configuration require Amazon Web Services Signature
 * Version 4. Modify the request to use Amazon Web Services Signature Version 4, and then try again.
 *
 * - Requests that modify an object encryption configuration require a valid new
 * encryption type. Valid values are `SSEKMS`. Modify the request to specify
 * SSE-KMS for the updated encryption type, and then try again.
 *
 * - Requests that modify an object's encryption type to SSE-KMS require an Amazon Web Services KMS key
 * Amazon Resource Name (ARN). Modify the request to specify a KMS key ARN, and then
 * try again.
 *
 * - Requests that modify an object's encryption type to SSE-KMS require a valid
 * Amazon Web Services KMS key Amazon Resource Name (ARN). Confirm that you have a correctly formatted
 * KMS key ARN in your request, and then try again.
 *
 * - The `BucketKeyEnabled` value isn't valid. Valid values are
 * `true` or `false`. Modify the request to specify a valid value,
 * and then try again.
 *
 * - You might receive an `AccessDenied` error for several reasons. Depending on
 * the reason for the error, you might receive one of the following messages:
 *
 * - The Amazon Web Services KMS key in the request must be owned by the same account as the bucket. Modify
 * the request to specify a KMS key from the same account, and then try again.
 *
 * - The bucket owner's account was approved to make `UpdateObjectEncryption` requests
 * that use any Amazon Web Services KMS key in their organization, but the bucket owner's account isn't part of
 * an organization in Organizations. Make sure that the bucket owner's account and the
 * specified KMS key belong to the same organization, and then try again.
 *
 * - The specified Amazon Web Services KMS key must be from the same organization in Organizations as
 * the bucket. Specify a KMS key that belongs to the same organization as the bucket, and then
 * try again.
 *
 * - The encryption type for the specified object can't be updated because that object is
 * protected by S3 Object Lock. If the object has a governance-mode retention period or a legal
 * hold, you must first remove the Object Lock status on the object before you issue your
 * `UpdateObjectEncryption` request. You can't use the `UpdateObjectEncryption`
 * operation with objects that have an Object Lock compliance mode retention period applied to them.
 */
export const updateObjectEncryption: API.OperationMethod<
  UpdateObjectEncryptionRequest,
  UpdateObjectEncryptionResponse,
  UpdateObjectEncryptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1202, __c75, 2) as any as S.Schema<UpdateObjectEncryptionRequest>,
  output: __S(1203, __c75, 3) as any as S.Schema<UpdateObjectEncryptionResponse>,
  errors: [AccessDenied, InvalidRequest, NoSuchKey, InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateObjectEncryption",
  telemetry: TELEMETRY,
  span: "UpdateObjectEncryption",
}));

export type UploadPartError =
  | RequestLimitExceeded
  | SlowDown
  | NoSuchBucket
  | PermanentRedirect
  | NoSuchUpload
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * Uploads a part in a multipart upload.
 *
 * In this operation, you provide new data as a part of an object in your request. However, you have
 * an option to specify your existing Amazon S3 object as a data source for the part you are uploading. To
 * upload a part from an existing object, you use the UploadPartCopy operation.
 *
 * You must initiate a multipart upload (see CreateMultipartUpload) before you can
 * upload any part. In response to your initiate request, Amazon S3 returns an upload ID, a unique identifier
 * that you must include in your upload part request.
 *
 * Part numbers can be any number from 1 to 10,000, inclusive. A part number uniquely identifies a part
 * and also defines its position within the object being created. If you upload a new part using the same
 * part number that was used with a previous part, the previously uploaded part is overwritten.
 *
 * For information about maximum and minimum part sizes and other multipart upload specifications, see
 * Multipart upload
 * limits in the *Amazon S3 User Guide*.
 *
 * After you initiate multipart upload and upload one or more parts, you must either complete or
 * abort multipart upload in order to stop getting charged for storage of the uploaded parts. Only after
 * you either complete or abort multipart upload, Amazon S3 frees up the parts storage and stops charging you
 * for the parts storage.
 *
 * For more information on multipart uploads, go to Multipart Upload Overview in the
 * *Amazon S3 User Guide *.
 *
 * **Directory buckets** - For directory buckets, you must make requests for this API operation to the Zonal endpoint. These endpoints support virtual-hosted-style requests in the format https://*amzn-s3-demo-bucket*.s3express-*zone-id*.*region-code*.amazonaws.com/*key-name*
 * . Path-style requests are not supported. For more information about endpoints in Availability Zones, see Regional and Zonal endpoints for directory buckets in Availability Zones in the
 * *Amazon S3 User Guide*. For more information about endpoints in Local Zones, see Concepts for directory buckets in Local Zones in the
 * *Amazon S3 User Guide*.
 *
 * ### Permissions
 *
 * - **General purpose bucket permissions** - To perform a
 * multipart upload with encryption using an Key Management Service key, the requester must have permission to
 * the `kms:Decrypt` and `kms:GenerateDataKey` actions on the key. The
 * requester must also have permissions for the `kms:GenerateDataKey` action for the
 * `CreateMultipartUpload` API. Then, the requester needs permissions for the
 * `kms:Decrypt` action on the `UploadPart` and
 * `UploadPartCopy` APIs.
 *
 * These permissions are required because Amazon S3 must decrypt and read data from the encrypted
 * file parts before it completes the multipart upload. For more information about KMS
 * permissions, see Protecting data using server-side
 * encryption with KMS in the *Amazon S3 User Guide*. For information
 * about the permissions required to use the multipart upload API, see Multipart upload and
 * permissions and Multipart upload API and
 * permissions in the *Amazon S3 User Guide*.
 *
 * - **Directory bucket permissions** - To grant access to this API operation on a directory bucket, we recommend that you use the
 * `CreateSession`
 * API operation for session-based authorization. Specifically, you grant the `s3express:CreateSession` permission to the directory bucket in a bucket policy or an IAM identity-based policy. Then, you make the `CreateSession` API call on the bucket to obtain a session token. With the session token in your request header, you can make API requests to this operation. After the session token expires, you make another `CreateSession` API call to generate a new session token for use.
 * Amazon Web Services CLI or SDKs create session and refresh the session token automatically to avoid service interruptions when a session expires. For more information about authorization, see
 * `CreateSession`
 * .
 *
 * If the object is encrypted with SSE-KMS, you must also have the
 * `kms:GenerateDataKey` and `kms:Decrypt` permissions in IAM
 * identity-based policies and KMS key policies for the KMS key.
 *
 * ### Data integrity
 *
 * **General purpose bucket** - To ensure that data is not corrupted
 * traversing the network, specify the `Content-MD5` header in the upload part request.
 * Amazon S3 checks the part data against the provided MD5 value. If they do not match, Amazon S3 returns an
 * error. If the upload request is signed with Signature Version 4, then Amazon Web Services S3 uses the
 * `x-amz-content-sha256` header as a checksum instead of `Content-MD5`. For
 * more information see Authenticating Requests:
 * Using the Authorization Header (Amazon Web Services Signature Version 4).
 *
 * **Directory buckets** - MD5 is not supported by directory buckets. You can use checksum algorithms to check object integrity.
 *
 * ### Encryption
 *
 * - **General purpose bucket** - Server-side encryption is for
 * data encryption at rest. Amazon S3 encrypts your data as it writes it to disks in its data centers
 * and decrypts it when you access it. You have mutually exclusive options to protect data using
 * server-side encryption in Amazon S3, depending on how you choose to manage the encryption keys.
 * Specifically, the encryption key options are Amazon S3 managed keys (SSE-S3), Amazon Web Services KMS keys
 * (SSE-KMS), and Customer-Provided Keys (SSE-C). Amazon S3 encrypts data with server-side encryption
 * using Amazon S3 managed keys (SSE-S3) by default. You can optionally tell Amazon S3 to encrypt data at
 * rest using server-side encryption with other key options. The option you use depends on
 * whether you want to use KMS keys (SSE-KMS) or provide your own encryption key
 * (SSE-C).
 *
 * Server-side encryption is supported by the S3 Multipart Upload operations. Unless you are
 * using a customer-provided encryption key (SSE-C), you don't need to specify the encryption
 * parameters in each UploadPart request. Instead, you only need to specify the server-side
 * encryption parameters in the initial Initiate Multipart request. For more information, see
 * CreateMultipartUpload.
 *
 * If you have server-side encryption with customer-provided keys (SSE-C) blocked for your general purpose bucket, you will get an HTTP 403 Access Denied error when you specify the SSE-C request headers while writing new data to your bucket. For more information, see Blocking or unblocking SSE-C for a general purpose bucket.
 *
 * If you request server-side encryption using a customer-provided encryption key (SSE-C) in
 * your initiate multipart upload request, you must provide identical encryption information in
 * each part upload using the following request headers.
 *
 * - x-amz-server-side-encryption-customer-algorithm
 *
 * - x-amz-server-side-encryption-customer-key
 *
 * - x-amz-server-side-encryption-customer-key-MD5
 *
 * For more information, see Using Server-Side
 * Encryption in the *Amazon S3 User Guide*.
 *
 * - **Directory buckets ** -
 * For directory buckets, there are only two supported options for server-side encryption: server-side encryption with Amazon S3 managed keys (SSE-S3) (`AES256`) and server-side encryption with KMS keys (SSE-KMS) (`aws:kms`).
 *
 * ### Special errors
 *
 * - Error Code: `NoSuchUpload`
 *
 * - Description: The specified multipart upload does not exist. The upload ID might be
 * invalid, or the multipart upload might have been aborted or completed.
 *
 * - HTTP Status Code: 404 Not Found
 *
 * - SOAP Fault Code Prefix: Client
 *
 * ### HTTP Host header syntax
 *
 * **Directory buckets ** - The HTTP Host header syntax is
 * *Bucket-name*.s3express-*zone-id*.*region-code*.amazonaws.com.
 *
 * The following operations are related to `UploadPart`:
 *
 * - CreateMultipartUpload
 *
 * - CompleteMultipartUpload
 *
 * - AbortMultipartUpload
 *
 * - ListParts
 *
 * - ListMultipartUploads
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const uploadPart: API.OperationMethod<
  UploadPartRequest,
  UploadPartOutput,
  UploadPartError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1216, __c76, 0) as any as S.Schema<UploadPartRequest>,
  output: __S(1217, __c76, 1) as any as S.Schema<UploadPartOutput>,
  errors: [
    RequestLimitExceeded,
    SlowDown,
    NoSuchBucket,
    PermanentRedirect,
    NoSuchUpload,
    InvalidAccessKeyId,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UploadPart",
  telemetry: TELEMETRY,
  span: {
    op: "UploadPart",
    input: {
      PartNumber: [{ name: "aws.s3.part_number" }],
      UploadId: [{ name: "aws.s3.upload_id" }],
    },
  },
}));

export type UploadPartCopyError =
  | RequestLimitExceeded
  | SlowDown
  | NoSuchBucket
  | NoSuchUpload
  | NoSuchVersion
  | NoSuchKey
  | InvalidRequest
  | InvalidAccessKeyId
  | CommonErrors;
/**
 * Uploads a part by copying data from an existing object as data source. To specify the data source,
 * you add the request header `x-amz-copy-source` in your request. To specify a byte range, you
 * add the request header `x-amz-copy-source-range` in your request.
 *
 * For information about maximum and minimum part sizes and other multipart upload specifications, see
 * Multipart upload
 * limits in the *Amazon S3 User Guide*.
 *
 * Instead of copying data from an existing object as part data, you might use the UploadPart action to
 * upload new data as a part of an object in your request.
 *
 * You must initiate a multipart upload before you can upload any part. In response to your initiate
 * request, Amazon S3 returns the upload ID, a unique identifier that you must include in your upload part
 * request.
 *
 * For conceptual information about multipart uploads, see Uploading Objects Using Multipart Upload in
 * the *Amazon S3 User Guide*. For information about copying objects using a single atomic
 * action vs. a multipart upload, see Operations on Objects in the
 * *Amazon S3 User Guide*.
 *
 * **Directory buckets** - For directory buckets, you must make requests for this API operation to the Zonal endpoint. These endpoints support virtual-hosted-style requests in the format https://*amzn-s3-demo-bucket*.s3express-*zone-id*.*region-code*.amazonaws.com/*key-name*
 * . Path-style requests are not supported. For more information about endpoints in Availability Zones, see Regional and Zonal endpoints for directory buckets in Availability Zones in the
 * *Amazon S3 User Guide*. For more information about endpoints in Local Zones, see Concepts for directory buckets in Local Zones in the
 * *Amazon S3 User Guide*.
 *
 * ### Authentication and authorization
 *
 * All `UploadPartCopy` requests must be authenticated and signed by using IAM
 * credentials (access key ID and secret access key for the IAM identities). All headers with the
 * `x-amz-` prefix, including `x-amz-copy-source`, must be signed. For more
 * information, see REST Authentication.
 *
 * **Directory buckets** - You must use IAM credentials to
 * authenticate and authorize your access to the `UploadPartCopy` API operation, instead
 * of using the temporary security credentials through the `CreateSession` API
 * operation.
 *
 * Amazon Web Services CLI or SDKs handles authentication and authorization on your behalf.
 *
 * ### Permissions
 *
 * You must have `READ` access to the source object and `WRITE` access to
 * the destination bucket.
 *
 * - **General purpose bucket permissions** - You must have the
 * permissions in a policy based on the bucket types of your source bucket and destination bucket
 * in an `UploadPartCopy` operation.
 *
 * - If the source object is in a general purpose bucket, you must have the
 * `s3:GetObject`
 * permission to read the source object that is
 * being copied.
 *
 * - If the destination bucket is a general purpose bucket, you must have the
 * `s3:PutObject`
 * permission to write the object copy to
 * the destination bucket.
 *
 * - To perform a multipart upload with encryption using an Key Management Service key, the requester
 * must have permission to the `kms:Decrypt` and `kms:GenerateDataKey`
 * actions on the key. The requester must also have permissions for the
 * `kms:GenerateDataKey` action for the `CreateMultipartUpload` API.
 * Then, the requester needs permissions for the `kms:Decrypt` action on the
 * `UploadPart` and `UploadPartCopy` APIs. These permissions are
 * required because Amazon S3 must decrypt and read data from the encrypted file parts before it
 * completes the multipart upload. For more information about KMS permissions, see Protecting
 * data using server-side encryption with KMS in the
 * *Amazon S3 User Guide*. For information about the permissions required to
 * use the multipart upload API, see Multipart upload and
 * permissions and Multipart upload API
 * and permissions in the *Amazon S3 User Guide*.
 *
 * - **Directory bucket permissions** - You must have
 * permissions in a bucket policy or an IAM identity-based policy based on the source and destination bucket types
 * in an `UploadPartCopy` operation.
 *
 * - If the source object that you want to copy is in a directory bucket, you must have
 * the
 * `s3express:CreateSession`
 * permission in
 * the `Action` element of a policy to read the object. If no session mode is specified,
 * the session will be created with the maximum allowable privilege, attempting
 * `ReadWrite` first, then `ReadOnly` if `ReadWrite` is not permitted.
 * If you want to explicitly restrict the access to be read-only, you can set the `s3express:SessionMode`
 * condition key to `ReadOnly` on the copy source bucket.
 *
 * - If the copy destination is a directory bucket, you must have the
 * `s3express:CreateSession`
 * permission in the
 * `Action` element of a policy to write the object to the destination. The
 * `s3express:SessionMode` condition key cannot be set to `ReadOnly`
 * on the copy destination.
 *
 * If the object is encrypted with SSE-KMS, you must also have the
 * `kms:GenerateDataKey` and `kms:Decrypt` permissions in IAM
 * identity-based policies and KMS key policies for the KMS key.
 *
 * For example policies, see Example
 * bucket policies for S3 Express One Zone and Amazon Web Services
 * Identity and Access Management (IAM) identity-based policies for S3 Express One Zone in the
 * *Amazon S3 User Guide*.
 *
 * ### Encryption
 *
 * - **General purpose buckets ** -
 * For information about using server-side encryption with
 * customer-provided encryption keys with the `UploadPartCopy` operation, see CopyObject and
 * UploadPart.
 *
 * If you have server-side encryption with customer-provided keys (SSE-C) blocked for your general purpose bucket, you will get an HTTP 403 Access Denied error when you specify the SSE-C request headers while writing new data to your bucket. For more information, see Blocking or unblocking SSE-C for a general purpose bucket.
 *
 * - **Directory buckets ** -
 * For directory buckets, there are only two supported options for server-side encryption: server-side encryption with Amazon S3 managed keys (SSE-S3) (`AES256`) and server-side encryption with KMS keys (SSE-KMS) (`aws:kms`). For more
 * information, see Protecting data with server-side encryption in the *Amazon S3 User Guide*.
 *
 * For directory buckets, when you perform a `CreateMultipartUpload` operation
 * and an `UploadPartCopy` operation, the request headers you provide in the
 * `CreateMultipartUpload` request must match the default encryption configuration
 * of the destination bucket.
 *
 * S3 Bucket Keys aren't supported, when you copy SSE-KMS encrypted objects from general purpose buckets
 * to directory buckets, from directory buckets to general purpose buckets, or between directory buckets, through UploadPartCopy. In this case, Amazon S3 makes a call to KMS every time a copy request is made for a KMS-encrypted object.
 *
 * ### Special errors
 *
 * - Error Code: `NoSuchUpload`
 *
 * - Description: The specified multipart upload does not exist. The upload ID might be
 * invalid, or the multipart upload might have been aborted or completed.
 *
 * - HTTP Status Code: 404 Not Found
 *
 * - Error Code: `InvalidRequest`
 *
 * - Description: The specified copy source is not supported as a byte-range copy
 * source.
 *
 * - HTTP Status Code: 400 Bad Request
 *
 * ### HTTP Host header syntax
 *
 * **Directory buckets ** - The HTTP Host header syntax is
 * *Bucket-name*.s3express-*zone-id*.*region-code*.amazonaws.com.
 *
 * The following operations are related to `UploadPartCopy`:
 *
 * - CreateMultipartUpload
 *
 * - UploadPart
 *
 * - CompleteMultipartUpload
 *
 * - AbortMultipartUpload
 *
 * - ListParts
 *
 * - ListMultipartUploads
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const uploadPartCopy: API.OperationMethod<
  UploadPartCopyRequest,
  UploadPartCopyOutput,
  UploadPartCopyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1232, __c77, 0) as any as S.Schema<UploadPartCopyRequest>,
  output: __S(1234, __c77, 2) as any as S.Schema<UploadPartCopyOutput>,
  errors: [
    RequestLimitExceeded,
    SlowDown,
    NoSuchBucket,
    NoSuchUpload,
    NoSuchVersion,
    NoSuchKey,
    InvalidRequest,
    InvalidAccessKeyId,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UploadPartCopy",
  telemetry: TELEMETRY,
  span: {
    op: "UploadPartCopy",
    input: {
      CopySource: [{ name: "aws.s3.copy_source" }],
      PartNumber: [{ name: "aws.s3.part_number" }],
      UploadId: [{ name: "aws.s3.upload_id" }],
    },
  },
}));

export type WriteGetObjectResponseError = InvalidAccessKeyId | CommonErrors;
/**
 * This operation is not supported for directory buckets.
 *
 * Passes transformed objects to a `GetObject` operation when using Object Lambda access points. For information
 * about Object Lambda access points, see Transforming objects with Object Lambda access points in the *Amazon S3 User Guide*.
 *
 * This operation supports metadata that can be returned by GetObject, in addition to
 * `RequestRoute`, `RequestToken`, `StatusCode`, `ErrorCode`,
 * and `ErrorMessage`. The `GetObject` response metadata is supported so that the
 * `WriteGetObjectResponse` caller, typically an Lambda function, can provide the same
 * metadata when it internally invokes `GetObject`. When `WriteGetObjectResponse` is
 * called by a customer-owned Lambda function, the metadata returned to the end user `GetObject`
 * call might differ from what Amazon S3 would normally return.
 *
 * You can include any number of metadata headers. When including a metadata header, it should be
 * prefaced with `x-amz-meta`. For example, x-amz-meta-my-custom-header:
 * MyCustomValue. The primary use case for this is to forward `GetObject`
 * metadata.
 *
 * Amazon Web Services provides some prebuilt Lambda functions that you can use with S3 Object Lambda to detect and
 * redact personally identifiable information (PII) and decompress S3 objects. These Lambda functions are
 * available in the Amazon Web Services Serverless Application Repository, and can be selected through the Amazon Web Services
 * Management Console when you create your Object Lambda access point.
 *
 * Example 1: PII Access Control - This Lambda function uses Amazon Comprehend, a natural
 * language processing (NLP) service using machine learning to find insights and relationships in text. It
 * automatically detects personally identifiable information (PII) such as names, addresses, dates, credit
 * card numbers, and social security numbers from documents in your Amazon S3 bucket.
 *
 * Example 2: PII Redaction - This Lambda function uses Amazon Comprehend, a natural language
 * processing (NLP) service using machine learning to find insights and relationships in text. It
 * automatically redacts personally identifiable information (PII) such as names, addresses, dates, credit
 * card numbers, and social security numbers from documents in your Amazon S3 bucket.
 *
 * Example 3: Decompression - The Lambda function S3ObjectLambdaDecompression, is equipped to
 * decompress objects stored in S3 in one of six compressed file formats including bzip2, gzip, snappy,
 * zlib, zstandard and ZIP.
 *
 * For information on how to view and use these functions, see Using Amazon Web Services built Lambda functions in the
 * *Amazon S3 User Guide*.
 *
 * You must URL encode any signed header values that contain spaces. For example, if your header value is `my file.txt`, containing two spaces after `my`, you must URL encode this value to `my%20%20file.txt`.
 */
export const writeGetObjectResponse: API.OperationMethod<
  WriteGetObjectResponseRequest,
  WriteGetObjectResponseResponse,
  WriteGetObjectResponseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1248, __c78, 0) as any as S.Schema<WriteGetObjectResponseRequest>,
  output: __S(1249, __c78, 1) as any as S.Schema<WriteGetObjectResponseResponse>,
  errors: [InvalidAccessKeyId],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "WriteGetObjectResponse",
  endpointHostPrefix: "{RequestRoute}.",
  telemetry: TELEMETRY,
  span: "WriteGetObjectResponse",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/{Bucket}?tagging" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ UseS3ExpressControlEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "GetBucketTaggingRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ TagSet: __S(1361, __c85, 1) }).pipe(T.all(T.XmlName("Tagging"), ns)),
      ).annotate({ identifier: "GetBucketTaggingOutput" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/{Bucket}?versioning" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ UseS3ExpressControlEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "GetBucketVersioningRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Status: S.optional(S.String),
          MFADelete: S.optional(S.String).pipe(T.XmlName("MfaDelete")),
        }).pipe(T.all(T.XmlName("VersioningConfiguration"), ns)),
      ).annotate({ identifier: "GetBucketVersioningOutput" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/{Bucket}?website" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ UseS3ExpressControlEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "GetBucketWebsiteRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RedirectAllRequestsTo: S.optional(__S(48, __c3, 0)),
          IndexDocument: S.optional(__S(49, __c3, 1)),
          ErrorDocument: S.optional(__S(50, __c3, 2)),
          RoutingRules: S.optional(__S(54, __c3, 6)),
        }).pipe(T.all(T.XmlName("WebsiteConfiguration"), ns)),
      ).annotate({ identifier: "GetBucketWebsiteOutput" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ HostName: S.String, Protocol: S.optional(S.String) }),
      ).annotate({ identifier: "RedirectAllRequestsTo" });
    case 1:
      return S.suspend(() => S.Struct({ Suffix: S.String })).annotate({
        identifier: "IndexDocument",
      });
    case 2:
      return S.suspend(() => S.Struct({ Key: S.String })).annotate({ identifier: "ErrorDocument" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          HttpErrorCodeReturnedEquals: S.optional(S.String),
          KeyPrefixEquals: S.optional(S.String),
        }),
      ).annotate({ identifier: "Condition" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          HostName: S.optional(S.String),
          HttpRedirectCode: S.optional(S.String),
          Protocol: S.optional(S.String),
          ReplaceKeyPrefixWith: S.optional(S.String),
          ReplaceKeyWith: S.optional(S.String),
        }),
      ).annotate({ identifier: "Redirect" });
    case 5:
      return S.suspend(() =>
        S.Struct({ Condition: S.optional(__S(51, __c3, 3)), Redirect: __S(52, __c3, 4) }),
      ).annotate({ identifier: "RoutingRule" });
    case 6:
      return S.Array(
        /*@__PURE__*/ __S(53, __c3, 5)
          .pipe(/*@__PURE__*/ T.XmlName("RoutingRule"))
          .annotate({ identifier: "RoutingRule" }),
      );
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          IfMatch: S.optional(S.String).pipe(T.HttpHeader("If-Match")),
          IfModifiedSince: S.optional(S.Date.pipe(T.TimestampFormat("http-date"))).pipe(
            T.HttpHeader("If-Modified-Since"),
          ),
          IfNoneMatch: S.optional(S.String).pipe(T.HttpHeader("If-None-Match")),
          IfUnmodifiedSince: S.optional(S.Date.pipe(T.TimestampFormat("http-date"))).pipe(
            T.HttpHeader("If-Unmodified-Since"),
          ),
          Key: S.String.pipe(T.HttpLabel("Key"), T.ContextParam("Key")),
          Range: S.optional(S.String).pipe(T.HttpHeader("Range")),
          ResponseCacheControl: S.optional(S.String).pipe(T.HttpQuery("response-cache-control")),
          ResponseContentDisposition: S.optional(S.String).pipe(
            T.HttpQuery("response-content-disposition"),
          ),
          ResponseContentEncoding: S.optional(S.String).pipe(
            T.HttpQuery("response-content-encoding"),
          ),
          ResponseContentLanguage: S.optional(S.String).pipe(
            T.HttpQuery("response-content-language"),
          ),
          ResponseContentType: S.optional(S.String).pipe(T.HttpQuery("response-content-type")),
          ResponseExpires: S.optional(S.Date.pipe(T.TimestampFormat("http-date"))).pipe(
            T.HttpQuery("response-expires"),
          ),
          VersionId: S.optional(S.String).pipe(T.HttpQuery("versionId")),
          SSECustomerAlgorithm: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-server-side-encryption-customer-algorithm"),
          ),
          SSECustomerKey: S.optional(SensitiveString).pipe(
            T.HttpHeader("x-amz-server-side-encryption-customer-key"),
          ),
          SSECustomerKeyMD5: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-server-side-encryption-customer-key-MD5"),
          ),
          RequestPayer: S.optional(S.String).pipe(T.HttpHeader("x-amz-request-payer")),
          PartNumber: S.optional(S.Number).pipe(T.HttpQuery("partNumber")),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
          ChecksumMode: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-mode")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/{Bucket}/{Key+}?x-id=GetObject" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.AwsProtocolsHttpChecksum({
              responseAlgorithms: [
                "CRC64NVME",
                "CRC32",
                "CRC32C",
                "SHA256",
                "SHA1",
                "SHA512",
                "MD5",
                "XXHASH64",
                "XXHASH3",
                "XXHASH128",
              ],
            }),
          ),
        ),
      ).annotate({ identifier: "GetObjectRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Body: S.optional(T.StreamingOutput).pipe(T.HttpPayload()),
          DeleteMarker: S.optional(S.Boolean).pipe(T.HttpHeader("x-amz-delete-marker")),
          AcceptRanges: S.optional(S.String).pipe(T.HttpHeader("accept-ranges")),
          Expiration: S.optional(S.String).pipe(T.HttpHeader("x-amz-expiration")),
          Restore: S.optional(S.String).pipe(T.HttpHeader("x-amz-restore")),
          LastModified: S.optional(S.Date.pipe(T.TimestampFormat("http-date"))).pipe(
            T.HttpHeader("Last-Modified"),
          ),
          ContentLength: S.optional(S.Number).pipe(T.HttpHeader("Content-Length")),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
          ChecksumCRC32: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-crc32")),
          ChecksumCRC32C: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-crc32c")),
          ChecksumCRC64NVME: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-crc64nvme")),
          ChecksumSHA1: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-sha1")),
          ChecksumSHA256: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-sha256")),
          ChecksumSHA512: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-sha512")),
          ChecksumMD5: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-md5")),
          ChecksumXXHASH64: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-xxhash64")),
          ChecksumXXHASH3: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-xxhash3")),
          ChecksumXXHASH128: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-xxhash128")),
          ChecksumType: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-type")),
          MissingMeta: S.optional(S.Number).pipe(T.HttpHeader("x-amz-missing-meta")),
          VersionId: S.optional(S.String).pipe(T.HttpHeader("x-amz-version-id")),
          CacheControl: S.optional(S.String).pipe(T.HttpHeader("Cache-Control")),
          ContentDisposition: S.optional(S.String).pipe(T.HttpHeader("Content-Disposition")),
          ContentEncoding: S.optional(S.String).pipe(T.HttpHeader("Content-Encoding")),
          ContentLanguage: S.optional(S.String).pipe(T.HttpHeader("Content-Language")),
          ContentRange: S.optional(S.String).pipe(T.HttpHeader("Content-Range")),
          ContentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
          Expires: S.optional(S.String).pipe(T.HttpHeader("Expires")),
          WebsiteRedirectLocation: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-website-redirect-location"),
          ),
          ServerSideEncryption: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-server-side-encryption"),
          ),
          Metadata: S.optional(__S(1328, __c83, 0)).pipe(T.HttpPrefixHeaders("x-amz-meta-")),
          SSECustomerAlgorithm: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-server-side-encryption-customer-algorithm"),
          ),
          SSECustomerKeyMD5: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-server-side-encryption-customer-key-MD5"),
          ),
          SSEKMSKeyId: S.optional(SensitiveString).pipe(
            T.HttpHeader("x-amz-server-side-encryption-aws-kms-key-id"),
          ),
          BucketKeyEnabled: S.optional(S.Boolean).pipe(
            T.HttpHeader("x-amz-server-side-encryption-bucket-key-enabled"),
          ),
          StorageClass: S.optional(S.String).pipe(T.HttpHeader("x-amz-storage-class")),
          RequestCharged: S.optional(S.String).pipe(T.HttpHeader("x-amz-request-charged")),
          ReplicationStatus: S.optional(S.String).pipe(T.HttpHeader("x-amz-replication-status")),
          PartsCount: S.optional(S.Number).pipe(T.HttpHeader("x-amz-mp-parts-count")),
          TagCount: S.optional(S.Number).pipe(T.HttpHeader("x-amz-tagging-count")),
          ObjectLockMode: S.optional(S.String).pipe(T.HttpHeader("x-amz-object-lock-mode")),
          ObjectLockRetainUntilDate: S.optional(S.Date.pipe(T.TimestampFormat("http-date"))).pipe(
            T.HttpHeader("x-amz-object-lock-retain-until-date"),
          ),
          ObjectLockLegalHoldStatus: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-object-lock-legal-hold"),
          ),
          ObjectLockEventHold: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-object-lock-event-hold"),
          ),
          ObjectLockEventHoldDurationDays: S.optional(S.Number).pipe(
            T.HttpHeader("x-amz-object-lock-event-hold-duration-days"),
          ),
          ObjectLockEventHoldDurationYears: S.optional(S.Number).pipe(
            T.HttpHeader("x-amz-object-lock-event-hold-duration-years"),
          ),
        }).pipe(ns),
      ).annotate({ identifier: "GetObjectOutput" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          Key: S.String.pipe(T.HttpLabel("Key"), T.ContextParam("Key")),
          VersionId: S.optional(S.String).pipe(T.HttpQuery("versionId")),
          RequestPayer: S.optional(S.String).pipe(T.HttpHeader("x-amz-request-payer")),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/{Bucket}/{Key+}?acl" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetObjectAclRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Owner: S.optional(__S(1856, __c116, 0)),
          Grants: S.optional(__S(1873, __c117, 1)).pipe(T.XmlName("AccessControlList")),
          RequestCharged: S.optional(S.String).pipe(T.HttpHeader("x-amz-request-charged")),
        }).pipe(T.all(T.XmlName("AccessControlPolicy"), ns)),
      ).annotate({ identifier: "GetObjectAclOutput" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          Key: S.String.pipe(T.HttpLabel("Key"), T.ContextParam("Key")),
          AnnotationName: S.String.pipe(T.HttpQuery("annotationName")),
          VersionId: S.optional(S.String).pipe(T.HttpQuery("versionId")),
          RequestPayer: S.optional(S.String).pipe(T.HttpHeader("x-amz-request-payer")),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
          ChecksumMode: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-mode")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/{Bucket}/{Key+}?annotation&x-id=GetObjectAnnotation" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.AwsProtocolsHttpChecksum({
              responseAlgorithms: [
                "CRC64NVME",
                "CRC32",
                "CRC32C",
                "SHA256",
                "SHA1",
                "SHA512",
                "MD5",
                "XXHASH64",
                "XXHASH3",
                "XXHASH128",
              ],
            }),
          ),
        ),
      ).annotate({ identifier: "GetObjectAnnotationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AnnotationPayload: S.optional(T.StreamingOutput).pipe(T.HttpPayload()),
          ObjectVersionId: S.optional(S.String).pipe(T.HttpHeader("x-amz-object-version-id")),
          LastModified: S.optional(S.Date.pipe(T.TimestampFormat("http-date"))).pipe(
            T.HttpHeader("Last-Modified"),
          ),
          ContentLength: S.optional(S.Number).pipe(T.HttpHeader("Content-Length")),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
          ChecksumCRC32: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-crc32")),
          ChecksumCRC32C: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-crc32c")),
          ChecksumCRC64NVME: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-crc64nvme")),
          ChecksumSHA1: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-sha1")),
          ChecksumSHA256: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-sha256")),
          ChecksumSHA512: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-sha512")),
          ChecksumMD5: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-md5")),
          ChecksumXXHASH64: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-xxhash64")),
          ChecksumXXHASH3: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-xxhash3")),
          ChecksumXXHASH128: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-xxhash128")),
          ChecksumType: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-type")),
          ServerSideEncryption: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-server-side-encryption"),
          ),
          RequestCharged: S.optional(S.String).pipe(T.HttpHeader("x-amz-request-charged")),
          ReplicationStatus: S.optional(S.String).pipe(T.HttpHeader("x-amz-replication-status")),
        }).pipe(ns),
      ).annotate({ identifier: "GetObjectAnnotationOutput" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          Key: S.String.pipe(T.HttpLabel("Key")),
          VersionId: S.optional(S.String).pipe(T.HttpQuery("versionId")),
          MaxParts: S.optional(S.Number).pipe(T.HttpHeader("x-amz-max-parts")),
          PartNumberMarker: S.optional(S.String).pipe(T.HttpHeader("x-amz-part-number-marker")),
          SSECustomerAlgorithm: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-server-side-encryption-customer-algorithm"),
          ),
          SSECustomerKey: S.optional(SensitiveString).pipe(
            T.HttpHeader("x-amz-server-side-encryption-customer-key"),
          ),
          SSECustomerKeyMD5: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-server-side-encryption-customer-key-MD5"),
          ),
          RequestPayer: S.optional(S.String).pipe(T.HttpHeader("x-amz-request-payer")),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
          ObjectAttributes: __S(112, __c7, 0).pipe(T.HttpHeader("x-amz-object-attributes")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/{Bucket}/{Key+}?attributes" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetObjectAttributesRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          ChecksumCRC32: S.optional(S.String),
          ChecksumCRC32C: S.optional(S.String),
          ChecksumCRC64NVME: S.optional(S.String),
          ChecksumSHA1: S.optional(S.String),
          ChecksumSHA256: S.optional(S.String),
          ChecksumSHA512: S.optional(S.String),
          ChecksumMD5: S.optional(S.String),
          ChecksumXXHASH64: S.optional(S.String),
          ChecksumXXHASH3: S.optional(S.String),
          ChecksumXXHASH128: S.optional(S.String),
          ChecksumType: S.optional(S.String),
        }),
      ).annotate({ identifier: "Checksum" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          PartNumber: S.optional(S.Number),
          Size: S.optional(S.Number),
          ChecksumCRC32: S.optional(S.String),
          ChecksumCRC32C: S.optional(S.String),
          ChecksumCRC64NVME: S.optional(S.String),
          ChecksumSHA1: S.optional(S.String),
          ChecksumSHA256: S.optional(S.String),
          ChecksumSHA512: S.optional(S.String),
          ChecksumMD5: S.optional(S.String),
          ChecksumXXHASH64: S.optional(S.String),
          ChecksumXXHASH3: S.optional(S.String),
          ChecksumXXHASH128: S.optional(S.String),
        }),
      ).annotate({ identifier: "ObjectPart" });
    case 4:
      return S.Array(__S(115, __c7, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          TotalPartsCount: S.optional(S.Number).pipe(T.XmlName("PartsCount")),
          PartNumberMarker: S.optional(S.String),
          NextPartNumberMarker: S.optional(S.String),
          MaxParts: S.optional(S.Number),
          IsTruncated: S.optional(S.Boolean),
          Parts: S.optional(__S(116, __c7, 4)).pipe(T.XmlName("Part"), T.XmlFlattened()),
        }),
      ).annotate({ identifier: "GetObjectAttributesParts" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          DeleteMarker: S.optional(S.Boolean).pipe(T.HttpHeader("x-amz-delete-marker")),
          LastModified: S.optional(S.Date.pipe(T.TimestampFormat("http-date"))).pipe(
            T.HttpHeader("Last-Modified"),
          ),
          VersionId: S.optional(S.String).pipe(T.HttpHeader("x-amz-version-id")),
          RequestCharged: S.optional(S.String).pipe(T.HttpHeader("x-amz-request-charged")),
          ETag: S.optional(S.String),
          Checksum: S.optional(__S(114, __c7, 2)),
          ObjectParts: S.optional(__S(117, __c7, 5)),
          StorageClass: S.optional(S.String),
          ObjectSize: S.optional(S.Number),
        }).pipe(T.all(T.XmlName("GetObjectAttributesResponse"), ns)),
      ).annotate({ identifier: "GetObjectAttributesOutput" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          Key: S.String.pipe(T.HttpLabel("Key")),
          VersionId: S.optional(S.String).pipe(T.HttpQuery("versionId")),
          RequestPayer: S.optional(S.String).pipe(T.HttpHeader("x-amz-request-payer")),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/{Bucket}/{Key+}?legal-hold" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetObjectLegalHoldRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          LegalHold: S.optional(__S(144, __c9, 0))
            .pipe(T.HttpPayload(), T.XmlName("LegalHold"))
            .annotate({ identifier: "ObjectLockLegalHold" }),
        }).pipe(ns),
      ).annotate({ identifier: "GetObjectLegalHoldOutput" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Status: S.optional(S.String) })).annotate({
        identifier: "ObjectLockLegalHold",
      });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/{Bucket}?object-lock" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetObjectLockConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ObjectLockConfiguration: S.optional(__S(194, __c12, 2))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "ObjectLockConfiguration" }),
        }).pipe(ns),
      ).annotate({ identifier: "GetObjectLockConfigurationOutput" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Days: S.optional(S.Number), Years: S.optional(S.Number) }),
      ).annotate({ identifier: "EventHoldDuration" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Mode: S.optional(S.String),
          Days: S.optional(S.Number),
          Years: S.optional(S.Number),
          DefaultEventHold: S.optional(__S(176, __c11, 0)),
        }),
      ).annotate({ identifier: "DefaultRetention" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DefaultRetention: S.optional(__S(192, __c12, 0)) }),
      ).annotate({ identifier: "ObjectLockRule" });
    case 2:
      return S.suspend(() =>
        S.Struct({ ObjectLockEnabled: S.optional(S.String), Rule: S.optional(__S(193, __c12, 1)) }),
      ).annotate({ identifier: "ObjectLockConfiguration" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          Key: S.String.pipe(T.HttpLabel("Key")),
          VersionId: S.optional(S.String).pipe(T.HttpQuery("versionId")),
          RequestPayer: S.optional(S.String).pipe(T.HttpHeader("x-amz-request-payer")),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/{Bucket}/{Key+}?retention" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetObjectRetentionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Retention: S.optional(__S(224, __c14, 0))
            .pipe(T.HttpPayload(), T.XmlName("Retention"))
            .annotate({ identifier: "ObjectLockRetention" }),
        }).pipe(ns),
      ).annotate({ identifier: "GetObjectRetentionOutput" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Mode: S.optional(S.String),
          RetainUntilDate: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          EventHold: S.optional(S.String),
          EventHoldDuration: S.optional(__S(176, __c11, 0)),
        }),
      ).annotate({ identifier: "ObjectLockRetention" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          Key: S.String.pipe(T.HttpLabel("Key")),
          VersionId: S.optional(S.String).pipe(T.HttpQuery("versionId")),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
          RequestPayer: S.optional(S.String).pipe(T.HttpHeader("x-amz-request-payer")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/{Bucket}/{Key+}?tagging" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetObjectTaggingRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          VersionId: S.optional(S.String).pipe(T.HttpHeader("x-amz-version-id")),
          TagSet: S.optional(__S(1361, __c85, 1)),
        }).pipe(T.all(T.XmlName("Tagging"), ns)),
      ).annotate({ identifier: "GetObjectTaggingOutput" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          Key: S.String.pipe(T.HttpLabel("Key")),
          RequestPayer: S.optional(S.String).pipe(T.HttpHeader("x-amz-request-payer")),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/{Bucket}/{Key+}?torrent" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetObjectTorrentRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Body: S.optional(T.StreamingOutput).pipe(T.HttpPayload()),
          RequestCharged: S.optional(S.String).pipe(T.HttpHeader("x-amz-request-charged")),
        }).pipe(ns),
      ).annotate({ identifier: "GetObjectTorrentOutput" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/{Bucket}?publicAccessBlock" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ UseS3ExpressControlEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "GetPublicAccessBlockRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          PublicAccessBlockConfiguration: S.optional(__S(288, __c18, 0))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "PublicAccessBlockConfiguration" }),
        }).pipe(ns),
      ).annotate({ identifier: "GetPublicAccessBlockOutput" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          BlockPublicAcls: S.optional(S.Boolean).pipe(T.XmlName("BlockPublicAcls")),
          IgnorePublicAcls: S.optional(S.Boolean).pipe(T.XmlName("IgnorePublicAcls")),
          BlockPublicPolicy: S.optional(S.Boolean).pipe(T.XmlName("BlockPublicPolicy")),
          RestrictPublicBuckets: S.optional(S.Boolean).pipe(T.XmlName("RestrictPublicBuckets")),
        }),
      ).annotate({ identifier: "PublicAccessBlockConfiguration" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(ns, T.Http({ method: "HEAD", uri: "/{Bucket}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "HeadBucketRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          BucketArn: S.optional(S.String).pipe(T.HttpHeader("x-amz-bucket-arn")),
          BucketLocationType: S.optional(S.String).pipe(T.HttpHeader("x-amz-bucket-location-type")),
          BucketLocationName: S.optional(S.String).pipe(T.HttpHeader("x-amz-bucket-location-name")),
          BucketRegion: S.optional(S.String).pipe(T.HttpHeader("x-amz-bucket-region")),
          AccessPointAlias: S.optional(S.Boolean).pipe(T.HttpHeader("x-amz-access-point-alias")),
        }).pipe(ns),
      ).annotate({ identifier: "HeadBucketOutput" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          IfMatch: S.optional(S.String).pipe(T.HttpHeader("If-Match")),
          IfModifiedSince: S.optional(S.Date.pipe(T.TimestampFormat("http-date"))).pipe(
            T.HttpHeader("If-Modified-Since"),
          ),
          IfNoneMatch: S.optional(S.String).pipe(T.HttpHeader("If-None-Match")),
          IfUnmodifiedSince: S.optional(S.Date.pipe(T.TimestampFormat("http-date"))).pipe(
            T.HttpHeader("If-Unmodified-Since"),
          ),
          Key: S.String.pipe(T.HttpLabel("Key"), T.ContextParam("Key")),
          Range: S.optional(S.String).pipe(T.HttpHeader("Range")),
          ResponseCacheControl: S.optional(S.String).pipe(T.HttpQuery("response-cache-control")),
          ResponseContentDisposition: S.optional(S.String).pipe(
            T.HttpQuery("response-content-disposition"),
          ),
          ResponseContentEncoding: S.optional(S.String).pipe(
            T.HttpQuery("response-content-encoding"),
          ),
          ResponseContentLanguage: S.optional(S.String).pipe(
            T.HttpQuery("response-content-language"),
          ),
          ResponseContentType: S.optional(S.String).pipe(T.HttpQuery("response-content-type")),
          ResponseExpires: S.optional(S.Date.pipe(T.TimestampFormat("http-date"))).pipe(
            T.HttpQuery("response-expires"),
          ),
          VersionId: S.optional(S.String).pipe(T.HttpQuery("versionId")),
          SSECustomerAlgorithm: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-server-side-encryption-customer-algorithm"),
          ),
          SSECustomerKey: S.optional(SensitiveString).pipe(
            T.HttpHeader("x-amz-server-side-encryption-customer-key"),
          ),
          SSECustomerKeyMD5: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-server-side-encryption-customer-key-MD5"),
          ),
          RequestPayer: S.optional(S.String).pipe(T.HttpHeader("x-amz-request-payer")),
          PartNumber: S.optional(S.Number).pipe(T.HttpQuery("partNumber")),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
          ChecksumMode: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-mode")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "HEAD", uri: "/{Bucket}/{Key+}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "HeadObjectRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DeleteMarker: S.optional(S.Boolean).pipe(T.HttpHeader("x-amz-delete-marker")),
          AcceptRanges: S.optional(S.String).pipe(T.HttpHeader("accept-ranges")),
          Expiration: S.optional(S.String).pipe(T.HttpHeader("x-amz-expiration")),
          Restore: S.optional(S.String).pipe(T.HttpHeader("x-amz-restore")),
          ArchiveStatus: S.optional(S.String).pipe(T.HttpHeader("x-amz-archive-status")),
          LastModified: S.optional(S.Date.pipe(T.TimestampFormat("http-date"))).pipe(
            T.HttpHeader("Last-Modified"),
          ),
          ContentLength: S.optional(S.Number).pipe(T.HttpHeader("Content-Length")),
          ChecksumCRC32: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-crc32")),
          ChecksumCRC32C: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-crc32c")),
          ChecksumCRC64NVME: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-crc64nvme")),
          ChecksumSHA1: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-sha1")),
          ChecksumSHA256: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-sha256")),
          ChecksumSHA512: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-sha512")),
          ChecksumMD5: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-md5")),
          ChecksumXXHASH64: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-xxhash64")),
          ChecksumXXHASH3: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-xxhash3")),
          ChecksumXXHASH128: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-xxhash128")),
          ChecksumType: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-type")),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
          MissingMeta: S.optional(S.Number).pipe(T.HttpHeader("x-amz-missing-meta")),
          VersionId: S.optional(S.String).pipe(T.HttpHeader("x-amz-version-id")),
          CacheControl: S.optional(S.String).pipe(T.HttpHeader("Cache-Control")),
          ContentDisposition: S.optional(S.String).pipe(T.HttpHeader("Content-Disposition")),
          ContentEncoding: S.optional(S.String).pipe(T.HttpHeader("Content-Encoding")),
          ContentLanguage: S.optional(S.String).pipe(T.HttpHeader("Content-Language")),
          ContentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
          ContentRange: S.optional(S.String).pipe(T.HttpHeader("Content-Range")),
          Expires: S.optional(S.String).pipe(T.HttpHeader("Expires")),
          WebsiteRedirectLocation: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-website-redirect-location"),
          ),
          ServerSideEncryption: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-server-side-encryption"),
          ),
          Metadata: S.optional(__S(1328, __c83, 0)).pipe(T.HttpPrefixHeaders("x-amz-meta-")),
          SSECustomerAlgorithm: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-server-side-encryption-customer-algorithm"),
          ),
          SSECustomerKeyMD5: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-server-side-encryption-customer-key-MD5"),
          ),
          SSEKMSKeyId: S.optional(SensitiveString).pipe(
            T.HttpHeader("x-amz-server-side-encryption-aws-kms-key-id"),
          ),
          BucketKeyEnabled: S.optional(S.Boolean).pipe(
            T.HttpHeader("x-amz-server-side-encryption-bucket-key-enabled"),
          ),
          StorageClass: S.optional(S.String).pipe(T.HttpHeader("x-amz-storage-class")),
          RequestCharged: S.optional(S.String).pipe(T.HttpHeader("x-amz-request-charged")),
          ReplicationStatus: S.optional(S.String).pipe(T.HttpHeader("x-amz-replication-status")),
          PartsCount: S.optional(S.Number).pipe(T.HttpHeader("x-amz-mp-parts-count")),
          TagCount: S.optional(S.Number).pipe(T.HttpHeader("x-amz-tagging-count")),
          ObjectLockMode: S.optional(S.String).pipe(T.HttpHeader("x-amz-object-lock-mode")),
          ObjectLockRetainUntilDate: S.optional(S.Date.pipe(T.TimestampFormat("http-date"))).pipe(
            T.HttpHeader("x-amz-object-lock-retain-until-date"),
          ),
          ObjectLockLegalHoldStatus: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-object-lock-legal-hold"),
          ),
          ObjectLockEventHold: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-object-lock-event-hold"),
          ),
          ObjectLockEventHoldDurationDays: S.optional(S.Number).pipe(
            T.HttpHeader("x-amz-object-lock-event-hold-duration-days"),
          ),
          ObjectLockEventHoldDurationYears: S.optional(S.Number).pipe(
            T.HttpHeader("x-amz-object-lock-event-hold-duration-years"),
          ),
        }).pipe(ns),
      ).annotate({ identifier: "HeadObjectOutput" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          ContinuationToken: S.optional(S.String).pipe(T.HttpQuery("continuation-token")),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({
              method: "GET",
              uri: "/{Bucket}?analytics&x-id=ListBucketAnalyticsConfigurations",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ UseS3ExpressControlEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "ListBucketAnalyticsConfigurationsRequest" });
    case 1:
      return S.Array(__S(1926, __c120, 6));
    case 2:
      return S.suspend(() =>
        S.Struct({
          IsTruncated: S.optional(S.Boolean),
          ContinuationToken: S.optional(S.String),
          NextContinuationToken: S.optional(S.String),
          AnalyticsConfigurationList: S.optional(__S(337, __c21, 1)).pipe(
            T.XmlName("AnalyticsConfiguration"),
            T.XmlFlattened(),
          ),
        }).pipe(T.all(T.XmlName("ListBucketAnalyticsConfigurationResult"), ns)),
      ).annotate({ identifier: "ListBucketAnalyticsConfigurationsOutput" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          ContinuationToken: S.optional(S.String).pipe(T.HttpQuery("continuation-token")),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({
              method: "GET",
              uri: "/{Bucket}?intelligent-tiering&x-id=ListBucketIntelligentTieringConfigurations",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ UseS3ExpressControlEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "ListBucketIntelligentTieringConfigurationsRequest" });
    case 1:
      return S.Array(__S(2020, __c126, 4));
    case 2:
      return S.suspend(() =>
        S.Struct({
          IsTruncated: S.optional(S.Boolean),
          ContinuationToken: S.optional(S.String),
          NextContinuationToken: S.optional(S.String),
          IntelligentTieringConfigurationList: S.optional(__S(353, __c22, 1)).pipe(
            T.XmlName("IntelligentTieringConfiguration"),
            T.XmlFlattened(),
          ),
        }).pipe(ns),
      ).annotate({ identifier: "ListBucketIntelligentTieringConfigurationsOutput" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          ContinuationToken: S.optional(S.String).pipe(T.HttpQuery("continuation-token")),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({
              method: "GET",
              uri: "/{Bucket}?inventory&x-id=ListBucketInventoryConfigurations",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ UseS3ExpressControlEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "ListBucketInventoryConfigurationsRequest" });
    case 1:
      return S.Array(__S(2056, __c128, 8));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ContinuationToken: S.optional(S.String),
          InventoryConfigurationList: S.optional(__S(369, __c23, 1)).pipe(
            T.XmlName("InventoryConfiguration"),
            T.XmlFlattened(),
          ),
          IsTruncated: S.optional(S.Boolean),
          NextContinuationToken: S.optional(S.String),
        }).pipe(T.all(T.XmlName("ListInventoryConfigurationsResult"), ns)),
      ).annotate({ identifier: "ListBucketInventoryConfigurationsOutput" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          ContinuationToken: S.optional(S.String).pipe(T.HttpQuery("continuation-token")),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({
              method: "GET",
              uri: "/{Bucket}?metrics&x-id=ListBucketMetricsConfigurations",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ UseS3ExpressControlEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "ListBucketMetricsConfigurationsRequest" });
    case 1:
      return S.Array(__S(2210, __c138, 2));
    case 2:
      return S.suspend(() =>
        S.Struct({
          IsTruncated: S.optional(S.Boolean),
          ContinuationToken: S.optional(S.String),
          NextContinuationToken: S.optional(S.String),
          MetricsConfigurationList: S.optional(__S(385, __c24, 1)).pipe(
            T.XmlName("MetricsConfiguration"),
            T.XmlFlattened(),
          ),
        }).pipe(T.all(T.XmlName("ListMetricsConfigurationsResult"), ns)),
      ).annotate({ identifier: "ListBucketMetricsConfigurationsOutput" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxBuckets: S.optional(S.Number).pipe(T.HttpQuery("max-buckets")),
          ContinuationToken: S.optional(S.String).pipe(T.HttpQuery("continuation-token")),
          Prefix: S.optional(S.String).pipe(T.HttpQuery("prefix")),
          BucketRegion: S.optional(S.String).pipe(T.HttpQuery("bucket-region")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/?x-id=ListBuckets" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListBucketsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Buckets: S.optional(__S(416, __c26, 0)),
          Owner: S.optional(__S(1856, __c116, 0)),
          ContinuationToken: S.optional(S.String),
          Prefix: S.optional(S.String),
        }).pipe(T.all(T.XmlName("ListAllMyBucketsResult"), ns)),
      ).annotate({ identifier: "ListBucketsOutput" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.Array(
        /*@__PURE__*/ Bucket.pipe(/*@__PURE__*/ T.XmlName("Bucket")).annotate({
          identifier: "Bucket",
        }),
      );
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ContinuationToken: S.optional(S.String).pipe(T.HttpQuery("continuation-token")),
          MaxDirectoryBuckets: S.optional(S.Number).pipe(T.HttpQuery("max-directory-buckets")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/?x-id=ListDirectoryBuckets" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ UseS3ExpressControlEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "ListDirectoryBucketsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Buckets: S.optional(__S(416, __c26, 0)),
          ContinuationToken: S.optional(S.String),
        }).pipe(T.all(T.XmlName("ListAllMyDirectoryBucketsResult"), ns)),
      ).annotate({ identifier: "ListDirectoryBucketsOutput" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          Delimiter: S.optional(S.String).pipe(T.HttpQuery("delimiter")),
          EncodingType: S.optional(S.String).pipe(T.HttpQuery("encoding-type")),
          KeyMarker: S.optional(S.String).pipe(T.HttpQuery("key-marker")),
          MaxUploads: S.optional(S.Number).pipe(T.HttpQuery("max-uploads")),
          Prefix: S.optional(S.String).pipe(T.HttpQuery("prefix"), T.ContextParam("Prefix")),
          UploadIdMarker: S.optional(S.String).pipe(T.HttpQuery("upload-id-marker")),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
          RequestPayer: S.optional(S.String).pipe(T.HttpHeader("x-amz-request-payer")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/{Bucket}?uploads" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListMultipartUploadsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          UploadId: S.optional(S.String),
          Key: S.optional(S.String),
          Initiated: S.optional(T.DateFromString),
          StorageClass: S.optional(S.String),
          Owner: S.optional(__S(1856, __c116, 0)),
          Initiator: S.optional(__S(480, __c30, 0)),
          ChecksumAlgorithm: S.optional(S.String),
          ChecksumType: S.optional(S.String),
        }),
      ).annotate({ identifier: "MultipartUpload" });
    case 2:
      return S.Array(__S(449, __c28, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.optional(S.String),
          KeyMarker: S.optional(S.String),
          UploadIdMarker: S.optional(S.String),
          NextKeyMarker: S.optional(S.String),
          Prefix: S.optional(S.String),
          Delimiter: S.optional(S.String),
          NextUploadIdMarker: S.optional(S.String),
          MaxUploads: S.optional(S.Number),
          IsTruncated: S.optional(S.Boolean),
          Uploads: S.optional(__S(450, __c28, 2)).pipe(T.XmlName("Upload"), T.XmlFlattened()),
          CommonPrefixes: S.optional(__S(465, __c29, 1)).pipe(T.XmlFlattened()),
          EncodingType: S.optional(S.String),
          RequestCharged: S.optional(S.String).pipe(T.HttpHeader("x-amz-request-charged")),
        }).pipe(T.all(T.XmlName("ListMultipartUploadsResult"), ns)),
      ).annotate({ identifier: "ListMultipartUploadsOutput" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Prefix: S.optional(S.String) })).annotate({
        identifier: "CommonPrefix",
      });
    case 1:
      return S.Array(__S(464, __c29, 0));
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ID: S.optional(S.String), DisplayName: S.optional(S.String) }),
      ).annotate({ identifier: "Initiator" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          Key: S.String.pipe(T.HttpLabel("Key")),
          VersionId: S.optional(S.String).pipe(T.HttpQuery("versionId")),
          MaxAnnotationResults: S.optional(S.Number).pipe(T.HttpQuery("max-annotation-results")),
          AnnotationPrefix: S.optional(S.String).pipe(T.HttpQuery("annotation-prefix")),
          ContinuationToken: S.optional(S.String).pipe(T.HttpQuery("continuation-token")),
          RequestPayer: S.optional(S.String).pipe(T.HttpHeader("x-amz-request-payer")),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({
              method: "GET",
              uri: "/{Bucket}/{Key+}?annotation&x-id=ListObjectAnnotations",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListObjectAnnotationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AnnotationName: S.String,
          LastModified: T.DateFromString,
          ETag: S.optional(S.String),
          ChecksumAlgorithm: S.optional(__S(512, __c32, 0)).pipe(T.XmlFlattened()),
          Size: S.Number,
          ReplicationStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "AnnotationEntry" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(497, __c31, 1)
          .pipe(/*@__PURE__*/ T.XmlName("AnnotationEntry"))
          .annotate({ identifier: "AnnotationEntry" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          Annotations: S.optional(__S(498, __c31, 2)),
          Bucket: S.optional(S.String),
          Key: S.optional(S.String),
          ObjectVersionId: S.optional(S.String).pipe(T.HttpHeader("x-amz-object-version-id")),
          AnnotationPrefix: S.optional(S.String),
          MaxAnnotationResults: S.optional(S.Number),
          AnnotationCount: S.optional(S.Number),
          ContinuationToken: S.optional(S.String),
          NextContinuationToken: S.optional(S.String),
          RequestCharged: S.optional(S.String).pipe(T.HttpHeader("x-amz-request-charged")),
        }).pipe(ns),
      ).annotate({ identifier: "ListObjectAnnotationsOutput" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          Delimiter: S.optional(S.String).pipe(T.HttpQuery("delimiter")),
          EncodingType: S.optional(S.String).pipe(T.HttpQuery("encoding-type")),
          Marker: S.optional(S.String).pipe(T.HttpQuery("marker")),
          MaxKeys: S.optional(S.Number).pipe(T.HttpQuery("max-keys")),
          Prefix: S.optional(S.String).pipe(T.HttpQuery("prefix"), T.ContextParam("Prefix")),
          RequestPayer: S.optional(S.String).pipe(T.HttpHeader("x-amz-request-payer")),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
          OptionalObjectAttributes: S.optional(__S(560, __c35, 0)).pipe(
            T.HttpHeader("x-amz-optional-object-attributes"),
          ),
        }).pipe(
          T.all(ns, T.Http({ method: "GET", uri: "/{Bucket}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListObjectsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          IsTruncated: S.optional(S.Boolean),
          Marker: S.optional(S.String),
          NextMarker: S.optional(S.String),
          Contents: S.optional(__S(545, __c34, 1)).pipe(T.XmlFlattened()),
          Name: S.optional(S.String),
          Prefix: S.optional(S.String),
          Delimiter: S.optional(S.String),
          MaxKeys: S.optional(S.Number),
          CommonPrefixes: S.optional(__S(465, __c29, 1)).pipe(T.XmlFlattened()),
          EncodingType: S.optional(S.String),
          RequestCharged: S.optional(S.String).pipe(T.HttpHeader("x-amz-request-charged")),
        }).pipe(T.all(T.XmlName("ListBucketResult"), ns)),
      ).annotate({ identifier: "ListObjectsOutput" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Key: S.optional(S.String),
          LastModified: S.optional(T.DateFromString),
          ETag: S.optional(S.String),
          ChecksumAlgorithm: S.optional(__S(512, __c32, 0)).pipe(T.XmlFlattened()),
          ChecksumType: S.optional(S.String),
          Size: S.optional(S.Number),
          StorageClass: S.optional(S.String),
          Owner: S.optional(__S(1856, __c116, 0)),
          RestoreStatus: S.optional(__S(561, __c35, 1)),
        }),
      ).annotate({ identifier: "Object" });
    case 1:
      return S.Array(__S(544, __c34, 0));
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({
          IsRestoreInProgress: S.optional(S.Boolean),
          RestoreExpiryDate: S.optional(T.DateFromString),
        }),
      ).annotate({ identifier: "RestoreStatus" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          Delimiter: S.optional(S.String).pipe(T.HttpQuery("delimiter")),
          EncodingType: S.optional(S.String).pipe(T.HttpQuery("encoding-type")),
          MaxKeys: S.optional(S.Number).pipe(T.HttpQuery("max-keys")),
          Prefix: S.optional(S.String).pipe(T.HttpQuery("prefix"), T.ContextParam("Prefix")),
          ContinuationToken: S.optional(S.String).pipe(T.HttpQuery("continuation-token")),
          FetchOwner: S.optional(S.Boolean).pipe(T.HttpQuery("fetch-owner")),
          StartAfter: S.optional(S.String).pipe(T.HttpQuery("start-after")),
          RequestPayer: S.optional(S.String).pipe(T.HttpHeader("x-amz-request-payer")),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
          OptionalObjectAttributes: S.optional(__S(560, __c35, 0)).pipe(
            T.HttpHeader("x-amz-optional-object-attributes"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/{Bucket}?list-type=2" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListObjectsV2Request" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          IsTruncated: S.optional(S.Boolean),
          Contents: S.optional(__S(545, __c34, 1)).pipe(T.XmlFlattened()),
          Name: S.optional(S.String),
          Prefix: S.optional(S.String),
          Delimiter: S.optional(S.String),
          MaxKeys: S.optional(S.Number),
          CommonPrefixes: S.optional(__S(465, __c29, 1)).pipe(T.XmlFlattened()),
          EncodingType: S.optional(S.String),
          KeyCount: S.optional(S.Number),
          ContinuationToken: S.optional(S.String),
          NextContinuationToken: S.optional(S.String),
          StartAfter: S.optional(S.String),
          RequestCharged: S.optional(S.String).pipe(T.HttpHeader("x-amz-request-charged")),
        }).pipe(T.all(T.XmlName("ListBucketResult"), ns)),
      ).annotate({ identifier: "ListObjectsV2Output" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          Delimiter: S.optional(S.String).pipe(T.HttpQuery("delimiter")),
          EncodingType: S.optional(S.String).pipe(T.HttpQuery("encoding-type")),
          KeyMarker: S.optional(S.String).pipe(T.HttpQuery("key-marker")),
          MaxKeys: S.optional(S.Number).pipe(T.HttpQuery("max-keys")),
          Prefix: S.optional(S.String).pipe(T.HttpQuery("prefix"), T.ContextParam("Prefix")),
          VersionIdMarker: S.optional(S.String).pipe(T.HttpQuery("version-id-marker")),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
          RequestPayer: S.optional(S.String).pipe(T.HttpHeader("x-amz-request-payer")),
          OptionalObjectAttributes: S.optional(__S(560, __c35, 0)).pipe(
            T.HttpHeader("x-amz-optional-object-attributes"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/{Bucket}?versions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListObjectVersionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ETag: S.optional(S.String),
          ChecksumAlgorithm: S.optional(__S(512, __c32, 0)).pipe(T.XmlFlattened()),
          ChecksumType: S.optional(S.String),
          Size: S.optional(S.Number),
          StorageClass: S.optional(S.String),
          Key: S.optional(S.String),
          VersionId: S.optional(S.String),
          IsLatest: S.optional(S.Boolean),
          LastModified: S.optional(T.DateFromString),
          Owner: S.optional(__S(1856, __c116, 0)),
          RestoreStatus: S.optional(__S(561, __c35, 1)),
        }),
      ).annotate({ identifier: "ObjectVersion" });
    case 2:
      return S.Array(__S(593, __c37, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Owner: S.optional(__S(1856, __c116, 0)),
          Key: S.optional(S.String),
          VersionId: S.optional(S.String),
          IsLatest: S.optional(S.Boolean),
          LastModified: S.optional(T.DateFromString),
        }),
      ).annotate({ identifier: "DeleteMarkerEntry" });
    case 4:
      return S.Array(__S(595, __c37, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          IsTruncated: S.optional(S.Boolean),
          KeyMarker: S.optional(S.String),
          VersionIdMarker: S.optional(S.String),
          NextKeyMarker: S.optional(S.String),
          NextVersionIdMarker: S.optional(S.String),
          Versions: S.optional(__S(594, __c37, 2)).pipe(T.XmlName("Version"), T.XmlFlattened()),
          DeleteMarkers: S.optional(__S(596, __c37, 4)).pipe(
            T.XmlName("DeleteMarker"),
            T.XmlFlattened(),
          ),
          Name: S.optional(S.String),
          Prefix: S.optional(S.String),
          Delimiter: S.optional(S.String),
          MaxKeys: S.optional(S.Number),
          CommonPrefixes: S.optional(__S(465, __c29, 1)).pipe(T.XmlFlattened()),
          EncodingType: S.optional(S.String),
          RequestCharged: S.optional(S.String).pipe(T.HttpHeader("x-amz-request-charged")),
        }).pipe(T.all(T.XmlName("ListVersionsResult"), ns)),
      ).annotate({ identifier: "ListObjectVersionsOutput" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          Key: S.String.pipe(T.HttpLabel("Key"), T.ContextParam("Key")),
          MaxParts: S.optional(S.Number).pipe(T.HttpQuery("max-parts")),
          PartNumberMarker: S.optional(S.String).pipe(T.HttpQuery("part-number-marker")),
          UploadId: S.String.pipe(T.HttpQuery("uploadId")),
          RequestPayer: S.optional(S.String).pipe(T.HttpHeader("x-amz-request-payer")),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
          SSECustomerAlgorithm: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-server-side-encryption-customer-algorithm"),
          ),
          SSECustomerKey: S.optional(SensitiveString).pipe(
            T.HttpHeader("x-amz-server-side-encryption-customer-key"),
          ),
          SSECustomerKeyMD5: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-server-side-encryption-customer-key-MD5"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/{Bucket}/{Key+}?x-id=ListParts" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListPartsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          PartNumber: S.optional(S.Number),
          LastModified: S.optional(T.DateFromString),
          ETag: S.optional(S.String),
          Size: S.optional(S.Number),
          ChecksumCRC32: S.optional(S.String),
          ChecksumCRC32C: S.optional(S.String),
          ChecksumCRC64NVME: S.optional(S.String),
          ChecksumSHA1: S.optional(S.String),
          ChecksumSHA256: S.optional(S.String),
          ChecksumSHA512: S.optional(S.String),
          ChecksumMD5: S.optional(S.String),
          ChecksumXXHASH64: S.optional(S.String),
          ChecksumXXHASH3: S.optional(S.String),
          ChecksumXXHASH128: S.optional(S.String),
        }),
      ).annotate({ identifier: "Part" });
    case 2:
      return S.Array(__S(609, __c38, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          AbortDate: S.optional(S.Date.pipe(T.TimestampFormat("http-date"))).pipe(
            T.HttpHeader("x-amz-abort-date"),
          ),
          AbortRuleId: S.optional(S.String).pipe(T.HttpHeader("x-amz-abort-rule-id")),
          Bucket: S.optional(S.String),
          Key: S.optional(S.String),
          UploadId: S.optional(S.String),
          PartNumberMarker: S.optional(S.String),
          NextPartNumberMarker: S.optional(S.String),
          MaxParts: S.optional(S.Number),
          IsTruncated: S.optional(S.Boolean),
          Parts: S.optional(__S(610, __c38, 2)).pipe(T.XmlName("Part"), T.XmlFlattened()),
          Initiator: S.optional(__S(480, __c30, 0)),
          Owner: S.optional(__S(1856, __c116, 0)),
          StorageClass: S.optional(S.String),
          RequestCharged: S.optional(S.String).pipe(T.HttpHeader("x-amz-request-charged")),
          ChecksumAlgorithm: S.optional(S.String),
          ChecksumType: S.optional(S.String),
        }).pipe(T.all(T.XmlName("ListPartsResult"), ns)),
      ).annotate({ identifier: "ListPartsOutput" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          ContentMD5: S.optional(S.String).pipe(T.HttpHeader("Content-MD5")),
          ChecksumAlgorithm: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-sdk-checksum-algorithm"),
          ),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
          AbacStatus: __S(1808, __c113, 0)
            .pipe(T.HttpPayload(), T.XmlName("AbacStatus"))
            .annotate({ identifier: "AbacStatus" }),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/{Bucket}?abac" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.AwsProtocolsHttpChecksum({ requestAlgorithmMember: "ChecksumAlgorithm" }),
          ),
        ),
      ).annotate({ identifier: "PutBucketAbacRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "PutBucketAbacResponse",
      });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Status: S.optional(S.String) })).annotate({
        identifier: "AccelerateConfiguration",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          AccelerateConfiguration: __S(640, __c40, 0)
            .pipe(T.HttpPayload(), T.XmlName("AccelerateConfiguration"))
            .annotate({ identifier: "AccelerateConfiguration" }),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
          ChecksumAlgorithm: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-sdk-checksum-algorithm"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/{Bucket}?accelerate" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.AwsProtocolsHttpChecksum({ requestAlgorithmMember: "ChecksumAlgorithm" }),
            T.StaticContextParams({ UseS3ExpressControlEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "PutBucketAccelerateConfigurationRequest" });
    case 2:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "PutBucketAccelerateConfigurationResponse",
      });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ACL: S.optional(S.String).pipe(T.HttpHeader("x-amz-acl")),
          AccessControlPolicy: S.optional(__S(672, __c42, 0))
            .pipe(T.HttpPayload(), T.XmlName("AccessControlPolicy"))
            .annotate({ identifier: "AccessControlPolicy" }),
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          ContentMD5: S.optional(S.String).pipe(T.HttpHeader("Content-MD5")),
          ChecksumAlgorithm: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-sdk-checksum-algorithm"),
          ),
          GrantFullControl: S.optional(S.String).pipe(T.HttpHeader("x-amz-grant-full-control")),
          GrantRead: S.optional(S.String).pipe(T.HttpHeader("x-amz-grant-read")),
          GrantReadACP: S.optional(S.String).pipe(T.HttpHeader("x-amz-grant-read-acp")),
          GrantWrite: S.optional(S.String).pipe(T.HttpHeader("x-amz-grant-write")),
          GrantWriteACP: S.optional(S.String).pipe(T.HttpHeader("x-amz-grant-write-acp")),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/{Bucket}?acl" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.AwsProtocolsHttpChecksum({
              requestAlgorithmMember: "ChecksumAlgorithm",
              requestChecksumRequired: true,
            }),
            T.StaticContextParams({ UseS3ExpressControlEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "PutBucketAclRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "PutBucketAclResponse",
      });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Grants: S.optional(__S(1873, __c117, 1)).pipe(T.XmlName("AccessControlList")),
          Owner: S.optional(__S(1856, __c116, 0)),
        }),
      ).annotate({ identifier: "AccessControlPolicy" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          Id: S.String.pipe(T.HttpQuery("id")),
          AnalyticsConfiguration: __S(1926, __c120, 6)
            .pipe(T.HttpPayload(), T.XmlName("AnalyticsConfiguration"))
            .annotate({ identifier: "AnalyticsConfiguration" }),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/{Bucket}?analytics" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ UseS3ExpressControlEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "PutBucketAnalyticsConfigurationRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "PutBucketAnalyticsConfigurationResponse",
      });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ CORSRules: __S(1957, __c122, 5).pipe(T.XmlName("CORSRule"), T.XmlFlattened()) }),
      ).annotate({ identifier: "CORSConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          CORSConfiguration: __S(704, __c44, 0)
            .pipe(T.HttpPayload(), T.XmlName("CORSConfiguration"))
            .annotate({ identifier: "CORSConfiguration" }),
          ContentMD5: S.optional(S.String).pipe(T.HttpHeader("Content-MD5")),
          ChecksumAlgorithm: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-sdk-checksum-algorithm"),
          ),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/{Bucket}?cors" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.AwsProtocolsHttpChecksum({
              requestAlgorithmMember: "ChecksumAlgorithm",
              requestChecksumRequired: true,
            }),
            T.StaticContextParams({ UseS3ExpressControlEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "PutBucketCorsRequest" });
    case 2:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "PutBucketCorsResponse",
      });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          ContentMD5: S.optional(S.String).pipe(T.HttpHeader("Content-MD5")),
          ChecksumAlgorithm: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-sdk-checksum-algorithm"),
          ),
          ServerSideEncryptionConfiguration: __S(1989, __c124, 5)
            .pipe(T.HttpPayload(), T.XmlName("ServerSideEncryptionConfiguration"))
            .annotate({ identifier: "ServerSideEncryptionConfiguration" }),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/{Bucket}?encryption" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.AwsProtocolsHttpChecksum({
              requestAlgorithmMember: "ChecksumAlgorithm",
              requestChecksumRequired: true,
            }),
            T.StaticContextParams({ UseS3ExpressControlEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "PutBucketEncryptionRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "PutBucketEncryptionResponse",
      });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          Id: S.String.pipe(T.HttpQuery("id")),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
          IntelligentTieringConfiguration: __S(2020, __c126, 4)
            .pipe(T.HttpPayload(), T.XmlName("IntelligentTieringConfiguration"))
            .annotate({ identifier: "IntelligentTieringConfiguration" }),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/{Bucket}?intelligent-tiering" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ UseS3ExpressControlEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "PutBucketIntelligentTieringConfigurationRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "PutBucketIntelligentTieringConfigurationResponse",
      });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          Id: S.String.pipe(T.HttpQuery("id")),
          InventoryConfiguration: __S(2056, __c128, 8)
            .pipe(T.HttpPayload(), T.XmlName("InventoryConfiguration"))
            .annotate({ identifier: "InventoryConfiguration" }),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/{Bucket}?inventory" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ UseS3ExpressControlEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "PutBucketInventoryConfigurationRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "PutBucketInventoryConfigurationResponse",
      });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Rules: __S(2090, __c130, 10).pipe(T.XmlName("Rule"), T.XmlFlattened()) }),
      ).annotate({ identifier: "BucketLifecycleConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          ChecksumAlgorithm: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-sdk-checksum-algorithm"),
          ),
          LifecycleConfiguration: S.optional(__S(768, __c48, 0))
            .pipe(T.HttpPayload(), T.XmlName("LifecycleConfiguration"))
            .annotate({ identifier: "BucketLifecycleConfiguration" }),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
          TransitionDefaultMinimumObjectSize: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-transition-default-minimum-object-size"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/{Bucket}?lifecycle" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.AwsProtocolsHttpChecksum({
              requestAlgorithmMember: "ChecksumAlgorithm",
              requestChecksumRequired: true,
            }),
            T.StaticContextParams({ UseS3ExpressControlEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "PutBucketLifecycleConfigurationRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          TransitionDefaultMinimumObjectSize: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-transition-default-minimum-object-size"),
          ),
        }).pipe(ns),
      ).annotate({ identifier: "PutBucketLifecycleConfigurationOutput" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ LoggingEnabled: S.optional(__S(2133, __c133, 5)) }),
      ).annotate({ identifier: "BucketLoggingStatus" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          BucketLoggingStatus: __S(784, __c49, 0)
            .pipe(T.HttpPayload(), T.XmlName("BucketLoggingStatus"))
            .annotate({ identifier: "BucketLoggingStatus" }),
          ContentMD5: S.optional(S.String).pipe(T.HttpHeader("Content-MD5")),
          ChecksumAlgorithm: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-sdk-checksum-algorithm"),
          ),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/{Bucket}?logging" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.AwsProtocolsHttpChecksum({
              requestAlgorithmMember: "ChecksumAlgorithm",
              requestChecksumRequired: true,
            }),
            T.StaticContextParams({ UseS3ExpressControlEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "PutBucketLoggingRequest" });
    case 2:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "PutBucketLoggingResponse",
      });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          Id: S.String.pipe(T.HttpQuery("id")),
          MetricsConfiguration: __S(2210, __c138, 2)
            .pipe(T.HttpPayload(), T.XmlName("MetricsConfiguration"))
            .annotate({ identifier: "MetricsConfiguration" }),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/{Bucket}?metrics" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ UseS3ExpressControlEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "PutBucketMetricsConfigurationRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "PutBucketMetricsConfigurationResponse",
      });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          NotificationConfiguration: __S(2252, __c140, 12)
            .pipe(T.HttpPayload(), T.XmlName("NotificationConfiguration"))
            .annotate({ identifier: "NotificationConfiguration" }),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
          SkipDestinationValidation: S.optional(S.Boolean).pipe(
            T.HttpHeader("x-amz-skip-destination-validation"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/{Bucket}?notification" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ UseS3ExpressControlEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "PutBucketNotificationConfigurationRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "PutBucketNotificationConfigurationResponse",
      });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          ContentMD5: S.optional(S.String).pipe(T.HttpHeader("Content-MD5")),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
          OwnershipControls: __S(2274, __c142, 2)
            .pipe(T.HttpPayload(), T.XmlName("OwnershipControls"))
            .annotate({ identifier: "OwnershipControls" }),
          ChecksumAlgorithm: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-sdk-checksum-algorithm"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/{Bucket}?ownershipControls" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.AwsProtocolsHttpChecksum({
              requestAlgorithmMember: "ChecksumAlgorithm",
              requestChecksumRequired: true,
            }),
            T.StaticContextParams({ UseS3ExpressControlEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "PutBucketOwnershipControlsRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "PutBucketOwnershipControlsResponse",
      });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          ContentMD5: S.optional(S.String).pipe(T.HttpHeader("Content-MD5")),
          ChecksumAlgorithm: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-sdk-checksum-algorithm"),
          ),
          ConfirmRemoveSelfBucketAccess: S.optional(S.Boolean).pipe(
            T.HttpHeader("x-amz-confirm-remove-self-bucket-access"),
          ),
          Policy: S.String.pipe(T.HttpPayload()),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/{Bucket}?policy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.AwsProtocolsHttpChecksum({
              requestAlgorithmMember: "ChecksumAlgorithm",
              requestChecksumRequired: true,
            }),
            T.StaticContextParams({ UseS3ExpressControlEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "PutBucketPolicyRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "PutBucketPolicyResponse",
      });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          ContentMD5: S.optional(S.String).pipe(T.HttpHeader("Content-MD5")),
          ChecksumAlgorithm: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-sdk-checksum-algorithm"),
          ),
          ReplicationConfiguration: __S(2351, __c146, 15)
            .pipe(T.HttpPayload(), T.XmlName("ReplicationConfiguration"))
            .annotate({ identifier: "ReplicationConfiguration" }),
          Token: S.optional(S.String).pipe(T.HttpHeader("x-amz-bucket-object-lock-token")),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/{Bucket}?replication" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.AwsProtocolsHttpChecksum({
              requestAlgorithmMember: "ChecksumAlgorithm",
              requestChecksumRequired: true,
            }),
            T.StaticContextParams({ UseS3ExpressControlEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "PutBucketReplicationRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "PutBucketReplicationResponse",
      });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Payer: S.String })).annotate({
        identifier: "RequestPaymentConfiguration",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          ContentMD5: S.optional(S.String).pipe(T.HttpHeader("Content-MD5")),
          ChecksumAlgorithm: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-sdk-checksum-algorithm"),
          ),
          RequestPaymentConfiguration: __S(880, __c55, 0)
            .pipe(T.HttpPayload(), T.XmlName("RequestPaymentConfiguration"))
            .annotate({ identifier: "RequestPaymentConfiguration" }),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/{Bucket}?requestPayment" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.AwsProtocolsHttpChecksum({
              requestAlgorithmMember: "ChecksumAlgorithm",
              requestChecksumRequired: true,
            }),
            T.StaticContextParams({ UseS3ExpressControlEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "PutBucketRequestPaymentRequest" });
    case 2:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "PutBucketRequestPaymentResponse",
      });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          ContentMD5: S.optional(S.String).pipe(T.HttpHeader("Content-MD5")),
          ChecksumAlgorithm: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-sdk-checksum-algorithm"),
          ),
          Tagging: __S(912, __c57, 0)
            .pipe(T.HttpPayload(), T.XmlName("Tagging"))
            .annotate({ identifier: "Tagging" }),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/{Bucket}?tagging" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.AwsProtocolsHttpChecksum({
              requestAlgorithmMember: "ChecksumAlgorithm",
              requestChecksumRequired: true,
            }),
            T.StaticContextParams({ UseS3ExpressControlEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "PutBucketTaggingRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "PutBucketTaggingResponse",
      });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ TagSet: __S(1361, __c85, 1) })).annotate({
        identifier: "Tagging",
      });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MFADelete: S.optional(S.String).pipe(T.XmlName("MfaDelete")),
          Status: S.optional(S.String),
        }),
      ).annotate({ identifier: "VersioningConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          ContentMD5: S.optional(S.String).pipe(T.HttpHeader("Content-MD5")),
          ChecksumAlgorithm: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-sdk-checksum-algorithm"),
          ),
          MFA: S.optional(S.String).pipe(T.HttpHeader("x-amz-mfa")),
          VersioningConfiguration: __S(928, __c58, 0)
            .pipe(T.HttpPayload(), T.XmlName("VersioningConfiguration"))
            .annotate({ identifier: "VersioningConfiguration" }),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/{Bucket}?versioning" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.AwsProtocolsHttpChecksum({
              requestAlgorithmMember: "ChecksumAlgorithm",
              requestChecksumRequired: true,
            }),
            T.StaticContextParams({ UseS3ExpressControlEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "PutBucketVersioningRequest" });
    case 2:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "PutBucketVersioningResponse",
      });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ErrorDocument: S.optional(__S(50, __c3, 2)),
          IndexDocument: S.optional(__S(49, __c3, 1)),
          RedirectAllRequestsTo: S.optional(__S(48, __c3, 0)),
          RoutingRules: S.optional(__S(54, __c3, 6)),
        }),
      ).annotate({ identifier: "WebsiteConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          ContentMD5: S.optional(S.String).pipe(T.HttpHeader("Content-MD5")),
          ChecksumAlgorithm: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-sdk-checksum-algorithm"),
          ),
          WebsiteConfiguration: __S(944, __c59, 0)
            .pipe(T.HttpPayload(), T.XmlName("WebsiteConfiguration"))
            .annotate({ identifier: "WebsiteConfiguration" }),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/{Bucket}?website" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.AwsProtocolsHttpChecksum({
              requestAlgorithmMember: "ChecksumAlgorithm",
              requestChecksumRequired: true,
            }),
            T.StaticContextParams({ UseS3ExpressControlEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "PutBucketWebsiteRequest" });
    case 2:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "PutBucketWebsiteResponse",
      });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ACL: S.optional(S.String).pipe(T.HttpHeader("x-amz-acl")),
          Body: S.optional(T.StreamingInput).pipe(T.HttpPayload()),
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          CacheControl: S.optional(S.String).pipe(T.HttpHeader("Cache-Control")),
          ContentDisposition: S.optional(S.String).pipe(T.HttpHeader("Content-Disposition")),
          ContentEncoding: S.optional(S.String).pipe(T.HttpHeader("Content-Encoding")),
          ContentLanguage: S.optional(S.String).pipe(T.HttpHeader("Content-Language")),
          ContentLength: S.optional(S.Number).pipe(T.HttpHeader("Content-Length")),
          ContentMD5: S.optional(S.String).pipe(T.HttpHeader("Content-MD5")),
          ContentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
          ChecksumAlgorithm: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-sdk-checksum-algorithm"),
          ),
          ChecksumCRC32: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-crc32")),
          ChecksumCRC32C: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-crc32c")),
          ChecksumCRC64NVME: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-crc64nvme")),
          ChecksumSHA1: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-sha1")),
          ChecksumSHA256: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-sha256")),
          ChecksumSHA512: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-sha512")),
          ChecksumMD5: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-md5")),
          ChecksumXXHASH64: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-xxhash64")),
          ChecksumXXHASH3: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-xxhash3")),
          ChecksumXXHASH128: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-xxhash128")),
          Expires: S.optional(S.String).pipe(T.HttpHeader("Expires")),
          IfMatch: S.optional(S.String).pipe(T.HttpHeader("If-Match")),
          IfNoneMatch: S.optional(S.String).pipe(T.HttpHeader("If-None-Match")),
          GrantFullControl: S.optional(S.String).pipe(T.HttpHeader("x-amz-grant-full-control")),
          GrantRead: S.optional(S.String).pipe(T.HttpHeader("x-amz-grant-read")),
          GrantReadACP: S.optional(S.String).pipe(T.HttpHeader("x-amz-grant-read-acp")),
          GrantWriteACP: S.optional(S.String).pipe(T.HttpHeader("x-amz-grant-write-acp")),
          Key: S.String.pipe(T.HttpLabel("Key"), T.ContextParam("Key")),
          WriteOffsetBytes: S.optional(S.Number).pipe(T.HttpHeader("x-amz-write-offset-bytes")),
          Metadata: S.optional(__S(1328, __c83, 0)).pipe(T.HttpPrefixHeaders("x-amz-meta-")),
          ServerSideEncryption: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-server-side-encryption"),
          ),
          StorageClass: S.optional(S.String).pipe(T.HttpHeader("x-amz-storage-class")),
          WebsiteRedirectLocation: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-website-redirect-location"),
          ),
          SSECustomerAlgorithm: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-server-side-encryption-customer-algorithm"),
          ),
          SSECustomerKey: S.optional(SensitiveString).pipe(
            T.HttpHeader("x-amz-server-side-encryption-customer-key"),
          ),
          SSECustomerKeyMD5: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-server-side-encryption-customer-key-MD5"),
          ),
          SSEKMSKeyId: S.optional(SensitiveString).pipe(
            T.HttpHeader("x-amz-server-side-encryption-aws-kms-key-id"),
          ),
          SSEKMSEncryptionContext: S.optional(SensitiveString).pipe(
            T.HttpHeader("x-amz-server-side-encryption-context"),
          ),
          BucketKeyEnabled: S.optional(S.Boolean).pipe(
            T.HttpHeader("x-amz-server-side-encryption-bucket-key-enabled"),
          ),
          RequestPayer: S.optional(S.String).pipe(T.HttpHeader("x-amz-request-payer")),
          Tagging: S.optional(S.String).pipe(T.HttpHeader("x-amz-tagging")),
          ObjectLockMode: S.optional(S.String).pipe(T.HttpHeader("x-amz-object-lock-mode")),
          ObjectLockRetainUntilDate: S.optional(S.Date.pipe(T.TimestampFormat("http-date"))).pipe(
            T.HttpHeader("x-amz-object-lock-retain-until-date"),
          ),
          ObjectLockLegalHoldStatus: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-object-lock-legal-hold"),
          ),
          ObjectLockEventHold: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-object-lock-event-hold"),
          ),
          ObjectLockEventHoldDurationDays: S.optional(S.Number).pipe(
            T.HttpHeader("x-amz-object-lock-event-hold-duration-days"),
          ),
          ObjectLockEventHoldDurationYears: S.optional(S.Number).pipe(
            T.HttpHeader("x-amz-object-lock-event-hold-duration-years"),
          ),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/{Bucket}/{Key+}?x-id=PutObject" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.AwsProtocolsHttpChecksum({ requestAlgorithmMember: "ChecksumAlgorithm" }),
          ),
        ),
      ).annotate({ identifier: "PutObjectRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Expiration: S.optional(S.String).pipe(T.HttpHeader("x-amz-expiration")),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
          ChecksumCRC32: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-crc32")),
          ChecksumCRC32C: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-crc32c")),
          ChecksumCRC64NVME: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-crc64nvme")),
          ChecksumSHA1: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-sha1")),
          ChecksumSHA256: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-sha256")),
          ChecksumSHA512: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-sha512")),
          ChecksumMD5: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-md5")),
          ChecksumXXHASH64: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-xxhash64")),
          ChecksumXXHASH3: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-xxhash3")),
          ChecksumXXHASH128: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-xxhash128")),
          ChecksumType: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-type")),
          ServerSideEncryption: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-server-side-encryption"),
          ),
          VersionId: S.optional(S.String).pipe(T.HttpHeader("x-amz-version-id")),
          SSECustomerAlgorithm: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-server-side-encryption-customer-algorithm"),
          ),
          SSECustomerKeyMD5: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-server-side-encryption-customer-key-MD5"),
          ),
          SSEKMSKeyId: S.optional(SensitiveString).pipe(
            T.HttpHeader("x-amz-server-side-encryption-aws-kms-key-id"),
          ),
          SSEKMSEncryptionContext: S.optional(SensitiveString).pipe(
            T.HttpHeader("x-amz-server-side-encryption-context"),
          ),
          BucketKeyEnabled: S.optional(S.Boolean).pipe(
            T.HttpHeader("x-amz-server-side-encryption-bucket-key-enabled"),
          ),
          Size: S.optional(S.Number).pipe(T.HttpHeader("x-amz-object-size")),
          RequestCharged: S.optional(S.String).pipe(T.HttpHeader("x-amz-request-charged")),
        }).pipe(ns),
      ).annotate({ identifier: "PutObjectOutput" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ACL: S.optional(S.String).pipe(T.HttpHeader("x-amz-acl")),
          AccessControlPolicy: S.optional(__S(672, __c42, 0))
            .pipe(T.HttpPayload(), T.XmlName("AccessControlPolicy"))
            .annotate({ identifier: "AccessControlPolicy" }),
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          ContentMD5: S.optional(S.String).pipe(T.HttpHeader("Content-MD5")),
          ChecksumAlgorithm: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-sdk-checksum-algorithm"),
          ),
          GrantFullControl: S.optional(S.String).pipe(T.HttpHeader("x-amz-grant-full-control")),
          GrantRead: S.optional(S.String).pipe(T.HttpHeader("x-amz-grant-read")),
          GrantReadACP: S.optional(S.String).pipe(T.HttpHeader("x-amz-grant-read-acp")),
          GrantWrite: S.optional(S.String).pipe(T.HttpHeader("x-amz-grant-write")),
          GrantWriteACP: S.optional(S.String).pipe(T.HttpHeader("x-amz-grant-write-acp")),
          Key: S.String.pipe(T.HttpLabel("Key"), T.ContextParam("Key")),
          RequestPayer: S.optional(S.String).pipe(T.HttpHeader("x-amz-request-payer")),
          VersionId: S.optional(S.String).pipe(T.HttpQuery("versionId")),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/{Bucket}/{Key+}?acl" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.AwsProtocolsHttpChecksum({
              requestAlgorithmMember: "ChecksumAlgorithm",
              requestChecksumRequired: true,
            }),
          ),
        ),
      ).annotate({ identifier: "PutObjectAclRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RequestCharged: S.optional(S.String).pipe(T.HttpHeader("x-amz-request-charged")),
        }).pipe(ns),
      ).annotate({ identifier: "PutObjectAclOutput" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          Key: S.String.pipe(T.HttpLabel("Key"), T.ContextParam("Key")),
          VersionId: S.optional(S.String).pipe(T.HttpQuery("versionId")),
          AnnotationName: S.String.pipe(T.HttpQuery("annotationName")),
          AnnotationPayload: T.StreamingInput.pipe(T.HttpPayload()),
          ObjectIfMatch: S.optional(S.String).pipe(T.HttpHeader("x-amz-object-if-match")),
          ChecksumAlgorithm: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-sdk-checksum-algorithm"),
          ),
          ChecksumCRC32: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-crc32")),
          ChecksumCRC32C: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-crc32c")),
          ChecksumCRC64NVME: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-crc64nvme")),
          ChecksumSHA1: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-sha1")),
          ChecksumSHA256: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-sha256")),
          ChecksumSHA512: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-sha512")),
          ChecksumMD5: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-md5")),
          ChecksumXXHASH64: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-xxhash64")),
          ChecksumXXHASH3: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-xxhash3")),
          ChecksumXXHASH128: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-xxhash128")),
          ContentMD5: S.optional(S.String).pipe(T.HttpHeader("Content-MD5")),
          RequestPayer: S.optional(S.String).pipe(T.HttpHeader("x-amz-request-payer")),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/{Bucket}/{Key+}?annotation" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.AwsProtocolsHttpChecksum({ requestAlgorithmMember: "ChecksumAlgorithm" }),
          ),
        ),
      ).annotate({ identifier: "PutObjectAnnotationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Key: S.optional(S.String),
          AnnotationName: S.optional(S.String),
          ObjectVersionId: S.optional(S.String).pipe(T.HttpHeader("x-amz-object-version-id")),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
          ChecksumCRC32: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-crc32")),
          ChecksumCRC32C: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-crc32c")),
          ChecksumCRC64NVME: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-crc64nvme")),
          ChecksumSHA1: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-sha1")),
          ChecksumSHA256: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-sha256")),
          ChecksumSHA512: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-sha512")),
          ChecksumMD5: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-md5")),
          ChecksumXXHASH64: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-xxhash64")),
          ChecksumXXHASH3: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-xxhash3")),
          ChecksumXXHASH128: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-xxhash128")),
          ChecksumType: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-type")),
          ServerSideEncryption: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-server-side-encryption"),
          ),
          RequestCharged: S.optional(S.String).pipe(T.HttpHeader("x-amz-request-charged")),
        }).pipe(ns),
      ).annotate({ identifier: "PutObjectAnnotationOutput" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          Key: S.String.pipe(T.HttpLabel("Key")),
          LegalHold: S.optional(__S(144, __c9, 0))
            .pipe(T.HttpPayload(), T.XmlName("LegalHold"))
            .annotate({ identifier: "ObjectLockLegalHold" }),
          RequestPayer: S.optional(S.String).pipe(T.HttpHeader("x-amz-request-payer")),
          VersionId: S.optional(S.String).pipe(T.HttpQuery("versionId")),
          ContentMD5: S.optional(S.String).pipe(T.HttpHeader("Content-MD5")),
          ChecksumAlgorithm: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-sdk-checksum-algorithm"),
          ),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/{Bucket}/{Key+}?legal-hold" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.AwsProtocolsHttpChecksum({
              requestAlgorithmMember: "ChecksumAlgorithm",
              requestChecksumRequired: true,
            }),
          ),
        ),
      ).annotate({ identifier: "PutObjectLegalHoldRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RequestCharged: S.optional(S.String).pipe(T.HttpHeader("x-amz-request-charged")),
        }).pipe(ns),
      ).annotate({ identifier: "PutObjectLegalHoldOutput" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          ObjectLockConfiguration: S.optional(__S(194, __c12, 2))
            .pipe(T.HttpPayload(), T.XmlName("ObjectLockConfiguration"))
            .annotate({ identifier: "ObjectLockConfiguration" }),
          RequestPayer: S.optional(S.String).pipe(T.HttpHeader("x-amz-request-payer")),
          Token: S.optional(S.String).pipe(T.HttpHeader("x-amz-bucket-object-lock-token")),
          ContentMD5: S.optional(S.String).pipe(T.HttpHeader("Content-MD5")),
          ChecksumAlgorithm: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-sdk-checksum-algorithm"),
          ),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/{Bucket}?object-lock" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.AwsProtocolsHttpChecksum({
              requestAlgorithmMember: "ChecksumAlgorithm",
              requestChecksumRequired: true,
            }),
          ),
        ),
      ).annotate({ identifier: "PutObjectLockConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RequestCharged: S.optional(S.String).pipe(T.HttpHeader("x-amz-request-charged")),
        }).pipe(ns),
      ).annotate({ identifier: "PutObjectLockConfigurationOutput" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          Key: S.String.pipe(T.HttpLabel("Key")),
          Retention: S.optional(__S(224, __c14, 0))
            .pipe(T.HttpPayload(), T.XmlName("Retention"))
            .annotate({ identifier: "ObjectLockRetention" }),
          RequestPayer: S.optional(S.String).pipe(T.HttpHeader("x-amz-request-payer")),
          VersionId: S.optional(S.String).pipe(T.HttpQuery("versionId")),
          BypassGovernanceRetention: S.optional(S.Boolean).pipe(
            T.HttpHeader("x-amz-bypass-governance-retention"),
          ),
          ContentMD5: S.optional(S.String).pipe(T.HttpHeader("Content-MD5")),
          ChecksumAlgorithm: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-sdk-checksum-algorithm"),
          ),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/{Bucket}/{Key+}?retention" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.AwsProtocolsHttpChecksum({
              requestAlgorithmMember: "ChecksumAlgorithm",
              requestChecksumRequired: true,
            }),
          ),
        ),
      ).annotate({ identifier: "PutObjectRetentionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RequestCharged: S.optional(S.String).pipe(T.HttpHeader("x-amz-request-charged")),
        }).pipe(ns),
      ).annotate({ identifier: "PutObjectRetentionOutput" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          Key: S.String.pipe(T.HttpLabel("Key")),
          VersionId: S.optional(S.String).pipe(T.HttpQuery("versionId")),
          ContentMD5: S.optional(S.String).pipe(T.HttpHeader("Content-MD5")),
          ChecksumAlgorithm: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-sdk-checksum-algorithm"),
          ),
          Tagging: __S(912, __c57, 0)
            .pipe(T.HttpPayload(), T.XmlName("Tagging"))
            .annotate({ identifier: "Tagging" }),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
          RequestPayer: S.optional(S.String).pipe(T.HttpHeader("x-amz-request-payer")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/{Bucket}/{Key+}?tagging" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.AwsProtocolsHttpChecksum({
              requestAlgorithmMember: "ChecksumAlgorithm",
              requestChecksumRequired: true,
            }),
          ),
        ),
      ).annotate({ identifier: "PutObjectTaggingRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ VersionId: S.optional(S.String).pipe(T.HttpHeader("x-amz-version-id")) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "PutObjectTaggingOutput" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          ContentMD5: S.optional(S.String).pipe(T.HttpHeader("Content-MD5")),
          ChecksumAlgorithm: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-sdk-checksum-algorithm"),
          ),
          PublicAccessBlockConfiguration: __S(288, __c18, 0)
            .pipe(T.HttpPayload(), T.XmlName("PublicAccessBlockConfiguration"))
            .annotate({ identifier: "PublicAccessBlockConfiguration" }),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/{Bucket}?publicAccessBlock" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.AwsProtocolsHttpChecksum({
              requestAlgorithmMember: "ChecksumAlgorithm",
              requestChecksumRequired: true,
            }),
            T.StaticContextParams({ UseS3ExpressControlEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "PutPublicAccessBlockRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "PutPublicAccessBlockResponse",
      });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          Key: S.String.pipe(T.HttpLabel("Key"), T.ContextParam("Key")),
          RenameSource: S.String.pipe(T.HttpHeader("x-amz-rename-source")),
          DestinationIfMatch: S.optional(S.String).pipe(T.HttpHeader("If-Match")),
          DestinationIfNoneMatch: S.optional(S.String).pipe(T.HttpHeader("If-None-Match")),
          DestinationIfModifiedSince: S.optional(S.Date.pipe(T.TimestampFormat("http-date"))).pipe(
            T.HttpHeader("If-Modified-Since"),
          ),
          DestinationIfUnmodifiedSince: S.optional(
            S.Date.pipe(T.TimestampFormat("http-date")),
          ).pipe(T.HttpHeader("If-Unmodified-Since")),
          SourceIfMatch: S.optional(S.String).pipe(T.HttpHeader("x-amz-rename-source-if-match")),
          SourceIfNoneMatch: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-rename-source-if-none-match"),
          ),
          SourceIfModifiedSince: S.optional(S.Date.pipe(T.TimestampFormat("http-date"))).pipe(
            T.HttpHeader("x-amz-rename-source-if-modified-since"),
          ),
          SourceIfUnmodifiedSince: S.optional(S.Date.pipe(T.TimestampFormat("http-date"))).pipe(
            T.HttpHeader("x-amz-rename-source-if-unmodified-since"),
          ),
          ClientToken: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-client-token"),
            T.IdempotencyToken(),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/{Bucket}/{Key+}?renameObject" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RenameObjectRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({ identifier: "RenameObjectOutput" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Tier: S.String })).annotate({
        identifier: "GlacierJobParameters",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          InputSerialization: __S(1123, __c70, 3),
          ExpressionType: S.String,
          Expression: S.String,
          OutputSerialization: __S(1126, __c70, 6),
        }),
      ).annotate({ identifier: "SelectParameters" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          EncryptionType: S.String,
          KMSKeyId: S.optional(SensitiveString),
          KMSContext: S.optional(S.String),
        }),
      ).annotate({ identifier: "Encryption" });
    case 3:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), Value: S.optional(S.String) }),
      ).annotate({ identifier: "MetadataEntry" });
    case 4:
      return S.Array(
        /*@__PURE__*/ __S(1107, __c69, 3)
          .pipe(/*@__PURE__*/ T.XmlName("MetadataEntry"))
          .annotate({ identifier: "MetadataEntry" }),
      );
    case 5:
      return S.suspend(() =>
        S.Struct({
          BucketName: S.String,
          Prefix: S.String,
          Encryption: S.optional(__S(1106, __c69, 2)),
          CannedACL: S.optional(S.String),
          AccessControlList: S.optional(__S(1873, __c117, 1)),
          Tagging: S.optional(__S(912, __c57, 0)),
          UserMetadata: S.optional(__S(1108, __c69, 4)),
          StorageClass: S.optional(S.String),
        }),
      ).annotate({ identifier: "S3Location" });
    case 6:
      return S.suspend(() => S.Struct({ S3: S.optional(__S(1109, __c69, 5)) })).annotate({
        identifier: "OutputLocation",
      });
    case 7:
      return S.suspend(() =>
        S.Struct({
          Days: S.optional(S.Number),
          GlacierJobParameters: S.optional(__S(1104, __c69, 0)),
          Type: S.optional(S.String),
          Tier: S.optional(S.String),
          Description: S.optional(S.String),
          SelectParameters: S.optional(__S(1105, __c69, 1)),
          OutputLocation: S.optional(__S(1110, __c69, 6)),
        }),
      ).annotate({ identifier: "RestoreRequest" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          Key: S.String.pipe(T.HttpLabel("Key")),
          VersionId: S.optional(S.String).pipe(T.HttpQuery("versionId")),
          RestoreRequest: S.optional(__S(1111, __c69, 7))
            .pipe(T.HttpPayload(), T.XmlName("RestoreRequest"))
            .annotate({ identifier: "RestoreRequest" }),
          RequestPayer: S.optional(S.String).pipe(T.HttpHeader("x-amz-request-payer")),
          ChecksumAlgorithm: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-sdk-checksum-algorithm"),
          ),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/{Bucket}/{Key+}?restore" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.AwsProtocolsHttpChecksum({ requestAlgorithmMember: "ChecksumAlgorithm" }),
          ),
        ),
      ).annotate({ identifier: "RestoreObjectRequest" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          RequestCharged: S.optional(S.String).pipe(T.HttpHeader("x-amz-request-charged")),
          RestoreOutputPath: S.optional(S.String).pipe(T.HttpHeader("x-amz-restore-output-path")),
        }).pipe(ns),
      ).annotate({ identifier: "RestoreObjectOutput" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FileHeaderInfo: S.optional(S.String),
          Comments: S.optional(S.String),
          QuoteEscapeCharacter: S.optional(S.String),
          RecordDelimiter: S.optional(S.String),
          FieldDelimiter: S.optional(S.String),
          QuoteCharacter: S.optional(S.String),
          AllowQuotedRecordDelimiter: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "CSVInput" });
    case 1:
      return S.suspend(() => S.Struct({ Type: S.optional(S.String) })).annotate({
        identifier: "JSONInput",
      });
    case 2:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "ParquetInput" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          CSV: S.optional(__S(1120, __c70, 0)),
          CompressionType: S.optional(S.String),
          JSON: S.optional(__S(1121, __c70, 1)),
          Parquet: S.optional(__S(1122, __c70, 2)),
        }),
      ).annotate({ identifier: "InputSerialization" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          QuoteFields: S.optional(S.String),
          QuoteEscapeCharacter: S.optional(S.String),
          RecordDelimiter: S.optional(S.String),
          FieldDelimiter: S.optional(S.String),
          QuoteCharacter: S.optional(S.String),
        }),
      ).annotate({ identifier: "CSVOutput" });
    case 5:
      return S.suspend(() => S.Struct({ RecordDelimiter: S.optional(S.String) })).annotate({
        identifier: "JSONOutput",
      });
    case 6:
      return S.suspend(() =>
        S.Struct({ CSV: S.optional(__S(1124, __c70, 4)), JSON: S.optional(__S(1125, __c70, 5)) }),
      ).annotate({ identifier: "OutputSerialization" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Enabled: S.optional(S.Boolean) })).annotate({
        identifier: "RequestProgress",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ Start: S.optional(S.Number), End: S.optional(S.Number) }),
      ).annotate({ identifier: "ScanRange" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          Key: S.String.pipe(T.HttpLabel("Key")),
          SSECustomerAlgorithm: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-server-side-encryption-customer-algorithm"),
          ),
          SSECustomerKey: S.optional(SensitiveString).pipe(
            T.HttpHeader("x-amz-server-side-encryption-customer-key"),
          ),
          SSECustomerKeyMD5: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-server-side-encryption-customer-key-MD5"),
          ),
          Expression: S.String,
          ExpressionType: S.String,
          RequestProgress: S.optional(__S(1136, __c71, 0)),
          InputSerialization: __S(1123, __c70, 3),
          OutputSerialization: __S(1126, __c70, 6),
          ScanRange: S.optional(__S(1137, __c71, 1)),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/{Bucket}/{Key+}?select&select-type=2" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SelectObjectContentRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({ Payload: S.optional(T.Blob).pipe(T.EventPayload()) }),
      ).annotate({ identifier: "RecordsEvent" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          BytesScanned: S.optional(S.Number),
          BytesProcessed: S.optional(S.Number),
          BytesReturned: S.optional(S.Number),
        }),
      ).annotate({ identifier: "Stats" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          Details: S.optional(__S(1140, __c71, 4))
            .pipe(T.EventPayload())
            .annotate({ identifier: "Stats" }),
        }),
      ).annotate({ identifier: "StatsEvent" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          BytesScanned: S.optional(S.Number),
          BytesProcessed: S.optional(S.Number),
          BytesReturned: S.optional(S.Number),
        }),
      ).annotate({ identifier: "Progress" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          Details: S.optional(__S(1142, __c71, 6))
            .pipe(T.EventPayload())
            .annotate({ identifier: "Progress" }),
        }),
      ).annotate({ identifier: "ProgressEvent" });
    case 8:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "ContinuationEvent" });
    case 9:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "EndEvent" });
    case 10:
      return T.EventStream(
        /*@__PURE__*/ S.Union([
          /*@__PURE__*/ S.Struct({ Records: __S(1139, __c71, 3) }),
          /*@__PURE__*/ S.Struct({ Stats: __S(1141, __c71, 5) }),
          /*@__PURE__*/ S.Struct({ Progress: __S(1143, __c71, 7) }),
          /*@__PURE__*/ S.Struct({ Cont: __S(1144, __c71, 8) }),
          /*@__PURE__*/ S.Struct({ End: __S(1145, __c71, 9) }),
        ]),
      );
    case 11:
      return S.suspend(() =>
        S.Struct({ Payload: S.optional(__S(1146, __c71, 10)).pipe(T.HttpPayload()) }).pipe(ns),
      ).annotate({ identifier: "SelectObjectContentOutput" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConfigurationState: S.String,
          EncryptionConfiguration: S.optional(__S(1392, __c87, 0)),
          Role: S.optional(S.String),
        }),
      ).annotate({ identifier: "AnnotationTableConfigurationUpdates" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          ContentMD5: S.optional(S.String).pipe(T.HttpHeader("Content-MD5")),
          ChecksumAlgorithm: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-sdk-checksum-algorithm"),
          ),
          AnnotationTableConfiguration: __S(1152, __c72, 0)
            .pipe(T.HttpPayload(), T.XmlName("AnnotationTableConfiguration"))
            .annotate({ identifier: "AnnotationTableConfigurationUpdates" }),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/{Bucket}?metadataAnnotationTable" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.AwsProtocolsHttpChecksum({
              requestAlgorithmMember: "ChecksumAlgorithm",
              requestChecksumRequired: true,
            }),
            T.StaticContextParams({ UseS3ExpressControlEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "UpdateBucketMetadataAnnotationTableConfigurationRequest" });
    case 2:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "UpdateBucketMetadataAnnotationTableConfigurationResponse",
      });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConfigurationState: S.String,
          EncryptionConfiguration: S.optional(__S(1392, __c87, 0)),
        }),
      ).annotate({ identifier: "InventoryTableConfigurationUpdates" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          ContentMD5: S.optional(S.String).pipe(T.HttpHeader("Content-MD5")),
          ChecksumAlgorithm: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-sdk-checksum-algorithm"),
          ),
          InventoryTableConfiguration: __S(1168, __c73, 0)
            .pipe(T.HttpPayload(), T.XmlName("InventoryTableConfiguration"))
            .annotate({ identifier: "InventoryTableConfigurationUpdates" }),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/{Bucket}?metadataInventoryTable" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.AwsProtocolsHttpChecksum({
              requestAlgorithmMember: "ChecksumAlgorithm",
              requestChecksumRequired: true,
            }),
            T.StaticContextParams({ UseS3ExpressControlEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "UpdateBucketMetadataInventoryTableConfigurationRequest" });
    case 2:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "UpdateBucketMetadataInventoryTableConfigurationResponse",
      });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ RecordExpiration: __S(1408, __c88, 0) })).annotate({
        identifier: "JournalTableConfigurationUpdates",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          ContentMD5: S.optional(S.String).pipe(T.HttpHeader("Content-MD5")),
          ChecksumAlgorithm: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-sdk-checksum-algorithm"),
          ),
          JournalTableConfiguration: __S(1184, __c74, 0)
            .pipe(T.HttpPayload(), T.XmlName("JournalTableConfiguration"))
            .annotate({ identifier: "JournalTableConfigurationUpdates" }),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/{Bucket}?metadataJournalTable" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.AwsProtocolsHttpChecksum({
              requestAlgorithmMember: "ChecksumAlgorithm",
              requestChecksumRequired: true,
            }),
            T.StaticContextParams({ UseS3ExpressControlEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "UpdateBucketMetadataJournalTableConfigurationRequest" });
    case 2:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "UpdateBucketMetadataJournalTableConfigurationResponse",
      });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ KMSKeyArn: SensitiveString, BucketKeyEnabled: S.optional(S.Boolean) }).pipe(
          T.XmlName("SSE-KMS"),
        ),
      ).annotate({ identifier: "SSEKMSEncryption" });
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({
          SSEKMS: /*@__PURE__*/ __S(1200, __c75, 0)
            .pipe(/*@__PURE__*/ T.XmlName("SSE-KMS"))
            .annotate({ identifier: "SSEKMSEncryption" }),
        }),
      ]);
    case 2:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          Key: S.String.pipe(T.HttpLabel("Key")),
          VersionId: S.optional(S.String).pipe(T.HttpQuery("versionId")),
          ObjectEncryption: __S(1201, __c75, 1).pipe(T.HttpPayload()),
          RequestPayer: S.optional(S.String).pipe(T.HttpHeader("x-amz-request-payer")),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
          ContentMD5: S.optional(S.String).pipe(T.HttpHeader("Content-MD5")),
          ChecksumAlgorithm: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-sdk-checksum-algorithm"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/{Bucket}/{Key+}?encryption" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.AwsProtocolsHttpChecksum({
              requestAlgorithmMember: "ChecksumAlgorithm",
              requestChecksumRequired: true,
            }),
          ),
        ),
      ).annotate({ identifier: "UpdateObjectEncryptionRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          RequestCharged: S.optional(S.String).pipe(T.HttpHeader("x-amz-request-charged")),
        }).pipe(ns),
      ).annotate({ identifier: "UpdateObjectEncryptionResponse" });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Body: S.optional(T.StreamingInput).pipe(T.HttpPayload()),
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          ContentLength: S.optional(S.Number).pipe(T.HttpHeader("Content-Length")),
          ContentMD5: S.optional(S.String).pipe(T.HttpHeader("Content-MD5")),
          ChecksumAlgorithm: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-sdk-checksum-algorithm"),
          ),
          ChecksumCRC32: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-crc32")),
          ChecksumCRC32C: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-crc32c")),
          ChecksumCRC64NVME: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-crc64nvme")),
          ChecksumSHA1: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-sha1")),
          ChecksumSHA256: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-sha256")),
          ChecksumSHA512: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-sha512")),
          ChecksumMD5: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-md5")),
          ChecksumXXHASH64: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-xxhash64")),
          ChecksumXXHASH3: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-xxhash3")),
          ChecksumXXHASH128: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-xxhash128")),
          Key: S.String.pipe(T.HttpLabel("Key"), T.ContextParam("Key")),
          PartNumber: S.Number.pipe(T.HttpQuery("partNumber")),
          UploadId: S.String.pipe(T.HttpQuery("uploadId")),
          SSECustomerAlgorithm: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-server-side-encryption-customer-algorithm"),
          ),
          SSECustomerKey: S.optional(SensitiveString).pipe(
            T.HttpHeader("x-amz-server-side-encryption-customer-key"),
          ),
          SSECustomerKeyMD5: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-server-side-encryption-customer-key-MD5"),
          ),
          RequestPayer: S.optional(S.String).pipe(T.HttpHeader("x-amz-request-payer")),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/{Bucket}/{Key+}?x-id=UploadPart" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.AwsProtocolsHttpChecksum({ requestAlgorithmMember: "ChecksumAlgorithm" }),
          ),
        ),
      ).annotate({ identifier: "UploadPartRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ServerSideEncryption: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-server-side-encryption"),
          ),
          ETag: S.optional(S.String).pipe(T.HttpHeader("ETag")),
          ChecksumCRC32: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-crc32")),
          ChecksumCRC32C: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-crc32c")),
          ChecksumCRC64NVME: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-crc64nvme")),
          ChecksumSHA1: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-sha1")),
          ChecksumSHA256: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-sha256")),
          ChecksumSHA512: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-sha512")),
          ChecksumMD5: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-md5")),
          ChecksumXXHASH64: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-xxhash64")),
          ChecksumXXHASH3: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-xxhash3")),
          ChecksumXXHASH128: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-xxhash128")),
          SSECustomerAlgorithm: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-server-side-encryption-customer-algorithm"),
          ),
          SSECustomerKeyMD5: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-server-side-encryption-customer-key-MD5"),
          ),
          SSEKMSKeyId: S.optional(SensitiveString).pipe(
            T.HttpHeader("x-amz-server-side-encryption-aws-kms-key-id"),
          ),
          BucketKeyEnabled: S.optional(S.Boolean).pipe(
            T.HttpHeader("x-amz-server-side-encryption-bucket-key-enabled"),
          ),
          RequestCharged: S.optional(S.String).pipe(T.HttpHeader("x-amz-request-charged")),
        }).pipe(ns),
      ).annotate({ identifier: "UploadPartOutput" });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          CopySource: S.String.pipe(T.HttpHeader("x-amz-copy-source")),
          CopySourceIfMatch: S.optional(S.String).pipe(T.HttpHeader("x-amz-copy-source-if-match")),
          CopySourceIfModifiedSince: S.optional(S.Date.pipe(T.TimestampFormat("http-date"))).pipe(
            T.HttpHeader("x-amz-copy-source-if-modified-since"),
          ),
          CopySourceIfNoneMatch: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-copy-source-if-none-match"),
          ),
          CopySourceIfUnmodifiedSince: S.optional(S.Date.pipe(T.TimestampFormat("http-date"))).pipe(
            T.HttpHeader("x-amz-copy-source-if-unmodified-since"),
          ),
          CopySourceRange: S.optional(S.String).pipe(T.HttpHeader("x-amz-copy-source-range")),
          Key: S.String.pipe(T.HttpLabel("Key")),
          PartNumber: S.Number.pipe(T.HttpQuery("partNumber")),
          UploadId: S.String.pipe(T.HttpQuery("uploadId")),
          SSECustomerAlgorithm: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-server-side-encryption-customer-algorithm"),
          ),
          SSECustomerKey: S.optional(SensitiveString).pipe(
            T.HttpHeader("x-amz-server-side-encryption-customer-key"),
          ),
          SSECustomerKeyMD5: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-server-side-encryption-customer-key-MD5"),
          ),
          CopySourceSSECustomerAlgorithm: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-copy-source-server-side-encryption-customer-algorithm"),
          ),
          CopySourceSSECustomerKey: S.optional(SensitiveString).pipe(
            T.HttpHeader("x-amz-copy-source-server-side-encryption-customer-key"),
          ),
          CopySourceSSECustomerKeyMD5: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-copy-source-server-side-encryption-customer-key-MD5"),
          ),
          RequestPayer: S.optional(S.String).pipe(T.HttpHeader("x-amz-request-payer")),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
          ExpectedSourceBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-source-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/{Bucket}/{Key+}?x-id=UploadPartCopy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ DisableS3ExpressSessionAuth: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "UploadPartCopyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ETag: S.optional(S.String),
          LastModified: S.optional(T.DateFromString),
          ChecksumCRC32: S.optional(S.String),
          ChecksumCRC32C: S.optional(S.String),
          ChecksumCRC64NVME: S.optional(S.String),
          ChecksumSHA1: S.optional(S.String),
          ChecksumSHA256: S.optional(S.String),
          ChecksumSHA512: S.optional(S.String),
          ChecksumMD5: S.optional(S.String),
          ChecksumXXHASH64: S.optional(S.String),
          ChecksumXXHASH3: S.optional(S.String),
          ChecksumXXHASH128: S.optional(S.String),
        }),
      ).annotate({ identifier: "CopyPartResult" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          CopySourceVersionId: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-copy-source-version-id"),
          ),
          CopyPartResult: S.optional(__S(1233, __c77, 1))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "CopyPartResult" }),
          ServerSideEncryption: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-server-side-encryption"),
          ),
          SSECustomerAlgorithm: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-server-side-encryption-customer-algorithm"),
          ),
          SSECustomerKeyMD5: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-server-side-encryption-customer-key-MD5"),
          ),
          SSEKMSKeyId: S.optional(SensitiveString).pipe(
            T.HttpHeader("x-amz-server-side-encryption-aws-kms-key-id"),
          ),
          BucketKeyEnabled: S.optional(S.Boolean).pipe(
            T.HttpHeader("x-amz-server-side-encryption-bucket-key-enabled"),
          ),
          RequestCharged: S.optional(S.String).pipe(T.HttpHeader("x-amz-request-charged")),
        }).pipe(ns),
      ).annotate({ identifier: "UploadPartCopyOutput" });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RequestRoute: S.String.pipe(T.HttpHeader("x-amz-request-route"), T.HostLabel()),
          RequestToken: S.String.pipe(T.HttpHeader("x-amz-request-token")),
          Body: S.optional(T.StreamingInput).pipe(T.HttpPayload()),
          StatusCode: S.optional(S.Number).pipe(T.HttpHeader("x-amz-fwd-status")),
          ErrorCode: S.optional(S.String).pipe(T.HttpHeader("x-amz-fwd-error-code")),
          ErrorMessage: S.optional(S.String).pipe(T.HttpHeader("x-amz-fwd-error-message")),
          AcceptRanges: S.optional(S.String).pipe(T.HttpHeader("x-amz-fwd-header-accept-ranges")),
          CacheControl: S.optional(S.String).pipe(T.HttpHeader("x-amz-fwd-header-Cache-Control")),
          ContentDisposition: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-fwd-header-Content-Disposition"),
          ),
          ContentEncoding: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-fwd-header-Content-Encoding"),
          ),
          ContentLanguage: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-fwd-header-Content-Language"),
          ),
          ContentLength: S.optional(S.Number).pipe(T.HttpHeader("Content-Length")),
          ContentRange: S.optional(S.String).pipe(T.HttpHeader("x-amz-fwd-header-Content-Range")),
          ContentType: S.optional(S.String).pipe(T.HttpHeader("x-amz-fwd-header-Content-Type")),
          ChecksumCRC32: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-fwd-header-x-amz-checksum-crc32"),
          ),
          ChecksumCRC32C: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-fwd-header-x-amz-checksum-crc32c"),
          ),
          ChecksumCRC64NVME: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-fwd-header-x-amz-checksum-crc64nvme"),
          ),
          ChecksumSHA1: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-fwd-header-x-amz-checksum-sha1"),
          ),
          ChecksumSHA256: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-fwd-header-x-amz-checksum-sha256"),
          ),
          ChecksumSHA512: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-fwd-header-x-amz-checksum-sha512"),
          ),
          ChecksumMD5: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-fwd-header-x-amz-checksum-md5"),
          ),
          ChecksumXXHASH64: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-fwd-header-x-amz-checksum-xxhash64"),
          ),
          ChecksumXXHASH3: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-fwd-header-x-amz-checksum-xxhash3"),
          ),
          ChecksumXXHASH128: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-fwd-header-x-amz-checksum-xxhash128"),
          ),
          DeleteMarker: S.optional(S.Boolean).pipe(
            T.HttpHeader("x-amz-fwd-header-x-amz-delete-marker"),
          ),
          ETag: S.optional(S.String).pipe(T.HttpHeader("x-amz-fwd-header-ETag")),
          Expires: S.optional(S.String).pipe(T.HttpHeader("x-amz-fwd-header-Expires")),
          Expiration: S.optional(S.String).pipe(T.HttpHeader("x-amz-fwd-header-x-amz-expiration")),
          LastModified: S.optional(S.Date.pipe(T.TimestampFormat("http-date"))).pipe(
            T.HttpHeader("x-amz-fwd-header-Last-Modified"),
          ),
          MissingMeta: S.optional(S.Number).pipe(
            T.HttpHeader("x-amz-fwd-header-x-amz-missing-meta"),
          ),
          Metadata: S.optional(__S(1328, __c83, 0)).pipe(T.HttpPrefixHeaders("x-amz-meta-")),
          ObjectLockMode: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-fwd-header-x-amz-object-lock-mode"),
          ),
          ObjectLockLegalHoldStatus: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-fwd-header-x-amz-object-lock-legal-hold"),
          ),
          ObjectLockRetainUntilDate: S.optional(S.Date.pipe(T.TimestampFormat("http-date"))).pipe(
            T.HttpHeader("x-amz-fwd-header-x-amz-object-lock-retain-until-date"),
          ),
          PartsCount: S.optional(S.Number).pipe(
            T.HttpHeader("x-amz-fwd-header-x-amz-mp-parts-count"),
          ),
          ReplicationStatus: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-fwd-header-x-amz-replication-status"),
          ),
          RequestCharged: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-fwd-header-x-amz-request-charged"),
          ),
          Restore: S.optional(S.String).pipe(T.HttpHeader("x-amz-fwd-header-x-amz-restore")),
          ServerSideEncryption: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-fwd-header-x-amz-server-side-encryption"),
          ),
          SSECustomerAlgorithm: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-fwd-header-x-amz-server-side-encryption-customer-algorithm"),
          ),
          SSEKMSKeyId: S.optional(SensitiveString).pipe(
            T.HttpHeader("x-amz-fwd-header-x-amz-server-side-encryption-aws-kms-key-id"),
          ),
          SSECustomerKeyMD5: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-fwd-header-x-amz-server-side-encryption-customer-key-MD5"),
          ),
          StorageClass: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-fwd-header-x-amz-storage-class"),
          ),
          TagCount: S.optional(S.Number).pipe(T.HttpHeader("x-amz-fwd-header-x-amz-tagging-count")),
          VersionId: S.optional(S.String).pipe(T.HttpHeader("x-amz-fwd-header-x-amz-version-id")),
          BucketKeyEnabled: S.optional(S.Boolean).pipe(
            T.HttpHeader("x-amz-fwd-header-x-amz-server-side-encryption-bucket-key-enabled"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/WriteGetObjectResponse" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ UseObjectLambdaEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "WriteGetObjectResponseRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "WriteGetObjectResponseResponse",
      });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          Key: S.String.pipe(T.HttpLabel("Key"), T.ContextParam("Key")),
          UploadId: S.String.pipe(T.HttpQuery("uploadId")),
          RequestPayer: S.optional(S.String).pipe(T.HttpHeader("x-amz-request-payer")),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
          IfMatchInitiatedTime: S.optional(S.Date.pipe(T.TimestampFormat("http-date"))).pipe(
            T.HttpHeader("x-amz-if-match-initiated-time"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/{Bucket}/{Key+}?x-id=AbortMultipartUpload" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AbortMultipartUploadRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RequestCharged: S.optional(S.String).pipe(T.HttpHeader("x-amz-request-charged")),
        }).pipe(ns),
      ).annotate({ identifier: "AbortMultipartUploadOutput" });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          CreationDate: S.optional(T.DateFromString),
          BucketRegion: S.optional(S.String),
          BucketArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "Bucket" });
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ETag: S.optional(S.String),
          ChecksumCRC32: S.optional(S.String),
          ChecksumCRC32C: S.optional(S.String),
          ChecksumCRC64NVME: S.optional(S.String),
          ChecksumSHA1: S.optional(S.String),
          ChecksumSHA256: S.optional(S.String),
          ChecksumSHA512: S.optional(S.String),
          ChecksumMD5: S.optional(S.String),
          ChecksumXXHASH64: S.optional(S.String),
          ChecksumXXHASH3: S.optional(S.String),
          ChecksumXXHASH128: S.optional(S.String),
          PartNumber: S.optional(S.Number),
        }),
      ).annotate({ identifier: "CompletedPart" });
    case 1:
      return S.Array(__S(1296, __c81, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Parts: S.optional(__S(1297, __c81, 1)).pipe(T.XmlName("Part"), T.XmlFlattened()),
        }),
      ).annotate({ identifier: "CompletedMultipartUpload" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          Key: S.String.pipe(T.HttpLabel("Key"), T.ContextParam("Key")),
          MultipartUpload: S.optional(__S(1298, __c81, 2))
            .pipe(T.HttpPayload(), T.XmlName("CompleteMultipartUpload"))
            .annotate({ identifier: "CompletedMultipartUpload" }),
          UploadId: S.String.pipe(T.HttpQuery("uploadId")),
          ChecksumCRC32: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-crc32")),
          ChecksumCRC32C: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-crc32c")),
          ChecksumCRC64NVME: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-crc64nvme")),
          ChecksumSHA1: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-sha1")),
          ChecksumSHA256: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-sha256")),
          ChecksumSHA512: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-sha512")),
          ChecksumMD5: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-md5")),
          ChecksumXXHASH64: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-xxhash64")),
          ChecksumXXHASH3: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-xxhash3")),
          ChecksumXXHASH128: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-xxhash128")),
          ChecksumType: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-type")),
          MpuObjectSize: S.optional(S.Number).pipe(T.HttpHeader("x-amz-mp-object-size")),
          RequestPayer: S.optional(S.String).pipe(T.HttpHeader("x-amz-request-payer")),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
          IfMatch: S.optional(S.String).pipe(T.HttpHeader("If-Match")),
          IfNoneMatch: S.optional(S.String).pipe(T.HttpHeader("If-None-Match")),
          SSECustomerAlgorithm: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-server-side-encryption-customer-algorithm"),
          ),
          SSECustomerKey: S.optional(SensitiveString).pipe(
            T.HttpHeader("x-amz-server-side-encryption-customer-key"),
          ),
          SSECustomerKeyMD5: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-server-side-encryption-customer-key-MD5"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/{Bucket}/{Key+}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CompleteMultipartUploadRequest" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          Location: S.optional(S.String),
          Bucket: S.optional(S.String),
          Key: S.optional(S.String),
          Expiration: S.optional(S.String).pipe(T.HttpHeader("x-amz-expiration")),
          ETag: S.optional(S.String),
          ChecksumCRC32: S.optional(S.String),
          ChecksumCRC32C: S.optional(S.String),
          ChecksumCRC64NVME: S.optional(S.String),
          ChecksumSHA1: S.optional(S.String),
          ChecksumSHA256: S.optional(S.String),
          ChecksumSHA512: S.optional(S.String),
          ChecksumMD5: S.optional(S.String),
          ChecksumXXHASH64: S.optional(S.String),
          ChecksumXXHASH3: S.optional(S.String),
          ChecksumXXHASH128: S.optional(S.String),
          ChecksumType: S.optional(S.String),
          ServerSideEncryption: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-server-side-encryption"),
          ),
          VersionId: S.optional(S.String).pipe(T.HttpHeader("x-amz-version-id")),
          SSEKMSKeyId: S.optional(SensitiveString).pipe(
            T.HttpHeader("x-amz-server-side-encryption-aws-kms-key-id"),
          ),
          BucketKeyEnabled: S.optional(S.Boolean).pipe(
            T.HttpHeader("x-amz-server-side-encryption-bucket-key-enabled"),
          ),
          RequestCharged: S.optional(S.String).pipe(T.HttpHeader("x-amz-request-charged")),
        }).pipe(T.all(T.XmlName("CompleteMultipartUploadResult"), ns)),
      ).annotate({ identifier: "CompleteMultipartUploadOutput" });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ACL: S.optional(S.String).pipe(T.HttpHeader("x-amz-acl")),
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          CacheControl: S.optional(S.String).pipe(T.HttpHeader("Cache-Control")),
          ChecksumAlgorithm: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-algorithm")),
          ContentDisposition: S.optional(S.String).pipe(T.HttpHeader("Content-Disposition")),
          ContentEncoding: S.optional(S.String).pipe(T.HttpHeader("Content-Encoding")),
          ContentLanguage: S.optional(S.String).pipe(T.HttpHeader("Content-Language")),
          ContentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
          CopySource: S.String.pipe(
            T.HttpHeader("x-amz-copy-source"),
            T.ContextParam("CopySource"),
          ),
          CopySourceIfMatch: S.optional(S.String).pipe(T.HttpHeader("x-amz-copy-source-if-match")),
          CopySourceIfModifiedSince: S.optional(S.Date.pipe(T.TimestampFormat("http-date"))).pipe(
            T.HttpHeader("x-amz-copy-source-if-modified-since"),
          ),
          CopySourceIfNoneMatch: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-copy-source-if-none-match"),
          ),
          CopySourceIfUnmodifiedSince: S.optional(S.Date.pipe(T.TimestampFormat("http-date"))).pipe(
            T.HttpHeader("x-amz-copy-source-if-unmodified-since"),
          ),
          Expires: S.optional(S.String).pipe(T.HttpHeader("Expires")),
          GrantFullControl: S.optional(S.String).pipe(T.HttpHeader("x-amz-grant-full-control")),
          GrantRead: S.optional(S.String).pipe(T.HttpHeader("x-amz-grant-read")),
          GrantReadACP: S.optional(S.String).pipe(T.HttpHeader("x-amz-grant-read-acp")),
          GrantWriteACP: S.optional(S.String).pipe(T.HttpHeader("x-amz-grant-write-acp")),
          IfMatch: S.optional(S.String).pipe(T.HttpHeader("If-Match")),
          IfNoneMatch: S.optional(S.String).pipe(T.HttpHeader("If-None-Match")),
          Key: S.String.pipe(T.HttpLabel("Key"), T.ContextParam("Key")),
          Metadata: S.optional(__S(1328, __c83, 0)).pipe(T.HttpPrefixHeaders("x-amz-meta-")),
          MetadataDirective: S.optional(S.String).pipe(T.HttpHeader("x-amz-metadata-directive")),
          TaggingDirective: S.optional(S.String).pipe(T.HttpHeader("x-amz-tagging-directive")),
          AnnotationDirective: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-object-annotation-directive"),
          ),
          ServerSideEncryption: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-server-side-encryption"),
          ),
          StorageClass: S.optional(S.String).pipe(T.HttpHeader("x-amz-storage-class")),
          WebsiteRedirectLocation: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-website-redirect-location"),
          ),
          SSECustomerAlgorithm: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-server-side-encryption-customer-algorithm"),
          ),
          SSECustomerKey: S.optional(SensitiveString).pipe(
            T.HttpHeader("x-amz-server-side-encryption-customer-key"),
          ),
          SSECustomerKeyMD5: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-server-side-encryption-customer-key-MD5"),
          ),
          SSEKMSKeyId: S.optional(SensitiveString).pipe(
            T.HttpHeader("x-amz-server-side-encryption-aws-kms-key-id"),
          ),
          SSEKMSEncryptionContext: S.optional(SensitiveString).pipe(
            T.HttpHeader("x-amz-server-side-encryption-context"),
          ),
          BucketKeyEnabled: S.optional(S.Boolean).pipe(
            T.HttpHeader("x-amz-server-side-encryption-bucket-key-enabled"),
          ),
          CopySourceSSECustomerAlgorithm: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-copy-source-server-side-encryption-customer-algorithm"),
          ),
          CopySourceSSECustomerKey: S.optional(SensitiveString).pipe(
            T.HttpHeader("x-amz-copy-source-server-side-encryption-customer-key"),
          ),
          CopySourceSSECustomerKeyMD5: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-copy-source-server-side-encryption-customer-key-MD5"),
          ),
          RequestPayer: S.optional(S.String).pipe(T.HttpHeader("x-amz-request-payer")),
          Tagging: S.optional(S.String).pipe(T.HttpHeader("x-amz-tagging")),
          ObjectLockMode: S.optional(S.String).pipe(T.HttpHeader("x-amz-object-lock-mode")),
          ObjectLockRetainUntilDate: S.optional(S.Date.pipe(T.TimestampFormat("http-date"))).pipe(
            T.HttpHeader("x-amz-object-lock-retain-until-date"),
          ),
          ObjectLockLegalHoldStatus: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-object-lock-legal-hold"),
          ),
          ObjectLockEventHold: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-object-lock-event-hold"),
          ),
          ObjectLockEventHoldDurationDays: S.optional(S.Number).pipe(
            T.HttpHeader("x-amz-object-lock-event-hold-duration-days"),
          ),
          ObjectLockEventHoldDurationYears: S.optional(S.Number).pipe(
            T.HttpHeader("x-amz-object-lock-event-hold-duration-years"),
          ),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
          ExpectedSourceBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-source-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/{Bucket}/{Key+}?x-id=CopyObject" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ DisableS3ExpressSessionAuth: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "CopyObjectRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ETag: S.optional(S.String),
          LastModified: S.optional(T.DateFromString),
          ChecksumType: S.optional(S.String),
          ChecksumCRC32: S.optional(S.String),
          ChecksumCRC32C: S.optional(S.String),
          ChecksumCRC64NVME: S.optional(S.String),
          ChecksumSHA1: S.optional(S.String),
          ChecksumSHA256: S.optional(S.String),
          ChecksumSHA512: S.optional(S.String),
          ChecksumMD5: S.optional(S.String),
          ChecksumXXHASH64: S.optional(S.String),
          ChecksumXXHASH3: S.optional(S.String),
          ChecksumXXHASH128: S.optional(S.String),
        }),
      ).annotate({ identifier: "CopyObjectResult" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          CopyObjectResult: S.optional(__S(1313, __c82, 1))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "CopyObjectResult" }),
          Expiration: S.optional(S.String).pipe(T.HttpHeader("x-amz-expiration")),
          CopySourceVersionId: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-copy-source-version-id"),
          ),
          VersionId: S.optional(S.String).pipe(T.HttpHeader("x-amz-version-id")),
          ServerSideEncryption: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-server-side-encryption"),
          ),
          SSECustomerAlgorithm: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-server-side-encryption-customer-algorithm"),
          ),
          SSECustomerKeyMD5: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-server-side-encryption-customer-key-MD5"),
          ),
          SSEKMSKeyId: S.optional(SensitiveString).pipe(
            T.HttpHeader("x-amz-server-side-encryption-aws-kms-key-id"),
          ),
          SSEKMSEncryptionContext: S.optional(SensitiveString).pipe(
            T.HttpHeader("x-amz-server-side-encryption-context"),
          ),
          BucketKeyEnabled: S.optional(S.Boolean).pipe(
            T.HttpHeader("x-amz-server-side-encryption-bucket-key-enabled"),
          ),
          RequestCharged: S.optional(S.String).pipe(T.HttpHeader("x-amz-request-charged")),
        }).pipe(ns),
      ).annotate({ identifier: "CopyObjectOutput" });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Type: S.optional(S.String), Name: S.optional(S.String) }),
      ).annotate({ identifier: "LocationInfo" });
    case 1:
      return S.suspend(() =>
        S.Struct({ DataRedundancy: S.optional(S.String), Type: S.optional(S.String) }),
      ).annotate({ identifier: "BucketInfo" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          LocationConstraint: S.optional(S.String),
          Location: S.optional(__S(1344, __c84, 0)),
          Bucket: S.optional(__S(1345, __c84, 1)),
          Tags: S.optional(__S(1361, __c85, 1)),
        }),
      ).annotate({ identifier: "CreateBucketConfiguration" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          ACL: S.optional(S.String).pipe(T.HttpHeader("x-amz-acl")),
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          CreateBucketConfiguration: S.optional(__S(1346, __c84, 2))
            .pipe(T.HttpPayload(), T.XmlName("CreateBucketConfiguration"))
            .annotate({ identifier: "CreateBucketConfiguration" }),
          GrantFullControl: S.optional(S.String).pipe(T.HttpHeader("x-amz-grant-full-control")),
          GrantRead: S.optional(S.String).pipe(T.HttpHeader("x-amz-grant-read")),
          GrantReadACP: S.optional(S.String).pipe(T.HttpHeader("x-amz-grant-read-acp")),
          GrantWrite: S.optional(S.String).pipe(T.HttpHeader("x-amz-grant-write")),
          GrantWriteACP: S.optional(S.String).pipe(T.HttpHeader("x-amz-grant-write-acp")),
          ObjectLockEnabledForBucket: S.optional(S.Boolean).pipe(
            T.HttpHeader("x-amz-bucket-object-lock-enabled"),
          ),
          ObjectOwnership: S.optional(S.String).pipe(T.HttpHeader("x-amz-object-ownership")),
          BucketNamespace: S.optional(S.String).pipe(T.HttpHeader("x-amz-bucket-namespace")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/{Bucket}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({
              UseS3ExpressControlEndpoint: { value: true },
              DisableAccessPoints: { value: true },
            }),
          ),
        ),
      ).annotate({ identifier: "CreateBucketRequest" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          Location: S.optional(S.String).pipe(T.HttpHeader("Location")),
          BucketArn: S.optional(S.String).pipe(T.HttpHeader("x-amz-bucket-arn")),
        }).pipe(ns),
      ).annotate({ identifier: "CreateBucketOutput" });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Value: S.String })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(1360, __c85, 0)
          .pipe(/*@__PURE__*/ T.XmlName("Tag"))
          .annotate({ identifier: "Tag" }),
      );
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RecordExpiration: __S(1408, __c88, 0),
          EncryptionConfiguration: S.optional(__S(1392, __c87, 0)),
        }),
      ).annotate({ identifier: "JournalTableConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ConfigurationState: S.String,
          EncryptionConfiguration: S.optional(__S(1392, __c87, 0)),
        }),
      ).annotate({ identifier: "InventoryTableConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          ConfigurationState: S.String,
          EncryptionConfiguration: S.optional(__S(1392, __c87, 0)),
          Role: S.optional(S.String),
        }),
      ).annotate({ identifier: "AnnotationTableConfiguration" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          JournalTableConfiguration: __S(1376, __c86, 0),
          InventoryTableConfiguration: S.optional(__S(1377, __c86, 1)),
          AnnotationTableConfiguration: S.optional(__S(1378, __c86, 2)),
        }),
      ).annotate({ identifier: "MetadataConfiguration" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          ContentMD5: S.optional(S.String).pipe(T.HttpHeader("Content-MD5")),
          ChecksumAlgorithm: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-sdk-checksum-algorithm"),
          ),
          MetadataConfiguration: __S(1379, __c86, 3)
            .pipe(T.HttpPayload(), T.XmlName("MetadataConfiguration"))
            .annotate({ identifier: "MetadataConfiguration" }),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/{Bucket}?metadataConfiguration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.AwsProtocolsHttpChecksum({
              requestAlgorithmMember: "ChecksumAlgorithm",
              requestChecksumRequired: true,
            }),
            T.StaticContextParams({ UseS3ExpressControlEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "CreateBucketMetadataConfigurationRequest" });
    case 5:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "CreateBucketMetadataConfigurationResponse",
      });
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SseAlgorithm: S.String, KmsKeyArn: S.optional(S.String) }),
      ).annotate({ identifier: "MetadataTableEncryptionConfiguration" });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Expiration: S.String, Days: S.optional(S.Number) }),
      ).annotate({ identifier: "RecordExpiration" });
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ TableBucketArn: S.String, TableName: S.String })).annotate({
        identifier: "S3TablesDestination",
      });
    case 1:
      return S.suspend(() => S.Struct({ S3TablesDestination: __S(1424, __c89, 0) })).annotate({
        identifier: "MetadataTableConfiguration",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          ContentMD5: S.optional(S.String).pipe(T.HttpHeader("Content-MD5")),
          ChecksumAlgorithm: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-sdk-checksum-algorithm"),
          ),
          MetadataTableConfiguration: __S(1425, __c89, 1)
            .pipe(T.HttpPayload(), T.XmlName("MetadataTableConfiguration"))
            .annotate({ identifier: "MetadataTableConfiguration" }),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/{Bucket}?metadataTable" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.AwsProtocolsHttpChecksum({
              requestAlgorithmMember: "ChecksumAlgorithm",
              requestChecksumRequired: true,
            }),
            T.StaticContextParams({ UseS3ExpressControlEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "CreateBucketMetadataTableConfigurationRequest" });
    case 3:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "CreateBucketMetadataTableConfigurationResponse",
      });
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ACL: S.optional(S.String).pipe(T.HttpHeader("x-amz-acl")),
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          CacheControl: S.optional(S.String).pipe(T.HttpHeader("Cache-Control")),
          ContentDisposition: S.optional(S.String).pipe(T.HttpHeader("Content-Disposition")),
          ContentEncoding: S.optional(S.String).pipe(T.HttpHeader("Content-Encoding")),
          ContentLanguage: S.optional(S.String).pipe(T.HttpHeader("Content-Language")),
          ContentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
          Expires: S.optional(S.String).pipe(T.HttpHeader("Expires")),
          GrantFullControl: S.optional(S.String).pipe(T.HttpHeader("x-amz-grant-full-control")),
          GrantRead: S.optional(S.String).pipe(T.HttpHeader("x-amz-grant-read")),
          GrantReadACP: S.optional(S.String).pipe(T.HttpHeader("x-amz-grant-read-acp")),
          GrantWriteACP: S.optional(S.String).pipe(T.HttpHeader("x-amz-grant-write-acp")),
          Key: S.String.pipe(T.HttpLabel("Key"), T.ContextParam("Key")),
          Metadata: S.optional(__S(1328, __c83, 0)).pipe(T.HttpPrefixHeaders("x-amz-meta-")),
          ServerSideEncryption: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-server-side-encryption"),
          ),
          StorageClass: S.optional(S.String).pipe(T.HttpHeader("x-amz-storage-class")),
          WebsiteRedirectLocation: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-website-redirect-location"),
          ),
          SSECustomerAlgorithm: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-server-side-encryption-customer-algorithm"),
          ),
          SSECustomerKey: S.optional(SensitiveString).pipe(
            T.HttpHeader("x-amz-server-side-encryption-customer-key"),
          ),
          SSECustomerKeyMD5: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-server-side-encryption-customer-key-MD5"),
          ),
          SSEKMSKeyId: S.optional(SensitiveString).pipe(
            T.HttpHeader("x-amz-server-side-encryption-aws-kms-key-id"),
          ),
          SSEKMSEncryptionContext: S.optional(SensitiveString).pipe(
            T.HttpHeader("x-amz-server-side-encryption-context"),
          ),
          BucketKeyEnabled: S.optional(S.Boolean).pipe(
            T.HttpHeader("x-amz-server-side-encryption-bucket-key-enabled"),
          ),
          RequestPayer: S.optional(S.String).pipe(T.HttpHeader("x-amz-request-payer")),
          Tagging: S.optional(S.String).pipe(T.HttpHeader("x-amz-tagging")),
          ObjectLockMode: S.optional(S.String).pipe(T.HttpHeader("x-amz-object-lock-mode")),
          ObjectLockRetainUntilDate: S.optional(S.Date.pipe(T.TimestampFormat("http-date"))).pipe(
            T.HttpHeader("x-amz-object-lock-retain-until-date"),
          ),
          ObjectLockLegalHoldStatus: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-object-lock-legal-hold"),
          ),
          ObjectLockEventHold: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-object-lock-event-hold"),
          ),
          ObjectLockEventHoldDurationDays: S.optional(S.Number).pipe(
            T.HttpHeader("x-amz-object-lock-event-hold-duration-days"),
          ),
          ObjectLockEventHoldDurationYears: S.optional(S.Number).pipe(
            T.HttpHeader("x-amz-object-lock-event-hold-duration-years"),
          ),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
          ChecksumAlgorithm: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-algorithm")),
          ChecksumType: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-type")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/{Bucket}/{Key+}?uploads" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateMultipartUploadRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AbortDate: S.optional(S.Date.pipe(T.TimestampFormat("http-date"))).pipe(
            T.HttpHeader("x-amz-abort-date"),
          ),
          AbortRuleId: S.optional(S.String).pipe(T.HttpHeader("x-amz-abort-rule-id")),
          Bucket: S.optional(S.String).pipe(T.XmlName("Bucket")),
          Key: S.optional(S.String),
          UploadId: S.optional(S.String),
          ServerSideEncryption: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-server-side-encryption"),
          ),
          SSECustomerAlgorithm: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-server-side-encryption-customer-algorithm"),
          ),
          SSECustomerKeyMD5: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-server-side-encryption-customer-key-MD5"),
          ),
          SSEKMSKeyId: S.optional(SensitiveString).pipe(
            T.HttpHeader("x-amz-server-side-encryption-aws-kms-key-id"),
          ),
          SSEKMSEncryptionContext: S.optional(SensitiveString).pipe(
            T.HttpHeader("x-amz-server-side-encryption-context"),
          ),
          BucketKeyEnabled: S.optional(S.Boolean).pipe(
            T.HttpHeader("x-amz-server-side-encryption-bucket-key-enabled"),
          ),
          RequestCharged: S.optional(S.String).pipe(T.HttpHeader("x-amz-request-charged")),
          ChecksumAlgorithm: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-algorithm")),
          ChecksumType: S.optional(S.String).pipe(T.HttpHeader("x-amz-checksum-type")),
        }).pipe(T.all(T.XmlName("InitiateMultipartUploadResult"), ns)),
      ).annotate({ identifier: "CreateMultipartUploadOutput" });
  }
}
function __c91(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SessionMode: S.optional(S.String).pipe(T.HttpHeader("x-amz-create-session-mode")),
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          ServerSideEncryption: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-server-side-encryption"),
          ),
          SSEKMSKeyId: S.optional(SensitiveString).pipe(
            T.HttpHeader("x-amz-server-side-encryption-aws-kms-key-id"),
          ),
          SSEKMSEncryptionContext: S.optional(SensitiveString).pipe(
            T.HttpHeader("x-amz-server-side-encryption-context"),
          ),
          BucketKeyEnabled: S.optional(S.Boolean).pipe(
            T.HttpHeader("x-amz-server-side-encryption-bucket-key-enabled"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/{Bucket}?session" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ DisableS3ExpressSessionAuth: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "CreateSessionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AccessKeyId: S.String.pipe(T.XmlName("AccessKeyId")),
          SecretAccessKey: SensitiveString.pipe(T.XmlName("SecretAccessKey")),
          SessionToken: SensitiveString.pipe(T.XmlName("SessionToken")),
          Expiration: T.DateFromString.pipe(T.XmlName("Expiration")),
        }),
      ).annotate({ identifier: "SessionCredentials" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          ServerSideEncryption: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-server-side-encryption"),
          ),
          SSEKMSKeyId: S.optional(SensitiveString).pipe(
            T.HttpHeader("x-amz-server-side-encryption-aws-kms-key-id"),
          ),
          SSEKMSEncryptionContext: S.optional(SensitiveString).pipe(
            T.HttpHeader("x-amz-server-side-encryption-context"),
          ),
          BucketKeyEnabled: S.optional(S.Boolean).pipe(
            T.HttpHeader("x-amz-server-side-encryption-bucket-key-enabled"),
          ),
          Credentials: __S(1457, __c91, 1)
            .pipe(T.XmlName("Credentials"))
            .annotate({ identifier: "SessionCredentials" }),
        }).pipe(T.all(T.XmlName("CreateSessionResult"), ns)),
      ).annotate({ identifier: "CreateSessionOutput" });
  }
}
function __c92(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/{Bucket}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ UseS3ExpressControlEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "DeleteBucketRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteBucketResponse",
      });
  }
}
function __c93(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          Id: S.String.pipe(T.HttpQuery("id")),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/{Bucket}?analytics" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ UseS3ExpressControlEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "DeleteBucketAnalyticsConfigurationRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteBucketAnalyticsConfigurationResponse",
      });
  }
}
function __c94(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/{Bucket}?cors" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ UseS3ExpressControlEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "DeleteBucketCorsRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteBucketCorsResponse",
      });
  }
}
function __c95(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/{Bucket}?encryption" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ UseS3ExpressControlEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "DeleteBucketEncryptionRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteBucketEncryptionResponse",
      });
  }
}
function __c96(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          Id: S.String.pipe(T.HttpQuery("id")),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/{Bucket}?intelligent-tiering" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ UseS3ExpressControlEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "DeleteBucketIntelligentTieringConfigurationRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteBucketIntelligentTieringConfigurationResponse",
      });
  }
}
function __c97(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          Id: S.String.pipe(T.HttpQuery("id")),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/{Bucket}?inventory" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ UseS3ExpressControlEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "DeleteBucketInventoryConfigurationRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteBucketInventoryConfigurationResponse",
      });
  }
}
function __c98(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/{Bucket}?lifecycle" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ UseS3ExpressControlEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "DeleteBucketLifecycleRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteBucketLifecycleResponse",
      });
  }
}
function __c99(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/{Bucket}?metadataConfiguration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ UseS3ExpressControlEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "DeleteBucketMetadataConfigurationRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteBucketMetadataConfigurationResponse",
      });
  }
}
function __c100(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/{Bucket}?metadataTable" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ UseS3ExpressControlEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "DeleteBucketMetadataTableConfigurationRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteBucketMetadataTableConfigurationResponse",
      });
  }
}
function __c101(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          Id: S.String.pipe(T.HttpQuery("id")),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/{Bucket}?metrics" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ UseS3ExpressControlEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "DeleteBucketMetricsConfigurationRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteBucketMetricsConfigurationResponse",
      });
  }
}
function __c102(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/{Bucket}?ownershipControls" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ UseS3ExpressControlEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "DeleteBucketOwnershipControlsRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteBucketOwnershipControlsResponse",
      });
  }
}
function __c103(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/{Bucket}?policy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ UseS3ExpressControlEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "DeleteBucketPolicyRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteBucketPolicyResponse",
      });
  }
}
function __c104(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/{Bucket}?replication" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ UseS3ExpressControlEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "DeleteBucketReplicationRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteBucketReplicationResponse",
      });
  }
}
function __c105(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/{Bucket}?tagging" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ UseS3ExpressControlEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "DeleteBucketTaggingRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteBucketTaggingResponse",
      });
  }
}
function __c106(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/{Bucket}?website" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ UseS3ExpressControlEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "DeleteBucketWebsiteRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteBucketWebsiteResponse",
      });
  }
}
function __c107(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          Key: S.String.pipe(T.HttpLabel("Key"), T.ContextParam("Key")),
          MFA: S.optional(S.String).pipe(T.HttpHeader("x-amz-mfa")),
          VersionId: S.optional(S.String).pipe(T.HttpQuery("versionId")),
          RequestPayer: S.optional(S.String).pipe(T.HttpHeader("x-amz-request-payer")),
          BypassGovernanceRetention: S.optional(S.Boolean).pipe(
            T.HttpHeader("x-amz-bypass-governance-retention"),
          ),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
          IfMatch: S.optional(S.String).pipe(T.HttpHeader("If-Match")),
          IfMatchLastModifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("http-date"))).pipe(
            T.HttpHeader("x-amz-if-match-last-modified-time"),
          ),
          IfMatchSize: S.optional(S.Number).pipe(T.HttpHeader("x-amz-if-match-size")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/{Bucket}/{Key+}?x-id=DeleteObject" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteObjectRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          DeleteMarker: S.optional(S.Boolean).pipe(T.HttpHeader("x-amz-delete-marker")),
          VersionId: S.optional(S.String).pipe(T.HttpHeader("x-amz-version-id")),
          RequestCharged: S.optional(S.String).pipe(T.HttpHeader("x-amz-request-charged")),
        }).pipe(ns),
      ).annotate({ identifier: "DeleteObjectOutput" });
  }
}
function __c108(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          Key: S.String.pipe(T.HttpLabel("Key")),
          AnnotationName: S.String.pipe(T.HttpQuery("annotationName")),
          VersionId: S.optional(S.String).pipe(T.HttpQuery("versionId")),
          RequestPayer: S.optional(S.String).pipe(T.HttpHeader("x-amz-request-payer")),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
          ObjectIfMatch: S.optional(S.String).pipe(T.HttpHeader("x-amz-object-if-match")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/{Bucket}/{Key+}?annotation" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteObjectAnnotationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ObjectVersionId: S.optional(S.String).pipe(T.HttpHeader("x-amz-object-version-id")),
          RequestCharged: S.optional(S.String).pipe(T.HttpHeader("x-amz-request-charged")),
        }).pipe(ns),
      ).annotate({ identifier: "DeleteObjectAnnotationOutput" });
  }
}
function __c109(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Key: S.String,
          VersionId: S.optional(S.String),
          ETag: S.optional(S.String),
          LastModifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("http-date"))),
          Size: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ObjectIdentifier" });
    case 1:
      return S.Array(__S(1744, __c109, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Objects: __S(1745, __c109, 1).pipe(T.XmlName("Object"), T.XmlFlattened()),
          Quiet: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "Delete" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          Delete: __S(1746, __c109, 2)
            .pipe(T.HttpPayload(), T.XmlName("Delete"))
            .annotate({ identifier: "Delete" }),
          MFA: S.optional(S.String).pipe(T.HttpHeader("x-amz-mfa")),
          RequestPayer: S.optional(S.String).pipe(T.HttpHeader("x-amz-request-payer")),
          BypassGovernanceRetention: S.optional(S.Boolean).pipe(
            T.HttpHeader("x-amz-bypass-governance-retention"),
          ),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
          ChecksumAlgorithm: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-sdk-checksum-algorithm"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/{Bucket}?delete" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.AwsProtocolsHttpChecksum({
              requestAlgorithmMember: "ChecksumAlgorithm",
              requestChecksumRequired: true,
            }),
          ),
        ),
      ).annotate({ identifier: "DeleteObjectsRequest" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          Key: S.optional(S.String),
          VersionId: S.optional(S.String),
          DeleteMarker: S.optional(S.Boolean),
          DeleteMarkerVersionId: S.optional(S.String),
        }),
      ).annotate({ identifier: "DeletedObject" });
    case 5:
      return S.Array(__S(1748, __c109, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          Key: S.optional(S.String),
          VersionId: S.optional(S.String),
          Code: S.optional(S.String),
          Message: S.optional(S.String),
        }),
      ).annotate({ identifier: "Error" });
    case 7:
      return S.Array(__S(1750, __c109, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          Deleted: S.optional(__S(1749, __c109, 5)).pipe(T.XmlFlattened()),
          RequestCharged: S.optional(S.String).pipe(T.HttpHeader("x-amz-request-charged")),
          Errors: S.optional(__S(1751, __c109, 7)).pipe(T.XmlName("Error"), T.XmlFlattened()),
        }).pipe(T.all(T.XmlName("DeleteResult"), ns)),
      ).annotate({ identifier: "DeleteObjectsOutput" });
  }
}
function __c110(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          Key: S.String.pipe(T.HttpLabel("Key")),
          VersionId: S.optional(S.String).pipe(T.HttpQuery("versionId")),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/{Bucket}/{Key+}?tagging" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteObjectTaggingRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ VersionId: S.optional(S.String).pipe(T.HttpHeader("x-amz-version-id")) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "DeleteObjectTaggingOutput" });
  }
}
function __c111(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/{Bucket}?publicAccessBlock" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ UseS3ExpressControlEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "DeletePublicAccessBlockRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeletePublicAccessBlockResponse",
      });
  }
}
function __c112(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(ns, T.Http({ method: "GET", uri: "/{Bucket}?abac" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetBucketAbacRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AbacStatus: S.optional(__S(1808, __c113, 0))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "AbacStatus" }),
        }).pipe(ns),
      ).annotate({ identifier: "GetBucketAbacOutput" });
  }
}
function __c113(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Status: S.optional(S.String) })).annotate({
        identifier: "AbacStatus",
      });
  }
}
function __c114(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
          RequestPayer: S.optional(S.String).pipe(T.HttpHeader("x-amz-request-payer")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/{Bucket}?accelerate" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ UseS3ExpressControlEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "GetBucketAccelerateConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Status: S.optional(S.String),
          RequestCharged: S.optional(S.String).pipe(T.HttpHeader("x-amz-request-charged")),
        }).pipe(T.all(T.XmlName("AccelerateConfiguration"), ns)),
      ).annotate({ identifier: "GetBucketAccelerateConfigurationOutput" });
  }
}
function __c115(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/{Bucket}?acl" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ UseS3ExpressControlEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "GetBucketAclRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Owner: S.optional(__S(1856, __c116, 0)),
          Grants: S.optional(__S(1873, __c117, 1)).pipe(T.XmlName("AccessControlList")),
        }).pipe(T.all(T.XmlName("AccessControlPolicy"), ns)),
      ).annotate({ identifier: "GetBucketAclOutput" });
  }
}
function __c116(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ DisplayName: S.optional(S.String), ID: S.optional(S.String) }),
      ).annotate({ identifier: "Owner" });
  }
}
function __c117(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Grantee: S.optional(__S(1888, __c118, 0)), Permission: S.optional(S.String) }),
      ).annotate({ identifier: "Grant" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(1872, __c117, 0)
          .pipe(/*@__PURE__*/ T.XmlName("Grant"))
          .annotate({ identifier: "Grant" }),
      );
  }
}
function __c118(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          DisplayName: S.optional(S.String),
          EmailAddress: S.optional(S.String),
          ID: S.optional(S.String),
          URI: S.optional(S.String),
          Type: S.String.pipe(T.XmlName("xsi:type"), T.XmlAttribute()),
        }),
      ).annotate({ identifier: "Grantee" });
  }
}
function __c119(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          Id: S.String.pipe(T.HttpQuery("id")),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({
              method: "GET",
              uri: "/{Bucket}?analytics&x-id=GetBucketAnalyticsConfiguration",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ UseS3ExpressControlEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "GetBucketAnalyticsConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AnalyticsConfiguration: S.optional(__S(1926, __c120, 6))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "AnalyticsConfiguration" }),
        }).pipe(ns),
      ).annotate({ identifier: "GetBucketAnalyticsConfigurationOutput" });
  }
}
function __c120(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Prefix: S.optional(S.String),
          Tags: S.optional(__S(1361, __c85, 1)).pipe(T.XmlName("Tag"), T.XmlFlattened()),
        }),
      ).annotate({ identifier: "AnalyticsAndOperator" });
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ Prefix: S.String }),
        /*@__PURE__*/ S.Struct({ Tag: __S(1360, __c85, 0) }),
        /*@__PURE__*/ S.Struct({ And: __S(1920, __c120, 0) }),
      ]);
    case 2:
      return S.suspend(() =>
        S.Struct({
          Format: S.String,
          BucketAccountId: S.optional(S.String),
          Bucket: S.String,
          Prefix: S.optional(S.String),
        }),
      ).annotate({ identifier: "AnalyticsS3BucketDestination" });
    case 3:
      return S.suspend(() => S.Struct({ S3BucketDestination: __S(1922, __c120, 2) })).annotate({
        identifier: "AnalyticsExportDestination",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({ OutputSchemaVersion: S.String, Destination: __S(1923, __c120, 3) }),
      ).annotate({ identifier: "StorageClassAnalysisDataExport" });
    case 5:
      return S.suspend(() => S.Struct({ DataExport: S.optional(__S(1924, __c120, 4)) })).annotate({
        identifier: "StorageClassAnalysis",
      });
    case 6:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          Filter: S.optional(__S(1921, __c120, 1)),
          StorageClassAnalysis: __S(1925, __c120, 5),
        }),
      ).annotate({ identifier: "AnalyticsConfiguration" });
  }
}
function __c121(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/{Bucket}?cors" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ UseS3ExpressControlEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "GetBucketCorsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CORSRules: S.optional(__S(1957, __c122, 5)).pipe(T.XmlName("CORSRule"), T.XmlFlattened()),
        }).pipe(T.all(T.XmlName("CORSConfiguration"), ns)),
      ).annotate({ identifier: "GetBucketCorsOutput" });
  }
}
function __c122(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.Array(S.String);
    case 2:
      return S.Array(S.String);
    case 3:
      return S.Array(S.String);
    case 4:
      return S.suspend(() =>
        S.Struct({
          ID: S.optional(S.String),
          AllowedHeaders: S.optional(__S(1952, __c122, 0)).pipe(
            T.XmlName("AllowedHeader"),
            T.XmlFlattened(),
          ),
          AllowedMethods: __S(1953, __c122, 1).pipe(T.XmlName("AllowedMethod"), T.XmlFlattened()),
          AllowedOrigins: __S(1954, __c122, 2).pipe(T.XmlName("AllowedOrigin"), T.XmlFlattened()),
          ExposeHeaders: S.optional(__S(1955, __c122, 3)).pipe(
            T.XmlName("ExposeHeader"),
            T.XmlFlattened(),
          ),
          MaxAgeSeconds: S.optional(S.Number),
        }),
      ).annotate({ identifier: "CORSRule" });
    case 5:
      return S.Array(__S(1956, __c122, 4));
  }
}
function __c123(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/{Bucket}?encryption" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ UseS3ExpressControlEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "GetBucketEncryptionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ServerSideEncryptionConfiguration: S.optional(__S(1989, __c124, 5))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "ServerSideEncryptionConfiguration" }),
        }).pipe(ns),
      ).annotate({ identifier: "GetBucketEncryptionOutput" });
  }
}
function __c124(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SSEAlgorithm: S.String, KMSMasterKeyID: S.optional(SensitiveString) }),
      ).annotate({ identifier: "ServerSideEncryptionByDefault" });
    case 1:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("EncryptionType")));
    case 2:
      return S.suspend(() =>
        S.Struct({ EncryptionType: S.optional(__S(1985, __c124, 1)).pipe(T.XmlFlattened()) }),
      ).annotate({ identifier: "BlockedEncryptionTypes" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          ApplyServerSideEncryptionByDefault: S.optional(__S(1984, __c124, 0)),
          BucketKeyEnabled: S.optional(S.Boolean),
          BlockedEncryptionTypes: S.optional(__S(1986, __c124, 2)),
        }),
      ).annotate({ identifier: "ServerSideEncryptionRule" });
    case 4:
      return S.Array(__S(1987, __c124, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ Rules: __S(1988, __c124, 4).pipe(T.XmlName("Rule"), T.XmlFlattened()) }),
      ).annotate({ identifier: "ServerSideEncryptionConfiguration" });
  }
}
function __c125(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          Id: S.String.pipe(T.HttpQuery("id")),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({
              method: "GET",
              uri: "/{Bucket}?intelligent-tiering&x-id=GetBucketIntelligentTieringConfiguration",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ UseS3ExpressControlEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "GetBucketIntelligentTieringConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          IntelligentTieringConfiguration: S.optional(__S(2020, __c126, 4))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "IntelligentTieringConfiguration" }),
        }).pipe(ns),
      ).annotate({ identifier: "GetBucketIntelligentTieringConfigurationOutput" });
  }
}
function __c126(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Prefix: S.optional(S.String),
          Tags: S.optional(__S(1361, __c85, 1)).pipe(T.XmlName("Tag"), T.XmlFlattened()),
        }),
      ).annotate({ identifier: "IntelligentTieringAndOperator" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Prefix: S.optional(S.String),
          Tag: S.optional(__S(1360, __c85, 0)),
          And: S.optional(__S(2016, __c126, 0)),
        }),
      ).annotate({ identifier: "IntelligentTieringFilter" });
    case 2:
      return S.suspend(() => S.Struct({ Days: S.Number, AccessTier: S.String })).annotate({
        identifier: "Tiering",
      });
    case 3:
      return S.Array(__S(2018, __c126, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          Filter: S.optional(__S(2017, __c126, 1)),
          Status: S.String,
          Tierings: __S(2019, __c126, 3).pipe(T.XmlName("Tiering"), T.XmlFlattened()),
        }),
      ).annotate({ identifier: "IntelligentTieringConfiguration" });
  }
}
function __c127(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          Id: S.String.pipe(T.HttpQuery("id")),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({
              method: "GET",
              uri: "/{Bucket}?inventory&x-id=GetBucketInventoryConfiguration",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ UseS3ExpressControlEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "GetBucketInventoryConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          InventoryConfiguration: S.optional(__S(2056, __c128, 8))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "InventoryConfiguration" }),
        }).pipe(ns),
      ).annotate({ identifier: "GetBucketInventoryConfigurationOutput" });
  }
}
function __c128(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({}).pipe(T.XmlName("SSE-S3"))).annotate({
        identifier: "SSES3",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ KeyId: SensitiveString }).pipe(T.XmlName("SSE-KMS")),
      ).annotate({ identifier: "SSEKMS" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          SSES3: S.optional(__S(2048, __c128, 0))
            .pipe(T.XmlName("SSE-S3"))
            .annotate({ identifier: "SSES3" }),
          SSEKMS: S.optional(__S(2049, __c128, 1))
            .pipe(T.XmlName("SSE-KMS"))
            .annotate({ identifier: "SSEKMS" }),
        }),
      ).annotate({ identifier: "InventoryEncryption" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.optional(S.String),
          Bucket: S.String,
          Format: S.String,
          Prefix: S.optional(S.String),
          Encryption: S.optional(__S(2050, __c128, 2)),
        }),
      ).annotate({ identifier: "InventoryS3BucketDestination" });
    case 4:
      return S.suspend(() => S.Struct({ S3BucketDestination: __S(2051, __c128, 3) })).annotate({
        identifier: "InventoryDestination",
      });
    case 5:
      return S.suspend(() => S.Struct({ Prefix: S.String })).annotate({
        identifier: "InventoryFilter",
      });
    case 6:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("Field")));
    case 7:
      return S.suspend(() => S.Struct({ Frequency: S.String })).annotate({
        identifier: "InventorySchedule",
      });
    case 8:
      return S.suspend(() =>
        S.Struct({
          Destination: __S(2052, __c128, 4),
          IsEnabled: S.Boolean,
          Filter: S.optional(__S(2053, __c128, 5)),
          Id: S.String,
          IncludedObjectVersions: S.String,
          OptionalFields: S.optional(__S(2054, __c128, 6)),
          Schedule: __S(2055, __c128, 7),
        }),
      ).annotate({ identifier: "InventoryConfiguration" });
  }
}
function __c129(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/{Bucket}?lifecycle" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ UseS3ExpressControlEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "GetBucketLifecycleConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Rules: S.optional(__S(2090, __c130, 10)).pipe(T.XmlName("Rule"), T.XmlFlattened()),
          TransitionDefaultMinimumObjectSize: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-transition-default-minimum-object-size"),
          ),
        }).pipe(T.all(T.XmlName("LifecycleConfiguration"), ns)),
      ).annotate({ identifier: "GetBucketLifecycleConfigurationOutput" });
  }
}
function __c130(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Date: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Days: S.optional(S.Number),
          ExpiredObjectDeleteMarker: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "LifecycleExpiration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Prefix: S.optional(S.String),
          Tags: S.optional(__S(1361, __c85, 1)).pipe(T.XmlName("Tag"), T.XmlFlattened()),
          ObjectSizeGreaterThan: S.optional(S.Number),
          ObjectSizeLessThan: S.optional(S.Number),
        }),
      ).annotate({ identifier: "LifecycleRuleAndOperator" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Prefix: S.optional(S.String),
          Tag: S.optional(__S(1360, __c85, 0)),
          ObjectSizeGreaterThan: S.optional(S.Number),
          ObjectSizeLessThan: S.optional(S.Number),
          And: S.optional(__S(2081, __c130, 1)),
        }),
      ).annotate({ identifier: "LifecycleRuleFilter" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Date: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Days: S.optional(S.Number),
          StorageClass: S.optional(S.String),
        }),
      ).annotate({ identifier: "Transition" });
    case 4:
      return S.Array(__S(2083, __c130, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          NoncurrentDays: S.optional(S.Number),
          StorageClass: S.optional(S.String),
          NewerNoncurrentVersions: S.optional(S.Number),
        }),
      ).annotate({ identifier: "NoncurrentVersionTransition" });
    case 6:
      return S.Array(__S(2085, __c130, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          NoncurrentDays: S.optional(S.Number),
          NewerNoncurrentVersions: S.optional(S.Number),
        }),
      ).annotate({ identifier: "NoncurrentVersionExpiration" });
    case 8:
      return S.suspend(() => S.Struct({ DaysAfterInitiation: S.optional(S.Number) })).annotate({
        identifier: "AbortIncompleteMultipartUpload",
      });
    case 9:
      return S.suspend(() =>
        S.Struct({
          Expiration: S.optional(__S(2080, __c130, 0)),
          ID: S.optional(S.String),
          Prefix: S.optional(S.String),
          Filter: S.optional(__S(2082, __c130, 2)),
          Status: S.String,
          Transitions: S.optional(__S(2084, __c130, 4)).pipe(
            T.XmlName("Transition"),
            T.XmlFlattened(),
          ),
          NoncurrentVersionTransitions: S.optional(__S(2086, __c130, 6)).pipe(
            T.XmlName("NoncurrentVersionTransition"),
            T.XmlFlattened(),
          ),
          NoncurrentVersionExpiration: S.optional(__S(2087, __c130, 7)),
          AbortIncompleteMultipartUpload: S.optional(__S(2088, __c130, 8)),
        }),
      ).annotate({ identifier: "LifecycleRule" });
    case 10:
      return S.Array(__S(2089, __c130, 9));
  }
}
function __c131(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/{Bucket}?location" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ UseS3ExpressControlEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "GetBucketLocationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ LocationConstraint: S.optional(S.String) }).pipe(
          T.all(T.XmlName("LocationConstraint"), ns, T.S3UnwrappedXmlOutput()),
        ),
      ).annotate({ identifier: "GetBucketLocationOutput" });
  }
}
function __c132(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/{Bucket}?logging" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ UseS3ExpressControlEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "GetBucketLoggingRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ LoggingEnabled: S.optional(__S(2133, __c133, 5)) }).pipe(
          T.all(T.XmlName("BucketLoggingStatus"), ns),
        ),
      ).annotate({ identifier: "GetBucketLoggingOutput" });
  }
}
function __c133(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Grantee: S.optional(__S(1888, __c118, 0)), Permission: S.optional(S.String) }),
      ).annotate({ identifier: "TargetGrant" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(2128, __c133, 0)
          .pipe(/*@__PURE__*/ T.XmlName("Grant"))
          .annotate({ identifier: "TargetGrant" }),
      );
    case 2:
      return S.suspend(() => S.Struct({}).pipe(T.XmlName("SimplePrefix"))).annotate({
        identifier: "SimplePrefix",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({ PartitionDateSource: S.optional(S.String) }).pipe(
          T.XmlName("PartitionedPrefix"),
        ),
      ).annotate({ identifier: "PartitionedPrefix" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          SimplePrefix: S.optional(__S(2130, __c133, 2))
            .pipe(T.XmlName("SimplePrefix"))
            .annotate({ identifier: "SimplePrefix" }),
          PartitionedPrefix: S.optional(__S(2131, __c133, 3))
            .pipe(T.XmlName("PartitionedPrefix"))
            .annotate({ identifier: "PartitionedPrefix" }),
        }),
      ).annotate({ identifier: "TargetObjectKeyFormat" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          TargetBucket: S.String,
          TargetGrants: S.optional(__S(2129, __c133, 1)),
          TargetPrefix: S.String,
          TargetObjectKeyFormat: S.optional(__S(2132, __c133, 4)),
        }),
      ).annotate({ identifier: "LoggingEnabled" });
  }
}
function __c134(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/{Bucket}?metadataConfiguration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ UseS3ExpressControlEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "GetBucketMetadataConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TableBucketType: S.optional(S.String),
          TableBucketArn: S.optional(S.String),
          TableNamespace: S.optional(S.String),
        }),
      ).annotate({ identifier: "DestinationResult" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          TableStatus: S.String,
          Error: S.optional(__S(2160, __c135, 0)),
          TableName: S.String,
          TableArn: S.optional(S.String),
          RecordExpiration: __S(1408, __c88, 0),
        }),
      ).annotate({ identifier: "JournalTableConfigurationResult" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          ConfigurationState: S.String,
          TableStatus: S.optional(S.String),
          Error: S.optional(__S(2160, __c135, 0)),
          TableName: S.optional(S.String),
          TableArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "InventoryTableConfigurationResult" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          ConfigurationState: S.String,
          TableStatus: S.optional(S.String),
          Error: S.optional(__S(2160, __c135, 0)),
          TableName: S.optional(S.String),
          TableArn: S.optional(S.String),
          Role: S.optional(S.String),
        }),
      ).annotate({ identifier: "AnnotationTableConfigurationResult" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          DestinationResult: __S(2145, __c134, 1),
          JournalTableConfigurationResult: S.optional(__S(2146, __c134, 2)),
          InventoryTableConfigurationResult: S.optional(__S(2147, __c134, 3)),
          AnnotationTableConfigurationResult: S.optional(__S(2148, __c134, 4)),
        }),
      ).annotate({ identifier: "MetadataConfigurationResult" });
    case 6:
      return S.suspend(() =>
        S.Struct({ MetadataConfigurationResult: __S(2149, __c134, 5) }),
      ).annotate({ identifier: "GetBucketMetadataConfigurationResult" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          GetBucketMetadataConfigurationResult: S.optional(__S(2150, __c134, 6))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "GetBucketMetadataConfigurationResult" }),
        }).pipe(ns),
      ).annotate({ identifier: "GetBucketMetadataConfigurationOutput" });
  }
}
function __c135(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ErrorCode: S.optional(S.String), ErrorMessage: S.optional(S.String) }),
      ).annotate({ identifier: "ErrorDetails" });
  }
}
function __c136(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/{Bucket}?metadataTable" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ UseS3ExpressControlEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "GetBucketMetadataTableConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TableBucketArn: S.String,
          TableName: S.String,
          TableArn: S.String,
          TableNamespace: S.String,
        }),
      ).annotate({ identifier: "S3TablesDestinationResult" });
    case 2:
      return S.suspend(() =>
        S.Struct({ S3TablesDestinationResult: __S(2177, __c136, 1) }),
      ).annotate({ identifier: "MetadataTableConfigurationResult" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          MetadataTableConfigurationResult: __S(2178, __c136, 2),
          Status: S.String,
          Error: S.optional(__S(2160, __c135, 0)),
        }),
      ).annotate({ identifier: "GetBucketMetadataTableConfigurationResult" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          GetBucketMetadataTableConfigurationResult: S.optional(__S(2179, __c136, 3))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "GetBucketMetadataTableConfigurationResult" }),
        }).pipe(ns),
      ).annotate({ identifier: "GetBucketMetadataTableConfigurationOutput" });
  }
}
function __c137(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          Id: S.String.pipe(T.HttpQuery("id")),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/{Bucket}?metrics&x-id=GetBucketMetricsConfiguration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ UseS3ExpressControlEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "GetBucketMetricsConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          MetricsConfiguration: S.optional(__S(2210, __c138, 2))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "MetricsConfiguration" }),
        }).pipe(ns),
      ).annotate({ identifier: "GetBucketMetricsConfigurationOutput" });
  }
}
function __c138(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Prefix: S.optional(S.String),
          Tags: S.optional(__S(1361, __c85, 1)).pipe(T.XmlName("Tag"), T.XmlFlattened()),
          AccessPointArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "MetricsAndOperator" });
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ Prefix: S.String }),
        /*@__PURE__*/ S.Struct({ Tag: __S(1360, __c85, 0) }),
        /*@__PURE__*/ S.Struct({ AccessPointArn: S.String }),
        /*@__PURE__*/ S.Struct({ And: __S(2208, __c138, 0) }),
      ]);
    case 2:
      return S.suspend(() =>
        S.Struct({ Id: S.String, Filter: S.optional(__S(2209, __c138, 1)) }),
      ).annotate({ identifier: "MetricsConfiguration" });
  }
}
function __c139(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/{Bucket}?notification" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ UseS3ExpressControlEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "GetBucketNotificationConfigurationRequest" });
  }
}
function __c140(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), Value: S.optional(S.String) }),
      ).annotate({ identifier: "FilterRule" });
    case 2:
      return S.Array(__S(2241, __c140, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          FilterRules: S.optional(__S(2242, __c140, 2)).pipe(
            T.XmlName("FilterRule"),
            T.XmlFlattened(),
          ),
        }),
      ).annotate({ identifier: "S3KeyFilter" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          Key: S.optional(__S(2243, __c140, 3))
            .pipe(T.XmlName("S3Key"))
            .annotate({ identifier: "S3KeyFilter" }),
        }),
      ).annotate({ identifier: "NotificationConfigurationFilter" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          TopicArn: S.String.pipe(T.XmlName("Topic")),
          Events: __S(2240, __c140, 0).pipe(T.XmlName("Event"), T.XmlFlattened()),
          Filter: S.optional(__S(2244, __c140, 4)),
        }),
      ).annotate({ identifier: "TopicConfiguration" });
    case 6:
      return S.Array(__S(2245, __c140, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          QueueArn: S.String.pipe(T.XmlName("Queue")),
          Events: __S(2240, __c140, 0).pipe(T.XmlName("Event"), T.XmlFlattened()),
          Filter: S.optional(__S(2244, __c140, 4)),
        }),
      ).annotate({ identifier: "QueueConfiguration" });
    case 8:
      return S.Array(__S(2247, __c140, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          LambdaFunctionArn: S.String.pipe(T.XmlName("CloudFunction")),
          Events: __S(2240, __c140, 0).pipe(T.XmlName("Event"), T.XmlFlattened()),
          Filter: S.optional(__S(2244, __c140, 4)),
        }),
      ).annotate({ identifier: "LambdaFunctionConfiguration" });
    case 10:
      return S.Array(__S(2249, __c140, 9));
    case 11:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "EventBridgeConfiguration" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          TopicConfigurations: S.optional(__S(2246, __c140, 6)).pipe(
            T.XmlName("TopicConfiguration"),
            T.XmlFlattened(),
          ),
          QueueConfigurations: S.optional(__S(2248, __c140, 8)).pipe(
            T.XmlName("QueueConfiguration"),
            T.XmlFlattened(),
          ),
          LambdaFunctionConfigurations: S.optional(__S(2250, __c140, 10)).pipe(
            T.XmlName("CloudFunctionConfiguration"),
            T.XmlFlattened(),
          ),
          EventBridgeConfiguration: S.optional(__S(2251, __c140, 11)),
        }).pipe(ns),
      ).annotate({ identifier: "NotificationConfiguration" });
  }
}
function __c141(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/{Bucket}?ownershipControls" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ UseS3ExpressControlEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "GetBucketOwnershipControlsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          OwnershipControls: S.optional(__S(2274, __c142, 2))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "OwnershipControls" }),
        }).pipe(ns),
      ).annotate({ identifier: "GetBucketOwnershipControlsOutput" });
  }
}
function __c142(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ ObjectOwnership: S.String })).annotate({
        identifier: "OwnershipControlsRule",
      });
    case 1:
      return S.Array(__S(2272, __c142, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ Rules: __S(2273, __c142, 1).pipe(T.XmlName("Rule"), T.XmlFlattened()) }),
      ).annotate({ identifier: "OwnershipControls" });
  }
}
function __c143(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/{Bucket}?policy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ UseS3ExpressControlEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "GetBucketPolicyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Policy: S.optional(S.String).pipe(T.HttpPayload()) }).pipe(ns),
      ).annotate({ identifier: "GetBucketPolicyOutput" });
  }
}
function __c144(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/{Bucket}?policyStatus" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ UseS3ExpressControlEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "GetBucketPolicyStatusRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ IsPublic: S.optional(S.Boolean).pipe(T.XmlName("IsPublic")) }),
      ).annotate({ identifier: "PolicyStatus" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          PolicyStatus: S.optional(__S(2305, __c144, 1))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "PolicyStatus" }),
        }).pipe(ns),
      ).annotate({ identifier: "GetBucketPolicyStatusOutput" });
  }
}
function __c145(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/{Bucket}?replication" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ UseS3ExpressControlEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "GetBucketReplicationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ReplicationConfiguration: S.optional(__S(2351, __c146, 15))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "ReplicationConfiguration" }),
        }).pipe(ns),
      ).annotate({ identifier: "GetBucketReplicationOutput" });
  }
}
function __c146(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Prefix: S.optional(S.String),
          Tags: S.optional(__S(1361, __c85, 1)).pipe(T.XmlName("Tag"), T.XmlFlattened()),
        }),
      ).annotate({ identifier: "ReplicationRuleAndOperator" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Prefix: S.optional(S.String),
          Tag: S.optional(__S(1360, __c85, 0)),
          And: S.optional(__S(2336, __c146, 0)),
        }),
      ).annotate({ identifier: "ReplicationRuleFilter" });
    case 2:
      return S.suspend(() => S.Struct({ Status: S.String })).annotate({
        identifier: "SseKmsEncryptedObjects",
      });
    case 3:
      return S.suspend(() => S.Struct({ Status: S.String })).annotate({
        identifier: "ReplicaModifications",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({
          SseKmsEncryptedObjects: S.optional(__S(2338, __c146, 2)),
          ReplicaModifications: S.optional(__S(2339, __c146, 3)),
        }),
      ).annotate({ identifier: "SourceSelectionCriteria" });
    case 5:
      return S.suspend(() => S.Struct({ Status: S.String })).annotate({
        identifier: "ExistingObjectReplication",
      });
    case 6:
      return S.suspend(() => S.Struct({ Owner: S.String })).annotate({
        identifier: "AccessControlTranslation",
      });
    case 7:
      return S.suspend(() => S.Struct({ ReplicaKmsKeyID: S.optional(S.String) })).annotate({
        identifier: "EncryptionConfiguration",
      });
    case 8:
      return S.suspend(() => S.Struct({ Minutes: S.optional(S.Number) })).annotate({
        identifier: "ReplicationTimeValue",
      });
    case 9:
      return S.suspend(() => S.Struct({ Status: S.String, Time: __S(2344, __c146, 8) })).annotate({
        identifier: "ReplicationTime",
      });
    case 10:
      return S.suspend(() =>
        S.Struct({ Status: S.String, EventThreshold: S.optional(__S(2344, __c146, 8)) }),
      ).annotate({ identifier: "Metrics" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String,
          Account: S.optional(S.String),
          StorageClass: S.optional(S.String),
          AccessControlTranslation: S.optional(__S(2342, __c146, 6)),
          EncryptionConfiguration: S.optional(__S(2343, __c146, 7)),
          ReplicationTime: S.optional(__S(2345, __c146, 9)),
          Metrics: S.optional(__S(2346, __c146, 10)),
        }),
      ).annotate({ identifier: "Destination" });
    case 12:
      return S.suspend(() => S.Struct({ Status: S.optional(S.String) })).annotate({
        identifier: "DeleteMarkerReplication",
      });
    case 13:
      return S.suspend(() =>
        S.Struct({
          ID: S.optional(S.String),
          Priority: S.optional(S.Number),
          Prefix: S.optional(S.String),
          Filter: S.optional(__S(2337, __c146, 1)),
          Status: S.String,
          SourceSelectionCriteria: S.optional(__S(2340, __c146, 4)),
          ExistingObjectReplication: S.optional(__S(2341, __c146, 5)),
          Destination: __S(2347, __c146, 11),
          DeleteMarkerReplication: S.optional(__S(2348, __c146, 12)),
        }),
      ).annotate({ identifier: "ReplicationRule" });
    case 14:
      return S.Array(__S(2349, __c146, 13));
    case 15:
      return S.suspend(() =>
        S.Struct({
          Role: S.String,
          Rules: __S(2350, __c146, 14).pipe(T.XmlName("Rule"), T.XmlFlattened()),
        }),
      ).annotate({ identifier: "ReplicationConfiguration" });
  }
}
function __c147(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          ExpectedBucketOwner: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-expected-bucket-owner"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/{Bucket}?requestPayment" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ UseS3ExpressControlEndpoint: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "GetBucketRequestPaymentRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Payer: S.optional(S.String) }).pipe(
          T.all(T.XmlName("RequestPaymentConfiguration"), ns),
        ),
      ).annotate({ identifier: "GetBucketRequestPaymentOutput" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
