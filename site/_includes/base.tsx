import { Head } from "../_components/Head.tsx";

export default ({ title, children, search }: Lume.Data, helpers: Lume.Helpers) => {

  const tags: string[] = search.values("tags");

  return (
    <html>
      <Head title={title!} />
      <body>
        <div className="root">
          <header className="header">
            <h1>
              <a href="/">/s7tya-diary-2024</a>
            </h1>
            <nav>
              <a href="/rss.xml">📡 Feed</a>
              <span>|</span>
              <a href={`https://gist.github.com/${Deno.env.get("GIST_ID")}`}>
                Raw (Gist)
              </a>
            </nav>
          </header>
          <main>
            {children}
          </main>
          <aside>
            {tags.map((tag) => (<a href={`/tags/${tag}`}>{tag}</a>))}
          </aside>
        </div>
        <script src="/main.js" />
      </body>
    </html>
  );
};
