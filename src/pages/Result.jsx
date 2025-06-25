import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchSubwayArrival } from '../api/StationArrival';
import { lineToSubwayNm } from '../utils/lineToSubwayNm';
import { getLineColor } from '../utils/lineColor';
import Search from '../components/ui/Search';
import BackBotton from '../assets/BackBotton.png';
import Timer from '../components/ui/Timer';
import usePageTitle from '../hooks/usePageTitle';
import useBookmarks from '../hooks/useBookmarks'; // useBookmarks 훅 임포트

function Result() {
    const navigate = useNavigate();
    const { stationName, lineNumber } = useParams();

    usePageTitle(`-${stationName}역 ${lineNumber}- 열차 도착 정보`);

    const [subwayArrival, setSubwayArrival] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // ⭐ useBookmarks 훅에서 isBookmarked와 즐겨찾기 관련 함수를 가져옵니다.
    const { addBookmark, removeBookmark, isBookmarked: checkIsBookmarked } = useBookmarks();

    // ⭐ 즐겨찾기 상태를 Result 컴포넌트 내에서 관리하는 대신, 훅에서 가져온 checkIsBookmarked를 사용하여 현재 역이 북마크되었는지 확인합니다.
    const currentIsBookmarked = checkIsBookmarked(stationName, lineNumber);

    // ⭐ handleBookmarkClick 함수를 정의합니다.
    const handleBookmarkClick = () => {
        if (currentIsBookmarked) {
            removeBookmark(stationName, lineNumber);
        } else {
            addBookmark(stationName, lineNumber);
        }
    };

    // ⚠️ 기존 handleBookmark 함수는 useBookmarks 훅으로 기능이 대체되었으므로 제거합니다.
    // const handleBookmark = (stationName, lineNumber) => { /* ... */ };

    // ⚠️ 기존 setIsBookmarked 상태와 그에 관련된 useEffect는 useBookmarks 훅으로 대체되었으므로 제거합니다.
    // const [isBookmarked, setIsBookmarked] = useState(false); // 이 줄 제거
    // useEffect(() => { /* ... */ setIsBookmarked(exists); }, [stationName, lineNumber]); // 이 useEffect 제거

    // 뒤로가기 버튼 클릭 핸들러 (원래 로직 유지)
    const handleBackClick = () => { 
        navigate('/');
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

    return (
        <div className="flex flex-col items-center flex-grow py-8">
            <Search />
            <div className="flex flex-row w-full justify-center">
                <div className="flex flex-col justify-start mt-4 mr-2">
                    <img
                        src={BackBotton}
                        alt="BackBotton"
                        onClick={handleBackClick}
                        className="w-8 h-8 cursor-pointer transition-transform duration-150 ease-in-out hover:scale-110 active:scale-95"
                    />
                </div>
                <div className="flex flex-col items-center justify-center border-2 shadow-lg rounded-lg mt-4 w-1/2 relative" style={{ borderColor: getLineColor(lineNumber) }}>
                    <button
                        onClick={handleBookmarkClick} // ⭐ 수정된 부분: handleBookmarkClick 사용
                        className={`absolute top-2 right-2 text-white text-sm font-semibold px-2 py-1 rounded transition duration-150 ${
                            currentIsBookmarked ? 'bg-gray-400 hover:bg-gray-500' : 'bg-yellow-400 hover:bg-yellow-500'
                        }`}
                    >
                        {currentIsBookmarked ? '✓ 즐겨찾기됨' : '★ 즐겨찾기'}
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