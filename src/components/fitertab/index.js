import React from 'react';
import Filter from '../filter';
import ArchiveLoop from '../archiveloop';

export default function FilterTab({ effectiveType, setActiveTab, filterOptions, onFiltersChange, data, next, count, loading }) {
    const renderComponent = () => (
        <div className="flex font-mono">
            <div className="w-1/6 flex flex-col">
                <Filter onFiltersChange={onFiltersChange} type={effectiveType} filterOptions={filterOptions} />
            </div>
            <div className="w-5/6 flex flex-col">
                <ArchiveLoop data={data} type={effectiveType} next={next} count={count}/>
            </div>
        </div>
    );

    return (
        <div className="z-10 w-full flex flex-col h-min-10 items-center text-sm font-mono">
            <div className="flex justify-center w-full">
                <button onClick={(e) => setActiveTab('character', e)} className={`p-2 ${effectiveType === 'character' ? 'bg-blue-700' : 'bg-blue-500'} text-white rounded-md mr-2`}>
                    Characters
                </button>
                <button onClick={(e) => setActiveTab('episode', e)} className={`p-2 ${effectiveType === 'episode' ? 'bg-blue-700' : 'bg-blue-500'} text-white rounded-md mr-2`}>
                    Episodes
                </button>
                <button onClick={(e) => setActiveTab('location', e)} className={`p-2 ${effectiveType === 'location' ? 'bg-blue-700' : 'bg-blue-500'} text-white rounded-md`}>
                    Locations
                </button>
            </div>
            {!loading && <div className="mt-4 w-full">
                {renderComponent()}
            </div>}
        </div>
    );
}
