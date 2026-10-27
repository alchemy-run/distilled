import { describe, expect, it } from "vitest";
import { nodes_lxc, nodes_qemu } from "../src/property-strings.ts";
const lxc = nodes_lxc.PutNodesByNodeLxcByVmidConfigRequest;
const qemu = nodes_qemu.PutNodesByNodeQemuByVmidConfigRequest;

describe("generated property strings", () => {
  it("decodes booleans and optional network fields", () => {
    expect(lxc["net[n]"].decode("name=eth0,bridge=vmbr0,ip=dhcp,firewall=1")).toEqual({
      name: "eth0",
      bridge: "vmbr0",
      ip: "dhcp",
      firewall: true,
    });
    expect(lxc["net[n]"].encode({ name: "eth0", firewall: false })).toBe("firewall=0,name=eth0");
  });
  it("decodes unnamed disk volumes and numeric VM memory", () => {
    expect(lxc.rootfs.decode("example:subvol-4242-disk-0,size=8G")).toEqual({
      volume: "example:subvol-4242-disk-0",
      size: "8G",
    });
    expect(qemu.memory.decode("8192")).toEqual({ current: 8192 });
    expect(qemu.memory.encode({ current: 8192 })).toBe("8192");
  });
  it("normalizes aliases including network model key aliases", () => {
    expect(qemu["scsi[n]"].decode("volume=example:disk,bps_rd_length=2")).toEqual({
      file: "example:disk",
      bps_rd_max_length: 2,
    });
    expect(qemu["net[n]"].decode("virtio=AA:BB:CC:DD:EE:FF,firewall=1")).toEqual({
      model: "virtio",
      macaddr: "AA:BB:CC:DD:EE:FF",
      firewall: true,
    });
    expect(qemu.agent.decode("1,freeze-fs-on-backup=0")).toEqual({
      enabled: true,
      "freeze-fs": false,
    });
  });
  it("round-trips the supplemented named IP configuration schema", () => {
    const config = { ip: "192.0.2.10/24", gw: "192.0.2.1", ip6: "auto" };
    expect(qemu["ipconfig[n]"].decode(qemu["ipconfig[n]"].encode(config))).toEqual(config);
    expect(qemu["ipconfig[n]"].decode("")).toEqual({});
  });
  it("round-trips passthrough paths and mount points", () => {
    const dev = { path: "/dev/net/tun", uid: 1000 };
    expect(lxc["dev[n]"].decode(lxc["dev[n]"].encode(dev))).toEqual(dev);
    const mp = { volume: "example:disk", mp: "/data", backup: true };
    expect(lxc["mp[n]"].decode(lxc["mp[n]"].encode(mp))).toEqual(mp);
  });
  it("rejects malformed scalars, duplicate aliases and ambiguous delimiters", () => {
    expect(() => qemu.memory.decode("NaN")).toThrow("expected finite number");
    expect(() => lxc["net[n]"].decode("name=eth0,firewall=maybe")).toThrow("expected boolean");
    expect(() => qemu["scsi[n]"].decode("example:disk,volume=example:other")).toThrow(
      "duplicate key",
    );
    expect(() => lxc["net[n]"].encode({ name: "eth0,ip=dhcp" })).toThrow("ambiguous delimiter");
  });
});
