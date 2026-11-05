import type { PropertyFormat } from "../src/property-string.ts";

// The schema names `pve-qm-ipconfig` but has no sub-schema for it. This hand-written structure
// lists its four keys and their types, so the generated codec handles the format like an inline
// one. The server still validates IP syntax and gateway dependencies.
// Reference: https://git.proxmox.com/?p=qemu-server.git;a=blob;f=src/PVE/QemuServer/Network.pm;hb=71ea0ac7192bb935f63cb64beb59e87d6cecd3bf
export const namedPropertyFormats: Record<string, PropertyFormat | undefined> = {
  "pve-qm-ipconfig": {
    ip: { type: "string", optional: 1 },
    gw: { type: "string", optional: 1 },
    ip6: { type: "string", optional: 1 },
    gw6: { type: "string", optional: 1 },
  },
};
