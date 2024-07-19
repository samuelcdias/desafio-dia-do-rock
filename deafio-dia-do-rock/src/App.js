import {useContext} from 'react';
import {DarkModeContext} from './components/DarkModeProvider';
import './App.css';
import Navbar from './components/Navbar';
import LeafletMap from "./components/LeafletMap";
import {MapInfoContext} from "./components/MapInfoProvider";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const {darkMode} = useContext(DarkModeContext);
    const {mapInfo} = useContext(MapInfoContext);

    return (
        <div className={`flex ${darkMode ? 'dark' : 'light'}`}>
            <Navbar/>
            <div className='flex flex-col w-full'>
                <LeafletMap zoom={mapInfo.zoom} markers={mapInfo.markers} center={{lat: -22.977112, lng: -43.396305}}
                            panTo={mapInfo.panTo}/>
            </div>
            <ToastContainer theme={darkMode ? 'dark' : 'light'} />
        </div>
    );
}

export default App;
