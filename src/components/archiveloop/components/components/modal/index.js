import React from 'react';
import { useRouter , useState } from 'next/router';
import CharacterModal from './components/charactermodal';
import LocationModal from './components/locationmodal';
import EpisodeModal from './components/episodemodal';



function Modal({ data, onClose , type}) {
    const router = useRouter();
    const asPath = router.asPath;

    const renderModal = (data) => {
        if (type.includes('character')) {
            return <CharacterModal character={ data } onClose={onClose}/>;
        } else if (type.includes('location')) {
            return <LocationModal location={ data } onClose={onClose}/>;
        } else if (type.includes('episode')) {
            return <EpisodeModal episode={ data } onClose={onClose}/>;
        } else {
            return <p className='font-bold'>No content available for this category.</p>;
        }
    };
    return (
        <div>
            {renderModal( data )}
        </div>
    ); 
}

export default Modal;
