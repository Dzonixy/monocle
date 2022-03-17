// Service
import {
  useFollowPost,
  useGetPosts,
  useSalePost,
  useCreatePost,
  useBuyPost,
} from "service/posts";

// Hooks
import { useProgress } from "hooks/useProgress";

export function usePost() {
  const [followPost, { isLoading: isFollowPostLoading }] = useFollowPost();
  const [salePost, { isLoading: isSalePostLoading }] = useSalePost();
  const [createPost, { isLoading: isCreatePostLoading }] = useCreatePost();
  const [buyPost, { isLoading: isBuyPostLoading }] = useBuyPost();

  useProgress({
    condition:
      isFollowPostLoading ||
      isSalePostLoading ||
      isCreatePostLoading ||
      isBuyPostLoading,
  });

  return { followPost, salePost, createPost, buyPost };
}

export function useSelectIsFollowedPost({ postId, userId }) {
  const { isFollowed } = useGetPosts(undefined, {
    selectFromResult: ({ data }) => {
      const post = data?.find(({ postId: _postId }) => _postId === postId);

      return {
        isFollowed: Boolean(post?.likes.find((like) => like === userId)),
      };
    },
  });

  return { isFollowed };
}
