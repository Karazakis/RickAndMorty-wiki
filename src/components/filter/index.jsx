import React from 'react';
import { useRouter } from 'next/router';
import CharacterFilter from './components/characterfilter';
import LocationFilter from './components/locationfilter';
import EpisodeFilter from './components/episodefilter';

export default function Filter({ onFiltersChange, type, filterOptions }) {
    const router = useRouter();
    const asPath = router.asPath;
    const renderFilter = () => {
        let looptype = type || asPath;

        switch (true) {
            case looptype.includes('character'):
                return <CharacterFilter onFiltersChange={onFiltersChange} filterOptions={filterOptions} />;
            case looptype.includes('location'):
                return <LocationFilter onFiltersChange={onFiltersChange} filterOptions={filterOptions} />;
            case looptype.includes('episode'):
                return <EpisodeFilter onFiltersChange={onFiltersChange} filterOptions={filterOptions} />;
            default:
                return <p>No filter available for this category.</p>;
        }
    };

    return (
        <div className="flex-1 p-6 bg-gray-300 text-black items-center">
            {renderFilter()}
        </div>
    );
}
