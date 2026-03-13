/**
 * Azure Edgeorder API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const AddressesCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  addressName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EdgeOrder/addresses/{addressName}",
  }),
);
export type AddressesCreateInput = typeof AddressesCreateInput.Type;

// Output Schema
export const AddressesCreateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type AddressesCreateOutput = typeof AddressesCreateOutput.Type;

// The operation
/**
 * Create a new address with the specified parameters. Existing address cannot be updated with this API and should
 * instead be updated with the Update address API.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param addressName - The name of the address Resource within the specified resource group. address names must be between 3 and 24 characters in length and use any alphanumeric and underscore only.
 */
export const AddressesCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AddressesCreateInput,
  outputSchema: AddressesCreateOutput,
}));
// Input Schema
export const AddressesDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  addressName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EdgeOrder/addresses/{addressName}",
  }),
);
export type AddressesDeleteInput = typeof AddressesDeleteInput.Type;

// Output Schema
export const AddressesDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AddressesDeleteOutput = typeof AddressesDeleteOutput.Type;

// The operation
/**
 * Delete an address.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param addressName - The name of the address Resource within the specified resource group. address names must be between 3 and 24 characters in length and use any alphanumeric and underscore only.
 */
export const AddressesDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AddressesDeleteInput,
  outputSchema: AddressesDeleteOutput,
}));
// Input Schema
export const AddressesGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  addressName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EdgeOrder/addresses/{addressName}",
  }),
);
export type AddressesGetInput = typeof AddressesGetInput.Type;

// Output Schema
export const AddressesGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type AddressesGetOutput = typeof AddressesGetOutput.Type;

// The operation
/**
 * Get information about the specified address.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param addressName - The name of the address Resource within the specified resource group. address names must be between 3 and 24 characters in length and use any alphanumeric and underscore only.
 */
export const AddressesGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AddressesGetInput,
  outputSchema: AddressesGetOutput,
}));
// Input Schema
export const AddressesListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $filter: Schema.optional(Schema.String),
    $skipToken: Schema.optional(Schema.String),
    $top: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EdgeOrder/addresses",
    }),
  );
export type AddressesListByResourceGroupInput =
  typeof AddressesListByResourceGroupInput.Type;

// Output Schema
export const AddressesListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type AddressesListByResourceGroupOutput =
  typeof AddressesListByResourceGroupOutput.Type;

// The operation
/**
 * List all the addresses available under the given resource group.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param $filter - $filter is supported to filter based on shipping address properties. Filter supports only equals operation.
 * @param $skipToken - $skipToken is supported on Get list of addresses, which provides the next page in the list of addresses.
 * @param $top - $top is supported on fetching list of resources. $top=10 means that the first 10 items in the list will be returned to the API caller.
 */
export const AddressesListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: AddressesListByResourceGroupInput,
    outputSchema: AddressesListByResourceGroupOutput,
  }));
// Input Schema
export const AddressesListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $filter: Schema.optional(Schema.String),
    $skipToken: Schema.optional(Schema.String),
    $top: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.EdgeOrder/addresses",
    }),
  );
export type AddressesListBySubscriptionInput =
  typeof AddressesListBySubscriptionInput.Type;

// Output Schema
export const AddressesListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type AddressesListBySubscriptionOutput =
  typeof AddressesListBySubscriptionOutput.Type;

// The operation
/**
 * List all the addresses available under the subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param $filter - $filter is supported to filter based on shipping address properties. Filter supports only equals operation.
 * @param $skipToken - $skipToken is supported on Get list of addresses, which provides the next page in the list of addresses.
 * @param $top - $top is supported on fetching list of resources. $top=10 means that the first 10 items in the list will be returned to the API caller.
 */
export const AddressesListBySubscription = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AddressesListBySubscriptionInput,
    outputSchema: AddressesListBySubscriptionOutput,
  }),
);
// Input Schema
export const AddressesUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  addressName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EdgeOrder/addresses/{addressName}",
  }),
);
export type AddressesUpdateInput = typeof AddressesUpdateInput.Type;

// Output Schema
export const AddressesUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type AddressesUpdateOutput = typeof AddressesUpdateOutput.Type;

// The operation
/**
 * Update the properties of an existing address.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param addressName - The name of the address Resource within the specified resource group. address names must be between 3 and 24 characters in length and use any alphanumeric and underscore only.
 * @param If-Match - Defines the If-Match condition. The patch will be performed only if the ETag of the job on the server matches this value.
 */
export const AddressesUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: AddressesUpdateInput,
  outputSchema: AddressesUpdateOutput,
}));
// Input Schema
export const OrderItemsCancelInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  orderItemName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EdgeOrder/orderItems/{orderItemName}/cancel",
  }),
);
export type OrderItemsCancelInput = typeof OrderItemsCancelInput.Type;

// Output Schema
export const OrderItemsCancelOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type OrderItemsCancelOutput = typeof OrderItemsCancelOutput.Type;

// The operation
/**
 * Cancel order item.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param orderItemName - The name of the order item.
 */
export const OrderItemsCancel = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OrderItemsCancelInput,
  outputSchema: OrderItemsCancelOutput,
}));
// Input Schema
export const OrderItemsCreateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  orderItemName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PUT",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EdgeOrder/orderItems/{orderItemName}",
  }),
);
export type OrderItemsCreateInput = typeof OrderItemsCreateInput.Type;

// Output Schema
export const OrderItemsCreateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  },
);
export type OrderItemsCreateOutput = typeof OrderItemsCreateOutput.Type;

// The operation
/**
 * Create an order item. Existing order item cannot be updated with this api and should instead be updated with the Update order item
 * API.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param orderItemName - The name of the order item.
 */
export const OrderItemsCreate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OrderItemsCreateInput,
  outputSchema: OrderItemsCreateOutput,
}));
// Input Schema
export const OrderItemsDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  orderItemName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EdgeOrder/orderItems/{orderItemName}",
  }),
);
export type OrderItemsDeleteInput = typeof OrderItemsDeleteInput.Type;

// Output Schema
export const OrderItemsDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type OrderItemsDeleteOutput = typeof OrderItemsDeleteOutput.Type;

// The operation
/**
 * Delete an order item.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param orderItemName - The name of the order item.
 */
export const OrderItemsDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OrderItemsDeleteInput,
  outputSchema: OrderItemsDeleteOutput,
}));
// Input Schema
export const OrderItemsGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  orderItemName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
  $expand: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EdgeOrder/orderItems/{orderItemName}",
  }),
);
export type OrderItemsGetInput = typeof OrderItemsGetInput.Type;

// Output Schema
export const OrderItemsGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  location: Schema.String,
});
export type OrderItemsGetOutput = typeof OrderItemsGetOutput.Type;

// The operation
/**
 * Get an order item.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param orderItemName - The name of the order item.
 * @param $expand - $expand is supported on parent device details, device details, forward shipping details and reverse shipping details parameters. Each of these can be provided as a comma separated list. Parent Device Details for order item provides details on the devices of the product, Device Details for order item provides details on the devices of the child configurations of the product, Forward and Reverse Shipping details provide forward and reverse shipping details respectively.
 */
export const OrderItemsGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OrderItemsGetInput,
  outputSchema: OrderItemsGetOutput,
}));
// Input Schema
export const OrderItemsListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $filter: Schema.optional(Schema.String),
    $expand: Schema.optional(Schema.String),
    $skipToken: Schema.optional(Schema.String),
    $top: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EdgeOrder/orderItems",
    }),
  );
export type OrderItemsListByResourceGroupInput =
  typeof OrderItemsListByResourceGroupInput.Type;

// Output Schema
export const OrderItemsListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type OrderItemsListByResourceGroupOutput =
  typeof OrderItemsListByResourceGroupOutput.Type;

// The operation
/**
 * List order items at resource group level.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param $filter - $filter is supported to filter based on order id and order Item Type. Filter supports only equals operation.
 * @param $expand - $expand is supported on parent device details, device details, forward shipping details and reverse shipping details parameters. Each of these can be provided as a comma separated list. Parent Device Details for order item provides details on the devices of the product, Device Details for order item provides details on the devices of the child configurations of the product, Forward and Reverse Shipping details provide forward and reverse shipping details respectively.
 * @param $skipToken - $skipToken is supported on Get list of order items, which provides the next page in the list of order items.
 * @param $top - $top is supported on fetching list of resources. $top=10 means that the first 10 items in the list will be returned to the API caller.
 */
export const OrderItemsListByResourceGroup =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: OrderItemsListByResourceGroupInput,
    outputSchema: OrderItemsListByResourceGroupOutput,
  }));
// Input Schema
export const OrderItemsListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $filter: Schema.optional(Schema.String),
    $expand: Schema.optional(Schema.String),
    $skipToken: Schema.optional(Schema.String),
    $top: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.EdgeOrder/orderItems",
    }),
  );
export type OrderItemsListBySubscriptionInput =
  typeof OrderItemsListBySubscriptionInput.Type;

// Output Schema
export const OrderItemsListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
        location: Schema.String,
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type OrderItemsListBySubscriptionOutput =
  typeof OrderItemsListBySubscriptionOutput.Type;

// The operation
/**
 * List order items at subscription level.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param $filter - $filter is supported to filter based on order id and order Item Type. Filter supports only equals operation.
 * @param $expand - $expand is supported on parent device details, device details, forward shipping details and reverse shipping details parameters. Each of these can be provided as a comma separated list. Parent Device Details for order item provides details on the devices of the product, Device Details for order item provides details on the devices of the child configurations of the product, Forward and Reverse Shipping details provide forward and reverse shipping details respectively.
 * @param $skipToken - $skipToken is supported on Get list of order items, which provides the next page in the list of order items.
 * @param $top - $top is supported on fetching list of resources. $top=10 means that the first 10 items in the list will be returned to the API caller.
 */
export const OrderItemsListBySubscription =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: OrderItemsListBySubscriptionInput,
    outputSchema: OrderItemsListBySubscriptionOutput,
  }));
// Input Schema
export const OrderItemsReturnInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  orderItemName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "POST",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EdgeOrder/orderItems/{orderItemName}/return",
  }),
);
export type OrderItemsReturnInput = typeof OrderItemsReturnInput.Type;

// Output Schema
export const OrderItemsReturnOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type OrderItemsReturnOutput = typeof OrderItemsReturnOutput.Type;

// The operation
/**
 * Return order item.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param orderItemName - The name of the order item.
 */
export const OrderItemsReturn = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OrderItemsReturnInput,
  outputSchema: OrderItemsReturnOutput,
}));
// Input Schema
export const OrderItemsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  orderItemName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EdgeOrder/orderItems/{orderItemName}",
  }),
);
export type OrderItemsUpdateInput = typeof OrderItemsUpdateInput.Type;

// Output Schema
export const OrderItemsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    location: Schema.String,
  },
);
export type OrderItemsUpdateOutput = typeof OrderItemsUpdateOutput.Type;

// The operation
/**
 * Update the properties of an existing order item.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param orderItemName - The name of the order item.
 * @param If-Match - Defines the If-Match condition. The patch will be performed only if the ETag of the order on the server matches this value.
 */
export const OrderItemsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OrderItemsUpdateInput,
  outputSchema: OrderItemsUpdateOutput,
}));
// Input Schema
export const OrdersGetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  location: Schema.String.pipe(T.PathParam()),
  orderName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "GET",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EdgeOrder/locations/{location}/orders/{orderName}",
  }),
);
export type OrdersGetInput = typeof OrdersGetInput.Type;

// Output Schema
export const OrdersGetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({});
export type OrdersGetOutput = typeof OrdersGetOutput.Type;

// The operation
/**
 * Get an order.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param location - The name of the Azure region.
 * @param orderName - The name of the order.
 */
export const OrdersGet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: OrdersGetInput,
  outputSchema: OrdersGetOutput,
}));
// Input Schema
export const OrdersListByResourceGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    resourceGroupName: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $skipToken: Schema.optional(Schema.String),
    $top: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EdgeOrder/orders",
    }),
  );
export type OrdersListByResourceGroupInput =
  typeof OrdersListByResourceGroupInput.Type;

// Output Schema
export const OrdersListByResourceGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type OrdersListByResourceGroupOutput =
  typeof OrdersListByResourceGroupOutput.Type;

// The operation
/**
 * List orders at resource group level.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param $skipToken - $skipToken is supported on Get list of orders, which provides the next page in the list of orders.
 * @param $top - $top is supported on fetching list of resources. $top=10 means that the first 10 items in the list will be returned to the API caller.
 */
export const OrdersListByResourceGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: OrdersListByResourceGroupInput,
    outputSchema: OrdersListByResourceGroupOutput,
  }),
);
// Input Schema
export const OrdersListBySubscriptionInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $skipToken: Schema.optional(Schema.String),
    $top: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.EdgeOrder/orders",
    }),
  );
export type OrdersListBySubscriptionInput =
  typeof OrdersListBySubscriptionInput.Type;

// Output Schema
export const OrdersListBySubscriptionOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(Schema.Struct({})),
    nextLink: Schema.optional(Schema.String),
  });
export type OrdersListBySubscriptionOutput =
  typeof OrdersListBySubscriptionOutput.Type;

// The operation
/**
 * List orders at subscription level.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param $skipToken - $skipToken is supported on Get list of orders, which provides the next page in the list of orders.
 * @param $top - $top is supported on fetching list of resources. $top=10 means that the first 10 items in the list will be returned to the API caller.
 */
export const OrdersListBySubscription = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: OrdersListBySubscriptionInput,
    outputSchema: OrdersListBySubscriptionOutput,
  }),
);
// Input Schema
export const ProductsAndConfigurationsListConfigurationsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $skipToken: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.EdgeOrder/listConfigurations",
    }),
  );
export type ProductsAndConfigurationsListConfigurationsInput =
  typeof ProductsAndConfigurationsListConfigurationsInput.Type;

// Output Schema
export const ProductsAndConfigurationsListConfigurationsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        properties: Schema.optional(
          Schema.Struct({
            filterableProperties: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  type: Schema.Literals([
                    "ShipToCountries",
                    "DoubleEncryptionStatus",
                  ]),
                  supportedValues: Schema.Array(Schema.String),
                }),
              ),
            ),
          }),
        ),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ProductsAndConfigurationsListConfigurationsOutput =
  typeof ProductsAndConfigurationsListConfigurationsOutput.Type;

// The operation
/**
 * List configurations for the given product family, product line and product for the given subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param $skipToken - $skipToken is supported on list of configurations, which provides the next page in the list of configurations.
 */
export const ProductsAndConfigurationsListConfigurations =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ProductsAndConfigurationsListConfigurationsInput,
    outputSchema: ProductsAndConfigurationsListConfigurationsOutput,
  }));
// Input Schema
export const ProductsAndConfigurationsListProductFamiliesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $expand: Schema.optional(Schema.String),
    $skipToken: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.EdgeOrder/listProductFamilies",
    }),
  );
export type ProductsAndConfigurationsListProductFamiliesInput =
  typeof ProductsAndConfigurationsListProductFamiliesInput.Type;

// Output Schema
export const ProductsAndConfigurationsListProductFamiliesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        properties: Schema.optional(
          Schema.Struct({
            filterableProperties: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  type: Schema.Literals([
                    "ShipToCountries",
                    "DoubleEncryptionStatus",
                  ]),
                  supportedValues: Schema.Array(Schema.String),
                }),
              ),
            ),
          }),
        ),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ProductsAndConfigurationsListProductFamiliesOutput =
  typeof ProductsAndConfigurationsListProductFamiliesOutput.Type;

// The operation
/**
 * List product families for the given subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param $expand - $expand is supported on configurations parameter for product, which provides details on the configurations for the product.
 * @param $skipToken - $skipToken is supported on list of product families, which provides the next page in the list of product families.
 */
export const ProductsAndConfigurationsListProductFamilies =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ProductsAndConfigurationsListProductFamiliesInput,
    outputSchema: ProductsAndConfigurationsListProductFamiliesOutput,
  }));
// Input Schema
export const ProductsAndConfigurationsListProductFamiliesMetadataInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscriptionId: Schema.String.pipe(T.PathParam()),
    "api-version": Schema.String,
    $skipToken: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/subscriptions/{subscriptionId}/providers/Microsoft.EdgeOrder/productFamiliesMetadata",
    }),
  );
export type ProductsAndConfigurationsListProductFamiliesMetadataInput =
  typeof ProductsAndConfigurationsListProductFamiliesMetadataInput.Type;

// Output Schema
export const ProductsAndConfigurationsListProductFamiliesMetadataOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value: Schema.Array(
      Schema.Struct({
        properties: Schema.optional(
          Schema.Struct({
            filterableProperties: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  type: Schema.Literals([
                    "ShipToCountries",
                    "DoubleEncryptionStatus",
                  ]),
                  supportedValues: Schema.Array(Schema.String),
                }),
              ),
            ),
          }),
        ),
      }),
    ),
    nextLink: Schema.optional(Schema.String),
  });
export type ProductsAndConfigurationsListProductFamiliesMetadataOutput =
  typeof ProductsAndConfigurationsListProductFamiliesMetadataOutput.Type;

// The operation
/**
 * List product families metadata for the given subscription.
 *
 * @param api-version - The API version to use for this operation.
 * @param subscriptionId - The ID of the target subscription. The value must be an UUID.
 * @param $skipToken - $skipToken is supported on list of product families metadata, which provides the next page in the list of product families metadata.
 */
export const ProductsAndConfigurationsListProductFamiliesMetadata =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ProductsAndConfigurationsListProductFamiliesMetadataInput,
    outputSchema: ProductsAndConfigurationsListProductFamiliesMetadataOutput,
  }));
