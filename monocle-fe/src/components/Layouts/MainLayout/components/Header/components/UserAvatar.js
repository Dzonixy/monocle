// Utils
import { useSelector } from "react-redux";
import styled from "@emotion/styled";

// Components
import { Image } from "components/Image";

// Selectors
import { selectUser } from "redux/reducers/authReducer";

// Constants
import { FOLLOWING, PROFILE } from "constants/index";

// Hooks
import { useTabActions } from "contexts";

const StyledImage = styled(Image)`
  width: 48px;
  height: 48px;
  margin: 0;
  cursor: pointer;
  border-radius: 50%;
  object-fit: cover;
`;

export function UserAvatar() {
  const { handleChange } = useTabActions();
  const user = useSelector(selectUser);

  function handleClick() {
    handleChange(null, user.role === "CREATOR" ? PROFILE : FOLLOWING);
  }

  return (
    <StyledImage
      imgProps={{ src: user.profileImage, onClick: handleClick }}
      skeletonProps={{ height: 48, width: 48, sx: { borderRadius: "50%" } }}
    />
  );
}
