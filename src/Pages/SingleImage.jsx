import { useEffect, useState } from "react";
import { useParams } from "react-router";
import PageTitle from "../components/shared/PageTitle";

const SingleImage = () => {
  const { id } = useParams();
  const [image, setImage] = useState({});
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]); // chat history

  // 1️ Fetch single image
  useEffect(() => {
    fetch(`http://localhost:5000/api/image/single/${id}`)
      .then((res) => res.json())
      .then((data) => setImage(data))
      .catch((err) => console.error(err));
  }, [id]);

  // 2️ Fetch all previous comments from DB
  useEffect(() => {
    if (!image._id || !image.email) return;

    const fetchComments = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/comment/chat/${image._id}/${image.email}`
        );
        const data = await res.json();
        // console.log(data);
        // data.data assumed as array of { comment, reply }
        const previousMessages = [];
        data.forEach((c) => {
          previousMessages.push({ role: "user", text: c.comment });
          if (c.reply) previousMessages.push({ role: "bot", text: c.reply });
        });

        setMessages(previousMessages);
      } catch (err) {
        console.error(err);
      }
    };

    fetchComments();
  }, [image]);

  // 3️ Send new message
  const handleSend = () => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    // Show user message instantly
    setMessages((prev) => [...prev, { role: "user", text: trimmedInput }]);

    // Send to server
    const information = {
      imageId: image._id,
      prompt: image.prompt,
      email: image.email,
      comment: trimmedInput,
    };

    fetch("http://localhost:5000/api/comment/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(information),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.reply) {
          setMessages((prev) => [...prev, { role: "bot", text: data.reply }]);
        }
      })
      .catch((err) => console.error(err));

    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="container mx-auto my-5">
      <PageTitle>{image.prompt}</PageTitle>

      {/* Image */}
      <div className="card shadow-sm my-5">
        <figure>
          <img src={image.finalImageURL} alt={image.prompt} />
        </figure>
      </div>

      {/* Chat Box */}
      <div className="w-full bg-amber-50 p-4 space-y-4 rounded-lg shadow">
        {/* Messages */}
        <div className="flex flex-col space-y-2 max-h-96 overflow-y-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`chat ${
                msg.role === "user" ? "chat-end" : "chat-start"
              }`}
            >
              <div
                className={`chat-bubble ${
                  msg.role === "user"
                    ? "bg-blue-500 text-white" // user bubble color
                    : "bg-gray-200 text-black" // bot bubble color
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input Field */}
        <div className="flex items-center border-t border-gray-200 mt-2 pt-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            placeholder="Type a message..."
          />
          <button
            onClick={handleSend}
            className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleImage;
