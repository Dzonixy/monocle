// Components
import { Box } from "@mui/material";
import { Image } from "components/Image";
import { Typography } from "components/Typography";

// Utils
import styled from "@emotion/styled";

const Chip = styled.span`
  height: 20px;
  border: 2px solid;
  border-color: ${({ theme }) => theme.palette.custom.black};
  background-color: ${({ theme }) => theme.palette.custom.white};
  border-radius: 10px;
  font-size: 8px;
  padding: 4px 8px;
  font-weight: 800;
  position: absolute;
  display: flex;
  align-items: center;
  top: 5px;
  right: 10px;
`;

export function Card({ image, title, onClick, showTag, disabled }) {
  return (
    <Box
      onClick={onClick}
      sx={{
        cursor: showTag ? "default" : "pointer",
        pointerEvents: showTag || disabled ? "none" : "auto",
        position: "relative",
        opacity: disabled ? 0.4 : 1,
        img: {
          aspectRatio: "1 / 1",
          objectFit: "cover",
        },
      }}
    >
      {showTag && <Chip>For Sale</Chip>}
      <Image
        imgProps={{ src: image }}
        skeletonProps={{
          width: "100%",
          height: "100%",
          sx: {
            aspectRatio: "1 / 1",
            borderRadius: 2,
          },
        }}
      />
      <Typography sx={{ fontSize: 15, fontWeight: 800, marginTop: 0.5 }}>
        {title}
      </Typography>
    </Box>
  );
}
