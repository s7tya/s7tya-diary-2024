export const layout = "base.tsx"; // 全ページ共通のフロントマター


export default function* ({ search }: Lume.Data) {
    const tags = search.values("tags"); // 全タグを収集

    for (const tag of tags) {
        const links = search.pages(tag as string, "date=desc").map((page) => {

            return (
                <div key={page.url} className="post-card" id={`post-${page.basename}`}>
                    <a href={`./posts/${page.basename}`}>
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

        console.log(links)

        yield {
            title: `${tag}のページ一覧`,
            url: `/tags/${tag}/`,
            content: (<div>
                {links}
            </div>)
        };
    }
}