// eslint-plugin-mdx builds its remark pipeline from this config. It must mirror
// the plugins the n6k build uses (build/src/pipeline/preprocess.ts) so the
// linter parses the same syntax:
//   - remark-frontmatter: the `---` YAML block, else `{ }` inside it (e.g.
//     weather/mdx's `attach`) is fed to acorn as an expression and fails.
//   - remark-directive: `::Slider[sims]{…}` control directives, else the `{…}`
//     attribute block is parsed as an MDX expression and fails to parse.
export default {
  plugins: ["remark-frontmatter", "remark-directive"],
};
