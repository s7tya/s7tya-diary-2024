
export const Header = ({ title }: { title: string }) => {
    return (
        <header className="header">
            <h1>
                <a href="/">/{title}</a>
            </h1>
            <nav>
                <a href="/rss.xml">📡 Feed</a>
                <span>|</span>
                <a href={`https://gist.github.com/${Deno.env.get("GIST_ID")}`}>
                    Raw (Gist)
                </a>
            </nav>
        </header>
    )
}