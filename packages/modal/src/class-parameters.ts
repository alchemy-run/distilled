/**
 * Modal class parameters -- hand-written.
 *
 * `FunctionBindParams` takes a parameterized class's parameters as the
 * protobuf bytes of a `ClassParameterSet` (proto, not JSON: the bytes
 * identify the bound function, so they must match what Modal's clients
 * send). This encodes them with the package's descriptors.
 */
import { encodeMessage } from "@distilled.cloud/core/protobuf";
import { descriptors } from "./descriptors.ts";

/** One parameter value: `ClassParameterValue` in proto3 JSON form. */
export interface ClassParameterValue {
  readonly name: string;
  readonly type: string;
  readonly stringValue?: string;
  /** int64, as a decimal string. */
  readonly intValue?: string;
  /** Base64. */
  readonly bytesValue?: string;
  readonly boolValue?: boolean;
}

/**
 * The base64 `serialized_params` for `FunctionBindParams`. Pass the values
 * in the class's schema order (`classParameterInfo.schema`).
 */
export const serializeClassParameters = (parameters: ReadonlyArray<ClassParameterValue>): string =>
  Buffer.from(
    encodeMessage(descriptors, "modal.client.ClassParameterSet", { parameters }),
  ).toString("base64");
