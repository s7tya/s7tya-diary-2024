export default ({ title, children }: Lume.Data, helpers: Lume.Helpers) => {
    return (
        <html>
            <head>
                <title>{title}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="stylesheet" href="https://unpkg.com/ress/dist/ress.min.css" />
                <link rel="stylesheet" href="/styles.css" />
            </head>
            <body>
                <header className="header">
                    <h1><a href="/">/s7tya-diary-2024</a></h1>
                </header>
                {children}
            </body>
        </html>
    )
};