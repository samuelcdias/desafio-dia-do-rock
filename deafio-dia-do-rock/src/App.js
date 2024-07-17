import {useContext} from 'react';
import {DarkModeContext} from './components/DarkModeProvider';
import './App.css';
import Navbar from './components/Navbar';
import LeafletMap from "./components/LeafletMap";
import {MapInfoContext} from "./components/MapInfoProvider";

function App() {
    const {darkMode} = useContext(DarkModeContext);
    const {mapInfo} = useContext(MapInfoContext);

    return (
        <div className={`flex ${darkMode ? 'dark' : 'light'}`}>
            <Navbar/>
            <div className='flex flex-col w-full'>
                <LeafletMap zoom={4} markers={mapInfo.markers} center={{lat: -22.977112, lng: -43.396305}}
                            panTo={mapInfo.panTo}/>
            </div>

        </div>
    );
}

export default App;
