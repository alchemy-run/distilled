/**
 * Timestamp Formatting Utilities
 *
 * Handles formatting of Date objects according to AWS timestamp format types.
 */

import type { TimestampFormatType } from "../traits.ts";

/**
 * An ISO 8601 date-time without fractional seconds when they are zero
 * (`2019-12-16T23:48:18Z`), as the AWS SDKs send it.
 */
export const formatDateTime = (date: Date): string => date.toISOString().replace(".000Z", "Z");

/**
 * Format a timestamp according to the specified format.
 *
 * @param date - The date to format
 * @param format - The format type: "http-date", "epoch-seconds", or "date-time" (default)
 */
export function formatTimestamp(date: Date, format: TimestampFormatType = "date-time"): string {
  switch (format) {
    case "http-date":
      return date.toUTCString();
    case "epoch-seconds":
      return String(Math.floor(date.getTime() / 1000));
    case "date-time":
    default:
      return formatDateTime(date);
  }
}
