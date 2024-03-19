import { Data } from "lume/core/file.ts";
import site from "../_config.ts";

export const layout = "base.tsx";

export default (
  { children, tags, search, url, date }: Lume.Data,
  helpers: Lume.Helpers,
) => {
  const previousPage = search.previousPage(url, "type=post");
  const nextPage = search.nextPage(url, "type=post");

  const aYearAgoDate = Temporal.PlainDate.from(date.toISOString().slice(0, 10))
    .subtract({ years: 1 }).toString();
  const aYearAgoPage: Data | undefined = site.pages.find((page) =>
    page.data.type === "post" &&
    page.data.date.toISOString().slice(0, 10) == aYearAgoDate
  )?.data;

  return (
    <>
      <main>
        {children}
      </main>
      <aside className="tags">
        {tags.map((tag) => (
          <a key={`tag-${tag}`} href={`/tags/${tag}`} className="tag">
            {tag}
          </a>
        ))}
      </aside>
      <aside className="pagination">
        <div className="previous">
          {previousPage && (
            <a href={previousPage.url}>
              <span>
                ← {previousPage.date.toISOString().slice(0, 10).replaceAll(
                  "-",
                  ".",
                )}
              </span>
              <span>
                {previousPage.title ? ` ${previousPage.title}` : ""}
              </span>
            </a>
          )}
        </div>
        <div className="a-year-ago">
          {aYearAgoPage && (
            <a href={aYearAgoPage.url}>
              <span>
                {aYearAgoPage.date.toISOString().slice(0, 10).replaceAll(
                  "-",
                  ".",
                )}
              </span>
              <span>
                {aYearAgoPage.title ? ` ${aYearAgoPage.title}` : ""}
              </span>
            </a>
          )}
        </div>
        <div className="next">
          {nextPage && (
            <a href={nextPage.url}>
              <span>
                {nextPage.date.toISOString().slice(0, 10).replaceAll(
                  "-",
                  ".",
                )}
              </span>
              <span>{nextPage.title ? ` ${nextPage.title}` : ""} →</span>
            </a>
          )}
        </div>
      </aside>
    </>
  );
};
