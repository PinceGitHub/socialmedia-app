import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Signin from "./pages/Signin/Signin";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import PageNotFound from "./pages/404/PageNotFound";
import { appUrls } from "./utils/app-utils";
import NoAuth from "./components/NoAuth/NoAuth";
import RequireAuth from "./components/RequireAuth/RequireAuth";

function App() {
  return (
    <Routes>
      <Route path="/">
        {/* public routes */}
        <Route
          path={appUrls.signIn}
          element={
            <NoAuth>
              <Signin />
            </NoAuth>
          }
        />
        <Route
          path={appUrls.signUp}
          element={
            <NoAuth>
              <Signup />
            </NoAuth>
          }
        />

        {/* protected routes */}
        <Route
          element={
            <RequireAuth>
              <Layout />
            </RequireAuth>
          }
        >
          <Route index element={<Home />} />
          <Route path={appUrls.profile} element={<Profile />} />
        </Route>
      </Route>
      {/* catch all */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
