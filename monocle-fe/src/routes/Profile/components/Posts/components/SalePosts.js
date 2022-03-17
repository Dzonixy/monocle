// Components
import { Grid, Loading } from "components";

// Utils
import { useSelector } from "react-redux";

// Selectors
import { selectUser } from "redux/reducers/authReducer";

// Hooks
import { useOnSaleByUserPosts } from "hooks";

export function SalePosts() {
  const user = useSelector(selectUser);
  const { onSaleByUserPosts, isLoading } = useOnSaleByUserPosts({
    userId: user?.id,
  });

  if (isLoading) {
    return <Loading />;
  }

  return <Grid items={onSaleByUserPosts} />;
}
