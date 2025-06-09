import React, {useState} from 'react'
import SearchIcon from '../../assets/SearchIcon.png'
import { useSubwayArrivalContext } from '../../contexts/SubwayArrivalContext'
import { useStationListContext } from '../../contexts/StationListContext'
import { useNavigate } from 'react-router-dom'

function Search() {
    const navigate = useNavigate();
    const [stationName, setStationName] = useState('');

    const {fetchSubwayArrivalData, loading} = useSubwayArrivalContext();
    const {stationList} = useStationListContext();
    
    const handleSearch = async () => {
        await fetchSubwayArrivalData(stationName);
        navigate('/test')
    }

    const handleKeyPress = (e) => {
        if(e.key === 'Enter') {
            handleSearch();
        }
    }

    const filteredStations = stationList.filter(station => station.stationName && station.stationName.includes(stationName));

    return (
        <div className="relative w-2/6 m-6 mt-28 mb-8">
            <input 
                type="text" 
                placeholder="역을 입력하세요" 
                className="w-full pl-4 p-2 border border-gray-300 rounded-lg outline-none"
                value={stationName}
                onChange={(e) => setStationName(e.target.value)}
                onKeyDown={handleKeyPress}
                disabled={loading}
            />
            <button 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 z-10"
                onClick={handleSearch}
                disabled={loading}
                >
                <img src={SearchIcon} alt="Search" className="w-5 h-5"/>
            </button>
            {/* ✅ 필터링된 리스트 출력 */}
            {stationName && (
                <div className="absolute bg-white border border-gray-300 rounded-lg mt-1 w-full max-h-60 overflow-y-auto z-20">
                    {filteredStations.length > 0 ? (
                        filteredStations.map((station, index) => (
                            <div
                                key={index}
                                className="flex justify-between items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => setStationName(station.stationName)}
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
    )
}

export default Search