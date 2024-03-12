import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import Header from "./Layout/Header/Header";
import Home from "./Pages/Home/Home";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import AddPost from "./Pages/AddPost/AddPost";
import NotFound from "./Pages/NotFound/NotFound";
import PrivateRoutes from "./Utils/PrivateRoutes/PrivateRoutes";
import PostDetails from "./Pages/PostDetails/PostDetails";
import Footer from "./Layout/Footer/Footer";

import "./App.css";

function App() {
  const location = useLocation();
  const hiddenFooterPaths = ["/login", "/register"];
  const hideFooter = hiddenFooterPaths.includes(location.pathname);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/addPost" element={<AddPost />} />
        </Route>

        <Route path="/post/:id" element={<PostDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!hideFooter && <Footer />}
    </>
  );
}

export default App;
