import { useEffect, useState } from "react";
import { useParams } from "react-router";
import PageTitle from "../components/shared/PageTitle";

const SingleImage = () => {
  const { id } = useParams();
  const [image, setImage] = useState({});
  const [input, setInput] = useState("");
  const [reply, setReply] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/api/image/single/${id}`)
      .then((res) => res.json())
      .then((data) => setImage(data));
  }, [id]);

  const handleSend = () => {
    // const length = input.trim().length;
    // if (length < 30) {
    //   alert("please minimum type 30 characters");
    //   return;
    // }
    if (input.trim()) {
      const information = {
        imageId: image?._id,
        prompt: image?.prompt,
        email: image?.email,
        comment: input,
      };
      console.log(information);
      fetch("http://localhost:5000/api/comment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(information),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setReply(data.reply);
        })
        .catch((err) => console.log(err));
      setInput(" ");
    }
  };
  // console.log(image);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && input.trim()) {
      handleSend();
    }
  };

  return (
    <div>
      <PageTitle>{image?.prompt}</PageTitle>
      <div className="card shadow-sm my-5 container mx-auto">
        <figure>
          <img src={image.finalImageURL} alt={image.prompt} />
        </figure>
      </div>
      <div className="container mx-auto w-full bg-amber-50">
        <div className="chat chat-start">
          <div className="chat-bubble">{reply}</div>
        </div>
        <div className="chat chat-end">
          <div className="chat-bubble">{input}</div>
        </div>

        <div className="flex items-center p-4 border-t border-gray-200">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            placeholder="Type a message..."
          />
          <button
            onClick={handleSend}
            className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleImage;
