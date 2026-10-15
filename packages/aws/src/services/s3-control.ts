import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as C from "../category.ts";
import type { Credentials as Creds } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import { SensitiveString } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const ns = /*@__PURE__*/ T.XmlNamespace("http://awss3control.amazonaws.com/doc/2018-08-20/");
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "S3 Control",
  serviceShapeName: "AWSS3ControlServiceV20180820",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "s3" });
const ver = /*@__PURE__*/ T.ServiceVersion("2018-08-20");
const proto = /*@__PURE__*/ T.AwsProtocolsRestXml();
const rules = /*@__PURE__*/ T.EndpointResolver((p, _) => {
  const {
    Region,
    UseFIPS = false,
    UseDualStack = false,
    Endpoint,
    AccountId,
    RequiresAccountId,
    OutpostId,
    Bucket,
    AccessPointName,
    UseArnRegion,
    ResourceArn,
    UseS3ExpressControlEndpoint,
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
    authSchemes: [
      {
        disableDoubleEncoding: true,
        name: "sigv4",
        signingName: "s3-outposts",
        signingRegion: `${_0}`,
      },
    ],
  });
  const _p1 = (_0: unknown) => ({
    authSchemes: [
      {
        disableDoubleEncoding: true,
        name: "sigv4",
        signingName: "s3express",
        signingRegion: `${_0}`,
      },
    ],
  });
  const _p2 = (_0: unknown) => ({
    authSchemes: [
      { disableDoubleEncoding: true, name: "sigv4", signingName: "s3", signingRegion: `${_0}` },
    ],
  });
  const _p3 = (_0: unknown) => ({
    authSchemes: [
      {
        disableDoubleEncoding: true,
        name: "sigv4",
        signingName: "s3-outposts",
        signingRegion: `${_.getAttr(_0, "region")}`,
      },
    ],
  });
  if (Region != null) {
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
    if (OutpostId != null) {
      {
        const partitionResult = _.partition(Region);
        if (partitionResult != null && partitionResult !== false) {
          if (RequiresAccountId != null && RequiresAccountId === true && !(AccountId != null)) {
            return err("AccountId is required but not set");
          }
          if (AccountId != null && !_.isValidHostLabel(AccountId, false)) {
            return err("AccountId must only contain a-z, A-Z, 0-9 and `-`.");
          }
          if (!_.isValidHostLabel(OutpostId, false)) {
            return err("OutpostId must only contain a-z, A-Z, 0-9 and `-`.");
          }
          if (Endpoint != null && UseDualStack === true) {
            return err("Invalid Configuration: DualStack and custom endpoint are not supported");
          }
          if (_.isValidHostLabel(Region, true)) {
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
                `https://s3-outposts-fips.${Region}.${_.getAttr(partitionResult, "dualStackDnsSuffix")}`,
                _p0(Region),
                {},
              );
            }
            if (UseFIPS === true) {
              return e(
                `https://s3-outposts-fips.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                _p0(Region),
                {},
              );
            }
            if (UseDualStack === true) {
              return e(
                `https://s3-outposts.${Region}.${_.getAttr(partitionResult, "dualStackDnsSuffix")}`,
                _p0(Region),
                {},
              );
            }
            return e(
              `https://s3-outposts.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
              _p0(Region),
              {},
            );
          }
          return err("Invalid region: region was not a valid DNS name.");
        }
      }
    }
    {
      const resourceArn = _.parseArn(ResourceArn);
      if (
        ResourceArn != null &&
        resourceArn != null &&
        resourceArn !== false &&
        _.getAttr(resourceArn, "service") === "s3express"
      ) {
        {
          const partitionResult = _.partition(Region);
          if (partitionResult != null && partitionResult !== false) {
            {
              const arnPartition = _.partition(_.getAttr(resourceArn, "region"));
              if (arnPartition != null && arnPartition !== false) {
                if (_.getAttr(arnPartition, "name") === _.getAttr(partitionResult, "name")) {
                  if (
                    UseArnRegion != null &&
                    UseArnRegion === false &&
                    !(_.getAttr(resourceArn, "region") === `${Region}`)
                  ) {
                    return err(
                      `Invalid configuration: region from ARN \`${_.getAttr(resourceArn, "region")}\` does not match client region \`${Region}\` and UseArnRegion is \`false\``,
                    );
                  }
                  if (Endpoint != null && UseDualStack === true) {
                    return err(
                      "Invalid Configuration: DualStack and custom endpoint are not supported",
                    );
                  }
                  if (UseDualStack === true) {
                    return err("S3Express does not support Dual-stack.");
                  }
                  {
                    const url = _.parseURL(Endpoint);
                    if (Endpoint != null && url != null && url !== false) {
                      return e(
                        `${_.getAttr(url, "scheme")}://${_.getAttr(url, "authority")}`,
                        _p1(Region),
                        {},
                      );
                    }
                  }
                  if (UseFIPS === true) {
                    return e(
                      `https://s3express-control-fips.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                      _p1(Region),
                      {},
                    );
                  }
                  return e(
                    `https://s3express-control.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                    _p1(Region),
                    {},
                  );
                }
                return err(
                  `Client was configured for partition \`${_.getAttr(partitionResult, "name")}\` but ARN has \`${_.getAttr(arnPartition, "name")}\``,
                );
              }
            }
          }
        }
      }
    }
    {
      const accessPointSuffix = _.substring(AccessPointName, 0, 7, true);
      if (
        AccessPointName != null &&
        accessPointSuffix != null &&
        accessPointSuffix !== false &&
        accessPointSuffix === "--xa-s3"
      ) {
        {
          const partitionResult = _.partition(Region);
          if (partitionResult != null && partitionResult !== false) {
            if (Endpoint != null && UseDualStack === true) {
              return err("Invalid Configuration: DualStack and custom endpoint are not supported");
            }
            if (UseDualStack === true) {
              return err("S3Express does not support Dual-stack.");
            }
            {
              const url = _.parseURL(Endpoint);
              if (Endpoint != null && url != null && url !== false) {
                return e(
                  `${_.getAttr(url, "scheme")}://${_.getAttr(url, "authority")}`,
                  _p1(Region),
                  {},
                );
              }
            }
            {
              const s3expressAvailabilityZoneId = _.substring(AccessPointName, 7, 15, true);
              const s3expressAvailabilityZoneDelim = _.substring(AccessPointName, 15, 17, true);
              if (
                s3expressAvailabilityZoneId != null &&
                s3expressAvailabilityZoneId !== false &&
                s3expressAvailabilityZoneDelim != null &&
                s3expressAvailabilityZoneDelim !== false &&
                s3expressAvailabilityZoneDelim === "--"
              ) {
                if (UseFIPS === true) {
                  return e(
                    `https://s3express-control-fips.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                    _p1(Region),
                    {},
                  );
                }
                return e(
                  `https://s3express-control.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                  _p1(Region),
                  {},
                );
              }
            }
            {
              const s3expressAvailabilityZoneId = _.substring(AccessPointName, 7, 16, true);
              const s3expressAvailabilityZoneDelim = _.substring(AccessPointName, 16, 18, true);
              if (
                s3expressAvailabilityZoneId != null &&
                s3expressAvailabilityZoneId !== false &&
                s3expressAvailabilityZoneDelim != null &&
                s3expressAvailabilityZoneDelim !== false &&
                s3expressAvailabilityZoneDelim === "--"
              ) {
                if (UseFIPS === true) {
                  return e(
                    `https://s3express-control-fips.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                    _p1(Region),
                    {},
                  );
                }
                return e(
                  `https://s3express-control.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                  _p1(Region),
                  {},
                );
              }
            }
            {
              const s3expressAvailabilityZoneId = _.substring(AccessPointName, 7, 20, true);
              const s3expressAvailabilityZoneDelim = _.substring(AccessPointName, 20, 22, true);
              if (
                s3expressAvailabilityZoneId != null &&
                s3expressAvailabilityZoneId !== false &&
                s3expressAvailabilityZoneDelim != null &&
                s3expressAvailabilityZoneDelim !== false &&
                s3expressAvailabilityZoneDelim === "--"
              ) {
                if (UseFIPS === true) {
                  return e(
                    `https://s3express-control-fips.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                    _p1(Region),
                    {},
                  );
                }
                return e(
                  `https://s3express-control.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                  _p1(Region),
                  {},
                );
              }
            }
            {
              const s3expressAvailabilityZoneId = _.substring(AccessPointName, 7, 21, true);
              const s3expressAvailabilityZoneDelim = _.substring(AccessPointName, 21, 23, true);
              if (
                s3expressAvailabilityZoneId != null &&
                s3expressAvailabilityZoneId !== false &&
                s3expressAvailabilityZoneDelim != null &&
                s3expressAvailabilityZoneDelim !== false &&
                s3expressAvailabilityZoneDelim === "--"
              ) {
                if (UseFIPS === true) {
                  return e(
                    `https://s3express-control-fips.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                    _p1(Region),
                    {},
                  );
                }
                return e(
                  `https://s3express-control.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                  _p1(Region),
                  {},
                );
              }
            }
            {
              const s3expressAvailabilityZoneId = _.substring(AccessPointName, 7, 27, true);
              const s3expressAvailabilityZoneDelim = _.substring(AccessPointName, 27, 29, true);
              if (
                s3expressAvailabilityZoneId != null &&
                s3expressAvailabilityZoneId !== false &&
                s3expressAvailabilityZoneDelim != null &&
                s3expressAvailabilityZoneDelim !== false &&
                s3expressAvailabilityZoneDelim === "--"
              ) {
                if (UseFIPS === true) {
                  return e(
                    `https://s3express-control-fips.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                    _p1(Region),
                    {},
                  );
                }
                return e(
                  `https://s3express-control.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
                  _p1(Region),
                  {},
                );
              }
            }
            return err("Unrecognized S3Express Access Point name format.");
          }
        }
      }
    }
    if (UseS3ExpressControlEndpoint != null && UseS3ExpressControlEndpoint === true) {
      {
        const partitionResult = _.partition(Region);
        if (partitionResult != null && partitionResult !== false) {
          if (Endpoint != null && UseDualStack === true) {
            return err("Invalid Configuration: DualStack and custom endpoint are not supported");
          }
          if (UseDualStack === true) {
            return err("S3Express does not support Dual-stack.");
          }
          {
            const url = _.parseURL(Endpoint);
            if (Endpoint != null && url != null && url !== false) {
              return e(
                `${_.getAttr(url, "scheme")}://${_.getAttr(url, "authority")}`,
                _p1(Region),
                {},
              );
            }
          }
          if (UseFIPS === true) {
            return e(
              `https://s3express-control-fips.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
              _p1(Region),
              {},
            );
          }
          return e(
            `https://s3express-control.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
            _p1(Region),
            {},
          );
        }
      }
    }
    {
      const url = _.parseURL(Endpoint);
      if (Region === "snow" && Endpoint != null && url != null && url !== false) {
        {
          const partitionResult = _.partition(Region);
          if (partitionResult != null && partitionResult !== false) {
            if (UseDualStack === true) {
              return err("S3 Snow does not support DualStack");
            }
            if (UseFIPS === true) {
              return err("S3 Snow does not support FIPS");
            }
            return e(
              `${_.getAttr(url, "scheme")}://${_.getAttr(url, "authority")}`,
              _p2(Region),
              {},
            );
          }
        }
      }
    }
    {
      const accessPointArn = _.parseArn(AccessPointName);
      if (AccessPointName != null && accessPointArn != null && accessPointArn !== false) {
        {
          const arnType = _.getAttr(accessPointArn, "resourceId[0]");
          if (arnType != null && arnType !== false && !(arnType === "")) {
            if (_.getAttr(accessPointArn, "service") === "s3-outposts") {
              {
                const outpostId = _.getAttr(accessPointArn, "resourceId[1]");
                if (outpostId != null && outpostId !== false) {
                  if (_.isValidHostLabel(outpostId, false)) {
                    if (Endpoint != null && UseDualStack === true) {
                      return err(
                        "Invalid Configuration: DualStack and custom endpoint are not supported",
                      );
                    }
                    if (
                      UseArnRegion != null &&
                      UseArnRegion === false &&
                      !(_.getAttr(accessPointArn, "region") === `${Region}`)
                    ) {
                      return err(
                        `Invalid configuration: region from ARN \`${_.getAttr(accessPointArn, "region")}\` does not match client region \`${Region}\` and UseArnRegion is \`false\``,
                      );
                    }
                    {
                      const partitionResult = _.partition(Region);
                      if (partitionResult != null && partitionResult !== false) {
                        {
                          const arnPartition = _.partition(_.getAttr(accessPointArn, "region"));
                          if (arnPartition != null && arnPartition !== false) {
                            if (
                              _.getAttr(arnPartition, "name") === _.getAttr(partitionResult, "name")
                            ) {
                              if (_.isValidHostLabel(_.getAttr(accessPointArn, "region"), true)) {
                                if (!(_.getAttr(accessPointArn, "accountId") === "")) {
                                  if (
                                    _.isValidHostLabel(
                                      _.getAttr(accessPointArn, "accountId"),
                                      false,
                                    )
                                  ) {
                                    if (
                                      AccountId != null &&
                                      !(AccountId === `${_.getAttr(accessPointArn, "accountId")}`)
                                    ) {
                                      return err(
                                        `Invalid ARN: the accountId specified in the ARN (\`${_.getAttr(accessPointArn, "accountId")}\`) does not match the parameter (\`${AccountId}\`)`,
                                      );
                                    }
                                    {
                                      const outpostType = _.getAttr(
                                        accessPointArn,
                                        "resourceId[2]",
                                      );
                                      if (outpostType != null && outpostType !== false) {
                                        {
                                          const accessPointName = _.getAttr(
                                            accessPointArn,
                                            "resourceId[3]",
                                          );
                                          if (
                                            accessPointName != null &&
                                            accessPointName !== false
                                          ) {
                                            if (outpostType === "accesspoint") {
                                              if (UseFIPS === true && UseDualStack === true) {
                                                return e(
                                                  `https://s3-outposts-fips.${_.getAttr(accessPointArn, "region")}.${_.getAttr(arnPartition, "dualStackDnsSuffix")}`,
                                                  _p3(accessPointArn),
                                                  {
                                                    "x-amz-account-id": [
                                                      `${_.getAttr(accessPointArn, "accountId")}`,
                                                    ],
                                                    "x-amz-outpost-id": [`${outpostId}`],
                                                  },
                                                );
                                              }
                                              if (UseFIPS === true) {
                                                return e(
                                                  `https://s3-outposts-fips.${_.getAttr(accessPointArn, "region")}.${_.getAttr(arnPartition, "dnsSuffix")}`,
                                                  _p3(accessPointArn),
                                                  {
                                                    "x-amz-account-id": [
                                                      `${_.getAttr(accessPointArn, "accountId")}`,
                                                    ],
                                                    "x-amz-outpost-id": [`${outpostId}`],
                                                  },
                                                );
                                              }
                                              if (UseDualStack === true) {
                                                return e(
                                                  `https://s3-outposts.${_.getAttr(accessPointArn, "region")}.${_.getAttr(arnPartition, "dualStackDnsSuffix")}`,
                                                  _p3(accessPointArn),
                                                  {
                                                    "x-amz-account-id": [
                                                      `${_.getAttr(accessPointArn, "accountId")}`,
                                                    ],
                                                    "x-amz-outpost-id": [`${outpostId}`],
                                                  },
                                                );
                                              }
                                              {
                                                const url = _.parseURL(Endpoint);
                                                if (
                                                  Endpoint != null &&
                                                  url != null &&
                                                  url !== false
                                                ) {
                                                  return e(
                                                    `${_.getAttr(url, "scheme")}://${_.getAttr(url, "authority")}${_.getAttr(url, "path")}`,
                                                    _p3(accessPointArn),
                                                    {
                                                      "x-amz-account-id": [
                                                        `${_.getAttr(accessPointArn, "accountId")}`,
                                                      ],
                                                      "x-amz-outpost-id": [`${outpostId}`],
                                                    },
                                                  );
                                                }
                                              }
                                              return e(
                                                `https://s3-outposts.${_.getAttr(accessPointArn, "region")}.${_.getAttr(arnPartition, "dnsSuffix")}`,
                                                _p3(accessPointArn),
                                                {
                                                  "x-amz-account-id": [
                                                    `${_.getAttr(accessPointArn, "accountId")}`,
                                                  ],
                                                  "x-amz-outpost-id": [`${outpostId}`],
                                                },
                                              );
                                            }
                                            return err(
                                              `Expected an outpost type \`accesspoint\`, found \`${outpostType}\``,
                                            );
                                          }
                                        }
                                        return err("Invalid ARN: expected an access point name");
                                      }
                                    }
                                    return err("Invalid ARN: Expected a 4-component resource");
                                  }
                                  return err(
                                    `Invalid ARN: The account id may only contain a-z, A-Z, 0-9 and \`-\`. Found: \`${_.getAttr(accessPointArn, "accountId")}\``,
                                  );
                                }
                                return err("Invalid ARN: missing account ID");
                              }
                              return err(
                                `Invalid region in ARN: \`${_.getAttr(accessPointArn, "region")}\` (invalid DNS name)`,
                              );
                            }
                            return err(
                              `Client was configured for partition \`${_.getAttr(partitionResult, "name")}\` but ARN has \`${_.getAttr(arnPartition, "name")}\``,
                            );
                          }
                        }
                      }
                    }
                  }
                  return err(
                    `Invalid ARN: The outpost Id must only contain a-z, A-Z, 0-9 and \`-\`., found: \`${outpostId}\``,
                  );
                }
              }
              return err("Invalid ARN: The Outpost Id was not set");
            }
          }
        }
        return err("Invalid ARN: No ARN type specified");
      }
    }
    {
      const bucketArn = _.parseArn(Bucket);
      if (Bucket != null && bucketArn != null && bucketArn !== false) {
        {
          const arnType = _.getAttr(bucketArn, "resourceId[0]");
          if (arnType != null && arnType !== false && !(arnType === "")) {
            if (_.getAttr(bucketArn, "service") === "s3-outposts") {
              {
                const outpostId = _.getAttr(bucketArn, "resourceId[1]");
                if (outpostId != null && outpostId !== false) {
                  if (_.isValidHostLabel(outpostId, false)) {
                    if (Endpoint != null && UseDualStack === true) {
                      return err(
                        "Invalid Configuration: DualStack and custom endpoint are not supported",
                      );
                    }
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
                      const arnPartition = _.partition(_.getAttr(bucketArn, "region"));
                      if (arnPartition != null && arnPartition !== false) {
                        {
                          const partitionResult = _.partition(Region);
                          if (partitionResult != null && partitionResult !== false) {
                            if (
                              _.getAttr(arnPartition, "name") === _.getAttr(partitionResult, "name")
                            ) {
                              if (_.isValidHostLabel(_.getAttr(bucketArn, "region"), true)) {
                                if (!(_.getAttr(bucketArn, "accountId") === "")) {
                                  if (
                                    _.isValidHostLabel(_.getAttr(bucketArn, "accountId"), false)
                                  ) {
                                    if (
                                      AccountId != null &&
                                      !(AccountId === `${_.getAttr(bucketArn, "accountId")}`)
                                    ) {
                                      return err(
                                        `Invalid ARN: the accountId specified in the ARN (\`${_.getAttr(bucketArn, "accountId")}\`) does not match the parameter (\`${AccountId}\`)`,
                                      );
                                    }
                                    {
                                      const outpostType = _.getAttr(bucketArn, "resourceId[2]");
                                      if (outpostType != null && outpostType !== false) {
                                        {
                                          const bucketName = _.getAttr(bucketArn, "resourceId[3]");
                                          if (bucketName != null && bucketName !== false) {
                                            if (outpostType === "bucket") {
                                              if (UseFIPS === true && UseDualStack === true) {
                                                return e(
                                                  `https://s3-outposts-fips.${_.getAttr(bucketArn, "region")}.${_.getAttr(arnPartition, "dualStackDnsSuffix")}`,
                                                  _p3(bucketArn),
                                                  {
                                                    "x-amz-account-id": [
                                                      `${_.getAttr(bucketArn, "accountId")}`,
                                                    ],
                                                    "x-amz-outpost-id": [`${outpostId}`],
                                                  },
                                                );
                                              }
                                              if (UseFIPS === true) {
                                                return e(
                                                  `https://s3-outposts-fips.${_.getAttr(bucketArn, "region")}.${_.getAttr(arnPartition, "dnsSuffix")}`,
                                                  _p3(bucketArn),
                                                  {
                                                    "x-amz-account-id": [
                                                      `${_.getAttr(bucketArn, "accountId")}`,
                                                    ],
                                                    "x-amz-outpost-id": [`${outpostId}`],
                                                  },
                                                );
                                              }
                                              if (UseDualStack === true) {
                                                return e(
                                                  `https://s3-outposts.${_.getAttr(bucketArn, "region")}.${_.getAttr(arnPartition, "dualStackDnsSuffix")}`,
                                                  _p3(bucketArn),
                                                  {
                                                    "x-amz-account-id": [
                                                      `${_.getAttr(bucketArn, "accountId")}`,
                                                    ],
                                                    "x-amz-outpost-id": [`${outpostId}`],
                                                  },
                                                );
                                              }
                                              {
                                                const url = _.parseURL(Endpoint);
                                                if (
                                                  Endpoint != null &&
                                                  url != null &&
                                                  url !== false
                                                ) {
                                                  return e(
                                                    `${_.getAttr(url, "scheme")}://${_.getAttr(url, "authority")}${_.getAttr(url, "path")}`,
                                                    _p3(bucketArn),
                                                    {
                                                      "x-amz-account-id": [
                                                        `${_.getAttr(bucketArn, "accountId")}`,
                                                      ],
                                                      "x-amz-outpost-id": [`${outpostId}`],
                                                    },
                                                  );
                                                }
                                              }
                                              return e(
                                                `https://s3-outposts.${_.getAttr(bucketArn, "region")}.${_.getAttr(arnPartition, "dnsSuffix")}`,
                                                _p3(bucketArn),
                                                {
                                                  "x-amz-account-id": [
                                                    `${_.getAttr(bucketArn, "accountId")}`,
                                                  ],
                                                  "x-amz-outpost-id": [`${outpostId}`],
                                                },
                                              );
                                            }
                                            return err(
                                              `Invalid ARN: Expected an outpost type \`bucket\`, found \`${outpostType}\``,
                                            );
                                          }
                                        }
                                        return err("Invalid ARN: expected a bucket name");
                                      }
                                    }
                                    return err("Invalid ARN: Expected a 4-component resource");
                                  }
                                  return err(
                                    `Invalid ARN: The account id may only contain a-z, A-Z, 0-9 and \`-\`. Found: \`${_.getAttr(bucketArn, "accountId")}\``,
                                  );
                                }
                                return err("Invalid ARN: missing account ID");
                              }
                              return err(
                                `Invalid region in ARN: \`${_.getAttr(bucketArn, "region")}\` (invalid DNS name)`,
                              );
                            }
                            return err(
                              `Client was configured for partition \`${_.getAttr(partitionResult, "name")}\` but ARN has \`${_.getAttr(arnPartition, "name")}\``,
                            );
                          }
                        }
                      }
                    }
                  }
                  return err(
                    `Invalid ARN: The outpost Id must only contain a-z, A-Z, 0-9 and \`-\`., found: \`${outpostId}\``,
                  );
                }
              }
              return err("Invalid ARN: The Outpost Id was not set");
            }
          }
        }
        return err("Invalid ARN: No ARN type specified");
      }
    }
    {
      const partitionResult = _.partition(Region);
      if (partitionResult != null && partitionResult !== false) {
        if (_.isValidHostLabel(Region, true)) {
          if (RequiresAccountId != null && RequiresAccountId === true && !(AccountId != null)) {
            return err("AccountId is required but not set");
          }
          if (AccountId != null && !_.isValidHostLabel(AccountId, false)) {
            return err("AccountId must only contain a-z, A-Z, 0-9 and `-`.");
          }
          {
            const url = _.parseURL(Endpoint);
            if (Endpoint != null && url != null && url !== false) {
              if (UseDualStack === true) {
                return err(
                  "Invalid Configuration: DualStack and custom endpoint are not supported",
                );
              }
              if (RequiresAccountId != null && RequiresAccountId === true && AccountId != null) {
                return e(
                  `${_.getAttr(url, "scheme")}://${AccountId}.${_.getAttr(url, "authority")}${_.getAttr(url, "path")}`,
                  _p2(Region),
                  {},
                );
              }
              return e(
                `${_.getAttr(url, "scheme")}://${_.getAttr(url, "authority")}${_.getAttr(url, "path")}`,
                _p2(Region),
                {},
              );
            }
          }
          if (
            UseFIPS === true &&
            UseDualStack === true &&
            RequiresAccountId != null &&
            RequiresAccountId === true &&
            AccountId != null
          ) {
            return e(
              `https://${AccountId}.s3-control-fips.dualstack.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
              _p2(Region),
              {},
            );
          }
          if (UseFIPS === true && UseDualStack === true) {
            return e(
              `https://s3-control-fips.dualstack.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
              _p2(Region),
              {},
            );
          }
          if (
            UseFIPS === true &&
            UseDualStack === false &&
            RequiresAccountId != null &&
            RequiresAccountId === true &&
            AccountId != null
          ) {
            return e(
              `https://${AccountId}.s3-control-fips.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
              _p2(Region),
              {},
            );
          }
          if (UseFIPS === true && UseDualStack === false) {
            return e(
              `https://s3-control-fips.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
              _p2(Region),
              {},
            );
          }
          if (
            UseFIPS === false &&
            UseDualStack === true &&
            RequiresAccountId != null &&
            RequiresAccountId === true &&
            AccountId != null
          ) {
            return e(
              `https://${AccountId}.s3-control.dualstack.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
              _p2(Region),
              {},
            );
          }
          if (UseFIPS === false && UseDualStack === true) {
            return e(
              `https://s3-control.dualstack.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
              _p2(Region),
              {},
            );
          }
          if (
            UseFIPS === false &&
            UseDualStack === false &&
            RequiresAccountId != null &&
            RequiresAccountId === true &&
            AccountId != null
          ) {
            return e(
              `https://${AccountId}.s3-control.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
              _p2(Region),
              {},
            );
          }
          if (UseFIPS === false && UseDualStack === false) {
            return e(
              `https://s3-control.${Region}.${_.getAttr(partitionResult, "dnsSuffix")}`,
              _p2(Region),
              {},
            );
          }
        }
        return err("Invalid region: region was not a valid DNS name.");
      }
    }
  }
  return err("Region must be set");
}, '{"url":"https://s3-control.{R}.{D}","properties":{"authSchemes":[{"disableDoubleEncoding":true,"name":"sigv4","signingName":"s3","signingRegion":"{R}"}]},"headers":{}}');

export class AccessPointAlreadyOwnedByYou
  extends /*@__PURE__*/ S.TaggedError<AccessPointAlreadyOwnedByYou>()(
    "AccessPointAlreadyOwnedByYou",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ).pipe(C.withAlreadyExistsError) {}
export class BadRequestException
  extends /*@__PURE__*/ S.TaggedError<BadRequestException>()("BadRequestException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class BucketAlreadyExists
  extends /*@__PURE__*/ S.TaggedError<BucketAlreadyExists>()("BucketAlreadyExists", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withAlreadyExistsError) {}
export class BucketAlreadyOwnedByYou
  extends /*@__PURE__*/ S.TaggedError<BucketAlreadyOwnedByYou>()("BucketAlreadyOwnedByYou", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class IdempotencyException
  extends /*@__PURE__*/ S.TaggedError<IdempotencyException>()("IdempotencyException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InternalServiceException
  extends /*@__PURE__*/ S.TaggedError<InternalServiceException>()("InternalServiceException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidNextTokenException
  extends /*@__PURE__*/ S.TaggedError<InvalidNextTokenException>()("InvalidNextTokenException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidRequest
  extends /*@__PURE__*/ S.TaggedError<InvalidRequest>()("InvalidRequest", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withBadRequestError) {}
export class InvalidRequestException
  extends /*@__PURE__*/ S.TaggedError<InvalidRequestException>()("InvalidRequestException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class JobStatusException
  extends /*@__PURE__*/ S.TaggedError<JobStatusException>()("JobStatusException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class JobStatusTransitionForbidden
  extends /*@__PURE__*/ S.TaggedError<JobStatusTransitionForbidden>()(
    "JobStatusTransitionForbidden",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.SyntheticError({
      from: "InvalidRequest",
      message: { includes: "job status forbidden" },
    }),
  ).pipe(C.withBadRequestError) {}
export class MalformedPolicy
  extends /*@__PURE__*/ S.TaggedError<MalformedPolicy>()("MalformedPolicy", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withBadRequestError) {}
export class MissingBucketLevelActivityMetrics
  extends /*@__PURE__*/ S.TaggedError<MissingBucketLevelActivityMetrics>()(
    "MissingBucketLevelActivityMetrics",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ).pipe(C.withBadRequestError) {}
export class NoSuchAccessPoint
  extends /*@__PURE__*/ S.TaggedError<NoSuchAccessPoint>()("NoSuchAccessPoint", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withNotFoundError) {}
export class NoSuchAccessPointPolicy
  extends /*@__PURE__*/ S.TaggedError<NoSuchAccessPointPolicy>()("NoSuchAccessPointPolicy", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withNotFoundError) {}
export class NoSuchConfiguration
  extends /*@__PURE__*/ S.TaggedError<NoSuchConfiguration>()("NoSuchConfiguration", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withNotFoundError) {}
export class NoSuchMultiRegionAccessPoint
  extends /*@__PURE__*/ S.TaggedError<NoSuchMultiRegionAccessPoint>()(
    "NoSuchMultiRegionAccessPoint",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ).pipe(C.withNotFoundError) {}
export class NoSuchPublicAccessBlockConfiguration
  extends /*@__PURE__*/ S.TaggedError<NoSuchPublicAccessBlockConfiguration>()(
    "NoSuchPublicAccessBlockConfiguration",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class NotFoundException
  extends /*@__PURE__*/ S.TaggedError<NotFoundException>()("NotFoundException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class ObjectLambdaNotAvailable
  extends /*@__PURE__*/ S.TaggedError<ObjectLambdaNotAvailable>()(
    "ObjectLambdaNotAvailable",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.SyntheticError({
      from: "AccessDenied",
      message: { includes: "Object Lambda is available only to existing customers" },
    }),
  ).pipe(C.withAuthError) {}
export class TooManyRequestsException
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestsException>()("TooManyRequestsException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class TooManyTagsException
  extends /*@__PURE__*/ S.TaggedError<TooManyTagsException>()("TooManyTagsException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export type AccountId = string;
export type IdentityCenterArn = string;
export interface AssociateAccessGrantsIdentityCenterRequest {
  AccountId: string;
  IdentityCenterArn: string;
}
export interface AssociateAccessGrantsIdentityCenterResponse {}
export type AccessGrantsLocationId = string;
export type S3Prefix = string;
export interface AccessGrantsLocationConfiguration {
  S3SubPrefix?: string;
}
export type GranteeType = "DIRECTORY_USER" | "DIRECTORY_GROUP" | "IAM" | (string & {});
export type GranteeIdentifier = string;
export interface Grantee {
  GranteeType?: GranteeType;
  GranteeIdentifier?: string;
}
export type Permission = "READ" | "WRITE" | "READWRITE" | (string & {});
export type IdentityCenterApplicationArn = string;
export type S3PrefixType = "Object" | (string & {});
export type TagKeyString = string;
export type TagValueString = string;
export interface Tag {
  Key: string;
  Value: string;
}
export type TagList = Tag[];
export interface CreateAccessGrantRequest {
  AccountId: string;
  AccessGrantsLocationId: string;
  AccessGrantsLocationConfiguration?: AccessGrantsLocationConfiguration;
  Grantee: Grantee;
  Permission: Permission;
  ApplicationArn?: string;
  S3PrefixType?: S3PrefixType;
  Tags?: Tag[];
}
export type CreationTimestamp = Date;
export type AccessGrantId = string;
export type AccessGrantArn = string;
export interface CreateAccessGrantResult {
  CreatedAt?: Date;
  AccessGrantId?: string;
  AccessGrantArn?: string;
  Grantee?: Grantee;
  AccessGrantsLocationId?: string;
  AccessGrantsLocationConfiguration?: AccessGrantsLocationConfiguration;
  Permission?: Permission;
  ApplicationArn?: string;
  GrantScope?: string;
}
export interface CreateAccessGrantsInstanceRequest {
  AccountId: string;
  IdentityCenterArn?: string;
  Tags?: Tag[];
}
export type AccessGrantsInstanceId = string;
export type AccessGrantsInstanceArn = string;
export interface CreateAccessGrantsInstanceResult {
  CreatedAt?: Date;
  AccessGrantsInstanceId?: string;
  AccessGrantsInstanceArn?: string;
  IdentityCenterArn?: string;
  IdentityCenterInstanceArn?: string;
  IdentityCenterApplicationArn?: string;
}
export type IAMRoleArn = string;
export interface CreateAccessGrantsLocationRequest {
  AccountId: string;
  LocationScope: string;
  IAMRoleArn: string;
  Tags?: Tag[];
}
export type AccessGrantsLocationArn = string;
export interface CreateAccessGrantsLocationResult {
  CreatedAt?: Date;
  AccessGrantsLocationId?: string;
  AccessGrantsLocationArn?: string;
  LocationScope?: string;
  IAMRoleArn?: string;
}
export type AccessPointName = string;
export type BucketName = string;
export type VpcId = string;
export interface VpcConfiguration {
  VpcId: string;
}
export type Setting = boolean;
export interface PublicAccessBlockConfiguration {
  BlockPublicAcls?: boolean;
  IgnorePublicAcls?: boolean;
  BlockPublicPolicy?: boolean;
  RestrictPublicBuckets?: boolean;
}
export type Prefix = string;
export type PrefixesList = string[];
export type ScopePermission =
  | "GetObject"
  | "GetObjectAttributes"
  | "ListMultipartUploadParts"
  | "ListBucket"
  | "ListBucketMultipartUploads"
  | "PutObject"
  | "DeleteObject"
  | "AbortMultipartUpload"
  | (string & {});
export type ScopePermissionList = ScopePermission[];
export interface Scope {
  Prefixes?: string[];
  Permissions?: ScopePermission[];
}
export interface CreateAccessPointRequest {
  AccountId: string;
  Name: string;
  Bucket: string;
  VpcConfiguration?: VpcConfiguration;
  PublicAccessBlockConfiguration?: PublicAccessBlockConfiguration;
  BucketAccountId?: string;
  Scope?: Scope;
  Tags?: Tag[];
}
export type S3AccessPointArn = string;
export type Alias = string;
export interface CreateAccessPointResult {
  AccessPointArn?: string;
  Alias?: string;
}
export type ObjectLambdaAccessPointName = string;
export type ObjectLambdaSupportingAccessPointArn = string;
export type ObjectLambdaAllowedFeature =
  | "GetObject-Range"
  | "GetObject-PartNumber"
  | "HeadObject-Range"
  | "HeadObject-PartNumber"
  | (string & {});
export type ObjectLambdaAllowedFeaturesList = ObjectLambdaAllowedFeature[];
export type ObjectLambdaTransformationConfigurationAction =
  | "GetObject"
  | "HeadObject"
  | "ListObjects"
  | "ListObjectsV2"
  | (string & {});
export type ObjectLambdaTransformationConfigurationActionsList =
  ObjectLambdaTransformationConfigurationAction[];
export type FunctionArnString = string;
export type AwsLambdaTransformationPayload = string;
export interface AwsLambdaTransformation {
  FunctionArn: string;
  FunctionPayload?: string;
}
export type ObjectLambdaContentTransformation = { AwsLambda: AwsLambdaTransformation };
export interface ObjectLambdaTransformationConfiguration {
  Actions: ObjectLambdaTransformationConfigurationAction[];
  ContentTransformation: ObjectLambdaContentTransformation;
}
export type ObjectLambdaTransformationConfigurationsList =
  ObjectLambdaTransformationConfiguration[];
export interface ObjectLambdaConfiguration {
  SupportingAccessPoint: string;
  CloudWatchMetricsEnabled?: boolean;
  AllowedFeatures?: ObjectLambdaAllowedFeature[];
  TransformationConfigurations: ObjectLambdaTransformationConfiguration[];
}
export interface CreateAccessPointForObjectLambdaRequest {
  AccountId: string;
  Name: string;
  Configuration: ObjectLambdaConfiguration;
}
export type ObjectLambdaAccessPointArn = string;
export type ObjectLambdaAccessPointAliasValue = string;
export type ObjectLambdaAccessPointAliasStatus = "PROVISIONING" | "READY" | (string & {});
export interface ObjectLambdaAccessPointAlias {
  Value?: string;
  Status?: ObjectLambdaAccessPointAliasStatus;
}
export interface CreateAccessPointForObjectLambdaResult {
  ObjectLambdaAccessPointArn?: string;
  Alias?: ObjectLambdaAccessPointAlias;
}
export type BucketCannedACL =
  | "private"
  | "public-read"
  | "public-read-write"
  | "authenticated-read"
  | (string & {});
export type BucketLocationConstraint =
  | "EU"
  | "eu-west-1"
  | "us-west-1"
  | "us-west-2"
  | "ap-south-1"
  | "ap-southeast-1"
  | "ap-southeast-2"
  | "ap-northeast-1"
  | "sa-east-1"
  | "cn-north-1"
  | "eu-central-1"
  | (string & {});
export interface CreateBucketConfiguration {
  LocationConstraint?: BucketLocationConstraint;
}
export type GrantFullControl = string;
export type GrantRead = string;
export type GrantReadACP = string;
export type GrantWrite = string;
export type GrantWriteACP = string;
export type ObjectLockEnabledForBucket = boolean;
export type NonEmptyMaxLength64String = string;
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
  OutpostId?: string;
}
export type Location = string;
export type S3RegionalBucketArn = string;
export interface CreateBucketResult {
  Location?: string;
  BucketArn?: string;
}
export type ConfirmationRequired = boolean;
export type MaxLength1024String = string;
export type UserArguments = { [key: string]: string | undefined };
export interface LambdaInvokeOperation {
  FunctionArn?: string;
  InvocationSchemaVersion?: string;
  UserArguments?: { [key: string]: string | undefined };
}
export type S3RegionalOrS3ExpressBucketArnString = string;
export type S3CannedAccessControlList =
  | "private"
  | "public-read"
  | "public-read-write"
  | "aws-exec-read"
  | "authenticated-read"
  | "bucket-owner-read"
  | "bucket-owner-full-control"
  | (string & {});
export type S3GranteeTypeIdentifier = "id" | "emailAddress" | "uri" | (string & {});
export type NonEmptyMaxLength1024String = string;
export interface S3Grantee {
  TypeIdentifier?: S3GranteeTypeIdentifier;
  Identifier?: string;
  DisplayName?: string;
}
export type S3Permission =
  | "FULL_CONTROL"
  | "READ"
  | "WRITE"
  | "READ_ACP"
  | "WRITE_ACP"
  | (string & {});
export interface S3Grant {
  Grantee?: S3Grantee;
  Permission?: S3Permission;
}
export type S3GrantList = S3Grant[];
export type S3MetadataDirective = "COPY" | "REPLACE" | (string & {});
export type S3AnnotationDirective = "COPY" | "EXCLUDE" | (string & {});
export type S3UserMetadata = { [key: string]: string | undefined };
export type S3ContentLength = number;
export type S3SSEAlgorithm = "AES256" | "KMS" | (string & {});
export interface S3ObjectMetadata {
  CacheControl?: string;
  ContentDisposition?: string;
  ContentEncoding?: string;
  ContentLanguage?: string;
  UserMetadata?: { [key: string]: string | undefined };
  ContentLength?: number;
  ContentMD5?: string;
  ContentType?: string;
  HttpExpiresDate?: Date;
  RequesterCharged?: boolean;
  SSEAlgorithm?: S3SSEAlgorithm;
}
export interface S3Tag {
  Key: string;
  Value: string;
}
export type S3TagSet = S3Tag[];
export type NonEmptyMaxLength2048String = string;
export type S3StorageClass =
  | "STANDARD"
  | "STANDARD_IA"
  | "ONEZONE_IA"
  | "GLACIER"
  | "INTELLIGENT_TIERING"
  | "DEEP_ARCHIVE"
  | "GLACIER_IR"
  | (string & {});
export type KmsKeyArnString = string;
export type S3ObjectLockLegalHoldStatus = "OFF" | "ON" | (string & {});
export type S3ObjectLockMode = "COMPLIANCE" | "GOVERNANCE" | (string & {});
export type S3ChecksumAlgorithm =
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
export type S3ObjectLockEventHold = "ON" | "OFF" | (string & {});
export type S3ObjectLockEventHoldDurationDays = number;
export type S3ObjectLockEventHoldDurationYears = number;
export interface S3ObjectLockEventHoldDuration {
  Days?: number;
  Years?: number;
}
export interface S3CopyObjectOperation {
  TargetResource?: string;
  CannedAccessControlList?: S3CannedAccessControlList;
  AccessControlGrants?: S3Grant[];
  MetadataDirective?: S3MetadataDirective;
  AnnotationDirective?: S3AnnotationDirective;
  ModifiedSinceConstraint?: Date;
  NewObjectMetadata?: S3ObjectMetadata;
  NewObjectTagging?: S3Tag[];
  RedirectLocation?: string;
  RequesterPays?: boolean;
  StorageClass?: S3StorageClass;
  UnModifiedSinceConstraint?: Date;
  SSEAwsKmsKeyId?: string;
  TargetKeyPrefix?: string;
  ObjectLockLegalHoldStatus?: S3ObjectLockLegalHoldStatus;
  ObjectLockMode?: S3ObjectLockMode;
  ObjectLockRetainUntilDate?: Date;
  BucketKeyEnabled?: boolean;
  ChecksumAlgorithm?: S3ChecksumAlgorithm;
  ObjectLockEventHold?: S3ObjectLockEventHold;
  ObjectLockEventHoldDuration?: S3ObjectLockEventHoldDuration;
}
export interface S3ObjectOwner {
  ID?: string;
  DisplayName?: string;
}
export interface S3AccessControlList {
  Owner: S3ObjectOwner;
  Grants?: S3Grant[];
}
export interface S3AccessControlPolicy {
  AccessControlList?: S3AccessControlList;
  CannedAccessControlList?: S3CannedAccessControlList;
}
export interface S3SetObjectAclOperation {
  AccessControlPolicy?: S3AccessControlPolicy;
}
export interface S3SetObjectTaggingOperation {
  TagSet?: S3Tag[];
}
export interface S3DeleteObjectTaggingOperation {}
export type S3ExpirationInDays = number;
export type S3GlacierJobTier = "BULK" | "STANDARD" | (string & {});
export interface S3InitiateRestoreObjectOperation {
  ExpirationInDays?: number;
  GlacierJobTier?: S3GlacierJobTier;
}
export interface S3ObjectLockLegalHold {
  Status: S3ObjectLockLegalHoldStatus;
}
export interface S3SetObjectLegalHoldOperation {
  LegalHold: S3ObjectLockLegalHold;
}
export type S3ObjectLockRetentionMode = "COMPLIANCE" | "GOVERNANCE" | (string & {});
export type S3ObjectLockRetentionEventHold = "ON" | "OFF" | (string & {});
export type S3ObjectLockRetentionEventHoldDurationDays = number;
export type S3ObjectLockRetentionEventHoldDurationYears = number;
export interface S3ObjectLockRetentionEventHoldDuration {
  Days?: number;
  Years?: number;
}
export interface S3Retention {
  RetainUntilDate?: Date;
  Mode?: S3ObjectLockRetentionMode;
  EventHold?: S3ObjectLockRetentionEventHold;
  EventHoldDuration?: S3ObjectLockRetentionEventHoldDuration;
}
export interface S3SetObjectRetentionOperation {
  BypassGovernanceRetention?: boolean;
  Retention: S3Retention;
}
export interface S3ReplicateObjectOperation {}
export type ComputeObjectChecksumAlgorithm =
  | "CRC32"
  | "CRC32C"
  | "CRC64NVME"
  | "MD5"
  | "SHA1"
  | "SHA256"
  | "SHA512"
  | "XXHASH64"
  | "XXHASH3"
  | "XXHASH128"
  | (string & {});
export type ComputeObjectChecksumType = "FULL_OBJECT" | "COMPOSITE" | (string & {});
export interface S3ComputeObjectChecksumOperation {
  ChecksumAlgorithm?: ComputeObjectChecksumAlgorithm;
  ChecksumType?: ComputeObjectChecksumType;
}
export type NonEmptyKmsKeyArnString = string;
export interface S3UpdateObjectEncryptionSSEKMS {
  KMSKeyArn: string;
  BucketKeyEnabled?: boolean;
}
export interface ObjectEncryption {
  SSEKMS?: S3UpdateObjectEncryptionSSEKMS;
}
export interface S3UpdateObjectEncryptionOperation {
  ObjectEncryption?: ObjectEncryption;
}
export interface JobOperation {
  LambdaInvoke?: LambdaInvokeOperation;
  S3PutObjectCopy?: S3CopyObjectOperation;
  S3PutObjectAcl?: S3SetObjectAclOperation;
  S3PutObjectTagging?: S3SetObjectTaggingOperation;
  S3DeleteObjectTagging?: S3DeleteObjectTaggingOperation;
  S3InitiateRestoreObject?: S3InitiateRestoreObjectOperation;
  S3PutObjectLegalHold?: S3SetObjectLegalHoldOperation;
  S3PutObjectRetention?: S3SetObjectRetentionOperation;
  S3ReplicateObject?: S3ReplicateObjectOperation;
  S3ComputeObjectChecksum?: S3ComputeObjectChecksumOperation;
  S3UpdateObjectEncryption?: S3UpdateObjectEncryptionOperation;
}
export type S3BucketArnString = string;
export type JobReportFormat = "Report_CSV_20180820" | (string & {});
export type ReportPrefixString = string;
export type JobReportScope = "AllTasks" | "FailedTasksOnly" | (string & {});
export interface JobReport {
  Bucket?: string;
  Format?: JobReportFormat;
  Enabled: boolean;
  Prefix?: string;
  ReportScope?: JobReportScope;
  ExpectedBucketOwner?: string;
}
export type JobManifestFormat =
  | "S3BatchOperations_CSV_20180820"
  | "S3InventoryReport_CSV_20161130"
  | (string & {});
export type JobManifestFieldName = "Ignore" | "Bucket" | "Key" | "VersionId" | (string & {});
export type JobManifestFieldList = JobManifestFieldName[];
export interface JobManifestSpec {
  Format: JobManifestFormat;
  Fields?: JobManifestFieldName[];
}
export type S3KeyArnString = string;
export type S3ObjectVersionId = string;
export interface JobManifestLocation {
  ObjectArn: string;
  ObjectVersionId?: string;
  ETag: string;
}
export interface JobManifest {
  Spec: JobManifestSpec;
  Location: JobManifestLocation;
}
export type NonEmptyMaxLength256String = string;
export type JobPriority = number;
export type ManifestPrefixString = string;
export interface SSES3Encryption {}
export interface SSEKMSEncryption {
  KeyId: string;
}
export interface GeneratedManifestEncryption {
  SSES3?: SSES3Encryption;
  SSEKMS?: SSEKMSEncryption;
}
export type GeneratedManifestFormat = "S3InventoryReport_CSV_20211130" | (string & {});
export interface S3ManifestOutputLocation {
  ExpectedManifestBucketOwner?: string;
  Bucket: string;
  ManifestPrefix?: string;
  ManifestEncryption?: GeneratedManifestEncryption;
  ManifestFormat: GeneratedManifestFormat;
}
export type ObjectCreationTime = Date;
export type ReplicationStatus = "COMPLETED" | "FAILED" | "REPLICA" | "NONE" | (string & {});
export type ReplicationStatusFilterList = ReplicationStatus[];
export type NonEmptyMaxLength1024StringList = string[];
export interface KeyNameConstraint {
  MatchAnyPrefix?: string[];
  MatchAnySuffix?: string[];
  MatchAnySubstring?: string[];
}
export type ObjectSizeGreaterThanBytes = number;
export type ObjectSizeLessThanBytes = number;
export type StorageClassList = S3StorageClass[];
export interface SSES3Filter {}
export interface SSEKMSFilter {
  KmsKeyArn?: string;
  BucketKeyEnabled?: boolean;
}
export interface DSSEKMSFilter {
  KmsKeyArn?: string;
}
export interface SSECFilter {}
export interface NotSSEFilter {}
export type ObjectEncryptionFilter =
  | { SSES3: SSES3Filter; SSEKMS?: never; DSSEKMS?: never; SSEC?: never; NOTSSE?: never }
  | { SSES3?: never; SSEKMS: SSEKMSFilter; DSSEKMS?: never; SSEC?: never; NOTSSE?: never }
  | { SSES3?: never; SSEKMS?: never; DSSEKMS: DSSEKMSFilter; SSEC?: never; NOTSSE?: never }
  | { SSES3?: never; SSEKMS?: never; DSSEKMS?: never; SSEC: SSECFilter; NOTSSE?: never }
  | { SSES3?: never; SSEKMS?: never; DSSEKMS?: never; SSEC?: never; NOTSSE: NotSSEFilter };
export type ObjectEncryptionFilterList = ObjectEncryptionFilter[];
export interface JobManifestGeneratorFilter {
  EligibleForReplication?: boolean;
  CreatedAfter?: Date;
  CreatedBefore?: Date;
  ObjectReplicationStatuses?: ReplicationStatus[];
  KeyNameConstraint?: KeyNameConstraint;
  ObjectSizeGreaterThanBytes?: number;
  ObjectSizeLessThanBytes?: number;
  MatchAnyStorageClass?: S3StorageClass[];
  MatchAnyObjectEncryption?: ObjectEncryptionFilter[];
}
export interface S3JobManifestGenerator {
  ExpectedBucketOwner?: string;
  SourceBucket: string;
  ManifestOutputLocation?: S3ManifestOutputLocation;
  Filter?: JobManifestGeneratorFilter;
  EnableManifestOutput: boolean;
}
export type JobManifestGenerator = { S3JobManifestGenerator: S3JobManifestGenerator };
export interface CreateJobRequest {
  AccountId: string;
  ConfirmationRequired?: boolean;
  Operation: JobOperation;
  Report: JobReport;
  ClientRequestToken: string;
  Manifest?: JobManifest;
  Description?: string;
  Priority: number;
  RoleArn: string;
  Tags?: S3Tag[];
  ManifestGenerator?: JobManifestGenerator;
}
export type JobId = string;
export interface CreateJobResult {
  JobId?: string;
}
export type MultiRegionAccessPointClientToken = string;
export type MultiRegionAccessPointName = string;
export interface Region {
  Bucket: string;
  BucketAccountId?: string;
}
const Region = /*@__PURE__*/ __L.at(__c20, 0) as any as S.Schema<Region>;
export type RegionCreationList = Region[];
export interface CreateMultiRegionAccessPointInput {
  Name: string;
  PublicAccessBlock?: PublicAccessBlockConfiguration;
  Regions: Region[];
}
export interface CreateMultiRegionAccessPointRequest {
  AccountId: string;
  ClientToken: string;
  Details: CreateMultiRegionAccessPointInput;
}
export type AsyncRequestTokenARN = string;
export interface CreateMultiRegionAccessPointResult {
  RequestTokenARN?: string;
}
export type StorageLensGroupName = string;
export type MatchAnyPrefix = string[];
export type Suffix = string;
export type MatchAnySuffix = string[];
export type MatchAnyTag = S3Tag[];
export type ObjectAgeValue = number;
export interface MatchObjectAge {
  DaysGreaterThan?: number;
  DaysLessThan?: number;
}
export type ObjectSizeValue = number;
export interface MatchObjectSize {
  BytesGreaterThan?: number;
  BytesLessThan?: number;
}
export interface StorageLensGroupAndOperator {
  MatchAnyPrefix?: string[];
  MatchAnySuffix?: string[];
  MatchAnyTag?: S3Tag[];
  MatchObjectAge?: MatchObjectAge;
  MatchObjectSize?: MatchObjectSize;
}
export interface StorageLensGroupOrOperator {
  MatchAnyPrefix?: string[];
  MatchAnySuffix?: string[];
  MatchAnyTag?: S3Tag[];
  MatchObjectAge?: MatchObjectAge;
  MatchObjectSize?: MatchObjectSize;
}
export interface StorageLensGroupFilter {
  MatchAnyPrefix?: string[];
  MatchAnySuffix?: string[];
  MatchAnyTag?: S3Tag[];
  MatchObjectAge?: MatchObjectAge;
  MatchObjectSize?: MatchObjectSize;
  And?: StorageLensGroupAndOperator;
  Or?: StorageLensGroupOrOperator;
}
export type StorageLensGroupArn = string;
export interface StorageLensGroup {
  Name: string;
  Filter: StorageLensGroupFilter;
  StorageLensGroupArn?: string;
}
export interface CreateStorageLensGroupRequest {
  AccountId: string;
  StorageLensGroup: StorageLensGroup;
  Tags?: Tag[];
}
export interface CreateStorageLensGroupResponse {}
export interface DeleteAccessGrantRequest {
  AccountId: string;
  AccessGrantId: string;
}
export interface DeleteAccessGrantResponse {}
export interface DeleteAccessGrantsInstanceRequest {
  AccountId: string;
}
export interface DeleteAccessGrantsInstanceResponse {}
export interface DeleteAccessGrantsInstanceResourcePolicyRequest {
  AccountId: string;
}
export interface DeleteAccessGrantsInstanceResourcePolicyResponse {}
export interface DeleteAccessGrantsLocationRequest {
  AccountId: string;
  AccessGrantsLocationId: string;
}
export interface DeleteAccessGrantsLocationResponse {}
export interface DeleteAccessPointRequest {
  AccountId: string;
  Name: string;
}
export interface DeleteAccessPointResponse {}
export interface DeleteAccessPointForObjectLambdaRequest {
  AccountId: string;
  Name: string;
}
export interface DeleteAccessPointForObjectLambdaResponse {}
export interface DeleteAccessPointPolicyRequest {
  AccountId: string;
  Name: string;
}
export interface DeleteAccessPointPolicyResponse {}
export interface DeleteAccessPointPolicyForObjectLambdaRequest {
  AccountId: string;
  Name: string;
}
export interface DeleteAccessPointPolicyForObjectLambdaResponse {}
export interface DeleteAccessPointScopeRequest {
  AccountId: string;
  Name: string;
}
export interface DeleteAccessPointScopeResponse {}
export interface DeleteBucketRequest {
  AccountId: string;
  Bucket: string;
}
export interface DeleteBucketResponse {}
export interface DeleteBucketLifecycleConfigurationRequest {
  AccountId: string;
  Bucket: string;
}
export interface DeleteBucketLifecycleConfigurationResponse {}
export interface DeleteBucketPolicyRequest {
  AccountId: string;
  Bucket: string;
}
export interface DeleteBucketPolicyResponse {}
export interface DeleteBucketReplicationRequest {
  AccountId: string;
  Bucket: string;
}
export interface DeleteBucketReplicationResponse {}
export interface DeleteBucketTaggingRequest {
  AccountId: string;
  Bucket: string;
}
export interface DeleteBucketTaggingResponse {}
export interface DeleteJobTaggingRequest {
  AccountId: string;
  JobId: string;
}
export interface DeleteJobTaggingResult {}
export interface DeleteMultiRegionAccessPointInput {
  Name: string;
}
export interface DeleteMultiRegionAccessPointRequest {
  AccountId: string;
  ClientToken: string;
  Details: DeleteMultiRegionAccessPointInput;
}
export interface DeleteMultiRegionAccessPointResult {
  RequestTokenARN?: string;
}
export interface DeletePublicAccessBlockRequest {
  AccountId: string;
}
export interface DeletePublicAccessBlockResponse {}
export type ConfigId = string;
export interface DeleteStorageLensConfigurationRequest {
  ConfigId: string;
  AccountId: string;
}
export interface DeleteStorageLensConfigurationResponse {}
export interface DeleteStorageLensConfigurationTaggingRequest {
  ConfigId: string;
  AccountId: string;
}
export interface DeleteStorageLensConfigurationTaggingResult {}
export interface DeleteStorageLensGroupRequest {
  Name: string;
  AccountId: string;
}
export interface DeleteStorageLensGroupResponse {}
export interface DescribeJobRequest {
  AccountId: string;
  JobId: string;
}
export type JobArn = string;
export type JobStatus =
  | "Active"
  | "Cancelled"
  | "Cancelling"
  | "Complete"
  | "Completing"
  | "Failed"
  | "Failing"
  | "New"
  | "Paused"
  | "Pausing"
  | "Preparing"
  | "Ready"
  | "Suspended"
  | (string & {});
export type JobTotalNumberOfTasks = number;
export type JobNumberOfTasksSucceeded = number;
export type JobNumberOfTasksFailed = number;
export type JobTimeInStateSeconds = number;
export interface JobTimers {
  ElapsedTimeInActiveSeconds?: number;
}
export interface JobProgressSummary {
  TotalNumberOfTasks?: number;
  NumberOfTasksSucceeded?: number;
  NumberOfTasksFailed?: number;
  Timers?: JobTimers;
}
export type JobStatusUpdateReason = string;
export type JobFailureCode = string;
export type JobFailureReason = string;
export interface JobFailure {
  FailureCode?: string;
  FailureReason?: string;
}
export type JobFailureList = JobFailure[];
export type JobCreationTime = Date;
export type JobTerminationDate = Date;
export type SuspendedDate = Date;
export type SuspendedCause = string;
export interface S3GeneratedManifestDescriptor {
  Format?: GeneratedManifestFormat;
  Location?: JobManifestLocation;
}
export interface JobDescriptor {
  JobId?: string;
  ConfirmationRequired?: boolean;
  Description?: string;
  JobArn?: string;
  Status?: JobStatus;
  Manifest?: JobManifest;
  Operation?: JobOperation;
  Priority?: number;
  ProgressSummary?: JobProgressSummary;
  StatusUpdateReason?: string;
  FailureReasons?: JobFailure[];
  Report?: JobReport;
  CreationTime?: Date;
  TerminationDate?: Date;
  RoleArn?: string;
  SuspendedDate?: Date;
  SuspendedCause?: string;
  ManifestGenerator?: JobManifestGenerator;
  GeneratedManifestDescriptor?: S3GeneratedManifestDescriptor;
}
export interface DescribeJobResult {
  Job?: JobDescriptor;
}
export interface DescribeMultiRegionAccessPointOperationRequest {
  AccountId: string;
  RequestTokenARN: string;
}
export type AsyncCreationTimestamp = Date;
export type AsyncOperationName =
  | "CreateMultiRegionAccessPoint"
  | "DeleteMultiRegionAccessPoint"
  | "PutMultiRegionAccessPointPolicy"
  | (string & {});
export type Policy = string;
export interface PutMultiRegionAccessPointPolicyInput {
  Name: string;
  Policy: string;
}
export interface AsyncRequestParameters {
  CreateMultiRegionAccessPointRequest?: CreateMultiRegionAccessPointInput;
  DeleteMultiRegionAccessPointRequest?: DeleteMultiRegionAccessPointInput;
  PutMultiRegionAccessPointPolicyRequest?: PutMultiRegionAccessPointPolicyInput;
}
export type AsyncRequestStatus = string;
export type RegionName = string;
export interface MultiRegionAccessPointRegionalResponse {
  Name?: string;
  RequestStatus?: string;
}
export type MultiRegionAccessPointRegionalResponseList = MultiRegionAccessPointRegionalResponse[];
export interface MultiRegionAccessPointsAsyncResponse {
  Regions?: MultiRegionAccessPointRegionalResponse[];
}
export interface AsyncErrorDetails {
  Code?: string;
  Message?: string;
  Resource?: string;
  RequestId?: string;
}
export interface AsyncResponseDetails {
  MultiRegionAccessPointDetails?: MultiRegionAccessPointsAsyncResponse;
  ErrorDetails?: AsyncErrorDetails;
}
export interface AsyncOperation {
  CreationTime?: Date;
  Operation?: AsyncOperationName;
  RequestTokenARN?: string;
  RequestParameters?: AsyncRequestParameters;
  RequestStatus?: string;
  ResponseDetails?: AsyncResponseDetails;
}
export interface DescribeMultiRegionAccessPointOperationResult {
  AsyncOperation?: AsyncOperation;
}
export interface DissociateAccessGrantsIdentityCenterRequest {
  AccountId: string;
}
export interface DissociateAccessGrantsIdentityCenterResponse {}
export interface GetAccessGrantRequest {
  AccountId: string;
  AccessGrantId: string;
}
export interface GetAccessGrantResult {
  CreatedAt?: Date;
  AccessGrantId?: string;
  AccessGrantArn?: string;
  Grantee?: Grantee;
  Permission?: Permission;
  AccessGrantsLocationId?: string;
  AccessGrantsLocationConfiguration?: AccessGrantsLocationConfiguration;
  GrantScope?: string;
  ApplicationArn?: string;
}
export interface GetAccessGrantsInstanceRequest {
  AccountId: string;
}
export interface GetAccessGrantsInstanceResult {
  AccessGrantsInstanceArn?: string;
  AccessGrantsInstanceId?: string;
  IdentityCenterArn?: string;
  IdentityCenterInstanceArn?: string;
  IdentityCenterApplicationArn?: string;
  CreatedAt?: Date;
}
export interface GetAccessGrantsInstanceForPrefixRequest {
  AccountId: string;
  S3Prefix: string;
}
export interface GetAccessGrantsInstanceForPrefixResult {
  AccessGrantsInstanceArn?: string;
  AccessGrantsInstanceId?: string;
}
export interface GetAccessGrantsInstanceResourcePolicyRequest {
  AccountId: string;
}
export type PolicyDocument = string;
export type Organization = string;
export interface GetAccessGrantsInstanceResourcePolicyResult {
  Policy?: string;
  Organization?: string;
  CreatedAt?: Date;
}
export interface GetAccessGrantsLocationRequest {
  AccountId: string;
  AccessGrantsLocationId: string;
}
export interface GetAccessGrantsLocationResult {
  CreatedAt?: Date;
  AccessGrantsLocationId?: string;
  AccessGrantsLocationArn?: string;
  LocationScope?: string;
  IAMRoleArn?: string;
}
export interface GetAccessPointRequest {
  AccountId: string;
  Name: string;
}
export type AccessPointBucketName = string;
export type NetworkOrigin = "Internet" | "VPC" | (string & {});
export type CreationDate = Date;
export type Endpoints = { [key: string]: string | undefined };
export type DataSourceId = string;
export type DataSourceType = string;
export interface GetAccessPointResult {
  Name?: string;
  Bucket?: string;
  NetworkOrigin?: NetworkOrigin;
  VpcConfiguration?: VpcConfiguration;
  PublicAccessBlockConfiguration?: PublicAccessBlockConfiguration;
  CreationDate?: Date;
  Alias?: string;
  AccessPointArn?: string;
  Endpoints?: { [key: string]: string | undefined };
  BucketAccountId?: string;
  DataSourceId?: string;
  DataSourceType?: string;
}
export interface GetAccessPointConfigurationForObjectLambdaRequest {
  AccountId: string;
  Name: string;
}
export interface GetAccessPointConfigurationForObjectLambdaResult {
  Configuration?: ObjectLambdaConfiguration;
}
export interface GetAccessPointForObjectLambdaRequest {
  AccountId: string;
  Name: string;
}
export interface GetAccessPointForObjectLambdaResult {
  Name?: string;
  PublicAccessBlockConfiguration?: PublicAccessBlockConfiguration;
  CreationDate?: Date;
  Alias?: ObjectLambdaAccessPointAlias;
}
export interface GetAccessPointPolicyRequest {
  AccountId: string;
  Name: string;
}
export interface GetAccessPointPolicyResult {
  Policy?: string;
}
export interface GetAccessPointPolicyForObjectLambdaRequest {
  AccountId: string;
  Name: string;
}
export type ObjectLambdaPolicy = string;
export interface GetAccessPointPolicyForObjectLambdaResult {
  Policy?: string;
}
export interface GetAccessPointPolicyStatusRequest {
  AccountId: string;
  Name: string;
}
export type IsPublic = boolean;
export interface PolicyStatus {
  IsPublic?: boolean;
}
export interface GetAccessPointPolicyStatusResult {
  PolicyStatus?: PolicyStatus;
}
export interface GetAccessPointPolicyStatusForObjectLambdaRequest {
  AccountId: string;
  Name: string;
}
export interface GetAccessPointPolicyStatusForObjectLambdaResult {
  PolicyStatus?: PolicyStatus;
}
export interface GetAccessPointScopeRequest {
  AccountId: string;
  Name: string;
}
export interface GetAccessPointScopeResult {
  Scope?: Scope;
}
export interface GetBucketRequest {
  AccountId: string;
  Bucket: string;
}
export type PublicAccessBlockEnabled = boolean;
export interface GetBucketResult {
  Bucket?: string;
  PublicAccessBlockEnabled?: boolean;
  CreationDate?: Date;
}
export interface GetBucketLifecycleConfigurationRequest {
  AccountId: string;
  Bucket: string;
}
export type Days = number;
export type ExpiredObjectDeleteMarker = boolean;
export interface LifecycleExpiration {
  Date?: Date;
  Days?: number;
  ExpiredObjectDeleteMarker?: boolean;
}
export type ID = string;
export interface LifecycleRuleAndOperator {
  Prefix?: string;
  Tags?: S3Tag[];
  ObjectSizeGreaterThan?: number;
  ObjectSizeLessThan?: number;
}
export interface LifecycleRuleFilter {
  Prefix?: string;
  Tag?: S3Tag;
  And?: LifecycleRuleAndOperator;
  ObjectSizeGreaterThan?: number;
  ObjectSizeLessThan?: number;
}
export type ExpirationStatus = "Enabled" | "Disabled" | (string & {});
export type TransitionStorageClass =
  | "GLACIER"
  | "STANDARD_IA"
  | "ONEZONE_IA"
  | "INTELLIGENT_TIERING"
  | "DEEP_ARCHIVE"
  | (string & {});
export interface Transition {
  Date?: Date;
  Days?: number;
  StorageClass?: TransitionStorageClass;
}
export type TransitionList = Transition[];
export interface NoncurrentVersionTransition {
  NoncurrentDays?: number;
  StorageClass?: TransitionStorageClass;
}
export type NoncurrentVersionTransitionList = NoncurrentVersionTransition[];
export type NoncurrentVersionCount = number;
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
  Filter?: LifecycleRuleFilter;
  Status: ExpirationStatus;
  Transitions?: Transition[];
  NoncurrentVersionTransitions?: NoncurrentVersionTransition[];
  NoncurrentVersionExpiration?: NoncurrentVersionExpiration;
  AbortIncompleteMultipartUpload?: AbortIncompleteMultipartUpload;
}
export type LifecycleRules = LifecycleRule[];
export interface GetBucketLifecycleConfigurationResult {
  Rules?: LifecycleRule[];
}
export interface GetBucketPolicyRequest {
  AccountId: string;
  Bucket: string;
}
export interface GetBucketPolicyResult {
  Policy?: string;
}
export interface GetBucketReplicationRequest {
  AccountId: string;
  Bucket: string;
}
export type Role = string;
export type Priority = number;
export interface ReplicationRuleAndOperator {
  Prefix?: string;
  Tags?: S3Tag[];
}
export interface ReplicationRuleFilter {
  Prefix?: string;
  Tag?: S3Tag;
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
export type BucketIdentifierString = string;
export type ReplicationTimeStatus = "Enabled" | "Disabled" | (string & {});
export type Minutes = number;
export interface ReplicationTimeValue {
  Minutes?: number;
}
export interface ReplicationTime {
  Status: ReplicationTimeStatus;
  Time: ReplicationTimeValue;
}
export type OwnerOverride = "Destination" | (string & {});
export interface AccessControlTranslation {
  Owner: OwnerOverride;
}
export type ReplicaKmsKeyID = string;
export interface EncryptionConfiguration {
  ReplicaKmsKeyID?: string;
}
export type MetricsStatus = "Enabled" | "Disabled" | (string & {});
export interface Metrics {
  Status: MetricsStatus;
  EventThreshold?: ReplicationTimeValue;
}
export type ReplicationStorageClass =
  | "STANDARD"
  | "REDUCED_REDUNDANCY"
  | "STANDARD_IA"
  | "ONEZONE_IA"
  | "INTELLIGENT_TIERING"
  | "GLACIER"
  | "DEEP_ARCHIVE"
  | "OUTPOSTS"
  | "GLACIER_IR"
  | (string & {});
export interface Destination {
  Account?: string;
  Bucket: string;
  ReplicationTime?: ReplicationTime;
  AccessControlTranslation?: AccessControlTranslation;
  EncryptionConfiguration?: EncryptionConfiguration;
  Metrics?: Metrics;
  StorageClass?: ReplicationStorageClass;
}
export type DeleteMarkerReplicationStatus = "Enabled" | "Disabled" | (string & {});
export interface DeleteMarkerReplication {
  Status: DeleteMarkerReplicationStatus;
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
  Bucket: string;
}
export type ReplicationRules = ReplicationRule[];
export interface ReplicationConfiguration {
  Role: string;
  Rules: ReplicationRule[];
}
export interface GetBucketReplicationResult {
  ReplicationConfiguration?: ReplicationConfiguration;
}
export interface GetBucketTaggingRequest {
  AccountId: string;
  Bucket: string;
}
export interface GetBucketTaggingResult {
  TagSet: S3Tag[];
}
export interface GetBucketVersioningRequest {
  AccountId: string;
  Bucket: string;
}
export type BucketVersioningStatus = "Enabled" | "Suspended" | (string & {});
export type MFADeleteStatus = "Enabled" | "Disabled" | (string & {});
export interface GetBucketVersioningResult {
  Status?: BucketVersioningStatus;
  MFADelete?: MFADeleteStatus;
}
export type DurationSeconds = number;
export type Privilege = "Minimal" | "Default" | (string & {});
export type AuditContext = string;
export interface GetDataAccessRequest {
  AccountId: string;
  Target: string;
  Permission: Permission;
  DurationSeconds?: number;
  Privilege?: Privilege;
  TargetType?: S3PrefixType;
  AuditContext?: string;
}
export type AccessKeyId = string | redacted.Redacted<string>;
export type SecretAccessKey = string | redacted.Redacted<string>;
export type SessionToken = string | redacted.Redacted<string>;
export type Expiration = Date;
export interface Credentials {
  AccessKeyId?: string | redacted.Redacted<string>;
  SecretAccessKey?: string | redacted.Redacted<string>;
  SessionToken?: string | redacted.Redacted<string>;
  Expiration?: Date;
}
export interface GetDataAccessResult {
  Credentials?: Credentials;
  MatchedGrantTarget?: string;
  Grantee?: Grantee;
}
export interface GetJobTaggingRequest {
  AccountId: string;
  JobId: string;
}
export interface GetJobTaggingResult {
  Tags?: S3Tag[];
}
export interface GetMultiRegionAccessPointRequest {
  AccountId: string;
  Name: string;
}
export type MultiRegionAccessPointAlias = string;
export type MultiRegionAccessPointStatus =
  | "READY"
  | "INCONSISTENT_ACROSS_REGIONS"
  | "CREATING"
  | "PARTIALLY_CREATED"
  | "PARTIALLY_DELETED"
  | "DELETING"
  | (string & {});
export interface RegionReport {
  Bucket?: string;
  Region?: string;
  BucketAccountId?: string;
}
export type RegionReportList = RegionReport[];
export interface MultiRegionAccessPointReport {
  Name?: string;
  Alias?: string;
  CreatedAt?: Date;
  PublicAccessBlock?: PublicAccessBlockConfiguration;
  Status?: MultiRegionAccessPointStatus;
  Regions?: RegionReport[];
}
export interface GetMultiRegionAccessPointResult {
  AccessPoint?: MultiRegionAccessPointReport;
}
export interface GetMultiRegionAccessPointPolicyRequest {
  AccountId: string;
  Name: string;
}
export interface EstablishedMultiRegionAccessPointPolicy {
  Policy?: string;
}
export interface ProposedMultiRegionAccessPointPolicy {
  Policy?: string;
}
export interface MultiRegionAccessPointPolicyDocument {
  Established?: EstablishedMultiRegionAccessPointPolicy;
  Proposed?: ProposedMultiRegionAccessPointPolicy;
}
export interface GetMultiRegionAccessPointPolicyResult {
  Policy?: MultiRegionAccessPointPolicyDocument;
}
export interface GetMultiRegionAccessPointPolicyStatusRequest {
  AccountId: string;
  Name: string;
}
export interface GetMultiRegionAccessPointPolicyStatusResult {
  Established?: PolicyStatus;
}
export type MultiRegionAccessPointId = string;
export interface GetMultiRegionAccessPointRoutesRequest {
  AccountId: string;
  Mrap: string;
}
export type TrafficDialPercentage = number;
export interface MultiRegionAccessPointRoute {
  Bucket?: string;
  Region?: string;
  TrafficDialPercentage: number;
}
export type RouteList = MultiRegionAccessPointRoute[];
export interface GetMultiRegionAccessPointRoutesResult {
  Mrap?: string;
  Routes?: MultiRegionAccessPointRoute[];
}
export interface GetPublicAccessBlockRequest {
  AccountId: string;
}
export interface GetPublicAccessBlockOutput {
  PublicAccessBlockConfiguration?: PublicAccessBlockConfiguration;
}
export interface GetStorageLensConfigurationRequest {
  ConfigId: string;
  AccountId: string;
}
export type IsEnabled = boolean;
export interface ActivityMetrics {
  IsEnabled?: boolean;
}
export type StorageLensPrefixLevelDelimiter = string;
export type StorageLensPrefixLevelMaxDepth = number;
export type MinStorageBytesPercentage = number;
export interface SelectionCriteria {
  Delimiter?: string;
  MaxDepth?: number;
  MinStorageBytesPercentage?: number;
}
export interface PrefixLevelStorageMetrics {
  IsEnabled?: boolean;
  SelectionCriteria?: SelectionCriteria;
}
export interface PrefixLevel {
  StorageMetrics: PrefixLevelStorageMetrics;
}
export interface AdvancedCostOptimizationMetrics {
  IsEnabled?: boolean;
}
export interface AdvancedDataProtectionMetrics {
  IsEnabled?: boolean;
}
export interface DetailedStatusCodesMetrics {
  IsEnabled?: boolean;
}
export interface AdvancedPerformanceMetrics {
  IsEnabled?: boolean;
}
export interface BucketLevel {
  ActivityMetrics?: ActivityMetrics;
  PrefixLevel?: PrefixLevel;
  AdvancedCostOptimizationMetrics?: AdvancedCostOptimizationMetrics;
  AdvancedDataProtectionMetrics?: AdvancedDataProtectionMetrics;
  DetailedStatusCodesMetrics?: DetailedStatusCodesMetrics;
  AdvancedPerformanceMetrics?: AdvancedPerformanceMetrics;
}
export type StorageLensGroupLevelInclude = string[];
export type StorageLensGroupLevelExclude = string[];
export interface StorageLensGroupLevelSelectionCriteria {
  Include?: string[];
  Exclude?: string[];
}
export interface StorageLensGroupLevel {
  SelectionCriteria?: StorageLensGroupLevelSelectionCriteria;
}
export interface AccountLevel {
  ActivityMetrics?: ActivityMetrics;
  BucketLevel?: BucketLevel;
  AdvancedCostOptimizationMetrics?: AdvancedCostOptimizationMetrics;
  AdvancedDataProtectionMetrics?: AdvancedDataProtectionMetrics;
  DetailedStatusCodesMetrics?: DetailedStatusCodesMetrics;
  AdvancedPerformanceMetrics?: AdvancedPerformanceMetrics;
  StorageLensGroupLevel?: StorageLensGroupLevel;
}
export type Buckets = string[];
export type S3AWSRegion = string;
export type Regions = string[];
export interface Include {
  Buckets?: string[];
  Regions?: string[];
}
export interface Exclude {
  Buckets?: string[];
  Regions?: string[];
}
export type Format = "CSV" | "Parquet" | (string & {});
export type OutputSchemaVersion = "V_1" | (string & {});
export interface SSES3 {}
export type SSEKMSKeyId = string;
export interface SSEKMS {
  KeyId: string;
}
export interface StorageLensDataExportEncryption {
  SSES3?: SSES3;
  SSEKMS?: SSEKMS;
}
export interface S3BucketDestination {
  Format: Format;
  OutputSchemaVersion: OutputSchemaVersion;
  AccountId: string;
  Arn: string;
  Prefix?: string;
  Encryption?: StorageLensDataExportEncryption;
}
export interface CloudWatchMetrics {
  IsEnabled: boolean;
}
export interface StorageLensTableDestination {
  IsEnabled: boolean;
  Encryption?: StorageLensDataExportEncryption;
}
export interface StorageLensDataExport {
  S3BucketDestination?: S3BucketDestination;
  CloudWatchMetrics?: CloudWatchMetrics;
  StorageLensTableDestination?: StorageLensTableDestination;
}
export interface StorageLensExpandedPrefixesDataExport {
  S3BucketDestination?: S3BucketDestination;
  StorageLensTableDestination?: StorageLensTableDestination;
}
export type AwsOrgArn = string;
export interface StorageLensAwsOrg {
  Arn: string;
}
export type StorageLensArn = string;
export interface StorageLensConfiguration {
  Id: string;
  AccountLevel: AccountLevel;
  Include?: Include;
  Exclude?: Exclude;
  DataExport?: StorageLensDataExport;
  ExpandedPrefixesDataExport?: StorageLensExpandedPrefixesDataExport;
  IsEnabled: boolean;
  AwsOrg?: StorageLensAwsOrg;
  StorageLensArn?: string;
  PrefixDelimiter?: string;
}
export interface GetStorageLensConfigurationResult {
  StorageLensConfiguration?: StorageLensConfiguration;
}
export interface GetStorageLensConfigurationTaggingRequest {
  ConfigId: string;
  AccountId: string;
}
export interface StorageLensTag {
  Key: string;
  Value: string;
}
export type StorageLensTags = StorageLensTag[];
export interface GetStorageLensConfigurationTaggingResult {
  Tags?: StorageLensTag[];
}
export interface GetStorageLensGroupRequest {
  Name: string;
  AccountId: string;
}
export interface GetStorageLensGroupResult {
  StorageLensGroup?: StorageLensGroup;
}
export type ContinuationToken = string;
export type MaxResults = number;
export interface ListAccessGrantsRequest {
  AccountId: string;
  NextToken?: string;
  MaxResults?: number;
  GranteeType?: GranteeType;
  GranteeIdentifier?: string;
  Permission?: Permission;
  GrantScope?: string;
  ApplicationArn?: string;
}
export interface ListAccessGrantEntry {
  CreatedAt?: Date;
  AccessGrantId?: string;
  AccessGrantArn?: string;
  Grantee?: Grantee;
  Permission?: Permission;
  AccessGrantsLocationId?: string;
  AccessGrantsLocationConfiguration?: AccessGrantsLocationConfiguration;
  GrantScope?: string;
  ApplicationArn?: string;
}
export type AccessGrantsList = ListAccessGrantEntry[];
export interface ListAccessGrantsResult {
  NextToken?: string;
  AccessGrantsList?: ListAccessGrantEntry[];
}
export interface ListAccessGrantsInstancesRequest {
  AccountId: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface ListAccessGrantsInstanceEntry {
  AccessGrantsInstanceId?: string;
  AccessGrantsInstanceArn?: string;
  CreatedAt?: Date;
  IdentityCenterArn?: string;
  IdentityCenterInstanceArn?: string;
  IdentityCenterApplicationArn?: string;
}
export type AccessGrantsInstancesList = ListAccessGrantsInstanceEntry[];
export interface ListAccessGrantsInstancesResult {
  NextToken?: string;
  AccessGrantsInstancesList?: ListAccessGrantsInstanceEntry[];
}
export interface ListAccessGrantsLocationsRequest {
  AccountId: string;
  NextToken?: string;
  MaxResults?: number;
  LocationScope?: string;
}
export interface ListAccessGrantsLocationsEntry {
  CreatedAt?: Date;
  AccessGrantsLocationId?: string;
  AccessGrantsLocationArn?: string;
  LocationScope?: string;
  IAMRoleArn?: string;
}
export type AccessGrantsLocationsList = ListAccessGrantsLocationsEntry[];
export interface ListAccessGrantsLocationsResult {
  NextToken?: string;
  AccessGrantsLocationsList?: ListAccessGrantsLocationsEntry[];
}
export interface ListAccessPointsRequest {
  AccountId: string;
  Bucket?: string;
  NextToken?: string;
  MaxResults?: number;
  DataSourceId?: string;
  DataSourceType?: string;
}
export interface AccessPoint {
  Name: string;
  NetworkOrigin: NetworkOrigin;
  VpcConfiguration?: VpcConfiguration;
  Bucket: string;
  AccessPointArn?: string;
  Alias?: string;
  BucketAccountId?: string;
  DataSourceId?: string;
  DataSourceType?: string;
}
export type AccessPointList = AccessPoint[];
export interface ListAccessPointsResult {
  AccessPointList?: AccessPoint[];
  NextToken?: string;
}
export interface ListAccessPointsForDirectoryBucketsRequest {
  AccountId: string;
  DirectoryBucket?: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface ListAccessPointsForDirectoryBucketsResult {
  AccessPointList?: AccessPoint[];
  NextToken?: string;
}
export interface ListAccessPointsForObjectLambdaRequest {
  AccountId: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface ObjectLambdaAccessPoint {
  Name: string;
  ObjectLambdaAccessPointArn?: string;
  Alias?: ObjectLambdaAccessPointAlias;
}
export type ObjectLambdaAccessPointList = ObjectLambdaAccessPoint[];
export interface ListAccessPointsForObjectLambdaResult {
  ObjectLambdaAccessPointList?: ObjectLambdaAccessPoint[];
  NextToken?: string;
}
export interface ListCallerAccessGrantsRequest {
  AccountId: string;
  GrantScope?: string;
  NextToken?: string;
  MaxResults?: number;
  AllowedByApplication?: boolean;
}
export interface ListCallerAccessGrantsEntry {
  Permission?: Permission;
  GrantScope?: string;
  ApplicationArn?: string;
}
export type CallerAccessGrantsList = ListCallerAccessGrantsEntry[];
export interface ListCallerAccessGrantsResult {
  NextToken?: string;
  CallerAccessGrantsList?: ListCallerAccessGrantsEntry[];
}
export type JobStatusList = JobStatus[];
export type StringForNextToken = string;
export interface ListJobsRequest {
  AccountId: string;
  JobStatuses?: JobStatus[];
  NextToken?: string;
  MaxResults?: number;
}
export type OperationName =
  | "LambdaInvoke"
  | "S3PutObjectCopy"
  | "S3PutObjectAcl"
  | "S3PutObjectTagging"
  | "S3DeleteObjectTagging"
  | "S3InitiateRestoreObject"
  | "S3PutObjectLegalHold"
  | "S3PutObjectRetention"
  | "S3ReplicateObject"
  | "S3ComputeObjectChecksum"
  | "S3UpdateObjectEncryption"
  | (string & {});
export interface JobListDescriptor {
  JobId?: string;
  Description?: string;
  Operation?: OperationName;
  Priority?: number;
  Status?: JobStatus;
  CreationTime?: Date;
  TerminationDate?: Date;
  ProgressSummary?: JobProgressSummary;
}
export type JobListDescriptorList = JobListDescriptor[];
export interface ListJobsResult {
  NextToken?: string;
  Jobs?: JobListDescriptor[];
}
export interface ListMultiRegionAccessPointsRequest {
  AccountId: string;
  NextToken?: string;
  MaxResults?: number;
}
export type MultiRegionAccessPointReportList = MultiRegionAccessPointReport[];
export interface ListMultiRegionAccessPointsResult {
  AccessPoints?: MultiRegionAccessPointReport[];
  NextToken?: string;
}
export interface ListRegionalBucketsRequest {
  AccountId: string;
  NextToken?: string;
  MaxResults?: number;
  OutpostId?: string;
}
export interface RegionalBucket {
  Bucket: string;
  BucketArn?: string;
  PublicAccessBlockEnabled: boolean;
  CreationDate: Date;
  OutpostId?: string;
}
export type RegionalBucketList = RegionalBucket[];
export interface ListRegionalBucketsResult {
  RegionalBucketList?: RegionalBucket[];
  NextToken?: string;
}
export interface ListStorageLensConfigurationsRequest {
  AccountId: string;
  NextToken?: string;
}
export interface ListStorageLensConfigurationEntry {
  Id: string;
  StorageLensArn: string;
  HomeRegion: string;
  IsEnabled?: boolean;
}
export type StorageLensConfigurationList = ListStorageLensConfigurationEntry[];
export interface ListStorageLensConfigurationsResult {
  NextToken?: string;
  StorageLensConfigurationList?: ListStorageLensConfigurationEntry[];
}
export interface ListStorageLensGroupsRequest {
  AccountId: string;
  NextToken?: string;
}
export interface ListStorageLensGroupEntry {
  Name: string;
  StorageLensGroupArn: string;
  HomeRegion: string;
}
export type StorageLensGroupList = ListStorageLensGroupEntry[];
export interface ListStorageLensGroupsResult {
  NextToken?: string;
  StorageLensGroupList?: ListStorageLensGroupEntry[];
}
export type S3ResourceArn = string;
export interface ListTagsForResourceRequest {
  AccountId: string;
  ResourceArn: string;
}
export interface ListTagsForResourceResult {
  Tags?: Tag[];
}
export interface PutAccessGrantsInstanceResourcePolicyRequest {
  AccountId: string;
  Policy: string;
  Organization?: string;
}
export interface PutAccessGrantsInstanceResourcePolicyResult {
  Policy?: string;
  Organization?: string;
  CreatedAt?: Date;
}
export interface PutAccessPointConfigurationForObjectLambdaRequest {
  AccountId: string;
  Name: string;
  Configuration: ObjectLambdaConfiguration;
}
export interface PutAccessPointConfigurationForObjectLambdaResponse {}
export interface PutAccessPointPolicyRequest {
  AccountId: string;
  Name: string;
  Policy: string;
}
export interface PutAccessPointPolicyResponse {}
export interface PutAccessPointPolicyForObjectLambdaRequest {
  AccountId: string;
  Name: string;
  Policy: string;
}
export interface PutAccessPointPolicyForObjectLambdaResponse {}
export interface PutAccessPointScopeRequest {
  AccountId: string;
  Name: string;
  Scope: Scope;
}
export interface PutAccessPointScopeResponse {}
export interface LifecycleConfiguration {
  Rules?: LifecycleRule[];
}
export interface PutBucketLifecycleConfigurationRequest {
  AccountId: string;
  Bucket: string;
  LifecycleConfiguration?: LifecycleConfiguration;
}
export interface PutBucketLifecycleConfigurationResponse {}
export type ConfirmRemoveSelfBucketAccess = boolean;
export interface PutBucketPolicyRequest {
  AccountId: string;
  Bucket: string;
  ConfirmRemoveSelfBucketAccess?: boolean;
  Policy: string;
}
export interface PutBucketPolicyResponse {}
export interface PutBucketReplicationRequest {
  AccountId: string;
  Bucket: string;
  ReplicationConfiguration: ReplicationConfiguration;
}
export interface PutBucketReplicationResponse {}
export interface Tagging {
  TagSet: S3Tag[];
}
export interface PutBucketTaggingRequest {
  AccountId: string;
  Bucket: string;
  Tagging: Tagging;
}
export interface PutBucketTaggingResponse {}
export type MFA = string;
export type MFADelete = "Enabled" | "Disabled" | (string & {});
export interface VersioningConfiguration {
  MFADelete?: MFADelete;
  Status?: BucketVersioningStatus;
}
export interface PutBucketVersioningRequest {
  AccountId: string;
  Bucket: string;
  MFA?: string;
  VersioningConfiguration: VersioningConfiguration;
}
export interface PutBucketVersioningResponse {}
export interface PutJobTaggingRequest {
  AccountId: string;
  JobId: string;
  Tags: S3Tag[];
}
export interface PutJobTaggingResult {}
export interface PutMultiRegionAccessPointPolicyRequest {
  AccountId: string;
  ClientToken: string;
  Details: PutMultiRegionAccessPointPolicyInput;
}
export interface PutMultiRegionAccessPointPolicyResult {
  RequestTokenARN?: string;
}
export interface PutPublicAccessBlockRequest {
  PublicAccessBlockConfiguration: PublicAccessBlockConfiguration;
  AccountId: string;
}
export interface PutPublicAccessBlockResponse {}
export interface PutStorageLensConfigurationRequest {
  ConfigId: string;
  AccountId: string;
  StorageLensConfiguration: StorageLensConfiguration;
  Tags?: StorageLensTag[];
}
export interface PutStorageLensConfigurationResponse {}
export interface PutStorageLensConfigurationTaggingRequest {
  ConfigId: string;
  AccountId: string;
  Tags: StorageLensTag[];
}
export interface PutStorageLensConfigurationTaggingResult {}
export interface SubmitMultiRegionAccessPointRoutesRequest {
  AccountId: string;
  Mrap: string;
  RouteUpdates: MultiRegionAccessPointRoute[];
}
export interface SubmitMultiRegionAccessPointRoutesResult {}
export interface TagResourceRequest {
  AccountId: string;
  ResourceArn: string;
  Tags: Tag[];
}
export interface TagResourceResult {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  AccountId: string;
  ResourceArn: string;
  TagKeys: string[];
}
export interface UntagResourceResult {}
export interface UpdateAccessGrantsLocationRequest {
  AccountId: string;
  AccessGrantsLocationId: string;
  IAMRoleArn: string;
}
export interface UpdateAccessGrantsLocationResult {
  CreatedAt?: Date;
  AccessGrantsLocationId?: string;
  AccessGrantsLocationArn?: string;
  LocationScope?: string;
  IAMRoleArn?: string;
}
export interface UpdateJobPriorityRequest {
  AccountId: string;
  JobId: string;
  Priority: number;
}
export interface UpdateJobPriorityResult {
  JobId: string;
  Priority: number;
}
export type RequestedJobStatus = "Cancelled" | "Ready" | (string & {});
export interface UpdateJobStatusRequest {
  AccountId: string;
  JobId: string;
  RequestedJobStatus: RequestedJobStatus;
  StatusUpdateReason?: string;
}
export interface UpdateJobStatusResult {
  JobId?: string;
  Status?: JobStatus;
  StatusUpdateReason?: string;
}
export interface UpdateStorageLensGroupRequest {
  Name: string;
  AccountId: string;
  StorageLensGroup: StorageLensGroup;
}
export interface UpdateStorageLensGroupResponse {}
export type ExceptionMessage = string;
export type NoSuchPublicAccessBlockConfigurationMessage = string;
export type AssociateAccessGrantsIdentityCenterError = CommonErrors;
/**
 * Associate your S3 Access Grants instance with an Amazon Web Services IAM Identity Center instance. Use this action if you want to create access grants for users or groups from your corporate identity directory. First, you must add your corporate identity directory to Amazon Web Services IAM Identity Center. Then, you can associate this IAM Identity Center instance with your S3 Access Grants instance.
 *
 * ### Permissions
 *
 * You must have the `s3:AssociateAccessGrantsIdentityCenter` permission to use this operation.
 *
 * ### Additional Permissions
 *
 * You must also have the following permissions: `sso:CreateApplication`, `sso:PutApplicationGrant`, and `sso:PutApplicationAuthenticationMethod`.
 */
export const associateAccessGrantsIdentityCenter: API.OperationMethod<
  AssociateAccessGrantsIdentityCenterRequest,
  AssociateAccessGrantsIdentityCenterResponse,
  AssociateAccessGrantsIdentityCenterError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(608, __c19, 0) as any as S.Schema<AssociateAccessGrantsIdentityCenterRequest>,
  output: __S(609, __c19, 1) as any as S.Schema<AssociateAccessGrantsIdentityCenterResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateAccessGrantsIdentityCenter",
  endpointHostPrefix: "{AccountId}.",
}));

export type CreateAccessGrantError = CommonErrors;
/**
 * Creates an access grant that gives a grantee access to your S3 data. The grantee can be an IAM user or role or a directory user, or group. Before you can create a grant, you must have an S3 Access Grants instance in the same Region as the S3 data. You can create an S3 Access Grants instance using the CreateAccessGrantsInstance. You must also have registered at least one S3 data location in your S3 Access Grants instance using CreateAccessGrantsLocation.
 *
 * ### Permissions
 *
 * You must have the `s3:CreateAccessGrant` permission to use this operation.
 *
 * ### Additional Permissions
 *
 * For any directory identity - `sso:DescribeInstance` and `sso:DescribeApplication`
 *
 * For directory users - `identitystore:DescribeUser`
 *
 * For directory groups - `identitystore:DescribeGroup`
 */
export const createAccessGrant: API.OperationMethod<
  CreateAccessGrantRequest,
  CreateAccessGrantResult,
  CreateAccessGrantError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(672, __c21, 0) as any as S.Schema<CreateAccessGrantRequest>,
  output: __S(673, __c21, 1) as any as S.Schema<CreateAccessGrantResult>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAccessGrant",
  endpointHostPrefix: "{AccountId}.",
}));

export type CreateAccessGrantsInstanceError = CommonErrors;
/**
 * Creates an S3 Access Grants instance, which serves as a logical grouping for access grants. You can create one S3 Access Grants instance per Region per account.
 *
 * ### Permissions
 *
 * You must have the `s3:CreateAccessGrantsInstance` permission to use this operation.
 *
 * ### Additional Permissions
 *
 * To associate an IAM Identity Center instance with your S3 Access Grants instance, you must also have the `sso:DescribeInstance`, `sso:CreateApplication`, `sso:PutApplicationGrant`, and `sso:PutApplicationAuthenticationMethod` permissions.
 */
export const createAccessGrantsInstance: API.OperationMethod<
  CreateAccessGrantsInstanceRequest,
  CreateAccessGrantsInstanceResult,
  CreateAccessGrantsInstanceError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(800, __c25, 0) as any as S.Schema<CreateAccessGrantsInstanceRequest>,
  output: __S(801, __c25, 1) as any as S.Schema<CreateAccessGrantsInstanceResult>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAccessGrantsInstance",
  endpointHostPrefix: "{AccountId}.",
}));

export type CreateAccessGrantsLocationError = CommonErrors;
/**
 * The S3 data location that you would like to register in your S3 Access Grants instance. Your S3 data must be in the same Region as your S3 Access Grants instance. The location can be one of the following:
 *
 * - The default S3 location `s3://`
 *
 * - A bucket - `S3://`
 *
 * - A bucket and prefix - `S3:///`
 *
 * When you register a location, you must include the IAM role that has permission to manage the S3 location that you are registering. Give S3 Access Grants permission to assume this role using a policy. S3 Access Grants assumes this role to manage access to the location and to vend temporary credentials to grantees or client applications.
 *
 * ### Permissions
 *
 * You must have the `s3:CreateAccessGrantsLocation` permission to use this operation.
 *
 * ### Additional Permissions
 *
 * You must also have the following permission for the specified IAM role: `iam:PassRole`
 */
export const createAccessGrantsLocation: API.OperationMethod<
  CreateAccessGrantsLocationRequest,
  CreateAccessGrantsLocationResult,
  CreateAccessGrantsLocationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(832, __c26, 0) as any as S.Schema<CreateAccessGrantsLocationRequest>,
  output: __S(833, __c26, 1) as any as S.Schema<CreateAccessGrantsLocationResult>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAccessGrantsLocation",
  endpointHostPrefix: "{AccountId}.",
}));

export type CreateAccessPointError = AccessPointAlreadyOwnedByYou | InvalidRequest | CommonErrors;
/**
 * Creates an access point and associates it to a specified bucket. For more information, see
 * Managing
 * access to shared datasets with access points or Managing access to
 * shared datasets in directory buckets with access points in the
 * *Amazon S3 User Guide*.
 *
 * To create an access point and attach it to a volume on an Amazon FSx file system, see CreateAndAttachS3AccessPoint in the Amazon FSx API
 * Reference.
 *
 * S3 on Outposts only supports VPC-style access points.
 *
 * For more information, see Accessing Amazon S3 on Outposts using
 * virtual private cloud (VPC) only access points in the
 * *Amazon S3 User Guide*.
 *
 * All Amazon S3 on Outposts REST API requests for this action require an additional parameter of `x-amz-outpost-id` to be passed with the request. In addition, you must use an S3 on Outposts endpoint hostname prefix instead of `s3-control`. For an example of the request syntax for Amazon S3 on Outposts that uses the S3 on Outposts endpoint hostname prefix and the `x-amz-outpost-id` derived by using the access point ARN, see the Examples section.
 *
 * The following actions are related to `CreateAccessPoint`:
 *
 * - GetAccessPoint
 *
 * - DeleteAccessPoint
 *
 * - ListAccessPoints
 *
 * - ListAccessPointsForDirectoryBuckets
 */
export const createAccessPoint: API.OperationMethod<
  CreateAccessPointRequest,
  CreateAccessPointResult,
  CreateAccessPointError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(864, __c27, 0) as any as S.Schema<CreateAccessPointRequest>,
  output: __S(865, __c27, 1) as any as S.Schema<CreateAccessPointResult>,
  errors: [AccessPointAlreadyOwnedByYou, InvalidRequest],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAccessPoint",
  endpointHostPrefix: "{AccountId}.",
}));

export type CreateAccessPointForObjectLambdaError =
  | AccessPointAlreadyOwnedByYou
  | InvalidRequest
  | NoSuchAccessPoint
  | ObjectLambdaNotAvailable
  | CommonErrors;
/**
 * This operation is not supported by directory buckets.
 *
 * Creates an Object Lambda Access Point. For more information, see Transforming objects with
 * Object Lambda Access Points in the *Amazon S3 User Guide*.
 *
 * The following actions are related to
 * `CreateAccessPointForObjectLambda`:
 *
 * - DeleteAccessPointForObjectLambda
 *
 * - GetAccessPointForObjectLambda
 *
 * - ListAccessPointsForObjectLambda
 */
export const createAccessPointForObjectLambda: API.OperationMethod<
  CreateAccessPointForObjectLambdaRequest,
  CreateAccessPointForObjectLambdaResult,
  CreateAccessPointForObjectLambdaError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(992, __c31, 0) as any as S.Schema<CreateAccessPointForObjectLambdaRequest>,
  output: __S(993, __c31, 1) as any as S.Schema<CreateAccessPointForObjectLambdaResult>,
  errors: [
    AccessPointAlreadyOwnedByYou,
    InvalidRequest,
    NoSuchAccessPoint,
    ObjectLambdaNotAvailable,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAccessPointForObjectLambda",
  endpointHostPrefix: "{AccountId}.",
}));

export type CreateBucketError = BucketAlreadyExists | BucketAlreadyOwnedByYou | CommonErrors;
/**
 * This action creates an Amazon S3 on Outposts bucket. To create an S3 bucket, see Create
 * Bucket in the *Amazon S3 API Reference*.
 *
 * Creates a new Outposts bucket. By creating the bucket, you become the bucket owner. To
 * create an Outposts bucket, you must have S3 on Outposts. For more information, see Using
 * Amazon S3 on Outposts in *Amazon S3 User Guide*.
 *
 * Not every string is an acceptable bucket name. For information on bucket naming
 * restrictions, see Working with
 * Amazon S3 Buckets.
 *
 * S3 on Outposts buckets support:
 *
 * - Tags
 *
 * - LifecycleConfigurations for deleting expired objects
 *
 * For a complete list of restrictions and Amazon S3 feature limitations on S3 on Outposts, see
 *
 * Amazon S3 on Outposts Restrictions and Limitations.
 *
 * For an example of the request syntax for Amazon S3 on Outposts that uses the S3 on Outposts
 * endpoint hostname prefix and `x-amz-outpost-id` in your API request, see the
 * Examples section.
 *
 * The following actions are related to `CreateBucket` for
 * Amazon S3 on Outposts:
 *
 * - PutObject
 *
 * - GetBucket
 *
 * - DeleteBucket
 *
 * - CreateAccessPoint
 *
 * - PutAccessPointPolicy
 */
export const createBucket: API.OperationMethod<
  CreateBucketRequest,
  CreateBucketResult,
  CreateBucketError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1089, __c34, 1) as any as S.Schema<CreateBucketRequest>,
  output: __S(1090, __c34, 2) as any as S.Schema<CreateBucketResult>,
  errors: [BucketAlreadyExists, BucketAlreadyOwnedByYou],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBucket",
}));

export type CreateJobError =
  | BadRequestException
  | IdempotencyException
  | InternalServiceException
  | TooManyRequestsException
  | InvalidRequest
  | CommonErrors;
/**
 * This operation creates an S3 Batch Operations job.
 *
 * You can use S3 Batch Operations to perform large-scale batch actions on Amazon S3 objects.
 * Batch Operations can run a single action on lists of Amazon S3 objects that you specify. For more
 * information, see S3 Batch Operations in the *Amazon S3 User Guide*.
 *
 * ### Permissions
 *
 * For information about permissions required to use the Batch Operations, see Granting permissions for S3 Batch Operations in the Amazon S3
 * User Guide.
 *
 * Related actions include:
 *
 * - DescribeJob
 *
 * - ListJobs
 *
 * - UpdateJobPriority
 *
 * - UpdateJobStatus
 *
 * - JobOperation
 */
export const createJob: API.OperationMethod<
  CreateJobRequest,
  CreateJobResult,
  CreateJobError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1120, __c35, 0) as any as S.Schema<CreateJobRequest>,
  output: __S(1121, __c35, 1) as any as S.Schema<CreateJobResult>,
  errors: [
    BadRequestException,
    IdempotencyException,
    InternalServiceException,
    TooManyRequestsException,
    InvalidRequest,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateJob",
  endpointHostPrefix: "{AccountId}.",
}));

export type CreateMultiRegionAccessPointError = InvalidRequest | CommonErrors;
/**
 * This operation is not supported by directory buckets.
 *
 * Creates a Multi-Region Access Point and associates it with the specified buckets. For more information
 * about creating Multi-Region Access Points, see Creating Multi-Region Access Points in the *Amazon S3 User Guide*.
 *
 * This action will always be routed to the US West (Oregon) Region. For more information
 * about the restrictions around working with Multi-Region Access Points, see Multi-Region Access Point
 * restrictions and limitations in the *Amazon S3 User Guide*.
 *
 * This request is asynchronous, meaning that you might receive a response before the
 * command has completed. When this request provides a response, it provides a token that you
 * can use to monitor the status of the request with
 * `DescribeMultiRegionAccessPointOperation`.
 *
 * The following actions are related to `CreateMultiRegionAccessPoint`:
 *
 * - DeleteMultiRegionAccessPoint
 *
 * - DescribeMultiRegionAccessPointOperation
 *
 * - GetMultiRegionAccessPoint
 *
 * - ListMultiRegionAccessPoints
 */
export const createMultiRegionAccessPoint: API.OperationMethod<
  CreateMultiRegionAccessPointRequest,
  CreateMultiRegionAccessPointResult,
  CreateMultiRegionAccessPointError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1280, __c40, 0) as any as S.Schema<CreateMultiRegionAccessPointRequest>,
  output: __S(1281, __c40, 1) as any as S.Schema<CreateMultiRegionAccessPointResult>,
  errors: [InvalidRequest],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMultiRegionAccessPoint",
  endpointHostPrefix: "{AccountId}.",
}));

export type CreateStorageLensGroupError = CommonErrors;
/**
 * Creates a new S3 Storage Lens group and associates it with the specified Amazon Web Services account ID. An
 * S3 Storage Lens group is a custom grouping of objects based on prefix, suffix, object tags,
 * object size, object age, or a combination of these filters. For each Storage Lens group
 * that you've created, you can also optionally add Amazon Web Services resource tags. For more information
 * about S3 Storage Lens groups, see Working with S3 Storage Lens
 * groups.
 *
 * To use this operation, you must have the permission to perform the
 * `s3:CreateStorageLensGroup` action. If you're trying to create a Storage Lens
 * group with Amazon Web Services resource tags, you must also have permission to perform the
 * `s3:TagResource` action. For more information about the required Storage Lens
 * Groups permissions, see Setting account permissions to use S3 Storage Lens groups.
 *
 * For information about Storage Lens groups errors, see List of Amazon S3 Storage
 * Lens error codes.
 */
export const createStorageLensGroup: API.OperationMethod<
  CreateStorageLensGroupRequest,
  CreateStorageLensGroupResponse,
  CreateStorageLensGroupError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1344, __c42, 0) as any as S.Schema<CreateStorageLensGroupRequest>,
  output: __S(1345, __c42, 1) as any as S.Schema<CreateStorageLensGroupResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateStorageLensGroup",
  endpointHostPrefix: "{AccountId}.",
}));

export type DeleteAccessGrantError = CommonErrors;
/**
 * Deletes the access grant from the S3 Access Grants instance. You cannot undo an access grant deletion and the grantee will no longer have access to the S3 data.
 *
 * ### Permissions
 *
 * You must have the `s3:DeleteAccessGrant` permission to use this operation.
 */
export const deleteAccessGrant: API.OperationMethod<
  DeleteAccessGrantRequest,
  DeleteAccessGrantResponse,
  DeleteAccessGrantError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1408, __c44, 0) as any as S.Schema<DeleteAccessGrantRequest>,
  output: __S(1409, __c44, 1) as any as S.Schema<DeleteAccessGrantResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccessGrant",
  endpointHostPrefix: "{AccountId}.",
}));

export type DeleteAccessGrantsInstanceError = CommonErrors;
/**
 * Deletes your S3 Access Grants instance. You must first delete the access grants and locations before S3 Access Grants can delete the instance. See DeleteAccessGrant and DeleteAccessGrantsLocation. If you have associated an IAM Identity Center instance with your S3 Access Grants instance, you must first dissassociate the Identity Center instance from the S3 Access Grants instance before you can delete the S3 Access Grants instance. See AssociateAccessGrantsIdentityCenter and DissociateAccessGrantsIdentityCenter.
 *
 * ### Permissions
 *
 * You must have the `s3:DeleteAccessGrantsInstance` permission to use this operation.
 */
export const deleteAccessGrantsInstance: API.OperationMethod<
  DeleteAccessGrantsInstanceRequest,
  DeleteAccessGrantsInstanceResponse,
  DeleteAccessGrantsInstanceError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1440, __c45, 0) as any as S.Schema<DeleteAccessGrantsInstanceRequest>,
  output: __S(1441, __c45, 1) as any as S.Schema<DeleteAccessGrantsInstanceResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccessGrantsInstance",
  endpointHostPrefix: "{AccountId}.",
}));

export type DeleteAccessGrantsInstanceResourcePolicyError = CommonErrors;
/**
 * Deletes the resource policy of the S3 Access Grants instance. The resource policy is used to manage cross-account access to your S3 Access Grants instance. By deleting the resource policy, you delete any cross-account permissions to your S3 Access Grants instance.
 *
 * ### Permissions
 *
 * You must have the `s3:DeleteAccessGrantsInstanceResourcePolicy` permission to use this operation.
 */
export const deleteAccessGrantsInstanceResourcePolicy: API.OperationMethod<
  DeleteAccessGrantsInstanceResourcePolicyRequest,
  DeleteAccessGrantsInstanceResourcePolicyResponse,
  DeleteAccessGrantsInstanceResourcePolicyError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1472, __c46, 0) as any as S.Schema<DeleteAccessGrantsInstanceResourcePolicyRequest>,
  output: __S(1473, __c46, 1) as any as S.Schema<DeleteAccessGrantsInstanceResourcePolicyResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccessGrantsInstanceResourcePolicy",
  endpointHostPrefix: "{AccountId}.",
}));

export type DeleteAccessGrantsLocationError = CommonErrors;
/**
 * Deregisters a location from your S3 Access Grants instance. You can only delete a location registration from an S3 Access Grants instance if there are no grants associated with this location. See Delete a grant for information on how to delete grants. You need to have at least one registered location in your S3 Access Grants instance in order to create access grants.
 *
 * ### Permissions
 *
 * You must have the `s3:DeleteAccessGrantsLocation` permission to use this operation.
 */
export const deleteAccessGrantsLocation: API.OperationMethod<
  DeleteAccessGrantsLocationRequest,
  DeleteAccessGrantsLocationResponse,
  DeleteAccessGrantsLocationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1504, __c47, 0) as any as S.Schema<DeleteAccessGrantsLocationRequest>,
  output: __S(1505, __c47, 1) as any as S.Schema<DeleteAccessGrantsLocationResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccessGrantsLocation",
  endpointHostPrefix: "{AccountId}.",
}));

export type DeleteAccessPointError = NoSuchAccessPoint | CommonErrors;
/**
 * Deletes the specified access point.
 *
 * All Amazon S3 on Outposts REST API requests for this action require an additional parameter of `x-amz-outpost-id` to be passed with the request. In addition, you must use an S3 on Outposts endpoint hostname prefix instead of `s3-control`. For an example of the request syntax for Amazon S3 on Outposts that uses the S3 on Outposts endpoint hostname prefix and the `x-amz-outpost-id` derived by using the access point ARN, see the Examples section.
 *
 * The following actions are related to `DeleteAccessPoint`:
 *
 * - CreateAccessPoint
 *
 * - GetAccessPoint
 *
 * - ListAccessPoints
 */
export const deleteAccessPoint: API.OperationMethod<
  DeleteAccessPointRequest,
  DeleteAccessPointResponse,
  DeleteAccessPointError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1536, __c48, 0) as any as S.Schema<DeleteAccessPointRequest>,
  output: __S(1537, __c48, 1) as any as S.Schema<DeleteAccessPointResponse>,
  errors: [NoSuchAccessPoint],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccessPoint",
  endpointHostPrefix: "{AccountId}.",
}));

export type DeleteAccessPointForObjectLambdaError = NoSuchAccessPoint | CommonErrors;
/**
 * This operation is not supported by directory buckets.
 *
 * Deletes the specified Object Lambda Access Point.
 *
 * The following actions are related to
 * `DeleteAccessPointForObjectLambda`:
 *
 * - CreateAccessPointForObjectLambda
 *
 * - GetAccessPointForObjectLambda
 *
 * - ListAccessPointsForObjectLambda
 */
export const deleteAccessPointForObjectLambda: API.OperationMethod<
  DeleteAccessPointForObjectLambdaRequest,
  DeleteAccessPointForObjectLambdaResponse,
  DeleteAccessPointForObjectLambdaError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1568, __c49, 0) as any as S.Schema<DeleteAccessPointForObjectLambdaRequest>,
  output: __S(1569, __c49, 1) as any as S.Schema<DeleteAccessPointForObjectLambdaResponse>,
  errors: [NoSuchAccessPoint],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccessPointForObjectLambda",
  endpointHostPrefix: "{AccountId}.",
}));

export type DeleteAccessPointPolicyError =
  | NoSuchAccessPoint
  | NoSuchAccessPointPolicy
  | CommonErrors;
/**
 * Deletes the access point policy for the specified access point.
 *
 * All Amazon S3 on Outposts REST API requests for this action require an additional parameter of `x-amz-outpost-id` to be passed with the request. In addition, you must use an S3 on Outposts endpoint hostname prefix instead of `s3-control`. For an example of the request syntax for Amazon S3 on Outposts that uses the S3 on Outposts endpoint hostname prefix and the `x-amz-outpost-id` derived by using the access point ARN, see the Examples section.
 *
 * The following actions are related to `DeleteAccessPointPolicy`:
 *
 * - PutAccessPointPolicy
 *
 * - GetAccessPointPolicy
 */
export const deleteAccessPointPolicy: API.OperationMethod<
  DeleteAccessPointPolicyRequest,
  DeleteAccessPointPolicyResponse,
  DeleteAccessPointPolicyError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1600, __c50, 0) as any as S.Schema<DeleteAccessPointPolicyRequest>,
  output: __S(1601, __c50, 1) as any as S.Schema<DeleteAccessPointPolicyResponse>,
  errors: [NoSuchAccessPoint, NoSuchAccessPointPolicy],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccessPointPolicy",
  endpointHostPrefix: "{AccountId}.",
}));

export type DeleteAccessPointPolicyForObjectLambdaError =
  | NoSuchAccessPoint
  | NoSuchAccessPointPolicy
  | CommonErrors;
/**
 * This operation is not supported by directory buckets.
 *
 * Removes the resource policy for an Object Lambda Access Point.
 *
 * The following actions are related to
 * `DeleteAccessPointPolicyForObjectLambda`:
 *
 * - GetAccessPointPolicyForObjectLambda
 *
 * - PutAccessPointPolicyForObjectLambda
 */
export const deleteAccessPointPolicyForObjectLambda: API.OperationMethod<
  DeleteAccessPointPolicyForObjectLambdaRequest,
  DeleteAccessPointPolicyForObjectLambdaResponse,
  DeleteAccessPointPolicyForObjectLambdaError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1632, __c51, 0) as any as S.Schema<DeleteAccessPointPolicyForObjectLambdaRequest>,
  output: __S(1633, __c51, 1) as any as S.Schema<DeleteAccessPointPolicyForObjectLambdaResponse>,
  errors: [NoSuchAccessPoint, NoSuchAccessPointPolicy],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccessPointPolicyForObjectLambda",
  endpointHostPrefix: "{AccountId}.",
}));

export type DeleteAccessPointScopeError = CommonErrors;
/**
 * Deletes an existing access point scope for a directory bucket.
 *
 * When you delete the scope of an access point, all prefixes and permissions are deleted.
 *
 * To use this operation, you must have the permission to perform the
 * `s3express:DeleteAccessPointScope` action.
 *
 * For information about REST API errors, see REST error responses.
 */
export const deleteAccessPointScope: API.OperationMethod<
  DeleteAccessPointScopeRequest,
  DeleteAccessPointScopeResponse,
  DeleteAccessPointScopeError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1664, __c52, 0) as any as S.Schema<DeleteAccessPointScopeRequest>,
  output: __S(1665, __c52, 1) as any as S.Schema<DeleteAccessPointScopeResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccessPointScope",
}));

export type DeleteBucketError = CommonErrors;
/**
 * This action deletes an Amazon S3 on Outposts bucket. To delete an S3 bucket, see DeleteBucket in the *Amazon S3 API Reference*.
 *
 * Deletes the Amazon S3 on Outposts bucket. All objects (including all object versions and
 * delete markers) in the bucket must be deleted before the bucket itself can be deleted. For
 * more information, see Using Amazon S3 on Outposts in
 * *Amazon S3 User Guide*.
 *
 * All Amazon S3 on Outposts REST API requests for this action require an additional parameter of `x-amz-outpost-id` to be passed with the request. In addition, you must use an S3 on Outposts endpoint hostname prefix instead of `s3-control`. For an example of the request syntax for Amazon S3 on Outposts that uses the S3 on Outposts endpoint hostname prefix and the `x-amz-outpost-id` derived by using the access point ARN, see the Examples section.
 *
 * **Related Resources**
 *
 * - CreateBucket
 *
 * - GetBucket
 *
 * - DeleteObject
 */
export const deleteBucket: API.OperationMethod<
  DeleteBucketRequest,
  DeleteBucketResponse,
  DeleteBucketError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1696, __c53, 0) as any as S.Schema<DeleteBucketRequest>,
  output: __S(1697, __c53, 1) as any as S.Schema<DeleteBucketResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBucket",
  endpointHostPrefix: "{AccountId}.",
}));

export type DeleteBucketLifecycleConfigurationError = CommonErrors;
/**
 * This action deletes an Amazon S3 on Outposts bucket's lifecycle configuration. To delete
 * an S3 bucket's lifecycle configuration, see DeleteBucketLifecycle in the *Amazon S3 API Reference*.
 *
 * Deletes the lifecycle configuration from the specified Outposts bucket.
 * Amazon S3 on Outposts removes all the lifecycle configuration rules in the lifecycle subresource
 * associated with the bucket. Your objects never expire, and Amazon S3 on Outposts no longer
 * automatically deletes any objects on the basis of rules contained in the deleted lifecycle
 * configuration. For more information, see Using Amazon S3 on Outposts in
 * *Amazon S3 User Guide*.
 *
 * To use this operation, you must have permission to perform the
 * `s3-outposts:PutLifecycleConfiguration` action. By default, the bucket owner
 * has this permission and the Outposts bucket owner can grant this permission to
 * others.
 *
 * All Amazon S3 on Outposts REST API requests for this action require an additional parameter of `x-amz-outpost-id` to be passed with the request. In addition, you must use an S3 on Outposts endpoint hostname prefix instead of `s3-control`. For an example of the request syntax for Amazon S3 on Outposts that uses the S3 on Outposts endpoint hostname prefix and the `x-amz-outpost-id` derived by using the access point ARN, see the Examples section.
 *
 * For more information about object expiration, see Elements to Describe Lifecycle Actions.
 *
 * Related actions include:
 *
 * - PutBucketLifecycleConfiguration
 *
 * - GetBucketLifecycleConfiguration
 */
export const deleteBucketLifecycleConfiguration: API.OperationMethod<
  DeleteBucketLifecycleConfigurationRequest,
  DeleteBucketLifecycleConfigurationResponse,
  DeleteBucketLifecycleConfigurationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1728, __c54, 0) as any as S.Schema<DeleteBucketLifecycleConfigurationRequest>,
  output: __S(1729, __c54, 1) as any as S.Schema<DeleteBucketLifecycleConfigurationResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBucketLifecycleConfiguration",
  endpointHostPrefix: "{AccountId}.",
}));

export type DeleteBucketPolicyError = CommonErrors;
/**
 * This action deletes an Amazon S3 on Outposts bucket policy. To delete an S3 bucket policy,
 * see DeleteBucketPolicy in the *Amazon S3 API Reference*.
 *
 * This implementation of the DELETE action uses the policy subresource to delete the
 * policy of a specified Amazon S3 on Outposts bucket. If you are using an identity other than the
 * root user of the Amazon Web Services account that owns the bucket, the calling identity must have the
 * `s3-outposts:DeleteBucketPolicy` permissions on the specified Outposts bucket
 * and belong to the bucket owner's account to use this action. For more information, see
 * Using
 * Amazon S3 on Outposts in *Amazon S3 User Guide*.
 *
 * If you don't have `DeleteBucketPolicy` permissions, Amazon S3 returns a 403
 * Access Denied error. If you have the correct permissions, but you're not using an
 * identity that belongs to the bucket owner's account, Amazon S3 returns a 405 Method Not
 * Allowed error.
 *
 * As a security precaution, the root user of the Amazon Web Services account that owns a bucket can
 * always use this action, even if the policy explicitly denies the root user the ability
 * to perform this action.
 *
 * For more information about bucket policies, see Using Bucket Policies and User
 * Policies.
 *
 * All Amazon S3 on Outposts REST API requests for this action require an additional parameter of `x-amz-outpost-id` to be passed with the request. In addition, you must use an S3 on Outposts endpoint hostname prefix instead of `s3-control`. For an example of the request syntax for Amazon S3 on Outposts that uses the S3 on Outposts endpoint hostname prefix and the `x-amz-outpost-id` derived by using the access point ARN, see the Examples section.
 *
 * The following actions are related to `DeleteBucketPolicy`:
 *
 * - GetBucketPolicy
 *
 * - PutBucketPolicy
 */
export const deleteBucketPolicy: API.OperationMethod<
  DeleteBucketPolicyRequest,
  DeleteBucketPolicyResponse,
  DeleteBucketPolicyError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1760, __c55, 0) as any as S.Schema<DeleteBucketPolicyRequest>,
  output: __S(1761, __c55, 1) as any as S.Schema<DeleteBucketPolicyResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBucketPolicy",
  endpointHostPrefix: "{AccountId}.",
}));

export type DeleteBucketReplicationError = CommonErrors;
/**
 * This operation deletes an Amazon S3 on Outposts bucket's replication configuration. To
 * delete an S3 bucket's replication configuration, see DeleteBucketReplication in the *Amazon S3 API Reference*.
 *
 * Deletes the replication configuration from the specified S3 on Outposts bucket.
 *
 * To use this operation, you must have permissions to perform the
 * `s3-outposts:PutReplicationConfiguration` action. The Outposts bucket owner
 * has this permission by default and can grant it to others. For more information about
 * permissions, see Setting up IAM with
 * S3 on Outposts and Managing access to
 * S3 on Outposts buckets in the *Amazon S3 User Guide*.
 *
 * It can take a while to propagate `PUT` or `DELETE` requests for
 * a replication configuration to all S3 on Outposts systems. Therefore, the replication
 * configuration that's returned by a `GET` request soon after a
 * `PUT` or `DELETE` request might return a more recent result
 * than what's on the Outpost. If an Outpost is offline, the delay in updating the
 * replication configuration on that Outpost can be significant.
 *
 * All Amazon S3 on Outposts REST API requests for this action require an additional parameter of `x-amz-outpost-id` to be passed with the request. In addition, you must use an S3 on Outposts endpoint hostname prefix instead of `s3-control`. For an example of the request syntax for Amazon S3 on Outposts that uses the S3 on Outposts endpoint hostname prefix and the `x-amz-outpost-id` derived by using the access point ARN, see the Examples section.
 *
 * For information about S3 replication on Outposts configuration, see Replicating objects for S3 on Outposts in the
 * *Amazon S3 User Guide*.
 *
 * The following operations are related to `DeleteBucketReplication`:
 *
 * - PutBucketReplication
 *
 * - GetBucketReplication
 */
export const deleteBucketReplication: API.OperationMethod<
  DeleteBucketReplicationRequest,
  DeleteBucketReplicationResponse,
  DeleteBucketReplicationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1792, __c56, 0) as any as S.Schema<DeleteBucketReplicationRequest>,
  output: __S(1793, __c56, 1) as any as S.Schema<DeleteBucketReplicationResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBucketReplication",
  endpointHostPrefix: "{AccountId}.",
}));

export type DeleteBucketTaggingError = CommonErrors;
/**
 * This action deletes an Amazon S3 on Outposts bucket's tags. To delete an S3 bucket tags,
 * see DeleteBucketTagging in the *Amazon S3 API Reference*.
 *
 * Deletes the tags from the Outposts bucket. For more information, see Using
 * Amazon S3 on Outposts in *Amazon S3 User Guide*.
 *
 * To use this action, you must have permission to perform the
 * `PutBucketTagging` action. By default, the bucket owner has this permission
 * and can grant this permission to others.
 *
 * All Amazon S3 on Outposts REST API requests for this action require an additional parameter of `x-amz-outpost-id` to be passed with the request. In addition, you must use an S3 on Outposts endpoint hostname prefix instead of `s3-control`. For an example of the request syntax for Amazon S3 on Outposts that uses the S3 on Outposts endpoint hostname prefix and the `x-amz-outpost-id` derived by using the access point ARN, see the Examples section.
 *
 * The following actions are related to `DeleteBucketTagging`:
 *
 * - GetBucketTagging
 *
 * - PutBucketTagging
 */
export const deleteBucketTagging: API.OperationMethod<
  DeleteBucketTaggingRequest,
  DeleteBucketTaggingResponse,
  DeleteBucketTaggingError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1824, __c57, 0) as any as S.Schema<DeleteBucketTaggingRequest>,
  output: __S(1825, __c57, 1) as any as S.Schema<DeleteBucketTaggingResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBucketTagging",
  endpointHostPrefix: "{AccountId}.",
}));

export type DeleteJobTaggingError =
  | InternalServiceException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Removes the entire tag set from the specified S3 Batch Operations job.
 *
 * ### Permissions
 *
 * To use the
 * `DeleteJobTagging` operation, you must have permission to
 * perform the `s3:DeleteJobTagging` action. For more information, see Controlling
 * access and labeling jobs using tags in the
 * *Amazon S3 User Guide*.
 *
 * Related actions include:
 *
 * - CreateJob
 *
 * - GetJobTagging
 *
 * - PutJobTagging
 */
export const deleteJobTagging: API.OperationMethod<
  DeleteJobTaggingRequest,
  DeleteJobTaggingResult,
  DeleteJobTaggingError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1856, __c58, 0) as any as S.Schema<DeleteJobTaggingRequest>,
  output: __S(1857, __c58, 1) as any as S.Schema<DeleteJobTaggingResult>,
  errors: [InternalServiceException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteJobTagging",
  endpointHostPrefix: "{AccountId}.",
}));

export type DeleteMultiRegionAccessPointError =
  | NoSuchMultiRegionAccessPoint
  | InvalidRequest
  | CommonErrors;
/**
 * This operation is not supported by directory buckets.
 *
 * Deletes a Multi-Region Access Point. This action does not delete the buckets associated with the Multi-Region Access Point,
 * only the Multi-Region Access Point itself.
 *
 * This action will always be routed to the US West (Oregon) Region. For more information
 * about the restrictions around working with Multi-Region Access Points, see Multi-Region Access Point
 * restrictions and limitations in the *Amazon S3 User Guide*.
 *
 * This request is asynchronous, meaning that you might receive a response before the
 * command has completed. When this request provides a response, it provides a token that you
 * can use to monitor the status of the request with
 * `DescribeMultiRegionAccessPointOperation`.
 *
 * The following actions are related to `DeleteMultiRegionAccessPoint`:
 *
 * - CreateMultiRegionAccessPoint
 *
 * - DescribeMultiRegionAccessPointOperation
 *
 * - GetMultiRegionAccessPoint
 *
 * - ListMultiRegionAccessPoints
 */
export const deleteMultiRegionAccessPoint: API.OperationMethod<
  DeleteMultiRegionAccessPointRequest,
  DeleteMultiRegionAccessPointResult,
  DeleteMultiRegionAccessPointError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1888, __c59, 0) as any as S.Schema<DeleteMultiRegionAccessPointRequest>,
  output: __S(1889, __c59, 1) as any as S.Schema<DeleteMultiRegionAccessPointResult>,
  errors: [NoSuchMultiRegionAccessPoint, InvalidRequest],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMultiRegionAccessPoint",
  endpointHostPrefix: "{AccountId}.",
}));

export type DeletePublicAccessBlockError = CommonErrors;
/**
 * This operation is not supported by directory buckets.
 *
 * Removes the `PublicAccessBlock` configuration for an Amazon Web Services account. This
 * operation might be restricted when the account is managed by organization-level Block
 * Public Access policies. You'll get an Access Denied (403) error when the account is managed
 * by organization-level Block Public Access policies. Organization-level policies override
 * account-level settings, preventing direct account-level modifications. For more
 * information, see Using Amazon S3 block
 * public access.
 *
 * Related actions include:
 *
 * - GetPublicAccessBlock
 *
 * - PutPublicAccessBlock
 */
export const deletePublicAccessBlock: API.OperationMethod<
  DeletePublicAccessBlockRequest,
  DeletePublicAccessBlockResponse,
  DeletePublicAccessBlockError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1952, __c61, 0) as any as S.Schema<DeletePublicAccessBlockRequest>,
  output: __S(1953, __c61, 1) as any as S.Schema<DeletePublicAccessBlockResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePublicAccessBlock",
  endpointHostPrefix: "{AccountId}.",
}));

export type DeleteStorageLensConfigurationError = NoSuchConfiguration | CommonErrors;
/**
 * This operation is not supported by directory buckets.
 *
 * Deletes the Amazon S3 Storage Lens configuration. For more information about S3 Storage Lens, see Assessing your storage
 * activity and usage with Amazon S3 Storage Lens in the
 * *Amazon S3 User Guide*.
 *
 * To use this action, you must have permission to perform the
 * `s3:DeleteStorageLensConfiguration` action. For more information, see
 * Setting permissions to
 * use Amazon S3 Storage Lens in the *Amazon S3 User Guide*.
 */
export const deleteStorageLensConfiguration: API.OperationMethod<
  DeleteStorageLensConfigurationRequest,
  DeleteStorageLensConfigurationResponse,
  DeleteStorageLensConfigurationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1984, __c62, 0) as any as S.Schema<DeleteStorageLensConfigurationRequest>,
  output: __S(1985, __c62, 1) as any as S.Schema<DeleteStorageLensConfigurationResponse>,
  errors: [NoSuchConfiguration],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteStorageLensConfiguration",
  endpointHostPrefix: "{AccountId}.",
}));

export type DeleteStorageLensConfigurationTaggingError = NoSuchConfiguration | CommonErrors;
/**
 * This operation is not supported by directory buckets.
 *
 * Deletes the Amazon S3 Storage Lens configuration tags. For more information about S3 Storage Lens, see
 * Assessing your
 * storage activity and usage with Amazon S3 Storage Lens in the
 * *Amazon S3 User Guide*.
 *
 * To use this action, you must have permission to perform the
 * `s3:DeleteStorageLensConfigurationTagging` action. For more information,
 * see Setting permissions to
 * use Amazon S3 Storage Lens in the *Amazon S3 User Guide*.
 */
export const deleteStorageLensConfigurationTagging: API.OperationMethod<
  DeleteStorageLensConfigurationTaggingRequest,
  DeleteStorageLensConfigurationTaggingResult,
  DeleteStorageLensConfigurationTaggingError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2016, __c63, 0) as any as S.Schema<DeleteStorageLensConfigurationTaggingRequest>,
  output: __S(2017, __c63, 1) as any as S.Schema<DeleteStorageLensConfigurationTaggingResult>,
  errors: [NoSuchConfiguration],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteStorageLensConfigurationTagging",
  endpointHostPrefix: "{AccountId}.",
}));

export type DeleteStorageLensGroupError = CommonErrors;
/**
 * Deletes an existing S3 Storage Lens group.
 *
 * To use this operation, you must have the permission to perform the
 * `s3:DeleteStorageLensGroup` action. For more information about the required Storage Lens
 * Groups permissions, see Setting account permissions to use S3 Storage Lens groups.
 *
 * For information about Storage Lens groups errors, see List of Amazon S3 Storage
 * Lens error codes.
 */
export const deleteStorageLensGroup: API.OperationMethod<
  DeleteStorageLensGroupRequest,
  DeleteStorageLensGroupResponse,
  DeleteStorageLensGroupError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2048, __c64, 0) as any as S.Schema<DeleteStorageLensGroupRequest>,
  output: __S(2049, __c64, 1) as any as S.Schema<DeleteStorageLensGroupResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteStorageLensGroup",
  endpointHostPrefix: "{AccountId}.",
}));

export type DescribeJobError =
  | BadRequestException
  | InternalServiceException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the configuration parameters and status for a Batch Operations job. For more
 * information, see S3 Batch Operations in the *Amazon S3 User Guide*.
 *
 * ### Permissions
 *
 * To use the `DescribeJob` operation, you must have permission to perform the `s3:DescribeJob` action.
 *
 * Related actions include:
 *
 * - CreateJob
 *
 * - ListJobs
 *
 * - UpdateJobPriority
 *
 * - UpdateJobStatus
 */
export const describeJob: API.OperationMethod<
  DescribeJobRequest,
  DescribeJobResult,
  DescribeJobError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2080, __c65, 0) as any as S.Schema<DescribeJobRequest>,
  output: __S(2085, __c65, 5) as any as S.Schema<DescribeJobResult>,
  errors: [
    BadRequestException,
    InternalServiceException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeJob",
  endpointHostPrefix: "{AccountId}.",
}));

export type DescribeMultiRegionAccessPointOperationError = InvalidRequest | CommonErrors;
/**
 * This operation is not supported by directory buckets.
 *
 * Retrieves the status of an asynchronous request to manage a Multi-Region Access Point. For more information
 * about managing Multi-Region Access Points and how asynchronous requests work, see Using Multi-Region Access Points in the *Amazon S3 User Guide*.
 *
 * The following actions are related to `GetMultiRegionAccessPoint`:
 *
 * - CreateMultiRegionAccessPoint
 *
 * - DeleteMultiRegionAccessPoint
 *
 * - GetMultiRegionAccessPoint
 *
 * - ListMultiRegionAccessPoints
 */
export const describeMultiRegionAccessPointOperation: API.OperationMethod<
  DescribeMultiRegionAccessPointOperationRequest,
  DescribeMultiRegionAccessPointOperationResult,
  DescribeMultiRegionAccessPointOperationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2144, __c67, 0) as any as S.Schema<DescribeMultiRegionAccessPointOperationRequest>,
  output: __S(2152, __c67, 8) as any as S.Schema<DescribeMultiRegionAccessPointOperationResult>,
  errors: [InvalidRequest],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMultiRegionAccessPointOperation",
  endpointHostPrefix: "{AccountId}.",
}));

export type DissociateAccessGrantsIdentityCenterError = CommonErrors;
/**
 * Dissociates the Amazon Web Services IAM Identity Center instance from the S3 Access Grants instance.
 *
 * ### Permissions
 *
 * You must have the `s3:DissociateAccessGrantsIdentityCenter` permission to use this operation.
 *
 * ### Additional Permissions
 *
 * You must have the `sso:DeleteApplication` permission to use this operation.
 */
export const dissociateAccessGrantsIdentityCenter: API.OperationMethod<
  DissociateAccessGrantsIdentityCenterRequest,
  DissociateAccessGrantsIdentityCenterResponse,
  DissociateAccessGrantsIdentityCenterError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2208, __c69, 0) as any as S.Schema<DissociateAccessGrantsIdentityCenterRequest>,
  output: __S(2209, __c69, 1) as any as S.Schema<DissociateAccessGrantsIdentityCenterResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DissociateAccessGrantsIdentityCenter",
  endpointHostPrefix: "{AccountId}.",
}));

export type GetAccessGrantError = CommonErrors;
/**
 * Get the details of an access grant from your S3 Access Grants instance.
 *
 * ### Permissions
 *
 * You must have the `s3:GetAccessGrant` permission to use this operation.
 */
export const getAccessGrant: API.OperationMethod<
  GetAccessGrantRequest,
  GetAccessGrantResult,
  GetAccessGrantError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2240, __c70, 0) as any as S.Schema<GetAccessGrantRequest>,
  output: __S(2241, __c70, 1) as any as S.Schema<GetAccessGrantResult>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccessGrant",
  endpointHostPrefix: "{AccountId}.",
}));

export type GetAccessGrantsInstanceError = CommonErrors;
/**
 * Retrieves the S3 Access Grants instance for a Region in your account.
 *
 * ### Permissions
 *
 * You must have the `s3:GetAccessGrantsInstance` permission to use this operation.
 *
 * `GetAccessGrantsInstance` is not supported for cross-account access. You can only call the API from the account that owns the S3 Access Grants instance.
 */
export const getAccessGrantsInstance: API.OperationMethod<
  GetAccessGrantsInstanceRequest,
  GetAccessGrantsInstanceResult,
  GetAccessGrantsInstanceError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2272, __c71, 0) as any as S.Schema<GetAccessGrantsInstanceRequest>,
  output: __S(2273, __c71, 1) as any as S.Schema<GetAccessGrantsInstanceResult>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccessGrantsInstance",
  endpointHostPrefix: "{AccountId}.",
}));

export type GetAccessGrantsInstanceForPrefixError = CommonErrors;
/**
 * Retrieve the S3 Access Grants instance that contains a particular prefix.
 *
 * ### Permissions
 *
 * You must have the `s3:GetAccessGrantsInstanceForPrefix` permission for the caller account to use this operation.
 *
 * ### Additional Permissions
 *
 * The prefix owner account must grant you the following permissions to their S3 Access Grants instance: `s3:GetAccessGrantsInstanceForPrefix`.
 */
export const getAccessGrantsInstanceForPrefix: API.OperationMethod<
  GetAccessGrantsInstanceForPrefixRequest,
  GetAccessGrantsInstanceForPrefixResult,
  GetAccessGrantsInstanceForPrefixError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2304, __c72, 0) as any as S.Schema<GetAccessGrantsInstanceForPrefixRequest>,
  output: __S(2305, __c72, 1) as any as S.Schema<GetAccessGrantsInstanceForPrefixResult>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccessGrantsInstanceForPrefix",
  endpointHostPrefix: "{AccountId}.",
}));

export type GetAccessGrantsInstanceResourcePolicyError = CommonErrors;
/**
 * Returns the resource policy of the S3 Access Grants instance.
 *
 * ### Permissions
 *
 * You must have the `s3:GetAccessGrantsInstanceResourcePolicy` permission to use this operation.
 */
export const getAccessGrantsInstanceResourcePolicy: API.OperationMethod<
  GetAccessGrantsInstanceResourcePolicyRequest,
  GetAccessGrantsInstanceResourcePolicyResult,
  GetAccessGrantsInstanceResourcePolicyError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2336, __c73, 0) as any as S.Schema<GetAccessGrantsInstanceResourcePolicyRequest>,
  output: __S(2337, __c73, 1) as any as S.Schema<GetAccessGrantsInstanceResourcePolicyResult>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccessGrantsInstanceResourcePolicy",
  endpointHostPrefix: "{AccountId}.",
}));

export type GetAccessGrantsLocationError = CommonErrors;
/**
 * Retrieves the details of a particular location registered in your S3 Access Grants instance.
 *
 * ### Permissions
 *
 * You must have the `s3:GetAccessGrantsLocation` permission to use this operation.
 */
export const getAccessGrantsLocation: API.OperationMethod<
  GetAccessGrantsLocationRequest,
  GetAccessGrantsLocationResult,
  GetAccessGrantsLocationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2368, __c74, 0) as any as S.Schema<GetAccessGrantsLocationRequest>,
  output: __S(2369, __c74, 1) as any as S.Schema<GetAccessGrantsLocationResult>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccessGrantsLocation",
  endpointHostPrefix: "{AccountId}.",
}));

export type GetAccessPointError = NoSuchAccessPoint | CommonErrors;
/**
 * Returns configuration information about the specified access point.
 *
 * All Amazon S3 on Outposts REST API requests for this action require an additional parameter of `x-amz-outpost-id` to be passed with the request. In addition, you must use an S3 on Outposts endpoint hostname prefix instead of `s3-control`. For an example of the request syntax for Amazon S3 on Outposts that uses the S3 on Outposts endpoint hostname prefix and the `x-amz-outpost-id` derived by using the access point ARN, see the Examples section.
 *
 * The following actions are related to `GetAccessPoint`:
 *
 * - CreateAccessPoint
 *
 * - DeleteAccessPoint
 *
 * - ListAccessPoints
 */
export const getAccessPoint: API.OperationMethod<
  GetAccessPointRequest,
  GetAccessPointResult,
  GetAccessPointError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2400, __c75, 0) as any as S.Schema<GetAccessPointRequest>,
  output: __S(2402, __c75, 2) as any as S.Schema<GetAccessPointResult>,
  errors: [NoSuchAccessPoint],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccessPoint",
  endpointHostPrefix: "{AccountId}.",
}));

export type GetAccessPointConfigurationForObjectLambdaError = NoSuchAccessPoint | CommonErrors;
/**
 * This operation is not supported by directory buckets.
 *
 * Returns configuration for an Object Lambda Access Point.
 *
 * The following actions are related to
 * `GetAccessPointConfigurationForObjectLambda`:
 *
 * - PutAccessPointConfigurationForObjectLambda
 */
export const getAccessPointConfigurationForObjectLambda: API.OperationMethod<
  GetAccessPointConfigurationForObjectLambdaRequest,
  GetAccessPointConfigurationForObjectLambdaResult,
  GetAccessPointConfigurationForObjectLambdaError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2432, __c76, 0) as any as S.Schema<GetAccessPointConfigurationForObjectLambdaRequest>,
  output: __S(2433, __c76, 1) as any as S.Schema<GetAccessPointConfigurationForObjectLambdaResult>,
  errors: [NoSuchAccessPoint],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccessPointConfigurationForObjectLambda",
  endpointHostPrefix: "{AccountId}.",
}));

export type GetAccessPointForObjectLambdaError = NoSuchAccessPoint | CommonErrors;
/**
 * This operation is not supported by directory buckets.
 *
 * Returns configuration information about the specified Object Lambda Access Point
 *
 * The following actions are related to `GetAccessPointForObjectLambda`:
 *
 * - CreateAccessPointForObjectLambda
 *
 * - DeleteAccessPointForObjectLambda
 *
 * - ListAccessPointsForObjectLambda
 */
export const getAccessPointForObjectLambda: API.OperationMethod<
  GetAccessPointForObjectLambdaRequest,
  GetAccessPointForObjectLambdaResult,
  GetAccessPointForObjectLambdaError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2464, __c77, 0) as any as S.Schema<GetAccessPointForObjectLambdaRequest>,
  output: __S(2465, __c77, 1) as any as S.Schema<GetAccessPointForObjectLambdaResult>,
  errors: [NoSuchAccessPoint],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccessPointForObjectLambda",
  endpointHostPrefix: "{AccountId}.",
}));

export type GetAccessPointPolicyError = NoSuchAccessPoint | NoSuchAccessPointPolicy | CommonErrors;
/**
 * Returns the access point policy associated with the specified access point.
 *
 * The following actions are related to `GetAccessPointPolicy`:
 *
 * - PutAccessPointPolicy
 *
 * - DeleteAccessPointPolicy
 */
export const getAccessPointPolicy: API.OperationMethod<
  GetAccessPointPolicyRequest,
  GetAccessPointPolicyResult,
  GetAccessPointPolicyError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2496, __c78, 0) as any as S.Schema<GetAccessPointPolicyRequest>,
  output: __S(2497, __c78, 1) as any as S.Schema<GetAccessPointPolicyResult>,
  errors: [NoSuchAccessPoint, NoSuchAccessPointPolicy],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccessPointPolicy",
  endpointHostPrefix: "{AccountId}.",
}));

export type GetAccessPointPolicyForObjectLambdaError =
  | NoSuchAccessPoint
  | NoSuchAccessPointPolicy
  | CommonErrors;
/**
 * This operation is not supported by directory buckets.
 *
 * Returns the resource policy for an Object Lambda Access Point.
 *
 * The following actions are related to
 * `GetAccessPointPolicyForObjectLambda`:
 *
 * - DeleteAccessPointPolicyForObjectLambda
 *
 * - PutAccessPointPolicyForObjectLambda
 */
export const getAccessPointPolicyForObjectLambda: API.OperationMethod<
  GetAccessPointPolicyForObjectLambdaRequest,
  GetAccessPointPolicyForObjectLambdaResult,
  GetAccessPointPolicyForObjectLambdaError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2528, __c79, 0) as any as S.Schema<GetAccessPointPolicyForObjectLambdaRequest>,
  output: __S(2529, __c79, 1) as any as S.Schema<GetAccessPointPolicyForObjectLambdaResult>,
  errors: [NoSuchAccessPoint, NoSuchAccessPointPolicy],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccessPointPolicyForObjectLambda",
  endpointHostPrefix: "{AccountId}.",
}));

export type GetAccessPointPolicyStatusError =
  | NoSuchAccessPoint
  | NoSuchAccessPointPolicy
  | CommonErrors;
/**
 * This operation is not supported by directory buckets.
 *
 * Indicates whether the specified access point currently has a policy that allows public access.
 * For more information about public access through access points, see Managing Data Access with Amazon S3
 * access points in the *Amazon S3 User Guide*.
 */
export const getAccessPointPolicyStatus: API.OperationMethod<
  GetAccessPointPolicyStatusRequest,
  GetAccessPointPolicyStatusResult,
  GetAccessPointPolicyStatusError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2560, __c80, 0) as any as S.Schema<GetAccessPointPolicyStatusRequest>,
  output: __S(2561, __c80, 1) as any as S.Schema<GetAccessPointPolicyStatusResult>,
  errors: [NoSuchAccessPoint, NoSuchAccessPointPolicy],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccessPointPolicyStatus",
  endpointHostPrefix: "{AccountId}.",
}));

export type GetAccessPointPolicyStatusForObjectLambdaError = CommonErrors;
/**
 * This operation is not supported by directory buckets.
 *
 * Returns the status of the resource policy associated with an Object Lambda Access Point.
 */
export const getAccessPointPolicyStatusForObjectLambda: API.OperationMethod<
  GetAccessPointPolicyStatusForObjectLambdaRequest,
  GetAccessPointPolicyStatusForObjectLambdaResult,
  GetAccessPointPolicyStatusForObjectLambdaError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2624, __c82, 0) as any as S.Schema<GetAccessPointPolicyStatusForObjectLambdaRequest>,
  output: __S(2625, __c82, 1) as any as S.Schema<GetAccessPointPolicyStatusForObjectLambdaResult>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccessPointPolicyStatusForObjectLambda",
  endpointHostPrefix: "{AccountId}.",
}));

export type GetAccessPointScopeError = CommonErrors;
/**
 * Returns the access point scope for a directory bucket.
 *
 * To use this operation, you must have the permission to perform the
 * `s3express:GetAccessPointScope` action.
 *
 * For information about REST API errors, see REST error responses.
 */
export const getAccessPointScope: API.OperationMethod<
  GetAccessPointScopeRequest,
  GetAccessPointScopeResult,
  GetAccessPointScopeError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2656, __c83, 0) as any as S.Schema<GetAccessPointScopeRequest>,
  output: __S(2657, __c83, 1) as any as S.Schema<GetAccessPointScopeResult>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccessPointScope",
}));

export type GetBucketError = CommonErrors;
/**
 * Gets an Amazon S3 on Outposts bucket. For more information, see Using Amazon S3 on Outposts in the
 * *Amazon S3 User Guide*.
 *
 * If you are using an identity other than the root user of the Amazon Web Services account that owns the
 * Outposts bucket, the calling identity must have the `s3-outposts:GetBucket`
 * permissions on the specified Outposts bucket and belong to the Outposts bucket owner's
 * account in order to use this action. Only users from Outposts bucket owner account with
 * the right permissions can perform actions on an Outposts bucket.
 *
 * If you don't have `s3-outposts:GetBucket` permissions or you're not using an
 * identity that belongs to the bucket owner's account, Amazon S3 returns a 403 Access
 * Denied error.
 *
 * The following actions are related to `GetBucket` for Amazon S3 on Outposts:
 *
 * All Amazon S3 on Outposts REST API requests for this action require an additional parameter of `x-amz-outpost-id` to be passed with the request. In addition, you must use an S3 on Outposts endpoint hostname prefix instead of `s3-control`. For an example of the request syntax for Amazon S3 on Outposts that uses the S3 on Outposts endpoint hostname prefix and the `x-amz-outpost-id` derived by using the access point ARN, see the Examples section.
 *
 * - PutObject
 *
 * - CreateBucket
 *
 * - DeleteBucket
 */
export const getBucket: API.OperationMethod<
  GetBucketRequest,
  GetBucketResult,
  GetBucketError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2688, __c84, 0) as any as S.Schema<GetBucketRequest>,
  output: __S(2689, __c84, 1) as any as S.Schema<GetBucketResult>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBucket",
  endpointHostPrefix: "{AccountId}.",
}));

export type GetBucketLifecycleConfigurationError = CommonErrors;
/**
 * This action gets an Amazon S3 on Outposts bucket's lifecycle configuration. To get an S3
 * bucket's lifecycle configuration, see GetBucketLifecycleConfiguration in the *Amazon S3 API Reference*.
 *
 * Returns the lifecycle configuration information set on the Outposts bucket. For more
 * information, see Using Amazon S3 on Outposts and for
 * information about lifecycle configuration, see Object Lifecycle
 * Management in *Amazon S3 User Guide*.
 *
 * To use this action, you must have permission to perform the
 * `s3-outposts:GetLifecycleConfiguration` action. The Outposts bucket owner
 * has this permission, by default. The bucket owner can grant this permission to others. For
 * more information about permissions, see Permissions Related to Bucket Subresource Operations and Managing
 * Access Permissions to Your Amazon S3 Resources.
 *
 * All Amazon S3 on Outposts REST API requests for this action require an additional parameter of `x-amz-outpost-id` to be passed with the request. In addition, you must use an S3 on Outposts endpoint hostname prefix instead of `s3-control`. For an example of the request syntax for Amazon S3 on Outposts that uses the S3 on Outposts endpoint hostname prefix and the `x-amz-outpost-id` derived by using the access point ARN, see the Examples section.
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
 * The following actions are related to
 * `GetBucketLifecycleConfiguration`:
 *
 * - PutBucketLifecycleConfiguration
 *
 * - DeleteBucketLifecycleConfiguration
 */
export const getBucketLifecycleConfiguration: API.OperationMethod<
  GetBucketLifecycleConfigurationRequest,
  GetBucketLifecycleConfigurationResult,
  GetBucketLifecycleConfigurationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2720, __c85, 0) as any as S.Schema<GetBucketLifecycleConfigurationRequest>,
  output: __S(2721, __c85, 1) as any as S.Schema<GetBucketLifecycleConfigurationResult>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBucketLifecycleConfiguration",
  endpointHostPrefix: "{AccountId}.",
}));

export type GetBucketPolicyError = CommonErrors;
/**
 * This action gets a bucket policy for an Amazon S3 on Outposts bucket. To get a policy for
 * an S3 bucket, see GetBucketPolicy in the
 * *Amazon S3 API Reference*.
 *
 * Returns the policy of a specified Outposts bucket. For more information, see Using
 * Amazon S3 on Outposts in the *Amazon S3 User Guide*.
 *
 * If you are using an identity other than the root user of the Amazon Web Services account that owns the
 * bucket, the calling identity must have the `GetBucketPolicy` permissions on the
 * specified bucket and belong to the bucket owner's account in order to use this
 * action.
 *
 * Only users from Outposts bucket owner account with the right permissions can perform
 * actions on an Outposts bucket. If you don't have `s3-outposts:GetBucketPolicy`
 * permissions or you're not using an identity that belongs to the bucket owner's account,
 * Amazon S3 returns a `403 Access Denied` error.
 *
 * As a security precaution, the root user of the Amazon Web Services account that owns a bucket can
 * always use this action, even if the policy explicitly denies the root user the ability
 * to perform this action.
 *
 * For more information about bucket policies, see Using Bucket Policies and User
 * Policies.
 *
 * All Amazon S3 on Outposts REST API requests for this action require an additional parameter of `x-amz-outpost-id` to be passed with the request. In addition, you must use an S3 on Outposts endpoint hostname prefix instead of `s3-control`. For an example of the request syntax for Amazon S3 on Outposts that uses the S3 on Outposts endpoint hostname prefix and the `x-amz-outpost-id` derived by using the access point ARN, see the Examples section.
 *
 * The following actions are related to `GetBucketPolicy`:
 *
 * - GetObject
 *
 * - PutBucketPolicy
 *
 * - DeleteBucketPolicy
 */
export const getBucketPolicy: API.OperationMethod<
  GetBucketPolicyRequest,
  GetBucketPolicyResult,
  GetBucketPolicyError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2784, __c87, 0) as any as S.Schema<GetBucketPolicyRequest>,
  output: __S(2785, __c87, 1) as any as S.Schema<GetBucketPolicyResult>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBucketPolicy",
  endpointHostPrefix: "{AccountId}.",
}));

export type GetBucketReplicationError = CommonErrors;
/**
 * This operation gets an Amazon S3 on Outposts bucket's replication configuration. To get an
 * S3 bucket's replication configuration, see GetBucketReplication
 * in the *Amazon S3 API Reference*.
 *
 * Returns the replication configuration of an S3 on Outposts bucket. For more information
 * about S3 on Outposts, see Using Amazon S3 on Outposts in the
 * *Amazon S3 User Guide*. For information about S3 replication on Outposts
 * configuration, see Replicating objects for
 * S3 on Outposts in the *Amazon S3 User Guide*.
 *
 * It can take a while to propagate `PUT` or `DELETE` requests for
 * a replication configuration to all S3 on Outposts systems. Therefore, the replication
 * configuration that's returned by a `GET` request soon after a
 * `PUT` or `DELETE` request might return a more recent result
 * than what's on the Outpost. If an Outpost is offline, the delay in updating the
 * replication configuration on that Outpost can be significant.
 *
 * This action requires permissions for the
 * `s3-outposts:GetReplicationConfiguration` action. The Outposts bucket owner
 * has this permission by default and can grant it to others. For more information about
 * permissions, see Setting up IAM with
 * S3 on Outposts and Managing access to
 * S3 on Outposts bucket in the *Amazon S3 User Guide*.
 *
 * All Amazon S3 on Outposts REST API requests for this action require an additional parameter of `x-amz-outpost-id` to be passed with the request. In addition, you must use an S3 on Outposts endpoint hostname prefix instead of `s3-control`. For an example of the request syntax for Amazon S3 on Outposts that uses the S3 on Outposts endpoint hostname prefix and the `x-amz-outpost-id` derived by using the access point ARN, see the Examples section.
 *
 * If you include the `Filter` element in a replication configuration, you must
 * also include the `DeleteMarkerReplication`, `Status`, and
 * `Priority` elements. The response also returns those elements.
 *
 * For information about S3 on Outposts replication failure reasons, see Replication failure reasons in the *Amazon S3 User Guide*.
 *
 * The following operations are related to `GetBucketReplication`:
 *
 * - PutBucketReplication
 *
 * - DeleteBucketReplication
 */
export const getBucketReplication: API.OperationMethod<
  GetBucketReplicationRequest,
  GetBucketReplicationResult,
  GetBucketReplicationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2816, __c88, 0) as any as S.Schema<GetBucketReplicationRequest>,
  output: __S(2817, __c88, 1) as any as S.Schema<GetBucketReplicationResult>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBucketReplication",
  endpointHostPrefix: "{AccountId}.",
}));

export type GetBucketTaggingError = CommonErrors;
/**
 * This action gets an Amazon S3 on Outposts bucket's tags. To get an S3 bucket tags, see
 * GetBucketTagging in the *Amazon S3 API Reference*.
 *
 * Returns the tag set associated with the Outposts bucket. For more information, see
 * Using
 * Amazon S3 on Outposts in the *Amazon S3 User Guide*.
 *
 * To use this action, you must have permission to perform the
 * `GetBucketTagging` action. By default, the bucket owner has this permission
 * and can grant this permission to others.
 *
 * `GetBucketTagging` has the following special error:
 *
 * - Error code: `NoSuchTagSetError`
 *
 * - Description: There is no tag set associated with the bucket.
 *
 * All Amazon S3 on Outposts REST API requests for this action require an additional parameter of `x-amz-outpost-id` to be passed with the request. In addition, you must use an S3 on Outposts endpoint hostname prefix instead of `s3-control`. For an example of the request syntax for Amazon S3 on Outposts that uses the S3 on Outposts endpoint hostname prefix and the `x-amz-outpost-id` derived by using the access point ARN, see the Examples section.
 *
 * The following actions are related to `GetBucketTagging`:
 *
 * - PutBucketTagging
 *
 * - DeleteBucketTagging
 */
export const getBucketTagging: API.OperationMethod<
  GetBucketTaggingRequest,
  GetBucketTaggingResult,
  GetBucketTaggingError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2880, __c90, 0) as any as S.Schema<GetBucketTaggingRequest>,
  output: __S(2881, __c90, 1) as any as S.Schema<GetBucketTaggingResult>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBucketTagging",
  endpointHostPrefix: "{AccountId}.",
}));

export type GetBucketVersioningError = CommonErrors;
/**
 * This operation returns the versioning state
 * for
 * S3 on Outposts
 * buckets
 * only. To return the versioning state for an S3 bucket, see GetBucketVersioning in the *Amazon S3 API Reference*.
 *
 * Returns the versioning state for an S3 on Outposts bucket. With
 * S3
 * Versioning,
 * you can save multiple distinct copies of your
 * objects
 * and recover from unintended user actions and application failures.
 *
 * If you've never set versioning on your bucket, it has no versioning state. In that case,
 * the `GetBucketVersioning` request does not return a versioning state
 * value.
 *
 * For more information about versioning, see Versioning in the Amazon S3
 * User Guide.
 *
 * All Amazon S3 on Outposts REST API requests for this action require an additional parameter of `x-amz-outpost-id` to be passed with the request. In addition, you must use an S3 on Outposts endpoint hostname prefix instead of `s3-control`. For an example of the request syntax for Amazon S3 on Outposts that uses the S3 on Outposts endpoint hostname prefix and the `x-amz-outpost-id` derived by using the access point ARN, see the Examples section.
 *
 * The following operations are related to `GetBucketVersioning` for
 * S3 on Outposts.
 *
 * - PutBucketVersioning
 *
 * - PutBucketLifecycleConfiguration
 *
 * - GetBucketLifecycleConfiguration
 */
export const getBucketVersioning: API.OperationMethod<
  GetBucketVersioningRequest,
  GetBucketVersioningResult,
  GetBucketVersioningError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2912, __c91, 0) as any as S.Schema<GetBucketVersioningRequest>,
  output: __S(2913, __c91, 1) as any as S.Schema<GetBucketVersioningResult>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBucketVersioning",
  endpointHostPrefix: "{AccountId}.",
}));

export type GetDataAccessError = CommonErrors;
/**
 * Returns a temporary access credential from S3 Access Grants to the grantee or client application. The temporary credential is an Amazon Web Services STS token that grants them access to the S3 data.
 *
 * ### Permissions
 *
 * You must have the `s3:GetDataAccess` permission to use this operation.
 *
 * ### Additional Permissions
 *
 * The IAM role that S3 Access Grants assumes must have the following permissions specified in the trust policy when registering the location: `sts:AssumeRole`, for directory users or groups `sts:SetContext`, and for IAM users or roles `sts:SetSourceIdentity`.
 */
export const getDataAccess: API.OperationMethod<
  GetDataAccessRequest,
  GetDataAccessResult,
  GetDataAccessError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2944, __c92, 0) as any as S.Schema<GetDataAccessRequest>,
  output: __S(2946, __c92, 2) as any as S.Schema<GetDataAccessResult>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataAccess",
  endpointHostPrefix: "{AccountId}.",
}));

export type GetJobTaggingError =
  | InternalServiceException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns the tags on an S3 Batch Operations job.
 *
 * ### Permissions
 *
 * To use the
 * `GetJobTagging` operation, you must have permission to
 * perform the `s3:GetJobTagging` action. For more information, see Controlling
 * access and labeling jobs using tags in the
 * *Amazon S3 User Guide*.
 *
 * Related actions include:
 *
 * - CreateJob
 *
 * - PutJobTagging
 *
 * - DeleteJobTagging
 */
export const getJobTagging: API.OperationMethod<
  GetJobTaggingRequest,
  GetJobTaggingResult,
  GetJobTaggingError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2976, __c93, 0) as any as S.Schema<GetJobTaggingRequest>,
  output: __S(2977, __c93, 1) as any as S.Schema<GetJobTaggingResult>,
  errors: [InternalServiceException, NotFoundException, TooManyRequestsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetJobTagging",
  endpointHostPrefix: "{AccountId}.",
}));

export type GetMultiRegionAccessPointError = NoSuchMultiRegionAccessPoint | CommonErrors;
/**
 * This operation is not supported by directory buckets.
 *
 * Returns configuration information about the specified Multi-Region Access Point.
 *
 * This action will always be routed to the US West (Oregon) Region. For more information
 * about the restrictions around working with Multi-Region Access Points, see Multi-Region Access Point
 * restrictions and limitations in the *Amazon S3 User Guide*.
 *
 * The following actions are related to `GetMultiRegionAccessPoint`:
 *
 * - CreateMultiRegionAccessPoint
 *
 * - DeleteMultiRegionAccessPoint
 *
 * - DescribeMultiRegionAccessPointOperation
 *
 * - ListMultiRegionAccessPoints
 */
export const getMultiRegionAccessPoint: API.OperationMethod<
  GetMultiRegionAccessPointRequest,
  GetMultiRegionAccessPointResult,
  GetMultiRegionAccessPointError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3008, __c94, 0) as any as S.Schema<GetMultiRegionAccessPointRequest>,
  output: __S(3009, __c94, 1) as any as S.Schema<GetMultiRegionAccessPointResult>,
  errors: [NoSuchMultiRegionAccessPoint],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMultiRegionAccessPoint",
  endpointHostPrefix: "{AccountId}.",
}));

export type GetMultiRegionAccessPointPolicyError = NoSuchMultiRegionAccessPoint | CommonErrors;
/**
 * This operation is not supported by directory buckets.
 *
 * Returns the access control policy of the specified Multi-Region Access Point.
 *
 * This action will always be routed to the US West (Oregon) Region. For more information
 * about the restrictions around working with Multi-Region Access Points, see Multi-Region Access Point
 * restrictions and limitations in the *Amazon S3 User Guide*.
 *
 * The following actions are related to
 * `GetMultiRegionAccessPointPolicy`:
 *
 * - GetMultiRegionAccessPointPolicyStatus
 *
 * - PutMultiRegionAccessPointPolicy
 */
export const getMultiRegionAccessPointPolicy: API.OperationMethod<
  GetMultiRegionAccessPointPolicyRequest,
  GetMultiRegionAccessPointPolicyResult,
  GetMultiRegionAccessPointPolicyError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3072, __c96, 0) as any as S.Schema<GetMultiRegionAccessPointPolicyRequest>,
  output: __S(3076, __c96, 4) as any as S.Schema<GetMultiRegionAccessPointPolicyResult>,
  errors: [NoSuchMultiRegionAccessPoint],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMultiRegionAccessPointPolicy",
  endpointHostPrefix: "{AccountId}.",
}));

export type GetMultiRegionAccessPointPolicyStatusError = CommonErrors;
/**
 * This operation is not supported by directory buckets.
 *
 * Indicates whether the specified Multi-Region Access Point has an access control policy that allows public
 * access.
 *
 * This action will always be routed to the US West (Oregon) Region. For more information
 * about the restrictions around working with Multi-Region Access Points, see Multi-Region Access Point
 * restrictions and limitations in the *Amazon S3 User Guide*.
 *
 * The following actions are related to
 * `GetMultiRegionAccessPointPolicyStatus`:
 *
 * - GetMultiRegionAccessPointPolicy
 *
 * - PutMultiRegionAccessPointPolicy
 */
export const getMultiRegionAccessPointPolicyStatus: API.OperationMethod<
  GetMultiRegionAccessPointPolicyStatusRequest,
  GetMultiRegionAccessPointPolicyStatusResult,
  GetMultiRegionAccessPointPolicyStatusError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3104, __c97, 0) as any as S.Schema<GetMultiRegionAccessPointPolicyStatusRequest>,
  output: __S(3105, __c97, 1) as any as S.Schema<GetMultiRegionAccessPointPolicyStatusResult>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMultiRegionAccessPointPolicyStatus",
  endpointHostPrefix: "{AccountId}.",
}));

export type GetMultiRegionAccessPointRoutesError = CommonErrors;
/**
 * This operation is not supported by directory buckets.
 *
 * Returns the routing configuration for a Multi-Region Access Point, indicating which Regions are active or
 * passive.
 *
 * To obtain routing control changes and failover requests, use the Amazon S3 failover control
 * infrastructure endpoints in these five Amazon Web Services Regions:
 *
 * - `us-east-1`
 *
 * - `us-west-2`
 *
 * - `ap-southeast-2`
 *
 * - `ap-northeast-1`
 *
 * - `eu-west-1`
 */
export const getMultiRegionAccessPointRoutes: API.OperationMethod<
  GetMultiRegionAccessPointRoutesRequest,
  GetMultiRegionAccessPointRoutesResult,
  GetMultiRegionAccessPointRoutesError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3136, __c98, 0) as any as S.Schema<GetMultiRegionAccessPointRoutesRequest>,
  output: __S(3137, __c98, 1) as any as S.Schema<GetMultiRegionAccessPointRoutesResult>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMultiRegionAccessPointRoutes",
  endpointHostPrefix: "{AccountId}.",
}));

export type GetPublicAccessBlockError = NoSuchPublicAccessBlockConfiguration | CommonErrors;
/**
 * This operation is not supported by directory buckets.
 *
 * Retrieves the `PublicAccessBlock` configuration for an Amazon Web Services account. This
 * operation returns the effective account-level configuration, which may inherit from
 * organization-level policies. For more information, see Using Amazon S3 block
 * public access.
 *
 * Related actions include:
 *
 * - DeletePublicAccessBlock
 *
 * - PutPublicAccessBlock
 */
export const getPublicAccessBlock: API.OperationMethod<
  GetPublicAccessBlockRequest,
  GetPublicAccessBlockOutput,
  GetPublicAccessBlockError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3200, __c100, 0) as any as S.Schema<GetPublicAccessBlockRequest>,
  output: __S(3201, __c100, 1) as any as S.Schema<GetPublicAccessBlockOutput>,
  errors: [NoSuchPublicAccessBlockConfiguration],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPublicAccessBlock",
  endpointHostPrefix: "{AccountId}.",
}));

export type GetStorageLensConfigurationError = NoSuchConfiguration | CommonErrors;
/**
 * This operation is not supported by directory buckets.
 *
 * Gets the Amazon S3 Storage Lens configuration. For more information, see Assessing your storage
 * activity and usage with Amazon S3 Storage Lens in the
 * *Amazon S3 User Guide*. For a complete list of S3 Storage Lens metrics, see S3 Storage Lens metrics glossary in the *Amazon S3 User Guide*.
 *
 * To use this action, you must have permission to perform the
 * `s3:GetStorageLensConfiguration` action. For more information, see Setting permissions to use Amazon S3 Storage Lens in the
 * *Amazon S3 User Guide*.
 */
export const getStorageLensConfiguration: API.OperationMethod<
  GetStorageLensConfigurationRequest,
  GetStorageLensConfigurationResult,
  GetStorageLensConfigurationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3232, __c101, 0) as any as S.Schema<GetStorageLensConfigurationRequest>,
  output: __S(3233, __c101, 1) as any as S.Schema<GetStorageLensConfigurationResult>,
  errors: [NoSuchConfiguration],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetStorageLensConfiguration",
  endpointHostPrefix: "{AccountId}.",
}));

export type GetStorageLensConfigurationTaggingError = NoSuchConfiguration | CommonErrors;
/**
 * This operation is not supported by directory buckets.
 *
 * Gets the tags of Amazon S3 Storage Lens configuration. For more information about S3 Storage Lens, see
 * Assessing your
 * storage activity and usage with Amazon S3 Storage Lens in the
 * *Amazon S3 User Guide*.
 *
 * To use this action, you must have permission to perform the
 * `s3:GetStorageLensConfigurationTagging` action. For more information, see
 * Setting permissions to
 * use Amazon S3 Storage Lens in the *Amazon S3 User Guide*.
 */
export const getStorageLensConfigurationTagging: API.OperationMethod<
  GetStorageLensConfigurationTaggingRequest,
  GetStorageLensConfigurationTaggingResult,
  GetStorageLensConfigurationTaggingError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3296, __c103, 0) as any as S.Schema<GetStorageLensConfigurationTaggingRequest>,
  output: __S(3297, __c103, 1) as any as S.Schema<GetStorageLensConfigurationTaggingResult>,
  errors: [NoSuchConfiguration],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetStorageLensConfigurationTagging",
  endpointHostPrefix: "{AccountId}.",
}));

export type GetStorageLensGroupError = CommonErrors;
/**
 * Retrieves the Storage Lens group configuration details.
 *
 * To use this operation, you must have the permission to perform the
 * `s3:GetStorageLensGroup` action. For more information about the required Storage Lens
 * Groups permissions, see Setting account permissions to use S3 Storage Lens groups.
 *
 * For information about Storage Lens groups errors, see List of Amazon S3 Storage
 * Lens error codes.
 */
export const getStorageLensGroup: API.OperationMethod<
  GetStorageLensGroupRequest,
  GetStorageLensGroupResult,
  GetStorageLensGroupError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3360, __c105, 0) as any as S.Schema<GetStorageLensGroupRequest>,
  output: __S(3361, __c105, 1) as any as S.Schema<GetStorageLensGroupResult>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetStorageLensGroup",
  endpointHostPrefix: "{AccountId}.",
}));

export type ListAccessGrantsError = CommonErrors;
/**
 * Returns the list of access grants in your S3 Access Grants instance.
 *
 * ### Permissions
 *
 * You must have the `s3:ListAccessGrants` permission to use this operation.
 */
export const listAccessGrants: API.PaginatedOperationMethod<
  ListAccessGrantsRequest,
  ListAccessGrantsResult,
  ListAccessGrantsError,
  Creds | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3392, __c106, 0) as any as S.Schema<ListAccessGrantsRequest>,
  output: __S(3395, __c106, 3) as any as S.Schema<ListAccessGrantsResult>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccessGrants",
  endpointHostPrefix: "{AccountId}.",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListAccessGrantsInstancesError = CommonErrors;
/**
 * Returns a list of S3 Access Grants instances. An S3 Access Grants instance serves as a logical grouping for your individual access grants. You can only have one S3 Access Grants instance per Region per account.
 *
 * ### Permissions
 *
 * You must have the `s3:ListAccessGrantsInstances` permission to use this operation.
 */
export const listAccessGrantsInstances: API.PaginatedOperationMethod<
  ListAccessGrantsInstancesRequest,
  ListAccessGrantsInstancesResult,
  ListAccessGrantsInstancesError,
  Creds | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3424, __c107, 0) as any as S.Schema<ListAccessGrantsInstancesRequest>,
  output: __S(3427, __c107, 3) as any as S.Schema<ListAccessGrantsInstancesResult>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccessGrantsInstances",
  endpointHostPrefix: "{AccountId}.",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListAccessGrantsLocationsError = CommonErrors;
/**
 * Returns a list of the locations registered in your S3 Access Grants instance.
 *
 * ### Permissions
 *
 * You must have the `s3:ListAccessGrantsLocations` permission to use this operation.
 */
export const listAccessGrantsLocations: API.PaginatedOperationMethod<
  ListAccessGrantsLocationsRequest,
  ListAccessGrantsLocationsResult,
  ListAccessGrantsLocationsError,
  Creds | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3456, __c108, 0) as any as S.Schema<ListAccessGrantsLocationsRequest>,
  output: __S(3459, __c108, 3) as any as S.Schema<ListAccessGrantsLocationsResult>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccessGrantsLocations",
  endpointHostPrefix: "{AccountId}.",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListAccessPointsError = CommonErrors;
/**
 * This operation is not supported by directory buckets.
 *
 * Returns a list of the access points. You can retrieve up to 1,000 access points per call. If the call
 * returns more than 1,000 access points (or the number specified in `maxResults`,
 * whichever is less), the response will include a continuation token that you can use to list
 * the additional access points.
 *
 * Returns only access points attached to S3 buckets by default. To return all access points specify
 * `DataSourceType` as `ALL`.
 *
 * All Amazon S3 on Outposts REST API requests for this action require an additional parameter of `x-amz-outpost-id` to be passed with the request. In addition, you must use an S3 on Outposts endpoint hostname prefix instead of `s3-control`. For an example of the request syntax for Amazon S3 on Outposts that uses the S3 on Outposts endpoint hostname prefix and the `x-amz-outpost-id` derived by using the access point ARN, see the Examples section.
 *
 * The following actions are related to `ListAccessPoints`:
 *
 * - CreateAccessPoint
 *
 * - DeleteAccessPoint
 *
 * - GetAccessPoint
 */
export const listAccessPoints: API.PaginatedOperationMethod<
  ListAccessPointsRequest,
  ListAccessPointsResult,
  ListAccessPointsError,
  Creds | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3488, __c109, 0) as any as S.Schema<ListAccessPointsRequest>,
  output: __S(3489, __c109, 1) as any as S.Schema<ListAccessPointsResult>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccessPoints",
  endpointHostPrefix: "{AccountId}.",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListAccessPointsForDirectoryBucketsError = CommonErrors;
/**
 * Returns a list of the access points that are owned by the Amazon Web Services account and that are associated with the specified directory bucket.
 *
 * To list access points for general purpose buckets, see ListAccesspoints.
 *
 * To use this operation, you must have the permission to perform the
 * `s3express:ListAccessPointsForDirectoryBuckets` action.
 *
 * For information about REST API errors, see REST error responses.
 */
export const listAccessPointsForDirectoryBuckets: API.PaginatedOperationMethod<
  ListAccessPointsForDirectoryBucketsRequest,
  ListAccessPointsForDirectoryBucketsResult,
  ListAccessPointsForDirectoryBucketsError,
  Creds | HttpClient.HttpClient,
  AccessPoint
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3552, __c111, 0) as any as S.Schema<ListAccessPointsForDirectoryBucketsRequest>,
  output: __S(3553, __c111, 1) as any as S.Schema<ListAccessPointsForDirectoryBucketsResult>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccessPointsForDirectoryBuckets",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AccessPointList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListAccessPointsForObjectLambdaError = CommonErrors;
/**
 * This operation is not supported by directory buckets.
 *
 * Returns some or all (up to 1,000) access points associated with the Object Lambda Access Point per call. If there
 * are more access points than what can be returned in one call, the response will include a
 * continuation token that you can use to list the additional access points.
 *
 * The following actions are related to
 * `ListAccessPointsForObjectLambda`:
 *
 * - CreateAccessPointForObjectLambda
 *
 * - DeleteAccessPointForObjectLambda
 *
 * - GetAccessPointForObjectLambda
 */
export const listAccessPointsForObjectLambda: API.PaginatedOperationMethod<
  ListAccessPointsForObjectLambdaRequest,
  ListAccessPointsForObjectLambdaResult,
  ListAccessPointsForObjectLambdaError,
  Creds | HttpClient.HttpClient,
  ObjectLambdaAccessPoint
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3584, __c112, 0) as any as S.Schema<ListAccessPointsForObjectLambdaRequest>,
  output: __S(3587, __c112, 3) as any as S.Schema<ListAccessPointsForObjectLambdaResult>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccessPointsForObjectLambda",
  endpointHostPrefix: "{AccountId}.",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ObjectLambdaAccessPointList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCallerAccessGrantsError = CommonErrors;
/**
 * Use this API to list the access grants that grant the caller access to Amazon S3 data through S3 Access Grants. The caller (grantee) can be an Identity and Access Management (IAM) identity or Amazon Web Services Identity Center corporate directory identity. You must pass the Amazon Web Services account of the S3 data owner (grantor) in the request. You can, optionally, narrow the results by `GrantScope`, using a fragment of the data's S3 path, and S3 Access Grants will return only the grants with a path that contains the path fragment. You can also pass the `AllowedByApplication` filter in the request, which returns only the grants authorized for applications, whether the application is the caller's Identity Center application or any other application (`ALL`). For more information, see List the caller's access grants in the *Amazon S3 User Guide*.
 *
 * ### Permissions
 *
 * You must have the `s3:ListCallerAccessGrants` permission to use this operation.
 */
export const listCallerAccessGrants: API.PaginatedOperationMethod<
  ListCallerAccessGrantsRequest,
  ListCallerAccessGrantsResult,
  ListCallerAccessGrantsError,
  Creds | HttpClient.HttpClient,
  ListCallerAccessGrantsEntry
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3616, __c113, 0) as any as S.Schema<ListCallerAccessGrantsRequest>,
  output: __S(3619, __c113, 3) as any as S.Schema<ListCallerAccessGrantsResult>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCallerAccessGrants",
  endpointHostPrefix: "{AccountId}.",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "CallerAccessGrantsList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListJobsError =
  | InternalServiceException
  | InvalidNextTokenException
  | InvalidRequestException
  | CommonErrors;
/**
 * Lists current S3 Batch Operations jobs as well as the jobs that have ended within the last 90
 * days for the Amazon Web Services account making the request. For more information, see S3 Batch Operations in the *Amazon S3 User Guide*.
 *
 * ### Permissions
 *
 * To use the
 * `ListJobs` operation, you must have permission to
 * perform the `s3:ListJobs` action.
 *
 * Related actions include:
 *
 * - CreateJob
 *
 * - DescribeJob
 *
 * - UpdateJobPriority
 *
 * - UpdateJobStatus
 */
export const listJobs: API.PaginatedOperationMethod<
  ListJobsRequest,
  ListJobsResult,
  ListJobsError,
  Creds | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3649, __c114, 1) as any as S.Schema<ListJobsRequest>,
  output: __S(3652, __c114, 4) as any as S.Schema<ListJobsResult>,
  errors: [InternalServiceException, InvalidNextTokenException, InvalidRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListJobs",
  endpointHostPrefix: "{AccountId}.",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMultiRegionAccessPointsError = CommonErrors;
/**
 * This operation is not supported by directory buckets.
 *
 * Returns a list of the Multi-Region Access Points currently associated with the specified Amazon Web Services account.
 * Each call can return up to 100 Multi-Region Access Points, the maximum number of Multi-Region Access Points that can be
 * associated with a single account.
 *
 * This action will always be routed to the US West (Oregon) Region. For more information
 * about the restrictions around working with Multi-Region Access Points, see Multi-Region Access Point
 * restrictions and limitations in the *Amazon S3 User Guide*.
 *
 * The following actions are related to `ListMultiRegionAccessPoint`:
 *
 * - CreateMultiRegionAccessPoint
 *
 * - DeleteMultiRegionAccessPoint
 *
 * - DescribeMultiRegionAccessPointOperation
 *
 * - GetMultiRegionAccessPoint
 */
export const listMultiRegionAccessPoints: API.PaginatedOperationMethod<
  ListMultiRegionAccessPointsRequest,
  ListMultiRegionAccessPointsResult,
  ListMultiRegionAccessPointsError,
  Creds | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3680, __c115, 0) as any as S.Schema<ListMultiRegionAccessPointsRequest>,
  output: __S(3682, __c115, 2) as any as S.Schema<ListMultiRegionAccessPointsResult>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMultiRegionAccessPoints",
  endpointHostPrefix: "{AccountId}.",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListRegionalBucketsError = CommonErrors;
/**
 * This operation is not supported by directory buckets.
 *
 * Returns a list of all Outposts buckets in an Outpost that are owned by the authenticated
 * sender of the request. For more information, see Using Amazon S3 on Outposts in the
 * *Amazon S3 User Guide*.
 *
 * For an example of the request syntax for Amazon S3 on Outposts that uses the S3 on Outposts
 * endpoint hostname prefix and `x-amz-outpost-id` in your request, see the Examples section.
 */
export const listRegionalBuckets: API.PaginatedOperationMethod<
  ListRegionalBucketsRequest,
  ListRegionalBucketsResult,
  ListRegionalBucketsError,
  Creds | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3712, __c116, 0) as any as S.Schema<ListRegionalBucketsRequest>,
  output: __S(3715, __c116, 3) as any as S.Schema<ListRegionalBucketsResult>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRegionalBuckets",
  endpointHostPrefix: "{AccountId}.",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListStorageLensConfigurationsError = CommonErrors;
/**
 * This operation is not supported by directory buckets.
 *
 * Gets a list of Amazon S3 Storage Lens configurations. For more information about S3 Storage Lens, see
 * Assessing your
 * storage activity and usage with Amazon S3 Storage Lens in the
 * *Amazon S3 User Guide*.
 *
 * To use this action, you must have permission to perform the
 * `s3:ListStorageLensConfigurations` action. For more information, see
 * Setting permissions to
 * use Amazon S3 Storage Lens in the *Amazon S3 User Guide*.
 */
export const listStorageLensConfigurations: API.PaginatedOperationMethod<
  ListStorageLensConfigurationsRequest,
  ListStorageLensConfigurationsResult,
  ListStorageLensConfigurationsError,
  Creds | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3744, __c117, 0) as any as S.Schema<ListStorageLensConfigurationsRequest>,
  output: __S(3747, __c117, 3) as any as S.Schema<ListStorageLensConfigurationsResult>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStorageLensConfigurations",
  endpointHostPrefix: "{AccountId}.",
  pagination: { inputToken: "NextToken", outputToken: "NextToken" } as const,
})) as any;

export type ListStorageLensGroupsError = CommonErrors;
/**
 * Lists all the Storage Lens groups in the specified home Region.
 *
 * To use this operation, you must have the permission to perform the
 * `s3:ListStorageLensGroups` action. For more information about the required Storage Lens
 * Groups permissions, see Setting account permissions to use S3 Storage Lens groups.
 *
 * For information about Storage Lens groups errors, see List of Amazon S3 Storage
 * Lens error codes.
 */
export const listStorageLensGroups: API.PaginatedOperationMethod<
  ListStorageLensGroupsRequest,
  ListStorageLensGroupsResult,
  ListStorageLensGroupsError,
  Creds | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3776, __c118, 0) as any as S.Schema<ListStorageLensGroupsRequest>,
  output: __S(3779, __c118, 3) as any as S.Schema<ListStorageLensGroupsResult>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStorageLensGroups",
  endpointHostPrefix: "{AccountId}.",
  pagination: { inputToken: "NextToken", outputToken: "NextToken" } as const,
})) as any;

export type ListTagsForResourceError = NoSuchAccessPoint | CommonErrors;
/**
 * This operation allows you to list all of the tags for a specified resource. Each tag is a label consisting of a key and value. Tags can help you organize, track costs for, and control access to resources.
 *
 * This operation is only supported for the following Amazon S3 resources:
 *
 * - General purpose buckets
 *
 * - Access Points for directory buckets
 *
 * - Access Points for general purpose buckets
 *
 * - Directory buckets
 *
 * - S3 Storage Lens groups
 *
 * - S3 Access Grants instances, registered locations, and grants.
 *
 * ### Permissions
 *
 * For general purpose buckets, access points for general purpose buckets, Storage Lens groups, and S3 Access Grants, you must have the `s3:ListTagsForResource` permission to use this operation.
 *
 * ### Directory bucket permissions
 *
 * For directory buckets, you must have the `s3express:ListTagsForResource` permission to use this operation. For more information about directory buckets policies and permissions, see Identity and Access Management (IAM) for S3 Express One Zone in the *Amazon S3 User Guide*.
 *
 * ### HTTP Host header syntax
 *
 * **Directory buckets ** - The HTTP Host header syntax is `s3express-control.*region*.amazonaws.com`.
 *
 * For information about S3 Tagging errors, see List of Amazon S3 Tagging error codes.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResult,
  ListTagsForResourceError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3808, __c119, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(3809, __c119, 1) as any as S.Schema<ListTagsForResourceResult>,
  errors: [NoSuchAccessPoint],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  endpointHostPrefix: "{AccountId}.",
}));

export type PutAccessGrantsInstanceResourcePolicyError = CommonErrors;
/**
 * Updates the resource policy of the S3 Access Grants instance.
 *
 * ### Permissions
 *
 * You must have the `s3:PutAccessGrantsInstanceResourcePolicy` permission to use this operation.
 */
export const putAccessGrantsInstanceResourcePolicy: API.OperationMethod<
  PutAccessGrantsInstanceResourcePolicyRequest,
  PutAccessGrantsInstanceResourcePolicyResult,
  PutAccessGrantsInstanceResourcePolicyError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3840, __c120, 0) as any as S.Schema<PutAccessGrantsInstanceResourcePolicyRequest>,
  output: __S(3841, __c120, 1) as any as S.Schema<PutAccessGrantsInstanceResourcePolicyResult>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAccessGrantsInstanceResourcePolicy",
  endpointHostPrefix: "{AccountId}.",
}));

export type PutAccessPointConfigurationForObjectLambdaError =
  | NoSuchAccessPoint
  | InvalidRequest
  | CommonErrors;
/**
 * This operation is not supported by directory buckets.
 *
 * Replaces configuration for an Object Lambda Access Point.
 *
 * The following actions are related to
 * `PutAccessPointConfigurationForObjectLambda`:
 *
 * - GetAccessPointConfigurationForObjectLambda
 */
export const putAccessPointConfigurationForObjectLambda: API.OperationMethod<
  PutAccessPointConfigurationForObjectLambdaRequest,
  PutAccessPointConfigurationForObjectLambdaResponse,
  PutAccessPointConfigurationForObjectLambdaError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3872, __c121, 0) as any as S.Schema<PutAccessPointConfigurationForObjectLambdaRequest>,
  output: __S(
    3873,
    __c121,
    1,
  ) as any as S.Schema<PutAccessPointConfigurationForObjectLambdaResponse>,
  errors: [NoSuchAccessPoint, InvalidRequest],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAccessPointConfigurationForObjectLambda",
  endpointHostPrefix: "{AccountId}.",
}));

export type PutAccessPointPolicyError = NoSuchAccessPoint | MalformedPolicy | CommonErrors;
/**
 * Associates an access policy with the specified access point. Each access point can have only one policy,
 * so a request made to this API replaces any existing policy associated with the specified
 * access point.
 *
 * All Amazon S3 on Outposts REST API requests for this action require an additional parameter of `x-amz-outpost-id` to be passed with the request. In addition, you must use an S3 on Outposts endpoint hostname prefix instead of `s3-control`. For an example of the request syntax for Amazon S3 on Outposts that uses the S3 on Outposts endpoint hostname prefix and the `x-amz-outpost-id` derived by using the access point ARN, see the Examples section.
 *
 * The following actions are related to `PutAccessPointPolicy`:
 *
 * - GetAccessPointPolicy
 *
 * - DeleteAccessPointPolicy
 */
export const putAccessPointPolicy: API.OperationMethod<
  PutAccessPointPolicyRequest,
  PutAccessPointPolicyResponse,
  PutAccessPointPolicyError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3904, __c122, 0) as any as S.Schema<PutAccessPointPolicyRequest>,
  output: __S(3905, __c122, 1) as any as S.Schema<PutAccessPointPolicyResponse>,
  errors: [NoSuchAccessPoint, MalformedPolicy],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAccessPointPolicy",
  endpointHostPrefix: "{AccountId}.",
}));

export type PutAccessPointPolicyForObjectLambdaError =
  | NoSuchAccessPoint
  | MalformedPolicy
  | CommonErrors;
/**
 * This operation is not supported by directory buckets.
 *
 * Creates or replaces resource policy for an Object Lambda Access Point. For an example policy, see Creating Object Lambda Access Points in the *Amazon S3 User Guide*.
 *
 * The following actions are related to
 * `PutAccessPointPolicyForObjectLambda`:
 *
 * - DeleteAccessPointPolicyForObjectLambda
 *
 * - GetAccessPointPolicyForObjectLambda
 */
export const putAccessPointPolicyForObjectLambda: API.OperationMethod<
  PutAccessPointPolicyForObjectLambdaRequest,
  PutAccessPointPolicyForObjectLambdaResponse,
  PutAccessPointPolicyForObjectLambdaError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<PutAccessPointPolicyForObjectLambdaRequest>,
  output: __S(1, __c0, 1) as any as S.Schema<PutAccessPointPolicyForObjectLambdaResponse>,
  errors: [NoSuchAccessPoint, MalformedPolicy],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAccessPointPolicyForObjectLambda",
  endpointHostPrefix: "{AccountId}.",
}));

export type PutAccessPointScopeError = CommonErrors;
/**
 * Creates or replaces the access point scope for a directory bucket. You can use the access point scope to restrict access to specific prefixes, API operations, or a combination of both.
 *
 * You can specify any amount of prefixes, but the total length of characters of all prefixes must be less than 256 bytes in size.
 *
 * To use this operation, you must have the permission to perform the
 * `s3express:PutAccessPointScope` action.
 *
 * For information about REST API errors, see REST error responses.
 */
export const putAccessPointScope: API.OperationMethod<
  PutAccessPointScopeRequest,
  PutAccessPointScopeResponse,
  PutAccessPointScopeError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c1, 0) as any as S.Schema<PutAccessPointScopeRequest>,
  output: __S(33, __c1, 1) as any as S.Schema<PutAccessPointScopeResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAccessPointScope",
}));

export type PutBucketLifecycleConfigurationError = CommonErrors;
/**
 * This action puts a lifecycle configuration to an Amazon S3 on Outposts bucket. To put a
 * lifecycle configuration to an S3 bucket, see PutBucketLifecycleConfiguration in the *Amazon S3 API Reference*.
 *
 * Creates a new lifecycle configuration for the S3 on Outposts bucket or replaces an
 * existing lifecycle configuration. Outposts buckets only support lifecycle configurations
 * that delete/expire objects after a certain period of time and abort incomplete multipart
 * uploads.
 *
 * All Amazon S3 on Outposts REST API requests for this action require an additional parameter of `x-amz-outpost-id` to be passed with the request. In addition, you must use an S3 on Outposts endpoint hostname prefix instead of `s3-control`. For an example of the request syntax for Amazon S3 on Outposts that uses the S3 on Outposts endpoint hostname prefix and the `x-amz-outpost-id` derived by using the access point ARN, see the Examples section.
 *
 * The following actions are related to
 * `PutBucketLifecycleConfiguration`:
 *
 * - GetBucketLifecycleConfiguration
 *
 * - DeleteBucketLifecycleConfiguration
 */
export const putBucketLifecycleConfiguration: API.OperationMethod<
  PutBucketLifecycleConfigurationRequest,
  PutBucketLifecycleConfigurationResponse,
  PutBucketLifecycleConfigurationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(65, __c2, 1) as any as S.Schema<PutBucketLifecycleConfigurationRequest>,
  output: __S(66, __c2, 2) as any as S.Schema<PutBucketLifecycleConfigurationResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutBucketLifecycleConfiguration",
  endpointHostPrefix: "{AccountId}.",
}));

export type PutBucketPolicyError = CommonErrors;
/**
 * This action puts a bucket policy to an Amazon S3 on Outposts bucket. To put a policy on an
 * S3 bucket, see PutBucketPolicy in the
 * *Amazon S3 API Reference*.
 *
 * Applies an Amazon S3 bucket policy to an Outposts bucket. For more information, see Using
 * Amazon S3 on Outposts in the *Amazon S3 User Guide*.
 *
 * If you are using an identity other than the root user of the Amazon Web Services account that owns the
 * Outposts bucket, the calling identity must have the `PutBucketPolicy`
 * permissions on the specified Outposts bucket and belong to the bucket owner's account in
 * order to use this action.
 *
 * If you don't have `PutBucketPolicy` permissions, Amazon S3 returns a 403
 * Access Denied error. If you have the correct permissions, but you're not using an
 * identity that belongs to the bucket owner's account, Amazon S3 returns a 405 Method Not
 * Allowed error.
 *
 * As a security precaution, the root user of the Amazon Web Services account that owns a bucket can
 * always use this action, even if the policy explicitly denies the root user the ability
 * to perform this action.
 *
 * For more information about bucket policies, see Using Bucket Policies and User
 * Policies.
 *
 * All Amazon S3 on Outposts REST API requests for this action require an additional parameter of `x-amz-outpost-id` to be passed with the request. In addition, you must use an S3 on Outposts endpoint hostname prefix instead of `s3-control`. For an example of the request syntax for Amazon S3 on Outposts that uses the S3 on Outposts endpoint hostname prefix and the `x-amz-outpost-id` derived by using the access point ARN, see the Examples section.
 *
 * The following actions are related to `PutBucketPolicy`:
 *
 * - GetBucketPolicy
 *
 * - DeleteBucketPolicy
 */
export const putBucketPolicy: API.OperationMethod<
  PutBucketPolicyRequest,
  PutBucketPolicyResponse,
  PutBucketPolicyError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c3, 0) as any as S.Schema<PutBucketPolicyRequest>,
  output: __S(97, __c3, 1) as any as S.Schema<PutBucketPolicyResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutBucketPolicy",
  endpointHostPrefix: "{AccountId}.",
}));

export type PutBucketReplicationError = CommonErrors;
/**
 * This action creates an Amazon S3 on Outposts bucket's replication configuration. To create
 * an S3 bucket's replication configuration, see PutBucketReplication
 * in the *Amazon S3 API Reference*.
 *
 * Creates a replication configuration or replaces an existing one. For information about
 * S3 replication on Outposts configuration, see Replicating objects for
 * S3 on Outposts in the *Amazon S3 User Guide*.
 *
 * It can take a while to propagate `PUT` or `DELETE` requests for
 * a replication configuration to all S3 on Outposts systems. Therefore, the replication
 * configuration that's returned by a `GET` request soon after a
 * `PUT` or `DELETE` request might return a more recent result
 * than what's on the Outpost. If an Outpost is offline, the delay in updating the
 * replication configuration on that Outpost can be significant.
 *
 * Specify the replication configuration in the request body. In the replication
 * configuration, you provide the following information:
 *
 * - The name of the destination bucket or buckets where you want S3 on Outposts to
 * replicate objects
 *
 * - The Identity and Access Management (IAM) role that S3 on Outposts can assume to replicate objects on
 * your behalf
 *
 * - Other relevant information, such as replication rules
 *
 * A replication configuration must include at least one rule and can contain a maximum of
 * 100. Each rule identifies a subset of objects to replicate by filtering the objects in the
 * source Outposts bucket. To choose additional subsets of objects to replicate, add a rule
 * for each subset.
 *
 * To specify a subset of the objects in the source Outposts bucket to apply a replication
 * rule to, add the `Filter` element as a child of the `Rule` element.
 * You can filter objects based on an object key prefix, one or more object tags, or both.
 * When you add the `Filter` element in the configuration, you must also add the
 * following elements: `DeleteMarkerReplication`, `Status`, and
 * `Priority`.
 *
 * Using `PutBucketReplication` on Outposts requires that both the source and
 * destination buckets must have versioning enabled. For information about enabling versioning
 * on a bucket, see Managing S3 Versioning
 * for your S3 on Outposts bucket.
 *
 * For information about S3 on Outposts replication failure reasons, see Replication failure reasons in the *Amazon S3 User Guide*.
 *
 * **Handling Replication of Encrypted Objects**
 *
 * Outposts buckets are encrypted at all times. All the objects in the source Outposts
 * bucket are encrypted and can be replicated. Also, all the replicas in the destination
 * Outposts bucket are encrypted with the same encryption key as the objects in the source
 * Outposts bucket.
 *
 * **Permissions**
 *
 * To create a `PutBucketReplication` request, you must have
 * `s3-outposts:PutReplicationConfiguration` permissions for the bucket. The
 * Outposts bucket owner has this permission by default and can grant it to others. For more
 * information about permissions, see Setting up IAM with
 * S3 on Outposts and Managing access to
 * S3 on Outposts buckets.
 *
 * To perform this operation, the user or role must also have the
 * `iam:CreateRole` and `iam:PassRole` permissions. For more
 * information, see Granting a user permissions to
 * pass a role to an Amazon Web Services service.
 *
 * All Amazon S3 on Outposts REST API requests for this action require an additional parameter of `x-amz-outpost-id` to be passed with the request. In addition, you must use an S3 on Outposts endpoint hostname prefix instead of `s3-control`. For an example of the request syntax for Amazon S3 on Outposts that uses the S3 on Outposts endpoint hostname prefix and the `x-amz-outpost-id` derived by using the access point ARN, see the Examples section.
 *
 * The following operations are related to `PutBucketReplication`:
 *
 * - GetBucketReplication
 *
 * - DeleteBucketReplication
 */
export const putBucketReplication: API.OperationMethod<
  PutBucketReplicationRequest,
  PutBucketReplicationResponse,
  PutBucketReplicationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c4, 0) as any as S.Schema<PutBucketReplicationRequest>,
  output: __S(129, __c4, 1) as any as S.Schema<PutBucketReplicationResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutBucketReplication",
  endpointHostPrefix: "{AccountId}.",
}));

export type PutBucketTaggingError = CommonErrors;
/**
 * This action puts tags on an Amazon S3 on Outposts bucket. To put tags on an S3 bucket, see
 * PutBucketTagging in the *Amazon S3 API Reference*.
 *
 * Sets the tags for an S3 on Outposts bucket. For more information, see Using
 * Amazon S3 on Outposts in the *Amazon S3 User Guide*.
 *
 * Use tags to organize your Amazon Web Services bill to reflect your own cost structure. To do this,
 * sign up to get your Amazon Web Services account bill with tag key values included. Then, to see the cost
 * of combined resources, organize your billing information according to resources with the
 * same tag key values. For example, you can tag several resources with a specific application
 * name, and then organize your billing information to see the total cost of that application
 * across several services. For more information, see Cost allocation and
 * tagging.
 *
 * Within a bucket, if you add a tag that has the same key as an existing tag, the new
 * value overwrites the old value. For more information, see Using cost allocation in Amazon S3
 * bucket tags.
 *
 * To use this action, you must have permissions to perform the
 * `s3-outposts:PutBucketTagging` action. The Outposts bucket owner has this
 * permission by default and can grant this permission to others. For more information about
 * permissions, see Permissions Related to Bucket Subresource Operations and Managing
 * access permissions to your Amazon S3 resources.
 *
 * `PutBucketTagging` has the following special errors:
 *
 * - Error code: `InvalidTagError`
 *
 * - Description: The tag provided was not a valid tag. This error can occur if
 * the tag did not pass input validation. For information about tag restrictions,
 * see
 * User-Defined Tag Restrictions and
 * Amazon Web Services-Generated Cost Allocation Tag Restrictions.
 *
 * - Error code: `MalformedXMLError`
 *
 * - Description: The XML provided does not match the schema.
 *
 * - Error code: `OperationAbortedError `
 *
 * - Description: A conflicting conditional action is currently in progress
 * against this resource. Try again.
 *
 * - Error code: `InternalError`
 *
 * - Description: The service was unable to apply the provided tag to the
 * bucket.
 *
 * All Amazon S3 on Outposts REST API requests for this action require an additional parameter of `x-amz-outpost-id` to be passed with the request. In addition, you must use an S3 on Outposts endpoint hostname prefix instead of `s3-control`. For an example of the request syntax for Amazon S3 on Outposts that uses the S3 on Outposts endpoint hostname prefix and the `x-amz-outpost-id` derived by using the access point ARN, see the Examples section.
 *
 * The following actions are related to `PutBucketTagging`:
 *
 * - GetBucketTagging
 *
 * - DeleteBucketTagging
 */
export const putBucketTagging: API.OperationMethod<
  PutBucketTaggingRequest,
  PutBucketTaggingResponse,
  PutBucketTaggingError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(161, __c5, 1) as any as S.Schema<PutBucketTaggingRequest>,
  output: __S(162, __c5, 2) as any as S.Schema<PutBucketTaggingResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutBucketTagging",
  endpointHostPrefix: "{AccountId}.",
}));

export type PutBucketVersioningError = CommonErrors;
/**
 * This operation sets the versioning state
 * for
 * S3 on Outposts
 * buckets
 * only. To set the versioning state for an S3 bucket, see PutBucketVersioning in the *Amazon S3 API Reference*.
 *
 * Sets the versioning state for an S3 on Outposts bucket. With
 * S3
 * Versioning,
 * you can save multiple distinct copies of your
 * objects
 * and recover from unintended user actions and application failures.
 *
 * You can set the versioning state to one of the following:
 *
 * - **Enabled** - Enables versioning for the objects in
 * the bucket. All objects added to the bucket receive a unique version ID.
 *
 * - **Suspended** - Suspends versioning for the objects
 * in the bucket. All objects added to the bucket receive the version ID
 * `null`.
 *
 * If you've never set versioning on your bucket, it has no versioning state. In that case,
 * a
 * GetBucketVersioning request does not return a versioning state value.
 *
 * When you enable S3 Versioning, for each object in your bucket, you have a current
 * version and zero or more noncurrent versions. You can configure your bucket S3 Lifecycle
 * rules to expire noncurrent versions after a specified time period. For more information,
 * see Creating and managing
 * a lifecycle configuration for your S3 on Outposts bucket in the Amazon S3
 * User Guide.
 *
 * If you have an object expiration lifecycle configuration in your non-versioned bucket
 * and you want to maintain the same permanent delete behavior when you enable versioning, you
 * must add a noncurrent expiration policy. The noncurrent expiration lifecycle configuration
 * will manage the deletes of the noncurrent object versions in the version-enabled bucket.
 * For more information, see Versioning in the Amazon S3
 * User Guide.
 *
 * All Amazon S3 on Outposts REST API requests for this action require an additional parameter of `x-amz-outpost-id` to be passed with the request. In addition, you must use an S3 on Outposts endpoint hostname prefix instead of `s3-control`. For an example of the request syntax for Amazon S3 on Outposts that uses the S3 on Outposts endpoint hostname prefix and the `x-amz-outpost-id` derived by using the access point ARN, see the Examples section.
 *
 * The following operations are related to `PutBucketVersioning` for
 * S3 on Outposts.
 *
 * - GetBucketVersioning
 *
 * - PutBucketLifecycleConfiguration
 *
 * - GetBucketLifecycleConfiguration
 */
export const putBucketVersioning: API.OperationMethod<
  PutBucketVersioningRequest,
  PutBucketVersioningResponse,
  PutBucketVersioningError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(193, __c6, 1) as any as S.Schema<PutBucketVersioningRequest>,
  output: __S(194, __c6, 2) as any as S.Schema<PutBucketVersioningResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutBucketVersioning",
  endpointHostPrefix: "{AccountId}.",
}));

export type PutJobTaggingError =
  | InternalServiceException
  | NotFoundException
  | TooManyRequestsException
  | TooManyTagsException
  | CommonErrors;
/**
 * Sets the supplied tag-set on an S3 Batch Operations job.
 *
 * A tag is a key-value pair. You can associate S3 Batch Operations tags with any job by sending
 * a PUT request against the tagging subresource that is associated with the job. To modify
 * the existing tag set, you can either replace the existing tag set entirely, or make changes
 * within the existing tag set by retrieving the existing tag set using GetJobTagging, modify that tag set, and use this operation to replace the tag set
 * with the one you modified. For more information, see Controlling
 * access and labeling jobs using tags in the *Amazon S3 User Guide*.
 *
 * - If you send this request with an empty tag set, Amazon S3 deletes the existing
 * tag set on the Batch Operations job. If you use this method, you are charged for a Tier
 * 1 Request (PUT). For more information, see Amazon S3 pricing.
 *
 * - For deleting existing tags for your Batch Operations job, a DeleteJobTagging request is preferred because it achieves the same
 * result without incurring charges.
 *
 * - A few things to consider about using tags:
 *
 * - Amazon S3 limits the maximum number of tags to 50 tags per job.
 *
 * - You can associate up to 50 tags with a job as long as they have unique
 * tag keys.
 *
 * - A tag key can be up to 128 Unicode characters in length, and tag values
 * can be up to 256 Unicode characters in length.
 *
 * - The key and values are case sensitive.
 *
 * - For tagging-related restrictions related to characters and encodings, see
 * User-Defined Tag Restrictions in the *Billing and Cost Management User Guide*.
 *
 * ### Permissions
 *
 * To use the
 * `PutJobTagging` operation, you must have permission to
 * perform the `s3:PutJobTagging` action.
 *
 * Related actions include:
 *
 * - CreateJob
 *
 * - GetJobTagging
 *
 * - DeleteJobTagging
 */
export const putJobTagging: API.OperationMethod<
  PutJobTaggingRequest,
  PutJobTaggingResult,
  PutJobTaggingError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c7, 0) as any as S.Schema<PutJobTaggingRequest>,
  output: __S(225, __c7, 1) as any as S.Schema<PutJobTaggingResult>,
  errors: [
    InternalServiceException,
    NotFoundException,
    TooManyRequestsException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutJobTagging",
  endpointHostPrefix: "{AccountId}.",
}));

export type PutMultiRegionAccessPointPolicyError =
  | NoSuchMultiRegionAccessPoint
  | InvalidRequest
  | CommonErrors;
/**
 * This operation is not supported by directory buckets.
 *
 * Associates an access control policy with the specified Multi-Region Access Point. Each Multi-Region Access Point can have only
 * one policy, so a request made to this action replaces any existing policy that is
 * associated with the specified Multi-Region Access Point.
 *
 * This action will always be routed to the US West (Oregon) Region. For more information
 * about the restrictions around working with Multi-Region Access Points, see Multi-Region Access Point
 * restrictions and limitations in the *Amazon S3 User Guide*.
 *
 * The following actions are related to
 * `PutMultiRegionAccessPointPolicy`:
 *
 * - GetMultiRegionAccessPointPolicy
 *
 * - GetMultiRegionAccessPointPolicyStatus
 */
export const putMultiRegionAccessPointPolicy: API.OperationMethod<
  PutMultiRegionAccessPointPolicyRequest,
  PutMultiRegionAccessPointPolicyResult,
  PutMultiRegionAccessPointPolicyError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c8, 0) as any as S.Schema<PutMultiRegionAccessPointPolicyRequest>,
  output: __S(257, __c8, 1) as any as S.Schema<PutMultiRegionAccessPointPolicyResult>,
  errors: [NoSuchMultiRegionAccessPoint, InvalidRequest],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutMultiRegionAccessPointPolicy",
  endpointHostPrefix: "{AccountId}.",
}));

export type PutPublicAccessBlockError = CommonErrors;
/**
 * This operation is not supported by directory buckets.
 *
 * Creates or modifies the `PublicAccessBlock` configuration for an
 * Amazon Web Services account. This operation may be restricted when the account is managed by
 * organization-level Block Public Access policies. You might get an Access Denied (403) error
 * when the account is managed by organization-level Block Public Access policies.
 * Organization-level policies override account-level settings, preventing direct
 * account-level modifications. For this operation, users must have the
 * `s3:PutAccountPublicAccessBlock` permission. For more information, see
 * Using Amazon S3 block public access.
 *
 * Related actions include:
 *
 * - GetPublicAccessBlock
 *
 * - DeletePublicAccessBlock
 */
export const putPublicAccessBlock: API.OperationMethod<
  PutPublicAccessBlockRequest,
  PutPublicAccessBlockResponse,
  PutPublicAccessBlockError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(288, __c9, 0) as any as S.Schema<PutPublicAccessBlockRequest>,
  output: __S(289, __c9, 1) as any as S.Schema<PutPublicAccessBlockResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutPublicAccessBlock",
  endpointHostPrefix: "{AccountId}.",
}));

export type PutStorageLensConfigurationError =
  | InvalidRequest
  | MissingBucketLevelActivityMetrics
  | CommonErrors;
/**
 * This operation is not supported by directory buckets.
 *
 * Puts an Amazon S3 Storage Lens configuration. For more information about S3 Storage Lens, see Working with
 * Amazon S3 Storage Lens in the *Amazon S3 User Guide*. For a complete list of S3 Storage Lens metrics, see S3 Storage Lens metrics glossary in the *Amazon S3 User Guide*.
 *
 * To use this action, you must have permission to perform the
 * `s3:PutStorageLensConfiguration` action. For more information, see Setting permissions to use Amazon S3 Storage Lens in the
 * *Amazon S3 User Guide*.
 */
export const putStorageLensConfiguration: API.OperationMethod<
  PutStorageLensConfigurationRequest,
  PutStorageLensConfigurationResponse,
  PutStorageLensConfigurationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c10, 0) as any as S.Schema<PutStorageLensConfigurationRequest>,
  output: __S(321, __c10, 1) as any as S.Schema<PutStorageLensConfigurationResponse>,
  errors: [InvalidRequest, MissingBucketLevelActivityMetrics],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutStorageLensConfiguration",
  endpointHostPrefix: "{AccountId}.",
}));

export type PutStorageLensConfigurationTaggingError = NoSuchConfiguration | CommonErrors;
/**
 * This operation is not supported by directory buckets.
 *
 * Put or replace tags on an existing Amazon S3 Storage Lens configuration. For more information
 * about S3 Storage Lens, see Assessing your storage activity and usage with Amazon S3 Storage Lens in the
 * *Amazon S3 User Guide*.
 *
 * To use this action, you must have permission to perform the
 * `s3:PutStorageLensConfigurationTagging` action. For more information, see
 * Setting permissions to
 * use Amazon S3 Storage Lens in the *Amazon S3 User Guide*.
 */
export const putStorageLensConfigurationTagging: API.OperationMethod<
  PutStorageLensConfigurationTaggingRequest,
  PutStorageLensConfigurationTaggingResult,
  PutStorageLensConfigurationTaggingError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c11, 0) as any as S.Schema<PutStorageLensConfigurationTaggingRequest>,
  output: __S(353, __c11, 1) as any as S.Schema<PutStorageLensConfigurationTaggingResult>,
  errors: [NoSuchConfiguration],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutStorageLensConfigurationTagging",
  endpointHostPrefix: "{AccountId}.",
}));

export type SubmitMultiRegionAccessPointRoutesError = CommonErrors;
/**
 * This operation is not supported by directory buckets.
 *
 * Submits an updated route configuration for a Multi-Region Access Point. This API operation updates the
 * routing status for the specified Regions from active to passive, or from passive to active.
 * A value of `0` indicates a passive status, which means that traffic won't be
 * routed to the specified Region. A value of `100` indicates an active status,
 * which means that traffic will be routed to the specified Region. At least one Region must
 * be active at all times.
 *
 * When the routing configuration is changed, any in-progress operations (uploads, copies,
 * deletes, and so on) to formerly active Regions will continue to run to their final
 * completion state (success or failure). The routing configurations of any Regions that
 * aren't specified remain unchanged.
 *
 * Updated routing configurations might not be immediately applied. It can take up to 2
 * minutes for your changes to take effect.
 *
 * To submit routing control changes and failover requests, use the Amazon S3 failover control
 * infrastructure endpoints in these five Amazon Web Services Regions:
 *
 * - `us-east-1`
 *
 * - `us-west-2`
 *
 * - `ap-southeast-2`
 *
 * - `ap-northeast-1`
 *
 * - `eu-west-1`
 */
export const submitMultiRegionAccessPointRoutes: API.OperationMethod<
  SubmitMultiRegionAccessPointRoutesRequest,
  SubmitMultiRegionAccessPointRoutesResult,
  SubmitMultiRegionAccessPointRoutesError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(384, __c12, 0) as any as S.Schema<SubmitMultiRegionAccessPointRoutesRequest>,
  output: __S(385, __c12, 1) as any as S.Schema<SubmitMultiRegionAccessPointRoutesResult>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SubmitMultiRegionAccessPointRoutes",
  endpointHostPrefix: "{AccountId}.",
}));

export type TagResourceError = NoSuchAccessPoint | CommonErrors;
/**
 * Creates a new user-defined tag or updates an existing tag. Each tag is a label consisting of a key and value that is applied to your resource. Tags can help you organize, track costs for, and control access to your resources. You can add up to 50 Amazon Web Services resource tags for each S3 resource.
 *
 * This operation is only supported for the following Amazon S3 resource:
 *
 * - General purpose buckets
 *
 * - Access Points for directory buckets
 *
 * - Access Points for general purpose buckets
 *
 * - Directory buckets
 *
 * - S3 Storage Lens groups
 *
 * - S3 Access Grants instances, registered locations, or grants.
 *
 * ### Permissions
 *
 * For general purpose buckets, access points for general purpose buckets, Storage Lens groups, and S3 Access Grants, you must have the `s3:TagResource` permission to use this operation.
 *
 * ### Directory bucket permissions
 *
 * For directory buckets, you must have the `s3express:TagResource` permission to use this operation. For more information about directory buckets policies and permissions, see Identity and Access Management (IAM) for S3 Express One Zone in the *Amazon S3 User Guide*.
 *
 * ### HTTP Host header syntax
 *
 * **Directory buckets ** - The HTTP Host header syntax is `s3express-control.*region*.amazonaws.com`.
 *
 * For information about S3 Tagging errors, see List of Amazon S3 Tagging error codes.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResult,
  TagResourceError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(416, __c13, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(417, __c13, 1) as any as S.Schema<TagResourceResult>,
  errors: [NoSuchAccessPoint],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
  endpointHostPrefix: "{AccountId}.",
}));

export type UntagResourceError = NoSuchAccessPoint | CommonErrors;
/**
 * This operation removes the specified user-defined tags from an S3 resource. You can pass one or more tag keys.
 *
 * This operation is only supported for the following Amazon S3 resources:
 *
 * - General purpose buckets
 *
 * - Access Points for directory buckets
 *
 * - Access Points for general purpose buckets
 *
 * - Directory buckets
 *
 * - S3 Storage Lens groups
 *
 * - S3 Access Grants instances, registered locations, and grants.
 *
 * ### Permissions
 *
 * For general purpose buckets, access points for general purpose buckets, Storage Lens groups, and S3 Access Grants, you must have the `s3:UntagResource` permission to use this operation.
 *
 * ### Directory bucket permissions
 *
 * For directory buckets, you must have the `s3express:UntagResource` permission to use this operation. For more information about directory buckets policies and permissions, see Identity and Access Management (IAM) for S3 Express One Zone in the *Amazon S3 User Guide*.
 *
 * ### HTTP Host header syntax
 *
 * **Directory buckets ** - The HTTP Host header syntax is `s3express-control.*region*.amazonaws.com`.
 *
 * For information about S3 Tagging errors, see List of Amazon S3
 * Tagging error codes.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResult,
  UntagResourceError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(449, __c14, 1) as any as S.Schema<UntagResourceRequest>,
  output: __S(450, __c14, 2) as any as S.Schema<UntagResourceResult>,
  errors: [NoSuchAccessPoint],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
  endpointHostPrefix: "{AccountId}.",
}));

export type UpdateAccessGrantsLocationError = CommonErrors;
/**
 * Updates the IAM role of a registered location in your S3 Access Grants instance.
 *
 * ### Permissions
 *
 * You must have the `s3:UpdateAccessGrantsLocation` permission to use this operation.
 *
 * ### Additional Permissions
 *
 * You must also have the following permission: `iam:PassRole`
 */
export const updateAccessGrantsLocation: API.OperationMethod<
  UpdateAccessGrantsLocationRequest,
  UpdateAccessGrantsLocationResult,
  UpdateAccessGrantsLocationError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(480, __c15, 0) as any as S.Schema<UpdateAccessGrantsLocationRequest>,
  output: __S(481, __c15, 1) as any as S.Schema<UpdateAccessGrantsLocationResult>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAccessGrantsLocation",
  endpointHostPrefix: "{AccountId}.",
}));

export type UpdateJobPriorityError =
  | BadRequestException
  | InternalServiceException
  | NotFoundException
  | TooManyRequestsException
  | InvalidRequest
  | JobStatusTransitionForbidden
  | CommonErrors;
/**
 * Updates an existing S3 Batch Operations job's priority. For more information, see S3 Batch Operations in the *Amazon S3 User Guide*.
 *
 * ### Permissions
 *
 * To use the
 * `UpdateJobPriority` operation, you must have permission to
 * perform the `s3:UpdateJobPriority` action.
 *
 * Related actions include:
 *
 * - CreateJob
 *
 * - ListJobs
 *
 * - DescribeJob
 *
 * - UpdateJobStatus
 */
export const updateJobPriority: API.OperationMethod<
  UpdateJobPriorityRequest,
  UpdateJobPriorityResult,
  UpdateJobPriorityError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(512, __c16, 0) as any as S.Schema<UpdateJobPriorityRequest>,
  output: __S(513, __c16, 1) as any as S.Schema<UpdateJobPriorityResult>,
  errors: [
    BadRequestException,
    InternalServiceException,
    NotFoundException,
    TooManyRequestsException,
    InvalidRequest,
    JobStatusTransitionForbidden,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateJobPriority",
  endpointHostPrefix: "{AccountId}.",
}));

export type UpdateJobStatusError =
  | BadRequestException
  | InternalServiceException
  | JobStatusException
  | NotFoundException
  | TooManyRequestsException
  | InvalidRequest
  | JobStatusTransitionForbidden
  | CommonErrors;
/**
 * Updates the status for the specified job. Use this operation to confirm that you want to
 * run a job or to cancel an existing job. For more information, see S3 Batch Operations in the *Amazon S3 User Guide*.
 *
 * ### Permissions
 *
 * To use the
 * `UpdateJobStatus` operation, you must have permission to
 * perform the `s3:UpdateJobStatus` action.
 *
 * Related actions include:
 *
 * - CreateJob
 *
 * - ListJobs
 *
 * - DescribeJob
 *
 * - UpdateJobStatus
 */
export const updateJobStatus: API.OperationMethod<
  UpdateJobStatusRequest,
  UpdateJobStatusResult,
  UpdateJobStatusError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(544, __c17, 0) as any as S.Schema<UpdateJobStatusRequest>,
  output: __S(545, __c17, 1) as any as S.Schema<UpdateJobStatusResult>,
  errors: [
    BadRequestException,
    InternalServiceException,
    JobStatusException,
    NotFoundException,
    TooManyRequestsException,
    InvalidRequest,
    JobStatusTransitionForbidden,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateJobStatus",
  endpointHostPrefix: "{AccountId}.",
}));

export type UpdateStorageLensGroupError = CommonErrors;
/**
 * Updates the existing Storage Lens group.
 *
 * To use this operation, you must have the permission to perform the
 * `s3:UpdateStorageLensGroup` action. For more information about the required Storage Lens
 * Groups permissions, see Setting account permissions to use S3 Storage Lens groups.
 *
 * For information about Storage Lens groups errors, see List of Amazon S3 Storage
 * Lens error codes.
 */
export const updateStorageLensGroup: API.OperationMethod<
  UpdateStorageLensGroupRequest,
  UpdateStorageLensGroupResponse,
  UpdateStorageLensGroupError,
  Creds | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(576, __c18, 0) as any as S.Schema<UpdateStorageLensGroupRequest>,
  output: __S(577, __c18, 1) as any as S.Schema<UpdateStorageLensGroupResponse>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateStorageLensGroup",
  endpointHostPrefix: "{AccountId}.",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          Name: S.String.pipe(T.HttpLabel("Name")),
          Policy: S.String,
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/v20180820/accesspointforobjectlambda/{Name}/policy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "PutAccessPointPolicyForObjectLambdaRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "PutAccessPointPolicyForObjectLambdaResponse",
      });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          Name: S.String.pipe(T.HttpLabel("Name"), T.ContextParam("AccessPointName")),
          Scope: __S(962, __c30, 2),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/v20180820/accesspoint/{Name}/scope" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({
              RequiresAccountId: { value: true },
              UseS3ExpressControlEndpoint: { value: true },
            }),
          ),
        ),
      ).annotate({ identifier: "PutAccessPointScopeRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "PutAccessPointScopeResponse",
      });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Rules: S.optional(__S(2762, __c86, 10)) })).annotate({
        identifier: "LifecycleConfiguration",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          LifecycleConfiguration: S.optional(__S(64, __c2, 0))
            .pipe(T.HttpPayload(), T.XmlName("LifecycleConfiguration"))
            .annotate({ identifier: "LifecycleConfiguration" }),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/v20180820/bucket/{Bucket}/lifecycleconfiguration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "PutBucketLifecycleConfigurationRequest" });
    case 2:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "PutBucketLifecycleConfigurationResponse",
      });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          ConfirmRemoveSelfBucketAccess: S.optional(S.Boolean).pipe(
            T.HttpHeader("x-amz-confirm-remove-self-bucket-access"),
          ),
          Policy: S.String,
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/v20180820/bucket/{Bucket}/policy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "PutBucketPolicyRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "PutBucketPolicyResponse",
      });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          ReplicationConfiguration: __S(2863, __c89, 15)
            .pipe(T.HttpPayload(), T.XmlName("ReplicationConfiguration"))
            .annotate({ identifier: "ReplicationConfiguration" }),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/v20180820/bucket/{Bucket}/replication" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "PutBucketReplicationRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "PutBucketReplicationResponse",
      });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ TagSet: __S(1248, __c39, 0) })).annotate({
        identifier: "Tagging",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          Tagging: __S(160, __c5, 0)
            .pipe(T.HttpPayload(), T.XmlName("Tagging"))
            .annotate({ identifier: "Tagging" }),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/v20180820/bucket/{Bucket}/tagging" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "PutBucketTaggingRequest" });
    case 2:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "PutBucketTaggingResponse",
      });
  }
}
function __c6(j: number): any {
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
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          MFA: S.optional(S.String).pipe(T.HttpHeader("x-amz-mfa")),
          VersioningConfiguration: __S(192, __c6, 0)
            .pipe(T.HttpPayload(), T.XmlName("VersioningConfiguration"))
            .annotate({ identifier: "VersioningConfiguration" }),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/v20180820/bucket/{Bucket}/versioning" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "PutBucketVersioningRequest" });
    case 2:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "PutBucketVersioningResponse",
      });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          JobId: S.String.pipe(T.HttpLabel("JobId")),
          Tags: __S(1248, __c39, 0),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/v20180820/jobs/{JobId}/tagging" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "PutJobTaggingRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({ identifier: "PutJobTaggingResult" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          ClientToken: S.String.pipe(T.IdempotencyToken()),
          Details: __S(2176, __c68, 0),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/v20180820/async-requests/mrap/put-policy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "PutMultiRegionAccessPointPolicyRequest" });
    case 1:
      return S.suspend(() => S.Struct({ RequestTokenARN: S.optional(S.String) }).pipe(ns)).annotate(
        { identifier: "PutMultiRegionAccessPointPolicyResult" },
      );
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          PublicAccessBlockConfiguration: __S(896, __c28, 0)
            .pipe(T.HttpPayload(), T.XmlName("PublicAccessBlockConfiguration"))
            .annotate({ identifier: "PublicAccessBlockConfiguration" }),
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/v20180820/configuration/publicAccessBlock" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "PutPublicAccessBlockRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "PutPublicAccessBlockResponse",
      });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConfigId: S.String.pipe(T.HttpLabel("ConfigId")),
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          StorageLensConfiguration: __S(3291, __c102, 27),
          Tags: S.optional(__S(3329, __c104, 1)),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/v20180820/storagelens/{ConfigId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "PutStorageLensConfigurationRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "PutStorageLensConfigurationResponse",
      });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConfigId: S.String.pipe(T.HttpLabel("ConfigId")),
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          Tags: __S(3329, __c104, 1),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/v20180820/storagelens/{ConfigId}/tagging" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "PutStorageLensConfigurationTaggingRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "PutStorageLensConfigurationTaggingResult",
      });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          Mrap: S.String.pipe(T.HttpLabel("Mrap")),
          RouteUpdates: __S(3169, __c99, 1),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PATCH", uri: "/v20180820/mrap/instances/{Mrap+}/routes" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "SubmitMultiRegionAccessPointRoutesRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "SubmitMultiRegionAccessPointRoutesResult",
      });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn"), T.ContextParam("ResourceArn")),
          Tags: __S(705, __c22, 1),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/v20180820/tags/{ResourceArn+}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({ identifier: "TagResourceResult" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn"), T.ContextParam("ResourceArn")),
          TagKeys: __S(448, __c14, 0).pipe(T.HttpQuery("tagKeys")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/v20180820/tags/{ResourceArn+}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
    case 2:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({ identifier: "UntagResourceResult" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          AccessGrantsLocationId: S.String.pipe(T.HttpLabel("AccessGrantsLocationId")),
          IAMRoleArn: S.String,
        }).pipe(
          T.all(
            ns,
            T.Http({
              method: "PUT",
              uri: "/v20180820/accessgrantsinstance/location/{AccessGrantsLocationId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "UpdateAccessGrantsLocationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CreatedAt: S.optional(T.DateFromString),
          AccessGrantsLocationId: S.optional(S.String),
          AccessGrantsLocationArn: S.optional(S.String),
          LocationScope: S.optional(S.String),
          IAMRoleArn: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "UpdateAccessGrantsLocationResult" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          JobId: S.String.pipe(T.HttpLabel("JobId")),
          Priority: S.Number.pipe(T.HttpQuery("priority")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/v20180820/jobs/{JobId}/priority" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "UpdateJobPriorityRequest" });
    case 1:
      return S.suspend(() => S.Struct({ JobId: S.String, Priority: S.Number }).pipe(ns)).annotate({
        identifier: "UpdateJobPriorityResult",
      });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          JobId: S.String.pipe(T.HttpLabel("JobId")),
          RequestedJobStatus: S.String.pipe(T.HttpQuery("requestedJobStatus")),
          StatusUpdateReason: S.optional(S.String).pipe(T.HttpQuery("statusUpdateReason")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/v20180820/jobs/{JobId}/status" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "UpdateJobStatusRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          JobId: S.optional(S.String),
          Status: S.optional(S.String),
          StatusUpdateReason: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "UpdateJobStatusResult" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String.pipe(T.HttpLabel("Name")),
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          StorageLensGroup: __S(1384, __c43, 8),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/v20180820/storagelensgroup/{Name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "UpdateStorageLensGroupRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "UpdateStorageLensGroupResponse",
      });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          IdentityCenterArn: S.String,
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/v20180820/accessgrantsinstance/identitycenter" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "AssociateAccessGrantsIdentityCenterRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "AssociateAccessGrantsIdentityCenterResponse",
      });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Bucket: S.String, BucketAccountId: S.optional(S.String) }),
      ).annotate({ identifier: "Region" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          AccessGrantsLocationId: S.String,
          AccessGrantsLocationConfiguration: S.optional(__S(768, __c24, 0)),
          Grantee: __S(736, __c23, 0),
          Permission: S.String,
          ApplicationArn: S.optional(S.String),
          S3PrefixType: S.optional(S.String),
          Tags: S.optional(__S(705, __c22, 1)),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/v20180820/accessgrantsinstance/grant" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "CreateAccessGrantRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CreatedAt: S.optional(T.DateFromString),
          AccessGrantId: S.optional(S.String),
          AccessGrantArn: S.optional(S.String),
          Grantee: S.optional(__S(736, __c23, 0)),
          AccessGrantsLocationId: S.optional(S.String),
          AccessGrantsLocationConfiguration: S.optional(__S(768, __c24, 0)),
          Permission: S.optional(S.String),
          ApplicationArn: S.optional(S.String),
          GrantScope: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "CreateAccessGrantResult" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Value: S.String })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(704, __c22, 0)
          .pipe(/*@__PURE__*/ T.XmlName("Tag"))
          .annotate({ identifier: "Tag" }),
      );
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GranteeType: S.optional(S.String), GranteeIdentifier: S.optional(S.String) }),
      ).annotate({ identifier: "Grantee" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ S3SubPrefix: S.optional(S.String) })).annotate({
        identifier: "AccessGrantsLocationConfiguration",
      });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          IdentityCenterArn: S.optional(S.String),
          Tags: S.optional(__S(705, __c22, 1)),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/v20180820/accessgrantsinstance" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "CreateAccessGrantsInstanceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CreatedAt: S.optional(T.DateFromString),
          AccessGrantsInstanceId: S.optional(S.String),
          AccessGrantsInstanceArn: S.optional(S.String),
          IdentityCenterArn: S.optional(S.String),
          IdentityCenterInstanceArn: S.optional(S.String),
          IdentityCenterApplicationArn: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "CreateAccessGrantsInstanceResult" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          LocationScope: S.String,
          IAMRoleArn: S.String,
          Tags: S.optional(__S(705, __c22, 1)),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/v20180820/accessgrantsinstance/location" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "CreateAccessGrantsLocationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CreatedAt: S.optional(T.DateFromString),
          AccessGrantsLocationId: S.optional(S.String),
          AccessGrantsLocationArn: S.optional(S.String),
          LocationScope: S.optional(S.String),
          IAMRoleArn: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "CreateAccessGrantsLocationResult" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          Name: S.String.pipe(T.HttpLabel("Name"), T.ContextParam("AccessPointName")),
          Bucket: S.String.pipe(T.ContextParam("Bucket")),
          VpcConfiguration: S.optional(__S(928, __c29, 0)),
          PublicAccessBlockConfiguration: S.optional(__S(896, __c28, 0)),
          BucketAccountId: S.optional(S.String),
          Scope: S.optional(__S(962, __c30, 2)),
          Tags: S.optional(__S(705, __c22, 1)),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/v20180820/accesspoint/{Name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "CreateAccessPointRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ AccessPointArn: S.optional(S.String), Alias: S.optional(S.String) }).pipe(ns),
      ).annotate({ identifier: "CreateAccessPointResult" });
  }
}
function __c28(j: number): any {
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
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ VpcId: S.String })).annotate({
        identifier: "VpcConfiguration",
      });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("Prefix")));
    case 1:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("Permission")));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Prefixes: S.optional(__S(960, __c30, 0)).pipe(T.XmlName("Prefixes")),
          Permissions: S.optional(__S(961, __c30, 1)).pipe(T.XmlName("Permissions")),
        }),
      ).annotate({ identifier: "Scope" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          Name: S.String.pipe(T.HttpLabel("Name")),
          Configuration: __S(1030, __c32, 6),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/v20180820/accesspointforobjectlambda/{Name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "CreateAccessPointForObjectLambdaRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ObjectLambdaAccessPointArn: S.optional(S.String),
          Alias: S.optional(__S(1056, __c33, 0)),
        }).pipe(ns),
      ).annotate({ identifier: "CreateAccessPointForObjectLambdaResult" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("AllowedFeature")));
    case 1:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("Action")));
    case 2:
      return S.suspend(() =>
        S.Struct({ FunctionArn: S.String, FunctionPayload: S.optional(S.String) }),
      ).annotate({ identifier: "AwsLambdaTransformation" });
    case 3:
      return S.Union([/*@__PURE__*/ S.Struct({ AwsLambda: __S(1026, __c32, 2) })]);
    case 4:
      return S.suspend(() =>
        S.Struct({ Actions: __S(1025, __c32, 1), ContentTransformation: __S(1027, __c32, 3) }),
      ).annotate({ identifier: "ObjectLambdaTransformationConfiguration" });
    case 5:
      return S.Array(
        /*@__PURE__*/ __S(1028, __c32, 4)
          .pipe(/*@__PURE__*/ T.XmlName("TransformationConfiguration"))
          .annotate({ identifier: "ObjectLambdaTransformationConfiguration" }),
      );
    case 6:
      return S.suspend(() =>
        S.Struct({
          SupportingAccessPoint: S.String,
          CloudWatchMetricsEnabled: S.optional(S.Boolean),
          AllowedFeatures: S.optional(__S(1024, __c32, 0)),
          TransformationConfigurations: __S(1029, __c32, 5),
        }),
      ).annotate({ identifier: "ObjectLambdaConfiguration" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Value: S.optional(S.String), Status: S.optional(S.String) }),
      ).annotate({ identifier: "ObjectLambdaAccessPointAlias" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ LocationConstraint: S.optional(S.String) })).annotate({
        identifier: "CreateBucketConfiguration",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ACL: S.optional(S.String).pipe(T.HttpHeader("x-amz-acl")),
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
          CreateBucketConfiguration: S.optional(__S(1088, __c34, 0))
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
          OutpostId: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-outpost-id"),
            T.ContextParam("OutpostId"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/v20180820/bucket/{Bucket}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateBucketRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Location: S.optional(S.String).pipe(T.HttpHeader("Location")),
          BucketArn: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "CreateBucketResult" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          ConfirmationRequired: S.optional(S.Boolean),
          Operation: __S(1210, __c37, 26),
          Report: __S(1211, __c37, 27),
          ClientRequestToken: S.String.pipe(T.IdempotencyToken()),
          Manifest: S.optional(__S(1215, __c37, 31)),
          Description: S.optional(S.String),
          Priority: S.Number,
          RoleArn: S.String,
          Tags: S.optional(__S(1248, __c39, 0)),
          ManifestGenerator: S.optional(__S(1233, __c38, 17)),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/v20180820/jobs" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "CreateJobRequest" });
    case 1:
      return S.suspend(() => S.Struct({ JobId: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "CreateJobResult",
      });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Value: S.String })).annotate({
        identifier: "S3Tag",
      });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
    case 1:
      return S.suspend(() =>
        S.Struct({
          FunctionArn: S.optional(S.String),
          InvocationSchemaVersion: S.optional(S.String),
          UserArguments: S.optional(__S(1184, __c37, 0)),
        }),
      ).annotate({ identifier: "LambdaInvokeOperation" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          TypeIdentifier: S.optional(S.String),
          Identifier: S.optional(S.String),
          DisplayName: S.optional(S.String),
        }),
      ).annotate({ identifier: "S3Grantee" });
    case 3:
      return S.suspend(() =>
        S.Struct({ Grantee: S.optional(__S(1186, __c37, 2)), Permission: S.optional(S.String) }),
      ).annotate({ identifier: "S3Grant" });
    case 4:
      return S.Array(__S(1187, __c37, 3));
    case 5:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
    case 6:
      return S.suspend(() =>
        S.Struct({
          CacheControl: S.optional(S.String),
          ContentDisposition: S.optional(S.String),
          ContentEncoding: S.optional(S.String),
          ContentLanguage: S.optional(S.String),
          UserMetadata: S.optional(__S(1189, __c37, 5)),
          ContentLength: S.optional(S.Number),
          ContentMD5: S.optional(S.String),
          ContentType: S.optional(S.String),
          HttpExpiresDate: S.optional(T.DateFromString),
          RequesterCharged: S.optional(S.Boolean),
          SSEAlgorithm: S.optional(S.String),
        }),
      ).annotate({ identifier: "S3ObjectMetadata" });
    case 7:
      return S.suspend(() =>
        S.Struct({ Days: S.optional(S.Number), Years: S.optional(S.Number) }),
      ).annotate({ identifier: "S3ObjectLockEventHoldDuration" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          TargetResource: S.optional(S.String),
          CannedAccessControlList: S.optional(S.String),
          AccessControlGrants: S.optional(__S(1188, __c37, 4)),
          MetadataDirective: S.optional(S.String),
          AnnotationDirective: S.optional(S.String),
          ModifiedSinceConstraint: S.optional(T.DateFromString),
          NewObjectMetadata: S.optional(__S(1190, __c37, 6)),
          NewObjectTagging: S.optional(__S(1248, __c39, 0)),
          RedirectLocation: S.optional(S.String),
          RequesterPays: S.optional(S.Boolean),
          StorageClass: S.optional(S.String),
          UnModifiedSinceConstraint: S.optional(T.DateFromString),
          SSEAwsKmsKeyId: S.optional(S.String),
          TargetKeyPrefix: S.optional(S.String),
          ObjectLockLegalHoldStatus: S.optional(S.String),
          ObjectLockMode: S.optional(S.String),
          ObjectLockRetainUntilDate: S.optional(T.DateFromString),
          BucketKeyEnabled: S.optional(S.Boolean),
          ChecksumAlgorithm: S.optional(S.String),
          ObjectLockEventHold: S.optional(S.String),
          ObjectLockEventHoldDuration: S.optional(__S(1191, __c37, 7)),
        }),
      ).annotate({ identifier: "S3CopyObjectOperation" });
    case 9:
      return S.suspend(() =>
        S.Struct({ ID: S.optional(S.String), DisplayName: S.optional(S.String) }),
      ).annotate({ identifier: "S3ObjectOwner" });
    case 10:
      return S.suspend(() =>
        S.Struct({ Owner: __S(1193, __c37, 9), Grants: S.optional(__S(1188, __c37, 4)) }),
      ).annotate({ identifier: "S3AccessControlList" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          AccessControlList: S.optional(__S(1194, __c37, 10)),
          CannedAccessControlList: S.optional(S.String),
        }),
      ).annotate({ identifier: "S3AccessControlPolicy" });
    case 12:
      return S.suspend(() =>
        S.Struct({ AccessControlPolicy: S.optional(__S(1195, __c37, 11)) }),
      ).annotate({ identifier: "S3SetObjectAclOperation" });
    case 13:
      return S.suspend(() => S.Struct({ TagSet: S.optional(__S(1248, __c39, 0)) })).annotate({
        identifier: "S3SetObjectTaggingOperation",
      });
    case 14:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "S3DeleteObjectTaggingOperation",
      });
    case 15:
      return S.suspend(() =>
        S.Struct({ ExpirationInDays: S.optional(S.Number), GlacierJobTier: S.optional(S.String) }),
      ).annotate({ identifier: "S3InitiateRestoreObjectOperation" });
    case 16:
      return S.suspend(() => S.Struct({ Status: S.String })).annotate({
        identifier: "S3ObjectLockLegalHold",
      });
    case 17:
      return S.suspend(() => S.Struct({ LegalHold: __S(1200, __c37, 16) })).annotate({
        identifier: "S3SetObjectLegalHoldOperation",
      });
    case 18:
      return S.suspend(() =>
        S.Struct({ Days: S.optional(S.Number), Years: S.optional(S.Number) }),
      ).annotate({ identifier: "S3ObjectLockRetentionEventHoldDuration" });
    case 19:
      return S.suspend(() =>
        S.Struct({
          RetainUntilDate: S.optional(T.DateFromString),
          Mode: S.optional(S.String),
          EventHold: S.optional(S.String),
          EventHoldDuration: S.optional(__S(1202, __c37, 18)),
        }),
      ).annotate({ identifier: "S3Retention" });
    case 20:
      return S.suspend(() =>
        S.Struct({
          BypassGovernanceRetention: S.optional(S.Boolean),
          Retention: __S(1203, __c37, 19),
        }),
      ).annotate({ identifier: "S3SetObjectRetentionOperation" });
    case 21:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "S3ReplicateObjectOperation" });
    case 22:
      return S.suspend(() =>
        S.Struct({ ChecksumAlgorithm: S.optional(S.String), ChecksumType: S.optional(S.String) }),
      ).annotate({ identifier: "S3ComputeObjectChecksumOperation" });
    case 23:
      return S.suspend(() =>
        S.Struct({ KMSKeyArn: S.String, BucketKeyEnabled: S.optional(S.Boolean) }).pipe(
          T.XmlName("SSE-KMS"),
        ),
      ).annotate({ identifier: "S3UpdateObjectEncryptionSSEKMS" });
    case 24:
      return S.suspend(() =>
        S.Struct({
          SSEKMS: S.optional(__S(1207, __c37, 23))
            .pipe(T.XmlName("SSE-KMS"))
            .annotate({ identifier: "S3UpdateObjectEncryptionSSEKMS" }),
        }),
      ).annotate({ identifier: "ObjectEncryption" });
    case 25:
      return S.suspend(() =>
        S.Struct({ ObjectEncryption: S.optional(__S(1208, __c37, 24)) }),
      ).annotate({ identifier: "S3UpdateObjectEncryptionOperation" });
    case 26:
      return S.suspend(() =>
        S.Struct({
          LambdaInvoke: S.optional(__S(1185, __c37, 1)),
          S3PutObjectCopy: S.optional(__S(1192, __c37, 8)),
          S3PutObjectAcl: S.optional(__S(1196, __c37, 12)),
          S3PutObjectTagging: S.optional(__S(1197, __c37, 13)),
          S3DeleteObjectTagging: S.optional(__S(1198, __c37, 14)),
          S3InitiateRestoreObject: S.optional(__S(1199, __c37, 15)),
          S3PutObjectLegalHold: S.optional(__S(1201, __c37, 17)),
          S3PutObjectRetention: S.optional(__S(1204, __c37, 20)),
          S3ReplicateObject: S.optional(__S(1205, __c37, 21)),
          S3ComputeObjectChecksum: S.optional(__S(1206, __c37, 22)),
          S3UpdateObjectEncryption: S.optional(__S(1209, __c37, 25)),
        }),
      ).annotate({ identifier: "JobOperation" });
    case 27:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.optional(S.String),
          Format: S.optional(S.String),
          Enabled: S.Boolean,
          Prefix: S.optional(S.String),
          ReportScope: S.optional(S.String),
          ExpectedBucketOwner: S.optional(S.String),
        }),
      ).annotate({ identifier: "JobReport" });
    case 28:
      return S.Array(S.String);
    case 29:
      return S.suspend(() =>
        S.Struct({ Format: S.String, Fields: S.optional(__S(1212, __c37, 28)) }),
      ).annotate({ identifier: "JobManifestSpec" });
    case 30:
      return S.suspend(() =>
        S.Struct({ ObjectArn: S.String, ObjectVersionId: S.optional(S.String), ETag: S.String }),
      ).annotate({ identifier: "JobManifestLocation" });
    case 31:
      return S.suspend(() =>
        S.Struct({ Spec: __S(1213, __c37, 29), Location: __S(1214, __c37, 30) }),
      ).annotate({ identifier: "JobManifest" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({}).pipe(T.XmlName("SSE-S3"))).annotate({
        identifier: "SSES3Encryption",
      });
    case 1:
      return S.suspend(() => S.Struct({ KeyId: S.String }).pipe(T.XmlName("SSE-KMS"))).annotate({
        identifier: "SSEKMSEncryption",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          SSES3: S.optional(__S(1216, __c38, 0))
            .pipe(T.XmlName("SSE-S3"))
            .annotate({ identifier: "SSES3Encryption" }),
          SSEKMS: S.optional(__S(1217, __c38, 1))
            .pipe(T.XmlName("SSE-KMS"))
            .annotate({ identifier: "SSEKMSEncryption" }),
        }),
      ).annotate({ identifier: "GeneratedManifestEncryption" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          ExpectedManifestBucketOwner: S.optional(S.String),
          Bucket: S.String,
          ManifestPrefix: S.optional(S.String),
          ManifestEncryption: S.optional(__S(1218, __c38, 2)),
          ManifestFormat: S.String,
        }),
      ).annotate({ identifier: "S3ManifestOutputLocation" });
    case 4:
      return S.Array(S.String);
    case 5:
      return S.Array(S.String);
    case 6:
      return S.suspend(() =>
        S.Struct({
          MatchAnyPrefix: S.optional(__S(1221, __c38, 5)),
          MatchAnySuffix: S.optional(__S(1221, __c38, 5)),
          MatchAnySubstring: S.optional(__S(1221, __c38, 5)),
        }),
      ).annotate({ identifier: "KeyNameConstraint" });
    case 7:
      return S.Array(S.String);
    case 8:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "SSES3Filter" });
    case 9:
      return S.suspend(() =>
        S.Struct({ KmsKeyArn: S.optional(S.String), BucketKeyEnabled: S.optional(S.Boolean) }),
      ).annotate({ identifier: "SSEKMSFilter" });
    case 10:
      return S.suspend(() => S.Struct({ KmsKeyArn: S.optional(S.String) })).annotate({
        identifier: "DSSEKMSFilter",
      });
    case 11:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "SSECFilter" });
    case 12:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "NotSSEFilter" });
    case 13:
      return S.Union([
        /*@__PURE__*/ S.Struct({
          SSES3: /*@__PURE__*/ __S(1224, __c38, 8)
            .pipe(/*@__PURE__*/ T.XmlName("SSE-S3"))
            .annotate({ identifier: "SSES3Filter" }),
        }),
        /*@__PURE__*/ S.Struct({
          SSEKMS: /*@__PURE__*/ __S(1225, __c38, 9)
            .pipe(/*@__PURE__*/ T.XmlName("SSE-KMS"))
            .annotate({ identifier: "SSEKMSFilter" }),
        }),
        /*@__PURE__*/ S.Struct({
          DSSEKMS: /*@__PURE__*/ __S(1226, __c38, 10)
            .pipe(/*@__PURE__*/ T.XmlName("DSSE-KMS"))
            .annotate({ identifier: "DSSEKMSFilter" }),
        }),
        /*@__PURE__*/ S.Struct({
          SSEC: /*@__PURE__*/ __S(1227, __c38, 11)
            .pipe(/*@__PURE__*/ T.XmlName("SSE-C"))
            .annotate({ identifier: "SSECFilter" }),
        }),
        /*@__PURE__*/ S.Struct({
          NOTSSE: /*@__PURE__*/ __S(1228, __c38, 12)
            .pipe(/*@__PURE__*/ T.XmlName("NOT-SSE"))
            .annotate({ identifier: "NotSSEFilter" }),
        }),
      ]);
    case 14:
      return S.Array(
        /*@__PURE__*/ __S(1229, __c38, 13).pipe(/*@__PURE__*/ T.XmlName("ObjectEncryption")),
      );
    case 15:
      return S.suspend(() =>
        S.Struct({
          EligibleForReplication: S.optional(S.Boolean),
          CreatedAfter: S.optional(T.DateFromString),
          CreatedBefore: S.optional(T.DateFromString),
          ObjectReplicationStatuses: S.optional(__S(1220, __c38, 4)),
          KeyNameConstraint: S.optional(__S(1222, __c38, 6)),
          ObjectSizeGreaterThanBytes: S.optional(S.Number),
          ObjectSizeLessThanBytes: S.optional(S.Number),
          MatchAnyStorageClass: S.optional(__S(1223, __c38, 7)),
          MatchAnyObjectEncryption: S.optional(__S(1230, __c38, 14)),
        }),
      ).annotate({ identifier: "JobManifestGeneratorFilter" });
    case 16:
      return S.suspend(() =>
        S.Struct({
          ExpectedBucketOwner: S.optional(S.String),
          SourceBucket: S.String,
          ManifestOutputLocation: S.optional(__S(1219, __c38, 3)),
          Filter: S.optional(__S(1231, __c38, 15)),
          EnableManifestOutput: S.Boolean,
        }),
      ).annotate({ identifier: "S3JobManifestGenerator" });
    case 17:
      return S.Union([/*@__PURE__*/ S.Struct({ S3JobManifestGenerator: __S(1232, __c38, 16) })]);
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(1152, __c36, 0));
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          ClientToken: S.String.pipe(T.IdempotencyToken()),
          Details: __S(1313, __c41, 1),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/v20180820/async-requests/mrap/create" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "CreateMultiRegionAccessPointRequest" });
    case 1:
      return S.suspend(() => S.Struct({ RequestTokenARN: S.optional(S.String) }).pipe(ns)).annotate(
        { identifier: "CreateMultiRegionAccessPointResult" },
      );
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.Array(
        /*@__PURE__*/ Region.pipe(/*@__PURE__*/ T.XmlName("Region")).annotate({
          identifier: "Region",
        }),
      );
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          PublicAccessBlock: S.optional(__S(896, __c28, 0)),
          Regions: __S(1312, __c41, 0),
        }),
      ).annotate({ identifier: "CreateMultiRegionAccessPointInput" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          StorageLensGroup: __S(1384, __c43, 8),
          Tags: S.optional(__S(705, __c22, 1)),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/v20180820/storagelensgroup" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "CreateStorageLensGroupRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "CreateStorageLensGroupResponse",
      });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("Prefix")));
    case 1:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("Suffix")));
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(1152, __c36, 0)
          .pipe(/*@__PURE__*/ T.XmlName("Tag"))
          .annotate({ identifier: "S3Tag" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({ DaysGreaterThan: S.optional(S.Number), DaysLessThan: S.optional(S.Number) }),
      ).annotate({ identifier: "MatchObjectAge" });
    case 4:
      return S.suspend(() =>
        S.Struct({ BytesGreaterThan: S.optional(S.Number), BytesLessThan: S.optional(S.Number) }),
      ).annotate({ identifier: "MatchObjectSize" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          MatchAnyPrefix: S.optional(__S(1376, __c43, 0)),
          MatchAnySuffix: S.optional(__S(1377, __c43, 1)),
          MatchAnyTag: S.optional(__S(1378, __c43, 2)),
          MatchObjectAge: S.optional(__S(1379, __c43, 3)),
          MatchObjectSize: S.optional(__S(1380, __c43, 4)),
        }),
      ).annotate({ identifier: "StorageLensGroupAndOperator" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          MatchAnyPrefix: S.optional(__S(1376, __c43, 0)),
          MatchAnySuffix: S.optional(__S(1377, __c43, 1)),
          MatchAnyTag: S.optional(__S(1378, __c43, 2)),
          MatchObjectAge: S.optional(__S(1379, __c43, 3)),
          MatchObjectSize: S.optional(__S(1380, __c43, 4)),
        }),
      ).annotate({ identifier: "StorageLensGroupOrOperator" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          MatchAnyPrefix: S.optional(__S(1376, __c43, 0)),
          MatchAnySuffix: S.optional(__S(1377, __c43, 1)),
          MatchAnyTag: S.optional(__S(1378, __c43, 2)),
          MatchObjectAge: S.optional(__S(1379, __c43, 3)),
          MatchObjectSize: S.optional(__S(1380, __c43, 4)),
          And: S.optional(__S(1381, __c43, 5)),
          Or: S.optional(__S(1382, __c43, 6)),
        }),
      ).annotate({ identifier: "StorageLensGroupFilter" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Filter: __S(1383, __c43, 7),
          StorageLensGroupArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "StorageLensGroup" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          AccessGrantId: S.String.pipe(T.HttpLabel("AccessGrantId")),
        }).pipe(
          T.all(
            ns,
            T.Http({
              method: "DELETE",
              uri: "/v20180820/accessgrantsinstance/grant/{AccessGrantId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "DeleteAccessGrantRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteAccessGrantResponse",
      });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/v20180820/accessgrantsinstance" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "DeleteAccessGrantsInstanceRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteAccessGrantsInstanceResponse",
      });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/v20180820/accessgrantsinstance/resourcepolicy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "DeleteAccessGrantsInstanceResourcePolicyRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteAccessGrantsInstanceResourcePolicyResponse",
      });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          AccessGrantsLocationId: S.String.pipe(T.HttpLabel("AccessGrantsLocationId")),
        }).pipe(
          T.all(
            ns,
            T.Http({
              method: "DELETE",
              uri: "/v20180820/accessgrantsinstance/location/{AccessGrantsLocationId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "DeleteAccessGrantsLocationRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteAccessGrantsLocationResponse",
      });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          Name: S.String.pipe(T.HttpLabel("Name"), T.ContextParam("AccessPointName")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/v20180820/accesspoint/{Name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "DeleteAccessPointRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteAccessPointResponse",
      });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          Name: S.String.pipe(T.HttpLabel("Name")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/v20180820/accesspointforobjectlambda/{Name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "DeleteAccessPointForObjectLambdaRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteAccessPointForObjectLambdaResponse",
      });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          Name: S.String.pipe(T.HttpLabel("Name"), T.ContextParam("AccessPointName")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/v20180820/accesspoint/{Name}/policy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "DeleteAccessPointPolicyRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteAccessPointPolicyResponse",
      });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          Name: S.String.pipe(T.HttpLabel("Name")),
        }).pipe(
          T.all(
            ns,
            T.Http({
              method: "DELETE",
              uri: "/v20180820/accesspointforobjectlambda/{Name}/policy",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "DeleteAccessPointPolicyForObjectLambdaRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteAccessPointPolicyForObjectLambdaResponse",
      });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          Name: S.String.pipe(T.HttpLabel("Name"), T.ContextParam("AccessPointName")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/v20180820/accesspoint/{Name}/scope" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({
              RequiresAccountId: { value: true },
              UseS3ExpressControlEndpoint: { value: true },
            }),
          ),
        ),
      ).annotate({ identifier: "DeleteAccessPointScopeRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteAccessPointScopeResponse",
      });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/v20180820/bucket/{Bucket}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "DeleteBucketRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteBucketResponse",
      });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/v20180820/bucket/{Bucket}/lifecycleconfiguration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "DeleteBucketLifecycleConfigurationRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteBucketLifecycleConfigurationResponse",
      });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/v20180820/bucket/{Bucket}/policy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "DeleteBucketPolicyRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteBucketPolicyResponse",
      });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/v20180820/bucket/{Bucket}/replication" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "DeleteBucketReplicationRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteBucketReplicationResponse",
      });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/v20180820/bucket/{Bucket}/tagging" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "DeleteBucketTaggingRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteBucketTaggingResponse",
      });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          JobId: S.String.pipe(T.HttpLabel("JobId")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/v20180820/jobs/{JobId}/tagging" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "DeleteJobTaggingRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteJobTaggingResult",
      });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          ClientToken: S.String.pipe(T.IdempotencyToken()),
          Details: __S(1920, __c60, 0),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/v20180820/async-requests/mrap/delete" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "DeleteMultiRegionAccessPointRequest" });
    case 1:
      return S.suspend(() => S.Struct({ RequestTokenARN: S.optional(S.String) }).pipe(ns)).annotate(
        { identifier: "DeleteMultiRegionAccessPointResult" },
      );
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Name: S.String })).annotate({
        identifier: "DeleteMultiRegionAccessPointInput",
      });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/v20180820/configuration/publicAccessBlock" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "DeletePublicAccessBlockRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeletePublicAccessBlockResponse",
      });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConfigId: S.String.pipe(T.HttpLabel("ConfigId")),
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/v20180820/storagelens/{ConfigId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "DeleteStorageLensConfigurationRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteStorageLensConfigurationResponse",
      });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConfigId: S.String.pipe(T.HttpLabel("ConfigId")),
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/v20180820/storagelens/{ConfigId}/tagging" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "DeleteStorageLensConfigurationTaggingRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteStorageLensConfigurationTaggingResult",
      });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String.pipe(T.HttpLabel("Name")),
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/v20180820/storagelensgroup/{Name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "DeleteStorageLensGroupRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteStorageLensGroupResponse",
      });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          JobId: S.String.pipe(T.HttpLabel("JobId")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/v20180820/jobs/{JobId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "DescribeJobRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ FailureCode: S.optional(S.String), FailureReason: S.optional(S.String) }),
      ).annotate({ identifier: "JobFailure" });
    case 2:
      return S.Array(__S(2081, __c65, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Format: S.optional(S.String), Location: S.optional(__S(1214, __c37, 30)) }),
      ).annotate({ identifier: "S3GeneratedManifestDescriptor" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          JobId: S.optional(S.String),
          ConfirmationRequired: S.optional(S.Boolean),
          Description: S.optional(S.String),
          JobArn: S.optional(S.String),
          Status: S.optional(S.String),
          Manifest: S.optional(__S(1215, __c37, 31)),
          Operation: S.optional(__S(1210, __c37, 26)),
          Priority: S.optional(S.Number),
          ProgressSummary: S.optional(__S(2113, __c66, 1)),
          StatusUpdateReason: S.optional(S.String),
          FailureReasons: S.optional(__S(2082, __c65, 2)),
          Report: S.optional(__S(1211, __c37, 27)),
          CreationTime: S.optional(T.DateFromString),
          TerminationDate: S.optional(T.DateFromString),
          RoleArn: S.optional(S.String),
          SuspendedDate: S.optional(T.DateFromString),
          SuspendedCause: S.optional(S.String),
          ManifestGenerator: S.optional(__S(1233, __c38, 17)),
          GeneratedManifestDescriptor: S.optional(__S(2083, __c65, 3)),
        }),
      ).annotate({ identifier: "JobDescriptor" });
    case 5:
      return S.suspend(() => S.Struct({ Job: S.optional(__S(2084, __c65, 4)) }).pipe(ns)).annotate({
        identifier: "DescribeJobResult",
      });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ElapsedTimeInActiveSeconds: S.optional(S.Number) }),
      ).annotate({ identifier: "JobTimers" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          TotalNumberOfTasks: S.optional(S.Number),
          NumberOfTasksSucceeded: S.optional(S.Number),
          NumberOfTasksFailed: S.optional(S.Number),
          Timers: S.optional(__S(2112, __c66, 0)),
        }),
      ).annotate({ identifier: "JobProgressSummary" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          RequestTokenARN: S.String.pipe(T.HttpLabel("RequestTokenARN")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/v20180820/async-requests/mrap/{RequestTokenARN+}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "DescribeMultiRegionAccessPointOperationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CreateMultiRegionAccessPointRequest: S.optional(__S(1313, __c41, 1)),
          DeleteMultiRegionAccessPointRequest: S.optional(__S(1920, __c60, 0)),
          PutMultiRegionAccessPointPolicyRequest: S.optional(__S(2176, __c68, 0)),
        }),
      ).annotate({ identifier: "AsyncRequestParameters" });
    case 2:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), RequestStatus: S.optional(S.String) }),
      ).annotate({ identifier: "MultiRegionAccessPointRegionalResponse" });
    case 3:
      return S.Array(
        /*@__PURE__*/ __S(2146, __c67, 2)
          .pipe(/*@__PURE__*/ T.XmlName("Region"))
          .annotate({ identifier: "MultiRegionAccessPointRegionalResponse" }),
      );
    case 4:
      return S.suspend(() => S.Struct({ Regions: S.optional(__S(2147, __c67, 3)) })).annotate({
        identifier: "MultiRegionAccessPointsAsyncResponse",
      });
    case 5:
      return S.suspend(() =>
        S.Struct({
          Code: S.optional(S.String),
          Message: S.optional(S.String),
          Resource: S.optional(S.String),
          RequestId: S.optional(S.String),
        }),
      ).annotate({ identifier: "AsyncErrorDetails" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          MultiRegionAccessPointDetails: S.optional(__S(2148, __c67, 4)),
          ErrorDetails: S.optional(__S(2149, __c67, 5)),
        }),
      ).annotate({ identifier: "AsyncResponseDetails" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          CreationTime: S.optional(T.DateFromString),
          Operation: S.optional(S.String),
          RequestTokenARN: S.optional(S.String),
          RequestParameters: S.optional(__S(2145, __c67, 1)),
          RequestStatus: S.optional(S.String),
          ResponseDetails: S.optional(__S(2150, __c67, 6)),
        }),
      ).annotate({ identifier: "AsyncOperation" });
    case 8:
      return S.suspend(() =>
        S.Struct({ AsyncOperation: S.optional(__S(2151, __c67, 7)) }).pipe(ns),
      ).annotate({ identifier: "DescribeMultiRegionAccessPointOperationResult" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Name: S.String, Policy: S.String })).annotate({
        identifier: "PutMultiRegionAccessPointPolicyInput",
      });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "DELETE", uri: "/v20180820/accessgrantsinstance/identitycenter" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "DissociateAccessGrantsIdentityCenterRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DissociateAccessGrantsIdentityCenterResponse",
      });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          AccessGrantId: S.String.pipe(T.HttpLabel("AccessGrantId")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/v20180820/accessgrantsinstance/grant/{AccessGrantId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "GetAccessGrantRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CreatedAt: S.optional(T.DateFromString),
          AccessGrantId: S.optional(S.String),
          AccessGrantArn: S.optional(S.String),
          Grantee: S.optional(__S(736, __c23, 0)),
          Permission: S.optional(S.String),
          AccessGrantsLocationId: S.optional(S.String),
          AccessGrantsLocationConfiguration: S.optional(__S(768, __c24, 0)),
          GrantScope: S.optional(S.String),
          ApplicationArn: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "GetAccessGrantResult" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/v20180820/accessgrantsinstance" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "GetAccessGrantsInstanceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AccessGrantsInstanceArn: S.optional(S.String),
          AccessGrantsInstanceId: S.optional(S.String),
          IdentityCenterArn: S.optional(S.String),
          IdentityCenterInstanceArn: S.optional(S.String),
          IdentityCenterApplicationArn: S.optional(S.String),
          CreatedAt: S.optional(T.DateFromString),
        }).pipe(ns),
      ).annotate({ identifier: "GetAccessGrantsInstanceResult" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          S3Prefix: S.String.pipe(T.HttpQuery("s3prefix")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/v20180820/accessgrantsinstance/prefix" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "GetAccessGrantsInstanceForPrefixRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AccessGrantsInstanceArn: S.optional(S.String),
          AccessGrantsInstanceId: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "GetAccessGrantsInstanceForPrefixResult" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/v20180820/accessgrantsinstance/resourcepolicy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "GetAccessGrantsInstanceResourcePolicyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Policy: S.optional(S.String),
          Organization: S.optional(S.String),
          CreatedAt: S.optional(T.DateFromString),
        }).pipe(ns),
      ).annotate({ identifier: "GetAccessGrantsInstanceResourcePolicyResult" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          AccessGrantsLocationId: S.String.pipe(T.HttpLabel("AccessGrantsLocationId")),
        }).pipe(
          T.all(
            ns,
            T.Http({
              method: "GET",
              uri: "/v20180820/accessgrantsinstance/location/{AccessGrantsLocationId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "GetAccessGrantsLocationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CreatedAt: S.optional(T.DateFromString),
          AccessGrantsLocationId: S.optional(S.String),
          AccessGrantsLocationArn: S.optional(S.String),
          LocationScope: S.optional(S.String),
          IAMRoleArn: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "GetAccessGrantsLocationResult" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          Name: S.String.pipe(T.HttpLabel("Name"), T.ContextParam("AccessPointName")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/v20180820/accesspoint/{Name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "GetAccessPointRequest" });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Bucket: S.optional(S.String),
          NetworkOrigin: S.optional(S.String),
          VpcConfiguration: S.optional(__S(928, __c29, 0)),
          PublicAccessBlockConfiguration: S.optional(__S(896, __c28, 0)),
          CreationDate: S.optional(T.DateFromString),
          Alias: S.optional(S.String),
          AccessPointArn: S.optional(S.String),
          Endpoints: S.optional(__S(2401, __c75, 1)),
          BucketAccountId: S.optional(S.String),
          DataSourceId: S.optional(S.String),
          DataSourceType: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "GetAccessPointResult" });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          Name: S.String.pipe(T.HttpLabel("Name")),
        }).pipe(
          T.all(
            ns,
            T.Http({
              method: "GET",
              uri: "/v20180820/accesspointforobjectlambda/{Name}/configuration",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "GetAccessPointConfigurationForObjectLambdaRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Configuration: S.optional(__S(1030, __c32, 6)) }).pipe(ns),
      ).annotate({ identifier: "GetAccessPointConfigurationForObjectLambdaResult" });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          Name: S.String.pipe(T.HttpLabel("Name")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/v20180820/accesspointforobjectlambda/{Name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "GetAccessPointForObjectLambdaRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          PublicAccessBlockConfiguration: S.optional(__S(896, __c28, 0)),
          CreationDate: S.optional(T.DateFromString),
          Alias: S.optional(__S(1056, __c33, 0)),
        }).pipe(ns),
      ).annotate({ identifier: "GetAccessPointForObjectLambdaResult" });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          Name: S.String.pipe(T.HttpLabel("Name"), T.ContextParam("AccessPointName")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/v20180820/accesspoint/{Name}/policy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "GetAccessPointPolicyRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Policy: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "GetAccessPointPolicyResult",
      });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          Name: S.String.pipe(T.HttpLabel("Name")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/v20180820/accesspointforobjectlambda/{Name}/policy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "GetAccessPointPolicyForObjectLambdaRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Policy: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "GetAccessPointPolicyForObjectLambdaResult",
      });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          Name: S.String.pipe(T.HttpLabel("Name"), T.ContextParam("AccessPointName")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/v20180820/accesspoint/{Name}/policyStatus" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "GetAccessPointPolicyStatusRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ PolicyStatus: S.optional(__S(2592, __c81, 0)) }).pipe(ns),
      ).annotate({ identifier: "GetAccessPointPolicyStatusResult" });
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ IsPublic: S.optional(S.Boolean).pipe(T.XmlName("IsPublic")) }),
      ).annotate({ identifier: "PolicyStatus" });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          Name: S.String.pipe(T.HttpLabel("Name")),
        }).pipe(
          T.all(
            ns,
            T.Http({
              method: "GET",
              uri: "/v20180820/accesspointforobjectlambda/{Name}/policyStatus",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "GetAccessPointPolicyStatusForObjectLambdaRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ PolicyStatus: S.optional(__S(2592, __c81, 0)) }).pipe(ns),
      ).annotate({ identifier: "GetAccessPointPolicyStatusForObjectLambdaResult" });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          Name: S.String.pipe(T.HttpLabel("Name"), T.ContextParam("AccessPointName")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/v20180820/accesspoint/{Name}/scope" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({
              RequiresAccountId: { value: true },
              UseS3ExpressControlEndpoint: { value: true },
            }),
          ),
        ),
      ).annotate({ identifier: "GetAccessPointScopeRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Scope: S.optional(__S(962, __c30, 2)) }).pipe(ns)).annotate(
        { identifier: "GetAccessPointScopeResult" },
      );
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/v20180820/bucket/{Bucket}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "GetBucketRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.optional(S.String),
          PublicAccessBlockEnabled: S.optional(S.Boolean),
          CreationDate: S.optional(T.DateFromString),
        }).pipe(ns),
      ).annotate({ identifier: "GetBucketResult" });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/v20180820/bucket/{Bucket}/lifecycleconfiguration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "GetBucketLifecycleConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Rules: S.optional(__S(2762, __c86, 10)) }).pipe(ns),
      ).annotate({ identifier: "GetBucketLifecycleConfigurationResult" });
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Date: S.optional(T.DateFromString),
          Days: S.optional(S.Number),
          ExpiredObjectDeleteMarker: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "LifecycleExpiration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Prefix: S.optional(S.String),
          Tags: S.optional(__S(1248, __c39, 0)),
          ObjectSizeGreaterThan: S.optional(S.Number),
          ObjectSizeLessThan: S.optional(S.Number),
        }),
      ).annotate({ identifier: "LifecycleRuleAndOperator" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Prefix: S.optional(S.String),
          Tag: S.optional(__S(1152, __c36, 0)),
          And: S.optional(__S(2753, __c86, 1)),
          ObjectSizeGreaterThan: S.optional(S.Number),
          ObjectSizeLessThan: S.optional(S.Number),
        }),
      ).annotate({ identifier: "LifecycleRuleFilter" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Date: S.optional(T.DateFromString),
          Days: S.optional(S.Number),
          StorageClass: S.optional(S.String),
        }),
      ).annotate({ identifier: "Transition" });
    case 4:
      return S.Array(
        /*@__PURE__*/ __S(2755, __c86, 3)
          .pipe(/*@__PURE__*/ T.XmlName("Transition"))
          .annotate({ identifier: "Transition" }),
      );
    case 5:
      return S.suspend(() =>
        S.Struct({ NoncurrentDays: S.optional(S.Number), StorageClass: S.optional(S.String) }),
      ).annotate({ identifier: "NoncurrentVersionTransition" });
    case 6:
      return S.Array(
        /*@__PURE__*/ __S(2757, __c86, 5)
          .pipe(/*@__PURE__*/ T.XmlName("NoncurrentVersionTransition"))
          .annotate({ identifier: "NoncurrentVersionTransition" }),
      );
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
          Expiration: S.optional(__S(2752, __c86, 0)),
          ID: S.optional(S.String),
          Filter: S.optional(__S(2754, __c86, 2)),
          Status: S.String,
          Transitions: S.optional(__S(2756, __c86, 4)),
          NoncurrentVersionTransitions: S.optional(__S(2758, __c86, 6)),
          NoncurrentVersionExpiration: S.optional(__S(2759, __c86, 7)),
          AbortIncompleteMultipartUpload: S.optional(__S(2760, __c86, 8)),
        }),
      ).annotate({ identifier: "LifecycleRule" });
    case 10:
      return S.Array(
        /*@__PURE__*/ __S(2761, __c86, 9)
          .pipe(/*@__PURE__*/ T.XmlName("Rule"))
          .annotate({ identifier: "LifecycleRule" }),
      );
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/v20180820/bucket/{Bucket}/policy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "GetBucketPolicyRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Policy: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "GetBucketPolicyResult",
      });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/v20180820/bucket/{Bucket}/replication" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "GetBucketReplicationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ReplicationConfiguration: S.optional(__S(2863, __c89, 15)) }).pipe(ns),
      ).annotate({ identifier: "GetBucketReplicationResult" });
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Prefix: S.optional(S.String), Tags: S.optional(__S(1248, __c39, 0)) }),
      ).annotate({ identifier: "ReplicationRuleAndOperator" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Prefix: S.optional(S.String),
          Tag: S.optional(__S(1152, __c36, 0)),
          And: S.optional(__S(2848, __c89, 0)),
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
          SseKmsEncryptedObjects: S.optional(__S(2850, __c89, 2)),
          ReplicaModifications: S.optional(__S(2851, __c89, 3)),
        }),
      ).annotate({ identifier: "SourceSelectionCriteria" });
    case 5:
      return S.suspend(() => S.Struct({ Status: S.String })).annotate({
        identifier: "ExistingObjectReplication",
      });
    case 6:
      return S.suspend(() => S.Struct({ Minutes: S.optional(S.Number) })).annotate({
        identifier: "ReplicationTimeValue",
      });
    case 7:
      return S.suspend(() => S.Struct({ Status: S.String, Time: __S(2854, __c89, 6) })).annotate({
        identifier: "ReplicationTime",
      });
    case 8:
      return S.suspend(() => S.Struct({ Owner: S.String })).annotate({
        identifier: "AccessControlTranslation",
      });
    case 9:
      return S.suspend(() => S.Struct({ ReplicaKmsKeyID: S.optional(S.String) })).annotate({
        identifier: "EncryptionConfiguration",
      });
    case 10:
      return S.suspend(() =>
        S.Struct({ Status: S.String, EventThreshold: S.optional(__S(2854, __c89, 6)) }),
      ).annotate({ identifier: "Metrics" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          Account: S.optional(S.String),
          Bucket: S.String,
          ReplicationTime: S.optional(__S(2855, __c89, 7)),
          AccessControlTranslation: S.optional(__S(2856, __c89, 8)),
          EncryptionConfiguration: S.optional(__S(2857, __c89, 9)),
          Metrics: S.optional(__S(2858, __c89, 10)),
          StorageClass: S.optional(S.String),
        }),
      ).annotate({ identifier: "Destination" });
    case 12:
      return S.suspend(() => S.Struct({ Status: S.String })).annotate({
        identifier: "DeleteMarkerReplication",
      });
    case 13:
      return S.suspend(() =>
        S.Struct({
          ID: S.optional(S.String),
          Priority: S.optional(S.Number),
          Prefix: S.optional(S.String),
          Filter: S.optional(__S(2849, __c89, 1)),
          Status: S.String,
          SourceSelectionCriteria: S.optional(__S(2852, __c89, 4)),
          ExistingObjectReplication: S.optional(__S(2853, __c89, 5)),
          Destination: __S(2859, __c89, 11),
          DeleteMarkerReplication: S.optional(__S(2860, __c89, 12)),
          Bucket: S.String,
        }),
      ).annotate({ identifier: "ReplicationRule" });
    case 14:
      return S.Array(
        /*@__PURE__*/ __S(2861, __c89, 13)
          .pipe(/*@__PURE__*/ T.XmlName("Rule"))
          .annotate({ identifier: "ReplicationRule" }),
      );
    case 15:
      return S.suspend(() => S.Struct({ Role: S.String, Rules: __S(2862, __c89, 14) })).annotate({
        identifier: "ReplicationConfiguration",
      });
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/v20180820/bucket/{Bucket}/tagging" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "GetBucketTaggingRequest" });
    case 1:
      return S.suspend(() => S.Struct({ TagSet: __S(1248, __c39, 0) }).pipe(ns)).annotate({
        identifier: "GetBucketTaggingResult",
      });
  }
}
function __c91(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          Bucket: S.String.pipe(T.HttpLabel("Bucket"), T.ContextParam("Bucket")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/v20180820/bucket/{Bucket}/versioning" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "GetBucketVersioningRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Status: S.optional(S.String),
          MFADelete: S.optional(S.String).pipe(T.XmlName("MfaDelete")),
        }).pipe(ns),
      ).annotate({ identifier: "GetBucketVersioningResult" });
  }
}
function __c92(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          Target: S.String.pipe(T.HttpQuery("target")),
          Permission: S.String.pipe(T.HttpQuery("permission")),
          DurationSeconds: S.optional(S.Number).pipe(T.HttpQuery("durationSeconds")),
          Privilege: S.optional(S.String).pipe(T.HttpQuery("privilege")),
          TargetType: S.optional(S.String).pipe(T.HttpQuery("targetType")),
          AuditContext: S.optional(S.String).pipe(T.HttpQuery("auditContext")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/v20180820/accessgrantsinstance/dataaccess" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "GetDataAccessRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AccessKeyId: S.optional(SensitiveString),
          SecretAccessKey: S.optional(SensitiveString),
          SessionToken: S.optional(SensitiveString),
          Expiration: S.optional(T.DateFromString),
        }),
      ).annotate({ identifier: "Credentials" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Credentials: S.optional(__S(2945, __c92, 1)),
          MatchedGrantTarget: S.optional(S.String),
          Grantee: S.optional(__S(736, __c23, 0)),
        }).pipe(ns),
      ).annotate({ identifier: "GetDataAccessResult" });
  }
}
function __c93(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          JobId: S.String.pipe(T.HttpLabel("JobId")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/v20180820/jobs/{JobId}/tagging" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "GetJobTaggingRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Tags: S.optional(__S(1248, __c39, 0)) }).pipe(ns)).annotate(
        { identifier: "GetJobTaggingResult" },
      );
  }
}
function __c94(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          Name: S.String.pipe(T.HttpLabel("Name")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/v20180820/mrap/instances/{Name+}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "GetMultiRegionAccessPointRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ AccessPoint: S.optional(__S(3042, __c95, 2)) }).pipe(ns),
      ).annotate({ identifier: "GetMultiRegionAccessPointResult" });
  }
}
function __c95(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.optional(S.String),
          Region: S.optional(S.String),
          BucketAccountId: S.optional(S.String),
        }),
      ).annotate({ identifier: "RegionReport" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(3040, __c95, 0)
          .pipe(/*@__PURE__*/ T.XmlName("Region"))
          .annotate({ identifier: "RegionReport" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Alias: S.optional(S.String),
          CreatedAt: S.optional(T.DateFromString),
          PublicAccessBlock: S.optional(__S(896, __c28, 0)),
          Status: S.optional(S.String),
          Regions: S.optional(__S(3041, __c95, 1)),
        }),
      ).annotate({ identifier: "MultiRegionAccessPointReport" });
  }
}
function __c96(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          Name: S.String.pipe(T.HttpLabel("Name")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/v20180820/mrap/instances/{Name+}/policy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "GetMultiRegionAccessPointPolicyRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Policy: S.optional(S.String) })).annotate({
        identifier: "EstablishedMultiRegionAccessPointPolicy",
      });
    case 2:
      return S.suspend(() => S.Struct({ Policy: S.optional(S.String) })).annotate({
        identifier: "ProposedMultiRegionAccessPointPolicy",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Established: S.optional(__S(3073, __c96, 1)),
          Proposed: S.optional(__S(3074, __c96, 2)),
        }),
      ).annotate({ identifier: "MultiRegionAccessPointPolicyDocument" });
    case 4:
      return S.suspend(() =>
        S.Struct({ Policy: S.optional(__S(3075, __c96, 3)) }).pipe(ns),
      ).annotate({ identifier: "GetMultiRegionAccessPointPolicyResult" });
  }
}
function __c97(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          Name: S.String.pipe(T.HttpLabel("Name")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/v20180820/mrap/instances/{Name+}/policystatus" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "GetMultiRegionAccessPointPolicyStatusRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Established: S.optional(__S(2592, __c81, 0)) }).pipe(ns),
      ).annotate({ identifier: "GetMultiRegionAccessPointPolicyStatusResult" });
  }
}
function __c98(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          Mrap: S.String.pipe(T.HttpLabel("Mrap")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/v20180820/mrap/instances/{Mrap+}/routes" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "GetMultiRegionAccessPointRoutesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Mrap: S.optional(S.String), Routes: S.optional(__S(3169, __c99, 1)) }).pipe(ns),
      ).annotate({ identifier: "GetMultiRegionAccessPointRoutesResult" });
  }
}
function __c99(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.optional(S.String),
          Region: S.optional(S.String),
          TrafficDialPercentage: S.Number,
        }),
      ).annotate({ identifier: "MultiRegionAccessPointRoute" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(3168, __c99, 0)
          .pipe(/*@__PURE__*/ T.XmlName("Route"))
          .annotate({ identifier: "MultiRegionAccessPointRoute" }),
      );
  }
}
function __c100(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/v20180820/configuration/publicAccessBlock" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "GetPublicAccessBlockRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          PublicAccessBlockConfiguration: S.optional(__S(896, __c28, 0))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "PublicAccessBlockConfiguration" }),
        }).pipe(ns),
      ).annotate({ identifier: "GetPublicAccessBlockOutput" });
  }
}
function __c101(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConfigId: S.String.pipe(T.HttpLabel("ConfigId")),
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/v20180820/storagelens/{ConfigId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "GetStorageLensConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          StorageLensConfiguration: S.optional(__S(3291, __c102, 27))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "StorageLensConfiguration" }),
        }).pipe(ns),
      ).annotate({ identifier: "GetStorageLensConfigurationResult" });
  }
}
function __c102(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ IsEnabled: S.optional(S.Boolean) })).annotate({
        identifier: "ActivityMetrics",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Delimiter: S.optional(S.String),
          MaxDepth: S.optional(S.Number),
          MinStorageBytesPercentage: S.optional(S.Number),
        }),
      ).annotate({ identifier: "SelectionCriteria" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          IsEnabled: S.optional(S.Boolean),
          SelectionCriteria: S.optional(__S(3265, __c102, 1)),
        }),
      ).annotate({ identifier: "PrefixLevelStorageMetrics" });
    case 3:
      return S.suspend(() => S.Struct({ StorageMetrics: __S(3266, __c102, 2) })).annotate({
        identifier: "PrefixLevel",
      });
    case 4:
      return S.suspend(() => S.Struct({ IsEnabled: S.optional(S.Boolean) })).annotate({
        identifier: "AdvancedCostOptimizationMetrics",
      });
    case 5:
      return S.suspend(() => S.Struct({ IsEnabled: S.optional(S.Boolean) })).annotate({
        identifier: "AdvancedDataProtectionMetrics",
      });
    case 6:
      return S.suspend(() => S.Struct({ IsEnabled: S.optional(S.Boolean) })).annotate({
        identifier: "DetailedStatusCodesMetrics",
      });
    case 7:
      return S.suspend(() => S.Struct({ IsEnabled: S.optional(S.Boolean) })).annotate({
        identifier: "AdvancedPerformanceMetrics",
      });
    case 8:
      return S.suspend(() =>
        S.Struct({
          ActivityMetrics: S.optional(__S(3264, __c102, 0)),
          PrefixLevel: S.optional(__S(3267, __c102, 3)),
          AdvancedCostOptimizationMetrics: S.optional(__S(3268, __c102, 4)),
          AdvancedDataProtectionMetrics: S.optional(__S(3269, __c102, 5)),
          DetailedStatusCodesMetrics: S.optional(__S(3270, __c102, 6)),
          AdvancedPerformanceMetrics: S.optional(__S(3271, __c102, 7)),
        }),
      ).annotate({ identifier: "BucketLevel" });
    case 9:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("Arn")));
    case 10:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("Arn")));
    case 11:
      return S.suspend(() =>
        S.Struct({
          Include: S.optional(__S(3273, __c102, 9)),
          Exclude: S.optional(__S(3274, __c102, 10)),
        }),
      ).annotate({ identifier: "StorageLensGroupLevelSelectionCriteria" });
    case 12:
      return S.suspend(() =>
        S.Struct({ SelectionCriteria: S.optional(__S(3275, __c102, 11)) }),
      ).annotate({ identifier: "StorageLensGroupLevel" });
    case 13:
      return S.suspend(() =>
        S.Struct({
          ActivityMetrics: S.optional(__S(3264, __c102, 0)),
          BucketLevel: S.optional(__S(3272, __c102, 8)),
          AdvancedCostOptimizationMetrics: S.optional(__S(3268, __c102, 4)),
          AdvancedDataProtectionMetrics: S.optional(__S(3269, __c102, 5)),
          DetailedStatusCodesMetrics: S.optional(__S(3270, __c102, 6)),
          AdvancedPerformanceMetrics: S.optional(__S(3271, __c102, 7)),
          StorageLensGroupLevel: S.optional(__S(3276, __c102, 12)),
        }),
      ).annotate({ identifier: "AccountLevel" });
    case 14:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("Arn")));
    case 15:
      return S.Array(/*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.XmlName("Region")));
    case 16:
      return S.suspend(() =>
        S.Struct({
          Buckets: S.optional(__S(3278, __c102, 14)),
          Regions: S.optional(__S(3279, __c102, 15)),
        }),
      ).annotate({ identifier: "Include" });
    case 17:
      return S.suspend(() =>
        S.Struct({
          Buckets: S.optional(__S(3278, __c102, 14)),
          Regions: S.optional(__S(3279, __c102, 15)),
        }),
      ).annotate({ identifier: "Exclude" });
    case 18:
      return S.suspend(() => S.Struct({}).pipe(T.XmlName("SSE-S3"))).annotate({
        identifier: "SSES3",
      });
    case 19:
      return S.suspend(() => S.Struct({ KeyId: S.String }).pipe(T.XmlName("SSE-KMS"))).annotate({
        identifier: "SSEKMS",
      });
    case 20:
      return S.suspend(() =>
        S.Struct({
          SSES3: S.optional(__S(3282, __c102, 18))
            .pipe(T.XmlName("SSE-S3"))
            .annotate({ identifier: "SSES3" }),
          SSEKMS: S.optional(__S(3283, __c102, 19))
            .pipe(T.XmlName("SSE-KMS"))
            .annotate({ identifier: "SSEKMS" }),
        }),
      ).annotate({ identifier: "StorageLensDataExportEncryption" });
    case 21:
      return S.suspend(() =>
        S.Struct({
          Format: S.String,
          OutputSchemaVersion: S.String,
          AccountId: S.String,
          Arn: S.String,
          Prefix: S.optional(S.String),
          Encryption: S.optional(__S(3284, __c102, 20)),
        }),
      ).annotate({ identifier: "S3BucketDestination" });
    case 22:
      return S.suspend(() => S.Struct({ IsEnabled: S.Boolean })).annotate({
        identifier: "CloudWatchMetrics",
      });
    case 23:
      return S.suspend(() =>
        S.Struct({ IsEnabled: S.Boolean, Encryption: S.optional(__S(3284, __c102, 20)) }),
      ).annotate({ identifier: "StorageLensTableDestination" });
    case 24:
      return S.suspend(() =>
        S.Struct({
          S3BucketDestination: S.optional(__S(3285, __c102, 21)),
          CloudWatchMetrics: S.optional(__S(3286, __c102, 22)),
          StorageLensTableDestination: S.optional(__S(3287, __c102, 23)),
        }),
      ).annotate({ identifier: "StorageLensDataExport" });
    case 25:
      return S.suspend(() =>
        S.Struct({
          S3BucketDestination: S.optional(__S(3285, __c102, 21)),
          StorageLensTableDestination: S.optional(__S(3287, __c102, 23)),
        }),
      ).annotate({ identifier: "StorageLensExpandedPrefixesDataExport" });
    case 26:
      return S.suspend(() => S.Struct({ Arn: S.String })).annotate({
        identifier: "StorageLensAwsOrg",
      });
    case 27:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          AccountLevel: __S(3277, __c102, 13),
          Include: S.optional(__S(3280, __c102, 16)),
          Exclude: S.optional(__S(3281, __c102, 17)),
          DataExport: S.optional(__S(3288, __c102, 24)),
          ExpandedPrefixesDataExport: S.optional(__S(3289, __c102, 25)),
          IsEnabled: S.Boolean,
          AwsOrg: S.optional(__S(3290, __c102, 26)),
          StorageLensArn: S.optional(S.String),
          PrefixDelimiter: S.optional(S.String),
        }),
      ).annotate({ identifier: "StorageLensConfiguration" });
  }
}
function __c103(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConfigId: S.String.pipe(T.HttpLabel("ConfigId")),
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/v20180820/storagelens/{ConfigId}/tagging" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "GetStorageLensConfigurationTaggingRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Tags: S.optional(__S(3329, __c104, 1)) }).pipe(ns),
      ).annotate({ identifier: "GetStorageLensConfigurationTaggingResult" });
  }
}
function __c104(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Value: S.String })).annotate({
        identifier: "StorageLensTag",
      });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(3328, __c104, 0)
          .pipe(/*@__PURE__*/ T.XmlName("Tag"))
          .annotate({ identifier: "StorageLensTag" }),
      );
  }
}
function __c105(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String.pipe(T.HttpLabel("Name")),
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/v20180820/storagelensgroup/{Name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "GetStorageLensGroupRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          StorageLensGroup: S.optional(__S(1384, __c43, 8))
            .pipe(T.HttpPayload())
            .annotate({ identifier: "StorageLensGroup" }),
        }).pipe(ns),
      ).annotate({ identifier: "GetStorageLensGroupResult" });
  }
}
function __c106(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          GranteeType: S.optional(S.String).pipe(T.HttpQuery("granteetype")),
          GranteeIdentifier: S.optional(S.String).pipe(T.HttpQuery("granteeidentifier")),
          Permission: S.optional(S.String).pipe(T.HttpQuery("permission")),
          GrantScope: S.optional(S.String).pipe(T.HttpQuery("grantscope")),
          ApplicationArn: S.optional(S.String).pipe(T.HttpQuery("application_arn")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/v20180820/accessgrantsinstance/grants" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "ListAccessGrantsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CreatedAt: S.optional(T.DateFromString),
          AccessGrantId: S.optional(S.String),
          AccessGrantArn: S.optional(S.String),
          Grantee: S.optional(__S(736, __c23, 0)),
          Permission: S.optional(S.String),
          AccessGrantsLocationId: S.optional(S.String),
          AccessGrantsLocationConfiguration: S.optional(__S(768, __c24, 0)),
          GrantScope: S.optional(S.String),
          ApplicationArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListAccessGrantEntry" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(3393, __c106, 1)
          .pipe(/*@__PURE__*/ T.XmlName("AccessGrant"))
          .annotate({ identifier: "ListAccessGrantEntry" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          AccessGrantsList: S.optional(__S(3394, __c106, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "ListAccessGrantsResult" });
  }
}
function __c107(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/v20180820/accessgrantsinstances" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "ListAccessGrantsInstancesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AccessGrantsInstanceId: S.optional(S.String),
          AccessGrantsInstanceArn: S.optional(S.String),
          CreatedAt: S.optional(T.DateFromString),
          IdentityCenterArn: S.optional(S.String),
          IdentityCenterInstanceArn: S.optional(S.String),
          IdentityCenterApplicationArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListAccessGrantsInstanceEntry" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(3425, __c107, 1)
          .pipe(/*@__PURE__*/ T.XmlName("AccessGrantsInstance"))
          .annotate({ identifier: "ListAccessGrantsInstanceEntry" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          AccessGrantsInstancesList: S.optional(__S(3426, __c107, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "ListAccessGrantsInstancesResult" });
  }
}
function __c108(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          LocationScope: S.optional(S.String).pipe(T.HttpQuery("locationscope")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/v20180820/accessgrantsinstance/locations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "ListAccessGrantsLocationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          CreatedAt: S.optional(T.DateFromString),
          AccessGrantsLocationId: S.optional(S.String),
          AccessGrantsLocationArn: S.optional(S.String),
          LocationScope: S.optional(S.String),
          IAMRoleArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListAccessGrantsLocationsEntry" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(3457, __c108, 1)
          .pipe(/*@__PURE__*/ T.XmlName("AccessGrantsLocation"))
          .annotate({ identifier: "ListAccessGrantsLocationsEntry" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          AccessGrantsLocationsList: S.optional(__S(3458, __c108, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "ListAccessGrantsLocationsResult" });
  }
}
function __c109(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          Bucket: S.optional(S.String).pipe(T.HttpQuery("bucket"), T.ContextParam("Bucket")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          DataSourceId: S.optional(S.String).pipe(T.HttpQuery("dataSourceId")),
          DataSourceType: S.optional(S.String).pipe(T.HttpQuery("dataSourceType")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/v20180820/accesspoint" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "ListAccessPointsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AccessPointList: S.optional(__S(3521, __c110, 1)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListAccessPointsResult" });
  }
}
function __c110(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          NetworkOrigin: S.String,
          VpcConfiguration: S.optional(__S(928, __c29, 0)),
          Bucket: S.String,
          AccessPointArn: S.optional(S.String),
          Alias: S.optional(S.String),
          BucketAccountId: S.optional(S.String),
          DataSourceId: S.optional(S.String),
          DataSourceType: S.optional(S.String),
        }),
      ).annotate({ identifier: "AccessPoint" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(3520, __c110, 0)
          .pipe(/*@__PURE__*/ T.XmlName("AccessPoint"))
          .annotate({ identifier: "AccessPoint" }),
      );
  }
}
function __c111(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          DirectoryBucket: S.optional(S.String).pipe(T.HttpQuery("directoryBucket")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/v20180820/accesspointfordirectory" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({
              RequiresAccountId: { value: true },
              UseS3ExpressControlEndpoint: { value: true },
            }),
          ),
        ),
      ).annotate({ identifier: "ListAccessPointsForDirectoryBucketsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AccessPointList: S.optional(__S(3521, __c110, 1)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListAccessPointsForDirectoryBucketsResult" });
  }
}
function __c112(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/v20180820/accesspointforobjectlambda" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "ListAccessPointsForObjectLambdaRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          ObjectLambdaAccessPointArn: S.optional(S.String),
          Alias: S.optional(__S(1056, __c33, 0)),
        }),
      ).annotate({ identifier: "ObjectLambdaAccessPoint" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(3585, __c112, 1)
          .pipe(/*@__PURE__*/ T.XmlName("ObjectLambdaAccessPoint"))
          .annotate({ identifier: "ObjectLambdaAccessPoint" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          ObjectLambdaAccessPointList: S.optional(__S(3586, __c112, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListAccessPointsForObjectLambdaResult" });
  }
}
function __c113(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          GrantScope: S.optional(S.String).pipe(T.HttpQuery("grantscope")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          AllowedByApplication: S.optional(S.Boolean).pipe(T.HttpQuery("allowedByApplication")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/v20180820/accessgrantsinstance/caller/grants" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "ListCallerAccessGrantsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Permission: S.optional(S.String),
          GrantScope: S.optional(S.String),
          ApplicationArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListCallerAccessGrantsEntry" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(3617, __c113, 1)
          .pipe(/*@__PURE__*/ T.XmlName("AccessGrant"))
          .annotate({ identifier: "ListCallerAccessGrantsEntry" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          CallerAccessGrantsList: S.optional(__S(3618, __c113, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "ListCallerAccessGrantsResult" });
  }
}
function __c114(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          JobStatuses: S.optional(__S(3648, __c114, 0)).pipe(T.HttpQuery("jobStatuses")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/v20180820/jobs" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "ListJobsRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          JobId: S.optional(S.String),
          Description: S.optional(S.String),
          Operation: S.optional(S.String),
          Priority: S.optional(S.Number),
          Status: S.optional(S.String),
          CreationTime: S.optional(T.DateFromString),
          TerminationDate: S.optional(T.DateFromString),
          ProgressSummary: S.optional(__S(2113, __c66, 1)),
        }),
      ).annotate({ identifier: "JobListDescriptor" });
    case 3:
      return S.Array(__S(3650, __c114, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), Jobs: S.optional(__S(3651, __c114, 3)) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "ListJobsResult" });
  }
}
function __c115(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/v20180820/mrap/instances" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "ListMultiRegionAccessPointsRequest" });
    case 1:
      return S.Array(
        /*@__PURE__*/ __S(3042, __c95, 2)
          .pipe(/*@__PURE__*/ T.XmlName("AccessPoint"))
          .annotate({ identifier: "MultiRegionAccessPointReport" }),
      );
    case 2:
      return S.suspend(() =>
        S.Struct({
          AccessPoints: S.optional(__S(3681, __c115, 1)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListMultiRegionAccessPointsResult" });
  }
}
function __c116(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          OutpostId: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-outpost-id"),
            T.ContextParam("OutpostId"),
          ),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/v20180820/bucket" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "ListRegionalBucketsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Bucket: S.String,
          BucketArn: S.optional(S.String),
          PublicAccessBlockEnabled: S.Boolean,
          CreationDate: T.DateFromString,
          OutpostId: S.optional(S.String),
        }),
      ).annotate({ identifier: "RegionalBucket" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(3713, __c116, 1)
          .pipe(/*@__PURE__*/ T.XmlName("RegionalBucket"))
          .annotate({ identifier: "RegionalBucket" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          RegionalBucketList: S.optional(__S(3714, __c116, 2)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListRegionalBucketsResult" });
  }
}
function __c117(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/v20180820/storagelens" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "ListStorageLensConfigurationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          StorageLensArn: S.String,
          HomeRegion: S.String,
          IsEnabled: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "ListStorageLensConfigurationEntry" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(3745, __c117, 1)
          .pipe(/*@__PURE__*/ T.XmlName("StorageLensConfiguration"))
          .annotate({ identifier: "ListStorageLensConfigurationEntry" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          StorageLensConfigurationList: S.optional(__S(3746, __c117, 2)).pipe(
            T.XmlName("StorageLensConfiguration"),
            T.XmlFlattened(),
          ),
        }).pipe(T.all(T.XmlName("ListStorageLensConfigurationResult"), ns)),
      ).annotate({ identifier: "ListStorageLensConfigurationsResult" });
  }
}
function __c118(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/v20180820/storagelensgroup" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "ListStorageLensGroupsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Name: S.String, StorageLensGroupArn: S.String, HomeRegion: S.String }),
      ).annotate({ identifier: "ListStorageLensGroupEntry" });
    case 2:
      return S.Array(
        /*@__PURE__*/ __S(3777, __c118, 1)
          .pipe(/*@__PURE__*/ T.XmlName("StorageLensGroup"))
          .annotate({ identifier: "ListStorageLensGroupEntry" }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          StorageLensGroupList: S.optional(__S(3778, __c118, 2)).pipe(
            T.XmlName("StorageLensGroup"),
            T.XmlFlattened(),
          ),
        }).pipe(ns),
      ).annotate({ identifier: "ListStorageLensGroupsResult" });
  }
}
function __c119(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn"), T.ContextParam("ResourceArn")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "GET", uri: "/v20180820/tags/{ResourceArn+}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Tags: S.optional(__S(705, __c22, 1)) }).pipe(ns)).annotate({
        identifier: "ListTagsForResourceResult",
      });
  }
}
function __c120(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          Policy: S.String,
          Organization: S.optional(S.String),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/v20180820/accessgrantsinstance/resourcepolicy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "PutAccessGrantsInstanceResourcePolicyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Policy: S.optional(S.String),
          Organization: S.optional(S.String),
          CreatedAt: S.optional(T.DateFromString),
        }).pipe(ns),
      ).annotate({ identifier: "PutAccessGrantsInstanceResourcePolicyResult" });
  }
}
function __c121(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          Name: S.String.pipe(T.HttpLabel("Name")),
          Configuration: __S(1030, __c32, 6),
        }).pipe(
          T.all(
            ns,
            T.Http({
              method: "PUT",
              uri: "/v20180820/accesspointforobjectlambda/{Name}/configuration",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "PutAccessPointConfigurationForObjectLambdaRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "PutAccessPointConfigurationForObjectLambdaResponse",
      });
  }
}
function __c122(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          AccountId: S.String.pipe(
            T.HttpHeader("x-amz-account-id"),
            T.ContextParam("AccountId"),
            T.HostLabel(),
          ),
          Name: S.String.pipe(T.HttpLabel("Name"), T.ContextParam("AccessPointName")),
          Policy: S.String,
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "PUT", uri: "/v20180820/accesspoint/{Name}/policy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ RequiresAccountId: { value: true } }),
          ),
        ),
      ).annotate({ identifier: "PutAccessPointPolicyRequest" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "PutAccessPointPolicyResponse",
      });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
