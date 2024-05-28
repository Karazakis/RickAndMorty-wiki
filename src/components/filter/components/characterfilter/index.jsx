import React, { useState, useEffect } from 'react';

export default function CharacterFilter({
    onFiltersChange,
    filterOptions = { // Providing a default structure in case filterOptions isn't provided
        species: [],
        status: [],
        gender: [],
        type: []
    }
}) {
    const [name, setName] = useState('');
    const [status, setStatus] = useState('');
    const [species, setSpecies] = useState('');
    const [type, setType] = useState('');
    const [gender, setGender] = useState('');

    useEffect(() => {
        onFiltersChange({ name, status, species, type, gender });
    }, [name, status, species, type, gender, onFiltersChange]);

    const handleFilterChange = setter => e => {
        setter(e.target.value);
    };

    const resetFilters = () => {
        setName('');
        setStatus('');
        setSpecies('');
        setType('');
        setGender('');
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
            <div className="flex flex-col">  {/* Applicato flex-col qui */}
                <span>Status:</span>
                {filterOptions.status && filterOptions.status.map((option) => (
                    <label key={option} className="ml-2 mt-1">  {/* Aggiunto mt-1 per un po' di spazio verticale tra i bottoni */}
                        <input
                            type="radio"
                            name="status"
                            value={option.toLowerCase()}
                            checked={status === option.toLowerCase()}
                            onChange={handleFilterChange(setStatus)}
                        />
                        {option}
                    </label>
                ))}
            </div>
            <div>
                <label htmlFor="species">Species:</label>
                <select
                    id="species"
                    value={species}
                    onChange={handleFilterChange(setSpecies)}
                    className='w-full p-1 border border-gray-300 rounded-md'
                >
                    <option value="">Any</option>
                    {filterOptions.species &&filterOptions.species.map((option) => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="type">Type:</label>
                <select
                    id="type"
                    value={type}
                    onChange={handleFilterChange(setType)}
                    className='w-full p-1 border border-gray-300 rounded-md'
                >
                    <option value="">Any</option>
                    {filterOptions.type && filterOptions.type.map((option) => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            </div>
            <div className="flex flex-col">  {/* Applicato flex-col qui */}
                <span>Gender:</span>
                {filterOptions.gender && filterOptions.gender.map((option) => (
                    <label key={option} className="ml-2 mt-2">  {/* Aggiunto mt-1 per un po' di spazio verticale tra i bottoni */}
                        <input
                            type="radio"
                            name="gender"
                            value={option.toLowerCase()}
                            checked={gender === option.toLowerCase()}
                            onChange={handleFilterChange(setGender)}
                        />
                        {option}
                    </label>
                ))}
            </div>
            <button onClick={resetFilters} className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
                Reset Filters
            </button>
        </form>
    );
}
