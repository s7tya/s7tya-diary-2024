import site from "./_config.ts";

export default function () {
  return (
    <>
      <div className="post-list">
        {site.pages.filter((page) => page.data.url.startsWith("/posts/")).map(
          (page) => {
            const paragraphs = (page.data.content as string).split("\n\n");

            return (
              <div key={page.data.url} className="post-card">
                <a href={`./posts/${page.data.basename}`}>
                  <h2 className="post-title">{page.data.title}</h2>
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
