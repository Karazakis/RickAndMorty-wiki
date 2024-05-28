import React, { useState , useCallback } from 'react';
import Filter from '../../components/filter';
import ArchiveLoop from '../../components/archiveloop';
import { useQuery } from '@tanstack/react-query';

export async function getStaticPaths() {
    return {
        paths: [
            { params: { archive: 'character' } },
            { params: { archive: 'episode' } },
            { params: { archive: 'location' } }
        ],
        fallback: 'blocking'
    };
}

export async function getStaticProps({ params }) {
    const { archive } = params;
    const fetchFilterOptions = async (type) => {
        const response = await fetch(`https://rickandmortyapi.com/api/${type}`);
        const data = await response.json();
        if (!data.results) {
            throw new Error(`No results for type: ${type}`);
        }
        const options = {
            species: [...new Set(data.results.map(item => item.species))].filter(Boolean),
            genders: [...new Set(data.results.map(item => item.gender))].filter(Boolean),
            statuses: [...new Set(data.results.map(item => item.status))].filter(Boolean),
            types: [...new Set(data.results.map(item => item.type))].filter(Boolean),
            dimensions: type === 'location' ? [...new Set(data.results.map(item => item.dimension))].filter(Boolean) : []
        };
        return options;
    };

    const dataResponse = await fetch(`https://rickandmortyapi.com/api/${archive}`);
    const data = await dataResponse.json();
    if (!data.results) {
        throw new Error(`No results for archive: ${archive}`);
    }
    const initiaFilterOptions = await fetchFilterOptions(archive);
    return {
        props: {
            initialData: data.results,
            initiaFilterOptions,
            archive,
            initialCount: data.info.count
        },
        revalidate: 86400
    };
}

export default function Archive({ initialData, archive, initiaFilterOptions, initialCount }) {
    const [currentFilters, setCurrentFilters] = useState({});
    const [next, setNext] = useState('');
    const [count, setCount] = useState(initialCount);
    const [filterOptions] = useState(initiaFilterOptions);
    const [showFilters, setShowFilters] = useState(false);

    const { data, isLoading, error } = useQuery({
        queryKey: ['fetchData', archive, currentFilters],
        queryFn: async () => {
            const queryString = Object.entries(currentFilters).filter(([_, v]) => v).map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join('&');
            const url = `https://rickandmortyapi.com/api/${archive}?${queryString}`;
            const response = await fetch(url);
            const jsonData = await response.json();
            setNext(jsonData.info.next);
            setCount(jsonData.info.count);
            return jsonData.results;
        },
        initialData,
        keepPreviousData: true,
        onSuccess: (data) => {
            if (!data) {
                setNext('');
                setCount(0);
            }
        }
    });

    const onFiltersChange = useCallback((newFilters) => {
        setCurrentFilters(newFilters);
    }, []);

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="flex font-mono">
            {/* Sezione dei filtri nascosta all'inizio e mostrata a metà schermo quando si attiva il toggle */}
            <div className={`min-[600px]:w-1/6 max-[600px]:w-3/6 flex flex-col md:block fixed md:relative z-10 ${showFilters ? 'left-0' : '-right-full'} md:left-0 h-full md:w-auto transition-all duration-300 border-l border-gray-200`}>
                <Filter onFiltersChange={onFiltersChange} type={archive} filterOptions={filterOptions} />
            </div>
            <div className="md:w-5/6 flex flex-col">
                <ArchiveLoop data={data} type={archive} next={next} count={count} />
            </div>
            {/* Toggle button */}
            <button className="fixed bottom-16 left-0 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-r shadow-md md:hidden z-30 w-20" onClick={toggleFilters}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Filters
            </button>
        </div>
    );
}
 