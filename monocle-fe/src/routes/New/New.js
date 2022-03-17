import { useState } from "react";

// Components
import { Box } from "@mui/material";
import { Button, Input, BackButton } from "components";
import { FileUploader } from "./components";

// Utils
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

// Selectors
import { selectUser } from "redux/reducers/authReducer";

// Hooks
import { useTabActions } from "contexts";
import { usePost } from "hooks";

function New() {
  const location = useLocation();
  const { handleChange: handleNavigate } = useTabActions();
  const user = useSelector(selectUser);
  const [data, setData] = useState({
    file: null,
    title: "",
    description: "",
    fileArray: [],
  });
  const { createPost } = usePost();

  function handleChange(e, field) {
    setData((data) => ({ ...data, [field]: e.target.value }));
  }

  function handleNavigateBack() {
    handleNavigate(null, location?.state?.from);
  }

  async function handleClick() {
    await createPost({
      userId: user.id,
      title: data.title,
      description: data.description,
    });

    handleNavigateBack();
  }

  return (
    <Box
      px={5}
      height="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <BackButton onClick={handleNavigateBack} />
      <FileUploader file={data.file} setFile={setData} />
      <Input
        value={data.title}
        onChange={(e) => handleChange(e, "title")}
        placeholder="Add title"
        sx={{ marginTop: 2.75, marginBottom: 1.25 }}
      />
      <Input
        value={data.description}
        onChange={(e) => handleChange(e, "description")}
        placeholder="Add description"
        sx={{ marginBottom: 2.5 }}
      />
      <Button
        withIcon
        text="Add"
        sx={{ marginBottom: 2.5 }}
        buttonProps={{
          disabled: Boolean(Object.keys(data).find((k) => !data[k])),
          onClick: handleClick,
        }}
      />
    </Box>
  );
}

export default New;
