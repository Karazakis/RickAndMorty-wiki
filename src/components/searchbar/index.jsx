'use client';

import Link from 'next/link';
import React, { useState, useEffect , useRef } from 'react';

function SearchBar({ placeholder }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!searchTerm) {
        setResults([]);
        return;
      }

      const urls = [
        `https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(searchTerm)}`,
        `https://rickandmortyapi.com/api/location/?name=${encodeURIComponent(searchTerm)}`,
        `https://rickandmortyapi.com/api/episode/?name=${encodeURIComponent(searchTerm)}`
      ];

      try {
        const responses = await Promise.all(urls.map(url => fetch(url)));
        const data = await Promise.all(responses.map(res => res.json()));
        
        const combinedResults = data.flatMap((item, index) => {
          const type = index === 0 ? 'character' : (index === 1 ? 'location' : 'episode');
          return item.results ? item.results.map(result => ({ ...result, type })) : [];
        });

        setResults(combinedResults);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setResults([]);
      }
    };

    const timerId = setTimeout(() => {
      fetchData();
    }, 300);

    return () => clearTimeout(timerId);
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setResults([]); // Chiudi il menu a tendina
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  let img_src = (result) => {
    if (result.image) {
      return result.image;
    } else if (result.type === 'episode') {
      return '/episode.webp';
    } else if (result.type === 'location') {
      return '/location.webp';
    }
  }
  return (
  <div className="relative" ref={dropdownRef}>
    <input
      type="text"
      placeholder={placeholder}
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="w-auto md:w-96 p-2 mx-10 border-2 border-gray-300 rounded-md text-black focus:outline-none focus:border-blue-500"
    />
    {results.length > 0 && (
      <ul className="absolute w-full max-h-60 overflow-auto border-2 border-gray-300 rounded-md z-50 bg-black">
        {results.map(result => (
          <li key={result.id} className="p-2 hover:bg-gray-600 flex items-center">
            <img
              src={img_src(result)}
              alt={result.name}
              className="w-10 h-10 rounded-full mr-2"
            />
            <div className="flex flex-col">
              <Link href={`/${result.type.toLowerCase()}/${result.id}`}>
                {result.name}
              </Link>
              <span className="text-sm font-bold text-gray-100"> ({result.type})</span>
            </div>
          </li>
        ))}
      </ul>
    )}
  </div>

  );
}

export default SearchBar;
