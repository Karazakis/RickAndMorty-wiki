import React, { useState, useEffect } from 'react';
import Link from 'next/link';

function RelatedElement({ url, type }) { // Aggiunto parametro `type` per gestire il tipo di risorsa (es. 'character')
    const [relatedData, setRelatedData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchRelatedData() {
            try {
                const response = await fetch(url);
                const data = await response.json();
                setRelatedData(data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch related data:', error);
                setLoading(false);
            }
        }

        fetchRelatedData();
    }, [url]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!relatedData) {
        return <p>No related data found.</p>;
    }

    // Creare l'URL dinamicamente in base al tipo e al nome
    const relatedUrl = `/${type}/${relatedData.id}`;

    return (
        <div>
            <h4>
                <Link href={relatedUrl}>{relatedData.name}</Link> {/* Link che porta alla pagina specifica */}
            </h4>
        </div>
    );
}

export default RelatedElement;
