import React, {useContext, useState} from "react";
import { LoadScript, Autocomplete } from '@react-google-maps/api';
import { create } from '../../Api/eventoApi';
import PlacesInput from "../PlacesInput";
import ImageInput from "../ImageInput";
import {MapInfoContext} from "../MapInfoProvider";
import {toast} from "react-toastify";

export const EventoForm = () => {
    const {mapInfo, setPanTo, getMarkers} = useContext(MapInfoContext);
    const [autocomplete, setAutocomplete] = useState(null);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [isHidden, setIsHidden] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [evento, setEvento] = useState({
        title: '',
        image: '',
        description: '',
        address: '',
        datetime: '',
        position: {
          lat: 0,
          lng: 0,
        },
    });

    const onLoad = (autocomplete) => {
        setAutocomplete(autocomplete);
    };

    const onPlaceChanged = () => {
        if (autocomplete !== null) {
          const place = autocomplete.getPlace();
          setSelectedPlace(place);
          setEvento({...evento, adress: place.formatted_address || ""});
        } else {
          console.log('Autocomplete is not loaded yet!');
        }
      };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if(validateDataFormBeforeSave() === false) {
            toast.error("Preencha os campos obrigatórios");
            setIsLoading(false);
            return;
        }
        try {
          await create(evento);
          await simulateNetworkRequest();
            getMarkers();
            setPanTo(evento.position);

        } catch (error) {
            toast.error("Erro ao enviar a requisição");
          console.error('Erro ao enviar a requisição:', error);
        } finally {
            setIsLoading(false);
        }
    };

    function simulateNetworkRequest() {
        return new Promise((resolve) => setTimeout(resolve, 2000));
    }

    function validateDataFormBeforeSave() {
        return !(evento.title === '' || evento.datetime === '' || evento.address === '');

    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file && file.size > 5 * 1024 * 1024) { // 5MB
          if(!isHidden)
            toggleVisibility();
            return;
        }
        else{
            if(isHidden)
                toggleVisibility();
        }

        const reader = new FileReader();
        reader.onloadend = () => {
          setEvento({
            ...evento,
            image: reader.result,
          });
        };
        reader.readAsDataURL(file);
      };

      const toggleVisibility = () => {
        setIsHidden(!isHidden);
      };

      function handlePlaceChange(place) {
          if(!place) {
              setEvento((oldEvento) => ({
                  ...oldEvento,
                  address: '',
                  position: ''
              }))
              return;
          }
          setEvento((oldEvento) => ({
              ...oldEvento,
              address: place.formatted_address,
              position: {lat: parseFloat(place.lat), lng: parseFloat(place.lon)}
          }))
      }

    return(
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-7 p-4 bg-transparent rounded">
        <p className="font-semibold">Evento</p>
        <hr className="my-4 border-primary" />
        <div className="mb-4">
            <label htmlFor="nome" className="block text-primary font-semibold mb-1">
                Nome:*
            </label>
            <input
                type="text"
                id="nome"
                value={evento.title}
                onChange={(e) => setEvento({ ...evento, title: e.target.value })}
                className="w-full px-3 py-2 border rounded text-black focus:outline-none focus:ring focus:border-blue-300"
            />
        </div>
          <div className="mb-4">
              <label htmlFor="nome" className="block text-primary font-semibold mb-1">
                  Localidade:*
              </label>
              <PlacesInput onChange={handlePlaceChange}/>
          </div>
          <div className="mb-4">
              <label htmlFor="data" className="block text-primary font-semibold mb-1">
              Data (dia e hora):*
            </label>
            <input
                type="datetime-local"
                id="data"
                value={evento.datetime}
                onChange={(e) => setEvento({ ...evento, datetime: e.target.value })}
                className="w-full px-3 py-2 border rounded text-black focus:outline-none focus:ring focus:border-primary"
            />
        </div>
          <div>
                <label htmlFor="descricao" className="block text-primary font-semibold mb-1">
                    Descrição do evento:
                </label>
                <textarea
                    id="descricao"
                    rows={5}
                    value={evento.description}
                    onChange={(e) => setEvento({ ...evento, description: e.target.value })}
                    className="w-full px-3 py-2 border rounded text-black focus:outline-none focus:ring focus:border-blue-300"
                />
          </div>
          <div className="flex flex-col gap-2 mb-4">
              <label className="block text-primary font-semibold mb-1">Imagem:</label>
              <ImageInput onChangeImage={handleFileChange} />
          </div>
        <button
            type="submit"
            disabled={isLoading}
            className="bg-primary disabled:cursor-not-allowed text-white w-full py-2 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        >
            Enviar
        </button>
          {isLoading &&
          <div className={`mt-4 min-w-full min-h-2 bg-dark overflow-hidden rounded`}>
              <div className={`bg-success w-60 min-h-2 animate-slideRight rounded`}></div>
          </div> }
      </form>
    )
}

export default EventoForm;
