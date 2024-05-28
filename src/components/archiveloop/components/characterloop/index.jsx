'use client';
import React, { useState , useEffect } from 'react';
import Modal from '../components/modal';

export default function CharacterCards({ initialData, initialNext , count }) {
    const [characters, setCharacters] = useState(initialData);
    const [nextPage, setNextPage] = useState(initialNext);
    const [selectedCharacter, setSelectedCharacter] = useState(null);

    useEffect(() => {
        setCharacters(initialData);
    }, [initialData]);

    useEffect(() => {
        setNextPage(initialNext);
    }, [initialNext]);

    const handleOpenModal = character => {
        setSelectedCharacter(character);
    };

    const handleCloseModal = () => {
        setSelectedCharacter(null);
    };

    const loadMoreCharacters = () => {
        if (!nextPage) return;

        fetch(nextPage)
            .then(response => response.json())
            .then(data => {
                setCharacters(prevCharacters => [...prevCharacters, ...data.results]);
                setNextPage(data.info.next);
            })
            .catch(error => {
                console.error('Error fetching more characters:', error);
            });
    };

    return (
        <div>
        <h2 className="text-2xl font-bold text-center mb-6">Characters</h2>
        <h3 className="text-l font-semibold text-center mb-6">Total Characters found: {count}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mx-2">
            {Array.isArray(characters) ? (
                characters.map(character => (
                    <div key={character.id} className="border border-gray-300 p-5 flex flex-col items-center bg-gray-200 max-w-sm">
                        <img src={character.image} alt={character.name} className="w-24 h-24 rounded-full" />
                        <h3 className="text-xl font-semibold mt-2">{character.name}</h3>
                        <p>
                            Status: 
                            <span style={{
                                fontWeight: 'bold',
                                color: character.status === 'Dead' ? 'red' :
                                    character.status === 'Alive' ? 'green' :
                                    'gray'
                            }}>
                                {character.status}
                            </span>
                        </p>
                        <p className='text-center'>Last known location:<br/> <span className='font-bold'>{ character.location ? character.location.name : 'unknown' }</span></p>
                        <button onClick={() => handleOpenModal(character)} className="mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                            More Details
                        </button>
                    </div>
                ))
            ) : <p>No characters found.</p>}
        </div>
        <div className="flex justify-center">
            {nextPage && <button className="btn justify-center mx-auto mt-4 py-2 px-10 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50" onClick={loadMoreCharacters}>
                Load More
            </button>}
        </div>
        {selectedCharacter && <Modal data={selectedCharacter} onClose={handleCloseModal} type='character' />}
    </div>
    
    );
}