import React, { useState , useEffect } from 'react';

export default function EpisodeFilter({ onFiltersChange }) {
    const [name, setName] = useState('');
    const [episode, setEpisode] = useState('');

    useEffect(() => {
        onFiltersChange({ name, episode });
    }, [name, episode]);

    const handleFilterChange = setter => e => {
        setter(e.target.value);
    };

    const resetFilters = () => {
        setName('');
        setEpisode('');
    };


    return (
        <form className="space-y-4 w-full" onSubmit={e => e.preventDefault()}>
            <h2 className='font-bold'>Filters</h2>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={handleFilterChange(setName)}
                    className='w-full p-1 border border-gray-300 rounded-md'
                />
            </div>
            <div>
                <label htmlFor="episode">Episode Code:</label>
                <input
                    type="text"
                    id="episode"
                    value={episode}
                    onChange={handleFilterChange(setEpisode)}
                    className='w-full p-1 border border-gray-300 rounded-md'
                />
            </div>
            <button onClick={resetFilters} className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
                Reset Filters
            </button>
        </form>
    );
}
