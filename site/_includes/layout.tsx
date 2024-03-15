export default ({ title, GIST_ID, children }: Lume.Data, helpers: Lume.Helpers) => {
    return (
        <html>
            <head>
                <title>{title}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="stylesheet" href="https://unpkg.com/ress/dist/ress.min.css" />
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.2/dist/katex.css" />
                <link rel="stylesheet" href="/styles.css" />
                <script defer data-domain="diary.s7tya.com" src="https://plausible.chitose.shina.dev/js/script.js"></script>
            </head>
            <body>
                <div className="root">
                    <header className="header">
                        <h1><a href="/">/s7tya-diary-2024</a></h1>
                        <nav>
                            <a href="/rss.xml">📡 Feed</a>
                            <span>|</span>
                            <a href={`https://gist.github.com/${Deno.env.get("GIST_ID")}`}>Raw (Gist)</a>
                        </nav>
                    </header>
                    <main>
                        {children}
                    </main>
                </div>
            </body>
        </html>
    )
};