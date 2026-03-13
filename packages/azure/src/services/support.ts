/**
 * Azure Support API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const ChatTranscriptsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    supportTicketName: Schema.String.pipe(T.PathParam()),
    chatTranscriptName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Support/supportTickets/{supportTicketName}/chatTranscripts/{chatTranscriptName}",
    }),
  );
export type ChatTranscriptsGetInput = typeof ChatTranscriptsGetInput.Type;

// Output Schema
export const ChatTranscriptsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ChatTranscriptsGetOutput = typeof ChatTranscriptsGetOutput.Type;

// The operation
/**
 * Returns chatTranscript details for a support ticket under a subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param supportTicketName - The name of the SupportTicketDetails
 * @param chatTranscriptName - The name of the ChatTranscriptDetails
 */
export const ChatTranscriptsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ChatTranscriptsGetInput,
  outputSchema: ChatTranscriptsGetOutput,
}));
// Input Schema
export const ChatTranscriptsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    supportTicketName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Support/supportTickets/{supportTicketName}/chatTranscripts",
    }),
  );
export type ChatTranscriptsListInput = typeof ChatTranscriptsListInput.Type;

// Output Schema
export const ChatTranscriptsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
  });
export type ChatTranscriptsListOutput = typeof ChatTranscriptsListOutput.Type;

// The operation
/**
 * Lists all chat transcripts for a support ticket under subscription
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param supportTicketName - The name of the SupportTicketDetails
 */
export const ChatTranscriptsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ChatTranscriptsListInput,
  outputSchema: ChatTranscriptsListOutput,
}));
// Input Schema
export const ChatTranscriptsNoSubscriptionGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    supportTicketName: Schema.String.pipe(T.PathParam()),
    chatTranscriptName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Support/supportTickets/{supportTicketName}/chatTranscripts/{chatTranscriptName}",
    }),
  );
export type ChatTranscriptsNoSubscriptionGetInput =
  typeof ChatTranscriptsNoSubscriptionGetInput.Type;

// Output Schema
export const ChatTranscriptsNoSubscriptionGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ChatTranscriptsNoSubscriptionGetOutput =
  typeof ChatTranscriptsNoSubscriptionGetOutput.Type;

// The operation
/**
 * Returns chatTranscript details for a no subscription support ticket.
 *
 * @param api-version - The API version to use for this operation.
 * @param supportTicketName - The name of the SupportTicketDetails
 * @param chatTranscriptName - The name of the ChatTranscriptDetails
 */
export const ChatTranscriptsNoSubscriptionGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ChatTranscriptsNoSubscriptionGetInput,
    outputSchema: ChatTranscriptsNoSubscriptionGetOutput,
  }));
// Input Schema
export const ChatTranscriptsNoSubscriptionListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    supportTicketName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Support/supportTickets/{supportTicketName}/chatTranscripts",
    }),
  );
export type ChatTranscriptsNoSubscriptionListInput =
  typeof ChatTranscriptsNoSubscriptionListInput.Type;

// Output Schema
export const ChatTranscriptsNoSubscriptionListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
  });
export type ChatTranscriptsNoSubscriptionListOutput =
  typeof ChatTranscriptsNoSubscriptionListOutput.Type;

// The operation
/**
 * Lists all chat transcripts for a support ticket
 *
 * @param api-version - The API version to use for this operation.
 * @param supportTicketName - The name of the SupportTicketDetails
 */
export const ChatTranscriptsNoSubscriptionList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ChatTranscriptsNoSubscriptionListInput,
    outputSchema: ChatTranscriptsNoSubscriptionListOutput,
  }));
// Input Schema
export const CommunicationsCheckNameAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    supportTicketName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Support/supportTickets/{supportTicketName}/checkNameAvailability",
    }),
  );
export type CommunicationsCheckNameAvailabilityInput =
  typeof CommunicationsCheckNameAvailabilityInput.Type;

// Output Schema
export const CommunicationsCheckNameAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nameAvailable: Schema.optional(Schema.Boolean),
    reason: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
  });
export type CommunicationsCheckNameAvailabilityOutput =
  typeof CommunicationsCheckNameAvailabilityOutput.Type;

// The operation
/**
 * Check the availability of a resource name. This API should be used to check the uniqueness of the name for adding a new communication to the support ticket.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param supportTicketName - The name of the SupportTicketDetails
 */
export const CommunicationsCheckNameAvailability =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CommunicationsCheckNameAvailabilityInput,
    outputSchema: CommunicationsCheckNameAvailabilityOutput,
  }));
// Input Schema
export const CommunicationsCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    supportTicketName: Schema.String.pipe(T.PathParam()),
    communicationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Support/supportTickets/{supportTicketName}/communications/{communicationName}",
    }),
  );
export type CommunicationsCreateInput = typeof CommunicationsCreateInput.Type;

// Output Schema
export const CommunicationsCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type CommunicationsCreateOutput = typeof CommunicationsCreateOutput.Type;

// The operation
/**
 * Adds a new customer communication to an Azure support ticket.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param supportTicketName - The name of the SupportTicketDetails
 * @param communicationName - The name of the CommunicationDetails
 */
export const CommunicationsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CommunicationsCreateInput,
    outputSchema: CommunicationsCreateOutput,
  }),
);
// Input Schema
export const CommunicationsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    supportTicketName: Schema.String.pipe(T.PathParam()),
    communicationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.Support/supportTickets/{supportTicketName}/communications/{communicationName}",
  }),
);
export type CommunicationsGetInput = typeof CommunicationsGetInput.Type;

// Output Schema
export const CommunicationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type CommunicationsGetOutput = typeof CommunicationsGetOutput.Type;

// The operation
/**
 * Returns communication details for a support ticket.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param supportTicketName - The name of the SupportTicketDetails
 * @param communicationName - The name of the CommunicationDetails
 */
export const CommunicationsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CommunicationsGetInput,
  outputSchema: CommunicationsGetOutput,
}));
// Input Schema
export const CommunicationsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    supportTicketName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $top: Schema.optional(Schema.Number),
    $filter: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Support/supportTickets/{supportTicketName}/communications",
    }),
  );
export type CommunicationsListInput = typeof CommunicationsListInput.Type;

// Output Schema
export const CommunicationsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
  });
export type CommunicationsListOutput = typeof CommunicationsListOutput.Type;

// The operation
/**
 * Lists all communications (attachments not included) for a support ticket. <br/></br> You can also filter support ticket communications by _CreatedDate_ or _CommunicationType_ using the $filter parameter. The only type of communication supported today is _Web_. Output will be a paged result with _nextLink_, using which you can retrieve the next set of Communication results. <br/><br/>Support ticket data is available for 18 months after ticket creation. If a ticket was created more than 18 months ago, a request for data might cause an error.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param supportTicketName - The name of the SupportTicketDetails
 * @param $top - The number of values to return in the collection. Default is 10 and max is 10.
 * @param $filter - The filter to apply on the operation. You can filter by communicationType and createdDate properties. CommunicationType supports Equals ('eq') operator and createdDate supports Greater Than ('gt') and Greater Than or Equals ('ge') operators. You may combine the CommunicationType and CreatedDate filters by Logical And ('and') operator.
 */
export const CommunicationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CommunicationsListInput,
  outputSchema: CommunicationsListOutput,
}));
// Input Schema
export const CommunicationsNoSubscriptionCheckNameAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    supportTicketName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.Support/supportTickets/{supportTicketName}/checkNameAvailability",
    }),
  );
export type CommunicationsNoSubscriptionCheckNameAvailabilityInput =
  typeof CommunicationsNoSubscriptionCheckNameAvailabilityInput.Type;

// Output Schema
export const CommunicationsNoSubscriptionCheckNameAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nameAvailable: Schema.optional(Schema.Boolean),
    reason: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
  });
export type CommunicationsNoSubscriptionCheckNameAvailabilityOutput =
  typeof CommunicationsNoSubscriptionCheckNameAvailabilityOutput.Type;

// The operation
/**
 * Check the availability of a resource name. This API should be used to check the uniqueness of the name for adding a new communication to the support ticket.
 *
 * @param api-version - The API version to use for this operation.
 * @param supportTicketName - The name of the SupportTicketDetails
 */
export const CommunicationsNoSubscriptionCheckNameAvailability =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CommunicationsNoSubscriptionCheckNameAvailabilityInput,
    outputSchema: CommunicationsNoSubscriptionCheckNameAvailabilityOutput,
  }));
// Input Schema
export const CommunicationsNoSubscriptionCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    supportTicketName: Schema.String.pipe(T.PathParam()),
    communicationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/providers/Microsoft.Support/supportTickets/{supportTicketName}/communications/{communicationName}",
    }),
  );
export type CommunicationsNoSubscriptionCreateInput =
  typeof CommunicationsNoSubscriptionCreateInput.Type;

// Output Schema
export const CommunicationsNoSubscriptionCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type CommunicationsNoSubscriptionCreateOutput =
  typeof CommunicationsNoSubscriptionCreateOutput.Type;

// The operation
/**
 * Adds a new customer communication to an Azure support ticket.
 *
 * @param api-version - The API version to use for this operation.
 * @param supportTicketName - The name of the SupportTicketDetails
 * @param communicationName - The name of the CommunicationDetails
 */
export const CommunicationsNoSubscriptionCreate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CommunicationsNoSubscriptionCreateInput,
    outputSchema: CommunicationsNoSubscriptionCreateOutput,
  }));
// Input Schema
export const CommunicationsNoSubscriptionGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    supportTicketName: Schema.String.pipe(T.PathParam()),
    communicationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Support/supportTickets/{supportTicketName}/communications/{communicationName}",
    }),
  );
export type CommunicationsNoSubscriptionGetInput =
  typeof CommunicationsNoSubscriptionGetInput.Type;

// Output Schema
export const CommunicationsNoSubscriptionGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type CommunicationsNoSubscriptionGetOutput =
  typeof CommunicationsNoSubscriptionGetOutput.Type;

// The operation
/**
 * Returns communication details for a support ticket.
 *
 * @param api-version - The API version to use for this operation.
 * @param supportTicketName - The name of the SupportTicketDetails
 * @param communicationName - The name of the CommunicationDetails
 */
export const CommunicationsNoSubscriptionGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CommunicationsNoSubscriptionGetInput,
    outputSchema: CommunicationsNoSubscriptionGetOutput,
  }));
// Input Schema
export const CommunicationsNoSubscriptionListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    supportTicketName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $top: Schema.optional(Schema.Number),
    $filter: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Support/supportTickets/{supportTicketName}/communications",
    }),
  );
export type CommunicationsNoSubscriptionListInput =
  typeof CommunicationsNoSubscriptionListInput.Type;

// Output Schema
export const CommunicationsNoSubscriptionListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
  });
export type CommunicationsNoSubscriptionListOutput =
  typeof CommunicationsNoSubscriptionListOutput.Type;

// The operation
/**
 * Lists all communications (attachments not included) for a support ticket. <br/></br> You can also filter support ticket communications by _CreatedDate_ or _CommunicationType_ using the $filter parameter. The only type of communication supported today is _Web_. Output will be a paged result with _nextLink_, using which you can retrieve the next set of Communication results. <br/><br/>Support ticket data is available for 18 months after ticket creation. If a ticket was created more than 18 months ago, a request for data might cause an error.
 *
 * @param api-version - The API version to use for this operation.
 * @param supportTicketName - The name of the SupportTicketDetails
 * @param $top - The number of values to return in the collection. Default is 10 and max is 10.
 * @param $filter - The filter to apply on the operation. You can filter by communicationType and createdDate properties. CommunicationType supports Equals ('eq') operator and createdDate supports Greater Than ('gt') and Greater Than or Equals ('ge') operators. You may combine the CommunicationType and CreatedDate filters by Logical And ('and') operator.
 */
export const CommunicationsNoSubscriptionList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CommunicationsNoSubscriptionListInput,
    outputSchema: CommunicationsNoSubscriptionListOutput,
  }));
// Input Schema
export const FilesCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  fileWorkspaceName: Schema.String.pipe(T.PathParam()),
  fileName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.Support/fileWorkspaces/{fileWorkspaceName}/files/{fileName}",
  }),
);
export type FilesCreateInput = typeof FilesCreateInput.Type;

// Output Schema
export const FilesCreateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type FilesCreateOutput = typeof FilesCreateOutput.Type;

// The operation
/**
 * Creates a new file under a workspace for the specified subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param fileWorkspaceName - The name of the FileWorkspaceDetails
 * @param fileName - The name of the FileDetails
 */
export const FilesCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FilesCreateInput,
  outputSchema: FilesCreateOutput,
}));
// Input Schema
export const FilesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  fileWorkspaceName: Schema.String.pipe(T.PathParam()),
  fileName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.Support/fileWorkspaces/{fileWorkspaceName}/files/{fileName}",
  }),
);
export type FilesGetInput = typeof FilesGetInput.Type;

// Output Schema
export const FilesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type FilesGetOutput = typeof FilesGetOutput.Type;

// The operation
/**
 * Returns details of a specific file in a work space.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param fileWorkspaceName - The name of the FileWorkspaceDetails
 * @param fileName - The name of the FileDetails
 */
export const FilesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FilesGetInput,
  outputSchema: FilesGetOutput,
}));
// Input Schema
export const FilesListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  fileWorkspaceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.Support/fileWorkspaces/{fileWorkspaceName}/files",
  }),
);
export type FilesListInput = typeof FilesListInput.Type;

// Output Schema
export const FilesListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  nextLink: Schema.optional(Schema.String),
  value: Schema.optional(Schema.Array(Schema.Struct({}))),
});
export type FilesListOutput = typeof FilesListOutput.Type;

// The operation
/**
 * Lists all the Files information under a workspace for an Azure subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param fileWorkspaceName - The name of the FileWorkspaceDetails
 */
export const FilesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FilesListInput,
  outputSchema: FilesListOutput,
}));
// Input Schema
export const FilesNoSubscriptionCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    fileWorkspaceName: Schema.String.pipe(T.PathParam()),
    fileName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/providers/Microsoft.Support/fileWorkspaces/{fileWorkspaceName}/files/{fileName}",
    }),
  );
export type FilesNoSubscriptionCreateInput =
  typeof FilesNoSubscriptionCreateInput.Type;

// Output Schema
export const FilesNoSubscriptionCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type FilesNoSubscriptionCreateOutput =
  typeof FilesNoSubscriptionCreateOutput.Type;

// The operation
/**
 * Creates a new file under a workspace.
 *
 * @param api-version - The API version to use for this operation.
 * @param fileWorkspaceName - The name of the FileWorkspaceDetails
 * @param fileName - The name of the FileDetails
 */
export const FilesNoSubscriptionCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: FilesNoSubscriptionCreateInput,
    outputSchema: FilesNoSubscriptionCreateOutput,
  }),
);
// Input Schema
export const FilesNoSubscriptionGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    fileWorkspaceName: Schema.String.pipe(T.PathParam()),
    fileName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Support/fileWorkspaces/{fileWorkspaceName}/files/{fileName}",
    }),
  );
export type FilesNoSubscriptionGetInput =
  typeof FilesNoSubscriptionGetInput.Type;

// Output Schema
export const FilesNoSubscriptionGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type FilesNoSubscriptionGetOutput =
  typeof FilesNoSubscriptionGetOutput.Type;

// The operation
/**
 * Returns details of a specific file in a work space.
 *
 * @param api-version - The API version to use for this operation.
 * @param fileWorkspaceName - The name of the FileWorkspaceDetails
 * @param fileName - The name of the FileDetails
 */
export const FilesNoSubscriptionGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: FilesNoSubscriptionGetInput,
    outputSchema: FilesNoSubscriptionGetOutput,
  }),
);
// Input Schema
export const FilesNoSubscriptionListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    fileWorkspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Support/fileWorkspaces/{fileWorkspaceName}/files",
    }),
  );
export type FilesNoSubscriptionListInput =
  typeof FilesNoSubscriptionListInput.Type;

// Output Schema
export const FilesNoSubscriptionListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
  });
export type FilesNoSubscriptionListOutput =
  typeof FilesNoSubscriptionListOutput.Type;

// The operation
/**
 * Lists all the Files information under a workspace for an Azure subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param fileWorkspaceName - The name of the FileWorkspaceDetails
 */
export const FilesNoSubscriptionList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: FilesNoSubscriptionListInput,
    outputSchema: FilesNoSubscriptionListOutput,
  }),
);
// Input Schema
export const FilesNoSubscriptionUploadInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    fileWorkspaceName: Schema.String.pipe(T.PathParam()),
    fileName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.Support/fileWorkspaces/{fileWorkspaceName}/files/{fileName}/upload",
    }),
  );
export type FilesNoSubscriptionUploadInput =
  typeof FilesNoSubscriptionUploadInput.Type;

// Output Schema
export const FilesNoSubscriptionUploadOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type FilesNoSubscriptionUploadOutput =
  typeof FilesNoSubscriptionUploadOutput.Type;

// The operation
/**
 * This API allows you to upload content to a file
 *
 * @param api-version - The API version to use for this operation.
 * @param fileWorkspaceName - The name of the FileWorkspaceDetails
 * @param fileName - The name of the FileDetails
 */
export const FilesNoSubscriptionUpload = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: FilesNoSubscriptionUploadInput,
    outputSchema: FilesNoSubscriptionUploadOutput,
  }),
);
// Input Schema
export const FilesUploadInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  fileWorkspaceName: Schema.String.pipe(T.PathParam()),
  fileName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.Support/fileWorkspaces/{fileWorkspaceName}/files/{fileName}/upload",
  }),
);
export type FilesUploadInput = typeof FilesUploadInput.Type;

// Output Schema
export const FilesUploadOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type FilesUploadOutput = typeof FilesUploadOutput.Type;

// The operation
/**
 * This API allows you to upload content to a file
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param fileWorkspaceName - The name of the FileWorkspaceDetails
 * @param fileName - The name of the FileDetails
 */
export const FilesUpload = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FilesUploadInput,
  outputSchema: FilesUploadOutput,
}));
// Input Schema
export const FileWorkspacesCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    fileWorkspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Support/fileWorkspaces/{fileWorkspaceName}",
    }),
  );
export type FileWorkspacesCreateInput = typeof FileWorkspacesCreateInput.Type;

// Output Schema
export const FileWorkspacesCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type FileWorkspacesCreateOutput = typeof FileWorkspacesCreateOutput.Type;

// The operation
/**
 * Creates a new file workspace for the specified subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param fileWorkspaceName - The name of the FileWorkspaceDetails
 */
export const FileWorkspacesCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: FileWorkspacesCreateInput,
    outputSchema: FileWorkspacesCreateOutput,
  }),
);
// Input Schema
export const FileWorkspacesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    fileWorkspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.Support/fileWorkspaces/{fileWorkspaceName}",
  }),
);
export type FileWorkspacesGetInput = typeof FileWorkspacesGetInput.Type;

// Output Schema
export const FileWorkspacesGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type FileWorkspacesGetOutput = typeof FileWorkspacesGetOutput.Type;

// The operation
/**
 * Gets details for a specific file workspace in an Azure subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param fileWorkspaceName - The name of the FileWorkspaceDetails
 */
export const FileWorkspacesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: FileWorkspacesGetInput,
  outputSchema: FileWorkspacesGetOutput,
}));
// Input Schema
export const FileWorkspacesNoSubscriptionCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    fileWorkspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/providers/Microsoft.Support/fileWorkspaces/{fileWorkspaceName}",
    }),
  );
export type FileWorkspacesNoSubscriptionCreateInput =
  typeof FileWorkspacesNoSubscriptionCreateInput.Type;

// Output Schema
export const FileWorkspacesNoSubscriptionCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type FileWorkspacesNoSubscriptionCreateOutput =
  typeof FileWorkspacesNoSubscriptionCreateOutput.Type;

// The operation
/**
 * Creates a new file workspace.
 *
 * @param api-version - The API version to use for this operation.
 * @param fileWorkspaceName - The name of the FileWorkspaceDetails
 */
export const FileWorkspacesNoSubscriptionCreate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: FileWorkspacesNoSubscriptionCreateInput,
    outputSchema: FileWorkspacesNoSubscriptionCreateOutput,
  }));
// Input Schema
export const FileWorkspacesNoSubscriptionGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    fileWorkspaceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Support/fileWorkspaces/{fileWorkspaceName}",
    }),
  );
export type FileWorkspacesNoSubscriptionGetInput =
  typeof FileWorkspacesNoSubscriptionGetInput.Type;

// Output Schema
export const FileWorkspacesNoSubscriptionGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type FileWorkspacesNoSubscriptionGetOutput =
  typeof FileWorkspacesNoSubscriptionGetOutput.Type;

// The operation
/**
 * Gets details for a specific file workspace.
 *
 * @param api-version - The API version to use for this operation.
 * @param fileWorkspaceName - The name of the FileWorkspaceDetails
 */
export const FileWorkspacesNoSubscriptionGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: FileWorkspacesNoSubscriptionGetInput,
    outputSchema: FileWorkspacesNoSubscriptionGetOutput,
  }));
// Input Schema
export const ProblemClassificationsGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    serviceName: Schema.String.pipe(T.PathParam()),
    problemClassificationName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Support/services/{serviceName}/problemClassifications/{problemClassificationName}",
    }),
  );
export type ProblemClassificationsGetInput =
  typeof ProblemClassificationsGetInput.Type;

// Output Schema
export const ProblemClassificationsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ProblemClassificationsGetOutput =
  typeof ProblemClassificationsGetOutput.Type;

// The operation
/**
 * Get problem classification details for a specific Azure service.
 *
 * @param api-version - The API version to use for this operation.
 * @param serviceName - Name of the Azure service.
 * @param problemClassificationName - Name of problem classification.
 */
export const ProblemClassificationsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ProblemClassificationsGetInput,
    outputSchema: ProblemClassificationsGetOutput,
  }),
);
// Input Schema
export const ProblemClassificationsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    serviceName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Support/services/{serviceName}/problemClassifications",
    }),
  );
export type ProblemClassificationsListInput =
  typeof ProblemClassificationsListInput.Type;

// Output Schema
export const ProblemClassificationsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
  });
export type ProblemClassificationsListOutput =
  typeof ProblemClassificationsListOutput.Type;

// The operation
/**
 * Lists all the problem classifications (categories) available for a specific Azure service. Always use the service and problem classifications obtained programmatically. This practice ensures that you always have the most recent set of service and problem classification Ids.
 *
 * @param api-version - The API version to use for this operation.
 * @param serviceName - Name of the Azure service.
 */
export const ProblemClassificationsList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ProblemClassificationsListInput,
    outputSchema: ProblemClassificationsListOutput,
  }),
);
// Input Schema
export const ServicesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  serviceName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/providers/Microsoft.Support/services/{serviceName}",
  }),
);
export type ServicesGetInput = typeof ServicesGetInput.Type;

// Output Schema
export const ServicesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type ServicesGetOutput = typeof ServicesGetOutput.Type;

// The operation
/**
 * Gets a specific Azure service for support ticket creation.
 *
 * @param api-version - The API version to use for this operation.
 * @param serviceName - Name of the Azure service.
 */
export const ServicesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServicesGetInput,
  outputSchema: ServicesGetOutput,
}));
// Input Schema
export const ServicesListInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  "api-version": Schema.String,
}).pipe(
  T.Http({ method: "GET", path: "/providers/Microsoft.Support/services" }),
);
export type ServicesListInput = typeof ServicesListInput.Type;

// Output Schema
export const ServicesListOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  nextLink: Schema.optional(Schema.String),
  value: Schema.optional(Schema.Array(Schema.Struct({}))),
});
export type ServicesListOutput = typeof ServicesListOutput.Type;

// The operation
/**
 * Lists all the Azure services available for support ticket creation. For **Technical** issues, select the Service Id that maps to the Azure service/product as displayed in the **Services** drop-down list on the Azure portal's [New support request](https://portal.azure.com/#blade/Microsoft_Azure_Support/HelpAndSupportBlade/overview) page. Always use the service and its corresponding problem classification(s) obtained programmatically for support ticket creation. This practice ensures that you always have the most recent set of service and problem classification Ids.
 *
 * @param api-version - The API version to use for this operation.
 */
export const ServicesList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ServicesListInput,
  outputSchema: ServicesListOutput,
}));
// Input Schema
export const SupportTicketsCheckNameAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Support/checkNameAvailability",
    }),
  );
export type SupportTicketsCheckNameAvailabilityInput =
  typeof SupportTicketsCheckNameAvailabilityInput.Type;

// Output Schema
export const SupportTicketsCheckNameAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nameAvailable: Schema.optional(Schema.Boolean),
    reason: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
  });
export type SupportTicketsCheckNameAvailabilityOutput =
  typeof SupportTicketsCheckNameAvailabilityOutput.Type;

// The operation
/**
 * Check the availability of a resource name. This API should be used to check the uniqueness of the name for support ticket creation for the selected subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 */
export const SupportTicketsCheckNameAvailability =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SupportTicketsCheckNameAvailabilityInput,
    outputSchema: SupportTicketsCheckNameAvailabilityOutput,
  }));
// Input Schema
export const SupportTicketsCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    supportTicketName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Support/supportTickets/{supportTicketName}",
    }),
  );
export type SupportTicketsCreateInput = typeof SupportTicketsCreateInput.Type;

// Output Schema
export const SupportTicketsCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SupportTicketsCreateOutput = typeof SupportTicketsCreateOutput.Type;

// The operation
/**
 * Creates a new support ticket for Subscription and Service limits (Quota), Technical, Billing, and Subscription Management issues for the specified subscription. Learn the [prerequisites](https://aka.ms/supportAPI) required to create a support ticket.<br/><br/>Always call the Services and ProblemClassifications API to get the most recent set of services and problem categories required for support ticket creation.<br/><br/>Adding attachments is not currently supported via the API. To add a file to an existing support ticket, visit the [Manage support ticket](https://portal.azure.com/#blade/Microsoft_Azure_Support/HelpAndSupportBlade/managesupportrequest) page in the Azure portal, select the support ticket, and use the file upload control to add a new file.<br/><br/>Providing consent to share diagnostic information with Azure support is currently not supported via the API. The Azure support engineer working on your ticket will reach out to you for consent if your issue requires gathering diagnostic information from your Azure resources.<br/><br/>**Creating a support ticket for on-behalf-of**: Include _x-ms-authorization-auxiliary_ header to provide an auxiliary token as per [documentation](https://docs.microsoft.com/azure/azure-resource-manager/management/authenticate-multi-tenant). The primary token will be from the tenant for whom a support ticket is being raised against the subscription, i.e. Cloud solution provider (CSP) customer tenant. The auxiliary token will be from the Cloud solution provider (CSP) partner tenant.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param supportTicketName - The name of the SupportTicketDetails
 */
export const SupportTicketsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SupportTicketsCreateInput,
    outputSchema: SupportTicketsCreateOutput,
  }),
);
// Input Schema
export const SupportTicketsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    subscriptionId: Schema.String.pipe(T.PathParam()),
    supportTicketName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/providers/Microsoft.Support/supportTickets/{supportTicketName}",
  }),
);
export type SupportTicketsGetInput = typeof SupportTicketsGetInput.Type;

// Output Schema
export const SupportTicketsGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SupportTicketsGetOutput = typeof SupportTicketsGetOutput.Type;

// The operation
/**
 * Get ticket details for an Azure subscription. Support ticket data is available for 18 months after ticket creation. If a ticket was created more than 18 months ago, a request for data might cause an error.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param supportTicketName - The name of the SupportTicketDetails
 */
export const SupportTicketsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SupportTicketsGetInput,
  outputSchema: SupportTicketsGetOutput,
}));
// Input Schema
export const SupportTicketsListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $top: Schema.optional(Schema.Number),
    $filter: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Support/supportTickets",
    }),
  );
export type SupportTicketsListInput = typeof SupportTicketsListInput.Type;

// Output Schema
export const SupportTicketsListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
  });
export type SupportTicketsListOutput = typeof SupportTicketsListOutput.Type;

// The operation
/**
 * Lists all the support tickets for an Azure subscription. You can also filter the support tickets by _Status_, _CreatedDate_, _ServiceId_, and _ProblemClassificationId_ using the $filter parameter. Output will be a paged result with _nextLink_, using which you can retrieve the next set of support tickets. <br/><br/>Support ticket data is available for 18 months after ticket creation. If a ticket was created more than 18 months ago, a request for data might cause an error.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param $top - The number of values to return in the collection. Default is 25 and max is 100.
 * @param $filter - The filter to apply on the operation. We support 'odata v4.0' filter semantics. [Learn more](https://docs.microsoft.com/odata/concepts/queryoptions-overview). _Status_, _ServiceId_, and _ProblemClassificationId_ filters can only be used with Equals ('eq') operator. For _CreatedDate_ filter, the supported operators are Greater Than ('gt') and Greater Than or Equals ('ge'). When using both filters, combine them using the logical 'AND'.
 */
export const SupportTicketsList = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SupportTicketsListInput,
  outputSchema: SupportTicketsListOutput,
}));
// Input Schema
export const SupportTicketsNoSubscriptionCheckNameAvailabilityInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/providers/Microsoft.Support/checkNameAvailability",
    }),
  );
export type SupportTicketsNoSubscriptionCheckNameAvailabilityInput =
  typeof SupportTicketsNoSubscriptionCheckNameAvailabilityInput.Type;

// Output Schema
export const SupportTicketsNoSubscriptionCheckNameAvailabilityOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nameAvailable: Schema.optional(Schema.Boolean),
    reason: Schema.optional(Schema.String),
    message: Schema.optional(Schema.String),
  });
export type SupportTicketsNoSubscriptionCheckNameAvailabilityOutput =
  typeof SupportTicketsNoSubscriptionCheckNameAvailabilityOutput.Type;

// The operation
/**
 * Check the availability of a resource name. This API should be used to check the uniqueness of the name for support ticket creation for the selected subscription.
 *
 * @param api-version - The API version to use for this operation.
 */
export const SupportTicketsNoSubscriptionCheckNameAvailability =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SupportTicketsNoSubscriptionCheckNameAvailabilityInput,
    outputSchema: SupportTicketsNoSubscriptionCheckNameAvailabilityOutput,
  }));
// Input Schema
export const SupportTicketsNoSubscriptionCreateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    supportTicketName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/providers/Microsoft.Support/supportTickets/{supportTicketName}",
    }),
  );
export type SupportTicketsNoSubscriptionCreateInput =
  typeof SupportTicketsNoSubscriptionCreateInput.Type;

// Output Schema
export const SupportTicketsNoSubscriptionCreateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SupportTicketsNoSubscriptionCreateOutput =
  typeof SupportTicketsNoSubscriptionCreateOutput.Type;

// The operation
/**
 * Creates a new support ticket for Billing, and Subscription Management issues. Learn the [prerequisites](https://aka.ms/supportAPI) required to create a support ticket.<br/><br/>Always call the Services and ProblemClassifications API to get the most recent set of services and problem categories required for support ticket creation.<br/><br/>Adding attachments is not currently supported via the API. To add a file to an existing support ticket, visit the [Manage support ticket](https://portal.azure.com/#blade/Microsoft_Azure_Support/HelpAndSupportBlade/managesupportrequest) page in the Azure portal, select the support ticket, and use the file upload control to add a new file.<br/><br/>Providing consent to share diagnostic information with Azure support is currently not supported via the API. The Azure support engineer working on your ticket will reach out to you for consent if your issue requires gathering diagnostic information from your Azure resources.<br/><br/>
 *
 * @param api-version - The API version to use for this operation.
 * @param supportTicketName - The name of the SupportTicketDetails
 */
export const SupportTicketsNoSubscriptionCreate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SupportTicketsNoSubscriptionCreateInput,
    outputSchema: SupportTicketsNoSubscriptionCreateOutput,
  }));
// Input Schema
export const SupportTicketsNoSubscriptionGetInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    supportTicketName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Support/supportTickets/{supportTicketName}",
    }),
  );
export type SupportTicketsNoSubscriptionGetInput =
  typeof SupportTicketsNoSubscriptionGetInput.Type;

// Output Schema
export const SupportTicketsNoSubscriptionGetOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SupportTicketsNoSubscriptionGetOutput =
  typeof SupportTicketsNoSubscriptionGetOutput.Type;

// The operation
/**
 * Gets details for a specific support ticket. Support ticket data is available for 18 months after ticket creation. If a ticket was created more than 18 months ago, a request for data might cause an error.
 *
 * @param api-version - The API version to use for this operation.
 * @param supportTicketName - The name of the SupportTicketDetails
 */
export const SupportTicketsNoSubscriptionGet =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SupportTicketsNoSubscriptionGetInput,
    outputSchema: SupportTicketsNoSubscriptionGetOutput,
  }));
// Input Schema
export const SupportTicketsNoSubscriptionListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    "api-version": Schema.String,
    $top: Schema.optional(Schema.Number),
    $filter: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/providers/Microsoft.Support/supportTickets",
    }),
  );
export type SupportTicketsNoSubscriptionListInput =
  typeof SupportTicketsNoSubscriptionListInput.Type;

// Output Schema
export const SupportTicketsNoSubscriptionListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    nextLink: Schema.optional(Schema.String),
    value: Schema.optional(Schema.Array(Schema.Struct({}))),
  });
export type SupportTicketsNoSubscriptionListOutput =
  typeof SupportTicketsNoSubscriptionListOutput.Type;

// The operation
/**
 * Lists all the support tickets. <br/><br/>You can also filter the support tickets by <i>Status</i>, <i>CreatedDate</i>, , <i>ServiceId</i>, and <i>ProblemClassificationId</i> using the $filter parameter. Output will be a paged result with <i>nextLink</i>, using which you can retrieve the next set of support tickets. <br/><br/>Support ticket data is available for 18 months after ticket creation. If a ticket was created more than 18 months ago, a request for data might cause an error.
 *
 * @param api-version - The API version to use for this operation.
 * @param $top - The number of values to return in the collection. Default is 25 and max is 100.
 * @param $filter - The filter to apply on the operation. We support 'odata v4.0' filter semantics. <a target='_blank' href='https://docs.microsoft.com/odata/concepts/queryoptions-overview'>Learn more</a> <br/><i>Status</i> , <i>ServiceId</i>, and <i>ProblemClassificationId</i> filters can only be used with 'eq' operator. For <i>CreatedDate</i> filter, the supported operators are 'gt' and 'ge'. When using both filters, combine them using the logical 'AND'.
 */
export const SupportTicketsNoSubscriptionList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SupportTicketsNoSubscriptionListInput,
    outputSchema: SupportTicketsNoSubscriptionListOutput,
  }));
// Input Schema
export const SupportTicketsNoSubscriptionUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    supportTicketName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/providers/Microsoft.Support/supportTickets/{supportTicketName}",
    }),
  );
export type SupportTicketsNoSubscriptionUpdateInput =
  typeof SupportTicketsNoSubscriptionUpdateInput.Type;

// Output Schema
export const SupportTicketsNoSubscriptionUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SupportTicketsNoSubscriptionUpdateOutput =
  typeof SupportTicketsNoSubscriptionUpdateOutput.Type;

// The operation
/**
 * This API allows you to update the severity level, ticket status, and your contact information in the support ticket.<br/><br/>Note: The severity levels cannot be changed if a support ticket is actively being worked upon by an Azure support engineer. In such a case, contact your support engineer to request severity update by adding a new communication using the Communications API.
 *
 * @param api-version - The API version to use for this operation.
 * @param supportTicketName - The name of the SupportTicketDetails
 */
export const SupportTicketsNoSubscriptionUpdate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: SupportTicketsNoSubscriptionUpdateInput,
    outputSchema: SupportTicketsNoSubscriptionUpdateOutput,
  }));
// Input Schema
export const SupportTicketsUpdateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    supportTicketName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.Support/supportTickets/{supportTicketName}",
    }),
  );
export type SupportTicketsUpdateInput = typeof SupportTicketsUpdateInput.Type;

// Output Schema
export const SupportTicketsUpdateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type SupportTicketsUpdateOutput = typeof SupportTicketsUpdateOutput.Type;

// The operation
/**
 * This API allows you to update the severity level, ticket status, advanced diagnostic consent and your contact information in the support ticket.<br/><br/>Note: The severity levels cannot be changed if a support ticket is actively being worked upon by an Azure support engineer. In such a case, contact your support engineer to request severity update by adding a new communication using the Communications API.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param supportTicketName - The name of the SupportTicketDetails
 */
export const SupportTicketsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: SupportTicketsUpdateInput,
    outputSchema: SupportTicketsUpdateOutput,
  }),
);
