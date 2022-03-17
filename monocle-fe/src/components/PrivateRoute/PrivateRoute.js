import { createElement } from "react";
import PropTypes from "prop-types";

// Utils
import { useSelector } from "react-redux";

// Components
import { Navigate } from "react-router-dom";
import { MainLayout } from "components";

// Selectors
import {
  selectAuthentication,
  selectUserRole,
} from "redux/reducers/authReducer";

// Constants
import { LOGIN, UNAUTHORIZED } from "constants/index";

export function PrivateRoute({ routeRole, children }) {
  const isAuthenticated = useSelector(selectAuthentication);
  const userRole = useSelector(selectUserRole);

  if (isAuthenticated) {
    if (routeRole === userRole) {
      return <MainLayout>{children}</MainLayout>;
    }

    return <Navigate to={`/${UNAUTHORIZED}`} />;
  }

  return <Navigate to={`/${LOGIN}`} />;
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  routeRole: PropTypes.node,
};

PrivateRoute.defaultProps = {
  children: createElement("div"),
  routeRole: "USER",
};
