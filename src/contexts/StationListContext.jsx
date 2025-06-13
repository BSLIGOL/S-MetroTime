import { createContext, useState, useContext, useEffect } from 'react';
import { fetchStationList } from '../api/StationList';

const StationListContext = createContext();

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

export const useStationListContext = () => {
    const context = useContext(StationListContext);
    if(context === undefined) {
        throw new Error('useStationListContext는 StationListProvider 내에서 사용되어야 합니다.');
    }
    return context;
};