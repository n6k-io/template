export {};

// mdx-analyzer types bare MDX tags (`<BarChart …>` used with no import) from
// this global. Pointing it at the @n6k.io/ui component set makes every bare
// chart/stat tag carry its real, seam-aware prop types — so `bun run typecheck`
// validates data=/x=/y= bindings on bare tags, not just explicitly-imported ones.
declare global {
  type MDXProvidedComponents = typeof import("@n6k.io/ui/components");
}
