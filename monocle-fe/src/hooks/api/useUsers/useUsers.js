// Service
import { useGetUsers } from "service/users";

// Hooks
import { useUsersSelectors } from "./useUsersSelectors";

export function useSelectOwner({ ownerId }) {
  const { selectUser } = useUsersSelectors();
  const { owner, isLoading } = useGetUsers(undefined, {
    selectFromResult: ({ data, isLoading }) => ({
      isLoading,
      owner: selectUser({ data, userId: ownerId }),
    }),
  });

  return { owner, isLoading };
}

export function useSelectUser({ userId }) {
  const { selectUser } = useUsersSelectors();
  const { user, isLoading } = useGetUsers(undefined, {
    selectFromResult: ({ data, isLoading }) => ({
      isLoading,
      user: selectUser({ data, userId }),
    }),
  });

  return { user, isLoading };
}
