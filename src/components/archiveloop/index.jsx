import React from 'react';
import { useRouter } from 'next/router';
import CharacterLoop from './components/characterloop';
import LocationLoop from './components/locationloop';
import EpisodeLoop from './components/episodeloop';

export default function ArchiveLoop({ data, type, next , count}) {
    const router = useRouter();
    let asPath = router.asPath;
    if (asPath.startsWith('/')) {
        asPath = asPath.substring(1);
    }
    const renderLoop = (asPath) => {
        let looptype;
        if(type) {
            looptype = type;
        }
        else
        {
            looptype = asPath;
        }
        switch (looptype) {
            case 'character':
                return <CharacterLoop initialData={data} initialNext={next} count={count}/>;
            case 'location':
                return <LocationLoop initialData={data} initialNext={next} count={count}/>;
            case 'episode':
                return <EpisodeLoop initialData={data} initialNext={next} count={count}/>;
            default:
                return <p className='font-bold'>No content available for this category.</p>;
        }
    };

    return (
        <div className="flex-1 p-4 bg-gray-300 text-black">
            {renderLoop(asPath)} 
        </div>
    );
}
