import type { ReactNode } from "react";
import { duckdbWorkerUrl, fetchWorkerUrl, wsWorkerUrl } from "virtual:n6k-workers";
import { duckdbBundle } from "virtual:n6k-duckdb-bundle";
import { QueryProvider, DuckDBProvider } from "@n6k.io/db/react";
import type { DatabaseSpec } from "@n6k.io/db/react";
import { DuckDBConnectionGuard } from "@n6k.io/ui/lib/providers/duckdb-connection-guard";

// Provider shell wrapping every page. The build injects `databases` per page
// (each page's own database as the relative alias `page`, plus any shared
// databases). Worker URLs come from the build's `virtual:n6k-workers` module.
export default function Root({
  children,
  databases,
}: {
  children: ReactNode;
  databases?: Record<string, DatabaseSpec>;
}) {
  return (
    <QueryProvider>
      <DuckDBProvider
        databases={databases}
        duckdbOptions={{
          bundle: duckdbBundle,
          duckdbWorkerUrl,
          fetchWorkerUrl,
          wsWorkerUrl,
        }}
      >
        <DuckDBConnectionGuard>{children}</DuckDBConnectionGuard>
      </DuckDBProvider>
    </QueryProvider>
  );
}
