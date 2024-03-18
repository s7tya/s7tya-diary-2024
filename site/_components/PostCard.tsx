import { Data, Page } from "lume/core/file.ts";

export const PostCard = ({ page }: { page: Page<Data> }) => {
    const paragraphs = (page.data.content as string).split("\n\n");

    return (
        <div key={page.data.url} className="post-card" id={`post-${page.data.basename}`}>
            <a href={`/posts/${page.data.basename}`}>
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
    )
}