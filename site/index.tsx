import { Activity } from "./_components/Activity.tsx";
import site from "./_config.ts";

export default function () {
  const sortedPages = site.pages.filter((page) => page.data.url.startsWith("/posts/")).sort(
    (a, b) => {
      return b.data.date.getTime() - a.data.date.getTime();
    },
  )

  const sortedPageDates = sortedPages.map((page) => page.data.date.toISOString().slice(0, 10));

  return (
    <>
      <div className="meta">
        <div className="update-checker"></div>
        <Activity dates={sortedPageDates} />
      </div>
      <div className="post-list">
        {sortedPages.map(
          (page) => {
            const paragraphs = (page.data.content as string).split("\n\n");

            return (
              <div key={page.data.url} className="post-card" id={`post-${page.data.basename}`}>
                <a href={`./posts/${page.data.basename}`}>
                  <h2 className="post-title">
                    {page.data.basename.replaceAll("-", ".")}
                    {page.data.title ? ` ${page.data.title}` : ""}
                  </h2>
                  <p>
                    {paragraphs[1].slice(undefined, 80).replace("\\n", "")}
                    {paragraphs[1].length > 80 || paragraphs.length > 2
                      ? "..."
                      : ""}
                  </p>
                </a>
              </div>
            );
          },
        )}
      </div>
    </>
  );
}
