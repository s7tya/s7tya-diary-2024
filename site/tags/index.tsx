import { Activity } from "../_components/Activity.tsx";

export const layout = "base.tsx";

export default function* ({ search }: Lume.Data) {
    const tags: string[] = search.values("tags");

    for (const tag of tags) {
        const pages = search.pages(tag as string, "date=desc");
        const dates = pages.map((page) => page.date.toISOString().slice(0, 10));

        const Links = pages.map((page) => {
            return (
                <div key={page.url} className="post-card" id={`post-${page.basename}`}>
                    <a href={`/posts/${page.basename}`}>
                        <h2 className="post-title">
                            {page.basename.replaceAll("-", ".")}
                            {page.title ? ` ${page.title}` : ""}
                        </h2>
                        <p>
                            {/* {paragraphs[1].slice(undefined, 80).replace("\\n", "")}
                            {paragraphs[1].length > 80 || paragraphs.length > 2
                                ? "..."
                                : ""} */}
                        </p>
                    </a>
                </div>)
        });

        yield {
            title: `${tag}のページ一覧`,
            url: `/tags/${tag}/`,
            content: (
                <div>
                    <h1>/tags/{tag}</h1>
                    <Activity dates={dates} />
                    {Links}
                </div>
            )
        };
    }
}