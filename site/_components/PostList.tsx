import { Data, Page } from "lume/core/file.ts";
import { PostCard } from "./PostCard.tsx";

export const PostList = ({ pages }: { pages: Page<Data>[] }) => {
    return (
        <div className="post-list">
            {pages.map(
                (page) => {
                    return (
                        <PostCard page={page} />
                    );
                },
            )}
        </div>
    )
}