import { lazy, Suspense } from "react";

// Components
import { Loading, PrivateRoute } from "components";
import { Routes, Route } from "react-router-dom";

// Constants
import {
  LOGIN,
  WALLET,
  MARKETPLACE,
  EXPLORE,
  UNAUTHORIZED,
  FOLLOWING,
  PROFILE,
  NEW,
} from "constants/index";

// Routes
const Login = lazy(() => import("routes/Login"));
const Explore = lazy(() => import("routes/Explore"));
const Marketplace = lazy(() => import("routes/Marketplace"));
const Unauthorized = lazy(() => import("routes/Unauthorized"));
const Following = lazy(() => import("routes/Following"));
const Profile = lazy(() => import("routes/Profile"));
const New = lazy(() => import("routes/New"));

function AppRoutes() {
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <PrivateRoute>
            <Suspense fallback={<Loading />}>
              <div>HOME</div>
            </Suspense>
          </PrivateRoute>
        }
      />
      <Route
        exact
        path={`/${MARKETPLACE}`}
        element={
          <PrivateRoute routeRole="CREATOR">
            <Suspense fallback={<Loading />}>
              <Marketplace />
            </Suspense>
          </PrivateRoute>
        }
      />
      <Route
        exact
        path={`/${EXPLORE}`}
        element={
          <PrivateRoute routeRole="USER">
            <Suspense fallback={<Loading />}>
              <Explore />
            </Suspense>
          </PrivateRoute>
        }
      />
      <Route
        exact
        path={`/${FOLLOWING}`}
        element={
          <PrivateRoute routeRole="USER">
            <Suspense fallback={<Loading />}>
              <Following />
            </Suspense>
          </PrivateRoute>
        }
      />
      <Route
        exact
        path={`/${PROFILE}`}
        element={
          <PrivateRoute routeRole="CREATOR">
            <Suspense fallback={<Loading />}>
              <Profile />
            </Suspense>
          </PrivateRoute>
        }
      />
      <Route
        exact
        path={`/${NEW}`}
        element={
          <PrivateRoute routeRole="CREATOR">
            <Suspense fallback={<Loading />}>
              <New />
            </Suspense>
          </PrivateRoute>
        }
      />
      <Route
        exact
        path={`/${UNAUTHORIZED}`}
        element={
          <Suspense fallback={<Loading />}>
            <Unauthorized />
          </Suspense>
        }
      />
      <Route
        exact
        path={`/${LOGIN}`}
        element={
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
