// Utils
import styled from "@emotion/styled";

// Components
import { Image, Loading, LoginLayout, Typography } from "components";

// Constants
import { LOGIN_SUBTITLE } from "constants/index";

// Hooks
import { useAuthentication } from "hooks";
import { useWallet } from "@solana/wallet-adapter-react";
import { useSelectUser } from "hooks/api/useUsers/useUsers";

const loginImgSrc = require("assets/images/login.png");

const StyledImage = styled(Image)`
  max-width: 400px;
  width: auto;
`;

function Login() {
  const { publicKey } = useWallet();
  const { user, isLoading } = useSelectUser({ userId: publicKey?.toBase58() });
  const { handleLogin } = useAuthentication(user);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <LoginLayout buttonAction={handleLogin} loginEnabled={user}>
      <StyledImage
        imgProps={{ src: loginImgSrc }}
        boxProps={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          maxHeight: "calc(100% - 385px)",
          marginTop: "40px",
        }}
        skeletonProps={{
          width: "100%",
          height: "100%",
          sx: {
            aspectRatio: "1 / 1",
            borderRadius: 2,
          },
        }}
      />
      <Typography
        variant="h4"
        sx={{
          fontSize: 40,
          fontWeight: 800,
          marginTop: "40px",
          maxWidth: 200,
          marginRight: "auto",
        }}
      >
        {LOGIN_SUBTITLE}
      </Typography>
    </LoginLayout>
  );
}

export default Login;
