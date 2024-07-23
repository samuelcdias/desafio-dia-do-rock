import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import React from "react";
import 'moment/locale/pt-br'
import moment from "moment/moment";

export default function LeafletMap({center, zoom, markers = [], panTo = null}) {
    const mapRef = React.useRef();
    const [centerMap, setCenterMap] = React.useState(center);
    React.useEffect(() => {
        if(mapRef && panTo) {
            mapRef.current.flyTo(panTo, 13);
        }
    }, [panTo])

    return (
        <MapContainer center={centerMap} zoom={zoom} scrollWheelZoom={true} ref={mapRef}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url={`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`}
            />
            {markers.map(item => (
                <Marker
                    key={item.id}
                    title={item.title}
                    position={item.position}
                >
                    <Popup>
                        <div className={`flex flex-col w-52`}>
                            <h1 className="font-black text-lg">{item.title}</h1>
                            {item.image && <div className="max-h-20 overflow-hidden rounded mt-2">
                                <img className="w-full h-20 min-h-20 object-cover" src={item.image} alt={item.title}/>
                            </div>}
                            <p>{item.description}</p>

                            <div className="flex flex-col gap-2 font-bold rounded">
                                <p style={{margin: "0"}}>{item.address}</p>
                                <p style={{margin: "0"}} className="">{moment(item.datetime).locale('pt-br').format('LLLL')}</p>
                            </div>
                        </div>
                    </Popup>
                </Marker>))}
        </MapContainer>
    )
}
