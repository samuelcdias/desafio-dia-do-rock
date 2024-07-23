import React, {useContext} from 'react';
import {IoMdSearch} from "react-icons/io";
import CardEvent from '../CardEvent';
import {DarkModeContext} from '../DarkModeProvider/index';
import {MapInfoContext} from "../MapInfoProvider";

function SearchBar() {
    const {darkMode} = useContext(DarkModeContext);
    const {mapInfo, getMarkerBySearch, setPanTo} = useContext(MapInfoContext);
    const searchRef = React.useRef(null);

    const handleSearch = async (event) => {
        getMarkerBySearch(event.target.value);
    };

    return (
        <>
            <div className={`${darkMode ? 'bg-dark-100 flex items-center' : 'items-center flex w-full'}`}>
                <IoMdSearch className={darkMode ? 'text-light w-5 h-5' : 'text-dark w-5 h-5'}/>
                <input
                    ref={searchRef}
                    className={`${darkMode ? 'bg-dark-100 ml-1 mr-1 w-full h-8 outline-none' : 'bg-light ml-1 mr-1 w-full h-8 outline-none'}`}
                    onChange={handleSearch}
                    type="text"
                    placeholder="Buscar evento"
                />
            </div>

            <div className="mt-4">
                {mapInfo.markers.length > 0 && (
                    mapInfo.markers.map(event => (
                        <div className='mb-2' key={event.id}>
                            <CardEvent
                                onClick={() => setPanTo({
                                    lat: parseFloat(event.position.lat),
                                    lng: parseFloat(event.position.lng)
                                })}
                                key={event.id}
                                title={event.title}
                                address={event.address}
                                datetime={event.datetime}
                                image={event.image}
                            />
                        </div>
                    ))
                )}

                { (searchRef && searchRef?.current?.value && mapInfo.markers.length <= 0 ) ? <p>Não foi possível encontrar o evento</p> : '' }
            </div>
        </>
    )
}

export default SearchBar
