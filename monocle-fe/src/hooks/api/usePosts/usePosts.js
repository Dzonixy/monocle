// Service
import { useGetPosts } from "service/posts";

// Hooks
import { usePostsSelectors } from "./usePostsSelectors";

export function usePostsCount({ userId }) {
  const { selectPostsCount } = usePostsSelectors();
  const { postsCount } = useGetPosts(undefined, {
    selectFromResult: ({ data }) => ({
      postsCount: selectPostsCount({ data, userId }),
    }),
  });

  return { postsCount };
}

export function useFollowingPosts({ userId }) {
  const { selectFollowingPosts } = usePostsSelectors();
  const { followingPosts, isLoading } = useGetPosts(undefined, {
    selectFromResult: ({ data, isLoading }) => ({
      followingPosts: selectFollowingPosts({ data, userId }),
      isLoading,
    }),
  });

  return { followingPosts, isLoading };
}

export function useOnSalePosts() {
  const { selectOnSalePosts } = usePostsSelectors();
  const { onSalePosts, isLoading } = useGetPosts(undefined, {
    selectFromResult: ({ data, isLoading }) => ({
      onSalePosts: selectOnSalePosts({ data }),
      isLoading,
    }),
  });

  return { onSalePosts, isLoading };
}

export function useOnSaleByUserPosts({ userId }) {
  const { selectOnSaleByUserPosts } = usePostsSelectors();
  const { onSaleByUserPosts, isLoading } = useGetPosts(undefined, {
    selectFromResult: ({ data, isLoading }) => ({
      onSaleByUserPosts: selectOnSaleByUserPosts({ data, userId }),
      isLoading,
    }),
  });

  return { onSaleByUserPosts, isLoading };
}

export function useUserPosts({ userId }) {
  const { selectUserPosts } = usePostsSelectors();
  const { userPosts, isLoading } = useGetPosts(undefined, {
    selectFromResult: ({ data, isLoading }) => ({
      userPosts: selectUserPosts({ data, userId }),
      isLoading,
    }),
  });

  return { userPosts, isLoading };
}
