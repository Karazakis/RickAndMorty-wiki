import React, { useState, useEffect } from 'react';

export default function LocationFilter({
    onFiltersChange,
    filterOptions = { // Default structure in case filterOptions isn't provided
        type: [],
        dimension: []
    }
}) {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [dimension, setDimension] = useState('');

    useEffect(() => {
        onFiltersChange({ name, type, dimension });
    }, [name, type, dimension, onFiltersChange]);

    const handleFilterChange = setter => e => {
        setter(e.target.value);
    };

    const resetFilters = () => {
        setName('');
        setType('');
        setDimension('');
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
                    className="w-full p-1 border border-gray-300 rounded-md"
                />
            </div>
            <div>
                <label htmlFor="type">Type:</label>
                <select
                    id="type"
                    value={type}
                    onChange={handleFilterChange(setType)}
                    className="w-full p-1 border border-gray-300 rounded-md"
                >
                    <option value="">Any</option>
                    {filterOptions.type.map((option) => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="dimension">Dimension:</label>
                <select
                    id="dimension"
                    value={dimension}
                    onChange={handleFilterChange(setDimension)}
                    className="w-full p-1 border border-gray-300 rounded-md"
                >
                    <option value="">Any</option>
                    {filterOptions.dimension.map((option) => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            </div>
            <button onClick={resetFilters} className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
                Reset Filters
            </button>
        </form>
    );
}
