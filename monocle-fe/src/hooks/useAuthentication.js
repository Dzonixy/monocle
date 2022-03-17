// Utils
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// Actions
import { setCredentials } from "redux/reducers/authReducer";

// Constants
import { MARKETPLACE, EXPLORE } from "constants/index";

// Hooks
import { useWallet } from "@solana/wallet-adapter-react";

export function useAuthentication(user) {
  const { disconnect } = useWallet();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogin() {
    dispatch(setCredentials({ ...user, isAuthenticated: true }));
    navigate(user.role === "USER" ? `/${EXPLORE}` : `/${MARKETPLACE}`);
  }

  async function handleLogout() {
    await disconnect();
    dispatch(
      setCredentials({
        profileImage: "",
        role: "",
        username: "",
        isAuthenticated: false,
        id: "",
        handle: ""
      })
    );
  }

  return {
    handleLogin,
    handleLogout,
  };
}
