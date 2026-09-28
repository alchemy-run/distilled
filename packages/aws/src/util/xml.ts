/**
 * Shared XML utilities for AWS protocols (aws-query, ec2-query, rest-xml)
 */

import {
  parseXml as parseCoreXml,
  type XmlParseOptions,
} from "@distilled.cloud/core/xml";
import * as Effect from "effect/Effect";
import { ParseError } from "../errors.ts";

export {
  escapeXml,
  wrapTag,
  parseXmlSync,
  XmlParseError,
  type XmlObject,
  type XmlValue,
  type XmlParseOptions,
} from "@distilled.cloud/core/xml";

/** Adapt shared XML failures to the AWS protocol error type. */
export const parseXml = (xml: string, options?: XmlParseOptions) =>
  parseCoreXml(xml, options).pipe(
    Effect.mapError((error) => new ParseError({ message: error.message })),
  );
