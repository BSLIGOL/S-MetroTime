import React, {useState} from 'react'
import SearchIcon from '../../assets/SearchIcon.png'
import { useSubwayArrivalContext } from '../../contexts/SubwayArrivalContext'
import { useNavigate } from 'react-router-dom'

function Search() {
    const navigate = useNavigate();
    const [stationName, setStationName] = useState('');

    const {fetchSubwayArrivalData, loading} = useSubwayArrivalContext();
    
    const handleSearch = async () => {
        await fetchSubwayArrivalData(stationName);
        navigate('/test')
    }

    const handleKeyPress = (e) => {
        if(e.key === 'Enter') {
            handleSearch();
        }
    }

    return (
        <div className={`flex flex-row w-2/6 m-6 border border-gray-300 rounded-lg overflow-hidden mt-28 mb-8`}>
            <input 
                type="text" 
                placeholder="역을 입력하세요" 
                className="flex-grow p-2 outline-none border-none"
                value={stationName}
                onChange={(e) => setStationName(e.target.value)}
                onKeyDown={handleKeyPress}
                disabled={loading}
            />
            <button 
                className="p-2"
                onClick={handleSearch}
                disabled={loading}
                >
                <img src={SearchIcon} alt="Search" className="w-5 h-5"/>
            </button>
        </div>
    )
}

export default Search