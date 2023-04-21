import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Signin from "./pages/Signin/Signin";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import PageNotFound from "./pages/404/PageNotFound";
import { appUrls } from "./utils/app-utils";

function App() {
  return (
    <Routes>
      <Route path="/">
        {/* public routes */}
        <Route path={appUrls.signIn} element={<Signin />} />
        <Route path={appUrls.signUp} element={<Signup />} />

        {/* protected routes */}
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path={appUrls.profile} element={<Profile />} />
          <Route path={appUrls.followingProfile} element={<Profile />} />
        </Route>
      </Route>
      {/* catch all */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
