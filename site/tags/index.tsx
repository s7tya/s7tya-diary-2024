import { Activity } from "../_components/Activity.tsx";
import { PostList } from "../_components/PostList.tsx";
import site from "../_config.ts";

export const layout = "collection.tsx";

export default function* ({ search }: Lume.Data) {
  const tags: string[] = search.values("tags");

  const sortedPages = site.pages.filter((page) =>
    page.data.url.startsWith("/posts/")
  ).sort(
    (a, b) => {
      return b.data.date.getTime() - a.data.date.getTime();
    },
  );

  for (const tag of tags) {
    const pages = sortedPages.filter((page) => page.data.tags.includes(tag));
    const dates = pages.map((page) =>
      page.data.date.toISOString().slice(0, 10)
    );

    yield {
      title: `${tag}`,
      url: `/tags/${tag}/`,
      content: (
        <main>
          <div className="meta">
            <hgroup className="title">
              <p className="prefix">/tags</p>
              <h1>{tag}</h1>
            </hgroup>
            <Activity dates={dates} />
          </div>
          <PostList pages={pages} />
        </main>
      ),
    };
  }
}
