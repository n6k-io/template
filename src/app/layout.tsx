// Root layout — wraps every .mdx page (the build auto-discovers layout.tsx and
// nests them from app dir down). Applies the default centered prose column; a
// page can replace the <main> classes via `mainClassName` in its frontmatter
// (e.g. `mainClassName: w-full` for a full-bleed dashboard).
export default function Layout({
  children,
  meta,
}: {
  children: React.ReactNode;
  meta?: Record<string, string>;
}) {
  return (
    <main
      className={meta?.mainClassName ?? "mx-auto max-w-3xl space-y-4 p-8 prose"}
    >
      {children}
    </main>
  );
}
