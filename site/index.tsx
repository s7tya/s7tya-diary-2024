import site from "./_config.ts"

export default function () {
    return <div style={{ "max-width": "800px", "margin-inline": "auto" }}>
        <h1>s7tya-diary-2024</h1>
        <div>
            {site.pages.filter((page) => page.data.url.startsWith("/posts/")).map((page) => {
                const paragraphs = (page.data.content as string).split("\n\n");

                return <div>
                    <a href={page.data.url} style={{ "text-decoration": "none", "color": "black" }}>
                        <h2>{page.data.basename}</h2>
                        <p>{paragraphs[1].slice(undefined, 80)}{paragraphs[1].length > 80 || paragraphs.length > 2 ? "..." : ""}</p>
                    </a>
                </div>
            })}
        </div>
    </div>
}