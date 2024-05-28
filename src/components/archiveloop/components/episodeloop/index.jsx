'use client';
import Modal from '../components/modal';
import React, { useState , useEffect } from 'react';
import Image from 'next/image';

export default function EpisodeLoop({ initialData, initialNext , count}) {
    const [episodes, setEpisodes] = useState(initialData);
    const [nextPage, setNextPage] = useState(initialNext);
    const [selectedEpisode, setSelectedEpisode] = useState(null);

    useEffect(() => {
        setEpisodes(initialData);
    }, [initialData]);

    useEffect(() => {
        setNextPage(initialNext);
    }, [initialNext]);

    const handleOpenModal = episode => {
        setSelectedEpisode(episode);
    };

    const handleCloseModal = () => {
        setSelectedEpisode(null);
    };

    const loadMoreEpisodes = () => {
        if (!nextPage) return;
        
        fetch(nextPage)
            .then(response => response.json())
            .then(data => {
                setEpisodes([...episodes, ...data.results]);
                setNextPage(data.info.next);
            })
            .catch(error => {
                console.error('Error fetching more episodes:', error);
            });
    };

    const extractSeasonAndEpisode = (episodeCode) => {
        if (typeof episodeCode !== 'string') {
            return { season: 'N/A', episode: 'N/A' }; // Oppure puoi scegliere di restituire null o un'altra gestione dell'errore
        }
        const match = episodeCode.match(/S(\d+)E(\d+)/);
        return {
            season: match ? match[1] : 'N/A', // 'N/A' o altro placeholder se il formato non è corretto
            episode: match ? match[2] : 'N/A',
        };
    };

    return (
        <div>
    <h2 className="text-2xl font-bold text-center mb-6">Episodes</h2>
    <h3 className="text-l font-semibold text-center mb-6">Total Episodes found: {count}</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mx-2">
        {Array.isArray(episodes) ? (
            episodes.map(episode => {
                const { season, episode: episodeNum } = extractSeasonAndEpisode(episode.episode);
                return (
                    <div key={episode.id} className="border border-gray-300 p-5 m-2 flex flex-col items-center bg-gray-200 max-w-sm relative">
                        <div className="w-24 h-24 relative">
                            <Image 
                                src="/episode.webp" 
                                alt={`Episode ${episodeNum}`} 
                                className="w-full h-full rounded-full"
                                width={96}
                                height={96}
                            />
                            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-lg font-semibold">
                                Episode {episodeNum}
                            </span>
                        </div>
                        <h3 className="text-xl font-semibold mt-2">{episode.name}</h3>
                        <p>Episode: {episodeNum} (Season {season})</p>
                        <button onClick={() => handleOpenModal(episode)} className="mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                            More Details
                        </button>
                    </div>
                );
            })
        ) : (
            <p>No episodes found.</p>
        )}
    </div>
    <div className="flex justify-center">
        {nextPage && <button className="btn justify-center mx-auto mt-4 py-2 px-10 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50" onClick={loadMoreEpisodes}>
            Load More
        </button>}
    </div>
    {selectedEpisode && <Modal data={selectedEpisode} onClose={handleCloseModal} type='episode' />}
</div>

    );
}
