import React, { useState, useEffect, useContext } from 'react';
import { IoMdSearch } from "react-icons/io";
import CardEvent from '../CardEvent';
import dbjson from '../../db.json';
import { DarkModeContext } from '../DarkModeProvider/index';

function SearchBar() {

    const [events, setEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { darkMode } = useContext(DarkModeContext);

    useEffect(() => {
        setEvents(dbjson);
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        if (event.target.value === '') {
            setEvents([]);
        } else {
            const filteredEvents = dbjson.filter(event =>
                event.bands.some(band => band.toLowerCase().includes(searchTerm.toLowerCase()))
            );
            setEvents(filteredEvents);
        }
    };

    

    return (
        <>
            <h2 className="input-title">Buscar evento</h2>

            <div className={`${darkMode ? 'bg-dark-100 flex items-center' : 'items-center flex w-full'}`}>
                <IoMdSearch className={darkMode ? 'text-light w-5 h-5' : 'text-dark w-5 h-5'} />
                <input
                    className={`${darkMode ? 'bg-dark-100 ml-1 mr-1 w-full h-8 outline-none' : 'bg-light ml-1 mr-1 w-full h-8 outline-none'}`}
                    onChange={handleSearch}
                    type="text"
                    value={searchTerm}
                    placeholder="Nome da banda..."
                />
            </div>

            {searchTerm && (
                events.length > 0 ? (
                    events.map(event => (
                        <div className='mb-5 mt-5' key={event.id}>
                            <CardEvent
                                key={event.id}
                                title={event.title}
                                address={event.address}
                                datetime={event.datetime}
                                image={event.image}
                            />
                        </div>
                    ))
                ) : (
                    <p>Não foi possível encontrar a banda: {searchTerm}</p>
                )
            )}
        </>
    )
}

export default SearchBar