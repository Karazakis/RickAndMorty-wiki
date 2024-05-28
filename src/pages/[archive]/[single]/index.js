import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import RelatedElement from '../../../components/relatedelement';

export async function getStaticPaths() {
    const archives = ['character', 'episode', 'location'];
    let paths = [];

    for (const archive of archives) {
        const res = await fetch(`https://rickandmortyapi.com/api/${archive}`);
        const { results } = await res.json();
        const archivePaths = results.map(item => ({
            params: { archive, single: `${item.id}` }
        }));
        paths = paths.concat(archivePaths);
    }

    return {
        paths,
        fallback: 'blocking' 
    };
}

export async function getStaticProps({ params }) {
    const { archive, single } = params;
    try {
        const res = await fetch(`https://rickandmortyapi.com/api/${archive}/${single}`);
        const data = await res.json();

        if (!data || Object.keys(data).length === 0) {
            return { notFound: true };
        }

        return {
            props: {
                data,
                archive
            },
            revalidate: 86400,
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return { notFound: true };
    }
}


export default function Single({ data, archive }) {
        const default_img = `/${archive}.webp`;
    
    return (
        <div className="flex items-center justify-center mt-10 px-4 py-2">
            <div className="detailcard shadow-lg rounded-lg overflow-hidden w-full max-w-2xl">
                <h2 className="text-2xl font-bold mb-4 px-6 py-4">{archive}'s details</h2>
                <div className="flex flex-row items-start justify-start space-x-4 px-6">
                    {data.image && (
                        <div className="flex-none">
                            <img src={data.image ? data.image : default_img} alt={data.name} className="w-50 h-50 object-cover rounded-md" />
                        </div>
                    )}
                    <div className="flex-grow">
                        <h3 className="text-xl font-semibold">{data.name}</h3>
                        <ul className="list-disc list-inside">
                            {Object.entries(data).map(([key, value]) => {
                                if (value && (typeof value === 'string' && !value.startsWith('http') || typeof value === 'number')) {
                                    return <li key={key}><strong>{key}</strong>: {value}</li>;
                                }
                                return null;
                            })}
                        </ul>
                    </div>
                </div>
                <div className="px-6 py-4">
                    <h3 className="text-lg font-semibold">
                        {archive === 'character' ? 'Episodes featuring this character' :
                        archive === 'episode' ? 'Characters appearing in this episode' :
                        archive === 'location' ? 'Characters appearing in this location' :
                        'Related items'}
                    </h3>
                    <div className="overflow-auto max-h-40">
                        {archive === 'character' && data.episode ? (
                            data.episode.map(link => <RelatedElement key={link} url={link} type={'episode'} />)
                        ) : archive === 'episode' && data.characters ? (
                            data.characters.map(link => <RelatedElement key={link} url={link} type={'character'} />)
                        ) : archive === 'location' && data.residents ? (
                            data.residents.map(link => <RelatedElement key={link} url={link} type={'character'} />)
                        ) : (
                            <p>No related items available.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}