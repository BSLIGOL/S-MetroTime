import React from 'react';
import { useNavigate } from 'react-router-dom';

function Card({iconSrc, title, path}) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(path);
    }

    return (
        <div 
            onClick={handleClick}
            className="flex flex-col items-center mr-6 ml-6 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer w-full sm:w-52 h-60 justify-center"
        >
            <img src={iconSrc} alt={title} />
            <h1>{title}</h1>
        </div>
    )
}

export default Card