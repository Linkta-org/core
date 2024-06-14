/// <reference types="vite/client" />

type ImportMetaEnv = {
  readonly VITE_TEST_VAR0: string;
  readonly VITE_TEST_VAR1: string
  readonly VITE_TEST_VAR2: string,
  readonly VITE_TEST_VAR3: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}