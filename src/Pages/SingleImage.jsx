import { useEffect, useState } from "react";
import { useParams } from "react-router";
import PageTitle from "../components/shared/PageTitle";

const SingleImage = () => {
  const { id } = useParams();
  const [image, setImage] = useState({});
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/api/image/single/${id}`)
      .then((res) => res.json())
      .then((data) => setImage(data));
  }, [id]);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, id: Date.now() }]);
      setInput("");
    }
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    const prompt = e.target.prompt.value;
    const comment = e.target.comment.value;
    const imageId = image?._id;
    console.log(prompt, comment, imageId);
  };

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
          <div className="chat-bubble">
            Its over Anakin,
            <br />I have the high ground.
          </div>
        </div>
        <div className="chat chat-end">
          <div className="chat-bubble">You underestimate my power!</div>
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
