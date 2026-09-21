/** Inline SVG icons. Each takes a class for sizing; they fill with currentColor. */

export const BrandMark = (props: { class?: string }) => (
  <svg class={props.class} viewBox="0 0 32 32" aria-hidden="true">
    <path
      d="M 6.00 6.00 L 12.60 6.00 L 12.60 3.50 L 10.10 3.50 L 10.10 1.00 L 21.90 1.00 L 21.90 3.50 L 19.40 3.50 L 19.40 6.00 L 26.00 6.00 L 26.00 12.60 L 28.50 12.60 L 28.50 10.10 L 31.00 10.10 L 31.00 21.90 L 28.50 21.90 L 28.50 19.40 L 26.00 19.40 L 26.00 26.00 L 19.40 26.00 L 19.40 28.50 L 21.90 28.50 L 21.90 31.00 L 10.10 31.00 L 10.10 28.50 L 12.60 28.50 L 12.60 26.00 L 6.00 26.00 L 6.00 19.40 L 3.50 19.40 L 3.50 21.90 L 1.00 21.90 L 1.00 10.10 L 3.50 10.10 L 3.50 12.60 L 6.00 12.60 Z"
      fill="none"
      stroke="currentColor"
      stroke-width="1.35"
      stroke-linejoin="miter"
    />
    <circle cx="16" cy="16" r="1.9" fill="var(--accent)" />
  </svg>
);

export const GitHubIcon = (props: { class?: string }) => (
  <svg class={props.class} viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
    />
  </svg>
);

export const DiscordIcon = (props: { class?: string }) => (
  <svg class={props.class} viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"
    />
  </svg>
);

export const NpmIcon = (props: { class?: string }) => (
  <svg class={props.class} viewBox="0 0 24 24" aria-hidden="true">
    <path
      fill="currentColor"
      d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z"
    />
  </svg>
);

export const SunIcon = (props: { class?: string }) => (
  <svg
    class={props.class}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);

export const MoonIcon = (props: { class?: string }) => (
  <svg
    class={props.class}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
  </svg>
);

export const SearchIcon = (props: { class?: string }) => (
  <svg class={props.class} viewBox="0 0 16 16" aria-hidden="true">
    <circle
      cx="7"
      cy="7"
      r="4.5"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
    />
    <path
      d="m10.5 10.5 3 3"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
    />
  </svg>
);

export const CaretIcon = (props: { class?: string }) => (
  <svg class={props.class} viewBox="0 0 12 12" aria-hidden="true">
    <path
      d="M2.5 4.5 6 8l3.5-3.5"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export const CopyIcon = (props: { class?: string }) => (
  <svg class={props.class} viewBox="0 0 16 16" aria-hidden="true">
    <path
      fill="none"
      stroke="currentColor"
      stroke-width="1.4"
      d="M5.5 3.5h7v9h-7z"
    />
    <path
      fill="none"
      stroke="currentColor"
      stroke-width="1.4"
      d="M3.5 10.5v-8h6"
    />
  </svg>
);

export const CheckIcon = (props: { class?: string }) => (
  <svg class={props.class} viewBox="0 0 16 16" aria-hidden="true">
    <path
      fill="none"
      stroke="currentColor"
      stroke-width="1.6"
      stroke-linecap="round"
      stroke-linejoin="round"
      d="m3 8.5 3 3 7-7"
    />
  </svg>
);

export const ArrowRightIcon = (props: { class?: string }) => (
  <svg class={props.class} viewBox="0 0 48 24" aria-hidden="true">
    <path
      d="M2 12h40m-8-8 8 8-8 8"
      fill="none"
      stroke="currentColor"
      stroke-width="1.6"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
