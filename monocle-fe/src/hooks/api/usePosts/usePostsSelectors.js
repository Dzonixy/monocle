import { useMemo } from "react";

// Utils
import { createSelector } from "@reduxjs/toolkit";

export function usePostsSelectors() {
  const selectPostsCount = useMemo(
    () =>
      createSelector(
        (args) => args,
        ({ data, userId }) =>
          data?.filter(({ owner }) => owner === userId).length || 0
      ),
    []
  );

  const selectFollowingPosts = useMemo(
    () =>
      createSelector(
        (args) => args,
        ({ data, userId }) =>
          data?.filter(({ likes }) => likes.find((like) => like === userId)) ||
          []
      ),
    []
  );

  const selectOnSalePosts = useMemo(
    () =>
      createSelector(
        (args) => args,
        ({ data }) => data?.filter(({ onSale }) => onSale) ?? []
      ),
    []
  );

  const selectOnSaleByUserPosts = useMemo(
    () =>
      createSelector(
        (args) => args,
        ({ data, userId }) =>
          data?.filter(({ owner, onSale }) => owner === userId && onSale) || []
      ),
    []
  );

  const selectUserPosts = useMemo(
    () =>
      createSelector(
        (args) => args,
        ({ data, userId }) =>
          data?.filter(({ owner }) => owner === userId) || []
      ),
    []
  );

  return {
    selectPostsCount,
    selectFollowingPosts,
    selectOnSalePosts,
    selectOnSaleByUserPosts,
    selectUserPosts,
  };
}
