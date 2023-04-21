import React, { useState } from "react";
import "./CreatePost.css";
import { supabase } from "../client";

function CreatePost() {
  const URL = "https://cbpfflduoaryrtiobtjf.supabase.co/storage/v1/object/public/images/"
  const [uploadFile, setUploadFile] = useState(null)
  const [images, setImages] = useState([]);
  const [input, setInput] = useState({
    title: "",
    description: "",
    image: "",
    upvote: 0,
    comments: [],
  });

  async function getImages() {
    const { data, error } = await supabase
      .storage
      .from("images")
      .list("/");

    if (data !== null) {
      setImages(data);
    } else{
      console.log(error)
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    setInput((prev) => {
      return { ...prev, [name]: e.target.value };
    });
    console.log(input);
  };

  const createPost = async (event) => {
    event.preventDefault();
    await supabase
      .from("Meals")
      .insert({
        title: input.title,
        description: input.description,
        image: uploadFile,
        upvote: input.upvote,
        comments: input.comments,
      })
      .select();

    window.location = "/";

    setInput({
      title: "",
      description: "",
      image: "",
      upvote: 0,
      comments: [],
    });
  };

  //set up image upload
  async function uploadImage(e) {
    const file = e.target.files[0];
    const upload_url = URL + file.name
    setUploadFile(upload_url)
    console.log(upload_url)
    const { data, error } = await supabase
      .storage
      .from("images")
      .upload(file.name, file);

    if (data) {
      getImages();
      console.log(data)
    } else {
      console.log(error);
    }
  };

  return (
    <div className="createPost">
      <form className="container">
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Title"
          value={input.title}
          onChange={handleChange}
        ></input>
        <textarea
          type="text"
          id="description"
          name="description"
          placeholder="Description"
          value={input.description}
          onChange={handleChange}
        ></textarea>
        <input
          placeholder="Choose file"
          type="file"
          accept="image/png, image/jpeg"
          onChange={(e) => uploadImage(e)}
        ></input>
        <input
          type="text"
          id="image"
          name="image"
          placeholder="Image"
          value={input.image}
          onChange={handleChange}
        ></input>
        <input
          type="submit"
          value="Create Post"
          onClick={createPost}
          style={{
            width: "100px",
            height: "30px",
            backgroundColor: "#B7791F",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        />
      </form>
    </div>
  );
}

export default CreatePost;
