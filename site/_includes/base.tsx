import { Head } from "../_components/Head.tsx";
import { Header } from "../_components/Header.tsx";

export default ({ title, children, search, site }: Lume.Data, helpers: Lume.Helpers) => {

  const tags: string[] = search.values("tags");

  return (
    <html>
      <Head title={title!} />
      <body>
        <div className="root">
          <Header title={site.title} />
          <main>
            {children}
          </main>
          <aside className="tags">
            {tags.map((tag) => (<a key={`tag-${tag}`} href={`/tags/${tag}`} className="tag">{tag}</a>))}
          </aside>
        </div>
        <script src="/main.js" />
      </body>
    </html>
  );
};
