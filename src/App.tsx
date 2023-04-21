import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import PageNotFound from "./pages/404/PageNotFound";
import Home from "./pages/Home/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        {/* protected routes */}
        <Route index element={<Home />} />
      </Route>
      {/* catch all */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
