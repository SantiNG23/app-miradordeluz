/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_API_URL: string;
  readonly PRIVATE_QUOTE_TENANT_SLUG: string;
  readonly PRIVATE_QUOTE_TOKEN: string;
  readonly PRIVATE_QUOTE_USE_MOCK: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  dataLayer: any[];
}
