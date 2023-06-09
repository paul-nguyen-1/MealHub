import React, { useState } from "react";
import "./CreatePost.css";
import { supabase } from "../client";
import { v4 as uuidv4 } from "uuid";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function CreatePost() {
  const URL =
    "https://cbpfflduoaryrtiobtjf.supabase.co/storage/v1/object/public/images/";
  const [uploadFile, setUploadFile] = useState(null);
  const [images, setImages] = useState([]);
  const [uuid, setUuid] = useState(null);
  const [input, setInput] = useState({
    title: "",
    description: "",
    image: "",
    upvote: 0,
    comments: [],
    url: "",
  });

  async function getImages() {
    const { data, error } = await supabase.storage.from("images").list("/");

    if (data !== null) {
      setImages(data);
    } else {
      console.log(error);
    }
  }

  const handleChange = (e) => {
    const name = e.target.name;
    setInput((prev) => {
      return { ...prev, [name]: e.target.value };
    });
    // console.log(input);
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
        url: input.url,
      })
      .select();

    window.location = "/";

    setInput({
      title: "",
      description: "",
      image: "",
      upvote: 0,
      comments: [],
      url: "",
    });
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const uuid = uuidv4();
    const upload_url = URL + uuid + "/" + file.name;
    setUploadFile(upload_url);

    const { data, error } = await supabase.storage
      .from("images")
      .upload(`${uuid}/${file.name}`, file);

    if (data) {
      setUuid(uuid); // Store the UUID in state
      getImages();
      console.log(data);
    } else {
      console.log(error);
    }
  };

  const handleQuill = (value) => {
    setInput((prev) => {
      return {
        ...prev,
        description: value,
      };
    });
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
        <div className="reactQuill">
          <ReactQuill
            theme="snow"
            value={input.description}
            onChange={handleQuill}
            style={{ width: "100%", height: "200px" }}
          />
        </div>
        <input
        className="inputFile"
          placeholder="Choose file"
          type="file"
          accept="image/png, image/jpeg"
          onChange={(e) => uploadImage(e)}
          style={{ marginTop: "45px", marginRight: "15px" }}
        ></input>
        <input
          type="text"
          id="url"
          name="url"
          placeholder="Recipe URL"
          value={input.url}
          onChange={handleChange}
        ></input>
        <input
          className="postButton"
          type="submit"
          value="Submit"
          onClick={createPost}
        />
      </form>
    </div>
  );
}

export default CreatePost;
