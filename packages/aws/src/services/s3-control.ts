import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { restXmlProtocol } from "../protocols/rest-xml.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials as Creds } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "S3 Control",
  target: "AWSS3ControlServiceV20180820",
  version: "2018-08-20",
  sigv4: "s3",
  protocol: restXmlProtocol,
  xmlns: "http://awss3control.amazonaws.com/doc/2018-08-20/",
  rules: (p, _) => {
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
        {
          disableDoubleEncoding: true,
          name: "sigv4",
          signingName: "s3",
          signingRegion: `${_0}`,
        },
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
            if (
              RequiresAccountId != null &&
              RequiresAccountId === true &&
              !(AccountId != null)
            ) {
              return err("AccountId is required but not set");
            }
            if (AccountId != null && !_.isValidHostLabel(AccountId, false)) {
              return err("AccountId must only contain a-z, A-Z, 0-9 and `-`.");
            }
            if (!_.isValidHostLabel(OutpostId, false)) {
              return err("OutpostId must only contain a-z, A-Z, 0-9 and `-`.");
            }
            if (Endpoint != null && UseDualStack === true) {
              return err(
                "Invalid Configuration: DualStack and custom endpoint are not supported",
              );
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
                const arnPartition = _.partition(
                  _.getAttr(resourceArn, "region"),
                );
                if (arnPartition != null && arnPartition !== false) {
                  if (
                    _.getAttr(arnPartition, "name") ===
                    _.getAttr(partitionResult, "name")
                  ) {
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
              {
                const s3expressAvailabilityZoneId = _.substring(
                  AccessPointName,
                  7,
                  15,
                  true,
                );
                const s3expressAvailabilityZoneDelim = _.substring(
                  AccessPointName,
                  15,
                  17,
                  true,
                );
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
                const s3expressAvailabilityZoneId = _.substring(
                  AccessPointName,
                  7,
                  16,
                  true,
                );
                const s3expressAvailabilityZoneDelim = _.substring(
                  AccessPointName,
                  16,
                  18,
                  true,
                );
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
                const s3expressAvailabilityZoneId = _.substring(
                  AccessPointName,
                  7,
                  20,
                  true,
                );
                const s3expressAvailabilityZoneDelim = _.substring(
                  AccessPointName,
                  20,
                  22,
                  true,
                );
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
                const s3expressAvailabilityZoneId = _.substring(
                  AccessPointName,
                  7,
                  21,
                  true,
                );
                const s3expressAvailabilityZoneDelim = _.substring(
                  AccessPointName,
                  21,
                  23,
                  true,
                );
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
                const s3expressAvailabilityZoneId = _.substring(
                  AccessPointName,
                  7,
                  27,
                  true,
                );
                const s3expressAvailabilityZoneDelim = _.substring(
                  AccessPointName,
                  27,
                  29,
                  true,
                );
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
      if (
        UseS3ExpressControlEndpoint != null &&
        UseS3ExpressControlEndpoint === true
      ) {
        {
          const partitionResult = _.partition(Region);
          if (partitionResult != null && partitionResult !== false) {
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
        }
      }
      {
        const url = _.parseURL(Endpoint);
        if (
          Region === "snow" &&
          Endpoint != null &&
          url != null &&
          url !== false
        ) {
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
        if (
          AccessPointName != null &&
          accessPointArn != null &&
          accessPointArn !== false
        ) {
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
                        if (
                          partitionResult != null &&
                          partitionResult !== false
                        ) {
                          {
                            const arnPartition = _.partition(
                              _.getAttr(accessPointArn, "region"),
                            );
                            if (
                              arnPartition != null &&
                              arnPartition !== false
                            ) {
                              if (
                                _.getAttr(arnPartition, "name") ===
                                _.getAttr(partitionResult, "name")
                              ) {
                                if (
                                  _.isValidHostLabel(
                                    _.getAttr(accessPointArn, "region"),
                                    true,
                                  )
                                ) {
                                  if (
                                    !(
                                      _.getAttr(accessPointArn, "accountId") ===
                                      ""
                                    )
                                  ) {
                                    if (
                                      _.isValidHostLabel(
                                        _.getAttr(accessPointArn, "accountId"),
                                        false,
                                      )
                                    ) {
                                      if (
                                        AccountId != null &&
                                        !(
                                          AccountId ===
                                          `${_.getAttr(accessPointArn, "accountId")}`
                                        )
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
                                        if (
                                          outpostType != null &&
                                          outpostType !== false
                                        ) {
                                          {
                                            const accessPointName = _.getAttr(
                                              accessPointArn,
                                              "resourceId[3]",
                                            );
                                            if (
                                              accessPointName != null &&
                                              accessPointName !== false
                                            ) {
                                              if (
                                                outpostType === "accesspoint"
                                              ) {
                                                if (
                                                  UseFIPS === true &&
                                                  UseDualStack === true
                                                ) {
                                                  return e(
                                                    `https://s3-outposts-fips.${_.getAttr(accessPointArn, "region")}.${_.getAttr(arnPartition, "dualStackDnsSuffix")}`,
                                                    _p3(accessPointArn),
                                                    {
                                                      "x-amz-account-id": [
                                                        `${_.getAttr(accessPointArn, "accountId")}`,
                                                      ],
                                                      "x-amz-outpost-id": [
                                                        `${outpostId}`,
                                                      ],
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
                                                      "x-amz-outpost-id": [
                                                        `${outpostId}`,
                                                      ],
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
                                                      "x-amz-outpost-id": [
                                                        `${outpostId}`,
                                                      ],
                                                    },
                                                  );
                                                }
                                                {
                                                  const url =
                                                    _.parseURL(Endpoint);
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
                                                        "x-amz-outpost-id": [
                                                          `${outpostId}`,
                                                        ],
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
                                                    "x-amz-outpost-id": [
                                                      `${outpostId}`,
                                                    ],
                                                  },
                                                );
                                              }
                                              return err(
                                                `Expected an outpost type \`accesspoint\`, found \`${outpostType}\``,
                                              );
                                            }
                                          }
                                          return err(
                                            "Invalid ARN: expected an access point name",
                                          );
                                        }
                                      }
                                      return err(
                                        "Invalid ARN: Expected a 4-component resource",
                                      );
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
                        const arnPartition = _.partition(
                          _.getAttr(bucketArn, "region"),
                        );
                        if (arnPartition != null && arnPartition !== false) {
                          {
                            const partitionResult = _.partition(Region);
                            if (
                              partitionResult != null &&
                              partitionResult !== false
                            ) {
                              if (
                                _.getAttr(arnPartition, "name") ===
                                _.getAttr(partitionResult, "name")
                              ) {
                                if (
                                  _.isValidHostLabel(
                                    _.getAttr(bucketArn, "region"),
                                    true,
                                  )
                                ) {
                                  if (
                                    !(_.getAttr(bucketArn, "accountId") === "")
                                  ) {
                                    if (
                                      _.isValidHostLabel(
                                        _.getAttr(bucketArn, "accountId"),
                                        false,
                                      )
                                    ) {
                                      if (
                                        AccountId != null &&
                                        !(
                                          AccountId ===
                                          `${_.getAttr(bucketArn, "accountId")}`
                                        )
                                      ) {
                                        return err(
                                          `Invalid ARN: the accountId specified in the ARN (\`${_.getAttr(bucketArn, "accountId")}\`) does not match the parameter (\`${AccountId}\`)`,
                                        );
                                      }
                                      {
                                        const outpostType = _.getAttr(
                                          bucketArn,
                                          "resourceId[2]",
                                        );
                                        if (
                                          outpostType != null &&
                                          outpostType !== false
                                        ) {
                                          {
                                            const bucketName = _.getAttr(
                                              bucketArn,
                                              "resourceId[3]",
                                            );
                                            if (
                                              bucketName != null &&
                                              bucketName !== false
                                            ) {
                                              if (outpostType === "bucket") {
                                                if (
                                                  UseFIPS === true &&
                                                  UseDualStack === true
                                                ) {
                                                  return e(
                                                    `https://s3-outposts-fips.${_.getAttr(bucketArn, "region")}.${_.getAttr(arnPartition, "dualStackDnsSuffix")}`,
                                                    _p3(bucketArn),
                                                    {
                                                      "x-amz-account-id": [
                                                        `${_.getAttr(bucketArn, "accountId")}`,
                                                      ],
                                                      "x-amz-outpost-id": [
                                                        `${outpostId}`,
                                                      ],
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
                                                      "x-amz-outpost-id": [
                                                        `${outpostId}`,
                                                      ],
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
                                                      "x-amz-outpost-id": [
                                                        `${outpostId}`,
                                                      ],
                                                    },
                                                  );
                                                }
                                                {
                                                  const url =
                                                    _.parseURL(Endpoint);
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
                                                        "x-amz-outpost-id": [
                                                          `${outpostId}`,
                                                        ],
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
                                                    "x-amz-outpost-id": [
                                                      `${outpostId}`,
                                                    ],
                                                  },
                                                );
                                              }
                                              return err(
                                                `Invalid ARN: Expected an outpost type \`bucket\`, found \`${outpostType}\``,
                                              );
                                            }
                                          }
                                          return err(
                                            "Invalid ARN: expected a bucket name",
                                          );
                                        }
                                      }
                                      return err(
                                        "Invalid ARN: Expected a 4-component resource",
                                      );
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
            if (
              RequiresAccountId != null &&
              RequiresAccountId === true &&
              !(AccountId != null)
            ) {
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
                if (
                  RequiresAccountId != null &&
                  RequiresAccountId === true &&
                  AccountId != null
                ) {
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
  },
};

export class AccessPointAlreadyOwnedByYou
  extends /*@__PURE__*/ TE.TaggedError("AccessPointAlreadyOwnedByYou", [
    "AlreadyExistsError",
  ])<{ readonly message?: string }> {}
export class BadRequestException
  extends /*@__PURE__*/ TE.TaggedError("BadRequestException")<{
    readonly message?: string;
  }> {}
export class BucketAlreadyExists
  extends /*@__PURE__*/ TE.TaggedError("BucketAlreadyExists", [
    "AlreadyExistsError",
  ])<{ readonly message?: string }> {}
export class BucketAlreadyOwnedByYou
  extends /*@__PURE__*/ TE.TaggedError("BucketAlreadyOwnedByYou")<{
    readonly message?: string;
  }> {}
export class IdempotencyException
  extends /*@__PURE__*/ TE.TaggedError("IdempotencyException")<{
    readonly message?: string;
  }> {}
export class InternalServiceException
  extends /*@__PURE__*/ TE.TaggedError("InternalServiceException")<{
    readonly message?: string;
  }> {}
export class InvalidNextTokenException
  extends /*@__PURE__*/ TE.TaggedError("InvalidNextTokenException")<{
    readonly message?: string;
  }> {}
export class InvalidRequest
  extends /*@__PURE__*/ TE.TaggedError("InvalidRequest", ["BadRequestError"])<{
    readonly message?: string;
  }> {}
export class InvalidRequestException
  extends /*@__PURE__*/ TE.TaggedError("InvalidRequestException")<{
    readonly message?: string;
  }> {}
export class JobStatusException
  extends /*@__PURE__*/ TE.TaggedError("JobStatusException")<{
    readonly message?: string;
  }> {}
export class JobStatusTransitionForbidden
  extends /*@__PURE__*/ TE.TaggedError(
    "JobStatusTransitionForbidden",
    ["BadRequestError"],
    {
      synthetic: {
        from: "InvalidRequest",
        message: { includes: "job status forbidden" },
      },
    },
  )<{ readonly message?: string }> {}
export class MalformedPolicy
  extends /*@__PURE__*/ TE.TaggedError("MalformedPolicy", ["BadRequestError"])<{
    readonly message?: string;
  }> {}
export class MissingBucketLevelActivityMetrics
  extends /*@__PURE__*/ TE.TaggedError("MissingBucketLevelActivityMetrics", [
    "BadRequestError",
  ])<{ readonly message?: string }> {}
export class NoSuchAccessPoint
  extends /*@__PURE__*/ TE.TaggedError("NoSuchAccessPoint", ["NotFoundError"])<{
    readonly message?: string;
  }> {}
export class NoSuchAccessPointPolicy
  extends /*@__PURE__*/ TE.TaggedError("NoSuchAccessPointPolicy", [
    "NotFoundError",
  ])<{ readonly message?: string }> {}
export class NoSuchConfiguration
  extends /*@__PURE__*/ TE.TaggedError("NoSuchConfiguration", [
    "NotFoundError",
  ])<{ readonly message?: string }> {}
export class NoSuchMultiRegionAccessPoint
  extends /*@__PURE__*/ TE.TaggedError("NoSuchMultiRegionAccessPoint", [
    "NotFoundError",
  ])<{ readonly message?: string }> {}
export class NoSuchPublicAccessBlockConfiguration
  extends /*@__PURE__*/ TE.TaggedError(
    "NoSuchPublicAccessBlockConfiguration",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class NotFoundException
  extends /*@__PURE__*/ TE.TaggedError("NotFoundException")<{
    readonly message?: string;
  }> {}
export class ObjectLambdaNotAvailable
  extends /*@__PURE__*/ TE.TaggedError(
    "ObjectLambdaNotAvailable",
    ["AuthError"],
    {
      synthetic: {
        from: "AccessDenied",
        message: {
          includes: "Object Lambda is available only to existing customers",
        },
      },
    },
  )<{ readonly message?: string }> {}
export class TooManyRequestsException
  extends /*@__PURE__*/ TE.TaggedError("TooManyRequestsException")<{
    readonly message?: string;
  }> {}
export class TooManyTagsException
  extends /*@__PURE__*/ TE.TaggedError("TooManyTagsException")<{
    readonly message?: string;
  }> {}
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
export type GranteeType =
  | "DIRECTORY_USER"
  | "DIRECTORY_GROUP"
  | "IAM"
  | (string & {});
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
export type ObjectLambdaContentTransformation = {
  AwsLambda: AwsLambdaTransformation;
};
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
export type ObjectLambdaAccessPointAliasStatus =
  | "PROVISIONING"
  | "READY"
  | (string & {});
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
export type S3GranteeTypeIdentifier =
  | "id"
  | "emailAddress"
  | "uri"
  | (string & {});
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
export interface S3CopyObjectOperation {
  TargetResource?: string;
  CannedAccessControlList?: S3CannedAccessControlList;
  AccessControlGrants?: S3Grant[];
  MetadataDirective?: S3MetadataDirective;
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
export type S3ObjectLockRetentionMode =
  | "COMPLIANCE"
  | "GOVERNANCE"
  | (string & {});
export interface S3Retention {
  RetainUntilDate?: Date;
  Mode?: S3ObjectLockRetentionMode;
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
export type ComputeObjectChecksumType =
  | "FULL_OBJECT"
  | "COMPOSITE"
  | (string & {});
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
export type JobManifestFieldName =
  | "Ignore"
  | "Bucket"
  | "Key"
  | "VersionId"
  | (string & {});
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
export type GeneratedManifestFormat =
  | "S3InventoryReport_CSV_20211130"
  | (string & {});
export interface S3ManifestOutputLocation {
  ExpectedManifestBucketOwner?: string;
  Bucket: string;
  ManifestPrefix?: string;
  ManifestEncryption?: GeneratedManifestEncryption;
  ManifestFormat: GeneratedManifestFormat;
}
export type ObjectCreationTime = Date;
export type ReplicationStatus =
  | "COMPLETED"
  | "FAILED"
  | "REPLICA"
  | "NONE"
  | (string & {});
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
  | {
      SSES3: SSES3Filter;
      SSEKMS?: never;
      DSSEKMS?: never;
      SSEC?: never;
      NOTSSE?: never;
    }
  | {
      SSES3?: never;
      SSEKMS: SSEKMSFilter;
      DSSEKMS?: never;
      SSEC?: never;
      NOTSSE?: never;
    }
  | {
      SSES3?: never;
      SSEKMS?: never;
      DSSEKMS: DSSEKMSFilter;
      SSEC?: never;
      NOTSSE?: never;
    }
  | {
      SSES3?: never;
      SSEKMS?: never;
      DSSEKMS?: never;
      SSEC: SSECFilter;
      NOTSSE?: never;
    }
  | {
      SSES3?: never;
      SSEKMS?: never;
      DSSEKMS?: never;
      SSEC?: never;
      NOTSSE: NotSSEFilter;
    };
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
export type JobManifestGenerator = {
  S3JobManifestGenerator: S3JobManifestGenerator;
};
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
export type MultiRegionAccessPointRegionalResponseList =
  MultiRegionAccessPointRegionalResponse[];
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
export type SseKmsEncryptedObjectsStatus =
  | "Enabled"
  | "Disabled"
  | (string & {});
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
export type ExistingObjectReplicationStatus =
  | "Enabled"
  | "Disabled"
  | (string & {});
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
export type DeleteMarkerReplicationStatus =
  | "Enabled"
  | "Disabled"
  | (string & {});
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
  descriptor: {
    service: svc,
    http: "POST /v20180820/accessgrantsinstance/identitycenter",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      IdentityCenterArn: 0,
    },
    staticContext: { RequiresAccountId: { value: true } },
    body: "AssociateAccessGrantsIdentityCenterRequest",
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateAccessGrantsIdentityCenter",
  endpointHostPrefix: "{AccountId}.",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v20180820/accessgrantsinstance/grant",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      AccessGrantsLocationId: 0,
      AccessGrantsLocationConfiguration: { S3SubPrefix: 0 },
      Grantee: { GranteeType: 0, GranteeIdentifier: 0 },
      Permission: 0,
      ApplicationArn: 0,
      S3PrefixType: 0,
      Tags: D.list(i_Tag, { item: "Tag" }),
    },
    output: {
      CreatedAt: D.ts,
      Grantee: {},
      AccessGrantsLocationConfiguration: {},
    },
    staticContext: { RequiresAccountId: { value: true } },
    body: "CreateAccessGrantRequest",
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAccessGrant",
  endpointHostPrefix: "{AccountId}.",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v20180820/accessgrantsinstance",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      IdentityCenterArn: 0,
      Tags: D.list(i_Tag, { item: "Tag" }),
    },
    output: { CreatedAt: D.ts },
    staticContext: { RequiresAccountId: { value: true } },
    body: "CreateAccessGrantsInstanceRequest",
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAccessGrantsInstance",
  endpointHostPrefix: "{AccountId}.",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v20180820/accessgrantsinstance/location",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      LocationScope: 0,
      IAMRoleArn: 0,
      Tags: D.list(i_Tag, { item: "Tag" }),
    },
    output: { CreatedAt: D.ts },
    staticContext: { RequiresAccountId: { value: true } },
    body: "CreateAccessGrantsLocationRequest",
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAccessGrantsLocation",
  endpointHostPrefix: "{AccountId}.",
})) as any;

export type CreateAccessPointError =
  | AccessPointAlreadyOwnedByYou
  | InvalidRequest
  | CommonErrors;
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
  descriptor: {
    service: svc,
    http: "PUT /v20180820/accesspoint/{Name}",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      Name: D.m({ context: "AccessPointName" }),
      Bucket: D.m({ context: "Bucket" }),
      VpcConfiguration: { VpcId: 0 },
      PublicAccessBlockConfiguration: i_PublicAccessBlockConfiguration,
      BucketAccountId: 0,
      Scope: i_Scope,
      Tags: D.list(i_Tag, { item: "Tag" }),
    },
    staticContext: { RequiresAccountId: { value: true } },
    body: "CreateAccessPointRequest",
  },
  errors: [AccessPointAlreadyOwnedByYou, InvalidRequest],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAccessPoint",
  endpointHostPrefix: "{AccountId}.",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /v20180820/accesspointforobjectlambda/{Name}",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      Name: 0,
      Configuration: i_ObjectLambdaConfiguration,
    },
    output: { Alias: {} },
    staticContext: { RequiresAccountId: { value: true } },
    body: "CreateAccessPointForObjectLambdaRequest",
  },
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
})) as any;

export type CreateBucketError =
  | BucketAlreadyExists
  | BucketAlreadyOwnedByYou
  | CommonErrors;
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
  descriptor: {
    service: svc,
    http: "PUT /v20180820/bucket/{Bucket}",
    input: {
      ACL: D.m({ header: "x-amz-acl" }),
      Bucket: D.m({ context: "Bucket" }),
      CreateBucketConfiguration: D.m({
        payload: true,
        wire: "CreateBucketConfiguration",
        shape: { LocationConstraint: 0 },
      }),
      GrantFullControl: D.m({ header: "x-amz-grant-full-control" }),
      GrantRead: D.m({ header: "x-amz-grant-read" }),
      GrantReadACP: D.m({ header: "x-amz-grant-read-acp" }),
      GrantWrite: D.m({ header: "x-amz-grant-write" }),
      GrantWriteACP: D.m({ header: "x-amz-grant-write-acp" }),
      ObjectLockEnabledForBucket: D.m({
        header: "x-amz-bucket-object-lock-enabled",
      }),
      OutpostId: D.m({ header: "x-amz-outpost-id", context: "OutpostId" }),
    },
    output: { Location: D.m({ header: "Location" }) },
  },
  errors: [BucketAlreadyExists, BucketAlreadyOwnedByYou],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateBucket",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v20180820/jobs",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      ConfirmationRequired: 0,
      Operation: {
        LambdaInvoke: {
          FunctionArn: 0,
          InvocationSchemaVersion: 0,
          UserArguments: D.map(),
        },
        S3PutObjectCopy: {
          TargetResource: 0,
          CannedAccessControlList: 0,
          AccessControlGrants: D.list(i_S3Grant),
          MetadataDirective: 0,
          ModifiedSinceConstraint: 0,
          NewObjectMetadata: {
            CacheControl: 0,
            ContentDisposition: 0,
            ContentEncoding: 0,
            ContentLanguage: 0,
            UserMetadata: D.map(),
            ContentLength: 0,
            ContentMD5: 0,
            ContentType: 0,
            HttpExpiresDate: 0,
            RequesterCharged: 0,
            SSEAlgorithm: 0,
          },
          NewObjectTagging: D.list(i_S3Tag),
          RedirectLocation: 0,
          RequesterPays: 0,
          StorageClass: 0,
          UnModifiedSinceConstraint: 0,
          SSEAwsKmsKeyId: 0,
          TargetKeyPrefix: 0,
          ObjectLockLegalHoldStatus: 0,
          ObjectLockMode: 0,
          ObjectLockRetainUntilDate: 0,
          BucketKeyEnabled: 0,
          ChecksumAlgorithm: 0,
        },
        S3PutObjectAcl: {
          AccessControlPolicy: {
            AccessControlList: {
              Owner: { ID: 0, DisplayName: 0 },
              Grants: D.list(i_S3Grant),
            },
            CannedAccessControlList: 0,
          },
        },
        S3PutObjectTagging: { TagSet: D.list(i_S3Tag) },
        S3DeleteObjectTagging: {},
        S3InitiateRestoreObject: { ExpirationInDays: 0, GlacierJobTier: 0 },
        S3PutObjectLegalHold: { LegalHold: { Status: 0 } },
        S3PutObjectRetention: {
          BypassGovernanceRetention: 0,
          Retention: { RetainUntilDate: 0, Mode: 0 },
        },
        S3ReplicateObject: {},
        S3ComputeObjectChecksum: { ChecksumAlgorithm: 0, ChecksumType: 0 },
        S3UpdateObjectEncryption: {
          ObjectEncryption: {
            SSEKMS: D.m({
              wire: "SSE-KMS",
              shape: { KMSKeyArn: 0, BucketKeyEnabled: 0 },
            }),
          },
        },
      },
      Report: {
        Bucket: 0,
        Format: 0,
        Enabled: 0,
        Prefix: 0,
        ReportScope: 0,
        ExpectedBucketOwner: 0,
      },
      ClientRequestToken: D.m({ idempotency: true }),
      Manifest: {
        Spec: { Format: 0, Fields: 0 },
        Location: { ObjectArn: 0, ObjectVersionId: 0, ETag: 0 },
      },
      Description: 0,
      Priority: 0,
      RoleArn: 0,
      Tags: D.list(i_S3Tag),
      ManifestGenerator: {
        S3JobManifestGenerator: {
          ExpectedBucketOwner: 0,
          SourceBucket: 0,
          ManifestOutputLocation: {
            ExpectedManifestBucketOwner: 0,
            Bucket: 0,
            ManifestPrefix: 0,
            ManifestEncryption: {
              SSES3: D.m({ wire: "SSE-S3", shape: {} }),
              SSEKMS: D.m({ wire: "SSE-KMS", shape: { KeyId: 0 } }),
            },
            ManifestFormat: 0,
          },
          Filter: {
            EligibleForReplication: 0,
            CreatedAfter: 0,
            CreatedBefore: 0,
            ObjectReplicationStatuses: 0,
            KeyNameConstraint: {
              MatchAnyPrefix: 0,
              MatchAnySuffix: 0,
              MatchAnySubstring: 0,
            },
            ObjectSizeGreaterThanBytes: 0,
            ObjectSizeLessThanBytes: 0,
            MatchAnyStorageClass: 0,
            MatchAnyObjectEncryption: D.list(
              {
                SSES3: D.m({ wire: "SSE-S3", shape: {} }),
                SSEKMS: D.m({
                  wire: "SSE-KMS",
                  shape: { KmsKeyArn: 0, BucketKeyEnabled: 0 },
                }),
                DSSEKMS: D.m({ wire: "DSSE-KMS", shape: { KmsKeyArn: 0 } }),
                SSEC: D.m({ wire: "SSE-C", shape: {} }),
                NOTSSE: D.m({ wire: "NOT-SSE", shape: {} }),
              },
              { item: "ObjectEncryption" },
            ),
          },
          EnableManifestOutput: 0,
        },
      },
    },
    staticContext: { RequiresAccountId: { value: true } },
    body: "CreateJobRequest",
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v20180820/async-requests/mrap/create",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      ClientToken: D.m({ idempotency: true }),
      Details: {
        Name: 0,
        PublicAccessBlock: i_PublicAccessBlockConfiguration,
        Regions: D.list({ Bucket: 0, BucketAccountId: 0 }, { item: "Region" }),
      },
    },
    staticContext: { RequiresAccountId: { value: true } },
    body: "CreateMultiRegionAccessPointRequest",
  },
  errors: [InvalidRequest],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMultiRegionAccessPoint",
  endpointHostPrefix: "{AccountId}.",
})) as any;

export type CreateStorageLensGroupError = CommonErrors;
/**
 * Creates a new S3 Storage Lens group and associates it with the specified Amazon Web Services account ID. An
 * S3 Storage Lens group is a custom grouping of objects based on prefix, suffix, object tags,
 * object size, object age, or a combination of these filters. For each Storage Lens group
 * that you’ve created, you can also optionally add Amazon Web Services resource tags. For more information
 * about S3 Storage Lens groups, see Working with S3 Storage Lens
 * groups.
 *
 * To use this operation, you must have the permission to perform the
 * `s3:CreateStorageLensGroup` action. If you’re trying to create a Storage Lens
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
  descriptor: {
    service: svc,
    http: "POST /v20180820/storagelensgroup",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      StorageLensGroup: i_StorageLensGroup,
      Tags: D.list(i_Tag, { item: "Tag" }),
    },
    staticContext: { RequiresAccountId: { value: true } },
    body: "CreateStorageLensGroupRequest",
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateStorageLensGroup",
  endpointHostPrefix: "{AccountId}.",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /v20180820/accessgrantsinstance/grant/{AccessGrantId}",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      AccessGrantId: 0,
    },
    staticContext: { RequiresAccountId: { value: true } },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccessGrant",
  endpointHostPrefix: "{AccountId}.",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /v20180820/accessgrantsinstance",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
    },
    staticContext: { RequiresAccountId: { value: true } },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccessGrantsInstance",
  endpointHostPrefix: "{AccountId}.",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /v20180820/accessgrantsinstance/resourcepolicy",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
    },
    staticContext: { RequiresAccountId: { value: true } },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccessGrantsInstanceResourcePolicy",
  endpointHostPrefix: "{AccountId}.",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /v20180820/accessgrantsinstance/location/{AccessGrantsLocationId}",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      AccessGrantsLocationId: 0,
    },
    staticContext: { RequiresAccountId: { value: true } },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccessGrantsLocation",
  endpointHostPrefix: "{AccountId}.",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /v20180820/accesspoint/{Name}",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      Name: D.m({ context: "AccessPointName" }),
    },
    staticContext: { RequiresAccountId: { value: true } },
  },
  errors: [NoSuchAccessPoint],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccessPoint",
  endpointHostPrefix: "{AccountId}.",
})) as any;

export type DeleteAccessPointForObjectLambdaError =
  | NoSuchAccessPoint
  | CommonErrors;
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
  descriptor: {
    service: svc,
    http: "DELETE /v20180820/accesspointforobjectlambda/{Name}",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      Name: 0,
    },
    staticContext: { RequiresAccountId: { value: true } },
  },
  errors: [NoSuchAccessPoint],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccessPointForObjectLambda",
  endpointHostPrefix: "{AccountId}.",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /v20180820/accesspoint/{Name}/policy",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      Name: D.m({ context: "AccessPointName" }),
    },
    staticContext: { RequiresAccountId: { value: true } },
  },
  errors: [NoSuchAccessPoint, NoSuchAccessPointPolicy],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccessPointPolicy",
  endpointHostPrefix: "{AccountId}.",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /v20180820/accesspointforobjectlambda/{Name}/policy",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      Name: 0,
    },
    staticContext: { RequiresAccountId: { value: true } },
  },
  errors: [NoSuchAccessPoint, NoSuchAccessPointPolicy],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccessPointPolicyForObjectLambda",
  endpointHostPrefix: "{AccountId}.",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /v20180820/accesspoint/{Name}/scope",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      Name: D.m({ context: "AccessPointName" }),
    },
    staticContext: {
      RequiresAccountId: { value: true },
      UseS3ExpressControlEndpoint: { value: true },
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccessPointScope",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /v20180820/bucket/{Bucket}",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      Bucket: D.m({ context: "Bucket" }),
    },
    staticContext: { RequiresAccountId: { value: true } },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBucket",
  endpointHostPrefix: "{AccountId}.",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /v20180820/bucket/{Bucket}/lifecycleconfiguration",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      Bucket: D.m({ context: "Bucket" }),
    },
    staticContext: { RequiresAccountId: { value: true } },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBucketLifecycleConfiguration",
  endpointHostPrefix: "{AccountId}.",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /v20180820/bucket/{Bucket}/policy",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      Bucket: D.m({ context: "Bucket" }),
    },
    staticContext: { RequiresAccountId: { value: true } },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBucketPolicy",
  endpointHostPrefix: "{AccountId}.",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /v20180820/bucket/{Bucket}/replication",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      Bucket: D.m({ context: "Bucket" }),
    },
    staticContext: { RequiresAccountId: { value: true } },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBucketReplication",
  endpointHostPrefix: "{AccountId}.",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /v20180820/bucket/{Bucket}/tagging",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      Bucket: D.m({ context: "Bucket" }),
    },
    staticContext: { RequiresAccountId: { value: true } },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBucketTagging",
  endpointHostPrefix: "{AccountId}.",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /v20180820/jobs/{JobId}/tagging",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      JobId: 0,
    },
    staticContext: { RequiresAccountId: { value: true } },
  },
  errors: [
    InternalServiceException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteJobTagging",
  endpointHostPrefix: "{AccountId}.",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v20180820/async-requests/mrap/delete",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      ClientToken: D.m({ idempotency: true }),
      Details: { Name: 0 },
    },
    staticContext: { RequiresAccountId: { value: true } },
    body: "DeleteMultiRegionAccessPointRequest",
  },
  errors: [NoSuchMultiRegionAccessPoint, InvalidRequest],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMultiRegionAccessPoint",
  endpointHostPrefix: "{AccountId}.",
})) as any;

export type DeletePublicAccessBlockError = CommonErrors;
/**
 * This operation is not supported by directory buckets.
 *
 * Removes the `PublicAccessBlock` configuration for an Amazon Web Services account. This
 * operation might be restricted when the account is managed by organization-level Block
 * Public Access policies. You’ll get an Access Denied (403) error when the account is managed
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
  descriptor: {
    service: svc,
    http: "DELETE /v20180820/configuration/publicAccessBlock",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
    },
    staticContext: { RequiresAccountId: { value: true } },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePublicAccessBlock",
  endpointHostPrefix: "{AccountId}.",
})) as any;

export type DeleteStorageLensConfigurationError =
  | NoSuchConfiguration
  | CommonErrors;
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
  descriptor: {
    service: svc,
    http: "DELETE /v20180820/storagelens/{ConfigId}",
    input: {
      ConfigId: 0,
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
    },
    staticContext: { RequiresAccountId: { value: true } },
  },
  errors: [NoSuchConfiguration],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteStorageLensConfiguration",
  endpointHostPrefix: "{AccountId}.",
})) as any;

export type DeleteStorageLensConfigurationTaggingError =
  | NoSuchConfiguration
  | CommonErrors;
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
  descriptor: {
    service: svc,
    http: "DELETE /v20180820/storagelens/{ConfigId}/tagging",
    input: {
      ConfigId: 0,
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
    },
    staticContext: { RequiresAccountId: { value: true } },
  },
  errors: [NoSuchConfiguration],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteStorageLensConfigurationTagging",
  endpointHostPrefix: "{AccountId}.",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /v20180820/storagelensgroup/{Name}",
    input: {
      Name: 0,
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
    },
    staticContext: { RequiresAccountId: { value: true } },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteStorageLensGroup",
  endpointHostPrefix: "{AccountId}.",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v20180820/jobs/{JobId}",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      JobId: 0,
    },
    output: {
      Job: {
        ConfirmationRequired: D.bool,
        Manifest: { Spec: { Fields: D.list() }, Location: {} },
        Operation: {
          LambdaInvoke: { UserArguments: D.map() },
          S3PutObjectCopy: {
            AccessControlGrants: D.list(o_S3Grant),
            ModifiedSinceConstraint: D.ts,
            NewObjectMetadata: {
              UserMetadata: D.map(),
              ContentLength: D.num,
              HttpExpiresDate: D.ts,
              RequesterCharged: D.bool,
            },
            NewObjectTagging: D.list({}),
            RequesterPays: D.bool,
            UnModifiedSinceConstraint: D.ts,
            ObjectLockRetainUntilDate: D.ts,
            BucketKeyEnabled: D.bool,
          },
          S3PutObjectAcl: {
            AccessControlPolicy: {
              AccessControlList: { Owner: {}, Grants: D.list(o_S3Grant) },
            },
          },
          S3PutObjectTagging: { TagSet: D.list({}) },
          S3DeleteObjectTagging: {},
          S3InitiateRestoreObject: { ExpirationInDays: D.num },
          S3PutObjectLegalHold: { LegalHold: {} },
          S3PutObjectRetention: {
            BypassGovernanceRetention: D.bool,
            Retention: { RetainUntilDate: D.ts },
          },
          S3ReplicateObject: {},
          S3ComputeObjectChecksum: {},
          S3UpdateObjectEncryption: {
            ObjectEncryption: {
              SSEKMS: D.m({
                wire: "SSE-KMS",
                shape: { BucketKeyEnabled: D.bool },
              }),
            },
          },
        },
        Priority: D.num,
        ProgressSummary: o_JobProgressSummary,
        FailureReasons: D.list({}),
        Report: { Enabled: D.bool },
        CreationTime: D.ts,
        TerminationDate: D.ts,
        SuspendedDate: D.ts,
        ManifestGenerator: {
          S3JobManifestGenerator: {
            ManifestOutputLocation: {
              ManifestEncryption: {
                SSES3: D.m({ wire: "SSE-S3", shape: {} }),
                SSEKMS: D.m({ wire: "SSE-KMS", shape: {} }),
              },
            },
            Filter: {
              EligibleForReplication: D.bool,
              CreatedAfter: D.ts,
              CreatedBefore: D.ts,
              ObjectReplicationStatuses: D.list(),
              KeyNameConstraint: {
                MatchAnyPrefix: D.list(),
                MatchAnySuffix: D.list(),
                MatchAnySubstring: D.list(),
              },
              ObjectSizeGreaterThanBytes: D.num,
              ObjectSizeLessThanBytes: D.num,
              MatchAnyStorageClass: D.list(),
              MatchAnyObjectEncryption: D.list(
                {
                  SSES3: D.m({ wire: "SSE-S3", shape: {} }),
                  SSEKMS: D.m({
                    wire: "SSE-KMS",
                    shape: { BucketKeyEnabled: D.bool },
                  }),
                  DSSEKMS: D.m({ wire: "DSSE-KMS", shape: {} }),
                  SSEC: D.m({ wire: "SSE-C", shape: {} }),
                  NOTSSE: D.m({ wire: "NOT-SSE", shape: {} }),
                },
                { item: "ObjectEncryption" },
              ),
            },
            EnableManifestOutput: D.bool,
          },
        },
        GeneratedManifestDescriptor: { Location: {} },
      },
    },
    staticContext: { RequiresAccountId: { value: true } },
  },
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
})) as any;

export type DescribeMultiRegionAccessPointOperationError =
  | InvalidRequest
  | CommonErrors;
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
  descriptor: {
    service: svc,
    http: "GET /v20180820/async-requests/mrap/{RequestTokenARN+}",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      RequestTokenARN: 0,
    },
    output: {
      AsyncOperation: {
        CreationTime: D.ts,
        RequestParameters: {
          CreateMultiRegionAccessPointRequest: {
            PublicAccessBlock: o_PublicAccessBlockConfiguration,
            Regions: D.list({}, { item: "Region" }),
          },
          DeleteMultiRegionAccessPointRequest: {},
          PutMultiRegionAccessPointPolicyRequest: {},
        },
        ResponseDetails: {
          MultiRegionAccessPointDetails: {
            Regions: D.list({}, { item: "Region" }),
          },
          ErrorDetails: {},
        },
      },
    },
    staticContext: { RequiresAccountId: { value: true } },
  },
  errors: [InvalidRequest],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMultiRegionAccessPointOperation",
  endpointHostPrefix: "{AccountId}.",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /v20180820/accessgrantsinstance/identitycenter",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
    },
    staticContext: { RequiresAccountId: { value: true } },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DissociateAccessGrantsIdentityCenter",
  endpointHostPrefix: "{AccountId}.",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v20180820/accessgrantsinstance/grant/{AccessGrantId}",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      AccessGrantId: 0,
    },
    output: {
      CreatedAt: D.ts,
      Grantee: {},
      AccessGrantsLocationConfiguration: {},
    },
    staticContext: { RequiresAccountId: { value: true } },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccessGrant",
  endpointHostPrefix: "{AccountId}.",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v20180820/accessgrantsinstance",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
    },
    output: { CreatedAt: D.ts },
    staticContext: { RequiresAccountId: { value: true } },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccessGrantsInstance",
  endpointHostPrefix: "{AccountId}.",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v20180820/accessgrantsinstance/prefix",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      S3Prefix: D.m({ query: "s3prefix" }),
    },
    staticContext: { RequiresAccountId: { value: true } },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccessGrantsInstanceForPrefix",
  endpointHostPrefix: "{AccountId}.",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v20180820/accessgrantsinstance/resourcepolicy",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
    },
    output: { CreatedAt: D.ts },
    staticContext: { RequiresAccountId: { value: true } },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccessGrantsInstanceResourcePolicy",
  endpointHostPrefix: "{AccountId}.",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v20180820/accessgrantsinstance/location/{AccessGrantsLocationId}",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      AccessGrantsLocationId: 0,
    },
    output: { CreatedAt: D.ts },
    staticContext: { RequiresAccountId: { value: true } },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccessGrantsLocation",
  endpointHostPrefix: "{AccountId}.",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v20180820/accesspoint/{Name}",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      Name: D.m({ context: "AccessPointName" }),
    },
    output: {
      VpcConfiguration: {},
      PublicAccessBlockConfiguration: o_PublicAccessBlockConfiguration,
      CreationDate: D.ts,
      Endpoints: D.map(),
    },
    staticContext: { RequiresAccountId: { value: true } },
  },
  errors: [NoSuchAccessPoint],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccessPoint",
  endpointHostPrefix: "{AccountId}.",
})) as any;

export type GetAccessPointConfigurationForObjectLambdaError =
  | NoSuchAccessPoint
  | CommonErrors;
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
  descriptor: {
    service: svc,
    http: "GET /v20180820/accesspointforobjectlambda/{Name}/configuration",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      Name: 0,
    },
    output: {
      Configuration: {
        CloudWatchMetricsEnabled: D.bool,
        AllowedFeatures: D.list(0, { item: "AllowedFeature" }),
        TransformationConfigurations: D.list(
          {
            Actions: D.list(0, { item: "Action" }),
            ContentTransformation: { AwsLambda: {} },
          },
          { item: "TransformationConfiguration" },
        ),
      },
    },
    staticContext: { RequiresAccountId: { value: true } },
  },
  errors: [NoSuchAccessPoint],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccessPointConfigurationForObjectLambda",
  endpointHostPrefix: "{AccountId}.",
})) as any;

export type GetAccessPointForObjectLambdaError =
  | NoSuchAccessPoint
  | CommonErrors;
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
  descriptor: {
    service: svc,
    http: "GET /v20180820/accesspointforobjectlambda/{Name}",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      Name: 0,
    },
    output: {
      PublicAccessBlockConfiguration: o_PublicAccessBlockConfiguration,
      CreationDate: D.ts,
      Alias: {},
    },
    staticContext: { RequiresAccountId: { value: true } },
  },
  errors: [NoSuchAccessPoint],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccessPointForObjectLambda",
  endpointHostPrefix: "{AccountId}.",
})) as any;

export type GetAccessPointPolicyError =
  | NoSuchAccessPoint
  | NoSuchAccessPointPolicy
  | CommonErrors;
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
  descriptor: {
    service: svc,
    http: "GET /v20180820/accesspoint/{Name}/policy",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      Name: D.m({ context: "AccessPointName" }),
    },
    staticContext: { RequiresAccountId: { value: true } },
  },
  errors: [NoSuchAccessPoint, NoSuchAccessPointPolicy],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccessPointPolicy",
  endpointHostPrefix: "{AccountId}.",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v20180820/accesspointforobjectlambda/{Name}/policy",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      Name: 0,
    },
    staticContext: { RequiresAccountId: { value: true } },
  },
  errors: [NoSuchAccessPoint, NoSuchAccessPointPolicy],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccessPointPolicyForObjectLambda",
  endpointHostPrefix: "{AccountId}.",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v20180820/accesspoint/{Name}/policyStatus",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      Name: D.m({ context: "AccessPointName" }),
    },
    output: { PolicyStatus: o_PolicyStatus },
    staticContext: { RequiresAccountId: { value: true } },
  },
  errors: [NoSuchAccessPoint, NoSuchAccessPointPolicy],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccessPointPolicyStatus",
  endpointHostPrefix: "{AccountId}.",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v20180820/accesspointforobjectlambda/{Name}/policyStatus",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      Name: 0,
    },
    output: { PolicyStatus: o_PolicyStatus },
    staticContext: { RequiresAccountId: { value: true } },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccessPointPolicyStatusForObjectLambda",
  endpointHostPrefix: "{AccountId}.",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v20180820/accesspoint/{Name}/scope",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      Name: D.m({ context: "AccessPointName" }),
    },
    output: {
      Scope: {
        Prefixes: D.list(0, { item: "Prefix" }),
        Permissions: D.list(0, { item: "Permission" }),
      },
    },
    staticContext: {
      RequiresAccountId: { value: true },
      UseS3ExpressControlEndpoint: { value: true },
    },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccessPointScope",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v20180820/bucket/{Bucket}",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      Bucket: D.m({ context: "Bucket" }),
    },
    output: { PublicAccessBlockEnabled: D.bool, CreationDate: D.ts },
    staticContext: { RequiresAccountId: { value: true } },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBucket",
  endpointHostPrefix: "{AccountId}.",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v20180820/bucket/{Bucket}/lifecycleconfiguration",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      Bucket: D.m({ context: "Bucket" }),
    },
    output: {
      Rules: D.list(
        {
          Expiration: {
            Date: D.ts,
            Days: D.num,
            ExpiredObjectDeleteMarker: D.bool,
          },
          Filter: {
            Tag: {},
            And: {
              Tags: D.list({}),
              ObjectSizeGreaterThan: D.num,
              ObjectSizeLessThan: D.num,
            },
            ObjectSizeGreaterThan: D.num,
            ObjectSizeLessThan: D.num,
          },
          Transitions: D.list(
            { Date: D.ts, Days: D.num },
            { item: "Transition" },
          ),
          NoncurrentVersionTransitions: D.list(
            { NoncurrentDays: D.num },
            { item: "NoncurrentVersionTransition" },
          ),
          NoncurrentVersionExpiration: {
            NoncurrentDays: D.num,
            NewerNoncurrentVersions: D.num,
          },
          AbortIncompleteMultipartUpload: { DaysAfterInitiation: D.num },
        },
        { item: "Rule" },
      ),
    },
    staticContext: { RequiresAccountId: { value: true } },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBucketLifecycleConfiguration",
  endpointHostPrefix: "{AccountId}.",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v20180820/bucket/{Bucket}/policy",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      Bucket: D.m({ context: "Bucket" }),
    },
    staticContext: { RequiresAccountId: { value: true } },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBucketPolicy",
  endpointHostPrefix: "{AccountId}.",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v20180820/bucket/{Bucket}/replication",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      Bucket: D.m({ context: "Bucket" }),
    },
    output: {
      ReplicationConfiguration: {
        Rules: D.list(
          {
            Priority: D.num,
            Filter: { Tag: {}, And: { Tags: D.list({}) } },
            SourceSelectionCriteria: {
              SseKmsEncryptedObjects: {},
              ReplicaModifications: {},
            },
            ExistingObjectReplication: {},
            Destination: {
              ReplicationTime: { Time: o_ReplicationTimeValue },
              AccessControlTranslation: {},
              EncryptionConfiguration: {},
              Metrics: { EventThreshold: o_ReplicationTimeValue },
            },
            DeleteMarkerReplication: {},
          },
          { item: "Rule" },
        ),
      },
    },
    staticContext: { RequiresAccountId: { value: true } },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBucketReplication",
  endpointHostPrefix: "{AccountId}.",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v20180820/bucket/{Bucket}/tagging",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      Bucket: D.m({ context: "Bucket" }),
    },
    output: { TagSet: D.list({}) },
    staticContext: { RequiresAccountId: { value: true } },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBucketTagging",
  endpointHostPrefix: "{AccountId}.",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v20180820/bucket/{Bucket}/versioning",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      Bucket: D.m({ context: "Bucket" }),
    },
    output: { MFADelete: D.m({ wire: "MfaDelete" }) },
    staticContext: { RequiresAccountId: { value: true } },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBucketVersioning",
  endpointHostPrefix: "{AccountId}.",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v20180820/accessgrantsinstance/dataaccess",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      Target: D.m({ query: "target" }),
      Permission: D.m({ query: "permission" }),
      DurationSeconds: D.m({ query: "durationSeconds" }),
      Privilege: D.m({ query: "privilege" }),
      TargetType: D.m({ query: "targetType" }),
      AuditContext: D.m({ query: "auditContext" }),
    },
    output: {
      Credentials: {
        AccessKeyId: D.secret,
        SecretAccessKey: D.secret,
        SessionToken: D.secret,
        Expiration: D.ts,
      },
      Grantee: {},
    },
    staticContext: { RequiresAccountId: { value: true } },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataAccess",
  endpointHostPrefix: "{AccountId}.",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v20180820/jobs/{JobId}/tagging",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      JobId: 0,
    },
    output: { Tags: D.list({}) },
    staticContext: { RequiresAccountId: { value: true } },
  },
  errors: [
    InternalServiceException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetJobTagging",
  endpointHostPrefix: "{AccountId}.",
})) as any;

export type GetMultiRegionAccessPointError =
  | NoSuchMultiRegionAccessPoint
  | CommonErrors;
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
  descriptor: {
    service: svc,
    http: "GET /v20180820/mrap/instances/{Name+}",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      Name: 0,
    },
    output: { AccessPoint: o_MultiRegionAccessPointReport },
    staticContext: { RequiresAccountId: { value: true } },
  },
  errors: [NoSuchMultiRegionAccessPoint],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMultiRegionAccessPoint",
  endpointHostPrefix: "{AccountId}.",
})) as any;

export type GetMultiRegionAccessPointPolicyError =
  | NoSuchMultiRegionAccessPoint
  | CommonErrors;
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
  descriptor: {
    service: svc,
    http: "GET /v20180820/mrap/instances/{Name+}/policy",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      Name: 0,
    },
    output: { Policy: { Established: {}, Proposed: {} } },
    staticContext: { RequiresAccountId: { value: true } },
  },
  errors: [NoSuchMultiRegionAccessPoint],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMultiRegionAccessPointPolicy",
  endpointHostPrefix: "{AccountId}.",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v20180820/mrap/instances/{Name+}/policystatus",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      Name: 0,
    },
    output: { Established: o_PolicyStatus },
    staticContext: { RequiresAccountId: { value: true } },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMultiRegionAccessPointPolicyStatus",
  endpointHostPrefix: "{AccountId}.",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v20180820/mrap/instances/{Mrap+}/routes",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      Mrap: 0,
    },
    output: {
      Routes: D.list({ TrafficDialPercentage: D.num }, { item: "Route" }),
    },
    staticContext: { RequiresAccountId: { value: true } },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMultiRegionAccessPointRoutes",
  endpointHostPrefix: "{AccountId}.",
})) as any;

export type GetPublicAccessBlockError =
  | NoSuchPublicAccessBlockConfiguration
  | CommonErrors;
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
  descriptor: {
    service: svc,
    http: "GET /v20180820/configuration/publicAccessBlock",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
    },
    output: {
      PublicAccessBlockConfiguration: D.m({
        payload: true,
        shape: o_PublicAccessBlockConfiguration,
      }),
    },
    staticContext: { RequiresAccountId: { value: true } },
  },
  errors: [NoSuchPublicAccessBlockConfiguration],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPublicAccessBlock",
  endpointHostPrefix: "{AccountId}.",
})) as any;

export type GetStorageLensConfigurationError =
  | NoSuchConfiguration
  | CommonErrors;
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
  descriptor: {
    service: svc,
    http: "GET /v20180820/storagelens/{ConfigId}",
    input: {
      ConfigId: 0,
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
    },
    output: {
      StorageLensConfiguration: D.m({
        payload: true,
        shape: {
          AccountLevel: {
            ActivityMetrics: o_ActivityMetrics,
            BucketLevel: {
              ActivityMetrics: o_ActivityMetrics,
              PrefixLevel: {
                StorageMetrics: {
                  IsEnabled: D.bool,
                  SelectionCriteria: {
                    MaxDepth: D.num,
                    MinStorageBytesPercentage: D.num,
                  },
                },
              },
              AdvancedCostOptimizationMetrics:
                o_AdvancedCostOptimizationMetrics,
              AdvancedDataProtectionMetrics: o_AdvancedDataProtectionMetrics,
              DetailedStatusCodesMetrics: o_DetailedStatusCodesMetrics,
              AdvancedPerformanceMetrics: o_AdvancedPerformanceMetrics,
            },
            AdvancedCostOptimizationMetrics: o_AdvancedCostOptimizationMetrics,
            AdvancedDataProtectionMetrics: o_AdvancedDataProtectionMetrics,
            DetailedStatusCodesMetrics: o_DetailedStatusCodesMetrics,
            AdvancedPerformanceMetrics: o_AdvancedPerformanceMetrics,
            StorageLensGroupLevel: {
              SelectionCriteria: {
                Include: D.list(0, { item: "Arn" }),
                Exclude: D.list(0, { item: "Arn" }),
              },
            },
          },
          Include: {
            Buckets: D.list(0, { item: "Arn" }),
            Regions: D.list(0, { item: "Region" }),
          },
          Exclude: {
            Buckets: D.list(0, { item: "Arn" }),
            Regions: D.list(0, { item: "Region" }),
          },
          DataExport: {
            S3BucketDestination: o_S3BucketDestination,
            CloudWatchMetrics: { IsEnabled: D.bool },
            StorageLensTableDestination: o_StorageLensTableDestination,
          },
          ExpandedPrefixesDataExport: {
            S3BucketDestination: o_S3BucketDestination,
            StorageLensTableDestination: o_StorageLensTableDestination,
          },
          IsEnabled: D.bool,
          AwsOrg: {},
        },
      }),
    },
    staticContext: { RequiresAccountId: { value: true } },
  },
  errors: [NoSuchConfiguration],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetStorageLensConfiguration",
  endpointHostPrefix: "{AccountId}.",
})) as any;

export type GetStorageLensConfigurationTaggingError =
  | NoSuchConfiguration
  | CommonErrors;
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
  descriptor: {
    service: svc,
    http: "GET /v20180820/storagelens/{ConfigId}/tagging",
    input: {
      ConfigId: 0,
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
    },
    output: { Tags: D.list({}, { item: "Tag" }) },
    staticContext: { RequiresAccountId: { value: true } },
  },
  errors: [NoSuchConfiguration],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetStorageLensConfigurationTagging",
  endpointHostPrefix: "{AccountId}.",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v20180820/storagelensgroup/{Name}",
    input: {
      Name: 0,
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
    },
    output: {
      StorageLensGroup: D.m({
        payload: true,
        shape: {
          Filter: {
            MatchAnyPrefix: D.list(0, { item: "Prefix" }),
            MatchAnySuffix: D.list(0, { item: "Suffix" }),
            MatchAnyTag: D.list({}, { item: "Tag" }),
            MatchObjectAge: o_MatchObjectAge,
            MatchObjectSize: o_MatchObjectSize,
            And: {
              MatchAnyPrefix: D.list(0, { item: "Prefix" }),
              MatchAnySuffix: D.list(0, { item: "Suffix" }),
              MatchAnyTag: D.list({}, { item: "Tag" }),
              MatchObjectAge: o_MatchObjectAge,
              MatchObjectSize: o_MatchObjectSize,
            },
            Or: {
              MatchAnyPrefix: D.list(0, { item: "Prefix" }),
              MatchAnySuffix: D.list(0, { item: "Suffix" }),
              MatchAnyTag: D.list({}, { item: "Tag" }),
              MatchObjectAge: o_MatchObjectAge,
              MatchObjectSize: o_MatchObjectSize,
            },
          },
        },
      }),
    },
    staticContext: { RequiresAccountId: { value: true } },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetStorageLensGroup",
  endpointHostPrefix: "{AccountId}.",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v20180820/accessgrantsinstance/grants",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
      GranteeType: D.m({ query: "granteetype" }),
      GranteeIdentifier: D.m({ query: "granteeidentifier" }),
      Permission: D.m({ query: "permission" }),
      GrantScope: D.m({ query: "grantscope" }),
      ApplicationArn: D.m({ query: "application_arn" }),
    },
    output: {
      AccessGrantsList: D.list(
        { CreatedAt: D.ts, Grantee: {}, AccessGrantsLocationConfiguration: {} },
        { item: "AccessGrant" },
      ),
    },
    staticContext: { RequiresAccountId: { value: true } },
  },
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
  descriptor: {
    service: svc,
    http: "GET /v20180820/accessgrantsinstances",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
    output: {
      AccessGrantsInstancesList: D.list(
        { CreatedAt: D.ts },
        { item: "AccessGrantsInstance" },
      ),
    },
    staticContext: { RequiresAccountId: { value: true } },
  },
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
  descriptor: {
    service: svc,
    http: "GET /v20180820/accessgrantsinstance/locations",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
      LocationScope: D.m({ query: "locationscope" }),
    },
    output: {
      AccessGrantsLocationsList: D.list(
        { CreatedAt: D.ts },
        { item: "AccessGrantsLocation" },
      ),
    },
    staticContext: { RequiresAccountId: { value: true } },
  },
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
  descriptor: {
    service: svc,
    http: "GET /v20180820/accesspoint",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      Bucket: D.m({ query: "bucket", context: "Bucket" }),
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
      DataSourceId: D.m({ query: "dataSourceId" }),
      DataSourceType: D.m({ query: "dataSourceType" }),
    },
    output: { AccessPointList: D.list(o_AccessPoint, { item: "AccessPoint" }) },
    staticContext: { RequiresAccountId: { value: true } },
  },
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
  descriptor: {
    service: svc,
    http: "GET /v20180820/accesspointfordirectory",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      DirectoryBucket: D.m({ query: "directoryBucket" }),
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
    output: { AccessPointList: D.list(o_AccessPoint, { item: "AccessPoint" }) },
    staticContext: {
      RequiresAccountId: { value: true },
      UseS3ExpressControlEndpoint: { value: true },
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /v20180820/accesspointforobjectlambda",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
    output: {
      ObjectLambdaAccessPointList: D.list(
        { Alias: {} },
        { item: "ObjectLambdaAccessPoint" },
      ),
    },
    staticContext: { RequiresAccountId: { value: true } },
  },
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
  descriptor: {
    service: svc,
    http: "GET /v20180820/accessgrantsinstance/caller/grants",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      GrantScope: D.m({ query: "grantscope" }),
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
      AllowedByApplication: D.m({ query: "allowedByApplication" }),
    },
    output: { CallerAccessGrantsList: D.list({}, { item: "AccessGrant" }) },
    staticContext: { RequiresAccountId: { value: true } },
  },
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
  descriptor: {
    service: svc,
    http: "GET /v20180820/jobs",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      JobStatuses: D.m({ query: "jobStatuses" }),
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
    output: {
      Jobs: D.list({
        Priority: D.num,
        CreationTime: D.ts,
        TerminationDate: D.ts,
        ProgressSummary: o_JobProgressSummary,
      }),
    },
    staticContext: { RequiresAccountId: { value: true } },
  },
  errors: [
    InternalServiceException,
    InvalidNextTokenException,
    InvalidRequestException,
  ],
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
  descriptor: {
    service: svc,
    http: "GET /v20180820/mrap/instances",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
    },
    output: {
      AccessPoints: D.list(o_MultiRegionAccessPointReport, {
        item: "AccessPoint",
      }),
    },
    staticContext: { RequiresAccountId: { value: true } },
  },
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
  descriptor: {
    service: svc,
    http: "GET /v20180820/bucket",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      NextToken: D.m({ query: "nextToken" }),
      MaxResults: D.m({ query: "maxResults" }),
      OutpostId: D.m({ header: "x-amz-outpost-id", context: "OutpostId" }),
    },
    output: {
      RegionalBucketList: D.list(
        { PublicAccessBlockEnabled: D.bool, CreationDate: D.ts },
        { item: "RegionalBucket" },
      ),
    },
    staticContext: { RequiresAccountId: { value: true } },
  },
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
  descriptor: {
    service: svc,
    http: "GET /v20180820/storagelens",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      StorageLensConfigurationList: D.m({
        wire: "StorageLensConfiguration",
        shape: D.list(
          { IsEnabled: D.bool },
          { item: "StorageLensConfiguration", flat: true },
        ),
      }),
    },
    staticContext: { RequiresAccountId: { value: true } },
  },
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
  descriptor: {
    service: svc,
    http: "GET /v20180820/storagelensgroup",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    output: {
      StorageLensGroupList: D.m({
        wire: "StorageLensGroup",
        shape: D.list({}, { item: "StorageLensGroup", flat: true }),
      }),
    },
    staticContext: { RequiresAccountId: { value: true } },
  },
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
  descriptor: {
    service: svc,
    http: "GET /v20180820/tags/{ResourceArn+}",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      ResourceArn: D.m({ context: "ResourceArn" }),
    },
    output: { Tags: D.list({}, { item: "Tag" }) },
    staticContext: { RequiresAccountId: { value: true } },
  },
  errors: [NoSuchAccessPoint],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  endpointHostPrefix: "{AccountId}.",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /v20180820/accessgrantsinstance/resourcepolicy",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      Policy: 0,
      Organization: 0,
    },
    output: { CreatedAt: D.ts },
    staticContext: { RequiresAccountId: { value: true } },
    body: "PutAccessGrantsInstanceResourcePolicyRequest",
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAccessGrantsInstanceResourcePolicy",
  endpointHostPrefix: "{AccountId}.",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /v20180820/accesspointforobjectlambda/{Name}/configuration",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      Name: 0,
      Configuration: i_ObjectLambdaConfiguration,
    },
    staticContext: { RequiresAccountId: { value: true } },
    body: "PutAccessPointConfigurationForObjectLambdaRequest",
  },
  errors: [NoSuchAccessPoint, InvalidRequest],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAccessPointConfigurationForObjectLambda",
  endpointHostPrefix: "{AccountId}.",
})) as any;

export type PutAccessPointPolicyError =
  | NoSuchAccessPoint
  | MalformedPolicy
  | CommonErrors;
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
  descriptor: {
    service: svc,
    http: "PUT /v20180820/accesspoint/{Name}/policy",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      Name: D.m({ context: "AccessPointName" }),
      Policy: 0,
    },
    staticContext: { RequiresAccountId: { value: true } },
    body: "PutAccessPointPolicyRequest",
  },
  errors: [NoSuchAccessPoint, MalformedPolicy],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAccessPointPolicy",
  endpointHostPrefix: "{AccountId}.",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /v20180820/accesspointforobjectlambda/{Name}/policy",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      Name: 0,
      Policy: 0,
    },
    staticContext: { RequiresAccountId: { value: true } },
    body: "PutAccessPointPolicyForObjectLambdaRequest",
  },
  errors: [NoSuchAccessPoint, MalformedPolicy],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAccessPointPolicyForObjectLambda",
  endpointHostPrefix: "{AccountId}.",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /v20180820/accesspoint/{Name}/scope",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      Name: D.m({ context: "AccessPointName" }),
      Scope: i_Scope,
    },
    staticContext: {
      RequiresAccountId: { value: true },
      UseS3ExpressControlEndpoint: { value: true },
    },
    body: "PutAccessPointScopeRequest",
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAccessPointScope",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /v20180820/bucket/{Bucket}/lifecycleconfiguration",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      Bucket: D.m({ context: "Bucket" }),
      LifecycleConfiguration: D.m({
        payload: true,
        wire: "LifecycleConfiguration",
        shape: {
          Rules: D.list(
            {
              Expiration: { Date: 0, Days: 0, ExpiredObjectDeleteMarker: 0 },
              ID: 0,
              Filter: {
                Prefix: 0,
                Tag: i_S3Tag,
                And: {
                  Prefix: 0,
                  Tags: D.list(i_S3Tag),
                  ObjectSizeGreaterThan: 0,
                  ObjectSizeLessThan: 0,
                },
                ObjectSizeGreaterThan: 0,
                ObjectSizeLessThan: 0,
              },
              Status: 0,
              Transitions: D.list(
                { Date: 0, Days: 0, StorageClass: 0 },
                { item: "Transition" },
              ),
              NoncurrentVersionTransitions: D.list(
                { NoncurrentDays: 0, StorageClass: 0 },
                { item: "NoncurrentVersionTransition" },
              ),
              NoncurrentVersionExpiration: {
                NoncurrentDays: 0,
                NewerNoncurrentVersions: 0,
              },
              AbortIncompleteMultipartUpload: { DaysAfterInitiation: 0 },
            },
            { item: "Rule" },
          ),
        },
      }),
    },
    staticContext: { RequiresAccountId: { value: true } },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutBucketLifecycleConfiguration",
  endpointHostPrefix: "{AccountId}.",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /v20180820/bucket/{Bucket}/policy",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      Bucket: D.m({ context: "Bucket" }),
      ConfirmRemoveSelfBucketAccess: D.m({
        header: "x-amz-confirm-remove-self-bucket-access",
      }),
      Policy: 0,
    },
    staticContext: { RequiresAccountId: { value: true } },
    body: "PutBucketPolicyRequest",
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutBucketPolicy",
  endpointHostPrefix: "{AccountId}.",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /v20180820/bucket/{Bucket}/replication",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      Bucket: D.m({ context: "Bucket" }),
      ReplicationConfiguration: D.m({
        payload: true,
        wire: "ReplicationConfiguration",
        shape: {
          Role: 0,
          Rules: D.list(
            {
              ID: 0,
              Priority: 0,
              Prefix: 0,
              Filter: {
                Prefix: 0,
                Tag: i_S3Tag,
                And: { Prefix: 0, Tags: D.list(i_S3Tag) },
              },
              Status: 0,
              SourceSelectionCriteria: {
                SseKmsEncryptedObjects: { Status: 0 },
                ReplicaModifications: { Status: 0 },
              },
              ExistingObjectReplication: { Status: 0 },
              Destination: {
                Account: 0,
                Bucket: 0,
                ReplicationTime: { Status: 0, Time: i_ReplicationTimeValue },
                AccessControlTranslation: { Owner: 0 },
                EncryptionConfiguration: { ReplicaKmsKeyID: 0 },
                Metrics: { Status: 0, EventThreshold: i_ReplicationTimeValue },
                StorageClass: 0,
              },
              DeleteMarkerReplication: { Status: 0 },
              Bucket: 0,
            },
            { item: "Rule" },
          ),
        },
      }),
    },
    staticContext: { RequiresAccountId: { value: true } },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutBucketReplication",
  endpointHostPrefix: "{AccountId}.",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /v20180820/bucket/{Bucket}/tagging",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      Bucket: D.m({ context: "Bucket" }),
      Tagging: D.m({
        payload: true,
        wire: "Tagging",
        shape: { TagSet: D.list(i_S3Tag) },
      }),
    },
    staticContext: { RequiresAccountId: { value: true } },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutBucketTagging",
  endpointHostPrefix: "{AccountId}.",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /v20180820/bucket/{Bucket}/versioning",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      Bucket: D.m({ context: "Bucket" }),
      MFA: D.m({ header: "x-amz-mfa" }),
      VersioningConfiguration: D.m({
        payload: true,
        wire: "VersioningConfiguration",
        shape: { MFADelete: D.m({ wire: "MfaDelete" }), Status: 0 },
      }),
    },
    staticContext: { RequiresAccountId: { value: true } },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutBucketVersioning",
  endpointHostPrefix: "{AccountId}.",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /v20180820/jobs/{JobId}/tagging",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      JobId: 0,
      Tags: D.list(i_S3Tag),
    },
    staticContext: { RequiresAccountId: { value: true } },
    body: "PutJobTaggingRequest",
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v20180820/async-requests/mrap/put-policy",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      ClientToken: D.m({ idempotency: true }),
      Details: { Name: 0, Policy: 0 },
    },
    staticContext: { RequiresAccountId: { value: true } },
    body: "PutMultiRegionAccessPointPolicyRequest",
  },
  errors: [NoSuchMultiRegionAccessPoint, InvalidRequest],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutMultiRegionAccessPointPolicy",
  endpointHostPrefix: "{AccountId}.",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /v20180820/configuration/publicAccessBlock",
    input: {
      PublicAccessBlockConfiguration: D.m({
        payload: true,
        wire: "PublicAccessBlockConfiguration",
        shape: i_PublicAccessBlockConfiguration,
      }),
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
    },
    staticContext: { RequiresAccountId: { value: true } },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutPublicAccessBlock",
  endpointHostPrefix: "{AccountId}.",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /v20180820/storagelens/{ConfigId}",
    input: {
      ConfigId: 0,
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      StorageLensConfiguration: {
        Id: 0,
        AccountLevel: {
          ActivityMetrics: i_ActivityMetrics,
          BucketLevel: {
            ActivityMetrics: i_ActivityMetrics,
            PrefixLevel: {
              StorageMetrics: {
                IsEnabled: 0,
                SelectionCriteria: {
                  Delimiter: 0,
                  MaxDepth: 0,
                  MinStorageBytesPercentage: 0,
                },
              },
            },
            AdvancedCostOptimizationMetrics: i_AdvancedCostOptimizationMetrics,
            AdvancedDataProtectionMetrics: i_AdvancedDataProtectionMetrics,
            DetailedStatusCodesMetrics: i_DetailedStatusCodesMetrics,
            AdvancedPerformanceMetrics: i_AdvancedPerformanceMetrics,
          },
          AdvancedCostOptimizationMetrics: i_AdvancedCostOptimizationMetrics,
          AdvancedDataProtectionMetrics: i_AdvancedDataProtectionMetrics,
          DetailedStatusCodesMetrics: i_DetailedStatusCodesMetrics,
          AdvancedPerformanceMetrics: i_AdvancedPerformanceMetrics,
          StorageLensGroupLevel: {
            SelectionCriteria: {
              Include: D.list(0, { item: "Arn" }),
              Exclude: D.list(0, { item: "Arn" }),
            },
          },
        },
        Include: {
          Buckets: D.list(0, { item: "Arn" }),
          Regions: D.list(0, { item: "Region" }),
        },
        Exclude: {
          Buckets: D.list(0, { item: "Arn" }),
          Regions: D.list(0, { item: "Region" }),
        },
        DataExport: {
          S3BucketDestination: i_S3BucketDestination,
          CloudWatchMetrics: { IsEnabled: 0 },
          StorageLensTableDestination: i_StorageLensTableDestination,
        },
        ExpandedPrefixesDataExport: {
          S3BucketDestination: i_S3BucketDestination,
          StorageLensTableDestination: i_StorageLensTableDestination,
        },
        IsEnabled: 0,
        AwsOrg: { Arn: 0 },
        StorageLensArn: 0,
        PrefixDelimiter: 0,
      },
      Tags: D.list(i_StorageLensTag, { item: "Tag" }),
    },
    staticContext: { RequiresAccountId: { value: true } },
    body: "PutStorageLensConfigurationRequest",
  },
  errors: [InvalidRequest, MissingBucketLevelActivityMetrics],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutStorageLensConfiguration",
  endpointHostPrefix: "{AccountId}.",
})) as any;

export type PutStorageLensConfigurationTaggingError =
  | NoSuchConfiguration
  | CommonErrors;
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
  descriptor: {
    service: svc,
    http: "PUT /v20180820/storagelens/{ConfigId}/tagging",
    input: {
      ConfigId: 0,
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      Tags: D.list(i_StorageLensTag, { item: "Tag" }),
    },
    staticContext: { RequiresAccountId: { value: true } },
    body: "PutStorageLensConfigurationTaggingRequest",
  },
  errors: [NoSuchConfiguration],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutStorageLensConfigurationTagging",
  endpointHostPrefix: "{AccountId}.",
})) as any;

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
 * aren’t specified remain unchanged.
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
  descriptor: {
    service: svc,
    http: "PATCH /v20180820/mrap/instances/{Mrap+}/routes",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      Mrap: 0,
      RouteUpdates: D.list(
        { Bucket: 0, Region: 0, TrafficDialPercentage: 0 },
        { item: "Route" },
      ),
    },
    staticContext: { RequiresAccountId: { value: true } },
    body: "SubmitMultiRegionAccessPointRoutesRequest",
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SubmitMultiRegionAccessPointRoutes",
  endpointHostPrefix: "{AccountId}.",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v20180820/tags/{ResourceArn+}",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      ResourceArn: D.m({ context: "ResourceArn" }),
      Tags: D.list(i_Tag, { item: "Tag" }),
    },
    staticContext: { RequiresAccountId: { value: true } },
    body: "TagResourceRequest",
  },
  errors: [NoSuchAccessPoint],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
  endpointHostPrefix: "{AccountId}.",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /v20180820/tags/{ResourceArn+}",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      ResourceArn: D.m({ context: "ResourceArn" }),
      TagKeys: D.m({ query: "tagKeys" }),
    },
    staticContext: { RequiresAccountId: { value: true } },
  },
  errors: [NoSuchAccessPoint],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
  endpointHostPrefix: "{AccountId}.",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /v20180820/accessgrantsinstance/location/{AccessGrantsLocationId}",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      AccessGrantsLocationId: 0,
      IAMRoleArn: 0,
    },
    output: { CreatedAt: D.ts },
    staticContext: { RequiresAccountId: { value: true } },
    body: "UpdateAccessGrantsLocationRequest",
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAccessGrantsLocation",
  endpointHostPrefix: "{AccountId}.",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v20180820/jobs/{JobId}/priority",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      JobId: 0,
      Priority: D.m({ query: "priority" }),
    },
    output: { Priority: D.num },
    staticContext: { RequiresAccountId: { value: true } },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v20180820/jobs/{JobId}/status",
    input: {
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      JobId: 0,
      RequestedJobStatus: D.m({ query: "requestedJobStatus" }),
      StatusUpdateReason: D.m({ query: "statusUpdateReason" }),
    },
    staticContext: { RequiresAccountId: { value: true } },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /v20180820/storagelensgroup/{Name}",
    input: {
      Name: 0,
      AccountId: D.m({ header: "x-amz-account-id", context: "AccountId" }),
      StorageLensGroup: i_StorageLensGroup,
    },
    staticContext: { RequiresAccountId: { value: true } },
    body: "UpdateStorageLensGroupRequest",
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateStorageLensGroup",
  endpointHostPrefix: "{AccountId}.",
})) as any;

const i_ActivityMetrics: D.LazyStruct = () => ({ IsEnabled: 0 });
const i_AdvancedCostOptimizationMetrics: D.LazyStruct = () => ({
  IsEnabled: 0,
});
const i_AdvancedDataProtectionMetrics: D.LazyStruct = () => ({ IsEnabled: 0 });
const i_AdvancedPerformanceMetrics: D.LazyStruct = () => ({ IsEnabled: 0 });
const i_DetailedStatusCodesMetrics: D.LazyStruct = () => ({ IsEnabled: 0 });
const i_ObjectLambdaConfiguration: D.LazyStruct = () => ({
  SupportingAccessPoint: 0,
  CloudWatchMetricsEnabled: 0,
  AllowedFeatures: D.list(0, { item: "AllowedFeature" }),
  TransformationConfigurations: D.list(
    {
      Actions: D.list(0, { item: "Action" }),
      ContentTransformation: {
        AwsLambda: { FunctionArn: 0, FunctionPayload: 0 },
      },
    },
    { item: "TransformationConfiguration" },
  ),
});
const i_PublicAccessBlockConfiguration: D.LazyStruct = () => ({
  BlockPublicAcls: 0,
  IgnorePublicAcls: 0,
  BlockPublicPolicy: 0,
  RestrictPublicBuckets: 0,
});
const i_ReplicationTimeValue: D.LazyStruct = () => ({ Minutes: 0 });
const i_S3BucketDestination: D.LazyStruct = () => ({
  Format: 0,
  OutputSchemaVersion: 0,
  AccountId: 0,
  Arn: 0,
  Prefix: 0,
  Encryption: i_StorageLensDataExportEncryption,
});
const i_S3Grant: D.LazyStruct = () => ({
  Grantee: { TypeIdentifier: 0, Identifier: 0, DisplayName: 0 },
  Permission: 0,
});
const i_S3Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const i_Scope: D.LazyStruct = () => ({
  Prefixes: D.list(0, { item: "Prefix" }),
  Permissions: D.list(0, { item: "Permission" }),
});
const i_StorageLensGroup: D.LazyStruct = () => ({
  Name: 0,
  Filter: {
    MatchAnyPrefix: D.list(0, { item: "Prefix" }),
    MatchAnySuffix: D.list(0, { item: "Suffix" }),
    MatchAnyTag: D.list(i_S3Tag, { item: "Tag" }),
    MatchObjectAge: i_MatchObjectAge,
    MatchObjectSize: i_MatchObjectSize,
    And: {
      MatchAnyPrefix: D.list(0, { item: "Prefix" }),
      MatchAnySuffix: D.list(0, { item: "Suffix" }),
      MatchAnyTag: D.list(i_S3Tag, { item: "Tag" }),
      MatchObjectAge: i_MatchObjectAge,
      MatchObjectSize: i_MatchObjectSize,
    },
    Or: {
      MatchAnyPrefix: D.list(0, { item: "Prefix" }),
      MatchAnySuffix: D.list(0, { item: "Suffix" }),
      MatchAnyTag: D.list(i_S3Tag, { item: "Tag" }),
      MatchObjectAge: i_MatchObjectAge,
      MatchObjectSize: i_MatchObjectSize,
    },
  },
  StorageLensGroupArn: 0,
});
const i_StorageLensTableDestination: D.LazyStruct = () => ({
  IsEnabled: 0,
  Encryption: i_StorageLensDataExportEncryption,
});
const i_StorageLensTag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const o_AccessPoint: D.LazyStruct = () => ({ VpcConfiguration: {} });
const o_ActivityMetrics: D.LazyStruct = () => ({ IsEnabled: D.bool });
const o_AdvancedCostOptimizationMetrics: D.LazyStruct = () => ({
  IsEnabled: D.bool,
});
const o_AdvancedDataProtectionMetrics: D.LazyStruct = () => ({
  IsEnabled: D.bool,
});
const o_AdvancedPerformanceMetrics: D.LazyStruct = () => ({
  IsEnabled: D.bool,
});
const o_DetailedStatusCodesMetrics: D.LazyStruct = () => ({
  IsEnabled: D.bool,
});
const o_JobProgressSummary: D.LazyStruct = () => ({
  TotalNumberOfTasks: D.num,
  NumberOfTasksSucceeded: D.num,
  NumberOfTasksFailed: D.num,
  Timers: { ElapsedTimeInActiveSeconds: D.num },
});
const o_MatchObjectAge: D.LazyStruct = () => ({
  DaysGreaterThan: D.num,
  DaysLessThan: D.num,
});
const o_MatchObjectSize: D.LazyStruct = () => ({
  BytesGreaterThan: D.num,
  BytesLessThan: D.num,
});
const o_MultiRegionAccessPointReport: D.LazyStruct = () => ({
  CreatedAt: D.ts,
  PublicAccessBlock: o_PublicAccessBlockConfiguration,
  Regions: D.list({}, { item: "Region" }),
});
const o_PolicyStatus: D.LazyStruct = () => ({ IsPublic: D.bool });
const o_PublicAccessBlockConfiguration: D.LazyStruct = () => ({
  BlockPublicAcls: D.bool,
  IgnorePublicAcls: D.bool,
  BlockPublicPolicy: D.bool,
  RestrictPublicBuckets: D.bool,
});
const o_ReplicationTimeValue: D.LazyStruct = () => ({ Minutes: D.num });
const o_S3BucketDestination: D.LazyStruct = () => ({
  Encryption: o_StorageLensDataExportEncryption,
});
const o_S3Grant: D.LazyStruct = () => ({ Grantee: {} });
const o_StorageLensTableDestination: D.LazyStruct = () => ({
  IsEnabled: D.bool,
  Encryption: o_StorageLensDataExportEncryption,
});
const i_MatchObjectAge: D.LazyStruct = () => ({
  DaysGreaterThan: 0,
  DaysLessThan: 0,
});
const i_MatchObjectSize: D.LazyStruct = () => ({
  BytesGreaterThan: 0,
  BytesLessThan: 0,
});
const i_StorageLensDataExportEncryption: D.LazyStruct = () => ({
  SSES3: D.m({ wire: "SSE-S3", shape: {} }),
  SSEKMS: D.m({ wire: "SSE-KMS", shape: { KeyId: 0 } }),
});
const o_StorageLensDataExportEncryption: D.LazyStruct = () => ({
  SSES3: D.m({ wire: "SSE-S3", shape: {} }),
  SSEKMS: D.m({ wire: "SSE-KMS", shape: {} }),
});
