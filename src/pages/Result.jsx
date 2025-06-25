import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchSubwayArrival } from '../api/StationArrival';
import { lineToSubwayNm } from '../utils/lineToSubwayNm';
import { getLineColor } from '../utils/lineColor';
import Search from '../components/ui/Search';
import BackBotton from '../assets/BackBotton.png';
import Timer from '../components/ui/Timer';
import usePageTitle from '../hooks/usePageTitle';

function Result() {
    const navigate = useNavigate();
    const { stationName, lineNumber } = useParams();

    usePageTitle(`-${stationName}역 ${lineNumber}- 열차 도착 정보`);

    const [subwayArrival, setSubwayArrival] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isBookmarked, setIsBookmarked] = useState(false);

    // 즐겨찾기 추가/삭제 함수 (alert 제거됨)
    const handleBookmark = (stationName, lineNumber) => {
        const key = 'bookmarks';
        const bookmarks = JSON.parse(localStorage.getItem(key)) || [];

        const exists = bookmarks.some(
            item => item.stationName === stationName && item.lineNumber === lineNumber
        );

        if (exists) {
            const updated = bookmarks.filter(
                item => !(item.stationName === stationName && item.lineNumber === lineNumber)
            );
            localStorage.setItem(key, JSON.stringify(updated));
            setIsBookmarked(false); // 여기서 바로 상태 업데이트
        } else {
            const updated = [...bookmarks, { stationName, lineNumber }];
            localStorage.setItem(key, JSON.stringify(updated));
            setIsBookmarked(true); // 여기서 바로 상태 업데이트
        }
    };


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

    // 이 useEffect는 초기 로드 시에만 즐겨찾기 상태를 설정하도록 유지
    useEffect(() => {
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
        const exists = bookmarks.some(
            item => item.stationName === stationName && item.lineNumber === lineNumber
        );
        setIsBookmarked(exists);
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
                <div className="flex flex-col items-center justify-center border-2 shadow-lg rounded-lg mt-4 w-1/2" style={{ borderColor: getLineColor(lineNumber) }}>
                    <button
                        onClick={() => handleBookmark(stationName, lineNumber)}
                        className={`absolute top-2 right-2 text-white text-sm font-semibold px-2 py-1 rounded transition duration-150 ${
                            isBookmarked ? 'bg-gray-400 hover:bg-gray-500' : 'bg-yellow-400 hover:bg-yellow-500'
                        }`}
                    >
                        {isBookmarked ? '✓ 즐겨찾기됨' : '★ 즐겨찾기'}
                    </button>
                    
                    <div
                        className="p-2 m-4 text-center font-bold border-2 rounded-full flex flex-wrap justify-center items-center gap-2"
                        style={{ borderColor: getLineColor(lineNumber), minWidth: '10rem', maxWidth: '100%' }}
                    >
                        <span>{stationName}역</span>
                        <span
                            className="rounded-full px-2 py-1 text-white"
                            style={{ backgroundColor: getLineColor(lineNumber) }}
                        >
                            {lineNumber}
                        </span>
                    </div>
                    
                    <Timer loading={loading} error={error} subwayArrival={subwayArrival} />
                </div>
            </div>
        </div>
    );
}

export default Result;