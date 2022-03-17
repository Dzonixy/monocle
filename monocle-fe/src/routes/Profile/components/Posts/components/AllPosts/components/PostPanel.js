import { useState } from "react";

// Components
import { Box } from "@mui/material";
import {
  Image,
  Input,
  Button,
  Typography,
  Switch,
  Modal,
  PanelWrapper,
  Loading,
} from "components";

// Hooks
import { useDrawerActions } from "contexts";

// Utils
import styled from "@emotion/styled";

// Service
import { useGetPost } from "service/posts";

// Hooks
import { usePost } from "hooks";

const StyledImage = styled(Image)`
  aspect-ratio: 1 / 1;
  object-fit: cover;
`;

export function PostPanel({ postId }) {
  const [modalOpen, setModalOpen] = useState(false);
  const { data: post, isLoading } = useGetPost(postId);
  const [data, setData] = useState({ price: null, onSale: true });
  const { setOpen } = useDrawerActions();
  const { salePost } = usePost();

  if (isLoading) {
    return <Loading />;
  }

  function handlePanelClose() {
    setOpen(false);
  }

  function handleChange(value, field) {
    setData((prevData) => ({ ...prevData, [field]: value }));
  }

  async function submitAction() {
    await salePost({ postId, ...data });
    handlePanelClose();
    setModalOpen(false);
  }

  function handleClick() {
    setModalOpen(true);
  }

  return (
    <PanelWrapper>
      <StyledImage imgProps={{ src: post.image }} />
      <Box mt={2.5} display="flex" width="100%" justifyContent="space-between">
        <Typography sx={{ fontSize: "21px", fontWeight: 800 }}>
          Mark for sale
        </Typography>
        <Switch
          checked={data.onSale}
          onChange={(e) => handleChange(e.target.checked, "onSale")}
        />
      </Box>
      <Input
        placeholder="Set Price"
        onChange={(e) => handleChange(e.target.value, "price")}
        value={data.price || ""}
        type="number"
        sx={{ marginTop: 1.5, marginBottom: 2.5 }}
      />
      <Button
        text="Sell"
        withIcon
        buttonProps={{
          disabled: Boolean(Object.keys(data).find((k) => !data[k])),
          onClick: handleClick,
        }}
        sx={{ height: 60, borderRadius: 4 }}
      />
      <Modal
        open={modalOpen}
        submitAction={submitAction}
        cancelAction={() => setModalOpen(false)}
        title="Are you sure?"
        message="Once your post is on the market place it can be sold"
      />
    </PanelWrapper>
  );
}
