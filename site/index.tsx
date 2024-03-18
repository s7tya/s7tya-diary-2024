import { Activity } from "./_components/Activity.tsx";
import { PostList } from "./_components/PostList.tsx";
import site from "./_config.ts";

export default function () {
  const sortedPages = site.pages.filter((page) => page.data.url.startsWith("/posts/")).sort(
    (a, b) => {
      return b.data.date.getTime() - a.data.date.getTime();
    },
  )

  const sortedPageDates = sortedPages.map((page) => page.data.date.toISOString().slice(0, 10));

  return (
    <>
      <div className="meta">
        <div className="update-checker"></div>
        <Activity dates={sortedPageDates} />
      </div>
      <PostList pages={sortedPages} />
    </>
  );
}
