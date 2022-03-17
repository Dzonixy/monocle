// Components
import { Box } from "@mui/material";
import { AddOutlined } from "@mui/icons-material";
import { Image, Typography } from "components";

// Utils
import styled from "@emotion/styled";
import { useState } from "react";

const Input = styled.input`
  display: none;
`;

const Label = styled.label`
  width: 100%;
  height: 100%;
  border-radius: 16px;
  border: ${({ noBorder, theme }) =>
    noBorder ? "none" : `2px solid ${theme.palette.custom.black}`};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const StyledImage = styled(Image)`
  object-fit: cover;
  height: 100%;
  border-radius: 0;
`;

export function FileUploader({ file, setFile }) {
  function handleUpload(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    const url = reader.readAsDataURL(file);

    reader.onloadend = () =>
      setFile((data) => ({ ...data, file: reader.result }));
  }

  return (
    <Box
      display="flex"
      maxWidth={520}
      maxHeight={520}
      width="100%"
      height="calc(100vw - 80px)"
    >
      <Input
        accept="image/*"
        type="file"
        id="file-uploader"
        onChange={handleUpload}
      />
      <Label htmlFor="file-uploader" noBorder={file}>
        {file ? (
          <StyledImage imgProps={{ src: file }} boxProps={{ height: "100%" }} />
        ) : (
          <>
            <AddOutlined fontSize="large" />
            <Typography sx={{ fontWeight: 800 }}>Add</Typography>
          </>
        )}
      </Label>
    </Box>
  );
}
