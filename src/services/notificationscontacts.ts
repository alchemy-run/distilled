import * as S from "effect/Schema";
import * as API from "../api.ts";
import * as T from "../traits.ts";
import { ERROR_CATEGORIES, withCategory } from "../error-category.ts";
const svc = T.AwsApiService({
  sdkId: "NotificationsContacts",
  serviceShapeName: "NotificationsContacts",
});
const auth = T.AwsAuthSigv4({ name: "notifications-contacts" });
const ver = T.ServiceVersion("2018-05-10");
const proto = T.AwsProtocolsRestJson1();
const rules = T.EndpointRuleSet({
  version: "1.0",
  parameters: {
    UseFIPS: {
      builtIn: "AWS::UseFIPS",
      required: true,
      default: false,
      documentation:
        "When true, send this request to the FIPS-compliant regional endpoint. If the configured endpoint does not have a FIPS compliant endpoint, dispatching the request will return an error.",
      type: "boolean",
    },
    Endpoint: {
      builtIn: "SDK::Endpoint",
      required: false,
      documentation: "Override the endpoint used to send this request",
      type: "string",
    },
    Region: {
      builtIn: "AWS::Region",
      required: false,
      documentation: "The AWS region used to dispatch the request.",
      type: "string",
    },
  },
  rules: [
    {
      conditions: [{ fn: "isSet", argv: [{ ref: "Endpoint" }] }],
      rules: [
        {
          conditions: [
            { fn: "booleanEquals", argv: [{ ref: "UseFIPS" }, true] },
          ],
          error:
            "Invalid Configuration: FIPS and custom endpoint are not supported",
          type: "error",
        },
        {
          conditions: [],
          endpoint: { url: { ref: "Endpoint" }, properties: {}, headers: {} },
          type: "endpoint",
        },
      ],
      type: "tree",
    },
    {
      conditions: [],
      rules: [
        {
          conditions: [{ fn: "isSet", argv: [{ ref: "Region" }] }],
          rules: [
            {
              conditions: [
                {
                  fn: "aws.partition",
                  argv: [{ ref: "Region" }],
                  assign: "PartitionResult",
                },
              ],
              rules: [
                {
                  conditions: [
                    { fn: "booleanEquals", argv: [{ ref: "UseFIPS" }, true] },
                  ],
                  endpoint: {
                    url: "https://notifications-contacts-fips.{PartitionResult#implicitGlobalRegion}.{PartitionResult#dualStackDnsSuffix}",
                    properties: {
                      authSchemes: [
                        {
                          name: "sigv4",
                          signingRegion:
                            "{PartitionResult#implicitGlobalRegion}",
                        },
                      ],
                    },
                    headers: {},
                  },
                  type: "endpoint",
                },
                {
                  conditions: [],
                  endpoint: {
                    url: "https://notifications-contacts.{PartitionResult#implicitGlobalRegion}.{PartitionResult#dualStackDnsSuffix}",
                    properties: {
                      authSchemes: [
                        {
                          name: "sigv4",
                          signingRegion:
                            "{PartitionResult#implicitGlobalRegion}",
                        },
                      ],
                    },
                    headers: {},
                  },
                  type: "endpoint",
                },
              ],
              type: "tree",
            },
          ],
          type: "tree",
        },
        {
          conditions: [],
          error: "Invalid Configuration: Missing Region",
          type: "error",
        },
      ],
      type: "tree",
    },
  ],
});

//# Schemas
export type TagKeys = string[];
export const TagKeys = S.Array(S.String);
export interface ListTagsForResourceRequest {
  arn: string;
}
export const ListTagsForResourceRequest = S.suspend(() =>
  S.Struct({ arn: S.String.pipe(T.HttpLabel("arn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/tags/{arn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "ListTagsForResourceRequest",
}) as any as S.Schema<ListTagsForResourceRequest>;
export interface UntagResourceRequest {
  arn: string;
  tagKeys: TagKeys;
}
export const UntagResourceRequest = S.suspend(() =>
  S.Struct({
    arn: S.String.pipe(T.HttpLabel("arn")),
    tagKeys: TagKeys.pipe(T.HttpQuery("tagKeys")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/tags/{arn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "UntagResourceRequest",
}) as any as S.Schema<UntagResourceRequest>;
export interface UntagResourceResponse {}
export const UntagResourceResponse = S.suspend(() => S.Struct({})).annotations({
  identifier: "UntagResourceResponse",
}) as any as S.Schema<UntagResourceResponse>;
export type TagMap = { [key: string]: string };
export const TagMap = S.Record({ key: S.String, value: S.String });
export interface CreateEmailContactRequest {
  name: string;
  emailAddress: string;
  tags?: TagMap;
}
export const CreateEmailContactRequest = S.suspend(() =>
  S.Struct({
    name: S.String,
    emailAddress: S.String,
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/2022-09-19/emailcontacts" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "CreateEmailContactRequest",
}) as any as S.Schema<CreateEmailContactRequest>;
export interface GetEmailContactRequest {
  arn: string;
}
export const GetEmailContactRequest = S.suspend(() =>
  S.Struct({ arn: S.String.pipe(T.HttpLabel("arn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/emailcontacts/{arn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "GetEmailContactRequest",
}) as any as S.Schema<GetEmailContactRequest>;
export interface DeleteEmailContactRequest {
  arn: string;
}
export const DeleteEmailContactRequest = S.suspend(() =>
  S.Struct({ arn: S.String.pipe(T.HttpLabel("arn")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/emailcontacts/{arn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "DeleteEmailContactRequest",
}) as any as S.Schema<DeleteEmailContactRequest>;
export interface DeleteEmailContactResponse {}
export const DeleteEmailContactResponse = S.suspend(() =>
  S.Struct({}),
).annotations({
  identifier: "DeleteEmailContactResponse",
}) as any as S.Schema<DeleteEmailContactResponse>;
export interface ListEmailContactsRequest {
  maxResults?: number;
  nextToken?: string;
}
export const ListEmailContactsRequest = S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/emailcontacts" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "ListEmailContactsRequest",
}) as any as S.Schema<ListEmailContactsRequest>;
export interface ActivateEmailContactRequest {
  arn: string;
  code: string;
}
export const ActivateEmailContactRequest = S.suspend(() =>
  S.Struct({
    arn: S.String.pipe(T.HttpLabel("arn")),
    code: S.String.pipe(T.HttpLabel("code")),
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/emailcontacts/{arn}/activate/{code}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "ActivateEmailContactRequest",
}) as any as S.Schema<ActivateEmailContactRequest>;
export interface ActivateEmailContactResponse {}
export const ActivateEmailContactResponse = S.suspend(() =>
  S.Struct({}),
).annotations({
  identifier: "ActivateEmailContactResponse",
}) as any as S.Schema<ActivateEmailContactResponse>;
export interface SendActivationCodeRequest {
  arn: string;
}
export const SendActivationCodeRequest = S.suspend(() =>
  S.Struct({ arn: S.String.pipe(T.HttpLabel("arn")) }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/2022-10-31/emailcontacts/{arn}/activate/send",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "SendActivationCodeRequest",
}) as any as S.Schema<SendActivationCodeRequest>;
export interface SendActivationCodeResponse {}
export const SendActivationCodeResponse = S.suspend(() =>
  S.Struct({}),
).annotations({
  identifier: "SendActivationCodeResponse",
}) as any as S.Schema<SendActivationCodeResponse>;
export interface EmailContact {
  arn: string;
  name: string;
  address: string;
  status: string;
  creationTime: Date;
  updateTime: Date;
}
export const EmailContact = S.suspend(() =>
  S.Struct({
    arn: S.String,
    name: S.String,
    address: S.String,
    status: S.String,
    creationTime: S.Date.pipe(T.TimestampFormat("date-time")),
    updateTime: S.Date.pipe(T.TimestampFormat("date-time")),
  }),
).annotations({ identifier: "EmailContact" }) as any as S.Schema<EmailContact>;
export type EmailContacts = EmailContact[];
export const EmailContacts = S.Array(EmailContact);
export interface ListTagsForResourceResponse {
  tags?: TagMap;
}
export const ListTagsForResourceResponse = S.suspend(() =>
  S.Struct({ tags: S.optional(TagMap) }),
).annotations({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface TagResourceRequest {
  arn: string;
  tags: TagMap;
}
export const TagResourceRequest = S.suspend(() =>
  S.Struct({ arn: S.String.pipe(T.HttpLabel("arn")), tags: TagMap }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/tags/{arn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotations({
  identifier: "TagResourceRequest",
}) as any as S.Schema<TagResourceRequest>;
export interface TagResourceResponse {}
export const TagResourceResponse = S.suspend(() => S.Struct({})).annotations({
  identifier: "TagResourceResponse",
}) as any as S.Schema<TagResourceResponse>;
export interface CreateEmailContactResponse {
  arn: string;
}
export const CreateEmailContactResponse = S.suspend(() =>
  S.Struct({ arn: S.String }),
).annotations({
  identifier: "CreateEmailContactResponse",
}) as any as S.Schema<CreateEmailContactResponse>;
export interface ListEmailContactsResponse {
  nextToken?: string;
  emailContacts: EmailContacts;
}
export const ListEmailContactsResponse = S.suspend(() =>
  S.Struct({ nextToken: S.optional(S.String), emailContacts: EmailContacts }),
).annotations({
  identifier: "ListEmailContactsResponse",
}) as any as S.Schema<ListEmailContactsResponse>;
export interface GetEmailContactResponse {
  emailContact: EmailContact;
}
export const GetEmailContactResponse = S.suspend(() =>
  S.Struct({ emailContact: EmailContact }),
).annotations({
  identifier: "GetEmailContactResponse",
}) as any as S.Schema<GetEmailContactResponse>;
export interface ValidationExceptionField {
  name: string;
  message: string;
}
export const ValidationExceptionField = S.suspend(() =>
  S.Struct({ name: S.String, message: S.String }),
).annotations({
  identifier: "ValidationExceptionField",
}) as any as S.Schema<ValidationExceptionField>;
export type ValidationExceptionFieldList = ValidationExceptionField[];
export const ValidationExceptionFieldList = S.Array(ValidationExceptionField);

//# Errors
export class AccessDeniedException extends S.TaggedError<AccessDeniedException>()(
  "AccessDeniedException",
  { message: S.String },
) {}
export class InternalServerException extends S.TaggedError<InternalServerException>()(
  "InternalServerException",
  { message: S.String },
  T.Retryable(),
).pipe(withCategory(ERROR_CATEGORIES.SERVER_ERROR)) {}
export class ConflictException extends S.TaggedError<ConflictException>()(
  "ConflictException",
  { message: S.String, resourceId: S.String, resourceType: S.String },
) {}
export class ResourceNotFoundException extends S.TaggedError<ResourceNotFoundException>()(
  "ResourceNotFoundException",
  { message: S.String, resourceId: S.String, resourceType: S.String },
) {}
export class ServiceQuotaExceededException extends S.TaggedError<ServiceQuotaExceededException>()(
  "ServiceQuotaExceededException",
  {
    message: S.String,
    resourceId: S.String,
    resourceType: S.String,
    serviceCode: S.String,
    quotaCode: S.String,
  },
) {}
export class ThrottlingException extends S.TaggedError<ThrottlingException>()(
  "ThrottlingException",
  {
    message: S.String,
    serviceCode: S.optional(S.String),
    quotaCode: S.optional(S.String),
    retryAfterSeconds: S.optional(S.Number).pipe(T.HttpHeader("Retry-After")),
  },
  T.Retryable({ throttling: true }),
).pipe(withCategory(ERROR_CATEGORIES.THROTTLING_ERROR)) {}
export class ValidationException extends S.TaggedError<ValidationException>()(
  "ValidationException",
  {
    message: S.String,
    reason: S.String,
    fieldList: S.optional(ValidationExceptionFieldList),
  },
) {}

//# Operations
/**
 * Lists all email contacts created under the Account.
 */
export const listEmailContacts = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(
  () => ({
    input: ListEmailContactsRequest,
    output: ListEmailContactsResponse,
    errors: [
      AccessDeniedException,
      InternalServerException,
      ThrottlingException,
      ValidationException,
    ],
    pagination: {
      inputToken: "nextToken",
      outputToken: "nextToken",
      items: "emailContacts",
      pageSize: "maxResults",
    } as const,
  }),
);
/**
 * Returns an email contact.
 */
export const getEmailContact = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetEmailContactRequest,
  output: GetEmailContactResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Lists all of the tags associated with the Amazon Resource Name (ARN) that you specify. The resource can be a user, server, or role.
 */
export const listTagsForResource = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Attaches a key-value pair to a resource, as identified by its Amazon Resource Name (ARN). Taggable resources in AWS User Notifications Contacts include email contacts.
 */
export const tagResource = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TagResourceRequest,
  output: TagResourceResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Deletes an email contact.
 *
 * Deleting an email contact removes it from all associated notification configurations.
 */
export const deleteEmailContact = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteEmailContactRequest,
  output: DeleteEmailContactResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Activates an email contact using an activation code. This code is in the activation email sent to the email address associated with this email contact.
 */
export const activateEmailContact = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    input: ActivateEmailContactRequest,
    output: ActivateEmailContactResponse,
    errors: [
      AccessDeniedException,
      ConflictException,
      InternalServerException,
      ResourceNotFoundException,
      ThrottlingException,
      ValidationException,
    ],
  }),
);
/**
 * Sends an activation email to the email address associated with the specified email contact.
 *
 * It might take a few minutes for the activation email to arrive. If it doesn't arrive, check in your spam folder or try sending another activation email.
 */
export const sendActivationCode = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: SendActivationCodeRequest,
  output: SendActivationCodeResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Detaches a key-value pair from a resource, as identified by its Amazon Resource Name (ARN). Taggable resources in AWS User Notifications Contacts include email contacts..
 */
export const untagResource = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Creates an email contact for the provided email address.
 */
export const createEmailContact = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateEmailContactRequest,
  output: CreateEmailContactResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
