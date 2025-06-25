import React, { useState } from 'react';
import Search from "../components/ui/Search";
import StationLineMap from "../assets/StationMap.png";
import BackBotton from "../assets/BackBotton.png";
import { useNavigate } from "react-router-dom";
import usePageTitle from '../hooks/usePageTitle';
import './NotFounds.css';

function StationMap() {
    usePageTitle('지하철 노선도');

    const navigate = useNavigate();
    const [isZoomed, setIsZoomed] = useState(false);

    const handleImageClick = () => {
        setIsZoomed(true);
    };

    const handleCloseModal = () => {
        setIsZoomed(false);
    };

    const handleBack = () => {
        navigate('/');
    }

    return (
        <div className="flex flex-col items-center flex-grow">
            <Search />

            <div className="flex flex-row items-start justify-center">
                <div className="flex flex-col justify-start mt-4 mr-2">
                    <img
                        src={BackBotton}
                        alt="BackBotton"
                        onClick={handleBack}
                        className="w-8 h-8 transition-transform duration-150 ease-in-out hover:scale-110 active:scale-95"
                    />
                </div>
                <div
                    onClick={handleImageClick}
                    className={`
                        relative border-2 border-gray-200 rounded-md shadow-md
                        ${isZoomed ? '' : 'w-3/5 h-3/5'}
                        transition-all duration-300 ease-in-out
                    `}
                    style={{
                        // 축소 상태일 때의 최대 크기 유지
                    }}
                >
                    <img
                        src={StationLineMap}
                        alt="StationLineMap"
                        className={`
                            w-full h-full
                            ${isZoomed ? 'cursor-zoom-in' : ''}
                        `}
                        draggable="false"
                    />
                </div>
            </div>

            {isZoomed && (
                <div
                    className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 z-50 flex items-center justify-center"
                    onClick={handleCloseModal}
                >
                    <div className="relative max-w-full max-h-full">
                        <img
                            src={StationLineMap}
                            alt="확대된 지하철 노선도"
                            className="max-w-full max-h-full object-contain cursor-zoom-out"
                        />
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-4 right-4 text-white text-3xl font-bold bg-transparent border-none p-2 rounded-full hover:bg-gray-700"
                        >
                            &times;
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default StationMap;