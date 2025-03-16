import { useState } from "react";
import axios from "axios";
import './App.css';

function App() {
  const [file, setFile] = useState("");
  const [image, setImage] = useState();
  const [uploaded_image, setuploaded_image] = useState();

  function previewfiles(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      const result = reader.result;
      setImage(result);
      console.log(result); // This will properly log the base64 URL
    }
  }

  const handleChange = (e) => {
    const file = e.target.files[0];
    // console.log(file);
    setFile(file)
    previewfiles(file);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await axios.post("http://localhost:8001", {
      image: image
    })
    try {
      const uploaded_image_URL = result.data.url;
      // console.log(uploaded_image);
      alert("Your Image is Uploaded.....")
      setuploaded_image(uploaded_image_URL);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div style={{ padding: "30px", lineHeight: "2rem" }}>
        <form style={{ marginBottom: "20px" }} onSubmit={handleSubmit}>
          <label>Upload any photo here</label><br />
          <input type="file" id="fileinput" onChange={handleChange} required accept="image/png,image/jpeg, image/jpg, image/jfif" /><br />
          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
      <div>
        <img style={{ width: "auto", height: "500px" }} src={uploaded_image} alt='' />
      </div>
    </>
  );
}

export default App;
