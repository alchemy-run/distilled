import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import type * as stream from "effect/Stream";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const ns = /*@__PURE__*/ T.XmlNamespace("http://kinesis.amazonaws.com/doc/2013-12-02");
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Kinesis",
  serviceShapeName: "Kinesis_20131202",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "kinesis" });
const ver = /*@__PURE__*/ T.ServiceVersion("2013-12-02");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_1();
const rules = /*@__PURE__*/ T.EndpointResolver((p, _) => {
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
    ChannelARN,
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
          const HttpsCustomEndpointDelimiterValue = _.substring(Endpoint, 15, 16, false);
          const HttpsEndpointDelimiterValue = _.substring(Endpoint, 20, 21, false);
          const HttpsCustomEndpointSuffixValue = _.substring(Endpoint, 15, 20, false);
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
                if (_.getAttr(PartitionResult, "supportsDualStack") === true) {
                  return e(
                    `https://${StreamIdPrefixValue}.${StreamIdSuffixValue}.${OperationType}-kinesis${HttpsCustomEndpointSuffixValue}-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                  );
                }
                return err("DualStack is enabled, but this partition does not support DualStack.");
              }
              return err("FIPS is enabled, but this partition does not support FIPS.");
            }
            if (UseFIPS === true) {
              if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
                return e(
                  `https://${StreamIdPrefixValue}.${StreamIdSuffixValue}.${OperationType}-kinesis${HttpsCustomEndpointSuffixValue}-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
                );
              }
              return err("FIPS is enabled but this partition does not support FIPS");
            }
            if (UseDualStack === true) {
              if (_.getAttr(PartitionResult, "supportsDualStack") === true) {
                return e(
                  `https://${StreamIdPrefixValue}.${StreamIdSuffixValue}.${OperationType}-kinesis${HttpsCustomEndpointSuffixValue}.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                );
              }
              return err("DualStack is enabled but this partition does not support DualStack");
            }
            return e(
              `https://${StreamIdPrefixValue}.${StreamIdSuffixValue}.${OperationType}-kinesis${HttpsCustomEndpointSuffixValue}.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
        }
        {
          const PlainCustomEndpointDelimiterValue = _.substring(Endpoint, 7, 8, false);
          const PlainEndpointDelimiterValue = _.substring(Endpoint, 12, 13, false);
          const PlainCustomEndpointSuffixValue = _.substring(Endpoint, 7, 12, false);
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
                if (_.getAttr(PartitionResult, "supportsDualStack") === true) {
                  return e(
                    `https://${StreamIdPrefixValue}.${StreamIdSuffixValue}.${OperationType}-kinesis${PlainCustomEndpointSuffixValue}-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                  );
                }
                return err("DualStack is enabled, but this partition does not support DualStack.");
              }
              return err("FIPS is enabled, but this partition does not support FIPS.");
            }
            if (UseFIPS === true) {
              if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
                return e(
                  `https://${StreamIdPrefixValue}.${StreamIdSuffixValue}.${OperationType}-kinesis${PlainCustomEndpointSuffixValue}-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
                );
              }
              return err("FIPS is enabled but this partition does not support FIPS");
            }
            if (UseDualStack === true) {
              if (_.getAttr(PartitionResult, "supportsDualStack") === true) {
                return e(
                  `https://${StreamIdPrefixValue}.${StreamIdSuffixValue}.${OperationType}-kinesis${PlainCustomEndpointSuffixValue}.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                );
              }
              return err("DualStack is enabled but this partition does not support DualStack");
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
            return err("DualStack is enabled, but this partition does not support DualStack.");
          }
          return err("FIPS is enabled, but this partition does not support FIPS.");
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://${StreamIdPrefixValue}.${StreamIdSuffixValue}.${OperationType}-kinesis-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (_.getAttr(PartitionResult, "supportsDualStack") === true) {
            return e(
              `https://${StreamIdPrefixValue}.${StreamIdSuffixValue}.${OperationType}-kinesis.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(
          `https://${StreamIdPrefixValue}.${StreamIdSuffixValue}.${OperationType}-kinesis.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
      return err("Operation Type is not set. Please contact service team for resolution.");
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
                  if (arnType != null && arnType !== false && !(arnType === "")) {
                    if (arnType === "stream") {
                      if (_.getAttr(PartitionResult, "name") === `${_.getAttr(arn, "partition")}`) {
                        if (OperationType != null) {
                          if (UseFIPS === true && UseDualStack === true) {
                            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
                              if (_.getAttr(PartitionResult, "supportsDualStack") === true) {
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
                            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
                              return e(
                                `https://${_.getAttr(arn, "accountId")}.${OperationType}-kinesis-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
                              );
                            }
                            return err("FIPS is enabled but this partition does not support FIPS");
                          }
                          if (UseDualStack === true) {
                            if (_.getAttr(PartitionResult, "supportsDualStack") === true) {
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
                    return err(`Invalid ARN: Kinesis ARNs don't support \`${arnType}\` arn types.`);
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
                  if (arnType != null && arnType !== false && !(arnType === "")) {
                    if (arnType === "stream") {
                      if (_.getAttr(PartitionResult, "name") === `${_.getAttr(arn, "partition")}`) {
                        if (OperationType != null) {
                          if (UseFIPS === true && UseDualStack === true) {
                            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
                              if (_.getAttr(PartitionResult, "supportsDualStack") === true) {
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
                            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
                              return e(
                                `https://${_.getAttr(arn, "accountId")}.${OperationType}-kinesis-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
                              );
                            }
                            return err("FIPS is enabled but this partition does not support FIPS");
                          }
                          if (UseDualStack === true) {
                            if (_.getAttr(PartitionResult, "supportsDualStack") === true) {
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
                    return err(`Invalid ARN: Kinesis ARNs don't support \`${arnType}\` arn types.`);
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
                  if (arnType != null && arnType !== false && !(arnType === "")) {
                    if (!(arnType === "stream") && !(arnType === "channel")) {
                      return err(
                        `Invalid ARN: Unsupported resource type \`${arnType}\`. Expected: stream or channel`,
                      );
                    }
                    if (_.getAttr(PartitionResult, "name") === `${_.getAttr(arn, "partition")}`) {
                      if (OperationType != null) {
                        if (arnType === "stream") {
                          if (UseFIPS === true && UseDualStack === true) {
                            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
                              if (_.getAttr(PartitionResult, "supportsDualStack") === true) {
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
                            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
                              return e(
                                `https://${_.getAttr(arn, "accountId")}.${OperationType}-kinesis-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
                              );
                            }
                            return err("FIPS is enabled but this partition does not support FIPS");
                          }
                          if (UseDualStack === true) {
                            if (_.getAttr(PartitionResult, "supportsDualStack") === true) {
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
                        if (arnType === "channel") {
                          {
                            const resourceId = _.getAttr(arn, "resourceId[1]");
                            if (resourceId != null && resourceId !== false) {
                              if (_.isValidHostLabel(resourceId, false)) {
                                if (UseFIPS === true && UseDualStack === true) {
                                  if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
                                    if (_.getAttr(PartitionResult, "supportsDualStack") === true) {
                                      return e(
                                        `https://${resourceId}.${OperationType}-kinesis-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
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
                                      `https://${resourceId}.${OperationType}-kinesis-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
                                    );
                                  }
                                  return err(
                                    "FIPS is enabled but this partition does not support FIPS",
                                  );
                                }
                                if (UseDualStack === true) {
                                  if (_.getAttr(PartitionResult, "supportsDualStack") === true) {
                                    return e(
                                      `https://${resourceId}.${OperationType}-kinesis.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                                    );
                                  }
                                  return err(
                                    "DualStack is enabled but this partition does not support DualStack",
                                  );
                                }
                                return e(
                                  `https://${resourceId}.${OperationType}-kinesis.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
                                );
                              }
                              return err("Invalid ARN: Invalid channel id.");
                            }
                          }
                          return err("Invalid ARN: Missing channel id.");
                        }
                      }
                      return err(
                        "Operation Type is not set. Please contact service team for resolution.",
                      );
                    }
                    return err(
                      `Partition: ${_.getAttr(arn, "partition")} from ARN doesn't match with partition name: ${_.getAttr(PartitionResult, "name")}.`,
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
      ChannelARN != null &&
      !(Endpoint != null) &&
      Region != null &&
      PartitionResult != null &&
      PartitionResult !== false &&
      !(_.getAttr(PartitionResult, "name") === "aws-iso") &&
      !(_.getAttr(PartitionResult, "name") === "aws-iso-b")
    ) {
      {
        const arn = _.parseArn(ChannelARN);
        if (arn != null && arn !== false) {
          if (_.isValidHostLabel(_.getAttr(arn, "accountId"), false)) {
            if (_.isValidHostLabel(_.getAttr(arn, "region"), false)) {
              if (_.getAttr(arn, "service") === "kinesis") {
                {
                  const arnType = _.getAttr(arn, "resourceId[0]");
                  if (arnType != null && arnType !== false && !(arnType === "")) {
                    if (arnType === "channel") {
                      if (_.getAttr(PartitionResult, "name") === `${_.getAttr(arn, "partition")}`) {
                        if (OperationType != null) {
                          {
                            const channelId = _.getAttr(arn, "resourceId[1]");
                            if (channelId != null && channelId !== false) {
                              if (_.isValidHostLabel(channelId, false)) {
                                if (!(OperationType === "data")) {
                                  if (UseFIPS === true && UseDualStack === true) {
                                    if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
                                      if (
                                        _.getAttr(PartitionResult, "supportsDualStack") === true
                                      ) {
                                        return e(
                                          `https://${channelId}.${OperationType}-kinesis-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
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
                                        `https://${channelId}.${OperationType}-kinesis-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
                                      );
                                    }
                                    return err(
                                      "FIPS is enabled but this partition does not support FIPS",
                                    );
                                  }
                                  if (UseDualStack === true) {
                                    if (_.getAttr(PartitionResult, "supportsDualStack") === true) {
                                      return e(
                                        `https://${channelId}.${OperationType}-kinesis.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                                      );
                                    }
                                    return err(
                                      "DualStack is enabled but this partition does not support DualStack",
                                    );
                                  }
                                  return e(
                                    `https://${channelId}.${OperationType}-kinesis.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
                                  );
                                }
                                return err(
                                  "ChannelARN does not support the `data` operation type.",
                                );
                              }
                              return err("Invalid ARN: Invalid channel id.");
                            }
                          }
                          return err("Invalid ARN: Missing channel id.");
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
                      `Invalid ARN: ChannelARN only supports \`channel\` arn types, found: \`${arnType}\`.`,
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
              return err("DualStack is enabled, but this partition does not support DualStack.");
            }
            return err("FIPS is enabled, but this partition does not support FIPS.");
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://${AccountId}.${OperationType}-kinesis-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
                _p0(),
                {},
              );
            }
            return err("FIPS is enabled but this partition does not support FIPS");
          }
          if (UseDualStack === true) {
            if (_.getAttr(PartitionResult, "supportsDualStack") === true) {
              return e(
                `https://${AccountId}.${OperationType}-kinesis.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
                _p0(),
                {},
              );
            }
            return err("DualStack is enabled but this partition does not support DualStack");
          }
          return e(
            `https://${AccountId}.${OperationType}-kinesis.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            _p0(),
            {},
          );
        }
        return err("Operation Type is not set. Please contact service team for resolution.");
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
            return e(`https://kinesis-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://kinesis.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://kinesis.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://kinesis.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()("AccessDeniedException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withAuthError) {}
export class DryRunOperationException
  extends /*@__PURE__*/ S.TaggedError<DryRunOperationException>()("DryRunOperationException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class ExpiredIteratorException
  extends /*@__PURE__*/ S.TaggedError<ExpiredIteratorException>()("ExpiredIteratorException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withBadRequestError) {}
export class ExpiredNextTokenException
  extends /*@__PURE__*/ S.TaggedError<ExpiredNextTokenException>()("ExpiredNextTokenException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withBadRequestError) {}
export class InternalFailureException
  extends /*@__PURE__*/ S.TaggedError<InternalFailureException>()("InternalFailureException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withServerError, C.withRetryableError) {}
export class InvalidArgumentException
  extends /*@__PURE__*/ S.TaggedError<InvalidArgumentException>()("InvalidArgumentException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withBadRequestError) {}
export class KMSAccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<KMSAccessDeniedException>()("KMSAccessDeniedException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withAuthError) {}
export class KMSDisabledException
  extends /*@__PURE__*/ S.TaggedError<KMSDisabledException>()("KMSDisabledException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withBadRequestError) {}
export class KMSInvalidStateException
  extends /*@__PURE__*/ S.TaggedError<KMSInvalidStateException>()("KMSInvalidStateException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withBadRequestError) {}
export class KMSNotFoundException
  extends /*@__PURE__*/ S.TaggedError<KMSNotFoundException>()("KMSNotFoundException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withBadRequestError) {}
export class KMSOptInRequired
  extends /*@__PURE__*/ S.TaggedError<KMSOptInRequired>()("KMSOptInRequired", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withBadRequestError) {}
export class KMSThrottlingException
  extends /*@__PURE__*/ S.TaggedError<KMSThrottlingException>()("KMSThrottlingException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withThrottlingError, C.withRetryableError) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()("LimitExceededException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withQuotaError, C.withRetryableError) {}
export class ProvisionedThroughputExceededException
  extends /*@__PURE__*/ S.TaggedError<ProvisionedThroughputExceededException>()(
    "ProvisionedThroughputExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ResourceInUseException
  extends /*@__PURE__*/ S.TaggedError<ResourceInUseException>()("ResourceInUseException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withConflictError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()("ResourceNotFoundException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withNotFoundError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()("ValidationException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withBadRequestError) {}
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
export type ChannelName = string;
export type RoleARN = string;
export type RecordFormatType = "GSR_JSON" | "JSON" | "STRING" | "BYTE_ARRAY" | (string & {});
export type GSRSchemaARN = string;
export interface RecordConfiguration {
  RecordFormatType: RecordFormatType;
  GSRSchemaARN?: string;
}
export interface ChannelStreamConfiguration {
  StreamARN: string;
  RecordConfiguration: RecordConfiguration;
}
export type ChannelStreamConfigurationList = ChannelStreamConfiguration[];
export type DataFreshnessInSeconds = number;
export type BucketARN = string;
export type ExpectedBucketOwner = string;
export type S3ErrorOutputPrefix = string;
export interface DeadLetterQueueS3Configuration {
  BucketARN: string;
  ExpectedBucketOwner: string;
  ErrorOutputPrefix?: string;
}
export type S3OutputKeyTemplate = string;
export type S3StorageClass = "STANDARD" | "INTELLIGENT_TIERING" | "GLACIER_IR" | (string & {});
export type S3CompressionType = "NONE" | "GZIP" | "ZSTD" | (string & {});
export interface S3StorageConfiguration {
  BucketARN: string;
  ExpectedBucketOwner: string;
  OutputKeyTemplate?: string;
  StorageClass?: S3StorageClass;
  CompressionType: S3CompressionType;
}
export interface S3DestinationConfiguration {
  DataFreshnessInSeconds?: number;
  DeadLetterQueueS3Configuration?: DeadLetterQueueS3Configuration;
  StorageConfiguration: S3StorageConfiguration;
}
export type TableBucketARN = string;
export type S3TablesNamespace = string;
export type S3TablesTableName = string;
export type S3TablesCompressionType = "NONE" | "ZSTD" | "SNAPPY" | (string & {});
export type PartitionTransform = "TIME_HOUR" | (string & {});
export type PartitionSourceName = string;
export interface PartitionField {
  Transform: PartitionTransform;
  SourceName: string;
}
export type PartitionFieldList = PartitionField[];
export interface PartitionSpec {
  PartitionFields: PartitionField[];
}
export interface S3TablesConfiguration {
  TableBucketARN: string;
  Namespace: string;
  TableName: string;
  CompressionType: S3TablesCompressionType;
  PartitionSpec?: PartitionSpec;
}
export type S3TablesConfigurationList = S3TablesConfiguration[];
export interface S3TablesDestinationConfiguration {
  DataFreshnessInSeconds?: number;
  DeadLetterQueueS3Configuration: DeadLetterQueueS3Configuration;
  S3TablesConfigurationList: S3TablesConfiguration[];
}
export type ChannelEncryptionType = "KMS" | (string & {});
export type KeyId = string;
export interface ChannelEncryptionConfiguration {
  EncryptionType: ChannelEncryptionType;
  KeyId: string;
}
export type CloudWatchLogGroupName = string;
export type CloudWatchLogStreamName = string;
export interface CloudWatchLogs {
  Enabled: boolean;
  LogGroupName?: string;
  LogStreamName?: string;
}
export interface ChannelLoggingConfiguration {
  CloudWatchLogs: CloudWatchLogs;
}
export interface CreateChannelInput {
  ChannelName: string;
  ServiceExecutionRoleARN: string;
  StreamConfigurationList: ChannelStreamConfiguration[];
  S3DestinationConfiguration?: S3DestinationConfiguration;
  S3TablesDestinationConfiguration?: S3TablesDestinationConfiguration;
  EncryptionConfiguration?: ChannelEncryptionConfiguration;
  Tags?: { [key: string]: string | undefined };
  LoggingConfiguration?: ChannelLoggingConfiguration;
}
export type ChannelARN = string;
export type ChannelId = string;
export type ChannelStatus =
  | "CREATING"
  | "ACTIVE"
  | "UPDATING"
  | "DELETING"
  | "FAILED"
  | (string & {});
export type ChannelStatusReason = string;
export interface ChannelStreamDescription {
  StreamARN: string;
  StreamCreationTimestamp: Date;
  RecordConfiguration: RecordConfiguration;
}
export type ChannelStreamDescriptionList = ChannelStreamDescription[];
export interface S3DestinationDescription {
  DataFreshnessInSeconds: number;
  DeadLetterQueueS3Configuration: DeadLetterQueueS3Configuration;
  StorageConfiguration: S3StorageConfiguration;
}
export interface S3TablesDestinationDescription {
  DataFreshnessInSeconds: number;
  DeadLetterQueueS3Configuration: DeadLetterQueueS3Configuration;
  S3TablesConfigurationList: S3TablesConfiguration[];
}
export interface ChannelDescription {
  ChannelName: string;
  ChannelARN: string;
  ChannelId: string;
  ChannelStatus: ChannelStatus;
  ChannelStatusReason?: string;
  ChannelCreationTimestamp: Date;
  ServiceExecutionRoleARN: string;
  StreamConfigurationList: ChannelStreamDescription[];
  S3DestinationConfiguration?: S3DestinationDescription;
  S3TablesDestinationConfiguration?: S3TablesDestinationDescription;
  EncryptionConfiguration?: ChannelEncryptionConfiguration;
  LoggingConfiguration: ChannelLoggingConfiguration;
}
export interface CreateChannelOutput {
  ChannelDescription: ChannelDescription;
}
export type PositiveIntegerObject = number;
export type StreamMode = "PROVISIONED" | "ON_DEMAND" | (string & {});
export interface StreamModeDetails {
  StreamMode: StreamMode;
}
export type NaturalIntegerObject = number;
export type MaxRecordSizeInKiB = number;
export type RecordDistributionStrategy = "AUTO" | "USER_PARTITION_KEY" | (string & {});
export interface CreateStreamInput {
  StreamName: string;
  ShardCount?: number;
  StreamModeDetails?: StreamModeDetails;
  Tags?: { [key: string]: string | undefined };
  WarmThroughputMiBps?: number;
  MaxRecordSizeInKiB?: number;
  RecordDistributionStrategy?: RecordDistributionStrategy;
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
export interface DeleteChannelInput {
  ChannelARN: string;
}
export interface DeleteChannelResponse {}
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
export interface DescribeChannelInput {
  ChannelARN: string;
}
export interface DescribeChannelOutput {
  ChannelDescription: ChannelDescription;
}
export interface DescribeLimitsInput {}
export type ShardCountObject = number;
export type OnDemandStreamCountObject = number;
export type OnDemandStreamCountLimitObject = number;
export type ChannelCountObject = number;
export interface DescribeLimitsOutput {
  ShardLimit: number;
  OpenShardCount: number;
  OnDemandStreamCount: number;
  OnDemandStreamCountLimit: number;
  ChannelCount?: number;
  ChannelCountLimit?: number;
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
export type StreamStatus = "CREATING" | "DELETING" | "ACTIVE" | "UPDATING" | (string & {});
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
  ChannelCount?: number;
  RecordDistributionStrategy?: RecordDistributionStrategy;
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
  DryRun?: boolean;
}
export type Data = Uint8Array;
export type PartitionKey = string;
export interface Record {
  SequenceNumber: string;
  ApproximateArrivalTimestamp?: Date;
  Data: Uint8Array;
  PartitionKey?: string;
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
  DryRun?: boolean;
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
export interface StreamFilter {
  StreamARN: string;
  StreamCreationTimestamp?: Date;
}
export type StreamFilterList = StreamFilter[];
export type ListChannelsInputLimit = number;
export type NextToken = string;
export interface ListChannelsInput {
  StreamFilter?: StreamFilter[];
  MaxResults?: number;
  NextToken?: string;
}
export type ChannelDestinationType = "S3" | "S3_TABLES" | (string & {});
export interface ChannelStreamIdentifier {
  StreamARN: string;
  StreamCreationTimestamp: Date;
}
export type ChannelStreamIdentifierList = ChannelStreamIdentifier[];
export interface ChannelSummary {
  ChannelName: string;
  ChannelARN: string;
  ChannelId: string;
  ChannelStatus: ChannelStatus;
  ChannelStatusReason?: string;
  ChannelCreationTimestamp: Date;
  ChannelDestinationType: ChannelDestinationType;
  Streams: ChannelStreamIdentifier[];
}
export type ChannelSummaryList = ChannelSummary[];
export interface ListChannelsOutput {
  ChannelSummaries: ChannelSummary[];
  NextToken?: string;
}
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
  PartitionKey?: string;
  ExplicitHashKey?: string;
  SequenceNumberForOrdering?: string;
  StreamARN?: string;
  StreamId?: string;
  DryRun?: boolean;
}
export interface PutRecordOutput {
  ShardId: string;
  SequenceNumber: string;
  EncryptionType?: EncryptionType;
}
export interface PutRecordsRequestEntry {
  Data: Uint8Array;
  ExplicitHashKey?: string;
  PartitionKey?: string;
}
export type PutRecordsRequestEntryList = PutRecordsRequestEntry[];
export interface PutRecordsInput {
  Records: PutRecordsRequestEntry[];
  StreamName?: string;
  StreamARN?: string;
  StreamId?: string;
  DryRun?: boolean;
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
  DryRun?: boolean;
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
export type MinimumThroughputBillingCommitmentInputStatus = "ENABLED" | "DISABLED" | (string & {});
export interface MinimumThroughputBillingCommitmentInput {
  Status: MinimumThroughputBillingCommitmentInputStatus;
}
export interface UpdateAccountSettingsInput {
  MinimumThroughputBillingCommitment: MinimumThroughputBillingCommitmentInput;
}
export interface UpdateAccountSettingsOutput {
  MinimumThroughputBillingCommitment?: MinimumThroughputBillingCommitmentOutput;
}
export interface S3DestinationUpdateInput {
  DataFreshnessInSeconds: number;
}
export interface S3TablesDestinationUpdateInput {
  DataFreshnessInSeconds: number;
}
export interface CloudWatchLogsUpdateInput {
  Enabled: boolean;
  LogGroupName?: string;
  LogStreamName?: string;
}
export interface ChannelLoggingUpdateInput {
  CloudWatchLogs: CloudWatchLogsUpdateInput;
}
export interface UpdateChannelInput {
  ChannelARN: string;
  S3DestinationConfiguration?: S3DestinationUpdateInput;
  S3TablesDestinationConfiguration?: S3TablesDestinationUpdateInput;
  LoggingConfiguration?: ChannelLoggingUpdateInput;
}
export interface UpdateChannelOutput {
  ChannelDescription: ChannelDescription;
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
export interface UpdateStreamRecordDistributionStrategyInput {
  StreamARN: string;
  StreamId?: string;
  RecordDistributionStrategy: RecordDistributionStrategy;
}
export interface UpdateStreamRecordDistributionStrategyResponse {}
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
  input: __S(0, __c0, 0) as any as S.Schema<AddTagsToStreamInput>,
  output: __S(64, __c2, 0) as any as S.Schema<AddTagsToStreamResponse>,
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
}));

export type CreateChannelError =
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
  | ValidationException
  | CommonErrors;
/**
 * Creates a channel that delivers records from a Kinesis data stream to a destination. A channel reads records from the specified stream and writes them to streaming tables on Apache Iceberg (Amazon S3 Tables) or to a general purpose Amazon S3 bucket.
 *
 * You must specify either `S3DestinationConfiguration` or `S3TablesDestinationConfiguration`, but not both.
 *
 * To use this operation, you must have permission to pass the specified service execution IAM role to Amazon Kinesis Data Streams (the `iam:PassRole` permission on that role).
 *
 * Creating a channel is an asynchronous operation. Upon receiving the request, Amazon Kinesis Data Streams returns immediately with the channel in the `CREATING` state. After provisioning is complete, Amazon Kinesis Data Streams sets the state to `ACTIVE`. You can use DescribeChannel to check the current state.
 *
 * This operation is only supported for data streams with the on-demand capacity mode.
 *
 * This operation has a call limit of 5 transactions per second (TPS) for each Amazon Web Services account. Exceeding 5 TPS results in a `LimitExceededException`.
 */
export const createChannel: API.OperationMethod<
  CreateChannelInput,
  CreateChannelOutput,
  CreateChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(100, __c3, 4) as any as S.Schema<CreateChannelInput>,
  output: __S(144, __c4, 16) as any as S.Schema<CreateChannelOutput>,
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
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateChannel",
}));

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
 * If you'd still like to proactively scale your on-demand data stream's capacity, you can unlock the warm throughput feature for on-demand data streams by enabling `MinimumThroughputBillingCommitment` for your account. Once your account has `MinimumThroughputBillingCommitment` enabled, you can specify the warm throughput in MiB per second that your stream can support in writes.
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
 * You can add tags to the stream when making a `CreateStream` request by setting the `Tags` parameter. If you pass the `Tags` parameter, in addition to having the `kinesis:CreateStream` permission, you must also have the `kinesis:AddTagsToStream` permission for the stream that will be created. The `kinesis:TagResource` permission won't work to tag streams on creation. Tags will take effect from the `CREATING` status of the stream, but you can't make any updates to the tags until the stream is in `ACTIVE` state.
 */
export const createStream: API.OperationMethod<
  CreateStreamInput,
  CreateStreamResponse,
  CreateStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c5, 0) as any as S.Schema<CreateStreamInput>,
  output: __S(64, __c2, 0) as any as S.Schema<CreateStreamResponse>,
  errors: [
    InvalidArgumentException,
    LimitExceededException,
    ResourceInUseException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateStream",
}));

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
  input: __S(224, __c7, 0) as any as S.Schema<DecreaseStreamRetentionPeriodInput>,
  output: __S(64, __c2, 0) as any as S.Schema<DecreaseStreamRetentionPeriodResponse>,
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
}));

export type DeleteChannelError =
  | AccessDeniedException
  | InvalidArgumentException
  | LimitExceededException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified channel. Deleting a channel stops delivery from the source stream to the destination. Data already delivered to the destination is not deleted.
 *
 * A stream cannot be deleted while it has active channels. Use ListChannels with a stream filter to find the channels attached to a stream before deleting it.
 *
 * This operation has a call limit of 5 transactions per second (TPS) for each Amazon Web Services account. Exceeding 5 TPS results in a `LimitExceededException`.
 */
export const deleteChannel: API.OperationMethod<
  DeleteChannelInput,
  DeleteChannelResponse,
  DeleteChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c8, 0) as any as S.Schema<DeleteChannelInput>,
  output: __S(64, __c2, 0) as any as S.Schema<DeleteChannelResponse>,
  errors: [
    AccessDeniedException,
    InvalidArgumentException,
    LimitExceededException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteChannel",
}));

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
  input: __S(288, __c9, 0) as any as S.Schema<DeleteResourcePolicyInput>,
  output: __S(64, __c2, 0) as any as S.Schema<DeleteResourcePolicyResponse>,
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
}));

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
  input: __S(320, __c10, 0) as any as S.Schema<DeleteStreamInput>,
  output: __S(64, __c2, 0) as any as S.Schema<DeleteStreamResponse>,
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
}));

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
  input: __S(352, __c11, 0) as any as S.Schema<DeregisterStreamConsumerInput>,
  output: __S(64, __c2, 0) as any as S.Schema<DeregisterStreamConsumerResponse>,
  errors: [InvalidArgumentException, LimitExceededException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterStreamConsumer",
}));

export type DescribeAccountSettingsError = LimitExceededException | CommonErrors;
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
  input: __S(384, __c12, 0) as any as S.Schema<DescribeAccountSettingsInput>,
  output: __S(417, __c13, 1) as any as S.Schema<DescribeAccountSettingsOutput>,
  errors: [LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAccountSettings",
}));

export type DescribeChannelError =
  | AccessDeniedException
  | InvalidArgumentException
  | LimitExceededException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Describes the specified channel, including its configuration and current status.
 *
 * Use this operation to verify that a channel reached the `ACTIVE` state after creation, or to diagnose a channel in the `FAILED` state by reading the `ChannelStatusReason`.
 *
 * This operation has a call limit of 5 transactions per second (TPS) for each Amazon Web Services account. Exceeding 5 TPS results in a `LimitExceededException`.
 */
export const describeChannel: API.OperationMethod<
  DescribeChannelInput,
  DescribeChannelOutput,
  DescribeChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(448, __c14, 0) as any as S.Schema<DescribeChannelInput>,
  output: __S(144, __c4, 16) as any as S.Schema<DescribeChannelOutput>,
  errors: [
    AccessDeniedException,
    InvalidArgumentException,
    LimitExceededException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeChannel",
}));

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
  input: __S(480, __c15, 0) as any as S.Schema<DescribeLimitsInput>,
  output: __S(481, __c15, 1) as any as S.Schema<DescribeLimitsOutput>,
  errors: [LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLimits",
}));

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
  input: __S(512, __c16, 0) as any as S.Schema<DescribeStreamInput>,
  output: __S(514, __c16, 2) as any as S.Schema<DescribeStreamOutput>,
  errors: [
    AccessDeniedException,
    InvalidArgumentException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeStream",
}));

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
  input: __S(672, __c21, 0) as any as S.Schema<DescribeStreamConsumerInput>,
  output: __S(674, __c21, 2) as any as S.Schema<DescribeStreamConsumerOutput>,
  errors: [InvalidArgumentException, LimitExceededException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeStreamConsumer",
}));

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
  input: __S(704, __c22, 0) as any as S.Schema<DescribeStreamSummaryInput>,
  output: __S(706, __c22, 2) as any as S.Schema<DescribeStreamSummaryOutput>,
  errors: [
    AccessDeniedException,
    InvalidArgumentException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeStreamSummary",
}));

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
  input: __S(768, __c24, 0) as any as S.Schema<DisableEnhancedMonitoringInput>,
  output: __S(800, __c25, 0) as any as S.Schema<EnhancedMonitoringOutput>,
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
}));

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
  input: __S(832, __c26, 0) as any as S.Schema<EnableEnhancedMonitoringInput>,
  output: __S(800, __c25, 0) as any as S.Schema<EnhancedMonitoringOutput>,
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
}));

export type GetRecordsError =
  | AccessDeniedException
  | DryRunOperationException
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
  input: __S(864, __c27, 0) as any as S.Schema<GetRecordsInput>,
  output: __S(865, __c27, 1) as any as S.Schema<GetRecordsOutput>,
  errors: [
    AccessDeniedException,
    DryRunOperationException,
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
}));

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
  input: __S(960, __c30, 0) as any as S.Schema<GetResourcePolicyInput>,
  output: __S(961, __c30, 1) as any as S.Schema<GetResourcePolicyOutput>,
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
}));

export type GetShardIteratorError =
  | AccessDeniedException
  | DryRunOperationException
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
  input: __S(992, __c31, 0) as any as S.Schema<GetShardIteratorInput>,
  output: __S(993, __c31, 1) as any as S.Schema<GetShardIteratorOutput>,
  errors: [
    AccessDeniedException,
    DryRunOperationException,
    InternalFailureException,
    InvalidArgumentException,
    ProvisionedThroughputExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetShardIterator",
}));

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
  input: __S(1024, __c32, 0) as any as S.Schema<IncreaseStreamRetentionPeriodInput>,
  output: __S(64, __c2, 0) as any as S.Schema<IncreaseStreamRetentionPeriodResponse>,
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
}));

export type ListChannelsError =
  | AccessDeniedException
  | ExpiredNextTokenException
  | InvalidArgumentException
  | LimitExceededException
  | ValidationException
  | CommonErrors;
/**
 * Lists the channels in your account. You can filter the results by source stream. The results are paginated. Use the `NextToken` value returned in the response to retrieve additional results.
 *
 * Use this operation to find channels before deleting a stream, or to audit the channels configured in an Amazon Web Services Region.
 *
 * This operation has a call limit of 5 transactions per second (TPS) for each Amazon Web Services account. Exceeding 5 TPS results in a `LimitExceededException`.
 */
export const listChannels: API.PaginatedOperationMethod<
  ListChannelsInput,
  ListChannelsOutput,
  ListChannelsError,
  Credentials | HttpClient.HttpClient,
  ChannelSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1058, __c33, 2) as any as S.Schema<ListChannelsInput>,
  output: __S(1063, __c33, 7) as any as S.Schema<ListChannelsOutput>,
  errors: [
    AccessDeniedException,
    ExpiredNextTokenException,
    InvalidArgumentException,
    LimitExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListChannels",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ChannelSummaries",
    pageSize: "MaxResults",
  } as const,
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
  input: __S(1089, __c34, 1) as any as S.Schema<ListShardsInput>,
  output: __S(1090, __c34, 2) as any as S.Schema<ListShardsOutput>,
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
}));

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
  input: __S(1120, __c35, 0) as any as S.Schema<ListStreamConsumersInput>,
  output: __S(1122, __c35, 2) as any as S.Schema<ListStreamConsumersOutput>,
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
  input: __S(1184, __c37, 0) as any as S.Schema<ListStreamsInput>,
  output: __S(1187, __c37, 3) as any as S.Schema<ListStreamsOutput>,
  errors: [ExpiredNextTokenException, InvalidArgumentException, LimitExceededException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListStreams",
  pagination: { inputToken: "NextToken", outputToken: "NextToken", pageSize: "Limit" } as const,
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
  input: __S(1216, __c38, 0) as any as S.Schema<ListTagsForResourceInput>,
  output: __S(1217, __c38, 1) as any as S.Schema<ListTagsForResourceOutput>,
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
}));

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
  input: __S(1280, __c40, 0) as any as S.Schema<ListTagsForStreamInput>,
  output: __S(1281, __c40, 1) as any as S.Schema<ListTagsForStreamOutput>,
  errors: [
    AccessDeniedException,
    InvalidArgumentException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForStream",
}));

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
  input: __S(1312, __c41, 0) as any as S.Schema<MergeShardsInput>,
  output: __S(64, __c2, 0) as any as S.Schema<MergeShardsResponse>,
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
}));

export type PutRecordError =
  | AccessDeniedException
  | DryRunOperationException
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
  input: __S(1344, __c42, 0) as any as S.Schema<PutRecordInput>,
  output: __S(1345, __c42, 1) as any as S.Schema<PutRecordOutput>,
  errors: [
    AccessDeniedException,
    DryRunOperationException,
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
}));

export type PutRecordsError =
  | AccessDeniedException
  | DryRunOperationException
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
  input: __S(1378, __c43, 2) as any as S.Schema<PutRecordsInput>,
  output: __S(1381, __c43, 5) as any as S.Schema<PutRecordsOutput>,
  errors: [
    AccessDeniedException,
    DryRunOperationException,
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
}));

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
  input: __S(1408, __c44, 0) as any as S.Schema<PutResourcePolicyInput>,
  output: __S(64, __c2, 0) as any as S.Schema<PutResourcePolicyResponse>,
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
}));

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
  input: __S(1440, __c45, 0) as any as S.Schema<RegisterStreamConsumerInput>,
  output: __S(1441, __c45, 1) as any as S.Schema<RegisterStreamConsumerOutput>,
  errors: [
    InvalidArgumentException,
    LimitExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterStreamConsumer",
}));

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
  input: __S(1472, __c46, 0) as any as S.Schema<RemoveTagsFromStreamInput>,
  output: __S(64, __c2, 0) as any as S.Schema<RemoveTagsFromStreamResponse>,
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
}));

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
  input: __S(1504, __c47, 0) as any as S.Schema<SplitShardInput>,
  output: __S(64, __c2, 0) as any as S.Schema<SplitShardResponse>,
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
}));

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
  input: __S(1536, __c48, 0) as any as S.Schema<StartStreamEncryptionInput>,
  output: __S(64, __c2, 0) as any as S.Schema<StartStreamEncryptionResponse>,
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
}));

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
  input: __S(1568, __c49, 0) as any as S.Schema<StopStreamEncryptionInput>,
  output: __S(64, __c2, 0) as any as S.Schema<StopStreamEncryptionResponse>,
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
}));

export type SubscribeToShardError =
  | AccessDeniedException
  | DryRunOperationException
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
  input: __S(1601, __c50, 1) as any as S.Schema<SubscribeToShardInput>,
  output: __S(1604, __c50, 4) as any as S.Schema<SubscribeToShardOutput>,
  errors: [
    AccessDeniedException,
    DryRunOperationException,
    InvalidArgumentException,
    LimitExceededException,
    ResourceInUseException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SubscribeToShard",
}));

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
  input: __S(1632, __c51, 0) as any as S.Schema<TagResourceInput>,
  output: __S(64, __c2, 0) as any as S.Schema<TagResourceResponse>,
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
}));

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
  input: __S(1664, __c52, 0) as any as S.Schema<UntagResourceInput>,
  output: __S(64, __c2, 0) as any as S.Schema<UntagResourceResponse>,
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
}));

export type UpdateAccountSettingsError =
  | InvalidArgumentException
  | LimitExceededException
  | ValidationException
  | CommonErrors;
/**
 * Updates the account-level settings for Amazon Kinesis Data Streams.
 *
 * Updating account settings is a synchronous operation. Upon receiving the request, Kinesis Data Streams will return immediately with your account's updated settings.
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
  input: __S(1697, __c53, 1) as any as S.Schema<UpdateAccountSettingsInput>,
  output: __S(417, __c13, 1) as any as S.Schema<UpdateAccountSettingsOutput>,
  errors: [InvalidArgumentException, LimitExceededException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAccountSettings",
}));

export type UpdateChannelError =
  | AccessDeniedException
  | InvalidArgumentException
  | LimitExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the data freshness interval or the Amazon CloudWatch Logs configuration of an existing channel. You cannot change the destination, source stream, record format, schema, encryption configuration, or service execution role of an existing channel. To change any other setting, delete the channel and create a new one.
 *
 * Updating a channel is an asynchronous operation. Upon receiving the request, Amazon Kinesis Data Streams sets the channel to the `UPDATING` state and returns immediately. After the change is applied, Amazon Kinesis Data Streams sets the channel back to the `ACTIVE` state.
 *
 * This operation has a call limit of 5 transactions per second (TPS) for each Amazon Web Services account. Exceeding 5 TPS results in a `LimitExceededException`.
 */
export const updateChannel: API.OperationMethod<
  UpdateChannelInput,
  UpdateChannelOutput,
  UpdateChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1729, __c54, 1) as any as S.Schema<UpdateChannelInput>,
  output: __S(144, __c4, 16) as any as S.Schema<UpdateChannelOutput>,
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
  operationName: "UpdateChannel",
}));

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
  input: __S(1760, __c55, 0) as any as S.Schema<UpdateMaxRecordSizeInput>,
  output: __S(64, __c2, 0) as any as S.Schema<UpdateMaxRecordSizeResponse>,
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
}));

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
  input: __S(1792, __c56, 0) as any as S.Schema<UpdateShardCountInput>,
  output: __S(1793, __c56, 1) as any as S.Schema<UpdateShardCountOutput>,
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
}));

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
 * If you'd still like to proactively scale your on-demand data stream's capacity, you can unlock the warm throughput feature for on-demand data streams by enabling `MinimumThroughputBillingCommitment` for your account. Once your account has `MinimumThroughputBillingCommitment` enabled, you can specify the warm throughput in MiB per second that your stream can support in writes.
 */
export const updateStreamMode: API.OperationMethod<
  UpdateStreamModeInput,
  UpdateStreamModeResponse,
  UpdateStreamModeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1824, __c57, 0) as any as S.Schema<UpdateStreamModeInput>,
  output: __S(64, __c2, 0) as any as S.Schema<UpdateStreamModeResponse>,
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
}));

export type UpdateStreamRecordDistributionStrategyError =
  | AccessDeniedException
  | InvalidArgumentException
  | LimitExceededException
  | ResourceInUseException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the record distribution strategy for the specified Amazon Kinesis Data Streams
 * on-demand data stream. The record distribution strategy determines how Amazon Kinesis
 * Data Streams distributes records across the shards in a stream.
 *
 * You must specify the stream using the `StreamARN` parameter.
 *
 * The record distribution strategy is a stream-level setting. You can switch between the
 * following strategies at any time, and the change takes effect immediately without
 * downtime, data loss, or disruption to producer or consumer applications:
 *
 * - `AUTO` - Amazon Kinesis Data Streams distributes records evenly
 * across shards using service-managed algorithms, and ignores any partition key
 * and `ExplicitHashKey` that a producer provides. Use this strategy for
 * stateless workloads that do not require partition-key ordering.
 *
 * - `USER_PARTITION_KEY` - Producers must provide a partition key, and
 * Amazon Kinesis Data Streams uses the partition key to determine shard placement.
 * Records that share a partition key are sent to the same shard. This is the
 * default strategy.
 *
 * This operation is only supported for data streams that use the on-demand capacity
 * mode. Provisioned capacity mode streams do not support the record distribution strategy
 * setting. Attempting to set `AUTO` on a provisioned stream results in an
 * `InvalidArgumentException`.
 *
 * New records that arrive after the change are distributed according to the new
 * strategy. Records already in the stream keep their original shard assignments and are
 * not redistributed.
 */
export const updateStreamRecordDistributionStrategy: API.OperationMethod<
  UpdateStreamRecordDistributionStrategyInput,
  UpdateStreamRecordDistributionStrategyResponse,
  UpdateStreamRecordDistributionStrategyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1856, __c58, 0) as any as S.Schema<UpdateStreamRecordDistributionStrategyInput>,
  output: __S(64, __c2, 0) as any as S.Schema<UpdateStreamRecordDistributionStrategyResponse>,
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
  operationName: "UpdateStreamRecordDistributionStrategy",
}));

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
  input: __S(1888, __c59, 0) as any as S.Schema<UpdateStreamWarmThroughputInput>,
  output: __S(1889, __c59, 1) as any as S.Schema<UpdateStreamWarmThroughputOutput>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StreamName: S.optional(S.String),
          Tags: __S(32, __c1, 0),
          StreamARN: S.optional(S.String).pipe(T.ContextParam("StreamARN")),
          StreamId: S.optional(S.String).pipe(T.ContextParam("StreamId")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ OperationType: { value: "control" } }),
          ),
        ),
      ).annotate({ identifier: "AddTagsToStreamInput" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "AddTagsToStreamResponse",
      });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ StreamARN: S.String, RecordConfiguration: __S(128, __c4, 0) }),
      ).annotate({ identifier: "ChannelStreamConfiguration" });
    case 1:
      return S.Array(__S(96, __c3, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          DataFreshnessInSeconds: S.optional(S.Number),
          DeadLetterQueueS3Configuration: S.optional(__S(129, __c4, 1)),
          StorageConfiguration: __S(130, __c4, 2),
        }),
      ).annotate({ identifier: "S3DestinationConfiguration" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          DataFreshnessInSeconds: S.optional(S.Number),
          DeadLetterQueueS3Configuration: __S(129, __c4, 1),
          S3TablesConfigurationList: __S(135, __c4, 7),
        }),
      ).annotate({ identifier: "S3TablesDestinationConfiguration" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          ChannelName: S.String,
          ServiceExecutionRoleARN: S.String,
          StreamConfigurationList: __S(97, __c3, 1),
          S3DestinationConfiguration: S.optional(__S(98, __c3, 2)),
          S3TablesDestinationConfiguration: S.optional(__S(99, __c3, 3)),
          EncryptionConfiguration: S.optional(__S(136, __c4, 8)),
          Tags: S.optional(__S(32, __c1, 0)),
          LoggingConfiguration: S.optional(__S(138, __c4, 10)),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ OperationType: { value: "control" } }),
          ),
        ),
      ).annotate({ identifier: "CreateChannelInput" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RecordFormatType: S.String, GSRSchemaARN: S.optional(S.String) }),
      ).annotate({ identifier: "RecordConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          BucketARN: S.String,
          ExpectedBucketOwner: S.String,
          ErrorOutputPrefix: S.optional(S.String),
        }),
      ).annotate({ identifier: "DeadLetterQueueS3Configuration" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          BucketARN: S.String,
          ExpectedBucketOwner: S.String,
          OutputKeyTemplate: S.optional(S.String),
          StorageClass: S.optional(S.String),
          CompressionType: S.String,
        }),
      ).annotate({ identifier: "S3StorageConfiguration" });
    case 3:
      return S.suspend(() => S.Struct({ Transform: S.String, SourceName: S.String })).annotate({
        identifier: "PartitionField",
      });
    case 4:
      return S.Array(__S(131, __c4, 3));
    case 5:
      return S.suspend(() => S.Struct({ PartitionFields: __S(132, __c4, 4) })).annotate({
        identifier: "PartitionSpec",
      });
    case 6:
      return S.suspend(() =>
        S.Struct({
          TableBucketARN: S.String,
          Namespace: S.String,
          TableName: S.String,
          CompressionType: S.String,
          PartitionSpec: S.optional(__S(133, __c4, 5)),
        }),
      ).annotate({ identifier: "S3TablesConfiguration" });
    case 7:
      return S.Array(__S(134, __c4, 6));
    case 8:
      return S.suspend(() => S.Struct({ EncryptionType: S.String, KeyId: S.String })).annotate({
        identifier: "ChannelEncryptionConfiguration",
      });
    case 9:
      return S.suspend(() =>
        S.Struct({
          Enabled: S.Boolean,
          LogGroupName: S.optional(S.String),
          LogStreamName: S.optional(S.String),
        }),
      ).annotate({ identifier: "CloudWatchLogs" });
    case 10:
      return S.suspend(() => S.Struct({ CloudWatchLogs: __S(137, __c4, 9) })).annotate({
        identifier: "ChannelLoggingConfiguration",
      });
    case 11:
      return S.suspend(() =>
        S.Struct({
          StreamARN: S.String,
          StreamCreationTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          RecordConfiguration: __S(128, __c4, 0),
        }),
      ).annotate({ identifier: "ChannelStreamDescription" });
    case 12:
      return S.Array(__S(139, __c4, 11));
    case 13:
      return S.suspend(() =>
        S.Struct({
          DataFreshnessInSeconds: S.Number,
          DeadLetterQueueS3Configuration: __S(129, __c4, 1),
          StorageConfiguration: __S(130, __c4, 2),
        }),
      ).annotate({ identifier: "S3DestinationDescription" });
    case 14:
      return S.suspend(() =>
        S.Struct({
          DataFreshnessInSeconds: S.Number,
          DeadLetterQueueS3Configuration: __S(129, __c4, 1),
          S3TablesConfigurationList: __S(135, __c4, 7),
        }),
      ).annotate({ identifier: "S3TablesDestinationDescription" });
    case 15:
      return S.suspend(() =>
        S.Struct({
          ChannelName: S.String,
          ChannelARN: S.String,
          ChannelId: S.String,
          ChannelStatus: S.String,
          ChannelStatusReason: S.optional(S.String),
          ChannelCreationTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          ServiceExecutionRoleARN: S.String,
          StreamConfigurationList: __S(140, __c4, 12),
          S3DestinationConfiguration: S.optional(__S(141, __c4, 13)),
          S3TablesDestinationConfiguration: S.optional(__S(142, __c4, 14)),
          EncryptionConfiguration: S.optional(__S(136, __c4, 8)),
          LoggingConfiguration: __S(138, __c4, 10),
        }),
      ).annotate({ identifier: "ChannelDescription" });
    case 16:
      return S.suspend(() =>
        S.Struct({ ChannelDescription: __S(143, __c4, 15) }).pipe(ns),
      ).annotate({ identifier: "CreateChannelOutput" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StreamName: S.String,
          ShardCount: S.optional(S.Number),
          StreamModeDetails: S.optional(__S(192, __c6, 0)),
          Tags: S.optional(__S(32, __c1, 0)),
          WarmThroughputMiBps: S.optional(S.Number),
          MaxRecordSizeInKiB: S.optional(S.Number),
          RecordDistributionStrategy: S.optional(S.String),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ OperationType: { value: "control" } }),
          ),
        ),
      ).annotate({ identifier: "CreateStreamInput" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ StreamMode: S.String })).annotate({
        identifier: "StreamModeDetails",
      });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StreamName: S.optional(S.String),
          RetentionPeriodHours: S.Number,
          StreamARN: S.optional(S.String).pipe(T.ContextParam("StreamARN")),
          StreamId: S.optional(S.String).pipe(T.ContextParam("StreamId")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ OperationType: { value: "control" } }),
          ),
        ),
      ).annotate({ identifier: "DecreaseStreamRetentionPeriodInput" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ChannelARN: S.String.pipe(T.ContextParam("ChannelARN")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ OperationType: { value: "control" } }),
          ),
        ),
      ).annotate({ identifier: "DeleteChannelInput" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceARN: S.String.pipe(T.ContextParam("ResourceARN")),
          StreamId: S.optional(S.String).pipe(T.ContextParam("StreamId")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ OperationType: { value: "control" } }),
          ),
        ),
      ).annotate({ identifier: "DeleteResourcePolicyInput" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StreamName: S.optional(S.String),
          EnforceConsumerDeletion: S.optional(S.Boolean),
          StreamARN: S.optional(S.String).pipe(T.ContextParam("StreamARN")),
          StreamId: S.optional(S.String).pipe(T.ContextParam("StreamId")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ OperationType: { value: "control" } }),
          ),
        ),
      ).annotate({ identifier: "DeleteStreamInput" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StreamARN: S.optional(S.String).pipe(T.ContextParam("StreamARN")),
          ConsumerName: S.optional(S.String),
          ConsumerARN: S.optional(S.String).pipe(T.ContextParam("ConsumerARN")),
          StreamId: S.optional(S.String).pipe(T.ContextParam("StreamId")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ OperationType: { value: "control" } }),
          ),
        ),
      ).annotate({ identifier: "DeregisterStreamConsumerInput" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ OperationType: { value: "control" } }),
          ),
        ),
      ).annotate({ identifier: "DescribeAccountSettingsInput" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Status: S.String,
          StartedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EarliestAllowedEndAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "MinimumThroughputBillingCommitmentOutput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ MinimumThroughputBillingCommitment: S.optional(__S(416, __c13, 0)) }).pipe(ns),
      ).annotate({ identifier: "DescribeAccountSettingsOutput" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ChannelARN: S.String.pipe(T.ContextParam("ChannelARN")) }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ OperationType: { value: "control" } }),
          ),
        ),
      ).annotate({ identifier: "DescribeChannelInput" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ OperationType: { value: "control" } }),
          ),
        ),
      ).annotate({ identifier: "DescribeLimitsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ShardLimit: S.Number,
          OpenShardCount: S.Number,
          OnDemandStreamCount: S.Number,
          OnDemandStreamCountLimit: S.Number,
          ChannelCount: S.optional(S.Number),
          ChannelCountLimit: S.optional(S.Number),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeLimitsOutput" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StreamName: S.optional(S.String),
          Limit: S.optional(S.Number),
          ExclusiveStartShardId: S.optional(S.String),
          StreamARN: S.optional(S.String).pipe(T.ContextParam("StreamARN")),
          StreamId: S.optional(S.String).pipe(T.ContextParam("StreamId")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ OperationType: { value: "control" } }),
          ),
        ),
      ).annotate({ identifier: "DescribeStreamInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          StreamName: S.String,
          StreamARN: S.String,
          StreamStatus: S.String,
          StreamModeDetails: S.optional(__S(192, __c6, 0)),
          Shards: __S(642, __c20, 2),
          HasMoreShards: S.Boolean,
          RetentionPeriodHours: S.Number,
          StreamCreationTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          EnhancedMonitoring: __S(545, __c17, 1),
          EncryptionType: S.optional(S.String),
          KeyId: S.optional(S.String),
        }),
      ).annotate({ identifier: "StreamDescription" });
    case 2:
      return S.suspend(() => S.Struct({ StreamDescription: __S(513, __c16, 1) }).pipe(ns)).annotate(
        { identifier: "DescribeStreamOutput" },
      );
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ShardLevelMetrics: S.optional(__S(576, __c18, 0)) }),
      ).annotate({ identifier: "EnhancedMetrics" });
    case 1:
      return S.Array(__S(544, __c17, 0));
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ StartingHashKey: S.String, EndingHashKey: S.String }),
      ).annotate({ identifier: "HashKeyRange" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ StartingSequenceNumber: S.String, EndingSequenceNumber: S.optional(S.String) }),
      ).annotate({ identifier: "SequenceNumberRange" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ShardId: S.String,
          ParentShardId: S.optional(S.String),
          AdjacentParentShardId: S.optional(S.String),
          HashKeyRange: __S(608, __c19, 0),
          SequenceNumberRange: __S(640, __c20, 0),
        }),
      ).annotate({ identifier: "Shard" });
    case 2:
      return S.Array(__S(641, __c20, 1));
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StreamARN: S.optional(S.String).pipe(T.ContextParam("StreamARN")),
          ConsumerName: S.optional(S.String),
          ConsumerARN: S.optional(S.String).pipe(T.ContextParam("ConsumerARN")),
          StreamId: S.optional(S.String).pipe(T.ContextParam("StreamId")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ OperationType: { value: "control" } }),
          ),
        ),
      ).annotate({ identifier: "DescribeStreamConsumerInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ConsumerName: S.String,
          ConsumerARN: S.String,
          ConsumerStatus: S.String,
          ConsumerCreationTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          StreamARN: S.String,
        }),
      ).annotate({ identifier: "ConsumerDescription" });
    case 2:
      return S.suspend(() =>
        S.Struct({ ConsumerDescription: __S(673, __c21, 1) }).pipe(ns),
      ).annotate({ identifier: "DescribeStreamConsumerOutput" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StreamName: S.optional(S.String),
          StreamARN: S.optional(S.String).pipe(T.ContextParam("StreamARN")),
          StreamId: S.optional(S.String).pipe(T.ContextParam("StreamId")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ OperationType: { value: "control" } }),
          ),
        ),
      ).annotate({ identifier: "DescribeStreamSummaryInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          StreamName: S.String,
          StreamARN: S.String,
          StreamId: S.optional(S.String),
          StreamStatus: S.String,
          StreamModeDetails: S.optional(__S(192, __c6, 0)),
          RetentionPeriodHours: S.Number,
          StreamCreationTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          EnhancedMonitoring: __S(545, __c17, 1),
          EncryptionType: S.optional(S.String),
          KeyId: S.optional(S.String),
          OpenShardCount: S.optional(S.Number),
          ConsumerCount: S.optional(S.Number),
          WarmThroughput: S.optional(__S(736, __c23, 0)),
          MaxRecordSizeInKiB: S.optional(S.Number),
          ChannelCount: S.optional(S.Number),
          RecordDistributionStrategy: S.optional(S.String),
        }),
      ).annotate({ identifier: "StreamDescriptionSummary" });
    case 2:
      return S.suspend(() =>
        S.Struct({ StreamDescriptionSummary: __S(705, __c22, 1) }).pipe(ns),
      ).annotate({ identifier: "DescribeStreamSummaryOutput" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TargetMiBps: S.optional(S.Number), CurrentMiBps: S.optional(S.Number) }),
      ).annotate({ identifier: "WarmThroughputObject" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StreamName: S.optional(S.String),
          ShardLevelMetrics: __S(576, __c18, 0),
          StreamARN: S.optional(S.String).pipe(T.ContextParam("StreamARN")),
          StreamId: S.optional(S.String).pipe(T.ContextParam("StreamId")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ OperationType: { value: "control" } }),
          ),
        ),
      ).annotate({ identifier: "DisableEnhancedMonitoringInput" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StreamName: S.optional(S.String),
          CurrentShardLevelMetrics: S.optional(__S(576, __c18, 0)),
          DesiredShardLevelMetrics: S.optional(__S(576, __c18, 0)),
          StreamARN: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "EnhancedMonitoringOutput" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StreamName: S.optional(S.String),
          ShardLevelMetrics: __S(576, __c18, 0),
          StreamARN: S.optional(S.String).pipe(T.ContextParam("StreamARN")),
          StreamId: S.optional(S.String).pipe(T.ContextParam("StreamId")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ OperationType: { value: "control" } }),
          ),
        ),
      ).annotate({ identifier: "EnableEnhancedMonitoringInput" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ShardIterator: S.String,
          Limit: S.optional(S.Number),
          StreamARN: S.optional(S.String).pipe(T.ContextParam("StreamARN")),
          StreamId: S.optional(S.String).pipe(T.ContextParam("StreamId")),
          DryRun: S.optional(S.Boolean),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ OperationType: { value: "data" } }),
          ),
        ),
      ).annotate({ identifier: "GetRecordsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Records: __S(929, __c29, 1),
          NextShardIterator: S.optional(S.String),
          MillisBehindLatest: S.optional(S.Number),
          ChildShards: S.optional(__S(931, __c29, 3)),
        }).pipe(ns),
      ).annotate({ identifier: "GetRecordsOutput" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SequenceNumber: S.String,
          ApproximateArrivalTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Data: T.Blob,
          PartitionKey: S.optional(S.String),
          EncryptionType: S.optional(S.String),
        }),
      ).annotate({ identifier: "Record" });
    case 1:
      return S.Array(__S(928, __c29, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ShardId: S.String,
          ParentShards: __S(896, __c28, 0),
          HashKeyRange: __S(608, __c19, 0),
        }),
      ).annotate({ identifier: "ChildShard" });
    case 3:
      return S.Array(__S(930, __c29, 2));
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceARN: S.String.pipe(T.ContextParam("ResourceARN")),
          StreamId: S.optional(S.String).pipe(T.ContextParam("StreamId")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ OperationType: { value: "control" } }),
          ),
        ),
      ).annotate({ identifier: "GetResourcePolicyInput" });
    case 1:
      return S.suspend(() => S.Struct({ Policy: S.String }).pipe(ns)).annotate({
        identifier: "GetResourcePolicyOutput",
      });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StreamName: S.optional(S.String),
          ShardId: S.String,
          ShardIteratorType: S.String,
          StartingSequenceNumber: S.optional(S.String),
          Timestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          StreamARN: S.optional(S.String).pipe(T.ContextParam("StreamARN")),
          StreamId: S.optional(S.String).pipe(T.ContextParam("StreamId")),
          DryRun: S.optional(S.Boolean),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ OperationType: { value: "data" } }),
          ),
        ),
      ).annotate({ identifier: "GetShardIteratorInput" });
    case 1:
      return S.suspend(() => S.Struct({ ShardIterator: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "GetShardIteratorOutput",
      });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StreamName: S.optional(S.String),
          RetentionPeriodHours: S.Number,
          StreamARN: S.optional(S.String).pipe(T.ContextParam("StreamARN")),
          StreamId: S.optional(S.String).pipe(T.ContextParam("StreamId")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ OperationType: { value: "control" } }),
          ),
        ),
      ).annotate({ identifier: "IncreaseStreamRetentionPeriodInput" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StreamARN: S.String,
          StreamCreationTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "StreamFilter" });
    case 1:
      return S.Array(__S(1056, __c33, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          StreamFilter: S.optional(__S(1057, __c33, 1)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ OperationType: { value: "control" } }),
          ),
        ),
      ).annotate({ identifier: "ListChannelsInput" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          StreamARN: S.String,
          StreamCreationTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "ChannelStreamIdentifier" });
    case 4:
      return S.Array(__S(1059, __c33, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          ChannelName: S.String,
          ChannelARN: S.String,
          ChannelId: S.String,
          ChannelStatus: S.String,
          ChannelStatusReason: S.optional(S.String),
          ChannelCreationTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          ChannelDestinationType: S.String,
          Streams: __S(1060, __c33, 4),
        }),
      ).annotate({ identifier: "ChannelSummary" });
    case 6:
      return S.Array(__S(1061, __c33, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({ ChannelSummaries: __S(1062, __c33, 6), NextToken: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "ListChannelsOutput" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Type: S.String,
          ShardId: S.optional(S.String),
          Timestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ShardFilter" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          StreamName: S.optional(S.String),
          NextToken: S.optional(S.String),
          ExclusiveStartShardId: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          StreamCreationTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ShardFilter: S.optional(__S(1088, __c34, 0)),
          StreamARN: S.optional(S.String).pipe(T.ContextParam("StreamARN")),
          StreamId: S.optional(S.String).pipe(T.ContextParam("StreamId")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ OperationType: { value: "control" } }),
          ),
        ),
      ).annotate({ identifier: "ListShardsInput" });
    case 2:
      return S.suspend(() =>
        S.Struct({ Shards: S.optional(__S(642, __c20, 2)), NextToken: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "ListShardsOutput" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StreamARN: S.String.pipe(T.ContextParam("StreamARN")),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          StreamCreationTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          StreamId: S.optional(S.String).pipe(T.ContextParam("StreamId")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ OperationType: { value: "control" } }),
          ),
        ),
      ).annotate({ identifier: "ListStreamConsumersInput" });
    case 1:
      return S.Array(__S(1152, __c36, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Consumers: S.optional(__S(1121, __c35, 1)),
          NextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListStreamConsumersOutput" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConsumerName: S.String,
          ConsumerARN: S.String,
          ConsumerStatus: S.String,
          ConsumerCreationTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "Consumer" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Limit: S.optional(S.Number),
          ExclusiveStartStreamName: S.optional(S.String),
          NextToken: S.optional(S.String),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ OperationType: { value: "control" } }),
          ),
        ),
      ).annotate({ identifier: "ListStreamsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          StreamName: S.String,
          StreamARN: S.String,
          StreamStatus: S.String,
          StreamModeDetails: S.optional(__S(192, __c6, 0)),
          StreamCreationTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "StreamSummary" });
    case 2:
      return S.Array(__S(1185, __c37, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          StreamNames: __S(896, __c28, 0),
          HasMoreStreams: S.Boolean,
          NextToken: S.optional(S.String),
          StreamSummaries: S.optional(__S(1186, __c37, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "ListStreamsOutput" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceARN: S.String.pipe(T.ContextParam("ResourceARN")),
          StreamId: S.optional(S.String).pipe(T.ContextParam("StreamId")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ OperationType: { value: "control" } }),
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceInput" });
    case 1:
      return S.suspend(() => S.Struct({ Tags: S.optional(__S(1249, __c39, 1)) }).pipe(ns)).annotate(
        { identifier: "ListTagsForResourceOutput" },
      );
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Value: S.optional(S.String) })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(1248, __c39, 0));
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StreamName: S.optional(S.String),
          ExclusiveStartTagKey: S.optional(S.String),
          Limit: S.optional(S.Number),
          StreamARN: S.optional(S.String).pipe(T.ContextParam("StreamARN")),
          StreamId: S.optional(S.String).pipe(T.ContextParam("StreamId")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ OperationType: { value: "control" } }),
          ),
        ),
      ).annotate({ identifier: "ListTagsForStreamInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Tags: __S(1249, __c39, 1), HasMoreTags: S.Boolean }).pipe(ns),
      ).annotate({ identifier: "ListTagsForStreamOutput" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StreamName: S.optional(S.String),
          ShardToMerge: S.String,
          AdjacentShardToMerge: S.String,
          StreamARN: S.optional(S.String).pipe(T.ContextParam("StreamARN")),
          StreamId: S.optional(S.String).pipe(T.ContextParam("StreamId")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ OperationType: { value: "control" } }),
          ),
        ),
      ).annotate({ identifier: "MergeShardsInput" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StreamName: S.optional(S.String),
          Data: T.Blob,
          PartitionKey: S.optional(S.String),
          ExplicitHashKey: S.optional(S.String),
          SequenceNumberForOrdering: S.optional(S.String),
          StreamARN: S.optional(S.String).pipe(T.ContextParam("StreamARN")),
          StreamId: S.optional(S.String).pipe(T.ContextParam("StreamId")),
          DryRun: S.optional(S.Boolean),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ OperationType: { value: "data" } }),
          ),
        ),
      ).annotate({ identifier: "PutRecordInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ShardId: S.String,
          SequenceNumber: S.String,
          EncryptionType: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "PutRecordOutput" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Data: T.Blob,
          ExplicitHashKey: S.optional(S.String),
          PartitionKey: S.optional(S.String),
        }),
      ).annotate({ identifier: "PutRecordsRequestEntry" });
    case 1:
      return S.Array(__S(1376, __c43, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Records: __S(1377, __c43, 1),
          StreamName: S.optional(S.String),
          StreamARN: S.optional(S.String).pipe(T.ContextParam("StreamARN")),
          StreamId: S.optional(S.String).pipe(T.ContextParam("StreamId")),
          DryRun: S.optional(S.Boolean),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ OperationType: { value: "data" } }),
          ),
        ),
      ).annotate({ identifier: "PutRecordsInput" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          SequenceNumber: S.optional(S.String),
          ShardId: S.optional(S.String),
          ErrorCode: S.optional(S.String),
          ErrorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "PutRecordsResultEntry" });
    case 4:
      return S.Array(__S(1379, __c43, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          FailedRecordCount: S.optional(S.Number),
          Records: __S(1380, __c43, 4),
          EncryptionType: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "PutRecordsOutput" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceARN: S.String.pipe(T.ContextParam("ResourceARN")),
          StreamId: S.optional(S.String).pipe(T.ContextParam("StreamId")),
          Policy: S.String,
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ OperationType: { value: "control" } }),
          ),
        ),
      ).annotate({ identifier: "PutResourcePolicyInput" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StreamARN: S.String.pipe(T.ContextParam("StreamARN")),
          ConsumerName: S.String,
          StreamId: S.optional(S.String).pipe(T.ContextParam("StreamId")),
          Tags: S.optional(__S(32, __c1, 0)),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ OperationType: { value: "control" } }),
          ),
        ),
      ).annotate({ identifier: "RegisterStreamConsumerInput" });
    case 1:
      return S.suspend(() => S.Struct({ Consumer: __S(1152, __c36, 0) }).pipe(ns)).annotate({
        identifier: "RegisterStreamConsumerOutput",
      });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StreamName: S.optional(S.String),
          TagKeys: __S(896, __c28, 0),
          StreamARN: S.optional(S.String).pipe(T.ContextParam("StreamARN")),
          StreamId: S.optional(S.String).pipe(T.ContextParam("StreamId")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ OperationType: { value: "control" } }),
          ),
        ),
      ).annotate({ identifier: "RemoveTagsFromStreamInput" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StreamName: S.optional(S.String),
          ShardToSplit: S.String,
          NewStartingHashKey: S.String,
          StreamARN: S.optional(S.String).pipe(T.ContextParam("StreamARN")),
          StreamId: S.optional(S.String).pipe(T.ContextParam("StreamId")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ OperationType: { value: "control" } }),
          ),
        ),
      ).annotate({ identifier: "SplitShardInput" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StreamName: S.optional(S.String),
          EncryptionType: S.String,
          KeyId: S.String,
          StreamARN: S.optional(S.String).pipe(T.ContextParam("StreamARN")),
          StreamId: S.optional(S.String).pipe(T.ContextParam("StreamId")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ OperationType: { value: "control" } }),
          ),
        ),
      ).annotate({ identifier: "StartStreamEncryptionInput" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StreamName: S.optional(S.String),
          EncryptionType: S.String,
          KeyId: S.String,
          StreamARN: S.optional(S.String).pipe(T.ContextParam("StreamARN")),
          StreamId: S.optional(S.String).pipe(T.ContextParam("StreamId")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ OperationType: { value: "control" } }),
          ),
        ),
      ).annotate({ identifier: "StopStreamEncryptionInput" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Type: S.String,
          SequenceNumber: S.optional(S.String),
          Timestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "StartingPosition" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ConsumerARN: S.String.pipe(T.ContextParam("ConsumerARN")),
          StreamId: S.optional(S.String).pipe(T.ContextParam("StreamId")),
          ShardId: S.String,
          StartingPosition: __S(1600, __c50, 0),
          DryRun: S.optional(S.Boolean),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ OperationType: { value: "data" } }),
          ),
        ),
      ).annotate({ identifier: "SubscribeToShardInput" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Records: __S(929, __c29, 1),
          ContinuationSequenceNumber: S.String,
          MillisBehindLatest: S.Number,
          ChildShards: S.optional(__S(931, __c29, 3)),
        }),
      ).annotate({ identifier: "SubscribeToShardEvent" });
    case 3:
      return T.EventStream(
        /*@__PURE__*/ S.Union([
          /*@__PURE__*/ S.Struct({ SubscribeToShardEvent: __S(1602, __c50, 2) }),
          /*@__PURE__*/ S.Struct({
            ResourceNotFoundException: /*@__PURE__*/ S.suspend(
              () => ResourceNotFoundException,
            ).annotate({ identifier: "ResourceNotFoundException" }),
          }),
          /*@__PURE__*/ S.Struct({
            ResourceInUseException: /*@__PURE__*/ S.suspend(() => ResourceInUseException).annotate({
              identifier: "ResourceInUseException",
            }),
          }),
          /*@__PURE__*/ S.Struct({
            KMSDisabledException: /*@__PURE__*/ S.suspend(() => KMSDisabledException).annotate({
              identifier: "KMSDisabledException",
            }),
          }),
          /*@__PURE__*/ S.Struct({
            KMSInvalidStateException: /*@__PURE__*/ S.suspend(
              () => KMSInvalidStateException,
            ).annotate({ identifier: "KMSInvalidStateException" }),
          }),
          /*@__PURE__*/ S.Struct({
            KMSAccessDeniedException: /*@__PURE__*/ S.suspend(
              () => KMSAccessDeniedException,
            ).annotate({ identifier: "KMSAccessDeniedException" }),
          }),
          /*@__PURE__*/ S.Struct({
            KMSNotFoundException: /*@__PURE__*/ S.suspend(() => KMSNotFoundException).annotate({
              identifier: "KMSNotFoundException",
            }),
          }),
          /*@__PURE__*/ S.Struct({
            KMSOptInRequired: /*@__PURE__*/ S.suspend(() => KMSOptInRequired).annotate({
              identifier: "KMSOptInRequired",
            }),
          }),
          /*@__PURE__*/ S.Struct({
            KMSThrottlingException: /*@__PURE__*/ S.suspend(() => KMSThrottlingException).annotate({
              identifier: "KMSThrottlingException",
            }),
          }),
          /*@__PURE__*/ S.Struct({
            InternalFailureException: /*@__PURE__*/ S.suspend(
              () => InternalFailureException,
            ).annotate({ identifier: "InternalFailureException" }),
          }),
        ]),
      );
    case 4:
      return S.suspend(() => S.Struct({ EventStream: __S(1603, __c50, 3) }).pipe(ns)).annotate({
        identifier: "SubscribeToShardOutput",
      });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Tags: __S(32, __c1, 0),
          ResourceARN: S.String.pipe(T.ContextParam("ResourceARN")),
          StreamId: S.optional(S.String).pipe(T.ContextParam("StreamId")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ OperationType: { value: "control" } }),
          ),
        ),
      ).annotate({ identifier: "TagResourceInput" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TagKeys: __S(896, __c28, 0),
          ResourceARN: S.String.pipe(T.ContextParam("ResourceARN")),
          StreamId: S.optional(S.String).pipe(T.ContextParam("StreamId")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ OperationType: { value: "control" } }),
          ),
        ),
      ).annotate({ identifier: "UntagResourceInput" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Status: S.String })).annotate({
        identifier: "MinimumThroughputBillingCommitmentInput",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ MinimumThroughputBillingCommitment: __S(1696, __c53, 0) }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ OperationType: { value: "control" } }),
          ),
        ),
      ).annotate({ identifier: "UpdateAccountSettingsInput" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ DataFreshnessInSeconds: S.Number })).annotate({
        identifier: "S3DestinationUpdateInput",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ChannelARN: S.String.pipe(T.ContextParam("ChannelARN")),
          S3DestinationConfiguration: S.optional(__S(1728, __c54, 0)),
          S3TablesDestinationConfiguration: S.optional(__S(1728, __c54, 0)),
          LoggingConfiguration: S.optional(__S(138, __c4, 10)),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ OperationType: { value: "control" } }),
          ),
        ),
      ).annotate({ identifier: "UpdateChannelInput" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StreamARN: S.optional(S.String).pipe(T.ContextParam("StreamARN")),
          StreamId: S.optional(S.String).pipe(T.ContextParam("StreamId")),
          MaxRecordSizeInKiB: S.Number,
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ OperationType: { value: "control" } }),
          ),
        ),
      ).annotate({ identifier: "UpdateMaxRecordSizeInput" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StreamName: S.optional(S.String),
          TargetShardCount: S.Number,
          ScalingType: S.String,
          StreamARN: S.optional(S.String).pipe(T.ContextParam("StreamARN")),
          StreamId: S.optional(S.String).pipe(T.ContextParam("StreamId")),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ OperationType: { value: "control" } }),
          ),
        ),
      ).annotate({ identifier: "UpdateShardCountInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          StreamName: S.optional(S.String),
          CurrentShardCount: S.optional(S.Number),
          TargetShardCount: S.optional(S.Number),
          StreamARN: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "UpdateShardCountOutput" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StreamARN: S.String.pipe(T.ContextParam("StreamARN")),
          StreamId: S.optional(S.String).pipe(T.ContextParam("StreamId")),
          StreamModeDetails: __S(192, __c6, 0),
          WarmThroughputMiBps: S.optional(S.Number),
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ OperationType: { value: "control" } }),
          ),
        ),
      ).annotate({ identifier: "UpdateStreamModeInput" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StreamARN: S.String.pipe(T.ContextParam("StreamARN")),
          StreamId: S.optional(S.String).pipe(T.ContextParam("StreamId")),
          RecordDistributionStrategy: S.String,
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ OperationType: { value: "control" } }),
          ),
        ),
      ).annotate({ identifier: "UpdateStreamRecordDistributionStrategyInput" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          StreamARN: S.optional(S.String).pipe(T.ContextParam("StreamARN")),
          StreamName: S.optional(S.String),
          StreamId: S.optional(S.String).pipe(T.ContextParam("StreamId")),
          WarmThroughputMiBps: S.Number,
        }).pipe(
          T.all(
            ns,
            T.Http({ method: "POST", uri: "/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
            T.StaticContextParams({ OperationType: { value: "control" } }),
          ),
        ),
      ).annotate({ identifier: "UpdateStreamWarmThroughputInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          StreamARN: S.optional(S.String),
          StreamName: S.optional(S.String),
          WarmThroughput: S.optional(__S(736, __c23, 0)),
        }).pipe(ns),
      ).annotate({ identifier: "UpdateStreamWarmThroughputOutput" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
