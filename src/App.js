import React, { useState } from 'react';
import './tailwind.output.css';
import { getHeroDetail } from './api';

function App() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await getHeroDetail(text);
      setData(response);
    } catch (e) {
      console.log('e', e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-2xl mx-auto py-5">
      <label className="font-bold mb-1 inline-block" htmlFor="search">
        Search hero
      </label>
      <div className="flex gap-2">
        <input
          className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block appearance-none leading-normal"
          id="search"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={'type hero name'}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSubmit}
        >
          Go
        </button>
      </div>
      {loading && <div className="py-5">loading</div>}
      {data && (
        <div className="flex gap-4 mt-10">
          <img className="block rounded w-56 h-56" alt={`Avatar of ${data.name}`} src={data.avatar} />
          <div className="flex-auto">
            <div className="font-bold text-2xl mb-2">{data.name}</div>
            <p>{data.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
