import { useState, useEffect } from 'react';
import { StationListContext } from './StationListContext';
import { fetchStationList } from '../api/StationList';

export const StationListProvider = ({children}) => {
    const [stationList, setStationList] = useState([]);

    useEffect(() => {
        const loadStationList = async () => {
            const data = await fetchStationList();
            setStationList(data);
        };
        loadStationList();
    }, []);

    return (
        <StationListContext.Provider value={{stationList}}>
            {children}
        </StationListContext.Provider>
    );
};