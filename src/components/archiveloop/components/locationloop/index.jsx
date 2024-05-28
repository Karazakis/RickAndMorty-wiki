import React from 'react';
import { useState , useEffect } from 'react';
import Modal from '../components/modal';
import Image from 'next/image';

function LocationLoop({ initialData, initialNext , count }) {
    const [locations, setLocations] = useState(initialData);
    const [nextPage, setNextPage] = useState(initialNext);
    const [selectedLocation, setSelectedLocation] = useState(null);

    useEffect(() => {
        setLocations(initialData);
    }, [initialData]);

    useEffect(() => {
        setNextPage(initialNext);
    }, [initialNext]);


    const handleOpenModal = location => {
        setSelectedLocation(location);
    }

    const handleCloseModal = () => {
        setSelectedLocation(null);
    }

    const loadMoreLocations = () => {
        if (!nextPage) return;

        fetch(nextPage)
            .then(response => response.json())
            .then(data => {
                setLocations([...locations, ...data.results]);
                setNextPage(data.info.next);
            })
            .catch(error => {
                console.error('Error fetching more locations:', error);
            });
    }
    return (
        <div>
        <h2 className="text-2xl font-bold text-center mb-6">Locations</h2>
        <h3 className="text-l font-semibold text-center mb-6">Total Locations found: {count}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-2">
            {Array.isArray(locations) ? (
                locations.map(location => (
                    <div key={location.id} className="border border-gray-300 p-5 flex flex-col items-center bg-gray-200 max-w-sm">
                        <div className="w-24 h-24 relative">
                            <Image 
                                src="/location.webp" 
                                alt={`location ${location}`} 
                                className="w-full h-full rounded-full"
                                width={96}
                                height={96} 
                            />
                            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-lg font-semibold">{location.id}</span>
                        </div>
                        <h3 className="text-xl font-semibold">{location.name}</h3>
                        <p>Type: {location.type}</p>
                        <p>Dimension: {location.dimension}</p>
                        <button onClick={() => handleOpenModal(location)} className="mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                            More Details
                        </button>
                    </div>
                ))
            ) : (
                <p>Loading...</p>
            )}
        </div>
        <div className="flex justify-center">
            {nextPage && <button onClick={loadMoreLocations} className="justify-center mx-auto mt-4 py-2 px-10 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                Load More
            </button>}
        </div>
        {selectedLocation && <Modal data={selectedLocation} onClose={handleCloseModal} type='location' />}
    </div>    
    );
    
}

export default LocationLoop;
