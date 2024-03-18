
export const Header = () => {
    return (
        <header className="header">
            <h1>
                <a href="/">/s7tya-diary-2024</a>
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