import React, { useState } from "react";
import { getHeroDetail } from "./api";
import "./tailwind.output.css";

function App() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const handleSubmit = async () => {
    setLoading(true);
    const response = await getHeroDetail(text);
    setData(response);
    setLoading(false);
  };
  return (
    <div className="max-w-xl mx-auto py-5">
      <label
        className="block mb-2 text-gray-700 text-sm font-bold"
        htmlFor="hero-name"
      >
        Search
      </label>
      <div className="flex gap-2">
        <input
          className="shadow appearance-none border rounded py-2 px-4 text-gray-700"
          id="hero-name"
          placeholder="Type a hero name"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className="inline-flex rounded bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
      {loading && <div className="py-5">loading</div>}
      {data && (
        <div className="flex gap-4 mt-5">
          <img className="w-56 h-56 rounded" alt={`Avatar of ${data.name}`} src={data.avatar} />
          <div className="flex-auto">
            <div className="font-bold text-2xl mb-2">{data.name}</div>
            <div className="text-gray-700">{data.description}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
