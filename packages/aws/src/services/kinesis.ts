import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as stream from "effect/Stream";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsJson1_1Protocol } from "../protocols/aws-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "Kinesis",
  target: "Kinesis_20131202",
  version: "2013-12-02",
  sigv4: "kinesis",
  protocol: awsJson1_1Protocol,
  xmlns: "http://kinesis.amazonaws.com/doc/2013-12-02",
  rules: (p, _) => {
    const {
      Region,
      UseDualStack = false,
      UseFIPS = false,
      Endpoint,
      OperationType,
      StreamId,
      StreamARN,
      ConsumerARN,
      ResourceARN,
      AccountId,
      AccountIdEndpointMode,
    } = p;
    const e = (u: unknown, p = {}, h = {}): T.EndpointResolverResult => ({
      type: "endpoint" as const,
      endpoint: { url: u as string, properties: p, headers: h },
    });
    const err = (m: unknown): T.EndpointResolverResult => ({
      type: "error" as const,
      message: m as string,
    });
    const _p0 = () => ({ metricValues: ["O"] });
    {
      const StreamIdDelimiterValue = _.substring(StreamId, 20, 21, false);
      const StreamIdDelimiterReversedValue = _.substring(StreamId, 3, 4, true);
      const StreamIdPrefixValue = _.substring(StreamId, 0, 20, false);
      const StreamIdSuffixValue = _.substring(StreamId, 21, 24, false);
      const PartitionResult = _.partition(Region);
      if (
        StreamId != null &&
        StreamIdDelimiterValue != null &&
        StreamIdDelimiterValue !== false &&
        StreamIdDelimiterValue === "-" &&
        StreamIdDelimiterReversedValue != null &&
        StreamIdDelimiterReversedValue !== false &&
        StreamIdDelimiterReversedValue === "-" &&
        StreamIdPrefixValue != null &&
        StreamIdPrefixValue !== false &&
        StreamIdSuffixValue != null &&
        StreamIdSuffixValue !== false &&
        Region != null &&
        PartitionResult != null &&
        PartitionResult !== false &&
        !(_.getAttr(PartitionResult, "name") === "aws-iso") &&
        !(_.getAttr(PartitionResult, "name") === "aws-iso-b")
      ) {
        if (OperationType != null) {
          {
            const HttpsCustomEndpointDelimiterValue = _.substring(
              Endpoint,
              15,
              16,
              false,
            );
            const HttpsEndpointDelimiterValue = _.substring(
              Endpoint,
              20,
              21,
              false,
            );
            const HttpsCustomEndpointSuffixValue = _.substring(
              Endpoint,
              15,
              20,
              false,
            );
            if (
              Endpoint != null &&
              HttpsCustomEndpointDelimiterValue != null &&
              HttpsCustomEndpointDelimiterValue !== false &&
              HttpsCustomEndpointDelimiterValue === "-" &&
              HttpsEndpointDelimiterValue != null &&
              HttpsEndpointDelimiterValue !== false &&
              HttpsEndpointDelimiterValue === "." &&
              HttpsCustomEndpointSuffixValue != null &&
              HttpsCustomEndpointSuffixValue !== false
            ) {
              if (UseFIPS === true && UseDualStack === true) {
                if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
                  if (
                    _.getAttr(PartitionResult, "supportsDualStack") === true
                  ) {
                    return e(
                      `https://${StreamIdPrefixValue}.${StreamIdSuffixValue}.${OperationType}-kinesis${HttpsCustomEndpointSuffixValue}-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                    );
                  }
                  return err(
                    "DualStack is enabled, but this partition does not support DualStack.",
                  );
                }
                return err(
                  "FIPS is enabled, but this partition does not support FIPS.",
                );
              }
              if (UseFIPS === true) {
                if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
                  return e(
                    `https://${StreamIdPrefixValue}.${StreamIdSuffixValue}.${OperationType}-kinesis${HttpsCustomEndpointSuffixValue}-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
                  );
                }
                return err(
                  "FIPS is enabled but this partition does not support FIPS",
                );
              }
              if (UseDualStack === true) {
                if (_.getAttr(PartitionResult, "supportsDualStack") === true) {
                  return e(
                    `https://${StreamIdPrefixValue}.${StreamIdSuffixValue}.${OperationType}-kinesis${HttpsCustomEndpointSuffixValue}.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                  );
                }
                return err(
                  "DualStack is enabled but this partition does not support DualStack",
                );
              }
              return e(
                `https://${StreamIdPrefixValue}.${StreamIdSuffixValue}.${OperationType}-kinesis${HttpsCustomEndpointSuffixValue}.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
          }
          {
            const PlainCustomEndpointDelimiterValue = _.substring(
              Endpoint,
              7,
              8,
              false,
            );
            const PlainEndpointDelimiterValue = _.substring(
              Endpoint,
              12,
              13,
              false,
            );
            const PlainCustomEndpointSuffixValue = _.substring(
              Endpoint,
              7,
              12,
              false,
            );
            if (
              Endpoint != null &&
              PlainCustomEndpointDelimiterValue != null &&
              PlainCustomEndpointDelimiterValue !== false &&
              PlainCustomEndpointDelimiterValue === "-" &&
              PlainEndpointDelimiterValue != null &&
              PlainEndpointDelimiterValue !== false &&
              PlainEndpointDelimiterValue === "." &&
              PlainCustomEndpointSuffixValue != null &&
              PlainCustomEndpointSuffixValue !== false
            ) {
              if (UseFIPS === true && UseDualStack === true) {
                if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
                  if (
                    _.getAttr(PartitionResult, "supportsDualStack") === true
                  ) {
                    return e(
                      `https://${StreamIdPrefixValue}.${StreamIdSuffixValue}.${OperationType}-kinesis${PlainCustomEndpointSuffixValue}-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                    );
                  }
                  return err(
                    "DualStack is enabled, but this partition does not support DualStack.",
                  );
                }
                return err(
                  "FIPS is enabled, but this partition does not support FIPS.",
                );
              }
              if (UseFIPS === true) {
                if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
                  return e(
                    `https://${StreamIdPrefixValue}.${StreamIdSuffixValue}.${OperationType}-kinesis${PlainCustomEndpointSuffixValue}-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
                  );
                }
                return err(
                  "FIPS is enabled but this partition does not support FIPS",
                );
              }
              if (UseDualStack === true) {
                if (_.getAttr(PartitionResult, "supportsDualStack") === true) {
                  return e(
                    `https://${StreamIdPrefixValue}.${StreamIdSuffixValue}.${OperationType}-kinesis${PlainCustomEndpointSuffixValue}.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                  );
                }
                return err(
                  "DualStack is enabled but this partition does not support DualStack",
                );
              }
              return e(
                `https://${StreamIdPrefixValue}.${StreamIdSuffixValue}.${OperationType}-kinesis${PlainCustomEndpointSuffixValue}.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
          }
          if (UseFIPS === true && UseDualStack === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              if (_.getAttr(PartitionResult, "supportsDualStack") === true) {
                return e(
                  `https://${StreamIdPrefixValue}.${StreamIdSuffixValue}.${OperationType}-kinesis-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                );
              }
              return err(
                "DualStack is enabled, but this partition does not support DualStack.",
              );
            }
            return err(
              "FIPS is enabled, but this partition does not support FIPS.",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://${StreamIdPrefixValue}.${StreamIdSuffixValue}.${OperationType}-kinesis-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (_.getAttr(PartitionResult, "supportsDualStack") === true) {
              return e(
                `https://${StreamIdPrefixValue}.${StreamIdSuffixValue}.${OperationType}-kinesis.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://${StreamIdPrefixValue}.${StreamIdSuffixValue}.${OperationType}-kinesis.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
        return err(
          "Operation Type is not set. Please contact service team for resolution.",
        );
      }
    }
    {
      const PartitionResult = _.partition(Region);
      if (
        StreamARN != null &&
        !(Endpoint != null) &&
        Region != null &&
        PartitionResult != null &&
        PartitionResult !== false &&
        !(_.getAttr(PartitionResult, "name") === "aws-iso") &&
        !(_.getAttr(PartitionResult, "name") === "aws-iso-b")
      ) {
        {
          const arn = _.parseArn(StreamARN);
          if (arn != null && arn !== false) {
            if (_.isValidHostLabel(_.getAttr(arn, "accountId"), false)) {
              if (_.isValidHostLabel(_.getAttr(arn, "region"), false)) {
                if (_.getAttr(arn, "service") === "kinesis") {
                  {
                    const arnType = _.getAttr(arn, "resourceId[0]");
                    if (
                      arnType != null &&
                      arnType !== false &&
                      !(arnType === "")
                    ) {
                      if (arnType === "stream") {
                        if (
                          _.getAttr(PartitionResult, "name") ===
                          `${_.getAttr(arn, "partition")}`
                        ) {
                          if (OperationType != null) {
                            if (UseFIPS === true && UseDualStack === true) {
                              if (
                                _.getAttr(PartitionResult, "supportsFIPS") ===
                                true
                              ) {
                                if (
                                  _.getAttr(
                                    PartitionResult,
                                    "supportsDualStack",
                                  ) === true
                                ) {
                                  return e(
                                    `https://${_.getAttr(arn, "accountId")}.${OperationType}-kinesis-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                                  );
                                }
                                return err(
                                  "DualStack is enabled, but this partition does not support DualStack.",
                                );
                              }
                              return err(
                                "FIPS is enabled, but this partition does not support FIPS.",
                              );
                            }
                            if (UseFIPS === true) {
                              if (
                                _.getAttr(PartitionResult, "supportsFIPS") ===
                                true
                              ) {
                                return e(
                                  `https://${_.getAttr(arn, "accountId")}.${OperationType}-kinesis-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
                                );
                              }
                              return err(
                                "FIPS is enabled but this partition does not support FIPS",
                              );
                            }
                            if (UseDualStack === true) {
                              if (
                                _.getAttr(
                                  PartitionResult,
                                  "supportsDualStack",
                                ) === true
                              ) {
                                return e(
                                  `https://${_.getAttr(arn, "accountId")}.${OperationType}-kinesis.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                                );
                              }
                              return err(
                                "DualStack is enabled but this partition does not support DualStack",
                              );
                            }
                            return e(
                              `https://${_.getAttr(arn, "accountId")}.${OperationType}-kinesis.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
                            );
                          }
                          return err(
                            "Operation Type is not set. Please contact service team for resolution.",
                          );
                        }
                        return err(
                          `Partition: ${_.getAttr(arn, "partition")} from ARN doesn't match with partition name: ${_.getAttr(PartitionResult, "name")}.`,
                        );
                      }
                      return err(
                        `Invalid ARN: Kinesis ARNs don't support \`${arnType}\` arn types.`,
                      );
                    }
                  }
                  return err("Invalid ARN: No ARN type specified");
                }
                return err(
                  `Invalid ARN: The ARN was not for the Kinesis service, found: ${_.getAttr(arn, "service")}.`,
                );
              }
              return err("Invalid ARN: Invalid region.");
            }
            return err("Invalid ARN: Invalid account id.");
          }
        }
        return err("Invalid ARN: Failed to parse ARN.");
      }
    }
    {
      const PartitionResult = _.partition(Region);
      if (
        ConsumerARN != null &&
        !(Endpoint != null) &&
        Region != null &&
        PartitionResult != null &&
        PartitionResult !== false &&
        !(_.getAttr(PartitionResult, "name") === "aws-iso") &&
        !(_.getAttr(PartitionResult, "name") === "aws-iso-b")
      ) {
        {
          const arn = _.parseArn(ConsumerARN);
          if (arn != null && arn !== false) {
            if (_.isValidHostLabel(_.getAttr(arn, "accountId"), false)) {
              if (_.isValidHostLabel(_.getAttr(arn, "region"), false)) {
                if (_.getAttr(arn, "service") === "kinesis") {
                  {
                    const arnType = _.getAttr(arn, "resourceId[0]");
                    if (
                      arnType != null &&
                      arnType !== false &&
                      !(arnType === "")
                    ) {
                      if (arnType === "stream") {
                        if (
                          _.getAttr(PartitionResult, "name") ===
                          `${_.getAttr(arn, "partition")}`
                        ) {
                          if (OperationType != null) {
                            if (UseFIPS === true && UseDualStack === true) {
                              if (
                                _.getAttr(PartitionResult, "supportsFIPS") ===
                                true
                              ) {
                                if (
                                  _.getAttr(
                                    PartitionResult,
                                    "supportsDualStack",
                                  ) === true
                                ) {
                                  return e(
                                    `https://${_.getAttr(arn, "accountId")}.${OperationType}-kinesis-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                                  );
                                }
                                return err(
                                  "DualStack is enabled, but this partition does not support DualStack.",
                                );
                              }
                              return err(
                                "FIPS is enabled, but this partition does not support FIPS.",
                              );
                            }
                            if (UseFIPS === true) {
                              if (
                                _.getAttr(PartitionResult, "supportsFIPS") ===
                                true
                              ) {
                                return e(
                                  `https://${_.getAttr(arn, "accountId")}.${OperationType}-kinesis-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
                                );
                              }
                              return err(
                                "FIPS is enabled but this partition does not support FIPS",
                              );
                            }
                            if (UseDualStack === true) {
                              if (
                                _.getAttr(
                                  PartitionResult,
                                  "supportsDualStack",
                                ) === true
                              ) {
                                return e(
                                  `https://${_.getAttr(arn, "accountId")}.${OperationType}-kinesis.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                                );
                              }
                              return err(
                                "DualStack is enabled but this partition does not support DualStack",
                              );
                            }
                            return e(
                              `https://${_.getAttr(arn, "accountId")}.${OperationType}-kinesis.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
                            );
                          }
                          return err(
                            "Operation Type is not set. Please contact service team for resolution.",
                          );
                        }
                        return err(
                          `Partition: ${_.getAttr(arn, "partition")} from ARN doesn't match with partition name: ${_.getAttr(PartitionResult, "name")}.`,
                        );
                      }
                      return err(
                        `Invalid ARN: Kinesis ARNs don't support \`${arnType}\` arn types.`,
                      );
                    }
                  }
                  return err("Invalid ARN: No ARN type specified");
                }
                return err(
                  `Invalid ARN: The ARN was not for the Kinesis service, found: ${_.getAttr(arn, "service")}.`,
                );
              }
              return err("Invalid ARN: Invalid region.");
            }
            return err("Invalid ARN: Invalid account id.");
          }
        }
        return err("Invalid ARN: Failed to parse ARN.");
      }
    }
    {
      const PartitionResult = _.partition(Region);
      if (
        ResourceARN != null &&
        !(Endpoint != null) &&
        Region != null &&
        PartitionResult != null &&
        PartitionResult !== false &&
        !(_.getAttr(PartitionResult, "name") === "aws-iso") &&
        !(_.getAttr(PartitionResult, "name") === "aws-iso-b")
      ) {
        {
          const arn = _.parseArn(ResourceARN);
          if (arn != null && arn !== false) {
            if (_.isValidHostLabel(_.getAttr(arn, "accountId"), false)) {
              if (_.isValidHostLabel(_.getAttr(arn, "region"), false)) {
                if (_.getAttr(arn, "service") === "kinesis") {
                  {
                    const arnType = _.getAttr(arn, "resourceId[0]");
                    if (
                      arnType != null &&
                      arnType !== false &&
                      !(arnType === "")
                    ) {
                      if (arnType === "stream") {
                        if (
                          _.getAttr(PartitionResult, "name") ===
                          `${_.getAttr(arn, "partition")}`
                        ) {
                          if (OperationType != null) {
                            if (UseFIPS === true && UseDualStack === true) {
                              if (
                                _.getAttr(PartitionResult, "supportsFIPS") ===
                                true
                              ) {
                                if (
                                  _.getAttr(
                                    PartitionResult,
                                    "supportsDualStack",
                                  ) === true
                                ) {
                                  return e(
                                    `https://${_.getAttr(arn, "accountId")}.${OperationType}-kinesis-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                                  );
                                }
                                return err(
                                  "DualStack is enabled, but this partition does not support DualStack.",
                                );
                              }
                              return err(
                                "FIPS is enabled, but this partition does not support FIPS.",
                              );
                            }
                            if (UseFIPS === true) {
                              if (
                                _.getAttr(PartitionResult, "supportsFIPS") ===
                                true
                              ) {
                                return e(
                                  `https://${_.getAttr(arn, "accountId")}.${OperationType}-kinesis-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
                                );
                              }
                              return err(
                                "FIPS is enabled but this partition does not support FIPS",
                              );
                            }
                            if (UseDualStack === true) {
                              if (
                                _.getAttr(
                                  PartitionResult,
                                  "supportsDualStack",
                                ) === true
                              ) {
                                return e(
                                  `https://${_.getAttr(arn, "accountId")}.${OperationType}-kinesis.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                                );
                              }
                              return err(
                                "DualStack is enabled but this partition does not support DualStack",
                              );
                            }
                            return e(
                              `https://${_.getAttr(arn, "accountId")}.${OperationType}-kinesis.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
                            );
                          }
                          return err(
                            "Operation Type is not set. Please contact service team for resolution.",
                          );
                        }
                        return err(
                          `Partition: ${_.getAttr(arn, "partition")} from ARN doesn't match with partition name: ${_.getAttr(PartitionResult, "name")}.`,
                        );
                      }
                      return err(
                        `Invalid ARN: Kinesis ARNs don't support \`${arnType}\` arn types.`,
                      );
                    }
                  }
                  return err("Invalid ARN: No ARN type specified");
                }
                return err(
                  `Invalid ARN: The ARN was not for the Kinesis service, found: ${_.getAttr(arn, "service")}.`,
                );
              }
              return err("Invalid ARN: Invalid region.");
            }
            return err("Invalid ARN: Invalid account id.");
          }
        }
        return err("Invalid ARN: Failed to parse ARN.");
      }
    }
    {
      const PartitionResult = _.partition(Region);
      if (
        !(Endpoint != null) &&
        AccountIdEndpointMode != null &&
        !(AccountIdEndpointMode === "disabled") &&
        AccountId != null &&
        Region != null &&
        PartitionResult != null &&
        PartitionResult !== false &&
        !(_.getAttr(PartitionResult, "name") === "aws-iso") &&
        !(_.getAttr(PartitionResult, "name") === "aws-iso-b")
      ) {
        if (_.isValidHostLabel(AccountId, false)) {
          if (OperationType != null) {
            if (UseFIPS === true && UseDualStack === true) {
              if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
                if (_.getAttr(PartitionResult, "supportsDualStack") === true) {
                  return e(
                    `https://${AccountId}.${OperationType}-kinesis-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                    _p0(),
                    {},
                  );
                }
                return err(
                  "DualStack is enabled, but this partition does not support DualStack.",
                );
              }
              return err(
                "FIPS is enabled, but this partition does not support FIPS.",
              );
            }
            if (UseFIPS === true) {
              if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
                return e(
                  `https://${AccountId}.${OperationType}-kinesis-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
                  _p0(),
                  {},
                );
              }
              return err(
                "FIPS is enabled but this partition does not support FIPS",
              );
            }
            if (UseDualStack === true) {
              if (_.getAttr(PartitionResult, "supportsDualStack") === true) {
                return e(
                  `https://${AccountId}.${OperationType}-kinesis.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                  _p0(),
                  {},
                );
              }
              return err(
                "DualStack is enabled but this partition does not support DualStack",
              );
            }
            return e(
              `https://${AccountId}.${OperationType}-kinesis.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              _p0(),
              {},
            );
          }
          return err(
            "Operation Type is not set. Please contact service team for resolution.",
          );
        }
        return err("Invalid account id.");
      }
    }
    {
      const PartitionResult = _.partition(Region);
      if (
        !(Endpoint != null) &&
        AccountIdEndpointMode != null &&
        AccountIdEndpointMode === "required" &&
        Region != null &&
        PartitionResult != null &&
        PartitionResult !== false
      ) {
        if (
          !(_.getAttr(PartitionResult, "name") === "aws-iso") &&
          !(_.getAttr(PartitionResult, "name") === "aws-iso-b")
        ) {
          return err(
            "AccountIdEndpointMode is required but no AccountID was provided or able to be loaded",
          );
        }
        return err(
          "Invalid Configuration: AccountIdEndpointMode is required but account endpoints are not supported in this partition",
        );
      }
    }
    if (Endpoint != null) {
      if (UseFIPS === true) {
        return err(
          "Invalid Configuration: FIPS and custom endpoint are not supported",
        );
      }
      if (UseDualStack === true) {
        return err(
          "Invalid Configuration: Dualstack and custom endpoint are not supported",
        );
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
                `https://kinesis-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
                return e(`https://kinesis.${Region}.amazonaws.com`);
              }
              return e(
                `https://kinesis-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://kinesis.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://kinesis.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError("AccessDeniedException", ["AuthError"])<{
    readonly message?: string;
  }> {}
export class ExpiredIteratorException
  extends /*@__PURE__*/ TE.TaggedError("ExpiredIteratorException", [
    "BadRequestError",
  ])<{ readonly message?: string }> {}
export class ExpiredNextTokenException
  extends /*@__PURE__*/ TE.TaggedError("ExpiredNextTokenException", [
    "BadRequestError",
  ])<{ readonly message?: string }> {}
export class InternalFailureException
  extends /*@__PURE__*/ TE.TaggedError("InternalFailureException", [
    "ServerError",
    "RetryableError",
  ])<{ readonly message?: string }> {}
export class InvalidArgumentException
  extends /*@__PURE__*/ TE.TaggedError("InvalidArgumentException", [
    "BadRequestError",
  ])<{ readonly message?: string }> {}
export class KMSAccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError("KMSAccessDeniedException", [
    "AuthError",
  ])<{ readonly message?: string }> {}
export class KMSDisabledException
  extends /*@__PURE__*/ TE.TaggedError("KMSDisabledException", [
    "BadRequestError",
  ])<{ readonly message?: string }> {}
export class KMSInvalidStateException
  extends /*@__PURE__*/ TE.TaggedError("KMSInvalidStateException", [
    "BadRequestError",
  ])<{ readonly message?: string }> {}
export class KMSNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("KMSNotFoundException", [
    "BadRequestError",
  ])<{ readonly message?: string }> {}
export class KMSOptInRequired
  extends /*@__PURE__*/ TE.TaggedError("KMSOptInRequired", [
    "BadRequestError",
  ])<{ readonly message?: string }> {}
export class KMSThrottlingException
  extends /*@__PURE__*/ TE.TaggedError("KMSThrottlingException", [
    "ThrottlingError",
    "RetryableError",
  ])<{ readonly message?: string }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError("LimitExceededException", [
    "QuotaError",
    "RetryableError",
  ])<{ readonly message?: string }> {}
export class ProvisionedThroughputExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ProvisionedThroughputExceededException",
    ["ThrottlingError", "RetryableError"],
  )<{ readonly message?: string }> {}
export class ResourceInUseException
  extends /*@__PURE__*/ TE.TaggedError("ResourceInUseException", [
    "ConflictError",
    "RetryableError",
  ])<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("ResourceNotFoundException", [
    "NotFoundError",
  ])<{ readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError("ValidationException", [
    "BadRequestError",
  ])<{ readonly message?: string }> {}
export type StreamName = string;
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export type StreamARN = string;
export type StreamId = string;
export interface AddTagsToStreamInput {
  StreamName?: string;
  Tags: { [key: string]: string | undefined };
  StreamARN?: string;
  StreamId?: string;
}
export interface AddTagsToStreamResponse {}
export type PositiveIntegerObject = number;
export type StreamMode = "PROVISIONED" | "ON_DEMAND" | (string & {});
export interface StreamModeDetails {
  StreamMode: StreamMode;
}
export type NaturalIntegerObject = number;
export type MaxRecordSizeInKiB = number;
export interface CreateStreamInput {
  StreamName: string;
  ShardCount?: number;
  StreamModeDetails?: StreamModeDetails;
  Tags?: { [key: string]: string | undefined };
  WarmThroughputMiBps?: number;
  MaxRecordSizeInKiB?: number;
}
export interface CreateStreamResponse {}
export type RetentionPeriodHours = number;
export interface DecreaseStreamRetentionPeriodInput {
  StreamName?: string;
  RetentionPeriodHours: number;
  StreamARN?: string;
  StreamId?: string;
}
export interface DecreaseStreamRetentionPeriodResponse {}
export type ResourceARN = string;
export interface DeleteResourcePolicyInput {
  ResourceARN: string;
  StreamId?: string;
}
export interface DeleteResourcePolicyResponse {}
export interface DeleteStreamInput {
  StreamName?: string;
  EnforceConsumerDeletion?: boolean;
  StreamARN?: string;
  StreamId?: string;
}
export interface DeleteStreamResponse {}
export type ConsumerName = string;
export type ConsumerARN = string;
export interface DeregisterStreamConsumerInput {
  StreamARN?: string;
  ConsumerName?: string;
  ConsumerARN?: string;
  StreamId?: string;
}
export interface DeregisterStreamConsumerResponse {}
export interface DescribeAccountSettingsInput {}
export type MinimumThroughputBillingCommitmentOutputStatus =
  | "ENABLED"
  | "DISABLED"
  | "ENABLED_UNTIL_EARLIEST_ALLOWED_END"
  | (string & {});
export interface MinimumThroughputBillingCommitmentOutput {
  Status: MinimumThroughputBillingCommitmentOutputStatus;
  StartedAt?: Date;
  EndedAt?: Date;
  EarliestAllowedEndAt?: Date;
}
export interface DescribeAccountSettingsOutput {
  MinimumThroughputBillingCommitment?: MinimumThroughputBillingCommitmentOutput;
}
export interface DescribeLimitsInput {}
export type ShardCountObject = number;
export type OnDemandStreamCountObject = number;
export type OnDemandStreamCountLimitObject = number;
export interface DescribeLimitsOutput {
  ShardLimit: number;
  OpenShardCount: number;
  OnDemandStreamCount: number;
  OnDemandStreamCountLimit: number;
}
export type DescribeStreamInputLimit = number;
export type ShardId = string;
export interface DescribeStreamInput {
  StreamName?: string;
  Limit?: number;
  ExclusiveStartShardId?: string;
  StreamARN?: string;
  StreamId?: string;
}
export type StreamStatus =
  | "CREATING"
  | "DELETING"
  | "ACTIVE"
  | "UPDATING"
  | (string & {});
export type HashKey = string;
export interface HashKeyRange {
  StartingHashKey: string;
  EndingHashKey: string;
}
export type SequenceNumber = string;
export interface SequenceNumberRange {
  StartingSequenceNumber: string;
  EndingSequenceNumber?: string;
}
export interface Shard {
  ShardId: string;
  ParentShardId?: string;
  AdjacentParentShardId?: string;
  HashKeyRange: HashKeyRange;
  SequenceNumberRange: SequenceNumberRange;
}
export type ShardList = Shard[];
export type MetricsName =
  | "IncomingBytes"
  | "IncomingRecords"
  | "OutgoingBytes"
  | "OutgoingRecords"
  | "WriteProvisionedThroughputExceeded"
  | "ReadProvisionedThroughputExceeded"
  | "IteratorAgeMilliseconds"
  | "ALL"
  | (string & {});
export type MetricsNameList = MetricsName[];
export interface EnhancedMetrics {
  ShardLevelMetrics?: MetricsName[];
}
export type EnhancedMonitoringList = EnhancedMetrics[];
export type EncryptionType = "NONE" | "KMS" | (string & {});
export type KeyId = string;
export interface StreamDescription {
  StreamName: string;
  StreamARN: string;
  StreamStatus: StreamStatus;
  StreamModeDetails?: StreamModeDetails;
  Shards: Shard[];
  HasMoreShards: boolean;
  RetentionPeriodHours: number;
  StreamCreationTimestamp: Date;
  EnhancedMonitoring: EnhancedMetrics[];
  EncryptionType?: EncryptionType;
  KeyId?: string;
}
export interface DescribeStreamOutput {
  StreamDescription: StreamDescription;
}
export interface DescribeStreamConsumerInput {
  StreamARN?: string;
  ConsumerName?: string;
  ConsumerARN?: string;
  StreamId?: string;
}
export type ConsumerStatus = "CREATING" | "DELETING" | "ACTIVE" | (string & {});
export interface ConsumerDescription {
  ConsumerName: string;
  ConsumerARN: string;
  ConsumerStatus: ConsumerStatus;
  ConsumerCreationTimestamp: Date;
  StreamARN: string;
}
export interface DescribeStreamConsumerOutput {
  ConsumerDescription: ConsumerDescription;
}
export interface DescribeStreamSummaryInput {
  StreamName?: string;
  StreamARN?: string;
  StreamId?: string;
}
export type ConsumerCountObject = number;
export interface WarmThroughputObject {
  TargetMiBps?: number;
  CurrentMiBps?: number;
}
export interface StreamDescriptionSummary {
  StreamName: string;
  StreamARN: string;
  StreamId?: string;
  StreamStatus: StreamStatus;
  StreamModeDetails?: StreamModeDetails;
  RetentionPeriodHours: number;
  StreamCreationTimestamp: Date;
  EnhancedMonitoring: EnhancedMetrics[];
  EncryptionType?: EncryptionType;
  KeyId?: string;
  OpenShardCount?: number;
  ConsumerCount?: number;
  WarmThroughput?: WarmThroughputObject;
  MaxRecordSizeInKiB?: number;
}
export interface DescribeStreamSummaryOutput {
  StreamDescriptionSummary: StreamDescriptionSummary;
}
export interface DisableEnhancedMonitoringInput {
  StreamName?: string;
  ShardLevelMetrics: MetricsName[];
  StreamARN?: string;
  StreamId?: string;
}
export interface EnhancedMonitoringOutput {
  StreamName?: string;
  CurrentShardLevelMetrics?: MetricsName[];
  DesiredShardLevelMetrics?: MetricsName[];
  StreamARN?: string;
}
export interface EnableEnhancedMonitoringInput {
  StreamName?: string;
  ShardLevelMetrics: MetricsName[];
  StreamARN?: string;
  StreamId?: string;
}
export type ShardIterator = string;
export type GetRecordsInputLimit = number;
export interface GetRecordsInput {
  ShardIterator: string;
  Limit?: number;
  StreamARN?: string;
  StreamId?: string;
}
export type Data = Uint8Array;
export type PartitionKey = string;
export interface Record {
  SequenceNumber: string;
  ApproximateArrivalTimestamp?: Date;
  Data: Uint8Array;
  PartitionKey: string;
  EncryptionType?: EncryptionType;
}
export type RecordList = Record[];
export type MillisBehindLatest = number;
export type ShardIdList = string[];
export interface ChildShard {
  ShardId: string;
  ParentShards: string[];
  HashKeyRange: HashKeyRange;
}
export type ChildShardList = ChildShard[];
export interface GetRecordsOutput {
  Records: Record[];
  NextShardIterator?: string;
  MillisBehindLatest?: number;
  ChildShards?: ChildShard[];
}
export interface GetResourcePolicyInput {
  ResourceARN: string;
  StreamId?: string;
}
export type Policy = string;
export interface GetResourcePolicyOutput {
  Policy: string;
}
export type ShardIteratorType =
  | "AT_SEQUENCE_NUMBER"
  | "AFTER_SEQUENCE_NUMBER"
  | "TRIM_HORIZON"
  | "LATEST"
  | "AT_TIMESTAMP"
  | (string & {});
export interface GetShardIteratorInput {
  StreamName?: string;
  ShardId: string;
  ShardIteratorType: ShardIteratorType;
  StartingSequenceNumber?: string;
  Timestamp?: Date;
  StreamARN?: string;
  StreamId?: string;
}
export interface GetShardIteratorOutput {
  ShardIterator?: string;
}
export interface IncreaseStreamRetentionPeriodInput {
  StreamName?: string;
  RetentionPeriodHours: number;
  StreamARN?: string;
  StreamId?: string;
}
export interface IncreaseStreamRetentionPeriodResponse {}
export type NextToken = string;
export type ListShardsInputLimit = number;
export type ShardFilterType =
  | "AFTER_SHARD_ID"
  | "AT_TRIM_HORIZON"
  | "FROM_TRIM_HORIZON"
  | "AT_LATEST"
  | "AT_TIMESTAMP"
  | "FROM_TIMESTAMP"
  | (string & {});
export interface ShardFilter {
  Type: ShardFilterType;
  ShardId?: string;
  Timestamp?: Date;
}
export interface ListShardsInput {
  StreamName?: string;
  NextToken?: string;
  ExclusiveStartShardId?: string;
  MaxResults?: number;
  StreamCreationTimestamp?: Date;
  ShardFilter?: ShardFilter;
  StreamARN?: string;
  StreamId?: string;
}
export interface ListShardsOutput {
  Shards?: Shard[];
  NextToken?: string;
}
export type ListStreamConsumersInputLimit = number;
export interface ListStreamConsumersInput {
  StreamARN: string;
  NextToken?: string;
  MaxResults?: number;
  StreamCreationTimestamp?: Date;
  StreamId?: string;
}
export interface Consumer {
  ConsumerName: string;
  ConsumerARN: string;
  ConsumerStatus: ConsumerStatus;
  ConsumerCreationTimestamp: Date;
}
export type ConsumerList = Consumer[];
export interface ListStreamConsumersOutput {
  Consumers?: Consumer[];
  NextToken?: string;
}
export type ListStreamsInputLimit = number;
export interface ListStreamsInput {
  Limit?: number;
  ExclusiveStartStreamName?: string;
  NextToken?: string;
}
export type StreamNameList = string[];
export interface StreamSummary {
  StreamName: string;
  StreamARN: string;
  StreamStatus: StreamStatus;
  StreamModeDetails?: StreamModeDetails;
  StreamCreationTimestamp?: Date;
}
export type StreamSummaryList = StreamSummary[];
export interface ListStreamsOutput {
  StreamNames: string[];
  HasMoreStreams: boolean;
  NextToken?: string;
  StreamSummaries?: StreamSummary[];
}
export interface ListTagsForResourceInput {
  ResourceARN: string;
  StreamId?: string;
}
export interface Tag {
  Key: string;
  Value?: string;
}
export type TagList = Tag[];
export interface ListTagsForResourceOutput {
  Tags?: Tag[];
}
export type ListTagsForStreamInputLimit = number;
export interface ListTagsForStreamInput {
  StreamName?: string;
  ExclusiveStartTagKey?: string;
  Limit?: number;
  StreamARN?: string;
  StreamId?: string;
}
export interface ListTagsForStreamOutput {
  Tags: Tag[];
  HasMoreTags: boolean;
}
export interface MergeShardsInput {
  StreamName?: string;
  ShardToMerge: string;
  AdjacentShardToMerge: string;
  StreamARN?: string;
  StreamId?: string;
}
export interface MergeShardsResponse {}
export interface PutRecordInput {
  StreamName?: string;
  Data: Uint8Array;
  PartitionKey: string;
  ExplicitHashKey?: string;
  SequenceNumberForOrdering?: string;
  StreamARN?: string;
  StreamId?: string;
}
export interface PutRecordOutput {
  ShardId: string;
  SequenceNumber: string;
  EncryptionType?: EncryptionType;
}
export interface PutRecordsRequestEntry {
  Data: Uint8Array;
  ExplicitHashKey?: string;
  PartitionKey: string;
}
export type PutRecordsRequestEntryList = PutRecordsRequestEntry[];
export interface PutRecordsInput {
  Records: PutRecordsRequestEntry[];
  StreamName?: string;
  StreamARN?: string;
  StreamId?: string;
}
export type ErrorCode = string;
export type ErrorMessage = string;
export interface PutRecordsResultEntry {
  SequenceNumber?: string;
  ShardId?: string;
  ErrorCode?: string;
  ErrorMessage?: string;
}
export type PutRecordsResultEntryList = PutRecordsResultEntry[];
export interface PutRecordsOutput {
  FailedRecordCount?: number;
  Records: PutRecordsResultEntry[];
  EncryptionType?: EncryptionType;
}
export interface PutResourcePolicyInput {
  ResourceARN: string;
  StreamId?: string;
  Policy: string;
}
export interface PutResourcePolicyResponse {}
export interface RegisterStreamConsumerInput {
  StreamARN: string;
  ConsumerName: string;
  StreamId?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface RegisterStreamConsumerOutput {
  Consumer: Consumer;
}
export type TagKeyList = string[];
export interface RemoveTagsFromStreamInput {
  StreamName?: string;
  TagKeys: string[];
  StreamARN?: string;
  StreamId?: string;
}
export interface RemoveTagsFromStreamResponse {}
export interface SplitShardInput {
  StreamName?: string;
  ShardToSplit: string;
  NewStartingHashKey: string;
  StreamARN?: string;
  StreamId?: string;
}
export interface SplitShardResponse {}
export interface StartStreamEncryptionInput {
  StreamName?: string;
  EncryptionType: EncryptionType;
  KeyId: string;
  StreamARN?: string;
  StreamId?: string;
}
export interface StartStreamEncryptionResponse {}
export interface StopStreamEncryptionInput {
  StreamName?: string;
  EncryptionType: EncryptionType;
  KeyId: string;
  StreamARN?: string;
  StreamId?: string;
}
export interface StopStreamEncryptionResponse {}
export interface StartingPosition {
  Type: ShardIteratorType;
  SequenceNumber?: string;
  Timestamp?: Date;
}
export interface SubscribeToShardInput {
  ConsumerARN: string;
  StreamId?: string;
  ShardId: string;
  StartingPosition: StartingPosition;
}
export interface SubscribeToShardEvent {
  Records: Record[];
  ContinuationSequenceNumber: string;
  MillisBehindLatest: number;
  ChildShards?: ChildShard[];
}
export type SubscribeToShardEventStream =
  | {
      SubscribeToShardEvent: SubscribeToShardEvent;
      ResourceNotFoundException?: never;
      ResourceInUseException?: never;
      KMSDisabledException?: never;
      KMSInvalidStateException?: never;
      KMSAccessDeniedException?: never;
      KMSNotFoundException?: never;
      KMSOptInRequired?: never;
      KMSThrottlingException?: never;
      InternalFailureException?: never;
    }
  | {
      SubscribeToShardEvent?: never;
      ResourceNotFoundException: ResourceNotFoundException;
      ResourceInUseException?: never;
      KMSDisabledException?: never;
      KMSInvalidStateException?: never;
      KMSAccessDeniedException?: never;
      KMSNotFoundException?: never;
      KMSOptInRequired?: never;
      KMSThrottlingException?: never;
      InternalFailureException?: never;
    }
  | {
      SubscribeToShardEvent?: never;
      ResourceNotFoundException?: never;
      ResourceInUseException: ResourceInUseException;
      KMSDisabledException?: never;
      KMSInvalidStateException?: never;
      KMSAccessDeniedException?: never;
      KMSNotFoundException?: never;
      KMSOptInRequired?: never;
      KMSThrottlingException?: never;
      InternalFailureException?: never;
    }
  | {
      SubscribeToShardEvent?: never;
      ResourceNotFoundException?: never;
      ResourceInUseException?: never;
      KMSDisabledException: KMSDisabledException;
      KMSInvalidStateException?: never;
      KMSAccessDeniedException?: never;
      KMSNotFoundException?: never;
      KMSOptInRequired?: never;
      KMSThrottlingException?: never;
      InternalFailureException?: never;
    }
  | {
      SubscribeToShardEvent?: never;
      ResourceNotFoundException?: never;
      ResourceInUseException?: never;
      KMSDisabledException?: never;
      KMSInvalidStateException: KMSInvalidStateException;
      KMSAccessDeniedException?: never;
      KMSNotFoundException?: never;
      KMSOptInRequired?: never;
      KMSThrottlingException?: never;
      InternalFailureException?: never;
    }
  | {
      SubscribeToShardEvent?: never;
      ResourceNotFoundException?: never;
      ResourceInUseException?: never;
      KMSDisabledException?: never;
      KMSInvalidStateException?: never;
      KMSAccessDeniedException: KMSAccessDeniedException;
      KMSNotFoundException?: never;
      KMSOptInRequired?: never;
      KMSThrottlingException?: never;
      InternalFailureException?: never;
    }
  | {
      SubscribeToShardEvent?: never;
      ResourceNotFoundException?: never;
      ResourceInUseException?: never;
      KMSDisabledException?: never;
      KMSInvalidStateException?: never;
      KMSAccessDeniedException?: never;
      KMSNotFoundException: KMSNotFoundException;
      KMSOptInRequired?: never;
      KMSThrottlingException?: never;
      InternalFailureException?: never;
    }
  | {
      SubscribeToShardEvent?: never;
      ResourceNotFoundException?: never;
      ResourceInUseException?: never;
      KMSDisabledException?: never;
      KMSInvalidStateException?: never;
      KMSAccessDeniedException?: never;
      KMSNotFoundException?: never;
      KMSOptInRequired: KMSOptInRequired;
      KMSThrottlingException?: never;
      InternalFailureException?: never;
    }
  | {
      SubscribeToShardEvent?: never;
      ResourceNotFoundException?: never;
      ResourceInUseException?: never;
      KMSDisabledException?: never;
      KMSInvalidStateException?: never;
      KMSAccessDeniedException?: never;
      KMSNotFoundException?: never;
      KMSOptInRequired?: never;
      KMSThrottlingException: KMSThrottlingException;
      InternalFailureException?: never;
    }
  | {
      SubscribeToShardEvent?: never;
      ResourceNotFoundException?: never;
      ResourceInUseException?: never;
      KMSDisabledException?: never;
      KMSInvalidStateException?: never;
      KMSAccessDeniedException?: never;
      KMSNotFoundException?: never;
      KMSOptInRequired?: never;
      KMSThrottlingException?: never;
      InternalFailureException: InternalFailureException;
    };
export interface SubscribeToShardOutput {
  EventStream: stream.Stream<SubscribeToShardEventStream, Error, never>;
}
export interface TagResourceInput {
  Tags: { [key: string]: string | undefined };
  ResourceARN: string;
  StreamId?: string;
}
export interface TagResourceResponse {}
export interface UntagResourceInput {
  TagKeys: string[];
  ResourceARN: string;
  StreamId?: string;
}
export interface UntagResourceResponse {}
export type MinimumThroughputBillingCommitmentInputStatus =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export interface MinimumThroughputBillingCommitmentInput {
  Status: MinimumThroughputBillingCommitmentInputStatus;
}
export interface UpdateAccountSettingsInput {
  MinimumThroughputBillingCommitment: MinimumThroughputBillingCommitmentInput;
}
export interface UpdateAccountSettingsOutput {
  MinimumThroughputBillingCommitment?: MinimumThroughputBillingCommitmentOutput;
}
export interface UpdateMaxRecordSizeInput {
  StreamARN?: string;
  StreamId?: string;
  MaxRecordSizeInKiB: number;
}
export interface UpdateMaxRecordSizeResponse {}
export type ScalingType = "UNIFORM_SCALING" | (string & {});
export interface UpdateShardCountInput {
  StreamName?: string;
  TargetShardCount: number;
  ScalingType: ScalingType;
  StreamARN?: string;
  StreamId?: string;
}
export interface UpdateShardCountOutput {
  StreamName?: string;
  CurrentShardCount?: number;
  TargetShardCount?: number;
  StreamARN?: string;
}
export interface UpdateStreamModeInput {
  StreamARN: string;
  StreamId?: string;
  StreamModeDetails: StreamModeDetails;
  WarmThroughputMiBps?: number;
}
export interface UpdateStreamModeResponse {}
export interface UpdateStreamWarmThroughputInput {
  StreamARN?: string;
  StreamName?: string;
  StreamId?: string;
  WarmThroughputMiBps: number;
}
export interface UpdateStreamWarmThroughputOutput {
  StreamARN?: string;
  StreamName?: string;
  WarmThroughput?: WarmThroughputObject;
}
export type AddTagsToStreamError =
  | AccessDeniedException
  | InvalidArgumentException
  | LimitExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Adds or updates tags for the specified Kinesis data stream. You can assign up to 50
 * tags to a data stream.
 *
 * When invoking this API, you must use either the `StreamARN` or the
 * `StreamName` parameter, or both. It is recommended that you use the
 * `StreamARN` input parameter when you invoke this API.
 *
 * If tags have already been assigned to the stream, `AddTagsToStream`
 * overwrites any existing tags that correspond to the specified tag keys.
 *
 * AddTagsToStream has a limit of five transactions per second per
 * account.
 */
export const addTagsToStream: API.OperationMethod<
  AddTagsToStreamInput,
  AddTagsToStreamResponse,
  AddTagsToStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      StreamName: 0,
      Tags: 0,
      StreamARN: D.m({ context: "StreamARN" }),
      StreamId: D.m({ context: "StreamId" }),
    },
    staticContext: { OperationType: { value: "control" } },
  },
  errors: [
    AccessDeniedException,
    InvalidArgumentException,
    LimitExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddTagsToStream",
})) as any;

export type CreateStreamError =
  | InvalidArgumentException
  | LimitExceededException
  | ResourceInUseException
  | ValidationException
  | CommonErrors;
/**
 * Creates a Kinesis data stream. A stream captures and transports data records that are
 * continuously emitted from different data sources or *producers*.
 * Scale-out within a stream is explicitly supported by means of shards, which are uniquely
 * identified groups of data records in a stream.
 *
 * You can create your data stream using either on-demand or provisioned capacity mode. Data streams with an on-demand mode require no capacity planning and automatically scale to handle gigabytes of write and read throughput per minute. With the on-demand mode, Kinesis Data Streams automatically manages the shards in order to provide the necessary throughput.
 *
 * If you'd still like to proactively scale your on-demand data stream’s capacity, you can unlock the warm throughput feature for on-demand data streams by enabling `MinimumThroughputBillingCommitment` for your account. Once your account has `MinimumThroughputBillingCommitment` enabled, you can specify the warm throughput in MiB per second that your stream can support in writes.
 *
 * For the data streams with a provisioned mode, you must specify the number of shards for the data stream. Each shard can support reads up to five transactions per second, up to a maximum data read total of 2 MiB per second. Each shard can support writes up to 1,000 records per second, up to a maximum data write total of 1 MiB per second. If the amount of data input increases or decreases, you can add or remove shards.
 *
 * The stream name identifies the stream. The name is scoped to the Amazon Web Services
 * account used by the application. It is also scoped by Amazon Web Services Region. That
 * is, two streams in two different accounts can have the same name, and two streams in the
 * same account, but in two different Regions, can have the same name.
 *
 * `CreateStream` is an asynchronous operation. Upon receiving a
 * `CreateStream` request, Kinesis Data Streams immediately returns and sets
 * the stream status to `CREATING`. After the stream is created, Kinesis Data
 * Streams sets the stream status to `ACTIVE`. You should perform read and write
 * operations only on an `ACTIVE` stream.
 *
 * You receive a `LimitExceededException` when making a
 * `CreateStream` request when you try to do one of the following:
 *
 * - Have more than five streams in the `CREATING` state at any point in
 * time.
 *
 * - Create more shards than are authorized for your account.
 *
 * For the default shard or on-demand throughput limits for an Amazon Web Services account, see Amazon Kinesis Data Streams Limits in the *Amazon Kinesis Data Streams Developer Guide*. To increase this limit, contact Amazon Web Services Support.
 *
 * You can use DescribeStreamSummary to check the stream status, which
 * is returned in `StreamStatus`.
 *
 * CreateStream has a limit of five transactions per second per
 * account.
 *
 * You can add tags to the stream when making a `CreateStream` request by setting the `Tags` parameter. If you pass the `Tags` parameter, in addition to having the `kinesis:CreateStream` permission, you must also have the `kinesis:AddTagsToStream` permission for the stream that will be created. The `kinesis:TagResource` permission won’t work to tag streams on creation. Tags will take effect from the `CREATING` status of the stream, but you can't make any updates to the tags until the stream is in `ACTIVE` state.
 */
export const createStream: API.OperationMethod<
  CreateStreamInput,
  CreateStreamResponse,
  CreateStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      StreamName: 0,
      ShardCount: 0,
      StreamModeDetails: i_StreamModeDetails,
      Tags: 0,
      WarmThroughputMiBps: 0,
      MaxRecordSizeInKiB: 0,
    },
    staticContext: { OperationType: { value: "control" } },
  },
  errors: [
    InvalidArgumentException,
    LimitExceededException,
    ResourceInUseException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateStream",
})) as any;

export type DecreaseStreamRetentionPeriodError =
  | AccessDeniedException
  | InvalidArgumentException
  | LimitExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Decreases the Kinesis data stream's retention period, which is the length of time data
 * records are accessible after they are added to the stream. The minimum value of a
 * stream's retention period is 24 hours.
 *
 * When invoking this API, you must use either the `StreamARN` or the
 * `StreamName` parameter, or both. It is recommended that you use the
 * `StreamARN` input parameter when you invoke this API.
 *
 * This operation may result in lost data. For example, if the stream's retention period
 * is 48 hours and is decreased to 24 hours, any data already in the stream that is older
 * than 24 hours is inaccessible.
 */
export const decreaseStreamRetentionPeriod: API.OperationMethod<
  DecreaseStreamRetentionPeriodInput,
  DecreaseStreamRetentionPeriodResponse,
  DecreaseStreamRetentionPeriodError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      StreamName: 0,
      RetentionPeriodHours: 0,
      StreamARN: D.m({ context: "StreamARN" }),
      StreamId: D.m({ context: "StreamId" }),
    },
    staticContext: { OperationType: { value: "control" } },
  },
  errors: [
    AccessDeniedException,
    InvalidArgumentException,
    LimitExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DecreaseStreamRetentionPeriod",
})) as any;

export type DeleteResourcePolicyError =
  | AccessDeniedException
  | InvalidArgumentException
  | LimitExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Delete a policy for the specified data stream or consumer. Request patterns can be one of the following:
 *
 * - Data stream pattern: `arn:aws.*:kinesis:.*:\d{12}:.*stream/\S+`
 *
 * - Consumer pattern: `^(arn):aws.*:kinesis:.*:\d{12}:.*stream\/[a-zA-Z0-9_.-]+\/consumer\/[a-zA-Z0-9_.-]+:[0-9]+`
 */
export const deleteResourcePolicy: API.OperationMethod<
  DeleteResourcePolicyInput,
  DeleteResourcePolicyResponse,
  DeleteResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ResourceARN: D.m({ context: "ResourceARN" }),
      StreamId: D.m({ context: "StreamId" }),
    },
    staticContext: { OperationType: { value: "control" } },
  },
  errors: [
    AccessDeniedException,
    InvalidArgumentException,
    LimitExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourcePolicy",
})) as any;

export type DeleteStreamError =
  | AccessDeniedException
  | InvalidArgumentException
  | LimitExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes a Kinesis data stream and all its shards and data. You must shut down any
 * applications that are operating on the stream before you delete the stream. If an
 * application attempts to operate on a deleted stream, it receives the exception
 * `ResourceNotFoundException`.
 *
 * When invoking this API, you must use either the `StreamARN` or the
 * `StreamName` parameter, or both. It is recommended that you use the
 * `StreamARN` input parameter when you invoke this API.
 *
 * If the stream is in the `ACTIVE` state, you can delete it. After a
 * `DeleteStream` request, the specified stream is in the
 * `DELETING` state until Kinesis Data Streams completes the
 * deletion.
 *
 * **Note:** Kinesis Data Streams might continue to accept
 * data read and write operations, such as PutRecord, PutRecords, and GetRecords, on a stream in the
 * `DELETING` state until the stream deletion is complete.
 *
 * When you delete a stream, any shards in that stream are also deleted, and any tags are
 * dissociated from the stream.
 *
 * You can use the DescribeStreamSummary operation to check the state
 * of the stream, which is returned in `StreamStatus`.
 *
 * DeleteStream has a limit of five transactions per second per
 * account.
 */
export const deleteStream: API.OperationMethod<
  DeleteStreamInput,
  DeleteStreamResponse,
  DeleteStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      StreamName: 0,
      EnforceConsumerDeletion: 0,
      StreamARN: D.m({ context: "StreamARN" }),
      StreamId: D.m({ context: "StreamId" }),
    },
    staticContext: { OperationType: { value: "control" } },
  },
  errors: [
    AccessDeniedException,
    InvalidArgumentException,
    LimitExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteStream",
})) as any;

export type DeregisterStreamConsumerError =
  | InvalidArgumentException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * To deregister a consumer, provide its ARN. Alternatively, you can provide the ARN of
 * the data stream and the name you gave the consumer when you registered it. You may also
 * provide all three parameters, as long as they don't conflict with each other. If you
 * don't know the name or ARN of the consumer that you want to deregister, you can use the
 * ListStreamConsumers operation to get a list of the descriptions of
 * all the consumers that are currently registered with a given data stream. The
 * description of a consumer contains its name and ARN.
 *
 * This operation has a limit of five transactions per second per stream.
 */
export const deregisterStreamConsumer: API.OperationMethod<
  DeregisterStreamConsumerInput,
  DeregisterStreamConsumerResponse,
  DeregisterStreamConsumerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      StreamARN: D.m({ context: "StreamARN" }),
      ConsumerName: 0,
      ConsumerARN: D.m({ context: "ConsumerARN" }),
      StreamId: D.m({ context: "StreamId" }),
    },
    staticContext: { OperationType: { value: "control" } },
  },
  errors: [
    InvalidArgumentException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterStreamConsumer",
})) as any;

export type DescribeAccountSettingsError =
  | LimitExceededException
  | CommonErrors;
/**
 * Describes the account-level settings for Amazon Kinesis Data Streams. This operation returns information about the minimum throughput billing commitments and other account-level configurations.
 *
 * This API has a call limit of 5 transactions per second (TPS) for each Amazon Web Services account. TPS over 5 will initiate the `LimitExceededException`.
 */
export const describeAccountSettings: API.OperationMethod<
  DescribeAccountSettingsInput,
  DescribeAccountSettingsOutput,
  DescribeAccountSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {},
    output: {
      MinimumThroughputBillingCommitment:
        o_MinimumThroughputBillingCommitmentOutput,
    },
    staticContext: { OperationType: { value: "control" } },
  },
  errors: [LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAccountSettings",
})) as any;

export type DescribeLimitsError = LimitExceededException | CommonErrors;
/**
 * Describes the shard limits and usage for the account.
 *
 * If you update your account limits, the old limits might be returned for a few
 * minutes.
 *
 * This operation has a limit of one transaction per second per account.
 */
export const describeLimits: API.OperationMethod<
  DescribeLimitsInput,
  DescribeLimitsOutput,
  DescribeLimitsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {},
    staticContext: { OperationType: { value: "control" } },
  },
  errors: [LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLimits",
})) as any;

export type DescribeStreamError =
  | AccessDeniedException
  | InvalidArgumentException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Describes the specified Kinesis data stream.
 *
 * This API has been revised. It's highly recommended that you use the DescribeStreamSummary API to get a summarized description of the
 * specified Kinesis data stream and the ListShards API to list the
 * shards in a specified data stream and obtain information about each shard.
 *
 * When invoking this API, you must use either the `StreamARN` or the
 * `StreamName` parameter, or both. It is recommended that you use the
 * `StreamARN` input parameter when you invoke this API.
 *
 * The information returned includes the stream name, Amazon Resource Name (ARN),
 * creation time, enhanced metric configuration, and shard map. The shard map is an array
 * of shard objects. For each shard object, there is the hash key and sequence number
 * ranges that the shard spans, and the IDs of any earlier shards that played in a role in
 * creating the shard. Every record ingested in the stream is identified by a sequence
 * number, which is assigned when the record is put into the stream.
 *
 * You can limit the number of shards returned by each call. For more information, see
 * Retrieving
 * Shards from a Stream in the Amazon Kinesis Data Streams Developer
 * Guide.
 *
 * There are no guarantees about the chronological order shards returned. To process
 * shards in chronological order, use the ID of the parent shard to track the lineage to
 * the oldest shard.
 *
 * This operation has a limit of 10 transactions per second per account.
 */
export const describeStream: API.OperationMethod<
  DescribeStreamInput,
  DescribeStreamOutput,
  DescribeStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      StreamName: 0,
      Limit: 0,
      ExclusiveStartShardId: 0,
      StreamARN: D.m({ context: "StreamARN" }),
      StreamId: D.m({ context: "StreamId" }),
    },
    output: { StreamDescription: { StreamCreationTimestamp: D.ts } },
    staticContext: { OperationType: { value: "control" } },
  },
  errors: [
    AccessDeniedException,
    InvalidArgumentException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeStream",
})) as any;

export type DescribeStreamConsumerError =
  | InvalidArgumentException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * To get the description of a registered consumer, provide the ARN of the consumer.
 * Alternatively, you can provide the ARN of the data stream and the name you gave the
 * consumer when you registered it. You may also provide all three parameters, as long as
 * they don't conflict with each other. If you don't know the name or ARN of the consumer
 * that you want to describe, you can use the ListStreamConsumers
 * operation to get a list of the descriptions of all the consumers that are currently
 * registered with a given data stream.
 *
 * This operation has a limit of 20 transactions per second per stream.
 *
 * When making a cross-account call with `DescribeStreamConsumer`, make sure to provide the ARN of the consumer.
 */
export const describeStreamConsumer: API.OperationMethod<
  DescribeStreamConsumerInput,
  DescribeStreamConsumerOutput,
  DescribeStreamConsumerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      StreamARN: D.m({ context: "StreamARN" }),
      ConsumerName: 0,
      ConsumerARN: D.m({ context: "ConsumerARN" }),
      StreamId: D.m({ context: "StreamId" }),
    },
    output: { ConsumerDescription: { ConsumerCreationTimestamp: D.ts } },
    staticContext: { OperationType: { value: "control" } },
  },
  errors: [
    InvalidArgumentException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeStreamConsumer",
})) as any;

export type DescribeStreamSummaryError =
  | AccessDeniedException
  | InvalidArgumentException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Provides a summarized description of the specified Kinesis data stream without the
 * shard list.
 *
 * When invoking this API, you must use either the `StreamARN` or the
 * `StreamName` parameter, or both. It is recommended that you use the
 * `StreamARN` input parameter when you invoke this API.
 *
 * The information returned includes the stream name, Amazon Resource Name (ARN), status,
 * record retention period, approximate creation time, monitoring, encryption details, and
 * open shard count.
 *
 * DescribeStreamSummary has a limit of 20 transactions per second per
 * account.
 */
export const describeStreamSummary: API.OperationMethod<
  DescribeStreamSummaryInput,
  DescribeStreamSummaryOutput,
  DescribeStreamSummaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      StreamName: 0,
      StreamARN: D.m({ context: "StreamARN" }),
      StreamId: D.m({ context: "StreamId" }),
    },
    output: { StreamDescriptionSummary: { StreamCreationTimestamp: D.ts } },
    staticContext: { OperationType: { value: "control" } },
  },
  errors: [
    AccessDeniedException,
    InvalidArgumentException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeStreamSummary",
})) as any;

export type DisableEnhancedMonitoringError =
  | AccessDeniedException
  | InvalidArgumentException
  | LimitExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Disables enhanced monitoring.
 *
 * When invoking this API, you must use either the `StreamARN` or the
 * `StreamName` parameter, or both. It is recommended that you use the
 * `StreamARN` input parameter when you invoke this API.
 */
export const disableEnhancedMonitoring: API.OperationMethod<
  DisableEnhancedMonitoringInput,
  EnhancedMonitoringOutput,
  DisableEnhancedMonitoringError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      StreamName: 0,
      ShardLevelMetrics: 0,
      StreamARN: D.m({ context: "StreamARN" }),
      StreamId: D.m({ context: "StreamId" }),
    },
    staticContext: { OperationType: { value: "control" } },
  },
  errors: [
    AccessDeniedException,
    InvalidArgumentException,
    LimitExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableEnhancedMonitoring",
})) as any;

export type EnableEnhancedMonitoringError =
  | AccessDeniedException
  | InvalidArgumentException
  | LimitExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Enables enhanced Kinesis data stream monitoring for shard-level metrics.
 *
 * When invoking this API, you must use either the `StreamARN` or the
 * `StreamName` parameter, or both. It is recommended that you use the
 * `StreamARN` input parameter when you invoke this API.
 */
export const enableEnhancedMonitoring: API.OperationMethod<
  EnableEnhancedMonitoringInput,
  EnhancedMonitoringOutput,
  EnableEnhancedMonitoringError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      StreamName: 0,
      ShardLevelMetrics: 0,
      StreamARN: D.m({ context: "StreamARN" }),
      StreamId: D.m({ context: "StreamId" }),
    },
    staticContext: { OperationType: { value: "control" } },
  },
  errors: [
    AccessDeniedException,
    InvalidArgumentException,
    LimitExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableEnhancedMonitoring",
})) as any;

export type GetRecordsError =
  | AccessDeniedException
  | ExpiredIteratorException
  | InternalFailureException
  | InvalidArgumentException
  | KMSAccessDeniedException
  | KMSDisabledException
  | KMSInvalidStateException
  | KMSNotFoundException
  | KMSOptInRequired
  | KMSThrottlingException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets data records from a Kinesis data stream's shard.
 *
 * When invoking this API, you must use either the `StreamARN` or the
 * `StreamName` parameter, or both. It is recommended that you use the
 * `StreamARN` input parameter when you invoke this API.
 *
 * Specify a shard iterator using the `ShardIterator` parameter. The shard
 * iterator specifies the position in the shard from which you want to start reading data
 * records sequentially. If there are no records available in the portion of the shard that
 * the iterator points to, GetRecords returns an empty list. It might
 * take multiple calls to get to a portion of the shard that contains records.
 *
 * You can scale by provisioning multiple shards per stream while considering service
 * limits (for more information, see Amazon Kinesis Data Streams
 * Limits in the Amazon Kinesis Data Streams Developer
 * Guide). Your application should have one thread per shard, each reading
 * continuously from its stream. To read from a stream continually, call GetRecords in a loop. Use GetShardIterator to get the
 * shard iterator to specify in the first GetRecords call. GetRecords returns a new shard iterator in
 * `NextShardIterator`. Specify the shard iterator returned in
 * `NextShardIterator` in subsequent calls to GetRecords.
 * If the shard has been closed, the shard iterator can't return more data and GetRecords returns `null` in `NextShardIterator`.
 * You can terminate the loop when the shard is closed, or when the shard iterator reaches
 * the record with the sequence number or other attribute that marks it as the last record
 * to process.
 *
 * Each data record can be up to 1 MiB in size by default. Amazon Kinesis Data Streams supports
 * large records up to 10 MiB in size, but the average throughput for your stream cannot exceed
 * 1 MiB per second. For more information about how large records are handled, see
 * Large records.
 * Each shard can read up to 2 MiB per second. You can ensure that your calls don't exceed
 * the maximum supported size or throughput by using the `Limit` parameter to
 * specify the maximum number of records that GetRecords can return.
 * Consider your average record size when determining this limit. The maximum number of records
 * that can be returned per call is 10,000.
 *
 * The size of the data returned by GetRecords varies depending on the
 * utilization of the shard. It is recommended that consumer applications retrieve records
 * via the `GetRecords` command using the 5 TPS limit to remain caught up.
 * Retrieving records less frequently can lead to consumer applications falling behind. The
 * maximum size of data that GetRecords can return is 10 MiB. If a call
 * returns this amount of data, subsequent calls made within the next 5 seconds throw
 * `ProvisionedThroughputExceededException`. If there is insufficient
 * provisioned throughput on the stream, subsequent calls made within the next 1 second
 * throw `ProvisionedThroughputExceededException`. GetRecords
 * doesn't return any data when it throws an exception. For this reason, we recommend that
 * you wait 1 second between calls to GetRecords. However, it's possible
 * that the application will get exceptions for longer than 1 second.
 *
 * To detect whether the application is falling behind in processing, you can use the
 * `MillisBehindLatest` response attribute. You can also monitor the stream
 * using CloudWatch metrics and other mechanisms (see Monitoring in the Amazon
 * Kinesis Data Streams Developer Guide).
 *
 * Each Amazon Kinesis record includes a value, `ApproximateArrivalTimestamp`,
 * that is set when a stream successfully receives and stores a record. This is commonly
 * referred to as a server-side time stamp, whereas a client-side time stamp is set when a
 * data producer creates or sends the record to a stream (a data producer is any data
 * source putting data records into a stream, for example with PutRecords). The time stamp has millisecond precision. There are no guarantees about the time
 * stamp accuracy, or that the time stamp is always increasing. For example, records in a
 * shard or across a stream might have time stamps that are out of order.
 *
 * This operation has a limit of five transactions per second per shard.
 */
export const getRecords: API.OperationMethod<
  GetRecordsInput,
  GetRecordsOutput,
  GetRecordsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ShardIterator: 0,
      Limit: 0,
      StreamARN: D.m({ context: "StreamARN" }),
      StreamId: D.m({ context: "StreamId" }),
    },
    output: { Records: D.list(o_Record) },
    staticContext: { OperationType: { value: "data" } },
  },
  errors: [
    AccessDeniedException,
    ExpiredIteratorException,
    InternalFailureException,
    InvalidArgumentException,
    KMSAccessDeniedException,
    KMSDisabledException,
    KMSInvalidStateException,
    KMSNotFoundException,
    KMSOptInRequired,
    KMSThrottlingException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRecords",
})) as any;

export type GetResourcePolicyError =
  | AccessDeniedException
  | InvalidArgumentException
  | LimitExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns a policy attached to the specified data stream or consumer. Request patterns can be one of the following:
 *
 * - Data stream pattern: `arn:aws.*:kinesis:.*:\d{12}:.*stream/\S+`
 *
 * - Consumer pattern: `^(arn):aws.*:kinesis:.*:\d{12}:.*stream\/[a-zA-Z0-9_.-]+\/consumer\/[a-zA-Z0-9_.-]+:[0-9]+`
 */
export const getResourcePolicy: API.OperationMethod<
  GetResourcePolicyInput,
  GetResourcePolicyOutput,
  GetResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ResourceARN: D.m({ context: "ResourceARN" }),
      StreamId: D.m({ context: "StreamId" }),
    },
    staticContext: { OperationType: { value: "control" } },
  },
  errors: [
    AccessDeniedException,
    InvalidArgumentException,
    LimitExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcePolicy",
})) as any;

export type GetShardIteratorError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidArgumentException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets an Amazon Kinesis shard iterator. A shard iterator expires 5 minutes after it is
 * returned to the requester.
 *
 * When invoking this API, you must use either the `StreamARN` or the
 * `StreamName` parameter, or both. It is recommended that you use the
 * `StreamARN` input parameter when you invoke this API.
 *
 * A shard iterator specifies the shard position from which to start reading data records
 * sequentially. The position is specified using the sequence number of a data record in a
 * shard. A sequence number is the identifier associated with every record ingested in the
 * stream, and is assigned when a record is put into the stream. Each stream has one or
 * more shards.
 *
 * You must specify the shard iterator type. For example, you can set the
 * `ShardIteratorType` parameter to read exactly from the position denoted
 * by a specific sequence number by using the `AT_SEQUENCE_NUMBER` shard
 * iterator type. Alternatively, the parameter can read right after the sequence number by
 * using the `AFTER_SEQUENCE_NUMBER` shard iterator type, using sequence numbers
 * returned by earlier calls to PutRecord, PutRecords,
 * GetRecords, or DescribeStream. In the request,
 * you can specify the shard iterator type `AT_TIMESTAMP` to read records from
 * an arbitrary point in time, `TRIM_HORIZON` to cause
 * `ShardIterator` to point to the last untrimmed record in the shard in the
 * system (the oldest data record in the shard), or `LATEST` so that you always
 * read the most recent data in the shard.
 *
 * When you read repeatedly from a stream, use a GetShardIterator
 * request to get the first shard iterator for use in your first GetRecords request and for subsequent reads use the shard iterator returned by the GetRecords request in `NextShardIterator`. A new shard
 * iterator is returned by every GetRecords request in
 * `NextShardIterator`, which you use in the `ShardIterator`
 * parameter of the next GetRecords request.
 *
 * If a GetShardIterator request is made too often, you receive a
 * `ProvisionedThroughputExceededException`. For more information about
 * throughput limits, see GetRecords, and Streams Limits in the
 * *Amazon Kinesis Data Streams Developer Guide*.
 *
 * If the shard is closed, GetShardIterator returns a valid iterator
 * for the last sequence number of the shard. A shard can be closed as a result of using
 * SplitShard or MergeShards.
 *
 * GetShardIterator has a limit of five transactions per second per
 * account per open shard.
 */
export const getShardIterator: API.OperationMethod<
  GetShardIteratorInput,
  GetShardIteratorOutput,
  GetShardIteratorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      StreamName: 0,
      ShardId: 0,
      ShardIteratorType: 0,
      StartingSequenceNumber: 0,
      Timestamp: 0,
      StreamARN: D.m({ context: "StreamARN" }),
      StreamId: D.m({ context: "StreamId" }),
    },
    staticContext: { OperationType: { value: "data" } },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidArgumentException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetShardIterator",
})) as any;

export type IncreaseStreamRetentionPeriodError =
  | AccessDeniedException
  | InvalidArgumentException
  | LimitExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Increases the Kinesis data stream's retention period, which is the length of time data
 * records are accessible after they are added to the stream. The maximum value of a
 * stream's retention period is 8760 hours (365 days).
 *
 * When invoking this API, you must use either the `StreamARN` or the
 * `StreamName` parameter, or both. It is recommended that you use the
 * `StreamARN` input parameter when you invoke this API.
 *
 * If you choose a longer stream retention period, this operation increases the time
 * period during which records that have not yet expired are accessible. However, it does
 * not make previous, expired data (older than the stream's previous retention period)
 * accessible after the operation has been called. For example, if a stream's retention
 * period is set to 24 hours and is increased to 168 hours, any data that is older than 24
 * hours remains inaccessible to consumer applications.
 */
export const increaseStreamRetentionPeriod: API.OperationMethod<
  IncreaseStreamRetentionPeriodInput,
  IncreaseStreamRetentionPeriodResponse,
  IncreaseStreamRetentionPeriodError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      StreamName: 0,
      RetentionPeriodHours: 0,
      StreamARN: D.m({ context: "StreamARN" }),
      StreamId: D.m({ context: "StreamId" }),
    },
    staticContext: { OperationType: { value: "control" } },
  },
  errors: [
    AccessDeniedException,
    InvalidArgumentException,
    LimitExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "IncreaseStreamRetentionPeriod",
})) as any;

export type ListShardsError =
  | AccessDeniedException
  | ExpiredNextTokenException
  | InvalidArgumentException
  | LimitExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists the shards in a stream and provides information about each shard. This operation
 * has a limit of 1000 transactions per second per data stream.
 *
 * When invoking this API, you must use either the `StreamARN` or the
 * `StreamName` parameter, or both. It is recommended that you use the
 * `StreamARN` input parameter when you invoke this API.
 *
 * This action does not list expired shards. For information about expired shards, see
 * Data Routing, Data Persistence, and Shard State after a Reshard.
 *
 * This API is a new operation that is used by the Amazon Kinesis Client Library
 * (KCL). If you have a fine-grained IAM policy that only allows specific operations,
 * you must update your policy to allow calls to this API. For more information, see
 * Controlling Access to Amazon Kinesis Data Streams Resources Using
 * IAM.
 */
export const listShards: API.OperationMethod<
  ListShardsInput,
  ListShardsOutput,
  ListShardsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      StreamName: 0,
      NextToken: 0,
      ExclusiveStartShardId: 0,
      MaxResults: 0,
      StreamCreationTimestamp: 0,
      ShardFilter: { Type: 0, ShardId: 0, Timestamp: 0 },
      StreamARN: D.m({ context: "StreamARN" }),
      StreamId: D.m({ context: "StreamId" }),
    },
    staticContext: { OperationType: { value: "control" } },
  },
  errors: [
    AccessDeniedException,
    ExpiredNextTokenException,
    InvalidArgumentException,
    LimitExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListShards",
})) as any;

export type ListStreamConsumersError =
  | ExpiredNextTokenException
  | InvalidArgumentException
  | LimitExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists the consumers registered to receive data from a stream using enhanced fan-out,
 * and provides information about each consumer.
 *
 * This operation has a limit of 5 transactions per second per stream.
 */
export const listStreamConsumers: API.PaginatedOperationMethod<
  ListStreamConsumersInput,
  ListStreamConsumersOutput,
  ListStreamConsumersError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      StreamARN: D.m({ context: "StreamARN" }),
      NextToken: 0,
      MaxResults: 0,
      StreamCreationTimestamp: 0,
      StreamId: D.m({ context: "StreamId" }),
    },
    output: { Consumers: D.list(o_Consumer) },
    staticContext: { OperationType: { value: "control" } },
  },
  errors: [
    ExpiredNextTokenException,
    InvalidArgumentException,
    LimitExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStreamConsumers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListStreamsError =
  | ExpiredNextTokenException
  | InvalidArgumentException
  | LimitExceededException
  | CommonErrors;
/**
 * Lists your Kinesis data streams.
 *
 * The number of streams may be too large to return from a single call to
 * `ListStreams`. You can limit the number of returned streams using the
 * `Limit` parameter. If you do not specify a value for the
 * `Limit` parameter, Kinesis Data Streams uses the default limit, which is
 * currently 100.
 *
 * You can detect if there are more streams available to list by using the
 * `HasMoreStreams` flag from the returned output. If there are more streams
 * available, you can request more streams by using the name of the last stream returned by
 * the `ListStreams` request in the `ExclusiveStartStreamName`
 * parameter in a subsequent request to `ListStreams`. The group of stream names
 * returned by the subsequent request is then added to the list. You can continue this
 * process until all the stream names have been collected in the list.
 *
 * ListStreams has a limit of five transactions per second per
 * account.
 */
export const listStreams: API.PaginatedOperationMethod<
  ListStreamsInput,
  ListStreamsOutput,
  ListStreamsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { Limit: 0, ExclusiveStartStreamName: 0, NextToken: 0 },
    output: { StreamSummaries: D.list({ StreamCreationTimestamp: D.ts }) },
    staticContext: { OperationType: { value: "control" } },
  },
  errors: [
    ExpiredNextTokenException,
    InvalidArgumentException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStreams",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "Limit",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | InvalidArgumentException
  | LimitExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * List all tags added to the specified Kinesis resource. Each tag is a label consisting of a user-defined key and value. Tags can help you manage, identify, organize, search for, and filter resources.
 *
 * For more information about tagging Kinesis resources, see Tag your Amazon Kinesis Data Streams resources.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceInput,
  ListTagsForResourceOutput,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ResourceARN: D.m({ context: "ResourceARN" }),
      StreamId: D.m({ context: "StreamId" }),
    },
    staticContext: { OperationType: { value: "control" } },
  },
  errors: [
    AccessDeniedException,
    InvalidArgumentException,
    LimitExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type ListTagsForStreamError =
  | AccessDeniedException
  | InvalidArgumentException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists the tags for the specified Kinesis data stream. This operation has a limit of
 * five transactions per second per account.
 *
 * When invoking this API, you must use either the `StreamARN` or the
 * `StreamName` parameter, or both. It is recommended that you use the
 * `StreamARN` input parameter when you invoke this API.
 */
export const listTagsForStream: API.OperationMethod<
  ListTagsForStreamInput,
  ListTagsForStreamOutput,
  ListTagsForStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      StreamName: 0,
      ExclusiveStartTagKey: 0,
      Limit: 0,
      StreamARN: D.m({ context: "StreamARN" }),
      StreamId: D.m({ context: "StreamId" }),
    },
    staticContext: { OperationType: { value: "control" } },
  },
  errors: [
    AccessDeniedException,
    InvalidArgumentException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForStream",
})) as any;

export type MergeShardsError =
  | AccessDeniedException
  | InvalidArgumentException
  | LimitExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Merges two adjacent shards in a Kinesis data stream and combines them into a single
 * shard to reduce the stream's capacity to ingest and transport data. This API is only
 * supported for the data streams with the provisioned capacity mode. Two shards are
 * considered adjacent if the union of the hash key ranges for the two shards form a
 * contiguous set with no gaps. For example, if you have two shards, one with a hash key
 * range of 276...381 and the other with a hash key range of 382...454, then you could
 * merge these two shards into a single shard that would have a hash key range of
 * 276...454. After the merge, the single child shard receives data for all hash key values
 * covered by the two parent shards.
 *
 * When invoking this API, you must use either the `StreamARN` or the
 * `StreamName` parameter, or both. It is recommended that you use the
 * `StreamARN` input parameter when you invoke this API.
 *
 * `MergeShards` is called when there is a need to reduce the overall capacity
 * of a stream because of excess capacity that is not being used. You must specify the
 * shard to be merged and the adjacent shard for a stream. For more information about
 * merging shards, see Merge Two
 * Shards in the Amazon Kinesis Data Streams Developer
 * Guide.
 *
 * If the stream is in the `ACTIVE` state, you can call
 * `MergeShards`. If a stream is in the `CREATING`,
 * `UPDATING`, or `DELETING` state, `MergeShards`
 * returns a `ResourceInUseException`. If the specified stream does not exist,
 * `MergeShards` returns a `ResourceNotFoundException`.
 *
 * You can use DescribeStreamSummary to check the state of the stream,
 * which is returned in `StreamStatus`.
 *
 * `MergeShards` is an asynchronous operation. Upon receiving a
 * `MergeShards` request, Amazon Kinesis Data Streams immediately returns a
 * response and sets the `StreamStatus` to `UPDATING`. After the
 * operation is completed, Kinesis Data Streams sets the `StreamStatus` to
 * `ACTIVE`. Read and write operations continue to work while the stream is
 * in the `UPDATING` state.
 *
 * You use DescribeStreamSummary and the ListShards
 * APIs to determine the shard IDs that are specified in the `MergeShards`
 * request.
 *
 * If you try to operate on too many streams in parallel using CreateStream, DeleteStream, `MergeShards`,
 * or SplitShard, you receive a `LimitExceededException`.
 *
 * `MergeShards` has a limit of five transactions per second per account.
 */
export const mergeShards: API.OperationMethod<
  MergeShardsInput,
  MergeShardsResponse,
  MergeShardsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      StreamName: 0,
      ShardToMerge: 0,
      AdjacentShardToMerge: 0,
      StreamARN: D.m({ context: "StreamARN" }),
      StreamId: D.m({ context: "StreamId" }),
    },
    staticContext: { OperationType: { value: "control" } },
  },
  errors: [
    AccessDeniedException,
    InvalidArgumentException,
    LimitExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "MergeShards",
})) as any;

export type PutRecordError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidArgumentException
  | KMSAccessDeniedException
  | KMSDisabledException
  | KMSInvalidStateException
  | KMSNotFoundException
  | KMSOptInRequired
  | KMSThrottlingException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Writes a single data record into an Amazon Kinesis data stream. Call
 * `PutRecord` to send data into the stream for real-time ingestion and
 * subsequent processing, one record at a time. Each shard can support writes up to 1,000
 * records per second, up to a maximum data write total of 10 MiB per second.
 *
 * When invoking this API, you must use either the `StreamARN` or the
 * `StreamName` parameter, or both. It is recommended that you use the
 * `StreamARN` input parameter when you invoke this API.
 *
 * You must specify the name of the stream that captures, stores, and transports the
 * data; a partition key; and the data blob itself.
 *
 * The data blob can be any type of data; for example, a segment from a log file,
 * geographic/location data, website clickstream data, and so on.
 *
 * The partition key is used by Kinesis Data Streams to distribute data across shards.
 * Kinesis Data Streams segregates the data records that belong to a stream into multiple
 * shards, using the partition key associated with each data record to determine the shard
 * to which a given data record belongs.
 *
 * Partition keys are Unicode strings, with a maximum length limit of 256 characters for
 * each key. An MD5 hash function is used to map partition keys to 128-bit integer values
 * and to map associated data records to shards using the hash key ranges of the shards.
 * You can override hashing the partition key to determine the shard by explicitly
 * specifying a hash value using the `ExplicitHashKey` parameter. For more
 * information, see Adding Data to a Stream in the Amazon Kinesis Data Streams
 * Developer Guide.
 *
 * `PutRecord` returns the shard ID of where the data record was placed and the
 * sequence number that was assigned to the data record.
 *
 * Sequence numbers increase over time and are specific to a shard within a stream, not
 * across all shards within a stream. To guarantee strictly increasing ordering, write
 * serially to a shard and use the `SequenceNumberForOrdering` parameter. For
 * more information, see Adding Data to a Stream in the Amazon Kinesis Data Streams
 * Developer Guide.
 *
 * After you write a record to a stream, you cannot modify that record or its order
 * within the stream.
 *
 * If a `PutRecord` request cannot be processed because of insufficient
 * provisioned throughput on the shard involved in the request, `PutRecord`
 * throws `ProvisionedThroughputExceededException`.
 *
 * By default, data records are accessible for 24 hours from the time that they are added
 * to a stream. You can use IncreaseStreamRetentionPeriod or DecreaseStreamRetentionPeriod to modify this retention period.
 */
export const putRecord: API.OperationMethod<
  PutRecordInput,
  PutRecordOutput,
  PutRecordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      StreamName: 0,
      Data: 0,
      PartitionKey: 0,
      ExplicitHashKey: 0,
      SequenceNumberForOrdering: 0,
      StreamARN: D.m({ context: "StreamARN" }),
      StreamId: D.m({ context: "StreamId" }),
    },
    staticContext: { OperationType: { value: "data" } },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidArgumentException,
    KMSAccessDeniedException,
    KMSDisabledException,
    KMSInvalidStateException,
    KMSNotFoundException,
    KMSOptInRequired,
    KMSThrottlingException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutRecord",
})) as any;

export type PutRecordsError =
  | AccessDeniedException
  | InternalFailureException
  | InvalidArgumentException
  | KMSAccessDeniedException
  | KMSDisabledException
  | KMSInvalidStateException
  | KMSNotFoundException
  | KMSOptInRequired
  | KMSThrottlingException
  | ProvisionedThroughputExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Writes multiple data records into a Kinesis data stream in a single call (also
 * referred to as a `PutRecords` request). Use this operation to send data into
 * the stream for data ingestion and processing.
 *
 * When invoking this API, you must use either the `StreamARN` or the
 * `StreamName` parameter, or both. It is recommended that you use the
 * `StreamARN` input parameter when you invoke this API.
 *
 * Each `PutRecords` request can support up to 500 records. Each record in the
 * request can be as large as 10 MiB, up to a limit of 10 MiB for the entire request,
 * including partition keys. Each shard can support writes up to 1,000 records per second,
 * up to a maximum data write total of 1 MB per second.
 *
 * You must specify the name of the stream that captures, stores, and transports the
 * data; and an array of request `Records`, with each record in the array
 * requiring a partition key and data blob. The record size limit applies to the total size
 * of the partition key and data blob.
 *
 * The data blob can be any type of data; for example, a segment from a log file,
 * geographic/location data, website clickstream data, and so on.
 *
 * The partition key is used by Kinesis Data Streams as input to a hash function that
 * maps the partition key and associated data to a specific shard. An MD5 hash function is
 * used to map partition keys to 128-bit integer values and to map associated data records
 * to shards. As a result of this hashing mechanism, all data records with the same
 * partition key map to the same shard within the stream. For more information, see Adding Data to a Stream in the Amazon Kinesis Data Streams
 * Developer Guide.
 *
 * Each record in the `Records` array may include an optional parameter,
 * `ExplicitHashKey`, which overrides the partition key to shard mapping.
 * This parameter allows a data producer to determine explicitly the shard where the record
 * is stored. For more information, see Adding Multiple Records with PutRecords in the Amazon Kinesis
 * Data Streams Developer Guide.
 *
 * The `PutRecords` response includes an array of response
 * `Records`. Each record in the response array directly correlates with a
 * record in the request array using natural ordering, from the top to the bottom of the
 * request and response. The response `Records` array always includes the same
 * number of records as the request array.
 *
 * The response `Records` array includes both successfully and unsuccessfully
 * processed records. Kinesis Data Streams attempts to process all records in each
 * `PutRecords` request. A single record failure does not stop the
 * processing of subsequent records. As a result, PutRecords doesn't guarantee the ordering
 * of records. If you need to read records in the same order they are written to the
 * stream, use PutRecord instead of `PutRecords`, and write to
 * the same shard.
 *
 * A successfully processed record includes `ShardId` and
 * `SequenceNumber` values. The `ShardId` parameter identifies
 * the shard in the stream where the record is stored. The `SequenceNumber`
 * parameter is an identifier assigned to the put record, unique to all records in the
 * stream.
 *
 * An unsuccessfully processed record includes `ErrorCode` and
 * `ErrorMessage` values. `ErrorCode` reflects the type of error
 * and can be one of the following values:
 * `ProvisionedThroughputExceededException` or `InternalFailure`.
 * `ErrorMessage` provides more detailed information about the
 * `ProvisionedThroughputExceededException` exception including the account
 * ID, stream name, and shard ID of the record that was throttled. For more information
 * about partially successful responses, see Adding Multiple Records with PutRecords in the Amazon Kinesis
 * Data Streams Developer Guide.
 *
 * After you write a record to a stream, you cannot modify that record or its order
 * within the stream.
 *
 * By default, data records are accessible for 24 hours from the time that they are added
 * to a stream. You can use IncreaseStreamRetentionPeriod or DecreaseStreamRetentionPeriod to modify this retention period.
 */
export const putRecords: API.OperationMethod<
  PutRecordsInput,
  PutRecordsOutput,
  PutRecordsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Records: D.list({ Data: 0, ExplicitHashKey: 0, PartitionKey: 0 }),
      StreamName: 0,
      StreamARN: D.m({ context: "StreamARN" }),
      StreamId: D.m({ context: "StreamId" }),
    },
    staticContext: { OperationType: { value: "data" } },
  },
  errors: [
    AccessDeniedException,
    InternalFailureException,
    InvalidArgumentException,
    KMSAccessDeniedException,
    KMSDisabledException,
    KMSInvalidStateException,
    KMSNotFoundException,
    KMSOptInRequired,
    KMSThrottlingException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutRecords",
})) as any;

export type PutResourcePolicyError =
  | AccessDeniedException
  | InvalidArgumentException
  | LimitExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Attaches a resource-based policy to a data stream or registered consumer. If you are using an identity other than the root user of
 * the Amazon Web Services account that owns the resource, the calling identity must have the `PutResourcePolicy` permissions on the
 * specified Kinesis Data Streams resource and belong to the owner's account in order to use this operation.
 * If you don't have `PutResourcePolicy` permissions, Amazon Kinesis Data Streams returns a `403 Access Denied error`.
 * If you receive a `ResourceNotFoundException`, check to see if you passed a valid stream or consumer resource.
 *
 * Request patterns can be one of the following:
 *
 * - Data stream pattern: `arn:aws.*:kinesis:.*:\d{12}:.*stream/\S+`
 *
 * - Consumer pattern: `^(arn):aws.*:kinesis:.*:\d{12}:.*stream\/[a-zA-Z0-9_.-]+\/consumer\/[a-zA-Z0-9_.-]+:[0-9]+`
 *
 * For more information, see Controlling Access to Amazon Kinesis Data Streams Resources Using IAM.
 */
export const putResourcePolicy: API.OperationMethod<
  PutResourcePolicyInput,
  PutResourcePolicyResponse,
  PutResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ResourceARN: D.m({ context: "ResourceARN" }),
      StreamId: D.m({ context: "StreamId" }),
      Policy: 0,
    },
    staticContext: { OperationType: { value: "control" } },
  },
  errors: [
    AccessDeniedException,
    InvalidArgumentException,
    LimitExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutResourcePolicy",
})) as any;

export type RegisterStreamConsumerError =
  | InvalidArgumentException
  | LimitExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Registers a consumer with a Kinesis data stream. When you use this operation, the
 * consumer you register can then call SubscribeToShard to receive data
 * from the stream using enhanced fan-out, at a rate of up to 2 MiB per second for every
 * shard you subscribe to. This rate is unaffected by the total number of consumers that
 * read from the same stream.
 *
 * You can add tags to the registered consumer when making a `RegisterStreamConsumer` request by setting the `Tags` parameter. If you pass the `Tags` parameter, in addition to having the `kinesis:RegisterStreamConsumer` permission, you must also have the `kinesis:TagResource` permission for the consumer that will be registered. Tags will take effect from the `CREATING` status of the consumer.
 *
 * With On-demand Advantage streams, you can register up to 50 consumers per stream to use Enhanced Fan-out. With On-demand Standard and Provisioned streams, you can register up to 20 consumers per stream to use Enhanced Fan-out. A given consumer can only be
 * registered with one stream at a time.
 *
 * For an example of how to use this operation, see Enhanced Fan-Out
 * Using the Kinesis Data Streams API.
 *
 * The use of this operation has a limit of five transactions per second per account.
 * Also, only 5 consumers can be created simultaneously. In other words, you cannot have
 * more than 5 consumers in a `CREATING` status at the same time. Registering a
 * 6th consumer while there are 5 in a `CREATING` status results in a
 * `LimitExceededException`.
 */
export const registerStreamConsumer: API.OperationMethod<
  RegisterStreamConsumerInput,
  RegisterStreamConsumerOutput,
  RegisterStreamConsumerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      StreamARN: D.m({ context: "StreamARN" }),
      ConsumerName: 0,
      StreamId: D.m({ context: "StreamId" }),
      Tags: 0,
    },
    output: { Consumer: o_Consumer },
    staticContext: { OperationType: { value: "control" } },
  },
  errors: [
    InvalidArgumentException,
    LimitExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterStreamConsumer",
})) as any;

export type RemoveTagsFromStreamError =
  | AccessDeniedException
  | InvalidArgumentException
  | LimitExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Removes tags from the specified Kinesis data stream. Removed tags are deleted and
 * cannot be recovered after this operation successfully completes.
 *
 * When invoking this API, you must use either the `StreamARN` or the
 * `StreamName` parameter, or both. It is recommended that you use the
 * `StreamARN` input parameter when you invoke this API.
 *
 * If you specify a tag that does not exist, it is ignored.
 *
 * RemoveTagsFromStream has a limit of five transactions per second per
 * account.
 */
export const removeTagsFromStream: API.OperationMethod<
  RemoveTagsFromStreamInput,
  RemoveTagsFromStreamResponse,
  RemoveTagsFromStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      StreamName: 0,
      TagKeys: 0,
      StreamARN: D.m({ context: "StreamARN" }),
      StreamId: D.m({ context: "StreamId" }),
    },
    staticContext: { OperationType: { value: "control" } },
  },
  errors: [
    AccessDeniedException,
    InvalidArgumentException,
    LimitExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveTagsFromStream",
})) as any;

export type SplitShardError =
  | AccessDeniedException
  | InvalidArgumentException
  | LimitExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Splits a shard into two new shards in the Kinesis data stream, to increase the
 * stream's capacity to ingest and transport data. `SplitShard` is called when
 * there is a need to increase the overall capacity of a stream because of an expected
 * increase in the volume of data records being ingested. This API is only supported for
 * the data streams with the provisioned capacity mode.
 *
 * When invoking this API, you must use either the `StreamARN` or the
 * `StreamName` parameter, or both. It is recommended that you use the
 * `StreamARN` input parameter when you invoke this API.
 *
 * You can also use `SplitShard` when a shard appears to be approaching its
 * maximum utilization; for example, the producers sending data into the specific shard are
 * suddenly sending more than previously anticipated. You can also call
 * `SplitShard` to increase stream capacity, so that more Kinesis Data
 * Streams applications can simultaneously read data from the stream for real-time
 * processing.
 *
 * You must specify the shard to be split and the new hash key, which is the position in
 * the shard where the shard gets split in two. In many cases, the new hash key might be
 * the average of the beginning and ending hash key, but it can be any hash key value in
 * the range being mapped into the shard. For more information, see Split a
 * Shard in the Amazon Kinesis Data Streams Developer
 * Guide.
 *
 * You can use DescribeStreamSummary and the ListShards APIs to determine the shard ID and hash key values for the `ShardToSplit`
 * and `NewStartingHashKey` parameters that are specified in the
 * `SplitShard` request.
 *
 * `SplitShard` is an asynchronous operation. Upon receiving a
 * `SplitShard` request, Kinesis Data Streams immediately returns a response
 * and sets the stream status to `UPDATING`. After the operation is completed,
 * Kinesis Data Streams sets the stream status to `ACTIVE`. Read and write
 * operations continue to work while the stream is in the `UPDATING` state.
 *
 * You can use DescribeStreamSummary to check the status of the stream,
 * which is returned in `StreamStatus`. If the stream is in the
 * `ACTIVE` state, you can call `SplitShard`.
 *
 * If the specified stream does not exist, DescribeStreamSummary
 * returns a `ResourceNotFoundException`. If you try to create more shards than
 * are authorized for your account, you receive a `LimitExceededException`.
 *
 * For the default shard limit for an Amazon Web Services account, see Kinesis
 * Data Streams Limits in the Amazon Kinesis Data Streams Developer
 * Guide. To increase this limit, contact Amazon Web Services
 * Support.
 *
 * If you try to operate on too many streams simultaneously using CreateStream, DeleteStream, MergeShards, and/or SplitShard, you receive a
 * `LimitExceededException`.
 *
 * `SplitShard` has a limit of five transactions per second per account.
 */
export const splitShard: API.OperationMethod<
  SplitShardInput,
  SplitShardResponse,
  SplitShardError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      StreamName: 0,
      ShardToSplit: 0,
      NewStartingHashKey: 0,
      StreamARN: D.m({ context: "StreamARN" }),
      StreamId: D.m({ context: "StreamId" }),
    },
    staticContext: { OperationType: { value: "control" } },
  },
  errors: [
    AccessDeniedException,
    InvalidArgumentException,
    LimitExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SplitShard",
})) as any;

export type StartStreamEncryptionError =
  | AccessDeniedException
  | InvalidArgumentException
  | KMSAccessDeniedException
  | KMSDisabledException
  | KMSInvalidStateException
  | KMSNotFoundException
  | KMSOptInRequired
  | KMSThrottlingException
  | LimitExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Enables or updates server-side encryption using an Amazon Web Services KMS key for a
 * specified stream.
 *
 * When invoking this API, you must use either the `StreamARN` or the
 * `StreamName` parameter, or both. It is recommended that you use the
 * `StreamARN` input parameter when you invoke this API.
 *
 * Starting encryption is an asynchronous operation. Upon receiving the request, Kinesis
 * Data Streams returns immediately and sets the status of the stream to
 * `UPDATING`. After the update is complete, Kinesis Data Streams sets the
 * status of the stream back to `ACTIVE`. Updating or applying encryption
 * normally takes a few seconds to complete, but it can take minutes. You can continue to
 * read and write data to your stream while its status is `UPDATING`. Once the
 * status of the stream is `ACTIVE`, encryption begins for records written to
 * the stream.
 *
 * API Limits: You can successfully apply a new Amazon Web Services KMS key for
 * server-side encryption 25 times in a rolling 24-hour period.
 *
 * Note: It can take up to 5 seconds after the stream is in an `ACTIVE` status
 * before all records written to the stream are encrypted. After you enable encryption, you
 * can verify that encryption is applied by inspecting the API response from
 * `PutRecord` or `PutRecords`.
 */
export const startStreamEncryption: API.OperationMethod<
  StartStreamEncryptionInput,
  StartStreamEncryptionResponse,
  StartStreamEncryptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      StreamName: 0,
      EncryptionType: 0,
      KeyId: 0,
      StreamARN: D.m({ context: "StreamARN" }),
      StreamId: D.m({ context: "StreamId" }),
    },
    staticContext: { OperationType: { value: "control" } },
  },
  errors: [
    AccessDeniedException,
    InvalidArgumentException,
    KMSAccessDeniedException,
    KMSDisabledException,
    KMSInvalidStateException,
    KMSNotFoundException,
    KMSOptInRequired,
    KMSThrottlingException,
    LimitExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartStreamEncryption",
})) as any;

export type StopStreamEncryptionError =
  | AccessDeniedException
  | InvalidArgumentException
  | LimitExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Disables server-side encryption for a specified stream.
 *
 * When invoking this API, you must use either the `StreamARN` or the
 * `StreamName` parameter, or both. It is recommended that you use the
 * `StreamARN` input parameter when you invoke this API.
 *
 * Stopping encryption is an asynchronous operation. Upon receiving the request, Kinesis
 * Data Streams returns immediately and sets the status of the stream to
 * `UPDATING`. After the update is complete, Kinesis Data Streams sets the
 * status of the stream back to `ACTIVE`. Stopping encryption normally takes a
 * few seconds to complete, but it can take minutes. You can continue to read and write
 * data to your stream while its status is `UPDATING`. Once the status of the
 * stream is `ACTIVE`, records written to the stream are no longer encrypted by
 * Kinesis Data Streams.
 *
 * API Limits: You can successfully disable server-side encryption 25 times in a rolling
 * 24-hour period.
 *
 * Note: It can take up to 5 seconds after the stream is in an `ACTIVE` status
 * before all records written to the stream are no longer subject to encryption. After you
 * disabled encryption, you can verify that encryption is not applied by inspecting the API
 * response from `PutRecord` or `PutRecords`.
 */
export const stopStreamEncryption: API.OperationMethod<
  StopStreamEncryptionInput,
  StopStreamEncryptionResponse,
  StopStreamEncryptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      StreamName: 0,
      EncryptionType: 0,
      KeyId: 0,
      StreamARN: D.m({ context: "StreamARN" }),
      StreamId: D.m({ context: "StreamId" }),
    },
    staticContext: { OperationType: { value: "control" } },
  },
  errors: [
    AccessDeniedException,
    InvalidArgumentException,
    LimitExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopStreamEncryption",
})) as any;

export type SubscribeToShardError =
  | AccessDeniedException
  | InvalidArgumentException
  | LimitExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * This operation establishes an HTTP/2 connection between the consumer you specify in
 * the `ConsumerARN` parameter and the shard you specify in the
 * `ShardId` parameter. After the connection is successfully established,
 * Kinesis Data Streams pushes records from the shard to the consumer over this connection.
 * Before you call this operation, call RegisterStreamConsumer to
 * register the consumer with Kinesis Data Streams.
 *
 * When the `SubscribeToShard` call succeeds, your consumer starts receiving
 * events of type SubscribeToShardEvent over the HTTP/2 connection for up
 * to 5 minutes, after which time you need to call `SubscribeToShard` again to
 * renew the subscription if you want to continue to receive records.
 *
 * You can make one call to `SubscribeToShard` per second per registered
 * consumer per shard. For example, if you have a 4000 shard stream and two registered
 * stream consumers, you can make one `SubscribeToShard` request per second for
 * each combination of shard and registered consumer, allowing you to subscribe both
 * consumers to all 4000 shards in one second.
 *
 * If you call `SubscribeToShard` again with the same `ConsumerARN`
 * and `ShardId` within 5 seconds of a successful call, you'll get a
 * `ResourceInUseException`. If you call `SubscribeToShard` 5
 * seconds or more after a successful call, the second call takes over the subscription and
 * the previous connection expires or fails with a
 * `ResourceInUseException`.
 *
 * For an example of how to use this operation, see Enhanced Fan-Out
 * Using the Kinesis Data Streams API.
 */
export const subscribeToShard: API.OperationMethod<
  SubscribeToShardInput,
  SubscribeToShardOutput,
  SubscribeToShardError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ConsumerARN: D.m({ context: "ConsumerARN" }),
      StreamId: D.m({ context: "StreamId" }),
      ShardId: 0,
      StartingPosition: { Type: 0, SequenceNumber: 0, Timestamp: 0 },
    },
    output: {
      EventStream: D.events({
        SubscribeToShardEvent: { Records: D.list(o_Record) },
        ResourceNotFoundException: 0,
        ResourceInUseException: 0,
        KMSDisabledException: 0,
        KMSInvalidStateException: 0,
        KMSAccessDeniedException: 0,
        KMSNotFoundException: 0,
        KMSOptInRequired: 0,
        KMSThrottlingException: 0,
        InternalFailureException: 0,
      }),
    },
    staticContext: { OperationType: { value: "data" } },
  },
  errors: [
    AccessDeniedException,
    InvalidArgumentException,
    LimitExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SubscribeToShard",
})) as any;

export type TagResourceError =
  | AccessDeniedException
  | InvalidArgumentException
  | LimitExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Adds or updates tags for the specified Kinesis resource. Each tag is a label consisting of a user-defined key and value. Tags can help you manage, identify, organize, search for, and filter resources. You can assign up to 50 tags to a Kinesis resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Tags: 0,
      ResourceARN: D.m({ context: "ResourceARN" }),
      StreamId: D.m({ context: "StreamId" }),
    },
    staticContext: { OperationType: { value: "control" } },
  },
  errors: [
    AccessDeniedException,
    InvalidArgumentException,
    LimitExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | AccessDeniedException
  | InvalidArgumentException
  | LimitExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Removes tags from the specified Kinesis resource. Removed tags are deleted and can't be recovered after this operation completes successfully.
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      TagKeys: 0,
      ResourceARN: D.m({ context: "ResourceARN" }),
      StreamId: D.m({ context: "StreamId" }),
    },
    staticContext: { OperationType: { value: "control" } },
  },
  errors: [
    AccessDeniedException,
    InvalidArgumentException,
    LimitExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateAccountSettingsError =
  | InvalidArgumentException
  | LimitExceededException
  | ValidationException
  | CommonErrors;
/**
 * Updates the account-level settings for Amazon Kinesis Data Streams.
 *
 * Updating account settings is a synchronous operation. Upon receiving the request, Kinesis Data Streams will return immediately with your account’s updated settings.
 *
 * **API limits**
 *
 * - Certain account configurations have minimum commitment windows. Attempting to update your settings prior to the end of the minimum commitment window might have certain restrictions.
 *
 * - This API has a call limit of 5 transactions per second (TPS) for each Amazon Web Services account. TPS over 5 will initiate the `LimitExceededException`.
 */
export const updateAccountSettings: API.OperationMethod<
  UpdateAccountSettingsInput,
  UpdateAccountSettingsOutput,
  UpdateAccountSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { MinimumThroughputBillingCommitment: { Status: 0 } },
    output: {
      MinimumThroughputBillingCommitment:
        o_MinimumThroughputBillingCommitmentOutput,
    },
    staticContext: { OperationType: { value: "control" } },
  },
  errors: [
    InvalidArgumentException,
    LimitExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAccountSettings",
})) as any;

export type UpdateMaxRecordSizeError =
  | AccessDeniedException
  | InvalidArgumentException
  | LimitExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * This allows you to update the `MaxRecordSize` of a single record that you can write to, and read from a stream. You can ingest and digest single records up to 10240 KiB.
 */
export const updateMaxRecordSize: API.OperationMethod<
  UpdateMaxRecordSizeInput,
  UpdateMaxRecordSizeResponse,
  UpdateMaxRecordSizeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      StreamARN: D.m({ context: "StreamARN" }),
      StreamId: D.m({ context: "StreamId" }),
      MaxRecordSizeInKiB: 0,
    },
    staticContext: { OperationType: { value: "control" } },
  },
  errors: [
    AccessDeniedException,
    InvalidArgumentException,
    LimitExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMaxRecordSize",
})) as any;

export type UpdateShardCountError =
  | AccessDeniedException
  | InvalidArgumentException
  | LimitExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the shard count of the specified stream to the specified number of shards.
 * This API is only supported for the data streams with the provisioned capacity
 * mode.
 *
 * When invoking this API, you must use either the `StreamARN` or the
 * `StreamName` parameter, or both. It is recommended that you use the
 * `StreamARN` input parameter when you invoke this API.
 *
 * Updating the shard count is an asynchronous operation. Upon receiving the request,
 * Kinesis Data Streams returns immediately and sets the status of the stream to
 * `UPDATING`. After the update is complete, Kinesis Data Streams sets the
 * status of the stream back to `ACTIVE`. Depending on the size of the stream,
 * the scaling action could take a few minutes to complete. You can continue to read and
 * write data to your stream while its status is `UPDATING`.
 *
 * To update the shard count, Kinesis Data Streams performs splits or merges on
 * individual shards. This can cause short-lived shards to be created, in addition to the
 * final shards. These short-lived shards count towards your total shard limit for your
 * account in the Region.
 *
 * When using this operation, we recommend that you specify a target shard count that is
 * a multiple of 25% (25%, 50%, 75%, 100%). You can specify any target value within your
 * shard limit. However, if you specify a target that isn't a multiple of 25%, the scaling
 * action might take longer to complete.
 *
 * This operation has the following default limits. By default, you cannot do the
 * following:
 *
 * - Scale more than ten times per rolling 24-hour period per stream
 *
 * - Scale up to more than double your current shard count for a stream
 *
 * - Scale down below half your current shard count for a stream
 *
 * - Scale up to more than 10000 shards in a stream
 *
 * - Scale a stream with more than 10000 shards down unless the result is less than
 * 10000 shards
 *
 * - Scale up to more than the shard limit for your account
 *
 * - Make over 10 TPS. TPS over 10 will trigger the LimitExceededException
 *
 * For the default limits for an Amazon Web Services account, see Streams
 * Limits in the Amazon Kinesis Data Streams Developer
 * Guide. To request an increase in the call rate limit, the shard limit for
 * this API, or your overall shard limit, use the limits form.
 */
export const updateShardCount: API.OperationMethod<
  UpdateShardCountInput,
  UpdateShardCountOutput,
  UpdateShardCountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      StreamName: 0,
      TargetShardCount: 0,
      ScalingType: 0,
      StreamARN: D.m({ context: "StreamARN" }),
      StreamId: D.m({ context: "StreamId" }),
    },
    staticContext: { OperationType: { value: "control" } },
  },
  errors: [
    AccessDeniedException,
    InvalidArgumentException,
    LimitExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateShardCount",
})) as any;

export type UpdateStreamModeError =
  | InvalidArgumentException
  | LimitExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the capacity mode of the data stream. Currently, in Kinesis Data Streams, you
 * can choose between an **on-demand** capacity mode and a
 * **provisioned** capacity mode for your data stream.
 *
 * If you'd still like to proactively scale your on-demand data stream’s capacity, you can unlock the warm throughput feature for on-demand data streams by enabling `MinimumThroughputBillingCommitment` for your account. Once your account has `MinimumThroughputBillingCommitment` enabled, you can specify the warm throughput in MiB per second that your stream can support in writes.
 */
export const updateStreamMode: API.OperationMethod<
  UpdateStreamModeInput,
  UpdateStreamModeResponse,
  UpdateStreamModeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      StreamARN: D.m({ context: "StreamARN" }),
      StreamId: D.m({ context: "StreamId" }),
      StreamModeDetails: i_StreamModeDetails,
      WarmThroughputMiBps: 0,
    },
    staticContext: { OperationType: { value: "control" } },
  },
  errors: [
    InvalidArgumentException,
    LimitExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateStreamMode",
})) as any;

export type UpdateStreamWarmThroughputError =
  | AccessDeniedException
  | InvalidArgumentException
  | LimitExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the warm throughput configuration for the specified Amazon Kinesis Data Streams on-demand data stream. Updates the warm throughput configuration for the specified on-demand data stream. Use this operation to scale your stream to a specified throughput level before anticipated traffic spikes, or to release excess capacity after traffic has decreased.
 *
 * When invoking this API, you must use either the `StreamARN` or the `StreamName` parameter, or both. It is recommended that you use the `StreamARN` input parameter when you invoke this API.
 *
 * Updating the warm throughput is an asynchronous operation. Upon receiving the request, Kinesis Data Streams returns immediately and sets the status of the stream to `UPDATING`. After the update is complete, Kinesis Data Streams sets the status of the stream back to `ACTIVE`. Depending on the size of the stream, the scaling action could take a few minutes to complete. You can continue to read and write data to your stream while its status is `UPDATING`.
 *
 * This operation is only supported for data streams with the on-demand capacity mode in accounts that have `MinimumThroughputBillingCommitment` enabled. Provisioned capacity mode streams do not support warm throughput configuration.
 *
 * To release excess capacity, call the API again and set the warm throughput to the same or a lower value.
 *
 * This operation has the following default limits. By default, you cannot do the following:
 *
 * - Scale to more than 10 GiBps for an on-demand stream.
 *
 * - This API has a call limit of 5 transactions per second (TPS) for each Amazon Web Services account. TPS over 5 will initiate the `LimitExceededException`.
 *
 * For the default limits for an Amazon Web Services account, see Streams Limits in the Amazon Kinesis Data Streams Developer
 * Guide. To request an increase in the call rate limit, the shard limit for this API, or your overall shard limit, use the limits form.
 */
export const updateStreamWarmThroughput: API.OperationMethod<
  UpdateStreamWarmThroughputInput,
  UpdateStreamWarmThroughputOutput,
  UpdateStreamWarmThroughputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      StreamARN: D.m({ context: "StreamARN" }),
      StreamName: 0,
      StreamId: D.m({ context: "StreamId" }),
      WarmThroughputMiBps: 0,
    },
    staticContext: { OperationType: { value: "control" } },
  },
  errors: [
    AccessDeniedException,
    InvalidArgumentException,
    LimitExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateStreamWarmThroughput",
})) as any;

const i_StreamModeDetails: D.LazyStruct = () => ({ StreamMode: 0 });
const o_Consumer: D.LazyStruct = () => ({ ConsumerCreationTimestamp: D.ts });
const o_MinimumThroughputBillingCommitmentOutput: D.LazyStruct = () => ({
  StartedAt: D.ts,
  EndedAt: D.ts,
  EarliestAllowedEndAt: D.ts,
});
const o_Record: D.LazyStruct = () => ({
  ApproximateArrivalTimestamp: D.ts,
  Data: D.blob,
});
