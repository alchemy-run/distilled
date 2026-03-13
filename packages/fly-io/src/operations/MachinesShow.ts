import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const MachinesShowInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  app_name: Schema.String.pipe(T.PathParam()),
  machine_id: Schema.String.pipe(T.PathParam()),
}).pipe(T.Http({ method: "GET", path: "/apps/{app_name}/machines/{machine_id}" }));
export type MachinesShowInput = typeof MachinesShowInput.Type;

// Output Schema
export const MachinesShowOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  checks: Schema.optional(Schema.Array(Schema.Struct({
    name: Schema.optional(Schema.String),
    output: Schema.optional(Schema.String),
    status: Schema.optional(Schema.String),
    updated_at: Schema.optional(Schema.String),
  }))),
  config: Schema.optional(Schema.Struct({
    auto_destroy: Schema.optional(Schema.Boolean),
    checks: Schema.optional(Schema.Record(Schema.String, Schema.Struct({
      grace_period: Schema.optional(Schema.Struct({
        time.Duration: Schema.optional(Schema.Number),
      })),
      headers: Schema.optional(Schema.Array(Schema.Struct({
        name: Schema.optional(Schema.String),
        values: Schema.optional(Schema.Array(Schema.String)),
      }))),
      interval: Schema.optional(Schema.Struct({
        time.Duration: Schema.optional(Schema.Number),
      })),
      kind: Schema.optional(Schema.Literals(["informational", "readiness"])),
      method: Schema.optional(Schema.String),
      path: Schema.optional(Schema.String),
      port: Schema.optional(Schema.Number),
      protocol: Schema.optional(Schema.String),
      timeout: Schema.optional(Schema.Struct({
        time.Duration: Schema.optional(Schema.Number),
      })),
      tls_server_name: Schema.optional(Schema.String),
      tls_skip_verify: Schema.optional(Schema.Boolean),
      type: Schema.optional(Schema.String),
    }))),
    containers: Schema.optional(Schema.Array(Schema.Struct({
      cmd: Schema.optional(Schema.Array(Schema.String)),
      depends_on: Schema.optional(Schema.Array(Schema.Struct({
        condition: Schema.optional(Schema.Struct({

        })),
        name: Schema.optional(Schema.String),
      }))),
      entrypoint: Schema.optional(Schema.Array(Schema.String)),
      env: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      env_from: Schema.optional(Schema.Array(Schema.Struct({
        env_var: Schema.optional(Schema.String),
        field_ref: Schema.optional(Schema.Literals(["id", "version", "app_name", "private_ip", "region", "image"])),
      }))),
      exec: Schema.optional(Schema.Array(Schema.String)),
      files: Schema.optional(Schema.Array(Schema.Struct({
        guest_path: Schema.optional(Schema.String),
        image_config: Schema.optional(Schema.String),
        mode: Schema.optional(Schema.Number),
        raw_value: Schema.optional(Schema.String),
        secret_name: Schema.optional(Schema.String),
      }))),
      healthchecks: Schema.optional(Schema.Array(Schema.Struct({
        exec: Schema.optional(Schema.Struct({
          command: Schema.optional(Schema.Array(Schema.String)),
        })),
        failure_threshold: Schema.optional(Schema.Number),
        grace_period: Schema.optional(Schema.Number),
        http: Schema.optional(Schema.Struct({
          headers: Schema.optional(Schema.Array(Schema.Struct({
            name: Schema.optional(Schema.String),
            values: Schema.optional(Schema.Array(Schema.String)),
          }))),
          method: Schema.optional(Schema.String),
          path: Schema.optional(Schema.String),
          port: Schema.optional(Schema.Number),
          scheme: Schema.optional(Schema.Struct({

          })),
          tls_server_name: Schema.optional(Schema.String),
          tls_skip_verify: Schema.optional(Schema.Boolean),
        })),
        interval: Schema.optional(Schema.Number),
        kind: Schema.optional(Schema.Struct({

        })),
        name: Schema.optional(Schema.String),
        success_threshold: Schema.optional(Schema.Number),
        tcp: Schema.optional(Schema.Struct({
          port: Schema.optional(Schema.Number),
        })),
        timeout: Schema.optional(Schema.Number),
        unhealthy: Schema.optional(Schema.Struct({

        })),
      }))),
      image: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      restart: Schema.optional(Schema.Struct({
        gpu_bid_price: Schema.optional(Schema.Number),
        max_retries: Schema.optional(Schema.Number),
        policy: Schema.optional(Schema.Literals(["no", "always", "on-failure", "spot-price"])),
      })),
      secrets: Schema.optional(Schema.Array(Schema.Struct({
        env_var: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
      }))),
      stop: Schema.optional(Schema.Struct({
        signal: Schema.optional(Schema.String),
        timeout: Schema.optional(Schema.Struct({
          time.Duration: Schema.optional(Schema.Number),
        })),
      })),
      user: Schema.optional(Schema.String),
    }))),
    disable_machine_autostart: Schema.optional(Schema.Boolean),
    dns: Schema.optional(Schema.Struct({
      dns_forward_rules: Schema.optional(Schema.Array(Schema.Struct({
        addr: Schema.optional(Schema.String),
        basename: Schema.optional(Schema.String),
      }))),
      hostname: Schema.optional(Schema.String),
      hostname_fqdn: Schema.optional(Schema.String),
      nameservers: Schema.optional(Schema.Array(Schema.String)),
      options: Schema.optional(Schema.Array(Schema.Struct({
        name: Schema.optional(Schema.String),
        value: Schema.optional(Schema.String),
      }))),
      searches: Schema.optional(Schema.Array(Schema.String)),
      skip_registration: Schema.optional(Schema.Boolean),
    })),
    env: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    files: Schema.optional(Schema.Array(Schema.Struct({
      guest_path: Schema.optional(Schema.String),
      image_config: Schema.optional(Schema.String),
      mode: Schema.optional(Schema.Number),
      raw_value: Schema.optional(Schema.String),
      secret_name: Schema.optional(Schema.String),
    }))),
    guest: Schema.optional(Schema.Struct({
      cpu_kind: Schema.optional(Schema.String),
      cpus: Schema.optional(Schema.Number),
      gpu_kind: Schema.optional(Schema.String),
      gpus: Schema.optional(Schema.Number),
      host_dedication_id: Schema.optional(Schema.String),
      kernel_args: Schema.optional(Schema.Array(Schema.String)),
      memory_mb: Schema.optional(Schema.Number),
      persist_rootfs: Schema.optional(Schema.Literals(["never", "always", "restart"])),
    })),
    image: Schema.optional(Schema.String),
    init: Schema.optional(Schema.Struct({
      cmd: Schema.optional(Schema.Array(Schema.String)),
      entrypoint: Schema.optional(Schema.Array(Schema.String)),
      exec: Schema.optional(Schema.Array(Schema.String)),
      kernel_args: Schema.optional(Schema.Array(Schema.String)),
      swap_size_mb: Schema.optional(Schema.Number),
      tty: Schema.optional(Schema.Boolean),
    })),
    metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    metrics: Schema.optional(Schema.Struct({
      https: Schema.optional(Schema.Boolean),
      path: Schema.optional(Schema.String),
      port: Schema.optional(Schema.Number),
    })),
    mounts: Schema.optional(Schema.Array(Schema.Struct({
      add_size_gb: Schema.optional(Schema.Number),
      encrypted: Schema.optional(Schema.Boolean),
      extend_threshold_percent: Schema.optional(Schema.Number),
      name: Schema.optional(Schema.String),
      path: Schema.optional(Schema.String),
      size_gb: Schema.optional(Schema.Number),
      size_gb_limit: Schema.optional(Schema.Number),
      volume: Schema.optional(Schema.String),
    }))),
    processes: Schema.optional(Schema.Array(Schema.Struct({
      cmd: Schema.optional(Schema.Array(Schema.String)),
      entrypoint: Schema.optional(Schema.Array(Schema.String)),
      env: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      env_from: Schema.optional(Schema.Array(Schema.Struct({
        env_var: Schema.optional(Schema.String),
        field_ref: Schema.optional(Schema.Literals(["id", "version", "app_name", "private_ip", "region", "image"])),
      }))),
      exec: Schema.optional(Schema.Array(Schema.String)),
      ignore_app_secrets: Schema.optional(Schema.Boolean),
      secrets: Schema.optional(Schema.Array(Schema.Struct({
        env_var: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
      }))),
      user: Schema.optional(Schema.String),
    }))),
    restart: Schema.optional(Schema.Struct({
      gpu_bid_price: Schema.optional(Schema.Number),
      max_retries: Schema.optional(Schema.Number),
      policy: Schema.optional(Schema.Literals(["no", "always", "on-failure", "spot-price"])),
    })),
    rootfs: Schema.optional(Schema.Struct({
      fs_size_gb: Schema.optional(Schema.Number),
      persist: Schema.optional(Schema.Literals(["never", "always", "restart"])),
      size_gb: Schema.optional(Schema.Number),
    })),
    schedule: Schema.optional(Schema.String),
    services: Schema.optional(Schema.Array(Schema.Struct({
      autostart: Schema.optional(Schema.Boolean),
      autostop: Schema.optional(Schema.Literals(["off", "stop", "suspend"])),
      checks: Schema.optional(Schema.Array(Schema.Struct({
        grace_period: Schema.optional(Schema.Struct({
          time.Duration: Schema.optional(Schema.Number),
        })),
        headers: Schema.optional(Schema.Array(Schema.Struct({
          name: Schema.optional(Schema.String),
          values: Schema.optional(Schema.Array(Schema.String)),
        }))),
        interval: Schema.optional(Schema.Struct({
          time.Duration: Schema.optional(Schema.Number),
        })),
        method: Schema.optional(Schema.String),
        path: Schema.optional(Schema.String),
        port: Schema.optional(Schema.Number),
        protocol: Schema.optional(Schema.String),
        timeout: Schema.optional(Schema.Struct({
          time.Duration: Schema.optional(Schema.Number),
        })),
        tls_server_name: Schema.optional(Schema.String),
        tls_skip_verify: Schema.optional(Schema.Boolean),
        type: Schema.optional(Schema.String),
      }))),
      concurrency: Schema.optional(Schema.Struct({
        hard_limit: Schema.optional(Schema.Number),
        soft_limit: Schema.optional(Schema.Number),
        type: Schema.optional(Schema.String),
      })),
      force_instance_description: Schema.optional(Schema.String),
      force_instance_key: Schema.optional(Schema.String),
      internal_port: Schema.optional(Schema.Number),
      min_machines_running: Schema.optional(Schema.Number),
      ports: Schema.optional(Schema.Array(Schema.Struct({
        end_port: Schema.optional(Schema.Number),
        force_https: Schema.optional(Schema.Boolean),
        handlers: Schema.optional(Schema.Array(Schema.String)),
        http_options: Schema.optional(Schema.Struct({
          compress: Schema.optional(Schema.Boolean),
          h2_backend: Schema.optional(Schema.Boolean),
          headers_read_timeout: Schema.optional(Schema.Number),
          idle_timeout: Schema.optional(Schema.Number),
          replay_cache: Schema.optional(Schema.Array(Schema.Struct({
            allow_bypass: Schema.optional(Schema.Boolean),
            name: Schema.optional(Schema.String),
            path_prefix: Schema.optional(Schema.String),
            ttl_seconds: Schema.optional(Schema.Number),
            type: Schema.optional(Schema.Literals(["cookie", "header"])),
          }))),
          response: Schema.optional(Schema.Struct({
            headers: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
            pristine: Schema.optional(Schema.Boolean),
          })),
        })),
        port: Schema.optional(Schema.Number),
        proxy_proto_options: Schema.optional(Schema.Struct({
          version: Schema.optional(Schema.String),
        })),
        start_port: Schema.optional(Schema.Number),
        tls_options: Schema.optional(Schema.Struct({
          alpn: Schema.optional(Schema.Array(Schema.String)),
          default_self_signed: Schema.optional(Schema.Boolean),
          versions: Schema.optional(Schema.Array(Schema.String)),
        })),
      }))),
      protocol: Schema.optional(Schema.String),
    }))),
    size: Schema.optional(Schema.String),
    standbys: Schema.optional(Schema.Array(Schema.String)),
    statics: Schema.optional(Schema.Array(Schema.Struct({
      guest_path: Schema.String,
      index_document: Schema.optional(Schema.String),
      tigris_bucket: Schema.optional(Schema.String),
      url_prefix: Schema.String,
    }))),
    stop_config: Schema.optional(Schema.Struct({
      signal: Schema.optional(Schema.String),
      timeout: Schema.optional(Schema.Struct({
        time.Duration: Schema.optional(Schema.Number),
      })),
    })),
  })),
  created_at: Schema.optional(Schema.String),
  events: Schema.optional(Schema.Array(Schema.Struct({
    id: Schema.optional(Schema.String),
    request: Schema.optional(Schema.Unknown),
    source: Schema.optional(Schema.String),
    status: Schema.optional(Schema.String),
    timestamp: Schema.optional(Schema.Number),
    type: Schema.optional(Schema.String),
  }))),
  host_status: Schema.optional(Schema.Literals(["ok", "unknown", "unreachable"])),
  id: Schema.optional(Schema.String),
  image_ref: Schema.optional(Schema.Struct({
    digest: Schema.optional(Schema.String),
    labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    registry: Schema.optional(Schema.String),
    repository: Schema.optional(Schema.String),
    tag: Schema.optional(Schema.String),
  })),
  incomplete_config: Schema.optional(Schema.Struct({
    auto_destroy: Schema.optional(Schema.Boolean),
    checks: Schema.optional(Schema.Record(Schema.String, Schema.Struct({
      grace_period: Schema.optional(Schema.Struct({
        time.Duration: Schema.optional(Schema.Number),
      })),
      headers: Schema.optional(Schema.Array(Schema.Struct({
        name: Schema.optional(Schema.String),
        values: Schema.optional(Schema.Array(Schema.String)),
      }))),
      interval: Schema.optional(Schema.Struct({
        time.Duration: Schema.optional(Schema.Number),
      })),
      kind: Schema.optional(Schema.Literals(["informational", "readiness"])),
      method: Schema.optional(Schema.String),
      path: Schema.optional(Schema.String),
      port: Schema.optional(Schema.Number),
      protocol: Schema.optional(Schema.String),
      timeout: Schema.optional(Schema.Struct({
        time.Duration: Schema.optional(Schema.Number),
      })),
      tls_server_name: Schema.optional(Schema.String),
      tls_skip_verify: Schema.optional(Schema.Boolean),
      type: Schema.optional(Schema.String),
    }))),
    containers: Schema.optional(Schema.Array(Schema.Struct({
      cmd: Schema.optional(Schema.Array(Schema.String)),
      depends_on: Schema.optional(Schema.Array(Schema.Struct({
        condition: Schema.optional(Schema.Struct({

        })),
        name: Schema.optional(Schema.String),
      }))),
      entrypoint: Schema.optional(Schema.Array(Schema.String)),
      env: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      env_from: Schema.optional(Schema.Array(Schema.Struct({
        env_var: Schema.optional(Schema.String),
        field_ref: Schema.optional(Schema.Literals(["id", "version", "app_name", "private_ip", "region", "image"])),
      }))),
      exec: Schema.optional(Schema.Array(Schema.String)),
      files: Schema.optional(Schema.Array(Schema.Struct({
        guest_path: Schema.optional(Schema.String),
        image_config: Schema.optional(Schema.String),
        mode: Schema.optional(Schema.Number),
        raw_value: Schema.optional(Schema.String),
        secret_name: Schema.optional(Schema.String),
      }))),
      healthchecks: Schema.optional(Schema.Array(Schema.Struct({
        exec: Schema.optional(Schema.Struct({
          command: Schema.optional(Schema.Array(Schema.String)),
        })),
        failure_threshold: Schema.optional(Schema.Number),
        grace_period: Schema.optional(Schema.Number),
        http: Schema.optional(Schema.Struct({
          headers: Schema.optional(Schema.Array(Schema.Struct({
            name: Schema.optional(Schema.String),
            values: Schema.optional(Schema.Array(Schema.String)),
          }))),
          method: Schema.optional(Schema.String),
          path: Schema.optional(Schema.String),
          port: Schema.optional(Schema.Number),
          scheme: Schema.optional(Schema.Struct({

          })),
          tls_server_name: Schema.optional(Schema.String),
          tls_skip_verify: Schema.optional(Schema.Boolean),
        })),
        interval: Schema.optional(Schema.Number),
        kind: Schema.optional(Schema.Struct({

        })),
        name: Schema.optional(Schema.String),
        success_threshold: Schema.optional(Schema.Number),
        tcp: Schema.optional(Schema.Struct({
          port: Schema.optional(Schema.Number),
        })),
        timeout: Schema.optional(Schema.Number),
        unhealthy: Schema.optional(Schema.Struct({

        })),
      }))),
      image: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      restart: Schema.optional(Schema.Struct({
        gpu_bid_price: Schema.optional(Schema.Number),
        max_retries: Schema.optional(Schema.Number),
        policy: Schema.optional(Schema.Literals(["no", "always", "on-failure", "spot-price"])),
      })),
      secrets: Schema.optional(Schema.Array(Schema.Struct({
        env_var: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
      }))),
      stop: Schema.optional(Schema.Struct({
        signal: Schema.optional(Schema.String),
        timeout: Schema.optional(Schema.Struct({
          time.Duration: Schema.optional(Schema.Number),
        })),
      })),
      user: Schema.optional(Schema.String),
    }))),
    disable_machine_autostart: Schema.optional(Schema.Boolean),
    dns: Schema.optional(Schema.Struct({
      dns_forward_rules: Schema.optional(Schema.Array(Schema.Struct({
        addr: Schema.optional(Schema.String),
        basename: Schema.optional(Schema.String),
      }))),
      hostname: Schema.optional(Schema.String),
      hostname_fqdn: Schema.optional(Schema.String),
      nameservers: Schema.optional(Schema.Array(Schema.String)),
      options: Schema.optional(Schema.Array(Schema.Struct({
        name: Schema.optional(Schema.String),
        value: Schema.optional(Schema.String),
      }))),
      searches: Schema.optional(Schema.Array(Schema.String)),
      skip_registration: Schema.optional(Schema.Boolean),
    })),
    env: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    files: Schema.optional(Schema.Array(Schema.Struct({
      guest_path: Schema.optional(Schema.String),
      image_config: Schema.optional(Schema.String),
      mode: Schema.optional(Schema.Number),
      raw_value: Schema.optional(Schema.String),
      secret_name: Schema.optional(Schema.String),
    }))),
    guest: Schema.optional(Schema.Struct({
      cpu_kind: Schema.optional(Schema.String),
      cpus: Schema.optional(Schema.Number),
      gpu_kind: Schema.optional(Schema.String),
      gpus: Schema.optional(Schema.Number),
      host_dedication_id: Schema.optional(Schema.String),
      kernel_args: Schema.optional(Schema.Array(Schema.String)),
      memory_mb: Schema.optional(Schema.Number),
      persist_rootfs: Schema.optional(Schema.Literals(["never", "always", "restart"])),
    })),
    image: Schema.optional(Schema.String),
    init: Schema.optional(Schema.Struct({
      cmd: Schema.optional(Schema.Array(Schema.String)),
      entrypoint: Schema.optional(Schema.Array(Schema.String)),
      exec: Schema.optional(Schema.Array(Schema.String)),
      kernel_args: Schema.optional(Schema.Array(Schema.String)),
      swap_size_mb: Schema.optional(Schema.Number),
      tty: Schema.optional(Schema.Boolean),
    })),
    metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    metrics: Schema.optional(Schema.Struct({
      https: Schema.optional(Schema.Boolean),
      path: Schema.optional(Schema.String),
      port: Schema.optional(Schema.Number),
    })),
    mounts: Schema.optional(Schema.Array(Schema.Struct({
      add_size_gb: Schema.optional(Schema.Number),
      encrypted: Schema.optional(Schema.Boolean),
      extend_threshold_percent: Schema.optional(Schema.Number),
      name: Schema.optional(Schema.String),
      path: Schema.optional(Schema.String),
      size_gb: Schema.optional(Schema.Number),
      size_gb_limit: Schema.optional(Schema.Number),
      volume: Schema.optional(Schema.String),
    }))),
    processes: Schema.optional(Schema.Array(Schema.Struct({
      cmd: Schema.optional(Schema.Array(Schema.String)),
      entrypoint: Schema.optional(Schema.Array(Schema.String)),
      env: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      env_from: Schema.optional(Schema.Array(Schema.Struct({
        env_var: Schema.optional(Schema.String),
        field_ref: Schema.optional(Schema.Literals(["id", "version", "app_name", "private_ip", "region", "image"])),
      }))),
      exec: Schema.optional(Schema.Array(Schema.String)),
      ignore_app_secrets: Schema.optional(Schema.Boolean),
      secrets: Schema.optional(Schema.Array(Schema.Struct({
        env_var: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
      }))),
      user: Schema.optional(Schema.String),
    }))),
    restart: Schema.optional(Schema.Struct({
      gpu_bid_price: Schema.optional(Schema.Number),
      max_retries: Schema.optional(Schema.Number),
      policy: Schema.optional(Schema.Literals(["no", "always", "on-failure", "spot-price"])),
    })),
    rootfs: Schema.optional(Schema.Struct({
      fs_size_gb: Schema.optional(Schema.Number),
      persist: Schema.optional(Schema.Literals(["never", "always", "restart"])),
      size_gb: Schema.optional(Schema.Number),
    })),
    schedule: Schema.optional(Schema.String),
    services: Schema.optional(Schema.Array(Schema.Struct({
      autostart: Schema.optional(Schema.Boolean),
      autostop: Schema.optional(Schema.Literals(["off", "stop", "suspend"])),
      checks: Schema.optional(Schema.Array(Schema.Struct({
        grace_period: Schema.optional(Schema.Struct({
          time.Duration: Schema.optional(Schema.Number),
        })),
        headers: Schema.optional(Schema.Array(Schema.Struct({
          name: Schema.optional(Schema.String),
          values: Schema.optional(Schema.Array(Schema.String)),
        }))),
        interval: Schema.optional(Schema.Struct({
          time.Duration: Schema.optional(Schema.Number),
        })),
        method: Schema.optional(Schema.String),
        path: Schema.optional(Schema.String),
        port: Schema.optional(Schema.Number),
        protocol: Schema.optional(Schema.String),
        timeout: Schema.optional(Schema.Struct({
          time.Duration: Schema.optional(Schema.Number),
        })),
        tls_server_name: Schema.optional(Schema.String),
        tls_skip_verify: Schema.optional(Schema.Boolean),
        type: Schema.optional(Schema.String),
      }))),
      concurrency: Schema.optional(Schema.Struct({
        hard_limit: Schema.optional(Schema.Number),
        soft_limit: Schema.optional(Schema.Number),
        type: Schema.optional(Schema.String),
      })),
      force_instance_description: Schema.optional(Schema.String),
      force_instance_key: Schema.optional(Schema.String),
      internal_port: Schema.optional(Schema.Number),
      min_machines_running: Schema.optional(Schema.Number),
      ports: Schema.optional(Schema.Array(Schema.Struct({
        end_port: Schema.optional(Schema.Number),
        force_https: Schema.optional(Schema.Boolean),
        handlers: Schema.optional(Schema.Array(Schema.String)),
        http_options: Schema.optional(Schema.Struct({
          compress: Schema.optional(Schema.Boolean),
          h2_backend: Schema.optional(Schema.Boolean),
          headers_read_timeout: Schema.optional(Schema.Number),
          idle_timeout: Schema.optional(Schema.Number),
          replay_cache: Schema.optional(Schema.Array(Schema.Struct({
            allow_bypass: Schema.optional(Schema.Boolean),
            name: Schema.optional(Schema.String),
            path_prefix: Schema.optional(Schema.String),
            ttl_seconds: Schema.optional(Schema.Number),
            type: Schema.optional(Schema.Literals(["cookie", "header"])),
          }))),
          response: Schema.optional(Schema.Struct({
            headers: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
            pristine: Schema.optional(Schema.Boolean),
          })),
        })),
        port: Schema.optional(Schema.Number),
        proxy_proto_options: Schema.optional(Schema.Struct({
          version: Schema.optional(Schema.String),
        })),
        start_port: Schema.optional(Schema.Number),
        tls_options: Schema.optional(Schema.Struct({
          alpn: Schema.optional(Schema.Array(Schema.String)),
          default_self_signed: Schema.optional(Schema.Boolean),
          versions: Schema.optional(Schema.Array(Schema.String)),
        })),
      }))),
      protocol: Schema.optional(Schema.String),
    }))),
    size: Schema.optional(Schema.String),
    standbys: Schema.optional(Schema.Array(Schema.String)),
    statics: Schema.optional(Schema.Array(Schema.Struct({
      guest_path: Schema.String,
      index_document: Schema.optional(Schema.String),
      tigris_bucket: Schema.optional(Schema.String),
      url_prefix: Schema.String,
    }))),
    stop_config: Schema.optional(Schema.Struct({
      signal: Schema.optional(Schema.String),
      timeout: Schema.optional(Schema.Struct({
        time.Duration: Schema.optional(Schema.Number),
      })),
    })),
  })),
  instance_id: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  nonce: Schema.optional(Schema.String),
  private_ip: Schema.optional(Schema.String),
  region: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  updated_at: Schema.optional(Schema.String),
});
export type MachinesShowOutput = typeof MachinesShowOutput.Type;

// The operation
/**
 * Get Machine
 *
 * Get details of a specific Machine within an app by the Machine ID.
 *
 * @param app_name - Fly App Name
 * @param machine_id - Machine ID
 */
export const MachinesShow = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: MachinesShowInput,
  outputSchema: MachinesShowOutput,
}));
