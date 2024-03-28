import { Data, Page } from "lume/core/file.ts";

export const PostCard = ({ page }: { page: Page<Data> }) => {
  const paragraphs = (page.data.content as string).split("\n\n");

  let overview = paragraphs[1].trim().slice(undefined, 80).replace("\\n", "");
  if (overview.endsWith("。")) overview = overview.slice(0, -1);

  return (
    <div className="post-card" id={`post-${page.data.basename}`}>
      <a href={`/posts/${page.data.basename}`}>
        <h2 className="post-title">
          {page.data.basename.replaceAll("-", ".")}
          {page.data.title ? ` ${page.data.title}` : ""}
        </h2>
        <p>
          {overview}
          {paragraphs[1].length > 80 || paragraphs.length > 2 ? "..." : ""}
        </p>
      </a>
    </div>
  );
};
