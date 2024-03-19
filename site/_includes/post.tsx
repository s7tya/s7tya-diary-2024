import { Data } from "lume/core/file.ts";
import { Head } from "../_components/Head.tsx";
import { Header } from "../_components/Header.tsx";
import site from "../_config.ts"

export default ({ title, children, tags, search, url, date, site: siteData }: Lume.Data, helpers: Lume.Helpers) => {

    const previousPage = search.previousPage(url, "type=post");
    const nextPage = search.nextPage(url, "type=post");

    const aYearAgoDate = Temporal.PlainDate.from(date.toISOString().slice(0, 10)).subtract({ years: 1 }).toString()
    const aYearAgoPage: (Data | undefined) = site.pages.find((page) => page.data.type === "post" && page.data.date.toISOString().slice(0, 10) == aYearAgoDate)?.data;

    return (
        <html>
            <Head title={title!} />
            <body>
                <div className="root">
                    <Header title={siteData.title} />
                    <main>
                        {children}
                    </main>
                    <aside className="tags">
                        {tags.map((tag) => (<a key={`tag-${tag}`} href={`/tags/${tag}`} className="tag">{tag}</a>))}
                    </aside>
                    <aside className="pagination">
                        <div className="previous">
                            {previousPage && (
                                <a href={previousPage.url}>
                                    ← {previousPage.date.toISOString().slice(0, 10).replaceAll("-", ".")}
                                    {previousPage.title ? ` ${previousPage.title}` : ""}
                                </a>
                            )}
                        </div>
                        <div className="a-year-ago">
                            {aYearAgoPage && (
                                <a href={aYearAgoPage.url}>
                                    {aYearAgoPage.date.toISOString().slice(0, 10).replaceAll("-", ".")}
                                    {aYearAgoPage.title ? ` ${aYearAgoPage.title}` : ""}
                                </a>
                            )}
                        </div>
                        <div className="next">
                            {nextPage && (
                                <a href={nextPage.url}>
                                    {nextPage.date.toISOString().slice(0, 10).replaceAll("-", ".")}
                                    {nextPage.title ? ` ${nextPage.title}` : ""} →
                                </a>
                            )}
                        </div>
                    </aside>
                </div>
            </body>
        </html>
    );
};
