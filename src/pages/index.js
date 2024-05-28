import React, { useState, useEffect, useCallback } from 'react';
import { Inter } from "next/font/google";
import FilterTab from "@/components/fitertab";
import { useQuery } from '@tanstack/react-query';
import { GraphQLClient } from 'graphql-request';

const inter = Inter({ subsets: ["latin"] });
const endpoint = 'https://rickandmortyapi.com/graphql';
const graphQLClient = new GraphQLClient(endpoint);

export async function getStaticProps() {
  const fetchFilterOptions = async (type) => {
      const response = await fetch(`https://rickandmortyapi.com/api/${type}`);
      const data = await response.json();
      const options = {
          species: [],
          gender: [],
          status: [],
          type: [],
          dimension: []
      };

      data.results.forEach(item => {
          if (item.species && !options.species.includes(item.species)) {
              options.species.push(item.species);
          }
          if (item.gender && !options.gender.includes(item.gender)) {
              options.gender.push(item.gender);
          }
          if (item.status && !options.status.includes(item.status)) {
              options.status.push(item.status);
          }
          if (item.type && !options.type.includes(item.type)) {
              options.type.push(item.type);
          }
      });
      return options;
  };

  const defaultDataResponse = await fetch(`https://rickandmortyapi.com/api/character`);
  const defaultData = await defaultDataResponse.json();

  const characterOptions = await fetchFilterOptions('character');
  const locationOptions = await fetchFilterOptions('location');

  return {
      props: {
          initialData: defaultData.results,
          initialFilterOptions: {
              character: characterOptions,
              location: locationOptions
          }
      },
      revalidate: 86400
  };
}


export default function Home({ initialData, initialFilterOptions }) {
  const [effectiveType, setEffectiveType] = useState('character');
  const [filters, setFilters] = useState({ character: {}, episode: {}, location: {} });
  const [currentFilters, setCurrentFilters] = useState({});
  const [filterOptions, setFilterOptions] = useState(initialFilterOptions);
  const [count, setCount] = useState(0);

  const fetchFilterOptions = async () => {
    const queries = {
      character: `
        query GetCharacters {
          characters {
            results {
              species
              gender
              status
              type
            }
          }
        }
      `,
      location: `
        query GetLocations {
          locations {
            results {
              type
              dimension
            }
          }
        }
      `
    };
  
    const query = queries[effectiveType];
  
    try {
      const data = await graphQLClient.request(query);
      const results = data[Object.keys(data)[0]].results; // Assicurati che i risultati siano presenti
      if (!results) {
        throw new Error("No results found");
      }
      const options = results.reduce((acc, item) => {
        if (item.species) acc.species.add(item.species);
        if (item.gender) acc.gender.add(item.gender);
        if (item.status) acc.status.add(item.status);
        if (item.type) acc.type.add(item.type);
        if (item.dimension) acc.dimension.add(item.dimension);
        return acc;
      }, { species: new Set(), gender: new Set(), status: new Set(), type: new Set(), dimension: new Set() });
  
      // Converti gli Set in array per il consumo successivo nell'UI
      return {
        species: Array.from(options.species),
        gender: Array.from(options.gender),
        status: Array.from(options.status),
        type: Array.from(options.type),
        dimension: Array.from(options.dimension)
      };
    } catch (error) {
      console.error('Error in GraphQL Query or Data Handling:', error);
      // Ritorna un oggetto con array vuoti anziché undefined
      return { species: [], gender: [], status: [], type: [], dimension: [] };
    }
  };
  

  
  
  useEffect(() => {
    fetchFilterOptions();
  }, [effectiveType, graphQLClient]);
  
  const { data: filterData, isLoading: loadingFilters, error: filterError } = useQuery({
    queryKey: ['filterOptions', effectiveType],
    queryFn: fetchFilterOptions
  });

  const fetchData = async () => {
    const queryString = Object.entries(currentFilters).filter(([key, value]) => value).map(([key, value]) => `${key}=${encodeURIComponent(value)}`).join('&');
    const url = `https://rickandmortyapi.com/api/${effectiveType}${queryString ? `?${queryString}` : ''}`;
    const response = await fetch(url);
    const jsonData = await response.json();
    setCount(jsonData.info.count);
    return jsonData.results || [];
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['fetchData', effectiveType, currentFilters],
    queryFn: fetchData,
    keepPreviousData: true
  });

  const setActiveTab = useCallback((tab, e) => {
    e.preventDefault();
    if (tab !== effectiveType) {
      setEffectiveType(tab);
      setCurrentFilters(filters[tab]);
    }
  });

  const onFiltersChange = useCallback((newFilters) => {
    setFilters(prevFilters => {
        if (JSON.stringify(prevFilters[effectiveType]) === JSON.stringify(newFilters)) {
            return prevFilters;
        }
        return {
            ...prevFilters,
            [effectiveType]: newFilters
        };
    });
    setCurrentFilters(prevCurrentFilters => {
        if (JSON.stringify(prevCurrentFilters) === JSON.stringify(newFilters)) {
            return prevCurrentFilters;
        }
        return newFilters;
    });
}, [effectiveType]);


  if (error || filterError) return <div>Error: {error?.message || filterError?.message}</div>;

  return (
    <div className="z-10 w-full flex flex-col items-center text-sm font-mono">
      <h1 className="discover-title text-4xl font-bold font-mono text-center">Discover the Wiki</h1>
      <FilterTab 
        effectiveType={effectiveType}
        setActiveTab={setActiveTab}
        filterOptions={filterData || filterOptions[effectiveType]}
        onFiltersChange={onFiltersChange}
        data={data}
        count={count || 0}
      />
    </div>
  );
}