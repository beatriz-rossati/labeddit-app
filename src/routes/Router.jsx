import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoginPage from "../pages/loginPage/LoginPage"
import SignupPage from "../pages/signupPage/SignupPage";
import PostPage from "../pages/postPage/PostPage";
import FeedPage from "../pages/feedPage/FeedPage";

function Router() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/post/:id" element={<PostPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

// TODO: Na rota post, como faz pra identificar qual post será aberto? com param mesmo?
// como eu defino qual será a primeira página a abrir?