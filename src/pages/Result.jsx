import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchSubwayArrival } from '../api/StationArrival';
import { lineToSubwayNm, subwayIdToLineNumber } from '../utils/lineToSubwayNm';
import { getLineColor } from '../utils/lineColor';
import Search from '../components/ui/Search';
import BackBotton from '../assets/BackBotton.png';
import Timer from '../components/ui/Timer';

function Result() {
    const navigate = useNavigate();
    const { stationName, lineNumber } = useParams();
    const [subwayArrival, setSubwayArrival] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fectchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await fetchSubwayArrival(stationName);
                const subwayId = lineToSubwayNm[lineNumber];
                const filtered = data.filter(item => item.subwayId === subwayId);
                setSubwayArrival(filtered);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        if (stationName && lineNumber) {
            fectchData();
        }
    }, [stationName, lineNumber]);

    return (
        <div className="flex flex-col items-center flex-grow">
            <Search />
            <div className="flex flex-row w-full justify-center">
                <div className="flex flex-col justify-start mt-4 mr-2">
                    <img 
                        src={BackBotton} 
                        alt="BackBotton" 
                        onClick={() => navigate('/')} 
                        className="w-8 h-8 cursor-pointer transition-transform duration-150 ease-in-out hover:scale-110 active:scale-95"
                    />
                </div>
                <div className="flex flex-col items-center justify-center border-2 border-gray-200 rounded-lg w-1/2">
                    <div className="p-4 m-4 w-40 text-center font-bold border rounded-full" style={{ borderColor: getLineColor(lineNumber) }}>
                        <h1>
                            {stationName}역 <span className="rounded-full p-1 text-white" style={{ backgroundColor: getLineColor(lineNumber) }}>{lineNumber}</span>
                        </h1>
                    </div>
                    
                    <Timer loading={loading} error={error} subwayArrival={subwayArrival} />
                </div>
            </div>
        </div>
    );
}

export default Result;
