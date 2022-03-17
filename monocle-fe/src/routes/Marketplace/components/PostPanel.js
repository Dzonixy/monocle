import { useState } from "react";

// Components
import { Favorite } from "@mui/icons-material";
import { Box } from "@mui/material";
import {
  Image,
  Button,
  Modal,
  Typography,
  PanelWrapper,
  Loading,
} from "components";

// Hooks
import { useDrawerActions, useLinearProgressContext } from "contexts";
import { usePost, useTransaction } from "hooks";

// Utils
import { useSelector } from "react-redux";
import styled from "@emotion/styled";

// Selectors
import { selectUser } from "redux/reducers/authReducer";

// Service
import { useGetPost } from "service/posts";

// Hooks
import { useSelectOwner } from "hooks/api/useUsers/useUsers";
import { useToastContext } from "contexts/ToastContext/ToastContext";

const StyledImage = styled(Image)`
  aspect-ratio: 1 / 1;
  object-fit: cover;
`;

export function PostPanel({ postId }) {
  const { openToast } = useToastContext();
  const { handleTransaction } = useTransaction();
  const [modalOpen, setModalOpen] = useState(false);
  const { data: post, isLoading } = useGetPost(postId);
  const { owner, isLoading: isOwnerLoading } = useSelectOwner({
    ownerId: post?.owner,
  });
  const { setProgress } = useLinearProgressContext();
  const user = useSelector(selectUser);
  const { setOpen } = useDrawerActions();
  const { buyPost } = usePost();

  if (isLoading || isOwnerLoading) {
    return <Loading />;
  }

  function handlePanelClose() {
    setOpen(false);
  }

  async function submitAction() {
    try {
      setProgress(true);
      const result = await handleTransaction({
        title: post.title,
        likes: post.likes.length,
      });
      await buyPost({ postId, buyerId: user.id });
      handlePanelClose();
      setModalOpen(false);
      setProgress(false);
      openToast({
        message: "Purchase successful!",
        subtitle: `Token <span>${result.token.toBase58()}</span> was succesfully bought in transaction <span>${
          result.buyTx
        }</span>`,
      });
    } catch (e) {
      console.log(e);
      setProgress(false);
    }
  }

  function handleClick() {
    setModalOpen(true);
  }

  return (
    <PanelWrapper>
      <StyledImage imgProps={{ src: post.image }} />
      <Box
        height={56}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ ".MuiSvgIcon-root": { color: "custom.redMain", fontSize: 40 } }}
      >
        <Typography sx={{ fontSize: 18, fontWeight: 800 }}>
          {owner?.username}
        </Typography>
        {post.likes.length ? (
          <Box display="flex" alignItems="center" my={1}>
            <Typography
              sx={{ marginRight: 1.5, fontSize: 21, fontWeight: 500 }}
            >
              {post.likes.length}
            </Typography>
            <Favorite />
          </Box>
        ) : null}
      </Box>
      <Typography sx={{ fontSize: 36, fontWeight: 800 }}>
        {post.title}
      </Typography>
      <Typography sx={{ fontSize: 21, fontWeight: 500, marginBottom: 2.5 }}>
        {post.description}
      </Typography>
      <Typography sx={{ fontSize: 36, fontWeight: 800, marginBottom: 2 }}>
        {`$${post.price}`}
      </Typography>
      <Button
        text="Add to profile"
        withIcon
        buttonProps={{
          onClick: handleClick,
        }}
        sx={{ height: 60, borderRadius: 4 }}
      />
      <Modal
        open={modalOpen}
        submitAction={submitAction}
        cancelAction={() => setModalOpen(false)}
        title="Are you sure you want to buy this post?"
      />
    </PanelWrapper>
  );
}
