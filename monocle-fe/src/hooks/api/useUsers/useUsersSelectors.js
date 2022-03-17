import { useMemo } from "react";

// Utils
import { createSelector } from "@reduxjs/toolkit";

export function useUsersSelectors() {
  const selectUser = useMemo(
    () =>
      createSelector(
        (args) => args,
        ({ data, userId }) => data?.find(({ id }) => id === userId) || null
      ),
    []
  );

  return { selectUser };
}
