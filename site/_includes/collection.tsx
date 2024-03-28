export const layout = "base.tsx";

export default (
  { children, search }: Lume.Data,
  helpers: Lume.Helpers,
) => {
  const tags: string[] = search.values("tags");

  return (
    <>
      <main>
        {children}
      </main>
      <aside className="tags">
        {tags.map((tag) => (
          <a key={`tag-${tag}`} href={`/tags/${tag}`} className="tag">
            {tag} ({search.pages(`type=post ${tag}`).length})
          </a>
        ))}
      </aside>
    </>
  );
};
