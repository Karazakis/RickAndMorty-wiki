import React from 'react';
import Link from 'next/link';

export default function LocationModal({ location, onClose }) {
    const placeholderImage = '/location.webp';

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 w-4/5 max-w-3xl flex flex-col items-center">
                <div className="flex flex-row w-full">
                    <div className="flex-1">
                        <div className="relative w-full">
                            <img src={placeholderImage} alt={location.name} className="w-full" />
                            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-2xl">{location.id}</span>
                        </div>
                    </div>
                    <div className="flex-1 pl-4 flex flex-col justify-between">
                        <div>
                            <h2 className="text-2xl font-bold">{location.name}</h2>
                            <p className="mt-1">Type: {location.type}</p>
                            <p>Dimension: {location.dimension}</p>
                        </div>
                        <Link href={`/location/${location.id}`}>
                            <button className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>View Full Profile</button>
                        </Link>
                    </div>
                </div>
                <button onClick={onClose} className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">Close</button>
            </div>
        </div>
    );
}