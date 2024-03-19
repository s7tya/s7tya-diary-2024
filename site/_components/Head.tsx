export const Head = ({ title }: { title: string }) => {
  return (
    <head>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap"
        rel="stylesheet"
      />

      <link
        rel="stylesheet"
        href="https://unpkg.com/ress/dist/ress.min.css"
      />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/katex@0.16.2/dist/katex.css"
      />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.6.0/build/styles/nord.min.css"
      />
      <link rel="stylesheet" href="/styles.css" />
      <script
        defer
        data-domain="diary.s7tya.com"
        src="https://plausible.chitose.shina.dev/js/script.js"
      >
      </script>
    </head>
  );
};
