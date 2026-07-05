// Ambient declarations for build-time virtual modules the n6k build injects.
// `virtual:n6k-workers` resolves to the DuckDB driver worker script URLs (see
// @n6k.io/build's n6k-workers.d.ts); it only exists during the build, so TS
// needs this declaration to typecheck the source that imports it.
declare module "virtual:n6k-workers" {
  export const duckdbWorkerUrl: string;
  export const fetchWorkerUrl: string;
  export const wsWorkerUrl: string;
}

// `virtual:n6k-duckdb-bundle` resolves to the self-hosted duckdb-wasm runtime
// bundle (see @n6k.io/build's n6k-duckdb-bundle.d.ts), so the DuckDB engine loads
// from our own origin instead of cdn.jsdelivr.net. Shape matches
// `@duckdb/duckdb-wasm`'s `DuckDBBundle`, so it passes straight to
// `duckdbOptions.bundle`.
declare module "virtual:n6k-duckdb-bundle" {
  export const duckdbBundle: {
    mainModule: string;
    mainWorker: string | null;
    pthreadWorker: string | null;
  };
}
