// Components
import {
  AddOutlined,
  FavoriteBorderOutlined,
  VisibilityOutlined,
  PersonOutlined,
} from "@mui/icons-material";
import { Tab, Tabs } from "@mui/material";

// Utils
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Selectors
import { selectUserRole } from "redux/reducers/authReducer";

// Constants
import { EXPLORE, FOLLOWING, MARKETPLACE, PROFILE, NEW } from "constants/index";

// Hooks
import { useTabContext } from "@mui/lab";
import { useTabActions } from "contexts";

function NavigationWrapper({ children }) {
  const navigate = useNavigate();

  const { value } = useTabContext();
  const { setValue } = useTabActions();

  function handleChange(_, newValue) {
    setValue((prevValue) => {
      navigate(`/${newValue}`, { state: { from: prevValue } });
      return newValue;
    });
  }

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: 80,
        backgroundColor: "custom.black",
        color: "custom.white",
        ".MuiTabs-flexContainer": {
          justifyContent: "space-around",
          height: "100%",
          maxWidth: 600,
          margin: "0 auto",
        },
        ".MuiTab-root": {
          color: "custom.white",
          textTransform: "none",
          flex: "1 1 0%",
          border: "2px solid transparent",
          fontWeight: 800,
          fontSize: "12px",
        },
        "&& .Mui-selected": {
          color: "custom.black",
          backgroundColor: "custom.white",
          borderColor: "custom.black",
        },
        ".MuiTabs-indicator": { display: "none" },
      }}
    >
      {children}
    </Tabs>
  );
}

export function BottomNavigation() {
  const userRole = useSelector(selectUserRole);

  if (userRole === "USER") {
    return (
      <NavigationWrapper>
        <Tab icon={<VisibilityOutlined />} label="Explore" value={EXPLORE} />
        <Tab
          icon={<FavoriteBorderOutlined />}
          label="Following"
          value={FOLLOWING}
        />
      </NavigationWrapper>
    );
  }

  if (userRole === "CREATOR") {
    return (
      <NavigationWrapper>
        <Tab icon={<VisibilityOutlined />} label="Market" value={MARKETPLACE} />
        <Tab icon={<AddOutlined />} label="Add new" value={NEW} />
        <Tab icon={<PersonOutlined />} label="Profile" value={PROFILE} />
      </NavigationWrapper>
    );
  }

  return null;
}
