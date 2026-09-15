##### [List On-ramps](/api/resources/magic_cloud_networking/subresources/on_ramps/methods/list)

GET/accounts/{account_id}/magic/cloud/onramps

##### [Read On-ramp](/api/resources/magic_cloud_networking/subresources/on_ramps/methods/get)

GET/accounts/{account_id}/magic/cloud/onramps/{onramp_id}

##### [Create On-ramp](/api/resources/magic_cloud_networking/subresources/on_ramps/methods/create)

POST/accounts/{account_id}/magic/cloud/onramps

##### [Update On-ramp](/api/resources/magic_cloud_networking/subresources/on_ramps/methods/update)

PUT/accounts/{account_id}/magic/cloud/onramps/{onramp_id}

##### [Patch On-ramp](/api/resources/magic_cloud_networking/subresources/on_ramps/methods/edit)

PATCH/accounts/{account_id}/magic/cloud/onramps/{onramp_id}

##### [Delete On-ramp](/api/resources/magic_cloud_networking/subresources/on_ramps/methods/delete)

DELETE/accounts/{account_id}/magic/cloud/onramps/{onramp_id}

##### [Apply On-ramp](/api/resources/magic_cloud_networking/subresources/on_ramps/methods/apply)

POST/accounts/{account_id}/magic/cloud/onramps/{onramp_id}/apply

##### [Export as Terraform](/api/resources/magic_cloud_networking/subresources/on_ramps/methods/export)

POST/accounts/{account_id}/magic/cloud/onramps/{onramp_id}/export

##### [Plan On-ramp](/api/resources/magic_cloud_networking/subresources/on_ramps/methods/plan)

POST/accounts/{account_id}/magic/cloud/onramps/{onramp_id}/plan

##### Models

<details>

<summary>

OnRampListResponse object { id, cloud_type, dynamic_routing, 26 more }

</summary>

id: string

formatuuid

[Link to this property](#)

<details>

<summary>

cloud_type: "AWS" or "AZURE" or "GOOGLE"

</summary>

One of the following:

"AWS"

[Link to this property](#)

"AZURE"

[Link to this property](#)

"GOOGLE"

[Link to this property](#)

</details>

[Link to this property](#)

dynamic_routing: boolean

[Link to this property](#)

install_routes_in_cloud: boolean

[Link to this property](#)

install_routes_in_magic_wan: boolean

[Link to this property](#)

name: string

[Link to this property](#)

<details>

<summary>

type: "OnrampTypeSingle" or "OnrampTypeHub"

</summary>

One of the following:

"OnrampTypeSingle"

[Link to this property](#)

"OnrampTypeHub"

[Link to this property](#)

</details>

[Link to this property](#)

updated_at: string

[Link to this property](#)

attached_hubs: optional array of string

[Link to this property](#)

attached_vpcs: optional array of string

[Link to this property](#)

cloud_asn: optional number

formatuint32

[Link to this property](#)

description: optional string

[Link to this property](#)

hub: optional string

formatuuid

[Link to this property](#)

last_applied_at: optional string

[Link to this property](#)

last_exported_at: optional string

[Link to this property](#)

last_planned_at: optional string

[Link to this property](#)

manage_hub_to_hub_attachments: optional boolean

[Link to this property](#)

manage_vpc_to_hub_attachments: optional boolean

[Link to this property](#)

<details>

<summary>

planned_monthly_cost_estimate: optional object { currency, current_monthly_cost, diff, proposed_monthly_cost }

</summary>

currency: string

[Link to this property](#)

current_monthly_cost: number

formatdouble

[Link to this property](#)

diff: number

formatdouble

[Link to this property](#)

proposed_monthly_cost: number

formatdouble

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

planned_resources: optional array of object { diff, keys_require_replace, monthly_cost_estimate_diff, 2 more }

</summary>

<details>

<summary>

diff: object { diff, left_description, left_yaml, 2 more }

</summary>

diff: string

[Link to this property](#)

left_description: string

[Link to this property](#)

left_yaml: string

[Link to this property](#)

right_description: string

[Link to this property](#)

right_yaml: string

[Link to this property](#)

</details>

[Link to this property](#)

keys_require_replace: array of string

[Link to this property](#)

<details>

<summary>

monthly_cost_estimate_diff: object { currency, current_monthly_cost, diff, proposed_monthly_cost }

</summary>

currency: string

[Link to this property](#)

current_monthly_cost: number

formatdouble

[Link to this property](#)

diff: number

formatdouble

[Link to this property](#)

proposed_monthly_cost: number

formatdouble

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

planned_action: "no_op" or "create" or "update" or 2 more

</summary>

One of the following:

"no_op"

[Link to this property](#)

"create"

[Link to this property](#)

"update"

[Link to this property](#)

"replace"

[Link to this property](#)

"destroy"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

resource: object { id, cloud_type, detail, 3 more }

</summary>

id: string

formatuuid

[Link to this property](#)

<details>

<summary>

cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

[Link to this property](#)

"AZURE"

[Link to this property](#)

"GOOGLE"

[Link to this property](#)

"CLOUDFLARE"

[Link to this property](#)

</details>

[Link to this property](#)

detail: string

[Link to this property](#)

name: string

[Link to this property](#)

<details>

<summary>

resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more

</summary>

One of the following:

"aws_customer_gateway"

[Link to this property](#)

"aws_egress_only_internet_gateway"

[Link to this property](#)

"aws_internet_gateway"

[Link to this property](#)

"aws_instance"

[Link to this property](#)

"aws_network_interface"

[Link to this property](#)

"aws_route"

[Link to this property](#)

"aws_route_table"

[Link to this property](#)

"aws_route_table_association"

[Link to this property](#)

"aws_subnet"

[Link to this property](#)

"aws_vpc"

[Link to this property](#)

"aws_vpc_ipv4_cidr_block_association"

[Link to this property](#)

"aws_vpn_connection"

[Link to this property](#)

"aws_vpn_connection_route"

[Link to this property](#)

"aws_vpn_gateway"

[Link to this property](#)

"aws_security_group"

[Link to this property](#)

"aws_vpc_security_group_ingress_rule"

[Link to this property](#)

"aws_vpc_security_group_egress_rule"

[Link to this property](#)

"aws_ec2_managed_prefix_list"

[Link to this property](#)

"aws_ec2_transit_gateway"

[Link to this property](#)

"aws_ec2_transit_gateway_prefix_list_reference"

[Link to this property](#)

"aws_ec2_transit_gateway_vpc_attachment"

[Link to this property](#)

"azurerm_application_security_group"

[Link to this property](#)

"azurerm_lb"

[Link to this property](#)

"azurerm_lb_backend_address_pool"

[Link to this property](#)

"azurerm_lb_nat_pool"

[Link to this property](#)

"azurerm_lb_nat_rule"

[Link to this property](#)

"azurerm_lb_rule"

[Link to this property](#)

"azurerm_local_network_gateway"

[Link to this property](#)

"azurerm_network_interface"

[Link to this property](#)

"azurerm_network_interface_application_security_group_association"

[Link to this property](#)

"azurerm_network_interface_backend_address_pool_association"

[Link to this property](#)

"azurerm_network_interface_security_group_association"

[Link to this property](#)

"azurerm_network_security_group"

[Link to this property](#)

"azurerm_public_ip"

[Link to this property](#)

"azurerm_route"

[Link to this property](#)

"azurerm_route_table"

[Link to this property](#)

"azurerm_subnet"

[Link to this property](#)

"azurerm_subnet_route_table_association"

[Link to this property](#)

"azurerm_virtual_machine"

[Link to this property](#)

"azurerm_virtual_network_gateway_connection"

[Link to this property](#)

"azurerm_virtual_network"

[Link to this property](#)

"azurerm_virtual_network_gateway"

[Link to this property](#)

"google_compute_network"

[Link to this property](#)

"google_compute_subnetwork"

[Link to this property](#)

"google_compute_vpn_gateway"

[Link to this property](#)

"google_compute_vpn_tunnel"

[Link to this property](#)

"google_compute_route"

[Link to this property](#)

"google_compute_address"

[Link to this property](#)

"google_compute_global_address"

[Link to this property](#)

"google_compute_router"

[Link to this property](#)

"google_compute_interconnect_attachment"

[Link to this property](#)

"google_compute_ha_vpn_gateway"

[Link to this property](#)

"google_compute_forwarding_rule"

[Link to this property](#)

"google_compute_network_firewall_policy"

[Link to this property](#)

"google_compute_network_firewall_policy_rule"

[Link to this property](#)

"cloudflare_static_route"

[Link to this property](#)

"cloudflare_ipsec_tunnel"

[Link to this property](#)

</details>

[Link to this property](#)

title: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

planned_resources_unavailable: optional boolean

[Link to this property](#)

<details>

<summary>

post_apply_monthly_cost_estimate: optional object { currency, monthly_cost }

</summary>

currency: string

[Link to this property](#)

monthly_cost: number

formatdouble

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

post_apply_resources: optional map[object { id, account_id, cloud_type, 18 more } ]

</summary>

id: string

formatuuid

[Link to this property](#)

account_id: string

[Link to this property](#)

<details>

<summary>

cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

[Link to this property](#)

"AZURE"

[Link to this property](#)

"GOOGLE"

[Link to this property](#)

"CLOUDFLARE"

[Link to this property](#)

</details>

[Link to this property](#)

config: map[unknown]

[Link to this property](#)

deployment_provider: string

formatuuid

[Link to this property](#)

managed: boolean

[Link to this property](#)

<details>

<summary>

monthly_cost_estimate: object { currency, monthly_cost }

</summary>

currency: string

[Link to this property](#)

monthly_cost: number

formatdouble

[Link to this property](#)

</details>

[Link to this property](#)

name: string

[Link to this property](#)

native_id: string

[Link to this property](#)

<details>

<summary>

observations: map[object { first_observed_at, last_observed_at, provider_id, resource_id } ]

</summary>

first_observed_at: string

[Link to this property](#)

last_observed_at: string

[Link to this property](#)

provider_id: string

formatuuid

[Link to this property](#)

resource_id: string

formatuuid

[Link to this property](#)

</details>

[Link to this property](#)

provider_ids: array of string

[Link to this property](#)

provider_names_by_id: map[string]

[Link to this property](#)

region: string

[Link to this property](#)

resource_group: string

[Link to this property](#)

<details>

<summary>

resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more

</summary>

One of the following:

"aws_customer_gateway"

[Link to this property](#)

"aws_egress_only_internet_gateway"

[Link to this property](#)

"aws_internet_gateway"

[Link to this property](#)

"aws_instance"

[Link to this property](#)

"aws_network_interface"

[Link to this property](#)

"aws_route"

[Link to this property](#)

"aws_route_table"

[Link to this property](#)

"aws_route_table_association"

[Link to this property](#)

"aws_subnet"

[Link to this property](#)

"aws_vpc"

[Link to this property](#)

"aws_vpc_ipv4_cidr_block_association"

[Link to this property](#)

"aws_vpn_connection"

[Link to this property](#)

"aws_vpn_connection_route"

[Link to this property](#)

"aws_vpn_gateway"

[Link to this property](#)

"aws_security_group"

[Link to this property](#)

"aws_vpc_security_group_ingress_rule"

[Link to this property](#)

"aws_vpc_security_group_egress_rule"

[Link to this property](#)

"aws_ec2_managed_prefix_list"

[Link to this property](#)

"aws_ec2_transit_gateway"

[Link to this property](#)

"aws_ec2_transit_gateway_prefix_list_reference"

[Link to this property](#)

"aws_ec2_transit_gateway_vpc_attachment"

[Link to this property](#)

"azurerm_application_security_group"

[Link to this property](#)

"azurerm_lb"

[Link to this property](#)

"azurerm_lb_backend_address_pool"

[Link to this property](#)

"azurerm_lb_nat_pool"

[Link to this property](#)

"azurerm_lb_nat_rule"

[Link to this property](#)

"azurerm_lb_rule"

[Link to this property](#)

"azurerm_local_network_gateway"

[Link to this property](#)

"azurerm_network_interface"

[Link to this property](#)

"azurerm_network_interface_application_security_group_association"

[Link to this property](#)

"azurerm_network_interface_backend_address_pool_association"

[Link to this property](#)

"azurerm_network_interface_security_group_association"

[Link to this property](#)

"azurerm_network_security_group"

[Link to this property](#)

"azurerm_public_ip"

[Link to this property](#)

"azurerm_route"

[Link to this property](#)

"azurerm_route_table"

[Link to this property](#)

"azurerm_subnet"

[Link to this property](#)

"azurerm_subnet_route_table_association"

[Link to this property](#)

"azurerm_virtual_machine"

[Link to this property](#)

"azurerm_virtual_network_gateway_connection"

[Link to this property](#)

"azurerm_virtual_network"

[Link to this property](#)

"azurerm_virtual_network_gateway"

[Link to this property](#)

"google_compute_network"

[Link to this property](#)

"google_compute_subnetwork"

[Link to this property](#)

"google_compute_vpn_gateway"

[Link to this property](#)

"google_compute_vpn_tunnel"

[Link to this property](#)

"google_compute_route"

[Link to this property](#)

"google_compute_address"

[Link to this property](#)

"google_compute_global_address"

[Link to this property](#)

"google_compute_router"

[Link to this property](#)

"google_compute_interconnect_attachment"

[Link to this property](#)

"google_compute_ha_vpn_gateway"

[Link to this property](#)

"google_compute_forwarding_rule"

[Link to this property](#)

"google_compute_network_firewall_policy"

[Link to this property](#)

"google_compute_network_firewall_policy_rule"

[Link to this property](#)

"cloudflare_static_route"

[Link to this property](#)

"cloudflare_ipsec_tunnel"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

sections: array of object { hidden_items, name, visible_items, help_text }

</summary>

<details>

<summary>

hidden_items: array of object { helpText, name, value }

</summary>

helpText: optional string

[Link to this property](#)

name: optional string

[Link to this property](#)

<details>

<summary>

value: optional object { item_type, string } or object { item_type, yaml } or object { item_type, yaml_diff } or 2 more

</summary>

One of the following:

<details>

<summary>

McnStringItem object { item_type, string }

</summary>

item_type: string

[Link to this property](#)

string: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnYamlItem object { item_type, yaml }

</summary>

item_type: string

[Link to this property](#)

yaml: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnYamlDiffItem object { item_type, yaml_diff }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

yaml_diff: object { diff, left_description, left_yaml, 2 more }

</summary>

diff: string

[Link to this property](#)

left_description: string

[Link to this property](#)

left_yaml: string

[Link to this property](#)

right_description: string

[Link to this property](#)

right_yaml: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnResourcePreviewItem object { item_type, resource_preview }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

resource_preview: object { id, cloud_type, detail, 3 more }

</summary>

id: string

formatuuid

[Link to this property](#)

<details>

<summary>

cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

[Link to this property](#)

"AZURE"

[Link to this property](#)

"GOOGLE"

[Link to this property](#)

"CLOUDFLARE"

[Link to this property](#)

</details>

[Link to this property](#)

detail: string

[Link to this property](#)

name: string

[Link to this property](#)

<details>

<summary>

resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more

</summary>

One of the following:

"aws_customer_gateway"

[Link to this property](#)

"aws_egress_only_internet_gateway"

[Link to this property](#)

"aws_internet_gateway"

[Link to this property](#)

"aws_instance"

[Link to this property](#)

"aws_network_interface"

[Link to this property](#)

"aws_route"

[Link to this property](#)

"aws_route_table"

[Link to this property](#)

"aws_route_table_association"

[Link to this property](#)

"aws_subnet"

[Link to this property](#)

"aws_vpc"

[Link to this property](#)

"aws_vpc_ipv4_cidr_block_association"

[Link to this property](#)

"aws_vpn_connection"

[Link to this property](#)

"aws_vpn_connection_route"

[Link to this property](#)

"aws_vpn_gateway"

[Link to this property](#)

"aws_security_group"

[Link to this property](#)

"aws_vpc_security_group_ingress_rule"

[Link to this property](#)

"aws_vpc_security_group_egress_rule"

[Link to this property](#)

"aws_ec2_managed_prefix_list"

[Link to this property](#)

"aws_ec2_transit_gateway"

[Link to this property](#)

"aws_ec2_transit_gateway_prefix_list_reference"

[Link to this property](#)

"aws_ec2_transit_gateway_vpc_attachment"

[Link to this property](#)

"azurerm_application_security_group"

[Link to this property](#)

"azurerm_lb"

[Link to this property](#)

"azurerm_lb_backend_address_pool"

[Link to this property](#)

"azurerm_lb_nat_pool"

[Link to this property](#)

"azurerm_lb_nat_rule"

[Link to this property](#)

"azurerm_lb_rule"

[Link to this property](#)

"azurerm_local_network_gateway"

[Link to this property](#)

"azurerm_network_interface"

[Link to this property](#)

"azurerm_network_interface_application_security_group_association"

[Link to this property](#)

"azurerm_network_interface_backend_address_pool_association"

[Link to this property](#)

"azurerm_network_interface_security_group_association"

[Link to this property](#)

"azurerm_network_security_group"

[Link to this property](#)

"azurerm_public_ip"

[Link to this property](#)

"azurerm_route"

[Link to this property](#)

"azurerm_route_table"

[Link to this property](#)

"azurerm_subnet"

[Link to this property](#)

"azurerm_subnet_route_table_association"

[Link to this property](#)

"azurerm_virtual_machine"

[Link to this property](#)

"azurerm_virtual_network_gateway_connection"

[Link to this property](#)

"azurerm_virtual_network"

[Link to this property](#)

"azurerm_virtual_network_gateway"

[Link to this property](#)

"google_compute_network"

[Link to this property](#)

"google_compute_subnetwork"

[Link to this property](#)

"google_compute_vpn_gateway"

[Link to this property](#)

"google_compute_vpn_tunnel"

[Link to this property](#)

"google_compute_route"

[Link to this property](#)

"google_compute_address"

[Link to this property](#)

"google_compute_global_address"

[Link to this property](#)

"google_compute_router"

[Link to this property](#)

"google_compute_interconnect_attachment"

[Link to this property](#)

"google_compute_ha_vpn_gateway"

[Link to this property](#)

"google_compute_forwarding_rule"

[Link to this property](#)

"google_compute_network_firewall_policy"

[Link to this property](#)

"google_compute_network_firewall_policy_rule"

[Link to this property](#)

"cloudflare_static_route"

[Link to this property](#)

"cloudflare_ipsec_tunnel"

[Link to this property](#)

</details>

[Link to this property](#)

title: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnListItem object { item_type, list }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

list: array of object { item_type, string } or object { item_type, resource_preview }

</summary>

One of the following:

<details>

<summary>

McnStringItem object { item_type, string }

</summary>

item_type: string

[Link to this property](#)

string: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnResourcePreviewItem object { item_type, resource_preview }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

resource_preview: object { id, cloud_type, detail, 3 more }

</summary>

id: string

formatuuid

[Link to this property](#)

<details>

<summary>

cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

[Link to this property](#)

"AZURE"

[Link to this property](#)

"GOOGLE"

[Link to this property](#)

"CLOUDFLARE"

[Link to this property](#)

</details>

[Link to this property](#)

detail: string

[Link to this property](#)

name: string

[Link to this property](#)

<details>

<summary>

resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more

</summary>

One of the following:

"aws_customer_gateway"

[Link to this property](#)

"aws_egress_only_internet_gateway"

[Link to this property](#)

"aws_internet_gateway"

[Link to this property](#)

"aws_instance"

[Link to this property](#)

"aws_network_interface"

[Link to this property](#)

"aws_route"

[Link to this property](#)

"aws_route_table"

[Link to this property](#)

"aws_route_table_association"

[Link to this property](#)

"aws_subnet"

[Link to this property](#)

"aws_vpc"

[Link to this property](#)

"aws_vpc_ipv4_cidr_block_association"

[Link to this property](#)

"aws_vpn_connection"

[Link to this property](#)

"aws_vpn_connection_route"

[Link to this property](#)

"aws_vpn_gateway"

[Link to this property](#)

"aws_security_group"

[Link to this property](#)

"aws_vpc_security_group_ingress_rule"

[Link to this property](#)

"aws_vpc_security_group_egress_rule"

[Link to this property](#)

"aws_ec2_managed_prefix_list"

[Link to this property](#)

"aws_ec2_transit_gateway"

[Link to this property](#)

"aws_ec2_transit_gateway_prefix_list_reference"

[Link to this property](#)

"aws_ec2_transit_gateway_vpc_attachment"

[Link to this property](#)

"azurerm_application_security_group"

[Link to this property](#)

"azurerm_lb"

[Link to this property](#)

"azurerm_lb_backend_address_pool"

[Link to this property](#)

"azurerm_lb_nat_pool"

[Link to this property](#)

"azurerm_lb_nat_rule"

[Link to this property](#)

"azurerm_lb_rule"

[Link to this property](#)

"azurerm_local_network_gateway"

[Link to this property](#)

"azurerm_network_interface"

[Link to this property](#)

"azurerm_network_interface_application_security_group_association"

[Link to this property](#)

"azurerm_network_interface_backend_address_pool_association"

[Link to this property](#)

"azurerm_network_interface_security_group_association"

[Link to this property](#)

"azurerm_network_security_group"

[Link to this property](#)

"azurerm_public_ip"

[Link to this property](#)

"azurerm_route"

[Link to this property](#)

"azurerm_route_table"

[Link to this property](#)

"azurerm_subnet"

[Link to this property](#)

"azurerm_subnet_route_table_association"

[Link to this property](#)

"azurerm_virtual_machine"

[Link to this property](#)

"azurerm_virtual_network_gateway_connection"

[Link to this property](#)

"azurerm_virtual_network"

[Link to this property](#)

"azurerm_virtual_network_gateway"

[Link to this property](#)

"google_compute_network"

[Link to this property](#)

"google_compute_subnetwork"

[Link to this property](#)

"google_compute_vpn_gateway"

[Link to this property](#)

"google_compute_vpn_tunnel"

[Link to this property](#)

"google_compute_route"

[Link to this property](#)

"google_compute_address"

[Link to this property](#)

"google_compute_global_address"

[Link to this property](#)

"google_compute_router"

[Link to this property](#)

"google_compute_interconnect_attachment"

[Link to this property](#)

"google_compute_ha_vpn_gateway"

[Link to this property](#)

"google_compute_forwarding_rule"

[Link to this property](#)

"google_compute_network_firewall_policy"

[Link to this property](#)

"google_compute_network_firewall_policy_rule"

[Link to this property](#)

"cloudflare_static_route"

[Link to this property](#)

"cloudflare_ipsec_tunnel"

[Link to this property](#)

</details>

[Link to this property](#)

title: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

name: string

[Link to this property](#)

<details>

<summary>

visible_items: array of object { helpText, name, value }

</summary>

helpText: optional string

[Link to this property](#)

name: optional string

[Link to this property](#)

<details>

<summary>

value: optional object { item_type, string } or object { item_type, yaml } or object { item_type, yaml_diff } or 2 more

</summary>

One of the following:

<details>

<summary>

McnStringItem object { item_type, string }

</summary>

item_type: string

[Link to this property](#)

string: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnYamlItem object { item_type, yaml }

</summary>

item_type: string

[Link to this property](#)

yaml: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnYamlDiffItem object { item_type, yaml_diff }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

yaml_diff: object { diff, left_description, left_yaml, 2 more }

</summary>

diff: string

[Link to this property](#)

left_description: string

[Link to this property](#)

left_yaml: string

[Link to this property](#)

right_description: string

[Link to this property](#)

right_yaml: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnResourcePreviewItem object { item_type, resource_preview }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

resource_preview: object { id, cloud_type, detail, 3 more }

</summary>

id: string

formatuuid

[Link to this property](#)

<details>

<summary>

cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

[Link to this property](#)

"AZURE"

[Link to this property](#)

"GOOGLE"

[Link to this property](#)

"CLOUDFLARE"

[Link to this property](#)

</details>

[Link to this property](#)

detail: string

[Link to this property](#)

name: string

[Link to this property](#)

<details>

<summary>

resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more

</summary>

One of the following:

"aws_customer_gateway"

[Link to this property](#)

"aws_egress_only_internet_gateway"

[Link to this property](#)

"aws_internet_gateway"

[Link to this property](#)

"aws_instance"

[Link to this property](#)

"aws_network_interface"

[Link to this property](#)

"aws_route"

[Link to this property](#)

"aws_route_table"

[Link to this property](#)

"aws_route_table_association"

[Link to this property](#)

"aws_subnet"

[Link to this property](#)

"aws_vpc"

[Link to this property](#)

"aws_vpc_ipv4_cidr_block_association"

[Link to this property](#)

"aws_vpn_connection"

[Link to this property](#)

"aws_vpn_connection_route"

[Link to this property](#)

"aws_vpn_gateway"

[Link to this property](#)

"aws_security_group"

[Link to this property](#)

"aws_vpc_security_group_ingress_rule"

[Link to this property](#)

"aws_vpc_security_group_egress_rule"

[Link to this property](#)

"aws_ec2_managed_prefix_list"

[Link to this property](#)

"aws_ec2_transit_gateway"

[Link to this property](#)

"aws_ec2_transit_gateway_prefix_list_reference"

[Link to this property](#)

"aws_ec2_transit_gateway_vpc_attachment"

[Link to this property](#)

"azurerm_application_security_group"

[Link to this property](#)

"azurerm_lb"

[Link to this property](#)

"azurerm_lb_backend_address_pool"

[Link to this property](#)

"azurerm_lb_nat_pool"

[Link to this property](#)

"azurerm_lb_nat_rule"

[Link to this property](#)

"azurerm_lb_rule"

[Link to this property](#)

"azurerm_local_network_gateway"

[Link to this property](#)

"azurerm_network_interface"

[Link to this property](#)

"azurerm_network_interface_application_security_group_association"

[Link to this property](#)

"azurerm_network_interface_backend_address_pool_association"

[Link to this property](#)

"azurerm_network_interface_security_group_association"

[Link to this property](#)

"azurerm_network_security_group"

[Link to this property](#)

"azurerm_public_ip"

[Link to this property](#)

"azurerm_route"

[Link to this property](#)

"azurerm_route_table"

[Link to this property](#)

"azurerm_subnet"

[Link to this property](#)

"azurerm_subnet_route_table_association"

[Link to this property](#)

"azurerm_virtual_machine"

[Link to this property](#)

"azurerm_virtual_network_gateway_connection"

[Link to this property](#)

"azurerm_virtual_network"

[Link to this property](#)

"azurerm_virtual_network_gateway"

[Link to this property](#)

"google_compute_network"

[Link to this property](#)

"google_compute_subnetwork"

[Link to this property](#)

"google_compute_vpn_gateway"

[Link to this property](#)

"google_compute_vpn_tunnel"

[Link to this property](#)

"google_compute_route"

[Link to this property](#)

"google_compute_address"

[Link to this property](#)

"google_compute_global_address"

[Link to this property](#)

"google_compute_router"

[Link to this property](#)

"google_compute_interconnect_attachment"

[Link to this property](#)

"google_compute_ha_vpn_gateway"

[Link to this property](#)

"google_compute_forwarding_rule"

[Link to this property](#)

"google_compute_network_firewall_policy"

[Link to this property](#)

"google_compute_network_firewall_policy_rule"

[Link to this property](#)

"cloudflare_static_route"

[Link to this property](#)

"cloudflare_ipsec_tunnel"

[Link to this property](#)

</details>

[Link to this property](#)

title: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnListItem object { item_type, list }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

list: array of object { item_type, string } or object { item_type, resource_preview }

</summary>

One of the following:

<details>

<summary>

McnStringItem object { item_type, string }

</summary>

item_type: string

[Link to this property](#)

string: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnResourcePreviewItem object { item_type, resource_preview }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

resource_preview: object { id, cloud_type, detail, 3 more }

</summary>

id: string

formatuuid

[Link to this property](#)

<details>

<summary>

cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

[Link to this property](#)

"AZURE"

[Link to this property](#)

"GOOGLE"

[Link to this property](#)

"CLOUDFLARE"

[Link to this property](#)

</details>

[Link to this property](#)

detail: string

[Link to this property](#)

name: string

[Link to this property](#)

<details>

<summary>

resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more

</summary>

One of the following:

"aws_customer_gateway"

[Link to this property](#)

"aws_egress_only_internet_gateway"

[Link to this property](#)

"aws_internet_gateway"

[Link to this property](#)

"aws_instance"

[Link to this property](#)

"aws_network_interface"

[Link to this property](#)

"aws_route"

[Link to this property](#)

"aws_route_table"

[Link to this property](#)

"aws_route_table_association"

[Link to this property](#)

"aws_subnet"

[Link to this property](#)

"aws_vpc"

[Link to this property](#)

"aws_vpc_ipv4_cidr_block_association"

[Link to this property](#)

"aws_vpn_connection"

[Link to this property](#)

"aws_vpn_connection_route"

[Link to this property](#)

"aws_vpn_gateway"

[Link to this property](#)

"aws_security_group"

[Link to this property](#)

"aws_vpc_security_group_ingress_rule"

[Link to this property](#)

"aws_vpc_security_group_egress_rule"

[Link to this property](#)

"aws_ec2_managed_prefix_list"

[Link to this property](#)

"aws_ec2_transit_gateway"

[Link to this property](#)

"aws_ec2_transit_gateway_prefix_list_reference"

[Link to this property](#)

"aws_ec2_transit_gateway_vpc_attachment"

[Link to this property](#)

"azurerm_application_security_group"

[Link to this property](#)

"azurerm_lb"

[Link to this property](#)

"azurerm_lb_backend_address_pool"

[Link to this property](#)

"azurerm_lb_nat_pool"

[Link to this property](#)

"azurerm_lb_nat_rule"

[Link to this property](#)

"azurerm_lb_rule"

[Link to this property](#)

"azurerm_local_network_gateway"

[Link to this property](#)

"azurerm_network_interface"

[Link to this property](#)

"azurerm_network_interface_application_security_group_association"

[Link to this property](#)

"azurerm_network_interface_backend_address_pool_association"

[Link to this property](#)

"azurerm_network_interface_security_group_association"

[Link to this property](#)

"azurerm_network_security_group"

[Link to this property](#)

"azurerm_public_ip"

[Link to this property](#)

"azurerm_route"

[Link to this property](#)

"azurerm_route_table"

[Link to this property](#)

"azurerm_subnet"

[Link to this property](#)

"azurerm_subnet_route_table_association"

[Link to this property](#)

"azurerm_virtual_machine"

[Link to this property](#)

"azurerm_virtual_network_gateway_connection"

[Link to this property](#)

"azurerm_virtual_network"

[Link to this property](#)

"azurerm_virtual_network_gateway"

[Link to this property](#)

"google_compute_network"

[Link to this property](#)

"google_compute_subnetwork"

[Link to this property](#)

"google_compute_vpn_gateway"

[Link to this property](#)

"google_compute_vpn_tunnel"

[Link to this property](#)

"google_compute_route"

[Link to this property](#)

"google_compute_address"

[Link to this property](#)

"google_compute_global_address"

[Link to this property](#)

"google_compute_router"

[Link to this property](#)

"google_compute_interconnect_attachment"

[Link to this property](#)

"google_compute_ha_vpn_gateway"

[Link to this property](#)

"google_compute_forwarding_rule"

[Link to this property](#)

"google_compute_network_firewall_policy"

[Link to this property](#)

"google_compute_network_firewall_policy_rule"

[Link to this property](#)

"cloudflare_static_route"

[Link to this property](#)

"cloudflare_ipsec_tunnel"

[Link to this property](#)

</details>

[Link to this property](#)

title: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

help_text: optional string

[Link to this property](#)

</details>

[Link to this property](#)

state: map[unknown]

[Link to this property](#)

tags: map[string]

[Link to this property](#)

updated_at: string

[Link to this property](#)

url: string

[Link to this property](#)

<details>

<summary>

managed_by: optional array of object { id, client_type, name }

</summary>

id: string

formatuuid

[Link to this property](#)

client_type: "MAGIC_WAN_CLOUD_ONRAMP"

[Link to this property](#)

name: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

post_apply_resources_unavailable: optional boolean

[Link to this property](#)

region: optional string

[Link to this property](#)

<details>

<summary>

status: optional object { apply_progress, lifecycle_state, plan_progress, 3 more }

</summary>

<details>

<summary>

apply_progress: object { done, total }

</summary>

done: number

[Link to this property](#)

total: number

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

lifecycle_state: "OnrampNeedsApply" or "OnrampPendingPlan" or "OnrampPlanning" or 9 more

</summary>

One of the following:

"OnrampNeedsApply"

[Link to this property](#)

"OnrampPendingPlan"

[Link to this property](#)

"OnrampPlanning"

[Link to this property](#)

"OnrampPlanFailed"

[Link to this property](#)

"OnrampPendingApproval"

[Link to this property](#)

"OnrampPendingApply"

[Link to this property](#)

"OnrampApplying"

[Link to this property](#)

"OnrampApplyFailed"

[Link to this property](#)

"OnrampActive"

[Link to this property](#)

"OnrampPendingDestroy"

[Link to this property](#)

"OnrampDestroying"

[Link to this property](#)

"OnrampDestroyFailed"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

plan_progress: object { done, total }

</summary>

done: number

[Link to this property](#)

total: number

[Link to this property](#)

</details>

[Link to this property](#)

routes: array of string

[Link to this property](#)

tunnels: array of string

[Link to this property](#)

<details>

<summary>

lifecycle_errors: optional map[object { code, message, documentation_url, 2 more } ]

</summary>

<details>

<summary>

code: 1001 or 1002 or 1003 or 152 more

</summary>

One of the following:

1001

[Link to this property](#)

1002

[Link to this property](#)

1003

[Link to this property](#)

1004

[Link to this property](#)

1005

[Link to this property](#)

1006

[Link to this property](#)

1007

[Link to this property](#)

1008

[Link to this property](#)

1009

[Link to this property](#)

1010

[Link to this property](#)

1011

[Link to this property](#)

1012

[Link to this property](#)

1013

[Link to this property](#)

1014

[Link to this property](#)

1015

[Link to this property](#)

1016

[Link to this property](#)

1017

[Link to this property](#)

1018

[Link to this property](#)

2001

[Link to this property](#)

2002

[Link to this property](#)

2003

[Link to this property](#)

2004

[Link to this property](#)

2005

[Link to this property](#)

2006

[Link to this property](#)

2007

[Link to this property](#)

2008

[Link to this property](#)

2009

[Link to this property](#)

2010

[Link to this property](#)

2011

[Link to this property](#)

2012

[Link to this property](#)

2013

[Link to this property](#)

2014

[Link to this property](#)

2015

[Link to this property](#)

2016

[Link to this property](#)

2017

[Link to this property](#)

2018

[Link to this property](#)

2019

[Link to this property](#)

2020

[Link to this property](#)

2021

[Link to this property](#)

2022

[Link to this property](#)

3001

[Link to this property](#)

3002

[Link to this property](#)

3003

[Link to this property](#)

3004

[Link to this property](#)

3005

[Link to this property](#)

3006

[Link to this property](#)

3007

[Link to this property](#)

4001

[Link to this property](#)

4002

[Link to this property](#)

4003

[Link to this property](#)

4004

[Link to this property](#)

4005

[Link to this property](#)

4006

[Link to this property](#)

4007

[Link to this property](#)

4008

[Link to this property](#)

4009

[Link to this property](#)

4010

[Link to this property](#)

4011

[Link to this property](#)

4012

[Link to this property](#)

4013

[Link to this property](#)

4014

[Link to this property](#)

4015

[Link to this property](#)

4016

[Link to this property](#)

4017

[Link to this property](#)

4018

[Link to this property](#)

4019

[Link to this property](#)

4020

[Link to this property](#)

4021

[Link to this property](#)

4022

[Link to this property](#)

4023

[Link to this property](#)

5001

[Link to this property](#)

5002

[Link to this property](#)

5003

[Link to this property](#)

5004

[Link to this property](#)

102000

[Link to this property](#)

102001

[Link to this property](#)

102002

[Link to this property](#)

102003

[Link to this property](#)

102004

[Link to this property](#)

102005

[Link to this property](#)

102006

[Link to this property](#)

102007

[Link to this property](#)

102008

[Link to this property](#)

102009

[Link to this property](#)

102010

[Link to this property](#)

102011

[Link to this property](#)

102012

[Link to this property](#)

102013

[Link to this property](#)

102014

[Link to this property](#)

102015

[Link to this property](#)

102016

[Link to this property](#)

102017

[Link to this property](#)

102018

[Link to this property](#)

102019

[Link to this property](#)

102020

[Link to this property](#)

102021

[Link to this property](#)

102022

[Link to this property](#)

102023

[Link to this property](#)

102024

[Link to this property](#)

102025

[Link to this property](#)

102026

[Link to this property](#)

102027

[Link to this property](#)

102028

[Link to this property](#)

102029

[Link to this property](#)

102030

[Link to this property](#)

102031

[Link to this property](#)

102032

[Link to this property](#)

102033

[Link to this property](#)

102034

[Link to this property](#)

102035

[Link to this property](#)

102036

[Link to this property](#)

102037

[Link to this property](#)

102038

[Link to this property](#)

102039

[Link to this property](#)

102040

[Link to this property](#)

102041

[Link to this property](#)

102042

[Link to this property](#)

102043

[Link to this property](#)

102044

[Link to this property](#)

102045

[Link to this property](#)

102046

[Link to this property](#)

102047

[Link to this property](#)

102048

[Link to this property](#)

102049

[Link to this property](#)

102050

[Link to this property](#)

102051

[Link to this property](#)

102052

[Link to this property](#)

102053

[Link to this property](#)

102054

[Link to this property](#)

102055

[Link to this property](#)

102056

[Link to this property](#)

102057

[Link to this property](#)

102058

[Link to this property](#)

102059

[Link to this property](#)

102060

[Link to this property](#)

102061

[Link to this property](#)

102062

[Link to this property](#)

102063

[Link to this property](#)

102064

[Link to this property](#)

102065

[Link to this property](#)

102066

[Link to this property](#)

102067

[Link to this property](#)

102068

[Link to this property](#)

102069

[Link to this property](#)

102070

[Link to this property](#)

102071

[Link to this property](#)

102072

[Link to this property](#)

103001

[Link to this property](#)

103002

[Link to this property](#)

103003

[Link to this property](#)

103004

[Link to this property](#)

103005

[Link to this property](#)

103006

[Link to this property](#)

103007

[Link to this property](#)

103008

[Link to this property](#)

</details>

[Link to this property](#)

message: string

[Link to this property](#)

documentation_url: optional string

[Link to this property](#)

<details>

<summary>

meta: optional object { l10n_key, loggable_error, template_data, trace_id }

</summary>

l10n_key: optional string

[Link to this property](#)

loggable_error: optional string

[Link to this property](#)

template_data: optional unknown

[Link to this property](#)

trace_id: optional string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

source: optional object { parameter, parameter_value_index, pointer }

</summary>

parameter: optional string

[Link to this property](#)

parameter_value_index: optional number

[Link to this property](#)

pointer: optional string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

vpc: optional string

formatuuid

[Link to this property](#)

<details>

<summary>

vpcs_by_id: optional map[object { id, account_id, cloud_type, 18 more } ]

</summary>

id: string

formatuuid

[Link to this property](#)

account_id: string

[Link to this property](#)

<details>

<summary>

cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

[Link to this property](#)

"AZURE"

[Link to this property](#)

"GOOGLE"

[Link to this property](#)

"CLOUDFLARE"

[Link to this property](#)

</details>

[Link to this property](#)

config: map[unknown]

[Link to this property](#)

deployment_provider: string

formatuuid

[Link to this property](#)

managed: boolean

[Link to this property](#)

<details>

<summary>

monthly_cost_estimate: object { currency, monthly_cost }

</summary>

currency: string

[Link to this property](#)

monthly_cost: number

formatdouble

[Link to this property](#)

</details>

[Link to this property](#)

name: string

[Link to this property](#)

native_id: string

[Link to this property](#)

<details>

<summary>

observations: map[object { first_observed_at, last_observed_at, provider_id, resource_id } ]

</summary>

first_observed_at: string

[Link to this property](#)

last_observed_at: string

[Link to this property](#)

provider_id: string

formatuuid

[Link to this property](#)

resource_id: string

formatuuid

[Link to this property](#)

</details>

[Link to this property](#)

provider_ids: array of string

[Link to this property](#)

provider_names_by_id: map[string]

[Link to this property](#)

region: string

[Link to this property](#)

resource_group: string

[Link to this property](#)

<details>

<summary>

resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more

</summary>

One of the following:

"aws_customer_gateway"

[Link to this property](#)

"aws_egress_only_internet_gateway"

[Link to this property](#)

"aws_internet_gateway"

[Link to this property](#)

"aws_instance"

[Link to this property](#)

"aws_network_interface"

[Link to this property](#)

"aws_route"

[Link to this property](#)

"aws_route_table"

[Link to this property](#)

"aws_route_table_association"

[Link to this property](#)

"aws_subnet"

[Link to this property](#)

"aws_vpc"

[Link to this property](#)

"aws_vpc_ipv4_cidr_block_association"

[Link to this property](#)

"aws_vpn_connection"

[Link to this property](#)

"aws_vpn_connection_route"

[Link to this property](#)

"aws_vpn_gateway"

[Link to this property](#)

"aws_security_group"

[Link to this property](#)

"aws_vpc_security_group_ingress_rule"

[Link to this property](#)

"aws_vpc_security_group_egress_rule"

[Link to this property](#)

"aws_ec2_managed_prefix_list"

[Link to this property](#)

"aws_ec2_transit_gateway"

[Link to this property](#)

"aws_ec2_transit_gateway_prefix_list_reference"

[Link to this property](#)

"aws_ec2_transit_gateway_vpc_attachment"

[Link to this property](#)

"azurerm_application_security_group"

[Link to this property](#)

"azurerm_lb"

[Link to this property](#)

"azurerm_lb_backend_address_pool"

[Link to this property](#)

"azurerm_lb_nat_pool"

[Link to this property](#)

"azurerm_lb_nat_rule"

[Link to this property](#)

"azurerm_lb_rule"

[Link to this property](#)

"azurerm_local_network_gateway"

[Link to this property](#)

"azurerm_network_interface"

[Link to this property](#)

"azurerm_network_interface_application_security_group_association"

[Link to this property](#)

"azurerm_network_interface_backend_address_pool_association"

[Link to this property](#)

"azurerm_network_interface_security_group_association"

[Link to this property](#)

"azurerm_network_security_group"

[Link to this property](#)

"azurerm_public_ip"

[Link to this property](#)

"azurerm_route"

[Link to this property](#)

"azurerm_route_table"

[Link to this property](#)

"azurerm_subnet"

[Link to this property](#)

"azurerm_subnet_route_table_association"

[Link to this property](#)

"azurerm_virtual_machine"

[Link to this property](#)

"azurerm_virtual_network_gateway_connection"

[Link to this property](#)

"azurerm_virtual_network"

[Link to this property](#)

"azurerm_virtual_network_gateway"

[Link to this property](#)

"google_compute_network"

[Link to this property](#)

"google_compute_subnetwork"

[Link to this property](#)

"google_compute_vpn_gateway"

[Link to this property](#)

"google_compute_vpn_tunnel"

[Link to this property](#)

"google_compute_route"

[Link to this property](#)

"google_compute_address"

[Link to this property](#)

"google_compute_global_address"

[Link to this property](#)

"google_compute_router"

[Link to this property](#)

"google_compute_interconnect_attachment"

[Link to this property](#)

"google_compute_ha_vpn_gateway"

[Link to this property](#)

"google_compute_forwarding_rule"

[Link to this property](#)

"google_compute_network_firewall_policy"

[Link to this property](#)

"google_compute_network_firewall_policy_rule"

[Link to this property](#)

"cloudflare_static_route"

[Link to this property](#)

"cloudflare_ipsec_tunnel"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

sections: array of object { hidden_items, name, visible_items, help_text }

</summary>

<details>

<summary>

hidden_items: array of object { helpText, name, value }

</summary>

helpText: optional string

[Link to this property](#)

name: optional string

[Link to this property](#)

<details>

<summary>

value: optional object { item_type, string } or object { item_type, yaml } or object { item_type, yaml_diff } or 2 more

</summary>

One of the following:

<details>

<summary>

McnStringItem object { item_type, string }

</summary>

item_type: string

[Link to this property](#)

string: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnYamlItem object { item_type, yaml }

</summary>

item_type: string

[Link to this property](#)

yaml: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnYamlDiffItem object { item_type, yaml_diff }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

yaml_diff: object { diff, left_description, left_yaml, 2 more }

</summary>

diff: string

[Link to this property](#)

left_description: string

[Link to this property](#)

left_yaml: string

[Link to this property](#)

right_description: string

[Link to this property](#)

right_yaml: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnResourcePreviewItem object { item_type, resource_preview }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

resource_preview: object { id, cloud_type, detail, 3 more }

</summary>

id: string

formatuuid

[Link to this property](#)

<details>

<summary>

cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

[Link to this property](#)

"AZURE"

[Link to this property](#)

"GOOGLE"

[Link to this property](#)

"CLOUDFLARE"

[Link to this property](#)

</details>

[Link to this property](#)

detail: string

[Link to this property](#)

name: string

[Link to this property](#)

<details>

<summary>

resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more

</summary>

One of the following:

"aws_customer_gateway"

[Link to this property](#)

"aws_egress_only_internet_gateway"

[Link to this property](#)

"aws_internet_gateway"

[Link to this property](#)

"aws_instance"

[Link to this property](#)

"aws_network_interface"

[Link to this property](#)

"aws_route"

[Link to this property](#)

"aws_route_table"

[Link to this property](#)

"aws_route_table_association"

[Link to this property](#)

"aws_subnet"

[Link to this property](#)

"aws_vpc"

[Link to this property](#)

"aws_vpc_ipv4_cidr_block_association"

[Link to this property](#)

"aws_vpn_connection"

[Link to this property](#)

"aws_vpn_connection_route"

[Link to this property](#)

"aws_vpn_gateway"

[Link to this property](#)

"aws_security_group"

[Link to this property](#)

"aws_vpc_security_group_ingress_rule"

[Link to this property](#)

"aws_vpc_security_group_egress_rule"

[Link to this property](#)

"aws_ec2_managed_prefix_list"

[Link to this property](#)

"aws_ec2_transit_gateway"

[Link to this property](#)

"aws_ec2_transit_gateway_prefix_list_reference"

[Link to this property](#)

"aws_ec2_transit_gateway_vpc_attachment"

[Link to this property](#)

"azurerm_application_security_group"

[Link to this property](#)

"azurerm_lb"

[Link to this property](#)

"azurerm_lb_backend_address_pool"

[Link to this property](#)

"azurerm_lb_nat_pool"

[Link to this property](#)

"azurerm_lb_nat_rule"

[Link to this property](#)

"azurerm_lb_rule"

[Link to this property](#)

"azurerm_local_network_gateway"

[Link to this property](#)

"azurerm_network_interface"

[Link to this property](#)

"azurerm_network_interface_application_security_group_association"

[Link to this property](#)

"azurerm_network_interface_backend_address_pool_association"

[Link to this property](#)

"azurerm_network_interface_security_group_association"

[Link to this property](#)

"azurerm_network_security_group"

[Link to this property](#)

"azurerm_public_ip"

[Link to this property](#)

"azurerm_route"

[Link to this property](#)

"azurerm_route_table"

[Link to this property](#)

"azurerm_subnet"

[Link to this property](#)

"azurerm_subnet_route_table_association"

[Link to this property](#)

"azurerm_virtual_machine"

[Link to this property](#)

"azurerm_virtual_network_gateway_connection"

[Link to this property](#)

"azurerm_virtual_network"

[Link to this property](#)

"azurerm_virtual_network_gateway"

[Link to this property](#)

"google_compute_network"

[Link to this property](#)

"google_compute_subnetwork"

[Link to this property](#)

"google_compute_vpn_gateway"

[Link to this property](#)

"google_compute_vpn_tunnel"

[Link to this property](#)

"google_compute_route"

[Link to this property](#)

"google_compute_address"

[Link to this property](#)

"google_compute_global_address"

[Link to this property](#)

"google_compute_router"

[Link to this property](#)

"google_compute_interconnect_attachment"

[Link to this property](#)

"google_compute_ha_vpn_gateway"

[Link to this property](#)

"google_compute_forwarding_rule"

[Link to this property](#)

"google_compute_network_firewall_policy"

[Link to this property](#)

"google_compute_network_firewall_policy_rule"

[Link to this property](#)

"cloudflare_static_route"

[Link to this property](#)

"cloudflare_ipsec_tunnel"

[Link to this property](#)

</details>

[Link to this property](#)

title: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnListItem object { item_type, list }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

list: array of object { item_type, string } or object { item_type, resource_preview }

</summary>

One of the following:

<details>

<summary>

McnStringItem object { item_type, string }

</summary>

item_type: string

[Link to this property](#)

string: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnResourcePreviewItem object { item_type, resource_preview }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

resource_preview: object { id, cloud_type, detail, 3 more }

</summary>

id: string

formatuuid

[Link to this property](#)

<details>

<summary>

cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

[Link to this property](#)

"AZURE"

[Link to this property](#)

"GOOGLE"

[Link to this property](#)

"CLOUDFLARE"

[Link to this property](#)

</details>

[Link to this property](#)

detail: string

[Link to this property](#)

name: string

[Link to this property](#)

<details>

<summary>

resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more

</summary>

One of the following:

"aws_customer_gateway"

[Link to this property](#)

"aws_egress_only_internet_gateway"

[Link to this property](#)

"aws_internet_gateway"

[Link to this property](#)

"aws_instance"

[Link to this property](#)

"aws_network_interface"

[Link to this property](#)

"aws_route"

[Link to this property](#)

"aws_route_table"

[Link to this property](#)

"aws_route_table_association"

[Link to this property](#)

"aws_subnet"

[Link to this property](#)

"aws_vpc"

[Link to this property](#)

"aws_vpc_ipv4_cidr_block_association"

[Link to this property](#)

"aws_vpn_connection"

[Link to this property](#)

"aws_vpn_connection_route"

[Link to this property](#)

"aws_vpn_gateway"

[Link to this property](#)

"aws_security_group"

[Link to this property](#)

"aws_vpc_security_group_ingress_rule"

[Link to this property](#)

"aws_vpc_security_group_egress_rule"

[Link to this property](#)

"aws_ec2_managed_prefix_list"

[Link to this property](#)

"aws_ec2_transit_gateway"

[Link to this property](#)

"aws_ec2_transit_gateway_prefix_list_reference"

[Link to this property](#)

"aws_ec2_transit_gateway_vpc_attachment"

[Link to this property](#)

"azurerm_application_security_group"

[Link to this property](#)

"azurerm_lb"

[Link to this property](#)

"azurerm_lb_backend_address_pool"

[Link to this property](#)

"azurerm_lb_nat_pool"

[Link to this property](#)

"azurerm_lb_nat_rule"

[Link to this property](#)

"azurerm_lb_rule"

[Link to this property](#)

"azurerm_local_network_gateway"

[Link to this property](#)

"azurerm_network_interface"

[Link to this property](#)

"azurerm_network_interface_application_security_group_association"

[Link to this property](#)

"azurerm_network_interface_backend_address_pool_association"

[Link to this property](#)

"azurerm_network_interface_security_group_association"

[Link to this property](#)

"azurerm_network_security_group"

[Link to this property](#)

"azurerm_public_ip"

[Link to this property](#)

"azurerm_route"

[Link to this property](#)

"azurerm_route_table"

[Link to this property](#)

"azurerm_subnet"

[Link to this property](#)

"azurerm_subnet_route_table_association"

[Link to this property](#)

"azurerm_virtual_machine"

[Link to this property](#)

"azurerm_virtual_network_gateway_connection"

[Link to this property](#)

"azurerm_virtual_network"

[Link to this property](#)

"azurerm_virtual_network_gateway"

[Link to this property](#)

"google_compute_network"

[Link to this property](#)

"google_compute_subnetwork"

[Link to this property](#)

"google_compute_vpn_gateway"

[Link to this property](#)

"google_compute_vpn_tunnel"

[Link to this property](#)

"google_compute_route"

[Link to this property](#)

"google_compute_address"

[Link to this property](#)

"google_compute_global_address"

[Link to this property](#)

"google_compute_router"

[Link to this property](#)

"google_compute_interconnect_attachment"

[Link to this property](#)

"google_compute_ha_vpn_gateway"

[Link to this property](#)

"google_compute_forwarding_rule"

[Link to this property](#)

"google_compute_network_firewall_policy"

[Link to this property](#)

"google_compute_network_firewall_policy_rule"

[Link to this property](#)

"cloudflare_static_route"

[Link to this property](#)

"cloudflare_ipsec_tunnel"

[Link to this property](#)

</details>

[Link to this property](#)

title: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

name: string

[Link to this property](#)

<details>

<summary>

visible_items: array of object { helpText, name, value }

</summary>

helpText: optional string

[Link to this property](#)

name: optional string

[Link to this property](#)

<details>

<summary>

value: optional object { item_type, string } or object { item_type, yaml } or object { item_type, yaml_diff } or 2 more

</summary>

One of the following:

<details>

<summary>

McnStringItem object { item_type, string }

</summary>

item_type: string

[Link to this property](#)

string: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnYamlItem object { item_type, yaml }

</summary>

item_type: string

[Link to this property](#)

yaml: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnYamlDiffItem object { item_type, yaml_diff }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

yaml_diff: object { diff, left_description, left_yaml, 2 more }

</summary>

diff: string

[Link to this property](#)

left_description: string

[Link to this property](#)

left_yaml: string

[Link to this property](#)

right_description: string

[Link to this property](#)

right_yaml: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnResourcePreviewItem object { item_type, resource_preview }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

resource_preview: object { id, cloud_type, detail, 3 more }

</summary>

id: string

formatuuid

[Link to this property](#)

<details>

<summary>

cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

[Link to this property](#)

"AZURE"

[Link to this property](#)

"GOOGLE"

[Link to this property](#)

"CLOUDFLARE"

[Link to this property](#)

</details>

[Link to this property](#)

detail: string

[Link to this property](#)

name: string

[Link to this property](#)

<details>

<summary>

resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more

</summary>

One of the following:

"aws_customer_gateway"

[Link to this property](#)

"aws_egress_only_internet_gateway"

[Link to this property](#)

"aws_internet_gateway"

[Link to this property](#)

"aws_instance"

[Link to this property](#)

"aws_network_interface"

[Link to this property](#)

"aws_route"

[Link to this property](#)

"aws_route_table"

[Link to this property](#)

"aws_route_table_association"

[Link to this property](#)

"aws_subnet"

[Link to this property](#)

"aws_vpc"

[Link to this property](#)

"aws_vpc_ipv4_cidr_block_association"

[Link to this property](#)

"aws_vpn_connection"

[Link to this property](#)

"aws_vpn_connection_route"

[Link to this property](#)

"aws_vpn_gateway"

[Link to this property](#)

"aws_security_group"

[Link to this property](#)

"aws_vpc_security_group_ingress_rule"

[Link to this property](#)

"aws_vpc_security_group_egress_rule"

[Link to this property](#)

"aws_ec2_managed_prefix_list"

[Link to this property](#)

"aws_ec2_transit_gateway"

[Link to this property](#)

"aws_ec2_transit_gateway_prefix_list_reference"

[Link to this property](#)

"aws_ec2_transit_gateway_vpc_attachment"

[Link to this property](#)

"azurerm_application_security_group"

[Link to this property](#)

"azurerm_lb"

[Link to this property](#)

"azurerm_lb_backend_address_pool"

[Link to this property](#)

"azurerm_lb_nat_pool"

[Link to this property](#)

"azurerm_lb_nat_rule"

[Link to this property](#)

"azurerm_lb_rule"

[Link to this property](#)

"azurerm_local_network_gateway"

[Link to this property](#)

"azurerm_network_interface"

[Link to this property](#)

"azurerm_network_interface_application_security_group_association"

[Link to this property](#)

"azurerm_network_interface_backend_address_pool_association"

[Link to this property](#)

"azurerm_network_interface_security_group_association"

[Link to this property](#)

"azurerm_network_security_group"

[Link to this property](#)

"azurerm_public_ip"

[Link to this property](#)

"azurerm_route"

[Link to this property](#)

"azurerm_route_table"

[Link to this property](#)

"azurerm_subnet"

[Link to this property](#)

"azurerm_subnet_route_table_association"

[Link to this property](#)

"azurerm_virtual_machine"

[Link to this property](#)

"azurerm_virtual_network_gateway_connection"

[Link to this property](#)

"azurerm_virtual_network"

[Link to this property](#)

"azurerm_virtual_network_gateway"

[Link to this property](#)

"google_compute_network"

[Link to this property](#)

"google_compute_subnetwork"

[Link to this property](#)

"google_compute_vpn_gateway"

[Link to this property](#)

"google_compute_vpn_tunnel"

[Link to this property](#)

"google_compute_route"

[Link to this property](#)

"google_compute_address"

[Link to this property](#)

"google_compute_global_address"

[Link to this property](#)

"google_compute_router"

[Link to this property](#)

"google_compute_interconnect_attachment"

[Link to this property](#)

"google_compute_ha_vpn_gateway"

[Link to this property](#)

"google_compute_forwarding_rule"

[Link to this property](#)

"google_compute_network_firewall_policy"

[Link to this property](#)

"google_compute_network_firewall_policy_rule"

[Link to this property](#)

"cloudflare_static_route"

[Link to this property](#)

"cloudflare_ipsec_tunnel"

[Link to this property](#)

</details>

[Link to this property](#)

title: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnListItem object { item_type, list }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

list: array of object { item_type, string } or object { item_type, resource_preview }

</summary>

One of the following:

<details>

<summary>

McnStringItem object { item_type, string }

</summary>

item_type: string

[Link to this property](#)

string: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnResourcePreviewItem object { item_type, resource_preview }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

resource_preview: object { id, cloud_type, detail, 3 more }

</summary>

id: string

formatuuid

[Link to this property](#)

<details>

<summary>

cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

[Link to this property](#)

"AZURE"

[Link to this property](#)

"GOOGLE"

[Link to this property](#)

"CLOUDFLARE"

[Link to this property](#)

</details>

[Link to this property](#)

detail: string

[Link to this property](#)

name: string

[Link to this property](#)

<details>

<summary>

resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more

</summary>

One of the following:

"aws_customer_gateway"

[Link to this property](#)

"aws_egress_only_internet_gateway"

[Link to this property](#)

"aws_internet_gateway"

[Link to this property](#)

"aws_instance"

[Link to this property](#)

"aws_network_interface"

[Link to this property](#)

"aws_route"

[Link to this property](#)

"aws_route_table"

[Link to this property](#)

"aws_route_table_association"

[Link to this property](#)

"aws_subnet"

[Link to this property](#)

"aws_vpc"

[Link to this property](#)

"aws_vpc_ipv4_cidr_block_association"

[Link to this property](#)

"aws_vpn_connection"

[Link to this property](#)

"aws_vpn_connection_route"

[Link to this property](#)

"aws_vpn_gateway"

[Link to this property](#)

"aws_security_group"

[Link to this property](#)

"aws_vpc_security_group_ingress_rule"

[Link to this property](#)

"aws_vpc_security_group_egress_rule"

[Link to this property](#)

"aws_ec2_managed_prefix_list"

[Link to this property](#)

"aws_ec2_transit_gateway"

[Link to this property](#)

"aws_ec2_transit_gateway_prefix_list_reference"

[Link to this property](#)

"aws_ec2_transit_gateway_vpc_attachment"

[Link to this property](#)

"azurerm_application_security_group"

[Link to this property](#)

"azurerm_lb"

[Link to this property](#)

"azurerm_lb_backend_address_pool"

[Link to this property](#)

"azurerm_lb_nat_pool"

[Link to this property](#)

"azurerm_lb_nat_rule"

[Link to this property](#)

"azurerm_lb_rule"

[Link to this property](#)

"azurerm_local_network_gateway"

[Link to this property](#)

"azurerm_network_interface"

[Link to this property](#)

"azurerm_network_interface_application_security_group_association"

[Link to this property](#)

"azurerm_network_interface_backend_address_pool_association"

[Link to this property](#)

"azurerm_network_interface_security_group_association"

[Link to this property](#)

"azurerm_network_security_group"

[Link to this property](#)

"azurerm_public_ip"

[Link to this property](#)

"azurerm_route"

[Link to this property](#)

"azurerm_route_table"

[Link to this property](#)

"azurerm_subnet"

[Link to this property](#)

"azurerm_subnet_route_table_association"

[Link to this property](#)

"azurerm_virtual_machine"

[Link to this property](#)

"azurerm_virtual_network_gateway_connection"

[Link to this property](#)

"azurerm_virtual_network"

[Link to this property](#)

"azurerm_virtual_network_gateway"

[Link to this property](#)

"google_compute_network"

[Link to this property](#)

"google_compute_subnetwork"

[Link to this property](#)

"google_compute_vpn_gateway"

[Link to this property](#)

"google_compute_vpn_tunnel"

[Link to this property](#)

"google_compute_route"

[Link to this property](#)

"google_compute_address"

[Link to this property](#)

"google_compute_global_address"

[Link to this property](#)

"google_compute_router"

[Link to this property](#)

"google_compute_interconnect_attachment"

[Link to this property](#)

"google_compute_ha_vpn_gateway"

[Link to this property](#)

"google_compute_forwarding_rule"

[Link to this property](#)

"google_compute_network_firewall_policy"

[Link to this property](#)

"google_compute_network_firewall_policy_rule"

[Link to this property](#)

"cloudflare_static_route"

[Link to this property](#)

"cloudflare_ipsec_tunnel"

[Link to this property](#)

</details>

[Link to this property](#)

title: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

help_text: optional string

[Link to this property](#)

</details>

[Link to this property](#)

state: map[unknown]

[Link to this property](#)

tags: map[string]

[Link to this property](#)

updated_at: string

[Link to this property](#)

url: string

[Link to this property](#)

<details>

<summary>

managed_by: optional array of object { id, client_type, name }

</summary>

id: string

formatuuid

[Link to this property](#)

client_type: "MAGIC_WAN_CLOUD_ONRAMP"

[Link to this property](#)

name: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

vpcs_by_id_unavailable: optional array of string

The list of vpc IDs for which resource details failed to generate.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

OnRampGetResponse object { id, cloud_type, dynamic_routing, 26 more }

</summary>

id: string

formatuuid

[Link to this property](#)

<details>

<summary>

cloud_type: "AWS" or "AZURE" or "GOOGLE"

</summary>

One of the following:

"AWS"

[Link to this property](#)

"AZURE"

[Link to this property](#)

"GOOGLE"

[Link to this property](#)

</details>

[Link to this property](#)

dynamic_routing: boolean

[Link to this property](#)

install_routes_in_cloud: boolean

[Link to this property](#)

install_routes_in_magic_wan: boolean

[Link to this property](#)

name: string

[Link to this property](#)

<details>

<summary>

type: "OnrampTypeSingle" or "OnrampTypeHub"

</summary>

One of the following:

"OnrampTypeSingle"

[Link to this property](#)

"OnrampTypeHub"

[Link to this property](#)

</details>

[Link to this property](#)

updated_at: string

[Link to this property](#)

attached_hubs: optional array of string

[Link to this property](#)

attached_vpcs: optional array of string

[Link to this property](#)

cloud_asn: optional number

formatuint32

[Link to this property](#)

description: optional string

[Link to this property](#)

hub: optional string

formatuuid

[Link to this property](#)

last_applied_at: optional string

[Link to this property](#)

last_exported_at: optional string

[Link to this property](#)

last_planned_at: optional string

[Link to this property](#)

manage_hub_to_hub_attachments: optional boolean

[Link to this property](#)

manage_vpc_to_hub_attachments: optional boolean

[Link to this property](#)

<details>

<summary>

planned_monthly_cost_estimate: optional object { currency, current_monthly_cost, diff, proposed_monthly_cost }

</summary>

currency: string

[Link to this property](#)

current_monthly_cost: number

formatdouble

[Link to this property](#)

diff: number

formatdouble

[Link to this property](#)

proposed_monthly_cost: number

formatdouble

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

planned_resources: optional array of object { diff, keys_require_replace, monthly_cost_estimate_diff, 2 more }

</summary>

<details>

<summary>

diff: object { diff, left_description, left_yaml, 2 more }

</summary>

diff: string

[Link to this property](#)

left_description: string

[Link to this property](#)

left_yaml: string

[Link to this property](#)

right_description: string

[Link to this property](#)

right_yaml: string

[Link to this property](#)

</details>

[Link to this property](#)

keys_require_replace: array of string

[Link to this property](#)

<details>

<summary>

monthly_cost_estimate_diff: object { currency, current_monthly_cost, diff, proposed_monthly_cost }

</summary>

currency: string

[Link to this property](#)

current_monthly_cost: number

formatdouble

[Link to this property](#)

diff: number

formatdouble

[Link to this property](#)

proposed_monthly_cost: number

formatdouble

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

planned_action: "no_op" or "create" or "update" or 2 more

</summary>

One of the following:

"no_op"

[Link to this property](#)

"create"

[Link to this property](#)

"update"

[Link to this property](#)

"replace"

[Link to this property](#)

"destroy"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

resource: object { id, cloud_type, detail, 3 more }

</summary>

id: string

formatuuid

[Link to this property](#)

<details>

<summary>

cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

[Link to this property](#)

"AZURE"

[Link to this property](#)

"GOOGLE"

[Link to this property](#)

"CLOUDFLARE"

[Link to this property](#)

</details>

[Link to this property](#)

detail: string

[Link to this property](#)

name: string

[Link to this property](#)

<details>

<summary>

resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more

</summary>

One of the following:

"aws_customer_gateway"

[Link to this property](#)

"aws_egress_only_internet_gateway"

[Link to this property](#)

"aws_internet_gateway"

[Link to this property](#)

"aws_instance"

[Link to this property](#)

"aws_network_interface"

[Link to this property](#)

"aws_route"

[Link to this property](#)

"aws_route_table"

[Link to this property](#)

"aws_route_table_association"

[Link to this property](#)

"aws_subnet"

[Link to this property](#)

"aws_vpc"

[Link to this property](#)

"aws_vpc_ipv4_cidr_block_association"

[Link to this property](#)

"aws_vpn_connection"

[Link to this property](#)

"aws_vpn_connection_route"

[Link to this property](#)

"aws_vpn_gateway"

[Link to this property](#)

"aws_security_group"

[Link to this property](#)

"aws_vpc_security_group_ingress_rule"

[Link to this property](#)

"aws_vpc_security_group_egress_rule"

[Link to this property](#)

"aws_ec2_managed_prefix_list"

[Link to this property](#)

"aws_ec2_transit_gateway"

[Link to this property](#)

"aws_ec2_transit_gateway_prefix_list_reference"

[Link to this property](#)

"aws_ec2_transit_gateway_vpc_attachment"

[Link to this property](#)

"azurerm_application_security_group"

[Link to this property](#)

"azurerm_lb"

[Link to this property](#)

"azurerm_lb_backend_address_pool"

[Link to this property](#)

"azurerm_lb_nat_pool"

[Link to this property](#)

"azurerm_lb_nat_rule"

[Link to this property](#)

"azurerm_lb_rule"

[Link to this property](#)

"azurerm_local_network_gateway"

[Link to this property](#)

"azurerm_network_interface"

[Link to this property](#)

"azurerm_network_interface_application_security_group_association"

[Link to this property](#)

"azurerm_network_interface_backend_address_pool_association"

[Link to this property](#)

"azurerm_network_interface_security_group_association"

[Link to this property](#)

"azurerm_network_security_group"

[Link to this property](#)

"azurerm_public_ip"

[Link to this property](#)

"azurerm_route"

[Link to this property](#)

"azurerm_route_table"

[Link to this property](#)

"azurerm_subnet"

[Link to this property](#)

"azurerm_subnet_route_table_association"

[Link to this property](#)

"azurerm_virtual_machine"

[Link to this property](#)

"azurerm_virtual_network_gateway_connection"

[Link to this property](#)

"azurerm_virtual_network"

[Link to this property](#)

"azurerm_virtual_network_gateway"

[Link to this property](#)

"google_compute_network"

[Link to this property](#)

"google_compute_subnetwork"

[Link to this property](#)

"google_compute_vpn_gateway"

[Link to this property](#)

"google_compute_vpn_tunnel"

[Link to this property](#)

"google_compute_route"

[Link to this property](#)

"google_compute_address"

[Link to this property](#)

"google_compute_global_address"

[Link to this property](#)

"google_compute_router"

[Link to this property](#)

"google_compute_interconnect_attachment"

[Link to this property](#)

"google_compute_ha_vpn_gateway"

[Link to this property](#)

"google_compute_forwarding_rule"

[Link to this property](#)

"google_compute_network_firewall_policy"

[Link to this property](#)

"google_compute_network_firewall_policy_rule"

[Link to this property](#)

"cloudflare_static_route"

[Link to this property](#)

"cloudflare_ipsec_tunnel"

[Link to this property](#)

</details>

[Link to this property](#)

title: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

planned_resources_unavailable: optional boolean

[Link to this property](#)

<details>

<summary>

post_apply_monthly_cost_estimate: optional object { currency, monthly_cost }

</summary>

currency: string

[Link to this property](#)

monthly_cost: number

formatdouble

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

post_apply_resources: optional map[object { id, account_id, cloud_type, 18 more } ]

</summary>

id: string

formatuuid

[Link to this property](#)

account_id: string

[Link to this property](#)

<details>

<summary>

cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

[Link to this property](#)

"AZURE"

[Link to this property](#)

"GOOGLE"

[Link to this property](#)

"CLOUDFLARE"

[Link to this property](#)

</details>

[Link to this property](#)

config: map[unknown]

[Link to this property](#)

deployment_provider: string

formatuuid

[Link to this property](#)

managed: boolean

[Link to this property](#)

<details>

<summary>

monthly_cost_estimate: object { currency, monthly_cost }

</summary>

currency: string

[Link to this property](#)

monthly_cost: number

formatdouble

[Link to this property](#)

</details>

[Link to this property](#)

name: string

[Link to this property](#)

native_id: string

[Link to this property](#)

<details>

<summary>

observations: map[object { first_observed_at, last_observed_at, provider_id, resource_id } ]

</summary>

first_observed_at: string

[Link to this property](#)

last_observed_at: string

[Link to this property](#)

provider_id: string

formatuuid

[Link to this property](#)

resource_id: string

formatuuid

[Link to this property](#)

</details>

[Link to this property](#)

provider_ids: array of string

[Link to this property](#)

provider_names_by_id: map[string]

[Link to this property](#)

region: string

[Link to this property](#)

resource_group: string

[Link to this property](#)

<details>

<summary>

resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more

</summary>

One of the following:

"aws_customer_gateway"

[Link to this property](#)

"aws_egress_only_internet_gateway"

[Link to this property](#)

"aws_internet_gateway"

[Link to this property](#)

"aws_instance"

[Link to this property](#)

"aws_network_interface"

[Link to this property](#)

"aws_route"

[Link to this property](#)

"aws_route_table"

[Link to this property](#)

"aws_route_table_association"

[Link to this property](#)

"aws_subnet"

[Link to this property](#)

"aws_vpc"

[Link to this property](#)

"aws_vpc_ipv4_cidr_block_association"

[Link to this property](#)

"aws_vpn_connection"

[Link to this property](#)

"aws_vpn_connection_route"

[Link to this property](#)

"aws_vpn_gateway"

[Link to this property](#)

"aws_security_group"

[Link to this property](#)

"aws_vpc_security_group_ingress_rule"

[Link to this property](#)

"aws_vpc_security_group_egress_rule"

[Link to this property](#)

"aws_ec2_managed_prefix_list"

[Link to this property](#)

"aws_ec2_transit_gateway"

[Link to this property](#)

"aws_ec2_transit_gateway_prefix_list_reference"

[Link to this property](#)

"aws_ec2_transit_gateway_vpc_attachment"

[Link to this property](#)

"azurerm_application_security_group"

[Link to this property](#)

"azurerm_lb"

[Link to this property](#)

"azurerm_lb_backend_address_pool"

[Link to this property](#)

"azurerm_lb_nat_pool"

[Link to this property](#)

"azurerm_lb_nat_rule"

[Link to this property](#)

"azurerm_lb_rule"

[Link to this property](#)

"azurerm_local_network_gateway"

[Link to this property](#)

"azurerm_network_interface"

[Link to this property](#)

"azurerm_network_interface_application_security_group_association"

[Link to this property](#)

"azurerm_network_interface_backend_address_pool_association"

[Link to this property](#)

"azurerm_network_interface_security_group_association"

[Link to this property](#)

"azurerm_network_security_group"

[Link to this property](#)

"azurerm_public_ip"

[Link to this property](#)

"azurerm_route"

[Link to this property](#)

"azurerm_route_table"

[Link to this property](#)

"azurerm_subnet"

[Link to this property](#)

"azurerm_subnet_route_table_association"

[Link to this property](#)

"azurerm_virtual_machine"

[Link to this property](#)

"azurerm_virtual_network_gateway_connection"

[Link to this property](#)

"azurerm_virtual_network"

[Link to this property](#)

"azurerm_virtual_network_gateway"

[Link to this property](#)

"google_compute_network"

[Link to this property](#)

"google_compute_subnetwork"

[Link to this property](#)

"google_compute_vpn_gateway"

[Link to this property](#)

"google_compute_vpn_tunnel"

[Link to this property](#)

"google_compute_route"

[Link to this property](#)

"google_compute_address"

[Link to this property](#)

"google_compute_global_address"

[Link to this property](#)

"google_compute_router"

[Link to this property](#)

"google_compute_interconnect_attachment"

[Link to this property](#)

"google_compute_ha_vpn_gateway"

[Link to this property](#)

"google_compute_forwarding_rule"

[Link to this property](#)

"google_compute_network_firewall_policy"

[Link to this property](#)

"google_compute_network_firewall_policy_rule"

[Link to this property](#)

"cloudflare_static_route"

[Link to this property](#)

"cloudflare_ipsec_tunnel"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

sections: array of object { hidden_items, name, visible_items, help_text }

</summary>

<details>

<summary>

hidden_items: array of object { helpText, name, value }

</summary>

helpText: optional string

[Link to this property](#)

name: optional string

[Link to this property](#)

<details>

<summary>

value: optional object { item_type, string } or object { item_type, yaml } or object { item_type, yaml_diff } or 2 more

</summary>

One of the following:

<details>

<summary>

McnStringItem object { item_type, string }

</summary>

item_type: string

[Link to this property](#)

string: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnYamlItem object { item_type, yaml }

</summary>

item_type: string

[Link to this property](#)

yaml: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnYamlDiffItem object { item_type, yaml_diff }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

yaml_diff: object { diff, left_description, left_yaml, 2 more }

</summary>

diff: string

[Link to this property](#)

left_description: string

[Link to this property](#)

left_yaml: string

[Link to this property](#)

right_description: string

[Link to this property](#)

right_yaml: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnResourcePreviewItem object { item_type, resource_preview }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

resource_preview: object { id, cloud_type, detail, 3 more }

</summary>

id: string

formatuuid

[Link to this property](#)

<details>

<summary>

cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

[Link to this property](#)

"AZURE"

[Link to this property](#)

"GOOGLE"

[Link to this property](#)

"CLOUDFLARE"

[Link to this property](#)

</details>

[Link to this property](#)

detail: string

[Link to this property](#)

name: string

[Link to this property](#)

<details>

<summary>

resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more

</summary>

One of the following:

"aws_customer_gateway"

[Link to this property](#)

"aws_egress_only_internet_gateway"

[Link to this property](#)

"aws_internet_gateway"

[Link to this property](#)

"aws_instance"

[Link to this property](#)

"aws_network_interface"

[Link to this property](#)

"aws_route"

[Link to this property](#)

"aws_route_table"

[Link to this property](#)

"aws_route_table_association"

[Link to this property](#)

"aws_subnet"

[Link to this property](#)

"aws_vpc"

[Link to this property](#)

"aws_vpc_ipv4_cidr_block_association"

[Link to this property](#)

"aws_vpn_connection"

[Link to this property](#)

"aws_vpn_connection_route"

[Link to this property](#)

"aws_vpn_gateway"

[Link to this property](#)

"aws_security_group"

[Link to this property](#)

"aws_vpc_security_group_ingress_rule"

[Link to this property](#)

"aws_vpc_security_group_egress_rule"

[Link to this property](#)

"aws_ec2_managed_prefix_list"

[Link to this property](#)

"aws_ec2_transit_gateway"

[Link to this property](#)

"aws_ec2_transit_gateway_prefix_list_reference"

[Link to this property](#)

"aws_ec2_transit_gateway_vpc_attachment"

[Link to this property](#)

"azurerm_application_security_group"

[Link to this property](#)

"azurerm_lb"

[Link to this property](#)

"azurerm_lb_backend_address_pool"

[Link to this property](#)

"azurerm_lb_nat_pool"

[Link to this property](#)

"azurerm_lb_nat_rule"

[Link to this property](#)

"azurerm_lb_rule"

[Link to this property](#)

"azurerm_local_network_gateway"

[Link to this property](#)

"azurerm_network_interface"

[Link to this property](#)

"azurerm_network_interface_application_security_group_association"

[Link to this property](#)

"azurerm_network_interface_backend_address_pool_association"

[Link to this property](#)

"azurerm_network_interface_security_group_association"

[Link to this property](#)

"azurerm_network_security_group"

[Link to this property](#)

"azurerm_public_ip"

[Link to this property](#)

"azurerm_route"

[Link to this property](#)

"azurerm_route_table"

[Link to this property](#)

"azurerm_subnet"

[Link to this property](#)

"azurerm_subnet_route_table_association"

[Link to this property](#)

"azurerm_virtual_machine"

[Link to this property](#)

"azurerm_virtual_network_gateway_connection"

[Link to this property](#)

"azurerm_virtual_network"

[Link to this property](#)

"azurerm_virtual_network_gateway"

[Link to this property](#)

"google_compute_network"

[Link to this property](#)

"google_compute_subnetwork"

[Link to this property](#)

"google_compute_vpn_gateway"

[Link to this property](#)

"google_compute_vpn_tunnel"

[Link to this property](#)

"google_compute_route"

[Link to this property](#)

"google_compute_address"

[Link to this property](#)

"google_compute_global_address"

[Link to this property](#)

"google_compute_router"

[Link to this property](#)

"google_compute_interconnect_attachment"

[Link to this property](#)

"google_compute_ha_vpn_gateway"

[Link to this property](#)

"google_compute_forwarding_rule"

[Link to this property](#)

"google_compute_network_firewall_policy"

[Link to this property](#)

"google_compute_network_firewall_policy_rule"

[Link to this property](#)

"cloudflare_static_route"

[Link to this property](#)

"cloudflare_ipsec_tunnel"

[Link to this property](#)

</details>

[Link to this property](#)

title: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnListItem object { item_type, list }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

list: array of object { item_type, string } or object { item_type, resource_preview }

</summary>

One of the following:

<details>

<summary>

McnStringItem object { item_type, string }

</summary>

item_type: string

[Link to this property](#)

string: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnResourcePreviewItem object { item_type, resource_preview }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

resource_preview: object { id, cloud_type, detail, 3 more }

</summary>

id: string

formatuuid

[Link to this property](#)

<details>

<summary>

cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

[Link to this property](#)

"AZURE"

[Link to this property](#)

"GOOGLE"

[Link to this property](#)

"CLOUDFLARE"

[Link to this property](#)

</details>

[Link to this property](#)

detail: string

[Link to this property](#)

name: string

[Link to this property](#)

<details>

<summary>

resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more

</summary>

One of the following:

"aws_customer_gateway"

[Link to this property](#)

"aws_egress_only_internet_gateway"

[Link to this property](#)

"aws_internet_gateway"

[Link to this property](#)

"aws_instance"

[Link to this property](#)

"aws_network_interface"

[Link to this property](#)

"aws_route"

[Link to this property](#)

"aws_route_table"

[Link to this property](#)

"aws_route_table_association"

[Link to this property](#)

"aws_subnet"

[Link to this property](#)

"aws_vpc"

[Link to this property](#)

"aws_vpc_ipv4_cidr_block_association"

[Link to this property](#)

"aws_vpn_connection"

[Link to this property](#)

"aws_vpn_connection_route"

[Link to this property](#)

"aws_vpn_gateway"

[Link to this property](#)

"aws_security_group"

[Link to this property](#)

"aws_vpc_security_group_ingress_rule"

[Link to this property](#)

"aws_vpc_security_group_egress_rule"

[Link to this property](#)

"aws_ec2_managed_prefix_list"

[Link to this property](#)

"aws_ec2_transit_gateway"

[Link to this property](#)

"aws_ec2_transit_gateway_prefix_list_reference"

[Link to this property](#)

"aws_ec2_transit_gateway_vpc_attachment"

[Link to this property](#)

"azurerm_application_security_group"

[Link to this property](#)

"azurerm_lb"

[Link to this property](#)

"azurerm_lb_backend_address_pool"

[Link to this property](#)

"azurerm_lb_nat_pool"

[Link to this property](#)

"azurerm_lb_nat_rule"

[Link to this property](#)

"azurerm_lb_rule"

[Link to this property](#)

"azurerm_local_network_gateway"

[Link to this property](#)

"azurerm_network_interface"

[Link to this property](#)

"azurerm_network_interface_application_security_group_association"

[Link to this property](#)

"azurerm_network_interface_backend_address_pool_association"

[Link to this property](#)

"azurerm_network_interface_security_group_association"

[Link to this property](#)

"azurerm_network_security_group"

[Link to this property](#)

"azurerm_public_ip"

[Link to this property](#)

"azurerm_route"

[Link to this property](#)

"azurerm_route_table"

[Link to this property](#)

"azurerm_subnet"

[Link to this property](#)

"azurerm_subnet_route_table_association"

[Link to this property](#)

"azurerm_virtual_machine"

[Link to this property](#)

"azurerm_virtual_network_gateway_connection"

[Link to this property](#)

"azurerm_virtual_network"

[Link to this property](#)

"azurerm_virtual_network_gateway"

[Link to this property](#)

"google_compute_network"

[Link to this property](#)

"google_compute_subnetwork"

[Link to this property](#)

"google_compute_vpn_gateway"

[Link to this property](#)

"google_compute_vpn_tunnel"

[Link to this property](#)

"google_compute_route"

[Link to this property](#)

"google_compute_address"

[Link to this property](#)

"google_compute_global_address"

[Link to this property](#)

"google_compute_router"

[Link to this property](#)

"google_compute_interconnect_attachment"

[Link to this property](#)

"google_compute_ha_vpn_gateway"

[Link to this property](#)

"google_compute_forwarding_rule"

[Link to this property](#)

"google_compute_network_firewall_policy"

[Link to this property](#)

"google_compute_network_firewall_policy_rule"

[Link to this property](#)

"cloudflare_static_route"

[Link to this property](#)

"cloudflare_ipsec_tunnel"

[Link to this property](#)

</details>

[Link to this property](#)

title: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

name: string

[Link to this property](#)

<details>

<summary>

visible_items: array of object { helpText, name, value }

</summary>

helpText: optional string

[Link to this property](#)

name: optional string

[Link to this property](#)

<details>

<summary>

value: optional object { item_type, string } or object { item_type, yaml } or object { item_type, yaml_diff } or 2 more

</summary>

One of the following:

<details>

<summary>

McnStringItem object { item_type, string }

</summary>

item_type: string

[Link to this property](#)

string: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnYamlItem object { item_type, yaml }

</summary>

item_type: string

[Link to this property](#)

yaml: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnYamlDiffItem object { item_type, yaml_diff }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

yaml_diff: object { diff, left_description, left_yaml, 2 more }

</summary>

diff: string

[Link to this property](#)

left_description: string

[Link to this property](#)

left_yaml: string

[Link to this property](#)

right_description: string

[Link to this property](#)

right_yaml: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnResourcePreviewItem object { item_type, resource_preview }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

resource_preview: object { id, cloud_type, detail, 3 more }

</summary>

id: string

formatuuid

[Link to this property](#)

<details>

<summary>

cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

[Link to this property](#)

"AZURE"

[Link to this property](#)

"GOOGLE"

[Link to this property](#)

"CLOUDFLARE"

[Link to this property](#)

</details>

[Link to this property](#)

detail: string

[Link to this property](#)

name: string

[Link to this property](#)

<details>

<summary>

resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more

</summary>

One of the following:

"aws_customer_gateway"

[Link to this property](#)

"aws_egress_only_internet_gateway"

[Link to this property](#)

"aws_internet_gateway"

[Link to this property](#)

"aws_instance"

[Link to this property](#)

"aws_network_interface"

[Link to this property](#)

"aws_route"

[Link to this property](#)

"aws_route_table"

[Link to this property](#)

"aws_route_table_association"

[Link to this property](#)

"aws_subnet"

[Link to this property](#)

"aws_vpc"

[Link to this property](#)

"aws_vpc_ipv4_cidr_block_association"

[Link to this property](#)

"aws_vpn_connection"

[Link to this property](#)

"aws_vpn_connection_route"

[Link to this property](#)

"aws_vpn_gateway"

[Link to this property](#)

"aws_security_group"

[Link to this property](#)

"aws_vpc_security_group_ingress_rule"

[Link to this property](#)

"aws_vpc_security_group_egress_rule"

[Link to this property](#)

"aws_ec2_managed_prefix_list"

[Link to this property](#)

"aws_ec2_transit_gateway"

[Link to this property](#)

"aws_ec2_transit_gateway_prefix_list_reference"

[Link to this property](#)

"aws_ec2_transit_gateway_vpc_attachment"

[Link to this property](#)

"azurerm_application_security_group"

[Link to this property](#)

"azurerm_lb"

[Link to this property](#)

"azurerm_lb_backend_address_pool"

[Link to this property](#)

"azurerm_lb_nat_pool"

[Link to this property](#)

"azurerm_lb_nat_rule"

[Link to this property](#)

"azurerm_lb_rule"

[Link to this property](#)

"azurerm_local_network_gateway"

[Link to this property](#)

"azurerm_network_interface"

[Link to this property](#)

"azurerm_network_interface_application_security_group_association"

[Link to this property](#)

"azurerm_network_interface_backend_address_pool_association"

[Link to this property](#)

"azurerm_network_interface_security_group_association"

[Link to this property](#)

"azurerm_network_security_group"

[Link to this property](#)

"azurerm_public_ip"

[Link to this property](#)

"azurerm_route"

[Link to this property](#)

"azurerm_route_table"

[Link to this property](#)

"azurerm_subnet"

[Link to this property](#)

"azurerm_subnet_route_table_association"

[Link to this property](#)

"azurerm_virtual_machine"

[Link to this property](#)

"azurerm_virtual_network_gateway_connection"

[Link to this property](#)

"azurerm_virtual_network"

[Link to this property](#)

"azurerm_virtual_network_gateway"

[Link to this property](#)

"google_compute_network"

[Link to this property](#)

"google_compute_subnetwork"

[Link to this property](#)

"google_compute_vpn_gateway"

[Link to this property](#)

"google_compute_vpn_tunnel"

[Link to this property](#)

"google_compute_route"

[Link to this property](#)

"google_compute_address"

[Link to this property](#)

"google_compute_global_address"

[Link to this property](#)

"google_compute_router"

[Link to this property](#)

"google_compute_interconnect_attachment"

[Link to this property](#)

"google_compute_ha_vpn_gateway"

[Link to this property](#)

"google_compute_forwarding_rule"

[Link to this property](#)

"google_compute_network_firewall_policy"

[Link to this property](#)

"google_compute_network_firewall_policy_rule"

[Link to this property](#)

"cloudflare_static_route"

[Link to this property](#)

"cloudflare_ipsec_tunnel"

[Link to this property](#)

</details>

[Link to this property](#)

title: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnListItem object { item_type, list }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

list: array of object { item_type, string } or object { item_type, resource_preview }

</summary>

One of the following:

<details>

<summary>

McnStringItem object { item_type, string }

</summary>

item_type: string

[Link to this property](#)

string: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnResourcePreviewItem object { item_type, resource_preview }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

resource_preview: object { id, cloud_type, detail, 3 more }

</summary>

id: string

formatuuid

[Link to this property](#)

<details>

<summary>

cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

[Link to this property](#)

"AZURE"

[Link to this property](#)

"GOOGLE"

[Link to this property](#)

"CLOUDFLARE"

[Link to this property](#)

</details>

[Link to this property](#)

detail: string

[Link to this property](#)

name: string

[Link to this property](#)

<details>

<summary>

resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more

</summary>

One of the following:

"aws_customer_gateway"

[Link to this property](#)

"aws_egress_only_internet_gateway"

[Link to this property](#)

"aws_internet_gateway"

[Link to this property](#)

"aws_instance"

[Link to this property](#)

"aws_network_interface"

[Link to this property](#)

"aws_route"

[Link to this property](#)

"aws_route_table"

[Link to this property](#)

"aws_route_table_association"

[Link to this property](#)

"aws_subnet"

[Link to this property](#)

"aws_vpc"

[Link to this property](#)

"aws_vpc_ipv4_cidr_block_association"

[Link to this property](#)

"aws_vpn_connection"

[Link to this property](#)

"aws_vpn_connection_route"

[Link to this property](#)

"aws_vpn_gateway"

[Link to this property](#)

"aws_security_group"

[Link to this property](#)

"aws_vpc_security_group_ingress_rule"

[Link to this property](#)

"aws_vpc_security_group_egress_rule"

[Link to this property](#)

"aws_ec2_managed_prefix_list"

[Link to this property](#)

"aws_ec2_transit_gateway"

[Link to this property](#)

"aws_ec2_transit_gateway_prefix_list_reference"

[Link to this property](#)

"aws_ec2_transit_gateway_vpc_attachment"

[Link to this property](#)

"azurerm_application_security_group"

[Link to this property](#)

"azurerm_lb"

[Link to this property](#)

"azurerm_lb_backend_address_pool"

[Link to this property](#)

"azurerm_lb_nat_pool"

[Link to this property](#)

"azurerm_lb_nat_rule"

[Link to this property](#)

"azurerm_lb_rule"

[Link to this property](#)

"azurerm_local_network_gateway"

[Link to this property](#)

"azurerm_network_interface"

[Link to this property](#)

"azurerm_network_interface_application_security_group_association"

[Link to this property](#)

"azurerm_network_interface_backend_address_pool_association"

[Link to this property](#)

"azurerm_network_interface_security_group_association"

[Link to this property](#)

"azurerm_network_security_group"

[Link to this property](#)

"azurerm_public_ip"

[Link to this property](#)

"azurerm_route"

[Link to this property](#)

"azurerm_route_table"

[Link to this property](#)

"azurerm_subnet"

[Link to this property](#)

"azurerm_subnet_route_table_association"

[Link to this property](#)

"azurerm_virtual_machine"

[Link to this property](#)

"azurerm_virtual_network_gateway_connection"

[Link to this property](#)

"azurerm_virtual_network"

[Link to this property](#)

"azurerm_virtual_network_gateway"

[Link to this property](#)

"google_compute_network"

[Link to this property](#)

"google_compute_subnetwork"

[Link to this property](#)

"google_compute_vpn_gateway"

[Link to this property](#)

"google_compute_vpn_tunnel"

[Link to this property](#)

"google_compute_route"

[Link to this property](#)

"google_compute_address"

[Link to this property](#)

"google_compute_global_address"

[Link to this property](#)

"google_compute_router"

[Link to this property](#)

"google_compute_interconnect_attachment"

[Link to this property](#)

"google_compute_ha_vpn_gateway"

[Link to this property](#)

"google_compute_forwarding_rule"

[Link to this property](#)

"google_compute_network_firewall_policy"

[Link to this property](#)

"google_compute_network_firewall_policy_rule"

[Link to this property](#)

"cloudflare_static_route"

[Link to this property](#)

"cloudflare_ipsec_tunnel"

[Link to this property](#)

</details>

[Link to this property](#)

title: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

help_text: optional string

[Link to this property](#)

</details>

[Link to this property](#)

state: map[unknown]

[Link to this property](#)

tags: map[string]

[Link to this property](#)

updated_at: string

[Link to this property](#)

url: string

[Link to this property](#)

<details>

<summary>

managed_by: optional array of object { id, client_type, name }

</summary>

id: string

formatuuid

[Link to this property](#)

client_type: "MAGIC_WAN_CLOUD_ONRAMP"

[Link to this property](#)

name: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

post_apply_resources_unavailable: optional boolean

[Link to this property](#)

region: optional string

[Link to this property](#)

<details>

<summary>

status: optional object { apply_progress, lifecycle_state, plan_progress, 3 more }

</summary>

<details>

<summary>

apply_progress: object { done, total }

</summary>

done: number

[Link to this property](#)

total: number

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

lifecycle_state: "OnrampNeedsApply" or "OnrampPendingPlan" or "OnrampPlanning" or 9 more

</summary>

One of the following:

"OnrampNeedsApply"

[Link to this property](#)

"OnrampPendingPlan"

[Link to this property](#)

"OnrampPlanning"

[Link to this property](#)

"OnrampPlanFailed"

[Link to this property](#)

"OnrampPendingApproval"

[Link to this property](#)

"OnrampPendingApply"

[Link to this property](#)

"OnrampApplying"

[Link to this property](#)

"OnrampApplyFailed"

[Link to this property](#)

"OnrampActive"

[Link to this property](#)

"OnrampPendingDestroy"

[Link to this property](#)

"OnrampDestroying"

[Link to this property](#)

"OnrampDestroyFailed"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

plan_progress: object { done, total }

</summary>

done: number

[Link to this property](#)

total: number

[Link to this property](#)

</details>

[Link to this property](#)

routes: array of string

[Link to this property](#)

tunnels: array of string

[Link to this property](#)

<details>

<summary>

lifecycle_errors: optional map[object { code, message, documentation_url, 2 more } ]

</summary>

<details>

<summary>

code: 1001 or 1002 or 1003 or 152 more

</summary>

One of the following:

1001

[Link to this property](#)

1002

[Link to this property](#)

1003

[Link to this property](#)

1004

[Link to this property](#)

1005

[Link to this property](#)

1006

[Link to this property](#)

1007

[Link to this property](#)

1008

[Link to this property](#)

1009

[Link to this property](#)

1010

[Link to this property](#)

1011

[Link to this property](#)

1012

[Link to this property](#)

1013

[Link to this property](#)

1014

[Link to this property](#)

1015

[Link to this property](#)

1016

[Link to this property](#)

1017

[Link to this property](#)

1018

[Link to this property](#)

2001

[Link to this property](#)

2002

[Link to this property](#)

2003

[Link to this property](#)

2004

[Link to this property](#)

2005

[Link to this property](#)

2006

[Link to this property](#)

2007

[Link to this property](#)

2008

[Link to this property](#)

2009

[Link to this property](#)

2010

[Link to this property](#)

2011

[Link to this property](#)

2012

[Link to this property](#)

2013

[Link to this property](#)

2014

[Link to this property](#)

2015

[Link to this property](#)

2016

[Link to this property](#)

2017

[Link to this property](#)

2018

[Link to this property](#)

2019

[Link to this property](#)

2020

[Link to this property](#)

2021

[Link to this property](#)

2022

[Link to this property](#)

3001

[Link to this property](#)

3002

[Link to this property](#)

3003

[Link to this property](#)

3004

[Link to this property](#)

3005

[Link to this property](#)

3006

[Link to this property](#)

3007

[Link to this property](#)

4001

[Link to this property](#)

4002

[Link to this property](#)

4003

[Link to this property](#)

4004

[Link to this property](#)

4005

[Link to this property](#)

4006

[Link to this property](#)

4007

[Link to this property](#)

4008

[Link to this property](#)

4009

[Link to this property](#)

4010

[Link to this property](#)

4011

[Link to this property](#)

4012

[Link to this property](#)

4013

[Link to this property](#)

4014

[Link to this property](#)

4015

[Link to this property](#)

4016

[Link to this property](#)

4017

[Link to this property](#)

4018

[Link to this property](#)

4019

[Link to this property](#)

4020

[Link to this property](#)

4021

[Link to this property](#)

4022

[Link to this property](#)

4023

[Link to this property](#)

5001

[Link to this property](#)

5002

[Link to this property](#)

5003

[Link to this property](#)

5004

[Link to this property](#)

102000

[Link to this property](#)

102001

[Link to this property](#)

102002

[Link to this property](#)

102003

[Link to this property](#)

102004

[Link to this property](#)

102005

[Link to this property](#)

102006

[Link to this property](#)

102007

[Link to this property](#)

102008

[Link to this property](#)

102009

[Link to this property](#)

102010

[Link to this property](#)

102011

[Link to this property](#)

102012

[Link to this property](#)

102013

[Link to this property](#)

102014

[Link to this property](#)

102015

[Link to this property](#)

102016

[Link to this property](#)

102017

[Link to this property](#)

102018

[Link to this property](#)

102019

[Link to this property](#)

102020

[Link to this property](#)

102021

[Link to this property](#)

102022

[Link to this property](#)

102023

[Link to this property](#)

102024

[Link to this property](#)

102025

[Link to this property](#)

102026

[Link to this property](#)

102027

[Link to this property](#)

102028

[Link to this property](#)

102029

[Link to this property](#)

102030

[Link to this property](#)

102031

[Link to this property](#)

102032

[Link to this property](#)

102033

[Link to this property](#)

102034

[Link to this property](#)

102035

[Link to this property](#)

102036

[Link to this property](#)

102037

[Link to this property](#)

102038

[Link to this property](#)

102039

[Link to this property](#)

102040

[Link to this property](#)

102041

[Link to this property](#)

102042

[Link to this property](#)

102043

[Link to this property](#)

102044

[Link to this property](#)

102045

[Link to this property](#)

102046

[Link to this property](#)

102047

[Link to this property](#)

102048

[Link to this property](#)

102049

[Link to this property](#)

102050

[Link to this property](#)

102051

[Link to this property](#)

102052

[Link to this property](#)

102053

[Link to this property](#)

102054

[Link to this property](#)

102055

[Link to this property](#)

102056

[Link to this property](#)

102057

[Link to this property](#)

102058

[Link to this property](#)

102059

[Link to this property](#)

102060

[Link to this property](#)

102061

[Link to this property](#)

102062

[Link to this property](#)

102063

[Link to this property](#)

102064

[Link to this property](#)

102065

[Link to this property](#)

102066

[Link to this property](#)

102067

[Link to this property](#)

102068

[Link to this property](#)

102069

[Link to this property](#)

102070

[Link to this property](#)

102071

[Link to this property](#)

102072

[Link to this property](#)

103001

[Link to this property](#)

103002

[Link to this property](#)

103003

[Link to this property](#)

103004

[Link to this property](#)

103005

[Link to this property](#)

103006

[Link to this property](#)

103007

[Link to this property](#)

103008

[Link to this property](#)

</details>

[Link to this property](#)

message: string

[Link to this property](#)

documentation_url: optional string

[Link to this property](#)

<details>

<summary>

meta: optional object { l10n_key, loggable_error, template_data, trace_id }

</summary>

l10n_key: optional string

[Link to this property](#)

loggable_error: optional string

[Link to this property](#)

template_data: optional unknown

[Link to this property](#)

trace_id: optional string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

source: optional object { parameter, parameter_value_index, pointer }

</summary>

parameter: optional string

[Link to this property](#)

parameter_value_index: optional number

[Link to this property](#)

pointer: optional string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

vpc: optional string

formatuuid

[Link to this property](#)

<details>

<summary>

vpcs_by_id: optional map[object { id, account_id, cloud_type, 18 more } ]

</summary>

id: string

formatuuid

[Link to this property](#)

account_id: string

[Link to this property](#)

<details>

<summary>

cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

[Link to this property](#)

"AZURE"

[Link to this property](#)

"GOOGLE"

[Link to this property](#)

"CLOUDFLARE"

[Link to this property](#)

</details>

[Link to this property](#)

config: map[unknown]

[Link to this property](#)

deployment_provider: string

formatuuid

[Link to this property](#)

managed: boolean

[Link to this property](#)

<details>

<summary>

monthly_cost_estimate: object { currency, monthly_cost }

</summary>

currency: string

[Link to this property](#)

monthly_cost: number

formatdouble

[Link to this property](#)

</details>

[Link to this property](#)

name: string

[Link to this property](#)

native_id: string

[Link to this property](#)

<details>

<summary>

observations: map[object { first_observed_at, last_observed_at, provider_id, resource_id } ]

</summary>

first_observed_at: string

[Link to this property](#)

last_observed_at: string

[Link to this property](#)

provider_id: string

formatuuid

[Link to this property](#)

resource_id: string

formatuuid

[Link to this property](#)

</details>

[Link to this property](#)

provider_ids: array of string

[Link to this property](#)

provider_names_by_id: map[string]

[Link to this property](#)

region: string

[Link to this property](#)

resource_group: string

[Link to this property](#)

<details>

<summary>

resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more

</summary>

One of the following:

"aws_customer_gateway"

[Link to this property](#)

"aws_egress_only_internet_gateway"

[Link to this property](#)

"aws_internet_gateway"

[Link to this property](#)

"aws_instance"

[Link to this property](#)

"aws_network_interface"

[Link to this property](#)

"aws_route"

[Link to this property](#)

"aws_route_table"

[Link to this property](#)

"aws_route_table_association"

[Link to this property](#)

"aws_subnet"

[Link to this property](#)

"aws_vpc"

[Link to this property](#)

"aws_vpc_ipv4_cidr_block_association"

[Link to this property](#)

"aws_vpn_connection"

[Link to this property](#)

"aws_vpn_connection_route"

[Link to this property](#)

"aws_vpn_gateway"

[Link to this property](#)

"aws_security_group"

[Link to this property](#)

"aws_vpc_security_group_ingress_rule"

[Link to this property](#)

"aws_vpc_security_group_egress_rule"

[Link to this property](#)

"aws_ec2_managed_prefix_list"

[Link to this property](#)

"aws_ec2_transit_gateway"

[Link to this property](#)

"aws_ec2_transit_gateway_prefix_list_reference"

[Link to this property](#)

"aws_ec2_transit_gateway_vpc_attachment"

[Link to this property](#)

"azurerm_application_security_group"

[Link to this property](#)

"azurerm_lb"

[Link to this property](#)

"azurerm_lb_backend_address_pool"

[Link to this property](#)

"azurerm_lb_nat_pool"

[Link to this property](#)

"azurerm_lb_nat_rule"

[Link to this property](#)

"azurerm_lb_rule"

[Link to this property](#)

"azurerm_local_network_gateway"

[Link to this property](#)

"azurerm_network_interface"

[Link to this property](#)

"azurerm_network_interface_application_security_group_association"

[Link to this property](#)

"azurerm_network_interface_backend_address_pool_association"

[Link to this property](#)

"azurerm_network_interface_security_group_association"

[Link to this property](#)

"azurerm_network_security_group"

[Link to this property](#)

"azurerm_public_ip"

[Link to this property](#)

"azurerm_route"

[Link to this property](#)

"azurerm_route_table"

[Link to this property](#)

"azurerm_subnet"

[Link to this property](#)

"azurerm_subnet_route_table_association"

[Link to this property](#)

"azurerm_virtual_machine"

[Link to this property](#)

"azurerm_virtual_network_gateway_connection"

[Link to this property](#)

"azurerm_virtual_network"

[Link to this property](#)

"azurerm_virtual_network_gateway"

[Link to this property](#)

"google_compute_network"

[Link to this property](#)

"google_compute_subnetwork"

[Link to this property](#)

"google_compute_vpn_gateway"

[Link to this property](#)

"google_compute_vpn_tunnel"

[Link to this property](#)

"google_compute_route"

[Link to this property](#)

"google_compute_address"

[Link to this property](#)

"google_compute_global_address"

[Link to this property](#)

"google_compute_router"

[Link to this property](#)

"google_compute_interconnect_attachment"

[Link to this property](#)

"google_compute_ha_vpn_gateway"

[Link to this property](#)

"google_compute_forwarding_rule"

[Link to this property](#)

"google_compute_network_firewall_policy"

[Link to this property](#)

"google_compute_network_firewall_policy_rule"

[Link to this property](#)

"cloudflare_static_route"

[Link to this property](#)

"cloudflare_ipsec_tunnel"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

sections: array of object { hidden_items, name, visible_items, help_text }

</summary>

<details>

<summary>

hidden_items: array of object { helpText, name, value }

</summary>

helpText: optional string

[Link to this property](#)

name: optional string

[Link to this property](#)

<details>

<summary>

value: optional object { item_type, string } or object { item_type, yaml } or object { item_type, yaml_diff } or 2 more

</summary>

One of the following:

<details>

<summary>

McnStringItem object { item_type, string }

</summary>

item_type: string

[Link to this property](#)

string: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnYamlItem object { item_type, yaml }

</summary>

item_type: string

[Link to this property](#)

yaml: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnYamlDiffItem object { item_type, yaml_diff }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

yaml_diff: object { diff, left_description, left_yaml, 2 more }

</summary>

diff: string

[Link to this property](#)

left_description: string

[Link to this property](#)

left_yaml: string

[Link to this property](#)

right_description: string

[Link to this property](#)

right_yaml: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnResourcePreviewItem object { item_type, resource_preview }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

resource_preview: object { id, cloud_type, detail, 3 more }

</summary>

id: string

formatuuid

[Link to this property](#)

<details>

<summary>

cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

[Link to this property](#)

"AZURE"

[Link to this property](#)

"GOOGLE"

[Link to this property](#)

"CLOUDFLARE"

[Link to this property](#)

</details>

[Link to this property](#)

detail: string

[Link to this property](#)

name: string

[Link to this property](#)

<details>

<summary>

resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more

</summary>

One of the following:

"aws_customer_gateway"

[Link to this property](#)

"aws_egress_only_internet_gateway"

[Link to this property](#)

"aws_internet_gateway"

[Link to this property](#)

"aws_instance"

[Link to this property](#)

"aws_network_interface"

[Link to this property](#)

"aws_route"

[Link to this property](#)

"aws_route_table"

[Link to this property](#)

"aws_route_table_association"

[Link to this property](#)

"aws_subnet"

[Link to this property](#)

"aws_vpc"

[Link to this property](#)

"aws_vpc_ipv4_cidr_block_association"

[Link to this property](#)

"aws_vpn_connection"

[Link to this property](#)

"aws_vpn_connection_route"

[Link to this property](#)

"aws_vpn_gateway"

[Link to this property](#)

"aws_security_group"

[Link to this property](#)

"aws_vpc_security_group_ingress_rule"

[Link to this property](#)

"aws_vpc_security_group_egress_rule"

[Link to this property](#)

"aws_ec2_managed_prefix_list"

[Link to this property](#)

"aws_ec2_transit_gateway"

[Link to this property](#)

"aws_ec2_transit_gateway_prefix_list_reference"

[Link to this property](#)

"aws_ec2_transit_gateway_vpc_attachment"

[Link to this property](#)

"azurerm_application_security_group"

[Link to this property](#)

"azurerm_lb"

[Link to this property](#)

"azurerm_lb_backend_address_pool"

[Link to this property](#)

"azurerm_lb_nat_pool"

[Link to this property](#)

"azurerm_lb_nat_rule"

[Link to this property](#)

"azurerm_lb_rule"

[Link to this property](#)

"azurerm_local_network_gateway"

[Link to this property](#)

"azurerm_network_interface"

[Link to this property](#)

"azurerm_network_interface_application_security_group_association"

[Link to this property](#)

"azurerm_network_interface_backend_address_pool_association"

[Link to this property](#)

"azurerm_network_interface_security_group_association"

[Link to this property](#)

"azurerm_network_security_group"

[Link to this property](#)

"azurerm_public_ip"

[Link to this property](#)

"azurerm_route"

[Link to this property](#)

"azurerm_route_table"

[Link to this property](#)

"azurerm_subnet"

[Link to this property](#)

"azurerm_subnet_route_table_association"

[Link to this property](#)

"azurerm_virtual_machine"

[Link to this property](#)

"azurerm_virtual_network_gateway_connection"

[Link to this property](#)

"azurerm_virtual_network"

[Link to this property](#)

"azurerm_virtual_network_gateway"

[Link to this property](#)

"google_compute_network"

[Link to this property](#)

"google_compute_subnetwork"

[Link to this property](#)

"google_compute_vpn_gateway"

[Link to this property](#)

"google_compute_vpn_tunnel"

[Link to this property](#)

"google_compute_route"

[Link to this property](#)

"google_compute_address"

[Link to this property](#)

"google_compute_global_address"

[Link to this property](#)

"google_compute_router"

[Link to this property](#)

"google_compute_interconnect_attachment"

[Link to this property](#)

"google_compute_ha_vpn_gateway"

[Link to this property](#)

"google_compute_forwarding_rule"

[Link to this property](#)

"google_compute_network_firewall_policy"

[Link to this property](#)

"google_compute_network_firewall_policy_rule"

[Link to this property](#)

"cloudflare_static_route"

[Link to this property](#)

"cloudflare_ipsec_tunnel"

[Link to this property](#)

</details>

[Link to this property](#)

title: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnListItem object { item_type, list }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

list: array of object { item_type, string } or object { item_type, resource_preview }

</summary>

One of the following:

<details>

<summary>

McnStringItem object { item_type, string }

</summary>

item_type: string

[Link to this property](#)

string: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnResourcePreviewItem object { item_type, resource_preview }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

resource_preview: object { id, cloud_type, detail, 3 more }

</summary>

id: string

formatuuid

[Link to this property](#)

<details>

<summary>

cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

[Link to this property](#)

"AZURE"

[Link to this property](#)

"GOOGLE"

[Link to this property](#)

"CLOUDFLARE"

[Link to this property](#)

</details>

[Link to this property](#)

detail: string

[Link to this property](#)

name: string

[Link to this property](#)

<details>

<summary>

resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more

</summary>

One of the following:

"aws_customer_gateway"

[Link to this property](#)

"aws_egress_only_internet_gateway"

[Link to this property](#)

"aws_internet_gateway"

[Link to this property](#)

"aws_instance"

[Link to this property](#)

"aws_network_interface"

[Link to this property](#)

"aws_route"

[Link to this property](#)

"aws_route_table"

[Link to this property](#)

"aws_route_table_association"

[Link to this property](#)

"aws_subnet"

[Link to this property](#)

"aws_vpc"

[Link to this property](#)

"aws_vpc_ipv4_cidr_block_association"

[Link to this property](#)

"aws_vpn_connection"

[Link to this property](#)

"aws_vpn_connection_route"

[Link to this property](#)

"aws_vpn_gateway"

[Link to this property](#)

"aws_security_group"

[Link to this property](#)

"aws_vpc_security_group_ingress_rule"

[Link to this property](#)

"aws_vpc_security_group_egress_rule"

[Link to this property](#)

"aws_ec2_managed_prefix_list"

[Link to this property](#)

"aws_ec2_transit_gateway"

[Link to this property](#)

"aws_ec2_transit_gateway_prefix_list_reference"

[Link to this property](#)

"aws_ec2_transit_gateway_vpc_attachment"

[Link to this property](#)

"azurerm_application_security_group"

[Link to this property](#)

"azurerm_lb"

[Link to this property](#)

"azurerm_lb_backend_address_pool"

[Link to this property](#)

"azurerm_lb_nat_pool"

[Link to this property](#)

"azurerm_lb_nat_rule"

[Link to this property](#)

"azurerm_lb_rule"

[Link to this property](#)

"azurerm_local_network_gateway"

[Link to this property](#)

"azurerm_network_interface"

[Link to this property](#)

"azurerm_network_interface_application_security_group_association"

[Link to this property](#)

"azurerm_network_interface_backend_address_pool_association"

[Link to this property](#)

"azurerm_network_interface_security_group_association"

[Link to this property](#)

"azurerm_network_security_group"

[Link to this property](#)

"azurerm_public_ip"

[Link to this property](#)

"azurerm_route"

[Link to this property](#)

"azurerm_route_table"

[Link to this property](#)

"azurerm_subnet"

[Link to this property](#)

"azurerm_subnet_route_table_association"

[Link to this property](#)

"azurerm_virtual_machine"

[Link to this property](#)

"azurerm_virtual_network_gateway_connection"

[Link to this property](#)

"azurerm_virtual_network"

[Link to this property](#)

"azurerm_virtual_network_gateway"

[Link to this property](#)

"google_compute_network"

[Link to this property](#)

"google_compute_subnetwork"

[Link to this property](#)

"google_compute_vpn_gateway"

[Link to this property](#)

"google_compute_vpn_tunnel"

[Link to this property](#)

"google_compute_route"

[Link to this property](#)

"google_compute_address"

[Link to this property](#)

"google_compute_global_address"

[Link to this property](#)

"google_compute_router"

[Link to this property](#)

"google_compute_interconnect_attachment"

[Link to this property](#)

"google_compute_ha_vpn_gateway"

[Link to this property](#)

"google_compute_forwarding_rule"

[Link to this property](#)

"google_compute_network_firewall_policy"

[Link to this property](#)

"google_compute_network_firewall_policy_rule"

[Link to this property](#)

"cloudflare_static_route"

[Link to this property](#)

"cloudflare_ipsec_tunnel"

[Link to this property](#)

</details>

[Link to this property](#)

title: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

name: string

[Link to this property](#)

<details>

<summary>

visible_items: array of object { helpText, name, value }

</summary>

helpText: optional string

[Link to this property](#)

name: optional string

[Link to this property](#)

<details>

<summary>

value: optional object { item_type, string } or object { item_type, yaml } or object { item_type, yaml_diff } or 2 more

</summary>

One of the following:

<details>

<summary>

McnStringItem object { item_type, string }

</summary>

item_type: string

[Link to this property](#)

string: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnYamlItem object { item_type, yaml }

</summary>

item_type: string

[Link to this property](#)

yaml: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnYamlDiffItem object { item_type, yaml_diff }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

yaml_diff: object { diff, left_description, left_yaml, 2 more }

</summary>

diff: string

[Link to this property](#)

left_description: string

[Link to this property](#)

left_yaml: string

[Link to this property](#)

right_description: string

[Link to this property](#)

right_yaml: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnResourcePreviewItem object { item_type, resource_preview }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

resource_preview: object { id, cloud_type, detail, 3 more }

</summary>

id: string

formatuuid

[Link to this property](#)

<details>

<summary>

cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

[Link to this property](#)

"AZURE"

[Link to this property](#)

"GOOGLE"

[Link to this property](#)

"CLOUDFLARE"

[Link to this property](#)

</details>

[Link to this property](#)

detail: string

[Link to this property](#)

name: string

[Link to this property](#)

<details>

<summary>

resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more

</summary>

One of the following:

"aws_customer_gateway"

[Link to this property](#)

"aws_egress_only_internet_gateway"

[Link to this property](#)

"aws_internet_gateway"

[Link to this property](#)

"aws_instance"

[Link to this property](#)

"aws_network_interface"

[Link to this property](#)

"aws_route"

[Link to this property](#)

"aws_route_table"

[Link to this property](#)

"aws_route_table_association"

[Link to this property](#)

"aws_subnet"

[Link to this property](#)

"aws_vpc"

[Link to this property](#)

"aws_vpc_ipv4_cidr_block_association"

[Link to this property](#)

"aws_vpn_connection"

[Link to this property](#)

"aws_vpn_connection_route"

[Link to this property](#)

"aws_vpn_gateway"

[Link to this property](#)

"aws_security_group"

[Link to this property](#)

"aws_vpc_security_group_ingress_rule"

[Link to this property](#)

"aws_vpc_security_group_egress_rule"

[Link to this property](#)

"aws_ec2_managed_prefix_list"

[Link to this property](#)

"aws_ec2_transit_gateway"

[Link to this property](#)

"aws_ec2_transit_gateway_prefix_list_reference"

[Link to this property](#)

"aws_ec2_transit_gateway_vpc_attachment"

[Link to this property](#)

"azurerm_application_security_group"

[Link to this property](#)

"azurerm_lb"

[Link to this property](#)

"azurerm_lb_backend_address_pool"

[Link to this property](#)

"azurerm_lb_nat_pool"

[Link to this property](#)

"azurerm_lb_nat_rule"

[Link to this property](#)

"azurerm_lb_rule"

[Link to this property](#)

"azurerm_local_network_gateway"

[Link to this property](#)

"azurerm_network_interface"

[Link to this property](#)

"azurerm_network_interface_application_security_group_association"

[Link to this property](#)

"azurerm_network_interface_backend_address_pool_association"

[Link to this property](#)

"azurerm_network_interface_security_group_association"

[Link to this property](#)

"azurerm_network_security_group"

[Link to this property](#)

"azurerm_public_ip"

[Link to this property](#)

"azurerm_route"

[Link to this property](#)

"azurerm_route_table"

[Link to this property](#)

"azurerm_subnet"

[Link to this property](#)

"azurerm_subnet_route_table_association"

[Link to this property](#)

"azurerm_virtual_machine"

[Link to this property](#)

"azurerm_virtual_network_gateway_connection"

[Link to this property](#)

"azurerm_virtual_network"

[Link to this property](#)

"azurerm_virtual_network_gateway"

[Link to this property](#)

"google_compute_network"

[Link to this property](#)

"google_compute_subnetwork"

[Link to this property](#)

"google_compute_vpn_gateway"

[Link to this property](#)

"google_compute_vpn_tunnel"

[Link to this property](#)

"google_compute_route"

[Link to this property](#)

"google_compute_address"

[Link to this property](#)

"google_compute_global_address"

[Link to this property](#)

"google_compute_router"

[Link to this property](#)

"google_compute_interconnect_attachment"

[Link to this property](#)

"google_compute_ha_vpn_gateway"

[Link to this property](#)

"google_compute_forwarding_rule"

[Link to this property](#)

"google_compute_network_firewall_policy"

[Link to this property](#)

"google_compute_network_firewall_policy_rule"

[Link to this property](#)

"cloudflare_static_route"

[Link to this property](#)

"cloudflare_ipsec_tunnel"

[Link to this property](#)

</details>

[Link to this property](#)

title: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnListItem object { item_type, list }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

list: array of object { item_type, string } or object { item_type, resource_preview }

</summary>

One of the following:

<details>

<summary>

McnStringItem object { item_type, string }

</summary>

item_type: string

[Link to this property](#)

string: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnResourcePreviewItem object { item_type, resource_preview }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

resource_preview: object { id, cloud_type, detail, 3 more }

</summary>

id: string

formatuuid

[Link to this property](#)

<details>

<summary>

cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

[Link to this property](#)

"AZURE"

[Link to this property](#)

"GOOGLE"

[Link to this property](#)

"CLOUDFLARE"

[Link to this property](#)

</details>

[Link to this property](#)

detail: string

[Link to this property](#)

name: string

[Link to this property](#)

<details>

<summary>

resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more

</summary>

One of the following:

"aws_customer_gateway"

[Link to this property](#)

"aws_egress_only_internet_gateway"

[Link to this property](#)

"aws_internet_gateway"

[Link to this property](#)

"aws_instance"

[Link to this property](#)

"aws_network_interface"

[Link to this property](#)

"aws_route"

[Link to this property](#)

"aws_route_table"

[Link to this property](#)

"aws_route_table_association"

[Link to this property](#)

"aws_subnet"

[Link to this property](#)

"aws_vpc"

[Link to this property](#)

"aws_vpc_ipv4_cidr_block_association"

[Link to this property](#)

"aws_vpn_connection"

[Link to this property](#)

"aws_vpn_connection_route"

[Link to this property](#)

"aws_vpn_gateway"

[Link to this property](#)

"aws_security_group"

[Link to this property](#)

"aws_vpc_security_group_ingress_rule"

[Link to this property](#)

"aws_vpc_security_group_egress_rule"

[Link to this property](#)

"aws_ec2_managed_prefix_list"

[Link to this property](#)

"aws_ec2_transit_gateway"

[Link to this property](#)

"aws_ec2_transit_gateway_prefix_list_reference"

[Link to this property](#)

"aws_ec2_transit_gateway_vpc_attachment"

[Link to this property](#)

"azurerm_application_security_group"

[Link to this property](#)

"azurerm_lb"

[Link to this property](#)

"azurerm_lb_backend_address_pool"

[Link to this property](#)

"azurerm_lb_nat_pool"

[Link to this property](#)

"azurerm_lb_nat_rule"

[Link to this property](#)

"azurerm_lb_rule"

[Link to this property](#)

"azurerm_local_network_gateway"

[Link to this property](#)

"azurerm_network_interface"

[Link to this property](#)

"azurerm_network_interface_application_security_group_association"

[Link to this property](#)

"azurerm_network_interface_backend_address_pool_association"

[Link to this property](#)

"azurerm_network_interface_security_group_association"

[Link to this property](#)

"azurerm_network_security_group"

[Link to this property](#)

"azurerm_public_ip"

[Link to this property](#)

"azurerm_route"

[Link to this property](#)

"azurerm_route_table"

[Link to this property](#)

"azurerm_subnet"

[Link to this property](#)

"azurerm_subnet_route_table_association"

[Link to this property](#)

"azurerm_virtual_machine"

[Link to this property](#)

"azurerm_virtual_network_gateway_connection"

[Link to this property](#)

"azurerm_virtual_network"

[Link to this property](#)

"azurerm_virtual_network_gateway"

[Link to this property](#)

"google_compute_network"

[Link to this property](#)

"google_compute_subnetwork"

[Link to this property](#)

"google_compute_vpn_gateway"

[Link to this property](#)

"google_compute_vpn_tunnel"

[Link to this property](#)

"google_compute_route"

[Link to this property](#)

"google_compute_address"

[Link to this property](#)

"google_compute_global_address"

[Link to this property](#)

"google_compute_router"

[Link to this property](#)

"google_compute_interconnect_attachment"

[Link to this property](#)

"google_compute_ha_vpn_gateway"

[Link to this property](#)

"google_compute_forwarding_rule"

[Link to this property](#)

"google_compute_network_firewall_policy"

[Link to this property](#)

"google_compute_network_firewall_policy_rule"

[Link to this property](#)

"cloudflare_static_route"

[Link to this property](#)

"cloudflare_ipsec_tunnel"

[Link to this property](#)

</details>

[Link to this property](#)

title: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

help_text: optional string

[Link to this property](#)

</details>

[Link to this property](#)

state: map[unknown]

[Link to this property](#)

tags: map[string]

[Link to this property](#)

updated_at: string

[Link to this property](#)

url: string

[Link to this property](#)

<details>

<summary>

managed_by: optional array of object { id, client_type, name }

</summary>

id: string

formatuuid

[Link to this property](#)

client_type: "MAGIC_WAN_CLOUD_ONRAMP"

[Link to this property](#)

name: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

vpcs_by_id_unavailable: optional array of string

The list of vpc IDs for which resource details failed to generate.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

OnRampCreateResponse object { id, cloud_type, dynamic_routing, 26 more }

</summary>

id: string

formatuuid

[Link to this property](#)

<details>

<summary>

cloud_type: "AWS" or "AZURE" or "GOOGLE"

</summary>

One of the following:

"AWS"

[Link to this property](#)

"AZURE"

[Link to this property](#)

"GOOGLE"

[Link to this property](#)

</details>

[Link to this property](#)

dynamic_routing: boolean

[Link to this property](#)

install_routes_in_cloud: boolean

[Link to this property](#)

install_routes_in_magic_wan: boolean

[Link to this property](#)

name: string

[Link to this property](#)

<details>

<summary>

type: "OnrampTypeSingle" or "OnrampTypeHub"

</summary>

One of the following:

"OnrampTypeSingle"

[Link to this property](#)

"OnrampTypeHub"

[Link to this property](#)

</details>

[Link to this property](#)

updated_at: string

[Link to this property](#)

attached_hubs: optional array of string

[Link to this property](#)

attached_vpcs: optional array of string

[Link to this property](#)

cloud_asn: optional number

formatuint32

[Link to this property](#)

description: optional string

[Link to this property](#)

hub: optional string

formatuuid

[Link to this property](#)

last_applied_at: optional string

[Link to this property](#)

last_exported_at: optional string

[Link to this property](#)

last_planned_at: optional string

[Link to this property](#)

manage_hub_to_hub_attachments: optional boolean

[Link to this property](#)

manage_vpc_to_hub_attachments: optional boolean

[Link to this property](#)

<details>

<summary>

planned_monthly_cost_estimate: optional object { currency, current_monthly_cost, diff, proposed_monthly_cost }

</summary>

currency: string

[Link to this property](#)

current_monthly_cost: number

formatdouble

[Link to this property](#)

diff: number

formatdouble

[Link to this property](#)

proposed_monthly_cost: number

formatdouble

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

planned_resources: optional array of object { diff, keys_require_replace, monthly_cost_estimate_diff, 2 more }

</summary>

<details>

<summary>

diff: object { diff, left_description, left_yaml, 2 more }

</summary>

diff: string

[Link to this property](#)

left_description: string

[Link to this property](#)

left_yaml: string

[Link to this property](#)

right_description: string

[Link to this property](#)

right_yaml: string

[Link to this property](#)

</details>

[Link to this property](#)

keys_require_replace: array of string

[Link to this property](#)

<details>

<summary>

monthly_cost_estimate_diff: object { currency, current_monthly_cost, diff, proposed_monthly_cost }

</summary>

currency: string

[Link to this property](#)

current_monthly_cost: number

formatdouble

[Link to this property](#)

diff: number

formatdouble

[Link to this property](#)

proposed_monthly_cost: number

formatdouble

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

planned_action: "no_op" or "create" or "update" or 2 more

</summary>

One of the following:

"no_op"

[Link to this property](#)

"create"

[Link to this property](#)

"update"

[Link to this property](#)

"replace"

[Link to this property](#)

"destroy"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

resource: object { id, cloud_type, detail, 3 more }

</summary>

id: string

formatuuid

[Link to this property](#)

<details>

<summary>

cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

[Link to this property](#)

"AZURE"

[Link to this property](#)

"GOOGLE"

[Link to this property](#)

"CLOUDFLARE"

[Link to this property](#)

</details>

[Link to this property](#)

detail: string

[Link to this property](#)

name: string

[Link to this property](#)

<details>

<summary>

resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more

</summary>

One of the following:

"aws_customer_gateway"

[Link to this property](#)

"aws_egress_only_internet_gateway"

[Link to this property](#)

"aws_internet_gateway"

[Link to this property](#)

"aws_instance"

[Link to this property](#)

"aws_network_interface"

[Link to this property](#)

"aws_route"

[Link to this property](#)

"aws_route_table"

[Link to this property](#)

"aws_route_table_association"

[Link to this property](#)

"aws_subnet"

[Link to this property](#)

"aws_vpc"

[Link to this property](#)

"aws_vpc_ipv4_cidr_block_association"

[Link to this property](#)

"aws_vpn_connection"

[Link to this property](#)

"aws_vpn_connection_route"

[Link to this property](#)

"aws_vpn_gateway"

[Link to this property](#)

"aws_security_group"

[Link to this property](#)

"aws_vpc_security_group_ingress_rule"

[Link to this property](#)

"aws_vpc_security_group_egress_rule"

[Link to this property](#)

"aws_ec2_managed_prefix_list"

[Link to this property](#)

"aws_ec2_transit_gateway"

[Link to this property](#)

"aws_ec2_transit_gateway_prefix_list_reference"

[Link to this property](#)

"aws_ec2_transit_gateway_vpc_attachment"

[Link to this property](#)

"azurerm_application_security_group"

[Link to this property](#)

"azurerm_lb"

[Link to this property](#)

"azurerm_lb_backend_address_pool"

[Link to this property](#)

"azurerm_lb_nat_pool"

[Link to this property](#)

"azurerm_lb_nat_rule"

[Link to this property](#)

"azurerm_lb_rule"

[Link to this property](#)

"azurerm_local_network_gateway"

[Link to this property](#)

"azurerm_network_interface"

[Link to this property](#)

"azurerm_network_interface_application_security_group_association"

[Link to this property](#)

"azurerm_network_interface_backend_address_pool_association"

[Link to this property](#)

"azurerm_network_interface_security_group_association"

[Link to this property](#)

"azurerm_network_security_group"

[Link to this property](#)

"azurerm_public_ip"

[Link to this property](#)

"azurerm_route"

[Link to this property](#)

"azurerm_route_table"

[Link to this property](#)

"azurerm_subnet"

[Link to this property](#)

"azurerm_subnet_route_table_association"

[Link to this property](#)

"azurerm_virtual_machine"

[Link to this property](#)

"azurerm_virtual_network_gateway_connection"

[Link to this property](#)

"azurerm_virtual_network"

[Link to this property](#)

"azurerm_virtual_network_gateway"

[Link to this property](#)

"google_compute_network"

[Link to this property](#)

"google_compute_subnetwork"

[Link to this property](#)

"google_compute_vpn_gateway"

[Link to this property](#)

"google_compute_vpn_tunnel"

[Link to this property](#)

"google_compute_route"

[Link to this property](#)

"google_compute_address"

[Link to this property](#)

"google_compute_global_address"

[Link to this property](#)

"google_compute_router"

[Link to this property](#)

"google_compute_interconnect_attachment"

[Link to this property](#)

"google_compute_ha_vpn_gateway"

[Link to this property](#)

"google_compute_forwarding_rule"

[Link to this property](#)

"google_compute_network_firewall_policy"

[Link to this property](#)

"google_compute_network_firewall_policy_rule"

[Link to this property](#)

"cloudflare_static_route"

[Link to this property](#)

"cloudflare_ipsec_tunnel"

[Link to this property](#)

</details>

[Link to this property](#)

title: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

planned_resources_unavailable: optional boolean

[Link to this property](#)

<details>

<summary>

post_apply_monthly_cost_estimate: optional object { currency, monthly_cost }

</summary>

currency: string

[Link to this property](#)

monthly_cost: number

formatdouble

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

post_apply_resources: optional map[object { id, account_id, cloud_type, 18 more } ]

</summary>

id: string

formatuuid

[Link to this property](#)

account_id: string

[Link to this property](#)

<details>

<summary>

cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

[Link to this property](#)

"AZURE"

[Link to this property](#)

"GOOGLE"

[Link to this property](#)

"CLOUDFLARE"

[Link to this property](#)

</details>

[Link to this property](#)

config: map[unknown]

[Link to this property](#)

deployment_provider: string

formatuuid

[Link to this property](#)

managed: boolean

[Link to this property](#)

<details>

<summary>

monthly_cost_estimate: object { currency, monthly_cost }

</summary>

currency: string

[Link to this property](#)

monthly_cost: number

formatdouble

[Link to this property](#)

</details>

[Link to this property](#)

name: string

[Link to this property](#)

native_id: string

[Link to this property](#)

<details>

<summary>

observations: map[object { first_observed_at, last_observed_at, provider_id, resource_id } ]

</summary>

first_observed_at: string

[Link to this property](#)

last_observed_at: string

[Link to this property](#)

provider_id: string

formatuuid

[Link to this property](#)

resource_id: string

formatuuid

[Link to this property](#)

</details>

[Link to this property](#)

provider_ids: array of string

[Link to this property](#)

provider_names_by_id: map[string]

[Link to this property](#)

region: string

[Link to this property](#)

resource_group: string

[Link to this property](#)

<details>

<summary>

resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more

</summary>

One of the following:

"aws_customer_gateway"

[Link to this property](#)

"aws_egress_only_internet_gateway"

[Link to this property](#)

"aws_internet_gateway"

[Link to this property](#)

"aws_instance"

[Link to this property](#)

"aws_network_interface"

[Link to this property](#)

"aws_route"

[Link to this property](#)

"aws_route_table"

[Link to this property](#)

"aws_route_table_association"

[Link to this property](#)

"aws_subnet"

[Link to this property](#)

"aws_vpc"

[Link to this property](#)

"aws_vpc_ipv4_cidr_block_association"

[Link to this property](#)

"aws_vpn_connection"

[Link to this property](#)

"aws_vpn_connection_route"

[Link to this property](#)

"aws_vpn_gateway"

[Link to this property](#)

"aws_security_group"

[Link to this property](#)

"aws_vpc_security_group_ingress_rule"

[Link to this property](#)

"aws_vpc_security_group_egress_rule"

[Link to this property](#)

"aws_ec2_managed_prefix_list"

[Link to this property](#)

"aws_ec2_transit_gateway"

[Link to this property](#)

"aws_ec2_transit_gateway_prefix_list_reference"

[Link to this property](#)

"aws_ec2_transit_gateway_vpc_attachment"

[Link to this property](#)

"azurerm_application_security_group"

[Link to this property](#)

"azurerm_lb"

[Link to this property](#)

"azurerm_lb_backend_address_pool"

[Link to this property](#)

"azurerm_lb_nat_pool"

[Link to this property](#)

"azurerm_lb_nat_rule"

[Link to this property](#)

"azurerm_lb_rule"

[Link to this property](#)

"azurerm_local_network_gateway"

[Link to this property](#)

"azurerm_network_interface"

[Link to this property](#)

"azurerm_network_interface_application_security_group_association"

[Link to this property](#)

"azurerm_network_interface_backend_address_pool_association"

[Link to this property](#)

"azurerm_network_interface_security_group_association"

[Link to this property](#)

"azurerm_network_security_group"

[Link to this property](#)

"azurerm_public_ip"

[Link to this property](#)

"azurerm_route"

[Link to this property](#)

"azurerm_route_table"

[Link to this property](#)

"azurerm_subnet"

[Link to this property](#)

"azurerm_subnet_route_table_association"

[Link to this property](#)

"azurerm_virtual_machine"

[Link to this property](#)

"azurerm_virtual_network_gateway_connection"

[Link to this property](#)

"azurerm_virtual_network"

[Link to this property](#)

"azurerm_virtual_network_gateway"

[Link to this property](#)

"google_compute_network"

[Link to this property](#)

"google_compute_subnetwork"

[Link to this property](#)

"google_compute_vpn_gateway"

[Link to this property](#)

"google_compute_vpn_tunnel"

[Link to this property](#)

"google_compute_route"

[Link to this property](#)

"google_compute_address"

[Link to this property](#)

"google_compute_global_address"

[Link to this property](#)

"google_compute_router"

[Link to this property](#)

"google_compute_interconnect_attachment"

[Link to this property](#)

"google_compute_ha_vpn_gateway"

[Link to this property](#)

"google_compute_forwarding_rule"

[Link to this property](#)

"google_compute_network_firewall_policy"

[Link to this property](#)

"google_compute_network_firewall_policy_rule"

[Link to this property](#)

"cloudflare_static_route"

[Link to this property](#)

"cloudflare_ipsec_tunnel"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

sections: array of object { hidden_items, name, visible_items, help_text }

</summary>

<details>

<summary>

hidden_items: array of object { helpText, name, value }

</summary>

helpText: optional string

[Link to this property](#)

name: optional string

[Link to this property](#)

<details>

<summary>

value: optional object { item_type, string } or object { item_type, yaml } or object { item_type, yaml_diff } or 2 more

</summary>

One of the following:

<details>

<summary>

McnStringItem object { item_type, string }

</summary>

item_type: string

[Link to this property](#)

string: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnYamlItem object { item_type, yaml }

</summary>

item_type: string

[Link to this property](#)

yaml: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnYamlDiffItem object { item_type, yaml_diff }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

yaml_diff: object { diff, left_description, left_yaml, 2 more }

</summary>

diff: string

[Link to this property](#)

left_description: string

[Link to this property](#)

left_yaml: string

[Link to this property](#)

right_description: string

[Link to this property](#)

right_yaml: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnResourcePreviewItem object { item_type, resource_preview }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

resource_preview: object { id, cloud_type, detail, 3 more }

</summary>

id: string

formatuuid

[Link to this property](#)

<details>

<summary>

cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

[Link to this property](#)

"AZURE"

[Link to this property](#)

"GOOGLE"

[Link to this property](#)

"CLOUDFLARE"

[Link to this property](#)

</details>

[Link to this property](#)

detail: string

[Link to this property](#)

name: string

[Link to this property](#)

<details>

<summary>

resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more

</summary>

One of the following:

"aws_customer_gateway"

[Link to this property](#)

"aws_egress_only_internet_gateway"

[Link to this property](#)

"aws_internet_gateway"

[Link to this property](#)

"aws_instance"

[Link to this property](#)

"aws_network_interface"

[Link to this property](#)

"aws_route"

[Link to this property](#)

"aws_route_table"

[Link to this property](#)

"aws_route_table_association"

[Link to this property](#)

"aws_subnet"

[Link to this property](#)

"aws_vpc"

[Link to this property](#)

"aws_vpc_ipv4_cidr_block_association"

[Link to this property](#)

"aws_vpn_connection"

[Link to this property](#)

"aws_vpn_connection_route"

[Link to this property](#)

"aws_vpn_gateway"

[Link to this property](#)

"aws_security_group"

[Link to this property](#)

"aws_vpc_security_group_ingress_rule"

[Link to this property](#)

"aws_vpc_security_group_egress_rule"

[Link to this property](#)

"aws_ec2_managed_prefix_list"

[Link to this property](#)

"aws_ec2_transit_gateway"

[Link to this property](#)

"aws_ec2_transit_gateway_prefix_list_reference"

[Link to this property](#)

"aws_ec2_transit_gateway_vpc_attachment"

[Link to this property](#)

"azurerm_application_security_group"

[Link to this property](#)

"azurerm_lb"

[Link to this property](#)

"azurerm_lb_backend_address_pool"

[Link to this property](#)

"azurerm_lb_nat_pool"

[Link to this property](#)

"azurerm_lb_nat_rule"

[Link to this property](#)

"azurerm_lb_rule"

[Link to this property](#)

"azurerm_local_network_gateway"

[Link to this property](#)

"azurerm_network_interface"

[Link to this property](#)

"azurerm_network_interface_application_security_group_association"

[Link to this property](#)

"azurerm_network_interface_backend_address_pool_association"

[Link to this property](#)

"azurerm_network_interface_security_group_association"

[Link to this property](#)

"azurerm_network_security_group"

[Link to this property](#)

"azurerm_public_ip"

[Link to this property](#)

"azurerm_route"

[Link to this property](#)

"azurerm_route_table"

[Link to this property](#)

"azurerm_subnet"

[Link to this property](#)

"azurerm_subnet_route_table_association"

[Link to this property](#)

"azurerm_virtual_machine"

[Link to this property](#)

"azurerm_virtual_network_gateway_connection"

[Link to this property](#)

"azurerm_virtual_network"

[Link to this property](#)

"azurerm_virtual_network_gateway"

[Link to this property](#)

"google_compute_network"

[Link to this property](#)

"google_compute_subnetwork"

[Link to this property](#)

"google_compute_vpn_gateway"

[Link to this property](#)

"google_compute_vpn_tunnel"

[Link to this property](#)

"google_compute_route"

[Link to this property](#)

"google_compute_address"

[Link to this property](#)

"google_compute_global_address"

[Link to this property](#)

"google_compute_router"

[Link to this property](#)

"google_compute_interconnect_attachment"

[Link to this property](#)

"google_compute_ha_vpn_gateway"

[Link to this property](#)

"google_compute_forwarding_rule"

[Link to this property](#)

"google_compute_network_firewall_policy"

[Link to this property](#)

"google_compute_network_firewall_policy_rule"

[Link to this property](#)

"cloudflare_static_route"

[Link to this property](#)

"cloudflare_ipsec_tunnel"

[Link to this property](#)

</details>

[Link to this property](#)

title: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnListItem object { item_type, list }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

list: array of object { item_type, string } or object { item_type, resource_preview }

</summary>

One of the following:

<details>

<summary>

McnStringItem object { item_type, string }

</summary>

item_type: string

[Link to this property](#)

string: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnResourcePreviewItem object { item_type, resource_preview }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

resource_preview: object { id, cloud_type, detail, 3 more }

</summary>

id: string

formatuuid

[Link to this property](#)

<details>

<summary>

cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

[Link to this property](#)

"AZURE"

[Link to this property](#)

"GOOGLE"

[Link to this property](#)

"CLOUDFLARE"

[Link to this property](#)

</details>

[Link to this property](#)

detail: string

[Link to this property](#)

name: string

[Link to this property](#)

<details>

<summary>

resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more

</summary>

One of the following:

"aws_customer_gateway"

[Link to this property](#)

"aws_egress_only_internet_gateway"

[Link to this property](#)

"aws_internet_gateway"

[Link to this property](#)

"aws_instance"

[Link to this property](#)

"aws_network_interface"

[Link to this property](#)

"aws_route"

[Link to this property](#)

"aws_route_table"

[Link to this property](#)

"aws_route_table_association"

[Link to this property](#)

"aws_subnet"

[Link to this property](#)

"aws_vpc"

[Link to this property](#)

"aws_vpc_ipv4_cidr_block_association"

[Link to this property](#)

"aws_vpn_connection"

[Link to this property](#)

"aws_vpn_connection_route"

[Link to this property](#)

"aws_vpn_gateway"

[Link to this property](#)

"aws_security_group"

[Link to this property](#)

"aws_vpc_security_group_ingress_rule"

[Link to this property](#)

"aws_vpc_security_group_egress_rule"

[Link to this property](#)

"aws_ec2_managed_prefix_list"

[Link to this property](#)

"aws_ec2_transit_gateway"

[Link to this property](#)

"aws_ec2_transit_gateway_prefix_list_reference"

[Link to this property](#)

"aws_ec2_transit_gateway_vpc_attachment"

[Link to this property](#)

"azurerm_application_security_group"

[Link to this property](#)

"azurerm_lb"

[Link to this property](#)

"azurerm_lb_backend_address_pool"

[Link to this property](#)

"azurerm_lb_nat_pool"

[Link to this property](#)

"azurerm_lb_nat_rule"

[Link to this property](#)

"azurerm_lb_rule"

[Link to this property](#)

"azurerm_local_network_gateway"

[Link to this property](#)

"azurerm_network_interface"

[Link to this property](#)

"azurerm_network_interface_application_security_group_association"

[Link to this property](#)

"azurerm_network_interface_backend_address_pool_association"

[Link to this property](#)

"azurerm_network_interface_security_group_association"

[Link to this property](#)

"azurerm_network_security_group"

[Link to this property](#)

"azurerm_public_ip"

[Link to this property](#)

"azurerm_route"

[Link to this property](#)

"azurerm_route_table"

[Link to this property](#)

"azurerm_subnet"

[Link to this property](#)

"azurerm_subnet_route_table_association"

[Link to this property](#)

"azurerm_virtual_machine"

[Link to this property](#)

"azurerm_virtual_network_gateway_connection"

[Link to this property](#)

"azurerm_virtual_network"

[Link to this property](#)

"azurerm_virtual_network_gateway"

[Link to this property](#)

"google_compute_network"

[Link to this property](#)

"google_compute_subnetwork"

[Link to this property](#)

"google_compute_vpn_gateway"

[Link to this property](#)

"google_compute_vpn_tunnel"

[Link to this property](#)

"google_compute_route"

[Link to this property](#)

"google_compute_address"

[Link to this property](#)

"google_compute_global_address"

[Link to this property](#)

"google_compute_router"

[Link to this property](#)

"google_compute_interconnect_attachment"

[Link to this property](#)

"google_compute_ha_vpn_gateway"

[Link to this property](#)

"google_compute_forwarding_rule"

[Link to this property](#)

"google_compute_network_firewall_policy"

[Link to this property](#)

"google_compute_network_firewall_policy_rule"

[Link to this property](#)

"cloudflare_static_route"

[Link to this property](#)

"cloudflare_ipsec_tunnel"

[Link to this property](#)

</details>

[Link to this property](#)

title: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

name: string

[Link to this property](#)

<details>

<summary>

visible_items: array of object { helpText, name, value }

</summary>

helpText: optional string

[Link to this property](#)

name: optional string

[Link to this property](#)

<details>

<summary>

value: optional object { item_type, string } or object { item_type, yaml } or object { item_type, yaml_diff } or 2 more

</summary>

One of the following:

<details>

<summary>

McnStringItem object { item_type, string }

</summary>

item_type: string

[Link to this property](#)

string: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnYamlItem object { item_type, yaml }

</summary>

item_type: string

[Link to this property](#)

yaml: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnYamlDiffItem object { item_type, yaml_diff }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

yaml_diff: object { diff, left_description, left_yaml, 2 more }

</summary>

diff: string

[Link to this property](#)

left_description: string

[Link to this property](#)

left_yaml: string

[Link to this property](#)

right_description: string

[Link to this property](#)

right_yaml: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnResourcePreviewItem object { item_type, resource_preview }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

resource_preview: object { id, cloud_type, detail, 3 more }

</summary>

id: string

formatuuid

[Link to this property](#)

<details>

<summary>

cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

[Link to this property](#)

"AZURE"

[Link to this property](#)

"GOOGLE"

[Link to this property](#)

"CLOUDFLARE"

[Link to this property](#)

</details>

[Link to this property](#)

detail: string

[Link to this property](#)

name: string

[Link to this property](#)

<details>

<summary>

resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more

</summary>

One of the following:

"aws_customer_gateway"

[Link to this property](#)

"aws_egress_only_internet_gateway"

[Link to this property](#)

"aws_internet_gateway"

[Link to this property](#)

"aws_instance"

[Link to this property](#)

"aws_network_interface"

[Link to this property](#)

"aws_route"

[Link to this property](#)

"aws_route_table"

[Link to this property](#)

"aws_route_table_association"

[Link to this property](#)

"aws_subnet"

[Link to this property](#)

"aws_vpc"

[Link to this property](#)

"aws_vpc_ipv4_cidr_block_association"

[Link to this property](#)

"aws_vpn_connection"

[Link to this property](#)

"aws_vpn_connection_route"

[Link to this property](#)

"aws_vpn_gateway"

[Link to this property](#)

"aws_security_group"

[Link to this property](#)

"aws_vpc_security_group_ingress_rule"

[Link to this property](#)

"aws_vpc_security_group_egress_rule"

[Link to this property](#)

"aws_ec2_managed_prefix_list"

[Link to this property](#)

"aws_ec2_transit_gateway"

[Link to this property](#)

"aws_ec2_transit_gateway_prefix_list_reference"

[Link to this property](#)

"aws_ec2_transit_gateway_vpc_attachment"

[Link to this property](#)

"azurerm_application_security_group"

[Link to this property](#)

"azurerm_lb"

[Link to this property](#)

"azurerm_lb_backend_address_pool"

[Link to this property](#)

"azurerm_lb_nat_pool"

[Link to this property](#)

"azurerm_lb_nat_rule"

[Link to this property](#)

"azurerm_lb_rule"

[Link to this property](#)

"azurerm_local_network_gateway"

[Link to this property](#)

"azurerm_network_interface"

[Link to this property](#)

"azurerm_network_interface_application_security_group_association"

[Link to this property](#)

"azurerm_network_interface_backend_address_pool_association"

[Link to this property](#)

"azurerm_network_interface_security_group_association"

[Link to this property](#)

"azurerm_network_security_group"

[Link to this property](#)

"azurerm_public_ip"

[Link to this property](#)

"azurerm_route"

[Link to this property](#)

"azurerm_route_table"

[Link to this property](#)

"azurerm_subnet"

[Link to this property](#)

"azurerm_subnet_route_table_association"

[Link to this property](#)

"azurerm_virtual_machine"

[Link to this property](#)

"azurerm_virtual_network_gateway_connection"

[Link to this property](#)

"azurerm_virtual_network"

[Link to this property](#)

"azurerm_virtual_network_gateway"

[Link to this property](#)

"google_compute_network"

[Link to this property](#)

"google_compute_subnetwork"

[Link to this property](#)

"google_compute_vpn_gateway"

[Link to this property](#)

"google_compute_vpn_tunnel"

[Link to this property](#)

"google_compute_route"

[Link to this property](#)

"google_compute_address"

[Link to this property](#)

"google_compute_global_address"

[Link to this property](#)

"google_compute_router"

[Link to this property](#)

"google_compute_interconnect_attachment"

[Link to this property](#)

"google_compute_ha_vpn_gateway"

[Link to this property](#)

"google_compute_forwarding_rule"

[Link to this property](#)

"google_compute_network_firewall_policy"

[Link to this property](#)

"google_compute_network_firewall_policy_rule"

[Link to this property](#)

"cloudflare_static_route"

[Link to this property](#)

"cloudflare_ipsec_tunnel"

[Link to this property](#)

</details>

[Link to this property](#)

title: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnListItem object { item_type, list }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

list: array of object { item_type, string } or object { item_type, resource_preview }

</summary>

One of the following:

<details>

<summary>

McnStringItem object { item_type, string }

</summary>

item_type: string

[Link to this property](#)

string: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnResourcePreviewItem object { item_type, resource_preview }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

resource_preview: object { id, cloud_type, detail, 3 more }

</summary>

id: string

formatuuid

[Link to this property](#)

<details>

<summary>

cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

[Link to this property](#)

"AZURE"

[Link to this property](#)

"GOOGLE"

[Link to this property](#)

"CLOUDFLARE"

[Link to this property](#)

</details>

[Link to this property](#)

detail: string

[Link to this property](#)

name: string

[Link to this property](#)

<details>

<summary>

resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more

</summary>

One of the following:

"aws_customer_gateway"

[Link to this property](#)

"aws_egress_only_internet_gateway"

[Link to this property](#)

"aws_internet_gateway"

[Link to this property](#)

"aws_instance"

[Link to this property](#)

"aws_network_interface"

[Link to this property](#)

"aws_route"

[Link to this property](#)

"aws_route_table"

[Link to this property](#)

"aws_route_table_association"

[Link to this property](#)

"aws_subnet"

[Link to this property](#)

"aws_vpc"

[Link to this property](#)

"aws_vpc_ipv4_cidr_block_association"

[Link to this property](#)

"aws_vpn_connection"

[Link to this property](#)

"aws_vpn_connection_route"

[Link to this property](#)

"aws_vpn_gateway"

[Link to this property](#)

"aws_security_group"

[Link to this property](#)

"aws_vpc_security_group_ingress_rule"

[Link to this property](#)

"aws_vpc_security_group_egress_rule"

[Link to this property](#)

"aws_ec2_managed_prefix_list"

[Link to this property](#)

"aws_ec2_transit_gateway"

[Link to this property](#)

"aws_ec2_transit_gateway_prefix_list_reference"

[Link to this property](#)

"aws_ec2_transit_gateway_vpc_attachment"

[Link to this property](#)

"azurerm_application_security_group"

[Link to this property](#)

"azurerm_lb"

[Link to this property](#)

"azurerm_lb_backend_address_pool"

[Link to this property](#)

"azurerm_lb_nat_pool"

[Link to this property](#)

"azurerm_lb_nat_rule"

[Link to this property](#)

"azurerm_lb_rule"

[Link to this property](#)

"azurerm_local_network_gateway"

[Link to this property](#)

"azurerm_network_interface"

[Link to this property](#)

"azurerm_network_interface_application_security_group_association"

[Link to this property](#)

"azurerm_network_interface_backend_address_pool_association"

[Link to this property](#)

"azurerm_network_interface_security_group_association"

[Link to this property](#)

"azurerm_network_security_group"

[Link to this property](#)

"azurerm_public_ip"

[Link to this property](#)

"azurerm_route"

[Link to this property](#)

"azurerm_route_table"

[Link to this property](#)

"azurerm_subnet"

[Link to this property](#)

"azurerm_subnet_route_table_association"

[Link to this property](#)

"azurerm_virtual_machine"

[Link to this property](#)

"azurerm_virtual_network_gateway_connection"

[Link to this property](#)

"azurerm_virtual_network"

[Link to this property](#)

"azurerm_virtual_network_gateway"

[Link to this property](#)

"google_compute_network"

[Link to this property](#)

"google_compute_subnetwork"

[Link to this property](#)

"google_compute_vpn_gateway"

[Link to this property](#)

"google_compute_vpn_tunnel"

[Link to this property](#)

"google_compute_route"

[Link to this property](#)

"google_compute_address"

[Link to this property](#)

"google_compute_global_address"

[Link to this property](#)

"google_compute_router"

[Link to this property](#)

"google_compute_interconnect_attachment"

[Link to this property](#)

"google_compute_ha_vpn_gateway"

[Link to this property](#)

"google_compute_forwarding_rule"

[Link to this property](#)

"google_compute_network_firewall_policy"

[Link to this property](#)

"google_compute_network_firewall_policy_rule"

[Link to this property](#)

"cloudflare_static_route"

[Link to this property](#)

"cloudflare_ipsec_tunnel"

[Link to this property](#)

</details>

[Link to this property](#)

title: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

help_text: optional string

[Link to this property](#)

</details>

[Link to this property](#)

state: map[unknown]

[Link to this property](#)

tags: map[string]

[Link to this property](#)

updated_at: string

[Link to this property](#)

url: string

[Link to this property](#)

<details>

<summary>

managed_by: optional array of object { id, client_type, name }

</summary>

id: string

formatuuid

[Link to this property](#)

client_type: "MAGIC_WAN_CLOUD_ONRAMP"

[Link to this property](#)

name: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

post_apply_resources_unavailable: optional boolean

[Link to this property](#)

region: optional string

[Link to this property](#)

<details>

<summary>

status: optional object { apply_progress, lifecycle_state, plan_progress, 3 more }

</summary>

<details>

<summary>

apply_progress: object { done, total }

</summary>

done: number

[Link to this property](#)

total: number

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

lifecycle_state: "OnrampNeedsApply" or "OnrampPendingPlan" or "OnrampPlanning" or 9 more

</summary>

One of the following:

"OnrampNeedsApply"

[Link to this property](#)

"OnrampPendingPlan"

[Link to this property](#)

"OnrampPlanning"

[Link to this property](#)

"OnrampPlanFailed"

[Link to this property](#)

"OnrampPendingApproval"

[Link to this property](#)

"OnrampPendingApply"

[Link to this property](#)

"OnrampApplying"

[Link to this property](#)

"OnrampApplyFailed"

[Link to this property](#)

"OnrampActive"

[Link to this property](#)

"OnrampPendingDestroy"

[Link to this property](#)

"OnrampDestroying"

[Link to this property](#)

"OnrampDestroyFailed"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

plan_progress: object { done, total }

</summary>

done: number

[Link to this property](#)

total: number

[Link to this property](#)

</details>

[Link to this property](#)

routes: array of string

[Link to this property](#)

tunnels: array of string

[Link to this property](#)

<details>

<summary>

lifecycle_errors: optional map[object { code, message, documentation_url, 2 more } ]

</summary>

<details>

<summary>

code: 1001 or 1002 or 1003 or 152 more

</summary>

One of the following:

1001

[Link to this property](#)

1002

[Link to this property](#)

1003

[Link to this property](#)

1004

[Link to this property](#)

1005

[Link to this property](#)

1006

[Link to this property](#)

1007

[Link to this property](#)

1008

[Link to this property](#)

1009

[Link to this property](#)

1010

[Link to this property](#)

1011

[Link to this property](#)

1012

[Link to this property](#)

1013

[Link to this property](#)

1014

[Link to this property](#)

1015

[Link to this property](#)

1016

[Link to this property](#)

1017

[Link to this property](#)

1018

[Link to this property](#)

2001

[Link to this property](#)

2002

[Link to this property](#)

2003

[Link to this property](#)

2004

[Link to this property](#)

2005

[Link to this property](#)

2006

[Link to this property](#)

2007

[Link to this property](#)

2008

[Link to this property](#)

2009

[Link to this property](#)

2010

[Link to this property](#)

2011

[Link to this property](#)

2012

[Link to this property](#)

2013

[Link to this property](#)

2014

[Link to this property](#)

2015

[Link to this property](#)

2016

[Link to this property](#)

2017

[Link to this property](#)

2018

[Link to this property](#)

2019

[Link to this property](#)

2020

[Link to this property](#)

2021

[Link to this property](#)

2022

[Link to this property](#)

3001

[Link to this property](#)

3002

[Link to this property](#)

3003

[Link to this property](#)

3004

[Link to this property](#)

3005

[Link to this property](#)

3006

[Link to this property](#)

3007

[Link to this property](#)

4001

[Link to this property](#)

4002

[Link to this property](#)

4003

[Link to this property](#)

4004

[Link to this property](#)

4005

[Link to this property](#)

4006

[Link to this property](#)

4007

[Link to this property](#)

4008

[Link to this property](#)

4009

[Link to this property](#)

4010

[Link to this property](#)

4011

[Link to this property](#)

4012

[Link to this property](#)

4013

[Link to this property](#)

4014

[Link to this property](#)

4015

[Link to this property](#)

4016

[Link to this property](#)

4017

[Link to this property](#)

4018

[Link to this property](#)

4019

[Link to this property](#)

4020

[Link to this property](#)

4021

[Link to this property](#)

4022

[Link to this property](#)

4023

[Link to this property](#)

5001

[Link to this property](#)

5002

[Link to this property](#)

5003

[Link to this property](#)

5004

[Link to this property](#)

102000

[Link to this property](#)

102001

[Link to this property](#)

102002

[Link to this property](#)

102003

[Link to this property](#)

102004

[Link to this property](#)

102005

[Link to this property](#)

102006

[Link to this property](#)

102007

[Link to this property](#)

102008

[Link to this property](#)

102009

[Link to this property](#)

102010

[Link to this property](#)

102011

[Link to this property](#)

102012

[Link to this property](#)

102013

[Link to this property](#)

102014

[Link to this property](#)

102015

[Link to this property](#)

102016

[Link to this property](#)

102017

[Link to this property](#)

102018

[Link to this property](#)

102019

[Link to this property](#)

102020

[Link to this property](#)

102021

[Link to this property](#)

102022

[Link to this property](#)

102023

[Link to this property](#)

102024

[Link to this property](#)

102025

[Link to this property](#)

102026

[Link to this property](#)

102027

[Link to this property](#)

102028

[Link to this property](#)

102029

[Link to this property](#)

102030

[Link to this property](#)

102031

[Link to this property](#)

102032

[Link to this property](#)

102033

[Link to this property](#)

102034

[Link to this property](#)

102035

[Link to this property](#)

102036

[Link to this property](#)

102037

[Link to this property](#)

102038

[Link to this property](#)

102039

[Link to this property](#)

102040

[Link to this property](#)

102041

[Link to this property](#)

102042

[Link to this property](#)

102043

[Link to this property](#)

102044

[Link to this property](#)

102045

[Link to this property](#)

102046

[Link to this property](#)

102047

[Link to this property](#)

102048

[Link to this property](#)

102049

[Link to this property](#)

102050

[Link to this property](#)

102051

[Link to this property](#)

102052

[Link to this property](#)

102053

[Link to this property](#)

102054

[Link to this property](#)

102055

[Link to this property](#)

102056

[Link to this property](#)

102057

[Link to this property](#)

102058

[Link to this property](#)

102059

[Link to this property](#)

102060

[Link to this property](#)

102061

[Link to this property](#)

102062

[Link to this property](#)

102063

[Link to this property](#)

102064

[Link to this property](#)

102065

[Link to this property](#)

102066

[Link to this property](#)

102067

[Link to this property](#)

102068

[Link to this property](#)

102069

[Link to this property](#)

102070

[Link to this property](#)

102071

[Link to this property](#)

102072

[Link to this property](#)

103001

[Link to this property](#)

103002

[Link to this property](#)

103003

[Link to this property](#)

103004

[Link to this property](#)

103005

[Link to this property](#)

103006

[Link to this property](#)

103007

[Link to this property](#)

103008

[Link to this property](#)

</details>

[Link to this property](#)

message: string

[Link to this property](#)

documentation_url: optional string

[Link to this property](#)

<details>

<summary>

meta: optional object { l10n_key, loggable_error, template_data, trace_id }

</summary>

l10n_key: optional string

[Link to this property](#)

loggable_error: optional string

[Link to this property](#)

template_data: optional unknown

[Link to this property](#)

trace_id: optional string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

source: optional object { parameter, parameter_value_index, pointer }

</summary>

parameter: optional string

[Link to this property](#)

parameter_value_index: optional number

[Link to this property](#)

pointer: optional string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

vpc: optional string

formatuuid

[Link to this property](#)

<details>

<summary>

vpcs_by_id: optional map[object { id, account_id, cloud_type, 18 more } ]

</summary>

id: string

formatuuid

[Link to this property](#)

account_id: string

[Link to this property](#)

<details>

<summary>

cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

[Link to this property](#)

"AZURE"

[Link to this property](#)

"GOOGLE"

[Link to this property](#)

"CLOUDFLARE"

[Link to this property](#)

</details>

[Link to this property](#)

config: map[unknown]

[Link to this property](#)

deployment_provider: string

formatuuid

[Link to this property](#)

managed: boolean

[Link to this property](#)

<details>

<summary>

monthly_cost_estimate: object { currency, monthly_cost }

</summary>

currency: string

[Link to this property](#)

monthly_cost: number

formatdouble

[Link to this property](#)

</details>

[Link to this property](#)

name: string

[Link to this property](#)

native_id: string

[Link to this property](#)

<details>

<summary>

observations: map[object { first_observed_at, last_observed_at, provider_id, resource_id } ]

</summary>

first_observed_at: string

[Link to this property](#)

last_observed_at: string

[Link to this property](#)

provider_id: string

formatuuid

[Link to this property](#)

resource_id: string

formatuuid

[Link to this property](#)

</details>

[Link to this property](#)

provider_ids: array of string

[Link to this property](#)

provider_names_by_id: map[string]

[Link to this property](#)

region: string

[Link to this property](#)

resource_group: string

[Link to this property](#)

<details>

<summary>

resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more

</summary>

One of the following:

"aws_customer_gateway"

[Link to this property](#)

"aws_egress_only_internet_gateway"

[Link to this property](#)

"aws_internet_gateway"

[Link to this property](#)

"aws_instance"

[Link to this property](#)

"aws_network_interface"

[Link to this property](#)

"aws_route"

[Link to this property](#)

"aws_route_table"

[Link to this property](#)

"aws_route_table_association"

[Link to this property](#)

"aws_subnet"

[Link to this property](#)

"aws_vpc"

[Link to this property](#)

"aws_vpc_ipv4_cidr_block_association"

[Link to this property](#)

"aws_vpn_connection"

[Link to this property](#)

"aws_vpn_connection_route"

[Link to this property](#)

"aws_vpn_gateway"

[Link to this property](#)

"aws_security_group"

[Link to this property](#)

"aws_vpc_security_group_ingress_rule"

[Link to this property](#)

"aws_vpc_security_group_egress_rule"

[Link to this property](#)

"aws_ec2_managed_prefix_list"

[Link to this property](#)

"aws_ec2_transit_gateway"

[Link to this property](#)

"aws_ec2_transit_gateway_prefix_list_reference"

[Link to this property](#)

"aws_ec2_transit_gateway_vpc_attachment"

[Link to this property](#)

"azurerm_application_security_group"

[Link to this property](#)

"azurerm_lb"

[Link to this property](#)

"azurerm_lb_backend_address_pool"

[Link to this property](#)

"azurerm_lb_nat_pool"

[Link to this property](#)

"azurerm_lb_nat_rule"

[Link to this property](#)

"azurerm_lb_rule"

[Link to this property](#)

"azurerm_local_network_gateway"

[Link to this property](#)

"azurerm_network_interface"

[Link to this property](#)

"azurerm_network_interface_application_security_group_association"

[Link to this property](#)

"azurerm_network_interface_backend_address_pool_association"

[Link to this property](#)

"azurerm_network_interface_security_group_association"

[Link to this property](#)

"azurerm_network_security_group"

[Link to this property](#)

"azurerm_public_ip"

[Link to this property](#)

"azurerm_route"

[Link to this property](#)

"azurerm_route_table"

[Link to this property](#)

"azurerm_subnet"

[Link to this property](#)

"azurerm_subnet_route_table_association"

[Link to this property](#)

"azurerm_virtual_machine"

[Link to this property](#)

"azurerm_virtual_network_gateway_connection"

[Link to this property](#)

"azurerm_virtual_network"

[Link to this property](#)

"azurerm_virtual_network_gateway"

[Link to this property](#)

"google_compute_network"

[Link to this property](#)

"google_compute_subnetwork"

[Link to this property](#)

"google_compute_vpn_gateway"

[Link to this property](#)

"google_compute_vpn_tunnel"

[Link to this property](#)

"google_compute_route"

[Link to this property](#)

"google_compute_address"

[Link to this property](#)

"google_compute_global_address"

[Link to this property](#)

"google_compute_router"

[Link to this property](#)

"google_compute_interconnect_attachment"

[Link to this property](#)

"google_compute_ha_vpn_gateway"

[Link to this property](#)

"google_compute_forwarding_rule"

[Link to this property](#)

"google_compute_network_firewall_policy"

[Link to this property](#)

"google_compute_network_firewall_policy_rule"

[Link to this property](#)

"cloudflare_static_route"

[Link to this property](#)

"cloudflare_ipsec_tunnel"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

sections: array of object { hidden_items, name, visible_items, help_text }

</summary>

<details>

<summary>

hidden_items: array of object { helpText, name, value }

</summary>

helpText: optional string

[Link to this property](#)

name: optional string

[Link to this property](#)

<details>

<summary>

value: optional object { item_type, string } or object { item_type, yaml } or object { item_type, yaml_diff } or 2 more

</summary>

One of the following:

<details>

<summary>

McnStringItem object { item_type, string }

</summary>

item_type: string

[Link to this property](#)

string: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnYamlItem object { item_type, yaml }

</summary>

item_type: string

[Link to this property](#)

yaml: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnYamlDiffItem object { item_type, yaml_diff }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

yaml_diff: object { diff, left_description, left_yaml, 2 more }

</summary>

diff: string

[Link to this property](#)

left_description: string

[Link to this property](#)

left_yaml: string

[Link to this property](#)

right_description: string

[Link to this property](#)

right_yaml: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnResourcePreviewItem object { item_type, resource_preview }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

resource_preview: object { id, cloud_type, detail, 3 more }

</summary>

id: string

formatuuid

[Link to this property](#)

<details>

<summary>

cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

[Link to this property](#)

"AZURE"

[Link to this property](#)

"GOOGLE"

[Link to this property](#)

"CLOUDFLARE"

[Link to this property](#)

</details>

[Link to this property](#)

detail: string

[Link to this property](#)

name: string

[Link to this property](#)

<details>

<summary>

resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more

</summary>

One of the following:

"aws_customer_gateway"

[Link to this property](#)

"aws_egress_only_internet_gateway"

[Link to this property](#)

"aws_internet_gateway"

[Link to this property](#)

"aws_instance"

[Link to this property](#)

"aws_network_interface"

[Link to this property](#)

"aws_route"

[Link to this property](#)

"aws_route_table"

[Link to this property](#)

"aws_route_table_association"

[Link to this property](#)

"aws_subnet"

[Link to this property](#)

"aws_vpc"

[Link to this property](#)

"aws_vpc_ipv4_cidr_block_association"

[Link to this property](#)

"aws_vpn_connection"

[Link to this property](#)

"aws_vpn_connection_route"

[Link to this property](#)

"aws_vpn_gateway"

[Link to this property](#)

"aws_security_group"

[Link to this property](#)

"aws_vpc_security_group_ingress_rule"

[Link to this property](#)

"aws_vpc_security_group_egress_rule"

[Link to this property](#)

"aws_ec2_managed_prefix_list"

[Link to this property](#)

"aws_ec2_transit_gateway"

[Link to this property](#)

"aws_ec2_transit_gateway_prefix_list_reference"

[Link to this property](#)

"aws_ec2_transit_gateway_vpc_attachment"

[Link to this property](#)

"azurerm_application_security_group"

[Link to this property](#)

"azurerm_lb"

[Link to this property](#)

"azurerm_lb_backend_address_pool"

[Link to this property](#)

"azurerm_lb_nat_pool"

[Link to this property](#)

"azurerm_lb_nat_rule"

[Link to this property](#)

"azurerm_lb_rule"

[Link to this property](#)

"azurerm_local_network_gateway"

[Link to this property](#)

"azurerm_network_interface"

[Link to this property](#)

"azurerm_network_interface_application_security_group_association"

[Link to this property](#)

"azurerm_network_interface_backend_address_pool_association"

[Link to this property](#)

"azurerm_network_interface_security_group_association"

[Link to this property](#)

"azurerm_network_security_group"

[Link to this property](#)

"azurerm_public_ip"

[Link to this property](#)

"azurerm_route"

[Link to this property](#)

"azurerm_route_table"

[Link to this property](#)

"azurerm_subnet"

[Link to this property](#)

"azurerm_subnet_route_table_association"

[Link to this property](#)

"azurerm_virtual_machine"

[Link to this property](#)

"azurerm_virtual_network_gateway_connection"

[Link to this property](#)

"azurerm_virtual_network"

[Link to this property](#)

"azurerm_virtual_network_gateway"

[Link to this property](#)

"google_compute_network"

[Link to this property](#)

"google_compute_subnetwork"

[Link to this property](#)

"google_compute_vpn_gateway"

[Link to this property](#)

"google_compute_vpn_tunnel"

[Link to this property](#)

"google_compute_route"

[Link to this property](#)

"google_compute_address"

[Link to this property](#)

"google_compute_global_address"

[Link to this property](#)

"google_compute_router"

[Link to this property](#)

"google_compute_interconnect_attachment"

[Link to this property](#)

"google_compute_ha_vpn_gateway"

[Link to this property](#)

"google_compute_forwarding_rule"

[Link to this property](#)

"google_compute_network_firewall_policy"

[Link to this property](#)

"google_compute_network_firewall_policy_rule"

[Link to this property](#)

"cloudflare_static_route"

[Link to this property](#)

"cloudflare_ipsec_tunnel"

[Link to this property](#)

</details>

[Link to this property](#)

title: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnListItem object { item_type, list }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

list: array of object { item_type, string } or object { item_type, resource_preview }

</summary>

One of the following:

<details>

<summary>

McnStringItem object { item_type, string }

</summary>

item_type: string

[Link to this property](#)

string: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnResourcePreviewItem object { item_type, resource_preview }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

resource_preview: object { id, cloud_type, detail, 3 more }

</summary>

id: string

formatuuid

[Link to this property](#)

<details>

<summary>

cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

[Link to this property](#)

"AZURE"

[Link to this property](#)

"GOOGLE"

[Link to this property](#)

"CLOUDFLARE"

[Link to this property](#)

</details>

[Link to this property](#)

detail: string

[Link to this property](#)

name: string

[Link to this property](#)

<details>

<summary>

resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more

</summary>

One of the following:

"aws_customer_gateway"

[Link to this property](#)

"aws_egress_only_internet_gateway"

[Link to this property](#)

"aws_internet_gateway"

[Link to this property](#)

"aws_instance"

[Link to this property](#)

"aws_network_interface"

[Link to this property](#)

"aws_route"

[Link to this property](#)

"aws_route_table"

[Link to this property](#)

"aws_route_table_association"

[Link to this property](#)

"aws_subnet"

[Link to this property](#)

"aws_vpc"

[Link to this property](#)

"aws_vpc_ipv4_cidr_block_association"

[Link to this property](#)

"aws_vpn_connection"

[Link to this property](#)

"aws_vpn_connection_route"

[Link to this property](#)

"aws_vpn_gateway"

[Link to this property](#)

"aws_security_group"

[Link to this property](#)

"aws_vpc_security_group_ingress_rule"

[Link to this property](#)

"aws_vpc_security_group_egress_rule"

[Link to this property](#)

"aws_ec2_managed_prefix_list"

[Link to this property](#)

"aws_ec2_transit_gateway"

[Link to this property](#)

"aws_ec2_transit_gateway_prefix_list_reference"

[Link to this property](#)

"aws_ec2_transit_gateway_vpc_attachment"

[Link to this property](#)

"azurerm_application_security_group"

[Link to this property](#)

"azurerm_lb"

[Link to this property](#)

"azurerm_lb_backend_address_pool"

[Link to this property](#)

"azurerm_lb_nat_pool"

[Link to this property](#)

"azurerm_lb_nat_rule"

[Link to this property](#)

"azurerm_lb_rule"

[Link to this property](#)

"azurerm_local_network_gateway"

[Link to this property](#)

"azurerm_network_interface"

[Link to this property](#)

"azurerm_network_interface_application_security_group_association"

[Link to this property](#)

"azurerm_network_interface_backend_address_pool_association"

[Link to this property](#)

"azurerm_network_interface_security_group_association"

[Link to this property](#)

"azurerm_network_security_group"

[Link to this property](#)

"azurerm_public_ip"

[Link to this property](#)

"azurerm_route"

[Link to this property](#)

"azurerm_route_table"

[Link to this property](#)

"azurerm_subnet"

[Link to this property](#)

"azurerm_subnet_route_table_association"

[Link to this property](#)

"azurerm_virtual_machine"

[Link to this property](#)

"azurerm_virtual_network_gateway_connection"

[Link to this property](#)

"azurerm_virtual_network"

[Link to this property](#)

"azurerm_virtual_network_gateway"

[Link to this property](#)

"google_compute_network"

[Link to this property](#)

"google_compute_subnetwork"

[Link to this property](#)

"google_compute_vpn_gateway"

[Link to this property](#)

"google_compute_vpn_tunnel"

[Link to this property](#)

"google_compute_route"

[Link to this property](#)

"google_compute_address"

[Link to this property](#)

"google_compute_global_address"

[Link to this property](#)

"google_compute_router"

[Link to this property](#)

"google_compute_interconnect_attachment"

[Link to this property](#)

"google_compute_ha_vpn_gateway"

[Link to this property](#)

"google_compute_forwarding_rule"

[Link to this property](#)

"google_compute_network_firewall_policy"

[Link to this property](#)

"google_compute_network_firewall_policy_rule"

[Link to this property](#)

"cloudflare_static_route"

[Link to this property](#)

"cloudflare_ipsec_tunnel"

[Link to this property](#)

</details>

[Link to this property](#)

title: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

name: string

[Link to this property](#)

<details>

<summary>

visible_items: array of object { helpText, name, value }

</summary>

helpText: optional string

[Link to this property](#)

name: optional string

[Link to this property](#)

<details>

<summary>

value: optional object { item_type, string } or object { item_type, yaml } or object { item_type, yaml_diff } or 2 more

</summary>

One of the following:

<details>

<summary>

McnStringItem object { item_type, string }

</summary>

item_type: string

[Link to this property](#)

string: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnYamlItem object { item_type, yaml }

</summary>

item_type: string

[Link to this property](#)

yaml: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnYamlDiffItem object { item_type, yaml_diff }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

yaml_diff: object { diff, left_description, left_yaml, 2 more }

</summary>

diff: string

[Link to this property](#)

left_description: string

[Link to this property](#)

left_yaml: string

[Link to this property](#)

right_description: string

[Link to this property](#)

right_yaml: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnResourcePreviewItem object { item_type, resource_preview }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

resource_preview: object { id, cloud_type, detail, 3 more }

</summary>

id: string

formatuuid

[Link to this property](#)

<details>

<summary>

cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

[Link to this property](#)

"AZURE"

[Link to this property](#)

"GOOGLE"

[Link to this property](#)

"CLOUDFLARE"

[Link to this property](#)

</details>

[Link to this property](#)

detail: string

[Link to this property](#)

name: string

[Link to this property](#)

<details>

<summary>

resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more

</summary>

One of the following:

"aws_customer_gateway"

[Link to this property](#)

"aws_egress_only_internet_gateway"

[Link to this property](#)

"aws_internet_gateway"

[Link to this property](#)

"aws_instance"

[Link to this property](#)

"aws_network_interface"

[Link to this property](#)

"aws_route"

[Link to this property](#)

"aws_route_table"

[Link to this property](#)

"aws_route_table_association"

[Link to this property](#)

"aws_subnet"

[Link to this property](#)

"aws_vpc"

[Link to this property](#)

"aws_vpc_ipv4_cidr_block_association"

[Link to this property](#)

"aws_vpn_connection"

[Link to this property](#)

"aws_vpn_connection_route"

[Link to this property](#)

"aws_vpn_gateway"

[Link to this property](#)

"aws_security_group"

[Link to this property](#)

"aws_vpc_security_group_ingress_rule"

[Link to this property](#)

"aws_vpc_security_group_egress_rule"

[Link to this property](#)

"aws_ec2_managed_prefix_list"

[Link to this property](#)

"aws_ec2_transit_gateway"

[Link to this property](#)

"aws_ec2_transit_gateway_prefix_list_reference"

[Link to this property](#)

"aws_ec2_transit_gateway_vpc_attachment"

[Link to this property](#)

"azurerm_application_security_group"

[Link to this property](#)

"azurerm_lb"

[Link to this property](#)

"azurerm_lb_backend_address_pool"

[Link to this property](#)

"azurerm_lb_nat_pool"

[Link to this property](#)

"azurerm_lb_nat_rule"

[Link to this property](#)

"azurerm_lb_rule"

[Link to this property](#)

"azurerm_local_network_gateway"

[Link to this property](#)

"azurerm_network_interface"

[Link to this property](#)

"azurerm_network_interface_application_security_group_association"

[Link to this property](#)

"azurerm_network_interface_backend_address_pool_association"

[Link to this property](#)

"azurerm_network_interface_security_group_association"

[Link to this property](#)

"azurerm_network_security_group"

[Link to this property](#)

"azurerm_public_ip"

[Link to this property](#)

"azurerm_route"

[Link to this property](#)

"azurerm_route_table"

[Link to this property](#)

"azurerm_subnet"

[Link to this property](#)

"azurerm_subnet_route_table_association"

[Link to this property](#)

"azurerm_virtual_machine"

[Link to this property](#)

"azurerm_virtual_network_gateway_connection"

[Link to this property](#)

"azurerm_virtual_network"

[Link to this property](#)

"azurerm_virtual_network_gateway"

[Link to this property](#)

"google_compute_network"

[Link to this property](#)

"google_compute_subnetwork"

[Link to this property](#)

"google_compute_vpn_gateway"

[Link to this property](#)

"google_compute_vpn_tunnel"

[Link to this property](#)

"google_compute_route"

[Link to this property](#)

"google_compute_address"

[Link to this property](#)

"google_compute_global_address"

[Link to this property](#)

"google_compute_router"

[Link to this property](#)

"google_compute_interconnect_attachment"

[Link to this property](#)

"google_compute_ha_vpn_gateway"

[Link to this property](#)

"google_compute_forwarding_rule"

[Link to this property](#)

"google_compute_network_firewall_policy"

[Link to this property](#)

"google_compute_network_firewall_policy_rule"

[Link to this property](#)

"cloudflare_static_route"

[Link to this property](#)

"cloudflare_ipsec_tunnel"

[Link to this property](#)

</details>

[Link to this property](#)

title: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnListItem object { item_type, list }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

list: array of object { item_type, string } or object { item_type, resource_preview }

</summary>

One of the following:

<details>

<summary>

McnStringItem object { item_type, string }

</summary>

item_type: string

[Link to this property](#)

string: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnResourcePreviewItem object { item_type, resource_preview }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

resource_preview: object { id, cloud_type, detail, 3 more }

</summary>

id: string

formatuuid

[Link to this property](#)

<details>

<summary>

cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

[Link to this property](#)

"AZURE"

[Link to this property](#)

"GOOGLE"

[Link to this property](#)

"CLOUDFLARE"

[Link to this property](#)

</details>

[Link to this property](#)

detail: string

[Link to this property](#)

name: string

[Link to this property](#)

<details>

<summary>

resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more

</summary>

One of the following:

"aws_customer_gateway"

[Link to this property](#)

"aws_egress_only_internet_gateway"

[Link to this property](#)

"aws_internet_gateway"

[Link to this property](#)

"aws_instance"

[Link to this property](#)

"aws_network_interface"

[Link to this property](#)

"aws_route"

[Link to this property](#)

"aws_route_table"

[Link to this property](#)

"aws_route_table_association"

[Link to this property](#)

"aws_subnet"

[Link to this property](#)

"aws_vpc"

[Link to this property](#)

"aws_vpc_ipv4_cidr_block_association"

[Link to this property](#)

"aws_vpn_connection"

[Link to this property](#)

"aws_vpn_connection_route"

[Link to this property](#)

"aws_vpn_gateway"

[Link to this property](#)

"aws_security_group"

[Link to this property](#)

"aws_vpc_security_group_ingress_rule"

[Link to this property](#)

"aws_vpc_security_group_egress_rule"

[Link to this property](#)

"aws_ec2_managed_prefix_list"

[Link to this property](#)

"aws_ec2_transit_gateway"

[Link to this property](#)

"aws_ec2_transit_gateway_prefix_list_reference"

[Link to this property](#)

"aws_ec2_transit_gateway_vpc_attachment"

[Link to this property](#)

"azurerm_application_security_group"

[Link to this property](#)

"azurerm_lb"

[Link to this property](#)

"azurerm_lb_backend_address_pool"

[Link to this property](#)

"azurerm_lb_nat_pool"

[Link to this property](#)

"azurerm_lb_nat_rule"

[Link to this property](#)

"azurerm_lb_rule"

[Link to this property](#)

"azurerm_local_network_gateway"

[Link to this property](#)

"azurerm_network_interface"

[Link to this property](#)

"azurerm_network_interface_application_security_group_association"

[Link to this property](#)

"azurerm_network_interface_backend_address_pool_association"

[Link to this property](#)

"azurerm_network_interface_security_group_association"

[Link to this property](#)

"azurerm_network_security_group"

[Link to this property](#)

"azurerm_public_ip"

[Link to this property](#)

"azurerm_route"

[Link to this property](#)

"azurerm_route_table"

[Link to this property](#)

"azurerm_subnet"

[Link to this property](#)

"azurerm_subnet_route_table_association"

[Link to this property](#)

"azurerm_virtual_machine"

[Link to this property](#)

"azurerm_virtual_network_gateway_connection"

[Link to this property](#)

"azurerm_virtual_network"

[Link to this property](#)

"azurerm_virtual_network_gateway"

[Link to this property](#)

"google_compute_network"

[Link to this property](#)

"google_compute_subnetwork"

[Link to this property](#)

"google_compute_vpn_gateway"

[Link to this property](#)

"google_compute_vpn_tunnel"

[Link to this property](#)

"google_compute_route"

[Link to this property](#)

"google_compute_address"

[Link to this property](#)

"google_compute_global_address"

[Link to this property](#)

"google_compute_router"

[Link to this property](#)

"google_compute_interconnect_attachment"

[Link to this property](#)

"google_compute_ha_vpn_gateway"

[Link to this property](#)

"google_compute_forwarding_rule"

[Link to this property](#)

"google_compute_network_firewall_policy"

[Link to this property](#)

"google_compute_network_firewall_policy_rule"

[Link to this property](#)

"cloudflare_static_route"

[Link to this property](#)

"cloudflare_ipsec_tunnel"

[Link to this property](#)

</details>

[Link to this property](#)

title: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

help_text: optional string

[Link to this property](#)

</details>

[Link to this property](#)

state: map[unknown]

[Link to this property](#)

tags: map[string]

[Link to this property](#)

updated_at: string

[Link to this property](#)

url: string

[Link to this property](#)

<details>

<summary>

managed_by: optional array of object { id, client_type, name }

</summary>

id: string

formatuuid

[Link to this property](#)

client_type: "MAGIC_WAN_CLOUD_ONRAMP"

[Link to this property](#)

name: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

vpcs_by_id_unavailable: optional array of string

The list of vpc IDs for which resource details failed to generate.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

OnRampUpdateResponse object { id, cloud_type, dynamic_routing, 26 more }

</summary>

id: string

formatuuid

[Link to this property](#)

<details>

<summary>

cloud_type: "AWS" or "AZURE" or "GOOGLE"

</summary>

One of the following:

"AWS"

[Link to this property](#)

"AZURE"

[Link to this property](#)

"GOOGLE"

[Link to this property](#)

</details>

[Link to this property](#)

dynamic_routing: boolean

[Link to this property](#)

install_routes_in_cloud: boolean

[Link to this property](#)

install_routes_in_magic_wan: boolean

[Link to this property](#)

name: string

[Link to this property](#)

<details>

<summary>

type: "OnrampTypeSingle" or "OnrampTypeHub"

</summary>

One of the following:

"OnrampTypeSingle"

[Link to this property](#)

"OnrampTypeHub"

[Link to this property](#)

</details>

[Link to this property](#)

updated_at: string

[Link to this property](#)

attached_hubs: optional array of string

[Link to this property](#)

attached_vpcs: optional array of string

[Link to this property](#)

cloud_asn: optional number

formatuint32

[Link to this property](#)

description: optional string

[Link to this property](#)

hub: optional string

formatuuid

[Link to this property](#)

last_applied_at: optional string

[Link to this property](#)

last_exported_at: optional string

[Link to this property](#)

last_planned_at: optional string

[Link to this property](#)

manage_hub_to_hub_attachments: optional boolean

[Link to this property](#)

manage_vpc_to_hub_attachments: optional boolean

[Link to this property](#)

<details>

<summary>

planned_monthly_cost_estimate: optional object { currency, current_monthly_cost, diff, proposed_monthly_cost }

</summary>

currency: string

[Link to this property](#)

current_monthly_cost: number

formatdouble

[Link to this property](#)

diff: number

formatdouble

[Link to this property](#)

proposed_monthly_cost: number

formatdouble

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

planned_resources: optional array of object { diff, keys_require_replace, monthly_cost_estimate_diff, 2 more }

</summary>

<details>

<summary>

diff: object { diff, left_description, left_yaml, 2 more }

</summary>

diff: string

[Link to this property](#)

left_description: string

[Link to this property](#)

left_yaml: string

[Link to this property](#)

right_description: string

[Link to this property](#)

right_yaml: string

[Link to this property](#)

</details>

[Link to this property](#)

keys_require_replace: array of string

[Link to this property](#)

<details>

<summary>

monthly_cost_estimate_diff: object { currency, current_monthly_cost, diff, proposed_monthly_cost }

</summary>

currency: string

[Link to this property](#)

current_monthly_cost: number

formatdouble

[Link to this property](#)

diff: number

formatdouble

[Link to this property](#)

proposed_monthly_cost: number

formatdouble

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

planned_action: "no_op" or "create" or "update" or 2 more

</summary>

One of the following:

"no_op"

[Link to this property](#)

"create"

[Link to this property](#)

"update"

[Link to this property](#)

"replace"

[Link to this property](#)

"destroy"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

resource: object { id, cloud_type, detail, 3 more }

</summary>

id: string

formatuuid

[Link to this property](#)

<details>

<summary>

cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

[Link to this property](#)

"AZURE"

[Link to this property](#)

"GOOGLE"

[Link to this property](#)

"CLOUDFLARE"

[Link to this property](#)

</details>

[Link to this property](#)

detail: string

[Link to this property](#)

name: string

[Link to this property](#)

<details>

<summary>

resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more

</summary>

One of the following:

"aws_customer_gateway"

[Link to this property](#)

"aws_egress_only_internet_gateway"

[Link to this property](#)

"aws_internet_gateway"

[Link to this property](#)

"aws_instance"

[Link to this property](#)

"aws_network_interface"

[Link to this property](#)

"aws_route"

[Link to this property](#)

"aws_route_table"

[Link to this property](#)

"aws_route_table_association"

[Link to this property](#)

"aws_subnet"

[Link to this property](#)

"aws_vpc"

[Link to this property](#)

"aws_vpc_ipv4_cidr_block_association"

[Link to this property](#)

"aws_vpn_connection"

[Link to this property](#)

"aws_vpn_connection_route"

[Link to this property](#)

"aws_vpn_gateway"

[Link to this property](#)

"aws_security_group"

[Link to this property](#)

"aws_vpc_security_group_ingress_rule"

[Link to this property](#)

"aws_vpc_security_group_egress_rule"

[Link to this property](#)

"aws_ec2_managed_prefix_list"

[Link to this property](#)

"aws_ec2_transit_gateway"

[Link to this property](#)

"aws_ec2_transit_gateway_prefix_list_reference"

[Link to this property](#)

"aws_ec2_transit_gateway_vpc_attachment"

[Link to this property](#)

"azurerm_application_security_group"

[Link to this property](#)

"azurerm_lb"

[Link to this property](#)

"azurerm_lb_backend_address_pool"

[Link to this property](#)

"azurerm_lb_nat_pool"

[Link to this property](#)

"azurerm_lb_nat_rule"

[Link to this property](#)

"azurerm_lb_rule"

[Link to this property](#)

"azurerm_local_network_gateway"

[Link to this property](#)

"azurerm_network_interface"

[Link to this property](#)

"azurerm_network_interface_application_security_group_association"

[Link to this property](#)

"azurerm_network_interface_backend_address_pool_association"

[Link to this property](#)

"azurerm_network_interface_security_group_association"

[Link to this property](#)

"azurerm_network_security_group"

[Link to this property](#)

"azurerm_public_ip"

[Link to this property](#)

"azurerm_route"

[Link to this property](#)

"azurerm_route_table"

[Link to this property](#)

"azurerm_subnet"

[Link to this property](#)

"azurerm_subnet_route_table_association"

[Link to this property](#)

"azurerm_virtual_machine"

[Link to this property](#)

"azurerm_virtual_network_gateway_connection"

[Link to this property](#)

"azurerm_virtual_network"

[Link to this property](#)

"azurerm_virtual_network_gateway"

[Link to this property](#)

"google_compute_network"

[Link to this property](#)

"google_compute_subnetwork"

[Link to this property](#)

"google_compute_vpn_gateway"

[Link to this property](#)

"google_compute_vpn_tunnel"

[Link to this property](#)

"google_compute_route"

[Link to this property](#)

"google_compute_address"

[Link to this property](#)

"google_compute_global_address"

[Link to this property](#)

"google_compute_router"

[Link to this property](#)

"google_compute_interconnect_attachment"

[Link to this property](#)

"google_compute_ha_vpn_gateway"

[Link to this property](#)

"google_compute_forwarding_rule"

[Link to this property](#)

"google_compute_network_firewall_policy"

[Link to this property](#)

"google_compute_network_firewall_policy_rule"

[Link to this property](#)

"cloudflare_static_route"

[Link to this property](#)

"cloudflare_ipsec_tunnel"

[Link to this property](#)

</details>

[Link to this property](#)

title: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

planned_resources_unavailable: optional boolean

[Link to this property](#)

<details>

<summary>

post_apply_monthly_cost_estimate: optional object { currency, monthly_cost }

</summary>

currency: string

[Link to this property](#)

monthly_cost: number

formatdouble

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

post_apply_resources: optional map[object { id, account_id, cloud_type, 18 more } ]

</summary>

id: string

formatuuid

[Link to this property](#)

account_id: string

[Link to this property](#)

<details>

<summary>

cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

[Link to this property](#)

"AZURE"

[Link to this property](#)

"GOOGLE"

[Link to this property](#)

"CLOUDFLARE"

[Link to this property](#)

</details>

[Link to this property](#)

config: map[unknown]

[Link to this property](#)

deployment_provider: string

formatuuid

[Link to this property](#)

managed: boolean

[Link to this property](#)

<details>

<summary>

monthly_cost_estimate: object { currency, monthly_cost }

</summary>

currency: string

[Link to this property](#)

monthly_cost: number

formatdouble

[Link to this property](#)

</details>

[Link to this property](#)

name: string

[Link to this property](#)

native_id: string

[Link to this property](#)

<details>

<summary>

observations: map[object { first_observed_at, last_observed_at, provider_id, resource_id } ]

</summary>

first_observed_at: string

[Link to this property](#)

last_observed_at: string

[Link to this property](#)

provider_id: string

formatuuid

[Link to this property](#)

resource_id: string

formatuuid

[Link to this property](#)

</details>

[Link to this property](#)

provider_ids: array of string

[Link to this property](#)

provider_names_by_id: map[string]

[Link to this property](#)

region: string

[Link to this property](#)

resource_group: string

[Link to this property](#)

<details>

<summary>

resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more

</summary>

One of the following:

"aws_customer_gateway"

[Link to this property](#)

"aws_egress_only_internet_gateway"

[Link to this property](#)

"aws_internet_gateway"

[Link to this property](#)

"aws_instance"

[Link to this property](#)

"aws_network_interface"

[Link to this property](#)

"aws_route"

[Link to this property](#)

"aws_route_table"

[Link to this property](#)

"aws_route_table_association"

[Link to this property](#)

"aws_subnet"

[Link to this property](#)

"aws_vpc"

[Link to this property](#)

"aws_vpc_ipv4_cidr_block_association"

[Link to this property](#)

"aws_vpn_connection"

[Link to this property](#)

"aws_vpn_connection_route"

[Link to this property](#)

"aws_vpn_gateway"

[Link to this property](#)

"aws_security_group"

[Link to this property](#)

"aws_vpc_security_group_ingress_rule"

[Link to this property](#)

"aws_vpc_security_group_egress_rule"

[Link to this property](#)

"aws_ec2_managed_prefix_list"

[Link to this property](#)

"aws_ec2_transit_gateway"

[Link to this property](#)

"aws_ec2_transit_gateway_prefix_list_reference"

[Link to this property](#)

"aws_ec2_transit_gateway_vpc_attachment"

[Link to this property](#)

"azurerm_application_security_group"

[Link to this property](#)

"azurerm_lb"

[Link to this property](#)

"azurerm_lb_backend_address_pool"

[Link to this property](#)

"azurerm_lb_nat_pool"

[Link to this property](#)

"azurerm_lb_nat_rule"

[Link to this property](#)

"azurerm_lb_rule"

[Link to this property](#)

"azurerm_local_network_gateway"

[Link to this property](#)

"azurerm_network_interface"

[Link to this property](#)

"azurerm_network_interface_application_security_group_association"

[Link to this property](#)

"azurerm_network_interface_backend_address_pool_association"

[Link to this property](#)

"azurerm_network_interface_security_group_association"

[Link to this property](#)

"azurerm_network_security_group"

[Link to this property](#)

"azurerm_public_ip"

[Link to this property](#)

"azurerm_route"

[Link to this property](#)

"azurerm_route_table"

[Link to this property](#)

"azurerm_subnet"

[Link to this property](#)

"azurerm_subnet_route_table_association"

[Link to this property](#)

"azurerm_virtual_machine"

[Link to this property](#)

"azurerm_virtual_network_gateway_connection"

[Link to this property](#)

"azurerm_virtual_network"

[Link to this property](#)

"azurerm_virtual_network_gateway"

[Link to this property](#)

"google_compute_network"

[Link to this property](#)

"google_compute_subnetwork"

[Link to this property](#)

"google_compute_vpn_gateway"

[Link to this property](#)

"google_compute_vpn_tunnel"

[Link to this property](#)

"google_compute_route"

[Link to this property](#)

"google_compute_address"

[Link to this property](#)

"google_compute_global_address"

[Link to this property](#)

"google_compute_router"

[Link to this property](#)

"google_compute_interconnect_attachment"

[Link to this property](#)

"google_compute_ha_vpn_gateway"

[Link to this property](#)

"google_compute_forwarding_rule"

[Link to this property](#)

"google_compute_network_firewall_policy"

[Link to this property](#)

"google_compute_network_firewall_policy_rule"

[Link to this property](#)

"cloudflare_static_route"

[Link to this property](#)

"cloudflare_ipsec_tunnel"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

sections: array of object { hidden_items, name, visible_items, help_text }

</summary>

<details>

<summary>

hidden_items: array of object { helpText, name, value }

</summary>

helpText: optional string

[Link to this property](#)

name: optional string

[Link to this property](#)

<details>

<summary>

value: optional object { item_type, string } or object { item_type, yaml } or object { item_type, yaml_diff } or 2 more

</summary>

One of the following:

<details>

<summary>

McnStringItem object { item_type, string }

</summary>

item_type: string

[Link to this property](#)

string: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnYamlItem object { item_type, yaml }

</summary>

item_type: string

[Link to this property](#)

yaml: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnYamlDiffItem object { item_type, yaml_diff }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

yaml_diff: object { diff, left_description, left_yaml, 2 more }

</summary>

diff: string

[Link to this property](#)

left_description: string

[Link to this property](#)

left_yaml: string

[Link to this property](#)

right_description: string

[Link to this property](#)

right_yaml: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnResourcePreviewItem object { item_type, resource_preview }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

resource_preview: object { id, cloud_type, detail, 3 more }

</summary>

id: string

formatuuid

[Link to this property](#)

<details>

<summary>

cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

[Link to this property](#)

"AZURE"

[Link to this property](#)

"GOOGLE"

[Link to this property](#)

"CLOUDFLARE"

[Link to this property](#)

</details>

[Link to this property](#)

detail: string

[Link to this property](#)

name: string

[Link to this property](#)

<details>

<summary>

resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more

</summary>

One of the following:

"aws_customer_gateway"

[Link to this property](#)

"aws_egress_only_internet_gateway"

[Link to this property](#)

"aws_internet_gateway"

[Link to this property](#)

"aws_instance"

[Link to this property](#)

"aws_network_interface"

[Link to this property](#)

"aws_route"

[Link to this property](#)

"aws_route_table"

[Link to this property](#)

"aws_route_table_association"

[Link to this property](#)

"aws_subnet"

[Link to this property](#)

"aws_vpc"

[Link to this property](#)

"aws_vpc_ipv4_cidr_block_association"

[Link to this property](#)

"aws_vpn_connection"

[Link to this property](#)

"aws_vpn_connection_route"

[Link to this property](#)

"aws_vpn_gateway"

[Link to this property](#)

"aws_security_group"

[Link to this property](#)

"aws_vpc_security_group_ingress_rule"

[Link to this property](#)

"aws_vpc_security_group_egress_rule"

[Link to this property](#)

"aws_ec2_managed_prefix_list"

[Link to this property](#)

"aws_ec2_transit_gateway"

[Link to this property](#)

"aws_ec2_transit_gateway_prefix_list_reference"

[Link to this property](#)

"aws_ec2_transit_gateway_vpc_attachment"

[Link to this property](#)

"azurerm_application_security_group"

[Link to this property](#)

"azurerm_lb"

[Link to this property](#)

"azurerm_lb_backend_address_pool"

[Link to this property](#)

"azurerm_lb_nat_pool"

[Link to this property](#)

"azurerm_lb_nat_rule"

[Link to this property](#)

"azurerm_lb_rule"

[Link to this property](#)

"azurerm_local_network_gateway"

[Link to this property](#)

"azurerm_network_interface"

[Link to this property](#)

"azurerm_network_interface_application_security_group_association"

[Link to this property](#)

"azurerm_network_interface_backend_address_pool_association"

[Link to this property](#)

"azurerm_network_interface_security_group_association"

[Link to this property](#)

"azurerm_network_security_group"

[Link to this property](#)

"azurerm_public_ip"

[Link to this property](#)

"azurerm_route"

[Link to this property](#)

"azurerm_route_table"

[Link to this property](#)

"azurerm_subnet"

[Link to this property](#)

"azurerm_subnet_route_table_association"

[Link to this property](#)

"azurerm_virtual_machine"

[Link to this property](#)

"azurerm_virtual_network_gateway_connection"

[Link to this property](#)

"azurerm_virtual_network"

[Link to this property](#)

"azurerm_virtual_network_gateway"

[Link to this property](#)

"google_compute_network"

[Link to this property](#)

"google_compute_subnetwork"

[Link to this property](#)

"google_compute_vpn_gateway"

[Link to this property](#)

"google_compute_vpn_tunnel"

[Link to this property](#)

"google_compute_route"

[Link to this property](#)

"google_compute_address"

[Link to this property](#)

"google_compute_global_address"

[Link to this property](#)

"google_compute_router"

[Link to this property](#)

"google_compute_interconnect_attachment"

[Link to this property](#)

"google_compute_ha_vpn_gateway"

[Link to this property](#)

"google_compute_forwarding_rule"

[Link to this property](#)

"google_compute_network_firewall_policy"

[Link to this property](#)

"google_compute_network_firewall_policy_rule"

[Link to this property](#)

"cloudflare_static_route"

[Link to this property](#)

"cloudflare_ipsec_tunnel"

[Link to this property](#)

</details>

[Link to this property](#)

title: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnListItem object { item_type, list }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

list: array of object { item_type, string } or object { item_type, resource_preview }

</summary>

One of the following:

<details>

<summary>

McnStringItem object { item_type, string }

</summary>

item_type: string

[Link to this property](#)

string: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnResourcePreviewItem object { item_type, resource_preview }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

resource_preview: object { id, cloud_type, detail, 3 more }

</summary>

id: string

formatuuid

[Link to this property](#)

<details>

<summary>

cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

[Link to this property](#)

"AZURE"

[Link to this property](#)

"GOOGLE"

[Link to this property](#)

"CLOUDFLARE"

[Link to this property](#)

</details>

[Link to this property](#)

detail: string

[Link to this property](#)

name: string

[Link to this property](#)

<details>

<summary>

resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more

</summary>

One of the following:

"aws_customer_gateway"

[Link to this property](#)

"aws_egress_only_internet_gateway"

[Link to this property](#)

"aws_internet_gateway"

[Link to this property](#)

"aws_instance"

[Link to this property](#)

"aws_network_interface"

[Link to this property](#)

"aws_route"

[Link to this property](#)

"aws_route_table"

[Link to this property](#)

"aws_route_table_association"

[Link to this property](#)

"aws_subnet"

[Link to this property](#)

"aws_vpc"

[Link to this property](#)

"aws_vpc_ipv4_cidr_block_association"

[Link to this property](#)

"aws_vpn_connection"

[Link to this property](#)

"aws_vpn_connection_route"

[Link to this property](#)

"aws_vpn_gateway"

[Link to this property](#)

"aws_security_group"

[Link to this property](#)

"aws_vpc_security_group_ingress_rule"

[Link to this property](#)

"aws_vpc_security_group_egress_rule"

[Link to this property](#)

"aws_ec2_managed_prefix_list"

[Link to this property](#)

"aws_ec2_transit_gateway"

[Link to this property](#)

"aws_ec2_transit_gateway_prefix_list_reference"

[Link to this property](#)

"aws_ec2_transit_gateway_vpc_attachment"

[Link to this property](#)

"azurerm_application_security_group"

[Link to this property](#)

"azurerm_lb"

[Link to this property](#)

"azurerm_lb_backend_address_pool"

[Link to this property](#)

"azurerm_lb_nat_pool"

[Link to this property](#)

"azurerm_lb_nat_rule"

[Link to this property](#)

"azurerm_lb_rule"

[Link to this property](#)

"azurerm_local_network_gateway"

[Link to this property](#)

"azurerm_network_interface"

[Link to this property](#)

"azurerm_network_interface_application_security_group_association"

[Link to this property](#)

"azurerm_network_interface_backend_address_pool_association"

[Link to this property](#)

"azurerm_network_interface_security_group_association"

[Link to this property](#)

"azurerm_network_security_group"

[Link to this property](#)

"azurerm_public_ip"

[Link to this property](#)

"azurerm_route"

[Link to this property](#)

"azurerm_route_table"

[Link to this property](#)

"azurerm_subnet"

[Link to this property](#)

"azurerm_subnet_route_table_association"

[Link to this property](#)

"azurerm_virtual_machine"

[Link to this property](#)

"azurerm_virtual_network_gateway_connection"

[Link to this property](#)

"azurerm_virtual_network"

[Link to this property](#)

"azurerm_virtual_network_gateway"

[Link to this property](#)

"google_compute_network"

[Link to this property](#)

"google_compute_subnetwork"

[Link to this property](#)

"google_compute_vpn_gateway"

[Link to this property](#)

"google_compute_vpn_tunnel"

[Link to this property](#)

"google_compute_route"

[Link to this property](#)

"google_compute_address"

[Link to this property](#)

"google_compute_global_address"

[Link to this property](#)

"google_compute_router"

[Link to this property](#)

"google_compute_interconnect_attachment"

[Link to this property](#)

"google_compute_ha_vpn_gateway"

[Link to this property](#)

"google_compute_forwarding_rule"

[Link to this property](#)

"google_compute_network_firewall_policy"

[Link to this property](#)

"google_compute_network_firewall_policy_rule"

[Link to this property](#)

"cloudflare_static_route"

[Link to this property](#)

"cloudflare_ipsec_tunnel"

[Link to this property](#)

</details>

[Link to this property](#)

title: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

name: string

[Link to this property](#)

<details>

<summary>

visible_items: array of object { helpText, name, value }

</summary>

helpText: optional string

[Link to this property](#)

name: optional string

[Link to this property](#)

<details>

<summary>

value: optional object { item_type, string } or object { item_type, yaml } or object { item_type, yaml_diff } or 2 more

</summary>

One of the following:

<details>

<summary>

McnStringItem object { item_type, string }

</summary>

item_type: string

[Link to this property](#)

string: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnYamlItem object { item_type, yaml }

</summary>

item_type: string

[Link to this property](#)

yaml: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnYamlDiffItem object { item_type, yaml_diff }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

yaml_diff: object { diff, left_description, left_yaml, 2 more }

</summary>

diff: string

[Link to this property](#)

left_description: string

[Link to this property](#)

left_yaml: string

[Link to this property](#)

right_description: string

[Link to this property](#)

right_yaml: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnResourcePreviewItem object { item_type, resource_preview }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

resource_preview: object { id, cloud_type, detail, 3 more }

</summary>

id: string

formatuuid

[Link to this property](#)

<details>

<summary>

cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

[Link to this property](#)

"AZURE"

[Link to this property](#)

"GOOGLE"

[Link to this property](#)

"CLOUDFLARE"

[Link to this property](#)

</details>

[Link to this property](#)

detail: string

[Link to this property](#)

name: string

[Link to this property](#)

<details>

<summary>

resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more

</summary>

One of the following:

"aws_customer_gateway"

[Link to this property](#)

"aws_egress_only_internet_gateway"

[Link to this property](#)

"aws_internet_gateway"

[Link to this property](#)

"aws_instance"

[Link to this property](#)

"aws_network_interface"

[Link to this property](#)

"aws_route"

[Link to this property](#)

"aws_route_table"

[Link to this property](#)

"aws_route_table_association"

[Link to this property](#)

"aws_subnet"

[Link to this property](#)

"aws_vpc"

[Link to this property](#)

"aws_vpc_ipv4_cidr_block_association"

[Link to this property](#)

"aws_vpn_connection"

[Link to this property](#)

"aws_vpn_connection_route"

[Link to this property](#)

"aws_vpn_gateway"

[Link to this property](#)

"aws_security_group"

[Link to this property](#)

"aws_vpc_security_group_ingress_rule"

[Link to this property](#)

"aws_vpc_security_group_egress_rule"

[Link to this property](#)

"aws_ec2_managed_prefix_list"

[Link to this property](#)

"aws_ec2_transit_gateway"

[Link to this property](#)

"aws_ec2_transit_gateway_prefix_list_reference"

[Link to this property](#)

"aws_ec2_transit_gateway_vpc_attachment"

[Link to this property](#)

"azurerm_application_security_group"

[Link to this property](#)

"azurerm_lb"

[Link to this property](#)

"azurerm_lb_backend_address_pool"

[Link to this property](#)

"azurerm_lb_nat_pool"

[Link to this property](#)

"azurerm_lb_nat_rule"

[Link to this property](#)

"azurerm_lb_rule"

[Link to this property](#)

"azurerm_local_network_gateway"

[Link to this property](#)

"azurerm_network_interface"

[Link to this property](#)

"azurerm_network_interface_application_security_group_association"

[Link to this property](#)

"azurerm_network_interface_backend_address_pool_association"

[Link to this property](#)

"azurerm_network_interface_security_group_association"

[Link to this property](#)

"azurerm_network_security_group"

[Link to this property](#)

"azurerm_public_ip"

[Link to this property](#)

"azurerm_route"

[Link to this property](#)

"azurerm_route_table"

[Link to this property](#)

"azurerm_subnet"

[Link to this property](#)

"azurerm_subnet_route_table_association"

[Link to this property](#)

"azurerm_virtual_machine"

[Link to this property](#)

"azurerm_virtual_network_gateway_connection"

[Link to this property](#)

"azurerm_virtual_network"

[Link to this property](#)

"azurerm_virtual_network_gateway"

[Link to this property](#)

"google_compute_network"

[Link to this property](#)

"google_compute_subnetwork"

[Link to this property](#)

"google_compute_vpn_gateway"

[Link to this property](#)

"google_compute_vpn_tunnel"

[Link to this property](#)

"google_compute_route"

[Link to this property](#)

"google_compute_address"

[Link to this property](#)

"google_compute_global_address"

[Link to this property](#)

"google_compute_router"

[Link to this property](#)

"google_compute_interconnect_attachment"

[Link to this property](#)

"google_compute_ha_vpn_gateway"

[Link to this property](#)

"google_compute_forwarding_rule"

[Link to this property](#)

"google_compute_network_firewall_policy"

[Link to this property](#)

"google_compute_network_firewall_policy_rule"

[Link to this property](#)

"cloudflare_static_route"

[Link to this property](#)

"cloudflare_ipsec_tunnel"

[Link to this property](#)

</details>

[Link to this property](#)

title: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnListItem object { item_type, list }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

list: array of object { item_type, string } or object { item_type, resource_preview }

</summary>

One of the following:

<details>

<summary>

McnStringItem object { item_type, string }

</summary>

item_type: string

[Link to this property](#)

string: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnResourcePreviewItem object { item_type, resource_preview }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

resource_preview: object { id, cloud_type, detail, 3 more }

</summary>

id: string

formatuuid

[Link to this property](#)

<details>

<summary>

cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

[Link to this property](#)

"AZURE"

[Link to this property](#)

"GOOGLE"

[Link to this property](#)

"CLOUDFLARE"

[Link to this property](#)

</details>

[Link to this property](#)

detail: string

[Link to this property](#)

name: string

[Link to this property](#)

<details>

<summary>

resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more

</summary>

One of the following:

"aws_customer_gateway"

[Link to this property](#)

"aws_egress_only_internet_gateway"

[Link to this property](#)

"aws_internet_gateway"

[Link to this property](#)

"aws_instance"

[Link to this property](#)

"aws_network_interface"

[Link to this property](#)

"aws_route"

[Link to this property](#)

"aws_route_table"

[Link to this property](#)

"aws_route_table_association"

[Link to this property](#)

"aws_subnet"

[Link to this property](#)

"aws_vpc"

[Link to this property](#)

"aws_vpc_ipv4_cidr_block_association"

[Link to this property](#)

"aws_vpn_connection"

[Link to this property](#)

"aws_vpn_connection_route"

[Link to this property](#)

"aws_vpn_gateway"

[Link to this property](#)

"aws_security_group"

[Link to this property](#)

"aws_vpc_security_group_ingress_rule"

[Link to this property](#)

"aws_vpc_security_group_egress_rule"

[Link to this property](#)

"aws_ec2_managed_prefix_list"

[Link to this property](#)

"aws_ec2_transit_gateway"

[Link to this property](#)

"aws_ec2_transit_gateway_prefix_list_reference"

[Link to this property](#)

"aws_ec2_transit_gateway_vpc_attachment"

[Link to this property](#)

"azurerm_application_security_group"

[Link to this property](#)

"azurerm_lb"

[Link to this property](#)

"azurerm_lb_backend_address_pool"

[Link to this property](#)

"azurerm_lb_nat_pool"

[Link to this property](#)

"azurerm_lb_nat_rule"

[Link to this property](#)

"azurerm_lb_rule"

[Link to this property](#)

"azurerm_local_network_gateway"

[Link to this property](#)

"azurerm_network_interface"

[Link to this property](#)

"azurerm_network_interface_application_security_group_association"

[Link to this property](#)

"azurerm_network_interface_backend_address_pool_association"

[Link to this property](#)

"azurerm_network_interface_security_group_association"

[Link to this property](#)

"azurerm_network_security_group"

[Link to this property](#)

"azurerm_public_ip"

[Link to this property](#)

"azurerm_route"

[Link to this property](#)

"azurerm_route_table"

[Link to this property](#)

"azurerm_subnet"

[Link to this property](#)

"azurerm_subnet_route_table_association"

[Link to this property](#)

"azurerm_virtual_machine"

[Link to this property](#)

"azurerm_virtual_network_gateway_connection"

[Link to this property](#)

"azurerm_virtual_network"

[Link to this property](#)

"azurerm_virtual_network_gateway"

[Link to this property](#)

"google_compute_network"

[Link to this property](#)

"google_compute_subnetwork"

[Link to this property](#)

"google_compute_vpn_gateway"

[Link to this property](#)

"google_compute_vpn_tunnel"

[Link to this property](#)

"google_compute_route"

[Link to this property](#)

"google_compute_address"

[Link to this property](#)

"google_compute_global_address"

[Link to this property](#)

"google_compute_router"

[Link to this property](#)

"google_compute_interconnect_attachment"

[Link to this property](#)

"google_compute_ha_vpn_gateway"

[Link to this property](#)

"google_compute_forwarding_rule"

[Link to this property](#)

"google_compute_network_firewall_policy"

[Link to this property](#)

"google_compute_network_firewall_policy_rule"

[Link to this property](#)

"cloudflare_static_route"

[Link to this property](#)

"cloudflare_ipsec_tunnel"

[Link to this property](#)

</details>

[Link to this property](#)

title: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

help_text: optional string

[Link to this property](#)

</details>

[Link to this property](#)

state: map[unknown]

[Link to this property](#)

tags: map[string]

[Link to this property](#)

updated_at: string

[Link to this property](#)

url: string

[Link to this property](#)

<details>

<summary>

managed_by: optional array of object { id, client_type, name }

</summary>

id: string

formatuuid

[Link to this property](#)

client_type: "MAGIC_WAN_CLOUD_ONRAMP"

[Link to this property](#)

name: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

post_apply_resources_unavailable: optional boolean

[Link to this property](#)

region: optional string

[Link to this property](#)

<details>

<summary>

status: optional object { apply_progress, lifecycle_state, plan_progress, 3 more }

</summary>

<details>

<summary>

apply_progress: object { done, total }

</summary>

done: number

[Link to this property](#)

total: number

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

lifecycle_state: "OnrampNeedsApply" or "OnrampPendingPlan" or "OnrampPlanning" or 9 more

</summary>

One of the following:

"OnrampNeedsApply"

[Link to this property](#)

"OnrampPendingPlan"

[Link to this property](#)

"OnrampPlanning"

[Link to this property](#)

"OnrampPlanFailed"

[Link to this property](#)

"OnrampPendingApproval"

[Link to this property](#)

"OnrampPendingApply"

[Link to this property](#)

"OnrampApplying"

[Link to this property](#)

"OnrampApplyFailed"

[Link to this property](#)

"OnrampActive"

[Link to this property](#)

"OnrampPendingDestroy"

[Link to this property](#)

"OnrampDestroying"

[Link to this property](#)

"OnrampDestroyFailed"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

plan_progress: object { done, total }

</summary>

done: number

[Link to this property](#)

total: number

[Link to this property](#)

</details>

[Link to this property](#)

routes: array of string

[Link to this property](#)

tunnels: array of string

[Link to this property](#)

<details>

<summary>

lifecycle_errors: optional map[object { code, message, documentation_url, 2 more } ]

</summary>

<details>

<summary>

code: 1001 or 1002 or 1003 or 152 more

</summary>

One of the following:

1001

[Link to this property](#)

1002

[Link to this property](#)

1003

[Link to this property](#)

1004

[Link to this property](#)

1005

[Link to this property](#)

1006

[Link to this property](#)

1007

[Link to this property](#)

1008

[Link to this property](#)

1009

[Link to this property](#)

1010

[Link to this property](#)

1011

[Link to this property](#)

1012

[Link to this property](#)

1013

[Link to this property](#)

1014

[Link to this property](#)

1015

[Link to this property](#)

1016

[Link to this property](#)

1017

[Link to this property](#)

1018

[Link to this property](#)

2001

[Link to this property](#)

2002

[Link to this property](#)

2003

[Link to this property](#)

2004

[Link to this property](#)

2005

[Link to this property](#)

2006

[Link to this property](#)

2007

[Link to this property](#)

2008

[Link to this property](#)

2009

[Link to this property](#)

2010

[Link to this property](#)

2011

[Link to this property](#)

2012

[Link to this property](#)

2013

[Link to this property](#)

2014

[Link to this property](#)

2015

[Link to this property](#)

2016

[Link to this property](#)

2017

[Link to this property](#)

2018

[Link to this property](#)

2019

[Link to this property](#)

2020

[Link to this property](#)

2021

[Link to this property](#)

2022

[Link to this property](#)

3001

[Link to this property](#)

3002

[Link to this property](#)

3003

[Link to this property](#)

3004

[Link to this property](#)

3005

[Link to this property](#)

3006

[Link to this property](#)

3007

[Link to this property](#)

4001

[Link to this property](#)

4002

[Link to this property](#)

4003

[Link to this property](#)

4004

[Link to this property](#)

4005

[Link to this property](#)

4006

[Link to this property](#)

4007

[Link to this property](#)

4008

[Link to this property](#)

4009

[Link to this property](#)

4010

[Link to this property](#)

4011

[Link to this property](#)

4012

[Link to this property](#)

4013

[Link to this property](#)

4014

[Link to this property](#)

4015

[Link to this property](#)

4016

[Link to this property](#)

4017

[Link to this property](#)

4018

[Link to this property](#)

4019

[Link to this property](#)

4020

[Link to this property](#)

4021

[Link to this property](#)

4022

[Link to this property](#)

4023

[Link to this property](#)

5001

[Link to this property](#)

5002

[Link to this property](#)

5003

[Link to this property](#)

5004

[Link to this property](#)

102000

[Link to this property](#)

102001

[Link to this property](#)

102002

[Link to this property](#)

102003

[Link to this property](#)

102004

[Link to this property](#)

102005

[Link to this property](#)

102006

[Link to this property](#)

102007

[Link to this property](#)

102008

[Link to this property](#)

102009

[Link to this property](#)

102010

[Link to this property](#)

102011

[Link to this property](#)

102012

[Link to this property](#)

102013

[Link to this property](#)

102014

[Link to this property](#)

102015

[Link to this property](#)

102016

[Link to this property](#)

102017

[Link to this property](#)

102018

[Link to this property](#)

102019

[Link to this property](#)

102020

[Link to this property](#)

102021

[Link to this property](#)

102022

[Link to this property](#)

102023

[Link to this property](#)

102024

[Link to this property](#)

102025

[Link to this property](#)

102026

[Link to this property](#)

102027

[Link to this property](#)

102028

[Link to this property](#)

102029

[Link to this property](#)

102030

[Link to this property](#)

102031

[Link to this property](#)

102032

[Link to this property](#)

102033

[Link to this property](#)

102034

[Link to this property](#)

102035

[Link to this property](#)

102036

[Link to this property](#)

102037

[Link to this property](#)

102038

[Link to this property](#)

102039

[Link to this property](#)

102040

[Link to this property](#)

102041

[Link to this property](#)

102042

[Link to this property](#)

102043

[Link to this property](#)

102044

[Link to this property](#)

102045

[Link to this property](#)

102046

[Link to this property](#)

102047

[Link to this property](#)

102048

[Link to this property](#)

102049

[Link to this property](#)

102050

[Link to this property](#)

102051

[Link to this property](#)

102052

[Link to this property](#)

102053

[Link to this property](#)

102054

[Link to this property](#)

102055

[Link to this property](#)

102056

[Link to this property](#)

102057

[Link to this property](#)

102058

[Link to this property](#)

102059

[Link to this property](#)

102060

[Link to this property](#)

102061

[Link to this property](#)

102062

[Link to this property](#)

102063

[Link to this property](#)

102064

[Link to this property](#)

102065

[Link to this property](#)

102066

[Link to this property](#)

102067

[Link to this property](#)

102068

[Link to this property](#)

102069

[Link to this property](#)

102070

[Link to this property](#)

102071

[Link to this property](#)

102072

[Link to this property](#)

103001

[Link to this property](#)

103002

[Link to this property](#)

103003

[Link to this property](#)

103004

[Link to this property](#)

103005

[Link to this property](#)

103006

[Link to this property](#)

103007

[Link to this property](#)

103008

[Link to this property](#)

</details>

[Link to this property](#)

message: string

[Link to this property](#)

documentation_url: optional string

[Link to this property](#)

<details>

<summary>

meta: optional object { l10n_key, loggable_error, template_data, trace_id }

</summary>

l10n_key: optional string

[Link to this property](#)

loggable_error: optional string

[Link to this property](#)

template_data: optional unknown

[Link to this property](#)

trace_id: optional string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

source: optional object { parameter, parameter_value_index, pointer }

</summary>

parameter: optional string

[Link to this property](#)

parameter_value_index: optional number

[Link to this property](#)

pointer: optional string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

vpc: optional string

formatuuid

[Link to this property](#)

<details>

<summary>

vpcs_by_id: optional map[object { id, account_id, cloud_type, 18 more } ]

</summary>

id: string

formatuuid

[Link to this property](#)

account_id: string

[Link to this property](#)

<details>

<summary>

cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

[Link to this property](#)

"AZURE"

[Link to this property](#)

"GOOGLE"

[Link to this property](#)

"CLOUDFLARE"

[Link to this property](#)

</details>

[Link to this property](#)

config: map[unknown]

[Link to this property](#)

deployment_provider: string

formatuuid

[Link to this property](#)

managed: boolean

[Link to this property](#)

<details>

<summary>

monthly_cost_estimate: object { currency, monthly_cost }

</summary>

currency: string

[Link to this property](#)

monthly_cost: number

formatdouble

[Link to this property](#)

</details>

[Link to this property](#)

name: string

[Link to this property](#)

native_id: string

[Link to this property](#)

<details>

<summary>

observations: map[object { first_observed_at, last_observed_at, provider_id, resource_id } ]

</summary>

first_observed_at: string

[Link to this property](#)

last_observed_at: string

[Link to this property](#)

provider_id: string

formatuuid

[Link to this property](#)

resource_id: string

formatuuid

[Link to this property](#)

</details>

[Link to this property](#)

provider_ids: array of string

[Link to this property](#)

provider_names_by_id: map[string]

[Link to this property](#)

region: string

[Link to this property](#)

resource_group: string

[Link to this property](#)

<details>

<summary>

resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more

</summary>

One of the following:

"aws_customer_gateway"

[Link to this property](#)

"aws_egress_only_internet_gateway"

[Link to this property](#)

"aws_internet_gateway"

[Link to this property](#)

"aws_instance"

[Link to this property](#)

"aws_network_interface"

[Link to this property](#)

"aws_route"

[Link to this property](#)

"aws_route_table"

[Link to this property](#)

"aws_route_table_association"

[Link to this property](#)

"aws_subnet"

[Link to this property](#)

"aws_vpc"

[Link to this property](#)

"aws_vpc_ipv4_cidr_block_association"

[Link to this property](#)

"aws_vpn_connection"

[Link to this property](#)

"aws_vpn_connection_route"

[Link to this property](#)

"aws_vpn_gateway"

[Link to this property](#)

"aws_security_group"

[Link to this property](#)

"aws_vpc_security_group_ingress_rule"

[Link to this property](#)

"aws_vpc_security_group_egress_rule"

[Link to this property](#)

"aws_ec2_managed_prefix_list"

[Link to this property](#)

"aws_ec2_transit_gateway"

[Link to this property](#)

"aws_ec2_transit_gateway_prefix_list_reference"

[Link to this property](#)

"aws_ec2_transit_gateway_vpc_attachment"

[Link to this property](#)

"azurerm_application_security_group"

[Link to this property](#)

"azurerm_lb"

[Link to this property](#)

"azurerm_lb_backend_address_pool"

[Link to this property](#)

"azurerm_lb_nat_pool"

[Link to this property](#)

"azurerm_lb_nat_rule"

[Link to this property](#)

"azurerm_lb_rule"

[Link to this property](#)

"azurerm_local_network_gateway"

[Link to this property](#)

"azurerm_network_interface"

[Link to this property](#)

"azurerm_network_interface_application_security_group_association"

[Link to this property](#)

"azurerm_network_interface_backend_address_pool_association"

[Link to this property](#)

"azurerm_network_interface_security_group_association"

[Link to this property](#)

"azurerm_network_security_group"

[Link to this property](#)

"azurerm_public_ip"

[Link to this property](#)

"azurerm_route"

[Link to this property](#)

"azurerm_route_table"

[Link to this property](#)

"azurerm_subnet"

[Link to this property](#)

"azurerm_subnet_route_table_association"

[Link to this property](#)

"azurerm_virtual_machine"

[Link to this property](#)

"azurerm_virtual_network_gateway_connection"

[Link to this property](#)

"azurerm_virtual_network"

[Link to this property](#)

"azurerm_virtual_network_gateway"

[Link to this property](#)

"google_compute_network"

[Link to this property](#)

"google_compute_subnetwork"

[Link to this property](#)

"google_compute_vpn_gateway"

[Link to this property](#)

"google_compute_vpn_tunnel"

[Link to this property](#)

"google_compute_route"

[Link to this property](#)

"google_compute_address"

[Link to this property](#)

"google_compute_global_address"

[Link to this property](#)

"google_compute_router"

[Link to this property](#)

"google_compute_interconnect_attachment"

[Link to this property](#)

"google_compute_ha_vpn_gateway"

[Link to this property](#)

"google_compute_forwarding_rule"

[Link to this property](#)

"google_compute_network_firewall_policy"

[Link to this property](#)

"google_compute_network_firewall_policy_rule"

[Link to this property](#)

"cloudflare_static_route"

[Link to this property](#)

"cloudflare_ipsec_tunnel"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

sections: array of object { hidden_items, name, visible_items, help_text }

</summary>

<details>

<summary>

hidden_items: array of object { helpText, name, value }

</summary>

helpText: optional string

[Link to this property](#)

name: optional string

[Link to this property](#)

<details>

<summary>

value: optional object { item_type, string } or object { item_type, yaml } or object { item_type, yaml_diff } or 2 more

</summary>

One of the following:

<details>

<summary>

McnStringItem object { item_type, string }

</summary>

item_type: string

[Link to this property](#)

string: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnYamlItem object { item_type, yaml }

</summary>

item_type: string

[Link to this property](#)

yaml: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnYamlDiffItem object { item_type, yaml_diff }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

yaml_diff: object { diff, left_description, left_yaml, 2 more }

</summary>

diff: string

[Link to this property](#)

left_description: string

[Link to this property](#)

left_yaml: string

[Link to this property](#)

right_description: string

[Link to this property](#)

right_yaml: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnResourcePreviewItem object { item_type, resource_preview }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

resource_preview: object { id, cloud_type, detail, 3 more }

</summary>

id: string

formatuuid

[Link to this property](#)

<details>

<summary>

cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

[Link to this property](#)

"AZURE"

[Link to this property](#)

"GOOGLE"

[Link to this property](#)

"CLOUDFLARE"

[Link to this property](#)

</details>

[Link to this property](#)

detail: string

[Link to this property](#)

name: string

[Link to this property](#)

<details>

<summary>

resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more

</summary>

One of the following:

"aws_customer_gateway"

[Link to this property](#)

"aws_egress_only_internet_gateway"

[Link to this property](#)

"aws_internet_gateway"

[Link to this property](#)

"aws_instance"

[Link to this property](#)

"aws_network_interface"

[Link to this property](#)

"aws_route"

[Link to this property](#)

"aws_route_table"

[Link to this property](#)

"aws_route_table_association"

[Link to this property](#)

"aws_subnet"

[Link to this property](#)

"aws_vpc"

[Link to this property](#)

"aws_vpc_ipv4_cidr_block_association"

[Link to this property](#)

"aws_vpn_connection"

[Link to this property](#)

"aws_vpn_connection_route"

[Link to this property](#)

"aws_vpn_gateway"

[Link to this property](#)

"aws_security_group"

[Link to this property](#)

"aws_vpc_security_group_ingress_rule"

[Link to this property](#)

"aws_vpc_security_group_egress_rule"

[Link to this property](#)

"aws_ec2_managed_prefix_list"

[Link to this property](#)

"aws_ec2_transit_gateway"

[Link to this property](#)

"aws_ec2_transit_gateway_prefix_list_reference"

[Link to this property](#)

"aws_ec2_transit_gateway_vpc_attachment"

[Link to this property](#)

"azurerm_application_security_group"

[Link to this property](#)

"azurerm_lb"

[Link to this property](#)

"azurerm_lb_backend_address_pool"

[Link to this property](#)

"azurerm_lb_nat_pool"

[Link to this property](#)

"azurerm_lb_nat_rule"

[Link to this property](#)

"azurerm_lb_rule"

[Link to this property](#)

"azurerm_local_network_gateway"

[Link to this property](#)

"azurerm_network_interface"

[Link to this property](#)

"azurerm_network_interface_application_security_group_association"

[Link to this property](#)

"azurerm_network_interface_backend_address_pool_association"

[Link to this property](#)

"azurerm_network_interface_security_group_association"

[Link to this property](#)

"azurerm_network_security_group"

[Link to this property](#)

"azurerm_public_ip"

[Link to this property](#)

"azurerm_route"

[Link to this property](#)

"azurerm_route_table"

[Link to this property](#)

"azurerm_subnet"

[Link to this property](#)

"azurerm_subnet_route_table_association"

[Link to this property](#)

"azurerm_virtual_machine"

[Link to this property](#)

"azurerm_virtual_network_gateway_connection"

[Link to this property](#)

"azurerm_virtual_network"

[Link to this property](#)

"azurerm_virtual_network_gateway"

[Link to this property](#)

"google_compute_network"

[Link to this property](#)

"google_compute_subnetwork"

[Link to this property](#)

"google_compute_vpn_gateway"

[Link to this property](#)

"google_compute_vpn_tunnel"

[Link to this property](#)

"google_compute_route"

[Link to this property](#)

"google_compute_address"

[Link to this property](#)

"google_compute_global_address"

[Link to this property](#)

"google_compute_router"

[Link to this property](#)

"google_compute_interconnect_attachment"

[Link to this property](#)

"google_compute_ha_vpn_gateway"

[Link to this property](#)

"google_compute_forwarding_rule"

[Link to this property](#)

"google_compute_network_firewall_policy"

[Link to this property](#)

"google_compute_network_firewall_policy_rule"

[Link to this property](#)

"cloudflare_static_route"

[Link to this property](#)

"cloudflare_ipsec_tunnel"

[Link to this property](#)

</details>

[Link to this property](#)

title: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnListItem object { item_type, list }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

list: array of object { item_type, string } or object { item_type, resource_preview }

</summary>

One of the following:

<details>

<summary>

McnStringItem object { item_type, string }

</summary>

item_type: string

[Link to this property](#)

string: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnResourcePreviewItem object { item_type, resource_preview }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

resource_preview: object { id, cloud_type, detail, 3 more }

</summary>

id: string

formatuuid

[Link to this property](#)

<details>

<summary>

cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

[Link to this property](#)

"AZURE"

[Link to this property](#)

"GOOGLE"

[Link to this property](#)

"CLOUDFLARE"

[Link to this property](#)

</details>

[Link to this property](#)

detail: string

[Link to this property](#)

name: string

[Link to this property](#)

<details>

<summary>

resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more

</summary>

One of the following:

"aws_customer_gateway"

[Link to this property](#)

"aws_egress_only_internet_gateway"

[Link to this property](#)

"aws_internet_gateway"

[Link to this property](#)

"aws_instance"

[Link to this property](#)

"aws_network_interface"

[Link to this property](#)

"aws_route"

[Link to this property](#)

"aws_route_table"

[Link to this property](#)

"aws_route_table_association"

[Link to this property](#)

"aws_subnet"

[Link to this property](#)

"aws_vpc"

[Link to this property](#)

"aws_vpc_ipv4_cidr_block_association"

[Link to this property](#)

"aws_vpn_connection"

[Link to this property](#)

"aws_vpn_connection_route"

[Link to this property](#)

"aws_vpn_gateway"

[Link to this property](#)

"aws_security_group"

[Link to this property](#)

"aws_vpc_security_group_ingress_rule"

[Link to this property](#)

"aws_vpc_security_group_egress_rule"

[Link to this property](#)

"aws_ec2_managed_prefix_list"

[Link to this property](#)

"aws_ec2_transit_gateway"

[Link to this property](#)

"aws_ec2_transit_gateway_prefix_list_reference"

[Link to this property](#)

"aws_ec2_transit_gateway_vpc_attachment"

[Link to this property](#)

"azurerm_application_security_group"

[Link to this property](#)

"azurerm_lb"

[Link to this property](#)

"azurerm_lb_backend_address_pool"

[Link to this property](#)

"azurerm_lb_nat_pool"

[Link to this property](#)

"azurerm_lb_nat_rule"

[Link to this property](#)

"azurerm_lb_rule"

[Link to this property](#)

"azurerm_local_network_gateway"

[Link to this property](#)

"azurerm_network_interface"

[Link to this property](#)

"azurerm_network_interface_application_security_group_association"

[Link to this property](#)

"azurerm_network_interface_backend_address_pool_association"

[Link to this property](#)

"azurerm_network_interface_security_group_association"

[Link to this property](#)

"azurerm_network_security_group"

[Link to this property](#)

"azurerm_public_ip"

[Link to this property](#)

"azurerm_route"

[Link to this property](#)

"azurerm_route_table"

[Link to this property](#)

"azurerm_subnet"

[Link to this property](#)

"azurerm_subnet_route_table_association"

[Link to this property](#)

"azurerm_virtual_machine"

[Link to this property](#)

"azurerm_virtual_network_gateway_connection"

[Link to this property](#)

"azurerm_virtual_network"

[Link to this property](#)

"azurerm_virtual_network_gateway"

[Link to this property](#)

"google_compute_network"

[Link to this property](#)

"google_compute_subnetwork"

[Link to this property](#)

"google_compute_vpn_gateway"

[Link to this property](#)

"google_compute_vpn_tunnel"

[Link to this property](#)

"google_compute_route"

[Link to this property](#)

"google_compute_address"

[Link to this property](#)

"google_compute_global_address"

[Link to this property](#)

"google_compute_router"

[Link to this property](#)

"google_compute_interconnect_attachment"

[Link to this property](#)

"google_compute_ha_vpn_gateway"

[Link to this property](#)

"google_compute_forwarding_rule"

[Link to this property](#)

"google_compute_network_firewall_policy"

[Link to this property](#)

"google_compute_network_firewall_policy_rule"

[Link to this property](#)

"cloudflare_static_route"

[Link to this property](#)

"cloudflare_ipsec_tunnel"

[Link to this property](#)

</details>

[Link to this property](#)

title: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

name: string

[Link to this property](#)

<details>

<summary>

visible_items: array of object { helpText, name, value }

</summary>

helpText: optional string

[Link to this property](#)

name: optional string

[Link to this property](#)

<details>

<summary>

value: optional object { item_type, string } or object { item_type, yaml } or object { item_type, yaml_diff } or 2 more

</summary>

One of the following:

<details>

<summary>

McnStringItem object { item_type, string }

</summary>

item_type: string

[Link to this property](#)

string: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnYamlItem object { item_type, yaml }

</summary>

item_type: string

[Link to this property](#)

yaml: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnYamlDiffItem object { item_type, yaml_diff }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

yaml_diff: object { diff, left_description, left_yaml, 2 more }

</summary>

diff: string

[Link to this property](#)

left_description: string

[Link to this property](#)

left_yaml: string

[Link to this property](#)

right_description: string

[Link to this property](#)

right_yaml: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnResourcePreviewItem object { item_type, resource_preview }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

resource_preview: object { id, cloud_type, detail, 3 more }

</summary>

id: string

formatuuid

[Link to this property](#)

<details>

<summary>

cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

[Link to this property](#)

"AZURE"

[Link to this property](#)

"GOOGLE"

[Link to this property](#)

"CLOUDFLARE"

[Link to this property](#)

</details>

[Link to this property](#)

detail: string

[Link to this property](#)

name: string

[Link to this property](#)

<details>

<summary>

resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more

</summary>

One of the following:

"aws_customer_gateway"

[Link to this property](#)

"aws_egress_only_internet_gateway"

[Link to this property](#)

"aws_internet_gateway"

[Link to this property](#)

"aws_instance"

[Link to this property](#)

"aws_network_interface"

[Link to this property](#)

"aws_route"

[Link to this property](#)

"aws_route_table"

[Link to this property](#)

"aws_route_table_association"

[Link to this property](#)

"aws_subnet"

[Link to this property](#)

"aws_vpc"

[Link to this property](#)

"aws_vpc_ipv4_cidr_block_association"

[Link to this property](#)

"aws_vpn_connection"

[Link to this property](#)

"aws_vpn_connection_route"

[Link to this property](#)

"aws_vpn_gateway"

[Link to this property](#)

"aws_security_group"

[Link to this property](#)

"aws_vpc_security_group_ingress_rule"

[Link to this property](#)

"aws_vpc_security_group_egress_rule"

[Link to this property](#)

"aws_ec2_managed_prefix_list"

[Link to this property](#)

"aws_ec2_transit_gateway"

[Link to this property](#)

"aws_ec2_transit_gateway_prefix_list_reference"

[Link to this property](#)

"aws_ec2_transit_gateway_vpc_attachment"

[Link to this property](#)

"azurerm_application_security_group"

[Link to this property](#)

"azurerm_lb"

[Link to this property](#)

"azurerm_lb_backend_address_pool"

[Link to this property](#)

"azurerm_lb_nat_pool"

[Link to this property](#)

"azurerm_lb_nat_rule"

[Link to this property](#)

"azurerm_lb_rule"

[Link to this property](#)

"azurerm_local_network_gateway"

[Link to this property](#)

"azurerm_network_interface"

[Link to this property](#)

"azurerm_network_interface_application_security_group_association"

[Link to this property](#)

"azurerm_network_interface_backend_address_pool_association"

[Link to this property](#)

"azurerm_network_interface_security_group_association"

[Link to this property](#)

"azurerm_network_security_group"

[Link to this property](#)

"azurerm_public_ip"

[Link to this property](#)

"azurerm_route"

[Link to this property](#)

"azurerm_route_table"

[Link to this property](#)

"azurerm_subnet"

[Link to this property](#)

"azurerm_subnet_route_table_association"

[Link to this property](#)

"azurerm_virtual_machine"

[Link to this property](#)

"azurerm_virtual_network_gateway_connection"

[Link to this property](#)

"azurerm_virtual_network"

[Link to this property](#)

"azurerm_virtual_network_gateway"

[Link to this property](#)

"google_compute_network"

[Link to this property](#)

"google_compute_subnetwork"

[Link to this property](#)

"google_compute_vpn_gateway"

[Link to this property](#)

"google_compute_vpn_tunnel"

[Link to this property](#)

"google_compute_route"

[Link to this property](#)

"google_compute_address"

[Link to this property](#)

"google_compute_global_address"

[Link to this property](#)

"google_compute_router"

[Link to this property](#)

"google_compute_interconnect_attachment"

[Link to this property](#)

"google_compute_ha_vpn_gateway"

[Link to this property](#)

"google_compute_forwarding_rule"

[Link to this property](#)

"google_compute_network_firewall_policy"

[Link to this property](#)

"google_compute_network_firewall_policy_rule"

[Link to this property](#)

"cloudflare_static_route"

[Link to this property](#)

"cloudflare_ipsec_tunnel"

[Link to this property](#)

</details>

[Link to this property](#)

title: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnListItem object { item_type, list }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

list: array of object { item_type, string } or object { item_type, resource_preview }

</summary>

One of the following:

<details>

<summary>

McnStringItem object { item_type, string }

</summary>

item_type: string

[Link to this property](#)

string: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnResourcePreviewItem object { item_type, resource_preview }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

resource_preview: object { id, cloud_type, detail, 3 more }

</summary>

id: string

formatuuid

[Link to this property](#)

<details>

<summary>

cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

[Link to this property](#)

"AZURE"

[Link to this property](#)

"GOOGLE"

[Link to this property](#)

"CLOUDFLARE"

[Link to this property](#)

</details>

[Link to this property](#)

detail: string

[Link to this property](#)

name: string

[Link to this property](#)

<details>

<summary>

resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more

</summary>

One of the following:

"aws_customer_gateway"

[Link to this property](#)

"aws_egress_only_internet_gateway"

[Link to this property](#)

"aws_internet_gateway"

[Link to this property](#)

"aws_instance"

[Link to this property](#)

"aws_network_interface"

[Link to this property](#)

"aws_route"

[Link to this property](#)

"aws_route_table"

[Link to this property](#)

"aws_route_table_association"

[Link to this property](#)

"aws_subnet"

[Link to this property](#)

"aws_vpc"

[Link to this property](#)

"aws_vpc_ipv4_cidr_block_association"

[Link to this property](#)

"aws_vpn_connection"

[Link to this property](#)

"aws_vpn_connection_route"

[Link to this property](#)

"aws_vpn_gateway"

[Link to this property](#)

"aws_security_group"

[Link to this property](#)

"aws_vpc_security_group_ingress_rule"

[Link to this property](#)

"aws_vpc_security_group_egress_rule"

[Link to this property](#)

"aws_ec2_managed_prefix_list"

[Link to this property](#)

"aws_ec2_transit_gateway"

[Link to this property](#)

"aws_ec2_transit_gateway_prefix_list_reference"

[Link to this property](#)

"aws_ec2_transit_gateway_vpc_attachment"

[Link to this property](#)

"azurerm_application_security_group"

[Link to this property](#)

"azurerm_lb"

[Link to this property](#)

"azurerm_lb_backend_address_pool"

[Link to this property](#)

"azurerm_lb_nat_pool"

[Link to this property](#)

"azurerm_lb_nat_rule"

[Link to this property](#)

"azurerm_lb_rule"

[Link to this property](#)

"azurerm_local_network_gateway"

[Link to this property](#)

"azurerm_network_interface"

[Link to this property](#)

"azurerm_network_interface_application_security_group_association"

[Link to this property](#)

"azurerm_network_interface_backend_address_pool_association"

[Link to this property](#)

"azurerm_network_interface_security_group_association"

[Link to this property](#)

"azurerm_network_security_group"

[Link to this property](#)

"azurerm_public_ip"

[Link to this property](#)

"azurerm_route"

[Link to this property](#)

"azurerm_route_table"

[Link to this property](#)

"azurerm_subnet"

[Link to this property](#)

"azurerm_subnet_route_table_association"

[Link to this property](#)

"azurerm_virtual_machine"

[Link to this property](#)

"azurerm_virtual_network_gateway_connection"

[Link to this property](#)

"azurerm_virtual_network"

[Link to this property](#)

"azurerm_virtual_network_gateway"

[Link to this property](#)

"google_compute_network"

[Link to this property](#)

"google_compute_subnetwork"

[Link to this property](#)

"google_compute_vpn_gateway"

[Link to this property](#)

"google_compute_vpn_tunnel"

[Link to this property](#)

"google_compute_route"

[Link to this property](#)

"google_compute_address"

[Link to this property](#)

"google_compute_global_address"

[Link to this property](#)

"google_compute_router"

[Link to this property](#)

"google_compute_interconnect_attachment"

[Link to this property](#)

"google_compute_ha_vpn_gateway"

[Link to this property](#)

"google_compute_forwarding_rule"

[Link to this property](#)

"google_compute_network_firewall_policy"

[Link to this property](#)

"google_compute_network_firewall_policy_rule"

[Link to this property](#)

"cloudflare_static_route"

[Link to this property](#)

"cloudflare_ipsec_tunnel"

[Link to this property](#)

</details>

[Link to this property](#)

title: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

help_text: optional string

[Link to this property](#)

</details>

[Link to this property](#)

state: map[unknown]

[Link to this property](#)

tags: map[string]

[Link to this property](#)

updated_at: string

[Link to this property](#)

url: string

[Link to this property](#)

<details>

<summary>

managed_by: optional array of object { id, client_type, name }

</summary>

id: string

formatuuid

[Link to this property](#)

client_type: "MAGIC_WAN_CLOUD_ONRAMP"

[Link to this property](#)

name: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

vpcs_by_id_unavailable: optional array of string

The list of vpc IDs for which resource details failed to generate.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

OnRampEditResponse object { id, cloud_type, dynamic_routing, 26 more }

</summary>

id: string

formatuuid

[Link to this property](#)

<details>

<summary>

cloud_type: "AWS" or "AZURE" or "GOOGLE"

</summary>

One of the following:

"AWS"

[Link to this property](#)

"AZURE"

[Link to this property](#)

"GOOGLE"

[Link to this property](#)

</details>

[Link to this property](#)

dynamic_routing: boolean

[Link to this property](#)

install_routes_in_cloud: boolean

[Link to this property](#)

install_routes_in_magic_wan: boolean

[Link to this property](#)

name: string

[Link to this property](#)

<details>

<summary>

type: "OnrampTypeSingle" or "OnrampTypeHub"

</summary>

One of the following:

"OnrampTypeSingle"

[Link to this property](#)

"OnrampTypeHub"

[Link to this property](#)

</details>

[Link to this property](#)

updated_at: string

[Link to this property](#)

attached_hubs: optional array of string

[Link to this property](#)

attached_vpcs: optional array of string

[Link to this property](#)

cloud_asn: optional number

formatuint32

[Link to this property](#)

description: optional string

[Link to this property](#)

hub: optional string

formatuuid

[Link to this property](#)

last_applied_at: optional string

[Link to this property](#)

last_exported_at: optional string

[Link to this property](#)

last_planned_at: optional string

[Link to this property](#)

manage_hub_to_hub_attachments: optional boolean

[Link to this property](#)

manage_vpc_to_hub_attachments: optional boolean

[Link to this property](#)

<details>

<summary>

planned_monthly_cost_estimate: optional object { currency, current_monthly_cost, diff, proposed_monthly_cost }

</summary>

currency: string

[Link to this property](#)

current_monthly_cost: number

formatdouble

[Link to this property](#)

diff: number

formatdouble

[Link to this property](#)

proposed_monthly_cost: number

formatdouble

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

planned_resources: optional array of object { diff, keys_require_replace, monthly_cost_estimate_diff, 2 more }

</summary>

<details>

<summary>

diff: object { diff, left_description, left_yaml, 2 more }

</summary>

diff: string

[Link to this property](#)

left_description: string

[Link to this property](#)

left_yaml: string

[Link to this property](#)

right_description: string

[Link to this property](#)

right_yaml: string

[Link to this property](#)

</details>

[Link to this property](#)

keys_require_replace: array of string

[Link to this property](#)

<details>

<summary>

monthly_cost_estimate_diff: object { currency, current_monthly_cost, diff, proposed_monthly_cost }

</summary>

currency: string

[Link to this property](#)

current_monthly_cost: number

formatdouble

[Link to this property](#)

diff: number

formatdouble

[Link to this property](#)

proposed_monthly_cost: number

formatdouble

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

planned_action: "no_op" or "create" or "update" or 2 more

</summary>

One of the following:

"no_op"

[Link to this property](#)

"create"

[Link to this property](#)

"update"

[Link to this property](#)

"replace"

[Link to this property](#)

"destroy"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

resource: object { id, cloud_type, detail, 3 more }

</summary>

id: string

formatuuid

[Link to this property](#)

<details>

<summary>

cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

[Link to this property](#)

"AZURE"

[Link to this property](#)

"GOOGLE"

[Link to this property](#)

"CLOUDFLARE"

[Link to this property](#)

</details>

[Link to this property](#)

detail: string

[Link to this property](#)

name: string

[Link to this property](#)

<details>

<summary>

resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more

</summary>

One of the following:

"aws_customer_gateway"

[Link to this property](#)

"aws_egress_only_internet_gateway"

[Link to this property](#)

"aws_internet_gateway"

[Link to this property](#)

"aws_instance"

[Link to this property](#)

"aws_network_interface"

[Link to this property](#)

"aws_route"

[Link to this property](#)

"aws_route_table"

[Link to this property](#)

"aws_route_table_association"

[Link to this property](#)

"aws_subnet"

[Link to this property](#)

"aws_vpc"

[Link to this property](#)

"aws_vpc_ipv4_cidr_block_association"

[Link to this property](#)

"aws_vpn_connection"

[Link to this property](#)

"aws_vpn_connection_route"

[Link to this property](#)

"aws_vpn_gateway"

[Link to this property](#)

"aws_security_group"

[Link to this property](#)

"aws_vpc_security_group_ingress_rule"

[Link to this property](#)

"aws_vpc_security_group_egress_rule"

[Link to this property](#)

"aws_ec2_managed_prefix_list"

[Link to this property](#)

"aws_ec2_transit_gateway"

[Link to this property](#)

"aws_ec2_transit_gateway_prefix_list_reference"

[Link to this property](#)

"aws_ec2_transit_gateway_vpc_attachment"

[Link to this property](#)

"azurerm_application_security_group"

[Link to this property](#)

"azurerm_lb"

[Link to this property](#)

"azurerm_lb_backend_address_pool"

[Link to this property](#)

"azurerm_lb_nat_pool"

[Link to this property](#)

"azurerm_lb_nat_rule"

[Link to this property](#)

"azurerm_lb_rule"

[Link to this property](#)

"azurerm_local_network_gateway"

[Link to this property](#)

"azurerm_network_interface"

[Link to this property](#)

"azurerm_network_interface_application_security_group_association"

[Link to this property](#)

"azurerm_network_interface_backend_address_pool_association"

[Link to this property](#)

"azurerm_network_interface_security_group_association"

[Link to this property](#)

"azurerm_network_security_group"

[Link to this property](#)

"azurerm_public_ip"

[Link to this property](#)

"azurerm_route"

[Link to this property](#)

"azurerm_route_table"

[Link to this property](#)

"azurerm_subnet"

[Link to this property](#)

"azurerm_subnet_route_table_association"

[Link to this property](#)

"azurerm_virtual_machine"

[Link to this property](#)

"azurerm_virtual_network_gateway_connection"

[Link to this property](#)

"azurerm_virtual_network"

[Link to this property](#)

"azurerm_virtual_network_gateway"

[Link to this property](#)

"google_compute_network"

[Link to this property](#)

"google_compute_subnetwork"

[Link to this property](#)

"google_compute_vpn_gateway"

[Link to this property](#)

"google_compute_vpn_tunnel"

[Link to this property](#)

"google_compute_route"

[Link to this property](#)

"google_compute_address"

[Link to this property](#)

"google_compute_global_address"

[Link to this property](#)

"google_compute_router"

[Link to this property](#)

"google_compute_interconnect_attachment"

[Link to this property](#)

"google_compute_ha_vpn_gateway"

[Link to this property](#)

"google_compute_forwarding_rule"

[Link to this property](#)

"google_compute_network_firewall_policy"

[Link to this property](#)

"google_compute_network_firewall_policy_rule"

[Link to this property](#)

"cloudflare_static_route"

[Link to this property](#)

"cloudflare_ipsec_tunnel"

[Link to this property](#)

</details>

[Link to this property](#)

title: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

planned_resources_unavailable: optional boolean

[Link to this property](#)

<details>

<summary>

post_apply_monthly_cost_estimate: optional object { currency, monthly_cost }

</summary>

currency: string

[Link to this property](#)

monthly_cost: number

formatdouble

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

post_apply_resources: optional map[object { id, account_id, cloud_type, 18 more } ]

</summary>

id: string

formatuuid

[Link to this property](#)

account_id: string

[Link to this property](#)

<details>

<summary>

cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

[Link to this property](#)

"AZURE"

[Link to this property](#)

"GOOGLE"

[Link to this property](#)

"CLOUDFLARE"

[Link to this property](#)

</details>

[Link to this property](#)

config: map[unknown]

[Link to this property](#)

deployment_provider: string

formatuuid

[Link to this property](#)

managed: boolean

[Link to this property](#)

<details>

<summary>

monthly_cost_estimate: object { currency, monthly_cost }

</summary>

currency: string

[Link to this property](#)

monthly_cost: number

formatdouble

[Link to this property](#)

</details>

[Link to this property](#)

name: string

[Link to this property](#)

native_id: string

[Link to this property](#)

<details>

<summary>

observations: map[object { first_observed_at, last_observed_at, provider_id, resource_id } ]

</summary>

first_observed_at: string

[Link to this property](#)

last_observed_at: string

[Link to this property](#)

provider_id: string

formatuuid

[Link to this property](#)

resource_id: string

formatuuid

[Link to this property](#)

</details>

[Link to this property](#)

provider_ids: array of string

[Link to this property](#)

provider_names_by_id: map[string]

[Link to this property](#)

region: string

[Link to this property](#)

resource_group: string

[Link to this property](#)

<details>

<summary>

resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more

</summary>

One of the following:

"aws_customer_gateway"

[Link to this property](#)

"aws_egress_only_internet_gateway"

[Link to this property](#)

"aws_internet_gateway"

[Link to this property](#)

"aws_instance"

[Link to this property](#)

"aws_network_interface"

[Link to this property](#)

"aws_route"

[Link to this property](#)

"aws_route_table"

[Link to this property](#)

"aws_route_table_association"

[Link to this property](#)

"aws_subnet"

[Link to this property](#)

"aws_vpc"

[Link to this property](#)

"aws_vpc_ipv4_cidr_block_association"

[Link to this property](#)

"aws_vpn_connection"

[Link to this property](#)

"aws_vpn_connection_route"

[Link to this property](#)

"aws_vpn_gateway"

[Link to this property](#)

"aws_security_group"

[Link to this property](#)

"aws_vpc_security_group_ingress_rule"

[Link to this property](#)

"aws_vpc_security_group_egress_rule"

[Link to this property](#)

"aws_ec2_managed_prefix_list"

[Link to this property](#)

"aws_ec2_transit_gateway"

[Link to this property](#)

"aws_ec2_transit_gateway_prefix_list_reference"

[Link to this property](#)

"aws_ec2_transit_gateway_vpc_attachment"

[Link to this property](#)

"azurerm_application_security_group"

[Link to this property](#)

"azurerm_lb"

[Link to this property](#)

"azurerm_lb_backend_address_pool"

[Link to this property](#)

"azurerm_lb_nat_pool"

[Link to this property](#)

"azurerm_lb_nat_rule"

[Link to this property](#)

"azurerm_lb_rule"

[Link to this property](#)

"azurerm_local_network_gateway"

[Link to this property](#)

"azurerm_network_interface"

[Link to this property](#)

"azurerm_network_interface_application_security_group_association"

[Link to this property](#)

"azurerm_network_interface_backend_address_pool_association"

[Link to this property](#)

"azurerm_network_interface_security_group_association"

[Link to this property](#)

"azurerm_network_security_group"

[Link to this property](#)

"azurerm_public_ip"

[Link to this property](#)

"azurerm_route"

[Link to this property](#)

"azurerm_route_table"

[Link to this property](#)

"azurerm_subnet"

[Link to this property](#)

"azurerm_subnet_route_table_association"

[Link to this property](#)

"azurerm_virtual_machine"

[Link to this property](#)

"azurerm_virtual_network_gateway_connection"

[Link to this property](#)

"azurerm_virtual_network"

[Link to this property](#)

"azurerm_virtual_network_gateway"

[Link to this property](#)

"google_compute_network"

[Link to this property](#)

"google_compute_subnetwork"

[Link to this property](#)

"google_compute_vpn_gateway"

[Link to this property](#)

"google_compute_vpn_tunnel"

[Link to this property](#)

"google_compute_route"

[Link to this property](#)

"google_compute_address"

[Link to this property](#)

"google_compute_global_address"

[Link to this property](#)

"google_compute_router"

[Link to this property](#)

"google_compute_interconnect_attachment"

[Link to this property](#)

"google_compute_ha_vpn_gateway"

[Link to this property](#)

"google_compute_forwarding_rule"

[Link to this property](#)

"google_compute_network_firewall_policy"

[Link to this property](#)

"google_compute_network_firewall_policy_rule"

[Link to this property](#)

"cloudflare_static_route"

[Link to this property](#)

"cloudflare_ipsec_tunnel"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

sections: array of object { hidden_items, name, visible_items, help_text }

</summary>

<details>

<summary>

hidden_items: array of object { helpText, name, value }

</summary>

helpText: optional string

[Link to this property](#)

name: optional string

[Link to this property](#)

<details>

<summary>

value: optional object { item_type, string } or object { item_type, yaml } or object { item_type, yaml_diff } or 2 more

</summary>

One of the following:

<details>

<summary>

McnStringItem object { item_type, string }

</summary>

item_type: string

[Link to this property](#)

string: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnYamlItem object { item_type, yaml }

</summary>

item_type: string

[Link to this property](#)

yaml: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnYamlDiffItem object { item_type, yaml_diff }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

yaml_diff: object { diff, left_description, left_yaml, 2 more }

</summary>

diff: string

[Link to this property](#)

left_description: string

[Link to this property](#)

left_yaml: string

[Link to this property](#)

right_description: string

[Link to this property](#)

right_yaml: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnResourcePreviewItem object { item_type, resource_preview }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

resource_preview: object { id, cloud_type, detail, 3 more }

</summary>

id: string

formatuuid

[Link to this property](#)

<details>

<summary>

cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

[Link to this property](#)

"AZURE"

[Link to this property](#)

"GOOGLE"

[Link to this property](#)

"CLOUDFLARE"

[Link to this property](#)

</details>

[Link to this property](#)

detail: string

[Link to this property](#)

name: string

[Link to this property](#)

<details>

<summary>

resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more

</summary>

One of the following:

"aws_customer_gateway"

[Link to this property](#)

"aws_egress_only_internet_gateway"

[Link to this property](#)

"aws_internet_gateway"

[Link to this property](#)

"aws_instance"

[Link to this property](#)

"aws_network_interface"

[Link to this property](#)

"aws_route"

[Link to this property](#)

"aws_route_table"

[Link to this property](#)

"aws_route_table_association"

[Link to this property](#)

"aws_subnet"

[Link to this property](#)

"aws_vpc"

[Link to this property](#)

"aws_vpc_ipv4_cidr_block_association"

[Link to this property](#)

"aws_vpn_connection"

[Link to this property](#)

"aws_vpn_connection_route"

[Link to this property](#)

"aws_vpn_gateway"

[Link to this property](#)

"aws_security_group"

[Link to this property](#)

"aws_vpc_security_group_ingress_rule"

[Link to this property](#)

"aws_vpc_security_group_egress_rule"

[Link to this property](#)

"aws_ec2_managed_prefix_list"

[Link to this property](#)

"aws_ec2_transit_gateway"

[Link to this property](#)

"aws_ec2_transit_gateway_prefix_list_reference"

[Link to this property](#)

"aws_ec2_transit_gateway_vpc_attachment"

[Link to this property](#)

"azurerm_application_security_group"

[Link to this property](#)

"azurerm_lb"

[Link to this property](#)

"azurerm_lb_backend_address_pool"

[Link to this property](#)

"azurerm_lb_nat_pool"

[Link to this property](#)

"azurerm_lb_nat_rule"

[Link to this property](#)

"azurerm_lb_rule"

[Link to this property](#)

"azurerm_local_network_gateway"

[Link to this property](#)

"azurerm_network_interface"

[Link to this property](#)

"azurerm_network_interface_application_security_group_association"

[Link to this property](#)

"azurerm_network_interface_backend_address_pool_association"

[Link to this property](#)

"azurerm_network_interface_security_group_association"

[Link to this property](#)

"azurerm_network_security_group"

[Link to this property](#)

"azurerm_public_ip"

[Link to this property](#)

"azurerm_route"

[Link to this property](#)

"azurerm_route_table"

[Link to this property](#)

"azurerm_subnet"

[Link to this property](#)

"azurerm_subnet_route_table_association"

[Link to this property](#)

"azurerm_virtual_machine"

[Link to this property](#)

"azurerm_virtual_network_gateway_connection"

[Link to this property](#)

"azurerm_virtual_network"

[Link to this property](#)

"azurerm_virtual_network_gateway"

[Link to this property](#)

"google_compute_network"

[Link to this property](#)

"google_compute_subnetwork"

[Link to this property](#)

"google_compute_vpn_gateway"

[Link to this property](#)

"google_compute_vpn_tunnel"

[Link to this property](#)

"google_compute_route"

[Link to this property](#)

"google_compute_address"

[Link to this property](#)

"google_compute_global_address"

[Link to this property](#)

"google_compute_router"

[Link to this property](#)

"google_compute_interconnect_attachment"

[Link to this property](#)

"google_compute_ha_vpn_gateway"

[Link to this property](#)

"google_compute_forwarding_rule"

[Link to this property](#)

"google_compute_network_firewall_policy"

[Link to this property](#)

"google_compute_network_firewall_policy_rule"

[Link to this property](#)

"cloudflare_static_route"

[Link to this property](#)

"cloudflare_ipsec_tunnel"

[Link to this property](#)

</details>

[Link to this property](#)

title: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnListItem object { item_type, list }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

list: array of object { item_type, string } or object { item_type, resource_preview }

</summary>

One of the following:

<details>

<summary>

McnStringItem object { item_type, string }

</summary>

item_type: string

[Link to this property](#)

string: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnResourcePreviewItem object { item_type, resource_preview }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

resource_preview: object { id, cloud_type, detail, 3 more }

</summary>

id: string

formatuuid

[Link to this property](#)

<details>

<summary>

cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

[Link to this property](#)

"AZURE"

[Link to this property](#)

"GOOGLE"

[Link to this property](#)

"CLOUDFLARE"

[Link to this property](#)

</details>

[Link to this property](#)

detail: string

[Link to this property](#)

name: string

[Link to this property](#)

<details>

<summary>

resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more

</summary>

One of the following:

"aws_customer_gateway"

[Link to this property](#)

"aws_egress_only_internet_gateway"

[Link to this property](#)

"aws_internet_gateway"

[Link to this property](#)

"aws_instance"

[Link to this property](#)

"aws_network_interface"

[Link to this property](#)

"aws_route"

[Link to this property](#)

"aws_route_table"

[Link to this property](#)

"aws_route_table_association"

[Link to this property](#)

"aws_subnet"

[Link to this property](#)

"aws_vpc"

[Link to this property](#)

"aws_vpc_ipv4_cidr_block_association"

[Link to this property](#)

"aws_vpn_connection"

[Link to this property](#)

"aws_vpn_connection_route"

[Link to this property](#)

"aws_vpn_gateway"

[Link to this property](#)

"aws_security_group"

[Link to this property](#)

"aws_vpc_security_group_ingress_rule"

[Link to this property](#)

"aws_vpc_security_group_egress_rule"

[Link to this property](#)

"aws_ec2_managed_prefix_list"

[Link to this property](#)

"aws_ec2_transit_gateway"

[Link to this property](#)

"aws_ec2_transit_gateway_prefix_list_reference"

[Link to this property](#)

"aws_ec2_transit_gateway_vpc_attachment"

[Link to this property](#)

"azurerm_application_security_group"

[Link to this property](#)

"azurerm_lb"

[Link to this property](#)

"azurerm_lb_backend_address_pool"

[Link to this property](#)

"azurerm_lb_nat_pool"

[Link to this property](#)

"azurerm_lb_nat_rule"

[Link to this property](#)

"azurerm_lb_rule"

[Link to this property](#)

"azurerm_local_network_gateway"

[Link to this property](#)

"azurerm_network_interface"

[Link to this property](#)

"azurerm_network_interface_application_security_group_association"

[Link to this property](#)

"azurerm_network_interface_backend_address_pool_association"

[Link to this property](#)

"azurerm_network_interface_security_group_association"

[Link to this property](#)

"azurerm_network_security_group"

[Link to this property](#)

"azurerm_public_ip"

[Link to this property](#)

"azurerm_route"

[Link to this property](#)

"azurerm_route_table"

[Link to this property](#)

"azurerm_subnet"

[Link to this property](#)

"azurerm_subnet_route_table_association"

[Link to this property](#)

"azurerm_virtual_machine"

[Link to this property](#)

"azurerm_virtual_network_gateway_connection"

[Link to this property](#)

"azurerm_virtual_network"

[Link to this property](#)

"azurerm_virtual_network_gateway"

[Link to this property](#)

"google_compute_network"

[Link to this property](#)

"google_compute_subnetwork"

[Link to this property](#)

"google_compute_vpn_gateway"

[Link to this property](#)

"google_compute_vpn_tunnel"

[Link to this property](#)

"google_compute_route"

[Link to this property](#)

"google_compute_address"

[Link to this property](#)

"google_compute_global_address"

[Link to this property](#)

"google_compute_router"

[Link to this property](#)

"google_compute_interconnect_attachment"

[Link to this property](#)

"google_compute_ha_vpn_gateway"

[Link to this property](#)

"google_compute_forwarding_rule"

[Link to this property](#)

"google_compute_network_firewall_policy"

[Link to this property](#)

"google_compute_network_firewall_policy_rule"

[Link to this property](#)

"cloudflare_static_route"

[Link to this property](#)

"cloudflare_ipsec_tunnel"

[Link to this property](#)

</details>

[Link to this property](#)

title: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

name: string

[Link to this property](#)

<details>

<summary>

visible_items: array of object { helpText, name, value }

</summary>

helpText: optional string

[Link to this property](#)

name: optional string

[Link to this property](#)

<details>

<summary>

value: optional object { item_type, string } or object { item_type, yaml } or object { item_type, yaml_diff } or 2 more

</summary>

One of the following:

<details>

<summary>

McnStringItem object { item_type, string }

</summary>

item_type: string

[Link to this property](#)

string: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnYamlItem object { item_type, yaml }

</summary>

item_type: string

[Link to this property](#)

yaml: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnYamlDiffItem object { item_type, yaml_diff }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

yaml_diff: object { diff, left_description, left_yaml, 2 more }

</summary>

diff: string

[Link to this property](#)

left_description: string

[Link to this property](#)

left_yaml: string

[Link to this property](#)

right_description: string

[Link to this property](#)

right_yaml: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnResourcePreviewItem object { item_type, resource_preview }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

resource_preview: object { id, cloud_type, detail, 3 more }

</summary>

id: string

formatuuid

[Link to this property](#)

<details>

<summary>

cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

[Link to this property](#)

"AZURE"

[Link to this property](#)

"GOOGLE"

[Link to this property](#)

"CLOUDFLARE"

[Link to this property](#)

</details>

[Link to this property](#)

detail: string

[Link to this property](#)

name: string

[Link to this property](#)

<details>

<summary>

resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more

</summary>

One of the following:

"aws_customer_gateway"

[Link to this property](#)

"aws_egress_only_internet_gateway"

[Link to this property](#)

"aws_internet_gateway"

[Link to this property](#)

"aws_instance"

[Link to this property](#)

"aws_network_interface"

[Link to this property](#)

"aws_route"

[Link to this property](#)

"aws_route_table"

[Link to this property](#)

"aws_route_table_association"

[Link to this property](#)

"aws_subnet"

[Link to this property](#)

"aws_vpc"

[Link to this property](#)

"aws_vpc_ipv4_cidr_block_association"

[Link to this property](#)

"aws_vpn_connection"

[Link to this property](#)

"aws_vpn_connection_route"

[Link to this property](#)

"aws_vpn_gateway"

[Link to this property](#)

"aws_security_group"

[Link to this property](#)

"aws_vpc_security_group_ingress_rule"

[Link to this property](#)

"aws_vpc_security_group_egress_rule"

[Link to this property](#)

"aws_ec2_managed_prefix_list"

[Link to this property](#)

"aws_ec2_transit_gateway"

[Link to this property](#)

"aws_ec2_transit_gateway_prefix_list_reference"

[Link to this property](#)

"aws_ec2_transit_gateway_vpc_attachment"

[Link to this property](#)

"azurerm_application_security_group"

[Link to this property](#)

"azurerm_lb"

[Link to this property](#)

"azurerm_lb_backend_address_pool"

[Link to this property](#)

"azurerm_lb_nat_pool"

[Link to this property](#)

"azurerm_lb_nat_rule"

[Link to this property](#)

"azurerm_lb_rule"

[Link to this property](#)

"azurerm_local_network_gateway"

[Link to this property](#)

"azurerm_network_interface"

[Link to this property](#)

"azurerm_network_interface_application_security_group_association"

[Link to this property](#)

"azurerm_network_interface_backend_address_pool_association"

[Link to this property](#)

"azurerm_network_interface_security_group_association"

[Link to this property](#)

"azurerm_network_security_group"

[Link to this property](#)

"azurerm_public_ip"

[Link to this property](#)

"azurerm_route"

[Link to this property](#)

"azurerm_route_table"

[Link to this property](#)

"azurerm_subnet"

[Link to this property](#)

"azurerm_subnet_route_table_association"

[Link to this property](#)

"azurerm_virtual_machine"

[Link to this property](#)

"azurerm_virtual_network_gateway_connection"

[Link to this property](#)

"azurerm_virtual_network"

[Link to this property](#)

"azurerm_virtual_network_gateway"

[Link to this property](#)

"google_compute_network"

[Link to this property](#)

"google_compute_subnetwork"

[Link to this property](#)

"google_compute_vpn_gateway"

[Link to this property](#)

"google_compute_vpn_tunnel"

[Link to this property](#)

"google_compute_route"

[Link to this property](#)

"google_compute_address"

[Link to this property](#)

"google_compute_global_address"

[Link to this property](#)

"google_compute_router"

[Link to this property](#)

"google_compute_interconnect_attachment"

[Link to this property](#)

"google_compute_ha_vpn_gateway"

[Link to this property](#)

"google_compute_forwarding_rule"

[Link to this property](#)

"google_compute_network_firewall_policy"

[Link to this property](#)

"google_compute_network_firewall_policy_rule"

[Link to this property](#)

"cloudflare_static_route"

[Link to this property](#)

"cloudflare_ipsec_tunnel"

[Link to this property](#)

</details>

[Link to this property](#)

title: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnListItem object { item_type, list }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

list: array of object { item_type, string } or object { item_type, resource_preview }

</summary>

One of the following:

<details>

<summary>

McnStringItem object { item_type, string }

</summary>

item_type: string

[Link to this property](#)

string: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnResourcePreviewItem object { item_type, resource_preview }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

resource_preview: object { id, cloud_type, detail, 3 more }

</summary>

id: string

formatuuid

[Link to this property](#)

<details>

<summary>

cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

[Link to this property](#)

"AZURE"

[Link to this property](#)

"GOOGLE"

[Link to this property](#)

"CLOUDFLARE"

[Link to this property](#)

</details>

[Link to this property](#)

detail: string

[Link to this property](#)

name: string

[Link to this property](#)

<details>

<summary>

resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more

</summary>

One of the following:

"aws_customer_gateway"

[Link to this property](#)

"aws_egress_only_internet_gateway"

[Link to this property](#)

"aws_internet_gateway"

[Link to this property](#)

"aws_instance"

[Link to this property](#)

"aws_network_interface"

[Link to this property](#)

"aws_route"

[Link to this property](#)

"aws_route_table"

[Link to this property](#)

"aws_route_table_association"

[Link to this property](#)

"aws_subnet"

[Link to this property](#)

"aws_vpc"

[Link to this property](#)

"aws_vpc_ipv4_cidr_block_association"

[Link to this property](#)

"aws_vpn_connection"

[Link to this property](#)

"aws_vpn_connection_route"

[Link to this property](#)

"aws_vpn_gateway"

[Link to this property](#)

"aws_security_group"

[Link to this property](#)

"aws_vpc_security_group_ingress_rule"

[Link to this property](#)

"aws_vpc_security_group_egress_rule"

[Link to this property](#)

"aws_ec2_managed_prefix_list"

[Link to this property](#)

"aws_ec2_transit_gateway"

[Link to this property](#)

"aws_ec2_transit_gateway_prefix_list_reference"

[Link to this property](#)

"aws_ec2_transit_gateway_vpc_attachment"

[Link to this property](#)

"azurerm_application_security_group"

[Link to this property](#)

"azurerm_lb"

[Link to this property](#)

"azurerm_lb_backend_address_pool"

[Link to this property](#)

"azurerm_lb_nat_pool"

[Link to this property](#)

"azurerm_lb_nat_rule"

[Link to this property](#)

"azurerm_lb_rule"

[Link to this property](#)

"azurerm_local_network_gateway"

[Link to this property](#)

"azurerm_network_interface"

[Link to this property](#)

"azurerm_network_interface_application_security_group_association"

[Link to this property](#)

"azurerm_network_interface_backend_address_pool_association"

[Link to this property](#)

"azurerm_network_interface_security_group_association"

[Link to this property](#)

"azurerm_network_security_group"

[Link to this property](#)

"azurerm_public_ip"

[Link to this property](#)

"azurerm_route"

[Link to this property](#)

"azurerm_route_table"

[Link to this property](#)

"azurerm_subnet"

[Link to this property](#)

"azurerm_subnet_route_table_association"

[Link to this property](#)

"azurerm_virtual_machine"

[Link to this property](#)

"azurerm_virtual_network_gateway_connection"

[Link to this property](#)

"azurerm_virtual_network"

[Link to this property](#)

"azurerm_virtual_network_gateway"

[Link to this property](#)

"google_compute_network"

[Link to this property](#)

"google_compute_subnetwork"

[Link to this property](#)

"google_compute_vpn_gateway"

[Link to this property](#)

"google_compute_vpn_tunnel"

[Link to this property](#)

"google_compute_route"

[Link to this property](#)

"google_compute_address"

[Link to this property](#)

"google_compute_global_address"

[Link to this property](#)

"google_compute_router"

[Link to this property](#)

"google_compute_interconnect_attachment"

[Link to this property](#)

"google_compute_ha_vpn_gateway"

[Link to this property](#)

"google_compute_forwarding_rule"

[Link to this property](#)

"google_compute_network_firewall_policy"

[Link to this property](#)

"google_compute_network_firewall_policy_rule"

[Link to this property](#)

"cloudflare_static_route"

[Link to this property](#)

"cloudflare_ipsec_tunnel"

[Link to this property](#)

</details>

[Link to this property](#)

title: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

help_text: optional string

[Link to this property](#)

</details>

[Link to this property](#)

state: map[unknown]

[Link to this property](#)

tags: map[string]

[Link to this property](#)

updated_at: string

[Link to this property](#)

url: string

[Link to this property](#)

<details>

<summary>

managed_by: optional array of object { id, client_type, name }

</summary>

id: string

formatuuid

[Link to this property](#)

client_type: "MAGIC_WAN_CLOUD_ONRAMP"

[Link to this property](#)

name: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

post_apply_resources_unavailable: optional boolean

[Link to this property](#)

region: optional string

[Link to this property](#)

<details>

<summary>

status: optional object { apply_progress, lifecycle_state, plan_progress, 3 more }

</summary>

<details>

<summary>

apply_progress: object { done, total }

</summary>

done: number

[Link to this property](#)

total: number

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

lifecycle_state: "OnrampNeedsApply" or "OnrampPendingPlan" or "OnrampPlanning" or 9 more

</summary>

One of the following:

"OnrampNeedsApply"

[Link to this property](#)

"OnrampPendingPlan"

[Link to this property](#)

"OnrampPlanning"

[Link to this property](#)

"OnrampPlanFailed"

[Link to this property](#)

"OnrampPendingApproval"

[Link to this property](#)

"OnrampPendingApply"

[Link to this property](#)

"OnrampApplying"

[Link to this property](#)

"OnrampApplyFailed"

[Link to this property](#)

"OnrampActive"

[Link to this property](#)

"OnrampPendingDestroy"

[Link to this property](#)

"OnrampDestroying"

[Link to this property](#)

"OnrampDestroyFailed"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

plan_progress: object { done, total }

</summary>

done: number

[Link to this property](#)

total: number

[Link to this property](#)

</details>

[Link to this property](#)

routes: array of string

[Link to this property](#)

tunnels: array of string

[Link to this property](#)

<details>

<summary>

lifecycle_errors: optional map[object { code, message, documentation_url, 2 more } ]

</summary>

<details>

<summary>

code: 1001 or 1002 or 1003 or 152 more

</summary>

One of the following:

1001

[Link to this property](#)

1002

[Link to this property](#)

1003

[Link to this property](#)

1004

[Link to this property](#)

1005

[Link to this property](#)

1006

[Link to this property](#)

1007

[Link to this property](#)

1008

[Link to this property](#)

1009

[Link to this property](#)

1010

[Link to this property](#)

1011

[Link to this property](#)

1012

[Link to this property](#)

1013

[Link to this property](#)

1014

[Link to this property](#)

1015

[Link to this property](#)

1016

[Link to this property](#)

1017

[Link to this property](#)

1018

[Link to this property](#)

2001

[Link to this property](#)

2002

[Link to this property](#)

2003

[Link to this property](#)

2004

[Link to this property](#)

2005

[Link to this property](#)

2006

[Link to this property](#)

2007

[Link to this property](#)

2008

[Link to this property](#)

2009

[Link to this property](#)

2010

[Link to this property](#)

2011

[Link to this property](#)

2012

[Link to this property](#)

2013

[Link to this property](#)

2014

[Link to this property](#)

2015

[Link to this property](#)

2016

[Link to this property](#)

2017

[Link to this property](#)

2018

[Link to this property](#)

2019

[Link to this property](#)

2020

[Link to this property](#)

2021

[Link to this property](#)

2022

[Link to this property](#)

3001

[Link to this property](#)

3002

[Link to this property](#)

3003

[Link to this property](#)

3004

[Link to this property](#)

3005

[Link to this property](#)

3006

[Link to this property](#)

3007

[Link to this property](#)

4001

[Link to this property](#)

4002

[Link to this property](#)

4003

[Link to this property](#)

4004

[Link to this property](#)

4005

[Link to this property](#)

4006

[Link to this property](#)

4007

[Link to this property](#)

4008

[Link to this property](#)

4009

[Link to this property](#)

4010

[Link to this property](#)

4011

[Link to this property](#)

4012

[Link to this property](#)

4013

[Link to this property](#)

4014

[Link to this property](#)

4015

[Link to this property](#)

4016

[Link to this property](#)

4017

[Link to this property](#)

4018

[Link to this property](#)

4019

[Link to this property](#)

4020

[Link to this property](#)

4021

[Link to this property](#)

4022

[Link to this property](#)

4023

[Link to this property](#)

5001

[Link to this property](#)

5002

[Link to this property](#)

5003

[Link to this property](#)

5004

[Link to this property](#)

102000

[Link to this property](#)

102001

[Link to this property](#)

102002

[Link to this property](#)

102003

[Link to this property](#)

102004

[Link to this property](#)

102005

[Link to this property](#)

102006

[Link to this property](#)

102007

[Link to this property](#)

102008

[Link to this property](#)

102009

[Link to this property](#)

102010

[Link to this property](#)

102011

[Link to this property](#)

102012

[Link to this property](#)

102013

[Link to this property](#)

102014

[Link to this property](#)

102015

[Link to this property](#)

102016

[Link to this property](#)

102017

[Link to this property](#)

102018

[Link to this property](#)

102019

[Link to this property](#)

102020

[Link to this property](#)

102021

[Link to this property](#)

102022

[Link to this property](#)

102023

[Link to this property](#)

102024

[Link to this property](#)

102025

[Link to this property](#)

102026

[Link to this property](#)

102027

[Link to this property](#)

102028

[Link to this property](#)

102029

[Link to this property](#)

102030

[Link to this property](#)

102031

[Link to this property](#)

102032

[Link to this property](#)

102033

[Link to this property](#)

102034

[Link to this property](#)

102035

[Link to this property](#)

102036

[Link to this property](#)

102037

[Link to this property](#)

102038

[Link to this property](#)

102039

[Link to this property](#)

102040

[Link to this property](#)

102041

[Link to this property](#)

102042

[Link to this property](#)

102043

[Link to this property](#)

102044

[Link to this property](#)

102045

[Link to this property](#)

102046

[Link to this property](#)

102047

[Link to this property](#)

102048

[Link to this property](#)

102049

[Link to this property](#)

102050

[Link to this property](#)

102051

[Link to this property](#)

102052

[Link to this property](#)

102053

[Link to this property](#)

102054

[Link to this property](#)

102055

[Link to this property](#)

102056

[Link to this property](#)

102057

[Link to this property](#)

102058

[Link to this property](#)

102059

[Link to this property](#)

102060

[Link to this property](#)

102061

[Link to this property](#)

102062

[Link to this property](#)

102063

[Link to this property](#)

102064

[Link to this property](#)

102065

[Link to this property](#)

102066

[Link to this property](#)

102067

[Link to this property](#)

102068

[Link to this property](#)

102069

[Link to this property](#)

102070

[Link to this property](#)

102071

[Link to this property](#)

102072

[Link to this property](#)

103001

[Link to this property](#)

103002

[Link to this property](#)

103003

[Link to this property](#)

103004

[Link to this property](#)

103005

[Link to this property](#)

103006

[Link to this property](#)

103007

[Link to this property](#)

103008

[Link to this property](#)

</details>

[Link to this property](#)

message: string

[Link to this property](#)

documentation_url: optional string

[Link to this property](#)

<details>

<summary>

meta: optional object { l10n_key, loggable_error, template_data, trace_id }

</summary>

l10n_key: optional string

[Link to this property](#)

loggable_error: optional string

[Link to this property](#)

template_data: optional unknown

[Link to this property](#)

trace_id: optional string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

source: optional object { parameter, parameter_value_index, pointer }

</summary>

parameter: optional string

[Link to this property](#)

parameter_value_index: optional number

[Link to this property](#)

pointer: optional string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

vpc: optional string

formatuuid

[Link to this property](#)

<details>

<summary>

vpcs_by_id: optional map[object { id, account_id, cloud_type, 18 more } ]

</summary>

id: string

formatuuid

[Link to this property](#)

account_id: string

[Link to this property](#)

<details>

<summary>

cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

[Link to this property](#)

"AZURE"

[Link to this property](#)

"GOOGLE"

[Link to this property](#)

"CLOUDFLARE"

[Link to this property](#)

</details>

[Link to this property](#)

config: map[unknown]

[Link to this property](#)

deployment_provider: string

formatuuid

[Link to this property](#)

managed: boolean

[Link to this property](#)

<details>

<summary>

monthly_cost_estimate: object { currency, monthly_cost }

</summary>

currency: string

[Link to this property](#)

monthly_cost: number

formatdouble

[Link to this property](#)

</details>

[Link to this property](#)

name: string

[Link to this property](#)

native_id: string

[Link to this property](#)

<details>

<summary>

observations: map[object { first_observed_at, last_observed_at, provider_id, resource_id } ]

</summary>

first_observed_at: string

[Link to this property](#)

last_observed_at: string

[Link to this property](#)

provider_id: string

formatuuid

[Link to this property](#)

resource_id: string

formatuuid

[Link to this property](#)

</details>

[Link to this property](#)

provider_ids: array of string

[Link to this property](#)

provider_names_by_id: map[string]

[Link to this property](#)

region: string

[Link to this property](#)

resource_group: string

[Link to this property](#)

<details>

<summary>

resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more

</summary>

One of the following:

"aws_customer_gateway"

[Link to this property](#)

"aws_egress_only_internet_gateway"

[Link to this property](#)

"aws_internet_gateway"

[Link to this property](#)

"aws_instance"

[Link to this property](#)

"aws_network_interface"

[Link to this property](#)

"aws_route"

[Link to this property](#)

"aws_route_table"

[Link to this property](#)

"aws_route_table_association"

[Link to this property](#)

"aws_subnet"

[Link to this property](#)

"aws_vpc"

[Link to this property](#)

"aws_vpc_ipv4_cidr_block_association"

[Link to this property](#)

"aws_vpn_connection"

[Link to this property](#)

"aws_vpn_connection_route"

[Link to this property](#)

"aws_vpn_gateway"

[Link to this property](#)

"aws_security_group"

[Link to this property](#)

"aws_vpc_security_group_ingress_rule"

[Link to this property](#)

"aws_vpc_security_group_egress_rule"

[Link to this property](#)

"aws_ec2_managed_prefix_list"

[Link to this property](#)

"aws_ec2_transit_gateway"

[Link to this property](#)

"aws_ec2_transit_gateway_prefix_list_reference"

[Link to this property](#)

"aws_ec2_transit_gateway_vpc_attachment"

[Link to this property](#)

"azurerm_application_security_group"

[Link to this property](#)

"azurerm_lb"

[Link to this property](#)

"azurerm_lb_backend_address_pool"

[Link to this property](#)

"azurerm_lb_nat_pool"

[Link to this property](#)

"azurerm_lb_nat_rule"

[Link to this property](#)

"azurerm_lb_rule"

[Link to this property](#)

"azurerm_local_network_gateway"

[Link to this property](#)

"azurerm_network_interface"

[Link to this property](#)

"azurerm_network_interface_application_security_group_association"

[Link to this property](#)

"azurerm_network_interface_backend_address_pool_association"

[Link to this property](#)

"azurerm_network_interface_security_group_association"

[Link to this property](#)

"azurerm_network_security_group"

[Link to this property](#)

"azurerm_public_ip"

[Link to this property](#)

"azurerm_route"

[Link to this property](#)

"azurerm_route_table"

[Link to this property](#)

"azurerm_subnet"

[Link to this property](#)

"azurerm_subnet_route_table_association"

[Link to this property](#)

"azurerm_virtual_machine"

[Link to this property](#)

"azurerm_virtual_network_gateway_connection"

[Link to this property](#)

"azurerm_virtual_network"

[Link to this property](#)

"azurerm_virtual_network_gateway"

[Link to this property](#)

"google_compute_network"

[Link to this property](#)

"google_compute_subnetwork"

[Link to this property](#)

"google_compute_vpn_gateway"

[Link to this property](#)

"google_compute_vpn_tunnel"

[Link to this property](#)

"google_compute_route"

[Link to this property](#)

"google_compute_address"

[Link to this property](#)

"google_compute_global_address"

[Link to this property](#)

"google_compute_router"

[Link to this property](#)

"google_compute_interconnect_attachment"

[Link to this property](#)

"google_compute_ha_vpn_gateway"

[Link to this property](#)

"google_compute_forwarding_rule"

[Link to this property](#)

"google_compute_network_firewall_policy"

[Link to this property](#)

"google_compute_network_firewall_policy_rule"

[Link to this property](#)

"cloudflare_static_route"

[Link to this property](#)

"cloudflare_ipsec_tunnel"

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

sections: array of object { hidden_items, name, visible_items, help_text }

</summary>

<details>

<summary>

hidden_items: array of object { helpText, name, value }

</summary>

helpText: optional string

[Link to this property](#)

name: optional string

[Link to this property](#)

<details>

<summary>

value: optional object { item_type, string } or object { item_type, yaml } or object { item_type, yaml_diff } or 2 more

</summary>

One of the following:

<details>

<summary>

McnStringItem object { item_type, string }

</summary>

item_type: string

[Link to this property](#)

string: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnYamlItem object { item_type, yaml }

</summary>

item_type: string

[Link to this property](#)

yaml: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnYamlDiffItem object { item_type, yaml_diff }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

yaml_diff: object { diff, left_description, left_yaml, 2 more }

</summary>

diff: string

[Link to this property](#)

left_description: string

[Link to this property](#)

left_yaml: string

[Link to this property](#)

right_description: string

[Link to this property](#)

right_yaml: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnResourcePreviewItem object { item_type, resource_preview }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

resource_preview: object { id, cloud_type, detail, 3 more }

</summary>

id: string

formatuuid

[Link to this property](#)

<details>

<summary>

cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

[Link to this property](#)

"AZURE"

[Link to this property](#)

"GOOGLE"

[Link to this property](#)

"CLOUDFLARE"

[Link to this property](#)

</details>

[Link to this property](#)

detail: string

[Link to this property](#)

name: string

[Link to this property](#)

<details>

<summary>

resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more

</summary>

One of the following:

"aws_customer_gateway"

[Link to this property](#)

"aws_egress_only_internet_gateway"

[Link to this property](#)

"aws_internet_gateway"

[Link to this property](#)

"aws_instance"

[Link to this property](#)

"aws_network_interface"

[Link to this property](#)

"aws_route"

[Link to this property](#)

"aws_route_table"

[Link to this property](#)

"aws_route_table_association"

[Link to this property](#)

"aws_subnet"

[Link to this property](#)

"aws_vpc"

[Link to this property](#)

"aws_vpc_ipv4_cidr_block_association"

[Link to this property](#)

"aws_vpn_connection"

[Link to this property](#)

"aws_vpn_connection_route"

[Link to this property](#)

"aws_vpn_gateway"

[Link to this property](#)

"aws_security_group"

[Link to this property](#)

"aws_vpc_security_group_ingress_rule"

[Link to this property](#)

"aws_vpc_security_group_egress_rule"

[Link to this property](#)

"aws_ec2_managed_prefix_list"

[Link to this property](#)

"aws_ec2_transit_gateway"

[Link to this property](#)

"aws_ec2_transit_gateway_prefix_list_reference"

[Link to this property](#)

"aws_ec2_transit_gateway_vpc_attachment"

[Link to this property](#)

"azurerm_application_security_group"

[Link to this property](#)

"azurerm_lb"

[Link to this property](#)

"azurerm_lb_backend_address_pool"

[Link to this property](#)

"azurerm_lb_nat_pool"

[Link to this property](#)

"azurerm_lb_nat_rule"

[Link to this property](#)

"azurerm_lb_rule"

[Link to this property](#)

"azurerm_local_network_gateway"

[Link to this property](#)

"azurerm_network_interface"

[Link to this property](#)

"azurerm_network_interface_application_security_group_association"

[Link to this property](#)

"azurerm_network_interface_backend_address_pool_association"

[Link to this property](#)

"azurerm_network_interface_security_group_association"

[Link to this property](#)

"azurerm_network_security_group"

[Link to this property](#)

"azurerm_public_ip"

[Link to this property](#)

"azurerm_route"

[Link to this property](#)

"azurerm_route_table"

[Link to this property](#)

"azurerm_subnet"

[Link to this property](#)

"azurerm_subnet_route_table_association"

[Link to this property](#)

"azurerm_virtual_machine"

[Link to this property](#)

"azurerm_virtual_network_gateway_connection"

[Link to this property](#)

"azurerm_virtual_network"

[Link to this property](#)

"azurerm_virtual_network_gateway"

[Link to this property](#)

"google_compute_network"

[Link to this property](#)

"google_compute_subnetwork"

[Link to this property](#)

"google_compute_vpn_gateway"

[Link to this property](#)

"google_compute_vpn_tunnel"

[Link to this property](#)

"google_compute_route"

[Link to this property](#)

"google_compute_address"

[Link to this property](#)

"google_compute_global_address"

[Link to this property](#)

"google_compute_router"

[Link to this property](#)

"google_compute_interconnect_attachment"

[Link to this property](#)

"google_compute_ha_vpn_gateway"

[Link to this property](#)

"google_compute_forwarding_rule"

[Link to this property](#)

"google_compute_network_firewall_policy"

[Link to this property](#)

"google_compute_network_firewall_policy_rule"

[Link to this property](#)

"cloudflare_static_route"

[Link to this property](#)

"cloudflare_ipsec_tunnel"

[Link to this property](#)

</details>

[Link to this property](#)

title: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnListItem object { item_type, list }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

list: array of object { item_type, string } or object { item_type, resource_preview }

</summary>

One of the following:

<details>

<summary>

McnStringItem object { item_type, string }

</summary>

item_type: string

[Link to this property](#)

string: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnResourcePreviewItem object { item_type, resource_preview }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

resource_preview: object { id, cloud_type, detail, 3 more }

</summary>

id: string

formatuuid

[Link to this property](#)

<details>

<summary>

cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

[Link to this property](#)

"AZURE"

[Link to this property](#)

"GOOGLE"

[Link to this property](#)

"CLOUDFLARE"

[Link to this property](#)

</details>

[Link to this property](#)

detail: string

[Link to this property](#)

name: string

[Link to this property](#)

<details>

<summary>

resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more

</summary>

One of the following:

"aws_customer_gateway"

[Link to this property](#)

"aws_egress_only_internet_gateway"

[Link to this property](#)

"aws_internet_gateway"

[Link to this property](#)

"aws_instance"

[Link to this property](#)

"aws_network_interface"

[Link to this property](#)

"aws_route"

[Link to this property](#)

"aws_route_table"

[Link to this property](#)

"aws_route_table_association"

[Link to this property](#)

"aws_subnet"

[Link to this property](#)

"aws_vpc"

[Link to this property](#)

"aws_vpc_ipv4_cidr_block_association"

[Link to this property](#)

"aws_vpn_connection"

[Link to this property](#)

"aws_vpn_connection_route"

[Link to this property](#)

"aws_vpn_gateway"

[Link to this property](#)

"aws_security_group"

[Link to this property](#)

"aws_vpc_security_group_ingress_rule"

[Link to this property](#)

"aws_vpc_security_group_egress_rule"

[Link to this property](#)

"aws_ec2_managed_prefix_list"

[Link to this property](#)

"aws_ec2_transit_gateway"

[Link to this property](#)

"aws_ec2_transit_gateway_prefix_list_reference"

[Link to this property](#)

"aws_ec2_transit_gateway_vpc_attachment"

[Link to this property](#)

"azurerm_application_security_group"

[Link to this property](#)

"azurerm_lb"

[Link to this property](#)

"azurerm_lb_backend_address_pool"

[Link to this property](#)

"azurerm_lb_nat_pool"

[Link to this property](#)

"azurerm_lb_nat_rule"

[Link to this property](#)

"azurerm_lb_rule"

[Link to this property](#)

"azurerm_local_network_gateway"

[Link to this property](#)

"azurerm_network_interface"

[Link to this property](#)

"azurerm_network_interface_application_security_group_association"

[Link to this property](#)

"azurerm_network_interface_backend_address_pool_association"

[Link to this property](#)

"azurerm_network_interface_security_group_association"

[Link to this property](#)

"azurerm_network_security_group"

[Link to this property](#)

"azurerm_public_ip"

[Link to this property](#)

"azurerm_route"

[Link to this property](#)

"azurerm_route_table"

[Link to this property](#)

"azurerm_subnet"

[Link to this property](#)

"azurerm_subnet_route_table_association"

[Link to this property](#)

"azurerm_virtual_machine"

[Link to this property](#)

"azurerm_virtual_network_gateway_connection"

[Link to this property](#)

"azurerm_virtual_network"

[Link to this property](#)

"azurerm_virtual_network_gateway"

[Link to this property](#)

"google_compute_network"

[Link to this property](#)

"google_compute_subnetwork"

[Link to this property](#)

"google_compute_vpn_gateway"

[Link to this property](#)

"google_compute_vpn_tunnel"

[Link to this property](#)

"google_compute_route"

[Link to this property](#)

"google_compute_address"

[Link to this property](#)

"google_compute_global_address"

[Link to this property](#)

"google_compute_router"

[Link to this property](#)

"google_compute_interconnect_attachment"

[Link to this property](#)

"google_compute_ha_vpn_gateway"

[Link to this property](#)

"google_compute_forwarding_rule"

[Link to this property](#)

"google_compute_network_firewall_policy"

[Link to this property](#)

"google_compute_network_firewall_policy_rule"

[Link to this property](#)

"cloudflare_static_route"

[Link to this property](#)

"cloudflare_ipsec_tunnel"

[Link to this property](#)

</details>

[Link to this property](#)

title: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

name: string

[Link to this property](#)

<details>

<summary>

visible_items: array of object { helpText, name, value }

</summary>

helpText: optional string

[Link to this property](#)

name: optional string

[Link to this property](#)

<details>

<summary>

value: optional object { item_type, string } or object { item_type, yaml } or object { item_type, yaml_diff } or 2 more

</summary>

One of the following:

<details>

<summary>

McnStringItem object { item_type, string }

</summary>

item_type: string

[Link to this property](#)

string: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnYamlItem object { item_type, yaml }

</summary>

item_type: string

[Link to this property](#)

yaml: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnYamlDiffItem object { item_type, yaml_diff }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

yaml_diff: object { diff, left_description, left_yaml, 2 more }

</summary>

diff: string

[Link to this property](#)

left_description: string

[Link to this property](#)

left_yaml: string

[Link to this property](#)

right_description: string

[Link to this property](#)

right_yaml: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnResourcePreviewItem object { item_type, resource_preview }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

resource_preview: object { id, cloud_type, detail, 3 more }

</summary>

id: string

formatuuid

[Link to this property](#)

<details>

<summary>

cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

[Link to this property](#)

"AZURE"

[Link to this property](#)

"GOOGLE"

[Link to this property](#)

"CLOUDFLARE"

[Link to this property](#)

</details>

[Link to this property](#)

detail: string

[Link to this property](#)

name: string

[Link to this property](#)

<details>

<summary>

resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more

</summary>

One of the following:

"aws_customer_gateway"

[Link to this property](#)

"aws_egress_only_internet_gateway"

[Link to this property](#)

"aws_internet_gateway"

[Link to this property](#)

"aws_instance"

[Link to this property](#)

"aws_network_interface"

[Link to this property](#)

"aws_route"

[Link to this property](#)

"aws_route_table"

[Link to this property](#)

"aws_route_table_association"

[Link to this property](#)

"aws_subnet"

[Link to this property](#)

"aws_vpc"

[Link to this property](#)

"aws_vpc_ipv4_cidr_block_association"

[Link to this property](#)

"aws_vpn_connection"

[Link to this property](#)

"aws_vpn_connection_route"

[Link to this property](#)

"aws_vpn_gateway"

[Link to this property](#)

"aws_security_group"

[Link to this property](#)

"aws_vpc_security_group_ingress_rule"

[Link to this property](#)

"aws_vpc_security_group_egress_rule"

[Link to this property](#)

"aws_ec2_managed_prefix_list"

[Link to this property](#)

"aws_ec2_transit_gateway"

[Link to this property](#)

"aws_ec2_transit_gateway_prefix_list_reference"

[Link to this property](#)

"aws_ec2_transit_gateway_vpc_attachment"

[Link to this property](#)

"azurerm_application_security_group"

[Link to this property](#)

"azurerm_lb"

[Link to this property](#)

"azurerm_lb_backend_address_pool"

[Link to this property](#)

"azurerm_lb_nat_pool"

[Link to this property](#)

"azurerm_lb_nat_rule"

[Link to this property](#)

"azurerm_lb_rule"

[Link to this property](#)

"azurerm_local_network_gateway"

[Link to this property](#)

"azurerm_network_interface"

[Link to this property](#)

"azurerm_network_interface_application_security_group_association"

[Link to this property](#)

"azurerm_network_interface_backend_address_pool_association"

[Link to this property](#)

"azurerm_network_interface_security_group_association"

[Link to this property](#)

"azurerm_network_security_group"

[Link to this property](#)

"azurerm_public_ip"

[Link to this property](#)

"azurerm_route"

[Link to this property](#)

"azurerm_route_table"

[Link to this property](#)

"azurerm_subnet"

[Link to this property](#)

"azurerm_subnet_route_table_association"

[Link to this property](#)

"azurerm_virtual_machine"

[Link to this property](#)

"azurerm_virtual_network_gateway_connection"

[Link to this property](#)

"azurerm_virtual_network"

[Link to this property](#)

"azurerm_virtual_network_gateway"

[Link to this property](#)

"google_compute_network"

[Link to this property](#)

"google_compute_subnetwork"

[Link to this property](#)

"google_compute_vpn_gateway"

[Link to this property](#)

"google_compute_vpn_tunnel"

[Link to this property](#)

"google_compute_route"

[Link to this property](#)

"google_compute_address"

[Link to this property](#)

"google_compute_global_address"

[Link to this property](#)

"google_compute_router"

[Link to this property](#)

"google_compute_interconnect_attachment"

[Link to this property](#)

"google_compute_ha_vpn_gateway"

[Link to this property](#)

"google_compute_forwarding_rule"

[Link to this property](#)

"google_compute_network_firewall_policy"

[Link to this property](#)

"google_compute_network_firewall_policy_rule"

[Link to this property](#)

"cloudflare_static_route"

[Link to this property](#)

"cloudflare_ipsec_tunnel"

[Link to this property](#)

</details>

[Link to this property](#)

title: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnListItem object { item_type, list }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

list: array of object { item_type, string } or object { item_type, resource_preview }

</summary>

One of the following:

<details>

<summary>

McnStringItem object { item_type, string }

</summary>

item_type: string

[Link to this property](#)

string: string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

McnResourcePreviewItem object { item_type, resource_preview }

</summary>

item_type: string

[Link to this property](#)

<details>

<summary>

resource_preview: object { id, cloud_type, detail, 3 more }

</summary>

id: string

formatuuid

[Link to this property](#)

<details>

<summary>

cloud_type: "AWS" or "AZURE" or "GOOGLE" or "CLOUDFLARE"

</summary>

One of the following:

"AWS"

[Link to this property](#)

"AZURE"

[Link to this property](#)

"GOOGLE"

[Link to this property](#)

"CLOUDFLARE"

[Link to this property](#)

</details>

[Link to this property](#)

detail: string

[Link to this property](#)

name: string

[Link to this property](#)

<details>

<summary>

resource_type: "aws_customer_gateway" or "aws_egress_only_internet_gateway" or "aws_internet_gateway" or 54 more

</summary>

One of the following:

"aws_customer_gateway"

[Link to this property](#)

"aws_egress_only_internet_gateway"

[Link to this property](#)

"aws_internet_gateway"

[Link to this property](#)

"aws_instance"

[Link to this property](#)

"aws_network_interface"

[Link to this property](#)

"aws_route"

[Link to this property](#)

"aws_route_table"

[Link to this property](#)

"aws_route_table_association"

[Link to this property](#)

"aws_subnet"

[Link to this property](#)

"aws_vpc"

[Link to this property](#)

"aws_vpc_ipv4_cidr_block_association"

[Link to this property](#)

"aws_vpn_connection"

[Link to this property](#)

"aws_vpn_connection_route"

[Link to this property](#)

"aws_vpn_gateway"

[Link to this property](#)

"aws_security_group"

[Link to this property](#)

"aws_vpc_security_group_ingress_rule"

[Link to this property](#)

"aws_vpc_security_group_egress_rule"

[Link to this property](#)

"aws_ec2_managed_prefix_list"

[Link to this property](#)

"aws_ec2_transit_gateway"

[Link to this property](#)

"aws_ec2_transit_gateway_prefix_list_reference"

[Link to this property](#)

"aws_ec2_transit_gateway_vpc_attachment"

[Link to this property](#)

"azurerm_application_security_group"

[Link to this property](#)

"azurerm_lb"

[Link to this property](#)

"azurerm_lb_backend_address_pool"

[Link to this property](#)

"azurerm_lb_nat_pool"

[Link to this property](#)

"azurerm_lb_nat_rule"

[Link to this property](#)

"azurerm_lb_rule"

[Link to this property](#)

"azurerm_local_network_gateway"

[Link to this property](#)

"azurerm_network_interface"

[Link to this property](#)

"azurerm_network_interface_application_security_group_association"

[Link to this property](#)

"azurerm_network_interface_backend_address_pool_association"

[Link to this property](#)

"azurerm_network_interface_security_group_association"

[Link to this property](#)

"azurerm_network_security_group"

[Link to this property](#)

"azurerm_public_ip"

[Link to this property](#)

"azurerm_route"

[Link to this property](#)

"azurerm_route_table"

[Link to this property](#)

"azurerm_subnet"

[Link to this property](#)

"azurerm_subnet_route_table_association"

[Link to this property](#)

"azurerm_virtual_machine"

[Link to this property](#)

"azurerm_virtual_network_gateway_connection"

[Link to this property](#)

"azurerm_virtual_network"

[Link to this property](#)

"azurerm_virtual_network_gateway"

[Link to this property](#)

"google_compute_network"

[Link to this property](#)

"google_compute_subnetwork"

[Link to this property](#)

"google_compute_vpn_gateway"

[Link to this property](#)

"google_compute_vpn_tunnel"

[Link to this property](#)

"google_compute_route"

[Link to this property](#)

"google_compute_address"

[Link to this property](#)

"google_compute_global_address"

[Link to this property](#)

"google_compute_router"

[Link to this property](#)

"google_compute_interconnect_attachment"

[Link to this property](#)

"google_compute_ha_vpn_gateway"

[Link to this property](#)

"google_compute_forwarding_rule"

[Link to this property](#)

"google_compute_network_firewall_policy"

[Link to this property](#)

"google_compute_network_firewall_policy_rule"

[Link to this property](#)

"cloudflare_static_route"

[Link to this property](#)

"cloudflare_ipsec_tunnel"

[Link to this property](#)

</details>

[Link to this property](#)

title: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

help_text: optional string

[Link to this property](#)

</details>

[Link to this property](#)

state: map[unknown]

[Link to this property](#)

tags: map[string]

[Link to this property](#)

updated_at: string

[Link to this property](#)

url: string

[Link to this property](#)

<details>

<summary>

managed_by: optional array of object { id, client_type, name }

</summary>

id: string

formatuuid

[Link to this property](#)

client_type: "MAGIC_WAN_CLOUD_ONRAMP"

[Link to this property](#)

name: string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

vpcs_by_id_unavailable: optional array of string

The list of vpc IDs for which resource details failed to generate.

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

OnRampDeleteResponse object { id }

</summary>

id: string

formatuuid

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

OnRampApplyResponse object { errors, messages, success }

</summary>

<details>

<summary>

errors: array of object { code, message, documentation_url, 2 more }

maxLength0

</summary>

<details>

<summary>

code: 1001 or 1002 or 1003 or 152 more

</summary>

One of the following:

1001

[Link to this property](#)

1002

[Link to this property](#)

1003

[Link to this property](#)

1004

[Link to this property](#)

1005

[Link to this property](#)

1006

[Link to this property](#)

1007

[Link to this property](#)

1008

[Link to this property](#)

1009

[Link to this property](#)

1010

[Link to this property](#)

1011

[Link to this property](#)

1012

[Link to this property](#)

1013

[Link to this property](#)

1014

[Link to this property](#)

1015

[Link to this property](#)

1016

[Link to this property](#)

1017

[Link to this property](#)

1018

[Link to this property](#)

2001

[Link to this property](#)

2002

[Link to this property](#)

2003

[Link to this property](#)

2004

[Link to this property](#)

2005

[Link to this property](#)

2006

[Link to this property](#)

2007

[Link to this property](#)

2008

[Link to this property](#)

2009

[Link to this property](#)

2010

[Link to this property](#)

2011

[Link to this property](#)

2012

[Link to this property](#)

2013

[Link to this property](#)

2014

[Link to this property](#)

2015

[Link to this property](#)

2016

[Link to this property](#)

2017

[Link to this property](#)

2018

[Link to this property](#)

2019

[Link to this property](#)

2020

[Link to this property](#)

2021

[Link to this property](#)

2022

[Link to this property](#)

3001

[Link to this property](#)

3002

[Link to this property](#)

3003

[Link to this property](#)

3004

[Link to this property](#)

3005

[Link to this property](#)

3006

[Link to this property](#)

3007

[Link to this property](#)

4001

[Link to this property](#)

4002

[Link to this property](#)

4003

[Link to this property](#)

4004

[Link to this property](#)

4005

[Link to this property](#)

4006

[Link to this property](#)

4007

[Link to this property](#)

4008

[Link to this property](#)

4009

[Link to this property](#)

4010

[Link to this property](#)

4011

[Link to this property](#)

4012

[Link to this property](#)

4013

[Link to this property](#)

4014

[Link to this property](#)

4015

[Link to this property](#)

4016

[Link to this property](#)

4017

[Link to this property](#)

4018

[Link to this property](#)

4019

[Link to this property](#)

4020

[Link to this property](#)

4021

[Link to this property](#)

4022

[Link to this property](#)

4023

[Link to this property](#)

5001

[Link to this property](#)

5002

[Link to this property](#)

5003

[Link to this property](#)

5004

[Link to this property](#)

102000

[Link to this property](#)

102001

[Link to this property](#)

102002

[Link to this property](#)

102003

[Link to this property](#)

102004

[Link to this property](#)

102005

[Link to this property](#)

102006

[Link to this property](#)

102007

[Link to this property](#)

102008

[Link to this property](#)

102009

[Link to this property](#)

102010

[Link to this property](#)

102011

[Link to this property](#)

102012

[Link to this property](#)

102013

[Link to this property](#)

102014

[Link to this property](#)

102015

[Link to this property](#)

102016

[Link to this property](#)

102017

[Link to this property](#)

102018

[Link to this property](#)

102019

[Link to this property](#)

102020

[Link to this property](#)

102021

[Link to this property](#)

102022

[Link to this property](#)

102023

[Link to this property](#)

102024

[Link to this property](#)

102025

[Link to this property](#)

102026

[Link to this property](#)

102027

[Link to this property](#)

102028

[Link to this property](#)

102029

[Link to this property](#)

102030

[Link to this property](#)

102031

[Link to this property](#)

102032

[Link to this property](#)

102033

[Link to this property](#)

102034

[Link to this property](#)

102035

[Link to this property](#)

102036

[Link to this property](#)

102037

[Link to this property](#)

102038

[Link to this property](#)

102039

[Link to this property](#)

102040

[Link to this property](#)

102041

[Link to this property](#)

102042

[Link to this property](#)

102043

[Link to this property](#)

102044

[Link to this property](#)

102045

[Link to this property](#)

102046

[Link to this property](#)

102047

[Link to this property](#)

102048

[Link to this property](#)

102049

[Link to this property](#)

102050

[Link to this property](#)

102051

[Link to this property](#)

102052

[Link to this property](#)

102053

[Link to this property](#)

102054

[Link to this property](#)

102055

[Link to this property](#)

102056

[Link to this property](#)

102057

[Link to this property](#)

102058

[Link to this property](#)

102059

[Link to this property](#)

102060

[Link to this property](#)

102061

[Link to this property](#)

102062

[Link to this property](#)

102063

[Link to this property](#)

102064

[Link to this property](#)

102065

[Link to this property](#)

102066

[Link to this property](#)

102067

[Link to this property](#)

102068

[Link to this property](#)

102069

[Link to this property](#)

102070

[Link to this property](#)

102071

[Link to this property](#)

102072

[Link to this property](#)

103001

[Link to this property](#)

103002

[Link to this property](#)

103003

[Link to this property](#)

103004

[Link to this property](#)

103005

[Link to this property](#)

103006

[Link to this property](#)

103007

[Link to this property](#)

103008

[Link to this property](#)

</details>

[Link to this property](#)

message: string

[Link to this property](#)

documentation_url: optional string

[Link to this property](#)

<details>

<summary>

meta: optional object { l10n_key, loggable_error, template_data, trace_id }

</summary>

l10n_key: optional string

[Link to this property](#)

loggable_error: optional string

[Link to this property](#)

template_data: optional unknown

[Link to this property](#)

trace_id: optional string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

source: optional object { parameter, parameter_value_index, pointer }

</summary>

parameter: optional string

[Link to this property](#)

parameter_value_index: optional number

[Link to this property](#)

pointer: optional string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

messages: array of object { code, message, documentation_url, 2 more }

</summary>

<details>

<summary>

code: 1001 or 1002 or 1003 or 152 more

</summary>

One of the following:

1001

[Link to this property](#)

1002

[Link to this property](#)

1003

[Link to this property](#)

1004

[Link to this property](#)

1005

[Link to this property](#)

1006

[Link to this property](#)

1007

[Link to this property](#)

1008

[Link to this property](#)

1009

[Link to this property](#)

1010

[Link to this property](#)

1011

[Link to this property](#)

1012

[Link to this property](#)

1013

[Link to this property](#)

1014

[Link to this property](#)

1015

[Link to this property](#)

1016

[Link to this property](#)

1017

[Link to this property](#)

1018

[Link to this property](#)

2001

[Link to this property](#)

2002

[Link to this property](#)

2003

[Link to this property](#)

2004

[Link to this property](#)

2005

[Link to this property](#)

2006

[Link to this property](#)

2007

[Link to this property](#)

2008

[Link to this property](#)

2009

[Link to this property](#)

2010

[Link to this property](#)

2011

[Link to this property](#)

2012

[Link to this property](#)

2013

[Link to this property](#)

2014

[Link to this property](#)

2015

[Link to this property](#)

2016

[Link to this property](#)

2017

[Link to this property](#)

2018

[Link to this property](#)

2019

[Link to this property](#)

2020

[Link to this property](#)

2021

[Link to this property](#)

2022

[Link to this property](#)

3001

[Link to this property](#)

3002

[Link to this property](#)

3003

[Link to this property](#)

3004

[Link to this property](#)

3005

[Link to this property](#)

3006

[Link to this property](#)

3007

[Link to this property](#)

4001

[Link to this property](#)

4002

[Link to this property](#)

4003

[Link to this property](#)

4004

[Link to this property](#)

4005

[Link to this property](#)

4006

[Link to this property](#)

4007

[Link to this property](#)

4008

[Link to this property](#)

4009

[Link to this property](#)

4010

[Link to this property](#)

4011

[Link to this property](#)

4012

[Link to this property](#)

4013

[Link to this property](#)

4014

[Link to this property](#)

4015

[Link to this property](#)

4016

[Link to this property](#)

4017

[Link to this property](#)

4018

[Link to this property](#)

4019

[Link to this property](#)

4020

[Link to this property](#)

4021

[Link to this property](#)

4022

[Link to this property](#)

4023

[Link to this property](#)

5001

[Link to this property](#)

5002

[Link to this property](#)

5003

[Link to this property](#)

5004

[Link to this property](#)

102000

[Link to this property](#)

102001

[Link to this property](#)

102002

[Link to this property](#)

102003

[Link to this property](#)

102004

[Link to this property](#)

102005

[Link to this property](#)

102006

[Link to this property](#)

102007

[Link to this property](#)

102008

[Link to this property](#)

102009

[Link to this property](#)

102010

[Link to this property](#)

102011

[Link to this property](#)

102012

[Link to this property](#)

102013

[Link to this property](#)

102014

[Link to this property](#)

102015

[Link to this property](#)

102016

[Link to this property](#)

102017

[Link to this property](#)

102018

[Link to this property](#)

102019

[Link to this property](#)

102020

[Link to this property](#)

102021

[Link to this property](#)

102022

[Link to this property](#)

102023

[Link to this property](#)

102024

[Link to this property](#)

102025

[Link to this property](#)

102026

[Link to this property](#)

102027

[Link to this property](#)

102028

[Link to this property](#)

102029

[Link to this property](#)

102030

[Link to this property](#)

102031

[Link to this property](#)

102032

[Link to this property](#)

102033

[Link to this property](#)

102034

[Link to this property](#)

102035

[Link to this property](#)

102036

[Link to this property](#)

102037

[Link to this property](#)

102038

[Link to this property](#)

102039

[Link to this property](#)

102040

[Link to this property](#)

102041

[Link to this property](#)

102042

[Link to this property](#)

102043

[Link to this property](#)

102044

[Link to this property](#)

102045

[Link to this property](#)

102046

[Link to this property](#)

102047

[Link to this property](#)

102048

[Link to this property](#)

102049

[Link to this property](#)

102050

[Link to this property](#)

102051

[Link to this property](#)

102052

[Link to this property](#)

102053

[Link to this property](#)

102054

[Link to this property](#)

102055

[Link to this property](#)

102056

[Link to this property](#)

102057

[Link to this property](#)

102058

[Link to this property](#)

102059

[Link to this property](#)

102060

[Link to this property](#)

102061

[Link to this property](#)

102062

[Link to this property](#)

102063

[Link to this property](#)

102064

[Link to this property](#)

102065

[Link to this property](#)

102066

[Link to this property](#)

102067

[Link to this property](#)

102068

[Link to this property](#)

102069

[Link to this property](#)

102070

[Link to this property](#)

102071

[Link to this property](#)

102072

[Link to this property](#)

103001

[Link to this property](#)

103002

[Link to this property](#)

103003

[Link to this property](#)

103004

[Link to this property](#)

103005

[Link to this property](#)

103006

[Link to this property](#)

103007

[Link to this property](#)

103008

[Link to this property](#)

</details>

[Link to this property](#)

message: string

[Link to this property](#)

documentation_url: optional string

[Link to this property](#)

<details>

<summary>

meta: optional object { l10n_key, loggable_error, template_data, trace_id }

</summary>

l10n_key: optional string

[Link to this property](#)

loggable_error: optional string

[Link to this property](#)

template_data: optional unknown

[Link to this property](#)

trace_id: optional string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

source: optional object { parameter, parameter_value_index, pointer }

</summary>

parameter: optional string

[Link to this property](#)

parameter_value_index: optional number

[Link to this property](#)

pointer: optional string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

success: boolean

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

OnRampPlanResponse object { errors, messages, success }

</summary>

<details>

<summary>

errors: array of object { code, message, documentation_url, 2 more }

maxLength0

</summary>

<details>

<summary>

code: 1001 or 1002 or 1003 or 152 more

</summary>

One of the following:

1001

[Link to this property](#)

1002

[Link to this property](#)

1003

[Link to this property](#)

1004

[Link to this property](#)

1005

[Link to this property](#)

1006

[Link to this property](#)

1007

[Link to this property](#)

1008

[Link to this property](#)

1009

[Link to this property](#)

1010

[Link to this property](#)

1011

[Link to this property](#)

1012

[Link to this property](#)

1013

[Link to this property](#)

1014

[Link to this property](#)

1015

[Link to this property](#)

1016

[Link to this property](#)

1017

[Link to this property](#)

1018

[Link to this property](#)

2001

[Link to this property](#)

2002

[Link to this property](#)

2003

[Link to this property](#)

2004

[Link to this property](#)

2005

[Link to this property](#)

2006

[Link to this property](#)

2007

[Link to this property](#)

2008

[Link to this property](#)

2009

[Link to this property](#)

2010

[Link to this property](#)

2011

[Link to this property](#)

2012

[Link to this property](#)

2013

[Link to this property](#)

2014

[Link to this property](#)

2015

[Link to this property](#)

2016

[Link to this property](#)

2017

[Link to this property](#)

2018

[Link to this property](#)

2019

[Link to this property](#)

2020

[Link to this property](#)

2021

[Link to this property](#)

2022

[Link to this property](#)

3001

[Link to this property](#)

3002

[Link to this property](#)

3003

[Link to this property](#)

3004

[Link to this property](#)

3005

[Link to this property](#)

3006

[Link to this property](#)

3007

[Link to this property](#)

4001

[Link to this property](#)

4002

[Link to this property](#)

4003

[Link to this property](#)

4004

[Link to this property](#)

4005

[Link to this property](#)

4006

[Link to this property](#)

4007

[Link to this property](#)

4008

[Link to this property](#)

4009

[Link to this property](#)

4010

[Link to this property](#)

4011

[Link to this property](#)

4012

[Link to this property](#)

4013

[Link to this property](#)

4014

[Link to this property](#)

4015

[Link to this property](#)

4016

[Link to this property](#)

4017

[Link to this property](#)

4018

[Link to this property](#)

4019

[Link to this property](#)

4020

[Link to this property](#)

4021

[Link to this property](#)

4022

[Link to this property](#)

4023

[Link to this property](#)

5001

[Link to this property](#)

5002

[Link to this property](#)

5003

[Link to this property](#)

5004

[Link to this property](#)

102000

[Link to this property](#)

102001

[Link to this property](#)

102002

[Link to this property](#)

102003

[Link to this property](#)

102004

[Link to this property](#)

102005

[Link to this property](#)

102006

[Link to this property](#)

102007

[Link to this property](#)

102008

[Link to this property](#)

102009

[Link to this property](#)

102010

[Link to this property](#)

102011

[Link to this property](#)

102012

[Link to this property](#)

102013

[Link to this property](#)

102014

[Link to this property](#)

102015

[Link to this property](#)

102016

[Link to this property](#)

102017

[Link to this property](#)

102018

[Link to this property](#)

102019

[Link to this property](#)

102020

[Link to this property](#)

102021

[Link to this property](#)

102022

[Link to this property](#)

102023

[Link to this property](#)

102024

[Link to this property](#)

102025

[Link to this property](#)

102026

[Link to this property](#)

102027

[Link to this property](#)

102028

[Link to this property](#)

102029

[Link to this property](#)

102030

[Link to this property](#)

102031

[Link to this property](#)

102032

[Link to this property](#)

102033

[Link to this property](#)

102034

[Link to this property](#)

102035

[Link to this property](#)

102036

[Link to this property](#)

102037

[Link to this property](#)

102038

[Link to this property](#)

102039

[Link to this property](#)

102040

[Link to this property](#)

102041

[Link to this property](#)

102042

[Link to this property](#)

102043

[Link to this property](#)

102044

[Link to this property](#)

102045

[Link to this property](#)

102046

[Link to this property](#)

102047

[Link to this property](#)

102048

[Link to this property](#)

102049

[Link to this property](#)

102050

[Link to this property](#)

102051

[Link to this property](#)

102052

[Link to this property](#)

102053

[Link to this property](#)

102054

[Link to this property](#)

102055

[Link to this property](#)

102056

[Link to this property](#)

102057

[Link to this property](#)

102058

[Link to this property](#)

102059

[Link to this property](#)

102060

[Link to this property](#)

102061

[Link to this property](#)

102062

[Link to this property](#)

102063

[Link to this property](#)

102064

[Link to this property](#)

102065

[Link to this property](#)

102066

[Link to this property](#)

102067

[Link to this property](#)

102068

[Link to this property](#)

102069

[Link to this property](#)

102070

[Link to this property](#)

102071

[Link to this property](#)

102072

[Link to this property](#)

103001

[Link to this property](#)

103002

[Link to this property](#)

103003

[Link to this property](#)

103004

[Link to this property](#)

103005

[Link to this property](#)

103006

[Link to this property](#)

103007

[Link to this property](#)

103008

[Link to this property](#)

</details>

[Link to this property](#)

message: string

[Link to this property](#)

documentation_url: optional string

[Link to this property](#)

<details>

<summary>

meta: optional object { l10n_key, loggable_error, template_data, trace_id }

</summary>

l10n_key: optional string

[Link to this property](#)

loggable_error: optional string

[Link to this property](#)

template_data: optional unknown

[Link to this property](#)

trace_id: optional string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

source: optional object { parameter, parameter_value_index, pointer }

</summary>

parameter: optional string

[Link to this property](#)

parameter_value_index: optional number

[Link to this property](#)

pointer: optional string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

messages: array of object { code, message, documentation_url, 2 more }

</summary>

<details>

<summary>

code: 1001 or 1002 or 1003 or 152 more

</summary>

One of the following:

1001

[Link to this property](#)

1002

[Link to this property](#)

1003

[Link to this property](#)

1004

[Link to this property](#)

1005

[Link to this property](#)

1006

[Link to this property](#)

1007

[Link to this property](#)

1008

[Link to this property](#)

1009

[Link to this property](#)

1010

[Link to this property](#)

1011

[Link to this property](#)

1012

[Link to this property](#)

1013

[Link to this property](#)

1014

[Link to this property](#)

1015

[Link to this property](#)

1016

[Link to this property](#)

1017

[Link to this property](#)

1018

[Link to this property](#)

2001

[Link to this property](#)

2002

[Link to this property](#)

2003

[Link to this property](#)

2004

[Link to this property](#)

2005

[Link to this property](#)

2006

[Link to this property](#)

2007

[Link to this property](#)

2008

[Link to this property](#)

2009

[Link to this property](#)

2010

[Link to this property](#)

2011

[Link to this property](#)

2012

[Link to this property](#)

2013

[Link to this property](#)

2014

[Link to this property](#)

2015

[Link to this property](#)

2016

[Link to this property](#)

2017

[Link to this property](#)

2018

[Link to this property](#)

2019

[Link to this property](#)

2020

[Link to this property](#)

2021

[Link to this property](#)

2022

[Link to this property](#)

3001

[Link to this property](#)

3002

[Link to this property](#)

3003

[Link to this property](#)

3004

[Link to this property](#)

3005

[Link to this property](#)

3006

[Link to this property](#)

3007

[Link to this property](#)

4001

[Link to this property](#)

4002

[Link to this property](#)

4003

[Link to this property](#)

4004

[Link to this property](#)

4005

[Link to this property](#)

4006

[Link to this property](#)

4007

[Link to this property](#)

4008

[Link to this property](#)

4009

[Link to this property](#)

4010

[Link to this property](#)

4011

[Link to this property](#)

4012

[Link to this property](#)

4013

[Link to this property](#)

4014

[Link to this property](#)

4015

[Link to this property](#)

4016

[Link to this property](#)

4017

[Link to this property](#)

4018

[Link to this property](#)

4019

[Link to this property](#)

4020

[Link to this property](#)

4021

[Link to this property](#)

4022

[Link to this property](#)

4023

[Link to this property](#)

5001

[Link to this property](#)

5002

[Link to this property](#)

5003

[Link to this property](#)

5004

[Link to this property](#)

102000

[Link to this property](#)

102001

[Link to this property](#)

102002

[Link to this property](#)

102003

[Link to this property](#)

102004

[Link to this property](#)

102005

[Link to this property](#)

102006

[Link to this property](#)

102007

[Link to this property](#)

102008

[Link to this property](#)

102009

[Link to this property](#)

102010

[Link to this property](#)

102011

[Link to this property](#)

102012

[Link to this property](#)

102013

[Link to this property](#)

102014

[Link to this property](#)

102015

[Link to this property](#)

102016

[Link to this property](#)

102017

[Link to this property](#)

102018

[Link to this property](#)

102019

[Link to this property](#)

102020

[Link to this property](#)

102021

[Link to this property](#)

102022

[Link to this property](#)

102023

[Link to this property](#)

102024

[Link to this property](#)

102025

[Link to this property](#)

102026

[Link to this property](#)

102027

[Link to this property](#)

102028

[Link to this property](#)

102029

[Link to this property](#)

102030

[Link to this property](#)

102031

[Link to this property](#)

102032

[Link to this property](#)

102033

[Link to this property](#)

102034

[Link to this property](#)

102035

[Link to this property](#)

102036

[Link to this property](#)

102037

[Link to this property](#)

102038

[Link to this property](#)

102039

[Link to this property](#)

102040

[Link to this property](#)

102041

[Link to this property](#)

102042

[Link to this property](#)

102043

[Link to this property](#)

102044

[Link to this property](#)

102045

[Link to this property](#)

102046

[Link to this property](#)

102047

[Link to this property](#)

102048

[Link to this property](#)

102049

[Link to this property](#)

102050

[Link to this property](#)

102051

[Link to this property](#)

102052

[Link to this property](#)

102053

[Link to this property](#)

102054

[Link to this property](#)

102055

[Link to this property](#)

102056

[Link to this property](#)

102057

[Link to this property](#)

102058

[Link to this property](#)

102059

[Link to this property](#)

102060

[Link to this property](#)

102061

[Link to this property](#)

102062

[Link to this property](#)

102063

[Link to this property](#)

102064

[Link to this property](#)

102065

[Link to this property](#)

102066

[Link to this property](#)

102067

[Link to this property](#)

102068

[Link to this property](#)

102069

[Link to this property](#)

102070

[Link to this property](#)

102071

[Link to this property](#)

102072

[Link to this property](#)

103001

[Link to this property](#)

103002

[Link to this property](#)

103003

[Link to this property](#)

103004

[Link to this property](#)

103005

[Link to this property](#)

103006

[Link to this property](#)

103007

[Link to this property](#)

103008

[Link to this property](#)

</details>

[Link to this property](#)

message: string

[Link to this property](#)

documentation_url: optional string

[Link to this property](#)

<details>

<summary>

meta: optional object { l10n_key, loggable_error, template_data, trace_id }

</summary>

l10n_key: optional string

[Link to this property](#)

loggable_error: optional string

[Link to this property](#)

template_data: optional unknown

[Link to this property](#)

trace_id: optional string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

source: optional object { parameter, parameter_value_index, pointer }

</summary>

parameter: optional string

[Link to this property](#)

parameter_value_index: optional number

[Link to this property](#)

pointer: optional string

[Link to this property](#)

</details>

[Link to this property](#)

</details>

[Link to this property](#)

success: boolean

[Link to this property](#)

</details>

[Link to this property](#)

##### [Read Magic WAN Address Space](/api/resources/magic_cloud_networking/subresources/on_ramps/subresources/address_spaces/methods/list)

GET/accounts/{account_id}/magic/cloud/onramps/magic_wan_address_space

##### [Update Magic WAN Address Space](/api/resources/magic_cloud_networking/subresources/on_ramps/subresources/address_spaces/methods/update)

PUT/accounts/{account_id}/magic/cloud/onramps/magic_wan_address_space

##### [Patch Magic WAN Address Space](/api/resources/magic_cloud_networking/subresources/on_ramps/subresources/address_spaces/methods/edit)

PATCH/accounts/{account_id}/magic/cloud/onramps/magic_wan_address_space

##### Models

<details>

<summary>

AddressSpaceListResponse object { prefixes }

</summary>

prefixes: array of string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AddressSpaceUpdateResponse object { prefixes }

</summary>

prefixes: array of string

[Link to this property](#)

</details>

[Link to this property](#)

<details>

<summary>

AddressSpaceEditResponse object { prefixes }

</summary>

prefixes: array of string

[Link to this property](#)

</details>

[Link to this property](#)
