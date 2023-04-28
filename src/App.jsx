import { useRoutes } from "react-router-dom";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import CreatePost from "./pages/CreatePost";
import Home from "./pages/Home";
import PostID from "./pages/PostID";
import UpdatePostID from "./pages/UpdatePostID";
import Meals from "./pages/Meals";
import Carousel from "./components/Carousel";
import Footer from "./components/Footer";

function App() {
  const [search, setSearch] = useState("");
  //Layout of Routes for Application
  let routes = useRoutes([
    {
      path: "/",
      element: <Home search={search} />,
    },
    {
      path: "/createPost",
      element: <CreatePost />,
    },
    {
      path: "/post/:id",
      element: <PostID />,
    },
    {
      path: "/updatePost/:id",
      element: <UpdatePostID />,
    },
    {
      path: "/meals",
      element: <Meals search={search} />,
    },
  ]);

  return (
    <div className="App">
      <Carousel />
      <Navbar search={search} setSearch={setSearch} />
      {routes}
      <Footer />
    </div>
  );
}

export default App;
