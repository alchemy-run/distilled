---
title: Latest
---

[Skip to content](#_top)

[API Reference](https://developers.cloudflare.com/api)

[Magic Transit](https://developers.cloudflare.com/api/resources/magic_transit)

[Connectors](https://developers.cloudflare.com/api/resources/magic_transit/subresources/connectors)

[Snapshots](https://developers.cloudflare.com/api/resources/magic_transit/subresources/connectors/subresources/snapshots)

Copy Markdown

Open in **Claude**Open in **ChatGPT**Open in **Cursor**

---

**Copy Markdown****View as Markdown**

# Latest

##### [Get latest Snapshots](https://developers.cloudflare.com/api/resources/magic_transit/subresources/connectors/subresources/snapshots/subresources/latest/methods/list)

GET/accounts/{account\_id}/magic/connectors/{connector\_id}/telemetry/snapshots/latest

##### ModelsExpand Collapse

<details>

<summary>

LatestListResponse object {count, items }

</summary>

count: number

<a href="#">Link to this property</a>

<details>

<summary>

items: array of object {count\_reclaim\_failures, count\_reclaimed\_paths, count\_record\_failed, 172 more }

</summary>

count\_reclaim\_failures: number

Count of failures to reclaim space

<a href="#">Link to this property</a>

count\_reclaimed\_paths: number

Count of reclaimed paths

<a href="#">Link to this property</a>

count\_record\_failed: number

Count of failed snapshot recordings

<a href="#">Link to this property</a>

count\_transmit\_failures: number

Count of failed snapshot transmissions

<a href="#">Link to this property</a>

t: number

Time the Snapshot was recorded (seconds since the Unix epoch)

<a href="#">Link to this property</a>

v: string

Version

<a href="#">Link to this property</a>

<details>

<summary>

bonds: optional array of object {name, status }

</summary>

name: string

Name of the network interface

<a href="#">Link to this property</a>

status: string

Current status of the network interface

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

cpu\_count: optional number

Count of processors/cores

<a href="#">Link to this property</a>

cpu\_pressure\_10s: optional number

Percentage of time over a 10 second window that tasks were stalled

<a href="#">Link to this property</a>

cpu\_pressure\_300s: optional number

Percentage of time over a 5 minute window that tasks were stalled

<a href="#">Link to this property</a>

cpu\_pressure\_60s: optional number

Percentage of time over a 1 minute window that tasks were stalled

<a href="#">Link to this property</a>

cpu\_pressure\_total\_us: optional number

Total stall time (microseconds)

<a href="#">Link to this property</a>

cpu\_time\_guest\_ms: optional number

Time spent running a virtual CPU or guest OS (milliseconds)

<a href="#">Link to this property</a>

cpu\_time\_guest\_nice\_ms: optional number

Time spent running a niced guest (milliseconds)

<a href="#">Link to this property</a>

cpu\_time\_idle\_ms: optional number

Time spent in idle state (milliseconds)

<a href="#">Link to this property</a>

cpu\_time\_iowait\_ms: optional number

Time spent wait for I/O to complete (milliseconds)

<a href="#">Link to this property</a>

cpu\_time\_irq\_ms: optional number

Time spent servicing interrupts (milliseconds)

<a href="#">Link to this property</a>

cpu\_time\_nice\_ms: optional number

Time spent in low-priority user mode (milliseconds)

<a href="#">Link to this property</a>

cpu\_time\_softirq\_ms: optional number

Time spent servicing softirqs (milliseconds)

<a href="#">Link to this property</a>

cpu\_time\_steal\_ms: optional number

Time stolen (milliseconds)

<a href="#">Link to this property</a>

cpu\_time\_system\_ms: optional number

Time spent in system mode (milliseconds)

<a href="#">Link to this property</a>

cpu\_time\_user\_ms: optional number

Time spent in user mode (milliseconds)

<a href="#">Link to this property</a>

delta: optional number

Number of network operations applied during state transition

<a href="#">Link to this property</a>

<details>

<summary>

dhcp\_leases: optional array of object {client\_id, expiry\_time, hostname, 3 more }

</summary>

client\_id: string

Client ID of the device the IP Address was leased to

<a href="#">Link to this property</a>

expiry\_time: number

Expiry time of the DHCP lease (seconds since the Unix epoch)

<a href="#">Link to this property</a>

hostname: string

Hostname of the device the IP Address was leased to

<a href="#">Link to this property</a>

interface\_name: string

Name of the network interface

<a href="#">Link to this property</a>

ip\_address: string

IP Address that was leased

<a href="#">Link to this property</a>

mac\_address: string

MAC Address of the device the IP Address was leased to

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

disks: optional array of object {in\_progress, major, merged, 17 more }

</summary>

in\_progress: number

I/Os currently in progress

<a href="#">Link to this property</a>

major: number

Device major number

<a href="#">Link to this property</a>

merged: number

Reads merged

<a href="#">Link to this property</a>

minor: number

Device minor number

<a href="#">Link to this property</a>

name: string

Device name

<a href="#">Link to this property</a>

reads: number

Reads completed successfully

<a href="#">Link to this property</a>

sectors\_read: number

Sectors read successfully

<a href="#">Link to this property</a>

sectors\_written: number

Sectors written successfully

<a href="#">Link to this property</a>

time\_in\_progress\_ms: number

Time spent doing I/Os (milliseconds)

<a href="#">Link to this property</a>

time\_reading\_ms: number

Time spent reading (milliseconds)

<a href="#">Link to this property</a>

time\_writing\_ms: number

Time spent writing (milliseconds)

<a href="#">Link to this property</a>

weighted\_time\_in\_progress\_ms: number

Weighted time spent doing I/Os (milliseconds)

<a href="#">Link to this property</a>

writes: number

Writes completed

<a href="#">Link to this property</a>

writes\_merged: number

Writes merged

<a href="#">Link to this property</a>

discards: optional number

Discards completed successfully

<a href="#">Link to this property</a>

discards\_merged: optional number

Discards merged

<a href="#">Link to this property</a>

flushes: optional number

Flushes completed successfully

<a href="#">Link to this property</a>

sectors\_discarded: optional number

Sectors discarded

<a href="#">Link to this property</a>

time\_discarding\_ms: optional number

Time spent discarding (milliseconds)

<a href="#">Link to this property</a>

time\_flushing\_ms: optional number

Time spent flushing (milliseconds)

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

epsilon: optional number

Simulated number of network operations applied during state transition

<a href="#">Link to this property</a>

ha\_state: optional string

Name of high availability state

<a href="#">Link to this property</a>

ha\_value: optional number

Numeric value associated with high availability state (0 = disabled, 1 = active, 2 = standby, 3 = stopped, 4 = fault)

<a href="#">Link to this property</a>

<details>

<summary>

interfaces: optional array of object {name, operstate, ip\_addresses, speed }

</summary>

name: string

Name of the network interface

<a href="#">Link to this property</a>

operstate: string

UP/DOWN state of the network interface

<a href="#">Link to this property</a>

<details>

<summary>

ip\_addresses: optional array of object {interface\_name, ip\_address }

</summary>

interface\_name: string

Name of the network interface

<a href="#">Link to this property</a>

ip\_address: string

IP address of the network interface

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

speed: optional number

Speed of the network interface (bits per second)

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

io\_pressure\_full\_10s: optional number

Percentage of time over a 10 second window that all tasks were stalled

<a href="#">Link to this property</a>

io\_pressure\_full\_300s: optional number

Percentage of time over a 5 minute window that all tasks were stalled

<a href="#">Link to this property</a>

io\_pressure\_full\_60s: optional number

Percentage of time over a 1 minute window that all tasks were stalled

<a href="#">Link to this property</a>

io\_pressure\_full\_total\_us: optional number

Total stall time (microseconds)

<a href="#">Link to this property</a>

io\_pressure\_some\_10s: optional number

Percentage of time over a 10 second window that some tasks were stalled

<a href="#">Link to this property</a>

io\_pressure\_some\_300s: optional number

Percentage of time over a 3 minute window that some tasks were stalled

<a href="#">Link to this property</a>

io\_pressure\_some\_60s: optional number

Percentage of time over a 1 minute window that some tasks were stalled

<a href="#">Link to this property</a>

io\_pressure\_some\_total\_us: optional number

Total stall time (microseconds)

<a href="#">Link to this property</a>

kernel\_btime: optional number

Boot time (seconds since Unix epoch)

<a href="#">Link to this property</a>

kernel\_ctxt: optional number

Number of context switches that the system underwent

<a href="#">Link to this property</a>

kernel\_processes: optional number

Number of forks since boot

<a href="#">Link to this property</a>

kernel\_processes\_blocked: optional number

Number of processes blocked waiting for I/O

<a href="#">Link to this property</a>

kernel\_processes\_running: optional number

Number of processes in runnable state

<a href="#">Link to this property</a>

load\_average\_15m: optional number

The fifteen-minute load average

<a href="#">Link to this property</a>

load\_average\_1m: optional number

The one-minute load average

<a href="#">Link to this property</a>

load\_average\_5m: optional number

The five-minute load average

<a href="#">Link to this property</a>

load\_average\_cur: optional number

Number of currently runnable kernel scheduling entities

<a href="#">Link to this property</a>

load\_average\_max: optional number

Number of kernel scheduling entities that currently exist on the system

<a href="#">Link to this property</a>

memory\_active\_bytes: optional number

Memory that has been used more recently

<a href="#">Link to this property</a>

memory\_anon\_hugepages\_bytes: optional number

Non-file backed huge pages mapped into user-space page tables

<a href="#">Link to this property</a>

memory\_anon\_pages\_bytes: optional number

Non-file backed pages mapped into user-space page tables

<a href="#">Link to this property</a>

memory\_available\_bytes: optional number

Estimate of how much memory is available for starting new applications

<a href="#">Link to this property</a>

memory\_bounce\_bytes: optional number

Memory used for block device bounce buffers

<a href="#">Link to this property</a>

memory\_buffers\_bytes: optional number

Relatively temporary storage for raw disk blocks

<a href="#">Link to this property</a>

memory\_cached\_bytes: optional number

In-memory cache for files read from the disk

<a href="#">Link to this property</a>

memory\_cma\_free\_bytes: optional number

Free CMA (Contiguous Memory Allocator) pages

<a href="#">Link to this property</a>

memory\_cma\_total\_bytes: optional number

Total CMA (Contiguous Memory Allocator) pages

<a href="#">Link to this property</a>

memory\_commit\_limit\_bytes: optional number

Total amount of memory currently available to be allocated on the system

<a href="#">Link to this property</a>

memory\_committed\_as\_bytes: optional number

Amount of memory presently allocated on the system

<a href="#">Link to this property</a>

memory\_dirty\_bytes: optional number

Memory which is waiting to get written back to the disk

<a href="#">Link to this property</a>

memory\_free\_bytes: optional number

The sum of LowFree and HighFree

<a href="#">Link to this property</a>

memory\_high\_free\_bytes: optional number

Amount of free highmem

<a href="#">Link to this property</a>

memory\_high\_total\_bytes: optional number

Total amount of highmem

<a href="#">Link to this property</a>

memory\_hugepages\_free: optional number

The number of huge pages in the pool that are not yet allocated

<a href="#">Link to this property</a>

memory\_hugepages\_rsvd: optional number

Number of huge pages for which a commitment has been made, but no allocation has yet been made

<a href="#">Link to this property</a>

memory\_hugepages\_surp: optional number

Number of huge pages in the pool above the threshold

<a href="#">Link to this property</a>

memory\_hugepages\_total: optional number

The size of the pool of huge pages

<a href="#">Link to this property</a>

memory\_hugepagesize\_bytes: optional number

The size of huge pages

<a href="#">Link to this property</a>

memory\_inactive\_bytes: optional number

Memory which has been less recently used

<a href="#">Link to this property</a>

memory\_k\_reclaimable\_bytes: optional number

Kernel allocations that the kernel will attempt to reclaim under memory pressure

<a href="#">Link to this property</a>

memory\_kernel\_stack\_bytes: optional number

Amount of memory allocated to kernel stacks

<a href="#">Link to this property</a>

memory\_low\_free\_bytes: optional number

Amount of free lowmem

<a href="#">Link to this property</a>

memory\_low\_total\_bytes: optional number

Total amount of lowmem

<a href="#">Link to this property</a>

memory\_mapped\_bytes: optional number

Files which have been mapped into memory

<a href="#">Link to this property</a>

memory\_page\_tables\_bytes: optional number

Amount of memory dedicated to the lowest level of page tables

<a href="#">Link to this property</a>

memory\_per\_cpu\_bytes: optional number

Memory allocated to the per-cpu alloctor used to back per-cpu allocations

<a href="#">Link to this property</a>

memory\_pressure\_full\_10s: optional number

Percentage of time over a 10 second window that all tasks were stalled

<a href="#">Link to this property</a>

memory\_pressure\_full\_300s: optional number

Percentage of time over a 5 minute window that all tasks were stalled

<a href="#">Link to this property</a>

memory\_pressure\_full\_60s: optional number

Percentage of time over a 1 minute window that all tasks were stalled

<a href="#">Link to this property</a>

memory\_pressure\_full\_total\_us: optional number

Total stall time (microseconds)

<a href="#">Link to this property</a>

memory\_pressure\_some\_10s: optional number

Percentage of time over a 10 second window that some tasks were stalled

<a href="#">Link to this property</a>

memory\_pressure\_some\_300s: optional number

Percentage of time over a 5 minute window that some tasks were stalled

<a href="#">Link to this property</a>

memory\_pressure\_some\_60s: optional number

Percentage of time over a 1 minute window that some tasks were stalled

<a href="#">Link to this property</a>

memory\_pressure\_some\_total\_us: optional number

Total stall time (microseconds)

<a href="#">Link to this property</a>

memory\_s\_reclaimable\_bytes: optional number

Part of slab that can be reclaimed on memory pressure

<a href="#">Link to this property</a>

memory\_s\_unreclaim\_bytes: optional number

Part of slab that cannot be reclaimed on memory pressure

<a href="#">Link to this property</a>

memory\_secondary\_page\_tables\_bytes: optional number

Amount of memory dedicated to the lowest level of page tables

<a href="#">Link to this property</a>

memory\_shmem\_bytes: optional number

Amount of memory consumed by tmpfs

<a href="#">Link to this property</a>

memory\_shmem\_hugepages\_bytes: optional number

Memory used by shmem and tmpfs, allocated with huge pages

<a href="#">Link to this property</a>

memory\_shmem\_pmd\_mapped\_bytes: optional number

Shared memory mapped into user space with huge pages

<a href="#">Link to this property</a>

memory\_slab\_bytes: optional number

In-kernel data structures cache

<a href="#">Link to this property</a>

memory\_swap\_cached\_bytes: optional number

Memory swapped out and back in while still in swap file

<a href="#">Link to this property</a>

memory\_swap\_free\_bytes: optional number

Amount of swap space that is currently unused

<a href="#">Link to this property</a>

memory\_swap\_total\_bytes: optional number

Total amount of swap space available

<a href="#">Link to this property</a>

memory\_total\_bytes: optional number

Total usable RAM

<a href="#">Link to this property</a>

memory\_vmalloc\_chunk\_bytes: optional number

Largest contiguous block of vmalloc area which is free

<a href="#">Link to this property</a>

memory\_vmalloc\_total\_bytes: optional number

Total size of vmalloc memory area

<a href="#">Link to this property</a>

memory\_vmalloc\_used\_bytes: optional number

Amount of vmalloc area which is used

<a href="#">Link to this property</a>

memory\_writeback\_bytes: optional number

Memory which is actively being written back to the disk

<a href="#">Link to this property</a>

memory\_writeback\_tmp\_bytes: optional number

Memory used by FUSE for temporary writeback buffers

<a href="#">Link to this property</a>

memory\_z\_swap\_bytes: optional number

Memory consumed by the zswap backend, compressed

<a href="#">Link to this property</a>

memory\_z\_swapped\_bytes: optional number

Amount of anonymous memory stored in zswap, uncompressed

<a href="#">Link to this property</a>

<details>

<summary>

mounts: optional array of object {file\_system, kind, mount\_point, 7 more }

</summary>

file\_system: string

File system on disk (EXT4, NTFS, etc.)

<a href="#">Link to this property</a>

kind: string

Kind of disk (HDD, SSD, etc.)

<a href="#">Link to this property</a>

mount\_point: string

Path where disk is mounted

<a href="#">Link to this property</a>

name: string

Name of the disk mount

<a href="#">Link to this property</a>

available\_bytes: optional number

Available disk size (bytes)

<a href="#">Link to this property</a>

available\_inodes: optional number

Available inodes on filesystem

<a href="#">Link to this property</a>

is\_read\_only: optional boolean

Determines whether the disk is read-only

<a href="#">Link to this property</a>

is\_removable: optional boolean

Determines whether the disk is removable

<a href="#">Link to this property</a>

total\_bytes: optional number

Total disk size (bytes)

<a href="#">Link to this property</a>

total\_inodes: optional number

Total inodes on filesystem

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

netdevs: optional array of object {name, recv\_bytes, recv\_compressed, 14 more }

</summary>

name: string

Name of the network device

<a href="#">Link to this property</a>

recv\_bytes: number

Total bytes received

<a href="#">Link to this property</a>

recv\_compressed: number

Compressed packets received

<a href="#">Link to this property</a>

recv\_drop: number

Packets dropped

<a href="#">Link to this property</a>

recv\_errs: number

Bad packets received

<a href="#">Link to this property</a>

recv\_fifo: number

FIFO overruns

<a href="#">Link to this property</a>

recv\_frame: number

Frame alignment errors

<a href="#">Link to this property</a>

recv\_multicast: number

Multicast packets received

<a href="#">Link to this property</a>

recv\_packets: number

Total packets received

<a href="#">Link to this property</a>

sent\_bytes: number

Total bytes transmitted

<a href="#">Link to this property</a>

sent\_carrier: number

Number of packets not sent due to carrier errors

<a href="#">Link to this property</a>

sent\_colls: number

Number of collisions

<a href="#">Link to this property</a>

sent\_compressed: number

Number of compressed packets transmitted

<a href="#">Link to this property</a>

sent\_drop: number

Number of packets dropped during transmission

<a href="#">Link to this property</a>

sent\_errs: number

Number of transmission errors

<a href="#">Link to this property</a>

sent\_fifo: number

FIFO overruns

<a href="#">Link to this property</a>

sent\_packets: number

Total packets transmitted

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

platform: optional string

Platform identifier

<a href="#">Link to this property</a>

<details>

<summary>

routes: optional array of object {destination, interface\_name, kind, 3 more }

</summary>

destination: string

Route destination as default or an IPv4 CIDR

<a href="#">Link to this property</a>

interface\_name: string

Interface used by the next hop

<a href="#">Link to this property</a>

kind: string

Routing decision type: tunnel, breakout, or lan

<a href="#">Link to this property</a>

metric: number

Route metric; lower metrics are preferred

<a href="#">Link to this property</a>

gateway: optional string

Gateway address for the next hop

<a href="#">Link to this property</a>

weight: optional number

Relative weight within an equal-cost route

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

site\_id: optional string

Site identifier

<a href="#">Link to this property</a>

snmp\_icmp\_in\_addr\_mask\_reps: optional number

Number of ICMP Address Mask Reply messages received

<a href="#">Link to this property</a>

snmp\_icmp\_in\_addr\_masks: optional number

Number of ICMP Address Mask Request messages received

<a href="#">Link to this property</a>

snmp\_icmp\_in\_csum\_errors: optional number

Number of ICMP messages received with bad checksums

<a href="#">Link to this property</a>

snmp\_icmp\_in\_dest\_unreachs: optional number

Number of ICMP Destination Unreachable messages received

<a href="#">Link to this property</a>

snmp\_icmp\_in\_echo\_reps: optional number

Number of ICMP Echo Reply messages received

<a href="#">Link to this property</a>

snmp\_icmp\_in\_echos: optional number

Number of ICMP Echo (request) messages received

<a href="#">Link to this property</a>

snmp\_icmp\_in\_errors: optional number

Number of ICMP messages received with ICMP-specific errors

<a href="#">Link to this property</a>

snmp\_icmp\_in\_msgs: optional number

Number of ICMP messages received

<a href="#">Link to this property</a>

snmp\_icmp\_in\_parm\_probs: optional number

Number of ICMP Parameter Problem messages received

<a href="#">Link to this property</a>

snmp\_icmp\_in\_redirects: optional number

Number of ICMP Redirect messages received

<a href="#">Link to this property</a>

snmp\_icmp\_in\_src\_quenchs: optional number

Number of ICMP Source Quench messages received

<a href="#">Link to this property</a>

snmp\_icmp\_in\_time\_excds: optional number

Number of ICMP Time Exceeded messages received

<a href="#">Link to this property</a>

snmp\_icmp\_in\_timestamp\_reps: optional number

Number of ICMP Address Mask Request messages received

<a href="#">Link to this property</a>

snmp\_icmp\_in\_timestamps: optional number

Number of ICMP Timestamp (request) messages received

<a href="#">Link to this property</a>

snmp\_icmp\_out\_addr\_mask\_reps: optional number

Number of ICMP Address Mask Reply messages sent

<a href="#">Link to this property</a>

snmp\_icmp\_out\_addr\_masks: optional number

Number of ICMP Address Mask Request messages sent

<a href="#">Link to this property</a>

snmp\_icmp\_out\_dest\_unreachs: optional number

Number of ICMP Destination Unreachable messages sent

<a href="#">Link to this property</a>

snmp\_icmp\_out\_echo\_reps: optional number

Number of ICMP Echo Reply messages sent

<a href="#">Link to this property</a>

snmp\_icmp\_out\_echos: optional number

Number of ICMP Echo (request) messages sent

<a href="#">Link to this property</a>

snmp\_icmp\_out\_errors: optional number

Number of ICMP messages which this entity did not send due to ICMP-specific errors

<a href="#">Link to this property</a>

snmp\_icmp\_out\_msgs: optional number

Number of ICMP messages attempted to send

<a href="#">Link to this property</a>

snmp\_icmp\_out\_parm\_probs: optional number

Number of ICMP Parameter Problem messages sent

<a href="#">Link to this property</a>

snmp\_icmp\_out\_redirects: optional number

Number of ICMP Redirect messages sent

<a href="#">Link to this property</a>

snmp\_icmp\_out\_src\_quenchs: optional number

Number of ICMP Source Quench messages sent

<a href="#">Link to this property</a>

snmp\_icmp\_out\_time\_excds: optional number

Number of ICMP Time Exceeded messages sent

<a href="#">Link to this property</a>

snmp\_icmp\_out\_timestamp\_reps: optional number

Number of ICMP Timestamp Reply messages sent

<a href="#">Link to this property</a>

snmp\_icmp\_out\_timestamps: optional number

Number of ICMP Timestamp (request) messages sent

<a href="#">Link to this property</a>

snmp\_ip\_default\_ttl: optional number

Default value of the Time-To-Live field of the IP header

<a href="#">Link to this property</a>

snmp\_ip\_forw\_datagrams: optional number

Number of datagrams forwarded to their final destination

<a href="#">Link to this property</a>

snmp\_ip\_forwarding\_enabled: optional boolean

Set when acting as an IP gateway

<a href="#">Link to this property</a>

snmp\_ip\_frag\_creates: optional number

Number of datagrams generated by fragmentation

<a href="#">Link to this property</a>

snmp\_ip\_frag\_fails: optional number

Number of datagrams discarded because fragmentation failed

<a href="#">Link to this property</a>

snmp\_ip\_frag\_oks: optional number

Number of datagrams successfully fragmented

<a href="#">Link to this property</a>

snmp\_ip\_in\_addr\_errors: optional number

Number of input datagrams discarded due to errors in the IP address

<a href="#">Link to this property</a>

snmp\_ip\_in\_delivers: optional number

Number of input datagrams successfully delivered to IP user-protocols

<a href="#">Link to this property</a>

snmp\_ip\_in\_discards: optional number

Number of input datagrams otherwise discarded

<a href="#">Link to this property</a>

snmp\_ip\_in\_hdr\_errors: optional number

Number of input datagrams discarded due to errors in the IP header

<a href="#">Link to this property</a>

snmp\_ip\_in\_receives: optional number

Number of input datagrams received from interfaces

<a href="#">Link to this property</a>

snmp\_ip\_in\_unknown\_protos: optional number

Number of input datagrams discarded due unknown or unsupported protocol

<a href="#">Link to this property</a>

snmp\_ip\_out\_discards: optional number

Number of output datagrams otherwise discarded

<a href="#">Link to this property</a>

snmp\_ip\_out\_no\_routes: optional number

Number of output datagrams discarded because no route matched

<a href="#">Link to this property</a>

snmp\_ip\_out\_requests: optional number

Number of datagrams supplied for transmission

<a href="#">Link to this property</a>

snmp\_ip\_reasm\_fails: optional number

Number of failures detected by the reassembly algorithm

<a href="#">Link to this property</a>

snmp\_ip\_reasm\_oks: optional number

Number of datagrams successfully reassembled

<a href="#">Link to this property</a>

snmp\_ip\_reasm\_reqds: optional number

Number of fragments received which needed to be reassembled

<a href="#">Link to this property</a>

snmp\_ip\_reasm\_timeout: optional number

Number of seconds fragments are held while awaiting reassembly

<a href="#">Link to this property</a>

snmp\_tcp\_active\_opens: optional number

Number of times TCP transitions to SYN-SENT from CLOSED

<a href="#">Link to this property</a>

snmp\_tcp\_attempt\_fails: optional number

Number of times TCP transitions to CLOSED from SYN-SENT or SYN-RCVD, plus transitions to LISTEN from SYN-RCVD

<a href="#">Link to this property</a>

snmp\_tcp\_curr\_estab: optional number

Number of TCP connections in ESTABLISHED or CLOSE-WAIT

<a href="#">Link to this property</a>

snmp\_tcp\_estab\_resets: optional number

Number of times TCP transitions to CLOSED from ESTABLISHED or CLOSE-WAIT

<a href="#">Link to this property</a>

snmp\_tcp\_in\_csum\_errors: optional number

Number of TCP segments received with checksum errors

<a href="#">Link to this property</a>

snmp\_tcp\_in\_errs: optional number

Number of TCP segments received in error

<a href="#">Link to this property</a>

snmp\_tcp\_in\_segs: optional number

Number of TCP segments received

<a href="#">Link to this property</a>

snmp\_tcp\_max\_conn: optional number

Limit on the total number of TCP connections

<a href="#">Link to this property</a>

snmp\_tcp\_out\_rsts: optional number

Number of TCP segments sent with RST flag

<a href="#">Link to this property</a>

snmp\_tcp\_out\_segs: optional number

Number of TCP segments sent

<a href="#">Link to this property</a>

snmp\_tcp\_passive\_opens: optional number

Number of times TCP transitions to SYN-RCVD from LISTEN

<a href="#">Link to this property</a>

snmp\_tcp\_retrans\_segs: optional number

Number of TCP segments retransmitted

<a href="#">Link to this property</a>

snmp\_tcp\_rto\_max: optional number

Maximum value permitted by a TCP implementation for the retransmission timeout (milliseconds)

<a href="#">Link to this property</a>

snmp\_tcp\_rto\_min: optional number

Minimum value permitted by a TCP implementation for the retransmission timeout (milliseconds)

<a href="#">Link to this property</a>

snmp\_udp\_in\_datagrams: optional number

Number of UDP datagrams delivered to UDP applications

<a href="#">Link to this property</a>

snmp\_udp\_in\_errors: optional number

Number of UDP datagrams failed to be delivered for reasons other than lack of application at the destination port

<a href="#">Link to this property</a>

snmp\_udp\_no\_ports: optional number

Number of UDP datagrams received for which there was not application at the destination port

<a href="#">Link to this property</a>

snmp\_udp\_out\_datagrams: optional number

Number of UDP datagrams sent

<a href="#">Link to this property</a>

system\_boot\_time\_s: optional number

Boottime of the system (seconds since the Unix epoch)

<a href="#">Link to this property</a>

<details>

<summary>

thermals: optional array of object {label, critical\_celcius, current\_celcius, max\_celcius }

</summary>

label: string

Sensor identifier for the component

<a href="#">Link to this property</a>

critical\_celcius: optional number

Critical failure temperature of the component (degrees Celsius)

<a href="#">Link to this property</a>

current\_celcius: optional number

Current temperature of the component (degrees Celsius)

<a href="#">Link to this property</a>

max\_celcius: optional number

Maximum temperature of the component (degrees Celsius)

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

<details>

<summary>

tunnels: optional array of object {health\_state, health\_value, interface\_name, 9 more }

</summary>

health\_state: string

Name of tunnel health state (unknown, healthy, degraded, down)

<a href="#">Link to this property</a>

health\_value: number

Numeric value associated with tunnel state (0 = unknown, 1 = healthy, 2 = degraded, 3 = down)

<a href="#">Link to this property</a>

interface\_name: string

The tunnel interface name (i.e. xfrm1, xfrm3.99, etc.)

<a href="#">Link to this property</a>

tunnel\_id: string

Tunnel identifier

<a href="#">Link to this property</a>

jitter\_ms: optional number

Tunnel round-trip latency variation in milliseconds

<a href="#">Link to this property</a>

latency\_ms: optional number

50th percentile tunnel round-trip latency in milliseconds

<a href="#">Link to this property</a>

natd\_result: optional string

Public socket address returned by the NAT detector

<a href="#">Link to this property</a>

natd\_state: optional number

Numeric NAT detector state (0 = detected, 1 = missing result, 2 = stale result)

<a href="#">Link to this property</a>

natd\_target: optional string

Target socket address probed by the NAT detector, using the detector source port

<a href="#">Link to this property</a>

probed\_mtu: optional number

MTU as measured between the two ends of the tunnel

<a href="#">Link to this property</a>

recent\_healthy\_pings: optional number

Number of recent healthy pings for this tunnel

<a href="#">Link to this property</a>

recent\_unhealthy\_pings: optional number

Number of recent unhealthy pings for this tunnel

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

uptime\_idle\_ms: optional number

Sum of how much time each core has spent idle

<a href="#">Link to this property</a>

uptime\_total\_ms: optional number

Uptime of the system, including time spent in suspend

<a href="#">Link to this property</a>

</details>

<a href="#">Link to this property</a>

</details>

[Link to this property](#)%20magic_transit.connectors.snapshots.latest%20%3E%20(model)%20latest_list_response%20%3E%20(schema)>)