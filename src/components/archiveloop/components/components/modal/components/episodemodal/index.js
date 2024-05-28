import React from 'react';
import Link from 'next/link';

export default function EpisodeModal({ episode, onClose }) {
    const placeholderImage = '/episode.webp';

    const extractSeasonAndEpisode = (episodeCode) => {
        if (typeof episodeCode !== 'string') {
            console.error("Expected a string for episodeCode, got:", episodeCode);
            return { season: 'N/A', episode: 'N/A' }; // Oppure puoi scegliere di restituire null o un'altra gestione dell'errore
        }
        const match = episodeCode.match(/S(\d+)E(\d+)/);
        return {
            season: match ? match[1] : 'N/A', // 'N/A' o altro placeholder se il formato non è corretto
            episode: match ? match[2] : 'N/A',
        };
    };
    const { season, episode: episodeNum } = extractSeasonAndEpisode(episode.episode);
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 w-4/5 max-w-3xl flex flex-col items-center">
                <div className="flex flex-row w-full">
                    <div className="flex-1">
                        <div className="relative w-full">
                            <img src={placeholderImage} alt={episode.name} className="w-full" />
                            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-2xl">Episode {episodeNum}</span>
                        </div>
                    </div>
                    <div className="flex-1 pl-4 flex flex-col justify-between">
                        <div>
                            <h2 className="text-2xl font-bold">{episode.name}</h2>
                            {season && episodeNum && (
                                <p className="text-m font-semibold">Season {season}, Episode {episodeNum}</p>
                            )}
                            <p className="mt-1">Episode Code: {episode.episode}</p>
                            <p>Air Date: {episode.air_date}</p>
                            {episode.summary && <p className="mt-1">Summary: {episode.summary}</p>}
                        </div>
                        <Link href={`/episode/${episode.id}`}>
                            <button className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>View Full Profile</button>
                        </Link>
                    </div>
                </div>
                <button onClick={onClose} className="bg-red-500 mt-4 text-white py-2 px-4 rounded hover:bg-red-600">Close</button>
            </div>
        </div>
    );
}