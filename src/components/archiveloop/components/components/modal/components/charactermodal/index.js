import React from 'react';
import Link from 'next/link';

export default function CharacterModal({ character, onClose }) {
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ background: 'white', padding: '20px', width: '80%', maxWidth: '600px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '20px' }}>
                    <div style={{ flex: '1 1 50%', paddingRight: '10px' }}>
                        <img src={character.image} alt={character.name} style={{ width: '100%', height: 'auto' }} />
                    </div>
                    <div style={{ flex: '1 1 50%', paddingLeft: '10px' }}>
                        <h2 className='text-lg font-bold'>{character.name}</h2>
                        <p>Status: {character.status}</p>
                        <p>Species: {character.species}</p>
                        <p>Last known location: {character.location.name}</p>
                        <Link href={`/character/${character.id}`} style={{ display: 'inline-block', margin: '10px 0', padding: '10px 20px', background: 'blue', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>View Full Profile</Link>
                    </div>
                </div>
                <button onClick={onClose} className='bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600' style={{ padding: '10px 20px', alignSelf: 'center' }}>Close</button>
            </div>
        </div>
    );
}