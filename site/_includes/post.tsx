import { Head } from "../_components/Head.tsx";
import { Header } from "../_components/Header.tsx";

export default ({ title, children, tags, search, url }: Lume.Data, helpers: Lume.Helpers) => {

    const previousPage = search.previousPage(url, "type=post");
    const nextPage = search.nextPage(url, "type=post");

    return (
        <html>
            <Head title={title!} />
            <body>
                <div className="root">
                    <Header />
                    <main>
                        {children}
                    </main>
                    <aside className="tags">
                        {tags.map((tag) => (<a href={`/tags/${tag}`} className="tag">{tag}</a>))}
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
