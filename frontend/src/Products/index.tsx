import { useEffect, useState } from "react";

import Messages from "../components/Messages";
import Ratings from "../components/Ratings";
import Header from "../components/Header";

interface ProductTypes {
  id: number;
  name: string;
  description: string;
  price: string;
  rating: number;
  image_url: string;
}

interface ChatTypes {
  id: number;
  sender: "ai" | "user";
  message: string;
}

const INITIAL_CHAT: ChatTypes[] = [
  {
    id: 1,
    sender: "ai",
    message: "👋 Hello! How can I help you today?",
  },
  {
    id: 2,
    sender: "user",
    message: "Show me best gaming accessories.",
  },
  {
    id: 3,
    sender: "ai",
    message: "I recommend the Gaming Mouse and Mechanical Keyboard.",
  },
  {
    id: 4,
    sender: "user",
    message: "Add them to my cart.",
  },
  {
    id: 5,
    sender: "ai",
    message: "Done ✅ Both items have been added.",
  },
];

const SESSION_ID = Date.now();

export default function Products() {
  const [products, setProducts] = useState<ProductTypes[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [msgValue, setMsgValue] = useState<string>("");
  const [chat, setChat] = useState<ChatTypes[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8000/products");
        const json = await res.json();
        setProducts(json);
      } catch (err) {
        console.error("API error:", err);
      }
    };

    fetchData();
  }, []);

  const addToCart = () => {
    setCartCount(cartCount + 1);
  };

  const onSend = async (e: React.SyntheticEvent) => {
    setLoading(true);
    e.preventDefault();

    const message = msgValue;
    setMsgValue("");

    const userId = Date.now();

    setChat((prev) => [...prev, { id: userId, sender: "user", message }]);

    const aiId = Date.now() + 1;

    setChat((prev) => [...prev, { id: aiId, sender: "ai", message: "" }]);

    try {
      const res = await fetch("http://localhost:8000/agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          model: "qwen2.5:7b",
          session_id: SESSION_ID,
        }),
      });

      const reader = res.body?.getReader();
      if (!reader) return;

      const decoder = new TextDecoder();
      let fullText = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        fullText += decoder.decode(value, { stream: true });

        setChat((prev) =>
          prev.map((m) => (m.id === aiId ? { ...m, message: fullText } : m)),
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-100 bg-gray-900 text-white flex flex-col border-r border-gray-800">
        <div className="p-5 border-b border-gray-700">
          <h2 className="text-2xl font-bold">AI Assistant</h2>
          <p className="text-sm text-gray-400 mt-1">
            Ask about products, orders, or recommendations.
          </p>
        </div>

        <Messages chat={chat} />

        <div className="p-4 border-t border-gray-700">
          <form className="flex items-center gap-2">
            <input
              value={msgValue}
              onChange={(e) => setMsgValue(e.target.value)}
              type="text"
              placeholder="Type a message..."
              className="flex-1 rounded-lg bg-gray-800 px-4 py-2 text-sm outline-none"
            />
            <button
              onClick={onSend}
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
            >
              Send
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header cartCount={cartCount} />

        {/* Products Grid */}
        <section className="flex-1 overflow-y-auto p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
              >
                <img
                  src={`http://localhost:8000/${product.image_url}`}
                  alt={product.name}
                  className="h-52 w-full object-cover"
                />

                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-800">
                      {product.name}
                    </h3>
                    <span className="text-blue-600 font-semibold">
                      {product.price}
                    </span>
                  </div>

                  <p className="text-sm text-gray-500 mt-3 mb-3">
                    {product.description}
                  </p>

                  <Ratings rating={product.rating} />

                  <button
                    onClick={addToCart}
                    className="mt-5 w-full bg-gray-900 hover:bg-black text-white py-3 rounded-xl font-medium transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
