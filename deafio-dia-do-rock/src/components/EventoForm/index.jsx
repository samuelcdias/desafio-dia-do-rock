import React, {useContext, useState} from "react";
import {create} from '../../Api/eventoApi';
import PlacesInput from "../PlacesInput";
import ImageInput from "../ImageInput";
import {MapInfoContext} from "../MapInfoProvider";
import {toast} from "react-toastify";
import StatusComponent from "../StatusComponent";
import {DarkModeContext} from "../DarkModeProvider";

export const EventoForm = ({toggleExpansion}) => {
    const {setPanTo, getMarkers} = useContext(MapInfoContext);
    const {darkMode} = useContext(DarkModeContext);

    const [isHidden, setIsHidden] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState({title: '', message: '', isSuccess: true, isActive: false});

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (validateDataFormBeforeSave() === false) {
            toast.error("Preencha os campos obrigatórios");
            setIsLoading(false);
            return;
        }
        try {
            await create(evento);
            await simulateNetworkRequest();
            getMarkers();
            setPanTo(evento.position);
            setStatus({
                title: 'Evento cadastrado com sucesso!',
                message: 'O evento foi cadastrado com sucesso e já está disponível no mapa.',
                isActive: true,
            })
        } catch (error) {
            toast.error("Erro ao enviar a requisição");
            setStatus({
                title: 'Erro ao cadastrar evento',
                message: 'Ocorreu um erro ao cadastrar o evento, tente novamente mais tarde.',
                isActive: false,
            })
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
            if (!isHidden)
                toggleVisibility();
            return;
        } else {
            if (isHidden)
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
        if (!place) {
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

    if (status.isActive) {
        return (
            <div className="mt-16 min-h-full">
                <StatusComponent title={status.title} message={status.message} isSuccess={status.isSuccess}
                                 onClick={toggleExpansion}/>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-7 p-4 bg-transparent rounded">
            <p className="font-semibold">Evento</p>
            <hr className="my-4 border-primary"/>
            <div className="mb-4">
                <label htmlFor="nome" className="block text-primary font-semibold mb-1">
                    Nome:*
                </label>
                <input
                    type="text"
                    id="nome"
                    value={evento.title}
                    onChange={(e) => setEvento({...evento, title: e.target.value})}
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
                    onChange={(e) => setEvento({...evento, datetime: e.target.value})}
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
                    onChange={(e) => setEvento({...evento, description: e.target.value})}
                    className="w-full px-3 py-2 border rounded text-black focus:outline-none focus:ring focus:border-blue-300"
                />
            </div>
            <div className="flex flex-col gap-2 mb-4">
                <label className="block text-primary font-semibold mb-1">Imagem:</label>
                <ImageInput onChangeImage={handleFileChange}/>
            </div>
            <button
                type="submit"
                disabled={isLoading}
                className="bg-primary disabled:cursor-not-allowed text-white w-full py-2 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            >
                Enviar
            </button>
            {isLoading &&
                <div className={`${darkMode ? 'bg-dark ' : 'bg-gray-300 '} mt-4 min-w-full min-h-2 overflow-hidden rounded`}>
                    <div className={`bg-success w-60 min-h-2 animate-slideRight rounded`}></div>
                </div>}
        </form>
    )
}

export default EventoForm;
