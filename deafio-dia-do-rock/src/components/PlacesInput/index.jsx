import {useContext, useEffect, useRef, useState} from "react";
import NominatimApi from "../../Api/nominatimApi";
import {MapInfoContext} from "../MapInfoProvider";
import {DarkModeContext} from "../DarkModeProvider";

export default function PlacesInput({value, onChange}) {
    const {darkMode} = useContext(DarkModeContext);
    const {mapInfo, setPanTo, setZoom} = useContext(MapInfoContext);
    const [searchResults, setSearchResults] = useState([]);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const inputRef = useRef(null);
    const searchBoxRef = useRef(null);
    const nominatim = new NominatimApi();

    useEffect(() => {
        function handleClickOutside(event) {
            if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
                setSearchResults([]);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [searchBoxRef]);

    useEffect(() => {
        onChange(selectedPlace)
    }, [selectedPlace]);

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    async function handleChange(e) {
        const data = await nominatim.getAddressDetails(e.target.value);
        setSearchResults(data);
    }

    const debouncedHandleChange = debounce(handleChange, 300);

    function handleAddressSelect(result) {
        result.formatted_address = result.display_name.replace(`, ${result.address.state_district},`, '').replace(`, ${result.address.county}`, '')
        setSelectedPlace(result);
        setSearchResults([]);
        if (inputRef) {
            inputRef.current.value = result.formatted_address;
        }
        setPanTo({lat: parseFloat(result.lat), lng: parseFloat(result.lon)});
    }

    return (
        <div>
            <div className="relative">
                <div className={`flex items-center`}>

                    <input
                        id="location"
                        ref={inputRef}
                        type="text"
                        placeholder="Entre com um local"
                        onChange={debouncedHandleChange}
                        className="location-input w-full px-3 py-2 border rounded text-black focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
                {searchResults.length > 0 && (
                    <div ref={searchBoxRef} className={`${darkMode ? 'bg-dark' : 'bg-gray-300 ' } relative rounded mt-1 max-h-36 overflow-auto animate-slideIn `}>
                        {searchResults.map((result) => <p className={`${darkMode ? 'hover:bg-dark-50' : 'hover:bg-gray-400 ' } mt-2 cursor-pointer  p-2`}
                                                          key={result.place_id}
                                                          onClick={() => handleAddressSelect(result)}>
                                {result.display_name.replace(`, ${result.address.state_district},`, '').replace(`, ${result.address.county}`, '')}
                            </p>
                        )}
                    </div>)}
            </div>
        </div>
    )
}
