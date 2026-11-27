// The only foreign code in distilled: a TLS or plain TCP exchange, and two hashes.
// One call opens a connection, sends the request, and reads until the server closes.
//
// Lean ships OpenSSL 3 as libraries without headers, so the few functions used
// here are declared by hand. Every one is a stable exported function of OpenSSL 3.
#include <lean/lean.h>
#include <netdb.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/socket.h>
#include <unistd.h>

typedef struct ssl_ctx_st SSL_CTX;
typedef struct ssl_st SSL;
typedef struct ssl_method_st SSL_METHOD;
typedef struct evp_md_st EVP_MD;
const SSL_METHOD *TLS_client_method(void);
SSL_CTX *SSL_CTX_new(const SSL_METHOD *method);
void SSL_CTX_free(SSL_CTX *ctx);
long SSL_CTX_ctrl(SSL_CTX *ctx, int cmd, long larg, void *parg);
void SSL_CTX_set_verify(SSL_CTX *ctx, int mode, void *callback);
int SSL_CTX_load_verify_locations(SSL_CTX *ctx, const char *file, const char *path);
int SSL_CTX_set_default_verify_paths(SSL_CTX *ctx);
SSL *SSL_new(SSL_CTX *ctx);
void SSL_free(SSL *ssl);
long SSL_ctrl(SSL *ssl, int cmd, long larg, void *parg);
int SSL_set1_host(SSL *ssl, const char *hostname);
int SSL_set_fd(SSL *ssl, int fd);
int SSL_connect(SSL *ssl);
int SSL_write(SSL *ssl, const void *buf, int num);
int SSL_read(SSL *ssl, void *buf, int num);
int SSL_shutdown(SSL *ssl);
long SSL_get_verify_result(const SSL *ssl);
unsigned long ERR_get_error(void);
void ERR_error_string_n(unsigned long e, char *buf, size_t len);
void ERR_clear_error(void);
unsigned char *SHA256(const unsigned char *d, size_t n, unsigned char *md);
const EVP_MD *EVP_sha256(void);
unsigned char *HMAC(const EVP_MD *evp_md, const void *key, int key_len, const unsigned char *data,
                    size_t data_len, unsigned char *md, unsigned int *md_len);

#define SSL_VERIFY_PEER 0x01
#define SSL_CTRL_SET_TLSEXT_HOSTNAME 55
#define TLSEXT_NAMETYPE_host_name 0
#define SSL_CTRL_SET_MIN_PROTO_VERSION 123
#define TLS1_2_VERSION 0x0303
#define X509_V_OK 0

static lean_obj_res fail(const char *what) {
  char message[512];
  unsigned long code = ERR_get_error();
  if (code != 0) {
    char detail[256];
    ERR_error_string_n(code, detail, sizeof detail);
    snprintf(message, sizeof message, "%s: %s", what, detail);
  } else {
    snprintf(message, sizeof message, "%s", what);
  }
  ERR_clear_error();
  return lean_io_result_mk_error(lean_mk_io_user_error(lean_mk_string(message)));
}

static lean_obj_res bytes(const unsigned char *data, size_t length) {
  lean_object *array = lean_alloc_sarray(1, length, length);
  if (length > 0) memcpy(lean_sarray_cptr(array), data, length);
  return array;
}

static int dial(const char *host, uint16_t port) {
  char service[8];
  snprintf(service, sizeof service, "%u", (unsigned)port);
  struct addrinfo hints, *found = NULL;
  memset(&hints, 0, sizeof hints);
  hints.ai_socktype = SOCK_STREAM;
  if (getaddrinfo(host, service, &hints, &found) != 0) return -1;
  int fd = -1;
  for (struct addrinfo *a = found; a != NULL; a = a->ai_next) {
    fd = socket(a->ai_family, a->ai_socktype, a->ai_protocol);
    if (fd < 0) continue;
    if (connect(fd, a->ai_addr, a->ai_addrlen) == 0) break;
    close(fd);
    fd = -1;
  }
  freeaddrinfo(found);
  return fd;
}

typedef struct {
  unsigned char *data;
  size_t length, capacity;
} buffer;

static int room(buffer *b) {
  if (b->length < b->capacity) return 1;
  size_t capacity = b->capacity == 0 ? 16384 : b->capacity * 2;
  unsigned char *grown = realloc(b->data, capacity);
  if (grown == NULL) return 0;
  b->data = grown;
  b->capacity = capacity;
  return 1;
}

static int load_roots(SSL_CTX *ctx) {
  const char *chosen = getenv("SSL_CERT_FILE");
  if (chosen != NULL && SSL_CTX_load_verify_locations(ctx, chosen, NULL) == 1) return 1;
  const char *files[] = {"/etc/ssl/cert.pem", "/etc/ssl/certs/ca-certificates.crt",
                         "/etc/pki/tls/certs/ca-bundle.crt", NULL};
  for (int i = 0; files[i] != NULL; i++)
    if (SSL_CTX_load_verify_locations(ctx, files[i], NULL) == 1) return 1;
  return SSL_CTX_set_default_verify_paths(ctx);
}

// TLS 1.2 or later, with the server's certificate checked against its name.
LEAN_EXPORT lean_obj_res distilled_tls_exchange(b_lean_obj_arg host, uint16_t port,
                                                b_lean_obj_arg request, lean_obj_arg world) {
  const char *name = lean_string_cstr(host);
  SSL_CTX *ctx = SSL_CTX_new(TLS_client_method());
  if (ctx == NULL) return fail("could not start TLS");
  SSL_CTX_ctrl(ctx, SSL_CTRL_SET_MIN_PROTO_VERSION, TLS1_2_VERSION, NULL);
  SSL_CTX_set_verify(ctx, SSL_VERIFY_PEER, NULL);
  if (load_roots(ctx) != 1) { SSL_CTX_free(ctx); return fail("no root certificates found"); }
  int fd = dial(name, port);
  if (fd < 0) { SSL_CTX_free(ctx); return fail("could not connect"); }
  SSL *ssl = SSL_new(ctx);
  buffer reply = {NULL, 0, 0};
  lean_obj_res result = NULL;
  if (ssl == NULL || SSL_ctrl(ssl, SSL_CTRL_SET_TLSEXT_HOSTNAME, TLSEXT_NAMETYPE_host_name, (void *)name) != 1 ||
      SSL_set1_host(ssl, name) != 1 || SSL_set_fd(ssl, fd) != 1) {
    result = fail("could not set the server name");
  } else if (SSL_connect(ssl) != 1 || SSL_get_verify_result(ssl) != X509_V_OK) {
    result = fail("the server's certificate was not accepted");
  } else {
    size_t total = lean_sarray_size(request), sent = 0;
    const unsigned char *out = lean_sarray_cptr(request);
    while (result == NULL && sent < total) {
      int n = SSL_write(ssl, out + sent, (int)(total - sent));
      if (n <= 0) result = fail("could not send the request"); else sent += (size_t)n;
    }
    while (result == NULL) {
      if (!room(&reply)) { result = fail("out of memory"); break; }
      int n = SSL_read(ssl, reply.data + reply.length, (int)(reply.capacity - reply.length));
      if (n <= 0) break;
      reply.length += (size_t)n;
    }
    ERR_clear_error();
    if (result == NULL) result = lean_io_result_mk_ok(bytes(reply.data, reply.length));
    SSL_shutdown(ssl);
  }
  free(reply.data);
  if (ssl != NULL) SSL_free(ssl);
  close(fd);
  SSL_CTX_free(ctx);
  return result;
}

// Plain TCP, for servers on this machine.
LEAN_EXPORT lean_obj_res distilled_tcp_exchange(b_lean_obj_arg host, uint16_t port,
                                                b_lean_obj_arg request, lean_obj_arg world) {
  int fd = dial(lean_string_cstr(host), port);
  if (fd < 0) return fail("could not connect");
  size_t total = lean_sarray_size(request), sent = 0;
  const unsigned char *out = lean_sarray_cptr(request);
  while (sent < total) {
    ssize_t n = send(fd, out + sent, total - sent, 0);
    if (n <= 0) { close(fd); return fail("could not send the request"); }
    sent += (size_t)n;
  }
  buffer reply = {NULL, 0, 0};
  for (;;) {
    if (!room(&reply)) { free(reply.data); close(fd); return fail("out of memory"); }
    ssize_t n = recv(fd, reply.data + reply.length, reply.capacity - reply.length, 0);
    if (n <= 0) break;
    reply.length += (size_t)n;
  }
  close(fd);
  lean_obj_res result = lean_io_result_mk_ok(bytes(reply.data, reply.length));
  free(reply.data);
  return result;
}

LEAN_EXPORT lean_obj_res distilled_sha256(b_lean_obj_arg data) {
  unsigned char digest[32];
  SHA256(lean_sarray_cptr(data), lean_sarray_size(data), digest);
  return bytes(digest, sizeof digest);
}

LEAN_EXPORT lean_obj_res distilled_hmac_sha256(b_lean_obj_arg key, b_lean_obj_arg data) {
  unsigned char digest[64];
  unsigned int length = 0;
  HMAC(EVP_sha256(), lean_sarray_cptr(key), (int)lean_sarray_size(key), lean_sarray_cptr(data),
       lean_sarray_size(data), digest, &length);
  return bytes(digest, length);
}
