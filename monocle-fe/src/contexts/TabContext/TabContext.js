import { createContext, useEffect, useMemo, useState, useContext } from "react";

// Components
import { TabContext as TabValueProvider } from "@mui/lab";

//  Utils
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

// Selectors
import { selectUserRole } from "redux/reducers/authReducer";

// Constants
import { EXPLORE, LOGIN, MARKETPLACE } from "constants/index";

const TabActionsContext = createContext(null);

export const useTabActions = () => useContext(TabActionsContext);

export function TabProvider({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const userRole = useSelector(selectUserRole);

  const slug = location.pathname.split("/").join("");
  const initRoute = useMemo(
    () =>
      slug !== LOGIN ? slug : userRole === "CREATOR" ? MARKETPLACE : EXPLORE,
    [slug, userRole]
  );

  const [value, setValue] = useState(initRoute);

  useEffect(() => {
    setValue(initRoute);
  }, [initRoute]);

  function handleChange(_, newValue) {
    setValue((prevValue) => {
      navigate(`/${newValue}`, { state: { from: prevValue } });
      return newValue;
    });
  }

  return (
    <TabValueProvider value={value}>
      <TabActionsContext.Provider value={{ setValue, handleChange }}>
        {children}
      </TabActionsContext.Provider>
    </TabValueProvider>
  );
}
