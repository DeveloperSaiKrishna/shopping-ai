import { useState } from "react";

import headphones from "../assets/headphones.jpeg";
import smartWatch from "../assets/smart-watch.jpeg";
import gamingMouse from "../assets/gaming-mouse.jpeg";
import machanicalKeyboard from "../assets/mechanical-keyboard.jpeg";
import speaker from "../assets/bluetooth-speaker.jpeg";
import monitor from "../assets/4k-monitor.jpeg";
import phoneCharger from "../assets/phone-charger.jpeg";
import DSLRCamera from "../assets/dslr-camera.jpeg";
import vrHeadset from "../assets/vr-headset.jpeg";
import Messages from "../components/Messages";
import Ratings from "../components/Ratings";

const products = [
  {
    id: 1,
    title: "Wireless Headphones",
    description: "Premium noise-cancelling over-ear headphones.",
    price: "$129",
    rating: 4.5,
    image: headphones,
  },
  {
    id: 2,
    title: "Smart Watch",
    description: "Track fitness, heart rate, and notifications.",
    price: "$199",
    rating: 4.2,
    image: smartWatch,
  },
  {
    id: 3,
    title: "Gaming Mouse",
    description: "Ergonomic RGB gaming mouse with precision tracking.",
    price: "$59",
    rating: 4.7,
    image: gamingMouse,
  },
  {
    id: 4,
    title: "Mechanical Keyboard",
    description: "Tactile mechanical keyboard with RGB lighting.",
    price: "$89",
    rating: 4.6,
    image: machanicalKeyboard,
  },
  {
    id: 5,
    title: "Bluetooth Speaker",
    description: "Portable speaker with deep bass and waterproof design.",
    price: "$79",
    rating: 4.3,
    image: speaker,
  },
  {
    id: 6,
    title: "Laptop Stand",
    description: "Adjustable aluminum stand for better posture.",
    price: "$39",
    rating: 4.1,
    image: headphones,
  },
  {
    id: 7,
    title: "4K Monitor",
    description: "Ultra HD display for work and gaming.",
    price: "$349",
    rating: 4.8,
    image: monitor,
  },
  {
    id: 8,
    title: "Phone Charger",
    description: "Fast charging USB-C wall adapter.",
    price: "$29",
    rating: 4.0,
    image: phoneCharger,
  },
  {
    id: 9,
    title: "DSLR Camera",
    description: "Professional camera with high-resolution sensor.",
    price: "$899",
    rating: 4.9,
    image: DSLRCamera,
  },
  {
    id: 10,
    title: "VR Headset",
    description: "Immersive virtual reality gaming experience.",
    price: "$499",
    rating: 4.6,
    image: vrHeadset,
  },
];

export default function Products() {
  const [cartCount, setCartCount] = useState(0);

  const addToCart = () => {
    setCartCount(cartCount + 1);
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

        <Messages />

        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 rounded-lg bg-gray-800 px-4 py-2 text-sm outline-none"
            />
            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg">
              Send
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm px-8 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Shopping Dashboard
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Explore trending products
            </p>
          </div>

          <div className="bg-blue-600 text-white px-5 py-3 rounded-xl shadow">
            <span className="font-semibold">Orders:</span> {cartCount}
          </div>
        </header>

        {/* Products Grid */}
        <section className="flex-1 overflow-y-auto p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-52 w-full object-cover"
                />

                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-800">
                      {product.title}
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
