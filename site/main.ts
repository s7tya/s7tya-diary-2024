declare const process: {
  env: {
    GIST_ID: string;
  };
};

async function generateSHA256Hash(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);

  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join(
    "",
  );

  return hashHex;
}

(async () => {
  const updateChecker = document.querySelector(".update-checker");
  if (!updateChecker) {
    return;
  }

  const rawMarkdown = await fetch(
    `https://raw.githack.com/gist/${process.env.GIST_ID}`,
  ).then((
    res,
  ) => res.text());
  const minifiedMarkdwon = rawMarkdown.replaceAll(/[\s\t\n]/g, "");

  const latestHash = await generateSHA256Hash(minifiedMarkdwon);
  const currentHash =
    (await fetch(`/meta.json`).then((res) => res.json())).hash;

  if (latestHash != currentHash) {
    updateChecker.innerHTML =
      `<p class="warning">記事の内容に更新があります。最新の情報はGistを確認してください。</p>`;
  }
})();
