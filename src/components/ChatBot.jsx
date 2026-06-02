import { useState, useEffect, useRef } from "react";

import { useTranslation } from "react-i18next";

export default function ChatBot() {

  const { t, i18n } = useTranslation();

  const [open, setOpen] = useState(false);

  const [messages, setMessages] = useState([]);

  const [input, setInput] = useState("");

  const chatRef = useRef();

  // Close Chat on Outside Click
  useEffect(() => {

    const handleClickOutside = (event) => {

      if (
        chatRef.current &&
        !chatRef.current.contains(event.target)
      ) {

        setOpen(false);

      }

    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

    };

  }, []);

  // Update Welcome Message on Language Change
  useEffect(() => {

    setMessages([
      {
        sender: "bot",
        text: t("chatWelcome"),
      },
    ]);

  }, [i18n.language]);

  // Clear Chat
  const clearChat = () => {

    setMessages([
      {
        sender: "bot",
        text: t("chatWelcome"),
      },
    ]);

  };

 const sendMessage = async () => {

  if (!input.trim()) return;

  const userMessage = {
    sender: "user",
    text: input,
  };

  setMessages((prev) => [
    ...prev,
    userMessage,
  ]);

  const currentInput = input;

  setInput("");

  try {

    const response =
      await fetch(
        "/.netlify/functions/chat",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            message:
              currentInput,
          }),
        }
      );

    const data =
      await response.json();

    setMessages((prev) => [
      ...prev,
      {
        sender: "bot",
        text:
          data.reply ||
          "Sorry, I couldn't answer that.",
      },
    ]);

  } catch (error) {

    setMessages((prev) => [
      ...prev,
      {
        sender: "bot",
        text:
          "Sorry, something went wrong.",
      },
    ]);

  }

};

  return (

    <div ref={chatRef}>

      {/* Floating Button */}
      <button
        onClick={(e) => {

          e.stopPropagation();

          setOpen(!open);

        }}
        className="fixed bottom-6 right-6 bg-green-700 text-white w-16 h-16 rounded-full shadow-2xl text-3xl z-50"
      >
        💬
      </button>

      {/* Chat Window */}
      {open && (

        <div
          className="fixed bottom-24 right-6 w-80 bg-white rounded-3xl shadow-2xl overflow-hidden z-50"
        >

          {/* Header */}
          <div className="bg-green-700 text-white p-4 flex justify-between items-center">

            <h2 className="text-xl font-bold">

              {t("chatTitle")}

            </h2>

            <button
              onClick={clearChat}
              className="bg-white text-green-700 px-3 py-1 rounded-xl text-sm font-semibold"
            >

              {t("clear")}

            </button>

          </div>

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">

            {messages.map((msg, index) => (

              <div
                key={index}
                className={`p-3 rounded-2xl max-w-[80%]
                
                ${
                  msg.sender === "user"
                    ? "bg-green-700 text-white ml-auto"
                    : "bg-gray-200 text-black"
                }`}
              >

                {msg.text}

              </div>

            ))}

          </div>

          {/* Input */}
          <div className="flex p-3 border-t">

            <input
  type="text"
  placeholder={t("typeMessage")}
  value={input}
  onChange={(e) => setInput(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  }}
  className="flex-1 border rounded-2xl px-4 py-2 outline-none"
/>

            <button
              onClick={sendMessage}
              className="ml-2 bg-green-700 text-white px-5 rounded-2xl"
            >

              {t("send")}

            </button>

          </div>

        </div>

      )}

    </div>

  );
}