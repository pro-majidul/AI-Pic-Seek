import { useContext, useState } from "react";
import PageTitle from "../components/shared/PageTitle";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";

const Create = () => {
  const { user, login } = useContext(AuthContext);
  const [imageURl, setImageURl] = useState([]);

  // const ImageUpload = `https://api.imgbb.com/1/upload?key=${
  //   import.meta.env.VITE_BB_KEY
  // }`;
  const options = [
    "painting",
    "animated-image",
    "walpaper",
    "poster",
    "digital-art",
    "realistic-image",
  ];

  const checkUser = () => {
    if (!user) {
      Swal.fire({
        title: "Please Login",
        text: "Join as a Creator with One Click",
        imageUrl: "https://img.icons8.com/?size=100&id=szz75vJoS2OI&format=gif",
        imageHeight: "80px",
        imageAlt: "Custom image",
        showCancelButton: true,
        confirmButtonText: `Login using Google`,
        confirmButtonColor: "#149b9b",
      }).then((res) => {
        if (res.isConfirmed) {
          login()
            .then((res) => {
              const user = res.user;
              console.log(user);
              Swal.fire("success", "Welcome", "success");
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
      return false;
    } else {
      return true;
    }
  };

  const validate = (prompt, category) => {
    if (!category) {
      Swal.fire(
        "Select Category",
        "Select a Category from the dropdown",
        "error"
      );
      return false;
    }
    if (!prompt) {
      Swal.fire("Write a Prompt", "Write a prompt in the input", "error");
      return false;
    }

    if (prompt.trim().length < 20) {
      Swal.fire(
        "Invalid Prompt",
        "make your prompt bigger (minimum 20 character)",
        "error"
      );
      return false;
    }
  };

  // const generateImageBuffer = async (prompt, category) => {
  //   console.log({ prompt, category });
  //   const finalPrompt = `imagine a ${category} : ${prompt}`;
  //   console.log(finalPrompt);
  //   const myform = new FormData();
  //   myform.append("prompt", finalPrompt);

  //   const response = await fetch("https://clipdrop-api.co/text-to-image/v1", {
  //     method: "POST",
  //     headers: {
  //       "x-api-key": import.meta.env.VITE_CD_Key,
  //     },
  //     body: myform,
  //   });

  //   const buffer = await response.arrayBuffer();
  //   return buffer;
  // };

  // const UploadImageBBGetURL = async (buffer, prompt) => {
  //   // const blob = new Blob([buffer], { type: "image/png" });
  //   const formdata = new FormData();
  //   formdata.append(
  //     "image",
  //     new Blob([buffer], { type: "image/jpeg" }),
  //     `${prompt}.jpg`
  //   );

  //   const response = await fetch(ImageUpload, {
  //     method: "POST",
  //     body: formdata,
  //   });
  //   const data = await response.json();
  //   return data;
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const prompt = form.prompt.value;
    const category = form.category.value;
    if (!checkUser()) return;
    if (validate(prompt, category)) return;

    // const buffer = await generateImageBuffer(prompt, category);
    // const imageURL = await UploadImageBBGetURL(buffer, prompt);

    // // buffer here is a binary representation of the returned image
    // // 1. Create a Blob from the buffer
    // // You need to specify the correct MIME type (e.g., 'image/png', 'image/jpeg')
    // const blob = new Blob([buffer], { type: "image/png" });
    // // 2. Create a URL for the Blob
    // const imageUrl = URL.createObjectURL(blob);

    // // 3. Use the URL to display the image
    // // a) Create a new Image element
    // const img = new Image();
    // img.src = imageUrl;

    // // b) Append it to your HTML body or another element
    // // document.body.appendChild(img);
    // console.log(imageURL?.data?.display_url);
    // const finalImageURL = imageURL?.data?.display_url;
    // setImageURl(finalImageURL);

    axios
      .post(
        "http://localhost:5000/create-image",
        {
          email: user?.email || "majidul123tub@gmail.com",
          username: user?.displayName || "Majidul",
          prompt,
          category,
          userImg: user?.photoURL || "https://api.imgbb.com/1/upload?",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setImageURl((prev) => [...prev, res.data]);
      })
      .catch((err) => {
        if (err.response) {
          console.error("Server error response:", err.response.data);
        } else {
          console.error("Error message:", err.message);
        }
      });
    // setImageURl(response);
  };

  return (
    <div>
      <PageTitle>🌱Let&apos;s Create 🐦‍🔥</PageTitle>

      <div className="w-11/12 mx-auto py-10">
        <div className="flex justify-center py-5">
          <img
            src="https://img.icons8.com/?size=96&id=8gR77jBNhfyz&format=png"
            alt=""
            className="animate-bounce"
          />
        </div>
        <form
          onSubmit={handleSubmit}
          className="join w-full justify-center flex-wrap"
        >
          <div className="flex-1">
            <div className="">
              <input
                name="prompt"
                className="input w-full input-bordered join-item outline-none focus:outline-none focus:border-primary"
                placeholder="Write , Whats on your Mind🧠🧠"
              />
            </div>
          </div>
          <select
            name="category"
            className="select select-bordered join-item max-w-max outline-none focus:outline-none focus:border-primary"
          >
            <option value="">Select a Category</option>
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <div className="indicator">
            <button className="btn join-item btn-primary">Create</button>
          </div>
        </form>
      </div>
      <div className="container mx-auto w-full px-1">
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5">
          {imageURl.length == 1 ? (
            <img src={imageURl[0]} alt="" />
          ) : (
            imageURl?.map((url, idx) => <img key={idx} src={url} alt="" />)
          )}
        </div>
      </div>
    </div>
  );
};

export default Create;
