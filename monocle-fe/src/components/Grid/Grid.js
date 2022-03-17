// Components
import { Box } from "@mui/material";
import { Card } from "./components";

// Utils
import { useSelector } from "react-redux";

// Selectors
import { selectUser } from "redux/reducers/authReducer";

export function Grid({ items, openPostDetails, profile, market, explore }) {
  const user = useSelector(selectUser);

  return (
    <Box display="grid" gridTemplateColumns="1fr 1fr 1fr" gap="15px" px={2}>
      {items.map((post) => {
        const disabled = user.id === post.owner && market;
        const enableClick =
          openPostDetails && ((!post.onSale && profile) || market || explore);

        return (
          <Card
            key={post.postId}
            disabled={disabled}
            showTag={profile && post.onSale}
            {...post}
            {...(enableClick && {
              onClick: () => openPostDetails(post.postId),
            })}
          />
        );
      })}
    </Box>
  );
}
