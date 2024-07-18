import React from "react";
import {FaTrash} from "react-icons/fa";

export default function ImageInput({initialValue, onBlur, onChangeImage, onImageDelete}) {
    const [imagePreviewUrl, setImagePreviewUrl] = React.useState(null);
    const imageRef = React.useRef(null);

    React.useEffect(() => {
        if (initialValue) {
            setImagePreviewUrl(initialValue);
        }
    }, [initialValue])

    function handleClick() {
        if (imageRef.current) {
            imageRef.current.click();
        }
    }

    function handleImageChange(e) {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setImagePreviewUrl(reader.result);
            }

            reader.readAsDataURL(e.target.files[0]);
            if(imageRef.current) {
                onChangeImage(imageRef.current);
            }
        }

    }

    function handleRemoveImage(e) {
        setImagePreviewUrl(null);
        if (imageRef.current) {
            imageRef.current.value = '';
            if(onImageDelete) {
                onImageDelete();
            }
            onChangeImage(imageRef.current);
        }
    }


    return (
        <div className="flex flex-col items-center gap-2">
            <div className="relative w-full">
                <div onClick={handleClick}
                     className="max-h-36 h-36 w-full bg-gray-200 flex justify-center items-center rounded-lg shadow cursor-pointer">
                    {imagePreviewUrl ?
                        <img src={imagePreviewUrl} alt="Imagem" className="rounded-lg object-cover w-full h-36"/> :
                        <span className="text-xl">+</span>}
                </div>
                {imagePreviewUrl && <button onClick={handleRemoveImage}
                                            className="absolute z-50 opacity-60 hover:opacity-100 top-2 right-2 bg-red-600 p-2 rounded text-white">
                    <FaTrash className="text-sm"/></button>}
            </div>

            <input ref={imageRef}
                   type="file"
                   className="hidden"
                   name="image"
                   onChange={handleImageChange}
                   onBlur={onBlur}
                   accept="image/*"/>
        </div>
    )
}
