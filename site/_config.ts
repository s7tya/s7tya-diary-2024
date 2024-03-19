import { load } from "https://deno.land/std@0.220.1/dotenv/mod.ts";
import lume from "lume/mod.ts";
import toml from "lume/plugins/toml.ts";
import metas from "lume/plugins/metas.ts";
import jsx from "lume/plugins/jsx.ts";
import mdx from "lume/plugins/mdx.ts";
import codeHighlight from "lume/plugins/code_highlight.ts";
import feed from "lume/plugins/feed.ts";
import esbuild from "lume/plugins/esbuild.ts";
import lightningCss from "lume/plugins/lightningcss.ts";

await load({ envPath: "../.env", export: true });

const site = lume({ location: new URL(Deno.env.get("BASE_URL")!) });

site.copy("static", "/");

site.use(toml());
site.use(metas({ extensions: [".toml"] }));
site.use(jsx());
site.use(mdx());
site.use(codeHighlight({
  extensions: [".mdx"],
}));
site.use(feed({
  output: ["/rss.xml", "/feed.json"],
  query: "type=post",
  info: {
    title: "=site.title",
    lang: "=site.lang",
  },
  items: {
    title: (data) => {
      return `${data.basename.replaceAll("-", ".")}${
        data.title ? ` ${data.title}` : ""
      }`;
    },
  },
}));
site.use(esbuild({
  options: {
    define: {
      "process.env.GIST_ID": JSON.stringify(Deno.env.get("GIST_ID")),
    },
  },
}));
site.use(lightningCss());

export default site;
