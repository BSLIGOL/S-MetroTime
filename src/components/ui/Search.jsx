import React, { useState } from 'react';
import SearchIcon from '../../assets/SearchIcon.png';
import { useStationListContext } from '../../contexts/useStationListContext';
import { useNavigate } from 'react-router-dom';

function Search() {
    const navigate = useNavigate();
    const [stationName, setStationName] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(-1);

    const { stationList } = useStationListContext();
    // ✔️검색 실행 함수 (역 존재 여부 확인 추가됨)
    const handleSearch = (selectedStationName, selectedLineNumber) => {
        const searchQuery = selectedStationName || stationName;
        const searchLine = selectedLineNumber;
        // ✔️역 리스트에서 존재 여부 확인(사용자가 검색한 역이 존재하는지 먼저 확인)
        const exists = stationList.some(
            (station) =>
                station.stationName === searchQuery &&
                station.lineNumber === searchLine
        );

        if (!exists) {
            navigate('/notfound'); // ✔️존재하지 않을 경우 NotFound로 이동
            return; 
        }

        setStationName('');
        setSelectedIndex(-1);
        navigate(`/result/${searchQuery}/${searchLine}`);
    };

    const filteredStations = stationList.filter(
        (station) =>
            station.stationName &&
            station.stationName.includes(stationName)
    );
    // ✔️키보드 입력 처리 (Enter 누를 떄도 NotFound 처리 포함)
    const handleKeyPress = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault(); //input 스크롤 방지
            setSelectedIndex((prev) =>
                prev < filteredStations.length - 1 ? prev + 1 : 0
            );
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex((prev) =>
                prev > 0 ? prev - 1 : filteredStations.length - 1
            );
        } else if (e.key === 'Enter') {
            if (selectedIndex >= 0 && selectedIndex < filteredStations.length) {
                handleSearch( // ✔️선택된 항목으로 이동
                    filteredStations[selectedIndex].stationName,
                    filteredStations[selectedIndex].lineNumber
                );
            } else if (filteredStations.length > 0) {
                handleSearch( // ✔️선택된 항목이 없지만 결과가 있을 경우 첫 번째 항목 사용
                    filteredStations[0].stationName,
                    filteredStations[0].lineNumber
                );
            } else { // ✔️아무것도 없으면 NotFound
                navigate('/notfound');
            }
        }
    };

    return (
        <div className="relative w-2/6 m-6 mt-28 mb-8">
            <input
                type="text"
                placeholder="역을 입력하세요"
                className="w-full pl-4 p-2 border border-gray-300 rounded-lg outline-none"
                value={stationName}
                onChange={(e) => {
                    setStationName(e.target.value);
                    setSelectedIndex(-1);//🔥 검색어 변경 시 인덱스 초기화
                }}
                onKeyDown={handleKeyPress}
            />
            <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 z-10"
                onClick={() => {
                    if (filteredStations.length > 0) {
                        handleSearch(filteredStations[0].stationName, filteredStations[0].lineNumber);
                    } else {
                        navigate('/notfound');
                    }
                }}
            >
                <img src={SearchIcon} alt="Search" className="w-5 h-5" />
            </button>
            {/* ✅ 필터링된 리스트 출력 */}
            {stationName && (
                <div className="absolute bg-white border border-gray-300 rounded-lg mt-1 w-full max-h-60 overflow-y-auto z-20">
                    {filteredStations.length > 0 ? (
                        filteredStations.map((station, index) => (
                            <div
                                key={index}
                                className={`flex justify-between items-center px-4 py-2 cursor-pointer ${
                                    index === selectedIndex
                                        ? 'bg-gray-200' // 🔥 선택 항목 배경색
                                        : 'hover:bg-gray-100'
                                }`}
                                onMouseEnter={() => setSelectedIndex(index)} // 🔥 마우스 오버 시 인덱스 설정
                                onClick={() =>
                                    handleSearch(station.stationName, station.lineNumber)
                                }
                            >
                                <span>{station.stationName}</span>
                                <span className="text-gray-500 text-sm">{station.lineNumber}</span>
                            </div>
                        ))
                    ) : (
                        <div className="px-4 py-2 text-gray-400">검색 결과가 없습니다.</div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Search;
